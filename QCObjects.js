/**
 * QCObjects  1.0
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Cross Browser Javascript Framework for MVC Patterns
 * QuickCorp/QCObjects is licensed under the
 * GNU Lesser General Public License v3.0
 * [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
 *
 * Permissions of this copyleft license are conditioned on making available
 * complete source code of licensed works and modifications under the same
 * license or the GNU GPLv3. Copyright and license notices must be preserved.
 * Contributors provide an express grant of patent rights. However, a larger
 * work using the licensed work through interfaces provided by the licensed
 * work may be distributed under different terms and without source code for
 * the larger work.
 *
 * Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
 *
 * Everyone is permitted to copy and distribute verbatim copies of this
 * license document, but changing it is not allowed.
 */
"use strict";
(function() {
  var _protected_code_ = function(_) {
    var __oldtoString = (typeof _.prototype != 'undefined') ? (_.prototype.toString) : (function() {
      return ""
    });
    _.prototype.toString = function() {
      var _protected_symbols = ['ComplexStorageCache',
        'debug',
        'info',
        'warn',
        'QC_Append',
        'set',
        'get',
        'done',
        'componentDone',
        '_new_',
        '__new__',
        'Class',
        'ClassFactory',
        'New',
        'Export',
        'Package',
        'Import',
        'subelements',
        'componentLoader',
        'buildComponents',
        'Controller',
        'View',
        'VO',
        'Service',
        'serviceLoader',
        'JSONService',
        'ConfigService',
        'SourceJS',
        'SourceCSS',
        'ArrayList',
        'ArrayCollection',
        'Effect',
        'Timer'
      ];
      var _ret_;
      if (_protected_symbols.includes(this.name)) {
        _ret_ = this.name + "{ [QCObjects native code] }";
      } else {
        _ret_ = __oldtoString.call(this);
      }
      return _ret_;
    };
  };
  (_protected_code_)(Function);
  var _methods_ = function(_) {
    var _m = [];
    for (var i in _) {
      if ((typeof _[i]).toLowerCase() === 'function') {
        _m.push(_[i]);
      }
    }
    return _m;
  };

  var isBrowser = typeof self !== 'undefined' && typeof window !== 'undefined' && window === self;
  var _DOMCreateElement = function(elementName) {
    var _ret_;
    if (isBrowser) {
      _ret_ = document.createElement(elementName);
    } else {
      _ret_ = new Object();
    }
    return _ret_;
  };

  if (!isBrowser) {
    const fs = require('fs');
  }

  var _DataStringify = function(data) {
    var getCircularReplacer = function() {
      var seen = new WeakSet();
      var _level = 0;
      return function(key, value) {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            _level += 1;
            return (_level <= 3) ? (_LegacyCopy(value)) : (null);
          }
          seen.add(value);
        }
        return value;
      };
    };
    return JSON.stringify(data, getCircularReplacer());
  };

  if (isBrowser) {
    var _subelements = function subelements(selector) {
      return [...this.querySelectorAll(selector)];
    };
    Element.prototype.subelements = _subelements;
    HTMLDocument.prototype.subelements = _subelements;
    HTMLElement.prototype.subelements = _subelements;
  }
  var _top;
  if (isBrowser) {
    try {
      _top = (typeof window.top != 'undefined') ? (window.top) : (window);
      _top['_allowed_'] = true;
    } catch (e) {
      try {
        _top = document;
        _top['_allowed_'] = true;
      } catch (e2) {
        try {
          _top = global;
          _top['_allowed_'] = true;
        } catch (e3) {
          _top = {};
          _top['_allowed_'] = true;
        }
      }
    }
  } else if (typeof global !== 'undefined') {
    _top = global;
  }
  var basePath = (
    function() {
      var _basePath = '';
      if (isBrowser) {
        var baseURI = _top.document.baseURI.split('/');
        baseURI.pop();
        _basePath = baseURI.join('/') + '/';
      } else {
        var process;
        try {
          process = require('process');
        } catch (e) {
          // not a process module
        }
        if (typeof process != 'undefined') {
          _basePath = `${process.cwd()}/`;
        } else {
          _basePath = '';
        }
      }
      return _basePath;
    }
  )();
  if (isBrowser) {
    /**
     * Polyfilling Promise
     */
    if (!('Promise' in _top)) {
      _top.Promise = function(_f) {
        var _p = {
          then: function() {},
          catch: function() {},
          _then: function(response) {
            this.then.call(_p, response);
          },
          _catch: function(response) {
            this.catch.call(_p, response);
          }
        };
        _f.call(_p, _p._then, _p._catch);
        return _p;
      };
    }
    if (typeof _top.console == 'undefined') {
      _top.console = function() {};
      _top.console.prototype.log = function(message) {};
    };


    var domain = (
      function() {
        return (typeof document != 'undefined' && document.domain != '') ? (document.domain) : ('localhost');
      }
    )();

    var _secretKey = (
      function() {
        var __secretKey = _top[(![] + [])[((+!+[]) + (+!+[]))] + (typeof ![])[(+!+[])] + (typeof [])[((+!+[]) + (+!+[])) * ((+!+[]) + (+!+[]))] + (![] + [])[(+!+[])] + (!![] + [])[(+[])] + ([] + [] + [][
          []
        ])[(+[+!+[] + [+[]]]) / ((+!+[]) + (+!+[]))] + (typeof ![])[(+!+[])] + ([] + [] + [][
          []
        ])[(+!+[])]]['h' + (typeof ![])[(+!+[])] + (![] + [])[(+!+[] + ((+!+[]) + (+!+[])))] + (!![] + [])[(+[])]].toLowerCase();
        return __secretKey;
      }
    )();
    var is_phonegap = (
      function() {
        return (typeof cordova != 'undefined') ? (true) : (false);
      }
    )();

  } else {
    // This is only for code integrity purpose using non-browser implementations
    // like using node.js
    var _secretKey = 'secret';
    var domain = 'localhost';
  }

  _top._asyncLoad = [];
  var asyncLoad = function(callback, args) {
    var asyncCallback = {
      'func': callback,
      'args': args,
      'dispatch': function() {
        this.func.apply(null, this.args);
      }
    };
    _top._asyncLoad.push(asyncCallback);
    return asyncCallback;
  };

  if (isBrowser) {
    var _fireAsyncLoad = function() {
      if (document.readyState == "complete") {
        for (var f in _top._asyncLoad) {
          var fc = _top._asyncLoad[f];
          fc.dispatch();
        }
      }
    };
    document.onreadystatechange = _fireAsyncLoad;
  } else if (typeof global !== 'undefined') {
    global._fireAsyncLoad = function() {
      for (var f in _top._asyncLoad) {
        var fc = _top._asyncLoad[f];
        fc.dispatch();
      }
    };
  }

  _top.asyncLoad = asyncLoad;
  var Logger = function() {
    return {
      debugEnabled: true,
      infoEnabled: true,
      warnEnabled: true,
      debug: function(message) {
        if (this.debugEnabled) {
          console.log('\x1b[35m%s\x1b[0m','[DEBUG] ' + message);
        }
      },
      info: function(message) {
        if (this.infoEnabled) {
          console.info('\x1b[33m%s\x1b[0m','[INFO] ' + message);
        }
      },
      warn: function(message) {
        if (this.warnEnabled) {
          console.warn('\x1b[31m%s\x1b[0m','[WARN] ' + message);
        }
      }
    }
  };
  var logger = new Logger();
  logger.debugEnabled = false;
  logger.infoEnabled = false;
  _top.logger = logger;
  var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
      var t = "";
      var n, r, i, s, o, u, a;
      var f = 0;
      e = Base64._utf8_encode(e);
      while (f < e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        i = e.charCodeAt(f++);
        s = n >> 2;
        o = (n & 3) << 4 | r >> 4;
        u = (r & 15) << 2 | i >> 6;
        a = i & 63;
        if (isNaN(r)) {
          u = a = 64
        } else if (isNaN(i)) {
          a = 64
        }
        t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
      }
      return t
    },
    decode: function(e) {
      var t = "";
      var n, r, i;
      var s, o, u, a;
      var f = 0;
      e = e.replace(/[^A-Za-z0-9+/=]/g, "");
      while (f < e.length) {
        s = this._keyStr.indexOf(e.charAt(f++));
        o = this._keyStr.indexOf(e.charAt(f++));
        u = this._keyStr.indexOf(e.charAt(f++));
        a = this._keyStr.indexOf(e.charAt(f++));
        n = s << 2 | o >> 4;
        r = (o & 15) << 4 | u >> 2;
        i = (u & 3) << 6 | a;
        t = t + String.fromCharCode(n);
        if (u != 64) {
          t = t + String.fromCharCode(r)
        }
        if (a != 64) {
          t = t + String.fromCharCode(i)
        }
      }
      t = Base64._utf8_decode(t);
      return t
    },
    _utf8_encode: function(e) {
      e = e.replace(/rn/g, "n");
      var t = "";
      for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r)
        } else if (r > 127 && r < 2048) {
          t += String.fromCharCode(r >> 6 | 192);
          t += String.fromCharCode(r & 63 | 128)
        } else {
          t += String.fromCharCode(r >> 12 | 224);
          t += String.fromCharCode(r >> 6 & 63 | 128);
          t += String.fromCharCode(r & 63 | 128)
        }
      }
      return t
    },
    _utf8_decode: function(e) {
      var t = "";
      var n = 0;
      var r = 0;
      var c1 = 0;
      var c2 = 0;
      while (n < e.length) {
        r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r);
          n++
        } else if (r > 191 && r < 224) {
          c2 = e.charCodeAt(n + 1);
          t += String.fromCharCode((r & 31) << 6 | c2 & 63);
          n += 2
        } else {
          c2 = e.charCodeAt(n + 1);
          c3 = e.charCodeAt(n + 2);
          t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
          n += 3
        }
      }
      return t
    }
  };
  var waitUntil = function(func, exp) {
    var _waitUntil = function(func, exp) {
      var maxWaitCycles = 2000;
      var _w = 0;
      var _t = setInterval(function() {
        if (exp.call()) {
          clearInterval(_t);
          func.call();
          logger.debug('Ejecuting ' + func.name + ' after wait');
        } else {
          if (_w < maxWaitCycles) {
            _w += 1;
            logger.debug('WAIT UNTIL ' + func.name + ' is true, ' + _w.toString() + ' cycles');
          } else {
            logger.debug('Max execution time for ' + func.name + ' expression until true');
            clearInterval(_t);
          }
        }
      }, 1);
    };
    setTimeout(function() {
      _waitUntil(func, exp);
    }, 1);
  };
  var ComplexStorageCache = function(params) {
    var object, load, alternate;
    object = params.index;
    load = params.load;
    alternate = params.alternate;
    var cachedObjectID = this.getID(object);
    var cachedResponse = localStorage.getItem(cachedObjectID);
    if (this.isEmpty(cachedResponse)) {
      var cachedNewResponse = load.call(null, {
        'cachedObjectID': cachedObjectID,
        'cachedResponse': cachedResponse,
        'cache': this
      });
      this.save(object, cachedNewResponse);
      logger.debug('RESPONSE OF {{cachedObjectID}} CACHED'.replace('{{cachedObjectID}}', cachedObjectID));
    } else {
      var alternateResponse = alternate.call(null, {
        'cachedObjectID': cachedObjectID,
        'cachedResponse': cachedResponse,
        'cache': this
      });
      logger.debug('RESPONSE OF {{cachedObjectID}} IS ALREADY CACHED '.replace('{{cachedObjectID}}', cachedObjectID));
    }
    return this;
  };
  ComplexStorageCache.prototype.getItem = function(cachedObjectID) {
    var retrievedObject = localStorage.getItem(cachedObjectID);
    if (!this.isEmpty(retrievedObject)) {
      return JSON.parse(retrievedObject);
    } else {
      return null;
    }
  };
  ComplexStorageCache.prototype.setItem = function(cachedObjectID, value) {
    localStorage.setItem(cachedObjectID, _DataStringify(value));
  };
  ComplexStorageCache.prototype.isEmpty = function(object) {
    var r = false;
    switch (true) {
      case (typeof object == 'undefined'):
      case (typeof object == 'string' && object == ""):
      case (typeof object == 'string' && object == "undefined"):
      case (typeof object == 'numeric' && object == 0):
      case (object == null):
        r = true;
        break;
      default:
        r = false;
    }
    return r;
  };
  ComplexStorageCache.prototype.getID = function(object) {
    var cachedObjectID = 'cachedObject_' + Base64.encode(_DataStringify(object).replace(',', '_').replace('{', '_').replace('}', '_'));
    return cachedObjectID;
  };
  ComplexStorageCache.prototype.save = function(object, cachedNewResponse) {
    var cachedObjectID = this.getID(object);
    logger.debug('CACHING THE RESPONSE OF {{cachedObjectID}} '.replace('{{cachedObjectID}}', cachedObjectID));
    this.setItem(cachedObjectID, cachedNewResponse);
  };
  ComplexStorageCache.prototype.getCached = function(object) {
    var cachedObjectID = this.getID(object);
    return this.getItem(cachedObjectID);
  };
  ComplexStorageCache.prototype.clear = function() {
    for (var c in localStorage) {
      if (c.startsWith('cachedObject_')) {
        localStorage.removeItem(c);
      }
    }
  };

  /**
   *  Detecting passive events feature
   *
   * https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
   **/

  // Test via a getter in the options object to see if the passive property is accessed
  if (isBrowser) {
    var supportsPassive = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true;
        }
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
    } catch (e) {}
    var captureFalse = function() {
      return (supportsPassive) ? ({
        passive: true
      }) : (false);
    };

    // Use our detect's results. passive applied if supported, capture will be false either way.
    //elem.addEventListener('touchstart', fn, captureFalse);

  }


  /**
   * Basic Type of all elements
   */
  var QC_Object = function() {};
  QC_Object.prototype = {
    find: function(tag) {
      var _oo = [];
      if (isBrowser) {
        var _tags = document.subelements(tag);
        for (var _t in _tags) {
          var _tt = _tags[_t];
          if ((typeof _tags[_t] != 'undefined') && _tags[_t].parentNode.tagName == this.parentNode.tagName) {
            _oo.push(_Cast(_tt, (new QC_Object())));
          }
        }
      } else {
        //not implemented yet.
      }
      return _oo;
    }
  };

  /**
   * Primary instance ID of all objects
   */
  var __instanceID;
  // Adaptation of Production steps of ECMA-262, Edition 5, 15.2.3.5
  // Reference: http://es5.github.io/#x15.2.3.5
  Object.create = (function() {

    // make a safe reference to Object.prototype.hasOwnProperty
    var hasOwn = Object.prototype.hasOwnProperty;

    return function(O) {
      // 1. If Type(O) is not Object or Null throw a TypeError exception.
      if (typeof O != 'object') {
        throw TypeError('Object prototype may only be an Object or null. The type is ' + typeof(O));
      }

      // 2. Let obj be the result of creating a new object as if by the
      //		expression new Object() where Object is the standard built-in
      //		constructor with that name
      // 3. Set the [[Prototype]] internal property of obj to O.
      QC_Object.prototype = O;
      var obj = new QC_Object();
      QC_Object.prototype = null;
      // Let's not keep a stray reference to O...

      // 4. If the argument Properties is present and not undefined, add
      //		own properties to obj as if by calling the standard built-in
      //		function Object.defineProperties with arguments obj and
      //		Properties.
      if (arguments.length > 1) {
        // Object.defineProperties does ToObject on its first argument.
        var Properties = Object(arguments[1]);
        for (var prop in Properties) {
          if (hasOwn.call(Properties, prop)) {
            obj[prop] = Properties[prop];
          }
        }
      }

      // 5. Return obj
      return obj;
    };
  })();

  // Object.assign Polyfilling
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
  if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  };
  var _LegacyCopy = function(obj) {
    return Object.assign({}, obj);
  };


  var _QC_CLASSES = {};
  var _QC_PACKAGES = {};
  var _QC_PACKAGES_IMPORTED = [];
  var _QC_READY_LISTENERS = [];

  /**
   * Returns the object or function name
   *
   * @param Object or function
   */
  var ObjectName = function(o) {
    var ret = '';
    if (typeof o.constructor == 'function') {
      ret = o.constructor.name;
    } else if (typeof o.constructor == 'object') {
      ret = o.constructor.toString().split(' ')[1].replace(']', '');
    }
    return ret;
  };

  /**
   * Casts an object to another object class type
   *
   * @param {Object} obj_source
   * @param {Object} obj_dest
   */
  var _Cast = function(obj_source, obj_dest) {
    for (var v in obj_source) {
      if (typeof obj_source[v] != 'undefined') {
        try {
          obj_dest[v] = obj_source[v];
        } catch (e) {

        }
      }
    }
    return obj_dest;
  };

  /**
   * Casts an object to another object class type. Only properties
   *
   * @param {Object} obj_source
   * @param {Object} obj_dest
   */
  var _CastProps = function(obj_source, obj_dest) {
    for (var v in obj_source) {
      if (typeof obj_source[v] != 'undefined' && typeof obj_source[v] != 'function') {
        try {
          obj_dest[v] = obj_source[v];
        } catch (e) {

        }
      } else if (typeof obj_source[v] == 'function'){
        try {
          obj_dest[v] = obj_source[v].bind(obj_dest);
        } catch (e) {

        }
      }
    }
    return obj_dest;
  };

  /**
   * Creates new object class  of another object
   *
   * @param {String} name
   * @param {Object} type
   * @param {Object} definition
   */
  var Class = function(name, type, definition) {
    var o;
    var name = arguments[0];
    if (isBrowser) {
      var type = (arguments.length > 2) ? (arguments[1]) : (HTMLElement);
    } else {
      var type = (arguments.length > 2) ? (arguments[1]) : (Object);
    }
    var definition = (arguments.length > 2) ? (arguments[2]) : (
      (arguments.length > 1) ? (arguments[1]) : ({})
    );

    if (typeof type == 'undefined') {
      if (isBrowser) {
        type = HTMLElement; // defaults to HTMLElement type
      } else {
        type = Object;
      }
    } else {
      definition = _Cast(
        (typeof definition == 'undefined') ? ({}) : (definition),
        (typeof type['__definition'] != 'undefined') ? (_LegacyCopy(type.__definition)) : ({})
      );
    }

    type = (type.hasOwnProperty('prototype')) ? (type.prototype) : (_LegacyCopy(type));

    if (typeof definition != 'undefined' && !definition.hasOwnProperty('__new__')) {
      definition['__new__'] = function(properties) {
        _CastProps(properties, this);
      };
      (_protected_code_)(definition['__new__']);
    }

    if (typeof definition != 'undefined' && !definition.hasOwnProperty('css')) {
      definition['css'] = function QC_CSS3(_css) {
        if (typeof this['body'] != 'undefined' && this['body']['style'] != 'undefined') {
          logger.debug('body style');
          this['body']['style'] = _Cast(_css, this['body']['style']);
        }
      };
      (_protected_code_)(definition['css']);
    }
    if (typeof definition != 'undefined' && !definition.hasOwnProperty('hierarchy')) {
      definition['hierarchy'] = function hierarchy() {
        var __classType = function(o_c) {
          return (o_c.hasOwnProperty('__classType')) ? (o_c.__classType) : ((o_c.hasOwnProperty('__definition')) ? (o_c.__definition.__classType) : (ObjectName(o_c)));
        }
        var __hierarchy = [];
        __hierarchy.push(__classType(this));
        if (this.hasOwnProperty('__definition')) {
          __hierarchy = __hierarchy.concat(this.__definition.hierarchy.call(this.__definition));
        }
        return __hierarchy;
      }
    }

    if (typeof definition != 'undefined' && !definition.hasOwnProperty('append')) {
      definition['append'] = function QC_Append() {
        var child = (arguments.length > 0) ? (arguments[0]) : (this['body']);
        if (typeof this['body'] != 'undefined') {
          logger.debug('append element');
          if (arguments.lenght > 0) {
            logger.debug('append to element');
            this['body'].append(child);
            if (typeof this['childs'] == 'undefined') {
              this['childs'] = [];
            }
            this['childs'].push(child);
          } else {
            if (isBrowser) {
              logger.debug('append to body');
              document.body.append(child);
            }
          }
        }
      };
      (_protected_code_)(definition['append']);
    }

    if (typeof definition != 'undefined' && !definition.hasOwnProperty('attachIn')) {
      definition['attachIn'] = function QC_AttachIn(tag) {
        if (isBrowser) {
          var tags = document.subelements(tag);
          for (var i = 0, j = tags.length; i < j; i++) {
            tags[i].append(this);
          };
        } else {
          // not yet implemented.
        }
      };
      (_protected_code_)(definition['attachIn']);
    }
    // hack to prevent pre-population of __instanceID into the class definition
    if (definition.hasOwnProperty('__instanceID')){
      delete definition.__instanceID;
    }
    o = Object.create(type, definition);
    o['__definition'] = definition;
    o['__definition']['__classType'] = name;
    _QC_CLASSES[name] = o;
    _top[name] = _QC_CLASSES[name];
    return _top[name];
  };
  Class.prototype.toString = function() {
    return "Class(name, type, definition) { [QCObjects native code] }";
  };

  /**
   * Returns the QCObjects Class Factory of a given ClassName
   *
   * @param {String} name
   */

  var ClassFactory = function(className) {
    var _classFactory;
    if (className != null && className.indexOf('.')>-1){
      var packageName = className.split('.').slice(0,className.split('.').length-1).join('.');
      var _className = className.split('.').slice(-1).join('');
      var _package = Package(packageName);
      var packageClasses = (typeof _package != 'undefined')?(_package.filter(classFactory=>{
        return typeof classFactory !== 'undefined'
            && classFactory.hasOwnProperty('__definition')
            && isQCObjects_Class(classFactory)
            && classFactory.__definition.__classType==_className
            && !classFactory.hasOwnProperty('__instanceID')}).reverse()):([]);
      if (packageClasses.length>0){
        _classFactory = packageClasses[0]
      }
    } else if (className != null && _QC_CLASSES.hasOwnProperty(className)) {
      _classFactory = _QC_CLASSES[className];
    }
    return _classFactory;
  };


  if (isBrowser) {
    Element.prototype.append = function QC_Append(child) {
      if (typeof child.__definition != 'undefined' && typeof child.__definition.__classType != 'undefined' && typeof child.body) {
        this.appendChild(child.body);
      } else {
        this.appendChild(child);
      }
    };

    Element.prototype.render = function QC_Render(content) {
      var _self = this;
      var _appendVDOM = function (_self,content){
        if (typeof document.implementation.createHTMLDocument !== 'undefined'){
          var doc = document.implementation.createHTMLDocument("");
          doc.innerHTML = content;
          doc.body.subelements('*').map(function (element){
            _self.append(element);
          });
        }
      };
      if (typeof this.innerHTML !== 'undefined'){
        try {
          this.innerHTML += content;
        }catch (e){
          _appendVDOM(_self,content);
        }
      }
    };
  }

  /**
   * Returns a method from a superior QCObjects Class
   * It is useful for Class Inheritance in the _new_ and __new__ method constructors
   * @example _super_('MySuperClass','MySuperMethod').call(this,params) #where this is the current instance and params are method parameters
   *
   * @param {String} className
   * @param {String} classMethodName
   * @param {Object} params
   */
  var _super_ = function(className, classMethodName, params) {
    return ClassFactory(className)[classMethodName];
  };
  _super_.prototype.toString = function() {
    return "_super_(className,classMethodName,params) { [QCObjects native code] }";
  };

  /**
   * Creates an object from a Class definition
   *
   * @param {QC_Object} o
   * @param {Object} args
   */
  var New = function(c, args) {
    var args = (arguments.length > 1) ? (arguments[1]) : ({});
    Object.__instanceID = (typeof Object.__instanceID == 'undefined' || Object.__instanceID == null) ? (0) : (Object.__instanceID + 1);
    __instanceID = Object.__instanceID;
    var c_new = (typeof c == 'undefined') ? (Object.create((new Object()).constructor.prototype, {})) : (Object.create(c.constructor.prototype, c.__definition));
    c_new.__definition = _Cast({
      '__instanceID': __instanceID
    }, (typeof c != 'undefined') ? (c.__definition) : ({}));
    c_new['__instanceID'] = __instanceID;
    if (c_new.hasOwnProperty('definition') && typeof c_new.__definition != 'undefined' && c_new.__definition != null) {
      c_new.__definition['__instanceID'] = __instanceID;
    }
    if (c_new.hasOwnProperty('__new__')) {
      if (typeof c_new != 'undefined' && !c_new.__definition.hasOwnProperty('body')) {
        try {
          if (isBrowser) {
            c_new['body'] = _Cast(c_new['__definition'], _DOMCreateElement(c_new.__definition.__classType));
            c_new['body']['style'] = _Cast(c_new.__definition, c_new['body']['style']);
          } else {
            c_new['body'] = new Object();
            c_new['body']['style'] = new Object();
          }
        } catch (e) {
          c_new['body'] = new Object();
          c_new['body']['style'] = new Object();
        }
      } else if (c_new.__definition.hasOwnProperty('body')) {
        c_new['body'] = c_new.__definition.body;
      }
      c_new.__new__(args);
      if (c_new.hasOwnProperty('_new_')) {
        c_new._new_(args);
      }
    }
    return c_new;
  };
  New.prototype.toString = function() {
    return "New(QCObjectsClassName, args) { [QCObjects native code] }";
  };

  var Export = function(f) {
    if (isBrowser) {
      try {
        _top[f.name] = f;
        window[f.name] = f;
      } catch (e) {}
    } else if (typeof global !== 'undefined') {
      if (!global.hasOwnProperty(f.name)) {
        global[f.name] = f;
      }
    }
  };
  Export.prototype.toString = function() {
    return "Export(function or symbol) { [QCObjects native code] }";
  };

  if (!isBrowser) {
    var findPackageNodePath = function(packagename) {
      const fs = require('fs');
      var sdkPath = null;
      try {
        var sdkPaths = [
          `${CONFIG.get('projectPath')}${CONFIG.get('relativeImportPath')}`,
          `${CONFIG.get('basePath')}${CONFIG.get('relativeImportPath')}`,
          `${CONFIG.get('projectPath')}`,
          `${CONFIG.get('basePath')}`,
          `${CONFIG.get('relativeImportPath')}`,
          `${process.cwd()}${CONFIG.get('relativeImportPath')}`,
          `${process.cwd()}/node_modules/` + packagename,
          `${process.cwd()}/node_modules`,
          `${process.cwd()}`,
          'node_modules',
          './',
          ''
        ].concat(module.paths);
        sdkPaths = sdkPaths.filter(p => {
          return fs.existsSync(p + '/' + packagename)
        });
        if (sdkPaths.length > 0) {
          sdkPath = sdkPaths[0];
          logger.info(packagename + ' is Installed.');
        } else {
//          logger.debug(packagename + ' is not in a standard path.');
        }
      } catch (e) {
        // do nothing
        console.log(e)
      }
      return sdkPath;
    }
    Export(findPackageNodePath);
  }

  Class('_Crypt', Object, {
    last_string: "",
    last_key: "",
    construct: false,
    _new_: function(o) {
      var string = o['string'];
      var key = (o.hasOwnProperty('key')) ? (o['key']) : (null);
      this.__new__(o);
      key = (key == null) ? (this.__instanceID) : (key);
      this.last_key = key;
      this.last_string = string;
      this.construct = true;
    },
    _encrypt: function() {
      var string = this.last_string;
      var key = this.last_key;
      var result = '';
      var char;
      var keychar;
      for (var i = 0; i < string.length; i++) {
        char = string.substr(i, 1);
        keychar = key.substr((i % key.length) - 1, 1);
        char = String.fromCharCode(char.charCodeAt(0) + keychar.charCodeAt(0));
        result += char;
      }
      this.last_string = Base64.encode(result);
      return this.last_string;
    },
    _decrypt: function() {
      var string = this.last_string;
      var key = this.last_key;
      var result = '';
      var char;
      var keychar;
      string = Base64.decode(string);
      for (var i = 0; i < string.length; i++) {
        char = string.substr(i, 1);
        keychar = key.substr((i % key.length) - 1, 1);
        char = String.fromCharCode(char.charCodeAt(0) - keychar.charCodeAt(0));
        result += char;
      }

      this.last_string = result;
      return this.last_string;
    },
    encrypt: function(string, key) {
      var crypt = New(_Crypt, {
        string: string,
        key: key
      });
      return crypt._encrypt();
    },
    decrypt: function(string, key) {
      var crypt = New(_Crypt, {
        string: string,
        key: key
      });
      return crypt._decrypt();
    }
  });

  var _CryptObject = function(o) {
    return _Crypt.encrypt(_DataStringify(o), _secretKey);
  };
  var _DecryptObject = function(s) {
    return JSON.parse(_Crypt.decrypt(s, _secretKey));
  };

  Class('CONFIG', Object, {
    _CONFIG: {
      'relativeImportPath': '',
      'remoteImportsPath': '',
      'remoteSDKPath': 'https://sdk.qcobjects.dev/',
      'asynchronousImportsLoad': false,
      'removePackageScriptAfterLoading':true,
      'componentsBasePath': '',
      'delayForReady': 0,
      'preserveComponentBodyTag': true,
      'overrideComponentTag': false,
      'useConfigService': false,
      'routingWay': 'hash',
      'useSDK': true,
      'useLocalSDK': false,
      'basePath': basePath
    },
    _CONFIG_ENC: _Crypt.encrypt(_DataStringify({}), _secretKey),
    set: function(name, value) {
      // hack to force update basePath from CONFIG
      if (name == 'basePath') {
        basePath = value;
      }
      var _conf = (
        function(config) {
          var _protectedEnc = config._CONFIG_ENC.valueOf();
          var _protectedConf = config._CONFIG.valueOf();
          return _CastProps(_protectedConf, _DecryptObject(_protectedEnc));
        }
      )(this);

      _conf[name] = value;
      this._CONFIG_ENC = _CryptObject(_conf);
      if (this._CONFIG.hasOwnProperty(name)) {
        this._CONFIG[name] = value;
      }
    },
    get: function(name,_default) {
      var _value;
      try {
        var _conf = (
          function(config) {
            var _protectedEnc = config._CONFIG_ENC.valueOf();
            var _protectedConf = config._CONFIG.valueOf();
            return _CastProps(_protectedConf, _DecryptObject(_protectedEnc));
          }
        )(this);
        if (typeof _conf[name] !== 'undefined'){
          _value = _conf[name];
        } else  if (typeof _default !== 'undefined'){
          _value = _default;
        }
      } catch (e){
        logger.debug('Something wrong when trying to get CONFIG values');
        logger.debug('No config value for: '+name);
        _value = _default;
      }
      return _value;
    }
  });

  Export(CONFIG);
  Export(waitUntil);
  Export(_super_);
  Export(ComplexStorageCache);
  Export(ClassFactory);

  var isQCObjects_Object = function (_){
    return (typeof _ == 'object'
            && _.hasOwnProperty('__classType')
            && _.hasOwnProperty('__instanceID')
            && _.hasOwnProperty('__definition')
            && typeof _.__definition !== 'undefined'
          )?(true):(false);
  }

  var isQCObjects_Class = function (_){
    return (typeof _ == 'object'
            && (!_.hasOwnProperty('__instanceID'))
            && _.hasOwnProperty('__definition')
            && typeof _.__definition !== 'undefined'
            && _.__definition.hasOwnProperty('__classType')
          )?(true):(false);
  }

  /**
   * Defines a package for Class classification
   *
   * @param {Object} namespace
   * @param {Object} classes
   */
  var Package = function(namespace, classes) {
    if (_QC_PACKAGES.hasOwnProperty(namespace) &&
      typeof _QC_PACKAGES[namespace] != 'undefined' &&
      _QC_PACKAGES[namespace].hasOwnProperty('length') &&
      _QC_PACKAGES[namespace].length > 0 &&
      typeof classes !== 'undefined' &&
      classes.hasOwnProperty('length') &&
      classes.length > 0
    ) {
        for (var _c in classes.filter(
          function (_c1){
            return isQCObjects_Class(_c1)
          }
        )){
            classes[_c].__definition.__namespace = namespace;
        }
      _QC_PACKAGES[namespace] = _QC_PACKAGES[namespace].concat(classes);
    } else if (typeof classes != 'undefined'){
      if (typeof classes == 'object' && classes.hasOwnProperty('length')){
        for (var _c in classes.filter(
          function (_c1){
            return isQCObjects_Class(_c1)
          }
        )){
            classes[_c].__definition.__namespace = namespace;
        }
      } else if (isQCObjects_Class(classes)) {
        classes.__definition.__namespace = namespace;
      }
      _QC_PACKAGES[namespace] = classes;
    }
    return (_QC_PACKAGES.hasOwnProperty(namespace))?(_QC_PACKAGES[namespace]):(undefined);
  };
  Package.prototype.toString = function() {
    return "Package(namespace, classes) { [QCObjects native code] }";
  };


  /**
   * Imports a script with the package nomenclature
   *
   * @param {Object} packagename
   * @param {Object} ready
   * @param {Boolean} external
   */
  var Import = function() {
    var packagename;
    var ready = function() {};
    var external = false;
    if (arguments.length < 1) {
      return;
    } else if (arguments.length == 1) {
      packagename = arguments[0];
    } else if (arguments.length == 2) {
      packagename = arguments[0];
      ready = arguments[1];
    } else if (arguments.length > 2) {
      packagename = arguments[0];
      ready = arguments[1];
      external = arguments[2];
      logger.debug('[Import] Setting external=' + external.toString() + ' resource to import: ' + packagename);
    }
    if (external) {
      logger.debug('[Import] Registering external resource to import: ' + packagename);
    } else {
      logger.debug('[Import] Registering local resource to import: ' + packagename);
    }
    var _promise_import_;
    if (isBrowser) {
      _promise_import_ = new Promise(function(resolve, reject) {

        var allPackagesImported = function() {
          var ret = false;
          var cp = 0;
          for (var p in _QC_PACKAGES) {
            cp++;
          }
          if (cp < _QC_PACKAGES_IMPORTED.length) {
            ret = false;
          } else {
            ret = true;
          }
          return ret;
        };

        var readyImported = function(e) {
          _QC_PACKAGES_IMPORTED.push(ready);
          if (allPackagesImported()) {
            for (var _r in _QC_PACKAGES_IMPORTED) {
              _QC_READY_LISTENERS.push(_QC_PACKAGES_IMPORTED[_r]);
            }
          }
          if (isBrowser && CONFIG.get('removePackageScriptAfterLoading')){
            e.target.remove();
          }
          resolve.call(_promise_import_, {
            '_imported_': e.target,
            '_package_name_': packagename
          });
        };

        if (!_QC_PACKAGES.hasOwnProperty(packagename)) {
          var s1 = _DOMCreateElement('script');
          s1.type = 'text/javascript';
          s1.async = (CONFIG.get('asynchronousImportsLoad')) ? (true) : (false);
          s1.onreadystatechange = function() {
            if (s1.readyState == 'complete') {
              readyImported.call();
            }
          };
          s1.onload = readyImported;
          s1.onerror = function(e) {
            reject.call(_promise_import_, {
              '_imported_': s1,
              '_package_name_': packagename
            });
          };
          s1.src = (external) ? (CONFIG.get('remoteImportsPath') + packagename + '.js') : (basePath + CONFIG.get('relativeImportPath') + packagename + '.js');
          document.getElementsByTagName('head')[0].appendChild(s1);
        }
      });
      _promise_import_.catch(function() {
        logger.debug('Import: Error loading a package ');
      });

    } else {
      // support to be used in a nodejs environment
      _promise_import_ = new Promise(function(resolve, reject) {
        try {
          var standardNodePath = findPackageNodePath(packagename);
          var packageAbsoluteName = '';
          if (standardNodePath !== null) {
            packageAbsoluteName = standardNodePath + '/' + packagename;
          } else {
            var jsNodePath = findPackageNodePath(packagename + '.js');
            if (jsNodePath !== null) {
              packageAbsoluteName = jsNodePath + '/' + packagename + '.js';
            } else {
              packageAbsoluteName = basePath + CONFIG.get('relativeImportPath') + packagename;
            }
          }
          resolve.call(_promise_import_, {
            '_imported_': require(packageAbsoluteName),
            '_package_name_': packagename
          });
        } catch (e) {
          console.log(e);
          reject.call(_promise_import_, {
            '_imported_': null,
            '_package_name_': packagename
          });
        }
      }).catch(function(e) {
        // something wrong importing a package
        console.log(e);
        logger.debug('Something happened when importing ' + packagename);
      });
    }
    return _promise_import_;
  };
  Import.prototype.toString = function() {
    return "Import(packagename,ready,external) { [QCObjects native code] }";
  };

  if (isBrowser) {
    /**
     * Adds a Cast functionality to every Element of DOM
     */
    Element.prototype.Cast = function QC_Object(_o) {
      _o.__definition.body = this;
      var _o = New(_o);
      return _o;
    };
  }

  Class('TagElements', Array, {
    show: function() {
      this.map(function(element) {
        element.style.opacity = 1;
      });
    },
    hide: function() {
      this.map(function(element) {
        element.style.opacity = 0;
      });
    },
    effect: function() {
      var effectArguments = [...arguments].slice(1);
      var effectClass = arguments[0];
      if ((typeof effectClass).toLowerCase() == 'string') {
        effectClass = ClassFactory(effectClass);
      }
      this.map(function(element) {
        effectClass.apply.apply(effectClass, [element].concat(effectArguments));
      });
    },
    findElements: function(elementName) {
      var _o = New(TagElements);
      if (isBrowser) {
        for (var _k in this) {
          if (typeof _k === 'number' && typeof this[_k] != 'function' && this[_k].hasOwnProperty('subelements')) {
            _o.push(this[_k].subelements(elementName));
          }
        }
      } else {
        // not yet implemented.
      }
      return _o;
    }
  });

  /**
   * Gets the element of DOM found by tag name
   *
   * @param {Object} tagname
   * @param {Object} innerHTML
   */
  var Tag = function(tagname, innerHTML) {
    var _o = New(TagElements);
    if (isBrowser) {
      var o = document.subelements(tagname);
      var addedKeys = []
      for (var _i = 0; _i < o.length; _i++) {
        if (typeof innerHTML != 'undefined' && o[_i].hasOwnProperty('innerHTML')) {
          o[_i].innerHTML = innerHTML;
        }
        if (addedKeys.indexOf(_i) < 0) {
          _o.push(o[_i]);
          addedKeys.push(_i);
        }
      }
    } else {
      // not yet implemented.
    }
    return _o;
  };

  /**
   * Defines a Custom Ready listener
   */
  function Ready(e) {
    if (isBrowser) {
      _QC_READY_LISTENERS.push(e.bind(window));
    } else if (typeof global !== 'undefined') {
      _QC_READY_LISTENERS.push(e.bind(global));
    }
  }
  var ready = Ready; // case insensitive ready option

  /**
   * Default Ready event function for window. Executes all micro ready events of Import calls
   *
   * @param {Object} e
   */
  var _Ready = function(e) {
    var _execReady = function() {
      for (var _r in _QC_READY_LISTENERS) {
        if (typeof _QC_READY_LISTENERS[_r] == 'function') {
          _QC_READY_LISTENERS[_r].call();
          delete _QC_READY_LISTENERS[_r];
        }
      }
    };
    if (CONFIG.get('delayForReady') > 0) {
      if (isBrowser) {
        setTimeout(_execReady.bind(window), CONFIG.get('delayForReady'));
      } else if (typeof global !== 'undefined') {
        setTimeout(_execReady.bind(global), CONFIG.get('delayForReady'));
      }
    } else {
      _execReady.call(_top);
    };
  };

  if (isBrowser) {
    window.onload = _Ready;
    if (is_phonegap) {
      document.addEventListener('deviceready', _Ready, captureFalse);
    }
  } else {
    global.onload = _Ready;
  }

  /**
   * Dynamic Data Objects Class
   * Usage:
   * Class('TestDDO',{
   *    _new_:function (){
   *        this.ddo = New(DDO,{
   *            instance:this,
   *            name:'ddo',
   *            value:0,
   *            fget:function (value){
   *                logger.debug('returned value '+ value );
   *            }
   *            })
   *    }
   * });
   *
   */
  Class('DDO', Object, {
    _new_: function({
      instance,
      name,
      fget,
      fset,
      value
    }) {
      var _value;
      var ddoInstance = this;
      var name = (typeof name == 'undefined') ? (ObjectName(ddoInstance)) : (name);

      Object.defineProperty(instance, name, {
        set(val) {
          _value = val;
          logger.debug('value changed ' + name);
          var ret;
          if (typeof fset !== 'undefined' && typeof fset == 'function') {
            ret = fset(_value);
          } else {
            ret = _value;
          }
          return ret;
        },
        get() {
          logger.debug('returning value ' + name);
          var is_ddo = function(v) {
            if (typeof v == 'object' && v.hasOwnProperty('value')) {
              return v.value;
            }
            return v;
          }
          var ret;
          if (typeof fget !== 'undefined' && typeof fget == 'function') {
            ret = fget(is_ddo(_value));
          } else {
            ret = is_ddo(_value);
          }
          return ret;
        }
      });
    }

  });

  Class('InheritClass', Object, {});

  Class('DefaultTemplateHandler', Object, {
    template: '',
    assign: function(data) {
      var parsedAssignmentText = this.template;
      for (var k in data) {
        parsedAssignmentText = parsedAssignmentText.replace((new RegExp('{{' + k + '}}', 'g')), data[k]);
      }
      return parsedAssignmentText;
    }
  });

  _top.__oldpopstate = _top.onpopstate;
  Class('Component', Object, {
    domain: domain,
    basePath: basePath,
    templateURI: '',
    templateHandler: 'DefaultTemplateHandler',
    tplsource: 'default',
    url: '',
    name: '',
    method: 'GET',
    data: {},
    reload: false,
    cached: true,
    done: function() {
      //TODO: default done method
    },
    fail: function() {
      //TODO: default fail method
    },
    set: function(name, value) {
      this[name] = value;
    },
    get: function(name) {
      return this[name];
    },
    rebuild: function() {
      var _component = this;
      var _promise = new Promise(function(resolve, reject) {
        switch (true) {
          case (typeof _component.get('tplsource') != 'undefined' &&
            _component.get('tplsource') == 'default' &&
            typeof _component.get('templateURI') != 'undefined' &&
            _component.get('templateURI') != ""):
            _component.set('url', _component.get('basePath') + _component.get('templateURI'));
            componentLoader(_component, false).then(
              function(standardResponse) {
                resolve.call(_promise, standardResponse);
              },
              function(standardResponse) {
                reject.call(_promise, standardResponse);
              });
            break;
          case (typeof _component.get('tplsource') != 'undefined' &&
            _component.get('tplsource') == "external" &&
            typeof _component.get('templateURI') != 'undefined' &&
            _component.get('templateURI') != ""):
            _component.set('url', _component.get('templateURI'));
            componentLoader(_component, false).then(
              function(standardResponse) {
                resolve.call(_promise, standardResponse);
              },
              function(standardResponse) {
                reject.call(_promise, standardResponse);
              });
            break;
          case (typeof _component.get('tplsource') != 'undefined' &&
            _component.get('tplsource') == "none"):
            logger.debug('Component ' + _component.name + ' has specified template-source=none, so no template load was done');
            var standardResponse = {
              request: null,
              component: _component
            };
            if (typeof _component.done === 'function') {
              _component.done.call(_component, standardResponse);
            }
            resolve(_promise, standardResponse);
            break;
          default:
            logger.debug('Component ' + _component.name + ' will not be rebuilt because no templateURI is present');
            reject.call(_promise, {
              request: null,
              component: _component
            });
            break;
        }
      });
      return _promise;
    },
    Cast: function(o) {
      return _Cast(this, o);
    },
    routingWay: CONFIG.get('routingWay'),
    validRoutingWays: ['pathname', 'hash', 'search'],
    routingNodes: [],
    routings: [],
    routingPath: "",
    routingSelected: [],
    _bindroute: function() {
      if (isBrowser) {
        if (!Component._bindroute.__assigned) {
          document.addEventListener('componentsloaded', function(e) {
            e.stopImmediatePropagation();
            e.stopPropagation();
            if (!Component._bindroute.__assigned) {

              _top.onpopstate = function(e) {
                e.stopImmediatePropagation();
                e.stopPropagation();
                Component.route();
                if (typeof e.target.__oldpopstate != 'undefined' && typeof e.target.__oldpopstate == 'function') {
                  e.target.__oldpopstate.call(e.target, e);
                }
              };
              Tag('a').map(function(a) {
                a.oldclick = a.onclick;
                a.onclick = function(e) {
                  var _ret_ = true;
                  if (!global.get('routingPaths')) {
                    global.set('routingPaths', []);
                  }
                  var routingWay = CONFIG.get('routingWay');
                  var routingPath = e.target[routingWay];
                  if (global.get('routingPaths').includes(routingPath) &&
                    e.target[routingWay] != document.location[routingWay] &&
                    e.target.href != document.location.href
                  ) {
                    logger.debug('A ROUTING WAS FOUND: ' + routingPath);
                    history.pushState({
                      href: e.target.href
                    }, e.target.href, e.target.href);
                    Component.route();
                    _ret_ = false;
                  } else {
                    logger.debug('NO ROUTING FOUND FOR: ' + routingPath);
                  }
                  if (typeof e.target.oldclick != 'undefined' && typeof e.target.oldclick == 'function') {
                    e.target.oldclick.call(e.target, e);
                  }
                  return _ret_;
                };
              });


              Component._bindroute.__assigned = true;
            }
          }, captureFalse);
        }
      } else {
        // not yet implemented.
      }
    },
    route: function() {
      var componentClass = this;
      var isValidInstance = (componentClass.hasOwnProperty('__instanceID') &&
        componentClass.hasOwnProperty('subcomponents')) ? (true) : (false);
      var __route__ = function(routingComponents) {
        for (var r = 0; r < routingComponents.length; r++) {
          var rc = routingComponents[r];
          rc._reroute_();
          if (rc.hasOwnProperty('subcomponents') &&
            typeof rc.subcomponents != 'undefined' &&
            rc.subcomponents.length > 0
          ) {
            logger.debug('LOOKING FOR ROUTINGS IN SUBCOMPONENTS FOR: ' + rc.name);
            __route__.call(componentClass, rc.subcomponents);
          }
        }
      };
      if (isValidInstance || global.hasOwnProperty('componentsStack')) {
        if (isValidInstance && componentClass.hasOwnProperty('name')) {
          logger.debug('loading routings for instance' + componentClass.name);
        }
        __route__.call(componentClass, (isValidInstance) ? (componentClass.subcomponents) : (global.componentsStack));
      } else {
        logger.debug('An undetermined result expected if load routings. So will not be loaded this time.');
      }
    },
    fullscreen: function() {
      if (isBrowser) {
        var elem = this.body;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          /* Firefox */
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          /* Chrome, Safari & Opera */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          /* IE/Edge */
          elem.msRequestFullscreen();
        }
      } else {
        // not yet implemented.
      }
    },
    closefullscreen: function() {
      if (isBrowser) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        // noy yet implemented.
      }
    },
    _generateRoutingPaths: function(c) {
      if (isBrowser) {
        if (this.validRoutingWays.includes(this.routingWay)) {
          if (typeof c != 'undefined') {
            this.innerHTML = c.innerHTML;
            this.routingNodes = c.subelements('routing');
            this.routings = [];
            for (var r = 0; r < this.routingNodes.length; r++) {
              var routingNode = this.routingNodes[r];
              var attributeNames = routingNode.getAttributeNames();
              var routing = {};
              for (var a = 0; a < attributeNames.length; a++) {
                routing[attributeNames[a]] = routingNode.getAttribute(attributeNames[a]);
              }
              this.routings.push(routing);
              if (!global.get('routingPaths')) {
                global.set('routingPaths', []);
              }
              if (!global.get('routingPaths').includes(routing.path)) {
                global.get('routingPaths').push(routing.path);
              }
            }
          }
        }
      } else {
        // not yet implemented.
      }
    },
    _new_: function(properties) {
      this.routingWay = CONFIG.get('routingWay');

      var self = this;
      Object.defineProperty(self, 'body', {
        set(value) {
          self._body = value;
          self._generateRoutingPaths(value);
        },
        get() {
          return self._body;
        }
      });

      Object.defineProperty(self, 'cacheIndex', {
        set(value) {
          // readonly
          logger.debug('[cacheIndex] This property is readonly');
        },
        get() {
          return Base64.encode(self.name + _DataStringify(self.routingSelected));
        }
      });

      Object.defineProperty(self, 'parsedAssignmentText', {
        set(value) {
          // readonly
          logger.debug('[parsedAssignmentText] This property is readonly');
        },
        get() {
          if (self.hasOwnProperty('templateHandler')) {
            var value = self.template;
            var templateHandlerName = self.templateHandler;
            var templateHandlerClass = ClassFactory(self.templateHandler);
            var templateInstance = New(templateHandlerClass, {
              template: value
            });
            self._parsedAssignmentText = templateInstance.assign(self.data);
          } else {
            self._parsedAssignmentText = value;
          }

          return self._parsedAssignmentText;
        }
      });
      this.__new__(properties);

      if (!this._reroute_()) {
        this.rebuild().catch(function(standardResponse) {
          logger.debug('Component not rebuilt');
        });
      }
    },
    _reroute_: function() {
      //This method set the selected routing and makes the switch to the templateURI
      var rc = this;
      var _rebuilt = false;
      if (rc.validRoutingWays.includes(rc.routingWay)) {
        rc.routingPath = document.location[rc.routingWay];
        rc.routingSelected = rc.routings.filter(function(routing) {
          return (new RegExp(routing.path, 'g')).test(rc.routingPath)
        }).reverse();
        for (var r = 0; r < rc.routingSelected.length; r++) {
          var routing = rc.routingSelected[r];
          var componentURI = ComponentURI({
            'COMPONENTS_BASE_PATH': CONFIG.get('componentsBasePath'),
            'COMPONENT_NAME': routing.name.toString(),
            'TPLEXTENSION': rc.tplextension,
            'TPL_SOURCE': 'default' //here is always default in order to get the right uri
          });
          rc.templateURI = componentURI;
        }
        if (rc.routingSelected.length > 0) {
          rc.body.innerHTML = '';
          rc.rebuild().then(function() {
            // not yet implemented.
          }).catch(function(standardResponse) {
            logger.debug('Component not rebuilt');
          });
          _rebuilt = true;
        }
      }
      return _rebuilt;
    },
    lazyLoadImages: function (){
      if (isBrowser){
        var component = this;
        var _imgLazyLoaded = [...component.body.subelements('img[lazy-src]')];
        var _lazyLoadImages = function(image) {
          image.setAttribute('src', image.getAttribute('lazy-src'));
          image.onload = () => {
            image.removeAttribute('lazy-src');
          };
        };
        if ('IntersectionObserver' in window) {
          var observer = new IntersectionObserver((items, observer) => {
            items.forEach((item) => {
              if (item.isIntersecting) {
                _lazyLoadImages(item.target);
                observer.unobserve(item.target);
              }
            });
          });
          _imgLazyLoaded.map(function(img) {
            observer.observe(img);
          });
        } else {
          _imgLazyLoaded.map(_lazyLoadImages);
        }

      } else {
        // not yet implemented
      }
    },
    scrollIntoHash: function (){
      if (isBrowser){
        var component = this;
        if (document.location.hash != ''){
          var scrollIntoHash = component.body.subelements(document.location.hash);
          if (scrollIntoHash.length>0 && (typeof scrollIntoHash[0].scrollIntoView == 'function')){
            scrollIntoHash[0].scrollIntoView(
              CONFIG.get('scrollIntoHash',{behavior: "auto", block: "center", inline: "center"})
            );
          }
        }
      } else {
        // not yet implemented
      }
    },
    i18n_translate: function (){
      if (isBrowser){
        if (CONFIG.get('use_i18n')){
          var component = this;
          var lang1=CONFIG.get('lang','en');
          var lang2 = navigator.language.slice(0, 2);
          var i18n = CONFIG.get('i18n');
          if ((lang1 != lang2) && (typeof i18n == 'object' && i18n.hasOwnProperty('messages'))){
            var messages = i18n.messages.filter(function (message){
              return message.hasOwnProperty(lang1) && message.hasOwnProperty(lang2);
            });
            component.body.subelements('p,a,b,h1,h2,h3,input,textarea,summary,details,ul,li,option,component')
            .map(function (element){
              messages.map(function (message){
                element.innerHTML = element.innerHTML.replace(new RegExp(message[lang1],'g'),message[lang2]);
              });
              return element;
            });
          }
        }
      } else {
        // not yet implemented
      }
    },
    runComponentHelpers: function() {
      if (isBrowser){
        var component = this;
        /*
        * BEGIN use i18n translation
        */
        component.i18n_translate();
        /*
        * END use i18n translation
        */

        /*
        * BEGIN component scrollIntoHash
        */

        component.scrollIntoHash();
        /*
        * END component scrollIntoHash
        */

        /*
         * BEGIN component images lazy-load
         */

         component.lazyLoadImages();

        /*
         * END component images lazy-load
         */

      } else {
        // not yet implemented
      }

    }
  });
  Component._bindroute.__assigned = false;


  Class('Controller', Object, {
    dependencies: [],
    component: null,
    routingSelectedAttr: function (attrName){
      return this.component.routingSelected.map(function (r){return r[attrName]}).filter(function (v){return v}).pop();
    },
    isTouchable:function (){
      return ('ontouchstart' in window)
           || (navigator.MaxTouchPoints > 0)
           || (navigator.msMaxTouchPoints > 0);
    },
    onpress:function (subelementSelector,handler){
      try {
        if (this.isTouchable()){
          this.component.body.subelements(subelementSelector)[0].addEventListener('touchstart',handler, {passive:true});
        } else {
          this.component.body.subelements(subelementSelector)[0].addEventListener('click',handler, {passive:true});
        }
      }catch (e){
        logger.debug('No button to assign press event');
      }
    },
    createRoutingController: function (){
      var controller = this;
      var component = controller.component;
      var controllerName = controller.routingSelectedAttr('controllerclass');
      if (typeof controllerName !== 'undefined'){
        var _Controller = ClassFactory(controllerName);
        if (typeof _Controller != 'undefined') {
          component.routingController = New(_Controller, {
            component: component
          }); // Initializes the main controller for the component
          if (component.routingController.hasOwnProperty('done') && typeof component.routingController.done == 'function') {
            component.routingController.done.call(component.routingController);
          }
        }
      }
    }
  });

  Class('View', Object, {
    dependencies: [],
    component: null
  });

  Class('Service', Object, {
    domain: domain,
    basePath: basePath,
    url: '',
    method: 'GET',
    data: {},
    reload: false,
    cached: false,
    set: function(name, value) {
      this[name] = value;
    },
    get: function(name) {
      return this[name];
    }
  });

  Class('JSONService', Service, {
    method: "GET",
    cached: false,
    headers: {
      "Content-Type": "application/json",
      "charset": "utf-8"
    },
    JSONresponse: null,
    done: function(result) {
      logger.debug("***** RECEIVED RESPONSE:");
      logger.debug(result.service.template);
      this.JSONresponse = JSON.parse(result.service.template);
    }
  });

  Class('ConfigService', JSONService, {
    method: "GET",
    cached: false,
    configFileName: 'config.json',
    headers: {
      "Content-Type": "application/json",
      "charset": "utf-8"
    },
    JSONresponse: null,
    done: function(result) {
      logger.debug("***** CONFIG LOADED:");
      logger.debug(result.service.template);
      this.JSONresponse = JSON.parse(result.service.template);
      if (this.JSONresponse.hasOwnProperty('__encoded__')) {
        this.JSONresponse = JSON.parse(_Crypt.decrypt(this.JSONresponse.__encoded__, _secretKey));
      }
      for (var k in this.JSONresponse) {
        CONFIG.set(k, this.JSONresponse[k]);
      }
      this.configLoaded.call(this);
    },
    fail: function(result) {
      this.configLoaded.call(this);
    },
    _new_: function(o) {
      this.set('url', this.get('basePath') + this.get('configFileName'));
    }
  });

  Class('VO', Object, {});

  /**
   * Returns a standarized uri for a component
   * @example
   * templateURI = ComponentURI({'COMPONENTS_BASE_PATH':'','COMPONENT_NAME':'','TPLEXTENSION':'','TPL_SOURCE':''})
   * @author: Jean Machuca <correojean@gmail.com>
   * @param params an object with the params to build the uri path
   */
  var ComponentURI = function(params) {
    var templateURI = '';
    if (params['TPL_SOURCE'] == 'default') {
      templateURI = '{{COMPONENTS_BASE_PATH}}{{COMPONENT_NAME}}.{{TPLEXTENSION}}';
      for (var k in params) {
        var param = params[k];
        templateURI = templateURI.replace('{{' + k + '}}', params[k]);
      }
    }
    return templateURI;
  };

  /**
   * Loads a simple component from a template
   *
   * @author: Jean Machuca <correojean@gmail.com>
   * @param component a Component object
   */
  var componentLoader = function(component, _async) {
    var _componentLoader = function(component, _async) {
      var _promise = new Promise(function(resolve, reject) {
        var container = (component.hasOwnProperty('container') && typeof component.container != 'undefined' && component.container != null) ? (component.container) : (component.body);
        if (container != null) {
          var feedComponent = function(component) {
            var parsedAssignmentText = component.parsedAssignmentText;
            component.innerHTML = parsedAssignmentText;
            if (component.reload) {
              logger.debug('FORCED RELOADING OF CONTAINER FOR COMPONENT {{NAME}}'.replace('{{NAME}}', component.name));
              container.innerHTML = component.innerHTML;
            } else {
              logger.debug('ADDING COMPONENT {{NAME}} '.replace('{{NAME}}', component.name));
              container.innerHTML += component.innerHTML;
            }
            var standardResponse = {
              'request': xhr,
              'component': component
            };
            resolve.call(_promise, standardResponse);
          };
          logger.debug('LOADING COMPONENT DATA {{DATA}} FROM {{URL}}'.replace('{{DATA}}', _DataStringify(component.data)).replace('{{URL}}', component.url));

          var _componentLoaded = function() {
            var successStatus = (is_file) ? (0) : (200);
            if (xhr.status === successStatus) {
              var response = xhr.responseText;
              logger.debug('Data received {{DATA}}'.replace('{{DATA}}', _DataStringify(response)));
              logger.debug('CREATING COMPONENT {{NAME}}'.replace('{{NAME}}', component.name));
              component.template = response;
              if (component.cached && (typeof cache != 'undefined')) {
                cache.save(component.name, component.template);
              }
              feedComponent.call(this, component);
            } else {
              var standardResponse = {
                'request': xhr,
                'component': component
              };
              reject.call(_promise, standardResponse);

            }
          };
          var is_file = (component.url.startsWith('file:')) ? (true) : (false);
          var xhr = new XMLHttpRequest();
          xhr.open(component.method, component.url, (!is_file));
          if (!is_phonegap && !is_file) {
            xhr.setRequestHeader('Content-Type', 'text/html');
          }
          if (!is_file) {
            xhr.onload = _componentLoaded;
          }
          var _directLoad = function() {
            logger.debug('SENDING THE NORMAL REQUEST  ');
            if (is_file) {
              xhr.send(null);
              if (xhr.status == 0) {
                _componentLoaded.call(this);
              }
            } else {
              xhr.send(_DataStringify(component.data));
            }
          };

          if (component.cached) {
            logger.debug('USING CACHE FOR COMPONENT: ' + component.name);
            var cache = new ComplexStorageCache({
              'index': component.cacheIndex,
              'load': function(cacheController) {
                _directLoad.call(this);
              },
              'alternate': function(cacheController) {
                if (component.method == 'GET') {
                  component.template = cacheController.cache.getCached(component.cacheIndex);
                  feedComponent.call(this, component);

                } else {
                  _directLoad.call(this);
                }
                return;
              }
            });
            global.lastCache = cache;
          } else {
            logger.debug('NOT USING CACHE FOR COMPONENT: ' + component.name);
            _directLoad.call(this);
          }

          return xhr;
        } else {
          logger.debug('CONTAINER DOESNT EXIST')
        }
      });
      _promise.then(function(standardResponse) {
        var _ret_;
        if (typeof component.done === 'function') {
          _ret_ = component.done.call(component, standardResponse);
        }
        return Promise.resolve(_ret_);
      }, function(standardResponse) {
        var _ret_;
        if (typeof component.fail === 'function') {
          _ret_ = component.fail.call(component, standardResponse);
        }
        return Promise.reject(_ret_);
      }).catch(function(e) {
        logger.debug('Something wrong loading the component');
      });
      return _promise;
    };

    var _ret_;
    if (typeof _async != 'undefined' && _async) {
      _ret_ = asyncLoad(_componentLoader, arguments);
    } else {
      _ret_ = _componentLoader(component, _async);
    }
    return _ret_;
  };

  /**
   * Loads a simple component from a template
   *
   * @author: Jean Machuca <correojean@gmail.com>
   * @param service a Service object
   */
  var serviceLoader = function(service, _async) {
    var _serviceLoaderInBrowser = function(service, _async) {
      var _promise = new Promise(
        function(resolve, reject) {

          logger.debug('LOADING SERVICE DATA {{DATA}} FROM {{URL}}'.replace('{{DATA}}', _DataStringify(service.data)).replace('{{URL}}', service.url));
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = service.withCredentials;
          var xhrasync = true; // always async because xhr sync is deprecated
          xhr.open(service.method, service.url, xhrasync);
          for (var header in service.headers) {
            xhr.setRequestHeader(header, service.headers[header]);
          }
          xhr.onload = function() {
            if (xhr.status === 200) {
              var response = xhr.responseText;
              logger.debug('Data received {{DATA}}'.replace('{{DATA}}', _DataStringify(response)));
              logger.debug('CREATING SERVICE {{NAME}}'.replace('{{NAME}}', service.name));
              service.template = response;
              if (service.cached && (typeof cache != 'undefined')) {
                cache.save(service.name, service.template);
              }
              if (typeof service.done === 'function') {
                var standardResponse = {
                  'request': xhr,
                  'service': service
                };
                service.done.call(service, standardResponse);
                resolve.call(_promise, standardResponse);
              }
            } else {
              if (typeof service.fail === 'function') {
                var standardResponse = {
                  'request': xhr,
                  'service': service
                };
                service.fail.call(service, standardResponse);
                reject.call(_promise, standardResponse);
              }
            }
          };

          var _directLoad = function() {
            logger.debug('SENDING THE NORMAL REQUEST  ');
            try {
              xhr.send(_DataStringify(service.data));
            } catch (e) {
              logger.debug('SOMETHING WRONG WITH REQUEST  ');
              reject.call(_promise, {
                request: xhr,
                service: service
              });
            }
          };

          if (service.cached) {
            var cache = new ComplexStorageCache({
              'index': service.data,
              'load': function(cacheController) {
                _directLoad.call(this);
              },
              'alternate': function(cacheController) {
                if (service.method == 'GET') {
                  service.template = cacheController.cache.getCached(service.name);
                  if (typeof service.done === 'function') {
                    var standardResponse = {
                      'request': xhr,
                      'service': service
                    };
                    service.done.call(service, standardResponse);
                    resolve.call(_promise, standardResponse);
                  }
                } else {
                  _directLoad.call(this);
                }
                return;
              }
            });
            global.lastCache = cache;
          } else {
            _directLoad.call(this);
          }

          return xhr;
        }
      );
      return _promise;
    };

    var _serviceLoaderInNode = function(service, _async) {
      var _promise = new Promise(
        function(resolve, reject) {
          var serviceURL = new URL(service.url);

          try {
            if (service.hasOwnProperty('useHTTP2') && service.useHTTP2) {
              logger.debug('using http2');
              var http2 = require('http2');
              var client = http2.connect(serviceURL.origin);
              var req = client.request({
                ':method': service.method,
                ':path': serviceURL.pathname
              });
              req.setEncoding('utf8');
            } else {
              var request = require("request");
              var requestOptions = Object.assign({
                'url': service.url,
                headers: service.headers
              }, service.options);
              var req = request[service.method.toLowerCase()](service.url);
            }

            logger.debug('LOADING SERVICE DATA (non-browser) {{DATA}} FROM {{URL}}'.replace('{{DATA}}', _DataStringify(service.data)).replace('{{URL}}', service.url));
            var dataXML;
            var standardResponse = {
              'http2Client': client,
              'request': req,
              'service': service,
              'responseHeaders': null
            };

            if (typeof service.data == 'object'){
              if (service.useHTTP2){
                logger.debug('Sending data...');
                let buffer = new Buffer(_DataStringify(service.data));
                req.write(buffer);
              }
            }

            dataXML = '';
            req.on('response', (responseHeaders,flags) => {
              logger.debug('receiving response...');
              standardResponse.responseHeaders = responseHeaders;
              for (const name in responseHeaders) {
                logger.debug(`${name}: ${responseHeaders[name]}`);
              }
              dataXML = '';
            });
            req.on('data', (chunk) => {
              logger.debug('receiving data...');
              // do something with the data
              dataXML += chunk.toString();
            });
            req.on('end', () => {
              logger.debug('ending call...');
              service.template = dataXML;
              if (service.hasOwnProperty('useHTTP2') && service.useHTTP2) {
                client.destroy();
              } else {
                req.destroy();
              }
              service.done.call(service, standardResponse);
              resolve.call(_promise, standardResponse);
            });


          } catch (e) {
            logger.debug(e);
            service.fail.call(service, e);
            reject.call(_promise, e);

          }
        }).catch(function(e) {
        console.log(e);
        logger.debug('Something happened when trying to call the service: ' + service.name);
        service.fail.call(service, e);
        reject.call(_promise, e);
      });
      return _promise;

    };

    var _ret_;
    if (isBrowser) {
      if (typeof _async != 'undefined' && _async) {
        _ret_ = asyncLoad(_serviceLoaderInBrowser, arguments);
      } else {
        _ret_ = _serviceLoaderInBrowser(service, _async);
      }
    } else {
      _ret_ = _serviceLoaderInNode(service, _async);
    }
    return _ret_;
  };
  Export(serviceLoader);
  Export(componentLoader);
  Export(ComponentURI);
  Export(ObjectName);
  Export(_DataStringify);
  Export(isQCObjects_Class);
  Export(isQCObjects_Object);

  asyncLoad(function() {

    Class('global', Object, {
      _GLOBAL: {},
      set: function(name, value) {
        this._GLOBAL[name] = value;
      },
      get: function(name) {
        return this._GLOBAL[name];
      },
      __start__: function() {
        var __load__serviceWorker = function() {
          var _promise;
          if (isBrowser) {
            _promise = new Promise(function(resolve, reject) {
              if (('serviceWorker' in navigator) &&
                (typeof CONFIG.get('serviceWorkerURI') != 'undefined')) {
                CONFIG.set('serviceWorkerScope', CONFIG.get('serviceWorkerScope') ? (CONFIG.get('serviceWorkerScope')) : ('/'));
                navigator.serviceWorker.register(CONFIG.get('serviceWorkerURI'), {
                    scope: CONFIG.get('serviceWorkerScope')
                  })
                  .then(function(registration) {
                    logger.debug('Service Worker Registered');
                    resolve.call(_promise, registration);
                  }, function(registration) {
                    logger.debug('Error registering Service Worker');
                    reject.call(_promise, registration);
                  });
                navigator.serviceWorker.ready.then(function(registration) {
                  logger.debug('Service Worker Ready');
                  resolve.call(_promise, registration);
                }, function(registration) {
                  logger.debug('Error loading Service Worker');
                  reject.call(_promise, registration);
                });
              }
            });
          }
          return _promise;
        };
        var _buildComponents = function() {
          if (isBrowser) {
            logger.debug('Starting to bind routes');
            Component._bindroute.call(Component);
            logger.debug('Starting to building components');
            global.componentsStack = document.buildComponents.call(document);
            logger.debug('Initializing the service worker');
            __load__serviceWorker.call(_top).catch(function() {
              logger.debug('error loading the service worker');
            });

          }
        };
        if (CONFIG.get('useConfigService')) {
          global.configService = New(ConfigService);
          global.configService.configLoaded = _buildComponents;
          serviceLoader(global.configService);
        } else {
          _buildComponents.call(this);
        }
      }
    });

    Object.defineProperty(global,'PackagesNameList',{
      set(val){
        logger.debug('PackagesNameList is readonly');
        return;
      },
      get(){
        var _get_packages_names = function (_packages){
          var _keys = [];
          for (var _k in _packages){
            if (
              typeof _packages[_k] !== 'undefined'
              && _packages[_k].hasOwnProperty('length')
              && _packages[_k].length>0
            ){
              _keys.push(_k);
              _keys = _keys.concat(_get_packages_names(_packages[_k]));
            }
          }
          return _keys;
        };
        return _get_packages_names(_QC_PACKAGES);
      }
    });

    Object.defineProperty(global,'PackagesList',{
      set(value){
        logger.debug('PackagesList is readonly');
        return;
      },
      get(){
        return global.PackagesNameList.map(function (packagename) {
          return {
            packageName:packagename,
            classesList:Package(packagename).filter(function (_packageClass) {
                return isQCObjects_Class(_packageClass);
              }
            )
          };
         });
      }
    });

    Object.defineProperty(global,'ClassesList',{
      set(value){
        logger.debug('ClassesList is readonly');
        return;
      },
      get(){
        var _classesList = [];
        global.PackagesList.map(function (_package_element){
          _classesList = _classesList.concat(_package_element.classesList.map(
            function (_class_element){
              return {
                packageName:_package_element.packageName,
                className:_package_element.packageName+'.'+_class_element.__definition.__classType,
                classFactory:_class_element
              }
            }
          ));
        });

        return _classesList;
      }
    });

    Object.defineProperty(global,'ClassesNameList',{
      set(value){
        logger.debug('ClassesNameList is readonly');
        return;
      },
      get(){
        return global.ClassesList.map(function (_class_element) {
          return _class_element.className;
         });
      }
    });



    if (isBrowser) {
      // use of GLOBAL word is deprecated in node.js
      // this is only for compatibility purpose with old versions of QCObjects in browsers
      Class('GLOBAL', _QC_CLASSES['global']); // case insensitive for compatibility con old versions;
      GLOBAL = global;
      Export(GLOBAL);
    }
    Export(global);



    if (CONFIG.get('useSDK')) {
      (function() {
        var remoteImportsPath = CONFIG.get('remoteImportsPath');
        var external = (!CONFIG.get('useLocalSDK')) ? (true) : (false);
        CONFIG.set('remoteImportsPath', CONFIG.get('remoteSDKPath'));

        var tryImportingSDK = false;
        var sdkName = 'QCObjects-SDK';
        if (isBrowser) {
          tryImportingSDK = true;
        } else {
          var sdkPath = findPackageNodePath('qcobjects-sdk');
          if (sdkPath !== null) {
            sdkName = 'qcobjects-sdk';
            tryImportingSDK = true;
          } else {
            sdkName = 'node_modules/qcobjects-sdk/QCObjects-SDK';
            tryImportingSDK = true;
          }
        }

        if (tryImportingSDK) {
          logger.info('Importing SDK... ' + sdkName);
          Import(sdkName, function() {
            if (external) {
              logging.debug('QCObjects-SDK.js loaded from remote location');
            } else {
              logging.debug('QCObjects-SDK.js loaded from local');
            }
            CONFIG.set('remoteImportsPath', remoteImportsPath);
          }, external);
        } else {
          logger.debug('SDK has not been imported as it is not available at the moment');
        }
      }).call(null);
    }


  }, null);

  if (isBrowser) {
    Element.prototype.buildComponents = function(rebuildObjects = false) {
      var tagFilter = (rebuildObjects) ? ('component:not([loaded])') : ('component');
      var d = this;
      var _buildComponent = function(components) {
        var componentsBuiltWith = [];
        for (var _c = 0; _c < components.length; _c++) {
          var data = {};
          var attributenames = components[_c].getAttributeNames().filter(function(a) {
            return a.startsWith('data-')
          }).map(function(a) {
            return a.split('-')[1]
          });
          for (var attribute in attributenames) {
            data[attributenames[attribute]] = components[_c].getAttribute('data-' + attributenames[attribute]);
          }
          var componentDone = function() {
            var viewName = this.body.getAttribute('viewClass');
            var _View = ClassFactory(viewName);
            if (typeof _View != 'undefined') {
              this.view = New(_View, {
                component: this
              }); // Initializes the main view for the component
              if (this.view.hasOwnProperty('done') && typeof this.view.done == 'function') {
                this.view.done.call(this.view);
              }
            }
            var controllerName = this.body.getAttribute('controllerClass');
            if (!controllerName){
              controllerName = 'Controller';
            }
            var _Controller = ClassFactory(controllerName);
            if (typeof _Controller != 'undefined') {
              this.controller = New(_Controller, {
                component: this
              }); // Initializes the main controller for the component
              if (this.controller.hasOwnProperty('done') && typeof this.controller.done == 'function') {
                this.controller.done.call(this.controller);
              }
              this.controller.createRoutingController();
            }
            var effectClassName = this.body.getAttribute('effectClass');
            var _Effect = ClassFactory(effectClassName);
            if (typeof _Effect != 'undefined') {
              this.effect = New(_Effect, {
                component: this
              });
              this.effect.apply(this.effect.defaultParams);
            }
            this.subcomponents = _buildComponent(this.body.subelements(tagFilter));

            if (CONFIG.get('overrideComponentTag')) {
              this.body.outerHTML = this.body.innerHTML;
            }
            this.body.setAttribute('loaded', true);

            this.runComponentHelpers();

            if ((Tag('component[loaded=true]').length * 100 / Tag('component:not([template-source=none])').length) >= 100) {
              d.dispatchEvent(new CustomEvent('componentsloaded', {
                detail: {
                  lastComponent: this
                }
              }));
            }
          };
          (_protected_code_)(componentDone);

          var __cached_not_set = (components[_c].getAttribute('cached') == null) ? (true) : (false);
          var cached = (components[_c].getAttribute('cached') == 'true') ? (true) : (false);
          var tplextension = (typeof CONFIG.get('tplextension') != 'undefined') ? (CONFIG.get('tplextension')) : ('html');
          tplextension = (components[_c].getAttribute('tplextension') != null) ? (components[_c].getAttribute('tplextension')) : (tplextension);
          var tplsource = (components[_c].getAttribute('template-source') == null) ? ('default') : (components[_c].getAttribute('template-source'));
          var componentURI = ComponentURI({
            'COMPONENTS_BASE_PATH': CONFIG.get('componentsBasePath'),
            'COMPONENT_NAME': components[_c].getAttribute('name').toString(),
            'TPLEXTENSION': tplextension,
            'TPL_SOURCE': tplsource
          });
          var _componentName = components[_c].getAttribute('name').toString();
          if (CONFIG.get('preserveComponentBodyTag')) {
            Package('com.qcobjects.components.'+_componentName+'',[
              Class('ComponentBody', Component, {
                name: _componentName,
                reload: true
              })
            ]);
          }
          var _componentClassName = (components[_c].getAttribute('componentClass') != null) ? (components[_c].getAttribute('componentClass')) : ('Component');
          var __componentClassName = (CONFIG.get('preserveComponentBodyTag'))?('com.qcobjects.components.'+_componentName+'.ComponentBody'):(_componentClassName);
          var __definition = {
            name: _componentName,
            data: data,
            cached: (__cached_not_set) ? (Component.cached) : (cached),
            tplextension: tplextension,
            body: (CONFIG.get('preserveComponentBodyTag')) ? (_DOMCreateElement('componentBody')):(components[_c]),
            templateURI: componentURI,
            tplsource: tplsource,
            subcomponents: []
          };
          if (componentURI == ''){
            delete __definition.templateURI;
          }
          var newComponent = New(ClassFactory(__componentClassName), __definition);

          if (CONFIG.get('preserveComponentBodyTag')) {
            components[_c].append(newComponent);
          }
          newComponent.done = componentDone;
          componentsBuiltWith.push(newComponent);
        }
        return componentsBuiltWith;
      };
      var components = d.subelements(tagFilter);
      return _buildComponent(components);
    };
    HTMLDocument.prototype.buildComponents = Element.prototype.buildComponents;
    HTMLElement.prototype.buildComponents = Element.prototype.buildComponents;

  } else {
    // not yet implemented.
  }

  if (!isBrowser) {

    Class('BackendMicroservice', Object, {
      domain: domain,
      basePath: basePath,
      body: null,
      stream: null,
      request: null,
      cors: function (){
        if (this.route.cors){
          let {allow_origins,allow_credentials,allow_methods,allow_headers} = this.route.cors;
          var microservice = this;
          if (typeof microservice.headers !== 'object'){
            microservice.headers = {};
          }
          if (typeof allow_origins !== 'undefined'){
            // an example of allow_origins is ['https://example.com','http://www.example.com']
            if (allow_origins =='*' || (typeof microservice.request.headers.origin == 'undefined') || [...allow_origins].indexOf(microservice.request.headers.origin)!== -1){
              // for compatibility with all browsers allways return a wildcard when the origin is allowed
              microservice.headers['Access-Control-Allow-Origin'] = '*';
            } else {
              logger.debug('Origin is not allowed: ' + microservice.request.headers.origin);
              logger.debug('Forcing to finish the response...');
              this.body = {};
              try {
                this.done();
              } catch (e){}
            }
          } else {
            microservice.headers['Access-Control-Allow-Origin'] = '*';
          }
          if (typeof allow_credentials !== 'undefined'){
            microservice.headers['Access-Control-Allow-Credentials'] = allow_credentials.toString();
          } else {
            microservice.headers['Access-Control-Allow-Credentials'] = 'true';
          }
          if (typeof allow_methods !== 'undefined'){
            microservice.headers['Access-Control-Allow-Methods'] = [...allow_methods].join(',');
          } else {
            microservice.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS, POST';
          }
          if (typeof allow_headers !== 'undefined'){
            microservice.headers['Access-Control-Allow-Headers'] = [...allow_headers].join(',');
          } else {
            microservice.headers['Access-Control-Allow-Headers'] = '*';
          }
        }
      },
      _new_: function(o) {
        logger.debug('Executing BackendMicroservice ');
        let microservice = this;
        microservice.body = null;
        let request = microservice.request;
        this.cors();
        let stream = o.stream;
        microservice.stream = stream;
        stream.on('data', (data) => {
          // data from POST, GET
          var requestMethod = request.method.toLowerCase();
          var supportedMethods = {
            'post': microservice.post,
          };
          if (supportedMethods.hasOwnProperty(requestMethod)) {
            supportedMethods[requestMethod].call(microservice, data);
          }
        });

        // data from POST, GET
        var requestMethod = request.method.toLowerCase();
        var supportedMethods = {
          'get': microservice.get,
          'head': microservice.head,
          'put': microservice.put,
          'delete': microservice.delete,
          'connect': microservice.connect,
          'options': microservice.options,
          'trace': microservice.trace,
          'patch': microservice.patch
        };
        if (supportedMethods.hasOwnProperty(requestMethod)) {
          supportedMethods[requestMethod].call(microservice);
        }

      },
      head: function(formData) {
        this.done()
      },
      get: function(formData){
        this.done()
      },
      post: function(formData) {
        this.done()
      },
      put: function(formData) {
        this.done()
      },
      delete: function(formData) {
        this.done()
      },
      connect: function(formData) {
        this.done()
      },
      options: function(formData) {
        this.done()
      },
      trace: function(formData) {
        this.done()
      },
      patch: function(formData) {
        this.done()
      },
      finishWithBody: function(stream) {
        try {
          stream.write(_DataStringify(this.body));
          stream.end();
        } catch (e) {
          logger.debug('Something wrong writing the response for microservice' + e.toString());
        }
      },
      done: function() {
        var microservice = this;
        var stream = microservice.stream;
        stream.respond(microservice.headers);
        if (microservice.body != null) {
          microservice.finishWithBody.call(microservice, stream);
        }
      }
    });

  }

  Class('SourceJS', Object, {
    domain: domain,
    basePath: basePath,
    body: _DOMCreateElement('script'),
    url: '',
    data: {},
    async: false,
    external: false,
    set: function(name, value) {
      this[name] = value;
    },
    get: function(name) {
      return this[name];
    },
    status: false,
    done: function() {},
    fail: function() {},
    rebuild: function() {
      var context = this;
      try {
        document.getElementsByTagName('body')[0].appendChild(
          (function(s, url, context) {
            s.type = 'text/javascript';
            s.src = url;
            s.crossOrigin = (context.hasOwnProperty('crossOrigin')) ? (context.crossOrigin) : ('anonymous');
            s.async = context.async;
            s.onreadystatechange = function() {
              if (this.readyState == 'complete') {
                context.done.call(context);
              }
            };
            s.onload = function(e) {
              context.status = true;
              context.done.call(context, e);
            };
            s.onerror = function(e) {
              context.status = false;
              context.fail.call(context, e);
            };
            context.body = s;
            return s;
          }).call(this,
            _DOMCreateElement('script'),
            (this.external) ? (this.url) : (this.basePath + this.url), context));
      } catch (e) {
        context.status = false;
        context.fail.call(context, e);
      }
    },
    Cast: function(o) {
      return _Cast(this, o);
    },
    '_new_': function(properties) {
      this.__new__(properties);
      this.rebuild();
    }
  });
  Class('SourceCSS', Object, {
    domain: domain,
    basePath: basePath,
    body: _DOMCreateElement('link'),
    url: '',
    data: {},
    async: false,
    external: false,
    set: function(name, value) {
      this[name] = value;
    },
    get: function(name) {
      return this[name];
    },
    done: function() {},
    rebuild: function() {
      var context = this;
      document.getElementsByTagName('head')[0].appendChild(
        (function(s, url, context) {
          s.type = 'text/css';
          s.rel = 'stylesheet';
          s.href = url;
          s.crossOrigin = 'anonymous';
          s.onreadystatechange = function() {
            if (this.readyState == 'complete') {
              context.done.call(context);
            }
          };
          s.onload = context.done;
          context.body = s;
          return s;
        }).call(this,
          _DOMCreateElement('link'),
          (this.external) ? (this.url) : (this.basePath + this.url), context));
    },
    Cast: function(o) {
      return _Cast(this, o);
    },
    '_new_': function(properties) {
      this.__new__(properties);
      this.rebuild();
    }
  });

  Class('ArrayList', Array, []);
  Class('ArrayCollection', Object, {
    source: New(ArrayList, []),
    changed: function(prop, value) {
      logger.debug('VALUE CHANGED');
      logger.debug(prop);
      logger.debug(value);
    },
    push: function(value) {
      var self = this;
      logger.debug('VALUE ADDED');
      logger.debug(value);
      self.source.push(value);
    },
    pop: function(value) {
      var self = this;
      logger.debug('VALUE POPPED');
      logger.debug(value);
      self.source.pop(value);
    },
    _new_: function(source) {
      var self = this;
      var _index = 0;
      self.source = New(ArrayList, source);
      for (var _k in self.source) {
        if (!isNaN(_k)) {
          logger.debug('binding ' + _k.toString());
          (function(_pname) {
            Object.defineProperty(self, _pname, {
              set(value) {
                logger.debug('setting ' + _pname + '=' + value);
                self.source[_pname] = value;
                self.changed(_pname, value);
              },
              get() {
                return self.source[_pname];
              }
            });
          })(_k);
          _index++;
        }

      }
      self.source.length = _index;
      Object.defineProperty(self, 'length', {
        get() {
          return self.source.length;
        }
      });
    }
  });

  Class('Effect', {
    duration: 1000,
    animate: function({
      timing,
      draw,
      duration
    }) {

      let start = performance.now();

      requestAnimationFrame(function animate(time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current animation state
        let progress = timing(timeFraction);

        draw(Math.round(progress * 100)); // draw it

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        } else {
          // if this is an object with a done method
          if (typeof this != 'undefined' &&
            this.hasOwnProperty('done') &&
            (typeof this.done).toLowerCase() == 'function') {
            this.done.call(this);
          }
        }

      });
    }
  });

  Class('TransitionEffect',Effect,{
    duration:385,
    defaultParams:{
      alphaFrom:0,
      alphaTo:1,
      angleFrom:180,
      angleTo:0,
      radiusFrom:0,
      radiusTo:30,
      scaleFrom:0,
      scaleTo:1
    },
    fitToHeight:false,
    fitToWidth:false,
    effects: [],
    _new_:function (o){
      logger.info('DECLARING TransitionEffect  ');
      this.component.defaultParams = this.defaultParams;
    },
    apply: function ({alphaFrom,
                      alphaTo,
                      angleFrom,
                      angleTo,
                      radiusFrom,
                      radiusTo,
                      scaleFrom,
                      scaleTo}){
      logger.info('EXECUTING TransitionEffect  ');
      if (this.fitToHeight){
        this.component.body.height = this.component.body.offsetParent.scrollHeight;
      }
      if (this.fitToWidth){
        this.component.body.width = this.component.body.offsetParent.scrollWidth;
      }
      this.component.body.style.display = 'block';
      for (var eff in this.effects){
        var effectClassName = this.effects[eff];
        var effectClassMethod = _super_(effectClassName,'apply');
        var args = [this.component.body].concat(Object.values(
          {
            alphaFrom,
            alphaTo,
            angleFrom,
            angleTo,
            radiusFrom,
            radiusTo,
            scaleFrom,
            scaleTo
          }
        ));
        effectClassMethod.apply(this,args);
      }
    }
  });

  Class('Timer', {
    duration: 1000,
    alive: true,
    thread: function({
      timing,
      intervalInterceptor,
      duration
    }) {
      var timer = this;

      let start = performance.now();

      requestAnimationFrame(function thread(time) {
        // timeFraction goes from 0 to 1
        let elapsed = (time - start);
        let timeFraction = elapsed / duration;
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current progress state
        let progress = timing(timeFraction, elapsed);

        intervalInterceptor(Math.round(progress * 100)); // draw it

        if ((timeFraction < 1 || duration == -1) && timer.alive) {
          requestAnimationFrame(thread);
        }

      });
    }
  });

  Class('Toggle', InheritClass, {
    _toggle: false,
    _inverse: true,
    _positive: null,
    _negative: null,
    _dispatched: null,
    _args: {},
    changeToggle: function() {
      this._toggle = (this._toggle) ? (false) : (true);
    },
    _new_: function({
      positive,
      negative,
      args
    }) {
      this._positive = positive;
      this._negative = negative;
      this._args = args;
    },
    fire: function() {
      var toggle = this;
      var _promise = new Promise(function(resolve, reject) {

        if (typeof toggle._positive == 'function' && typeof toggle._negative == 'function') {
          if (toggle._inverse) {
            toggle._dispatched = (toggle._toggle) ? (toggle._negative.bind(toggle)) : (toggle._positive.bind(toggle));
          } else {
            toggle._dispatched = (toggle._toggle) ? (toggle._positive.bind(toggle)) : (toggle._negative.bind(toggle));
          }
          toggle._dispatched.call(toggle, toggle._args);
          resolve.call(_promise, toggle);
        } else {
          logger.debug('Toggle functions are not declared');
          reject.call(_promise, toggle);
        }
      }).then(function(toggle) {
        toggle.changeToggle();
      }).catch(function(e) {
        logger.debug(e.toString());
      });
      return _promise;
    }
  });

  /**
   * Load every component tag declared in the body
   **/
  Ready(function() {
    if (!CONFIG.get('useSDK')) {
      global.__start__();
    }
  });

  /*
  Public variables and functions
  */
  Export(Export); /* exports the same Export function once */
  Export(Import);
  Export(Package);
  Export(Class);
  Export(New);
  Export(Tag);
  Export(Ready);
  Export(ready);
  Export(isBrowser);

  if (!isBrowser) {
    if (typeof global !== 'undefined' && global.hasOwnProperty('_fireAsyncLoad')) {
      global._fireAsyncLoad.call(this);
    }
    if (typeof global !== 'undefined' && global.hasOwnProperty('onload')) {
      global.onload.call(this);
    }
  }

  if (isBrowser) {
    asyncLoad(function() {
      Ready(function() {
        window.onpopstate = function(event) {
          event.stopImmediatePropagation();
          event.stopPropagation();
          Component.route();
        }

        /*
         * scroll management custom events
         * usage: document.body.addEventListener('percentY90',function(e){console.log(e.detail.percentY)});
         * possible events: scrollpercent, defaultscroll, percentY0, percentY25, percentY50, percentY75, percentY90
         */

        Tag('*').map(function(element) {
          element.addEventListener('scroll', function(event) {
            event.preventDefault();
            var percentY = Math.round(event.target.scrollTop * 100 / event.target.scrollHeight);
            var percentX = Math.round(event.target.scrollLeft * 100 / event.target.scrollWidth);
            var customEvent = new CustomEvent('scrollpercent', {
              detail: {
                percentX: percentX,
                percentY: percentY
              }
            });
            event.target.dispatchEvent(customEvent);
            var secondaryEventName = 'defaultscroll';
            switch (true) {
              case (percentY == 0):
                secondaryEventName = 'percentY0';
                break;
              case (percentY == 25):
                secondaryEventName = 'percentY25';
                break;
              case (percentY == 50):
                secondaryEventName = 'percentY50';
                break;
              case (percentY == 75):
                secondaryEventName = 'percentY75';
                break;
              case (percentY == 90):
                secondaryEventName = 'percentY90';
                break;
              default:
                break;
            }
            var customEvent = new CustomEvent(secondaryEventName, {
              detail: {
                percentX: percentX,
                percentY: percentY
              }
            });
            event.target.dispatchEvent(customEvent);

          });
        });

      });
    }, null);
  }

}).call(null);
