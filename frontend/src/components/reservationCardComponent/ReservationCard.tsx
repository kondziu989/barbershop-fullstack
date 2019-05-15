import React, { Component } from "react";
import {
  WithStyles,
  createStyles,
  Theme,
  withStyles
} from "@material-ui/core/styles";
import { Grid, Typography, Divider } from "@material-ui/core";

//redux
import { connect } from "react-redux";
import { Reservation } from "../pages/Reservations";

//components
const styles = (theme: Theme) =>
  createStyles({
    card:{
        border: `2px solid ${theme.palette.primary.main}`,
        backgroundColor: "#4d4c4c",
        padding: 16,
        // textAlign: 'center'
    }
  });

interface ReservationCardProps extends WithStyles<typeof styles> {
    reservation: Reservation;
}
const ReservationCard = withStyles(styles)(
  class extends Component<ReservationCardProps, {}> {

  
    componentDidMount() {

    }

    render() {
    const { reservation, classes } = this.props
      return (
        <Grid container xs={12} justify="center" className={classes.card}>
            <Grid container item xs={12} justify='center'>
                <Grid item>
                <Typography align='center' inline>Rezerwacja nr:  </Typography>
                <Typography variant='h6' color='primary' inline>{reservation.idr}</Typography>
                </Grid>
            </Grid>

            <Grid item xs={12} justify='center' style={{textAlign:'center'}}>
                <Typography color='primary' inline align='center'>{reservation.service}</Typography>
            </Grid>
            <Grid item xs={12} style={{marginTop: 10, marginBottom:20}}>
                <Divider variant="middle" />
            </Grid>
            

            <Grid item xs={12}>
                <Typography inline>Barber: </Typography>
                <Typography color='primary' inline>{reservation.barbername}</Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography inline>Kiedy: </Typography>
                <Typography color='primary' inline>{reservation.date}</Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography inline>Jak długo: </Typography>
                <Typography color='primary' inline>{reservation.duration} min</Typography>
            </Grid>

            <Grid item xs={12}>
            <Typography inline>Cena: </Typography>
            <Typography color='primary' inline>{reservation.price} zł</Typography>
            </Grid>
        </Grid>
      );
    }
  }
);

const mapStateToProps = (state: any) => {
  return {
    // services: state.services.services,
    
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // fetchServices: () => dispatch(fetchServices())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservationCard);
