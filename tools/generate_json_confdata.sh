#!/bin/bash
#
# Copyright 2023 Sergio Arroutbi <sarroutb@redhat.com>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

usage() {
  echo
  echo "Usage:"
  echo
  echo "$0 -t token_file [-o output_file] [-h] [-v]"
  echo
  echo "Examples:"
  echo "        $0 -t token_file.txt"
  echo "        $0 -t token_file.txt -o confdata.json"
  echo
  echo "Options:"
  echo "        -t \"token_file\": file with authenticationt token (mandatory)"
  echo "        -o \"output_file\": file to write (standard output by default)"
  echo "        -h: help"
  echo "        -v: verbose"
  echo
  exit "$2"
}

die() {
  echo
  echo "$2"
  echo
  exit "$1"
}

get_environment() {
  oc config view --minify -o jsonpath='{.clusters[*].cluster.server}'
}

get_namespace() {
  bonfire namespace list --mine 2>&1 | grep "^ephemeral" | awk '{print $1}'
}

get_token() {
  tr -d '\n' < "${1}"
}

TOKEN_FILE=""
OUTPUT_FILE=""

while getopts "t:o:hv" arg
do
  case "${arg}" in
    t) TOKEN_FILE=${OPTARG}
       ;;
    o) OUTPUT_FILE=${OPTARG}
       ;;
    h) usage "$0" 0
       ;;
    v) set -x
       ;;
    *) usage "$0" 1
       ;;
  esac
done

if [ -z "${TOKEN_FILE}" ];
then
  echo
  echo "-t option is mandatory (token file must be provided)"
  usage "$0" 1
fi

if [ ! -f "${TOKEN_FILE}" ];
then
  die 1 'Please, provide an existing token file'
fi

if [ -z "${OUTPUT_FILE}" ]; then
  cat <<EOF
{
  "environment":"$(get_environment)"
  "namespace":"$(get_namespace)"
  "token":"$(get_token "${TOKEN_FILE}")"
}
EOF
else
  cat<<EOF > "${OUTPUT_FILE}"
{
  "environment":"$(get_environment)"
  "namespace":"$(get_namespace)"
  "token":"$(get_token "${TOKEN_FILE}")"
}
EOF
fi
