#!/bin/bash

branch_name=$(git symbolic-ref -q HEAD)
branch_name=${branch_name##refs/heads/}
branch_name=${branch_name:-HEAD}

git pull origin $branch_name

pushd hakunamatata

    git checkout master
    git pull origin master

popd

git add hakunamatata
git ci -m 'build(hakunamatata) update'
git push origin master
