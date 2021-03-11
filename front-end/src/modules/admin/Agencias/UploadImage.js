import { Component } from "react";
import React  from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

class UploadImage extends Component {

    state = {
        selectedFile: null,
        progress: 0,
        errorMessage: ""
    }

    fileSelectedHandler = event => {
        this.setState({selectedFile: event.target.files[0]})

    }

    fileUploadFile = event => {
        const fd = new FormData()
        fd.append('files', this.state.selectedFile, this.state.selectedFile.name);
        axios.post(process.env.NODE_ENV === "development" ? /*"//52.7.16.247:19001/Upload"*/ "http://localhost:19001/Upload"  : "//52.7.16.247:19001/Upload", fd, {
          onUploadProgress: progressEvent => {

              this.setState({progress: Math.round(progressEvent.loaded / progressEvent.total * 100) + '%'} ) 
          }
        })
        .then(res => {
            
            localStorage.setItem('4e9e8ad1', `http://sistemagvatours.com/logos/${res.data.logo}`);
            localStorage.setItem('4c6a8493', res.data.base64);

        }).catch(e => {
            
            this.setState({errorMessage: e.response.data})
            this.setState({progress: 0 });
        })
    }

    render() {
        return(
            <>
            <input style={{display: 'none'}} 
            type='file' 
            onChange={this.fileSelectedHandler}
            ref={fileInput => this.fileInput = fileInput} />
            <Button variant="outlined" color="secondary" onClick={() => this.fileInput.click()}>Seleccionar Logo</Button>
            <Button variant="outlined" color="primary" href="#outlined-buttons" onClick={this.fileUploadFile}>Subir Logo</Button>
            
            <Box position="relative" display="inline-flex">
                <CircularProgress variant="determinate" />
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="caption" component="div" color="textSecondary">{this.state.errorMessage ? this.state.errorMessage : this.state.progress}</Typography>
                    
                    
                </Box>
                </Box>
            
            
            </>
        )
    }
}

export default UploadImage;