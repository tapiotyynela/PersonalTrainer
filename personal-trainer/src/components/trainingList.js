import React from 'react';
import Grid from '@material-ui/core/Grid';
import ReactTable from 'react-table';
import Button from '@material-ui/core/Button';
import AddTraining from '../components/AddTraining';
import EditTraining from '../components/EditTraining';
import 'react-table/react-table.css';
var moment = require('moment');

const TrainingList = (props) => {
    const [trainings, setTrainings] = React.useState([]);

    React.useEffect(() => {
        fetchTrainings();
    }, [])

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json()
                .then(data => {
                    const formattedTrainigs = data.content.map(item => {
                        const container = {};
                        container.date = moment(item.date).format('YYYY-MM-DD-LT')
                        container.duration = item.duration;
                        container.activity = item.activity;
                        container.href = item.links[0].href;
                        return container;
                    });
                    setTrainings(formattedTrainigs);
                }
                )
                .catch(err => console.error(err))
            )
    }

    const editTraining = (training, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => fetchTrainings())
            .catch(err => console.error(err))

    }

    const deleteTraining = (link) => {
        console.log(link);
        if (window.confirm('Are you sure?')) {
            fetch(link, { method: 'DELETE' })
                .then(res => fetchTrainings())
                .catch(err => console.error(err))
        }
    }

    const saveTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTraining)
            }
        )
            .then(res => fetchTrainings())
            .catch(err => console.error(err))
    }


    const columns = [
        {
            Header: 'Date',
            accessor: 'date'

        },
        {
            Header: 'Duration (min)',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            filterable: false,
            sortable: false,
            Cell: row => <EditTraining training={row.original} updateTraining={editTraining}/>
        },
        {
            accessor: 'href',
            filterable: false,
            sortable: false,
            Cell: ({ value }) => <Button size="small" color="secondary" onClick={() => deleteTraining(value)}>Delete</Button>
        }
    ]
    
    return (
        <div>
            <Grid container>
                <Grid style={{ paddingTop: 11 }} item>
                </Grid>
            </Grid>
            <h1 align="left">Trainings</h1>
            <div align="left">
            <AddTraining saveTraining={saveTraining}/>
            </div>
            <ReactTable
                data={trainings}
                columns={columns}
                filterable={true}
            />
        </div>
    );
};

export default TrainingList;