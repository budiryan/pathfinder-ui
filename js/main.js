document.addEventListener("DOMContentLoaded", init, false);
var xObject = document.getElementById("xPos");
var yObject = document.getElementById("yPos");
var myCanvas;
function init()
{
    myCanvas = document.getElementById("myCanvas");
    myCanvas.addEventListener("mousemove", getPosition, false);
}

function getPosition(event)
{
    var x = new Number();
    var y = new Number();
    var offsetX = 0;
    var offsetY = 0;
    var element = myCanvas;

    if (element.offsetParent != undefined) {
        do {
            offsetX += element.offsetLeft;

            offsetY += element.offsetTop;

        } while (( element = element.offsetParent));
    }
    console.log("offsetX "+offsetX);
    console.log("offsetY "+offsetY);
    x = event.pageX - offsetX;
    y = event.pageY - offsetY;
    xObject.textContent = "X: " + x;
    yObject.textContent = "Y: " + y;



}

function clearCoor(){
    xObject.textContent = " ";
    yObject.textContent = " ";
}