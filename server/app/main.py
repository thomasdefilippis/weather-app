from typing import Union
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from app.controllers.weather_controller import WeatherController
from app.services.redis import Redis_Service
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import redis

app = FastAPI()


load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get-weather-data-by-address")
def get_weather_data(address=''):
    try:
        cached_data = Redis_Service.get_cache(address)
        if not cached_data:
            WeatherControllerInstance = WeatherController()
            response = WeatherControllerInstance.get_nearest_station_data(address)
            cached_data = Redis_Service.set_cache(address, response, 900)
            return response
        return cached_data
    except HTTPException as http_exception:
        return JSONResponse(content={"error": http_exception.detail}, status_code=http_exception.status_code)
