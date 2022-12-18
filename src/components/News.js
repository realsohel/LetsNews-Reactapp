import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    capitalizeFirstLetter=(string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props){
        super(props);
        // console.log('helo');
        this.state={
            articles: [],
            loading: true,
            page: 0,
            totalResults: 0
        }

        document.title= `Newshub - ${this.capitalizeFirstLetter(this.props.category)}`;
    }
    
    async update(){
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aad1de2d61924190b7238f21bc37f8f1&page=${this.state.page }&pageSize=${this.props.pageSize}`
        this.setState({loading:true}/* LOADING*/);
        let data = await fetch(url);
        let parsed = await data.json();
        console.log(parsed);

        this.setState({
            articles: parsed.articles,
            totalResults : parsed.totalResults,
            loading: false,
            page: this.state.page + 1
        })
    }

    async componentDidMount(){
        this.update();
        // console.log("hii")
    }


    fetchMoreData = async ()=>{
        // this.setState({page: this.state.page + 1});
        
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aad1de2d61924190b7238f21bc37f8f1&page=${this.state.page }&pageSize=${this.props.pageSize}`
        // this.setState({loading:true}/* LOADING*/); 
        let data = await fetch(url);
        let parsed = await data.json();
        console.log(parsed);

        this.setState({
            articles: this.state.articles.concat(parsed.articles),
            totalResults : parsed.totalResults,
            page: this.state.page + 1
            // loading: false
        })

    }

    render() {
        // console.log('noo');
        return (
        <>
                <h2 className={`text-center my-3 text-${this.props.text}`}>  Fastest & Latest News here. </h2>
                <h3 className={`text-center my-3 text-${this.props.text}`}> {this.capitalizeFirstLetter(this.props.category)} Category</h3>
                {this.state.loading && <Spinner /> }
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={ this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                    >
                    <div className="container">
                        <div className="row ">
                        {this.state.articles.map((element)=>{
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem text={this.props.text} mode={this.props.mode} title={element.title?element.title.slice(0,45):""} 
                                description={element.description?element.description.slice(0,80):""} Imageurl={element.urlToImage} newsurl={element.url}
                                author={element.author} date={element.publishedAt}/>
                            </div>
                            
                        })}
                        </div>
                    </div>

                    </InfiniteScroll>
                

                
        </>
        )
    }
}

export default News
