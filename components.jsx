var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('./underscore/underscore');
var DragDropContext = require('react-dnd').DragDropContext;

var HTML5Backend = require('react-dnd-html5-backend');

var StateImageContainer = require('./draggable-components.jsx')
var {StateTargetContainer,DroppableTarget} = require('./target-components.jsx')
var GameView = require('./game-components.jsx')

/**
 * Implements the drag source contract.
 */



//var stateNames = ["Alabama","Arkansas","Arizona","Alaska","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New York","New Hampshire","North Carolina","New Jersey","New Mexico","North Dakota","Oklahoma","Ohio","Oregon","Pennsylvania","Rhode Island","South Dakota","South Carolina","Texas","Tennessee","Utah","Vermont","Virginia","West Virginia","Wisconsin","Washington","Wyoming"];

var stateNames = ["Ohio","California"]
var stateList = [];
stateNames.slice(0,5).forEach(function(state,index){
  var stateLowerCase = state.toLowerCase().replace(/ /g,'');
  var imageURL = "img/partial/"+stateLowerCase+"-partial.png";
  //var choices = _.shuffle(_.union(_.sample(_.without(stateNames,state),4),[state]));




  var stateObject = {
  stateDisplayName:state,
  stateLowerCase:stateLowerCase,
  showAnswers:false,
  hasGuessed:false,
  imageURL:imageURL,
  stateIndex:index,
  currentGuess:"",
  isCorrect:false

  }
  stateList.push(stateObject);

});


var App = React.createClass({
  getInitialState:function(){

    //return {stateList:_.shuffle(stateList),navState:0}
    return {stateList:stateList,currentStates:stateList,stateTargets:_.shuffle(stateList),navState:0}

  },
  render: function () {

    var slicedList = this.state.currentStates.slice(this.state.navState,this.state.navState+5);
    var slicedComponents = [];
    slicedList.map(function(item,index){

    //slicedComponents.push(<StateView key={index} stateObject={item} stateListIndex={index}  />)

  })

  var shuffledComponents = _.shuffle(this.state.stateTargets);




var stateTargets = [];
slicedList.map(function(e,i){

stateTargets.push(

<DroppableTarget stateInput = {e} key = {i} showAnswersOnDrag = {true}>

</DroppableTarget>

)
})

var newApp = (

  <div>


  <GameView stateList = {this.state.stateList} parentState = {this.state} changeStateData = {this.changeStateData} ></GameView>


  <hr/>
  <div className = "row">
  <div className = "col-md-3">
  Here's how the dragging action will work:
  </div>
  </div>
  <div className = "row">
  <div className = "col-md-3">
  <StateImageContainer stateObject = {stateList[0]} key = {0} />
  <StateImageContainer stateObject = {stateList[1]} key = {1} />
  </div>
  <div className = "col-md-9">
  <div className = "row">
  {stateTargets}
  </div>
  </div>

  </div>
  <hr/>
  <p/>
  <div className = "row">
  <div className = "col-md-6">
  </div>
  <div className = "col-md-6">
  </div>
  </div>
  <div className = "row">
  <div className = "col-md-3">
  Correct:
  <StateTargetContainer imageURL = {"img/partial/ohio-partial.png"} displayName={"Ohio"} isCorrect = {true}  showAnswers = {true}> </StateTargetContainer>
  </div>
  <div className = "col-md-3">
  Incorrect:
  <StateTargetContainer imageURL = {"img/partial/ohio-partial.png"} displayName={"California"}  isCorrect = {false}  showAnswers = {true}></StateTargetContainer>
  </div>
  <div className = "col-md-3">
  Before dragging a plate :
  <StateTargetContainer imageURL = {null} displayName={"California"} isCorrect = {false} showAnswers = {false}></StateTargetContainer>
  </div>
  <div className = "col-md-3">
  After dragging, answers hidden:
  <StateTargetContainer imageURL = {"img/partial/ohio-partial.png"} displayName={"California"} isCorrect = {false} showAnswers = {false}></StateTargetContainer>
  </div>
</div>
</div>


)

    return newApp;

  },
  nextPage:function(){
    if(this.state.navState<(this.state.stateList.length-5)){
  this.setState({navState:this.state.navState+5});
}

},
prevPage:function(){
this.setState({navState:this.state.navState-5});

},

removeState:function(currentState){
  //console.log("passed down")
this.setState({currentStates:_.without(this.state.currentStates,currentState)})

},
changeStateData:function(stateObject){


return this.setState(stateObject);
}





});






var NavigationBar = React.createClass({

  getInitialState:function(){

  return {currentIndex:this.props.navState};

  },
  render:function(){

    if (this.props.navState<45){
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


var DraggableApp = DragDropContext(HTML5Backend)(App);

  ReactDOM.render(
    <DraggableApp/>,
    document.getElementById('container')
  );
