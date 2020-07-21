import React, { Component } from 'react'
import './Pages.css'
import Axios from 'axios';
import { Button } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap'

export default class Home extends Component {
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
            productName: 'productName',
            token: 'tokenPlaceHolder',
            curTime: date.getFullYear() + "-" + month + "-" + day,
            productCreateResponse: '',
            profit: null,
            products: null,
            image: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    handleChange(e) {
        if (e.target.name == 'productName') {
            this.setState({ productName: e.target.value })
        }
    }

    handleImageChange(e) {
        e.preventDefault();
        let image = e.target.files[0];
        console.log("image", image);
        this.setState({ image: image })
    }

    createProduct = () => {
        // const headers = { Authorization: `${this.state.token}` };
        // console.log('token from createProduct', this.state.token);
        // console.log('productName', this.state.productName);
        // const requestParams = {
        //     method: 'post',
        //     url: 'http://localhost:8080/product/create',
        //     headers: headers,
        //     data: { productName: this.state.productName }
        // }

        // Axios(requestParams)
        //     .then(res => {
        //         if (res.status == 200) {
        //             console.log(res.data)
        //             if (res.data.id !== null) {
        //                 var formData = new FormData();
        //                 formData.append("image", this.state.image);
        //                 formData.append("productId", res.data.id);
        //                 Axios.post('http://localhost:8080/product/create/new', formData, {
        //                     headers: {
        //                         Authorization: `${this.state.token}`,
        //                         'Content-Type': 'multipart/form-data'
        //                     }
        //                 })
        //                 window.location.href = '/home';
        //             }
        //         }
        //     })
        //     .catch(error => {
        //         if (error.response.status == 400) {
        //             this.setState({ productCreateResponse: "Измените название" })

        //         }
        //     });
        var formData = new FormData();
        formData.append("image", this.state.image);
        formData.append("productName", this.state.productName);
        Axios.post('http://localhost:8080/product/create/new', formData, {
            headers: {
                Authorization: `${this.state.token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        window.location.href = '/home';
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
            url: 'http://localhost:8080/main?date=' + this.state.curTime,
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
                        <div className="block-1">
                            <div className="text">
                            <div>
                            <div className="prodaji2">
                            &emsp;&emsp;&ensp;&emsp;&emsp;Прибыль за день
                                </div>
                                <div className="profit-u" >
                                    {this.state.profit.usersProfitModels.map((x, index) => {
                                        return (
                                            <div value={index}>
                                                <div className="profit-u-title">
                                                    {x.fullName}
                                                </div>
                                                <div className="profit-u-earnings">
                                                    {x.earnings.map((x, index) => {
                                                        return (
                                                            <div className="earnings" value={index}>
                                                                <div className="earn-img">
                                                                    <img src={require(x.imagePath + "")} alt="" />
                                                                </div>
                                                                <div className="earnings-title">
                                                                    {x.productName}
                                                                </div>
                                                                <div className="earn-text">
                                                                    <div className="get-sales-text-left">
                                                                        Заработок: &emsp;&emsp;&ensp;
                                                                    <br></br>
                                                                    Время:
                                                            </div>
                                                                    <div className="get-sales-text-right">
                                                                        {x.earning} сом
                                                                    <br></br>
                                                                        {x.time[3] + ":" + x.time[4]}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <div>
                                                    <div className="profit-u-total">Сумма: {x.totalEarningsByDay} сом</div>
                                                    <div className="profit-u-date">Дата: {this.state.curTime}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="block-2">
                            <div className="text">
                                <div className="block-up">
                                    <div className="block-up-in">
                                    <div className="prodaji">
                                    товары
                                </div>
                                        {this.state.profit.productsModels.map((x, index) => {
                                            return (
                                                <div className="block-up-in-cart" value={index}>

                                                    <div className="get-sales-block">
                                                        <h1 className="title">{x.productName}</h1>
                                                        <p className="get-sales-text-left">
                                                            Количество:&emsp;&emsp;&ensp;<br></br>
                                                        Сумма:<br></br>
                                                        </p>
                                                        <p className="get-sales-text-right" >{x.countInStorage}<br></br>{x.totalPrice} сом</p>
                                                    </div>
                                                    <div className="block-img">
                                                        <img src={require(x.imagePath + "")} alt="" />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {/* {this.state.profit.productsModels.map((x, index) => {
                                        return (
                                            <h4 key={index}>{x.productName} {x.countInStorage} {x.totalPrice}</h4>
                                        )
                                    })} */}

                                </div>
                                <div className="block-down">
                                    <div>
                                        <h4>Создать товар</h4>
                                        <h6 className='error'>{this.state.productCreateResponse ? this.state.productCreateResponse : ''}</h6>
                                        <div>
                                            <input
                                                type="text"
                                                className="input-text"
                                                placeholder="Наименование товара"
                                                name="productName"
                                                noValidate
                                                onChange={this.handleChange}
                                            />

                                            <input
                                                className="input-img"
                                                type="file"
                                                name="image"
                                                onChange={this.handleImageChange}
                                            />
                                            <br></br>
                                            <Button className="input-button" onClick={this.createProduct}>
                                                Создать
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}</div>
        )
    }
}