import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    capitalizeFirstLetter=(string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props){
        super(props);
        // console.log('helo');
        this.state={
            articles: [],
            loading: false,
            page: 1
        }

        document.title= `Newshub - ${this.capitalizeFirstLetter(this.props.category)}`;
    }
    
    async componentDidMount(){
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ce79fe9eb7c74651826b482f58d8b5da&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true}/* LOADING*/);
        let data = await fetch(url);
        let parsed = await data.json();
        console.log(parsed);

        this.setState({
            articles: parsed.articles,
            totalResults : parsed.totalResults,
            loading: false
        })
        // console.log("hii")
    }

    handlePrev=async ()=>{
        console.log("prev")
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ce79fe9eb7c74651826b482f58d8b5da&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true}/* LOADING*/);
        let data = await fetch(url);
        let parsed = await data.json();
        console.log(parsed);

        this.setState({
            articles: parsed.articles,
            page: this.state.page-1,
            loading:false
        })

    }

    handleNext=async ()=>{
        console.log("Next")
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ce79fe9eb7c74651826b482f58d8b5da&page=${this.state.page + 1 }&pageSize=${this.props.pageSize}`
            this.setState({loading:true} /* LOADING*/); 
            let data = await fetch(url);
            let parsed = await data.json();
            console.log(parsed);

            this.setState({
                articles: parsed.articles,
                page: this.state.page+1,
                loading:false
            })
        }
        
    }

    render() {
        // console.log('noo');
        return (
        <div>
            <div className={`container my-3 `}>
                <h2 className={`text-center my-3 text-${this.props.text}`}>  like share comment Fastest & Latest News here. </h2>
                <h3 className={`text-center my-3 text-${this.props.text}`}> {this.capitalizeFirstLetter(this.props.category)} Category</h3>
                {this.state.loading && <Spinner/> /* LOADING*/}  
                <div className="row ">
                    {!this.state.loading && this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem text={this.props.text} mode={this.props.mode} title={element.title?element.title.slice(0,45):""} 
                            description={element.description?element.description.slice(0,80):""} Imageurl={element.urlToImage} newsurl={element.url}
                            author={element.author} date={element.publishedAt}/>
                        </div>
                        
                    })}
                </div>

                <div className="container my-3 d-flex justify-content-between">
                    <button className="btn btn-primary" type="button" disabled={this.state.page<=1} onClick={this.handlePrev}> &laquo; Previous</button>
                    <button className="btn btn-primary"  disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNext}>Next  &raquo;</button>
                </div>
                <div className={`mx-3 text-${this.state.text}`}>
                    Page {this.state.page}
                </div>
            </div>
        </div>
        )
    }
}

export default News
