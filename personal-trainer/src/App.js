import React from 'react';
import './App.css';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ marginLeft: 120 }}>
            Customer and Training database
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <div>
          <Drawer
            variant="permanent"
            anchor="left"
          >
            <div style={{ marginTop: 70 }}>
              <Button to="/customers" component={Link} style={{ color: "blue", marginBottom: 10 }}>Customers</Button><br/>
              <Button to="/trainings" component={Link} style={{ color: "blue", marginBottom: 10 }}>Trainings</Button><br/>
              <Button to="/calender" component={Link} style={{ color: "blue" }}>Calender</Button>

            </div>
          </Drawer>
          <div style={{textAlign: "center", marginTop: 100}}>
            <Switch>
              <Route path="/customers" component={CustomerList} />
              <Route path="/trainings" component={TrainingList} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
