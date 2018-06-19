

define(['knockout','ojs/ojlistview','ojs/ojinputtext'], 
function(ko) {
    function model(context) {
        // to inspect the context object
        console.log(context)
        // get a handle on the current 'this' reference
        var self = this;
        self.dircolumn = ko.observable(false);
        // observable to hold JDE prefs from LS
        self.userPrefs = ko.observable();
        self.customPrefsControls = ko.observable();
        let holder = []
        if(window.localStorage.getItem('userInfo') != null){
            const prefs = JSON.parse(window.localStorage.getItem('userInfo'))
            
            for (prop in prefs){
                if(prefs[prop] != '  '){
                   holder.push({
                       key: prop,
                       value: prefs[prop]
                   })
                }
              
            }
            

        } else {
            holder.push({
                key: "Not Logged In...",
                value: ""
            })
      
        }
        self.userPrefs(holder);
        

        // get the props that were included in the implementation
        context.props.then(function(properties) {
            var holder = []
            if (properties.customprefs) {
                // work with our props
                //console.log(properties.customprefs);
                
                properties.customprefs.split('|').forEach((one)=>{
                    holder.push({
                        value: one
                    })
                })
                self.customPrefsControls(holder);
              
            }
        });


    }
return model;
});

