
'use strict';


requirejs.config(
{
  baseUrl: 'js',

  // Path mappings for the logical module names
  // Update the main-release-paths.json for release mode when updating the mappings
  paths:
//injector:mainReleasePaths

  {
    'knockout': 'libs/knockout/knockout-3.4.0.debug',
    'jquery': 'libs/jquery/jquery-3.1.1',
    'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0',
    'promise': 'libs/es6-promise/es6-promise',
    'hammerjs': 'libs/hammer/hammer-2.0.8',
    'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
    'ojs': 'libs/oj/v4.1.0/debug',
    'ojL10n': 'libs/oj/v4.1.0/ojL10n',
    'ojtranslations': 'libs/oj/v4.1.0/resources',
    'text': 'libs/require/text',
    'signals': 'libs/js-signals/signals',
    'customElements': 'libs/webcomponents/custom-elements.min',
    'proj4': 'libs/proj4js/dist/proj4-src',
    'css': 'libs/require-css/css',
    'ds':'libs/steltixlabs/dataservices',
    'ais':'libs/steltixlabs/ais', 
    'ko-persist':'libs/thirdparty/persist',
    'btransport':'libs/steltixlabs/binaryTransport',
    'file-saver': 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min',
    'toastr': 'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min',
    'toastr-css': 'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css',
    'moment':'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min'
  }
  
//endinjector
  ,
  // Shim configurations for modules that do not expose AMD
  shim:
  {
    'jquery':
    {
      exports: ['jQuery', '$']
    }
  }
}
);

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', 'appController', 'ojs/ojknockout',
  'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojbutton', 'ojs/ojtoolbar'],
  function (oj, ko, app) { // this callback gets executed when all required modules are loaded

    $(function() {

      function init() {
        oj.Router.sync().then(
          function () {
            // Bind your ViewModel for the content of the whole page body.
            ko.applyBindings(app, document.getElementById('globalBody'));
          },
          function (error) {
            oj.Logger.error('Error in root start: ' + error.message);
          }
        );
      }

      if (window.location.href === "http://localhost:8000/") {
        $("body").addClass("blue-grad");
      }

      $(document).ready(function () {
        $(".pending-txt-true").hide();

        $("li#ui-id-13, li#ui-id-9").click(function () { // PO
          $("body").removeClass("blue-grad");
          $("body").addClass("white-body");
          // $(".pending-txt-true").hide();
        });
  
        $("li#ui-id-15, li#ui-id-7").click(function () { // RSS
          $("body").removeClass("blue-grad");
          $("body").addClass("white-body");
          // $(".pending-txt-true").hide();
        });
  
        $("li#ui-id-11, li#ui-id-5").click(function () { // HOME
          $("body").addClass("blue-grad");
          $("body").removeClass("white-body");
          // $(".pending-txt-true").hide();
        });
      });
      
      // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready 
      // event before executing any code that might interact with Cordova APIs or plugins.
      if ($(document.body).hasClass('oj-hybrid')) {
        document.addEventListener("deviceready", init);
      } else {
        init();
      }

    });

  }
);
