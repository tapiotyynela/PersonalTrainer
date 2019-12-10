import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import '../App.css';

const EditCustomer = (props) => {
  const [state, setState] = React.useState({
    bottom: false,
  });
  const [customer, setCustomer] = React.useState(
    {
      firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    }
  )

  const toggleDrawer = (side, open) => event => {
    setState({ ...state, [side]: open });
};

  const handleClickOpen = () => {
    setState({ ...state, 'bottom': true });
    setCustomer({
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city, 
      email: props.customer.email,
      phone: props.customer.phone
    })
      };

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value })
  }

  const editCustomer = () => {
    props.updateCustomer(customer, props.customer.links[0].href);
    setState({ ...state, 'bottom': false });
  }

  const fullList = side => (
    <div
      role="presentation"
      style={{ textAlign: 'center' }}
    >
      <List>
        <TextField
          id="outlined-basic"
          margin="normal"
          variant="outlined"
          style={{ marginBottom: 15 }}
          label="Firstname"
          onChange={e => handleChange(e)}
          name="firstname"
          value={customer.firstname}
        />
        <TextField
          id="outlined-basic"
          margin="normal"
          variant="outlined"
          style={{ marginBottom: 15 }}
          label="Lastname"
          onChange={e => handleChange(e)}
          name="lastname"
          value={customer.lastname}
        />
        <TextField
          id="outlined-basic"
          margin="normal"
          variant="outlined"
          style={{ marginBottom: 15 }}
          label="Address"
          onChange={e => handleChange(e)}
          name="streetaddress"
          value={customer.streetaddress}
        />
        <TextField
          id="outlined-basic"
          margin="normal"
          variant="outlined"
          style={{ marginBottom: 15 }}
          label="Postcode"
          onChange={e => handleChange(e)}
          name="postcode"
          value={customer.postcode}
        />
        <TextField
          id="outlined-basic"
          margin="normal"
          variant="outlined"
          style={{ marginBottom: 15 }}
          label="City"
          onChange={e => handleChange(e)}
          name="city"
          value={customer.city}
        />
        <TextField
          id="outlined-basic"
          margin="normal"
          variant="outlined"
          style={{ marginBottom: 15 }}
          label="Email"
          onChange={e => handleChange(e)}
          name="email"
          value={customer.email}
        />
        <TextField
          id="outlined-basic"
          margin="normal"
          variant="outlined"
          style={{ marginBottom: 15 }}
          label="Phone"
          onChange={e => handleChange(e)}
          name="phone"
          value={customer.phone}
        />
      </List>
      <Button onClick={toggleDrawer('bottom', false)} color="primary">
        Cancel
      </Button>
      <Button onClick={editCustomer} color="primary">
        Save
      </Button>
    </div>
  );

  return (
    <div>
      <Button onClick={handleClickOpen} color="primary">Edit</Button>
      <Drawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)}>
        {fullList('bottom')}
      </Drawer>
    </div>
  );
};

export default EditCustomer;