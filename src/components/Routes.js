import {Route, Switch} from "react-router";

import React from "react";
import RouteComponent from "./RouteComponent";
import EventComponent from "./EventComponent";

export const Routes = () => {
    return (
        <div className="content-wrap">
            <Switch>

                <Route path='/search'>
                    <div>search </div>
                </Route>
                <Route path='/routes/:id'>
                    <RouteComponent/>
                </Route>

                <Route path='/event'>
                    <EventComponent/>
                </Route>


                <Route  path='/'>
                    <div>главная</div>
                </Route>
                <Route path='*' render={() => <div>нет страницы</div>}/>
            </Switch>


        </div>
    );
};


