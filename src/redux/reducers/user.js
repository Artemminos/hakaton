import produce from "immer";

const initState = {
    login: null,
    password: null,

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
        default:
            return state
    }
}