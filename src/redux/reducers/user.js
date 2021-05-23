import produce from "immer";

const initState = {
    favorites: [],
    routes: [],
    events: [],
    selectEvent: [],
    selectRoute: [],
    selectFavorites: [],

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
        case'USER:GET_FAVORITES_BY_ID': {
            return produce(state, draft => {
                state.favorites.forEach((item, index) => {
                    if (item.id === payload) {
                        draft.selectFavorites = item
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
                    distance:state.selectRoute.distance,
                    cost:state.selectRoute.cost,
                    time:state.selectRoute.time,
                    description: state.selectRoute.description,
                    mark: state.selectRoute.mark,
                    date:state.selectRoute.mark,
                    items: state.selectRoute.items.filter((elem) => elem.id !== payload)
                }
                draft.selectRoute = newArr;
            })
        }
        case'USER:DELETE_FAVORITE_ITEM': {
            return produce(state, draft => {
                let newArr = {
                    name: state.selectFavorites.name,
                    id:state.selectFavorites.id,
                    data: {
                        description: state.selectFavorites.data.description,
                        image: state.selectFavorites.data.image,
                        items: state.selectFavorites.data.items.filter((elem) => elem.id !== payload),
                        mark:state.selectFavorites.data.mark,
                        name:state.selectFavorites.data.name,
                        _id:state.selectFavorites.data._id
                    },
                }
                draft.selectFavorites = newArr;
            })
        }
        default:
            return state
    }
}