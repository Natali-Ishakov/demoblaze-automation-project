# Playwright Automation Exercise

This project is an automated testing framework built using Playwright for API and end-to-end (E2E) testing of a web application. This project is a automation task for [https://www.demoblaze.com](https://www.demoblaze.com), combining **UI automation** (using [Playwright](https://playwright.dev)) and **API validation** (using [Axios](https://axios-http.com)) in **TypeScript**.



## Table of Contents

- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [key Features](#key-features)

## Running Tests

### UI tests

To use this project, you can run the Playwright tests using the following command:

```bash
npx playwright test
```

To run tests using UI. run the following command:
```bash
npx playwright test --ui
```

To run a specific test file, use:

```bash
npx playwright test -g <test_name>
```

### API tests

To run API test, run the following command

```bash
npm run test
```

## Project Structure

The project structure is as follows:

```
/Demoblaze-Automation-Exercise
├── src/                        # Project source code
│   ├── api-tests/              # Automated tests (API tests)
│   ├── tests/                  # Automated tests (UI tests)
│   ├── pages/                  # Page Object Model (POM) implementation
│   ├── utils/                  # Reusable utility functions
│   ├── workFlows/              # User flows
├── playwright.config.ts        # Playwright configuration file
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration file
└── README.md                   # Project documentation
```

## key Features
Page Object Model (POM) – Keeps tests modular and maintainable.
Reusable UI Actions – Centralized common actions like clicking and form filling.
Assertions & Validations – Ensures UI elements and values are as expected