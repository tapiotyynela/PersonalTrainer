import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../App.css';

const AddCustomer = (props) => {
    const [state, setState] = React.useState({
        left: false,
    });
    const [customer, setCustomer] = React.useState(
        {
            firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
        }
    )

    const toggleDrawer = (side, open) => event => {
        setState({ ...state, [side]: open });
    };

    const handleChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
        console.log(customer);
    }

    const addCustomer = () => {
        props.saveCustomer(customer);
        setState({ ...state, 'left': false });    }

    const fullList = side => (
        <div
            role="presentation"
            style={{ textAlign: 'center', marginLeft: 20, marginRight: 20 }}
        >
            
                <TextField
                    id="outlined-basic"
                    margin="normal"
                    variant="outlined"
                    style={{marginBottom: 15}}
                    label="Firstname"
                    onChange={e => handleChange(e)}
                    name="firstname" 
                    value={customer.firstname}
                /> <br/>
                <TextField
                    id="outlined-basic"
                    margin="normal"
                    variant="outlined"
                    style={{marginBottom: 15}}
                    label="Lastname"
                    onChange={e => handleChange(e)}
                    name="lastname"
                    value={customer.lastname}
                /> <br/>
                <TextField
                    id="outlined-basic"
                    margin="normal"
                    variant="outlined"
                    style={{marginBottom: 15}}
                    label="Address"
                    onChange={e => handleChange(e)}
                    name="streetaddress" 
                    value={customer.streetaddress}
                /> <br/>
                <TextField
                    id="outlined-basic"
                    margin="normal"
                    variant="outlined"
                    style={{marginBottom: 15}}
                    label="Postcode"
                    onChange={e => handleChange(e)}
                    name="postcode" 
                    value={customer.postcode}
                /> <br/>
                <TextField
                    id="outlined-basic"
                    margin="normal"
                    variant="outlined"
                    style={{marginBottom: 15}}
                    label="City"
                    onChange={e => handleChange(e)}
                    name="city" 
                    value={customer.city}
                /> <br/>
                <TextField
                    id="outlined-basic"
                    margin="normal"
                    variant="outlined"
                    style={{marginBottom: 15}}
                    label="Email"
                    onChange={e => handleChange(e)}
                    name="email" 
                    value={customer.email}
                /> <br/>
                <TextField
                    id="outlined-basic"
                    margin="normal"
                    variant="outlined"
                    style={{marginBottom: 15}}
                    label="Phone"
                    onChange={e => handleChange(e)}
                    name="phone" 
                    value={customer.phone}
                /> <br/>
                <Button onClick={addCustomer} color="primary" variant="outlined" style={{marginRight: 10}}>
                    Save
                </Button>
                <Button onClick={toggleDrawer('left', false)} color="secondary" variant="outlined">
                    Cancel
                </Button>
        </div>
    );

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={toggleDrawer('left', true)} style={{marginBottom: 20, marginLeft: 35}}>
                Add Customer
            </Button>
            <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
                {fullList('left')}
            </Drawer>
        </div>
    );
};

export default AddCustomer;