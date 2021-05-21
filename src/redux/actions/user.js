
const actions = {
    setUserData: data => ({
        type: 'USER:SET_DATA',
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
