import React from 'react';
import Grid from '@material-ui/core/Grid';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
var moment = require('moment');

const TrainingList = () => {
    const [trainings, setTrainings] = React.useState([]);
    const [date, setDate] = React.useState('');

    React.useEffect(() => {
        fetchTrainings();
    }, [])

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json()
                .then(data => setTrainings(data.content))
                .catch(err => console.error(err))
            )
    }

    const columns = [
        {
            
            Header: 'Date',
            id: 1,
            accessor:'date'
                
        },
        {
            Header: 'Duration (min)',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        }
    ]

    return (
        <div>
            <Grid container>
                <Grid style={{paddingTop: 11}}  item>
                </Grid>
            </Grid>
            <h1 style={{marginLeft: 100}}>Trainings</h1>
            <ReactTable data={trainings} columns={columns} filterable={true} style={{marginLeft: 100}}/>
        </div>
    );
};

export default TrainingList;