import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import '../../Assets/css/offer/offer.css'
import { Table, TableHead, TableRow, TableBody, TableCell, Button } from '@material-ui/core';
import { throws } from 'assert';


//components
const styles = (theme:Theme) => createStyles({
table: {
    color:'white',
  }
});

// interface Props extends WithStyles<typeof styles>{
  
// }
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
interface OfferProps extends WithStyles<typeof styles>{
  
}
interface OfferState{
  services: Array<Service>
}
const Offer = withStyles(styles)(class extends Component<OfferProps, OfferState> {

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
    const { classes } = this.props
    return (
      <Grid container justify="center">
      <Grid container className = "content" justify="center" item xs={9}>
        <Grid item xs={12}>
          <Table className="primary-font">
            <TableHead>
              <TableRow>
                <TableCell>
                  Nazwa
                </TableCell>
                <TableCell>
                  Czas trwania
                </TableCell>
                <TableCell>
                  Cena
                </TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.services.map(service  => {
               return (<TableRow>
                  <TableCell>
                    {service.name}
                  </TableCell>
                  <TableCell>
                    {service.duration}
                  </TableCell >
                  <TableCell>
                    {service.price}
                  </TableCell>
                  <TableCell>
                  <Button variant='raised'color='primary' size='small'>
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
})

export default Offer;
