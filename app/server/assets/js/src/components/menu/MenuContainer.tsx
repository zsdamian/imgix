import * as React from "react";
import {Link} from "react-router-dom";
import {Route, Router, Switch} from "react-router";
import MenuItem from "./MenuItem";

export default class MenuContainer extends React.Component<{}, {}> {
    render() {
        return (

            <section className="row">
                <MenuItem link={'/sepia'} text={'Sepia'} image="./image/sepia.jpeg"/>
                <MenuItem link={'/black-and-white'} text={'Black&White'} image="./image/black_and_white.jpeg"/>
            </section>
        );
    }
}