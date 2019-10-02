import * as React from "react";
import * as ReactDOM from "react-dom";
import AppContainer from "./src/components/AppContainer";
import {createStore} from "redux";
import {Provider} from "react-redux";
import { createBrowserHistory as createHistory } from 'history'
import {Route, Router} from "react-router";

const store = createStore(
    state => state
);

const history = createHistory();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={AppContainer}/>
        </Router>
    </Provider>,
    document.getElementById("app")
);