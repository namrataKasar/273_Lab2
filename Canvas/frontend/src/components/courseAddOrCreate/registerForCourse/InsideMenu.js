import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CoursesDashboard from './CourseDashboard';
import {Link, Route} from 'react-router-dom'
import AddCourse from './AddCourse';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
      backgroundColor: '#FFFFFF',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
    // transition: theme.transitions.create(['margin', 'width'], {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
    color: '#008ee2',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    //   marginTop: '50px',
    width: 150,
    flexShrink: 0,
  },
  drawerPaper: {
//   my changes start
marginTop: '64px',
//   my changes end
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  margin_set_open:{
      marginLeft: 84,
    },
    margin_set_close:{
        marginLeft: 54,
  },
  padding_set_open:{
      paddingLeft: 84,
    },
    padding_set_close:{
        paddingLeft: 54,
  },
  left_set_open:{
      left: 84,
    },
    left_set_close:{
        left: 54,
  },
    drawerPaperOpen: {
        marginTop: '64px',
        marginLeft: '84px',
        width: drawerWidth,
    },
    drawerPaperClose: {
        marginTop: '64px',
        marginLeft: '54px',
        width: drawerWidth,
    },
    textColor1:{
        color: '#008ee2',
    },
});

class InsideMenu extends React.Component {

  state = {
    sjsuID: '',
    is_student : '',
    open: true,
    parentDrawer: true,
  };

  componentWillMount = () => {
    //console.log(this.props);
    const data = {
      sjsuID : window.sessionStorage.getItem('sjsuID'),
      is_student : window.sessionStorage.getItem('is_student')
    }
    this.setState({
      sjsuID : data.sjsuID,
      is_student : data.is_student
    })
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleDrawerToggleMenu = () => {
    if (this.state.open) {
        this.setState({ open: false });
    }else{
        this.setState({ open: true });
    }
    //   console.log(this.state.open)
  };
  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    let {parentDrawer} = this.state;
    const header = this.props.header;    
      const sidebarCode = (
        <div>
            <List>
              {[['Home', 'home'], ['Add Courses','addcourse']].map((text, index) => (
                        <Link to={text[1]} key={text[1]}>
                          <ListItem button key={text[1]}>
                            <ListItemText primary={text[0]} />
                          </ListItem>
                        </Link>
                    ))}
            </List>
        </div>
    );
    
     

      const  mainCode = (
          <div>
            {/* <Route path="/registercourses/home" render={()=> { return <CoursesDashboard state={this.state} rows={rows} />}} />
            <Route path="/registercourses/addcourse" render={()=> { return <AddCourse state={this.state}/>}} /> */}
            <Route path="/registercourses/home" render={()=> { return <CoursesDashboard state={this.state} />}} />
            <Route path="/registercourses/addcourse" render={()=> { return <AddCourse state={this.state}/>}} />
            </div>
        );

    const rows = [
      {
        courseID : "273",
        courseName : "ESD",
        instructor : "Prof",
        courseRoom : 'ENG 337'
      }
    ]

    if (parentDrawer) {
        return (
            <div className={classNames(classes.root)}>
                <CssBaseline />
                <AppBar
                  position="fixed"
                  className={classNames(classes.appBar, classes.padding_set_open, {
                    // [classes.appBarShift]: open,
                  })}
                >
                  {/* <Toolbar disableGutters={!open}> */}
                  <Toolbar disableGutters={false}>
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={this.handleDrawerToggleMenu}
                      className={classNames(classes.menuButton)}
                    //   className={classNames(classes.menuButton, open && classes.hide)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classNames(classes.textColor1)} noWrap>
                      {header}
                    </Typography>
                  </Toolbar>
                </AppBar>
                
                <Drawer
                className={classNames(classes.drawer)}
                //   className={classes.drawer}
                  variant="persistent"
                  anchor="left"
                //   open={parentDrawer}
                  open={open}
                  
                  classes={{
                    paper: classes.drawerPaperOpen,
                  }}
                >
                    
                  {sidebarCode}
                
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    {mainCode}
                </main>
              </div>
            );
    }else{
        return (
            <div className={classNames(classes.root)}>
                <CssBaseline />
                <AppBar
                  position="fixed"
                  className={classNames(classes.appBar, classes.padding_set_open, {
                    // [classes.appBarShift]: open,
                  })}
                >
                  {/* <Toolbar disableGutters={!open}> */}
                  <Toolbar disableGutters={false}>
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={this.handleDrawerToggleMenu}
                      className={classNames(classes.menuButton)}
                    //   className={classNames(classes.menuButton, open && classes.hide)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classNames(classes.textColor1)} noWrap>
                      {header}
                    </Typography>
                  </Toolbar>
                </AppBar>
                
                <Drawer
                className={classNames(classes.drawer, classes.left_set_open)}
                  variant="persistent"
                  anchor="left"
                //   open={parentDrawer}
                  open={open}
                  
                  classes={{
                    paper: classes.drawerPaperClose,
                  }}
                >
                  {sidebarCode}
                </Drawer>
                <main
                  className={classNames(classes.content, {
                    [classes.contentShift]: open,
                  })}
                >
                  {mainCode}
                </main>
              </div>
            );
    }
    
  }
}

InsideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(InsideMenu);