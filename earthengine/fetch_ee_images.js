// copy code below in https://code.earthengine.google.com/

var StartDate = '2020-10-12';
var EndDate = '2020-12-03';

// Fetch region and rectangle from cropping_coordinates.py
var region = '[[0.186205,36.288562],[0.177622,36.288562], [0.186205, 36.315341],[0.177622, 36.315341]]';
var rectangle = [0.186205,36.315341,0.177622,36.288562];


var rectangle1 = ee.Geometry.Rectangle(rectangle);

var selectors = ['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10','B11']

var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT')
                  .filterBounds(rectangle1)
                  .filterDate(StartDate, EndDate)
                  .select(selectors)
                  .first();

print(selectors)

var image_export_options = {
  'patchDimensions': [65, 65]}
  
Export.image.toDrive({
  image:dataset,
  description: 'Testearthengine1',
  dimensions:'65x65',
  scale:30,
  fileFormat:'TFRecord',
  formatOptions: image_export_options,
})