import React, { Component } from "react";
import {
  WithStyles,
  createStyles,
  Theme,
  withStyles
} from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import ReservationCard from "../reservationCardComponent/ReservationCard"

//redux
import { connect } from "react-redux";
import { fetchCurrentReservations } from "../../actions/reservationActions";

//components
const styles = (theme: Theme) =>
  createStyles({
    
  });

export interface Reservation{
    idr: number
    barbername: string
    service: string
    date: string
    status: string
    price: number
    comment: string
    duration: number
}

interface ReservationsProps extends WithStyles<typeof styles> {
  currentReservations: Array<Reservation>
  token: string,
  fetchCurrentReservations: Function
}
const Reservations = withStyles(styles)(
  class extends Component<ReservationsProps, {}> {

    componentDidMount() {
        this.props.fetchCurrentReservations(this.props.token, "pending");
    }


    render() {
      return (
        <Grid container justify="center">
          <Grid container className="content" justify="center" item xs={9} spacing={32}>
            <Grid item xs={12}>
                <Typography variant="h6" color="primary" align='center'>Nadchodzące rezerwacje</Typography>
            </Grid>
            {typeof this.props.currentReservations!== 'undefined'?this.props.currentReservations.map( reservation => {
            return (
                <Grid item xs={12} md={6} lg={4}>
                    <ReservationCard reservation={reservation}/>
                </Grid>)
            }):<Typography>Brak nadchodzących rezerwacji.</Typography>}
          </Grid>
        </Grid>
      );
    }
  }
);

const mapStateToProps = (state: any) => {
  return {
    currentReservations: state.currentReservations.currentReservations,
    token: state.login.userData.token,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCurrentReservations: (token:string, status:string) => dispatch(fetchCurrentReservations(token, status))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reservations);
