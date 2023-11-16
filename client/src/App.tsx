import logo from './logo.svg';
import './App.css';

import WeatherResults from './components/WeatherResults';
import SearchBar from './components/SearchBar';
import WeatherForm from './components/WeatherForm';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-red-500">
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div className="container">
          <WeatherForm/>
        </div>
      </header>
    </div>
  );
}

export default App;
