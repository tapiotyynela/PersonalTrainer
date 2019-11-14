import React from 'react';
import Grid from '@material-ui/core/Grid';
import ReactTable from 'react-table';
import EditCustomer from './EditCustomer';
import 'react-table/react-table.css';
import CustomerDetails from './CustomerDetails';
import Button from '@material-ui/core/Button';


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
            width: 200
        },
        {
            Header: 'Lastname',
            accessor: 'lastname',
            width: 200
        },
        {
            filterable: false,
            sortable: false,
            width: 90,
            Cell: row => <EditCustomer/>
        },
        {
            filterable: false,
            sortable: false,
            width: 100,
            Cell: row => <CustomerDetails customer={row.original}/>
        },
        {
            filterable: false,
            sortable: false,
            width: 100,
            Cell: ({ value }) => <Button size="small" color="secondary">Delete</Button>
        }

    ]
    return (
        <div class="customers">
            <Grid container>
                <Grid style={{paddingTop: 11}}  item>
                </Grid>
            </Grid>
            <h1 align="left">Customers</h1>
            <Button
                    style={{marginRight: 200,
                            marginBottom: 20}}
                    size="large"
                    color="primary"
                    variant="outlined"
            >Add new</Button>
            <ReactTable
                data={customers}
                columns={columns}
                filterable={true}
                style={{width: "47%"}}
                />
        </div>
    );
}

export default CustomerList;