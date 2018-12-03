import * as React from 'react';
import Header from '~/components/Header';
import Body from './Body';
export default class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <Body />
            </React.Fragment>
        )
    }
}