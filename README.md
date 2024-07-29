# WhacAMole

---- WORK IN PROGRESS ----

## Introduction

This repo covers all of the angular concepts, and best practices. It should act as a guide on how to scale an Angular application, and handle common scenarios. I created this as a way to exhibit my own coding techniques, and design patterns. But also as a way for any new devs getting started with Angular to understand the framework better. 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.2.

## Concepts

This repo covers a range of topics, including:
  - Project structure & organisation
  - Best practices & coding style guide
  - Components & Modules
  - Data binding & component interaction
  - Services & dependency injection
  - Routing & navigation
  - Forms & validation
  - HTTP & APIs
  - Performance & optiimisation
  - Testing & debugging

### Project structure

An angular app should have the following project structure in order to make it scalable:
```
/my-angular-app (root folder level)
│
├── /public (Assets & Images)
|
├── /src
│   ├── /environments (Environment configurations)
│   │   ├── environment.ts
│   │   ├── environment.prod.ts
│   │   └── environment.ssr.ts
│   │   
│   ├── /styles (Global styles & stylesheets)
|   |
│   ├── /app (Main app directory)
│   │   ├── /core
│   │   │   ├── /services
│   │   │   ├── /interceptors
│   │   │   ├── /guards
│   │   │   ├── /models
│   │   │   └── core.module.ts
│   │   │
│   │   ├── /shared
│   │   │   ├── /components
│   │   │   ├── /constants
│   │   │   │   ├── category1.constants.ts
│   │   │   │   ├── category2.constants.ts
│   │   │   ├── /interfaces
│   │   │   │   ├── category1.interfaces.ts
│   │   │   │   ├── category1.interfaces.ts
│   │   │   ├── /directives
│   │   │   ├── /pipes
│   │   │   └── shared.module.ts
│   │   │
│   │   ├── /features
│   │   │   ├── /feature1 (Individual feature modules / pages / views)
│   │   │   │   ├── /components
│   │   │   │   ├── /services
│   │   │   |   ├── /constants
|   │   │   │   ├── /interfaces
│   │   │   │   ├── feature1.component.ts
│   │   │   │   ├── feature1.service.ts
│   │   │   │   └── feature1.module.ts
│   │   │   └── ...
│   │   │
│   │   ├── app.config.ts
│   │   ├── app.config.server.ts
│   │   ├── app.routes.ts
│   │   ├── app.component.ts
│   │   │
│   │── main.server.ts
│   │── main.ts
│   │── index.html
|   |
│── polyfills.ts
│── tsconfig.app.json
│── tsconfig.json
│── tsconfig.spec.json

```

## Running the app

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
