import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import '../App.css';
var moment = require('moment');

const EditTraining = (props) => {

    const [state, setState] = React.useState({
        bottom: false,
      });
      const [open1, setOpen1] = React.useState(false);
      const [training, setTraining] = React.useState(
        {
          date: new Date(), duration: '', activity: '', customer: ''
        }
      )
    
      const toggleDrawer = (side, open) => event => {
        setState({ ...state, [side]: open });
    };

    const [customers, setCustomers] = React.useState([]);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json()
                .then(data => setCustomers(data.content))
                .catch(err => console.error(err))
            )
    }

    const handleListItemClick = value => {
        setTraining({...training, customer: value.links[0].href })
        alert('Added customer ' + value.firstname + ' ' + value.lastname + ' to this training');
        handleClose();
    };

    const handleClose = value => {
        setOpen1(false);
    };
    
      const handleClickOpen = () => {
        setState({ ...state, 'bottom': true });
        setTraining({
          date: props.training.date,
          duration: props.training.duration,
          activity: props.training.activity,
          customer: props.training.customer,
        })
        fetchCustomers();
          };
    
    
      const handleChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
      }
    
      const editTraining = () => {
        training.date = moment(training.date).toISOString();
        props.updateTraining(training, props.training.href);
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
              type="datetime-local"
              variant="outlined"
              style={{ marginBottom: 15 }}
              label="Date"
              onChange={e => handleChange(e)}
              name="date"
              value={training.date}
            />
            <TextField
              id="outlined-basic"
              margin="normal"
              variant="outlined"
              style={{ marginBottom: 15 }}
              label="Duration"
              onChange={e => handleChange(e)}
              name="duration"
              value={training.duration}
            />
            <TextField
              id="outlined-basic"
              margin="normal"
              variant="outlined"
              style={{ marginBottom: 15 }}
              label="Activity"
              onChange={e => handleChange(e)}
              name="activity"
              value={training.activity}
            />
            <Button variant="outlined" color="primary" onClick={() => setOpen1(true)}>
                Add customer to this training
            </Button> <br />
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open1}>
                <DialogTitle id="simple-dialog-title">Customers</DialogTitle>
                <List>
                    {customers.map(customer => (
                    <ListItem button onClick={() => handleListItemClick(customer)} key={customer}>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={customer.firstname + " " + customer.lastname} />
                    </ListItem>
                    ))}
                </List>
            </Dialog><br />
          </List>
          <Button onClick={toggleDrawer('bottom', false)} color="primary">
            Cancel
          </Button>
          <Button onClick={editTraining} color="primary">
            Save
          </Button>
        </div>
      )
    return (

        <div>
            <Button onClick={handleClickOpen} color="primary">Edit</Button>
            <Drawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)}>
                {fullList('bottom')}
            </Drawer>
        </div>

    );
};

export default EditTraining;