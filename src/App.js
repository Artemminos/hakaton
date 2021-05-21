import React from 'react';
import {withRouter} from "react-router";
import {compose} from "redux";
import {Routes} from "./components/Routes";
import { useDispatch, useSelector } from 'react-redux';

import {configResponsive, useLocalStorageState, useResponsive, useToggle} from 'ahooks';

export const MainContext = React.createContext({})

configResponsive({
    small: 0,
    middle: 767,
    large: 940,
    extra_large: 1100
});

const App = () => {

    const responsive = useResponsive();
    const [cookie, setCookie] = useLocalStorageState('cookie', false);
    const dispatch = useDispatch();
  //  const isAuth = useSelector();

    return (
        <div>
            <MainContext.Provider
                value={cookie}>
                <Routes/>
            </MainContext.Provider>
        </div>
    );
};

export default compose(
withRouter
)(App)
