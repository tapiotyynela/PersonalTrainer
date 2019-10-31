import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function App() {
  return (
    <div className="App">
        <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{marginLeft: 120}}>
            Customer and Training database
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
      >
        <List style={{marginTop: 50}}>
          {['Customers', 'Trainings'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main>        
      </main>
    </div>
  );
}

export default App;
