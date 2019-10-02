import * as React from "react";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";

export default class Header extends React.Component<{}, {}> {
    render() {
        return (
            <div className="imgix-nav shadow">
                <header>
                    <div className="container">
                        <Navbar />
                    </div>
                </header>
            </div>
        );
    }
}