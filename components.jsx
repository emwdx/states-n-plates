var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('./underscore/underscore');
var DragDropContext = require('react-dnd').DragDropContext;

var HTML5Backend = require('react-dnd-html5-backend');
import Modernizr from 'browsernizr';
import { default as TouchBackend } from 'react-dnd-touch-backend';

var StateImageContainer = require('./draggable-components.jsx')
var {StateTargetContainer,DroppableTarget} = require('./target-components.jsx')
var GameView = require('./game-components.jsx')

/**
 * Implements the drag source contract.
 */



var stateNames = ["Ohio","California","New York","Connecticut","Pennsylvania","Alabama","Arkansas","Arizona","Alaska","Colorado","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","North Carolina","New Jersey","New Mexico","North Dakota","Oklahoma","Oregon","Rhode Island","South Dakota","South Carolina","Texas","Tennessee","Utah","Vermont","Virginia","West Virginia","Wisconsin","Washington","Wyoming"];

//var stateNames = []
var stateList = [];
stateNames.forEach(function(state,index){
  var stateLowerCase = state.toLowerCase().replace(/ /g,'');
  var imageURL = "img/partial/"+stateLowerCase+"-partial.png";
  var fullImageURL = "img/full/"+stateLowerCase+"-full.jpg";
  //var choices = _.shuffle(_.union(_.sample(_.without(stateNames,state),4),[state]));




  var stateObject = {
  stateDisplayName:state,
  stateLowerCase:stateLowerCase,
  showAnswers:false,
  hasBeenDroppedOnto:false,
  hasBeenDropped:false,
  imageURL:imageURL,
  fullImageURL:fullImageURL,
  stateIndex:index,
  currentGuess:"",
  isCorrect:false

  }
  stateList.push(stateObject);

});
//var stateTargetList = _.shuffle(stateList)



var App = React.createClass({
  getInitialState:function(){

    //return {stateList:_.shuffle(stateList),navState:0}
    return {stateList:stateList,visibleStates:stateList.slice(0,4), shuffledStates: _.shuffle(stateList.slice(0,4)),navState:0}

  },
  render: function () {


var newApp = (

  <div>


  <GameView currentStateList = {this.state.visibleStates} currentTargetList = {this.state.shuffledStates} parentState = {this.state} changeStateData = {this.changeStateData} changeParentState = {this.changeParentState} nextStates={this.nextStates} ></GameView>
  <hr/>


</div>


)

    return newApp;

  },
removeState:function(currentState){
  //console.log("passed down")
this.setState({currentStates:_.without(this.state.currentStates,currentState)})

},
changeStateData:function(stateObject){


return this.setState(stateObject);
},
nextStates:function(){

var currNavState = this.state.navState;
this.setState({navState:currNavState,visibleStates:this.state.stateList.slice(currNavState+4,currNavState+8),shuffledStates: _.shuffle(this.state.stateList.slice(currNavState+4,currNavState+8)),navState:(currNavState+4)});
console.log(this)



},
changeParentState:function(stateObject){

return this.setState(stateObject);

}
});



var NavigationBar = React.createClass({

  getInitialState:function(){

  return {currentIndex:this.props.navState};

  },
  render:function(){

    if (this.props.navState<48){
    var nextButton =
    <button className = "btn btn-lg" ref = "forward-button" onClick={this.props.nextPage}>Next</button>
  }

    if(this.props.navState>0){
      var prevButton = <button className = "btn btn-lg" ref="back-button"
      onClick={this.props.prevPage}>Previous</button>

    }

    return (

      <div className = "row">
      <div className = "col-md-4 text-center">
      {prevButton}
      </div>
      <div className = "col-md-4 col-md-offset-4 text-center">
      {nextButton}
      </div>
      </div>


    )

  }



});


var DraggableApp = DragDropContext(Modernizr.touchevents ? TouchBackend : HTML5Backend)(App);

ReactDOM.render(
    <DraggableApp/>,
    document.getElementById('container')
  );
