import {} from "../types"

let initialState = {
    isAuth: true,
    isAdmin: true,
    user: {
        firstName: "Lettuce C.",
        role: "Admin"
    }
}

const authReducer = (state=initialState, action) =>{
    switch(action.type){
        default:
            return state
    }
}

export default authReducer