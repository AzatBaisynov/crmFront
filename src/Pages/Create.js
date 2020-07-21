import React, { Component } from 'react'
import './Pages.css'
import Axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            telegramKey: ''
        }
    }

    componentDidMount() {
        if (localStorage.getItem('telegramToken') == null || localStorage.getItem('telegramToken') == undefined) {
            window.location.href = '/login';
        }
        let token = JSON.parse(localStorage.getItem('telegramToken'));

        const headers = { Authorization: `${token.token}` };
        const requestParams = {
            method: 'get',
            url: 'http://localhost:8080/user/telegram',
            headers: headers
        }

        console.log('requestParams', requestParams);

        Axios(requestParams)
            .then(res => {
                if (res.status == 200) {
                    console.log('response', res.data);
                    this.setState({ telegramKey: res.data.telegramKey })
                }
            })
            .catch(error => {
                if (error.response.status == 403 || 401) {

                } else if (error.response.status == 500) {
                    this.setState({ profit: null })
                }
            })
    }

    render() {
        return (
            <div className="div-back">
               <div className="telega">
                   <div className="telega-title">
                       <h1>
                           Телеграм ключ
                        </h1>
                    </div>
                    <div>
                        <div className="telega-key">
                            <h2 className="telega-key">{this.state.telegramKey}</h2>
                        </div>
                        <div className="telega-img">
                            <img src={require("./images/telega.png")}/>
                        </div>
                    </div>
               </div>
            </div>
        )
    }
}