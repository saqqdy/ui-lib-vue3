#!/bin/sh
#created by saqqdy on 2020/07/09

# 生成文档
npx jsdoc2md packages/**/*{.js,.ts,.vue} > API.md

echo '\033[32mbuild docs complate!\033[0m'
