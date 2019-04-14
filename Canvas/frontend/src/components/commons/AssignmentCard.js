import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Typography, Button, Paper, TextField} from '@material-ui/core';
import {connect} from 'react-redux';
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
    padding: '5% 10% 5%'
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

class AssignmentCard extends React.Component {

    render(){
        return(
            <Grid
            key={`${index}`}
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.bgPaper}
        >
            <Grid item xs={1}>
                <AssignmentIcon className={classes.icon} />
            </Grid>
            <Grid item xs={8}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <Typography variant="h6" gutterBottom>
                        <strong>{this.state.assignmentsList[text].TITLE}</strong>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {/* <strong>Available until</strong> {text[1]} |&nbsp; */}
                        <strong>Due</strong>2019-03-25 at 11:59 PM |&nbsp;
                        <strong>{this.state.assignmentsList[text].TOTAL_POINTS}</strong> pts
                    </Typography>

                </Grid>
            </Grid>
            {/* <Grid style={{display: this.state.is_student == "true" ? 'block' : 'none'}}
            item xs={3}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary" 
                    className={classes.button}
                    >
                      Submit Assignment
                    </Button>

                </Grid>
            </Grid> */}
            <Grid style={{display: this.state.is_student == "true" ? 'block' : 'none'}}
            item xs={3}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary" 
                    className={classes.button}
                    onClick={this.submitAssignment}
                    >
                      Submit Assignment
                    </Button>

                </Grid>
            </Grid>
              
              <Grid  item xs={12}>
                <div className={classes.paperClass}
                  style={{display: this.state.showSubmit ? 'block' : 'none'}}>
                    <form className={classes.container} onSubmit={this.createAssignment}>
                                <div className={classes.fullWidth}>
                                  <label style={{color:'red'}}>{this.state.errorMessage}</label>
                                </div>
                                {/* <Grid container spacing={12}> 
                                <Grid item xs={12}>
                                  <div>
                                    <TextField
                                      id="assignmentTitle"
                                      label="Assignment Title"
                                      className={classes.textField2}
                                      value={this.state.assignmentTitle}
                                      onChange={this.handleChange('assignmentTitle')}
                                      margin="normal"
                                      disabled
                                      >
                                    </TextField>
                                  </div>
                                  </Grid>
                                </Grid> */}

                              <Grid container spacing={12}> 
                                <Grid item xs={6}>
                                  <div>
                                    <TextField
                                      id="fileUploaded"
                                      label="Upload File"
                                      type="file"
                                      className={classes.textField}
                                      onChange={this.fileHandler}
                                      margin="normal"
                                      >
                                    </TextField>
                                  </div>
                                  </Grid>
                                </Grid>
                                <div>
                                    <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary" 
                                    className={classes.button}
                                    >
                                    Submit Assignment
                                    </Button>
                                </div>
                            </form>
                  </div>
              </Grid>
        </Grid>

      
        
        )
    }
}

export default withStyles(styles)(AssignmentCard);