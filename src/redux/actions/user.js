
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



};

export default actions;
