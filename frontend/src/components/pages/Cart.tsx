import "../../Assets/css/shop/shop.css";

import {
  createStyles,
  Grid,
  IconButton,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography,
  WithStyles,
  withStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import RemoveIcon from "@material-ui/icons/Remove";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import {
  addToCart,
  removeFromCart,
  removeItemFromCart,
  handleMakeOrder
} from "../../actions/cartActions";
import { fetchProducts } from "../../actions/productsAction";
import { CartItem, cartReducer } from "../../reducers/cartReducer";
import classes from "*.module.scss";

//redux
//icons

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    cont: {
      marginBottom: "20px"
    },
    cart: {
      "&:hover": {
        color: palette.primary.main,
        cursor: "pointer"
      }
    },

    input: {
      width: "30px",
      justifyContent: "center"
    },
    inputCenter: {
      textAlign: "center"
    },
    link: {
      textDecoration: "none",
      color: palette.primary.light
    },

    primaryText: {
      color: palette.primary.light,
      fontSize: "15px"
    }
  });

interface Product {
  IdP: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  description: string;
}

interface AddedProduct {
  product: Product;
  quantity: number;
}

interface CartProps extends WithStyles<typeof styles> {
  products: Array<Product>;
  cart: Array<CartItem>;
  addToCart: Function;
  removeFromCart: Function;
  total: number;
  addedProducts: Array<AddedProduct>;
  removeItemFromCart: Function;
  handleMakeOrder: Function;
  token: string;
  isPending: boolean;
  success: boolean;
  err: any;
}

const Cart = class extends Component<CartProps, {}> {
  state={
    toOrderHistory: false,
    toHomePage: false
  }

  cartItemsQuantity = () => {
    var qtt = 0;
    this.props.cart.forEach(item => (qtt += item.quantity));
    return qtt;
  };

  handleChange = (event: any) => {
    this.setState({ category: event.target.value });
  };

  handleAdd = (id: number, price: number) => {
    this.props.addToCart(id, price);
  };

  handleRemove = (id: number) => {
    this.props.removeFromCart(id);
  };

  handleItemRemove = (id: number) => {
    this.props.removeItemFromCart(id);
  };

  handleOrder = (token: string, orderedProducts: Array<CartItem>) => {
    this.props.handleMakeOrder(token, orderedProducts)
  }

  display = () => {
    return this.props.cart.length === 0
      ? this.showEmptyBasket()
      : this.displayCart();
  };
  showEmptyBasket = () => {
    const { classes } = this.props;
    return (
      <>
        <Typography variant="subtitle1">Twoj koszyk jest pusty...</Typography>
        <Typography>
          <Link to="/shop" className={classes.link}>
            Przejdź do sklepu
          </Link>
        </Typography>
      </>
    );
  };

  populateTable = () => {
    const { classes } = this.props;
    return this.props.cart.map(item => {
      var product = this.props.products.find(
        product => product.IdP === item.id
      );
      return (
        <TableRow>
          <TableCell>{product ? product.name : null}</TableCell>
          <TableCell align="center">
            <IconButton onClick={() => this.handleRemove(item.id)}>
              <RemoveIcon />
            </IconButton>
            <Input
              className={classes.input}
              classes={{ input: classes.inputCenter }}
              margin="dense"
              value={item.quantity}
            />
            <IconButton onClick={() => this.handleAdd(item.id, item.price)}>
              <AddIcon />
            </IconButton>
          </TableCell>
          <TableCell>{item.price} zł</TableCell>
          <TableCell>
            <IconButton onClick={() => this.handleItemRemove(item.id)}>
              <ClearIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  };
  goHome = () =>{
    this.setState({toHomePage: true})
  }
  
  goToOrderHistory = () => {
    this.setState({toOrderHistory: true})
  }

  displayCart = () => {
    const { classes } = this.props;
    if(this.state.toHomePage){
      return <Redirect to = "/"/>
    }
    if(this.state.toOrderHistory){
      return <Redirect to = "/orderhistory"/>
    }
    return (
      <>
        <Table className="primary-font">
          <TableHead>
            <TableRow>
              <TableCell>Nazwa</TableCell>
              <TableCell align="center">Ilość</TableCell>
              <TableCell>Cena</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.populateTable()}
            <TableRow>
              {/* <TableCell colSpan={2} />  */}
              <TableCell align="right" className={classes.primaryText}>
                Total
              </TableCell>
              <TableCell align="center" className={classes.primaryText}>
                {this.cartItemsQuantity()}
              </TableCell>
              <TableCell align="left" className={classes.primaryText}>
                {(Math.round(this.props.total * 100) / 100).toFixed(2)} zł
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          onClick={() => this.handleOrder(this.props.token, this.props.cart)}
          color="primary"
          variant="outlined"
          style={{ marginTop: "20px" }}
        >
          Zamów
        </Button>
      </>
    );
  };

  //***********************RENDER********************************//
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center">
        <Grid
          container
          className={"content " + classes.cont}
          justify="space-evenly"
          alignItems="center"
          item
          xs={9}
          spacing={16}
        >
          {this.display()}
          <Dialog
      open={this.props.success}
      onClose={() => this.goHome()}
    >
      <DialogTitle>Potwierdzenie Zamówienia</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Dziękujemy za dokonanie zamówienia w naszym salonie!
          Historie zamówień możesz obejrzeć w panelu klienta.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => this.goToOrderHistory()} color="primary">
          Przejdz do zamówień
        </Button>
        <Button onClick={() => this.goHome()} color="primary">
          Strona głowna
        </Button>
      </DialogActions>
    </Dialog>        </Grid>
      </Grid>
    );
  }
};

const mapStateToProps = (state: any) => {
  return {
    products: state.products.products,
    cart: state.cart.cart,
    total: state.cart.total,
    token: state.login.userData.token,
    isPending: state.cart.isPending,
    success: state.cart.success,
    err: state.cart.error
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addToCart: (id: number, price: number) => dispatch(addToCart(id, price)),
    removeFromCart: (id: number) => dispatch(removeFromCart(id)),
    removeItemFromCart: (id: number) => dispatch(removeItemFromCart(id)),
    handleMakeOrder: (token: string, orderedProducts: Array<CartItem>) => dispatch(handleMakeOrder(token, orderedProducts))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Cart));
