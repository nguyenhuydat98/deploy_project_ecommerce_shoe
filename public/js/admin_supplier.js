/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/admin_supplier.js":
/*!****************************************!*\
  !*** ./resources/js/admin_supplier.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  $('#dataTables-example').DataTable({
    responsive: false
  });
});
$(document).ready(function () {
  $(".confirm-delete-supplier").submit(function (event) {
    return confirm($(this).data('message'));
  });
});
$(document).on("click", ".edit-supplier", function () {
  $(".loader").show();
  $.ajax({
    url: $(this).data('url'),
    type: "GET",
    success: function success(data) {
      $(".loader").hide();
      var supplier = JSON.parse(data);

      if (supplier.status == 404) {
        alert(supplier.message);
      } else {
        $("#form-edit").attr('action', supplier.url);
        $("#edit-name").val(supplier.name);
        $("#edit-phone").val(supplier.phone);
        $("#edit-address").val(supplier.address);
        CKEDITOR.instances['edit-description'].setData(supplier.description);
        $("#modal-edit-supplier").modal("show");
      }
    }
  });
});
$(document).ready(function () {
  var x = $(".define").data('value');
  var url = $(".define").data('route');

  if (x == "create") {
    $("#modal-create-supplier").modal("show");
  }

  if (x == 'edit') {
    $.ajax({
      url: url,
      type: "GET",
      success: function success(data) {
        $(".loader").hide();
        var supplier = JSON.parse(data);
        $("#form-edit").attr('action', supplier.url);
        $("#edit-name").val(supplier.name);
        $("#edit-phone").val(supplier.phone);
        $("#edit-address").val(supplier.address);
        CKEDITOR.instances['edit-description'].setData(supplier.description);
        $("#modal-edit-supplier").modal("show");
      }
    });
  }
});
$(document).on("click", ".btn-import-product", function () {
  $(".loader").show();
  var url = $(this).data('url');
  $.ajax({
    url: url,
    type: "get",
    success: function success(data) {
      $(".loader").hide();
      $("#import-product").html(data);
      $("#import-product").modal("show");
    },
    complete: function complete() {
      $(".submit-import").click(function () {
        $(".loader").show();
        var url = $(this).data('url');
        var idSupplier = $(this).data('id');
        $.ajax({
          url: url,
          type: "POST",
          data: {
            "supplier": idSupplier,
            "size": $("#size").val(),
            "quantity": $("#quantity").val(),
            "current_price": $("#current_price").val(),
            "unit_price": $("#unit_price").val(),
            "original_price": $("#original_price").val()
          },
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          success: function success(data) {
            $(".loader").hide();
            $(".show-size").text('');
            $(".show-quantity").text('');
            $(".show-original-price").text('');
            $(".show-current-price").text('');
            $(".show-unit-price").text('');
            var datas = JSON.parse(data);
            $(".product").each(function () {
              if (datas.id == $(this).data('id')) {
                $(this).find(".product-quantity").text(datas.quantity);
                $(this).find(".original-price").text(datas.original_price + " " + "VND");
              }
            });
            alert(datas.message);
          },
          error: function error(data) {
            $(".loader").hide();

            if (data.status == 422) {
              var errors = data.responseJSON;
              $(".show-size").text(errors.errors.size);
              $(".show-quantity").text(errors.errors.quantity);
              $(".show-original-price").text(errors.errors.original_price);
              $(".show-current-price").text(errors.errors.current_price);
              $(".show-unit-price").text(errors.errors.unit_price);
            }
          }
        });
      });
    }
  });
});

/***/ }),

/***/ 4:
/*!**********************************************!*\
  !*** multi ./resources/js/admin_supplier.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/dat/SUN/php_oe29_ecommerce/resources/js/admin_supplier.js */"./resources/js/admin_supplier.js");


/***/ })

/******/ });