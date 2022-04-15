# Calendari

## What is this application?
This application is for scheduling appointments. It can be customized per the business needs, whether it's a tattoo studio, a hair salon, or a scuba diving facility. The users will log in, select the date they want to have an appointment, and then based on the current appointments already scheduled, the user will be presented with times that aren't already taken.

This also allows the business to customize their schedule to their needs, and get a birds eye view of their appointments they have coming up, including cancellations.

## How did we build this?
This application was built using GraphQL with a Node and Express server on the backend, that communicated with MongoDB and the Mongoose ODM. Queries and mutations were used to retrieve, add, update and delete data. We styled this application using React and CSS, and deployed it using Heroku.

## What does it look like?
Please see a screenshot and a gif below of the home page of our application:

![calendari](https://user-images.githubusercontent.com/17508965/163516050-13f5f82f-8802-4ea9-899a-196af43b87a1.gif)


## Where can I find this?
You can either visit our github repository (https://github.com/ErikPlachta/Calendari) or visit the deployed application at https://calendari-day.herokuapp.com/


---

## Overall Concept

An online appointment management system that automates Creating, Updating, Canceling, and overall communication to our customers and their clients. Our customers have a unique login, URL, and the ability to customize their availability, appointment types, Business Name, and overall styling to create a unique customer experience that fits their needs.


## User Story

### When a User wants to provide an Online Scheduling solution to their customers

1. WHEN a User creates an account, THEN they're able to define their business details, and availability for appointments.
2. WHEN a User creates an appointment type, THEN they are able to define all of the appointment details.
3. WHEN an appointment type is created, THEN it can be published to make it available to a public URL.
4. WHEN a User's customer schedules an appointment from the shared link, THEN the User's customer selects their appointment type, fills in the details, and approves the appointment.
5. WHEN a Users customer finishes the appointment, THEN User and their customer are sent an email confirmation. 

### When a User Creates an account

1. Users can create new accounts for their business to simplify online management.
6. WHEN User creates a new account, THEN can use Google to signup or fill in the basic information manually.
7. WHEN you sign in, THEN you're routed to your Business Management dashboard
8. WHEN account configuration is incomplete, THEN your Dashboard will guide you to a resolution. 
9. WHEN setting up your account, THEN you will be **required**  to do the following before your Scheduler will become availble.
     1. **Confirm your Business Details**
       2. Verify your Business Name as it appears to a customer
       4. Define your Business Hours
       6. Define your Business Contact Phone Number
       7. Define your business Contact Email
     2. **Setup your Calendar** ( _optional_ )
       1. User has the option to link to Google Calendar
       2. User  has the option to NOT have a calendar 
          - _When customers request appointments, an email is sent off the request with no calendar association._
     3. **Setup your Appointment Details**
        1. Define global Date-Time availability 
           -  _Affects all appointments by default unless otherwise specified._
        2. Select at least 1 Appointment
           - _User was presented with a few basic templates._
           - _When selected, the user can define the dynamic details of an appointment._
10. Optionally, you can also do the following
     1. Configure your User Account
     12. Create new Users
