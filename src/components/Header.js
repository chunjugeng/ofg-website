import * as React from 'react';
import styled from 'styled-components';
import {Row, Col} from 'antd';
import cn from 'classnames';

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #0f1925;
    z-index: 50;
    color: white;
    height: 45px;
    .header {
        padding-top: 15px;
        position: relative;
        margin: 0 auto;
        nav {
            ul {
                li {
                    color: white;
                    font-size: 16px;
                    
                    cursor: pointer;
                    &:hover {
                        color: green;
                    }
                }
            }
        }
    }

    @media (min-width: 992px) {
        .header {
            width: 80%;
            .logo {
                float: left;
                i {
                    display: none;
                }
            }
            nav {
                text-align: right;
                ul {
                    li {
                        padding: 0 10px;
                        display: inline-block;
                    }
                }
            }
        }
    }

    @media (max-width: 992px) {
        .logo {
            padding: 0 15px;
            position: relative;
            z-index: 3;
            i {
                display: inline-block;
                height: 30px;
                color: white;
                float: right;
                
            }
        }
        nav {
            position: relative;
            z-index: 2;
            visibility: hidden;
            padding: 15px 0;
            position: absolute;
            top: 0;
            background: #0f1925;
            width: 100%;
            text-align: center;
            transition: all .3s ease-out;
            &.slide-in {
                visibility: visible;
                top: 40px;
            }
            
            ul {
                li {
                    display: block;
                    padding: 7px 0 5px;
                }
            }
        }
    }
`;
export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
          isDropdown: false  
        };
    }

    toggleDropdown =()=> {
        let isDropdown = !this.state.isDropdown;
        this.isDropdownEl.classList.toggle('slide-in');
        this.setState({isDropdown});
    }
    render() {
        let {isDropdown} = this.state;
        return(
            <HeaderContainer>
                <div className="header">
                    <div className="logo">
                        logo
                        <i onClick={this.toggleDropdown}>dropdown nav</i>
                    </div>
                    <nav ref={isDropdownEl =>this.isDropdownEl= isDropdownEl}>
                        <ul>
                            <li>Home</li>
                            <li>About Us</li>
                        </ul>
                    </nav>
                </div>
            </HeaderContainer>
        )
    }
}