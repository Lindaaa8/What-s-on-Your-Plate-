import React from 'react';
import Axios from 'axios';

export default class UploadAlbum extends React.Component{
    state = {
        myPlates:[]
    }
    componentDidMount() {
        Axios.get('http://localhost:8080/plate')
      .then(result => {
        this.setState({
          myPlates: result.data
        })
      })
    }
    render() {
        return()
    }
}