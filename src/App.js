
// import './App.css';

import React, { Component } from 'react'
import Navbar from "./components/Navbar";
import News from './components/News';

import { BrowserRouter , Routes,Route, } from "react-router-dom";

export default class App extends Component {
  constructor(){
    super();
    this.state={
      mode:'light',
      textmode:'dark'
    }
  }
  togglemode = ()=>{
    if(this.state.mode==='light'){
      this.setState({
        mode:"dark",
        textmode:'light'
      });
      console.log(this.state.mode)
      // settextmode('light');
      document.body.style.backgroundColor='#171717';
    }
    else{
      this.setState({
        mode:"light",
        textmode:'dark'
      });
      console.log(this.state.mode)
        // settextmode('dark');
        document.body.style.backgroundColor='white';
      }
  }
  render() {
    return (
      <>
      <BrowserRouter> 
      <Navbar mode={this.state.mode} text={this.state.textmode} togglemode={this.togglemode}/>
      <Routes>
        <Route exact path={"/"} element={<News key="general" pageSize={9} country={"in"} category={"general"} mode={this.state.mode} text={this.state.textmode}/>} />
        
        <Route exact path={"/business"} element={<News key="business" pageSize={9} country={"in"} category={"business"} mode={this.state.mode} text={this.state.textmode}/>} />
        
        <Route exact path={"/entertainment"} element={<News key="entertainment" pageSize={9} country={"in"} category={"entertainment"} mode={this.state.mode} text={this.state.textmode}/>} />
        
        <Route exact path={"/health"} element={<News key="health" pageSize={9} country={"in"} category={"health"} mode={this.state.mode} text={this.state.textmode}/>} />
        
        <Route exact path={"/science"} element={<News key="science" pageSize={9} country={"in"} category={"science"} mode={this.state.mode} text={this.state.textmode}/>} />
        
        <Route exact path={"/sports"} element={<News key="sports" pageSize={9} country={"in"} category={"sports"} mode={this.state.mode} text={this.state.textmode}/>} />
        
        <Route exact path={"/technology"} element={<News key="technology" pageSize={9} country={"in"} category={"technology"} mode={this.state.mode} text={this.state.textmode}/>} />
      </Routes>
      </BrowserRouter>
      </>
    )
  }
}

