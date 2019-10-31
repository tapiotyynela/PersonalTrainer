import React from 'react';
import Grid from '@material-ui/core/Grid';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


const CustomerList = () => {
    const [customers, setCustomers] = React.useState([]);

    React.useEffect(() => {
        fetchCustomers();
    }, [])

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json()
                .then(data => setCustomers(data.content))
                .catch(err => console.error(err))
            )
    }
        
    const columns = [
        {
            Header: 'Firstname',
            accessor: 'firstname',

        },
        {
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
            Header: 'Address',
            accessor: 'streetaddress'
        }
    ]
    return (
        <div>
            <Grid container>
                <Grid style={{paddingTop: 11}}  item>
                </Grid>
            </Grid>
            <h1 style={{marginLeft: 100}}>Customers</h1>
            <ReactTable data={customers} columns={columns} filterable={true} style={{marginLeft: 100}}/>
        </div>
    );
}

export default CustomerList;