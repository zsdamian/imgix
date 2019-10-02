import * as React from "react";
import {Link} from "react-router-dom";

export interface MenuItemProperties {
    link: string,
    text: string
}

export default class MenuItem extends React.Component<MenuItemProperties, {}> {
    render() {
        return (
            <div className="col col-md-6 col-12">
                <Link to={this.props.link}>
                    <div className="imgix-menu-item">
                        {this.props.text}
                    </div>
                </Link>
            </div>
        );
    }
}