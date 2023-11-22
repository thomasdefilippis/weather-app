import { useState } from 'react';
import WeatherData from '../types/WeatherData'
import WeatherResults from './WeatherResults';
import SearchBar from './SearchBar';
import React from 'react';

const WeatherForm: React.FC = () => {
  const [weatherData, setWeatherData] = useState<Array<WeatherData>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentMinMaxTemps, setCurrentMinMaxTemps] = useState<Array<JSX.Element>>([]);
  const [showAddresses, setShowAddresses] = useState<boolean>(false)

  return (
    <div>
      <SearchBar
        setWeatherData={setWeatherData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setError={setError}
        setShowAddresses={setShowAddresses}
        setCurrentMinMaxTemps={setCurrentMinMaxTemps}
      />
      <WeatherResults
        weatherData={weatherData}
        isLoading={isLoading}
        error={error}
        showAddresses={showAddresses}
        setShowAddresses={setShowAddresses}
        currentMinMaxTemps={currentMinMaxTemps}
        setCurrentMinMaxTemps={setCurrentMinMaxTemps}
      />
    </div>
  );
};

export default WeatherForm;
