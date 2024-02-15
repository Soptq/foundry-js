#!/usr/bin/env bash

tolower() {
  echo "$1" | awk '{print tolower($0)}'
}

PLATFORM=$(tolower "$(uname -s)")
ARCHITECTURE=$(tolower "$(uname -m)")
if [ "${ARCHITECTURE}" = "x86_64" ]; then
  # Redirect stderr to /dev/null to avoid printing errors if non Rosetta.
  if [ "$(sysctl -n sysctl.proc_translated 2>/dev/null)" = "1" ]; then
    ARCHITECTURE="arm64" # Rosetta.
  else
    ARCHITECTURE="amd64" # Intel.
  fi
elif [ "${ARCHITECTURE}" = "arm64" ] ||[ "${ARCHITECTURE}" = "aarch64" ] ; then
  ARCHITECTURE="arm64" # Arm.
else
  ARCHITECTURE="amd64" # Amd.
fi

if [ ! -f "$(dirname $(realpath $0))/${PLATFORM}_${ARCHITECTURE}/chisel" ]; then
  echo "chisel binary not found for ${PLATFORM}-${ARCHITECTURE}"
  exit 1
fi

exec $(dirname $(realpath $0))/${PLATFORM}_${ARCHITECTURE}/chisel "$@"
