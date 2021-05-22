import produce from "immer";

const initState = {
    favorites: [],
    routes: []
};


export default (state = initState, {type, payload}) => {

    switch (type) {
        case'USER:SET_FAVORITES': {
            return produce(state, draft => {
                draft.favorites.push(payload)
            })
        }
        case'USER:REMOVE_FAVORITES': {
            return produce(state, draft => {
                draft.favorites = draft.favorites.filter((elem) => elem.id !== payload.id)
            })
        }
        case'USER:CREATE_ROUTE': {
            return produce(state, draft => {
                const id = String(Math.random()).substr(3)
                const newRoute = {
                    name:payload.name,
                    _id: id,
                    items: [payload.items]
                };
                draft.routes.push(newRoute);
            })
        }
        case'USER:PUSH_ITEM_TO_ROUTE': {
            return produce(state, draft => {
                draft.routes.forEach((item, index) => {
                    if (item.id === payload.id) {
                       item.items.push(payload.item)
                    }
                })
            })
        }
        default:
            return state
    }
}