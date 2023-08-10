
# Online Payments showcase app



You can:

- Spin-up a sample application with UI that demonstrates the main use case for each endpoint. For example, making a payment.
- Explore the API resources using a Postman Collection.

## What's included in this repo?

There are two main directories for you to access:

- `/app` for the showcase UI and server experience.
- `/postman` for the Postman Collection.

### Application (App)

A TS/JS application with a client and server used to demonstrate how to integrate with our APIs on frontend applications.

All your actions on this application are served by mock data included in the app codebase.

### Postman Collection

Get straight to the API endpoints in action, make calls and see responses.
To use the Postman collection, import the collection file to Postman and follow the included setup instructions to access all possible calls to the Embedded Banking API. You will need certificates to run these calls.

## Included in the App project folders

### [Client](./app/client/)

This is the core UI application written in TS/JS with the React framework. This application illustrates the various capabilities of Embedded Banking, using mocked responses stored within the codebase.

Such capabilities include:

- Making payments.

Check out the [features](./app/client/src/features/) directory to explore the the components and hooks that explore these features.

### [API-Server](./app/server/)

If you would like to hit the API's using your own credentials you will need to run this codebase following the instructions within the readme. This code allows you to hit JP Morgan UAT APIs.

## Run the Showcase Application locally

Install and run a TS/JS application with a client and server used to demonstrate how to integrate with our APIs on frontend applications.

### Install and serve the app

This example requires Yarn.

To start our client code with mocked responses:

1. Clone this repo.

2. Install the `client` folder:

```
cd app
cd client
yarn install
```

3. Start the UI:

```
yarn start
```

4. Open a browser and navigate to the locally deployed app using the URL provided in the command line. Usually `localhost:3000`.

You have deployed the showcase Embedded Banking app. Follow the onscreen instructions to explore the banking functionality available.

