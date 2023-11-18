
const ApiService = (() => {

  const getNearestStationData = async (address: string): Promise<object> => {
    console.log('hello');
    const weatherDataResponse = await fetch('http://127.0.0.1:8080/get-weather-data-by-address?address='+ address);
    const weatherData = await weatherDataResponse.json();
    console.log(weatherData)
    // weatherData[0].features.forEach(element => {
    //   console.log(element.properties.temperature)
    // });
    // console.log(weatherData[0].features[100].properties)
    return { 'hello':'hello' };
  };

  // Expose only what you want to be public
  return {
    getNearestStationData,
  };
})();

export default ApiService;
