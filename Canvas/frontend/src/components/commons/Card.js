import React from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import * as getData from '../../actions/loginAction';

class Card extends React.Component {

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
    return (
      <div className="card">
        <form onSubmit={this.onCardSubmit}>
          {/* <a href="#"> */}
          <Link style={{color : 'rgb(98, 110, 123)'}}
               to={{pathname: '/course/home'}} 
               onClick={() => this.setCourse(this.props.value.COURSE_ID, this.props.value.COURSE_NAME)}
               >
            <header className="card-header">
            </header>
            {/* <CardBody title={'What happened in Thialand?'} text={'Kayaks crowd Three Sister Springs, where people and manatees maintain controversial coexistence'}/> */}
            <div className="card-content">
             
                <h2 className="card-content-title ellipsis">
                  <span>{this.props.value.DEPARTMENT}</span>
                </h2>
                <div className="card-content-subtitle ellipsis">
                  {this.props.value.COURSE_ID} : {this.props.value.COURSE_NAME}
                </div>
                <div className="card-term ellipsis">
                {this.props.value.TERM}
                </div>
              
            </div>
            </Link>
          {/* </a> */}
        </form>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Card);