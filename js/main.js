//Width & height of the gamefield
var width = 700;
var height = 700;

var xObject = document.getElementById("xPos");
var yObject = document.getElementById("yPos");
var coorListObject = document.getElementById("coorList");
var myCanvas;
//X & Y here follow Web based coordinate system
var x = new Number();
var y = new Number();

//Cartesian X & Y
var cartesianX = 0;
var cartesianY = 0;

//X & Y for pathfinding algorithm
var pathfindingX = 0;
var pathfindingY = 0;

//Curved Path
var path;

//Coordinate array in cartesian system
var coordinate = new Array();

function storeCoordinate(xVal, yVal, array) {
    array.push({x: xVal, y: yVal});
}

function removePath() {
    coordinate = new Array();
    path.remove();
    console.clear();
    coorListObject.textContent = "Please drag a line";
}

function generatePath() {
    //See console to view the printed Coordinates
    if (coordinate.length === 0)coorListObject.textContent = "You didn't drag any line, please drag a line";
    else {
        coorListObject.textContent = "Coordinate List: "
        for (var i = 0; i < coordinate.length; i++) {
            //Print the stored coordinates
            console.log(["X: " + coordinate[i].x, "Y: " + coordinate[i].y]);
            if (i === coordinate.length - 1) coorListObject.textContent += "( " + coordinate[i].x + "," + coordinate[i].y + ")";
            else coorListObject.textContent += "( " + coordinate[i].x + "," + coordinate[i].y + ") ,";
        }
    }
}

window.onload = function () {
    //Setup the things
    myCanvas = document.getElementById("myCanvas");
    myCanvas.addEventListener("mousemove", getPosition, false);
    paper.setup(myCanvas);
    var img = new paper.Raster("roboconMap");
    img.position = paper.view.center;

    var tool = new paper.Tool();
    //tool.minDistance = 20;

    tool.onMouseDown = function (event) {
        if (path) {
            path.selected = false;
            path.remove();
        }
        ;
        path = new paper.Path();
        path.strokeColor = 'black';
        path.fullySelected = true;
    }

    tool.onMouseDrag = function (event) {
        path.add(event.point);
    }

    tool.onMouseUp = function (event) {
        path.smooth();
        path.simplify();
        var tempX;
        var tempY;
        for (var i = 0; i < path.segments.length; i++) {
            tempX = Math.floor(path.segments[i].point.x - (width / 2));
            tempY = Math.abs(path.segments[i].point.y - height);
            tempY = tempY - (height / 2);
            storeCoordinate(tempX, tempY, coordinate);
        }
        path.selected = true;
    }
    coorListObject.textContent = "Please drag a line";
}

function getPosition(event) {
    convertCoordinate(event);
    xObject.textContent = "X: " + cartesianX;
    yObject.textContent = "Y: " + cartesianY;
}

function clearCoor() {
    xObject.textContent = " ";
    yObject.textContent = " ";
}

function convertCoordinate(passedEvent) {
    var offsetX = 0;
    var offsetY = 0;
    var element = myCanvas;

    if (element.offsetParent != undefined) {
        do {
            offsetX += element.offsetLeft;

            offsetY += element.offsetTop;

        } while (( element = element.offsetParent));
    }
    x = passedEvent.pageX - offsetX;
    y = passedEvent.pageY - offsetY;

    //Convert to cartesian coordinate system
    cartesianX = x - (width / 2);
    cartesianY = Math.abs(y - height);
    cartesianY = cartesianY - (height / 2);

    pathfindingX = cartesianX + (width / 2);
    pathfindingY = cartesianY + (height / 2);
}




