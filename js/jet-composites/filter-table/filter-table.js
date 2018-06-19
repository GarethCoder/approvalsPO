define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojtable', 'ojs/ojarraytabledatasource'],
    function(oj, ko, $) {
      function model(context) {
                var self = this;
								self.tableId = ko.observable();
                self.filterBy = ko.observable("");
                self.headerArray = [];
                self.rows = ko.observableArray();
                self.datasource = ko.observable();


                var worker = new Worker("js/components/filter-table/search.js");

                self.dispose = function() {
                  worker.terminate();
                }

                worker.onmessage = function(e) {
                    if(self.datasource())
                      self.datasource().reset(e.data);
                }

                self.rowclicked = function() {
                    console.log("Row clicked but no handler implemented");
                }

                self.filterTable = ko.computed(function() {
                    var filter = self.filterBy();
                    
                    var rows = self.rows();
                    worker.postMessage({
                        filter: filter,
                        rows: rows
                    });
                });

                self.filterTable.extend({rateLimit: 250});

                context.props.then(function(properties) {
										if (properties.tableid) {
											self.tableId(properties.tableid);
										}
                    if (properties.data) {
                      self.rows = properties.data.rows;
                      self.headers = properties.data.headers;
                      var filteredHeaders = {};

                      if(properties.visiblecolumns) {
                        self.columns = properties.visiblecolumns;
                        for(var i = 0; i < self.columns.length; i++) {
                          for(var headerName in self.headers) {
                            if(self.headers[headerName] === self.columns[i]) {
                              filteredHeaders[headerName] = self.columns[i];
                              break;
                            }
                          }
                        }
                      } else {
                        filteredHeaders = self.headers;
                      }

                      for(var prop in filteredHeaders) {
                        var col = {
                          headerText: filteredHeaders[prop],
                          field: prop
                        };
                        self.headerArray.push(col);
                      }

                      self.datasource(new oj.ArrayTableDataSource([], {idAttribute : "rowIndex"}));
                      self.filterBy(" "); //forces the filterTable computed to run initially, populating the table
                      self.filterBy(properties.filter);
                      self.header = properties.data.headers;
                      if (properties.onrowclick) {
                          self.rowclicked = properties.onrowclick;
                      }
											
                    } else {
                        console.error("ERROR: must pass 'data' parameter to filter-table. data is an object containing 'headers' (array) and 'rows' (observableArray)");
                    }
                });
        }
    return model;
});
