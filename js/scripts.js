var genderList = ["male", "female", "other"];
var speciesList = ["human", "antec", "tabaxi", "merfolk", "yuan-ti", "avian", "monster", "elf", "dwarf", "dragonborn", "lizardfolk", "halfling", "gnome"];
var classesList = ["barbarian", "fighter", "cleric", "bard", "wizard", "sorcerer", "druid", "rogue", "monk", "ranger", "paladin"];
var namesList = ["Marianna", "Killian", "Welch", "Johnathan", "Alesha", "Gregory", "Lulu", "Aamina", "Malachi", "Guy", "Gordo"];
var sizesList = ["small", "medium", "large"];
var savedResult = [];
var charResult = [];
var partySettings = [];
var partyObj = {};
var totalChars = 6;
var abilityScoreDice = 4;
var imported;
const abilityNames = ["str", "dex", "con", "int", "wis", "cha"]

// import function
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
      // console.log(i)
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

// gets a random length of any array fed to it
function getRandom(arr) {
  return arr[getRandomIndex(arr)];
}

// updates the display
function updateDisplay() {
  document.getElementById("display").innerHTML = "";
  for (gen = 0; gen < totalChars; gen++) {
    console.log(gen);
    document.getElementById("display").innerHTML +=
      "<section class='char'>" + 
        "<h2 class=''>" + partyObj[gen].charName + "</h2>" + 
        "<section class='flex-container'>" + 
          "<div class='atrCont'>" + 
            "<p class='atr'>Str: " + partyObj[gen].attributes.str + "</p>" +
            "<p class='atr'>Dex: " + partyObj[gen].attributes.dex + "</p>" +
            "<p class='atr'>Con: " + partyObj[gen].attributes.con + "</p>" +
            "<p class='atr'>Int: " + partyObj[gen].attributes.int + "</p>" +
            "<p class='atr'>Wis: " + partyObj[gen].attributes.wis + "</p>" +
            "<p class='atr'>Cha: " + partyObj[gen].attributes.cha + "</p>" +
          "</div>" +
          "<section class='visual'>" +
            "<section class='flex-container'>" +
              "<div class='image'>" +
              "<img class='' src='img/" + partyObj[gen].speciesList + ".png'></img>" +
              "</div>" +
              "<div class='color' style='background-color:" + partyObj[gen].colors[0] + "'>" +
                "<p class='space'>Gender: " + partyObj[gen].genderList + "</p>" +
              "</div>" +
              "<div class='color' style='background-color:" + partyObj[gen].colors[1] + "'>" + 
                "<p class='space'>Species: " + partyObj[gen].speciesList + "</p>" +
              "</div>" +
              "<div class='color' style='background-color:" + partyObj[gen].colors[2] + "'>" +
                "<p class='space'>Size: " + partyObj[gen].size + "</p>" +
              "</div>" +
            "</section>" +
             "<section class='below'>" +
                "<p class='belowAtr' id='hp'>Health: " + partyObj[gen].health + "</p>" +
                "<p class='belowAtr' id='skl'>Skill: " + partyObj[gen].skill + "</p>" +
                "<p class='belowAtr' id='ac'>Armor: " + partyObj[gen].armor + "</p>" +
                "<p class='belowAtr' id='cls'>Class: " + partyObj[gen].charClass + "</p>" +
              "</section>" + 
            "<button class='charButtons' value='" + gen + "' onclick='generateStats(" + gen + "); updateDisplay()'>Reroll</button>" +
            "<button class='charButtons' value='" + gen + "' onclick='saveInv(" + gen + "); updateDisplay()'>Save Character</button>" +
          "</section>" + 
        "</section>" + 
      "</section>";
  }
}

// saves individual character stats
function saveInv(charID) {
  var charSave = JSON.stringify(partyObj[charID])
  console.log(partyObj)
  console.log(typeof partyObj)
  console.log(Object.toString(partyObj))
  document.getElementById("saved").innerHTML = charSave;
  var element = document.createElement("a");
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + charSave);
  element.setAttribute('download', 'data');
  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// generate stat block
function generateStats(charID) {
  console.log(charID)
  var charObj = {};
  var sizeNum;
    
  // fill character object properties
  charObj.charName = getRandom(namesList);
  charObj.charClass = getRandom(classesList)
  charObj.speciesList = getRandom(speciesList);
  charObj.genderList = getRandom(genderList);
  charObj.colors = {}
  charObj.attributes = {}
  charObj.health = calcHealth(charObj.charClass);
  charObj.size = calcSize(charObj.speciesList);

  var sizeNum = 0;
  if (charObj.speciesList != "small") {
    sizeNum = 0
  } else {
    sizeNum = 1
  }
  
  // TODO: Make the dice roll methods be different options before initial generation
  for (abilityNameIndex = 0; abilityNameIndex < abilityNames.length; abilityNameIndex++) {
    charObj.attributes[abilityNames[abilityNameIndex]] = rollAbility();
  }
  
  charObj.skill = calcSkill(charObj.attributes.int, charObj.charClass);
  charObj.armor = (charObj.attributes.dex + sizeNum);

  for (colorIndex=0;colorIndex<3;colorIndex++) {
    charObj.colors[colorIndex] = color();
  }
  // update master party object
  partyObj[charID] = charObj
  console.log(charObj);
  console.log(partyObj);
}

// calculates hp based on class + con
function calcHealth(charClass) {
  var charHealth;
  switch(charClass) {
      case "barbarian":
        charHealth = 12
        break;
      case "fighter":
        charHealth = 10
        break;
      case "cleric":
        charHealth = 8
        break;
      case "bard":
        charHealth = 6
        break;
      case "wizard":
        charHealth = 4
        break;
      case "sorcerer":
        charHealth = 4
        break;
      case "druid":
        charHealth = 8
        break;
      case "rogue":
        charHealth = 6
        break;
      case "monk":
        charHealth = 8
        break;
      case "ranger":
        charHealth = 8
        break;
      case "paladin":
        charHealth = 10
        break;
    default:
      charHealth = 0
  }
  return charHealth;
}

// calculates size based on species
function calcSize(species) {
  var size;
  switch(species) {
    case "halfling":
      size = "small"
      break;
    case "gnome":
      size = "small"
      break;
  default:
      size = "medium"
  }
  return size;
}

// calculates skill points int mod + class mod (plus 4 at first level)
function calcSkill(int, charClass) {
  var skill;
  switch(charClass) {
    case "barbarian":
      skill = 4
      break;
    case "fighter":
      skill = 2
      break;
    case "cleric":
      skill = 2
      break;
    case "bard":
      skill = 6
      break;
    case "wizard":
      skill = 2
      break;
    case "sorcerer":
      skill = 2
      break;
    case "druid":
      skill = 4
      break;
    case "rogue":
      skill = 8
      break;
    case "monk":
      skill = 4
      break;
    case "ranger":
      skill = 6
      break;
    case "paladin":
      skill = 2
      break;
  default:
    skill = 0
  }
  skill += int + 4
  return skill;
}

// rolls initial stats
function rollAbility() {
  var numArray = [];
  for (rollIndex = 0; rollIndex < abilityScoreDice; rollIndex++) {
    numArray.push(Math.floor(Math.random() * 6) + 1);
  }
  numArray.sort(function(a, b) {
    return a - b;
  });
  numArray.reverse();

  for (popTotal = 0; popTotal < (abilityScoreDice - 3); popTotal++) {
    numArray.pop();
  }

  console.log(numArray);

  const initialValue = 0;
  var numTotal = numArray.reduce((previousValue, currentValue) => previousValue + currentValue,
  initialValue);
  return numTotal;
}

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
  document.getElementById("saved").innerHTML = "";
}