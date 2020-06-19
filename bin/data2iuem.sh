#!/bin/bash
#
# Send data files to IUEM
#
source ~/.bashrc

# Send files to Google Storage:
scp ../data/WDate.js 7iuem141-by-polaris:/home/whuman/divaa/data/WDate.js
scp ../data/aviso.json 7iuem141-by-polaris:/home/whuman/divaa/data/aviso.json
scp ../data/ARGO.js 7iuem141-by-polaris:/home/whuman/divaa/data/ARGO.js
scp ../data/ARGO10.js 7iuem141-by-polaris:/home/whuman/divaa/data/ARGO10.js
scp ../data/ARGO30DEEP.js 7iuem141-by-polaris:/home/whuman/divaa/data/ARGO30DEEP.js
