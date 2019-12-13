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

const AddTraining = (props) => {
    const [state, setState] = React.useState({
        left: false,
    });
    const [training, setTraining] = React.useState(
        {
            date: new Date(), duration: '', activity: '', customer: ''
        }
    )
    const [open1, setOpen1] = React.useState(false);
    const [customers, setCustomers] = React.useState([]);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json()
                .then(data => setCustomers(data.content))
                .catch(err => console.error(err))
            )
    }

    const toggleDrawer = (side, open) => event => {
        setState({ ...state, [side]: open });
    };

    const handleChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    const handleClickOpen = () => {
        setOpen1(true);
        fetchCustomers();
    };

    const handleClose = value => {
        setOpen1(false);
    };

    const handleListItemClick = value => {
        setTraining({...training, customer: value.links[0].href })
        alert('Added customer ' + value.firstname + ' ' + value.lastname + ' to this training');
        handleClose();
    };

    const addTraining = () => {
        training.date = moment(training.date).format();
        props.saveTraining(training);
        setState({ ...state, 'left': false });
    }

    const fullList = side => (
        <div
            role="presentation"
            style={{ textAlign: 'center', marginLeft: 20, marginRight: 20 }}
        >
            <TextField
                id="outlined-basic"
                type="datetime-local"
                margin="normal"
                variant="outlined"
                style={{ marginBottom: 15 }}
                onChange={e => handleChange(e)}
                name="date"
                value={training.date}
            /> <br />
            <TextField
                id="outlined-basic"
                margin="normal"
                variant="outlined"
                style={{ marginBottom: 15 }}
                label="Duration (min)"
                onChange={e => handleChange(e)}
                name="duration"
                value={training.duration}
            /> <br />
            <TextField
                id="outlined-basic"
                margin="normal"
                variant="outlined"
                style={{ marginBottom: 15 }}
                label="Activity"
                onChange={e => handleChange(e)}
                name="activity"
                value={training.activity}
            /> <br />
            <br />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
            <Button onClick={addTraining} color="primary" variant="outlined" style={{ marginRight: 10 }}>
                Save
                </Button>
            <Button onClick={toggleDrawer('left', false)} color="secondary" variant="outlined">
                Cancel
                </Button>
        </div>
    );

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={toggleDrawer('left', true)} style={{ marginBottom: 20, marginLeft: 35 }}>
                Add Training
            </Button>
            <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
                {fullList('left')}
            </Drawer>
        </div>
    );
};

export default AddTraining;