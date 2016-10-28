var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;
var StateImageContainer = require('./draggable-components.jsx')
var {StateTargetContainer,DroppableTarget} = require('./target-components.jsx')



var GameView = React.createClass({

getInitialState:function(){

return {stateList:this.props.stateList,currentScore:0}

},

render:function(){

  var stateTargets = [];

  var component = this;
  this.state.stateList.map(function(e,i){


  stateTargets.push(

  <DroppableTarget stateInput = {e}
  key = {i} showAnswersOnDrag = {false} changeStateData = {component.changeStateData}>

  </DroppableTarget>

  )
  })

  var stateImages = [];
  var awaitingGuesses = _.filter(this.state.stateList,function(state){ return !state.hasGuessed;});

  if(awaitingGuesses.length>0){
  this.state.stateList.map(function(e,i){
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
}
else{

  stateImages = (
    <div className = "row" >
    <div className = "col-md-12 text-center">
    <button className = "btn btn-primary btn-lg" onClick = {this.toggleAnswers}>Check my answers!</button>

    </div>
    </div>

  )
}

return(
  <div>
  <div className = "row">
  <div className = "col-md-3">

  {stateImages}

  </div>

  <div className = "col-md-9" >
  <div className = "row">
  {stateTargets}
  </div>
  </div>



  </div>
  </div>
)


},
changeStateData:function(index,stateObject){

var currentState = this.state.stateList;

var selectedStateObject = currentState[index];
var changedProperties = Object.keys(stateObject);
changedProperties.forEach(function(key){

selectedStateObject[key]=stateObject[key]

})

console.log(currentState);

currentState[index]=selectedStateObject;
this.setState({stateList:currentState});

},
toggleAnswers:function(){
  var states = this.state.stateList;
  states.forEach(function(state){

  state.showAnswers=true;

  })


  this.props.changeStateData({stateList:states});
  console.log(this.props.parentState);


}



})



module.exports = GameView;
