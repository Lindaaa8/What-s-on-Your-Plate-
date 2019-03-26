import React, {Component} from 'react';
import '../styles/MyPlate.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';


export default class MyPlate extends Component {

    constructor(props){
        super(props);
        this.state = {
            show:false,
            plate:this.props.plate
        }
    }
    componentDidMount() {
        axios.get('http://localhost:8080/myplate').then(res => {
          this.setState({
            plate: res.data
          })
        })
      }
    
      componentDidUpdate(prevProps,prevState) {
        if(this.props.plate != null && prevState.plate.length !== this.state.plate.length) {
            axios.get('http://localhost:8080/myplate').then(res => {
            this.setState({
                plate: res.data
            })
            })
        }
    }

      
    showModal = e => {
        this.setState({
            show: !this.state.show
        });
    }
    
      onClick = (e) => {
        this.showModal();
      }
    
      onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };

    render() {
        let album = this.props.food_album;
        return (
            <article className='album'>
                <h2 className='album__title'>My Food Journal</h2>
                <section className="album__container">
                {album.map((pic,index)=> 
                    //to={`/myplate/${pic._id}`} id={index.toString()}
                    <Link to={`/myplate/${pic._id}`} id={index.toString()} className='photo__container' key={index.toString()} style={{textDecoration:'none'}} onClick={this.onClick}>
                            <div className='album__img' > 
                                <img src={pic.imgURL} alt={index.toString()}/>
                            </div>
                    </Link>
                )}
                </section>
            </article>);
    }
}