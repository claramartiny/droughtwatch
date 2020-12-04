import ee

ee.Authenticate()
ee.Initialize()

task = ee.batch.Export.image.toDrive(image=my_image,  # an ee.Image object.
                                     region=my_geometry,  # an ee.Geometry object.
                                     description='mock_export',
                                     folder='gdrive_folder',
                                     fileNamePrefix='mock_export',
                                     scale=30,
                                     crs='EPSG:4326')