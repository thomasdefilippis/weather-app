import { useState } from 'react';
import WeatherData from '../types/WeatherData'
import MinMaxByDate from '../types/MinMaxTempByDate';

interface ChildProps {
  weatherData: WeatherData;
  isLoading: boolean;
  error:string;
  showAddresses:boolean;
  setShowAddresses:(newState: boolean) => void;
  currentMinMaxTemps:Array<JSX.Element>;
  setCurrentMinMaxTemps:(newState: Array<JSX.Element>) => void;
}

const WeatherResults: React.FC<ChildProps> = ({weatherData, isLoading, error, showAddresses, setShowAddresses, currentMinMaxTemps, setCurrentMinMaxTemps}) => {
  const [currentLocation, setCurrentLocation] = useState<string>('');

  const handleAddressClick = (index: number) => {
    setCurrentMinMaxTemps(renderMinMaxTempByDate(weatherData[index]));
  };

  const renderMinMaxTempByDate = (weatherData: WeatherData) => {
    console.log(weatherData.min_max_by_date)
    if(weatherData.min_max_by_date) {
      let minMaxByDate: MinMaxByDate = weatherData.min_max_by_date;
      const minMaxTemps = Object.entries(minMaxByDate).map(([date, temps], index) => (
        <div key={"min-max-by-date-" + index} className="bg-white rounded-lg border border-gray-black shadow-xl p-6">
          <a>
            <p>{date}</p>
            <p><strong>Min C: </strong>{temps.min_c}, <strong>Max C:</strong>{temps.max_c}</p>
            <p><strong>Min F:</strong> {temps.min_f}, <strong>Max F:</strong> {temps.max_f}</p>
          </a>
        </div>
      ))

      setShowAddresses(false)

      return minMaxTemps
    }

    return [];
  };

  const items = weatherData.map((item, index) => (
    <a key={"loation-" + index} onClick={() => {console.log('hello');handleAddressClick(index)}}  className="bg-white rounded-lg border border-gray-black shadow-xl p-6 cursor-pointer  hover:opacity-80">
      <p>{item.location}</p>
    </a>
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
              <div className="grid grid-cols-5 gap-x-4">
                {items}
              </div>
            </div>
            <div className={`w-full flex flex-col space-y-4 mt-6 ${currentMinMaxTemps.length < 1 || showAddresses ? 'hidden' : ''}`} >
              <h2 className="w-full text-center font-bold">Available Data</h2>
              <div className="grid grid-cols-5 gap-4">
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
