import React, { Component} from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, Imageurl , newsurl , author , date } = this.props;
        return (

        <div>
            <div className={`card my-3 bg-${this.props.mode} text-${this.props.text}`} >
                <img src={Imageurl?Imageurl:"https://cdn.iconscout.com/icon/free/png-256/no-image-1771002-1505134.png"} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsurl} target="blank" className="btn btn-primary">read more</a>
                </div>
            </div>
        </div>
        )
    }
}

export default NewsItem
