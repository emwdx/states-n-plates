var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;
var StateImageContainer = require('./draggable-components.jsx')
var {StateTargetContainer,DroppableTarget} = require('./target-components.jsx')



var GameView = React.createClass({

getInitialState:function(){

return {stateList:this.props.currentStateList,targetList: this.props.currentTargetList,currentScore:0,hasShuffled:false,showAnswers:false}

},

render:function(){

  var stateTargets = [];

  var component = this;

  this.props.currentTargetList.map(function(e,i){


  stateTargets.push(

  <DroppableTarget stateInput = {e}
  key = {i} showAnswersOnDrag = {false} changeStateData = {component.changeStateData} >

  </DroppableTarget>

  )
  })


  var stateImages = [];
  var awaitingGuesses = _.filter(this.props.currentStateList,function(state){ return !state.hasBeenDropped;});


  if(awaitingGuesses.length>0){
  awaitingGuesses.map(function(e,i){
 if(!e.hasBeenDropped){
    stateImages.push(
    <div className = "row" key = {i}>
    <div className = "col-md-12 col-xs-12 ">
    <StateImageContainer stateObject = {e}  />

    </div>
    </div>
  );
}

  })
}
else{

  if(!this.state.showAnswers){

    var visibleButton = <button className = "btn btn-primary " onClick = {this.toggleAnswers}>Check <span className = "hidden-xs" >Answers</span>!</button>
  }
  else{

    var visibleButton = <button className = "btn btn-primary " onClick = {this.showNextStates}>Next<span className = "hidden-xs" > States</span></button>

  }
  stateImages = (
    <div className = "row" >
    <div className = "col-md-12 col-xs-12 text-center">
    {visibleButton}

    </div>
    </div>

  )
}

if(this.props.currentStateList.length>0){
return(


  <div className = "row">
  <div className = "col-md-4 col-xs-3">
  <div className = "row">
  <div className = "col-md-12">
  <ScoreBoard score = {this.state.currentScore}></ScoreBoard>
  </div>
  </div>
  {stateImages}

  </div>

  <div className = "col-md-8 col-xs-9" >

  {stateTargets}

  </div>



  </div>

)
}
else{

return (
  <div className = "container">
  <div className = "row">
  <div className = "col-md-4 col-md-offset-4 page-header text-center">
  <h1>You correctly matched <span className = "text-success">{this.state.currentScore}</span> states.</h1>


  </div>
  </div>
  </div>

)

}

},
changeStateData:function(index,stateObject){

var currentState = this.props.parentState.stateList;
var currentNavState = this.props.parentState.navState;

var selectedStateObject = currentState[index];
var changedProperties = Object.keys(stateObject);
changedProperties.forEach(function(key){

selectedStateObject[key]=stateObject[key]

})



currentState[index]=selectedStateObject;

this.props.changeParentState({stateList:currentState});

},
toggleAnswers:function(){
  var currentNavState = this.props.parentState.navState;
  var currentScore = 0;

  var states = this.props.parentState.stateList;
  states.forEach(function(state){
  if(state.hasBeenDroppedOnto & state.hasBeenDropped)
  {  state.showAnswers=true;
    if(state.isCorrect){currentScore+=1;}
  }
  })


  this.props.changeStateData({stateList:states});
  this.setState({showAnswers:true,currentScore:currentScore});



},
showNextStates:function(){

  this.props.nextStates();
  this.setState({showAnswers:false,targetList:_.shuffle(this.props.currentStateList)})

},
componentDidMount:function(){

    if(!this.state.hasShuffled){
    this.setState({targetList:_.shuffle(this.props.currentStateList),hasShuffled:true})

  }


}



})

var ScoreBoard = React.createClass({

render:function(){

return(
<div className ="row">
<div className = " col-md-12 text-center">
  <h3>States Correct: <span className = "text-success">{this.props.score}</span></h3>
</div>
</div>
)

}

});


module.exports = GameView;
