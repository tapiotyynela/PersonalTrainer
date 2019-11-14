import React from 'react';
import Grid from '@material-ui/core/Grid';
import ReactTable from 'react-table';
import Button from '@material-ui/core/Button';
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
                    container.date = moment(item.date).format('LLL')
                    container.duration = item.duration;
                    container.activity = item.activity;
                    return container;
                });
                console.table(formattedTrainigs);
                setTrainings(formattedTrainigs);
            }
                )
            .catch(err => console.error(err))
            )}

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
            <h1 align="left">Trainings</h1>
            <Button
                    style={{marginRight: 200,
                            marginBottom: 20}}
                    size="large"
                    color="primary"
                    variant="outlined"
            >Add new</Button>
            <ReactTable
                data={trainings}
                date={trainings.date}
                columns={columns}
                filterable={true}
                style={{width: "47%"}}
                />
        </div>
    );
};

export default TrainingList;