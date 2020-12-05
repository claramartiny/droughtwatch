import math

# Distances are measured in kilometers.
# Longitudes and latitudes are measured in degrees.
# Earth is assumed to be perfectly spherical.

earth_radius = 6271.0
degrees_to_radians = math.pi/180.0
radians_to_degrees = 180.0/math.pi

def change_in_latitude(kms):
    '''Given a distance north, return the change in latitude.'''
    return (kms/earth_radius)*radians_to_degrees

def change_in_longitude(latitude, kms):
    '''Given a latitude and a distance west, return the change in longitude.'''
    # Find the radius of a circle around the earth at given latitude.
    r = earth_radius*math.cos(latitude*degrees_to_radians)
    return (kms/r)*radians_to_degrees

def four_km_square(latitude, longitude):
    '''Returns square of ~4 km'''
    # size = 1.95*1.95 km  ---> Size of pics for DroughtWatch
    delta = 1.95 / 2 # delta = size of square / 2
    slat, nlat = latitude+change_in_latitude(-delta), latitude+change_in_latitude(delta)
    wlon = longitude+change_in_longitude(latitude,-delta)
    elon = longitude+change_in_longitude(latitude, delta)
    return(nlat, wlon, slat, elon)

def main(lon, lat):
    '''First argument degrees longitude (E is positive, W negative)
        of the landslide location,
        second argument latitude (N positive, S negative),
        in decimal format(not minutes etc.)'''
    nlat, wlon, slat, elon = four_km_square(lat,lon) 
    print("var region = '[[{:.4f},{:.4f}], [{:.4f},{:.4f}], [{:.4f},{:.4f}], [{:.4f},{:.4f}]]';".format(wlon,nlat,elon,nlat,wlon,slat,elon,slat))
    print("var rectangle = [{:.4f},{:.4f},{:.4f},{:.4f}];".format(wlon,slat,elon,nlat))

#change these to longitude, latitude
main(24.397475630673995, 12.248784522785822) # sample lon lat of Sahara desert