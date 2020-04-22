//https://www.youtube.com/watch?time_continue=1&v=bt1tOhUYxvM&feature=emb_title

import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver'


class Work extends React.Component{

  constructor(props){
    super(props)

    this.state ={
      name: '',
      receiptId: 0,
      price1: 0,
      price2: 0,
    }

    this.handleChange = this.handleChange.bind(this)
    this.createContrato = this.createContrato.bind(this)
    this.createRecibo = this.createRecibo.bind(this)
    this.createCupon = this.createCupon.bind(this)
  }

  handleChange = ({target: {value,name}}) => this.setState({[name]: value})
  
  createContrato(){
      axios.post('/contrato-transporte', this.state)
      .then(() => axios.get('/fetch-pdf', {responseType: 'blob'}))  //blob : raw data represent chunk of bytes 
      .then((res) => {
        const pdfBlob = new Blob([res.data], {type: 'application/pdf'})

        saveAs(pdfBlob, 'newPdf3.pdf')
      })
  }

  createRecibo(){
    axios.post('/recibo', this.state)
    .then(() => axios.get('/fetch-pdf', {responseType: 'blob'}))  //blob : raw data represent chunk of bytes 
    .then((res) => {
      const pdfBlob = new Blob([res.data], {type: 'application/pdf'})

      saveAs(pdfBlob, 'newPdf2.pdf')
    })
  }

  createCupon(){
    axios.post('/cupon', this.state)
    .then(() => axios.get('/fetch-pdf', {responseType: 'blob'}))  //blob : raw data represent chunk of bytes 
    .then((res) => {
      const pdfBlob = new Blob([res.data], {type: 'application/pdf'})

      saveAs(pdfBlob, 'newPdf2.pdf')
    })
  }

  render(){
    return (
      <div className="App">

        <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
        <input type="number" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange}/>
        <input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange}/>
        <input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange}/>
  
        <button onClick={this.createContrato}>
          contrato
        </button>

        <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
        <input type="number" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange}/>
        <input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange}/>
        <input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange}/>
  
        <button onClick={this.createRecibo}>
          Recibo dinero
        </button>

        <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
        <input type="number" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange}/>
        <input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange}/>
        <input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange}/>
  
        <button onClick={this.createCupon}>
            cupon servicios
        </button>
      </div>
    );
  }
  
}
  

export default Work;