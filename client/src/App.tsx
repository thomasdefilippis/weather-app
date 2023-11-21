import WeatherForm from './components/WeatherForm';
import MainLayout from './components/MainLayout';

function App() {

  return (
    <MainLayout>
      <section className="bg-white shadow-md p-12 pb-24 rounded-md">
        <WeatherForm />
      </section>
    </MainLayout>
  );
}

export default App;
