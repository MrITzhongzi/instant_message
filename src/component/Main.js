import React from 'react';
import {Button, Input, Modal, List} from 'antd';
import { GetMsgList, PostMsgApi } from "../api/MsgAPi";
import './style/main.css';

const { TextArea } = Input;

class Main extends React.Component {
    state = {
        msgList: [],
        sendMsg: "",
    };
    bottomDom=null;

    async componentDidMount(){
        if(!localStorage.getItem("qluser")){
            this.props.history.push("/login");
            return;
        }
        setInterval(await this.getMsg, 1000);
    }

    setViewInBottom = () => {
        this.bottomDom.scrollIntoView(true);
    }

    getMsg = async () => {
        const respData = await GetMsgList();
        if(respData.status === "ok") {
            this.setState({
                msgList: respData.msgList
            });
        }
        this.setViewInBottom();
    }
    handleSendMsgContent = (e) => {
        this.setState({
            sendMsg: e.target.value
        });
    }

    handleSendMsg = async () => {
        if(!this.state.sendMsg){
            Modal.info({
                title: "提示",
                content: "请输入内容"
            });
            return;
        }
        const data = {
            username: localStorage.getItem("qluser") ? localStorage.getItem("qluser") : "游客",
            msgContent: this.state.sendMsg
        };
        const respData = await PostMsgApi(data);
        console.log(respData);
        if(respData.status === "ok") {
            this.setState({
                sendMsg: ""
            });
        }
    }

    render() {
        const data = this.state.msgList;

        return <div className={'main-box'}>
            <div className={'main-content'}>
                <div className={"msg-list"} >
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        style={{}}
                        renderItem={item => (
                            <List.Item style={{border: "none"}}>
                                <List.Item.Meta
                                    style={{background: "#4596cc",padding: 5, borderRadius: 5}}
                                    title={<a href="void(0);">{<div>{item.userName}<span style={{fontSize: 12, color: "#cc501e",marginLeft: 5}}>{item.msgTime}</span></div>}</a>}
                                    description={<div >
                                        {item.msgContent}
                                    </div>}
                                />
                            </List.Item>
                        )}
                    />
                    <div ref={r => this.bottomDom = r}></div>
                </div>
                <div className={'middle-control'}>

                </div>
                <div className={'bottom-input'}>
                    <div>
                        <TextArea className={'input-content'} value={this.state.sendMsg} onChange={this.handleSendMsgContent} />
                    </div>
                    <div className={"send-btn-box"}>
                        <Button type={"primary"} onClick={this.handleSendMsg}>发送</Button>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Main;
