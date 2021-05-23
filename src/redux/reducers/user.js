import produce from "immer";

const initState = {
    favorites: [],
    routes: [],
    events: [],
    selectEvent: [],
    selectRoute: [],

};


export default (state = initState, {type, payload}) => {

    switch (type) {
        case'USER:SET_FAVORITES': {
            return produce(state, draft => {
                const newFavoriteItem = {
                    name: payload.name,
                    id:payload._id,
                    data: payload
                }
                draft.favorites.push(newFavoriteItem)
            })
        }
        case'USER:REMOVE_FAVORITES': {
            return produce(state, draft => {
                console.log(payload)
                draft.favorites = draft.favorites.filter((elem) => elem.id !== payload._id)
            })
        }
        case'USER:CREATE_ROUTE': {
            return produce(state, draft => {
                const id = String(Math.random()).substr(3)
                const newRoute = {
                    name: payload.name,
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
        case'USER:FETCH_EVENTS': {
            return produce(state, draft => {
                draft.events.push(...payload)
            })
        }
        case'USER:FETCH_ROUTES': {
            return produce(state, draft => {
                draft.routes.push(...payload)
            })
        }
        case'USER:FETCH_EVENTS_BY_ID': {
            return produce(state, draft => {
                state.events.forEach((item, index) => {
                    if (item.id === payload) {
                        draft.selectEvent = item
                    }
                })
            })
        }
        case'USER:FETCH_ROUTE_BY_ID': {
            return produce(state, draft => {
                state.routes.forEach((item, index) => {
                    if (item._id === payload) {
                        draft.selectRoute = item
                    }
                })
            })
        }
        case'USER:DELETE_ROUTE_ITEM': {
            return produce(state, draft => {
                let newArr = {
                    _id: state.selectRoute._id,
                    name: state.selectRoute.name,
                    image: state.selectRoute.image,
                    description: state.selectRoute.description,
                    mark: state.selectRoute.mark,
                    items: state.selectRoute.items.filter((elem) => elem.id !== payload)
                }
                draft.selectRoute = newArr;
            })
        }
        default:
            return state
    }
}