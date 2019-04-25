import React, { Component } from "react";
import {
  WithStyles,
  createStyles,
  Theme,
  withStyles
} from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

//redux
import { connect } from "react-redux";

//components
const styles = (theme: Theme) =>
  createStyles({
    
  });

interface TemplateProps extends WithStyles<typeof styles> {
  
}
const Template = withStyles(styles)(
  class extends Component<TemplateProps, {}> {

  
    componentDidMount() {

    }


    render() {
      return (
        <Grid container justify="center">
          <Grid container className="content" justify="center" item xs={9}>
            
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
)(Template);
