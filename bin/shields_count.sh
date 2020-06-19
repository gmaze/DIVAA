#!/bin/sh
# G. Maze
# 2020
################
LA='ar_index_global_prof.txt'
################
#repertoire temporaire unique
tempdir="temp_"`date +%H%M%S`
mkdir $tempdir
#dates
dati=".nc,"`date -d"2 days ago" +%Y%m%d`
# NN=9 #9-3 + 1 = 7 DAYS
NN=11 #11-3 + 1 = 10 DAYS
for ((o=3; o<=$NN; o++))
do
dati=$dati"|.nc,"`date -d"$o days ago" +%Y%m%d`
done
echo $dati

###### Shields endpoint ######
NAME='ARGOFULL'
outf=$NAME.json
Nheader=9
N=`wc -l < ar_index_global_prof.txt`
N=$(($N - $Nheader))
echo "{\"schemaVersion\": 1, \"label\": \"Dataset profiles\", \"message\": \"$N\" } " >> $outf
#move to final destination
mv $outf ../data/

NAME='ARGO10'
outf=$NAME.json
grep "/profiles/" $LA | grep -E $dati > $tempdir/temp1
N=`wc -l < $tempdir/temp1`
echo "{\"schemaVersion\": 1, \"label\": \"10 days profiles\", \"message\": \"$N\" } " >> $outf

#move to final destination
mv $outf ../data/

#supression du repertoire temporaire
rm -rf $tempdir

#
exit 0