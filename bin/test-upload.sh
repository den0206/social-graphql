#!/bin/sh

echo "Start"

curl $1 \
  -F operations='{ "query": "mutation ($file: Upload!) { uploadAvatar(file: $file) { status url} }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@$2


#   ./bin/test-upload.sh localhost:4000/graphql /Users/sakaiyuuki/Downloads/get_map_icon_0.png

# chmod +x ./bin/test-upload.sh