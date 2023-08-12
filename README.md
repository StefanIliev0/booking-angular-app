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

* App module
    * Core module.
    * Featyre.
        * Places module.
        * Users module.
    * Shared module.
    * Guards.
    * Interseptors.
    * Store. 
    * Types. 



## Modules 

1. [App module](#app-module)
2. [Core module](#core-module)
3. [Place module](#place-module)
4. [User module](#user-module)
5. [Shared module](#shared-module) 


[home](#contents)

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

[go back](#modules)

#### Header component 

The Header component depends on UserService , OnInit , OnDestroy.

Renders a navigation system for the application.

During initialization, it checks if there is a registered user logged in and changes right side.

[go back](#modules)

#### Footer component 

Footer component haven`t dependensies. 

Renders footer information.

[go back](#modules)

#### Error page  component 

It is a simple component that is displayed on the screen when the page the user is looking for is not found and provides a return path to the home page.

[go back](#modules)

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

[go back](#modules)
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

[go back](#modules)
#### Holiday trip component 

The Holiday trip component depends on OnInit ,PlaceService,OnDestroy.

This component displays a collection of places and gives access to their detail page, has added pagination as well as filtering the displayed results by location and price. At initialization it is attached to the find store, where a shared component adds the user's desire for filtering. on change, a new collection is called against the results.


This component has one functionaly:

`replacePage(num :number)` - function that is passed to a shared element that returns the page whose content to load.

On destroy all subscription is unsubsribe.


[go back](#modules)
#### Work trip component 

The Holiday trip component depends on OnInit ,PlaceService,OnDestroy.

This component displays a collection of places and gives access to their detail page, has added pagination as well as filtering the displayed results by location and price. At initialization it is attached to the find store, where a shared component adds the user's desire for filtering. on change, a new collection is called against the results. The difference is that with this component it reacts with another service of the place service, which revises the price of the night according to the days the consumer stayed there.


This component has one functionaly:

`replacePage(num :number)` - function that is passed to a shared element that returns the page whose content to load.

On destroy all subscription is unsubsribe.

[go back](#modules)
#### Details place component 

The Details place component depends on OnInit ,PlaceService, userService ,OnDestroy, ActivatedRoute.

This component displays the detailed information of the specific rental location. Has its own resolver that extracts the information about the specific housing and passes it to the component.
It interacts with several subcomponents by passing information to them. On initialization, it takes the data from the resolver and adds it to the place store created for the purpose. And saves any of the data as variables. It interacts with an external object based on which it generates SVG icons in the template.

On destroy all subscription is unsubsribe.

This component has five cubcomponents:

##### Small media component

The Small media component depends on OnInit , OnDestroy, PlaceService .

The purpose of this sub component is to render the images of the specific object. On initialization, it accepts an array with the URI paths of the images via the Place service and renders a main one if there are any other variables below it. If there is a need
a scroller appears. If the specific location has no saved images it shows SVG .

This component has one functionaly:

`changeActivePic ( pic : string)` - when clicking on a non-main photo, it replaces its place with the main one.

On destroy all subscription is unsubsribe.

##### Comments component

The Comments component depends on OnInit , OnDestroy, PlaceService .

The purpose of this component is to display a list of the comments of the given location and to enable the addition of new ones. The component uses a shared component for pagination. On initialization, it loads the comments via the Place service. If the user is the author of the displayed comment, buttons for deleting and editing the comment are displayed.


This component has four functionalities:

`addComment()` - add comment to DB via Place service.

`deleteComment(commentId : string)` - delete comment from DB via Place service.

`editComment(commentId : string , commentText: string)` - edit  comment from DB via Place service.

`changePage(page : number)` - change page via shared pagination component. 

On destroy all subscription is unsubsribe.

##### Owner info  component

The Owner info component depends on  OnDestroy, PlaceService .

When a user who is not the owner of the particular object opens the detail page, this component shows information about the owner of the object such as nickname, profile picture and information about him. If the owner opens the detail view, this object shows when the next reservation is for the specific apartment and gives an option through buttons to edit and delete (after being verified by query) properties from the database.

During initialization, it checks the id of the specific user and compares it with that of the owner, as well as takes the reservations through a service.


This component has three functionalities:

`askForRemove()` - displays a message to confirm the owner wants to delete the property from the database.

`refuse()` - hide a message for delete.

`removeThisPlace()` - delete place from DB.


On destroy all subscription is unsubsribe.

##### Rate component

The Rate component depends on  OnDestroy , OnInit , placeService, userService .

This component has the purpose of displaying the rating of the specific housing. If the user is not the owner, is registered and has not yet voted for this housing, the component displays a voting option. otherwise, it displays the object's rating numerically and graphically.

During the initialization of the component, it takes information about the user and about the voting users through a service.


This component has four functionalities:

`addRatingFn()`  - modifies a variable to display the voting GUI.

`setRating()` - saves and changes the current object rating. 

`ChangeRate(rate : number)` - modifies a variable that is passed when voting.

`addRate()` - adds the selected rating to the rating of the specific object through the service. 


On destroy all subscription is unsubsribe.

##### Reservation component

The Reservation component depends on  OnDestroy , OnInit , placeService, userService .

The purpose of this component is to generate a calendar, generate on this calendar the days that are already booked and interact with the user to make a reservation.

On initialization, the component fetches through the service the previous reservations of the property, generates the current month and saves several variables.


This component has five functionalities:

`previousMonth()`  - generates the previous month and changes some variables from the generated month.

`nextMonth()` - generates the next month and changes some variables from the generated month.

`setResDate(day : Day)` - set reservation dates.

`makeBook()` - executed if the user is the owner of the object and makes a reservation through the place service.

`makeRequest()` - executed if the user is not the owner of the object and makes a request in the form of a message to the owner in order to reserve the place.


On destroy all subscription is unsubsribe.


[go back](#modules)
### Place Resover 

The purpose of the resolver is to take an obx from the server based on the path and pass it to the component rendered on the corresponding path via injected Place service.

### Place Router 

Place router navigates through several paths and they are:

* /holiday-trips/list
* /work-trips/list
* /add-place 
   * use `isAuthGuard()` 
* /places/:id/details
* /places/:id/edit
   * use `isAuthGuard()` and `isOwnerGuard()`

The error page path is also included in this router. 

[go back](#modules)

## User module 

### Functionalities 

This module initializes components that are used to render paths related to displaying, modifying, and creating users object.

### Components 

#### Register component 

The Register component depends on store, Router, UserService.

The purpose of this component is to visualize, validate and pass the registration form data to the application.

Before sending the data, it checks whether the form is valid, if it is not valid it displays an error message, as well as in the case of an error sent by the server.


This component has one functionality:

`register(form : NgForm)` - checks and sends the data from the form to the server via userService, if there is no error, saves the data for the created user in the user store.

[go back](#modules)
#### Login component 

The Login  component depends on store, Router, UserService.

The purpose of this component is to visualize, validate and pass the registration form data to the application.

Before sending the data, it checks whether the form is valid, if it is not valid it displays an error message, as well as in the case of an error sent by the server.


This component has one functionality:

`Login(form : NgForm)` - checks and sends the data from the form to the server via userService, if there is no error, saves the data for the received user in the user store.

[go back](#modules)
#### Profile details component 

The Profile details  component depends on OnInit, OnDestroy, UserService, Router. 

The purpose of the component is to display information about the specific user, with the first section showing the basic information. Section two displays the properties owned by this user, with the option to redirect to the property's view and edit pages. The third section displays a list of the user's approved reservations.

[go back](#modules)
#### Profile edit component 

The Profile edit component depends on OnInit, OnDestroy, UserService.

The purpose of the component is to get from the store and display the information about the user, give him the possibility to edit the information, check it and save it in the store and the database.

When the component is initialized, the information is taken from the store via a service and displayed on the editable form.

This component has five functionalities:

`setFiles(images : File[])` - takes files uploaded to a shared component.([uploaded file component](#upload-pictures-component)). 

`changeGetPictureMethod()` - change method to get new images. 

`ShowDelete()` and `hideDelete()` - show and hide Delete div pressing which removes the pictures
 
`removePic(pic : string)` - makes a request to remove current picture.

`edit (form : NgForm )` - edit details to the specific user's data store via UserService.
 
On destroy all subscription is unsubsribe.

[go back](#modules)
#### User control  component 

The Profile edit component depends on OnInit, OnDestroy, UserService, Router .

The purpose of this component is, in the presence of the user, to display buttons with which to navigate between the paths for editing and using the information.

This component has three functionalities:

`open()` - modifies a variable that spans the component in its full size to show all paths.

`close()` - modifies a variable that collapses the component to a reduced size to not show the paths.

`logout()` - send request to userService for logout user from DB and remove user from User store.
 
On destroy all subscription is unsubsribe.

[go back](#modules)
#### Messages list component 

The Messages list component depends on OnInit, OnDestroy, UserService, Router .

The purpose of the component is to visualize a list of messages that the user has, noting the nickname of the other user, for which apartment the conversation was created and whether there are new messages on this conversation.

Initialization fetches the user's messages from the store via the service and sets some variables.

This component has four functionalities:

`getNickcname(participants : {id : string , nickname : string}[])` - takes the nickname of the other user in the chat.

`getIsHaveNewMessages(messages : {read : boolean , user : string , mesage : string }[])` - check is have new messages on this conversation.

`needApproval(aproval : {approve : boolean , unapprove : boolean})` -  checks if the booking associated with this conversation needs approval.

`goToMessage(messageId : string)` -  navigate to current conversation page. 
 
On destroy all subscription is unsubsribe.

[go back](#modules)
#### Messages component 

The Messages component depends on OnInit, OnDestroy, UserService, Router , ActivatedRoute, placeService.

The purpose of this component is to visualize the messages in this conversation in detail. At the beginning of each started conversation of the owner of the property with which he is connected, an element appears in which he must approve or reject the reservation. If he refuses, the messages are deleted from his profile, and the other user receives a message that one user has deleted the conversation. If he accepts the reservation, it is saved in the data for the place and the other user. Both users have the option to delete the conversation at any time.

When the component is initialized, messages are marked as read. The user id as well as the nicknames of both users are taken and some variables are set.

This component has four functionalities:

`incrementNum()` - changes a variable that depends on how many messages will be displayed on the screen.

`sendMessage(text : string)` - add new message to conversation via service. 

`approveBook()` -  approve curent book to place and user via service.

`unAproveBook()` -  unapprove curent book to place and user via service.
 
On destroy all subscription is unsubsribe.

[go back](#modules)
### User Router 

[go back](#modules)

## Shared module 