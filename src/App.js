
// import './App.css';

import React, { useState } from 'react'
import Navbar from "./components/Navbar";
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'


import { BrowserRouter , Routes,Route, } from "react-router-dom";

const  App = ()=> {
  
    const [mode , setmode] = useState('light');
    const [textmode , settextmode] = useState('dark');
    const[progress , setProgress] = useState(0);

    
  
    const togglemode = ()=>{
      if(mode==='light'){
        setmode('dark');
        settextmode('light');
        document.body.style.backgroundColor='#171717';
        console.log(mode);
      }
      else{
          setmode('light');
          settextmode('dark');
          document.body.style.backgroundColor='white';
          console.log(mode);
        }
    }
  const pageSize = 6;

  
  
    return (
      <>
      <BrowserRouter> 
      <LoadingBar
      height={3}
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        // onLoaderFinished={() => setProgress(0)}
      />

      <Navbar mode={mode} text={textmode} togglemode={togglemode}/>
      <Routes>
        <Route exact path={"/"} element={<News setProgress={setProgress}  key="general" pageSize={pageSize} country={"in"} category={"general"} mode={mode} text={textmode}/>} />
        
        <Route exact path={"/business"} element={<News setProgress={setProgress} key="business" pageSize={pageSize} country={"in"} category={"business"} mode={mode} text={textmode}/>} />
        
        <Route exact path={"/entertainment"} element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} country={"in"} category={"entertainment"} mode={mode} text={textmode}/>} />
        
        <Route exact path={"/health"} element={<News setProgress={setProgress} key="health" pageSize={pageSize} country={"in"} category={"health"} mode={mode} text={textmode}/>} />
        
        <Route exact path={"/science"} element={<News setProgress={setProgress} key="science" pageSize={pageSize} country={"in"} category={"science"} mode={mode} text={textmode}/>} />
        
        <Route exact path={"/sports"} element={<News setProgress={setProgress} key="sports" pageSize={pageSize} country={"in"} category={"sports"} mode={mode} text={textmode}/>} />
        
        <Route exact path={"/technology"} element={<News setProgress={setProgress} key="technology" pageSize={pageSize} country={"in"} category={"technology"} mode={mode} text={textmode}/>} />
      </Routes>
      </BrowserRouter>
      </>
    )
  
}

export default App 