# Hbnb Project Holberton School

## Summary

1. [Introduction](#Introduction).
2. [High-Level Architecture](#High-Level-Architecture)
3. [Business Logic Layer](#Business-Logic-Layer)
4. [API Interaction Flow](#API-Interaction-Flow)
    - [User Registration Diagram](#User-Registration-Diagram)
    - [Place Creation Diagram](#Place-Creation-Diagram)
    - [Review Submission Diagram](#Review-Submission-Diagram)
    - [Fetching a List of Places Diagram](#Fetching-a-List-of-Places-Diagram)

## Introduction

The Hbnb project is a groupe project where we need to createa copy of the Airbnb site to learn the basic of web programmation

## High-Level Architecture



## Business Logic Layer



## API Interaction Flow

Purpose : Sequence Diagram represente how the site will communicate with the API, the Database and the front (User)  
key compennent :  
    - User : the "User" participant represent a User that will interact with the front of the site  
    - API : The "API" participant represent the Backend of the site that will receive the information from the front  
    - BusinessLogic : the "Business Logic" participant represent all the controle that we will do to the Data receive by the API  
    - Database : the "Databasec" participant represent the Database of the site that will stock all information of place and User  

### User Registration Diagram

![Sequence Diagrame for API CALL](/part1/SequenceDiagram_1_UserRegistration.png)

1 step : User connect to the site and sign up a new account  
2 step : Test if all information given by the User is right (mail existing, age possible,...)  
3 step : Saved all the data given by the User in the database  
4 step : Confirme that the database save all the wanted data  
5 step : The API get the error message or the confirmation message  
6 step : The user can see the message (Sucess or Fail to create is account)   


### Place Creation Diagram

![Sequence Diagrame for API CALL](/part1/SequenceDiagram_2_PlaceCreation.png)

### Review Submission Diagram

![Sequence Diagrame for API CALL](/part1/SequenceDiagram_3_ReviewSubmission.png)


### Fetching a List of Places Diagram

![Sequence Diagrame for API CALL](/part1/SequenceDiagram_4_PlacesCritera.png)
