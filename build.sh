#!/bin/bash

APP_NAME="permalink"
VERSION=$(xmllint --xpath "string(//version)" $APP_NAME/permalink/appinfo/info.xml)
ARCHIVE_NAME="${APP_NAME}-${VERSION}.tar.gz"

# Clean previous builds
rm -f $ARCHIVE_NAME

git archive --format=tar.gz --output="$ARCHIVE_NAME" HEAD:$APP_NAME

echo "✅ Beta archive created: $ARCHIVE_NAME"

git tag $VERSION
git push origin main --tags

gh release create $VERSION "${APP_NAME}-${VERSION}.tar.gz"

echo "✅ Release pushed to git"
