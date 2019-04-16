import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gradesData from '../../actions/assignmentAction';

import Grid from '@material-ui/core/Grid';

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
  root: {
    boxShadow: 'none',
    width: '100%',
    marginTop: theme.spacing.unit * 10,
    // overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  searchBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
    margin: '15px',
  },
  input: {
    marginLeft: 8,
    flex: 1,
    },
  iconButton: {
    padding: 10,
    },
  divider: {
    width: '100%',
    border: '1px solid black',
    margin: 0,
  },
  textColor1:{
    color: '#008ee2',
  },
  paperClass:{
    marginTop: 20,
    overflowX: "auto",
    padding: '5% 10% 5%'
  },
});




const rows = [ {
                  name: 'Quiz 1',
                  due: '2019-02-26',
                  score: '',
                  outof: '10'
                },
                {
                  name: 'Lab 1',
                  due: '2019-02-26',
                  score: '30',
                  outof: '30'
                }, 
             ];

class Grades extends React.Component {
  

  render() {
    const { classes } = this.props;
    const header = 'Grades';
    const propsData = this.props.gradesData.LoginReducer.LoginReducer;
    const courseId = this.props.gradesData.CourseReducer.CourseReducer.courseId;
    console.log(propsData);
    let gradesList = [];
    for(let i = 0; i < propsData.grades.length; i++)
    {
      if(propsData.grades[i].COURSE_ID == courseId)
      {
        gradesList.push(propsData.grades[i]);
      }
    }
    console.log(gradesList);
    return (
          <div>
            <div className={classes.root} >
                <Typography variant="h6" className={classes.textColor1} noWrap>
                    {header}
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
                        <CustomTableCell>Name</CustomTableCell>
                        <CustomTableCell align="left">Due</CustomTableCell>
                        <CustomTableCell align="left">Score</CustomTableCell>
                        <CustomTableCell align="left">Out Of</CustomTableCell>
                        <CustomTableCell align="left"></CustomTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(gradesList).map(index => (
                        <TableRow className={classes.row} key={index}>
                          <CustomTableCell component="th" scope="row">
                            {gradesList[index].NAME}
                          </CustomTableCell>
                          <CustomTableCell align="left">{gradesList[index].DUE_DATE.slice(0,10)}</CustomTableCell>
                          <CustomTableCell align="left">{gradesList[index].SCORE}</CustomTableCell>
                          <CustomTableCell align="left">{gradesList[index].OUT_OF}</CustomTableCell>
                          <CustomTableCell align="left"></CustomTableCell>
                        </TableRow>
                      ))}
                        <TableRow className={classes.row} >
                          <CustomTableCell component="th" scope="row">
                          <strong>Total</strong>
                          </CustomTableCell>
                          <CustomTableCell align="right"></CustomTableCell>
                          <CustomTableCell align="right">30</CustomTableCell>
                          <CustomTableCell align="right">40</CustomTableCell>
                          <CustomTableCell align="right"></CustomTableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
            </Grid>
            </Paper>
          </div>

    );
  }
}

Grades.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    gradesData : state
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(gradesData, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Grades));