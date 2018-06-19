define(['ojs/ojcore', 'knockout', 'jquery', 'ds', 'jet-composites/swipe-listview-items/loader'],
  function (oj, ko, $, ds) {

    function AboutViewModel() {
      var self = this;
      // self.addressBookData = ko.observable({});
      // ds.getAddressBook().then(function (data) {
      //   console.log("my data == " + JSON.stringify(data))
      //   self.addressBookData(data);
      // })

      // self.moduleSettings = {
      //   name: 'SwipeToReveal-basicSwipeToReveal/swipeListviewItems'
      // }
      self.handleRowClick = function (evt) {
        console.log(evt)
      }
      self.handleActivated = function (info) {
        // Implement if needed
      };


      self.handleAttached = function (info) {
        // Implement if needed
        // console.log($("#connection-manager"))
      };


      self.handleBindingsApplied = function (info) {
        // Implement if needed
      };


      self.handleDetached = function (info) {
        // Implement if needed
      };
    }

    return new AboutViewModel();
  }
);
