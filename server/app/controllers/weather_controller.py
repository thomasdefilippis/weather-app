import requests
from fastapi import HTTPException, Depends
from app.services.data_fetcher_service import DataFetcherService
from app.services.weather import WeatherService
import json


class WeatherController:
    def __init__(self, data_fetcher_service: DataFetcherService = None):
        self.data_fetcher_service = data_fetcher_service or DataFetcherService()


    def get_geo_code_by_address(self,address):
        base_geo_code_url = f"https://geocode.maps.co/search?q={address}{ ',US' if address else ''}&limit=5"
        geo_code_data = self.data_fetcher_service.fetch_external_data(f"{base_geo_code_url}",0.5, 3)
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

    def get_observation_station_url_by_geo_code(self,geo_code):
        geo_code_string = f'{geo_code["x"]},{geo_code["y"]}'

        base_weather_url = 'https://api.weather.gov'
        weather_data = self.data_fetcher_service.fetch_external_data(f"{base_weather_url}/points/{geo_code_string}",0.5, 3)
        if not weather_data:
            raise HTTPException(status_code=404, detail="Weather data at that address does not exist")


        observation_station = weather_data['properties']['observationStations']
        return observation_station

    def get_station(self, url):
        station = self.data_fetcher_service.fetch_external_data(url)
        return station

    def get_station_latest_data(self,station):
        station_latest_data = self.data_fetcher_service.fetch_external_data(f"{station['features'][0]['id']}/observations",0.5, 3)
        if not station_latest_data:
            raise HTTPException(status_code=404, detail="Weather data at that address does not exist")

        return station_latest_data

    def get_nearest_station_data(self,address):
        geo_codes = self.get_geo_code_by_address(address)
        all_weather_data = []
        if geo_codes:
            for geo_code in geo_codes:
                observation_station_url = self.get_observation_station_url_by_geo_code(geo_code)
                station = self.get_station(observation_station_url)
                station_data = self.get_station_latest_data(station)
                station_data['min_max_by_date'] = WeatherService.formatTemperatureMinMax(station_data)
                station_data['location'] = geo_code['display_name']
                all_weather_data.append(station_data)
        return all_weather_data
