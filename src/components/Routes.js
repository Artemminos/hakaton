import {Route, Switch} from "react-router";

import React from "react";

export const Routes = () => {
    return (
        <div className="content-wrap">
            <Switch>
                <Route path='/login'>

                </Route>
                <Route path='/registration'>

                </Route>


                <Route path='*' render={()=><div>нет страницы</div>}/>
          </Switch>


        </div>
    );
};


