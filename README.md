# Mercado Libre Front End Test

## Prerequisites

- Have Docker and Docker Compose installed.

## Installation

1. Create the client's `.env` file with ```cp client/.env.example client/.env```.
2. Create the server's `.env` file with ```cp server/.env.example server/.env```.
3. Modify the `.env` files as you wish.

## Running the app

1. Start the Docker containers with ```docker compose up --build```.
2. To stop the running containers press `Ctrl+C`.

Alternatively, you can detach your terminal from the containers:

1. Start the Docker containers with ```docker compose up -d --build```.
2. To stop the running containers execute ```docker compose stop```.

## Accessing the app

To view the web app head to <http://localhost:3000> in your browser. You can hit the server using <http://localhost:8000>.

## Test Notes

- I took some liberties about the data design of the local server's API. The test specifications seem to be outdated, some data is missing or in the wrong place.
    1. The categories used in the search page are obtained from the "available_filters" property (of the search API), but some search queries don't have the "category" filter available. In that case, the categories are not shown.
    1. The "categories" property is available in the list endpoint and the detail endpoint. The later is not specified in the test specifications, but I added it since it is needed to show the categories in the item page.
    1. The "free_shipping" property is used in the search page but not in the item page, this is to keep the design as expected in the provided designs.
    1. The "region" property was added to the items returned from the local server, this is to show the state name where the owner of the item is located. The thing is, this property is not available in the search API, but it is in the item API. Even though it is available, the item page doesn't show the region, again, because of the provided designs.
    1. The "condition" property, even though it is returned from the local server, it is not used in the search page. Again, this is due to design purposes.
- If testing in development mode, you will see the web app sends two requests to the local server. This is because of the `<React.StrictMode>` used in `index.tsx`.
- It is assumed the site is only prepared for the Argentina version of Mercado Libre, but it shouldn't be hard to expand it to other countries and languages.
- Keep an eye out for "TODO"s while reading the code.
