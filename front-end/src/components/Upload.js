import React, {Component} from 'react';
import '../styles/Upload.scss';
import ReactS3Uploader from 'react-s3-uploader';
import axios from 'axios';
import MyPlate from './MyPlate';

let url = 'http://localhost:8080/myplate';
export default class Header extends Component {
    constructor(props){
        super(props);
        this.imgURL = '';
        this.state={
            url:url,
            upload_message:"Upload Status",
            plate:[]
        }
        this.uploadImage = React.createRef();
    }


    componentDidMount() {
        axios.get(url).then(res=>{
            this.setState(()=>{
                if (res.data !== undefined) {
                    return {plate:res.data}
                } else {
                    return {}
                }
            })
        }).catch(err=>{
            console.log('There is no pics in the food list, please upload a food pic');
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.plate.length !== this.state.plate.length) {
            axios.get(url).then(res=>{
                this.setState(()=>{
                    if (res.data !== undefined) {
                        return {plate:res.data}
                    } else {
                        return {}
                    }
                })
            }).catch(err=>{
                console.log('loading myplate data');
            });
        }
    }
    submitForm = (e)=>{
        e.preventDefault();
        let textinput = this.uploadImage.current.message.value;
        let img_src = this.imgURL;
        let obj = {
            url:img_src,
            msg:textinput
        }
        let newUpload = {
            method:"POST",
            url:"http://localhost:8080/myplate",
            data:obj,
            headers:{"content-type":"application/json"}
        }
        axios(newUpload)
            .then(retval=>{
                this.setState({upload_message:"Your food has been uploaded and recognized:)"})
                // comment out ,this.forceUpdate()
                axios.get(url)
                    .then(res=>{
                        this.setState(()=>{
                            if (res.data !== undefined) {
                                return {plate:res.data}
                            } else {
                                return {}
                            }
                        })  
                    })
                    .catch(err=>{
                        console.log('There is no pics in the food list, please upload a food pic');
                    });
            })
            .catch(err=>{
                this.setState({upload_message:'Sorry, I don\'t know this food'})
                // comment out ,this.forceUpdate()
            }
        );
        let food_form = document.getElementById('food_form');
        food_form.reset();
    }

    render() {
        if (!this.state.plate) {
               return 'loading'; 
        }
        else return (
            <div className='uploadSection'>
                <form id="food_form" ref={this.uploadImage} className="box" method="post" action="" encType="multipart/form-data">
                    <h2 className='upload_title'>Upload Your Food Photo</h2>
                    <div className="box__input">
                        <ReactS3Uploader
                            signingUrl="/s3/sign"
                            signingUrlMethod="GET"
                            accept="image/*"
                            s3path="/upload"
                            preprocess={this.onUploadStart}
                            onSignedUrl={this.onSignedUrl}
                            onProgress={this.onUploadProgress}
                            onError={this.onUploadError}
                            onFinish={(signResult, file) => {
                                this.imgURL = 'https://s3.us-west-1.amazonaws.com/linda.aqua.brainstation/' + file.name;
                                
                            }}
                            signingUrlWithCredentials={ false }      // in case when need to pass authentication credentials via CORS
                            uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
                            contentDisposition="auto"
                            scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
                            server="http://localhost:8080"
                            inputRef={cmp => this.uploadInput = cmp}
                            autoUpload={true}
                        /> 
                    </div>
                    <textarea className='msg_box' type='text' name='message' placeholder='your thoughts right now' />
                    <button className='submit_cta' name="box__button" onClick={this.submitForm} >Upload</button>
                    <div className="box__uploading">{this.state.upload_message}</div>
                </form>
                <MyPlate food_album={this.state.plate}/>
            </div>
            
            
        )
    }
}