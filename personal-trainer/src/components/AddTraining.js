import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../App.css';
var moment = require('moment');

const AddTraining = (props) => {
    const [state, setState] = React.useState({
        left: false,
    });
    const [training, setTraining] = React.useState(
        {
            date: new Date(), duration: '', activity: ''
        }
    )

    const toggleDrawer = (side, open) => event => {
        setState({ ...state, [side]: open });
    };

    const handleChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    const addTraining = () => {
        training.date = moment(training.date).format();
        props.saveTraining(training);
        setState({ ...state, 'left': false });
        console.log(training);
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
                    style={{marginBottom: 15}}
                    onChange={e => handleChange(e)}
                    name="date" 
                    value={training.date}
                /> <br/>
                <TextField
                    id="outlined-basic"
                    margin="normal"
                    variant="outlined"
                    style={{marginBottom: 15}}
                    label="Duration (min)"
                    onChange={e => handleChange(e)}
                    name="duration"
                    value={training.duration}
                /> <br/>
                <TextField
                    id="outlined-basic"
                    margin="normal"
                    variant="outlined"
                    style={{marginBottom: 15}}
                    label="Activity"
                    onChange={e => handleChange(e)}
                    name="activity" 
                    value={training.activity}
                /> <br/>
                <Button onClick={addTraining} color="primary" variant="outlined" style={{marginRight: 10}}>
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
                Add Training
            </Button>
            <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
                {fullList('left')}
            </Drawer>
        </div>
    );
};

export default AddTraining;