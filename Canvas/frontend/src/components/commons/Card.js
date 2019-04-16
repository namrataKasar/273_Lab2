import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceConnector,
  DragSourceMonitor,
} from 'react-dnd';
import { XYCoord } from 'dnd-core';
import flow from 'lodash/flow';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import * as getData from '../../actions/loginAction';


import Draggable from 'react-draggable';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = (findDOMNode(
      component,
    )).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = (clientOffset).y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
}


class Card extends React.Component {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    moveCard: PropTypes.func.isRequired,
  }

  onCardSubmit = (e) => {
    console.log("Card Submitted");
  }

  setCourse = (courseId, courseName) => {
    console.log("Set course");
    console.log(courseId);
    const data = {
      courseId : courseId,
    }
    
    window.sessionStorage.setItem('courseId', courseId);
    window.sessionStorage.setItem('courseName', courseName);

    this.props.getCourseDetails(data)
    .then(response => {

    })
    .catch(error => {

    })
  }

  render() {
    const {
      isDragging,
      connectDragSource,
      connectDropTarget,
      } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      <Draggable
        // axis="x"
        // handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[25, 25]}
        scale={1}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
      >
      
          <div className="card">
     
        <form onSubmit={this.onCardSubmit}>
          {/* <a href="#"> */}
          
            <header className="card-header">
            </header>
            {/* <CardBody title={'What happened in Thialand?'} text={'Kayaks crowd Three Sister Springs, where people and manatees maintain controversial coexistence'}/> */}
            <div className="card-content">
            <Link style={{color : 'rgb(98, 110, 123)'}}
               to={{pathname: '/course/home'}} 
               onClick={() => this.setCourse(this.props.value.COURSE_ID, this.props.value.COURSE_NAME)}
               >  
                <h2 className="card-content-title ellipsis">
                  <span>{this.props.value.DEPARTMENT}</span>
                </h2>
                <div className="card-content-subtitle ellipsis">
                  {this.props.value.COURSE_ID} : {this.props.value.COURSE_NAME}
                </div>
                <div className="card-term ellipsis">
                {this.props.value.TERM}
                </div>
                </Link>
            </div>
            
        </form>
      </div>
       
        
      </Draggable>
    )
  }
}

function mapStateToProps(state){
  return{
      userData : state
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(getData,dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)
(
  flow(
    DragSource(
      'card',
      cardSource,
      (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
      }),
    ),
    DropTarget('card', cardTarget, (connect) => ({
      connectDropTarget: connect.dropTarget(),
    }))
  )(Card));