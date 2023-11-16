from typing import Union
from fastapi import FastAPI
from dotenv import load_dotenv
from app.services.weather import Weather_Service
from app.services.redis import Redis_Service
import os
import redis

app = FastAPI()


load_dotenv()


@app.get("/")
def read_root():
    return "root"

@app.get("/weather-data-by-address")
def get_weather_data(address=''):
    cached_data = Redis_Service.get_cache(address)
    ttl = Redis_Service.get_ttl(address)
    if not cached_data:
        response = Weather_Service.get_nearest_station_data(address)
        cached_data = Redis_Service.set_cache(address, response)
        return response
    return cached_data
