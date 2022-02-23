# Infomatix Backend

## Installation

```bash
$ docker-compose -f docker-compose.dev.yml build
```

## Running the app

```bash
$ docker-compose -f docker-compose.dev.yml up
```

## Code style guidelines

Please use non-relative imports!

## Implementation details

Migrations run in single transaction, each seed run in separate transaction(-t=false).

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
