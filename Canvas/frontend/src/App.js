import React, { Component } from 'react';
import './App.css';
import Login from './components/loginSignup/Login'
import Signup from './components/loginSignup/Signup';
// import Test from './components/Signup/test';
// import Sidenav from './components/Dashboard/Sidenav';
 import { BrowserRouter, Route } from 'react-router-dom';
 import Dashboard from '../src/components/dashboard/Dashboard';
 import Profile from './components/profile/Profile';
 import EditProfile from './components/profile/EditProfile';
 import CreateCourse from './components/courseAddOrCreate/CreateCourse';
 import RegisterForCourses from './components/courseAddOrCreate/registerForCourse/RegisterForCourses';
 import CourseHome from './components/courseDashboard/CourseHome';
 import AssignmentSubmission from './components/courseDashboard/AssignmentSubmission';
 import ViewAssignment from './components/courseDashboard/ViewAssignment';
 import TakeQuiz from './components/courseDashboard/TakeQuiz';
import Inbox from './components/Inbox';
import AddCode from './components/AddCode';
import DisplayPDF from './components/commons/DisplayPDF';
// import Card from './components/Dashboard/Card';
// import RegisterForCourses from './components/Courses/RegisterForCourses';
// import CreateCourse from './components/Courses/CreateCourses'
// import DashHome from './components/Dashboard/DashHome'
// import CourseHome from './components/Courses/CourseDetails/CourseHome'
// import Files from './components/Courses/CourseDetails/files'
// import AddCode from './components/Courses/AddCode'
// import Test from './components/Test'

class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={Profile} />
            <Route path="/editprofile" component={EditProfile} />
            <Route path="/createcourse" component={CreateCourse} />
            <Route path="/registercourses/home" component={RegisterForCourses} />
            <Route path="/registercourses/addcourse" component={RegisterForCourses} />
            <Route path="/course" component={CourseHome} />
            <Route path="/course/assignment/submission" component={AssignmentSubmission}/>
            <Route path="/course/assignment/view" component={ViewAssignment}/>
            <Route path="/course/takequiz" component={TakeQuiz}/>
            <Route path="/inbox" component={Inbox} /> 
            <Route path="/addCode" component={AddCode} /> 
            <Route path="/course/pdfview" component={DisplayPDF} />
            {/* <Route path="/test" component={Test}/>
            <Route path="/sidenav" component={Sidenav}/> 
            <Route path="/card" component={Card}/> 
            <Route path="/registercourses/home" component={RegisterForCourses} />
            <Route path="/registercourses/addcourse" component={RegisterForCourses} />
            
            
            <Route path="/profile" component={Profile} />
            <Route path="/editprofile" component={EditProfile} />
            <Route path="/createcourse" component={CreateCourse} />
            <Route path="/course" component={CourseHome} />
            <Route path="/files" component={Files} />
            <Route path="/addCode" component={AddCode} /> */}
            {/* <Route path="/test" component={Test} /> */}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
