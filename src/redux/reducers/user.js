import produce from "immer";

const initState = {
    login: null,
    password: null,
    stepsArray:[]
};


export default (state = initState, {type, payload}) => {

    switch (type) {
        case'USER:SET_DATA': {
            return produce(state, draft => {
                draft.default_account = payload.default_account
                draft.accounts = [...payload.accounts]
                draft.isAuth = payload.isAuth
                draft.permissions = payload.permissions
            })
        }
        case'USER:SET_STEPS':{
            return produce(state,draft=>{
                draft.stepsArray = payload
            })
        }
        default:
            return state
    }
}