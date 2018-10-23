import React, {Component} from 'react';
// import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from './component/Login';
import Main from './component/Main';
import './App.css';
// import 'antd/dist/antd.css';

class App extends Component {

    async componentDidMount() {
        // const respon = await axios.post('/login',{name: "lhw", password: "333"});
        //     // console.log(respon);
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Route path={"/login"} component={Login}/>
                        <Route path={"/"} component={Main}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
