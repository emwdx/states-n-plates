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
   //console.log(dropResult);

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

    var component = this;

    stateList.map(function(item,index){

    imageComponents.push(

    <StateImageContainer stateObject = {item} key = {index} removeState = {removeState} changeStateData = {component.props.changeStateData} stateList = {stateList}/>


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
  var isSelected = this.props.stateObject.isTouchSelected;


  if(isSelected){var imgClass = "img-responsive stateImage center-block tapSelected"}
  else{var imgClass = "img-responsive stateImage center-block"}

return connectDragSource(
  <div className = "row stateImageContainer" style={(isDragging)?
    {opacity:0.1,border:'0px'}:{opacity : 1}} >
  <div className = "col-md-12 col-xs-12 bordered " >
    <img className = {imgClass} src = {this.props.stateObject.imageURL} onTouchEnd={this.makeStateActive}/>
</div>
</div>
  );
},
makeStateActive:function(e){
var states = this.props.stateList;
var component = this;

states.forEach(function(s){

component.props.changeStateData(s.stateIndex,{isTouchSelected:false})

});
this.props.changeStateData(component.props.stateObject.stateIndex,{isTouchSelected:true});


}


})

StateImageContainer = DragSource("stateImage", stateSource, collect)(StateImageContainer);

module.exports = StateImageContainer;
