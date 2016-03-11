//Global variables

//Can only use odd numbers if you want a balanced cartesian coordinates
var tableRow = 51;
var tableCol = 41;
var globalState = 0;
var coordinate;

var startX;
var startY;
var thereIsStart = false;

var endX;
var endY;
var thereIsEnd = false;

var reducedX;
var reducedY;

var msg = document.getElementById("textMessage"); //message for the user
msg.textContent = "input obstacle";
//Initate grid system using pathfinding.js
var grid = new PF.Grid(tableCol, tableRow);

var cartesianX;
var cartesianY;

var currentCell = new Array(tableRow);
    
for(var j = 0 ; j < tableRow ; j++){
    currentCell[j] = new Array(tableCol);
}

//TODO: create hover function for the obstacle so that user can set obstacle

//Initiate global state variables
function setStart(){
    globalState = 1;
    msg.textContent = "input start point";
    console.log(globalState);
}

function setEnd(){
    globalState = 2;
    msg.textContent = "input end point";
    console.log(globalState);
}

function setObstacle(){
    globalState = 0;
    msg.textContent = "input obstacles";
}

function reset(){
    for(var i = 0 ; i < tableRow ;i++){
        for(var k = 0 ; k < tableCol;k++){
            currentCell[i][k].className = 'cell';
        }
    }
    startX = undefined;
    startY = undefined;
    thereIsStart = false;
    endX = undefined;
    endY = undefined;
    thereIsEnd = false;
}

function drawPath(path) {
	setTimeout(function loop() {
        var point;
	    var current = path.shift();
        console.log([current[0],current[1]]);
        if(current[0] < 10 && current[1] < 10)point = document.getElementById(' 0'+ current[0] + '0'+ current[1]);
        else if(current[0] < 10 && current[1] >= 10)point = document.getElementById(' 0'+ current[0] + current[1]);
        else if(current[0] >= 10 && current[1] < 10)point = document.getElementById(' '+ current[0] + '0' + current[1]);
        else if(current[0] >= 10 && current[1] >= 10)point = document.getElementById(' '+ current[0] + current[1]);
        point.className = "path";
        
        
        //Output to cartesian coordinate system
        reduceX = (tableCol - 1)/2;
        reduceY = (tableRow - 1)/2;
        cartesianX = clickedX - reduceX;
        cartesianY = clickedY - reduceY;
        console.log([cartesianX,cartesianY]);
        
        
	    if (path.length)
	        setTimeout(loop, 25);
	}, 500);
}


function displayError(){
    msg.textContent = "No path found";
}

function findPath() {
    var finder = new PF.JumpPointFinder({
         diagonalMovement: PF.DiagonalMovement.IfAtMostOneObstacle
    });
    if(startX == undefined || startY == undefined || endX == undefined || endY == undefined){
        msg.textContent = "No start/end point selected";
        return;
    }
    var path = finder.findPath(startX, startY, endX, endY, grid);
    if(path[0] == undefined) {
        displayError();
        return;
    }
    else drawPath(path);
}

window.onload = function(){
    //Draw the table for me
    var table = document.getElementById("pathTable");
    var currentRow = new Array(tableRow);
  
    var modifiedI;
    
    for(var i = 0; i < tableRow; i++){
        currentRow[i]= table.insertRow(i);
        modifiedI = tableRow - 1 - i;
        console.log('i = ' +i);
        console.log('modified ='+ modifiedI);
        for(var k = 0; k < tableCol ; k++){
            currentCell[i][k] = currentRow[i].insertCell(k);
            if(modifiedI < 10 && k < 10){
                currentCell[i][k].id = ' 0'+ k + '0'+ modifiedI;
                currentCell[i][k].className = 'cell';
            }
            else if(modifiedI < 10 && k >= 10){
                currentCell[i][k].id = ' '+ k + '0' +modifiedI;
                currentCell[i][k].className = 'cell';
            }
            else if(modifiedI >= 10 && k < 10){
                currentCell[i][k].id = ' 0'+ k + modifiedI;
                currentCell[i][k].className = 'cell';
            }
            else if(modifiedI >= 10 && k >= 10){
                currentCell[i][k].id = ' '+ k + modifiedI;
                currentCell[i][k].className = 'cell';
            }
        }
    }
    
    $(document).bind("contextmenu", function (event) {
    
    // Avoid the real one
    event.preventDefault();
});

    
    $('.cell').mousedown(function(event) {
        if (event.which == 3) { // State 3 represents right click.
//            coordinate = parseInt($(event.target).attr('id'));
//            
//            clickedX = coordinate % tableCol;
//            clickedY = tableRow - 1 - (Math.floor(coordinate / tableCol));
//            
//            console.log([Math.floor(clickedX), Math.floor(clickedY)]);
//            console.log($(event.target).attr('id'));
            if($(event.target).attr('id').charAt(1) == '0' && $(event.target).attr('id').charAt(3) == '0'){
                // 0909
                // 0001 
                clickedX = parseInt($(event.target).attr('id').charAt(2)) ;
                clickedY = parseInt($(event.target).attr('id').charAt(4))
            }
            else if($(event.target).attr('id').charAt(1) == '0' && $(event.target).attr('id').charAt(3) != '0'){
                //' 0911'
                clickedX = parseInt($(event.target).attr('id').charAt(2));
                clickedY = parseInt($(event.target).attr('id').substr(3));
            }
            else if($(event.target).attr('id').charAt(1) != '0' && $(event.target).attr('id').charAt(3) == '0'){
                //' 1008'
                clickedX = parseInt($(event.target).attr('id').substr(1,2));
                clickedY = parseInt($(event.target).attr('id').charAt(4));
            }
            else if($(event.target).attr('id').charAt(1) != '0' && $(event.target).attr('id').charAt(3) != '0'){
                //' 1010'
                clickedX = parseInt($(event.target).attr('id').substr(1,2));
                clickedY = parseInt($(event.target).attr('id').substr(3));
            }
            reduceX = (tableCol - 1)/2;
            reduceY = (tableRow - 1)/2;
            cartesianX = clickedX - reduceX;
            cartesianY = clickedY - reduceY;
            console.log([cartesianX,cartesianY]);
            event.preventDefault();
            return false;
        }
    });
    var hover = false;
    $('.cell').mousedown(function(event){
        switch(globalState){
            case 0:
                $(event.target).removeClass('start');
                $(event.target).removeClass('end');
                $(event.target).toggleClass('disabled');
                console.log($(event.target).attr('id'));
                
                //String modification
                if($(event.target).attr('id').charAt(1) == '0' && $(event.target).attr('id').charAt(3) == '0'){
                    // 0909
                    // 0001 
                    clickedX = parseInt($(event.target).attr('id').charAt(2)) ;
                    clickedY = parseInt($(event.target).attr('id').charAt(4))
                }
                else if($(event.target).attr('id').charAt(1) == '0' && $(event.target).attr('id').charAt(3) != '0'){
                    //' 0911'
                    clickedX = parseInt($(event.target).attr('id').charAt(2));
                    clickedY = parseInt($(event.target).attr('id').substr(3));
                }
                else if($(event.target).attr('id').charAt(1) != '0' && $(event.target).attr('id').charAt(3) == '0'){
                    //' 1008'
                    clickedX = parseInt($(event.target).attr('id').substr(1,2));
                    clickedY = parseInt($(event.target).attr('id').charAt(4));
                }
                else if($(event.target).attr('id').charAt(1) != '0' && $(event.target).attr('id').charAt(3) != '0'){
                    //' 1010'
                    clickedX = parseInt($(event.target).attr('id').substr(1,2));
                    clickedY = parseInt($(event.target).attr('id').substr(3));
                }
                
                
                if(event.target.className == 'cell disabled'){
                    console.log([clickedX,clickedY]);
                    grid.setWalkableAt(clickedX, clickedY, false);
                }
                else {
                    console.log([clickedX,clickedY]);
                    grid.setWalkableAt(clickedX, clickedY, true);
                }
                console.log(event.target.className);
            break;
            case 1:
                if(!thereIsStart){
                    $(event.target).toggleClass('start');
                    console.log(event.target.className);
                    if($(event.target).attr('id').charAt(1) == '0' && $(event.target).attr('id').charAt(3) == '0'){
                        // 0909
                        // 0001 
                        clickedX = parseInt($(event.target).attr('id').charAt(2));
                        clickedY = parseInt($(event.target).attr('id').charAt(4))
                    }
                    else if($(event.target).attr('id').charAt(1) == '0' && $(event.target).attr('id').charAt(3) != '0'){
                        //' 0911'
                        clickedX = parseInt($(event.target).attr('id').charAt(2));
                        clickedY = parseInt($(event.target).attr('id').substr(3));
                    }
                    else if($(event.target).attr('id').charAt(1) != '0' && $(event.target).attr('id').charAt(3) == '0'){
                        //' 1008'
                        clickedX = parseInt($(event.target).attr('id').substr(1,2));
                        clickedY = parseInt($(event.target).attr('id').charAt(4));
                    }
                    else if($(event.target).attr('id').charAt(1) != '0' && $(event.target).attr('id').charAt(3) != '0'){
                        //' 1010'
                        clickedX = parseInt($(event.target).attr('id').substr(1,2));
                        clickedY = parseInt($(event.target).attr('id').substr(3));
                    }
                    if(event.target.className == 'cell start'){
                        startX = clickedX;
                        startY = clickedY;
                        msg.textContent = "Start point selected";
                        thereIsStart = true;
                    }
                    else{
                        startX = undefined;
                        startY = undefined;
                        event.target.className = 'cell';
                        msg.textContent = "You removed your start point!";
                        thereIsStart = false;
                    }
                }
                else{
                    msg.textContent = "Start cannot be more than 1 ! Bro";
                    if(event.target.className == 'cell start'){
                        startX = undefined;
                        startY = undefined;
                        event.target.className = 'cell';
                        msg.textContent = "You removed your start point!";
                        thereIsStart = false;
                    }
                }
                console.log([clickedX,clickedY]);
            break;
            case 2:
                if(!thereIsEnd){
                    $(event.target).toggleClass('end');
                    console.log(event.target.className);
                        if($(event.target).attr('id').charAt(1) == '0' && $(event.target).attr('id').charAt(3) == '0'){
                        // 0909
                        // 0001 
                        clickedX = parseInt($(event.target).attr('id').charAt(2));
                        clickedY = parseInt($(event.target).attr('id').charAt(4));
                    }
                    else if($(event.target).attr('id').charAt(1) == '0' && $(event.target).attr('id').charAt(3) != '0'){
                        //' 0911'
                        clickedX = parseInt($(event.target).attr('id').charAt(2));
                        clickedY = parseInt($(event.target).attr('id').substr(3));
                    }
                    else if($(event.target).attr('id').charAt(1) != '0' && $(event.target).attr('id').charAt(3) == '0'){
                        //' 1008'
                        clickedX = parseInt($(event.target).attr('id').substr(1,2));
                        clickedY = parseInt($(event.target).attr('id').charAt(4));
                    }
                    else if($(event.target).attr('id').charAt(1) != '0' && $(event.target).attr('id').charAt(3) != '0'){
                        //' 1010'
                        clickedX = parseInt($(event.target).attr('id').substr(1,2));
                        clickedY = parseInt($(event.target).attr('id').substr(3));
                    }
                    if(event.target.className == 'cell end'){
                        endX = clickedX;
                        endY = clickedY;
                        msg.textContent = "End point selected";
                        thereIsEnd = true;
                    }
                    else{
                        endX = undefined;
                        endY = undefined;
                        msg.textContent = "You removed your start point!";
                        event.target.className = 'cell';
                        thereIsEnd = false;
                    }
                }
                else{
                    msg.textContent = "End Point cannot be more than 1, bro";
                    if(event.target.className == 'cell end'){
                        endX = undefined;
                        endY = undefined;
                        event.target.className = 'cell';
                        msg.textContent = "You removed your end point!";
                        thereIsEnd = false;
                    }
                }
                console.log([clickedX,clickedY]);
            break;
        }
        event.preventDefault();
    });
};
 



