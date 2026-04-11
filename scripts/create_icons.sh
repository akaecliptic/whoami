#! /bin/bash

## setup

set -e # fail fast
# set -x # debugging

## variable

# input
type=""
working_dir=""

# working
icon_prefix="icon"
svg_suffix=".svg"
out_file="index.ts"
output=""
files=""

## function

# interface

function usage {
    echo "usage: ./scripts/create_icons.sh <working_dir> <type>"
}

function read_files {
    echo "$(ls $working_dir | grep .svg)"
}

function set_variables {
    # check if working directory is provided
    if [[ -z "$1" ]]; then
        usage
        exit 1
    fi

    # check if type is provided
    if [[ -z "$2" ]]; then 
        usage
        exit 1
    fi

    working_dir="$1"
    type="$2"

    files="$(read_files)"
}

# auxil

# strip svg suffix from string and capitalise
function capitalise {
    echo $(sed -e "s/${svg_suffix}//g" -e "s/\(^.\)/\U\1/" <<< "$1")
}

# strip svg suffix from string
function strip_suffix {
    echo $(sed -e "s/${svg_suffix}//g" <<< "$1")
}

# output

function output_imports {
    local out=""

    for file in $files; do
        local name_capital=$(capitalise $file)

        out+="import ${icon_prefix}${name_capital} from \"./${file}?raw\";\n"
    done

    out+="\n"

    echo $out
}

function output_switch {
    local type_capital=$(capitalise $type)

    local out="export const resolve${type_capital}Icon = (value: ${type_capital}Icons) => {\n\tswitch (value) {\n"

    for file in $files; do
        local name=$(strip_suffix $file)
        local name_capital=$(capitalise $file)

        out+="\t\tcase \"${name}\": return ${icon_prefix}${name_capital};\n"
    done

    out+="\t}\n};\n"

    # return
    echo $out
}

function output_type {
    local type_capital=$(capitalise $type)

    local out="export const ${type_capital}IconNames = [\n"

    for file in $files; do
        local name=$(strip_suffix $file)
        local name_capital=$(capitalise $file)

        out+="\t\"${name}\",\n"
    done

    out+="] as const;\n\n"

    out+="export type ${type_capital}Icons = (typeof ${type_capital}IconNames)[number];\n\n"

    # return
    echo $out
}

## execute

set_variables $1 $2

output+=$(output_imports)
output+=$(output_type)
output+=$(output_switch)

echo -e $output
