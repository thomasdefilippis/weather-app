import React, { useState } from 'react';
import ApiService from '../services/ApiService';
import WeatherData from '../types/WeatherData'

interface ChildProps {
  setWeatherData: (newState: Array<WeatherData>) => void;
  isLoading: boolean;
  setIsLoading: (newState: boolean) => void;
  setError: (newState: string) => void;
  setShowAddresses: (newState: boolean) => void;
  setCurrentMinMaxTemps: (newState: Array<JSX.Element>) => void;
}



const SearchBar: React.FC<ChildProps> = ({setWeatherData, isLoading, setIsLoading, setError, setShowAddresses }) => {
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
    <section className=" mt-8 lg:flex-row">
      <form className='flex flex-col items-center justify-center lg:flex-row lg:space-x-2' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by US city,state or zip"
          value={address}
          onChange={handleSearch}
          className="border w-full text-black border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 lg:w-80"
        />
        <button
          type="submit"
          className="bg-blue-500 w-full text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 lg:w-auto"
        >
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
