# Hbnb Project Holberton School

## Summary

1. [Introduction](#1-Introduction-to-the-projet).
2. [High-Level Architecture](#2-High-Level-Package-Diagram)
3. [Business Logic Layer](#3-Detailed-Class-Diagram-for-Business-Logic-Layer)
4. [API Interaction Flow](#4-API-Interaction-Flow)  
    - [User Registration Diagram](#41-User-Registration-Diagram)  
    - [Place Creation Diagram](#42-Place-Creation-Diagram)  
    - [Review Submission Diagram](#43-Review-Submission-Diagram)  
    - [Fetching a List of Places Diagram](#44-Fetching-a-List-of-Places-Diagram)  

## 1. Introduction to the projet  

The Hbnb project is a group project where we have to create a copy of the Airbnb site to learn the basics of web pragramming. It will be done in 4 step.  

- **first step :**  
Create 6 diagrams, 1 of High Level Package, 1 of Detailed Class for Business Logic Layer and 4 for the API Interaction Flow. With that create we have a great and global view of our site.  
- **seconde step :**  
Create the API and the Business Logic Layer...  
- **third step :**  
Create the database...  
- **fourth step :**  
Create the web client...  

## 2. High-Level Package Diagram  

![High-Level Package Diagram](/part1/High_level_diagram.png)  

**Purpose :**  
This diagram is use to show the architecture of the HBnB application and the comunication between layer. The diagram is an overview of how the different components of the application are organized and how they interact. He will not show the detail of each Layer but give a large overview.  

**Key component :**  

- *PresenationLayer :* This layer handle the inforation beteewn the user (in the front) and the Back and have all method that is use by the API to test te information (those method name is visible by the front so the User).  
    -  *Facade pattern :* Is the separation on what the user have visibility and what he can't see.  
- *BusinessLogicLayer :* This layer handle the data communication to the Database Operation he have acces to methode to save update delete or list data.  
    - *Database Operations :* Is the methode use to acces the Database.  
- *PersistenceLayer :* This layer is the way to acces to de Database.  

## 3. Detailed Class Diagram for Business Logic Layer  

![Detailed Class Diagram for Business Logic Layer](/part1/Details_class_Diagram.png)  

**Purpose :**  

This diagram shows the details of all the classes in the Business Logic Layer, including their attributes (type and name) and methods (return type and parameters), and finally shows the dependencies between the different classes.  

**class :** 

- *User :* This class represents a user with their personal information (e.g., age, first_name, last_name, etc.) and contains a list of reviews and another list of places. It also includes the creation date of the user and the last time the data was updated, and provides methods to list, update, insert, and delete data.  
- *Place :* This class represents a place with their caracteristic information (e.g. name, owner, localisation,...)it also includes the creation date of the place and the last time the place data was updated and provides methods to list, update, insert, and delete data.  
- *Amenity :* This class represente one amenity of an place with some variable like her name, description, if this amenity is public or not, when she is create, when data as been modified and provides methods to list, update, insert, and delete data.  
- *Review :* This class represente a review given by a user for a place. It contain the content of the review his date of creation, his date of modification and provides methods to list, update, insert, and delete data.   

**Relation between Class :**  

- User can be create without nothing more than correct personnal information.  
- Place can be create and need to be associate with an User.  
- Amenitie need a the class Place to be create.  
- Review need the class Place and User to be create.  

## 4. API Interaction Flow  

**Purpose :**  

Sequence Diagram represente how the site will communicate with the front (User), the API, the BusinessLogic and the Database.

**key compennent :**  

- *User* : The "User" participant represent a User that will interact with the front of the site.  
- *API* : The "API" participant represent the Backend of the site that will receive the information from the front.  
- *BusinessLogic* : The "Business Logic" participant represent all the test that we will do to the Data receive by the front.  
- *Database* : The "Databasec" participant represent the Database of the site that will stock all information of place and User.  

### 4.1 User Registration Diagram  

![Sequence Diagrame for API CALL](/part1/SequenceDiagram_1_UserRegistration.png)

- **1 step** : User connect to the site, create a new account with his personal information.  
- **2 step** : Test if all information given by the User is right (mail existing, age possible,...).  
- **3 step** : Create the User in the database and save all his information in it.  
- **4 step** : Confirme that the database save and create all the wanted data.  
- **5 step** : The API get the error message or the confirmation message and send it to the front.  
- **6 step** : The user can see the message (Sucess or Fail to create is account).   


### 4.2 Place Creation Diagram  

![Sequence Diagrame for API CALL](/part1/SequenceDiagram_2_PlaceCreation.png)

- **1 step** : User create a place.  
- **2 step** : Test if all information of the place given by the User is right (city exist, house with a first floor, User have an account,...).  
- **3 step** : Create the place in the database and save all information given by the User in it.  
- **4 step** : Confirme that the database save and create all the wanted data.  
- **5 step** : The API get the error message or the confirmation message.  
- **6 step** : The user can see the message (Sucess or Fail to create the place).   

### 4.3 Review Submission Diagram  

![Sequence Diagrame for API CALL](/part1/SequenceDiagram_3_ReviewSubmission.png)

- **1 step** : User with an account give a review on a place.  
- **2 step** : Test if the User have an account.  
- **3 step** : Saved the review in the database.  
- **4 step** : Confirme that the database save the review.  
- **5 step** : The API get the error message or the confirmation message.  
- **6 step** : The user can see the message (Sucess or Fail to save the review).   


### 4.4 Fetching a List of Places Diagram  

![Sequence Diagrame for API CALL](/part1/SequenceDiagram_4_PlacesCritera.png)

- **1 step** : User search for a specific place.  
- **2 step** : Test the coherence of the criteria given (house at the five floor, apartment at the 9999 floor,... ).  
- **3 step** : Search in the database all places that match to all criteria.  
- **4 step** : Return all places that match or none if no place match.  
- **5 step** : The API get all the places that match or none.
- **6 step** : The user can see the places or no place found.  



