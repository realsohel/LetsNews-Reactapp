import React, { Component } from 'react'
import loading from './loading.gif'
export class Spinner extends Component {
    render() {
        return (
        <div>
            <div className="container text-center my-3">
            <img src={loading} className="my-3" alt="" />
            </div>
        </div>
        )
    }
}

export default Spinner
