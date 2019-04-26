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
  Button
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import RemoveIcon from "@material-ui/icons/Remove";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  addToCart,
  removeFromCart,
  removeItemFromCart
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
}

const Cart = class extends Component<CartProps, {}> {
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

  displayCart = () => {
    const { classes } = this.props;
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
        </Grid>
      </Grid>
    );
  }
};

const mapStateToProps = (state: any) => {
  return {
    products: state.products.products,
    cart: state.cart.cart,
    total: state.cart.total
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addToCart: (id: number, price: number) => dispatch(addToCart(id, price)),
    removeFromCart: (id: number) => dispatch(removeFromCart(id)),
    removeItemFromCart: (id: number) => dispatch(removeItemFromCart(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Cart));
