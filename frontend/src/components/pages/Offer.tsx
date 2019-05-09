import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  WithStyles,
  createStyles,
  Theme,
  withStyles
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import "../../Assets/css/offer/offer.css";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { throws } from "assert";

//redux
import { connect } from "react-redux";
import { fetchServices } from "../../actions/servicesAction";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { setReservationService, setReservationBarber } from "../../actions/reservationActions";
//components
const styles = (theme: Theme) =>
  createStyles({
    table: {
      color: "white"
    }
  });

interface Service {
  ids: number;
  name: string;
  price: number;
  duration: number;
}

interface OfferProps extends WithStyles<typeof styles> {
  fetchServices: any;
  services: Array<Service>;
  err: String;
  pending: Boolean;
  history: any;
  setReservationService: Function;
  setReservationBarber: Function;
}
const Offer = withStyles(styles)(
  class extends Component<OfferProps, {}> {
    componentDidMount() {
      this.props.fetchServices();
    }

    handleReservationClick = (service: number) => {
      console.log(service)
      this.props.setReservationService(service)
      this.props.history.push('/reservation');
    };
    displayOffer = () => {
      const { pending, services } = this.props;
      if (pending) {
        return <CircularProgress color="primary" size={80} thickness={6} />;
      } else if (services.length > 0) {
        return services.map(service => {
          return (
            <TableRow>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.duration}</TableCell>
              <TableCell>{service.price}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" size="small" value={service.ids} onClick={() => this.handleReservationClick(service.ids)}>
                  Rezerwuj
                </Button>
              </TableCell>
            </TableRow>
          );
        });
      }
    };

    render() {
      return (
        <Grid container justify="center">
          <Grid container className="content" justify="center" item xs={9}>
            <Grid item xs={12}>
              <Table className="primary-font">
                <TableHead>
                  <TableRow>
                    <TableCell>Nazwa</TableCell>
                    <TableCell>Czas trwania</TableCell>
                    <TableCell>Cena</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody >
                  {this.displayOffer()}
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
    services: state.services.services,
    err: state.services.err,
    pending: state.services.pending
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchServices: () => dispatch(fetchServices()),
    setReservationService: (serviceId:number) => dispatch(setReservationService(serviceId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Offer);
