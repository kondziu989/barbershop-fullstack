import React, { Component } from 'react';

import '../../Assets/css/shop/shop.css'
import { Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, createStyles, Theme, withStyles, WithStyles, CircularProgress, Button, InputLabel, Select, MenuItem, Typography } from '@material-ui/core';
import ProductCardComponent from '../productCardComponent/ProductCardComponent';
import { BrowserRouter, Route, Link } from 'react-router-dom'

//redux
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/productsAction'
import { addToCart } from '../../actions/cartActions'
import { timingSafeEqual } from 'crypto';
import { CartItem } from '../../reducers/cartReducer'

//icons
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const styles = ({palette, spacing}: Theme ) => createStyles({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: spacing.unit,
  },
  group: {
    margin: `${spacing.unit}px 0`,
  },
  cont:{
    marginBottom: "20px"
  },
  cart:{
    '&:hover':{
        color: palette.primary.main,
        cursor: 'pointer'
    }
  }
});

interface Product{
  IdP: number,
  name: string,
  category: string,
  brand: string,
  price: number,
  description: string
}

interface ShopProps extends WithStyles<typeof styles>{
  fetchProducts: Function 
  products: Array<Product>
  err: String
  pending: Boolean
  cart: Array<CartItem>
  addToCart: Function
  total: number
}

const MyLink = (props: any) => <Link to="/cart" {...props} />;

const Shop = class extends Component<ShopProps, {}>{
  state={
    category:"włosy",
  }

  componentDidMount(){
    this.props.fetchProducts()
  }
  handleChange = (event: any)=> {
    this.setState({ category: event.target.value });
  };

  displayProducts = () => {
    const { products, pending, err} = this.props;

    if (pending) {
      return <CircularProgress color="primary" size={80} thickness={6} />;
    } else if (products.length > 0) {
      return products.map(product => {
        return product.category===this.state.category?(
          <Grid item xs={12} sm={6} lg={4} xl={3}>
          <ProductCardComponent
          IdP={product.IdP}
          name={product.name}
          category={product.category}
          brand={product.brand}
          price={product.price}
          description={product.description}
          addToCart = {this.props.addToCart}
          ></ProductCardComponent>
          </Grid>
        ):null;
      });
    }
  };

  cartItemsQuantity = () => {
    var qtt = 0
    this.props.cart.forEach((item) => qtt+= item.quantity)
    return qtt
  }
  
  //***********************RENDER********************************//
  render() {
    const { classes } = this.props
    return (
      <Grid container justify="center">
      <Grid container className={"content " + classes.cont} justify="space-evenly" alignItems="center" item xs={9} spacing={16}>
        <Grid item>
        <FormControl className={classes.formControl}>
          <InputLabel>Kategoria: </InputLabel>
          <Select
            value={this.state.category}
            onChange={this.handleChange}
          >
            <MenuItem value="włosy">Włosy</MenuItem>
            <MenuItem value="broda i wąsy">Broda i Wąsy</MenuItem>
            <MenuItem value="golenie">Golenie</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        <Grid item alignContent="center">
           <Typography component={MyLink} className={classes.cart} variant="subtitle1" inline><ShoppingCartIcon></ShoppingCartIcon> {this.cartItemsQuantity()} szt. za </Typography>
           <Typography variant="h6" inline color="primary">{(Math.round(this.props.total * 100) / 100).toFixed(2)} zł</Typography>
        </Grid>
      </Grid>
        <Grid container className = "content" justify="space-evenly" item xs={9} spacing = {32}>
          {this.displayProducts()}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state:any) => {
  return{
    products: state.products.products,
    err: state.products.err,
    pending: state.products.isPending,
    cart: state.cart.cart,
    total: state.cart.total
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addToCart: (id:number, price:number) => dispatch(addToCart(id, price))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Shop));
