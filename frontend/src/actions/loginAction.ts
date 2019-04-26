import {HADLE_LOGIN_PENDING,HADLE_LOGIN_ERROR,HADLE_LOGIN_SUCCESS, OPEN_LOGIN_DIALOG, CLOSE_LOGIN_DIALOG, HANDLE_LOGOUT} from "./types";

const query = (credencials: UserCredencials) =>{
return (
`{
    login(email: "${credencials.email}", password: "${credencials.password}"){
      firstName,
      token,
      tokenExpiration
    }
  }
`)};

export interface UserCredencials {
    email: String,
    password: String
}

export const openLoginDialog = () => ({
    type: OPEN_LOGIN_DIALOG,
    payload: true
})

export const closeLoginDialog = () => ({
    type: CLOSE_LOGIN_DIALOG,
    payload: false
})

export const handleLogin = (credencials : UserCredencials) =>(dispatch: any) => {
    dispatch({type: HADLE_LOGIN_PENDING});
    fetch("https://mohawkbarbershop.herokuapp.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query: query(credencials)})
    })
    .then(res => res.json())
    .then(data => {
        if(data.data.login !== null){
            dispatch({
                type: HADLE_LOGIN_SUCCESS,
                payload: data.data.login
            })
            dispatch({
                type: CLOSE_LOGIN_DIALOG,
                payload: false
            })
        } else {
            dispatch({
                type: HADLE_LOGIN_ERROR,
                payload: false
            })
        }
        
    })
    .catch((err : any) => {
        dispatch({
            type: HADLE_LOGIN_ERROR,
            payload: err
        })
    })
}

export const handleLogout = () =>({
    type: HANDLE_LOGOUT
})