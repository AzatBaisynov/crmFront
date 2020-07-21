import React, { Component } from 'react'
import "./Login.css"
import { Button } from 'react-bootstrap'
import Axios from 'axios';

export default class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            fullName: '',
            age: '',
            companyName: '',
            position: '',
            telephone: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        console.log(this.state);

        const requestParams = {
            method: 'post',
            url: 'http://localhost:8080/login/registration',
            data: this.state
        };

        // const requestParams = await Axios.post(
        //     'http://localhost:8080/login/registration',
        //      this.state );

        Axios(requestParams)
            .then(res => {
                if (res.status == 200) {
                    // res.data
                    console.log(res.data);
                    let token = { token: (res.data) }

                    localStorage.setItem('telegramToken', JSON.stringify(token));
                    window.location.href = '/home';
                }
            })
            .catch(error => {
                if (error.response.status == 403 || 401) {

                }
            })

    }

    handleAuthorization = () => {
        window.location.href = "/login"
    }

    handleChange(e) {
        // console.log(e,'login');
        if (e.target.name == 'login') {
            this.setState({ login: e.target.value })
            console.log(this.state.login, 'login');
        } else if (e.target.name == 'password') {
            this.setState({ password: e.target.value })
        } else if (e.target.name == 'fullName') {
            this.setState({ fullName: e.target.value })
        } else if (e.target.name == 'age') {
            this.setState({ age: e.target.value })
        } else if (e.target.name == 'companyName') {
            this.setState({ companyName: e.target.value })
        } else if (e.target.name == 'position') {
            this.setState({ position: e.target.value })
        } else if (e.target.name == 'telephone') {
            this.setState({ telephone: e.target.value })
        }

    }

    render() {
        return (

            <div className="form">
                <form onSubmit={this.handleSubmit} noValidate>
                    <h1>Регистрация</h1>
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

                    <div className="input-form">
                        <input
                            type="text"
                            className=""
                            placeholder="Ф.И.О"
                            name="fullName"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="input-form">
                        <input
                            type="date"
                            className=""
                            placeholder="Возраст"
                            name="age"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="input-form">
                        <input
                            type="text"
                            className=""
                            placeholder="Название фирмы"
                            name="companyName"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="input-form">
                        <input
                            type="text"
                            className=""
                            placeholder="Должность"
                            name="position"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>


                    <div className="input-form">
                        <input
                            type="text"
                            className=""
                            placeholder="+996 ..."
                            name="telephone"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <Button className="input-form" onClick={this.handleSubmit}>
                            Создать
                        </Button>
                        <Button className="input-form" onClick={this.handleAuthorization}>
                            &emsp; Авторизация &emsp;
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}
