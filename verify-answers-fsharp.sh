#!/bin/bash

find . -type f -iname "answer.fsx" -printf '%h\0' | xargs -0 -i bash -xc "cd '{}' && dotnet fsi answer.fsx | diff --strip-trailing-cr answer.txt -"
