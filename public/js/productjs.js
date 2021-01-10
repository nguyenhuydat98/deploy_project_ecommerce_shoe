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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/productjs.js":
/*!***********************************!*\
  !*** ./resources/js/productjs.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  $('#dataTables-example').DataTable({
    responsive: true
  });
});
$(document).on("click", ".edit-product", function () {
  $(".loader").show();
  var url = this.getAttribute('data-url');
  $.ajax({
    url: url,
    type: "get",
    success: function success(data) {
      var json = JSON.parse(data);
      $("#formEdit").attr("action", json.url);
      $(".loader").hide();
      $("#name_edit").val(json.name);
      $("#original_price_edit").val(json.original_price);
      $("#current_price_edit").val(json.current_price);
      $('.category option').each(function () {
        if ($(this).val() == json.category) {
          $(this).prop("selected", true);
        }
      });
      $('.brand option').each(function () {
        if ($(this).val() == json.brand) {
          $(this).prop("selected", true);
        }
      });
      CKEDITOR.instances['description_edit'].setData(json.description);
      $("#Modaledit").modal("show");
    },
    error: function error(data) {
      ".loader".hide();
      confirm("not working");
    }
  });
});
$(document).on("submit", ".delete-product", function () {
  return confirm($(this).data('message'));
});

window.confirmDelete = function (e) {
  return confirm(e.getAttribute('data-message'));
};

function createPreviewImages() {
  var preview = document.querySelector('#preview');
  preview.innerHTML = ' ';

  if (this.files) {
    [].forEach.call(this.files, readAndPreview);
  }

  function readAndPreview(file) {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      var image = new Image();
      image.id = "images-product";
      image.height = 100;
      image.title = file.name;
      image.src = this.result;
      preview.appendChild(image);
    });
    reader.readAsDataURL(file);
  }
}

function editPreviewImages() {
  var preview = document.querySelector('#edit-preview');
  preview.innerHTML = ' ';

  if (this.files) {
    [].forEach.call(this.files, readAndPreview);
  }

  function readAndPreview(file) {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      var image = new Image();
      image.id = "images-product";
      image.height = 100;
      image.title = file.name;
      image.src = this.result;
      preview.appendChild(image);
    });
    reader.readAsDataURL(file);
  }
}

document.querySelector('#browse').addEventListener("change", createPreviewImages);
document.querySelector('#edit-browse').addEventListener("change", editPreviewImages);
$(document).ready(function (e) {
  var x = $(".define").data('value');
  var url = $(".define").data('route');

  if (x == "create") {
    $("#myModal").modal("show");
  }

  if (x == "edit") {
    $.ajax({
      url: url,
      type: "get",
      success: function success(data) {
        var json = JSON.parse(data);
        $("#formEdit").attr("action", json.url);
        $(".loader").hide();
        $("#name_edit").val(json.name);
        $("#original_price_edit").val(json.original_price);
        $("#current_price_edit").val(json.current_price);
        $('.category option').each(function () {
          if ($(this).val() == json.category) {
            $(this).prop("selected", true);
          }
        });
        $('.brand option').each(function () {
          if ($(this).val() == json.brand) {
            $(this).prop("selected", true);
          }
        });
        CKEDITOR.instances['description_edit'].setData(json.description);
        $("#Modaledit").modal("show");
      },
      error: function error(data) {
        ".loader".hide();
        alert("not found");
      }
    });
    $("#Modaledit").modal("show");
  }
});

/***/ }),

/***/ 1:
/*!*****************************************!*\
  !*** multi ./resources/js/productjs.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/dat/SUN/php_oe29_ecommerce/resources/js/productjs.js */"./resources/js/productjs.js");


/***/ })

/******/ });