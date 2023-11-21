
const ApiService = (() => {

  const getNearestStationData = async (address: string): Promise<object> => {
    const weatherDataResponse = await fetch('http://127.0.0.1:8080/get-weather-data-by-address?address='+ address);
    const weatherData = await weatherDataResponse.json();
    // weatherData[0].features.forEach(element => {
    //   console.log(element.properties.temperature)
    // });
    // console.log(weatherData[0].features[100].properties)
    return weatherData;
  };

  // Expose only what you want to be public
  return {
    getNearestStationData,
  };
})();

export default ApiService;
