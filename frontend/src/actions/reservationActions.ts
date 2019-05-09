import {
    FETCH_FREE_DAY_ERROR, 
    FETCH_FREE_DAY_SUCCESS, 
    FETCH_FREE_DAY_PENDING, 
    FETCH_FREE_MONTH_ERROR, 
    FETCH_FREE_MONTH_PENDING, 
    FETCH_FREE_MONTH_SUCCESS,
    SET_RESERVATION_BARBER,
    SET_RESERVATION_SERVICE
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