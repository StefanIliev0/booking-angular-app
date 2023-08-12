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

This module use App route module. 

[go back](#modules)

## Place module 

### Functionalities 

This module initializes components that are used to render paths related to displaying, modifying, and creating stay locations (the main collection).

### Components 

#### Add place  component 

The Add place component depends on PlaceService, Router, UserService , OnDestroy.

Displays the form for creating a place to spend the night, checks the correct fields and displays a message in case of an error. also uses a shared component that displays an error message when an error occurs from the server.

This component has four functionalities:

`changeGetPictureMethod()` - changes how images are taken when filling out the form.

`addPicField(item : number)` - Adds a new field to the form if the way to take photos is via URL. 
 
`setFiles(images : File[])` - takes files uploaded to a shared component.([uploaded file component](#upload-pictures-component)). 

`create (form : NgForm )` - makes a request to create a new location and adds the location to the specific user's data store.

 
On destroy all subscription is unsubsribe.

#### Edit place  component 
The Edit place component depends on PlaceService,ActivatedRoute ,Router, UserService , OnDestroy.

Displays the form for editing a place to spend the night, checks the correct fields and displays a message in case of an error, also uses a shared component that displays an error message when an error occurs from the server.Takes the data on page load and loads it into the form fields.

This component has six functionalities:

`changeGetPictureMethod()` - changes how images are taken when filling out the form.

`addPicField(item : number)` - Adds a new field to the form if the way to take photos is via URL. 
 
`setFiles(images : File[])` - takes files uploaded to a shared component.([uploaded file component](#upload-pictures-component)). 

`edit (form : NgForm )` - makes a request to edit current location and edit the location to the specific user's data store.

`removePic(pic : string)` - makes a request to remove current picture.

`ShowDelete(index : number)` and `hideDelete(index : number)` - show and hide Delete div pressing which removes the pictures
 
On destroy all subscription is unsubsribe.

#### Holiday trip component 

The Holiday trip component depends on OnInit ,PlaceService,OnDestroy.

This component displays a collection of places and gives access to their detail page, has added pagination as well as filtering the displayed results by location and price. At initialization it is attached to the find store, where a shared component adds the user's desire for filtering. on change, a new collection is called against the results.


This component has one functionaly:

`replacePage(num :number)` - function that is passed to a shared element that returns the page whose content to load.

On destroy all subscription is unsubsribe.


#### Work trip component 

The Holiday trip component depends on OnInit ,PlaceService,OnDestroy.

This component displays a collection of places and gives access to their detail page, has added pagination as well as filtering the displayed results by location and price. At initialization it is attached to the find store, where a shared component adds the user's desire for filtering. on change, a new collection is called against the results. The difference is that with this component it reacts with another service of the place service, which revises the price of the night according to the days the consumer stayed there.


This component has one functionaly:

`replacePage(num :number)` - function that is passed to a shared element that returns the page whose content to load.

On destroy all subscription is unsubsribe.


### Router 

This module use App route module. 

[go back](#modules)

## User module 

## Shared module 