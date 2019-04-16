import React, { Component } from 'react';
import '../../Assets/css/shop/shop.css'
import { Grid, Card, CardActionArea, CardContent, Typography, CardActions, CardMedia, Button, withStyles, createStyles, WithStyles, CardHeader, Avatar, IconButton, Collapse } from '@material-ui/core';
import image from '../../photos/reuzel.jpg'
import transitions from '@material-ui/core/styles/transitions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import AddToCartIcon from '@material-ui/icons/AddShoppingCart';
import classes from '*.module.scss';





//components


const styles = createStyles({
    card: {
        width: "100%",
        borderWidth:"1px",
        borderColor:"#efb943",
        border: "solid",
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      actions: {
        display: 'flex',
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: transitions.create('transform', {
          duration: transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
        marginLeft: 'auto'
      },
      avatar: {
        },

      title:{
        fontSize: "20px"
      },
      subheader:{
        fontSize: "15px"
      }
  });

  

  interface ProductProps extends WithStyles<typeof styles>{
    IdP: number,
    name: string,
    category: String,
    brand: String,
    price: number,
    description: String
  }



const ProductCardComponent = class extends Component<ProductProps, {}> {
   
    state = { expanded: false };
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !this.state.expanded }));
      };


  render() {
    const { classes } = this.props

    return (
        <Card 
          className={classes.card}
        >
        <CardHeader
          title={this.props.name}
          subheader={this.props.price + " zł"}
          classes={{
            title: classes.title,
            subheader: classes.subheader
           }}
        />
        <CardMedia
          className={classes.media}
          image={image}
          title={this.props.name}
        />
        <CardContent>
          <Typography component="p">
            Marka: {this.props.brand}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <AddToCartIcon />
          </IconButton>
          <IconButton
            className={this.state.expanded?classes.expandOpen: classes.expand}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Opis:</Typography>
            <Typography paragraph>
              {this.props.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(ProductCardComponent);
