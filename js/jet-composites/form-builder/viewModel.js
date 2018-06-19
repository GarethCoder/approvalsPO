define(
    ['ojs/ojcore', 'knockout', 'jquery','ojs/ojinputtext', 'ojs/ojlabel','ojs/ojbutton'], function (oj, ko, $) {
    'use strict';
    
    function formBuilderComponentModel(context) {
        var self = this;
        self.composite = context.element;
        self.inputvalues = ko.observable([]);
        self.title = ko.observable();
        self.callback = "";
        self.uniqueID = ko.observable(Math.random().toFixed(2)*100);

        self.handleClick = function (evt, ui) {
            
            var formData = {};
            $("#"+self.uniqueID().toString()).find(".myInputs").each((i, inPut)=>{
                console.log("found one == "+ inPut)
                if(inPut.value != ''){
                    formData[inPut.id] =  inPut.value;
                }
            })
            if(typeof self.callback == "function"){
                self.callback(formData)
            }
        }

        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;
            // console.log(self.properties)
            //Parse your component properties here 
            if(self.properties.inputvalues){
                self.inputvalues(self.properties.inputvalues)
            }
            if(self.properties.title){
                self.title(self.properties.title)
            }
            if(self.properties.callback){
                self.callback = self.properties.callback;
            }

        });

        self.steltixLogoWhite = ko.observable("http://zonestaging.steltixlabs.com./images/SteltixLABS_Labs-White.png");
    };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    formBuilderComponentModel.prototype.attached = function(context){
    
    };

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.detached = function(context){
    //};

    return formBuilderComponentModel;
});