import { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import WeatherResults from './WeatherResults';
import SearchBar from './SearchBar';

interface ApiResponse {
  data: string;
}

const WeatherForm: React.FC = () => {
  const [weatherData, setWeatherData] = useState<string>('Initial State');
  const [loading, setLoading] = useState<boolean>(true);


  const updateWeatherData = (newState: string) => {
    setWeatherData(newState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response =

        // console.log(response);

        // // if (response.ok) {
        // //   const jsonData: ApiResponse = await response.json();
        // //   setApiData(jsonData.data);
        // // } else {
        // //   console.error('Error fetching data from the API');
        // // }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <SearchBar updateWeatherData={updateWeatherData}/>
      <WeatherResults />
    </div>
  );
};

export default WeatherForm;
