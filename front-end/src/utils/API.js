import axios from "axios";

var baseURLENV = "";
console.log(process.env)

if (process.env.NODE_ENV === "development"){
  baseURLENV = "http://localhost:3001";
}

if (process.env.REACT_APP_TEST_DB === "development_db"){
  baseURLENV = "//52.7.16.247:19001";
}

if (process.env.NODE_ENV === "production"){
  baseURLENV =  "//52.7.16.247:19001";
}


export default axios.create({
  baseURL: baseURLENV
});


