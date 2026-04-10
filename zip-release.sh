#!/bin/bash

APP_NAME="permalink"
VERSION=$(xmllint --xpath "string(//version)" appinfo/info.xml)
ARCHIVE_NAME="/tmp/${APP_NAME}.tar.gz"

# Build
rm -rf js/*
make build-js-production
composer update

# Clean previous builds
rm -f "${APP_NAME}.tar.gz"

# git archive --format=tar.gz --prefix="${APP_NAME}/" --output="$ARCHIVE_NAME" HEAD
tar -czf "$ARCHIVE_NAME" --transform="s,^,${APP_NAME}/," --exclude='node_modules' --exclude='vendor-bin' --exclude='.git' .

echo "✅ Beta archive created: $ARCHIVE_NAME"

git tag $VERSION
git push origin main
git push origin "$VERSION"

gh release create $VERSION $ARCHIVE_NAME

echo "✅ Release pushed to git"
