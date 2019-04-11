import React, { Component } from "react";

import "../../Assets/css/team/team.css";
//redux
import { connect, DispatchProp } from "react-redux";
import { fetchBarbers } from "../../actions/barberActions";
import { Dispatch } from "redux";
import { Grid, CircularProgress, Button, Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
//components
import barberImg from "../../photos/team_member.jpg";

const styles = (theme: Theme) => createStyles({
  barberCard: {
    border: "2px solid #efb943",
    backgroundColor: "#4d4c4c",
    margin: "1rem",
    textAlign: "center"
  },
  nameText: {
    fontWeight: "bold",
    color: "primary",
    fontSize: "16px",
  },
  rankText: {
    fontStyle: "italic",
    fontSize: "13px",
    marginTop: "5px",
    marginBottom: "10px"
  }
})

interface Barber {
  IdB: number;
  name: string;
}

interface TeamProps extends WithStyles<typeof styles>{
  barbers: Array<Barber>;
  err: string;
  pending: boolean;
  fetchBarbers: Function;
}

interface TeamState {}

class Team extends Component<TeamProps, TeamState> {
  componentDidMount() {
    this.props.fetchBarbers();
  }
  displayBarbers = () => {
    const { barbers, pending, err, classes} = this.props;

    if (pending) {
      return <CircularProgress color="primary" size={80} thickness={6} />;
    } else if (barbers.length > 0) {
      return barbers.map(barber => {
        return (
          <Grid item key={barber.IdB} className={classes.barberCard}>
            <img src={barberImg} width="250px"/>
            <p className={classes.nameText}>{barber.name}</p>
            <p className={classes.rankText}>{barber.IdB < 3 ? "Golibroda" : "MasterBarber"}</p>
            <Button color="primary" variant="outlined">Rezerwuj</Button>
          </Grid>
        );
      });
    }
  };
  render() {
    return (
      <Grid container justify="center">
        <Grid container className="content" justify="center" item xs={9} spacing={16}>
          <Grid item xs={12}>
            <h2 style={{textAlign: "center"}}>Nasz Zespół</h2>
          </Grid>
          {this.displayBarbers()}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    barbers: state.barbers.barbers,
    err: state.barbers.error,
    pending: state.barbers.isPending
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchBarbers: () => dispatch(fetchBarbers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Team));
