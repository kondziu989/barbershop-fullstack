import React, { Component } from "react";
import {
  WithStyles,
  createStyles,
  Theme,
  withStyles
} from "@material-ui/core/styles";
import { Grid, Typography, Table, TableHead, TableRow, TableCell, TableBody, ExpansionPanel, ExpansionPanelSummary, Collapse } from "@material-ui/core";

//redux
import { connect } from "react-redux";
import { fetchOrders } from '../../actions/ordersActions';


//components
const styles = (theme: Theme) =>
  createStyles({
    
  });


interface OrderHistoryProps extends WithStyles<typeof styles> {
  orders: Array<Order>,
  token: string,
  fetchOrders: Function
}

interface OrderProduct{
  name:string,
  category: string,
  brand: string,
  price:number,
  quantity: number
}

interface Order{
  IdO: number,
  status: string,
  comment: string,
  totalPrice: number,
  orderDate: string,
  orderProducts: Array<OrderProduct>
}

const OrderHistory = withStyles(styles)(
  class extends Component<OrderHistoryProps, {}> {
    
    state={
        collapse:-1,
    }

    collapse = (num: number) => {
        if(num === this.state.collapse)
            this.setState({collapse: -1})
        else
            this.setState({collapse: num})
    }

    componentDidMount() {
      this.props.fetchOrders(this.props.token);
    }

    populateTable = () => {
      const { classes } = this.props;
      return this.props.orders.map((order, i) => {
        return (<>
          <TableRow hover key = {i} onClick={() => this.collapse(i)}>
            <TableCell>{order.IdO}</TableCell>
            <TableCell>{order.orderDate}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{order.comment}</TableCell>
          </TableRow>
          <Collapse in = {this.state.collapse===i}>
          {order.orderProducts.map(item => {
            <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {item.name}
                </TableCell>
                <TableCell align='center'>
                  {item.quantity}
                </TableCell>
                <TableCell>
                  {item.price}
                </TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align='right'>Total</TableCell>
                <TableCell align="center">{order.orderProducts.length}</TableCell>
                <TableCell align="left" >{(Math.round(5 * 100) / 100).toFixed(order.totalPrice)} zł</TableCell>
          </TableRow>
            </TableBody>
          </Table>})}
          </Collapse>
          </>)}
      )
    }

    render() {
      return (
        <Grid container justify="center">
          <Grid container className="content" justify="center" item xs={9}>
            <Grid item xs = {12}>
                <Typography variant='h4'>Historia zamówień</Typography>
            </Grid>
            <Grid item xs={12}>
              <Table className="primary-font">
                <TableHead>
                  <TableRow>
                        <TableCell>Numer zamówienia</TableCell>
                        <TableCell>Data złożenia zamówienia</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Komentarz</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                   {this.populateTable()}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  }
);

const mapStateToProps = (state: any) => {
  return {
    // services: state.services.services,
    
    orders: state.orders.orders,
    token: state.login.userData.token
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // fetchServices: () => dispatch(fetchServices())
    fetchOrders: (token:string) => dispatch(fetchOrders(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHistory);
