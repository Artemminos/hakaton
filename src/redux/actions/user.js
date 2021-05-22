
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

    fetchUser: (prop) => dispatch => {
       // return userAPI.fetchWifi(prop).then(({data}) => {
        //             if (data.success) {
        //                 dispatch(actions.setWifi(data.result));
        //             } else if (!wifiCall && data.errors.error.message.includes('-16')) {
        //                 userAPI.fetchWifi(prop).then(() => {
        //                     wifiCall = true
        //                 })
        //             } else {
        //                 dispatch(errors.setWifiError(data.errors.error.message))
        //             }
        //         }).catch(() => {
        //             dispatch(errors.setWifiError('Сервис временно не доступен'))
        //         }).finally(() => dispatch(common.setLoading(false)))
    }

};

export default actions;
