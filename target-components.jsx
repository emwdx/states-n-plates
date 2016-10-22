var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;


var DropTarget = require('react-dnd').DropTarget;




var StateTargetContainer = React.createClass({


  render:function(){


if(this.props.showAnswers==true){

  var correctClass = (this.props.isCorrect)?"bg-success bordered":"bg-danger bordered"
  var displayMatchStatus = "col-md-12 "+ correctClass
  var displayMatchIcon = (this.props.isCorrect)? "glyphicon glyphicon-ok": "glyphicon glyphicon-remove"
}

else{
  var displayMatchStatus = "col-md-12 bordered"
  var displayMatchIcon = ""

}

  var imageDiv = (this.props.imageURL!=null)?(<img className = "img-responsive" src = {this.props.imageURL}/>):(<div className = "emptyImageDiv"></div>)
    return (

      <div>

      <div className = {displayMatchStatus} onMouseOver={this.hoverBorder}>
    <div className = "row">
    <div className = "col-md-12 ">
    <h3 className = "text-center ">{this.props.displayName} <span className ={displayMatchIcon}></span></h3>
    </div>
    </div>

    <div className = "row">
    <div className = "col-md-12">
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
  return {showAnswers:false}

},
  render:function(){
    //console.log(this.props)
    var isOver = this.props.isOver;
    var canDrop = this.props.canDrop;
    var connectDropTarget = this.props.connectDropTarget;

    var hoverClass = (this.props.isOver)?"targetDiv selected":"targetDiv ";

    //var answerClass = (this.state.droppedStateItem.isCorrect?'bg-success':'bg-danger');
    //if(isOver){console.log(this.props)}
    return connectDropTarget(
    <div className = "col-md-4 ">

    <div className = {hoverClass}>
    <StateTargetContainer imageURL = {this.state.draggedStateImageURL} displayName={this.props.stateInput.stateDisplayName} isCorrect = {this.state.correctlyMatched}  showAnswers = {this.state.showAnswers} key = {this.props.stateInput.stateIndex}> </StateTargetContainer>

    </div>

    </div>
  )




  },
  componentDidMount:function(){
    var component = this;

  }
  ,
  canDropState:function(){

    if(this.state.hasGuessed){return false};
    return true;

  }

})

var stateTarget = {

  canDrop: function (props, monitor) {
    // You can disallow drop based on props or item
    var item = monitor.getItem();
    console.log(props)
    return (item.imageURL!=null);
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
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    var item = monitor.getItem();

    // You can do something with it
    component.setState({draggedStateImageURL:item.imageURL})
    if(item.stateDisplayName==props.stateInput.stateDisplayName){
      component.setState({correctlyMatched:true,showAnswers:debug});

    }
    else{

      component.setState({correctlyMatched:false,showAnswers:debug});
    }


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
