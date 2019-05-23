import React, { Component } from "react";
import {
  WithStyles,
  createStyles,
  Theme,
  withStyles
} from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";

//redux
import { connect } from "react-redux";

//components
const styles = (theme: Theme) =>
  createStyles({
    
  });

interface AdminPanelProps extends WithStyles<typeof styles> {
    history:any
  
}
const AdminPanel = withStyles(styles)(
  class extends Component<AdminPanelProps, {}> {

  
    componentDidMount() {

    }

    goToReservations= () => {
        this.props.history.push("/admin/reservations");
    }


    render() {
      return (
        <Grid container justify="center">
          <Grid container className="content" justify="center" item xs={9}>
            <Button color="primary" onClick={() => this.goToReservations()}>Rezerwacje</Button>
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
)(AdminPanel);
