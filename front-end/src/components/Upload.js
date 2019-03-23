import React, {Component} from 'react';
import '../styles/Upload.scss';
import ReactS3Uploader from 'react-s3-uploader';
import axios from 'axios';
export default class Header extends Component {
    constructor(){
        super();
        this.imgURL = '';
        this.state={
            plate:[],
            
        }
        this.uploadImage = React.createRef();
    }

    // componentDidMount() {
    //     axios.get()
    // }
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
        axios(newUpload).then(
            retval=>{
                console.log('successfully upload');
            }
        ).catch(
            err=>{
                console.log("fail to post new Upload");
            }
        );
        let food_form = document.getElementById('food_form');
        food_form.reset();
    }
    render() {
        return (
            <form id="food_form" ref={this.uploadImage} className="box" method="post" action="" encType="multipart/form-data">
                <div className="box__input">
                    {/* <input class="box__file" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple /> */}
                    {/* <label for="file"><strong>Choose a file</strong><span class="box__dragndrop"> or drag it here</span>.</label> */}
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
                    <textarea className='msg_box' type='text' name='message' placeholder='What are you thinking right now' />
                    <button className='submit_cta' name="box__button" onClick={this.submitForm} >Upload</button>
                </div>
                <div className="box__uploading">Uploading&hellip;</div>
                <div className="box__success">Done!</div>
                <div className="box__error">Error! <span></span>.</div>
            </form>
            
        )
    }
}