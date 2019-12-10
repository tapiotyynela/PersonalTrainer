import React from 'react';
import Grid from '@material-ui/core/Grid';
import ReactTable from 'react-table';
import EditCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';
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

    const saveCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCustomer)
            }
        )
            .then(res => fetchCustomers())
            .catch(err => console.error(err))
    }

    const editCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchCustomers())
            .catch(err => console.error(err))

    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
                fetch(link, { method: 'DELETE' })
                .then(res => fetchCustomers())
                .catch(err => console.error(err))
        }
    }
        
    const columns = [
        {
            Header: <b>Firstname</b>,
            accessor: 'firstname',
        },
        {
            Header: <b>Lastname</b>,
            accessor: 'lastname',
        },
        {
            filterable: false,
            sortable: false,
            Cell: row => <EditCustomer customer={row.original} updateCustomer={editCustomer}/>
        },
        {
            filterable: false,
            sortable: false,
            Cell: row => <CustomerDetails customer={row.original}/>
        },
        {
            accessor: 'links[0].href',
            filterable: false,
            sortable: false,
            Cell: ({ value }) => <Button size="small" color="secondary" onClick={() => deleteCustomer(value)}>Delete</Button>
        }

    ]

    return (
        <div className="customers">
            <Grid container>
                <Grid style={{paddingTop: 11}}  item>
                </Grid>
            </Grid>
            <h1 align="left">Customers</h1>
            <div align="left">
            <AddCustomer saveCustomer={saveCustomer}/>
            </div>
            <ReactTable
                data={customers}
                columns={columns}
                filterable={true}
                />
        </div>
    );
}

export default CustomerList;