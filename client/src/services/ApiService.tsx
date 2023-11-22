
const ApiService = (() => {

  const getNearestStationData = async (address: string): Promise<object> => {
    const baseApi = 'http://127.0.0.1:8080';
    const weatherDataResponse = await fetch(baseApi + '/get-weather-data-by-address?address='+ address);
    const weatherData = await weatherDataResponse.json();
    return weatherData;
  };

  return {
    getNearestStationData,
  };
})();

export default ApiService;
