// copy code below in https://code.earthengine.google.com/

var StartDate = '2017-09-15';
var EndDate = '2020-12-03';

// Fetch region and rectangle from cropping_coordinates.py

var rectangle1 = ee.Geometry.Rectangle([-68.5085,0.0128,-68.4906,0.0307]);

var selectors = ['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10','B11']

var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT')
                  .filterBounds(rectangle1)
                  .filterDate(StartDate, EndDate)
                  .sort('CLOUD_COVER')
                  .select(selectors)
                  .first();


print(selectors)

var image_export_options = {
  'patchDimensions': [65, 65]};

 Export.image.toDrive({
  image:dataset,
  region:rectangle1,
  description: 'Amazonia5',
  dimensions:'65x65',
  fileFormat:'TFRecord',
  formatOptions: image_export_options,
})

Map.centerObject(rectangle1)
Map.addLayer(dataset,{bands:['B4','B3','B2'],min:0,max:13000}, 'rgb')
Map.addLayer(rectangle1,{color:'red'},'testregion')
