import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import '../../Assets/css/offer/offer.css'
import { Table, TableHead, TableRow, TableBody, TableCell, Button } from '@material-ui/core';
import { throws } from 'assert';

//components

const styles = {
  table: {
    color:'white',
  },
  button: {
    backgroundColor: '#efb943',
    color:'white',
    '&:hover': {
      backgroundColor: '#454545',
      color: '#efb943'
    }
  }
  
};
interface Service {
  idS: number;
  name: string;
  price: number;
  duration: number;
}
var query = `
{
services
  {
  	ids,
    name,
    price,
    duration
  }
}
`
interface OfferProps{
  
}
interface OfferState{
  services: Array<Service>
}
class Offer extends Component<OfferProps, OfferState> {

  constructor(props: any){
    super(props);
    this.state = { 
    services: []
    };
}
  componentDidMount(){
    this.fetchData(); 
  }

  fetchData(){
    fetch('https://mohawkbarbershop.herokuapp.com/graphql', {
  method: 'POST',
  headers: {
    //'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query
  })
})
  .then(res=>res.json())
  .then(data=>{
    this.setState({services:data.data.services})
    console.log(data.data.services)
  }
  )
  .catch(error => console.log(error));
}  


  render() {
    return (
      <Grid container justify="center">
      <Grid container className = "content" justify="center" item xs={9}>
        <Grid item xs={12}>
          <Table className="primary-font" style={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell style={styles.table}>
                  Nazwa
                </TableCell>
                <TableCell style={styles.table}>
                  Czas trwania
                </TableCell>
                <TableCell style={styles.table}>
                  Cena
                </TableCell>
                <TableCell style={styles.table}>

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.services.map(service  => {
               return (<TableRow>
                  <TableCell style={styles.table}>
                    {service.name}
                  </TableCell>
                  <TableCell style={styles.table}>
                    {service.duration}
                  </TableCell >
                  <TableCell style={styles.table}>
                    {service.price}
                  </TableCell>
                  <TableCell style={styles.table}>
                  <Button className="primaryButton" style={styles.button}>
                    Rezerwuj
                  </Button>
                  </TableCell>
                </TableRow>)
              })}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      </Grid>
    );
  }
}

export default Offer;
