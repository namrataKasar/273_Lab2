import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography, Button, Paper, TextField} from '@material-ui/core';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import { bindActionCreators } from 'redux';
import * as assignmentData from '../../actions/assignmentAction';

const styles = theme => ({
//   root: {
//     width: '100%',
//     maxWidth: 884,
//     backgroundColor: '#f0f0f0',
//     padding: '32px',
//     border: '0.5px solid black'
// },
root: {
  boxShadow: 'none',
  width: '100%',
  marginTop: theme.spacing.unit * 5,
},
nested: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  },
bgPaper: {
    padding: '4px',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #D3D3D3'
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  listItem: {
    background: 'white',
    border: '1px solid gray',
    margin: '0px',
    padding: '0px'
  },
  listItemText: {
    margin: '16px'
  },
  divider: {
    border: '1px dashed black'
  },
  textColor1 : {
    color: '#008ee2',
  },
  button: {
    margin: theme.spacing.unit * 4 ,
  },
  paperClass:{
    marginTop: 20,
    overflowX: "auto",
    padding: '5% 5% 5%',
    width: '50%',
    marginLeft: '26%',
  },
  fullWidth: {
    width: '100%',
    // float: 'left'
  },
  textField: {
      marginLeft: theme.spacing.unit * 5,
      marginRight: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 5,
      width: '90%',
        
    },
    textField2: {
        marginLeft: theme.spacing.unit * 3,
        //marginRight: theme.spacing.unit * 3,
        width: '95%',
    },
});

class AssignmentSubmission extends React.Component {

  state = {
    fileUploaded : '',
    assignment : '',
    redirectVar : ''
  }

  viewFile = () => {
    this.setState({
      redirectVar :  <Redirect to={{
        pathname: "/course/pdfview",
        assignment:this.props.location.state.assignment 
      }}/>
    })
  }

    render(){
      const { classes } = this.props;
      const assignment = this.props.location.state.assignment;
    console.log(this.props.location);
        return(
            <div style={{marginTop: '70px'}}>
            {this.state.redirectVar}
                <div className={classes.root} >
            <Typography variant="h6" className={classes.textColor1} noWrap>
                Assignment
            </Typography>
        </div>
        <Paper className={classes.paperClass}>


          <Grid
              container
              direction="row"
              justify="space-evenly"
              // alignItems="center"
              item xs={12}
          >

                    <form style={{width:'100%', textAlign: 'left'}}
                    className={classes.container} onSubmit={(e) => {this.submitAssignment(e, assignment)}}>
                                <div className={classes.fullWidth}>
                                    <label style={{color:'red'}}></label>
                                </div>
                                <Grid container spacing={12}> 
                                  <Grid item xs={3}>
                                    <Typography variant="h6" gutterBottom>
                                      Assignment :
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={9}>
                                    <Typography variant="subtitle1" gutterBottom>
                                      {assignment.TITLE}
                                    </Typography>
                                  </Grid>
                                </Grid>

                                <Grid container spacing={12}> 
                                  <Grid item xs={3}>
                                    <Typography variant="h6" gutterBottom>
                                      Due Date :
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={9}>
                                    <Typography variant="subtitle1" gutterBottom>
                                      {assignment.DUE_DATE.slice(0,10)}
                                    </Typography>
                                  </Grid>
                                </Grid>

                                <Grid container spacing={12}> 
                                  <Grid item xs={3}>
                                    <Typography variant="h6" gutterBottom>
                                      Marks :
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={9}>
                                    <Typography variant="subtitle1" gutterBottom>
                                      {assignment.TOTAL_POINTS}
                                    </Typography>
                                  </Grid>
                                </Grid>

                                <Grid container spacing={12}> 
                                  <Grid item xs={3}>
                                    <Typography variant="h6" gutterBottom>
                                      File :
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={9}>
                                    <Typography variant="subtitle1" gutterBottom>
                                      <a href={assignment.FILE_PATH}>Download File</a>
                                    </Typography>
                                    <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"   
                                    onClick={this.viewFile}
                                    >
                                      View File
                                    </Button>
                                  </Grid>
                                </Grid>
                            </form>
          
          </Grid>
        </Paper>
            </div>

      
        
        )
    }
}

AssignmentSubmission.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return{
    assignmentData : state
  }
}

const mapDispacthToProps = (dispatch) => {
  return bindActionCreators(assignmentData, dispatch);
}
export default connect(mapStateToProps, mapDispacthToProps)(withStyles(styles)(AssignmentSubmission));

