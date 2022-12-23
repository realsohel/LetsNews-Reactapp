import React, { useEffect , useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const  News =(props)=> {

    const capitalizeFirstLetter=(string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const[articles , setArticles] = useState([]);
    const[loading , setLoading] = useState(true);
    const[page , setPage] = useState(0);
    const[totalResults , setTotalResults] = useState(0);
        
    
    const update= async()=>{
        props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page }&pageSize=${props.pageSize}`
        
        props.setProgress(25);
        setLoading(true/* LOADING*/);
        let data = await fetch(url);
        
        props.setProgress(50);
        let parsed = await data.json();
        
        props.setProgress(75);
        console.log(parsed);

        setArticles(parsed.articles);
        setTotalResults(parsed.totalResults);
        setLoading(false);
        setPage(page+1);
        
        props.setProgress(100);
    }

    useEffect(()=>{
    document.title= `Newshub - ${capitalizeFirstLetter(props.category)}`;
        update();
        // eslint-disable-next-line 
    }, [])


    


    const fetchMoreData = async ()=>{
        // this.setState({page: this.state.page + 1});
        
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page +1}&pageSize=${props.pageSize}`
        // this.setState({loading:true}/* LOADING*/); 
        let data = await fetch(url);
        let parsed = await data.json();
        console.log(parsed);

        setArticles(articles.concat(parsed.articles));
        setTotalResults(parsed.totalResults);
        setPage(page + 1) ; 

        // this.setState({
        //     articles: this.state.articles.concat(parsed.articles),
        //     totalResults : parsed.totalResults,
        //     page: this.state.page + 1
        //     // loading: false
        // })

    }

    
        // console.log('noo');
        return (
        <>
                <h2 className={`text-center  text-${props.text}`} style={{margin: "35px 0px" ,marginTop: '90px'}}>  Fastest & Latest News here. </h2>
                <h3 className={`text-center my-3 text-${props.text}`}> {capitalizeFirstLetter(props.category)} Category</h3>
                {loading && <Spinner /> }
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={ articles.length !== totalResults}
                    loader={<Spinner/>}
                    >
                    <div className="container">
                        <div className="row ">
                        {articles.map((element)=>{
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem text={props.text} mode={props.mode} title={element.title?element.title.slice(0,45):""} 
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

export default News
