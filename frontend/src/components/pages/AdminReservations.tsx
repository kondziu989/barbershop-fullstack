import React, { Component } from "react";
import {
  WithStyles,
  createStyles,
  Theme,
  withStyles
} from "@material-ui/core/styles";
import { Grid, Typography, Tabs, Tab } from "@material-ui/core";
import ReservationCard from "../reservationCardComponent/ReservationCardAdmin"

//redux
import { connect } from "react-redux";
import { fetchPendingReservations } from "../../actions/reservationActions";

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

enum status{
  done = 'done',
  pending = 'pending',
  cancelled = 'cancelled'
}

interface ReservationsProps extends WithStyles<typeof styles> {
  pendingReservations: Array<Reservation>
  token: string,
  fetchPendingReservations: Function
}
const AdminReservations = withStyles(styles)(
  class extends Component<ReservationsProps, {}> {

    state={
      tab: status.pending
    }

    componentDidMount() {
        this.props.fetchPendingReservations(this.props.token, this.state.tab);
    }

    handleChange = (event:any, newValue:any) => {
      this.setState({tab: newValue});
      this.props.fetchPendingReservations(this.props.token, newValue)
    }
  

    render() {
      return (
        <Grid container justify="center">
          <Grid container className="content" justify="center" item xs={9} spacing={32}>
            <Grid item xs={12}>
                <Typography variant="h6" color="primary" align='center'>Nadchodzące rezerwacje</Typography>
            </Grid>
            <Grid item xs={12}>
              <Tabs
                value={this.state.tab}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
              <Tab label="Pending" value={status.pending} />
              <Tab label="Done" value={status.done}/>
              <Tab label="Cancelled" value={status.cancelled} />
            </Tabs>
          </Grid>
            {typeof this.props.pendingReservations!== 'undefined'?this.props.pendingReservations.map(reservation => {
            return (
                <Grid item xs={12} md={6} lg={4} key={reservation.idr}>
                    <ReservationCard reservation={reservation}/>
                </Grid>)
            }):<Typography>Brak Rezerwacji</Typography>}
          </Grid>
        </Grid>
      );
    }
  }
);

const mapStateToProps = (state: any) => {
  return {
    pendingReservations: state.allReservations.allReservations,
    token: state.login.userData.token,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPendingReservations: (token:string, status:string) => dispatch(fetchPendingReservations(token, status))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminReservations);
