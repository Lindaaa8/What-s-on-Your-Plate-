import React, { Component } from 'react';
import '../styles/FoodCard.scss';
import axios from 'axios';
import Switch from 'react-switch';


export default class FoodCard extends Component {
    constructor(props){
        super(props);
        this.modalForm = React.createRef();
        

    }
    state = {
        checked: false
    }

    onToggle = (checked) => {
        this.setState({ 
            checked
        });
      }
    
    //closes the Modal
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };
    
    //POST request for Modal
    onSave = e => {
        e.preventDefault(e);
        const body = {
            _id:this.props.pic._id,
            name: this.modalForm.current.product.value,
            message: this.modalForm.current.description.value,
            date:this.props.pic.date
        }
        if (body.name === "") {
            body.name = this.props.pic.name;
        }
        if (body.message === "") {
            alert("Let us know your message");
            return false;
        }
        if (this.state.checked) {
            let current_datetime = new Date();
            let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
            let date_list = body.date;
            date_list.push(formatted_date);
            body.date = date_list;
        }
        let postUrl = "http://localhost:8080/myplate";

        console.log(body)

        let config = {
            method: "POST",
            url: postUrl,
            data: body,
            headers: {
              'content-type': 'application/json'
            }};
      
            console.log(config.data);
            axios(config)
            .then((resp) =>
                console.log(resp))
            .catch((err) =>
                console.log(err))
                
          e.target.reset();
          this.props.onClose && this.props.onClose(e);
    }

  render() {
     let pic = this.props.pic;
    if(!this.props.show){
        console.log(this.props.show);
        console.log("null");
        console.log(this.props.pic);
        return null;
    }
    console.log('yes');
    return (
        <div className="overlay">
            <div className="modal">
                <div>
                <h1 className="modal__create">Update Food Information</h1>
                </div>
                <form className="modal__new" ref={this.modalForm} onSubmit={this.onSave}>
                    <div className="modal__main">
                        <div className="model__pic">
                            <img src={pic.imgURL} alt="food pic"/>
                        </div>
                        <label className="modalLabel__left">FOOD NAME
                            <input className="modal__input" type="text" name="product" placeholder={pic.name}/>
                        </label>
                        <label className="modalLabel__left">LAST ORDERED DATE
                            <input className="modal__input" type="text" name="date" placeholder={pic.date[(pic.date.length)-1]}/>
                        </label>
                        <label className="modalLabel__left">ORDERED TIMES: {pic.date.length}
                        </label>
                       
                        <label className="modalLabel">ONE MORE
                            <div className="modal__toggle">
                                <span className="modal_instock">In Stock</span>
                                <Switch className="react-switch"
                                    onChange={this.onToggle}
                                    checked={this.state.checked}
                                    checkedIcon = {false}
                                    uncheckedIcon ={false} />
                            </div>
                        </label>
                    </div>
                    <div className="modal__description">
                        <label className="modalLabel">FOOD DETAILS
                            <textarea className="modal__textarea" type="text" name="description" placeholder={this.props.message}/>
                        </label>
                    </div>  
                    <div className="modal__buttons">
                        <button className="modal__save" type="submit">SAVE</button>
                        <button className="modal__cancel" onClick={this.onClose}>CANCEL</button>
                    </div>
                </form>
            </div>
        </div>
    )
  }
}
