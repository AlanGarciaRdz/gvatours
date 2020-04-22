import axios from "axios";

var baseURLENV = "";
console.log(process.env)

if (process.env.NODE_ENV === "development"){
  baseURLENV = "http://localhost:19001";
}

if (process.env.NODE_ENV === "production"){
  baseURLENV =  "http://www.sistemagvatours.com:19001";
}


export default axios.create({
  baseURL: baseURLENV
});


