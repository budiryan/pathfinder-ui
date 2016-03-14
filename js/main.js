/**
 * Created by user on 09/03/2016.
 */

var path;
var displayTextX = new PointText(new Point(10,10));
displayTextX.fillColor = 'black';
var displayTextY = new PointText(new Point(10,30));
displayTextY.fillColor = 'black';

function onMouseDown(event) {
    path = new Path();
    path.strokeColor = new Color(0,0,0)
    path.add(event.point);
}

function onMouseMove(event){
    displayTextX.content = event.point.x;
    displayTextY.content = event.point.y;
}
//
//function onMouseDrag(event){
//    path.add(event.point);
//}
//
//function onMouseUp(event){
//    path.add(event.point);
//}

function onResize(event) {
    // Whenever the window is resized, recenter the path:
}
