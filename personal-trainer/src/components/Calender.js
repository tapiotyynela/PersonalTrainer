import React from 'react';
import FullCalender from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../App.css';
var moment = require('moment');


const Calender = (props) => {
    const [trainings, setTrainings] = React.useState([])

    React.useEffect(() => {
        fetchTrainings();
    }, [])

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json()
            .then(data => {
                const formattedTrainings = data.content.map(item => {
                    const container = {};
                    container.date = moment(item.date).format('YYYY-MM-DD')
                    container.duration = item.duration;
                    container.activity = item.activity;
                    return container;
                });
                console.table(formattedTrainings);
                setTrainings(formattedTrainings);
            }
                )
            .catch(err => console.error(err))
            )}


    return (
        <div>
            <FullCalender
                defaultView="dayGridMonth"
                plugins={[ dayGridPlugin ]}
                height={700}
                aspectRatio={1}
                events={trainings.map(item => {
                    const container = {};
                    container.date = item.date;
                    container.title = item.activity;
                    return container;
                })}
            />
        </div>
    );
};

export default Calender;