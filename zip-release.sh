#!/bin/bash

APP_NAME="permalink"
VERSION=$(xmllint --xpath "string(//version)" appinfo/info.xml)
ARCHIVE_NAME="${APP_NAME}.tar.gz"

# Build
rm -rf js/*
make build-js-production
composer update

# Clean previous builds
rm -f $ARCHIVE_NAME

git archive --format=tar.gz --prefix="${APP_NAME}/" --output="$ARCHIVE_NAME" HEAD

echo "✅ Beta archive created: $ARCHIVE_NAME"

git tag $VERSION
git push origin main --tags

gh release create $VERSION "${APP_NAME}.tar.gz"

echo "✅ Release pushed to git"
