
const actions = {
    setUserFavorites: data => ({
        type: 'USER:SET_FAVORITES',
        payload: data
    }),
    removeUserFavorites: data => ({
        type: 'USER:REMOVE_FAVORITES',
        payload: data
    }),
    createRoute: data => ({
        type: 'USER:CREATE_ROUTE',
        payload: data
    }),
    pushItemToRoute: data => ({
        type: 'USER:PUSH_ITEM_TO_ROUTE',
        payload: data
    }),
    fetchEvents: data => ({
        type: 'USER:FETCH_EVENTS',
        payload: data
    }),
    fetchRoutes: data => ({
        type: 'USER:FETCH_ROUTES',
        payload: data
    }),
    fetchEventsById: data => ({
        type: 'USER:FETCH_EVENTS_BY_ID',
        payload: data
    }),
    fetchRouteById: data => ({
        type: 'USER:FETCH_ROUTE_BY_ID',
        payload: data
    }),
    getFavoritesById: data => ({
        type: 'USER:GET_FAVORITES_BY_ID',
        payload: data
    }),
    deleteRouteItem: data => ({
        type: 'USER:DELETE_ROUTE_ITEM',
        payload: data
    }),
    deleteFavoriteItem: data => ({
        type: 'USER:DELETE_FAVORITE_ITEM',
        payload: data
    }),



};

export default actions;
