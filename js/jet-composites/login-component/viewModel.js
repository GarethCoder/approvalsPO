/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojcheckboxset'], function (oj, ko, $) {
    'use strict';
    
        function LoginComponentModel(context) {
            var self = this;
            self.isconnected = ko.observable();
            // Get local & session storage
            // self.config = ko.observable({
            //     username:'jdesys',
            //     password:'steltixE1',
            //     url:'http://sandbox921.steltix.com'
            // });
            self.password = ko.observable();
            self.cb = ko.observable();
        
            // Global Variables for Login Component

            self.contentType = ko.observable('');
            self.deviceName = ko.observable('');
            // get props

            context.props.then(function (propertyMap) {
                //Store a reference to the properties for any later use
                self.properties = propertyMap;
                if(self.properties.config){
                    self.config(self.properties.config)
                }
                if(self.properties.isconnected){
                    self.isconnected(self.properties.isconnected)
                }
                if(self.properties.cb){
                    self.cb(self.properties.cb)
                }
                //console.log(JSON.stringify(self.properties.config))
                //Parse your component properties here 
    
            });


            // The Button Event

            self.submitBtn = ko.observable();
        
            self.submitBtn = function (e) {
                $("#error").hide();
                $("#success").hide();


                self.contentType = "application/json";
                
                $.post({
                    url: self.config().url + "/jderest/tokenrequest", //http://sandbox921.steltix.com/jderest/tokenrequest/
                    contentType: self.contentType,
                    data: JSON.stringify({
                        "deviceName": "testID",
                        "username": self.config().username,
                        "password": self.password()
                    }),
                    success: function (data) {
                        self.cb(false)
                        $("#success").show();
                        $("#success").html("Connected");
                        var token = window.localStorage.setItem("Token", data.userInfo.token); // Token in sessionStorage (retrieved from /tokenrequest)
                        
                        var addressNumber = sessionStorage.setItem("Address Number", data.userInfo.addressNumber); // AddressNumber in sessionStorage (retrieved from /tokenrequest)
                    },
                    error: function (data) {
                        $("#error").show();
                        self.cb(true)
                        switch (data.status) {
                            case 403:
                            $("#error").html("Incorrect credentials");
                            break;
                            case 415:
                            $("#error").html("Connection error. Try enabling/disabling legacy mode");
                            break;
                            case 501:
                            $("#error").html("Error connecting to server");
                            break;
                            case 0:
                            $("#error").html("Could not make login request. AIS URL may be incorrect");
                            break;
                            default:
                            $("#error").html("An unknown error occured: " + data.status);
                            break;
                        }
                    }
                });

                // GET DETAILS FROM /defaultconfig

                
                
                // GET DETAILS FROM /formservice
                
               
            }
           
        };
        
    return LoginComponentModel;
});



// {
//     username: 'jdesys',
//     password:'steltixE1',
//     url:'http://sandbox921.steltix.com',
//     leagacy: false
// }