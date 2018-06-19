define(['ojs/ojcore', 'knockout', 'jquery','jet-composites/connection-manager/loader','jet-composites/user-prefs/loader'],
 function(oj, ko, $) {
  
    function DashboardViewModel() {
      var self = this;
      self.isconnected = ko.observable(false);
      
 
      self.handleActivated = function(info) {
        // Implement if needed
      };

      
      self.handleAttached = function(info) {
        // Implement if needed
        
      };


      
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    
    return new DashboardViewModel();
  }
);
