let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var dates = [];
var dayNumberLabelPadding = 2; // Padding for the corner day number
var dayLabelYPadding = 15;

var dateX = 0;

// Starting Positions
let dateY = 150;
let startingX = 130;

var startingY; // for day names, dont change

var calendarPadding = 5;
//monday = padding, tuesday = padding + size of one, wednesday = padding + size of 2 etc.//
var dateSize = 40;
var currentMonth;
var currentYear;
//TODO: Make first box (default dateX, dateY) start at
// corresponding month start day (mon, sun, etc.)

function setup() {
  startingY = dateY;

  createCanvas(600,600);
  background(200);
  setDayOfWeek();

  // set initial positions
  dateX += calendarPadding + startingX;
  dateY += calendarPadding;

  // Get month and add corresponding days
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();

  // Add leap years
  if(((currentYear % 4 == 0) && (currentYear % 100 != 0)) || (currentYear % 400 == 0))
  {
    days[1] = 29;
  }

  // instantiate dates
  for(let i = 0; i < days[currentMonth]; i++) {
    dates.push(new myDate());
    dateX += dateSize + calendarPadding;  // X Spacing
    if(dateX > dateSize*7 + calendarPadding*7 + startingX) // 7s here for 7 days of the week
    {
      // 0 Axis
      dateX = startingX + calendarPadding;
      dateY += dateSize + calendarPadding;  // dateSize to add new column
    }
  }
  noLoop(); // Stop looping (Refactor this code later :P)
}

function draw() {
  // Display dates in loop
  for(let i = 0; i < dates.length; i++) {
    dates[i].display(i+1);
  }
  // Draw day labels
  var textPadding = calendarPadding + dateSize/2; // Set initial day padding
  var daySize = 6;  // Set text size
  for(let i = 0; i < dayNames.length; i++){
    textAlign(CENTER, CENTER);
    textSize(daySize);
    text(dayNames[i], startingX + textPadding, startingY - dayLabelYPadding);
    textPadding += dateSize + calendarPadding;
  }
  // day label/calendar line // padding for line should be calendarPadding*2
  line(startingX + calendarPadding, startingY, dateSize*7 + calendarPadding*7 + startingX, startingY);
}

class myDate{
  constructor() {
    this.x = dateX;
    this.y = dateY;
  }
  display(d) {
    textAlign(LEFT, TOP);
    textSize(6);
    //noStroke();
    rect(this.x, this.y, dateSize, dateSize);
    text(d, this.x + dayNumberLabelPadding, this.y + dayNumberLabelPadding);
  }
}

function setDayOfWeek()
{
  switch(new Date().getDay()){

    case 0: // sunday
      dateX = dateX;
      break;

    case 1: //monday
      dateX += dateSize + calendarPadding
      break;

    case 2: // tuesday
      dateX += dateSize*2 + calendarPadding*2;
      break;

    case 3: // wednesday
      dateX += dateSize*3 + calendarPadding*3;
      break;

    case 4: // thursday
      dateX += dateSize*4 + calendarPadding*4;
      break;

    case 5: // Friday
      dateX += dateSize*5 + calendarPadding*5;
      break;

    case 6: // saturday
      dateX += dateSize*6 + calendarPadding*6;
  }
}
