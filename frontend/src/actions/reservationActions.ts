import {
    FETCH_FREE_DAY_ERROR, 
    FETCH_FREE_DAY_SUCCESS, 
    FETCH_FREE_DAY_PENDING, 
    FETCH_FREE_MONTH_ERROR, 
    FETCH_FREE_MONTH_PENDING, 
    FETCH_FREE_MONTH_SUCCESS,
    SET_RESERVATION_BARBER,
    SET_RESERVATION_SERVICE,
    GET_CURRENT_RESERVATIONS_ERROR,
    GET_CURRENT_RESERVATIONS_PENDING,
    GET_CURRENT_RESERVATIONS_SUCCESS,
    GET_PENDING_RESERVATIONS_ERROR,
    GET_PENDING_RESERVATIONS_PENDING,
    GET_PENDING_RESERVATIONS_SUCCESS,
    SET_RESERVATION_STATUS_ERROR,
    SET_RESERVATION_STATUS_PENDING,
    SET_RESERVATION_STATUS_SUCCESS
} from './types';

const queryMonth = (barberId: number, serviceId: number, date: string) => {
    return JSON.stringify({
      query: `{
        freeReservationsMonth(barberId:${barberId}, serviceId:${serviceId}, date: "${date}")
      }`
    });
  };
  

  const queryDay = (barberId: number, serviceId: number, date: string) => {
    return JSON.stringify({
      query: `{
        freeReservationsDay(barberId:${barberId}, serviceId:${serviceId}, date: "${date}")
      }`
    });
  };
  
  
export const setReservationService = (serviceId: number) => ({
    type: SET_RESERVATION_SERVICE,
    payload: serviceId,
})

export const setReservationBarber = (barberId: number) => ({
    type: SET_RESERVATION_BARBER,
    payload: barberId,
})


  export const fetchFreeMonth = (barberId: number, serviceId: number, date: string) => (dispatch: any) => {
    dispatch({ type: FETCH_FREE_MONTH_PENDING});
    fetch("https://mohawkbarbershop.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: queryMonth(barberId, serviceId, date)
    })
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: FETCH_FREE_MONTH_SUCCESS,
          payload: data.data.freeReservationsMonth
        })
      )
      .catch((err: any) =>
        dispatch({
          type: FETCH_FREE_MONTH_ERROR,
          payload: err
        })
      );
  };



  export const fetchFreeDay = (barberId: number, serviceId: number, date: string) => (dispatch: any) => {
    dispatch({ type: FETCH_FREE_DAY_PENDING});
    fetch("https://mohawkbarbershop.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: queryDay(barberId, serviceId, date)
    })
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: FETCH_FREE_DAY_SUCCESS,
          payload: data.data.freeReservationsDay
        })
      )
      .catch((err: any) =>
        dispatch({
          type: FETCH_FREE_DAY_ERROR,
          payload: err
        })
      );
  };


  //current reservations
  const queryCurrentReservations = (token:string, status: string) => {
    return JSON.stringify({
      query: `{
        reservations(token: "${token}", status: "${status}"){
          idr,
          barbername,
          service,
          date,
          status,
          price,
          comment,
          duration
        }
      }`
    });
  }

  export const fetchCurrentReservations = (token: string, status: string) => (dispatch: any) => {
    dispatch({ type: GET_CURRENT_RESERVATIONS_PENDING});
    fetch("https://mohawkbarbershop.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: queryCurrentReservations(token, status)
    })
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: GET_CURRENT_RESERVATIONS_SUCCESS,
          payload: data.data.reservations
        })
      )
      .catch((err: any) =>
        dispatch({
          type: GET_CURRENT_RESERVATIONS_ERROR,
          payload: err
        })
      );
  };



  //ADMIN

  const queryPending = (token: string, status:string) => {
    return JSON.stringify({
      query: `query($token: String!, $status: String!){
        allReservations(token:$token, status:$status){
          idr
          barbername
          service
          date
          status
          price
          comment
          duration
        }
        }
        `,
      variables: {token, status}
    });
  };

  export const fetchPendingReservations = (token: string, status:string) => (dispatch: any) => {
    dispatch({ type: GET_PENDING_RESERVATIONS_PENDING});
    fetch("https://mohawkbarbershop.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: queryPending(token, status)
    })
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: GET_PENDING_RESERVATIONS_SUCCESS,
          payload: data.data.allReservations
        })
      )
      .catch((err: any) =>
        dispatch({
          type: GET_PENDING_RESERVATIONS_ERROR,
          payload: err
        })
      );
  };

 

  const setStatusQuery = (token: string, reservation: number, status:string) => {
    return JSON.stringify({
      query: `mutation setStatusReservationRequest($token: String!,$reservation: Int!, $status: String!){
        setStatusReservation(
          token:$token, 
          reservation:$reservation, 
          status:$status){
            idr
          }
        }
        `,
      variables: {token, reservation, status}
    });
  };

  export const setStatusReservation = (token: string, reservation: number, status:string) => (dispatch: any) => {
    dispatch({ type: SET_RESERVATION_STATUS_PENDING});
    fetch("https://mohawkbarbershop.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: setStatusQuery(token, reservation, status)
    })
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: SET_RESERVATION_STATUS_SUCCESS,
          payload: true
        })
      )
      .catch((err: any) =>
        dispatch({
          type: SET_RESERVATION_STATUS_ERROR,
          payload: err
        })
      );
  };