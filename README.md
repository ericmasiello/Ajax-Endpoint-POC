# Ajax Endpoint POC

This POC was built to demonstrate a few things:

1. Establish a pattern for how ajaxed HTML content can also load JavaScript dependencies into an app
2. Build upon \#1 and support a way of testing each API endpoint individually via e2e testing

## Getting Started

```bash
nvm use # used node 18
npm ci
```

## Run the app

```bash
npm start
```

Then visit http://localhost:3000/.

The demo has clickable buttons that fetch HTML partials wrapped in JSON. Each button loads the content into a different part of the page and passes custom values to the hydration function.

## To run the end to end test

This demo was created with Cypress. You can run the test by running:

```bash
npm run cypress
```

The test itself is not that interesting. The important take way is the the same API endpoint used
in the normal app is loaded into a wrapper template with its hydration logic immediately invoked. This demonstrates how you can use the same endpoint as JSON but also test each endpoint directly.
