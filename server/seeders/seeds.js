const faker = require('faker'); /* https://fakerjs.dev/api/ */

const db = require('../config/connection');
const { User, Business, Appointment, Appointment_Type } = require('../models');

seedExplicitData()

function seedExplicitData(){
    db.once('open', async () => {
        
        //-- Purge local data to reset
        await User.deleteMany({});
        await Business.deleteMany({});
        await Appointment.deleteMany({});
        await Appointment_Type.deleteMany({});
    

        //--            USER

        //-- seeder for StarFleet Users
        const userData = [
            {
                "user_id"       :   "0000-0000",
                "name_first"    :   "Erik",
                "name_Last"     :   "Plachta",
                "username"      :   "Erik",
                "email"         :   "erik@noemail.com",
                "password_has"  :   "abcdefg-heres-my-password-don't-hack-me",
                "date_created"  :   "1649213599934",
                "date_login"    :   "1649213599934",
                "Appointments"  :   [
                                        "0000-0000-1111"
                ],
                "business_id"   :   "0000-AAAA"
            },
            {
                "user_id"       :   "1111-1111",
                "name_first"    :   "Christiana",
                "name_Last"     :   "Sullivan Morales",
                "username"      :   "Christiana",
                "email"         :   "christiana@noemail.com",
                "password_has"  :   "abcdefg-heres-my-password-don't-hack-me",
                "date_created"  :   "1649213599934",
                "date_login"    :   "1649213599934",
                "appointments"  :   [
                                        "0000-0000-2222"
                ],
                "business_id"   :   "0000-AAAA"
            },
            {
                "user_id"       :   "2222-2222",
                "name_first"    :   "Mary",
                "name_Last"     :   "Lawton",
                "username"      :   "Mary",
                "email"         :   "mary@noemail.com",
                "password_has"  :   "abcdefg-heres-my-password-don't-hack-me",
                "date_created"  :   "1649213599934",
                "date_login"    :   "1649213599934",
                "appointments"  :   [
                                        "0000-0000-3333"
                ],
                "business_id"   :   "0000-AAAA"
            }
            
        ];

        //-- Add created users to database
        const createdUsers = await User.collection.insertMany(userData);
        console.log("##-- Created Users complete.")
        console.table(userData)


        
        //--            APPOINTMENT_TYPE

        //-- seeder for StarFleet Appointments
        const appointmentTypeData = [
            {
                "_id"           :   "0000-0000",
                "name"          :   "Federation Citizen - Starfleet Exam 🖖🏼",
                "summary"       :   "All Federation citizens, schedule your StarFleet Exam here.",
                "description"   :   "This exam is designed to look for certain qualities a person displayed, including: integrity, intelligence, courage, imagination, and leadership qualities. Candidates are to expect the unexpected during this exam.",
                "date_time"          :   "6 Hours",
                "Details"        :   {
                                        "subject"       : "Federation Citizen - Starfleet Exam",
                                        "date"          : "04/14/2022",
                                        "duration"      : "Undetermined",
                                        "time_start"    : "04:00",
                                        "timezone"      : "Earth",
                                        "client"        : {
                                                            "name": "",
                                                            "email": "",
                                                            "phone": ""
                                        }
                }
            },
            {
                "_id"           :   "0000-0001",
                "name"          :   "Non-Federation Citizen - Starfleet Exam 🌎",
                "summary"       :   "For non-Federation citizens, eligibility is considered with a letter of reference from a Command Level Starfleet Officer on file.",
                "description"   :   "This exam is designed to look for certain qualities a person displayed, including: integrity, intelligence, courage, imagination, and leadership qualities. Candidates are to expect the unexpected during this exam.",
                "date_time"          :   "6 Hours",
                "Details"        :   {
                                        "subject"       : "Non-Federation Citizen - Starfleet Exam",
                                        "date"          : "04/23/2022",
                                        "duration"      : "Undetermined",
                                        "time_start"    : "04:00",
                                        "timezone"      : "Earth",
                                        "client"        : {
                                                            "name": "",
                                                            "email": "",
                                                            "phone": ""
                                        }
                }
            }
        ]

        //-- Add created appointment_type to database
        const createdAppointmentType = await Appointment_Type.collection.insertMany(appointmentTypeData);


        console.log("##-- Created Appointment_Type complete.")
        console.table(appointmentTypeData)


        //--            APPOINTMENT

        const appointmentData = [
                {
                    "_id"               :   "0000-0000-1111",
                    "status"            :   "Scheduled",
                    "User"              :   {
                                                "_id"           :   "0000-0000",
                                                "name_first"    :   "Kathryn",
                                                "name_last"     :   "Janeway"
                    },
                    "Business"          :   {
                                                "business_id"           :   "0000-AAAA",
                    },
                    "Appointment_Type"  :   {
                                                "_id"           :   "0000-0000",
                                                "name"          :   "General",
                                                "description"   :   "Schedule an appointment with ${brand_name}."
                    },
                    "Details"           :   {
                                                "subject"       : "Want to discuss X with You",
                                                "summary"       : "I want to talk about x and go over y to accomplish z",
                                                "date_time"          : "2022-04-13 10:00:00",
                                                "duration"      : "45 minutes",
                                                "timezone"      : "EST",
                                                "client"        : {
                                                                    "name": "Mary",
                                                                    "email": "mary@noemail.com",
                                                                    "phone": "000-867-5309"
                                                }
                    }
                },
                {
                    "_id"               :   "0000-0000-1112",
                    "status"            :   "Scheduled",
                    "User"              :   {
                                                "_id"           :   "0000-0000",
                                                "name_first"    :   "Benjamin",
                                                "name_last"     :   "Sisko"
                    },
                    "Business"          :   {
                                            "business_id"           :   "0000-AAAA",
                    },
                    "Appointment_Type"  :   {
                                                "_id"           :   "0000-0000",
                                                "name"          :   "General",
                                                "description"   :   "Schedule an appointment with ${brand_name}."
                    },
                    "Details"           :   {
                                                "subject"       : "Want to discuss X with You",
                                                "summary"       : "I want to talk about x and go over y to accomplish z",
                                                "date_time"          : "2022-04-10 14:00:00",
                                                "duration"      : "45 minutes",
                                                "timezone"      : "EST",
                                                "client"        : {
                                                                    "name": "Christiana",
                                                                    "email": "christiana@noemail.com",
                                                                    "phone": "000-867-5309"
                                                }
                    }
                    }
        ]

        //-- Add created appointment_type to database
        const createdAppointmentData = await Appointment.collection.insertMany(appointmentData);

        console.log("##-- Created Appointment Data complete.")
        console.table(appointmentData)




        //--            BUSINESS

        const businessData = [
            {
                "business_id"       :   "0000-AAAA",
                "name"              :   "Starfleet Academy",
                "welcome"           :   "Welcome the the Starfleet Academy Online Scheduler.",
                "brand_name"        :   "starfleet-academy",
                "configuration"     :   {
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
                },
                "Users"     :   [
                                        "0000-0000",
                                        "1111-1111",
                                        "2222-2222"
                ],
                "Appointments"  : [
                                        "0000-0000-1111",
                                        "0000-0000-2222",
                                        "0000-0000-3333"   
                ]
            }
        ]
         
        //-- Add created users to database
        const createdBusinesses = await Business.collection.insertMany(businessData);

        console.log("##-- Created Businesses complete.")
        console.table(businessData)
        

        //TODO:: 04/06/2022 #EP || Add relationships. ( basic concept below for future. )
        // await Business.updateOne({ _id: userId }, { $addToSet: { Users: userId } });
        // const Users = createdUser[createdUsers.length-1];
        // createdUsers.pop(); /* remove the last user from array after assigning it to business*/


        console.log('//-- Explicit relational seeding for StarFleet is completed');
        process.exit(0);
    });
};


function seedRandomData(){

    //-- Make db connection, delete ALL content, and build clean seed data.
    db.once('open', async () => {
        
        //-- Purge local data to reset
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
                "date_time"          : "",
                "duration"      : "",
                "timezone"      : "",
                "client"        : {
                                    "name": "",
                                    "email": "",
                                    "phone": ""
                },
                "configuration" : {}
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





    faker.date.recent(10)
        /*-- APPOINTMENT  --------------------------------------------------------*/

        const appointmentData = [];

        //-- Create unique Business
        for (let i = 0; i < 50; i += 1) {
            
            //-- used for username and email below, not sent directly
            const name = faker.name.findName();

            const status = "scheduled";
            const date_created = faker.date.recent(10);
            const Details = {
                "subject"       : faker.lorem.words(Math.round(Math.random() * 10) + 1),
                "duration"      : "45 minutes",
                "date_time"    : faker.date.between('2022-04-10T00:00:00.000Z', '2022-05-01T00:00:00.000Z'),
                "timezone"      : "EST",
                "client"        : {
                                    "name": name,
                                    "email": faker.internet.exampleEmail(name), /* using example to ensure not real */
                                    "phone": faker.phone.phoneNumber('###-###-###')
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
            const Appointment_Types = {};
            const Appointments = {};
            const Users = {};
            
            businessData.push({ name, brand_name, configuration});
        }

        //-- Add created users to database
        const createdBusinesses = await Business.collection.insertMany(businessData);

        console.log("##-- Created Businesses complete.")
        console.table(businessData)
        

        //TODO:: 04/06/2022 #EP || Add relationships. ( basic concept below for future. )
        // await Business.updateOne({ _id: userId }, { $addToSet: { Users: userId } });
        // const Users = createdUser[createdUsers.length-1];
        // createdUsers.pop(); /* remove the last user from array after assigning it to business*/


        console.log('//-- No relational seeding is completed');
        process.exit(0);
    });
};