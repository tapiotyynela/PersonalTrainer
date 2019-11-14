import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import '../App.css';

const EditCustomer = () => {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const fullList = side => (
    <div
      role="presentation"
      onKeyDown={toggleDrawer(side, false)}
      style={{textAlign: 'center'}}
    >
      <List>
        <TextField
            id="outlined-basic"
            label="Outlined"
            margin="normal"
            variant="outlined"        
        />
        <TextField
            id="outlined-basic"
            label="Outlined"
            margin="normal"
            variant="outlined"
        />
        <TextField
            id="outlined-basic"
            label="Outlined"
            margin="normal"
            variant="outlined"
        />
      </List>      
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('bottom', true)} color="primary">Edit</Button>
      <Drawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)}>
        {fullList('bottom')}
      </Drawer>
    </div>
    );
};

export default EditCustomer;