import pytest
import os
import json
from unittest.mock import MagicMock
from app.main import app
from app.services.weather_service import WeatherService
from app.services.data_fetcher_service import DataFetcherService
from fastapi import HTTPException


@pytest.fixture
def mock_data_fetcher_service():
    return MagicMock(DataFetcherService)

def load_fake_data(filename):
    fake_data_dir = os.path.join(os.path.dirname(__file__), "fake_data")
    with open(os.path.join(fake_data_dir, filename), "r") as file:
        return json.load(file)


def test_celsius_to_fahrenheit():
    result = WeatherService.celsius_to_fahrenheit(12)
    assert result == 53.6

def test_format_temperature_min_max():
    result = WeatherService.format_temperature_min_max(load_fake_data('observations.json'))
    assert result == load_fake_data('min_max_temperature_results.json')
