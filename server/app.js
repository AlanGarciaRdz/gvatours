

const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');




const html5pdf = require("html5-to-pdf");
const path = require("path")

const app = express();

require('dotenv').config(); //Read the .env vars

var helmet = require('helmet');
app.use(helmet());

const client_model = require('./db/models/clients')
const user_model = require('./db/models/users')
const login_model = require('./db/models/login')
const travelA_model = require('./db/models/travelagencies')
const hotel_model = require('./db/models/hotels')
const cupon_model = require('./db/models/cupon')
const receipt_model = require('./db/models/receipts')
const transport_model = require('./db/models/transportcontracts')


const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send({"status": "GVA TOURS API SERVICE A-OK"});
})


//DATABASE Clients
app.get('/clients', client_model.getClients)
app.get('/clients/:uuid_client', client_model.getClientById)
app.post('/clients', client_model.createClient)
app.put('/clients/:uuid_client', client_model.updateClient) 
app.delete('/clients/:uuid_client', client_model.deleteClient)

//DATABASE Login
app.post('/Login', login_model.signin)

//DATABASE Users
app.get('/Users', user_model.getUsers)
app.get('/Users/:uuid_user', user_model.getUserById)
app.post('/Users', user_model.createUser)
app.put('/Users/:uuid_user', user_model.updateUser) 
app.delete('/Users/:uuid_user', user_model.deleteUser)


//DATABASE Travel Agencies
app.get('/TravelA', travelA_model.getTravelA)
app.get('/TravelA/:uuid_travelA', travelA_model.getTravelAById)
app.post('/TravelA', travelA_model.createTravelA)
app.put('/TravelA/:uuid_travelA', travelA_model.updateTravelA) 
app.delete('/TravelA/:uuid_travelA', travelA_model.deleteTravelA)

//DATABASE Hotel
app.get('/Hotels', hotel_model.getHotel)
app.get('/Hotels/:uuid_hotel', hotel_model.getHotelById)
app.post('/Hotels', hotel_model.createHotel)
app.put('/Hotels/:uuid_hotel', hotel_model.updateHotel) 
app.delete('/Hotels/:uuid_hotel', hotel_model.deleteHotel)

//DATABASE Cupon
app.get('/Cupon', cupon_model.getCupon)
app.get('/Cupon/:uuid_cupon', cupon_model.getCuponByIdFE)
app.post('/Cupon', cupon_model.createCupon)
app.put('/Cupon/:uuid_cupon', cupon_model.updateCupon) 
app.delete('/Cupon/:uuid_cupon', cupon_model.deleteCupon)

//DATABASE Receipts
app.get('/Receipts', receipt_model.getReceipts)
app.get('/Receipts/:uuid_receipt', receipt_model.getReceiptById)
app.post('/Receipts', receipt_model.createReceipt)
app.put('/Receipts/:uuid_receipt', receipt_model.updateReceipt) 
app.delete('/Receipts/:uuid_receipt', receipt_model.deleteReceipt)

//DATABASE Transport
app.get('/TransportC', transport_model.getTransportC)
app.get('/TransportC/:uuid_contract', transport_model.getTransportCByIdFE)
app.post('/TransportC', transport_model.createTransportC)
app.put('/TransportC/:uuid_contract', transport_model.updateTransportC) 
app.delete('/TransportC/:uuid_contract', transport_model.deleteTransportC)

//RAWS endpoints
app.get('/raw/Cupon/:uuid_cupon', cupon_model.getCuponById)
app.get('/raw/TransportC/:uuid_contract', transport_model.getTransportCById)




// const contrato = require('./documents/contrato_transporte')
// const recibo = require('./documents/recibo')
// const cupon = require('./documents/cupon')

// // POST - PDF generation

// app.post('/contrato-transporte', (req, res) => {
//     pdf.create(contrato(req.body), {}).toFile('result.pdf', (err) => {
//         if(err){
//             console.log(err)
//             res.send(Promise.reject());
//         }
//         res.send(Promise.reject());
        
//     })
// })

// app.post('/cupon', (req, res) => {
//     pdf.create(cupon(req.body), {}).toFile('result.pdf', (err) => {
//         if(err){
//             res.send(Promise.reject());
//         }
//         res.send(Promise.reject());
//     })
// })

// app.post('/recibo', (req, res) => {
//     pdf.create(recibo(req.body), {}).toFile('result.pdf', (err) => {
//         if(err){
//             res.send(Promise.reject());
//         }
//         res.send(Promise.reject());
//     })
// })


// // GET - send the generated PDF to the client 

// app.get('/fetch-pdf', (req, res) => {
//     res.sendFile(`${__dirname}/result.pdf`)
// })

app.listen(port, () => console.log(`1 listening port ${port}`));