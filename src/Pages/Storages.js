import React, { Component } from 'react'
import './Pages.css'
import Axios from 'axios';

export default class Storages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            token: 'tokenPlaceHolder'
        }
    }

    componentDidMount() {
        let token = JSON.parse(localStorage.getItem('telegramToken'));
        this.setState({ token: token.token });

        const headers = { Authorization: `${token.token}` };
        const requestParams = {
            method: 'get',
            url: 'http://localhost:8080/storage/list',
            headers: headers
        }

        Axios(requestParams)
            .then(res => {
                if (res.status == 200) {
                    const pdata = res.data;
                    this.setState({ data: pdata })
                }
            })
            .catch(error => {
                if (error.response.status == 403 || 401) {

                } else if (error.response.status == 500) {
                    this.setState({ data: null })
                }
            })
    }

    render() {
        return (
            <div>
                {!!(this.state.data) &&
                    <div className="div-back">
                        <div className="storage">
                            <div className="storage-s">
                            <div className="prodaji">
                                    Склад
                                </div>
                                {this.state.data.map((x, index) => {
                                    return (
                                        <div className="get-sales"key={index}>
                                            <div className="get-sales-img">
                                                <img src={require(x.productPath + "")} alt="" />
                                            </div>
                                            <div className="get-sales-block">
                                                <h1 className="get-sales-title">{x.productName}</h1>
                                                <p className="get-sales-text-left">
                                                    Количество:&emsp;&emsp;&ensp;<br></br>
                                                Цена:<br></br>
                                                Сумма:<br></br>
                                                </p>
                                                <p className="get-sales-text-right" >{x.count}<br></br>{x.pricePerUnit} сом<br></br>{x.totalPrice} сом</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
