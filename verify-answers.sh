#!/bin/bash

find . -type f -iname "answer.mjs" -printf '%h\0' | xargs -0 -i bash -xc "cd '{}' && node answer.mjs | diff answer.txt -"
