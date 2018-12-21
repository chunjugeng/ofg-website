import * as React from 'react';
import About from '~/pages/about';

export default class Body extends React.Component {
    render() {
        return(
            <React.Fragment>
                <section className="home" id="home">home</section>
                <section className="about" id="about">
                    <About/>
                </section>
            </React.Fragment>
        );
    }
}