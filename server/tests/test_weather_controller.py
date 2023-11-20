import pytest
from unittest.mock import MagicMock
from app.main import app
from app.controllers.weather_controller import WeatherController
from fastapi import HTTPException


@pytest.fixture
def weather_controller():
    return WeatherController()

def test_get_geo_code_by_address_formats_correctly(weather_controller):
    mocked_data = [{'display_name': 'New York, USA', 'lat': 40.7128, 'lon': -74.0060}]
    weather_controller.data_fetcher_service.fetch_external_data = MagicMock(return_value=mocked_data)

    result = weather_controller.get_geo_code_by_address("New York")
    expected_result = [{'display_name': 'New York, USA', 'x': 40.7128, 'y': -74.0060}]

    weather_controller.data_fetcher_service.fetch_external_data.assert_called_once_with(
      "https://geocode.maps.co/search?q=New York,US&limit=5", 0.5, 3
    )
    pass

def test_get_geo_code_by_address_returns_error_when_response_empty(weather_controller):
    mocked_data = []
    weather_controller.data_fetcher_service.fetch_external_data = MagicMock(return_value=mocked_data)

    with pytest.raises(HTTPException) as exc_info:
        result = weather_controller.get_geo_code_by_address("New York")

    assert exc_info.value.detail == "Address does not exist."

    weather_controller.data_fetcher_service.fetch_external_data.assert_called_once_with(
      "https://geocode.maps.co/search?q=New York,US&limit=5", 0.5, 3
    )
    
    pass

def test_get_weather_data_by_geo_code(weather_controller):
    # Write test cases for get_weather_data_by_geo_code
    pass

def test_get_nearest_station_data(weather_controller):
    # Write test cases for get_nearest_station_data
    pass
