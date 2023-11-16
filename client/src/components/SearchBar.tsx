import React, { useState } from 'react';
import ApiService from '../services/ApiService';

interface ChildProps {
  updateWeatherData: (newState: string) => void;
}

const SearchBar: React.FC<ChildProps> = ({ updateWeatherData }) => {
  const [address, setAddress] = useState<string>('');


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const geoCode = await ApiService.getNearestStationData(address);
    // Add your search logic here
    // console.log('Search term:', searchTerm);
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
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
