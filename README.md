# fh-admin-service-testing - Manage family support services and accounts

This repository is responsible for validating / testing manage family support services and accounts applications on family-hubs project


![alt text](https://github.com/DFE-Digital/fh-admin-service-testing/actions/workflows/test-adminUi-regression.yml/badge.svg)

Applications:
- Admin / Manage service
- Identity and Access Management

Environments:

- development - develop branch
- test - main branch

Regression suites for each of these environments are configured using github actions

### Prerequisites

- node
- yarn

Install dependencies with yarn

```shell
yarn install
```

### Running tests

Run interactive cypress UI

```shell
yarn run open:open:admin-dev
yarn run open:open:admin-test
```