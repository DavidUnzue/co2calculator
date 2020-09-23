# CO2e calculator API

## Setup and configuration

### Installation

You will need Node.js (tested with v14.4.0) installed in your host.

Install dependencies:

```bash
$ npm install
```

### Environment variables

The project uses [dotenv](https://www.npmjs.com/package/dotenv) to load environment variables stored in an `.env` file. Following information is defined here:

- Host and port where the app should run
- GoClimate API URL and API token
- API token to secure HTTP requests from clients

The project includes a file called `.env.sample` that serves as a template for that. Just rename this file into `.env` and fill in the missing information.

## Start the application

Start dev server:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

The API server will run under `http://localhost:7000`.

## Routes and footprints

When retrieving the CO2e footprint for a journey (from origin to destination), the API will responde with a one-way (!) route (with corresponding footprint) for each available vehicle (car, train, plane).

These routes are hard-coded in the app for the vehicles "car" and "train". The distances (km) for a specific route are the same for both vehicles. The footprint is then calculated on the fly based on the distance and [general emission values from "Umweltbundesamt"](https://www.umweltbundesamt.de/bild/vergleich-der-durchschnittlichen-emissionen-0).

The footprint for the vehicle "plane" is retrieved on the fly from the [GoCLimate API](https://api.goclimate.com/docs).

## API Endpoints

Every request must send a custom Header called `Api-Token` with the corresponding token (see `.env` file) for authorization.

The API is read-only at the moment, so only the `HTTP GET` method is allowed.

**`/api`**
OpenApi/Swagger documentation.

**`/places`**  
Allowed HTTP methods: `GET`

Retrieve the possible origins and destinations for a route. Places are airports within Germany and identified by the IATA code.

The endpoint returns a list of place entities:

```
[
    {
        "id": "FRA",
        "label": "Frankfurt Airport",
        "lat": "50.037919",
        "long": "8.562045"
    },
    {
        "id": "MUC",
        "label": "Munich Airport",
        "lat": "48.353747",
        "long": "11.774993"
    },
    ...
]
```

**`/places/:id`**  
Allowed HTTP methods: `GET`

Retrieve the information for a single route by its id (IATA code, case sensitiv).

**`/routes`**  
Allowed HTTP methods: `GET`

Retrieve a list of routes (from origin to destination) with their corresponding CO2e footprints. You have to pass query parameters for origin and destination using IATA codes.

```
?origin=[ORIGIN_IATA]&destination=[DESTINATION_IATA]
```

The endpoint returns a list of route entities with footprints:

```
[
    {
        "origin": "TXL",
        "destination": "MUC",
        "vehicle": "car",
        "footprint": 84
    },
    {
        "origin": "TXL",
        "destination": "MUC",
        "vehicle": "train",
        "footprint": 18
    },
    ...
]
```

### Examples

You can access the API either by:

- using the React client as described in the client's repository README
- using the OpenApi/Swagger documentacion under the `/api` endpoint
- you can use a client like `curl` or `Postman`

#### Get all places

`GET http://localhost:7000/places`

```bash
curl --request GET 'http://localhost:7000/places' \
--header 'Api-Token: 123456789'
```

#### Get a single place

`GET http://localhost:7000/places/FRA`

```bash
curl --request GET 'http://localhost:7000/places/FRA' \
--header 'Api-Token: 123456789'
```

#### Get routes by origin and destination

`GET http://localhost:7000/routes?origin=FRA&destination=TXL`

```bash
curl --request GET 'http://localhost:7000/routes?origin=FRA&destination=TXL' \
--header 'Api-Token: 123456789'
```

## Tests

I wrote some unit and e2e tests. To run them:

Unit tests:

```bash
npm test
```

e2e tests:

```bash
npm run test:e2e
```

## Author

David Unzué  
[davidunzue.com](https://davidunzue.com)
