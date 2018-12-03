import * as React from 'react';
import {Link} from 'react-router-dom';
export default class ABOUT extends React.Component {
    render() {
        return (
            <div>
                <h2>Tacos</h2>
                <ul>
                    <li>
                    <Link to="/about/bus">Bus</Link>
                    </li>
                    <li>
                    <Link to="/about/cart">Cart</Link>
                    </li>
                </ul>
            </div>
        )
    }
}