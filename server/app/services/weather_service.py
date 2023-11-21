import redis
import json
import time
import math
from datetime import datetime
from collections import defaultdict

class WeatherService:

    @staticmethod
    def celsius_to_fahrenheit(celsius):
      fahrenheit = (celsius * 9/5) + 32
      return fahrenheit


    @staticmethod
    def format_temperature_min_max(weather_obect):
      now = time.time()
      daily_temperatures = defaultdict(lambda: {
        'min_c': math.inf,
        "max_c": -math.inf,
        "min_f": math.inf,
        "max_f": -math.inf
      })
      for feature in weather_obect['features']:
        timestamp = feature['properties']['timestamp']
        date = timestamp.split('T')[0]

        temperature = feature['properties']['temperature']['value']

        if temperature is not None:
          new_min_c = min(daily_temperatures[date]['min_c'], temperature)
          new_max_c = max(daily_temperatures[date]['max_c'], temperature)
          # print(date, daily_temperatures[date]['max_c'], temperature)

          daily_temperatures[date]['min_c'] = new_min_c
          daily_temperatures[date]['max_c'] = new_max_c

          new_min_f = round(WeatherService.celsius_to_fahrenheit(new_min_c),2)
          new_max_f = round(WeatherService.celsius_to_fahrenheit(new_max_c),2)

          daily_temperatures[date]['min_f'] = new_min_f
          daily_temperatures[date]['max_f'] = new_max_f

      return daily_temperatures
