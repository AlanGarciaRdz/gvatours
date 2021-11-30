

const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const fileUpload = require('express-fileupload');




const html5pdf = require("html5-to-pdf");
const path = require("path")

const app = express();

require('dotenv').config(); //Read the .env vars

var helmet = require('helmet');
app.use(helmet());

app.use(fileUpload({
    limits: { fileSize: 550 * 1024 },
  }));

const client_model = require('./db/models/clients')
const user_model = require('./db/models/users')
const login_model = require('./db/models/login')
const travelA_model = require('./db/models/travelagencies')
const hotel_model = require('./db/models/hotels')
const cupon_model = require('./db/models/cupon')
const receipt_model = require('./db/models/receipts')
const transport_model = require('./db/models/transportcontracts')
const charter_model = require('./db/models/charters')

const image_manager = require('./src/image')



const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send({"status": "GVA TOURS API SERVICE A-OK"});
})


//UPLOAD
app.post('/upload', image_manager.UploadImage);

//DATABASE Clients
app.get('/clients', client_model.getClients)
app.get('/clients/:uuid_client', client_model.getClientById)
app.post('/clients', client_model.createClient)
app.put('/clients/:uuid_client', client_model.updateClient) 
app.delete('/clients/:uuid_client', client_model.deleteClient)

//DATABASE Cupon+ClientID
app.get('/ClientCupon/:uuid_client', cupon_model.getCuponByClientId)

//DATABASE Cupon
app.get('/Cupon', cupon_model.getCupon)
app.get('/Cupon/:uuid_cupon', cupon_model.getCuponByIdFE)
app.post('/Cupon', cupon_model.createCupon)
app.put('/Cupon/:uuid_cupon', cupon_model.updateCupon) 
app.delete('/Cupon/:uuid_cupon', cupon_model.deleteCupon)



//DATABASE Login
app.post('/Login', login_model.signin)

//DATABASE Users
app.get('/Users', user_model.getUsers)
app.get('/Users/:uuid_user', user_model.getUserById)
app.post('/Users', user_model.createUser)
app.put('/Users/:uuid_user', user_model.updateUser) 
app.delete('/Users/:uuid_user', user_model.deleteUser)
app.delete('/Users/system/:uuid_user', user_model.deleteSystemUser)



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



//DATABASE Receipts
app.get('/Receipts', receipt_model.getReceipts)
app.get('/Receipts/:uuid_receipt', receipt_model.getReceiptByIdFE)
app.post('/Receipts', receipt_model.createReceipt)
app.put('/Receipts/:uuid_receipt', receipt_model.updateReceipt) 
app.delete('/Receipts/:uuid_receipt', receipt_model.deleteReceipt)

//DATABASE Client+Receipts
app.get('/ClientReceipt/:uuid_client', receipt_model.getClientReceipts)

//DATABASE Charter
app.get('/Charters', charter_model.getCharters)
app.get('/Charters/filter/:iniciales', charter_model.getChartersFiltro)
app.get('/Charters/:uuid_charter', charter_model.getCharterByIdFE)
app.post('/Charters', charter_model.createCharter)
app.put('/Charters/:uuid_charter', charter_model.updateCharter) 
app.delete('/Charters/:uuid_charter', charter_model.deleteCharter)
app.patch('/Charters/:uuid_charter', charter_model.rollbackCharter)



//DATABASE Transport 
app.get('/TransportC', transport_model.getTransportC)
app.get('/TransportC/filter/:inicio/:fin', transport_model.getTransportCFiltrados)
app.get('/TransportC/:uuid_contract', transport_model.getTransportCById) //getTransportCByIdFE
app.post('/TransportC', transport_model.createTransportC)
app.put('/TransportC/:uuid_contract', transport_model.updateTransportC) 
app.delete('/TransportC/:uuid_contract', transport_model.deleteTransportC)




//RAWS endpoints
app.get('/raw/Cupon/:uuid_cupon', cupon_model.getCuponById)
app.get('/raw/TransportC/:uuid_contract', transport_model.getTransportCById)
app.get('/raw/Recepits:/uuid_recepit', receipt_model.getReceiptById)

app.listen(port, () => console.log(`1 listening port ${port}`));