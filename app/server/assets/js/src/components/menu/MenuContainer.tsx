import * as React from "react";
import {Link} from "react-router-dom";
import {Route, Router, Switch} from "react-router";
import MenuItem from "./MenuItem";

export default class MenuContainer extends React.Component<{}, {}> {
    render() {
        return (

            <section className="row">
                <MenuItem link={'/sepia'} text={'Sepia'}/>
                <MenuItem link={'/black-and-white'} text={'Black&White'}/>
                <MenuItem link={'/fuckery'} text={'Fuckery'}/>
                <MenuItem link={'/mix'} text={'Mix'}/>
            </section>
        );
    }
}