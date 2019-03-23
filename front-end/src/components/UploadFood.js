import React from 'react';
// import ApiClient from './ApiClient';  // where it comes from?
// import axios from 'axios';
// import add_icon from '../../../Assets/Icons/PNG/Icon-upload.png';
// import '../styles/UploadFood.scss';
// import ReactS3Uploader from 'react-s3-uploader';
var ReactS3Uploader = require('react-s3-uploader');



// function getSignedUrl(file, callback) {
//     const client = new ApiClient();
//     const params = {
//       objectName: file.name,
//       contentType: file.type
//     };
  
//     client.get('/my/signing/server', { params })   // what's that url?
//     .then(data => {
//       callback(data); // what should I get in callback?
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   }

   
export default class UploadFood extends React.Component{
    constructor(){
        super();
        this.state={
            plate:[]
        }
        this.submitForm = React.createRef();
    }
    // start(){
    //     console.log('start');
    // }
    // preprocess(file, next) {
    //     console.log('Pre-process: ' + file.name);
    //     next(file);
    // }
    onProgress(percent, message, file) {
        console.log('Upload progress: ' + percent + '% ' + message);
    }

    onError(message) {
        console.log("Upload error: " + message);
      }

    onSignedUrl(signingServerResponse) {
        console.log('Signing server response: ', signingServerResponse);
    }

    // componentDidMount() {
    //     axios.get('http://localhost:8080/myplate')
    //   .then(result => {
    //     this.setState({
    //       plate:result.data
    //     })
    //   }).catch(err=>{
    //       console.log(err);
    //   })
    // }
    render() {
        if (!this.state.plate) {
            return 'loading';
        } else {
            return (
                <form className='upload' ref={this.submitForm}>
                    {/* <h1>Upload section</h1>
                    <div className='upload__box'>
                        <img id='upload__icon' src={add_icon} alt="uploaded food"/>
                        <input type="file" accept="image/*" name="food_img" capture/>
                    </div>
                    <div className='upload__message'>
                        <input type="text" name="message" />
                    </div>
                    <input type="submit" value="Submit" /> */}



                    {/* <ReactS3Uploader
                        signingUrl="/s3/sign"
                        signingUrlMethod="GET"
                        accept="image/*"
                        s3path="/upload/"
                        preprocess={this.onUploadStart}
                        onSignedUrl={this.onSignedUrl}
                        onProgress={this.onUploadProgress}
                        onError={this.onUploadError}
                        onFinish={()=>{console.log('finishied!')}}
                        signingUrlWithCredentials={ true }      // in case when need to pass authentication credentials via CORS
                        uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
                        contentDisposition="auto"
                        scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
                        server="http://localhost:8080"
                        inputRef={cmp => this.uploadInput = cmp}
                        autoUpload={true}/>  */}
                        
                        {/* <ReactS3Uploader
                            className={uploaderClassName}
                            getSignedUrl={getSignedUrl}
                            accept="image/*"
                            onProgress={onProgress}
                            onError={onError}
                            onFinish={onFinish}
                            uploadRequestHeaders={{
                                'x-amz-acl': 'public-read'
                            }}
                            contentDisposition="auto"
                        />
                        */}
                </form>
                    
            )
        }
    }
}