# BookingAngularApp

## Introduction
This is a project written entirely by me with the purpose of presenting the skills I have on the "Angular" platform. For this purpose, I have used a minimal amount of additional libraries. Please do not abuse the code in this repositories!

The application is an application for publishing and saving places to spend the night on the occasion of a holiday or business trip.

## Contents
1. [Startup](#startup)
2. [Application structure](#application-structure)
3. [Modules](#modules)

## Startup
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.1.

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Application structure

Тhe application contains one main and four minor modules.Each of the modules has its own service and router and components.

Accordingly, the file structure of the application is:

1. App module
    1. Core module.
    2. Featyre.
        * Places module.
        * Users module.
    3. Shared module.
    4. Guards.
    5. Interseptors.
    6. Store. 
    7. Types. 



## Modules 

1. [App module](#app-module)
2. [Core module](#core-module)
3. [Place module](#place-module)
4. [User module](#user-module)
5. [Shared module](#shared-module) 


[...at home](#contents)

## App module
 ### Functionalities 
The app module is an entry point to the application, the main route and store are initialized through it.

### Components 

#### App component 
The App component depends on UserService , Router, OnInit ,OnDestroy.

It checks through the services whether there is any information saved in LocalStorage when the application is initialized, and if there is, it is saved with the store.

The app component also initializes a subscription to the router event. If there is a path change and there is a logged in user, it updates the user information. More specifically messages and reservations.

On destroy all subscription is unsubsribe.

### Router 

The router app initializes the home path and conducts the rest of the routers.


[go back](#modules)

## Core module 

### Functionalities 
This module initializes components that are used once or are used on each of the routes.

### Components 

#### Home component 

The Home component depends on UserService , OnInit , OnDestroy.

The home component is a home page that displays various functionalities of the application and guides the user to them.

During initialization, it checks if there is a registered user logged in and changes some of the paths accordingly.


#### Header component 

The Header component depends on UserService , OnInit , OnDestroy.

Renders a navigation system for the application.

During initialization, it checks if there is a registered user logged in and changes right side.

#### Footer component 

Footer component haven`t dependensies. 

Renders footer information.

#### Error page  component 

It is a simple component that is displayed on the screen when the page the user is looking for is not found and provides a return path to the home page.

### Router 

This module use App route modyle. 

[go back](#modules)

## Place module 

## User module 

## Shared module 