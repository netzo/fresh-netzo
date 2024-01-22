# Readme

## Data Sources

The idea is to use the [PurpleAir](https://www.purpleair.com/) data. However, the API is rate limited and to avoid any issues, we will make single requests to the API and store the data locally.


### Monterrey area:

  - nwlat: 25.675258,
  - nwlng: -100.419332,
  - selat: 25.603141,
  - selng: -100.311497


URL:https://api.purpleair.com/v1/sensors?fields=name,location_type,latitude,longitude,altitude,position_rating,humidity,temperature,pressure,voc,ozone1,scattering_coefficient,deciviews,visual_range,pm1.0_atm,pm2.5_atm,pm10.0_atm,0.3_um_count,0.5_um_count,1.0_um_count,2.5_um_count,5.0_um_count,10.0_um_count,pm2.5_10minute,pm2.5_30minute,pm2.5_60minute,pm2.5_6hour,pm2.5_24hour,pm2.5_1week&location_type=0&nwlng=-100.649769&nwlat=25.92485&selng=-99.949567&selat=25.459363