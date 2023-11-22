# Weather App

Weather App is an application that sends a United States address to the https://weather.gov api and returns the min and max tempuratures of the nearest stations in a user friendly interface. To build this app, the following technologies were used

- Front End
  - React https://react.dev/
- Backend
  - Fast Api (python) https://fastapi.tiangolo.com/
  - Redis Server (https://redis.io/)

Although all of the api calls could have been handled with a single front end application such as react, providing a backend allows the application to cache responses from the external apis which reduces response times, rate limit errors, and other misc. errors. Furthermore, it is good practice to reduce third party calls as much as possible since these tend to cause the most errors in an application. Therfore, having a backend for the application provides a huge benefit in performance.



## Requirements
- node: >=0.10.0
- docker: 23.0.5 (This is the version used when building the app. Other earlier versions likely work.)
  - install with brew `brew install --cask docker`
  - install by downloading ``

## Setup

### Automatic
This setup runs docker in detatched mode.
- run `npm run setup` from the root directory.
### Manual
- From the client folder, run `npm install && npm run start`
- From the server folder, run `docker-compose up` or `docker-compose up -d` if you want to run the backend in detatched mode.
### Url Access
- access front end at http://127.0.0.1:3000/
- access api at http://127.0.0.1:8080/
- access api docs for routes at http://127.0.0.1:8080/docs


## Unit Tests
run `npm run test` from the root directory

The fast api has unit test coverage using pytest. In these tests, all external api calls in the data_fetcher service are mocked using the default python package unittest.mock.
