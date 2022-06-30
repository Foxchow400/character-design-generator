var gender = ["male", "female", "other"];
var species = ["human", "bug", "animal", "fish", "noodle", "bird", "monster", "elf", "dwarf", "dragon", "lizard"];
var img = ["images/human.png", "images/bug.png", "images/animal.png", "images/fish.png", "images/noodle.png", "images/bird.png", "images/monster.png", "images/elf.png", "images/dwarf.png", "images/dragon.png", "images/lizard.png"];

function $(div) {
    return document.getElementById(div);
}

function display(g) {
    var str = "";
    var s = Math.floor(Math.random(0, 1) * species.length);
    console.log(s);
    var color1 = getColor();
    var color2 = getColor();
    var color3 = getColor();

    switch (s) {
        case 0:
            img = "<img src='images/human.png'>"
          break;
        case 1:
            img = "<img src='images/bug.png'>"
          break;
        case 2:
            img = "<img src='images/animal.png'>"
          break;
        case 3:
            img = "<img src='images/fish.png'>"
          break;
        case 4:
            img = "<img src='images/noodle.png'>"
          break;
        case 5:
            img = "<img src='images/bird.png'>"
          break;
        case 6:
            img = "<img src='images/monster.png'>"
          break;
        case 7:
            img = "<img src='images/elf.png'>"
          break;
        case 8:
            img = "<img src='images/dwarf.png'>"
          break;
        case 9:
            img = "<img src='images/dragon.png'>"
          break;
        case 10:
            img = "<img src='images/lizard.png'>"
          break;
          default:
            img = "<img src='images/none.png'>"
      }

    str += "<section>" + "Gender: " +
    g + "</section>" + "<br>";

    str += "<section>" + img + "</section>"
    
    str += "<section>" + "Species: " +
    species[s] + "</section>" + "<br>";

    str += "<div id='color1'>Color 1</div>"
    str += "<div id='color2'>Color 2</div>"
    str += "<div id='color3'>Color 3</div>"

    $("output").innerHTML = str;

    $("color1").style.backgroundColor = "rgba(" + color1[0] + "," + color1[1] + "," + color1[2] + ", 1)";
    $("color2").style.backgroundColor = "rgba(" + color2[0] + "," + color2[1] + "," + color2[2] + ", 1)";
    $("color3").style.backgroundColor = "rgba(" + color3[0] + "," + color3[1] + "," + color3[2] + ", 1)";
}

function getColor() {
    return [(Math.floor(Math.random(0, 1) * 255)), (Math.floor(Math.random(0, 1) * 255)), (Math.floor(Math.random(0, 1) * 255))];
}

function generate(species,s) {
    gender = $("gender").value;
    display(gender);
}

