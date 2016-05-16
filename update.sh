#!/bin/bash

rm -rf SubtlePatterns

git clone https://github.com/subtlepatterns/SubtlePatterns

rm SubtlePatterns/!(*.png|*.jpg)
