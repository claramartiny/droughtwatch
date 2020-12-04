//----------------------------OPTION 1----------------------------

// Load a landsat image and select twelve bands.
var landsat = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_123032_20140515')
  .select(['B1','B4', 'B3', 'B2', 'B5', 'B6', 'B7', 'B8','B9','B10','B11']);

// Create a geometry representing an export region.
lat_origin = 116.2621;
lon_origin = 39.8412;

lat_final = 116.4849;
lon_final = 40.01236;

var geometry = ee.Geometry.Rectangle([lat_origin, lon_origin, lat_final, lon_final]);

// Export the image, specifying scale and region.
Export.image.toDrive({
  image: landsat,
  description: 'imageToDriveExample',
  scale: 30,
  region: geometry
});

//----------------------------OPTION 2----------------------------

/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');

  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));

  return image.updateMask(mask).divide(10000);
}

// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT')
                  .filterDate('2017-01-01', '2017-03-20')
                  // Pre-filter to get less cloudy granules.
                  // .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds);

var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B1','B4', 'B3', 'B2', 'B5', 'B6', 'B7', 'B8','B9','B10','B11'],
};

Map.setCenter(-76.6399, 1.1519, 14);
Map.addLayer(dataset.median(), rgbVis, 'RGB');

var landslide = dataset.median();

// Create a task that you can launch from the Tasks tab.
Export.image.toDrive({
  image: landslide,
  description: 'Mocoa',
  scale: 30
});


//------ OPTION 3 ----

var startDate = '2017-02-16'; //YYYY-MM-DD
var finishDate = '2017-06-15';


var region = '[[24.3624,12.2830], [24.4325,12.2830], [24.3624,12.2145], [24.4325,12.2145]]';
var rectangle = [24.3624,12.2145,24.4325,12.2830];

var rectangle1 = ee.Geometry.Rectangle(rectangle);

var dataset = ee.ImageCollection("LANDSAT/LC08/C01/T1_RT").filterBounds(rectangle1)
.filterDate(startDate, finishDate)
    .sort('system:time_start', true);

    var selectors = ["B2","B3","B4","B8","B12","QA60"]

    var mean_cloud = function(image){
          return(image.select("QA60").reduceRegion({
                reducer: ee.Reducer.mean(),
                  geometry: rectangle1,
                    scale: 10}).get('QA60'))
    };