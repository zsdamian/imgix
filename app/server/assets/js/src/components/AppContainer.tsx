import * as React from "react";
import {Route, Router, Switch} from "react-router";
import MenuContainer from "./menu/MenuContainer";
import SepiaContainer from './sepia/SepiaContainer'
import Header from "./header/Header";
import BlackAndWhiteContainer from "./blackandwhite/BlackAndWhiteContainer";

export default class AppContainer extends React.Component<{}, {}> {
    render() {
        return (
            <main className="main vh-100">
                <Header/>
                <div className="container mt-5">
                    <Switch>
                        <Route path="/sepia" component={SepiaContainer}/>
                        <Route path="/black-and-white" component={BlackAndWhiteContainer}/>
                        <Route path="/" component={MenuContainer}/>
                    </Switch>
                </div>
            </main>
        );
    }
}