# NG Whac-A-Mole

---- WORK IN PROGRESS ----

## Introduction

This repo covers all of the angular concepts, and best practices. It should act as a guide on how to scale an Angular application, and handle common scenarios. I created this as a way to exhibit my own coding techniques, and design patterns. But also as a way for any new devs getting started with Angular to understand the framework better. 

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

An angular app should have the following project structure in order to make it scalable, and keep it organised.  

```
/my-angular-app (root folder level)
│
├── /public (Assets & Images)
|
├── /src
│   ├── /environments (Environment configurations)
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

```

#### Core folder

This is where we'll store our global, app-wide logic and singleton services. For example:
* An `AuthenticationService` (used to log in/log out users), 
* `CacheService` (used for caching data requests within the app), or 
* Global error handling.

#### Shared folder

Any services, components, pipes, constants, interfaces, or directives that are used across multiple features will be stored here. For example:
* A pipe that converts an `Address` data object to a user-friendly address string.
* An interface `DropdownItem` that is used to set the type on your `DropdownComponent`
* A directive that highlights text
* `ButtonComponent` - A shared component will be used across multiple features
 

#### Features folder

The "Features" folder includes components, services, and modules specific to particular features or sections of the application. For example - If you had a `Login` screen, or a `UserProfile` screen. These features should be lazy-loaded into your routes for optimization

### Best practices & coding style guide

#### Keep the code simple

* Limit functions to 30'ish or fewer lines
* Keep classes / files small. If your class has hundreads of lines, split it into 2 or more classes (I would recommend using composition over inheritance)

#### Follow the DRY principle

The DRY (Don't Repeat Yourself) principle encourages writing code in a way that avoids repetition, meaning each piece of information or logic should only exist once. This makes the code easier to maintain and keeps it consistent. See [this article](https://www.geeksforgeeks.org/dont-repeat-yourselfdry-in-software-development/) for more detail.

#### Follow the Single responsibility principle

The first rule of the [SOLID Principles](https://www.freecodecamp.org/news/solid-principles-for-programming-and-software-design/), is you DO talk about software design patterns. The Single Responsibility Principle suggests that each part of your code should have just one job or responsibility. This makes it easier to manage and update, as changes to one functionality won’t affect others.

#### Avoid deep indentation
```
// -- BAD
if (bool) {
    .....
    if (isTrue) {
        ....
    }
}

// -- GOOD
if (!bool) { return; }
if (!isTrue) { return; }

```

#### Comments should explain WHY, not WHAT

Comments should explain WHY you are doing something, not WHAT you are doing. Reading the code will explain the WHAT you are doing.

```
// -- BAD
// Set the date as an ISO string
setDateAsISO() {
}

// -- GOOD
// The server stores/returns dates in ISO format. We need to convert out JS date objects to ISO before sending back to the server. As there have been date related bugs in the past. 
setDateAsISO() {
}
```

#### Limit line character length

Limit line length to 80 characters where possible. This makes the code easier to read.


#### Modular Architecture

As mentioned in the previous section, an Angular app should have an organised and scalable structure. Typically, a team of developers will work on a project together. By modularizing your code, it becomes easier for team members to focus on specific parts of the code or app, reducing conflicts when merging their work.Applications should be broken up into Core, Featured, and Shared logic. This modular approach will help with maintainability, reusability, and lazy-loading.

#### Use Angular CLI

* Scaffolding: Use Angular CLI for generating components, services, modules, and other elements. It ensures consistency and follows Angular’s style guide. This will help understand the Angular naming conventions too (see below)


#### File naming convention

* All files should follow the same naming convention/structure. E.g. `button.component.ts`, `button.interfaces.ts`, `button.component.scss`. This will make it easier to understand, and find things faster
* Separate words with dashes. E.g. `user-list.component.ts`
* Classes should be named in CamelCase. E.g. `ButtonComponent`. However, this won't be an issue if you use Angular CLI to generate your components, services etc.
* Component selectors should follow this format: `app-game-board`, `app-leaderboard`, `app-button`. This will maintain consistency with components throughout the app.
* Use consistent names for all pipes, named after their feature. The pipe class name should use `UpperCamelCase` (the general convention for class names), and the corresponding name string should use `lowerCamelCase`. The name string cannot use hyphens ("dash-case" or "kebab-case"). E.g. A pipe class will look like this:

```
@Pipe({ standalone: true, name: 'addressString' })
export class AddressStringPipe implements PipeTransform { } 
```


#### Component design

* **Single Responsibility:** Each component should have a single responsibility. If a component grows too complex, consider breaking it down into smaller components. A component file should not excede 400 lines in length, and should only contain one thing. For example - a button component should only contain the logic for the button component. It should NOT contain the code for the button group, or interfaces related to the button.
* **Input and Output:** Use @Input() and @Output() decorators to manage data flow between parent and child components. Keep components as isolated and independent as possible. 

#### Services

* **Singleton Services:** Use services for shared logic and state management. Ensure services that hold application-wide state are provided in the root injector (providedIn: 'root').
* **Dependency Injection:** Leverage Angular's dependency injection system for injecting services into components and other services.

#### Routing & Navigation

* **Lazy Loading:** Use lazy loading for features to improve initial load times and optimize performance. For example - see the [App Routes](https://github.com/davidallenby/ng-whac-a-mole/blob/master/src/app/app.routes.ts) file for a representation of this.
* **Guards:** Implement route guards (CanActivate, CanDeactivate, etc.) for handling authentication, authorization, and other conditions. For example - See the [Game Over screen](https://github.com/davidallenby/ng-whac-a-mole/tree/master/src/app/features/game/components/game-over) in the Whac-a-Mole game. The user will only be able to see this screen if the current game is over (the user has had a play-through.) If the user tries to navigate to this screen without having played the game, we should redirect them to the game board. Another common use case for `CanActivate` is on authenticated routes. If you have some features that can only be accessed by users that are logged in, you would use a `CanActivate` guard. [Find out more about guards here.](https://angular.dev/guide/routing/common-router-tmasks#preventing-unauthorized-access).

#### Shorten your import statements

In the `tsconfig.json` file, add the following to `compilerOptions` shorten import statements:

```
{
  "compilerOptions": {
    ...
    "paths": {
      "@core/*": ["src/app/core/*"],
      "@shared/*": ["src/app/shared/*"],
      "@features/*": ["src/app/features/*"]
    }
  }
}
```
This will allow you to import things easer. E.g:
```
// BAD PRACTICE
import { DatePickerComponent } from '../../../../components/date-picker';
```
```
// GOOD PRACTICE
import { DatePickerComponent } from '@shared/components/date-picker';
```

#### Styles & CSS
* Follow the ["Block-Element-Modifier" methodology](https://en.bem.info/methodology/quick-start/) for structuring CSS.
* Component styles should be kept within a CSS/SCSS file in the same folder as the component file. Then imported into the component.
* Global styles should be kept in the `src/app/styles` folder

#### Business logic

Business in the back, party in the front - You should keep all business logic in a service related to the feature, or component. All display logic should be kept within the component.

### Performance

#### Change detection

If you are confident that a part of the application is not affected by a state change, you can use `OnPush` to skip change detection in an entire component subtree. For an example of when to use it, see the [Angular docs](https://angular.dev/best-practices/skipping-subtrees#common-change-detection-scenarios) for further details.

--------

# TODO
Still need to complete the following readme sections:
* Performance
* Running the app
* Dependencies & Packages
* Prerequisites
* Testing & debugging

