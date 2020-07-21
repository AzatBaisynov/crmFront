import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './Login.css'
import Axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRegistration = () => {
        window.location.href = "/registration";
    }

    handleSubmit() {
        const requestParams = {
            method: 'post',
            url: 'http://localhost:8080/login/auth',
            data: this.state
        }

        Axios(requestParams)
            .then(res => {
                if (res.status == 200) {
                    console.log(res.data);
                    let token = {token: (res.data) }

                    localStorage.setItem('telegramToken', JSON.stringify(token));
                    window.location.href = '/home';
                }
            })
            .catch(error => {
                if (error.response.status == 403 || 401) {

                } 
            })
    }

    handleChange(e) {
        // console.log(e,'login');
        if (e.target.name == 'login') {
            this.setState({ login: e.target.value })
            console.log(this.state.login, 'login');
        } else if (e.target.name == 'password') {
            this.setState({ password: e.target.value })
        } 
    }

    render() {
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit} noValidate>
                    <h1>Вход</h1>
                    <div className="input-form">
                        <input
                            type="text"
                            className=""
                            placeholder="Логин"
                            name="login"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="input-form">
                        <input
                            type="password"
                            className=""
                            placeholder="Пароль"
                            name="password"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <Button className="input-form" onClick={this.handleSubmit}>
                            Войти
                    </Button>
                        <Button className="input-form" onClick={this.handleRegistration}>
                            Регистрация
                    </Button>
                    </div>
                </form>
            </div>
        )
    }
}
