import requests
from app.services.data_fetcher import DataFetcherService

class WeatherService:
    @staticmethod
    def get_geo_code_by_address(address):
        try:
            base_url = "https://geocode.maps.co/search?q={address}"
            json_data = DataFetcherService.fetch_external_data(f"{base_url}",0.5, 3)

            if not json_data:
                raise ValueError('No coordinates exist')

            geo_code = {
                'x': json_data[0]['lat'],
                'y': json_data[0]['lon']
            }

            return geo_code
        except requests.exceptions.RequestException as error:
            print('Error:', error)

    @staticmethod
    def get_weather_data_by_geo_code(geo_code):
        geo_code_string = f'{geo_code["x"]},{geo_code["y"]}'

        weather_data_response = requests.get(f'https://api.weather.gov/points/{geo_code_string}')
        weather_data = weather_data_response.json()
        observation_station = weather_data['properties']['observationStations']

        closest_station_response = requests.get(observation_station)
        closest_station = closest_station_response.json()
        station_name = closest_station['features'][0]['properties']['name']

        station_latest_data_response = requests.get(f'{closest_station["features"][0]["id"]}/observations')
        station_latest_data = station_latest_data_response.json()

        return station_latest_data

    @staticmethod
    def get_nearest_station_data(address):
        geo_code = WeatherService.get_geo_code_by_address(address)
        if geo_code:
            weather_data = WeatherService.get_weather_data_by_geo_code(geo_code)
        return weather_data
