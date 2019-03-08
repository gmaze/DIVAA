import numpy as np
from netCDF4 import Dataset
import os,sys

my_nc_file = sys.argv[1]
# my_nc_file = '../data/andro1000.nc'
fh = Dataset(my_nc_file, mode='r')

LON=fh.variables['longitude'][:]
LAT=fh.variables['latitude'][:]
UC=fh.variables['UVEL'][:]
VC=fh.variables['VVEL'][:]
fh.close()

lo1=0.5
lo2=359.5
nx=360
la1=80.5
la2=-75.5
ny=157

evelf=[]
nvelf=[]
for i in range(ny) :
    for j in range (nx) :
        evelf.append(UC[j, i])
        nvelf.append(VC[j, i])

#evelf=np.array(evelf)
#nvelf=np.array(nvelf)


#HEAD 1
print('[{')
print('"header":{')
print('"parameterUnit" : "m.s-1",')
print('"parameterNumber" : 2,')
print('"dx" : 1,')
print('"dy" : 1,')
print('"parameterNumberName" : "eastward velocity",')
print('"la1" : '+str(la1)+',')
print('"lo1" : '+str(lo1)+',')
print('"la2" : '+str(la2)+',')
print('"lo2" : '+str(lo2)+',')
print('"nx" : '+str(nx)+',')
print('"ny" : '+str(ny)+',')
print('"reftime" : "today",')
print('"parameterCategory" : 2')
print('},')
#DATA 1
print('"data":')
print(evelf)
print('},')
#HEAD 2
print('{')
print('"header":{')
print('"parameterUnit" : "m.s-1",')
print('"parameterNumber" : 3,')
print('"dx" : 1,')
print('"dy" : 1,')
print('"parameterNumberName" : "northward velocity",')
print('"la1" : '+str(la1)+',')
print('"lo1" : '+str(lo1)+',')
print('"la2" : '+str(la2)+',')
print('"lo2" : '+str(lo2)+',')
print('"nx" : '+str(nx)+',')
print('"ny" : '+str(ny)+',')
print('"reftime" : "today",')
print('"parameterCategory" : 2')
print('},')
#DATA 1
print('"data":')
print(nvelf)
print('}]')