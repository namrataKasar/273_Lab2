import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography, Button, Paper, TextField} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import { bindActionCreators } from 'redux';
import * as assignmentData from '../../actions/assignmentAction';


const CustomTableCell = withStyles(theme => ({
  head: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


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
  marginLeft: '10%'
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
    margin: theme.spacing.unit,
  },
  paperClass:{
    marginTop: 20,
    overflowX: "auto",
    padding: '5% 5% 5%',
    width: '70%',
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

class ViewSubmissions extends React.Component {

  state = {
    fileUploaded : '',
    assignment : '',
    redirectVar : '',
    subList : ''
  }

  componentWillMount = () => {
    // const propsData = this.props..
  }

  viewSubmission = (e, assignment, index) => {
    console.log(assignment);
    const mainIndex = this.props.location.state.index
    console.log(mainIndex);
    this.setState({
      redirectVar :  <Redirect to={{
        pathname: "/course/pdfview",
        assignment:this.props.location.state.assignment,
        show:"submissions",
        index:index,
        mainIndex:mainIndex 
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
                Submissions
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
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <CustomTableCell align="left">Student ID</CustomTableCell>
                        <CustomTableCell align="left">Student Name</CustomTableCell>
                        <CustomTableCell align="left">Date Submitted</CustomTableCell>
                        <CustomTableCell align="left">Grades</CustomTableCell>
                        <CustomTableCell align="left"></CustomTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(assignment.SUBMISSIONS).map(option => (
                        <TableRow className={classes.row} key={option}>
                          <CustomTableCell align="left">
                            {assignment.SUBMISSIONS[option].SJSU_ID}
                          </CustomTableCell>
                          <CustomTableCell align="left">{assignment.SUBMISSIONS[option].STUDENT_NAME}</CustomTableCell>
                          <CustomTableCell align="left">{assignment.SUBMISSIONS[option].DATE.slice(0,10)}</CustomTableCell>
                          <CustomTableCell align="left">{assignment.SUBMISSIONS[option].GRADES}</CustomTableCell>
                          <CustomTableCell align="left">
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary" 
                            className={classes.button}
                             onClick={(e) => {this.viewSubmission(e, assignment.SUBMISSIONS[option], option)}}
                          >
                            SHow
                          </Button>
                          </CustomTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                </Table>
          </Grid>
        </Paper>
            </div>

      
        
        )
    }
}

ViewSubmissions.propTypes = {
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
export default connect(mapStateToProps, mapDispacthToProps)(withStyles(styles)(ViewSubmissions));

