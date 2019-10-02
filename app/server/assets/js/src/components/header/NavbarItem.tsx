import * as React from "react";
import {Link} from "react-router-dom";

export interface NavbarItemProps {
    title: string,
    link: string,
    extraLinkClasses?: string[],
    extraItemClasses?: string[],
}

export default class NavbarItem extends React.Component<NavbarItemProps, {}> {
    constructor(props: NavbarItemProps) {
        super(props);
    }

    render() {
        return (
            <li className={'nav-item '.concat(this.props.extraItemClasses ? this.props.extraItemClasses.join(' ') : '')}>
                <Link
                    to={this.props.link}
                    className={'nav-link '.concat(this.props.extraLinkClasses ? this.props.extraLinkClasses.join(' ') : '')}
                >
                    {this.props.title}
                </Link>
            </li>
        );
    }
}