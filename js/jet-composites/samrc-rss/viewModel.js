define(['ojs/ojcore', 'knockout', 'jquery', 'ds','file-saver', 'moment','','ojs/ojtable','ojs/ojswitch', 'ojs/ojdialog', 'btransport','ojs/ojlistview', 'ojs/ojfilepicker', 'ojs/ojinputtext','ojs/ojarraydataprovider', 'ojs/ojbutton','jet-composites/form-builder/loader','jet-composites/login-status-bar/loader', 'ojs/ojaccordion'],
function (oj, ko, $, ds, fileSaver, moment) {

  function RSSViewModel() {
    var self = this;
    // init some holders
    self.dataProvider = ko.observable();
    self.selectedItem = ko.observable();
    self.projectCode = ko.observable();
    self.isChecked = ko.observable(false);
    self.showButtons = ko.observable(false);
    self.RSSData = ko.observable();
    self.remark = ko.observable("");
    self.itemNotSelected = ko.observable(false);
    self.headerValues = ko.observable();
    self.pendingOnly = ko.observable();
    self.loadingData = ko.observable(true);
    self.attachmentButtons = ko.observable();
    self.mediaKey = ko.observable();
    self.modalDataHeaders = ko.observable("Loading Requistion Header Info...");
    self.modalData = ko.observable("Loading Requisition Details...");
    self.multiple = ko.observable(false);
    self.orderdetails = ko.observable([]);
    self.TAUIDtit = ko.observable();
    self.TAUIDval = ko.observable();
    self.reqTitletit = ko.observable();
    self.reqTitleval = ko.observable();
    self.reqNumtit = ko.observable();
    self.reqNumval = ko.observable();
    self.keyDatatit = ko.observable();
    self.keyDataval = ko.observable();
    self.lineNumtit = ko.observable();
    self.lineNumval = ko.observable();
    self.reqStatustit = ko.observable();
    self.reqStatusval = ko.observable();
    self.approvertit = ko.observable();
    self.approverval = ko.observable();
    self.approverActtit = ko.observable();
    self.approverActval = ko.observable();
    self.startDatetit = ko.observable();
    self.startDateval = ko.observable();
    self.endDatetit = ko.observable();
    self.endDateval = ko.observable();
    self.originatortit = ko.observable();
    self.originatorval = ko.observable();
    self.daysOldtit = ko.observable();
    self.daysOldval = ko.observable();
    self.orderAmounttit = ko.observable();
    self.orderAmountval = ko.observable();
    self.toCurrtit = ko.observable();
    self.toCurrval = ko.observable();
    self.reqOrdertit = ko.observable();
    self.reqOrderval = ko.observable();
    self.lineAmounttit = ko.observable();
    self.lineAmountval = ko.observable();
    self.orderNumtit = ko.observable();
    self.orderNumval = ko.observable();
    self.orTytit = ko.observable();
    self.orTyval = ko.observable();
    self.orderCotit = ko.observable();
    self.orderCoval = ko.observable();
    self.dataprovider2 = ko.observable();

    self.anotherArrMap = ko.observableArray();
    self.reformattedArray = ko.observableArray();

    self.noAttachmentsFound = ko.observable(false);

    self.internalValueChangedListener = function (internalValue, val2) {

      if (internalValue.detail.internalValue === true) {
        $("#21_Label").html("Approved").css("color", "green");
      } else if (internalValue.detail.internalValue === false) {
        $("#21_Label").html("Pending Only").css("color", "orange");
      }
      
    }

    // fetch the data for this view async
    self.fetchRSSList = function() {
      ds.getRSSRecords().then(function (data) { // data is the array from rowset
        // cache for filtering
        console.log(data)
        self.RSSData(data);
        self.loadingData(false)
        self.itemNotSelected(true);
        // insert the returned rows into the dataProvider
        self.dataProvider(new oj.ArrayDataProvider(data, {
          keys: data.map(function (internalValue) {
            return internalValue.rowIndex;
          })
        })
        )
      });
    }
    self.fetchRSSList();
    self.multipleStr = ko.pureComputed(function () {
      return self.multiple() ? "multiple" : "single";
    }, self);

    self.acceptStr = ko.observable("image/*");
    self.acceptArr = ko.pureComputed(function () {
      var accept = self.acceptStr();
      return accept ? accept.split(",") : [];
    }, self);


    self.fileNames = ko.observableArray([]);

    self.selectListener = function (event) {
      alert(JSON.stringify(event))
      var files = event.detail.files;
      for (var i = 0; i < files.length; i++) {
        alert(JSON.stringify(files[i]))
        self.fileNames.push(files[i].name);
      }
    }

    // handler for a row click - launch modal
    self.loadSelected = function (evt) {
      self.itemNotSelected(false);
      // get index for array self.RSSData
      const rowIndex = self.selectedItem();
      self.headerValues(self.RSSData()[rowIndex]);
      let holder = [];
      
      $.each(self.headerValues(), function (i, o) {
        if (typeof o === "object") {
          if (o.hasOwnProperty("title")) {
            holder.push({ title: o.title, internalValue: o.internalValue, value: o.value });
          }
        }
      });
      
      self.headerValues(holder);
      self.modalData("Loading Requisition Details...");
      self.loadingData(true);
      self.showButtons(false);
      // ds.getDetailRSSRecord(self.RSSData()[rowIndex]).then(function(data){
      //   console.log(JSON.stringify(data));
      // })


      ds.getDetailRSSRecord(self.RSSData()[rowIndex]).then(
        function (details) {
          console.log(details);
          
          self.projectCode(details.mcu);
          $(self.RSSData()[0].sTAUIDF98866_176).remove();
          self.orderdetails(details.rows);
          self.dataprovider2(new oj.ArrayDataProvider(self.orderdetails(), {idAttribute: 'id'}))

          // combine to get Media Key
          self.mediaKey(self.RSSData()[rowIndex].mnOrderNumber_217.internalValue + "|" + self.RSSData()[rowIndex].sOrTy_218.internalValue + "|" + self.RSSData()[rowIndex].sOrderCo_219.internalValue);

          ds.getAttachementList(self.mediaKey(), 'GT43E01', 'P43E82_W43E82B').then(function (returnedList) {
            if (returnedList != false) {
              var htmlHolder2 = "<div class='btn-wrapper'>"

              $.each(returnedList.mediaObjects, function (i, o) {
                htmlHolder2 += "<button class='downloadButton' id='" + o.sequence + "'>" + o.itemName + "</button>";
              });
              
              
              if (returnedList.mediaObjects.length === 0) {
                self.noAttachmentsFound(true);
              }

              htmlHolder2 += "</div>";
              const kys = Object.keys(details.rows[0]);

              self.headerValues();

              self.newArr = ko.observableArray();

              self.TAUIDtit(self.headerValues()[0].title);
              self.TAUIDval(self.headerValues()[0].internalValue);
              
              self.reqTitletit(self.headerValues()[1].title);
              self.reqTitleval(self.headerValues()[1].internalValue);
              
              self.reqNumtit(self.headerValues()[2].title);
              self.reqNumval(self.headerValues()[2].internalValue);
              
              self.keyDatatit(self.headerValues()[3].title);
              self.keyDataval(self.headerValues()[3].internalValue);
              
              self.lineNumtit(self.headerValues()[4].title);
              self.lineNumval(self.headerValues()[4].internalValue);
              
              self.reqStatustit(self.headerValues()[5].title);
              self.reqStatusval(self.headerValues()[5].internalValue);
              
              self.approvertit(self.headerValues()[6].title);
              self.approverval(self.headerValues()[6].internalValue);
              
              self.approverActtit(self.headerValues()[7].title);
              self.approverActval(self.headerValues()[7].internalValue);

              self.startDatetit(self.headerValues()[8].title);
              self.startDateval(self.headerValues()[8].value);
              
              self.endDatetit(self.headerValues()[9].title);
              self.endDateval(self.headerValues()[9].internalValue);
              
              self.originatortit(self.headerValues()[10].title);
              self.originatorval(self.headerValues()[10].internalValue);
              
              self.daysOldtit(self.headerValues()[11].title);
              self.daysOldval(self.headerValues()[11].internalValue);
              
              self.orderAmounttit(self.headerValues()[12].title);
              self.orderAmountval(self.headerValues()[12].internalValue);
              
              self.toCurrtit(self.headerValues()[13].title);
              self.toCurrval(self.headerValues()[13].value);
              
              self.reqOrdertit(self.headerValues()[14].title);
              self.reqOrderval(self.headerValues()[14].internalValue);
              
              self.lineAmounttit(self.headerValues()[15].title);
              self.lineAmountval(self.headerValues()[15].internalValue);
              
              self.orderNumtit(self.headerValues()[16].title);
              self.orderNumval(self.headerValues()[16].internalValue);
              
              self.orTytit(self.headerValues()[17].title);
              self.orTyval(self.headerValues()[17].internalValue);
              
              self.orderCotit(self.headerValues()[18].title);
              self.orderCoval(self.headerValues()[18].internalValue);

              console.log(self.headerValues());
              
              //var html2 = "<table>";
              var htmlHolder = "<tr style='padding:7px;border:1px solid #efefef;height: 40px;color: #666;'>";
              var headerHolder = "<tr style='padding:7px;border:1px solid #efefef;height: 40px;font-weight: 600;color: #000;'>";

              kys.forEach(function (key) {
                // console.log(details[0][key]);
                //headerHolder += "<td style='border-right:1px solid #efefef;padding:5px;'>" + key + "</td>";
                //htmlHolder += "<td style='border-right:1px solid #efefef;padding:5px;'>" + details[0][key] + "</td>";
              });

              // keyValues.forEach(function (value) {
              //   htmlHolder += "<td style='border-right:1px solid #efefef;padding:5px;'>" + details[0][value] + "</td>";
              // });

              self.reformattedArray(kys.map(function(internalValue) { 
                return internalValue;
              }));

              // for (var i = 0; i < details.length; i++) {
              //   console.log(details[i]);
              // }
             
              // self.anotherArrMap(details.map(function (callback) {
              //   return callback;
              // }));
            
              // console.log(self.reformattedArray());
              // console.log(details);
              // console.log(self.anotherArrMap());

              headerHolder += "</tr>";
              htmlHolder += "</tr>";
              //html2 += headerHolder + htmlHolder + "</table></div>";
              self.attachmentButtons(htmlHolder2);
              //self.modalData(html2);
              self.loadingData(false);
              self.showButtons(true);
              document.querySelector("#modalDialog1").open();
             
              $(".downloadButton").on("click", function (event) {
                // console.log($(this).attr("id"));
                let seq = event.target[0];
                self.downloadMediaObject(self.mediaKey(), $(this).attr("id"));
              });

              $(".oj-start").click(function () {
                self.loadingData(true);
                self.fetchRSSList();
              });

              $(".backBtn").click(function () {
                document.querySelector("#modalDialog1").close();
                self.loadingData(true);
                self.fetchRSSList();
                // alert("You clicked me");
              });

              //$("#attachments").html(htmlHolder2)  
            }
          })
        })
    }

    // prepare and send reject to E1
    self.rejectRecord = function () {
    
      console.log("rejected");
      console.log("remark == " + $("#remark").val())
      document.querySelector("#modalDialog1").close();
      self.loadingData(true)
      ds.processRSSRecord(self.selectedItem(), "reject").then(function(data){
        if(data != 'success'){
          alert("An error occurred...")
        }
        ds.sendMedioObject( self.mediaKey(), $("#remark").val(), 'GT43E01', 'P43E82_W43E82B').then(function(response){
          if(response.updateTextStatus == "Success"){
            ds.getRSSRecords().then(function (data) { // data is the array from rowset
              // cache for filtering
              self.RSSData(data);
              self.loadingData(false)
              self.itemNotSelected(true);
              // insert the returned rows into the dataProvider
              self.dataProvider(new oj.ArrayDataProvider(data, {
                keys: data.map(function (internalValue) {
                  return internalValue.rowIndex;
                })
              })
              )
            });
          } else {
            alert("An error occurred... ")
          }

        })



      })
      
    }

    // prepare and send approve to E1
    self.approveRecord = function () {
      // console.log("approved" + JSON.stringify(self.selectedItem()[0]))
      document.querySelector("#modalDialog1").close();
      self.loadingData(true)
      console.log("self.selectedItem === "+self.selectedItem())
      ds.processRSSRecord(self.selectedItem(), "approve").then(function(data){
        if(data != 'success'){
          alert("An error occurred...")
        }
        ds.sendMedioObject(self.mediaKey(), $("#remark").val()).then(function(response){
          if(response.updateTextStatus == "Success"){
            ds.getRSSRecords().then(function (data) { // data is the array from rowset
              // cache for filtering
              self.RSSData(data);
              self.loadingData(false)
              self.itemNotSelected(true);
              // insert the returned rows into the dataProvider
              self.dataProvider(new oj.ArrayDataProvider(data, {
                keys: data.map(function (internalValue) {
                  return internalValue.rowIndex;
                })
              })
              )
            });
          } else {
            alert("An error occurred... ")
          }

        })

      })
      
    }

    self.downloadMediaObject = function (key, seq) {
      // console.log(self.selectedItem())
      ds.getPDFAttachement(key, seq, 'GT43E01', 'P43E82_W43E82B').then(function (data) {
        //console.log(data);
        var blob = new Blob([data], { type: "text/pdf;charset=utf-8" });
        saveAs(blob, self.selectedItem() + ".pdf");
      })
    };

    self.changed = function (e) {

    };

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

  return new RSSViewModel();
}
);
