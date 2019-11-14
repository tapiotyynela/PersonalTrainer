import React from 'react';
import './App.css';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Calender from './components/Calender';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

function App(props) {
  const { container } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{width: 200}}>
      <div />
      <Divider />
      <Button to="/" onClick={handleDrawerToggle} component={Link} style={{ color: "blue", marginBottom: 10, marginLeft: 35, marginTop: 70 }}>Customers</Button><br />
      <Divider />
      <Button to="/trainings" onClick={handleDrawerToggle} component={Link} style={{ color: "blue", marginBottom: 10, marginTop: 10,  marginLeft: 40 }}>Trainings</Button><br />
      <Divider />
      <Button to="/calender" onClick={handleDrawerToggle} component={Link} style={{ color: "blue", marginLeft: 40, marginTop: 10 }}>Calender</Button>
    </div>
  );

  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Customers and Trainings Database
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <div>
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              
            >
              {drawer}
            </Drawer>
          </Hidden>
          <div style={{ textAlign: "center", marginTop: 100 }}>
            <Switch>
              <Route exact path="/" component={CustomerList} />
              <Route path="/trainings" component={TrainingList} />
              <Route path="/calender" component={Calender} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

