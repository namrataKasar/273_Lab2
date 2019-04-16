import React, { Component } from "react";
import { Document, Page , pdfjs} from "react-pdf";
import {Grid, Button} from '@material-ui/core'
import {Redirect} from 'react-router-dom';
import {Typography, Paper, TextField} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as assignmentData from '../../actions/assignmentAction';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class DisplayPDF extends Component {
  state = { 
    numPages: null, 
    pageNumber: 1,
    redirectVar: '',
    errorMsg: '',
    grades: '' 
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  goBack = () => {
    
    const propsData = this.props.location;
    if(propsData.show == "submissions")
    {
      this.setState({
        redirectVar :  <Redirect to={{
          pathname: "/course/submissionsView",
          state : {
            assignment : this.props.location.assignment
          }
        }}/>
      })
    }
    else
    {
      this.setState({
        redirectVar :  <Redirect to={{
          pathname: "/course/assignmentview",
          state : {
            assignment : this.props.location.assignment
          }
        }}/>
      })
    }
  }
  
  handleChange = name => e => {
    this.setState({
     [name] : e.target.value,
     errorMsg : ''
    })
  }
 

  submitGrades = (e) => {
   
    const propsData = this.props.location;
    console.log(propsData.assignment.TOTAL_POINTS + " " + this.state.grades);
    if(Number(propsData.assignment.TOTAL_POINTS) < Number(this.state.grades) || this.state.grades == '')
    {
      this.setState({
        errorMsg : "Check grades again!!"
      })
    }
    else
    {
      let index = propsData.index;
      let sjsuID = propsData.assignment.SUBMISSIONS[index].SJSU_ID;
      let totalPoints = propsData.assignment.TOTAL_POINTS;
      
      const data = {
        sjsuID : sjsuID,
        courseId : propsData.assignment.COURSE,
        assignmentName : propsData.assignment.TITLE,
        score : this.state.grades,
        totalPoints : totalPoints,
        dueDate : propsData.assignment.DUE_DATE,
      }
      this.props.submitGrades(data)
      .then(response => {
        const asList = this.props.assignmentData.CourseReducer.CourseReducer.assignments;
        const index = this.props.location.mainIndex
        console.log(asList + " " + index);
        this.setState({
          redirectVar :  <Redirect to={{
            pathname: "/course/submissionsView",
            state : {
              assignment : asList[index],
              index : index
            }
          }}/>
        })
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  render() {
    const { pageNumber, numPages } = this.state;
    console.log(this.props.location);
    let file = "";  
    let subCode;  
    if(this.props.location.show)
    {
      let index = this.props.location.index;
      let sjsuID = this.props.location.assignment.SUBMISSIONS[index].SJSU_ID;
      let sName = this.props.location.assignment.SUBMISSIONS[index].STUDENT_NAME;
      let totalPoints = this.props.location.assignment.TOTAL_POINTS;
      file = this.props.location.assignment.SUBMISSIONS[index].FILE_PATH;
      subCode = (
        
              <Paper style={{padding: '10%'}}>
                <div style={{color:'red'}}>
                  <label>{this.state.errorMsg}</label>  
                </div>
                <Typography variant="h6" style={{color: '#008ee2', fontSize: '1rem'}} gutterBottom>
                    <strong >SJSU ID : </strong> {sjsuID}
                </Typography>
                <Typography variant="h6" style={{color: '#008ee2', fontSize: '1rem'}} gutterBottom>
                    <strong >Student Name : </strong> {sName}
                </Typography>
                <Typography variant="h6" style={{color: '#008ee2', fontSize: '1rem'}} gutterBottom>
                    <strong >Enter Grades out of {totalPoints}</strong>
                </Typography>
                <TextField
                text-align="center"
                type="Number"                
                value={this.grades}
                onChange={this.handleChange('grades')}
                required>

                </TextField>
                <br>
                </br>
                <br></br>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"  
                    onClick={this.submitGrades}>
                      Submit Grades
                    </Button>
              </Paper>
            
      )
      console.log(file);
    }
    else{
      file = this.props.location.assignment.FILE_PATH;
    }
    return (
      <div>
        {this.state.redirectVar}
        <Grid 
        container spacing={12}>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={5}>
              <Grid 
              style={{display: 'inline-flex', marginTop : '25px'}}
              container spacing={12}>
                <Grid item xs={4}>
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary" 
                    onClick={this.goToPrevPage}>
                      Prev
                    </Button>
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"  
                    onClick={this.goToNextPage}>
                      Next
                    </Button>
                </Grid>
                <Grid item xs={4}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"  
                    onClick={this.goBack}>
                      Back
                    </Button>
                </Grid>
                <Grid item xs={4}>
                  <p>
                    Page {pageNumber} of {numPages}
                  </p>
                </Grid>
              </Grid>
              
              <div style={{ width: 600, display:'inline-block'}}>
                <Document
                  file={file}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} width={600} />
                </Document>
              </div>
            </Grid>
            
            <Grid item xs={4}
            style={{padding: '5%'}}>
              {subCode}
            </Grid>
        </Grid>    
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assignmentData : state
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(assignmentData, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(DisplayPDF);