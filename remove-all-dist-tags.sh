#!/bin/bash

PKG_NAME=$(cat package.json | jq -r '.name')
ALL_TAGS=$(npm view ${PKG_NAME} dist-tags --json | jq keys)
for tag in $(echo "${ALL_TAGS}" | jq -r '.[]'); do
  npm dist-tag rm ${PKG_NAME} ${tag}
done
