import * as React from "react";
import {Link} from "react-router-dom";
import NavbarItem from "./NavbarItem";

export default class Navbar extends React.Component<{}, {}> {
    render() {
        return (
            <nav className="navbar navbar-expand">
                <Link to="/" className="navbar-brand">
                    <img src="/image/logo.svg" width="50%" height="50%"/>
                </Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <NavbarItem title="Home" link="/"/>
                        <NavbarItem title="Help" link="/help"/>
                    </ul>
                    <span className="navbar-text">
                        This is how we do it
                    </span>
                </div>
            </nav>
        );
    }
}