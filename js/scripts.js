console.log("male");
var gender = "male";
var species = ["human", "bug", "animal", "fish", "noodle"];

function $(div) {
    return document.getElementById(div);
}

function display(g) {
    var str = "";
    var s = Math.floor(Math.random(0, 1) * species.length);
    console.log(s)
    var color1 = getColor();
    var color2 = getColor();
    var color3 = getColor();

    str += "<section>" + "Gender: " +
    g + "</section>" + "<br>";

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

function generate() {
    gender = $("gender").value;
    display(gender);
}