import React, { Component } from 'react';
import '../styles/FoodCard.scss';
import axios from 'axios';


export default class Card extends Component {
    constructor(props){
        super(props);
        this.modalForm = React.createRef();
        

    }
    state = {
        checked: true,
        data:{}
    }

    onToggle = (checked) => {
        this.setState({ 
            checked:!checked
        });
        window.location = 'http://localhost:3000/myplate';
      }
    
    //closes the Modal
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
        this.onToggle();
      };
    
    //POST request for Modal
    onSave = e => {
        e.preventDefault(e);
        debugger;
        console.log('modalform, ',this.modalForm.current);
        const body = {
            _id:this.state.data._id,
            name: this.state.data.name,
            message: this.modalForm.current.value,
            date:this.state.data.date
        }
        if (body.name === "") {
            body.name = this.state.data.name;
        }
        if (body.message === "") {
            alert("Let us know your message");
            return false;
        }
        let current_datetime = new Date();
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        let date_list = body.date;
        date_list.push(formatted_date);
        body.date = date_list;
        
        // let postUrl = "http://localhost:8080/myplate";

        // console.log(body)

        // let config = {
        //     method: "POST",
        //     url: postUrl,
        //     data: body,
        //     headers: {
        //       'content-type': 'application/json'
        //     }};
      
        // console.log(config.data);

            const id = this.props.match.params.id;
            axios.put(`http://localhost:8080/myplate/${id}`,body)
            .then((resp) =>
                console.log(resp))
            .catch((err) =>
                console.log(err))
                
          //e.target.reset();
          this.onToggle();
    }



    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8080/myplate/${id}`)
          .then(res => {
            this.setState({
              data: res.data
            })
          }
          )
      }
      componentDidUpdate(prevProps,prevState) {
        if(this.props.data != null && prevState.data.date.length !== this.state.data.length) {
            axios.get(`http://localhost:8080/myplate/${this.data._id}`).then(res => {
            this.setState({
                data: res.data
            })
        })
    }
    }



  render() {
     let pic = this.state.data;
    // console.log('pic: ',pic);
    // if (pic === {}) {
    //     console.log('loading');
    //     return null;
    // }
    if(!this.state.checked){
        return null;
    }
    return (
        
        <div className="overlay">
            <div className="modal" >
                <h1 className="modal__create">FOOD DETAILS</h1>
                <div className='modal__container'>
                    <img className="food_item" src={pic.imgURL} alt={"food item"}/>
                    <div className='modal__texts'>
                        <h3>name: {pic.name}</h3>
                        <h3>type: {pic.type}</h3>
                        <h3>number of times eaten: {pic.date}</h3>
                    </div>
                </div>
                <div className="modal__description">
                        <label className="modalLabel">FOOD DETAILS
                            <textarea className="modal__textarea" ref={this.modalForm} type="text" name="description" placeholder={pic.message}/>
                        </label>
                </div> 
                <div className="modal__buttons">
                        <button className="modal__save" type="submit" onClick={this.onSave}>SAVE</button>
                        <button className="modal__cancel" onClick={this.onToggle}>CANCEL</button>
                </div>
            </div>
        </div>
    )
  }
}
