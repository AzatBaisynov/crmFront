import React, { Component } from 'react'
import { Navbar, Container, FormControl, Button, Nav, Form } from 'react-bootstrap'
import logo from './Logo2.png'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from '../Pages/Home';
import Create from '../Pages/Create';
import Purchases from '../Pages/Purchases';
import Sales from '../Pages/Sales';
import Storages from '../Pages/Storages';
import '../App.css'

export default class Header extends Component {

    handleExit=()=>{
        localStorage.removeItem('telegramToken');
        window.location.href='/login';
    }

    render() {
        return (
            <>
                <Navbar collapseOnSelect fixed="top" expand="md" bg="dark" variant="dark" >
                    <Container>
                        <Navbar.Brand>
                            <img
                                src={logo}
                                height="30"
                                width="30"
                                className="d-inline-block align-top"
                                alt="Logo"
                            /> Easy Storage
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/home"> Главная </Nav.Link>
                                <Nav.Link href="/home/purchases"> Покупки </Nav.Link>
                                <Nav.Link href="/home/storages"> Склад </Nav.Link>
                                <Nav.Link href="/home/sales"> Продажи </Nav.Link>

                            </Nav>
                            <Nav>
                              <Nav.Link href="/home/create"> Telegram </Nav.Link>
                            </Nav>
                            
                            <Button variant="outline-info" onClick={this.handleExit}>Выход</Button>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Router>
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/home/purchases" component={Purchases} />
                        <Route exact path="/home/storages" component={Storages} />
                        <Route exact path="/home/sales" component={Sales} />
                        <Route exact path="/home/create" component={Create} />
                    </Switch>
                </Router>
            </>
        )
    }
}