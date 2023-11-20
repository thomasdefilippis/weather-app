import requests
import time
from fastapi import FastAPI, HTTPException

class DataFetcherService:

    @staticmethod
    def fetch_external_data(url, timeout=0, retries=0):
      try:
        response = requests.get(f'{url}')

        if len(response.json()) == 0:
            response.raise_for_status()

        if response.ok:
            return response.json()
        else:
            response.raise_for_status()

      except Exception as e:
        if retries > 0:
          if timeout > 0:
            time.sleep(timeout)
          return DataFetcherService.fetch_external_data(url, timeout, retries - 1)

      # raise Exception(f"Failed to fetch data from {url} after {retries} attempts")
