//-- used to get time passed on things
var moment = require('moment'); //-- Using to add more dynamic date-time in view

//------------------------------------------------------------------------------
//-- Data Validation Helpers


//-- verify if an email, return all lowercase.
export function emailValidate(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


//------------------------------------------------------------------------------
//-- Data Manipulation


//-- first letter of string to capital letter
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


//-- take a string payload, shrink it to a specific length. If length not defined, default is 100.
export function stringShrink(content, length) {
    
    //-- if undefined, default is 100 characters
    if(!length){ length = 100; }

    //-- if length is greater than 100 shrink it and then return that sub-string
    if (content.length > 100) return content.substring(0,100) + '...';
    
    //-- Otherwise return what was sent in no modification needed.
    return content;
  }


//------------------------------------------------------------------------------
//-- Data Time Specific Helpers

//-- list the 12 months
export function dateGetMonths(){
  return moment.months();
}

export function getDays(numberOfDays){
  //-- Request number of days from today, get results

  var getDaysBetweenDates = function(startDate, endDate) {
    var now = startDate.clone(), dates = [];

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format('MM-DD-YYYY'));
        now.add(1, 'days');
    }
    return dates;
  };

  var startDate = moment('04-01-2022','MM-DD-YYYY');
  var endDate = moment(dateFormat(new Date(new Date().setDate(new Date().getDate() + numberOfDays))));
  // console.log(startDate,endDate)
  // console.log(dateFormat(Date.now()))
  
  
  var dateList = getDaysBetweenDates(startDate, endDate);
  
  // var startdate = "20.03.2014";
  // console.log(startDate,endDate,new_date)

  console.log(dateList);


}


export function dateTimeFullLocal(date){
  return moment(date).local().format("dddd, MMMM Do YYYY, h:mm:ss a");
}

export function dateTimeFull(date){
  // moment(date)
  return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
}

export function dateDayOfWeek(date){
  return moment(date).day();
}

export function dateHourOfDay(date){
  return moment(date).format("ddd, hA"); 
}

export function dateFormatPicker(date){
  return moment(date).format('YYYY-MM-DD');
}
//-- Send in raw JavaScript Date/Time Value from date.Now() and returns MM/DD/YYYY format
export function dateFormat(date) {
  return moment(date).format('MM-DD-YYYY');

  // return `${
  //   new Date(date).getMonth() + 1}
  //   /${new Date(date).getDate()}
  //   /${new Date(date ).getFullYear()
  // }`;
};

//-- Send in raw JavaScript Date/Time Value from date.Now(), get time passed in seconds, minutes, hours or days.
export function dateGetTimePassed(date){
  //-- Get current time
  var now = moment(new Date()); 
  //-- Get the diff between now and created date
  var duration = moment.duration(now.diff(date));
  //-- Return value in hours
  var results = duration.asHours();

  if(results < 0.01){ let seconds = ((duration._data.seconds)) + " s"; return seconds; }
  if(results < 1){ let minutes = ((duration._data.minutes)) + " m"; return minutes; }
  if(results < 24){ let hours = (Math.trunc(results)) + " h"; return hours; }
  if(results >= 24){ let days = Math.trunc(results / 24) + " d"; return days; }
  
  //-- If for some reason gets to this point, return nothing. ( shouldn't happen but being safe )
  return null;
};


//------------------------------------------------------------------------------
//-- Exports