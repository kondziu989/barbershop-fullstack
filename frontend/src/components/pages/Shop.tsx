import React, { Component } from 'react';

import '../../Assets/css/shop/shop.css'
import { Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, createStyles, Theme, withStyles, WithStyles, CircularProgress, Button, InputLabel, Select, MenuItem } from '@material-ui/core';
import ProductCardComponent from '../productCardComponent/ProductCardComponent';

//redux
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/productsAction'
import { timingSafeEqual } from 'crypto';

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
}

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
          <Grid item xs={4}>
          <ProductCardComponent
          IdP={product.IdP}
          name={product.name}
          category={product.category}
          brand={product.brand}
          price={product.price}
          description={product.description}
          ></ProductCardComponent>
          </Grid>
        ):null;
      });
    }
  };

  render() {
    const { classes } = this.props
    return (
      <Grid container justify="center">
      <Grid container className={"content " + classes.cont} justify="center" item xs={9} spacing={16}>
        <Grid item xs={3}>
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
      </Grid>
        <Grid container className = "content" justify="center" item xs={9} spacing = {32}>
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
    pending: state.products.pending
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Shop));
