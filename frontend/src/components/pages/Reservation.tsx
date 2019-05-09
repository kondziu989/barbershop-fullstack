import React, { Component, useState } from "react";
import {
  WithStyles,
  createStyles,
  Theme,
  withStyles
} from "@material-ui/core/styles";

import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from "@material-ui/pickers";

import {DateFormatInput, TimeFormatInput} from 'material-ui-next-pickers'


import { Grid, FormControl, InputLabel, Select, MenuItem, Typography, TextField, Chip, Button } from "@material-ui/core";

//redux
import { connect } from "react-redux";
import classes from "*.module.css";
import { fetchBarbers } from '../../actions/barberActions';
import { fetchServices } from '../../actions/servicesAction';
import { fetchFreeDay, fetchFreeMonth, setReservationService, setReservationBarber } from "../../actions/reservationActions";
import { th } from "date-fns/esm/locale";
import { Redirect } from "react-router";


//components
const styles = (theme: Theme) =>
  createStyles({
    formControl:{
       marginTop: 20,
       marginBottom: 20,
    },
    textField: {
         marginTop: 20,
       marginBottom: 20,
    },

    chip: {
        //margin:10
    },

    selectedChip: {
        margin:10,
    }

  });

  const query = (token: string, data: ReservationData) => {
    return JSON.stringify({
      query: `mutation {
      makeReservation(
          token: "${token}",
          reservationData:{
            date:"${data.date}",
            IdB:${data.IdB}
            IdS:${data.IdS}
            comment:"${data.comment}"
          })}
        `
    });
  };

interface Barber{
    IdB: number,
    name: string,
    // firstName: string,
    // lastName: string,
    // phone: string,
    // email: string,
}

enum Status {
    none,
    pending,
    accepted,
    rejected
  }

interface Service{
    ids: number,
    name: string,
    price: number,
    duration: number
}

interface ReservationData{
    date: string,
    IdB: number,
    IdS: number,
    comment: string
}

interface ReservationProps extends WithStyles<typeof styles> {
  barbers:Array<Barber>;
  services:Array<Service>;
  fetchBarbers: Function;
  fetchServices: Function;
  fetchFreeDay: Function;
  fetchFreeMonth: Function;
  freeReservationsDay: Array<string>;
  freeReservationsMonth: Array<string>;
  err: string;
  pending: boolean;
  token: string;
  barber: number;
  service: number;
}
const Reservation = withStyles(styles)(
  class extends Component<ReservationProps, {}> {

    state={
        // barber: typeof this.props.barber==='undefined'?1:this.props.barber,
        // service: typeof this.props.service==='undefined'?1:this.props.service,
        barber: this.props.barber,
        service: this.props.service,
        comment:"",
        date: new Date(),
        time: "",
        dateString: "",
        status: Status.none,
        response: "",
        toHomePage: false,
    }
  
    componentDidMount() {
        this.props.fetchBarbers();
        this.props.fetchServices();
        this.props.fetchFreeDay(this.state.barber, this.state.service, this.dateToString(this.state.date));
        this.setState({barber:this.props.barber, service:this.props.service})
    }

    fetchMakeReservation = () => {
        const reservationData: ReservationData = {
            date: this.state.dateString,
            IdB: this.state.barber,
            IdS: this.state.service,
            comment: this.state.comment
        };
        console.log(this.props.token)
        console.log(reservationData)
        fetch("https://mohawkbarbershop.herokuapp.com/graphql", {
          method: "POST",
          headers: {
            //'Accept': 'application/json',
            "Content-Type": "application/json"
          },
          body: query(this.props.token, reservationData)
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            console.log(data.data.makeReservation);
            this.setState({
              response: data.data.makeReservation,
              status: Status.accepted,
              toHomePage: true
            });
            data.data.makeReservation===true?window.alert("Udało się dokonać rezerwacji."):()=>{
                window.alert("Rezerwacja nieudana - sprawdź czy wypełniłeś wszystkie pola")
            }
            
          })
          .catch(data => this.setState({ status: Status.rejected }));
      };

    dateToString(date: Date){
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

        return (yyyy + '-' + mm + '-' + dd);
    }

    handleChange = (event:any) => {
       if(event.target.name==='barber')
       this.props.fetchFreeDay(event.target.value, this.state.service, this.dateToString(this.state.date))
       if(event.target.name==='service')
       this.props.fetchFreeDay(this.state.barber, event.target.value, this.dateToString(this.state.date))
        this.setState({[event.target.name]: event.target.value});
      };

    handleChangeText = (name:any) => (event:any) => {
        this.setState({ [name]: event.target.value });
    };

    populateBarbers = () =>{
        return this.props.barbers.map(barber => {
        return (<MenuItem value={barber.IdB}>
            {barber.name}
        </MenuItem>)})
    }

    populateServices = () =>{
        return this.props.services.map(service => {
        return (<MenuItem value={service.ids}>
            {service.name} ({service.duration }min | {service.price} zł)
        </MenuItem>)})
    }

    populateTime = () =>{
        const {classes} = this.props
        return typeof this.props.freeReservationsDay==='undefined'||this.props.freeReservationsDay.length===0?
        <Typography variant='h5'>Brak dostępnych terminów w tym dniu.</Typography>
        :this.props.freeReservationsDay.map(time => {
        return (
        <Grid item xs ={3} sm={2} lg={2}>
            <Chip
                label={time}
                onClick={() => this.handleChipClick(time)}
                className={classes.chip}
                clickable
                color={this.state.time === time?"primary":"default"}
            />
        </Grid>)})
    }

    handleChipClick = (time: string) =>{
        console.log("you clicked: " + time)
        console.log(this.state.dateString)
        const newtime = this.dateToString(this.state.date) + " " + time +":00"
        this.setState({time: time})
        this.setState({dateString: newtime})
    }

    handleDateChange = (value: Date) => {
        this.setState({
            date: value, 
        });
        this.fetchFreeDay(value)
    }

    fetchFreeDay = (date:Date) => {
        console.log(this.state.barber + " " + this.state.service + " " + this.dateToString(date))
        this.props.fetchFreeDay(this.state.barber, this.state.service, this.dateToString(date))
    }
    
    stringToDate = (text: string): Date =>{
        return new Date(text)
    }

    handleMakeReservation = () =>{
        this.fetchMakeReservation();
    }
     

    render() {
    if(this.state.toHomePage){
        return <Redirect to = "/"/>
    }
    const { classes } = this.props
      return typeof this.props.token !== 'undefined'?(
        <Grid container justify="center">
          <Grid container className="content" justify="center" item xs={9}>
            <Grid item xs={12} justify="center">
              <Typography variant="h4" color="primary" align="center">Rezerwacja wizyty</Typography>
            </Grid>
            <Grid item lg={5} xs={12} md={6}>
            <form>
            <FormControl fullWidth className={classes.formControl}>
                <InputLabel>Barber</InputLabel>
                <Select
                    value={this.state.barber}
                    onChange={this.handleChange}
                    inputProps={{
                    name: 'barber',
                    id: 'barber',
                    }}
                >
                {this.populateBarbers()}
            </Select>
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
                <InputLabel>Usługa</InputLabel>
                <Select
                    value={this.state.service}
                    onChange={this.handleChange}
                    inputProps={{
                    name: 'service',
                    id: 'service',
                    }}
                >
                {this.populateServices()}
            </Select>
            </FormControl>

            <TextField
                id="comment"
                label="Komentarz"
                multiline
                rowsMax="4"
                value={this.state.comment}
                onChange={this.handleChangeText('comment')}
                className={classes.textField}
                margin="normal"
                fullWidth
            />

            <DateFormatInput 
                name='date-input' 
                value={this.state.date} 
                onChange={this.handleDateChange}
                className={classes.formControl}
            />

            <Grid className={classes.formControl} container spacing={16}>
            <Grid item xs={12} ><Typography variant = "subheading" color="primary">Dostępne godziny</Typography></Grid>
                {this.populateTime()}
            </Grid>

            <Button size="large" fullWidth variant="outlined" color="primary" onClick={() => this.handleMakeReservation()}>Zatwierdź rezerwację</Button>
            </form>
            </Grid>
          </Grid>
        </Grid>
      ):
      <Grid container justify="center">
          <Grid container className="content" justify="center" item xs={9}>
      <Typography variant="subtitle1">Aby dokonać rezerwacji, należy się zalogować.</Typography>
      </Grid>
      </Grid>
    }
  }
);

const mapStateToProps = (state: any) => {
  return {
    barbers: state.barbers.barbers,
    err: state.barbers.error,
    pending: state.barbers.isPending,
    services: state.services.services,
    freeReservationsDay: state.freeReservationsDay.freeReservationsDay,
    token: state.login.userData.token,
    barber: state.reservation.barber,
    service: state.reservation.service,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchBarbers: () => dispatch(fetchBarbers()),
    fetchServices: () => dispatch(fetchServices()),
    fetchFreeDay: (barberId:number, serviceId: number, date: string) => dispatch(fetchFreeDay(barberId, serviceId, date)),
    fetchFreeMonth: (barberId:number, serviceId: number, date: string) => dispatch(fetchFreeMonth(barberId, serviceId, date)),
    setReservationService: (serviceId:number) => dispatch(setReservationService(serviceId)),
    setReservationBarber: (barberId:number) => dispatch(setReservationBarber(barberId)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reservation);
