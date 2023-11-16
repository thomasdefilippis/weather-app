import { stat } from "fs";
import GeoCode from "../interfaces/GeoCode";


const ApiService = (() => {
  // Private function to get geocode by address
  const getGeoCodeByAddress = async (address: string): Promise<GeoCode | undefined> => {
    try {
      const response = await fetch('https://geocode.maps.co/search?q=' + address + ',US');
      const jsonData = await response.json();
      console.log(jsonData);

      if(jsonData.length < 1) {
        throw new Error('No coordinates exist');
      }
      const geoCode = {
        x: jsonData[0].lat,
        y: jsonData[0].lon
      }

      return geoCode;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Private function to get weather data by geocode
  const getWeatherDataByGeoCode = async (geoCode: GeoCode): Promise<string> => {
    const geoCodeString = geoCode.x + ',' + geoCode.y;

    const weatherDataResponse = await fetch('https://api.weather.gov/points/' + geoCodeString);
    const weatherData = await weatherDataResponse.json();
    const observationStation = weatherData.properties.observationStations;

    const closestStationResponse = await fetch(observationStation);
    const closestStation = await closestStationResponse.json();
    const stationName = closestStation.features[0].properties.name;

    const stationLatestDataResponse = await fetch(closestStation.features[0].id + '/observations');
    const stationLatestData = await stationLatestDataResponse.json();
    console.log(stationLatestData);

    return 'hello';
  };

  // Public function to get nearest station data
  const getNearestStationData = async (address: string): Promise<object> => {
    const geoCode = await getGeoCodeByAddress(address);
    console.log(geoCode);
    if(geoCode) {
      const weatherData = await getWeatherDataByGeoCode(geoCode);
    }
    return { 'hello':'hello' };
  };

  // Expose only what you want to be public
  return {
    getNearestStationData,
  };
})();

export default ApiService;
