var StartTime = Date.now();
var today = new Date();
var dd = today.getDate() - 1;
if(dd<10){dd='0'+dd.toString();} else{dd=dd.toString();}
var mm = today.getMonth() + 1; //January is 0!
if(mm<10){mm='0'+mm.toString();} else{mm=mm.toString();}
var yyyy = today.getFullYear();
yyyy=yyyy.toString()

function initDemoMap(){
//BASE TILE LAYER 1
  var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
    'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });
//BASE TILE LAYER 2
  var Esri_DarkGreyCanvas = L.tileLayer(
    "http://{s}.sm.mapstack.stamen.com/" +
    "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
    "{z}/{x}/{y}.png",
    {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
      'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    }
  );
//BASE TILE LAYER 3
  var Stamen_Toner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by Stamen Design, CC BY 3.0 &mdash; Map data &copy; OpenStreetMap',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  });
//
  var Esri_Oceans = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Sources: Esri, GEBCO, NOAA, National Geographic, DeLorme, HERE, Geonames.org, and other contributors'
  });
  var Esri_Topo = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Sources: Esri, HERE, DeLorme, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN,' + 
	' Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), swisstopo, MapmyIndia, &copy;  OpenStreetMap' + 
	' contributors, and the GIS User Community'
  });

//BASE TILE GROUP LAYER
  var baseLayers = {
    "Satellite": Esri_WorldImagery,
    "Oceans ": Esri_Oceans,
    "Grey ": Esri_DarkGreyCanvas,
    "Topo ": Esri_Topo
  };
//MAP STRUCTURE
  var map = L.map('map', {
    layers: [ Esri_WorldImagery ],
    minZoom : 2,
    worldCopyJump: true,
    inertia: false
  });

//MENU CREATION
  var layerControl = L.control.layers(baseLayers);
  layerControl.addTo(map);
  map.setView([20, -45], 3);
//MINI MAP
  var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttrib='Map data &copy; OpenStreetMap contributors';
  L.tileLayer(osmUrl, {attribution: osmAttrib, id: 'mapbox.streets'}).addTo(map);
  var osm2 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 1, attribution: osmAttrib });
  var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(map);  
//MOUSE POSITION BOTTOM LEFT
  L.control.mousePosition().addTo(map);
//CREDIT FOR ARGO-FRANCE LOGO
  var credctrl = L.controlCredits({
  image: "dist/ArgoFR_Logo_80.png",
  link: "http://www.argo-france.fr/",
  text: "<center><b>Argo<br>France</b></center>",
  width: 80,
  height: 85
  }).addTo(map);
//INIT RETURN FUNCTION
  return {
    map: map,
    layerControl: layerControl
  };
}

// MAP CREATION
var mapStuff = initDemoMap();
var map = mapStuff.map;
// MENU
var layerControl = mapStuff.layerControl;

//ICON FOR SELECTED FLOAT
// ico0 = {iconShape: 'doughnut', borderWidth: 4, borderColor: '#50f308'};
ico0 = {iconShape: 'doughnut', iconSize: [16,16], iconAnchor: [8,8], borderWidth: 5, borderColor: '#f00', backgroundColor: '#f99'}
var curmarker = L.marker([0,0],{icon: L.BeautifyIcon.icon(ico0)});

//ICON FOR IFREMER FLOAT:
// ico1 = {iconShape: 'circle-dot', borderWidth: 4, borderColor: '#fdfe02'};
// ico1 = {icon: 'beautify', iconSize: [11,11], borderWidth: 1, borderColor: '#000', backgroundColor: '#fdfe02'};
ico1 = {iconShape: 'doughnut', iconSize: [10,10], iconAnchor: [5,5], borderWidth: 1, borderColor: '#000', backgroundColor: '#fdfe02'}

//ICON FOR ANY OTHER FLOAT:
// ico2 = {iconShape: 'circle-dot', borderWidth: 3, borderColor: '#ffffff'};
// ico2 = {icon: 'beautify', iconSize: [7,7], borderWidth: 1, borderColor: '#000', backgroundColor: '#fff'};
// ico2 = {iconShape: 'doughnut', iconSize: [8,8], iconAnchor: [4,4], borderWidth: 1, borderColor: '#000', backgroundColor: '#33ff77'}
// ico2 = {iconShape: 'doughnut', iconSize: [8,8], iconAnchor: [4,4], borderWidth: 1, borderColor: '#000', backgroundColor: '#999'}
ico2 = {iconShape: 'doughnut', iconSize: [8,8], iconAnchor: [4,4], borderWidth: 1, borderColor: '#000', backgroundColor: '#eee'}

//ICON FOR FLOAT TRAJECTORY:
// ico3 = {iconShape: 'circle-dot', borderWidth: 4, borderColor: '#7de0ba'};
// ico3 = {icon: 'beautify', iconAnchor: [0,0], iconSize: [7,7], borderWidth: 1, borderColor: '#000', backgroundColor: '#7de0ba'};
ico3 = {iconShape: 'doughnut', iconSize: [8,8], iconAnchor: [4,4], borderWidth: 1, borderColor: '#000', backgroundColor: '#7de0ba'}

//TRAJ LAYER, EMPTY AT START
var majaxLayer=L.layerGroup();
var majaxLayerLine=L.layerGroup(); 
map.addLayer(majaxLayer);
//CADDY LAYER, EMPTY AT START
var caddyLayer=L.layerGroup();
map.addLayer(caddyLayer);

//SIDE PANEL
var sidebar = L.control.sidebar('sidebar', {
  closeButton: true,
  position: 'left',
  autoPan: false
});
map.addControl(sidebar);

//DATA LAYERS

//SST VIA CMEMS WMS
var wmsLayer0 = L.tileLayer.wms('http://nrt.cmems-du.eu/thredds/wms/METOFFICE-GLO-SST-L4-NRT-OBS-SST-V2?', {
   layers: 'analysed_sst',
   opacity: 0.35,
   colorscalerange: '271.0,303.0',
   abovemaxcolor: "extend",
   belowmincolor: "extend",
   numcolorbands: 30,
   time: yyyy+'-'+mm+'-'+dd+'T12:00:00.000Z',
   styles: 'boxfill/rainbow'
});
htmlsst='<font color="magenta">SST '+yyyy+'-'+mm+'-'+dd+'</font> <a target="_blank" href="http://marine.copernicus.eu/services-portfolio/access-to-products/?option=com_csw&view=details&product_id=SST_GLO_SST_L4_NRT_OBSERVATIONS_010_014"><img src="dist/info.png" height="15" width="15"></a>';
Spansst="<span id='ssttag'>"+htmlsst+"</span>"
layerControl.addOverlay(wmsLayer0,Spansst,"SST");

//SEA ICE VIA CMEMS WMS
var wmsLayer1 = L.tileLayer.wms('http://nrt.cmems-du.eu/thredds/wms/METNO-GLO-SEAICE_CONC-NORTH-L4-NRT-OBS?', {
   layers: 'ice_conc',
   opacity: 0.35,   
   colorscalerange: '0.0,99.9',
   abovemaxcolor: "extend",
   belowmincolor: "extend",
   numcolorbands: 30,    
   time: yyyy+'-'+mm+'-'+dd+'T12:00:00.000Z',
   styles: 'boxfill/rainbow'
});
htmlSI1='<font color="green">Arctic '+yyyy+'-'+mm+'-'+dd+'</font> <a target="_blank" href="http://marine.copernicus.eu/services-portfolio/access-to-products/?option=com_csw&view=details&product_id=SEAICE_GLO_SEAICE_L4_NRT_OBSERVATIONS_011_001"><img src="dist/info.png" height="15" width="15"></a>';
SpanSI1="<span id='seaice1tag'>"+htmlSI1+"</span>"
layerControl.addOverlay(wmsLayer1,SpanSI1,"Sea Ice Concentration");
//
var wmsLayer2 = L.tileLayer.wms('http://nrt.cmems-du.eu/thredds/wms/METNO-GLO-SEAICE_CONC-SOUTH-L4-NRT-OBS?', {
    layers: 'ice_conc',
    opacity: 0.35,
    colorscalerange: '0.0,99.9',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    numcolorbands: 30,    
    time: yyyy+'-'+mm+'-'+dd+'T12:00:00.000Z',
    styles: 'boxfill/rainbow'    
});
htmlSI2='<font color="green">Antarctic '+yyyy+'-'+mm+'-'+dd+'</font> <a target="_blank" href="http://marine.copernicus.eu/services-portfolio/access-to-products/?option=com_csw&view=details&product_id=SEAICE_GLO_SEAICE_L4_NRT_OBSERVATIONS_011_001"><img src="dist/info.png" height="15" width="15"></a>';
SpanSI2="<span id='seaice2tag'>"+htmlSI2+"</span>"
layerControl.addOverlay(wmsLayer2,SpanSI2,"Sea Ice Concentration");

// AVISO
$.getJSON('data/aviso.json', function (data) {
  var velocityLayer1 = L.velocityLayer({
    displayValues: true,
    displayOptions: {
      velocityType : 'Aviso Surface currents',
      displayPosition: 'bottomleft',
      displayEmptyString: 'No current data'
    },
    data: data,
    maxVelocity: 1,
    velocityScale: 0.3
	// colorScale: palette('tol-sq', 10)
  });
  htmlName1='<font color="red">Surface Aviso currents from '+yyyy+'-'+mm+'-'+dd+'</font> <a target="_blank" href="https://www.aviso.altimetry.fr/en/data/products/sea-surface-height-products/global/madt-h-uv.html"><img src="dist/info.png" height="15" width="15"></a>'
  layerControl.addOverlay(velocityLayer1, htmlName1);
  console.log("AVISO : " + (Date.now()-StartTime) + "ms");
  map.addLayer(velocityLayer1); //Default display when page loads
});

// AVISO MDT
var mdtpal = palette('cb-Reds', 8)
for (var i = 0; i < mdtpal.length; i+=1){mdtpal[i] = "#" + mdtpal[i]}
$.getJSON('data/aviso_mdt.json', function (data) {
  var velocityLayer2 = L.velocityLayer({
    displayValues: true,
    displayOptions: {
      velocityType : 'Aviso Surface currents',
      displayPosition: 'bottomleft',
      displayEmptyString: 'No current data'
    },
    data: data,
    maxVelocity: 1,
    velocityScale: 0.7,
	colorScale: mdtpal
  });
  htmlName2='<font color="red">Surface Aviso mean currents (mdt-2013)</font> <a target="_blank" href="https://www.aviso.altimetry.fr/fr/donnees/produits/produits-auxiliaires/mdt.html"><img src="dist/info.png" height="15" width="15"></a>'
  layerControl.addOverlay(velocityLayer2, htmlName2);
  console.log("AVISO MDT : " + (Date.now()-StartTime) + "ms");
});


// ANDRO 1000
var deepal = palette('cb-BuGn', 8)
for (var i = 0; i < deepal.length; i+=1){deepal[i] = "#" + deepal[i]}
$.getJSON('data/andro1000.json', function (data) {
  var velocityLayer3 = L.velocityLayer({
    displayValues: true,
    displayOptions: {
      velocityType : 'Andro deep velocity',
      displayPosition: 'bottomleft',
      displayEmptyString: 'No velocity data'
    },
    data: data,
    minVelocity: 0,
    maxVelocity: 0.075,
    velocityScale: 5,
	colorScale: deepal
  });
  htmlName3='<font color="red">Andro deep velocity (1000m depth)</font> <a target="_blank" href="https://wwz.ifremer.fr/lpo/Produits/ANDRO"><img src="dist/info.png" height="15" width="15"></a>'
  layerControl.addOverlay(velocityLayer3, htmlName3);
  console.log("ANDRO : " + (Date.now()-StartTime) + "ms");
});

// ANDRO 200
var deepal = palette('cb-Purples', 8)
for (var i = 0; i < deepal.length; i+=1){deepal[i] = "#" + deepal[i]}
$.getJSON('data/andro200.json', function (data) {
  var velocityLayer4 = L.velocityLayer({
    displayValues: true,
    displayOptions: {
      velocityType : 'Andro deep velocity',
      displayPosition: 'bottomleft',
      displayEmptyString: 'No velocity data'
    },
    data: data,
    minVelocity: 0,
    maxVelocity: 0.075,
    velocityScale: 5,
	colorScale: deepal
  });
  htmlName4='<font color="red">Andro deep velocity (200m depth)</font> <a target="_blank" href="https://wwz.ifremer.fr/lpo/Produits/ANDRO"><img src="dist/info.png" height="15" width="15"></a>'
  layerControl.addOverlay(velocityLayer4, htmlName4);
  console.log("ANDRO : " + (Date.now()-StartTime) + "ms");
});


//ARGO DAY
var mapdata=Data_ARGO;
var argomarkers = L.layerGroup();
for (var i = 0; i < mapdata.length; i++)
{
  if(mapdata[i].Institution == 'IF') {
    var marker = L.marker([mapdata[i].latitude,mapdata[i].longitude],{title: mapdata[i].Platform,icon: L.BeautifyIcon.icon(ico1)});
  }
  else {
    var marker = L.marker([mapdata[i].latitude,mapdata[i].longitude],{title: mapdata[i].Platform,icon: L.BeautifyIcon.icon(ico2)});
  }
  //ONCLIK, CALL SUBMARKERCLICK FUNCTION (SIDE PANEL + TRAJ)
  marker.on('click',L.bind(SubMarkerClick,null,mapdata[i]));
  marker.addTo(argomarkers);
};
htmlName4='<font color="blue">Argo profiles from yesterday ('+yyyy+'-'+mm+'-'+dd+')</font>'
layerControl.addOverlay(argomarkers, htmlName4);

//ARGO 10 DAYS
var mapdata2=Data_ARGO10;
var argomarkers2 = L.layerGroup();
for (var i = 0; i < mapdata2.length; i++)
{
  if(mapdata2[i].Institution == 'IF') {
    var marker = L.marker([mapdata2[i].latitude,mapdata2[i].longitude],{title: mapdata2[i].Platform,icon: L.BeautifyIcon.icon(ico1)});
  }
  else {
    var marker = L.marker([mapdata2[i].latitude,mapdata2[i].longitude],{title: mapdata2[i].Platform,icon: L.BeautifyIcon.icon(ico2)});
  }
  //ONCLIK, CALL SUBMARKERCLICK FUNCTION (SIDE PANEL + TRAJ)
  marker.on('click',L.bind(SubMarkerClick,null,mapdata2[i]));
  marker.addTo(argomarkers2);
};
htmlName5='<font color="blue">Argo profiles from the last 10 days</font>'
layerControl.addOverlay(argomarkers2, htmlName5);
//DEFAULT DISPLAY
map.addLayer(argomarkers2);

//ARGO 30 DAYS DEEP
var mapdata3=Data_ARGO30DEEP;
var argomarkers3 = L.layerGroup();
for (var i = 0; i < mapdata3.length; i++)
{
  if(mapdata3[i].Institution == 'IF') {
    var marker = L.marker([mapdata3[i].latitude,mapdata3[i].longitude],{title: mapdata3[i].Platform,icon: L.BeautifyIcon.icon(ico1)});
  }
  else {
    var marker = L.marker([mapdata3[i].latitude,mapdata3[i].longitude],{title: mapdata3[i].Platform,icon: L.BeautifyIcon.icon(ico2)});
  }
  //ONCLIK, CALL SUBMARKERCLICK FUNCTION (SIDE PANEL + TRAJ)
  marker.on('click',L.bind(SubMarkerClick,null,mapdata3[i]));
  marker.addTo(argomarkers3);
};
htmlName6='<font color="blue">Argo Deep floats profiles from the last 30 days</font>'
layerControl.addOverlay(argomarkers3, htmlName6);


//TRAJ ALREADY PLOTTED, IF insTraj==1 AND CLICK ON TRAJ WE DON'T PLOT THE SAME TRAJECTORY
insTraj=0;
pl='0';

//SIDE PANEL MANAGEMENT
function SubMarkerClick(smarker) {
  //DOUGHNUT MARKER ON THE SELECTED FLOAT
  curmarker.setLatLng([smarker.latitude,smarker.longitude]);
  curmarker.addTo(map);
  //CLEAR ANY EXISTING TRAJECTORIES IF CLICK OUTSIDE THE PLOTTED TRAJECTORY
  if(smarker.Platform!=pl){
	majaxLayer.clearLayers();
	majaxLayerLine.clearLayers();
	insTraj=0;
  }
  //ERDDAP URLs
  ti=smarker.Time;
  pl=smarker.Platform;
  inst=smarker.Institution;
  tempurl="https://www.ifremer.fr/erddap/tabledap/ArgoFloats.png?temp,pres,psal&time="+ti.substr(0,4)+"-"+ti.substr(4,2)+"-"+ti.substr(6,2)+"T"+ti.substr(8,2)+"%3A"+ti.substr(10,2)+"%3A"+ti.substr(12,2)+"Z&platform_number=%22"+pl+"%22&.draw=linesAndMarkers&.yRange=%7C%7Cfalse";
  psalurl="https://www.ifremer.fr/erddap/tabledap/ArgoFloats.png?psal,pres,temp&time="+ti.substr(0,4)+"-"+ti.substr(4,2)+"-"+ti.substr(6,2)+"T"+ti.substr(8,2)+"%3A"+ti.substr(10,2)+"%3A"+ti.substr(12,2)+"Z&platform_number=%22"+pl+"%22&.draw=linesAndMarkers&.yRange=%7C%7Cfalse";
  trajurl="https://www.ifremer.fr/erddap/tabledap/ArgoFloats.png?longitude,latitude,time&platform_number=%22"+pl+"%22&.draw=linesAndMarkers";
  graphurl="https://www.ifremer.fr/erddap/tabledap/ArgoFloats.graph?temp,pres,psal&time="+ti.substr(0,4)+"-"+ti.substr(4,2)+"-"+ti.substr(6,2)+"T"+ti.substr(8,2)+"%3A"+ti.substr(10,2)+"%3A"+ti.substr(12,2)+"Z&platform_number=%22"+pl+"%22&.draw=linesAndMarkers&.yRange=%7C%7Cfalse";

  //AJAX REQUEST FOR PROJECT, PI AND MODEL 
  $.ajax({
  url:"https://www.ifremer.fr/erddap/tabledap/ArgoFloats.json?project_name%2Cpi_name%2Cplatform_type&platform_number=%22"+pl+"%22&distinct()",
  dataType: 'jsonp',
  jsonp: '.jsonp',
  cache: 'true',
  success: function (data) {
        document.getElementById("ajproject").textContent = (data.table.rows[0][0]);
        document.getElementById("ajpi").textContent = (data.table.rows[0][1]);
        document.getElementById("ajmodel").textContent = (data.table.rows[0][2]);
  },
  type: 'GET'
  });
  //AJAX REQUEST FOR TEMPERATURE PROFILE
  $.ajax({
    url:"https://www.ifremer.fr/erddap/tabledap/ArgoFloats.json?pres%2Ctemp&platform_number=%22"+pl+"%22&time="+ti.substr(0,4)+"-"+ti.substr(4,2)+"-"+ti.substr(6,2)+"T"+ti.substr(8,2)+"%3A"+ti.substr(10,2)+"%3A"+ti.substr(12,2)+"Z",
    dataType: 'jsonp',
    jsonp: '.jsonp',
    cache: 'true',
    success: function (data) {
        optionsT.series[0].data = data.table.rows;
        var chart = new Highcharts.Chart(optionsT);
  },
  type: 'GET'
  });
  //AJAX DISPLAY FOR SALINITY DISPLAY
  $.ajax({
  url:"https://www.ifremer.fr/erddap/tabledap/ArgoFloats.json?pres%2Cpsal&platform_number=%22"+pl+"%22&time="+ti.substr(0,4)+"-"+ti.substr(4,2)+"-"+ti.substr(6,2)+"T"+ti.substr(8,2)+"%3A"+ti.substr(10,2)+"%3A"+ti.substr(12,2)+"Z",
  dataType: 'jsonp',
  jsonp: '.jsonp',
  cache: 'true',
  success: function (data) {
      optionsS.series[0].data = data.table.rows;
      var chart = new Highcharts.Chart(optionsS);
  },
  type: 'GET'
  });

  //
  sidebar.setContent("<b>FLOAT WMO : </b><a href='https://fleetmonitoring.euro-argo.eu/float/"+ pl + "' target='blank'>" + pl + "</a><br>" +
  "<b><span class='glyphicon glyphicon-important-day'></span>PROFILE DATE : </b>" + ti.substr(0,4)+"."+ti.substr(4,2)+"."+ti.substr(6,2)+"  "+ti.substr(8,2)+":"+ti.substr(10,2)+":"+ti.substr(12,2)+ "<br>" +
  "<b><span class='glyphicon glyphicon-database'></span>DAC : </b>" + inst + "<br>" +
  "<b>PROJECT : </b><span id=\"ajproject\"></span>" + "<br>" +
  "<b><span class='glyphicon glyphicon-nameplate'></span>PI : </b><span id=\"ajpi\"></span>" + "<br>" +
  "<b>FLOAT MODEL : </b><span id=\"ajmodel\"></span>" + "<br>" +
  "<b><span class='glyphicon glyphicon-link'></span><a href='" + graphurl + "' target='blank'>ACCESS TO PROFILE DATA (Ifremer erddap)</a></b>" + "<br>" +
  "<b><span class='glyphicon glyphicon-link'></span><a href='https://fleetmonitoring.euro-argo.eu/float/" + pl + "' target='blank'>ACCESS TO FLOAT MONITORING DATA (Euro-Argo dashboard)</a></b>" + "<br>" +
  //HIGHCHARTS
  "<br><div id=\"containerT\" style=\"min-width: 310px; height: 450px; max-width: 400px; margin: 0 auto\"></div><br>" +
  "<br><div id=\"containerS\" style=\"min-width: 310px; height: 450px; max-width: 400px; margin: 0 auto\"></div><br>"
   );

  sidebar.show();

  //ACCES ERDAPP VIA AJAX FOR TRAJECTORIES AND PROFILES HISTORICAL
  if(insTraj==0){
      $.ajax({
//        url:'http://www.ifremer.fr/erddap/tabledap/ArgoFloats.json?time%2Clatitude%2Clongitude&platform_number=%22'+pl+'%22&orderBy(%22time%22)',
        url:'https://www.ifremer.fr/erddap/tabledap/ArgoFloats.json?time%2Clatitude%2Clongitude&platform_number=%22'+pl+'%22&latitude>=-99.999&latitude<=89.784&longitude>=-179.999&longitude<=180&orderBy(%22time%22)',
        dataType: 'jsonp',
        jsonp: '.jsonp',
        cache: 'true',
        success: function (data) {
                  insTraj=1;
                  var mlatlon=[];
                  for (var i = 0; i < data.table.rows.length; i++)
                    {
                      ajTime=data.table.rows[i][0];
                      mlatlon.push([data.table.rows[i][1],data.table.rows[i][2]]);
                      var markaj = L.marker([data.table.rows[i][1],data.table.rows[i][2]],{title: ajTime,icon: L.BeautifyIcon.icon(ico3)});
                      var markstruct={};
                      markstruct.Time=ajTime.substr(0,4)+ajTime.substr(5,2)+ajTime.substr(8,2)+ajTime.substr(11,2)+ajTime.substr(14,2)+ajTime.substr(17,2);
                      markstruct.Platform=pl;
                      markstruct.Institution=inst;
                      markstruct.latitude=data.table.rows[i][1];
                      markstruct.longitude=data.table.rows[i][2];
                      markaj.on('click',L.bind(SubMarkerClick,null,markstruct));
                      markaj.addTo(majaxLayer);
                    };
                    // var mpoly = L.polyline(mlatlon, {color: '#45f442', smoothFactor: 0}).addTo(majaxLayer);
                    // var mpoly = L.polyline(mlatlon, {color: '#f00', smoothFactor: 0}).addTo(majaxLayer);
                    var mpoly = L.polyline(mlatlon, {color: '#8efcff', weight:3, smoothFactor: 2}).addTo(majaxLayerLine);
                    var mpoly = L.polyline(mlatlon, {color: '#45f442', weight:3, smoothFactor: 2}).addTo(majaxLayer);
                  },
      type: 'GET'
    });
}}

//REMOVE MARKER AND TRAJ WHEN CLOSING PANEL
sidebar.on('hide', function () {
     map.removeLayer(curmarker);
     majaxLayer.clearLayers();
     majaxLayerLine.clearLayers();
     insTraj=0;
 });

//DEFAUT SEARCH BAR
var controlSearch  = new L.Control.Search({layer: argomarkers2, initial: false, position:'topleft'});
map.addControl(controlSearch);
//CHANGE SEARCH LAYER
map.on('overlayadd', function(eo) {
	if (eo.name === htmlName4){controlSearch.setLayer(argomarkers);}
	else if (eo.name === htmlName5){controlSearch.setLayer(argomarkers2);}
	else if (eo.name === htmlName6){controlSearch.setLayer(argomarkers3);}
});

//SAVE CADDYLAYER BUTTONS
var caddybutton = L.easyButton('fa-plus', function(){
    majaxLayerLine.eachLayer(function (layer) {
      var cloned = cloneLayer(layer);
      cloned.addTo(caddyLayer);
        });
}).addTo(map);

//CLEAR CADDYLAYER
L.easyButton('fa-trash', function(){
    caddyLayer.clearLayers();
    controlSearch.circleLocation = false;
}).addTo(map);


//CHART OPTIONS
var optionsT={
    chart: {
        renderTo: 'containerT',
        //type: 'spline',
        inverted: true,
        zoomType: "xy"
    },
    title: {
        text: 'Temperature profile'
    },
    xAxis: {
        reversed: true,
        title: {
            enabled: true,
            text: 'Pressure'
        },
        gridLineDashStyle: 'dash',
        gridLineColor : 'gray',
        gridLineWidth : 1
    },
    yAxis: {
    		opposite: true,
        title: {
            enabled: true,
            text: 'Temperature'
        },
        lineWidth: 2,
        gridLineDashStyle: 'dash',
        gridLineColor : 'gray',
        gridLineWidth : 1
    },
    tooltip: {
        headerFormat: '',
        pointFormat: '{point.x} dbar : {point.y}°C'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
      name: "Temperature",
      lineWidth: 4,
      lineColor: "#1f4b93"
    }]
};

var optionsS={
    chart: {
        renderTo: 'containerS',
        //type: 'spline',
        inverted: true,
        zoomType: "xy"
    },
    title: {
        text: 'Salinity profile'
    },
    xAxis: {
        reversed: true,
        title: {
            enabled: true,
            text: 'Pressure'
        },
        gridLineDashStyle: 'dash',
        gridLineColor : 'gray',
        gridLineWidth : 1
    },
    yAxis: {
    		opposite: true,
        title: {
            enabled: true,
            text: 'Salinity'
        },
        lineWidth: 2,
        gridLineDashStyle: 'dash',
        gridLineColor : 'gray',
        gridLineWidth : 1
    },
    tooltip: {
        headerFormat: '',
        pointFormat: '{point.x} dbar : {point.y}'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
      name: "Salinity",
      lineWidth: 4,
      lineColor: "#1f4b93"
    }]
}
