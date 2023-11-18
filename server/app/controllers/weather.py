import requests
from fastapi import HTTPException
from app.services.data_fetcher import DataFetcherService
from app.services.weather import WeatherService
import json


class WeatherController:
    @staticmethod
    def get_geo_code_by_address(address):
        base_geo_code_url = f"https://geocode.maps.co/search?q={address}{ ',US' if address else ''}&limit=5"
        geo_code_data = DataFetcherService.fetch_external_data(f"{base_geo_code_url}",0.5, 3)
        if not geo_code_data:
            raise HTTPException(status_code=404, detail="Address does not exist.")

        geo_codes = []
        for geo_code in geo_code_data:
            geo_codes.append({
                'display_name': geo_code['display_name'],
                'x': geo_code['lat'],
                'y': geo_code['lon']
            })

        return geo_codes



    @staticmethod
    def get_weather_data_by_geo_code(geo_code):
        geo_code_string = f'{geo_code["x"]},{geo_code["y"]}'

        base_weather_url = 'https://api.weather.gov'
        print('helloadsf', f"{base_weather_url}/points/{geo_code_string}")
        weather_data = DataFetcherService.fetch_external_data(f"{base_weather_url}/points/{geo_code_string}",0.5, 3)
        if not weather_data:
            raise HTTPException(status_code=404, detail="Weather data at that address does not exist")


        observation_station = weather_data['properties']['observationStations']

        closest_station_response = requests.get(observation_station)
        closest_station = closest_station_response.json()
        station_name = closest_station['features'][0]['properties']['name']

        station_latest_data = DataFetcherService.fetch_external_data(f"{closest_station['features'][0]['id']}/observations",0.5, 3)
        if not station_latest_data:
            raise HTTPException(status_code=404, detail="Weather data at that address does not exist")

        station_latest_data['location'] = geo_code['display_name']

        return station_latest_data

    @staticmethod
    def get_nearest_station_data(address):
        geo_codes = WeatherController.get_geo_code_by_address(address)
        all_weather_data = []
        if geo_codes:
            for geo_code in geo_codes:
                weather_data = WeatherController.get_weather_data_by_geo_code(geo_code)
                weather_data['min_max_by_date'] = WeatherService.formatTemperatureMinMax(weather_data)
                all_weather_data.append(weather_data)
        return all_weather_data
