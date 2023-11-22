import { useState } from 'react';
import WeatherData from '../types/WeatherData'
import MinMaxByDate from '../types/MinMaxTempByDate';
import React from 'react';

interface ChildProps {
  weatherData: Array<WeatherData>;
  isLoading: boolean;
  error: string;
  showAddresses:boolean;
  setShowAddresses:(newState: boolean) => void;
  currentMinMaxTemps:Array<JSX.Element>;
  setCurrentMinMaxTemps:(newState: Array<JSX.Element>) => void;
}

const WeatherResults: React.FC<ChildProps> = ({weatherData, isLoading, error, showAddresses, setShowAddresses, currentMinMaxTemps, setCurrentMinMaxTemps}) => {
  const [currentLocation, setCurrentLocation] = useState<string>('');

  const handleAddressClick = (index: number) => {
    const location = weatherData[index].location ?? '';
    setCurrentLocation(location);
    setCurrentMinMaxTemps(renderMinMaxTempByDate(weatherData[index]));
  };

  const renderMinMaxTempByDate = (weatherData: WeatherData) => {
    if(weatherData.min_max_by_date) {
      let minMaxByDate: MinMaxByDate = weatherData.min_max_by_date;
      const minMaxTemps = Object.entries(minMaxByDate).map(([date, temps], index) => (
        <div key={"min-max-by-date-" + index} className="bg-white rounded-lg border border-gray-black shadow-xl p-6">
            <p className="mb-2">{date}</p>
            <p><strong>Min C: </strong>{temps.min_c}&#176;</p>
            <p><strong>Max C: </strong>{temps.max_c}&#176;</p>
            <p><strong>Min F:</strong> {temps.min_f}&#176;</p>
            <p><strong>Max F:</strong> {temps.max_f}&#176;</p>
        </div>
      ))

      setShowAddresses(false)

      return minMaxTemps
    }

    return [];
  };

  const items = weatherData.map((item, index) => (
    <div key={"loation-" + index} onClick={() => {handleAddressClick(index)}}  className="bg-white rounded-lg border border-gray-black shadow-xl p-6 cursor-pointer  hover:opacity-80">
      <p>{item.location}</p>
    </div>
  ));


  return (
    <section>
      {isLoading ? (
        <div className="flex justify-center mt-4">
          <div className="spinner border-t-4 border-blue-500 border-solid rounded-full h-16 w-16 animate-spin"></div>
        </div>
      ) : (
        <div>
          <div>
            <h2 className="w-full text-center text-red-500 font-bold mt-6">{error}</h2>
            <div className={`w-full flex flex-col space-y-4 mt-6 ${(weatherData.length < 1 || !showAddresses) ? 'hidden' : ''}`} >
              <h2 className="w-full text-center font-bold">Do any of the following match your address?</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                {items}
              </div>
            </div>
            <div className={`w-full flex flex-col space-y-4 mt-6 ${currentMinMaxTemps.length < 1 || showAddresses ? 'hidden' : ''}`} >
              <div className="w-full flex flex-col items-center space-y-4">
                <h2 className='font-bold'>Available Data for:</h2>
                <p className='w-80'>{currentLocation}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                {currentMinMaxTemps}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WeatherResults;
