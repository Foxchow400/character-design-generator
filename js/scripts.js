var gender = ["male", "female", "other"];
var species = ["human", "antecs", "tabaxi", "merfolk", "yuan-ti", "avian", "monster", "elf", "dwarf", "dragonborn", "lizardfolk", "halfing"];
var classes = ["barbarian", "fighter", "cleric", "bard", "wizard", "sorcerer", "druid", "rogue", "monk", "ranger", "paladin"];
var sizes = ["small", "medium", "large"]
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

function color() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function generateAttr() {
  // attributes: str, dex, con, int, wis, cha

}

// displays the generated party and creates arrays to prepare for any saves
function generateDisplay() {
  document.getElementById("display").innerHTML = "<h1>Your party!</h1>"
  if (Object.keys(partyObj).length < totalChars) {
    console.log("Generating " + totalChars + " Characters");
    for (j = 0; j < totalChars; j++) {
      console.log(j)
      generateStats(j);
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
  document.getElementById("display").innerHTML = "";
  for (gen = 0; gen < totalChars; gen++) {
    console.log(gen);
    document.getElementById("display").innerHTML +=
     "<section class='char'>" + 
    //  "<h2 class='space'>Character " + partyObj[gen].charName + "</h2>" + 
    //  "<img class='' src='img/" + partyObj[gen].species + ".png'></img>" +
    //  "<section class='down'>" +
    //  "<div class='color' style='background-color:" + partyObj[gen].colors[0] + "'><p class='space'>Species: " + partyObj[gen].species + "</p></div>" +
    //  "<div class='color' style='background-color:" + partyObj[gen].colors[1] + "'><p class='space'>Class: " + partyObj[gen].charClass + "</p></div>" +
    //  "<div class='color' style='background-color:" + partyObj[gen].colors[2] + "'><p class='space'>Gender: " + partyObj[gen].gender + "</p></div>" +
     "</section><button class='reroll' value='" + k + "' onclick='generateStats(" + k + "); updateDisplay()'>Reroll</button></section></section>";
  }
}
// button class='reroll' onclick='individualGen(this.class)'>Reroll</button>

// generate stat block
function generateStats(charID) {
  console.log(charID)
  var charObj = {};
  playerClass = classes[getRandom(classes)];
  speciesSet = species[getRandom(species)];
  genderSet = gender[getRandom(gender)];

  /*Character Properties (3 attributes that are relative to the other attributes, making 10 total, ex, skill points based on class)
  
    name: character name
    class: character class
    species: character species
    gender: character gender
    colors: 3 character colors
    attributes: str, dex, con, int, wis, cha
    hp: hp based on class + con
    size: based on species
    ac: 10 + dex + size mod 
    skill points: int mod + class mod (plus 4 at first level)

    abilities: Roll 6d8 and add ten? (must be between 3 - 18)

    species sizes:
    med: everything but halfling
    small: halfling

    skill points: 
    barbarian: 4
    fighter: 2
    cleric: 2
    bard: 6
    wizard: 2
    sorcerer: 2
    druid: 4
    rogue: 8
    monk: 4
    ranger: 6
    paladin: 2

    hit points: 
    barbarian: d12
    fighter: d10
    cleric: d8
    bard: d6
    wizard: d4
    sorcerer: d4
    druid: d8
    rogue: d6
    monk: d8
    ranger: d8
    paladin: d10
  */

    var abilityScores = {};
    var abilityNames = ["str", "dex", "con", "int", "wis", "cha"]
    
  // fill character object properties
  // charObj.charName = charID;
  // charObj.charClass = playerClass
  // charObj.species = speciesSet
  // charObj.gender = genderSet

  charObj.charName = "";
  charObj.charClass = ""
  charObj.species = ""
  charObj.gender = ""
  charObj.colors = {}
  charObj.attributes = {}
  charObj.health = {}
  charObj.size = {}
  charObj.armor = {}
  charObj.skill = {}
  
  for (i = 0; i < Object.keys(abilityNames).length; i++) {
    abilityScores[abilityNames[i]] = Math.floor(Math.random() * 16) + 3
  }

  for (j=0;j<3;j++) {
    charObj.colors[j] = color();
  }
  // update master party object
  partyObj[charID] = charObj
  console.log(charObj);
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