#!/usr/bin/env bash
#
# Update a submodule to a specific tag/release.
#
# Usage:
#   ./scripts/update-submodule.sh <submodule> <tag>
#   ./scripts/update-submodule.sh mantle-v2 v1.5.3
#   ./scripts/update-submodule.sh op-geth v1.5.3
#
# To update both at once:
#   ./scripts/update-submodule.sh all v1.5.3
#
# To list available tags for a submodule:
#   ./scripts/update-submodule.sh mantle-v2 --list
#   ./scripts/update-submodule.sh op-geth --list

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPOS_DIR="$REPO_ROOT/repos"

SUBMODULES=("mantle-v2" "op-geth")

usage() {
  echo "Usage: $0 <submodule|all> <tag|--list>"
  echo ""
  echo "Submodules: ${SUBMODULES[*]}"
  echo ""
  echo "Examples:"
  echo "  $0 mantle-v2 v1.5.3      # checkout mantle-v2 at v1.5.3"
  echo "  $0 op-geth v1.5.3        # checkout op-geth at v1.5.3"
  echo "  $0 all v1.5.3            # checkout both at v1.5.3"
  echo "  $0 mantle-v2 --list      # list available tags"
  exit 1
}

list_tags() {
  local name="$1"
  local dir="$REPOS_DIR/$name"
  if [ ! -d "$dir" ]; then
    echo "Error: submodule '$name' not found at $dir"
    exit 1
  fi
  echo "Available tags for $name (latest 20):"
  git -C "$dir" ls-remote --tags origin \
    | awk -F/ '{print $NF}' \
    | grep -v '\^{}' \
    | sort -V \
    | tail -20
}

checkout_tag() {
  local name="$1"
  local tag="$2"
  local dir="$REPOS_DIR/$name"

  if [ ! -d "$dir" ]; then
    echo "Error: submodule '$name' not found at $dir"
    exit 1
  fi

  echo "==> Fetching tag $tag for $name..."
  GIT_LFS_SKIP_SMUDGE=1 git -C "$dir" fetch --depth 1 origin tag "$tag" 2>&1

  echo "==> Checking out $tag..."
  git -C "$dir" checkout "$tag" 2>&1

  echo "==> $name is now at $tag"
  echo ""
}

if [ $# -lt 2 ]; then
  usage
fi

TARGET="$1"
ACTION="$2"

if [ "$ACTION" = "--list" ]; then
  if [ "$TARGET" = "all" ]; then
    for sub in "${SUBMODULES[@]}"; do
      list_tags "$sub"
      echo ""
    done
  else
    list_tags "$TARGET"
  fi
  exit 0
fi

# Checkout mode
TAG="$ACTION"

if [ "$TARGET" = "all" ]; then
  for sub in "${SUBMODULES[@]}"; do
    checkout_tag "$sub" "$TAG"
  done
else
  found=false
  for sub in "${SUBMODULES[@]}"; do
    if [ "$sub" = "$TARGET" ]; then
      found=true
      break
    fi
  done
  if [ "$found" = false ]; then
    echo "Error: unknown submodule '$TARGET'"
    echo "Available: ${SUBMODULES[*]}"
    exit 1
  fi
  checkout_tag "$TARGET" "$TAG"
fi

echo "Done. Don't forget to commit the submodule reference update:"
echo "  git add repos/$TARGET && git commit -m 'chore: update $TARGET to $TAG'"
