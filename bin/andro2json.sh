#!/bin/sh
#K.BALEM
#2017
################
source activate obidam36
python andro2json.py $1 > temp
sed -i 's/masked/0.0/g' temp
cat temp | json_reformat > ../data/andro1000.json

rm temp