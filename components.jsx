var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('./underscore/underscore');

var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');




var stateNames = ["Alabama","Arkansas","Arizona","Alaska","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New York","New Hampshire","North Carolina","New Jersey","New Mexico","North Dakota","Oklahoma","Ohio","Oregon","Pennsylvania","Rhode Island","South Dakota","South Carolina","Texas","Tennessee","Utah","Vermont","Virginia","West Virginia","Wisconsin","Washington","Wyoming"];

var stateList = [];
stateNames.forEach(function(state,index){
  var stateLowerCase = state.toLowerCase().replace(/ /g,'');
  var imageURL = "img/partial/"+stateLowerCase+"-partial.png";
  var choices = _.shuffle(_.union(_.sample(_.without(stateNames,state),4),[state]));




  var stateObject = {
  stateDisplayName:state,
  stateLowerCase:stateLowerCase,
  showAnswers:false,
  hasGuessed:false,
  imageURL:imageURL,
  choices:choices,
  stateIndex:index

  }
  stateList.push(stateObject);

});


var App = React.createClass({
  getInitialState:function(){

    //return {stateList:_.shuffle(stateList),navState:0}
    return {stateList:stateList,navState:0}

  },
  render: function () {

    var slicedList = this.state.stateList.slice(this.state.navState,this.state.navState+5);
    var slicedComponents = [];
    slicedList.map(function(item,index){

    slicedComponents.push(<StateView key={index} stateObject={item} stateListIndex={index}  />)

  })

  var shuffledComponents = _.shuffle(this.state.stateList.slice(this.state.navState,this.state.navState+5));
  console.log(shuffledComponents)
    return (

      <div>

      <NavigationBar navState={this.state.navState} nextPage={this.nextPage} prevPage = {this.prevPage}/>
      <div className = "row">
      <div className = "col-md-3">
      <StatesImageContainer  stateList={slicedList}/>
      </div>
      <div className = "col-md-9">
      <StateTargetContainer stateList = {shuffledComponents}/>
      </div>

      </div>
      </div>

    );

  },
  nextPage:function(){
    if(this.state.navState<(this.state.stateList.length-5)){
  this.setState({navState:this.state.navState+5});
}

},
prevPage:function(){
this.setState({navState:this.state.navState-5});

}





});

var StatesImageContainer = React.createClass({

  render:function(){
    var stateList = this.props.stateList;
    var imageComponents = [];
    stateList.map(function(item,index){

    imageComponents.push(
      <div className = "row stateImageContainer" key={index} ref = {item.stateDisplayName}>
      <div className = "col-md-12" >
    <img src = {item.imageURL} className = "img img-thumbnail"/>
    </div>
    </div>
  )


    })

    return (
      <div id = "stateImagesContainer">
    {imageComponents}

    </div>
    )


  },
  componentDidMount:function(){
/*

    $('.stateImageContainer').draggable( {
      revert: "invalid",
      snap:".stateTargetContainer",
      snapMode:"inner",
      snapTolerance:20,

    });
    $( "#stateImagesContainer" ).droppable({
accept: ".stateImageContainer",
drop:function(event,ui){


}

});
*/
  }


})

var StateTargetContainer = React.createClass({


  render:function(){
    console.log(this.props.stateList);
    var stateList = this.props.stateList;
    var stateTargetComponents = [];
    stateList.map(function(item,index){

    stateTargetComponents.push(

      <div className = "col-md-4" key={index} ref = {item.stateIndex}>
    <div className = "row">
    <div className = "col-md-8 col-md-offset-2">
    <h3 className = "text-center">{item.stateDisplayName}</h3>
    </div>
    </div>
    <DroppableTarget />
    </div>

    )


    })
    return (

      <div id = "statesTargetContainer">
      {stateTargetComponents}

      </div>

    )


  }


})

var StatesContainer = React.createClass({

  render:function(){

    return(


        <div className = "row">
        <div className = "col-md-4 statesImageContainer">
        <img src = {this.props.stateObject.imageURL} className="img-thumbnail" onClick={this.setImageURL}/>
        </div>

        <div className = "col-md-8 well">
        <ChoiceView choices={this.props.stateObject.choices} choiceName={this.props.stateObject.stateDisplayName} stateIndex={this.props.stateListIndex} />
        </div>
    </div>

      )


  },

  setImageURL:function(){


    if(this.state.stateObject.showAnswers){

        this.setState({showAnswers:false,imageURL:("img/partial/"+this.props.stateObject.stateLowerCase+"-partial.png")})
    }
    else{
        this.setState({showAnswers:true,imageURL:("img/full/"+this.props.stateObject.stateLowerCase+"-full.jpg")})



    }


  },
  componentDidMount:function(){
    $('.stateContainer').draggable(function(e,u){


    });


  }



});


//Code below is for previous version of the task.
var DroppableTarget = React.createClass({
  getInitialState:function(){

    return {droppableClass:"well stateTargetContainer "}
  },
  render:function(){
    return(
    <div className = "row">
    <div className = {this.state.droppableClass}>

    </div>
    </div>
  )




  },
  componentDidMount:function(){
    var component = this;
    /*
    $( ".stateTargetContainer" ).droppable({
accept: ".stateImageContainer",
drop:function(event,ui){

$(this).droppable("option","disabled",true);
},
out:function(event,ui){

$(this).droppable("option","disabled",false);

},
revert: "invalid",
snap:"#stateImagesContainer",
snapMode:"inner",
snapTolerance:20,
tolerance:"intersect",
addClasses: false

});
*/

  }



})

var StateView = React.createClass({

  render:function(){

    return(


        <div className = "row stateContainer">
        <div className = "col-md-4 stateImageContainer">
        <img src = {this.props.stateObject.imageURL} className="img-thumbnail" onClick={this.setImageURL}/>
        </div>

        <div className = "col-md-8 well">
        <ChoiceView choices={this.props.stateObject.choices} choiceName={this.props.stateObject.stateDisplayName} stateIndex={this.props.stateListIndex} />
        </div>




      </div>

      )


  },

  setImageURL:function(){


    if(this.state.stateObject.showAnswers){

        this.setState({showAnswers:false,imageURL:("img/partial/"+this.props.stateObject.stateLowerCase+"-partial.png")})
    }
    else{
        this.setState({showAnswers:true,imageURL:("img/full/"+this.props.stateObject.stateLowerCase+"-full.jpg")})



    }


  },
  

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

var ChoiceView = React.createClass({

  render:function(){
    var choices = this.props.choices;
    var choiceList = [];
    var stateIndex = this.props.stateIndex;

    choices.map(function(item,index){
      var itemLowerCase = item.toLowerCase().replace(/ /g,'');
    choiceList.push(
      <div className = "col-md-2 text-center" key={index}>
      <label className="radio-inline">
          <input type="radio" name={stateIndex} id={item} value={itemLowerCase} />
        {item}
      </label>
      </div>

    );


  })

  return (

    <div className ="radio" onChange={this.selectGuess} name={stateIndex}>

    {choiceList}
    </div>



  )


},
selectGuess:function(){

    console.log(this.props);


  }



})



  ReactDOM.render(
    <App />,
    document.getElementById('container')
  );
