# whoami

## intro

hello, this is my "porfolio" website

## generating icons

```bash
export working_dir=./src/components/icons/
./scripts/create_icons.sh $working_dir/developer dev > $working_dir/developer/index.ts
./scripts/create_icons.sh $working_dir/general general > $working_dir/general/index.ts
./scripts/create_icons.sh $working_dir/languages lang > $working_dir/languages/index.ts
./scripts/create_icons.sh $working_dir/projects work > $working_dir/projects/index.ts
./scripts/create_icons.sh $working_dir/tabs tab > $working_dir/tabs/index.ts
./scripts/create_icons.sh $working_dir/technologies tech > $working_dir/technologies/index.ts
```
