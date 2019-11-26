let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var dates = [];
var dayNumberLabelPadding = 2; // Padding for the corner day number
var dayLabelYPadding = 15;

var dateX = 0;

// X & Y for calendar position
let dateY = 200;
let startingX = 100;

var startingY; // For day names

var calendarPadding = 5;
var dateSize = 80;
var currentMonth;
var currentYear;

function setup() {
  startingY = dateY;

  var cnv = createCanvas(800,800);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  background(200);
  setDayOfWeek();

  // Set initial positions
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

  // Instantiate dates in current month
  for(let i = 0; i < days[currentMonth]; i++) {
    dates.push(new myDate());
    dateX += dateSize + calendarPadding;  // X Spacing
    if(dateX > dateSize*7 + calendarPadding*7 + startingX) // 7s here for 7 days of the week per row
    {
      // 0 Axis
      dateX = startingX + calendarPadding;
      dateY += dateSize + calendarPadding;  // dateSize to add new column
    }
  }
  noLoop();
}

function draw() {
  // Display dates in loop
  for(let i = 0; i < dates.length; i++) {
    dates[i].display(i+1);
  }
  // Draw day labels
  var textPadding = calendarPadding + dateSize/2; // Set initial day padding
  var daySize = 12;  // Set text font size

  for(let i = 0; i < dayNames.length; i++){
    textAlign(CENTER, CENTER);
    textSize(daySize);
    text(dayNames[i], startingX + textPadding, startingY - dayLabelYPadding);
    textPadding += dateSize + calendarPadding;
  }

  textSize(42);
  text(months[new Date().getMonth()], width/2,startingY - 80);


  stroke(0,0,0,100);  // Give line some opacity
  line(startingX + calendarPadding - calendarPadding*2, startingY - calendarPadding, dateSize*7 + calendarPadding*7 + startingX + calendarPadding*2, startingY - calendarPadding);
}

class myDate{
  constructor() {
    this.x = dateX;
    this.y = dateY;
  }
  display(d) {
    textAlign(LEFT, TOP);
    textSize(12);
    noStroke();
    rect(this.x, this.y, dateSize, dateSize);
    text(d, this.x + dayNumberLabelPadding, this.y + dayNumberLabelPadding);
    if(d == new Date().getDate()) // Current date
    {
      push();
      fill(230,110,70); // Orange
      rect(this.x, this.y, dateSize, dateSize); // Rerender date
      fill(0,0,0);
      text(d, this.x + dayNumberLabelPadding, this.y + dayNumberLabelPadding); // Rerender text
      pop();
    }
  }
}

// Gets 1st day of the month and sets initial position
function setDayOfWeek()
{
  var firstDate = new Date(new Date().getFullYear(), new Date().getMonth());
  switch(firstDate.getDay()){
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

    case 5: // friday
      dateX += dateSize*5 + calendarPadding*5;
      break;

    case 6: // saturday
      dateX += dateSize*6 + calendarPadding*6;
  }
}
