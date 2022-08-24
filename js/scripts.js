var gender = ["male", "female", "neutral"];
var species = ["human", "bug", "animal", "fish", "noodle", "bird", "monster", "elf", "dwarf", "dragon", "lizard"];
var classes = ["barbarian", "fighter", "cleric", "bard", "wizard", "sorcerer", "druid", "rogue", "monk", "ranger", "artificer"];
var savedResult = [];
var charResult = [];
var partySettings = [];
var masterSettings = [];
var totalChars = 6;

// generates the current species being used
function generateSpecies() {
  var curSpecies = 0;
  curSpecies = Math.floor(Math.random() * species.length);
  return curSpecies;
}

// gets random a random number for color settings
function color() {
  return Math.floor(Math.random() * 256)
}

// displays the generated party and creates arrays to prepare for any saves
function generateDisplay() {
  document.getElementById("display").innerHTML = "<h1>Your party!</h1>"
  var playerClass = "";
  var speciesSet = "";
  for (i = 1; i < totalChars + 1; i++) {
    // variable and random num declarations
    var charSet = "";
    var allSettings = [];
    playerClass = Math.floor(Math.random() * classes.length);
    speciesSet = species[generateSpecies()];
    
    // the party html (per character)
    charSet =
    "<section class='char' id='char" + i + "'>" +
    "<h1>Character " + i + "</h1>" +
    "<img src='img/" + speciesSet + ".png' alt='Species'></img>" +
    "<section class='up'>" + 
    "<p id='species" + savedResult.length + "_" + i + "' class='top'>Species: " + speciesSet + "</p>" +
    "<p id='gender_" + savedResult.length  + "_" + i + "' class='top'>Gender: " + gender[Math.floor(Math.random() * gender.length)] + "</p>" +
    "<p id='class_" + savedResult.length + "_" + i + "' class='top'>Class: " + classes[playerClass] + "</p>" +
    "</section>" +
    "<section class='down'>" + 
    "<p class='bottom' id='color1_" + i + "'>rgba( " + color() + ", " + color() + ", " + color() + ", 1)</p>" +
    "<p class='bottom' id='color2_" + i + "'>rgba( " + color() + ", " + color() + ", " + color() + ", 1)</p>" +
    "<p class='bottom' id='color3_" + i + "'>rgba( " + color() + ", " + color() + ", " + color() + ", 1)</p>" +
    "</section></section>";
    
    // makes an array with the current party html
    charResult.push(charSet);

    // prints all six characters, not just the last one
    if (i != 1) {
      document.getElementById("display").innerHTML += charResult[i -1];
    } else {
      document.getElementById("display").innerHTML = charResult[i - 1];
    }
    
    // the shorthand data for the txt file
    partySettings.push(
    (allSettings[0] = document.getElementById("species" + savedResult.length + "_" + i + "").innerHTML),
    (allSettings[1] = document.getElementById("gender_" + savedResult.length  + "_" + i + "").innerHTML),
    (allSettings[2] = document.getElementById("class_" + savedResult.length + "_" + i + "").innerHTML),
    (allSettings[3] = document.getElementById("color1_" + i + "").innerHTML),
    (allSettings[4] = document.getElementById("color2_" + i + "").innerHTML),
    (allSettings[5] = document.getElementById("color3_" + i + "").innerHTML))

    // sets the color of the current party characters
    document.getElementById("color1_" + i).style.color = document.getElementById("color1_" + i).innerHTML
    document.getElementById("color2_" + i).style.color = document.getElementById("color2_" + i).innerHTML
    document.getElementById("color3_" + i).style.color = document.getElementById("color3_" + i).innerHTML
  }

  // button options
  document.getElementById("buttonDisplay").innerHTML = "<button id='reset' onclick='reset()'>Generate</button>"
  document.getElementById("buttonDisplay").innerHTML += "<button id='save' onclick='saveParty()'>Save Party</button>";
  document.getElementById("buttonDisplay").innerHTML += "<button id='print' onclick='printParty()'>Print Party</button>";
}

// shows the saved party and creates data file
function saveParty() {
  // used as a counter and an array
  savedResult.push(charResult);

  // displays saved parties
  document.getElementById("saved").innerHTML += "<section>"
  for (i = 1; i < totalChars + 1; i++) {
  document.getElementById("saved").innerHTML += charResult[i - 1];
  }
  document.getElementById("saved").innerHTML += "</section>"

  // sends the party settings array to a new txt file
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([partySettings], {
    type: "text/plain"
  }));
  a.setAttribute("download", "party.txt");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // calls the reset function to clear arrays
  reset();
}

// prints the window when print button is pressed
function printParty() {
  window.print();
}

// resets the current party and adds to the master list
function reset() {
  charResult = [];
  generateDisplay();
  masterSettings.push(partySettings);
  partySettings = [];
}