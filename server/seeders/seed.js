const faker = require('faker'); /* https://fakerjsdocs.netlify.app/api/date.html */

const db = require('../config/connection');
const { User, Business, Appointment, Appointment_Type } = require('../models');

//-- Make db connection, delete ALL content, and build clean seed data.
db.once('open', async () => {
    
    //-- Purge Data
    await User.deleteMany({});
    await Business.deleteMany({});
    await Appointment.deleteMany({});
    await Appointment_Type.deleteMany({});


    /*    USER

            - Creates 10 users with randomized info with accounts that are
                up to 1-year old.
            - Adds to database
    */

    const userData = [];
   
    //-- Create 10 Users Data    
    for (let i = 0; i < 10; i += 1) {
        const name_first = faker.internet.firstName();
        const name_last = faker.internet.lastName();
        const username = faker.internet.userName();
        const email = faker.internet.exampleEmail(username); /* using example to ensure not real */
        const password = faker.internet.password();
        const date_created = faker.date.past(1); /* date in last 1 year */
        userData.push({ username, email, password });
    }

    //-- Add created users to database
    const createdUsers = await User.collection.insertMany(userData);




     /*    APPOINTMENT_TYPE

            - Creates a basic appointment type
            - Add to database
    */

    const appointmentTypeData = [];

    //-- Create unique Business
    for (let i = 0; i < 10; i += 1) {
        
        
        const name = "General";
        const description =  "Schedule an appointment.";
        const date_time =  "";
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
        const Appointments = {};
        const Users = {};

        //-- build array
        appointmentTypeData.push({ name, brand_name, Users });
    }

    //-- Add created appointment_type to database
    const createdAppointmentType = await Appointment_Type.collection.insertMany(appointmentTypeData);


    /*    APPOINTMENT

            - TBD
    */

            const appointmentData = [];

            //-- Create unique Business
            for (let i = 0; i < 10; i += 1) {
                
                
                const status = "scheduled";
                const date_created = "";
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
                const Appointments = {};
                const Users = {};
        
                //-- build array
                appointmentData.push({ name, brand_name, Users });
            }
        
            //-- Add created appointment_type to database
            const createdAppointmentData = await Appointment.collection.insertMany(appointmentData);



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

    // await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
    
    // const Users = createdUser[createdUsers.length-1];
    // createdUsers.pop(); /* remove the last user from array after assigning it to busienss*/


    



    
    // // create thoughts
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
