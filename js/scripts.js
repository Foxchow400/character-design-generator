var genderList = ["male", "female", "other"];
var speciesList = ["human", "antec", "tabaxi", "merfolk", "yuan-ti", "avian", "monster", "elf", "dwarf", "dragonborn", "lizardfolk", "halfling"];
var classesList = ["barbarian", "fighter", "cleric", "bard", "wizard", "sorcerer", "druid", "rogue", "monk", "ranger", "paladin"];
var namesList = ["Marianna", "Killian", "Welch", "Johnathan", "Alesha", "Gregory", "Lulu", "Aamina", "Malachi", "Guy", "Gordo"];
var sizesList = ["small", "medium", "large"]
var savedResult = [];
var charResult = [];
var partySettings = [];
var partyObj = {};
var totalChars = 6;
var abilityScoreDice = 4;
var imported;
const abilityNames = ["str", "dex", "con", "int", "wis", "cha"]

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

// generates a random number between 0 and the sent array's length
function getRandomIndex(arr) {
  var curNum = Math.floor(Math.random() * arr.length);
  return curNum;
}

// generate a random color (rgba)
function color() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

// displays the generated party and creates arrays to prepare for any saves
function generateDisplay() {
  document.getElementById("display").innerHTML = "<h1>Your party!</h1>"
  if (Object.keys(partyObj).length < totalChars) {
    console.log("Generating " + totalChars + " Characters");
    for (i = 0; i < totalChars; i++) {
      console.log(i)
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

function getRandom(arr) {
  return arr[getRandomIndex(arr)];
}

function updateDisplay() {
  document.getElementById("display").innerHTML = "";
  for (gen = 0; gen < totalChars; gen++) {
    console.log(gen);
    document.getElementById("display").innerHTML +=
      "<section class='char'>" + 
        "<section class='atrCont'>" + 
          "<p class='atr'>Str: " + partyObj[gen].attributes.str + "</p>" +
          "<p class='atr'>Dex: " + partyObj[gen].attributes.dex + "</p>" +
          "<p class='atr'>Con: " + partyObj[gen].attributes.con + "</p>" +
          "<p class='atr'>Int: " + partyObj[gen].attributes.int + "</p>" +
          "<p class='atr'>Wis: " + partyObj[gen].attributes.wis + "</p>" +
          "<p class='atr'>Cha: " + partyObj[gen].attributes.cha + "</p>" +
        "</section>" +
        "<section class='atrCont'>" +
          "<h2 class='space'>" + partyObj[gen].charName + "</h2>" + 
          "<img class='' src='img/" + partyObj[gen].speciesList + ".png'></img>" +
          "<section class='down'>" +
            "<div class='color' style='background-color:" + partyObj[gen].colors[0] + "'><p class='space'>Species: " + partyObj[gen].speciesList + "</p></div>" +
            "<div class='color' style='background-color:" + partyObj[gen].colors[1] + "'><p class='space'>Class: " + partyObj[gen].charClass + "</p></div>" +
            "<div class='color' style='background-color:" + partyObj[gen].colors[2] + "'><p class='space'>Gender: " + partyObj[gen].genderList + "</p></div>" +
            "</section><button class='reroll' value='" + gen + "' onclick='generateStats(" + gen + "); updateDisplay()'>Reroll</button>" +
          "</section>" + 
        "</section>" + 
      "</section>";
  }
}

// generate stat block
function generateStats(charID) {
  console.log(charID)
  var charObj = {};
    
  // fill character object properties
  charObj.charName = getRandom(namesList);
  charObj.charClass = getRandom(classesList)
  charObj.speciesList = getRandom(speciesList);
  charObj.genderList = getRandom(genderList);
  charObj.colors = {}
  charObj.attributes = {}
  // do vvv
  charObj.health = calcHealth();
  charObj.size = calcSize();
  charObj.armor = calcArmor();
  charObj.skill = calcSkill();
  

  // TODO: Make the dice roll methods be different options before initial generation
  for (abilityNameIndex = 0; abilityNameIndex < abilityNames.length; abilityNameIndex++) {
    charObj.attributes[abilityNames[abilityNameIndex]] = rollAbility();
  }


  for (colorIndex=0;colorIndex<3;colorIndex++) {
    charObj.colors[colorIndex] = color();
  }
  // update master party object
  partyObj[charID] = charObj
  console.log(charObj);
  console.log(partyObj);
}


// hp: hp based on class + con
// size: based on species
// ac: 10 + dex + size mod 
// skill points: int mod + class mod (plus 4 at first level)
// skill points: 
// barbarian: 4
// fighter: 2
// cleric: 2
// bard: 6
// wizard: 2
// sorcerer: 2
// druid: 4
// rogue: 8
// monk: 4
// ranger: 6
// paladin: 2

// hit points: 
// barbarian: d12
// fighter: d10
// cleric: d8
// bard: d6
// wizard: d4
// sorcerer: d4
// druid: d8
// rogue: d6
// monk: d8
// ranger: d8
// paladin: d10

function calcHealth() {
  return "";
}

function calcSize() {
  return "";
}

function calcArmor() {
  return "";
}

function calcSkill() {
  return "";
}

function rollAbility() {
  var numArray = [];
  for (rollIndex = 0; rollIndex < abilityScoreDice; rollIndex++) {
    numArray.push(Math.floor(Math.random() * 6) + 1);
  }
  numArray.sort(function(a, b) {
    return a - b;
  });
  numArray.reverse();
  console.log(numArray);

  for (popTotal = 0; popTotal < (abilityScoreDice - 3); popTotal++) {
    numArray.pop();
  }

  console.log(numArray);

  const initialValue = 0;
  var numTotal = numArray.reduce((previousValue, currentValue) => previousValue + currentValue,
  initialValue);
  return numTotal;
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