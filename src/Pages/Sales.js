import React, { Component } from 'react'
import './Pages.css'
import { Button } from 'react-bootstrap'
import Axios from 'axios';

export default class Sales extends Component {
    constructor(props) {
        var date = new Date();
        var month;
        var day;
        if (date.getMonth() < 10) {
            Number = date.getMonth();
            Number = Number + 1;
            month = 0 + "" + Number;
        } else {
            month = date.getMonth();
        }


        if (date.getDate() < 10) {
            day = "0" + date.getDate();
        } else {
            day = date.getDate();
        }
        super(props);
        this.state = {
            product: "",
            count: 0,
            pricePerUnit: 0,
            curTime: date.getFullYear() + "-" + month + "-" + day,
            profit: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        // console.log(e,'login');
        if (e.target.name == 'nameProduct') {
            this.setState({ product: e.target.value })
            console.log("selected", e.target.value);
        } else if (e.target.name == 'count') {
            this.setState({ count: e.target.value })
            console.log("selected", e.target.value);
        } else if (e.target.name == 'price') {
            this.setState({ pricePerUnit: e.target.value })
            console.log("selected", e.target.value);
        }
    }


    handleSubmit() {
        console.log("product name = ", this.state.product)
        const headers = { Authorization: `${this.state.token}` };
        const data = {
            product: this.state.product,
            count: this.state.count,
            pricePerUnit: this.state.pricePerUnit
        }
        const requestParams = {
            method: 'post',
            url: 'http://localhost:8080/sales/create',
            data: data,
            headers: headers
        }

        Axios(requestParams)
            .then(res => {
                if (res.status == 200) {
                    console.log(res.data);
                    window.location.href = '/home/sales';
                }
            })
            .catch(error => {
                if (error.response.status == 403 || 401) {

                }
            })
    }

    componentDidMount() {
        if (localStorage.getItem('telegramToken') == null || localStorage.getItem('telegramToken') == undefined) {
            window.location.href = '/login';
        }
        let token = JSON.parse(localStorage.getItem('telegramToken'));
        this.setState({ token: token.token });

        const headers = { Authorization: `${token.token}` };
        const requestParams = {
            method: 'get',
            url: 'http://localhost:8080/sales/list?date=' + this.state.curTime,
            headers: headers
        }

        console.log('requestParams', requestParams);

        Axios(requestParams)
            .then(res => {
                if (res.status == 200) {
                    console.log('response', res.data);
                    const profit = res.data;
                    this.setState({ profit: profit })
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
            <div>
                {!!(this.state.profit) &&
                    <div className="div-back">
                        <div className="get">
                            <div className="get-s">
                                <div className="prodaji">
                                    Продажи
                                </div>
                                {this.state.profit.sales.map((x, index) => {
                                    return (
                                        <div className="get-sales" key={index}>
                                            <div className="get-sales-img">
                                                <img src={require(x.productPath + "")} alt="" />
                                            </div>
                                            <div className="get-sales-block">
                                                <div className="get-sales-date">
                                                    <span>{this.state.curTime}</span>
                                                </div>
                                                <h1 className="get-sales-title">{x.productName}</h1>
                                                <p className="get-sales-text-left">
                                                    Пользователь:&emsp;&emsp;&ensp;<br></br>
                                                    Количество:<br></br>
                                                    Цена:<br></br>
                                                    Сумма:<br></br>
                                                </p>

                                                <p className="get-sales-text-right" >{x.userName}<br></br>{x.count}<br></br>{x.pricePerUnit} сом<br></br>{x.totalPrice} сом</p>

                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="post">
                            <div className="post-form">
                                <form onSubmit={this.handleSubmit} noValidate>
                                    <h1>Продать</h1>

                                    <div className="post-input-form">
                                        <select
                                            name="nameProduct"
                                            noValidate
                                            onChange={this.handleChange}
                                        >
                                            <option value="Выберите товар">Выберите товар</option>
                                            {this.state.profit.products.map((x, index) => {
                                                return (
                                                    <option key={index} value={x} name="nameProduct" >{x}</option >
                                                )
                                            })}
                                        </select>
                                    </div>


                                    <div className="post-input-form">
                                        <input
                                            type="number"
                                            className=""
                                            placeholder="Количество"
                                            name="count"
                                            min="0"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="post-input-form">
                                        <input
                                            type="number"
                                            min="0"
                                            className=""
                                            placeholder="Цена за ед."
                                            name="price"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div>
                                        <Button className="post-input-form-button" onClick={this.handleSubmit}>
                                            Создать
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>}
            </div>
        )
    }
}