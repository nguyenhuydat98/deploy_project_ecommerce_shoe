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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/product_detail.js":
/*!****************************************!*\
  !*** ./resources/js/product_detail.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  $('.btn-size').click(function () {
    var size = $(this).val();
    $('.btn-size').css({
      'background': '#fff',
      'color': '#000'
    });
    $(this).css({
      'background': '#FE2E2E',
      'color': '#fff'
    });
    $("#quantity").val(1);
    $("#quantity").removeAttr("disabled");
    $(".quantity-right-plus").removeAttr("disabled");
    $(".quantity-left-minus").removeAttr("disabled");
    var url = $(this).attr("data-url");
    $.ajax({
      url: url,
      type: "GET",
      success: function success(data) {
        var productDetail = JSON.parse(data);
        $("#quantity-size").text(productDetail.quantity);
        $("#add-size").val(productDetail.size);
      },
      error: function error($data) {
        alert('Fail');
      },
      complete: function complete() {
        $("#btn-add").click(function () {
          var chooseQuantity = $("#quantity").val();
          var maxQuantity = $("#quantity-size").text();

          if (chooseQuantity >= parseInt(maxQuantity)) {
            $("#btn-add").attr("disabled", true);
          }
        });
        $("#btn-sub").click(function () {
          var chooseQuantity = $("#quantity").val();
          var maxQuantity = $("#quantity-size").text();

          if (chooseQuantity < maxQuantity) {
            $("#btn-add").attr("disabled", false);
          }
        });
      }
    });
  });
  var quantitiy = 0;
  $('.quantity-right-plus').click(function (e) {
    e.preventDefault();
    var quantity = parseInt($('#quantity').val());
    $('#quantity').val(quantity + 1);
  });
  $('.quantity-left-minus').click(function (e) {
    e.preventDefault();
    var quantity = parseInt($('#quantity').val());

    if (quantity > 0) {
      $('#quantity').val(quantity - 1);
    }
  });
  $(".list-image").click(function () {
    var src = $(this).attr("src");
    $("#image-show").attr("src", src);
  });
});

function trans(key) {
  var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var translation = key.split('.').reduce(function (t, i) {
    return t[i] || null;
  }, JSON.parse(translations));

  for (var placeholder in replace) {
    translation = translation.replace(":".concat(placeholder), replace[placeholder]);
  }

  return translation;
}

$(document).on("submit", ".add-to-cart", function () {
  if (parseInt($("#quantity-size").text()) > 0) {
    return true;
  }

  alert(trans('message_cart'));
  return false;
});

/***/ }),

/***/ 3:
/*!**********************************************!*\
  !*** multi ./resources/js/product_detail.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/dat/SUN/php_oe29_ecommerce/resources/js/product_detail.js */"./resources/js/product_detail.js");


/***/ })

/******/ });