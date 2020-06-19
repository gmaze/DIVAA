#!/bin/sh
#K.BALEM
# Modified by G. Maze for Argo-France OVH website
# Modified by G. Maze for Argo-France IUEM website
#2020
################
cd bin/

#ARGO INDEX
wget ftp://ftp.ifremer.fr/ifremer/argo/ar_index_global_prof.txt
#wget ftp://ftp.ifremer.fr/ifremer/argo/ar_index_this_week_prof.txt
#

#### ARGO10
echo -n "LOADING LAST 10 DAYS OF ARGO DATA ..."
echo ""
./argo_n.sh
echo -n "ok"
echo ""

#### ARGO30 DEEP
echo -n "LOADING LAST 30 DAYS OF DEEP ARGO DATA ..."
echo ""
./argo_ndeep.sh
echo "ok"
echo ""

### AVISO CURRENTS
echo -n "LOADING LAST AVISO CURRENTS ..."
echo ""
#FIND LAST AVISO FILE
latest=`ls -1 /home5/pharos/REFERENCE_DATA/ALTIMETRY/DATA/NRT/dataset-duacs-nrt-global-merged-allsat-phy-l4/*/*/*.nc | tail -2 | head -1`
echo -n $latest
#FULL FILE
flatest=$latest
#DATE OF DATA
dlatest=`echo $latest | awk -F"_" '{print $7}'`
echo -n "... "
./aviso2json.sh $flatest
echo ""
echo -n "DATE ASSIGNED TO THESE DATA: $dlatest"
echo -n "ok"
echo ""

### ARGO DATE
echo -n "ARGO FOR $dlatest ... "
./argo_pr.sh $dlatest
echo -n "ok"
#write date
echo "var WDate = \"$dlatest\";"  > ../data/WDate.js
#clear
rm ar_index_*

### copy to webspace
#./data2ovh.py
./data2iuem.sh
./data2gstore.sh

##
exit 0
