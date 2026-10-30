#!/usr/bin/env sh
# Create a new demo from template/:  ./new-demo.sh my-demo
set -eu
name="${1:?usage: ./new-demo.sh <demo-name>}"
cd "$(dirname "$0")"
if [ -e "$name" ]; then
  echo "$name already exists" >&2
  exit 1
fi
cp -r template "$name"
sed -i "s/^name: demo-template$/name: $name/" "$name/compose.yml"
echo "Created $name/. Next: write $name/SPEC.md, then: cd $name && docker compose up --build -d"
