import {HADLE_LOGIN_PENDING,HADLE_LOGIN_ERROR,HADLE_LOGIN_SUCCESS, OPEN_LOGIN_DIALOG, CLOSE_LOGIN_DIALOG} from "./types";

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
    fetch("http://localhost:3001/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query: query(credencials)})
    })
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: HADLE_LOGIN_SUCCESS,
            payload: data.data.login
        })
    })
    .catch((err : any) => {
        dispatch({
            type: HADLE_LOGIN_ERROR,
            payload: err
        })
    })
}