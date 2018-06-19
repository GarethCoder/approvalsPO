
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable','ojs/ojarraydataprovider'], function (oj, ko, $) {
    'use strict';
    
    function ExampleComponentModel(context) {
        var self = this;
        self.composite = context.element;

        self.rows = ko.observable([]);

        self.dataprovider = ko.observable();
        

        console.log("composite object === "+self.composite)
        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            //console.log("prop map == "+propertyMap)
            self.properties = propertyMap;
            console.log(JSON.stringify(self.properties))
            if(propertyMap.hasOwnProperty('data')){
                //console.log("property map === "+propertyMap.data)
                self.rows(self.properties.data);
                self.dataprovider(new oj.ArrayDataProvider(self.rows(), {idAttribute: 'id'}))
            }
            

        });
    };
    


    return ExampleComponentModel;
});