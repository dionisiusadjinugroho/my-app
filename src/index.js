import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";
import moment from "moment";

//Initial Global Redux State
const globalState = {
  companyName: "",
  companyAddress: "",
  companyRevenue: "",
  companyPhone: [],
  listCompany: [],
  officeName: "",
  officeLocLatitude: "",
  officeLocLongitude: "",
  officeStartDate: moment(),
  officeCompany: "",
  listOffice: [],
  clickedcompanyid: "",
};

//Fetching GET List Company
fetch("http://localhost:4242/Company")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log("data company:", data);
    globalState.listCompany = data;
  });

//Fetching GET List Office
fetch("http://localhost:4242/Office")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log("data office:", data);
    globalState.listOffice = data;
  });

//Reducer
const rootReducer = (state = globalState, action) => {
  
  ///Global Action Redux
  //Handle Add Company
  if (action.type === "ADD_COMPANY") {
    // console.log("action.text", action.text);

    //Insert to JSON Server
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: action.text,
        datacompanyName: state.companyName,
        datacompanyAddress: state.companyAddress,
        datacompanyRevenue: state.companyRevenue,
        datacompanyPhone: state.companyPhone,
      }),
    };
    fetch("http://localhost:4242/Company", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("success post add company:", data);
      });
    
    //Add to Global State
    var curlist = state.listCompany;
    curlist.push({
      id: action.text,
      datacompanyName: state.companyName,
      datacompanyAddress: state.companyAddress,
      datacompanyRevenue: state.companyRevenue,
      datacompanyPhone: state.companyPhone,
    });
    return {
      ...state,
      listCompany: curlist,
    };
  }

  //Handle Change Input Company Name
  if (action.type === "INPUT_COMPANY_NAME") {
    return {
      ...state,
      companyName: action.text,
    };
  }

  //Handle Change Input Company Address
  if (action.type === "INPUT_COMPANY_ADDRESS") {
    return {
      ...state,
      companyAddress: action.text,
    };
  }

  //Handle Change Input Company Revenue
  if (action.type === "INPUT_COMPANY_REVENUE") {
    return {
      ...state,
      companyRevenue: action.text,
    };
  }

  //Handle Change Input Company Phone
  if (action.type === "INPUT_COMPANY_PHONE") {
    // console.log(action.data);
    return {
      ...state,
      companyPhone: action.data,
    };
  }

  //Handle Change Remove Data Company from List Company
  if (action.type === "REMOVE_COMPANY") {
    // console.log("action.iddata",action.iddata);
    // console.log(state.listCompany);

    fetch(`http://localhost:4242/Company/${action.iddata}`, {
      method: "DELETE",
    }).then(() => {
      console.log("delete company success");
    });

    return {
      ...state,
      listCompany: state.listCompany.filter(
        (item) => item.id !== action.iddata
      ),
    };
  }

  //Handle Change Input Office Name
  if (action.type === "INPUT_OFFICE_NAME") {
    // console.log('action.text',action.text);
    return {
      ...state,
      officeName: action.text,
    };
  }

  //Handle Change Input Office Location
  if (action.type === "INPUT_OFFICE_LOCATION_LATITUDE") {
    return {
      ...state,
      officeLocLatitude: action.text,
    };
  }

  //Handle Change Input Office Location
  if (action.type === "INPUT_OFFICE_LOCATION_LONGITUDE") {
    // console.log("action.text data office longitude: ", action.text);

    return {
      ...state,
      officeLocLongitude: action.text,
    };
  }

  //Handle Change Input Office Start Date
  if (action.type === "INPUT_OFFICE_START_DATE") {
    // console.log('action.text date: ',action.text);
    // console.log(state);
    return {
      ...state,
      officeStartDate: action.text,
    };
  }

  //Handle Change Input Office Company
  if (action.type === "INPUT_OFFICE_COMPANY") {
    // console.log('action.text data office company: ',action.text);
    // console.log(state);
    return {
      ...state,
      officeCompany: action.text,
    };
  }

  //Handle Add Office to List Office
  if (action.type === "ADD_OFFICE") {
    // console.log("action.text data: ", action.text);
    // console.log(state);

    //Insert to Global State List Office
    var curlist = state.listOffice;
    var newdata = action.text;
    curlist.push({
      id: newdata.id,
      dataofficeName: newdata.dataofficeName,
      dataofficeLocLatitude: newdata.dataofficeLocLatitude,
      dataofficeLocLongitude: newdata.dataofficeLocLongitude,
      dataofficeStartDate: newdata.dataofficeStartDate,
      dataofficeCompany: newdata.dataofficeCompany,
    });

    //Insert to JSON Server
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: newdata.id,
        dataofficeName: newdata.dataofficeName,
        dataofficeLocLatitude: newdata.dataofficeLocLatitude,
        dataofficeLocLongitude: newdata.dataofficeLocLongitude,
        dataofficeStartDate: newdata.dataofficeStartDate,
        dataofficeCompany: newdata.dataofficeCompany,
      }),
    };
    fetch("http://localhost:4242/Office", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("success post add office:", data);
      });

    return {
      ...state,
      listOffice: curlist,
    };
  }
  //Handle Selected Company id for data in Page2
  if (action.type === "CLICKED_COMPANY") {
    // console.log('state.clickedcompanyid',action.text)
    return {
      ...state,
      clickedcompanyid: action.text,
    };
  }

  //Handle Remove Data Office from List Office
  if (action.type === "REMOVE_OFFICE") {
    // console.log("action.iddata", action.iddata);

    //Delete from JSON Server
    fetch(`http://localhost:4242/Office/${action.iddata}`, {
      method: "DELETE",
    }).then(() => {
      console.log("delete office success");
    });

    //DELETE from Global State List Office
    return {
      ...state,
      listOffice: state.listOffice.filter((item) => item.id !== action.iddata),
    };
  }
  return state;
};

//Store
const storeRedux = createStore(rootReducer);

ReactDOM.render(
  <Provider store={storeRedux}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
