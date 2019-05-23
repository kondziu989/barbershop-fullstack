import React, { Component } from "react";
import {
  WithStyles,
  createStyles,
  Theme,
  withStyles
} from "@material-ui/core/styles";
import { Grid, Typography, Divider, Select, MenuItem, Input } from "@material-ui/core";

//redux
import { connect } from "react-redux";
import { Reservation } from "../pages/Reservations";
import { green, red } from "@material-ui/core/colors";
import { setStatusReservation } from "../../actions/reservationActions";

enum status{
  done = 'done',
  pending = 'pending',
  cancelled = 'cancelled'
}
//components
const styles = (theme: Theme) =>
  createStyles({
    card:{
        backgroundColor: "#4d4c4c",
        padding: 16,
        // textAlign: 'center'
    },
    pending:{
      border: `2px solid ${theme.palette.primary.main}`,
    },
    done:{
      border: `2px solid green`,

    },
    cancelled:{
      border: `2px solid red`,
    }
  });

interface ReservationCardProps extends WithStyles<typeof styles> {
    reservation: Reservation;
    setStatus: Function;
    token: string;
}
const ReservationCard = withStyles(styles)(
  class extends Component<ReservationCardProps, {}> {
    
    state={
      status: this.props.reservation.status
    }

    componentDidMount() {
      this.setState({status:this.props.reservation.status})
    }

    handleChange = (event:any) => {
      //this.setState({ [event.target.name]: event.target.value});  
      this.props.setStatus(this.props.token, this.props.reservation.idr, event.target.value)
      this.setState({status: event.target.value})
    };

    getColor = () =>{
      const {classes} = this.props
      switch(this.state.status){
        case status.pending:
          return classes.pending
        case status.done:
          return classes.done
        case status.cancelled:
          return classes.cancelled
      }
    }
  
  
    render() {
    const { reservation, classes } = this.props
      return (
        <Grid key={reservation.idr} container xs={12} justify="center" className={classes.card + " " + this.getColor()}>
            <Grid container item xs={12} justify='center'>
                <Grid item>
                <Typography align='center' inline>Rezerwacja nr  </Typography>
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
            <Typography />
            <Typography inline>Status:  </Typography>
            
            <Select
            value={this.state.status}
            onChange={this.handleChange}
            input={<Input name="status" id="status-helper" />}
          >
            <MenuItem value={status.pending}>
              {status.pending}
            </MenuItem>
            <MenuItem value={status.done}>{status.done}</MenuItem>
            <MenuItem value={status.cancelled}>{status.cancelled}</MenuItem>
          </Select>
            </Grid>
        </Grid>
      );
    }
  }
);

const mapStateToProps = (state: any) => {
  return {
    // services: state.services.services,
    token: state.login.userData.token,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // fetchServices: () => dispatch(fetchServices())
    setStatus:(token:string, reservation: number, status: string) => dispatch(setStatusReservation(token, reservation, status))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservationCard);
