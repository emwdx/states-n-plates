var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;


var DropTarget = require('react-dnd').DropTarget;
var ReactCSSTransitionGroup = require('react-addons-css-transition-group')




var StateTargetContainer = React.createClass({


  render:function(){


if(this.props.showAnswers==true){

  var correctClass = (this.props.isCorrect)?"bg-success bordered":"bg-danger bordered";
  var displayMatchStatus = "col-md-12 col-sm-12 col-xs-12 "+ correctClass;
  var displayMatchIcon = (this.props.isCorrect)? "glyphicon glyphicon-ok": "glyphicon glyphicon-remove";
  var currentImageURL = this.props.imageURL;
}

else{
  var displayMatchStatus = "col-md-12 col-sm-12 col-xs-12 bordered"
  var displayMatchIcon = ""
  var currentImageURL = this.props.imageURL;


}
  var arrowDiv = (this.props.imageURL!=null & this.props.changeAnswers)?(<h3 className="glyphicon glyphicon-remove-circle change-answers" onClick={this.props.undoGuess}></h3>):(<h3 className="glyphicon glyphicon-remove-circle" style = {{opacity:0}}></h3>);


  var imageDiv = (this.props.imageURL!=null)?
  (
    <div className = "clearfix ">
    <ReactCSSTransitionGroup
          transitionName="example"


          transitionEnterTimeout={560000}
          transitionLeaveTimeout={560000}>

        <img className = "img-responsive" src = {currentImageURL} key={currentImageURL} />



  </ReactCSSTransitionGroup>

    </div>

  ):(<div className = "emptyImageDiv"></div>)
    return (

      <div className = "clearfix">

      <div className = {displayMatchStatus} >
    <div className = "row">
    <div className = "col-md-12 ">
    <h5 className = "text-center ">{this.props.displayName} <span className ={displayMatchIcon}></span></h5>
    </div>
    </div>


    <div className = "row">
    <div className = "col-md-4 col-xs-3 text-right">
    {arrowDiv}
    </div>
    <div className = "col-md-4 col-sm-9 col-xs-9">
    <div className = "center-block">


          {imageDiv}


    </div>
    </div>
    </div>

    </div>

      </div>

    )

  }
})

var DroppableTarget = React.createClass({
  getInitialState:function(){
  return {showAnswers:false,draggedStateImageURL:null}

},
  render:function(){
    //console.log(this.props)
    var isOver = this.props.isOver;
    var canDrop = this.props.canDrop;
    var connectDropTarget = this.props.connectDropTarget;

    var hoverClass = (this.props.isOver)?"selected targetDiv ":"targetDiv ";

    if(this.props.stateInput.showAnswers){

      var displayImage = this.props.stateInput.draggedStateImageFullURL;

    }
    else{
      if(this.props.stateInput.draggedStateImageURL!=null){
      var displayImage = this.props.stateInput.draggedStateImageURL;
      }

    }
    return connectDropTarget(
    <div className = "col-xs-12 col-md-12" onTouchEnd={this.tapTarget}>

    <div className = {hoverClass}>
    <StateTargetContainer imageURL = {displayImage} displayName={this.props.stateInput.stateDisplayName} isCorrect = {this.state.correctlyMatched}  showAnswers = {this.props.stateInput.showAnswers} key = {this.props.stateInput.stateIndex} changeAnswers={!this.props.stateInput.showAnswers} undoGuess={this.undoGuess}  fullImageURL = {this.props.stateInput.fullImageURL} > </StateTargetContainer>

    </div>

    </div>
  )




  },
  componentDidMount:function(){
    var component = this;

  },
  canDropState:function(){

    if(this.props.stateInput.hasBeenDroppedOnto){return false};
    return true;

  },
  undoGuess:function(){

    this.props.changeStateData(this.state.droppedStateIndex,{isCorrect:false,hasBeenDropped:false});
    this.props.changeStateData(this.props.stateInput.stateIndex,{isCorrect:false,hasBeenDroppedOnto:false,draggedStateImageURL:null});
    this.setState({draggedImageURL:null,droppedStateIndex:null})

  },
  tapTarget:function(){

    var selectedGuess = _.filter(this.props.stateList,function(state){ return state.isTouchSelected});

    if(selectedGuess.length>0 & !this.props.stateInput.hasBeenDroppedOnto){

        var item = selectedGuess[0];
        var droppedOnto = this.props.stateInput.stateIndex;
        var component = this;
        component.setState({draggedStateImageURL:item.imageURL,draggedStateImageFullURL:item.fullImageURL,droppedStateIndex:item.stateIndex})
        if(item.stateDisplayName==this.props.stateInput.stateDisplayName){
          component.setState({correctlyMatched:true,showAnswers:this.props.stateInput.showAnswers});


        }
        else{

          component.setState({correctlyMatched:false,showAnswers:this.props.stateInput.showAnswers});

        }

        component.props.changeStateData(item.stateIndex,{isCorrect:(item.stateDisplayName==this.props.stateInput.stateDisplayName),hasBeenDropped:true});

        component.props.changeStateData(droppedOnto,{hasBeenDroppedOnto:true,draggedStateImageURL:item.imageURL,draggedStateImageFullURL:item.fullImageURL})
        //console.log(props.stateInput.stateIndex);

        var states = this.props.stateList;
        var component = this;

        states.forEach(function(s){

        component.props.changeStateData(s.stateIndex,{isTouchSelected:false})

        });

    }



  }

})

var stateTarget = {

  canDrop: function (props, monitor) {
    // You can disallow drop based on props or item
    var item = monitor.getItem();

    return (!props.stateInput.hasBeenDroppedOnto);
  },


  hover: function (props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.


    return props;
  },

  drop: function (props, monitor, component) {
    var debug = component.props.showAnswersOnDrag;


    // Obtain the dragged item
    var item = monitor.getItem();
    var droppedOnto = props.stateInput.stateIndex;

    // You can do something with it
    component.setState({draggedStateImageURL:item.imageURL,draggedStateImageFullURL:item.fullImageURL,droppedStateIndex:item.stateIndex})
    if(item.stateDisplayName==props.stateInput.stateDisplayName){
      component.setState({correctlyMatched:true,showAnswers:(debug|props.stateInput.showAnswers)});


    }
    else{

      component.setState({correctlyMatched:false,showAnswers:(debug|props.stateInput.showAnswers)});

    }

    component.props.changeStateData(item.stateIndex,{isCorrect:(item.stateDisplayName==props.stateInput.stateDisplayName),hasBeenDropped:true});

    component.props.changeStateData(droppedOnto,{hasBeenDroppedOnto:true,draggedStateImageURL:item.imageURL,draggedStateImageFullURL:item.fullImageURL})
    //console.log(props.stateInput.stateIndex);

    return item;
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {

  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop:monitor.canDrop(),
    itemType: monitor.getItemType()
    }

}



DroppableTarget = DropTarget("stateImage", stateTarget, collect)(DroppableTarget);

module.exports = {StateTargetContainer,DroppableTarget};
