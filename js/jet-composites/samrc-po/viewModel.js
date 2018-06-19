define(['ojs/ojcore', 'knockout', 'jquery', 'ds', 'file-saver', 'moment', '', 'ojs/ojtable', 'ojs/ojswitch', 'ojs/ojdialog', 'btransport', 'ojs/ojlistview', 'ojs/ojfilepicker', 'ojs/ojinputtext', 'ojs/ojarraydataprovider', 'ojs/ojbutton', 'jet-composites/form-builder/loader', 'jet-composites/login-status-bar/loader', 'ojs/ojaccordion'],
  function (oj, ko, $, ds, fileSaver, moment) {

    function POViewModel() {
      var self = this;
      // init some holders
      if( window.localStorage.getItem('conn') == null ){
        window.localStorage.setItem('conn', JSON.stringify({
          user: getUrlParams('user'),
          password: getUrlParams('password'),
          url: getUrlParams('ais')
        }))
      }
      self.dataProvider = ko.observable();
      self.dataProvider2 = ko.observable();
      self.orderdetails = ko.observable();
      self.selectedItem = ko.observable();
      self.PODetails = ko.observable();
      self.isChecked = ko.observable(false);
      self.showButtons = ko.observable(false);
      self.POData = ko.observable();
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

      self.noAttachmentsFound = ko.observable();


      // fetch the data for this view async
      self.fetchPOList = function () {
        ds.getPORecords().then(function (data) { // data is the array from rowset
          // cache for filtering

          self.POData(data);
          self.loadingData(false)
          self.itemNotSelected(true);
          // insert the returned rows into the dataProvider
          self.dataProvider(new oj.ArrayDataProvider(data, {
            keys: data.map(function (internalValue) {
              // console.log(internalValue);
              return internalValue.rowIndex;
            })
          }))
        });
      }
      self.fetchPOList();

      // handler for a row click - launch modal
      self.loadSelected = function (evt) {
        self.itemNotSelected(false);
        // get index for array self.RSSData
        const rowIndex = self.selectedItem()[0];
        let holder = [];
        console.log(rowIndex);
        self.headerValues(holder);
        //self.modalData("Loading PO Details...");
        self.loadingData(true);
        self.showButtons(false);
        ds.fetchPODetails(rowIndex).then(function (data) {
          console.log(data.rows);
          self.PODetails(data.data);
          self.orderdetails(data.rows);
          self.dataprovider2(new oj.ArrayDataProvider(self.orderdetails(), {
            idAttribute: 'id'
          }))
          data.KEY = data.KEY + "|" + self.orderdetails()[0].sOrdSuf_148;
          self.mediaKey(data.KEY);
          ds.getAttachementList(data.KEY, 'GT4301', 'P43081_W43081B').then(function (mediaList) {
            console.log(mediaList);
            var htmlHolder2 = "<div class='btn-wrapper'>"

            $.each(mediaList.mediaObjects, function (i, o) {
              htmlHolder2 += "<button class='downloadButton' id='" + o.sequence + "'>" + o.itemName + "</button>";
            });


            if ($("button.downloadButton").length === 0) {
              self.noAttachmentsFound(true);
            }

            htmlHolder2 += "</div>";
            $(".downloadButton").on("click", function (event) {
              // console.log($(this).attr("id"));
              let seq = event.target[0];
              self.downloadMediaObject(self.mediaKey(), $(this).attr("id"));
            });

            $(".oj-start").click(function () {
              self.loadingData(true);
              self.fetchPOList();
            });

            $(".backBtn").click(function () {
              document.querySelector("#modalDialog2").close();
              self.loadingData(true);
              self.fetchPOList();
              // alert("You clicked me");
            });

            $("#attachments").html(htmlHolder2)
            self.loadingData(false);
            self.showButtons(true);
            document.querySelector("#modalDialog2").open();

            $(".downloadButton").on("click", function (event) {
              // console.log($(this).attr("id"));
              let seq = event.target[0];
              self.downloadMediaObject(self.mediaKey(), $(this).attr("id"));
            });

          })



        })

      }

      // prepare and send reject to E1
      self.rejectRecord = function () {

        console.log("rejected");
        console.log("remark == " + $("#remark").val())
        document.querySelector("#modalDialog2").close();
        self.loadingData(true)

        ds.processPORecord(self.selectedItem()[0], 'reject').then(function(data){
          if (!data){
            console.log("E1 Error occurred!")
          } else {
            console.log("success");
            ds.sendMedioObject( self.mediaKey(), $("#remark").val(), 'GT4301', 'P43081_W43081B').then(function(response){
              if(response.updateTextStatus == "Success"){
                ds.getPORecords().then(function (data) { // data is the array from rowset
                  // cache for filtering
                  self.POData(data);
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


          }


        })
       
      }

      // prepare and send approve to E1
      self.approveRecord = function () {
        // console.log("approved" + JSON.stringify(self.selectedItem()[0]))
        document.querySelector("#modalDialog2").close();
        self.loadingData(true)
        ds.processPORecord(self.selectedItem()[0], 'approve').then(function(data){
          if (!data){
            console.log("E1 Error occurred!")
          } else {
            console.log("success");

            ds.sendMedioObject( self.mediaKey(), $("#remark").val(), 'GT4301', 'P43081_W43081B').then(function(response){
              if(response.updateTextStatus == "Success"){
                ds.getPORecords().then(function (data) { // data is the array from rowset
                  // cache for filtering
                  self.POData(data);
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

          }


        })
      }

      self.downloadMediaObject = function (key, seq) {

        ds.getPDFAttachement(key, seq, 'GT4301', 'P43081_W43081B').then(function (data) {

          var blob = new Blob([data], {
            type: "text/pdf;charset=utf-8"
          });
          saveAs(blob, self.selectedItem() + ".pdf");
        })
      };


    }

    return new POViewModel();
  }
);
