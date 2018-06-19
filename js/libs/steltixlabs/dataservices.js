define(['knockout', 'jquery', 'ais', 'moment'], function (ko, $, ais, moment) {

  // implement required data fetches
  function sync() {

  }

  function fetchRSSDetail(DOCO, DCTO) {
    const df = $.Deferred();
    const conn = JSON.parse(window.localStorage.getItem("conn"));
    const aisClient = new ais.AisClient({
      username: conn.user,
      password: conn.password,
      url: conn.url,
      deviceName: 'SAMRC'
    })
    const tableForQuery = 'F43E11'; // items table
    const query = aisClient.createDataQuery(tableForQuery).select(
      ['LNID', 'MCU', 'AN8', 'SHAN', 'TRDJ', 'ITM', 'CITM', 'DSC1',
        'DSC2', 'PROV', 'PRRC', 'UOM', 'UORG', 'ERDS', 'ERTYP', 'ERPR',
        'TORG'
      ]
    ).where('DOCO').eq(DOCO).and('DCTO').eq(DCTO);

    // description, qty ordered, Uom, Extended Amount, 
    // line status, supplier number, supplier name, currently code


    aisClient.newFetch(query).then(function (data) {
      // console.log(data);
      // console.log("ais obj in ds init === " + JSON.stringify(data));
      if (data) {
        var holder = [];
        data.forEach(function (oneRow) {
          Object.keys(oneRow).forEach(function (oneKey) {
            if (oneRow[oneKey].hasOwnProperty("internalValue")) {
              holder.push({
                value: oneRow[oneKey].value,
                title: oneRow[oneKey].title
              })
            }
          })
        })
        return df.resolve(holder);
      } else {
        return df.resolve([]);
      }

    })

    return df.promise()
  }

  function fetchPODetails(ROW) {
    const df = $.Deferred();

    // init aisClient
    const conn = JSON.parse(window.localStorage.getItem("conn"));

    const aisClient = new ais.AisClient({
      username: conn.user,
      password: conn.password,
      url: conn.url,
      deviceName: 'SAMRC'
    });

    // get a fresh token
    aisClient.getToken().then(function (token) {

      const formattedJson = buildAppstackJson({
        actions: [{
            "command": "SetRadioButton",
            "controlID": "16",
            "value": "0"
          },
          {
            "command": "DoAction",
            "controlID": "6"
          }
        ],
        action: 'open',
        formName: "P43081_W43081A",
        version: 'MRC0011',
        deviceName: 'SAMRC',
        token: token

      });

      aisClient.simpleAppStackCall(formattedJson).then(function (data) {

        if (data.fs_P43081_W43081A.data.gridData.rowset.length != 0) {

          let holder = data.fs_P43081_W43081A.data.gridData.rowset.sort(function (a, b) {
            return b.dtRequestDate_178 - a.dtRequestDate_178;
          })

          var selectRowJson = {
            "action": "execute",

            "actionRequest": {
              "formOID": "W43081A",
              "formActions": [

                {
                  "command": "SelectRow",
                  "controlID": "1." + ROW
                },
                {

                  "command": "DoAction",
                  "controlID": "114"
                }
              ]
            },
            token: token,
            stateId: data.stateId,
            stackId: data.stackId,
            rid: data.rid,
            "deviceName": "SAMRC"
          }

          aisClient.simpleAppStackCall(selectRowJson).then(function (data) {
            if (data.hasOwnProperty('fs_P43081_W43081B')) {
              var wrapper = [];
              var counter = 0;
              $.each(data.fs_P43081_W43081B.data, function (i, oneObj) {
                if (oneObj.hasOwnProperty('internalValue') && oneObj.title != 'KCOO:Key Company&#40;wf&#41;') {
                  if (oneObj.hasOwnProperty('assocDesc')) {
                    wrapper.push({
                      id: counter,
                      title: oneObj.title,
                      value: oneObj.assocDesc
                    })

                  } else {
                    wrapper.push({
                      id: counter,
                      title: oneObj.title,
                      value: oneObj.value
                    })
                  }

                }
                counter++
              })
              var outerWrapper = {};
              outerWrapper.data = wrapper;
              const KEY = data.fs_P43081_W43081B.data.txtOrderNumber_8.value + "|" + data.fs_P43081_W43081B.data.txtOrderType_10.value + "|" + data.fs_P43081_W43081B.data.txtKCOOKeyCompanywf_29.value;

              let holder = [];
              data.fs_P43081_W43081B.data.gridData.rowset.forEach(function (oneRow) {

                let wrap = {};
                wrap.id = oneRow.rowIndex;
                Object.keys(oneRow).forEach(function (oneKey) {
                  if (oneRow[oneKey].hasOwnProperty('internalValue')) {
                    wrap[oneKey] = oneRow[oneKey].value;
                  }
                })
                holder.push(wrap)
              })
              outerWrapper.rows = holder;
              outerWrapper.KEY = KEY;
              df.resolve(outerWrapper);

            } else {
              df.resolve([]);
            }
          })



        } else {
          df.resolve([]);
        }







      });

    });


    return df.promise()
  }


  function processPORecord(ROW, action) {
    const df = $.Deferred();

    var actionMask = "";
    if (action == "reject") {
      actionMask = "96";
    } else {
      actionMask = "94";
    }

    // init aisClient

    const conn = JSON.parse(window.localStorage.getItem("conn"));

    const aisClient = new ais.AisClient({
      username: conn.user,
      password: conn.password,
      url: conn.url,
      deviceName: 'SAMRC'
    });

    // get a fresh token
    aisClient.getToken().then(function (token) {

      const formattedJson = buildAppstackJson({
        actions: [{
            "command": "SetRadioButton",
            "controlID": "16",
            "value": "0"
          },
          {
            "command": "DoAction",
            "controlID": "6"
          }
        ],
        action: 'open',
        formName: "P43081_W43081A",
        version: 'MRC0011',
        deviceName: 'SAMRC',
        token: token

      });

      aisClient.simpleAppStackCall(formattedJson).then(function (data) {

        if (data.fs_P43081_W43081A.data.gridData.rowset.length != 0) {



          var selectRowJson = {
            "action": "execute",

            "actionRequest": {
              "formOID": "W43081A",
              "formActions": [

                {
                  "command": "SelectRow",
                  "controlID": "1." + ROW
                },
                {

                  "command": "DoAction",
                  "controlID": "114"
                }
              ]
            },
            token: token,
            stateId: data.stateId,
            stackId: data.stackId,
            rid: data.rid,
            "deviceName": "SAMRC"
          }

          aisClient.simpleAppStackCall(selectRowJson).then(function (data) {
            if (data.hasOwnProperty('fs_P43081_W43081B')) {
              var processRowJson = {
                "action": "execute",
    
                "actionRequest": {
                  "formOID": "W43081B",
                  "formActions": [
                    {
                      "command": "SelectAllRows",
                      "controlID": "1"
                  },
                  {
                    "command": "DoAction",
                    "controlID": actionMask
                    
                  }
                   
                  ]
                },
                token: token,
                stateId: data.stateId,
                stackId: data.stackId,
                rid: data.rid,
                "deviceName": "SAMRC"
              }

              aisClient.simpleAppStackCall(processRowJson).then(function(data){
                if (data.hasOwnProperty('fs_P43081_W43081A')) {
                  if(data.fs_P43081_W43081A.errors.length > 0){
                    df.resolve(data.fs_P43081_W43081A.errors)
                  } else {
                    df.resolve(true);
                  }
                }

              })

            } else {
              df.resolve(null);
            }
          })



        } else {
          df.resolve([]);
        }







      });

    });


    return df.promise()
  }


  function getRSSRecords() {
    const df = $.Deferred();

    // init aisClient
    const conn = JSON.parse(window.localStorage.getItem("conn"));
    // console.log(JSON.stringify(conn))
    const aisClient = new ais.AisClient({
      username: conn.user,
      password: conn.password,
      url: conn.url,
      deviceName: 'SAMRC'
    })
    // get a fresh token
    aisClient.getToken().then(function (token) {
      const formattedJson = buildAppstackJson({
        "returnControlIDs": "176",
        // returnControlIDs: "1[188,189,216,205,217,185,145,203,218,219,202,186,142,167,207,206]",
        actions: [{
            "command": "SetRadioButton",
            "controlID": "117",
            "value": "0"
          },
          {
            "command": "SetCheckboxValue",
            "controlID": "120",
            "value": "on"
          },
          {
            "command": "DoAction",
            "controlID": "157"
          },
        ],
        action: 'open',
        formName: "P43E82_W43E82B",
        token: token

      });

      aisClient.simpleAppStackCall(formattedJson).then(function (data) {

        if (data.fs_P43E82_W43E82B.data.gridData.rowset.length != 0) {
          // console.log(data);
          //console.log("into if statement" + JSON.stringify(data.fs_P43E82_W43E82B))
          let holder = data.fs_P43E82_W43E82B.data.gridData.rowset.sort(function (a, b) {
            return b.dtRequestDate_63 - a.dtRequestDate_63;
          })

          df.resolve(holder);
          // resolve here after reordering the results. 

        } else {
          df.resolve([]);
        }

      });

    });


    return df.promise()


  }


  function getPORecords() {
    const df = $.Deferred();

    // init aisClient
    const conn = JSON.parse(window.localStorage.getItem("conn"));
    // console.log(JSON.stringify(conn))
    const aisClient = new ais.AisClient({
      username: conn.user,
      password: conn.password,
      url: conn.url,
      deviceName: 'SAMRC'
    })
    // get a fresh token
    aisClient.getToken().then(function (token) {
      const formattedJson = buildAppstackJson({
        // returnControlIDs: "1[188,189,216,205,217,185,145,203,218,219,202,186,142,167,207,206]",
        actions: [{
            "command": "SetRadioButton",
            "controlID": "16",
            "value": "0"
          },
          {
            "command": "DoAction",
            "controlID": "6"
          }
        ],
        action: 'open',
        formName: "P43081_W43081A",
        version: 'MRC0011',
        deviceName: 'SAMRC',
        token: token

      });

      aisClient.simpleAppStackCall(formattedJson).then(function (data) {

        if (data.fs_P43081_W43081A.data.gridData.rowset.length != 0) {
          // console.log(data);
          //console.log("into if statement" + JSON.stringify(data.fs_P43E82_W43E82B))
          let holder = data.fs_P43081_W43081A.data.gridData.rowset.sort(function (a, b) {
            return b.dtRequestDate_178 - a.dtRequestDate_178;
          })


          df.resolve(holder);
          // resolve here after reordering the results. 

        } else {
          df.resolve([]);
        }
        // detailData.forEach(function (oneRow) {

        //   let wrap = {};
        //   wrap.id = oneRow.rowIndex;
        //   Object.keys(oneRow).forEach(function (oneKey) {
        //     if (oneRow[oneKey].hasOwnProperty('internalValue')) {
        //       wrap[oneKey] = oneRow[oneKey].value;
        //     }
        //   })
        //   holder.push(wrap)
        // })






      });

    });


    return df.promise()


  }

  function testStaticGrid() {
    return []
  }

  function getDetailRSSRecord(row) {
    //console.log(JSON.stringify(row));

    const df = $.Deferred();

    const conn = JSON.parse(window.localStorage.getItem("conn"));
    // init aisClient
    const aisClient = new ais.AisClient({
      username: conn.user,
      password: conn.password,
      url: conn.url,
      deviceName: 'SAMRC'
    })

    //console.log(aisClient)
    // first call to filter for record
    const formattedJson = buildAppstackJson({
      actions: [{
          "command": "SetControlValue",
          "controlID": "75",
          "value": row.mnOrderNumber_217.value
        },
        {
          "command": "SetControlValue",
          "controlID": "77",
          "value": row.sOrTy_218.value
        }, {
          "command": "SetControlValue",
          "controlID": "90",
          "value": row.sOrderCo_219.value
        },
        {
          "command": "SetCheckboxValue",
          "controlID": "61",
          "value": "on"
        },
        {
          "command": "DoAction",
          "controlID": "35"
        },
        {
          "command": "DoAction",
          "controlID": "99"
        }
      ],
      action: 'open',
      formName: "P43E15_W43E15A",
      deviceName: "SAMRC",
      token: window.localStorage.getItem('token')
    });
    //console.log(formattedJson);

    aisClient.simpleAppStackCall(formattedJson).then(function (data) {
      //console.log(JSON.stringify(data));
      if (data.hasOwnProperty('fs_P43E10_W43E10H')) {

        const formattedJson = buildAppstackJson({
          actions: [{
            "command": "DoAction",
            "controlID": "13"
          }],
          action: 'execute',
          formName: "W43E10H",
          deviceName: "SAMRC",
          stateId: data.stateId,
          stackId: data.stackId,
          rid: data.rid,
          token: window.localStorage.getItem('token')
        });
        //console.log(formattedJson);

        aisClient.simpleAppStackCall(formattedJson).then(function (data) {
          let detailData;
          if (data.hasOwnProperty('fs_P43E10_W43E10A')) {
            detailData = data.fs_P43E10_W43E10A.subforms.s_W43E10A_S43E10A_48.data.gridData.rowset;
          }

          let holder = [];
          detailData.forEach(function (oneRow) {

            let wrap = {};
            wrap.id = oneRow.rowIndex;
            Object.keys(oneRow).forEach(function (oneKey) {
              if (oneRow[oneKey].hasOwnProperty('internalValue')) {
                wrap[oneKey] = oneRow[oneKey].value;
              }
            })
            holder.push(wrap)
          })

          df.resolve({
            rows: holder,
            mcu: data.fs_P43E10_W43E10A.data.txtBusinessUnitzzz_27.value
          });

        })





      } else {
        df.resolve(null);
      }

    })




    return df.promise()


  }

  function processRSSRecord(row, action) {
    //console.log(JSON.stringify(row), action)
    // approve = 23  reject = 24
    const df = $.Deferred();
    var actionMask = "";
    if (action == "reject") {
      actionMask = "24";
    } else {
      actionMask = "23";
    }
    const conn = JSON.parse(window.localStorage.getItem("conn"));
    // init aisClient
    const aisClient = new ais.AisClient({
      username: conn.user,
      password: conn.password,
      url: conn.url,
      deviceName: 'SAMRC'
    })

    //console.log(aisClient)
    // first call to filter for record
    const formattedJson = buildAppstackJson({
      actions: [{
          "command": "SetRadioButton",
          "controlID": "16",
          "value": "0"
        },
        {
          "command": "DoAction",
          "controlID": "6"
        }
      ],
      action: 'open',
      formName: "P43E82_W43E82B",
      deviceName: "SAMRC",
      token: window.localStorage.getItem('token')
    });
    //console.log(formattedJson);

    aisClient.simpleAppStackCall(formattedJson).then(function (data) {
      //console.log(JSON.stringify(data));
      if (data.fs_P43E82_W43E82B.data.gridData.rowset.length != 0) {
        //df.resolve(data.fs_P43E82_W43E82B.data.gridData.rowset);

        var selectRowJson = {
          "action": "execute",
          "actionRequest": {
            "formOID": "W43E82B",
            "formActions": [

              {

                "command": "SelectRow",
                "controlID": "1." + row
              },
              {

                "command": "DoAction",
                "controlID": "164"
              }
            ]
          },
          token: window.localStorage.getItem('token'),
          stateId: data.stateId,
          stackId: data.stackId,
          rid: data.rid,
          "deviceName": "SAMRC"
        }

        aisClient.simpleAppStackCall(selectRowJson).then(function (data) {

          // do third step here
          if (data.hasOwnProperty('fs_P43E82_W43E82A')) {
            var actionJson = {
              "action": "close",
              "actionRequest": {
                "formOID": "W43E82A",
                "formActions": [{
                  "command": "DoAction",
                  "controlID": actionMask
                }]
              },
              token: window.localStorage.getItem('token'),
              stateId: data.stateId,
              stackId: data.stackId,
              rid: data.rid,
              "deviceName": "SAMRC"
            }

            aisClient.simpleAppStackCall(actionJson).then(function (data) {
              if (data.hasOwnProperty('fs_P43E82_W43E82B')) {
                df.resolve("success");
              }
            })
          }

        })

      } else {
        df.resolve(null);
      }

    })




    return df.promise()


  }

  function getAttachementList(KEY, STRUCTURE, FORM) {
    var df = $.Deferred();
    const conn = JSON.parse(window.localStorage.getItem("conn"));
    //console.log(JSON.stringify(KEY));
    $.ajax({
      url: conn.url + '/jderest/v2/file/list',
      method: "post",
      contentType: "application/json",
      data: JSON.stringify({
        "token": window.localStorage.getItem('token'),
        "deviceName": "SAMRC",
        "moStructure": STRUCTURE,
        "moKey": [
          KEY
        ],
        "formName": FORM,
        "version": "ZJDE0001",
        "includeURLs": true,
        "includeData": true,
        "moTypes": [
          "FILE"
        ],
        "thumbnailSize": 100

      })
    }).done(function (data) {
      //console.log(data)
      if (data) {
        df.resolve(data);
      }

    })


    return df.promise();
  }

  function getPDFAttachement(KEY, SEQ, STRUCTURE, FORM) {
    var df = $.Deferred();
    const conn = JSON.parse(window.localStorage.getItem("conn"));
    //console.log(KEY, SEQ);
    $.ajax({
      url: conn.url + '/jderest/v2/file/download',
      method: "post",
      dataType: 'binary',
      processData: false,
      contentType: "application/json",
      data: JSON.stringify({
        "token": window.localStorage.getItem('token'),
        "deviceName": "SAMRC",
        "moStructure": STRUCTURE,
        "moKey": [
          KEY
        ],
        "formName": FORM,
        "version": "ZJDE0001",
        "sequence": SEQ
      })
    }).done(function (data) {
      // console.log(data)
      df.resolve(data);
    })


    return df.promise();

  }

  function sendMedioObject(KEY, TEXT, STRUCTURE, FORM) {
    var df = $.Deferred();
    const conn = JSON.parse(window.localStorage.getItem("conn"));
    $.ajax({
      url: conn.url + '/jderest/v2/file/updatetext',
      method: "post",
      processData: false,
      contentType: "application/json",
      data: JSON.stringify({
        "deviceName": "SAMRC",
        "moStructure": STRUCTURE,
        "moKey": [
          KEY
        ],
        "formName": FORM,
        "version": "ZJDE0001",
        "inputText": TEXT,
        "appendText": false,
        "token": window.localStorage.getItem('token')
      })
    }).done(function (data) {
      console.log(data)
      df.resolve(data);
    })


    return df.promise();

  }

  function init() {
    // return an init message for debugging
    const df = $.Deferred();
    const aisClient = new ais.AisClient({
      username: 'jdesys',
      password: 'steltixE1',
      url: 'http://sandbox921.steltix.com',
      deviceName: 'codex' + Math.random()
    })
    const tableForQuery = 'F4101'; // items table
    const query = aisClient.createDataQuery(tableForQuery).select('LITM').pageSize(1);
    aisClient.newFetch(query).then(function (data) {
      //console.log("ais obj in ds init === "+JSON.stringify(data));
      return df.resolve("dataservice connected to E1...");
    })

    return df.promise()

  }

  function getAddressBook() {
    const df = $.Deferred();
    const itemsHolder = ko.observableArray([]);
    const headers = {
      'AN8': 'Address Book Number',
      'ALPH': 'Name',
      'SIC': 'Industry',
      'MCU': 'Business Unit'
    }
    const aisClient = new ais.AisClient({
      username: 'jdesys',
      password: 'steltixE1',
      url: 'http://sandbox921.steltix.com',
      deviceName: 'codex' + Math.random()
    })
    const tableForQuery = 'F0101'; // items table
    const query = aisClient.createDataQuery(tableForQuery).select(['AN8', 'ALPH', 'SIC', 'MCU']).pageSize(1);
    aisClient.newFetch(query).then(function (data) {
      //console.log("ais obj in ds init === " + JSON.stringify(data));

      df.resolve(data);

    })

    return df.promise()
  }

  function getItemsAPI() {
    // use a promise for async data
    const df = $.Deferred();
    var headers = {

      'LITM': 'Item Number',
      'DSC1': 'Description'
    };

    const aisClient = new ais.AisClient({
      username: 'jdesys',
      password: 'steltixE1',
      url: 'http://sandbox921.steltix.com',
      deviceName: 'codex' + Math.random()
    })
    const tableForQuery = 'F4101'; // items table
    const query = aisClient.createDataQuery(tableForQuery).select(['LITM', 'DSC1']).pageSize(54);
    aisClient.newFetch(query).then(function (data) {
      //console.log("ais obj in ds init === "+JSON.stringify(data));
      return df.resolve({
        rows: data,
        headers: headers
      });
    })

    return df.promise()
  }

  function getContacts() {
    // not implemented yet
    return []
  }
  return {
    sync: sync,
    init: init,
    getPORecords: getPORecords,
    fetchPODetails: fetchPODetails,
    getDetailRSSRecord: getDetailRSSRecord,
    sendMedioObject: sendMedioObject,
    getItemsAPI: getItemsAPI,
    getAddressBook: getAddressBook,
    getRSSRecords: getRSSRecords,
    fetchRSSDetail: fetchRSSDetail,
    processRSSRecord: processRSSRecord,
    processPORecord,processPORecord,
    getPDFAttachement: getPDFAttachement,
    getAttachementList: getAttachementList
  }
});
