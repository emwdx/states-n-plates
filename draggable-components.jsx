var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;


var DragSource = require('react-dnd').DragSource;


var stateSource = {
  canDrag: function (props) {
   // You can disallow drag based on props
   return true;
 },

 beginDrag: function (props) {
   // Return the data describing the dragged item
   var currentStateInfo = props.stateObject;
   //console.log(currentStateInfo)
   return currentStateInfo;
 },

 isDragging: function (props, monitor) {
   // If your component gets unmounted while dragged
   // (like a card in Kanban board dragged between lists)
   // you can implement something like this to keep its
   // appearance dragged:
   return monitor.getItem().id === props.id;
 },

 endDrag: function (props, monitor, component) {
   if (!monitor.didDrop()) {
     // You can check whether the drop was successful
     // or if the drag ended but nobody handled the drop
     return;
   }

   // When dropped on a compatible target, do something.
   // Read the original dragged item from getItem():
   var item = monitor.getItem();

   //component.props.removeState(item);

   // You may also read the drop result from the drop target
   // that handled the drop, if it returned an object from
   // its drop() method.
   var dropResult = monitor.getDropResult();
   console.log(dropResult);

}
}

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}


var StatesImageContainer = React.createClass({

  render:function(){


    var stateList = this.props.stateList;
    var imageComponents = [];
    var removeState = this.props.removeState;


    stateList.map(function(item,index){

    imageComponents.push(

    <StateImageContainer stateObject = {item} key = {index} removeState = {removeState}/>


  )


    })



    return (
      <div id = "stateImagesContainer">
    {imageComponents}

    </div>
    )


  },
  componentDidMount:function(){

  }


})

var StateImageContainer = React.createClass({

render:function(){
  var isDragging = this.props.isDragging;
  var connectDragSource = this.props.connectDragSource;


return connectDragSource(
  <div className = "row stateImageContainer" style={(isDragging)?
    {opacity:0.1}:{opacity : 1}} >
  <div className = "col-md-12 bordered" >
    <img className = "img-responsive" src = {this.props.stateObject.imageURL}/>
</div>
</div>
  );
}


})

StateImageContainer = DragSource("stateImage", stateSource, collect)(StateImageContainer);

module.exports = StateImageContainer;
