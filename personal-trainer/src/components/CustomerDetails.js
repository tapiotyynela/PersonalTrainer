import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CustomerDetails = (props) => {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState(
        {
            streeraddress: '', postcode: '', city: '', email: '', phone: ''
        }

    )

    const handleClickOpen = () => {
        setCustomer({streetaddress: props.customer.streetaddress,
                postcode: props.customer.postcode,
                city: props.customer.city,
                email: props.customer.email,
                phone: props.customer.phone
                })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                Details
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       <b>Address:</b> {customer.streetaddress}<br/>
                       <b>Postcode:</b> {customer.postcode}<br/>
                       <b>City:</b> {customer.city}<br/>
                       <b>Email:</b> {customer.email}<br/>
                       <b>Phone: </b> {customer.phone}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CustomerDetails;