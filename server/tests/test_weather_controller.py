import pytest
import os
import json
from unittest.mock import MagicMock
from app.main import app
from app.controllers.weather_controller import WeatherController
from app.services.data_fetcher_service import DataFetcherService
from fastapi import HTTPException


@pytest.fixture
def mock_data_fetcher_service():
    return MagicMock(DataFetcherService)

def load_fake_data(filename):
    fake_data_dir = os.path.join(os.path.dirname(__file__), "fake_data")
    with open(os.path.join(fake_data_dir, filename), "r") as file:
        return json.load(file)


def test_get_geo_code_by_address_formats_correctly(mock_data_fetcher_service):
    weather_controller = WeatherController(mock_data_fetcher_service)

    mocked_data = [{'display_name': 'New York, USA', 'lat': 40.7128, 'lon': -74.0060}]
    mock_data_fetcher_service.fetch_external_data.return_value = [{
      'display_name': 'New York, USA', 'lat': 40.7128, 'lon': -74.0060
    }]

    result = weather_controller.get_geo_code_by_address("New York")
    expected_result = [{'display_name': 'New York, USA', 'x': 40.7128, 'y': -74.0060}]

    mock_data_fetcher_service.fetch_external_data.assert_called_once_with(
      "https://geocode.maps.co/search?q=New York,US&limit=5", 0.5, 3
    )
    pass

def test_get_geo_code_by_address_returns_error_when_response_empty(mock_data_fetcher_service):
    weather_controller = WeatherController(mock_data_fetcher_service)

    mock_data_fetcher_service.fetch_external_data.return_value = []

    with pytest.raises(HTTPException) as exc_info:
        result = weather_controller.get_geo_code_by_address("New York")

    assert exc_info.value.detail == "Address does not exist."

    mock_data_fetcher_service.fetch_external_data.assert_called_once_with(
      "https://geocode.maps.co/search?q=New York,US&limit=5", 0.5, 3
    )

    pass

def test_get_observation_station_url_by_geo_code(mock_data_fetcher_service):
    weather_controller = WeatherController(mock_data_fetcher_service)
    mock_data_fetcher_service.fetch_external_data.return_value = load_fake_data('observation_station_url_by_geo_code.json')

    result = weather_controller.get_observation_station_url_by_geo_code({
      'display_name': 'Wahkiakum County, Washington, 98643, United States',
      'x': '46.325718249999994',
      'y': '-123.674827'
    })

    expected  = "https://api.weather.gov/gridpoints/PQR/89,148/stations"

    mock_data_fetcher_service.fetch_external_data.assert_called_once_with(
      "https://api.weather.gov/points/46.325718249999994,-123.674827", 0.5, 3
    )
    assert result == expected

    pass

def test_get_observation_station_url_by_geo_code_returns_error_when_response_empty(mock_data_fetcher_service):
    weather_controller = WeatherController(mock_data_fetcher_service)
    mock_data_fetcher_service.fetch_external_data.return_value = load_fake_data('observation_station_url_by_geo_code.json')

    with pytest.raises(HTTPException) as exc_info:
      result = weather_controller.get_observation_station_url_by_geo_code({'x': '', 'y': ''})

    assert exc_info.value.detail == "Address does not exist."

    mock_data_fetcher_service.fetch_external_data.assert_called_once_with(
      "https://api.weather.gov/points/,", 0.5, 3
    )

    pass

# def test_get_nearest_station_data():
#     # Write test cases for get_nearest_station_data
#     pass
