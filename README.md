# NGRX-ENTITY-DEMO

This is an Angular project demonstrating state management with NGRX ENTITY

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Code standards

Follows [Angular coding style guide](https://angular.io/guide/styleguide).

## What it is?

It has two dropdowns region and country, and a table. When the region dropdown is changed, the country dropdown is enabled, and loads
European or Asian countries. When one of the countries is selected, it populates the table with the selected country's information

## How it works?

It uses NGRX library to manage the state of the application.
The region dropdown data is sent to the dropdown via initial state of the state. 

When the region is changed, it triggers the two actions
1. Dispatch region and
2. dispatch load countries

The region state is stored in the stored and the effect calls the REST API via a repository service to fetch country details and triggers an action to store it in the store

When the country is selected, its state is stored in the state.

###### World Module

This is a feature module that hosts a select region dropdown, select country dropdown, and a table to load the selected country information. It is eagerly loaded in the App's root module

###### Shared Module

This is a shared module currently hosts a shared dropdown component and a shared table component. It is currently loaded in the world module

Note: Dropdown component and the table component can be packaged as a separate module

###### Custom Dropdown Component

This is an angular material dropdown component uses [ngTemplateOutlet](https://angular.io/api/common/NgTemplateOutlet) to enable users to provide custom templates. 
**It is implemented with control value accessor interface**


###### Country table component

A simple reusable component to load one country information

###### OnPush change detection strategy

It uses Angular onpush change detection strategy


###### Subscription and Unsubscription

It uses async pipe and manual unsubscription in the ondestroy life cycle hooks and could have implemented [ngrxOnRunEffects](https://javascript.plainenglish.io/controlling-the-subscriptions-of-effects-in-ngrx-956822e1d0b1) to control the subcription in effects

###### Selectors and Cache


It uses selectors to query the data in the store and passes the data to the required components. The REST API is only called when there is no data in the store.

###### What Could have done?

Could have fully implemented the Angular styling conventions

Could have used NGRX-DATA to avoid lots of boiler plate code 