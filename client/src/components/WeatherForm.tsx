import { useState } from 'react';
import WeatherResults from './WeatherResults';
import MinMaxByDate from '../types/MinMaxTempByDate';
import SearchBar from './SearchBar';

const WeatherForm: React.FC = () => {
  const [weatherData, setWeatherData] = useState<Array<{error?:string, location: string}>>([]);
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
