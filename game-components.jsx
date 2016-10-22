var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;
var StateImageContainer = require('./draggable-components.jsx')
var {StateTargetContainer,DroppableTarget} = require('./target-components.jsx')



var GameView = React.createClass({

getInitialState:function(){

return {stateList:this.props.stateList}

},

render:function(){

  var stateTargets = [];
  this.props.stateList.map(function(e,i){


  stateTargets.push(

  <DroppableTarget stateInput = {e}
  key = {i} showAnswersOnDrag = {false}>

  </DroppableTarget>

  )
  })

  var stateImages = [];
  this.props.stateList.map(function(e,i){
    if(!e.hasGuessed){
    stateImages.push(
    <div className = "row" key = {i}>
    <div className = "col-md-12">
    <StateImageContainer stateObject = {e}  />
    </div>
    </div>
  );
}
  })

return(
  <div>
  <div className = "row">
  <div className = "col-md-3">

  {stateImages}

  </div>

  <div className = "col-md-9" onClick = {this.changeStateData}>
  <div className = "row">
  {stateTargets}
  </div>
  </div>


  </div>
  </div>
)


},
changeStateData:function(){

var states = this.state.stateList;
states.forEach(function(state){

state.showAnswers=true;

})

this.props.changeStateData({stateList:states});
console.log(this.props.parentState);
}



})

module.exports = GameView;
