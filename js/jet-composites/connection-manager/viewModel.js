
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ais', 'toastr', 'ojs/ojrouter','jet-composites/form-builder/loader','jet-composites/user-prefs/loader','ojs/ojprogress'], function (oj, ko, $, ais, toastr) {
    'use strict';
    
    function ConnManagerComponentModel(context) {
        var self = this;
        self.composite = context.element;
        // controls the display of login form
        self.msgText = ko.observable('');
        self.router = oj.Router.rootInstance;
        self.notconnected = ko.observable(true);
        self.loggingIn = ko.observable(false);
        self.isconnected = ko.observable(false);
        // controls prefs form
        self.user = ko.observable();
        self.password = ko.observable();
        self.url = ko.observable();
        self.isconnected = ko.observable(false)
        self._getConnection = function(){
            return self.isconnected();
        }
        self.progressValue = ko.observable(0);
        
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
            }

        
            self.myHandler = function(data){
            if(data){
                self.loggingIn(true);
                // window.setInterval(function() {
                //     if (self.progressValue() !== -1) {self.progressValue(self.progressValue() + 1)} else 
                //     {
                //         // toastr["error"]("Timeout Error!");
                //         self.msgText('Timeout Error!')
                //     }
                      
                //   }, 100);
                // check the creds for a token
            self.handleLogin(data).then(function(result){
    
                self.progressValue(-1);
                if(result == true){
                    self.notconnected(false);
                    self.isconnected(true);
                    self.loggingIn(false);
                    self.router.go('home');
                } else {
                    toastr["error"]("Login Invalid");
                }
                
            })
            } else {
                toastr["error"]("You must enter all login fields");
                // self.msgText('You must enter all login fields')
            }
        }

        self.handleLogin = function(data){
            const df = $.Deferred();
            // const tokenCheck = new ais.AisClient({username:data.user,password:data.password,url:data.url,deviceName:"SAMRC"})
            // diable login for development - uncomment line above to enable
            console.log(JSON.stringify(data))
            data.url = 'http://ctn-jdedweb-07:820';
            const tokenCheck = new ais.AisClient({
                username: data.user,
                password: data.password,
                url: data.url,
                deviceName: "SAMRC"
            });
           
            try {
                tokenCheck.getToken().then(function(token){
                    console.log("token == " + token);
                    if (token != null) {
                        $("body").removeClass("blue-grad");
                        $("body").addClass("white-body");
                        $(".steltix-button").hide();
                        window.localStorage.setItem("token", token); 
                        window.localStorage.setItem("conn", JSON.stringify(data));
                        window.localStorage.setItem("environment", tokenCheck.environment)
                        window.localStorage.setItem("userInfo", JSON.stringify(tokenCheck.userInfo));
                        const t = JSON.parse(window.localStorage.getItem("conn"));
                        console.log("conn user  in session === "+t.user);
                        return df.resolve(true);
                    } else {
                        // toastr["error"]('Error in root start: ' + error.message);
                        toastr["error"]("Invalid Login. Please try logging in again.");
                    }
                });
            } catch (err) {
                return df.resolve(false);
            }
            
            return df.promise();
        }
          
        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;
            if(self.properties.isconnected){
                self.isconnected(self.properties.isconnected)
            }
           
        });
    };
    ConnManagerComponentModel.prototype.attached = function(context){
        console.log("check for token in session === "+window.localStorage.getItem('token'))
        console.log(context)
        // if(window.localStorage.getItem('token') != null){
        //     context.element.notconnected(false);
        //     context.element.isconnected(true);
        //     context.element.loggingIn(false);
            
        // }   
    };

    return ConnManagerComponentModel;
});