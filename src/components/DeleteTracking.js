import {Button, Input, notification } from 'antd';
import axios from 'axios';
import React, { Component, useState, useEffect, useReducer} from "react";




export default function DeleteTracking () {

    const [listCanceledOrders, setListCanceledOrders] = useState();
    const [trackingList, setTrackingList] = useState();
    

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
  url: 'https://jetpack-sandbox.fulfil.io/api/v2/model/stock.shipment.out/search',
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
            // const request = await axios.put("https://"+merchant+".fulfil.io/api/v2/model/stock.shipment.out/search_read",
            //         filter
            //     , 
            //     headersConfig).then((response)=> {
            //         console.log('The response was the following'+ response);
            //         console.log("")
            //        // I should check if there was an error response for the call and cancel.  
            //        // ex while (response!=happyState) {send again, then check happy state, make happystate false?}
            //        if (response.data()!= []) {
            //         console.log('response',response.data);
            //         console.log('response was a success'); 
            //         }
            //         else{
            //         console.log('response', response.data); 
            //         console.log('the response was not a success'); 
            //         //failstate = true; 
            //         }
                                
            //         // handle failure. 
            //     }).catch((error)=> {
            //         alert('errors', error.response);
            //         console.log("error response is below, followed by the error object");
        
            //     });
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

        //const copy = array.map(object => ({ ...object }))
        //or spread =. I think spread will clone. 
        // should test


        const total = safeArray.length; 
        //let chunks = 1; 
        //chunks = Math.floor(total/500);
        while(safeArray.length>0){ // use chunk if this doesnt work. 
            resultArray.push(safeArray.splice(0,500));
            //total = total-1; 
        }
        // if(safeArray.length>1){
        //     resultArray.push(safeArray)
        // }
        //console.log(resultArray)
        // make the call 

        
        let output = [];
        let output2 = [];


        // forgot about foreach async snap . 
        await resultArray.forEach( element =>{
        try{
            //### Credentials here are temporary. Change to .env variables later. 
            const merchant = process.env.REACT_APP_TEST_MERCHANT
            const API_KEY = process.env.REACT_APP_TEST_API_KEY
            
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
                // JSON.stringify({
                //     "filters": [
                //       [
                //         "id",
                //         "in",
                //         307938
                //       ]
                //     ],
                //     "fields": [
                //       "id",
                //       "tracking_number",
                //       "rec_name",
                //       "state"
                //     ]
                //   });

            // Had to modify and use search because search_read had a 500 limit for shipment.out
            var config = {
              method: 'put',
              url: 'https://jetpack-sandbox.fulfil.io/api/v2/model/stock.shipment.out/search_read',
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
        // RawTest.forEach(element => {
        //     //console.log(element)
        //     if(element.tracking_number != null){
        //         output.push(element);
        //         output2.push(element.tracking_number)
        //     }
        // });
        // console.log(output)
        // console.log(output2)
        setTrackingList(output);
        console.log("the list of tracking number ids are the following")
        console.log(trackingList)

    }


    // description
    const getTrackingID = () => {
        
        // havd to make the call here


    }

    const submitListTest  = () => {
      
      var total = 0; 
      var index1 = 0; 

      //console.log(trackingList)
      while (index1<trackingList.length){
        var index2 = 0;
        while (index2 < trackingList[index1].length) {
          var submitString = trackingList[index1][index2]

          // call deletion
          //testDeletionOne(trackingList[0][0])
          //testDeletionOne(submitString)
          //console.log(submitString)
          index2 = index2+1; 
          total = total +1;

        }
        index1 = index1 +1; 
      }
      testDeletionOne(trackingList[0][0])
      console.log(total)
    }


    const testDeletionOne = (input)=>{
    var data = '';     
      var config = {
        method: 'delete',
        url: 'https://jetpack-sandbox.fulfil.io/api/v2/model/shipment.tracking/'+input,
        headers: { 
          'x-api-key': '49101de129a34ce79adf7ec2c9ae7f5d', 
          //'Cookie': 'session=eyJfcGVybWFuZW50Ijp0cnVlfQ.Y26vrA.hS5pj3AunytXg36tZdYexbKnm9k'
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