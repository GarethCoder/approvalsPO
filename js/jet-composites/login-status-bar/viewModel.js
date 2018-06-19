/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery','toastr', 'ais'], function (oj, ko, $, toastr, ais) {
    'use strict';
    
    function ExampleComponentModel(context) {
        var self = this;
        self.composite = context.element;
        self.router = oj.Router.rootInstance;
        self.loginStatus = ko.observable('Not Logged In');
        if(JSON.parse(window.localStorage.getItem('conn')).user != null) {
            self.loginStatus(
                JSON.parse(window.localStorage.getItem('conn')).user.toUpperCase()
            +" Logged into "+ window.localStorage.getItem('environment'));
            
        
        }
        self.logout = function(){
            const conn = JSON.parse(window.localStorage.getItem("conn"));
            const handle = new ais.AisClient({
                username: conn.user,
                password: conn.password,
                url: conn.url,
                deviceName: "SAMRC"
            });
            

            handle.logOut(window.localStorage.getItem('token')).then(function(data){
                window.localStorage.clear();
                self.router.go('login');
            })
            
        }
        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;

            //Parse your component properties here 

        });
    };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.attached = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.detached = function(context){
    //};

    return ExampleComponentModel;
});