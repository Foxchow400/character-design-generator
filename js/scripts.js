var gender = ["male", "female", "other"];
var species = ["human", "bug", "animal", "fish", "noodle", "bird", "monster", "elf", "dwarf", "dragon", "lizard"];
var classes = ["barbarian", "fighter", "cleric", "bard", "wizard", "sorcerer", "druid", "rogue", "monk", "ranger", "artificer"];
var savedResult = [];
var charResult = [];
var partySettings = [];
var partyObj = {};
var totalChars = 6;
var imported;

function onFilePicked(evt) {
  var file = document.getElementById("filePicker").files[0]
  var reader = new FileReader()
  reader.readAsText(file, "UTF-8") // read file as text
    
  if (file) {
    reader.onload = function (evt) {
      validatedFile = evt.target.result
      validatedFile = String(validatedFile)
      console.log(validatedFile)
      partyObj = JSON.parse(validatedFile);
      generateDisplay();
      return validatedFile
    }
    reader.onerror = function (evt) {
        display("display", "Error: Unable to read file.")
    }
  }
}

// generates the current species being used
function getRandom(arr) {
  var curNum = Math.floor(Math.random() * arr.length);
  return curNum;
}

function individualGen(i) {
  console.log(i)
  generateStats(i)
  document.getElementsByClassName("char")[i].innerHTML =
     "<h2 class='space'>Character " + (Math.floor(i) + 1) + "</h2>" + 
     "<img class='' src='img/" + partyObj[i].species + ".png'></img>" +
     "<section class='down'>" +
     "<div class='color' style='background-color:" + partyObj[i].colors[0] + "'><p class='space'>Species: " + partyObj[i].species + "</p></div>" +
     "<div class='color' style='background-color:" + partyObj[i].colors[1] + "'><p class='space'>Class: " + partyObj[i].class + "</p></div>" +
     "<div class='color' style='background-color:" + partyObj[i].colors[2] + "'><p class='space'>Gender: " + partyObj[i].gender + "</p></div>" +
     "</section><button class='reroll' value='" + i + "'onclick='individualGen(this.value)'>Reroll</button>";
}

function color() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

// displays the generated party and creates arrays to prepare for any saves
function generateDisplay() {
  document.getElementById("display").innerHTML = "<h1>Your party!</h1>"
  if (Object.keys(partyObj).length < totalChars) {
    console.log("Generating");
    for (i = 0; i < totalChars; i++) {
      generateStats(i);
    }
  } else {
    console.log("Error!");
  }
  updateDisplay();

  // button options
  document.getElementById("buttonDisplay").innerHTML =
   "<button id='reset' onclick='reset()'>Generate</button>" + 
   "<button id='save' onclick='saveParty()'>Save Party</button>" + 
   "<button id='print' onclick='printParty()'>Print Party</button>";
}

function updateDisplay() {
  for (i = 0; i < totalChars; i++) {
    document.getElementById("display").innerHTML +=
     "<section class='char'>" + 
     "<h2 class='space'>Character " + (partyObj[i].name + 1) + "</h2>" + 
     "<img class='' src='img/" + partyObj[i].species + ".png'></img>" +
     "<section class='down'>" +
     "<div class='color' style='background-color:" + partyObj[i].colors[0] + "'><p class='space'>Species: " + partyObj[i].species + "</p></div>" +
     "<div class='color' style='background-color:" + partyObj[i].colors[1] + "'><p class='space'>Class: " + partyObj[i].class + "</p></div>" +
     "<div class='color' style='background-color:" + partyObj[i].colors[2] + "'><p class='space'>Gender: " + partyObj[i].gender + "</p></div>" +
     "</section><button class='reroll' value='" + i + "'onclick='individualGen(this.value)'>Reroll</button></section>";
  }
}
// button class='reroll' onclick='individualGen(this.class)'>Reroll</button>

// generate stat block
function generateStats(charID) {
  console.log(charID)
  var charObj = {};
  // var allSettings = [];
  playerClass = classes[getRandom(classes)];
  speciesSet = species[getRandom(species)];
  genderSet = gender[getRandom(gender)];

  // fill character object properties
  charObj.name = charID;
  charObj.class = playerClass
  charObj.species = speciesSet
  charObj.gender = genderSet
  charObj.colors = {}
  
  
  
  for (j=0;j<3;j++) {
    charObj.colors[j] = color();
  }
  // update master party object
  partyObj[charID] = charObj
  console.log(charID);
  console.log(partyObj);

}


// make the colors a separate function, and make the html match the properties 

// shows the saved party and creates data file
function saveParty() {
  var partyStr = JSON.stringify(partyObj)
  console.log(partyObj)
  console.log(typeof partyObj)
  console.log(Object.toString(partyObj))
  document.getElementById("saved").innerHTML = partyStr;

  
  var element = document.createElement("a");
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + partyStr);
  element.setAttribute('download', 'data');
  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// prints the window when print button is pressed
function printParty() {
  window.print();
}

// resets the current party and adds to the master list
function reset() {
  charResult = [];
  // masterSettings.push(partySettings);
  partySettings = [];
  partyObj = {};
  generateDisplay();
}