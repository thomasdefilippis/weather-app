import React, { useState } from 'react';
import ApiService from '../services/ApiService';

type WeatherData = {
  error?: string,
  location?: string
}

interface ChildProps {
  setWeatherData: (newState: WeatherData) => void;
  isLoading: boolean;
  setIsLoading: (newState: boolean) => void;
  setError: (newState: string) => void;
  setShowAddress: (newState: boolean) => void;
}



const SearchBar: React.FC<ChildProps> = ({ setWeatherData, isLoading, setIsLoading, setError, setShowAddresses }) => {
  const [address, setAddress] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      setError('')
      const weatherData:WeatherData = await ApiService.getNearestStationData(address);
      console.log(weatherData)
      if (weatherData.error) {
        throw Error(weatherData.error)
      }
      setWeatherData(weatherData)
    } catch(error) {
      setWeatherData([])
      setError(error.message)
    } finally {
      setShowAddresses(true);
      setIsLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by Address"
          value={address}
          onChange={handleSearch}
          className="border text-black border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
