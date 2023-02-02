import './App.css'
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import LoadingBar from 'react-top-loading-bar'
import News from './components/News'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
export default class App extends Component {
  pagesize = 15;

  apiKey = process.env.REACT_APP_NEWS_API;

  state = {
    progress : 0
  }
  

  setProgress = (progress) => {
    this.setState({progress : progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route exact path="/" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} pagesize = {this.pagesize} country = "in" category = "general"/>}/>
            <Route exact path="/business" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pagesize = {this.pagesize} country = "in" category = "business"/>}/>
            <Route exact path="/entertainment" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} key ="entertainment" pagesize = {this.pagesize} country = "in" category = "entertainment"/>}/>
            <Route exact path="/general" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} key ="general" pagesize = {this.pagesize} country = "in" category = "general"/>}/>
            <Route exact path="/health" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} key ="health" pagesize = {this.pagesize} country = "in" category = "health"/>}/>
            <Route exact path="/science" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pagesize = {this.pagesize} country = "in" category = "science"/>}/>
            <Route exact path="/sports" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pagesize = {this.pagesize} country = "in" category = "sports"/>}/>
            <Route exact path="/technology" element = {<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pagesize = {this.pagesize} country = "in" category = "technology"/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}


