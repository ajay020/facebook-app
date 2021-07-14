import { createContext, useReducer } from "react"
import authReducer from "./AuthReducer"

const INITAIL_STATE = {
    user:{ "_id" : "60decba6cf9f27215c1dbae8",
         "profilePic" : "",
        "followings" : [ ],
        "followers" : [ "60decb4141f62d250c3049dc" ], 
        "isAdmin" : false, 
        "username" : "abc", 
        "email" : "abc@gmail.com",
        "password" : "$2b$10$.ippCY2RlHxBxil4wzURo.OwouzsnUWCNfjqSapwKvLEAiE8Foz6C",
        "createdAt" : "2021-07-02T08:17:42.272Z",
        "updatedAt" : "2021-07-02T11:42:08.120Z",
        "__v" : 0, 
        "desc" : "Hey, this is my desc" 
    },
    // user:null,
    isFatching:false,
    error:false
}

export const AuthContext = createContext(INITAIL_STATE)

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(authReducer, INITAIL_STATE)

    return (<AuthContext.Provider value={{
        user:state.user,
        isFatching: state.isFatching,
        error:state.error,
        dispatch
    }}>
        {children}
    </AuthContext.Provider>)
}