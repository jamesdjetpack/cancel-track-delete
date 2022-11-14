import {Button, Input, notification } from 'antd';
import axios from 'axios';
import React, { Component, useState, useEffect, useReducer} from "react";




export default function DeleteTracking () {

    const [listCanceledOrders, setListCanceledOrders] = useState();
    const [trackingList, setTrackingList] = useState();
    

    // TODO CLEAN UP AND PLACE CONSTANTS HERE

    // need a function to fetch all of the cancelled orders
    // Need a map of all of the cancelled orders with tracking numbers 
    // need to go through each one and cancel the order. 

    // some sort of verification 
    // maybe save a file to use for this feature 


    // Retrieve a list of orders that were cancelled
    // 
    // Return : list of orders that were in the canceled state 
    // Note: the list of orders may be in batches of 500
    const retrieveCanceledOrders = async () => {
        try{
            //### Credentials here are temporary. Change to .env variables later. 
            const MERCHANT = process.env.REACT_APP_TEST_MERCHANT
            const API_KEY = process.env.REACT_APP_TEST_API_KEY
            
            // Do not leave this here etc. ####
            const headersConfig = {
                    headers: {
                        'x-api-key': API_KEY,
                        'Access-Control-Allow-Origin': '*',
                    }
                };
            
            var data = '{\r\n    "filters": [\r\n        [ "state" , "=", "cancel"],\r\n        [ "tracking_number", "!=", "null"]\r\n    ]\r\n}';



            // Had to modify and use search because search_read had a 500 limit for shipment.out
var config = {
  method: 'put',
  url: 'https://'+MERCHANT+'.fulfil.io/api/v2/model/stock.shipment.out/search',
  headers: { 
    'x-api-key': API_KEY, 
    'Content-Type': 'text/plain', 
    'Access-Control-Allow-Origin': '*',
  },
  data : data
}; 
let responseSee = ""

const request = axios(config)
.then(function async (response) {
  console.log(JSON.stringify(response.data));
  //responseSee = response
  console.log(response.data)
  setListCanceledOrders(response.data);
})
.catch(function (error) {
    console.log(error);
  });
            console.log(responseSee)
            await console.log(request)
                const styles = {
                    whitespace: 'pre-line',
                    height: 500,
                    overflow: 'scroll',
                  };
                  const args = {
                    style: styles,
                    message: 'output: ',
                    description: request.data,
                    duration: 0,
                  };
                  notification.open(args);
            // return to dashboard or something 
            // not helpful here. It will run after the catch statement
            // alert('confirm successful catch request');
            //history.push("/routes");
        } catch(err){
            console.log(err); 
        }

    }


    const sortCanceledFailed = async() => {

        let resultArray = [];
        let safeArray = [...listCanceledOrders]
        const MERCHANT = process.env.REACT_APP_MERCHANT
        const API_KEY = process.env.REACT_APP_API_KEY
        //const copy = array.map(object => ({ ...object }))
        //or spread =. I think spread will clone. 
        // should test


        const total = safeArray.length; 
        while(safeArray.length>0){ // use chunk if this doesnt work. 
            resultArray.push(safeArray.splice(0,500));
            //total = total-1; 
        }

        
        let output = [];


        // forgot about foreach async snap . 
        await resultArray.forEach( element =>{
        try{
            //### Credentials here are temporary. Change to .env variables later. 
            const MERCHANT = process.env.REACT_APP_MERCHANT
            const API_KEY = process.env.REACT_APP_API_KEY
            
            // Do not leave this here etc. ####
            const headersConfig = {
                    headers: {
                        'x-api-key': API_KEY,
                        'Access-Control-Allow-Origin': '*',
                    }
                };
                var test  = JSON.stringify({
                    "filters": [
                      [
                        "id",
                        "in",
                        element
                      ]
                    ],
                    "fields": [
                      "id",
                      "tracking_number",
                      "rec_name",
                      "state"
                    ]
                  });
                  console.log("testing print")
                  console.log(test)
                var data = test
            // Had to modify and use search because search_read had a 500 limit for shipment.out
            var config = {
              method: 'put',
              url: 'https://'+MERCHANT+'.fulfil.io/api/v2/model/stock.shipment.out/search_read',
              headers: { 
                'x-api-key': API_KEY, 
                'Content-Type': 'text/plain', 
                'Access-Control-Allow-Origin': '*',
              },
              data : data
            }; 
            let responseSee = ""

            const request = axios(config)
            .then(function async (response) {
              //console.log(JSON.stringify(response.data));
              //responseSee = response
              const tempArray = [];
              response.data.forEach( element  =>{
                //var getObjectAttRead = element.tracking_number
                tempArray.push(element.tracking_number)
              })
              console.log("the temporary array is")
              console.log(tempArray)
              output.push(tempArray);
              console.log("output now looks like")
              console.log(output)
            })
            .catch(function (error) {
                console.log(error);
              });
        } catch(err){
            console.log(err); 
        }
        })
        setTrackingList(output);
        console.log("the list of tracking number ids are the following")
        console.log(trackingList)

    }


    // description
    const getTrackingID = () => {
        
        // havd to make the call here


    }

    const submitListTest  = () => {
      const MERCHANT = process.env.REACT_APP_MERCHANT
      const API_KEY = process.env.REACT_APP_API_KEY
      var total = 0; 
      var index1 = 0; 

      //console.log(trackingList)
      while (index1<trackingList.length){
        var index2 = 0;
        while (index2 < trackingList[index1].length) {
          var submitString = trackingList[index1][index2]
          index2 = index2+1; 
          total = total +1;

        }
        index1 = index1 +1; 
      }
      testDeletionOne(trackingList[0][0])
      console.log(total)
    }


    const testDeletionOne = (input)=>{
      const MERCHANT = process.env.REACT_APP_MERCHANT
      const API_KEY = process.env.REACT_APP_API_KEY
    var data = '';     
      var config = {
        method: 'delete',
        url: 'https://'+MERCHANT+'.fulfil.io/api/v2/model/shipment.tracking/'+input,
        headers: { 
          'x-api-key': API_KEY, 
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
        
    }
    return (
    <div>
        <Button onClick = {retrieveCanceledOrders}> Retrieve Orders ids that were Canceled with tracking id </Button>
        <Button onClick = {sortCanceledFailed}> Get Tracking Id of previous</Button>
        <Button onClick = {submitListTest}> Submit List to Cancel</Button>
        <Button onClick={testDeletionOne}>Test Deletion of one</Button>
    </div>)




}