const faker = require('faker'); /* https://fakerjs.dev/api/ */

const db = require('../config/connection');
const { User, Business, Appointment, Appointment_Type } = require('../models');

//-- Make db connection, delete ALL content, and build clean seed data.
db.once('open', async () => {
    
    //-- Purge Data
    // try{
        await User.deleteMany({});
    // }
    // catch (err){
        console.log("No users to delete")
    // }
    await Business.deleteMany({});
    await Appointment.deleteMany({});
    // try {
    await Appointment_Type.deleteMany({});
    // }
    // catch (err){
    //     console.log("No Appointment_Type to delete")
    // }


    /*    USER

            - Creates 10 users with randomized info with accounts that are
                up to 1-year old.
            - Adds to database
    */

    const userData = [];
   
    //-- Create 10 Users Data    
    for (let i = 0; i < 10; i += 1) {
        const name_first = faker.name.firstName();
        const name_last = faker.name.lastName();
        const username = faker.internet.userName();
        const email = faker.internet.exampleEmail(username); /* using example to ensure not real */
        const password = faker.internet.password();
        const date_created = faker.date.past(1); /* date in last 1 year */
        userData.push({ name_first, name_last, username, email, password, date_created });
    }

    //-- Add created users to database
    const createdUsers = await User.collection.insertMany(userData);


    console.log("##-- Created Users complete.")
    console.table(userData)





     /*    APPOINTMENT_TYPE

            - Creates a basic appointment type
            - Add to database
    */

    const appointmentTypeData = [];

    //-- Create unique Business
    for (let i = 0; i < 1; i += 1) {
        
        
        const name = "General";
        const description =  "Schedule an appointment.";
        const date_time =  "";
        //-- template of what it needs to be, should be empty here.
        const Details = {
            "subject"       : "",
            "date"          : "",
            "duration"      : "",
            "time_Start"    : "",
            "timezone"      : "",
            "client"        : {
                                "name": "",
                                "email": "",
                                "phone": ""
            }
        };
        // const Appointments = {};
        // const Users = {};

        //-- build array
        appointmentTypeData.push({ name, description, date_time, Details });
    }

    //-- Add created appointment_type to database
    const createdAppointmentType = await Appointment_Type.collection.insertMany(appointmentTypeData);


    console.log("##-- Created Appointment_Type complete.")
    console.table(appointmentTypeData)






    /*    APPOINTMENT

            - TBD
    */

    const appointmentData = [];

    //-- Create unique Business
    for (let i = 0; i < 50; i += 1) {
        
        //-- used for username and email below, not sent directly
        const name = faker.name.findName();

        const status = "scheduled";
        const date_created = "";
        const Details = {
            "subject"       : faker.lorem.words(Math.round(Math.random() * 10) + 1),
            "date"          : "04/15/2022",
            "duration"      : "45 minutes",
            "time_Start"    : faker.date.between('2022-04-10T00:00:00.000Z', '2022-05-01T00:00:00.000Z'),
            "timezone"      : "EST",
            "client"        : {
                                "name": name,
                                "email": faker.internet.exampleEmail(name), /* using example to ensure not real */
                                "phone": faker.phone.phoneNumber()
            }
        };
        // const Appointments = {};
        // const Users = {};

        //-- build array
        appointmentData.push({ status, date_created, Details });
    }

    //-- Add created appointment_type to database
    const createdAppointmentData = await Appointment.collection.insertMany(appointmentData);

    console.log("##-- Created Appointment Data complete.")
    console.table(appointmentData)






    /*    BUSINESS

            - Creates X businesses
            - Relate to Users
            - Add to Database
            - Adds to database

    */

    const businessData = [];

    //-- Create unique Business
    for (let i = 0; i < 10; i += 1) {
        const name = faker.company.companyName();
        const brand_name = name.replace(/\s+/g, ''); /* take name and make it url friendly */
        const configuration = {
            "schedule"  : {
                "sunday": {
                    "start"     :   "00:00",
                    "end"       :   "00:00",
                    "verified"  :   "false"
                },
                "monday": {
                    "start"     :   "09:00",
                    "end"       :   "15:00",
                    "verified"  :   "false"
                },
                "tuesday": {
                    "start"     :   "09:00",
                    "end"       :   "15:00",
                    "verified"  :   "false"
                },
                "wednesday": {
                    "start"     :   "09:00",
                    "end"       :   "15:00",
                    "verified"  :   "false"
                },
                "thursday": {
                    "start"     :   "09:00",
                    "end"       :   "15:00",
                    "verified"  :   "false"
                },
                "friday": {
                    "start"     :   "09:00",
                    "end"       :   "15:00",
                    "verified"  :   "false"
                },
                "saturday": {
                    "start"     :   "09:00",
                    "end"       :   "15:00",
                    "verified"  :   "false"
                }
            }
};
        businessData.push({ name, brand_name, configuration});
    }

    //-- Add created users to database
    const createdBusinesses = await Business.collection.insertMany(businessData);

    console.log("##-- Created Businesses complete.")
    console.table(businessData)
    // await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
    
    // const Users = createdUser[createdUsers.length-1];
    // createdUsers.pop(); /* remove the last user from array after assigning it to busienss*/


    
    // create thoughts
    // let createdThoughts = [];
    // for (let i = 0; i < 100; i += 1) {
    //     const thoughtText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    //     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    //     const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    //     const createdThought = await Thought.create({ thoughtText, username });

    //     const updatedUser = await User.updateOne(
    //     { _id: userId },
    //     { $push: { thoughts: createdThought._id } }
    //     );

    //     createdThoughts.push(createdThought);
    // }

    // // create reactions
    // for (let i = 0; i < 100; i += 1) {
    //     const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    //     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    //     const { username } = createdUsers.ops[randomUserIndex];

    //     const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
    //     const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

    //     await Thought.updateOne(
    //     { _id: thoughtId },
    //     { $push: { reactions: { reactionBody, username } } },
    //     { runValidators: true }
    //     );
    // }

    console.log('all done!');
    process.exit(0);
});
