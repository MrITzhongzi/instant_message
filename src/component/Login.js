import React from 'react';
import {Button, Input, Modal} from 'antd';
import { LoginApi } from "../api/LoginApi";
import './style/login.css';

class Login extends React.Component {
    state = {
        username: "",
        password: "",
    };

    componentDidMounted() {

    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin = async () => {
        const data = {
            name: this.state.username,
            password: this.state.password
        };
        const respData = await LoginApi(data);
        if(respData.status === "ok"){
            localStorage.setItem("qluser", this.state.username);
            this.props.history.push("/");
            return;
        };
        Modal.info({
            title: "提示",
            content: "用户名或者密码错误。"
        })
    }

    render() {
        return <div className={'login-box'}>
            <div className={'login-con'}>
                <h4 className={'login-title'}>登陆</h4>
                <Input className={'login-input'} onChange={this.handleUsername} placeholder="请输入用户名"/>
                <Input className={'login-input'} onChange={this.handlePassword} placeholder="请输入密码"/>
                <Button type={"primary"} onClick={this.handleLogin} className={"login-btn"}>登录</Button>
            </div>
        </div>
    }
}

export default Login;
