var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num2) {
      return lookup[num2 >> 18 & 63] + lookup[num2 >> 12 & 63] + lookup[num2 >> 6 & 63] + lookup[num2 & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer3;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer3.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer3.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function Buffer3(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer3.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer3.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer3.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer3, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer3.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer3.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer3.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer3.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer3.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer3.alloc(+length);
    }
    Buffer3.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer3.prototype;
    };
    Buffer3.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array)) a = Buffer3.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer3.from(b, b.offset, b.byteLength);
      if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b) return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer3.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer3.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer3.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer3.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer3.isBuffer(buf)) buf = Buffer3.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer3.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer3.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer3.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer3.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer3.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer3.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
    Buffer3.prototype.equals = function equals(b) {
      if (!Buffer3.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer3.compare(this, b) === 0;
    };
    Buffer3.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
    }
    Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer3.from(target, target.offset, target.byteLength);
      }
      if (!Buffer3.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer3.from(val, encoding);
      }
      if (Buffer3.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer3.prototype.includes = function includes2(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer3.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer3.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer3.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer3.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer3.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer3.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer3.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range2, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range2}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range2;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range2 = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range2 = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range2 = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range2, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type || "offset",
        `>= ${type ? 1 : 0} and <= ${length}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = (function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    })();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/just-once/index.js
var require_just_once = __commonJS({
  "node_modules/just-once/index.js"(exports, module) {
    module.exports = once;
    function once(fn) {
      var called, value;
      if (typeof fn !== "function") {
        throw new Error("expected a function but got " + fn);
      }
      return function wrap() {
        if (called) {
          return value;
        }
        called = true;
        value = fn.apply(this, arguments);
        return value;
      };
    }
  }
});

// node_modules/fast-text-encoding/text.min.js
var require_text_min = __commonJS({
  "node_modules/fast-text-encoding/text.min.js"(exports) {
    (function(scope) {
      "use strict";
      function B(r, e) {
        var f;
        return r instanceof Buffer ? f = r : f = Buffer.from(r.buffer, r.byteOffset, r.byteLength), f.toString(e);
      }
      var w = function(r) {
        return Buffer.from(r);
      };
      function h(r) {
        for (var e = 0, f = Math.min(256 * 256, r.length + 1), n = new Uint16Array(f), i = [], o = 0; ; ) {
          var t = e < r.length;
          if (!t || o >= f - 1) {
            var s = n.subarray(0, o), m = s;
            if (i.push(String.fromCharCode.apply(null, m)), !t) return i.join("");
            r = r.subarray(e), e = 0, o = 0;
          }
          var a = r[e++];
          if ((a & 128) === 0) n[o++] = a;
          else if ((a & 224) === 192) {
            var d = r[e++] & 63;
            n[o++] = (a & 31) << 6 | d;
          } else if ((a & 240) === 224) {
            var d = r[e++] & 63, l = r[e++] & 63;
            n[o++] = (a & 31) << 12 | d << 6 | l;
          } else if ((a & 248) === 240) {
            var d = r[e++] & 63, l = r[e++] & 63, R = r[e++] & 63, c = (a & 7) << 18 | d << 12 | l << 6 | R;
            c > 65535 && (c -= 65536, n[o++] = c >>> 10 & 1023 | 55296, c = 56320 | c & 1023), n[o++] = c;
          }
        }
      }
      function F(r) {
        for (var e = 0, f = r.length, n = 0, i = Math.max(32, f + (f >>> 1) + 7), o = new Uint8Array(i >>> 3 << 3); e < f; ) {
          var t = r.charCodeAt(e++);
          if (t >= 55296 && t <= 56319) {
            if (e < f) {
              var s = r.charCodeAt(e);
              (s & 64512) === 56320 && (++e, t = ((t & 1023) << 10) + (s & 1023) + 65536);
            }
            if (t >= 55296 && t <= 56319) continue;
          }
          if (n + 4 > o.length) {
            i += 8, i *= 1 + e / r.length * 2, i = i >>> 3 << 3;
            var m = new Uint8Array(i);
            m.set(o), o = m;
          }
          if ((t & 4294967168) === 0) {
            o[n++] = t;
            continue;
          } else if ((t & 4294965248) === 0) o[n++] = t >>> 6 & 31 | 192;
          else if ((t & 4294901760) === 0) o[n++] = t >>> 12 & 15 | 224, o[n++] = t >>> 6 & 63 | 128;
          else if ((t & 4292870144) === 0) o[n++] = t >>> 18 & 7 | 240, o[n++] = t >>> 12 & 63 | 128, o[n++] = t >>> 6 & 63 | 128;
          else continue;
          o[n++] = t & 63 | 128;
        }
        return o.slice ? o.slice(0, n) : o.subarray(0, n);
      }
      var u = "Failed to ", p = function(r, e, f) {
        if (r) throw new Error("".concat(u).concat(e, ": the '").concat(f, "' option is unsupported."));
      };
      var x = typeof Buffer == "function" && Buffer.from;
      var A = x ? w : F;
      function v() {
        this.encoding = "utf-8";
      }
      v.prototype.encode = function(r, e) {
        return p(e && e.stream, "encode", "stream"), A(r);
      };
      function U(r) {
        var e;
        try {
          var f = new Blob([r], { type: "text/plain;charset=UTF-8" });
          e = URL.createObjectURL(f);
          var n = new XMLHttpRequest();
          return n.open("GET", e, false), n.send(), n.responseText;
        } finally {
          e && URL.revokeObjectURL(e);
        }
      }
      var O = !x && typeof Blob == "function" && typeof URL == "function" && typeof URL.createObjectURL == "function", S = ["utf-8", "utf8", "unicode-1-1-utf-8"], T = h;
      x ? T = B : O && (T = function(r) {
        try {
          return U(r);
        } catch (e) {
          return h(r);
        }
      });
      var y = "construct 'TextDecoder'", E = "".concat(u, " ").concat(y, ": the ");
      function g(r, e) {
        p(e && e.fatal, y, "fatal"), r = r || "utf-8";
        var f;
        if (x ? f = Buffer.isEncoding(r) : f = S.indexOf(r.toLowerCase()) !== -1, !f) throw new RangeError("".concat(E, " encoding label provided ('").concat(r, "') is invalid."));
        this.encoding = r, this.fatal = false, this.ignoreBOM = false;
      }
      g.prototype.decode = function(r, e) {
        p(e && e.stream, "decode", "stream");
        var f;
        return r instanceof Uint8Array ? f = r : r.buffer instanceof ArrayBuffer ? f = new Uint8Array(r.buffer) : f = new Uint8Array(r), T(f, this.encoding);
      };
      scope.TextEncoder = scope.TextEncoder || v;
      scope.TextDecoder = scope.TextDecoder || g;
    })(typeof window !== "undefined" ? window : typeof window !== "undefined" ? window : exports);
  }
});

// node_modules/isomorphic-textencoder/browser.js
var require_browser = __commonJS({
  "node_modules/isomorphic-textencoder/browser.js"(exports, module) {
    require_text_min();
    module.exports = {
      encode: (string) => new TextEncoder().encode(string),
      decode: (buffer) => new TextDecoder().decode(buffer)
    };
  }
});

// node_modules/just-debounce-it/index.js
var require_just_debounce_it = __commonJS({
  "node_modules/just-debounce-it/index.js"(exports, module) {
    module.exports = debounce;
    function debounce(fn, wait, callFirst) {
      var timeout;
      return function() {
        if (!wait) {
          return fn.apply(this, arguments);
        }
        var context = this;
        var args = arguments;
        var callNow = callFirst && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          timeout = null;
          if (!callNow) {
            return fn.apply(context, args);
          }
        }, wait);
        if (callNow) {
          return fn.apply(this, arguments);
        }
      };
    }
  }
});

// node_modules/@isomorphic-git/lightning-fs/src/path.js
var require_path = __commonJS({
  "node_modules/@isomorphic-git/lightning-fs/src/path.js"(exports, module) {
    function normalizePath2(path) {
      if (path.length === 0) {
        return ".";
      }
      let parts = splitPath(path);
      parts = parts.reduce(reducer, []);
      return joinPath(...parts);
    }
    function resolvePath(...paths) {
      let result = "";
      for (let path of paths) {
        if (path.startsWith("/")) {
          result = path;
        } else {
          result = normalizePath2(joinPath(result, path));
        }
      }
      return result;
    }
    function joinPath(...parts) {
      if (parts.length === 0) return "";
      let path = parts.join("/");
      path = path.replace(/\/{2,}/g, "/");
      return path;
    }
    function splitPath(path) {
      if (path.length === 0) return [];
      if (path === "/") return ["/"];
      let parts = path.split("/");
      if (parts[parts.length - 1] === "") {
        parts.pop();
      }
      if (path[0] === "/") {
        parts[0] = "/";
      } else {
        if (parts[0] !== ".") {
          parts.unshift(".");
        }
      }
      return parts;
    }
    function dirname2(path) {
      const last = path.lastIndexOf("/");
      if (last === -1) throw new Error(`Cannot get dirname of "${path}"`);
      if (last === 0) return "/";
      return path.slice(0, last);
    }
    function basename2(path) {
      if (path === "/") throw new Error(`Cannot get basename of "${path}"`);
      const last = path.lastIndexOf("/");
      if (last === -1) return path;
      return path.slice(last + 1);
    }
    function reducer(ancestors, current) {
      if (ancestors.length === 0) {
        ancestors.push(current);
        return ancestors;
      }
      if (current === ".") return ancestors;
      if (current === "..") {
        if (ancestors.length === 1) {
          if (ancestors[0] === "/") {
            throw new Error("Unable to normalize path - traverses above root directory");
          }
          if (ancestors[0] === ".") {
            ancestors.push(current);
            return ancestors;
          }
        }
        if (ancestors[ancestors.length - 1] === "..") {
          ancestors.push("..");
          return ancestors;
        } else {
          ancestors.pop();
          return ancestors;
        }
      }
      ancestors.push(current);
      return ancestors;
    }
    module.exports = {
      join: joinPath,
      normalize: normalizePath2,
      split: splitPath,
      basename: basename2,
      dirname: dirname2,
      resolve: resolvePath
    };
  }
});

// node_modules/@isomorphic-git/lightning-fs/src/errors.js
var require_errors = __commonJS({
  "node_modules/@isomorphic-git/lightning-fs/src/errors.js"(exports, module) {
    function Err(name) {
      return class extends Error {
        constructor(...args) {
          super(...args);
          this.code = name;
          if (this.message) {
            this.message = name + ": " + this.message;
          } else {
            this.message = name;
          }
        }
      };
    }
    var EEXIST = Err("EEXIST");
    var ENOENT = Err("ENOENT");
    var ENOTDIR = Err("ENOTDIR");
    var ENOTEMPTY = Err("ENOTEMPTY");
    var ETIMEDOUT = Err("ETIMEDOUT");
    var EISDIR = Err("EISDIR");
    module.exports = { EEXIST, ENOENT, ENOTDIR, ENOTEMPTY, ETIMEDOUT, EISDIR };
  }
});

// node_modules/@isomorphic-git/lightning-fs/src/CacheFS.js
var require_CacheFS = __commonJS({
  "node_modules/@isomorphic-git/lightning-fs/src/CacheFS.js"(exports, module) {
    var path = require_path();
    var { EEXIST, ENOENT, ENOTDIR, ENOTEMPTY, EISDIR } = require_errors();
    var STAT = 0;
    module.exports = class CacheFS {
      constructor() {
      }
      _makeRoot(root = /* @__PURE__ */ new Map()) {
        root.set(STAT, { mode: 511, type: "dir", size: 0, ino: 0, mtimeMs: Date.now() });
        return root;
      }
      activate(superblock = null) {
        if (superblock === null) {
          this._root = /* @__PURE__ */ new Map([["/", this._makeRoot()]]);
        } else if (typeof superblock === "string") {
          this._root = /* @__PURE__ */ new Map([["/", this._makeRoot(this.parse(superblock))]]);
        } else {
          this._root = superblock;
        }
      }
      get activated() {
        return !!this._root;
      }
      deactivate() {
        this._root = void 0;
      }
      size() {
        return this._countInodes(this._root.get("/")) - 1;
      }
      _countInodes(map) {
        let count = 1;
        for (let [key, val] of map) {
          if (key === STAT) continue;
          count += this._countInodes(val);
        }
        return count;
      }
      autoinc() {
        let val = this._maxInode(this._root.get("/")) + 1;
        return val;
      }
      _maxInode(map) {
        let max = map.get(STAT).ino;
        for (let [key, val] of map) {
          if (key === STAT) continue;
          max = Math.max(max, this._maxInode(val));
        }
        return max;
      }
      print(root = this._root.get("/")) {
        let str = "";
        const printTree = (root2, indent2) => {
          for (let [file, node] of root2) {
            if (file === 0) continue;
            let stat = node.get(STAT);
            let mode = stat.mode.toString(8);
            str += `${"	".repeat(indent2)}${file}	${mode}`;
            if (stat.type === "file") {
              str += `	${stat.size}	${stat.mtimeMs}
`;
            } else {
              str += `
`;
              printTree(node, indent2 + 1);
            }
          }
        };
        printTree(root, 0);
        return str;
      }
      parse(print) {
        let autoinc = 0;
        function mk(stat) {
          const ino = ++autoinc;
          const type = stat.length === 1 ? "dir" : "file";
          let [mode, size, mtimeMs] = stat;
          mode = parseInt(mode, 8);
          size = size ? parseInt(size) : 0;
          mtimeMs = mtimeMs ? parseInt(mtimeMs) : Date.now();
          return /* @__PURE__ */ new Map([[STAT, { mode, type, size, mtimeMs, ino }]]);
        }
        let lines = print.trim().split("\n");
        let _root = this._makeRoot();
        let stack = [
          { indent: -1, node: _root },
          { indent: 0, node: null }
        ];
        for (let line of lines) {
          let prefix = line.match(/^\t*/)[0];
          let indent2 = prefix.length;
          line = line.slice(indent2);
          let [filename, ...stat] = line.split("	");
          let node = mk(stat);
          if (indent2 <= stack[stack.length - 1].indent) {
            while (indent2 <= stack[stack.length - 1].indent) {
              stack.pop();
            }
          }
          stack.push({ indent: indent2, node });
          let cd = stack[stack.length - 2].node;
          cd.set(filename, node);
        }
        return _root;
      }
      _lookup(filepath, follow = true) {
        let dir = this._root;
        let partialPath = "/";
        let parts = path.split(filepath);
        for (let i = 0; i < parts.length; ++i) {
          let part = parts[i];
          dir = dir.get(part);
          if (!dir) throw new ENOENT(filepath);
          if (follow || i < parts.length - 1) {
            const stat = dir.get(STAT);
            if (stat.type === "symlink") {
              let target = path.resolve(partialPath, stat.target);
              dir = this._lookup(target);
            }
            if (!partialPath) {
              partialPath = part;
            } else {
              partialPath = path.join(partialPath, part);
            }
          }
        }
        return dir;
      }
      mkdir(filepath, { mode }) {
        if (filepath === "/") throw new EEXIST();
        let dir = this._lookup(path.dirname(filepath));
        let basename2 = path.basename(filepath);
        if (dir.has(basename2)) {
          throw new EEXIST();
        }
        let entry = /* @__PURE__ */ new Map();
        let stat = {
          mode,
          type: "dir",
          size: 0,
          mtimeMs: Date.now(),
          ino: this.autoinc()
        };
        entry.set(STAT, stat);
        dir.set(basename2, entry);
      }
      rmdir(filepath) {
        let dir = this._lookup(filepath);
        if (dir.get(STAT).type !== "dir") throw new ENOTDIR();
        if (dir.size > 1) throw new ENOTEMPTY();
        let parent = this._lookup(path.dirname(filepath));
        let basename2 = path.basename(filepath);
        parent.delete(basename2);
      }
      readdir(filepath) {
        let dir = this._lookup(filepath);
        if (dir.get(STAT).type !== "dir") throw new ENOTDIR();
        return [...dir.keys()].filter((key) => typeof key === "string");
      }
      writeStat(filepath, size, { mode }) {
        let ino;
        let oldStat;
        try {
          oldStat = this.stat(filepath);
        } catch (err) {
        }
        if (oldStat !== void 0) {
          if (oldStat.type === "dir") {
            throw new EISDIR();
          }
          if (mode == null) {
            mode = oldStat.mode;
          }
          ino = oldStat.ino;
        }
        if (mode == null) {
          mode = 438;
        }
        if (ino == null) {
          ino = this.autoinc();
        }
        let dir = this._lookup(path.dirname(filepath));
        let basename2 = path.basename(filepath);
        let stat = {
          mode,
          type: "file",
          size,
          mtimeMs: Date.now(),
          ino
        };
        let entry = /* @__PURE__ */ new Map();
        entry.set(STAT, stat);
        dir.set(basename2, entry);
        return stat;
      }
      unlink(filepath) {
        let parent = this._lookup(path.dirname(filepath));
        let basename2 = path.basename(filepath);
        parent.delete(basename2);
      }
      rename(oldFilepath, newFilepath) {
        let basename2 = path.basename(newFilepath);
        let entry = this._lookup(oldFilepath);
        let destDir = this._lookup(path.dirname(newFilepath));
        destDir.set(basename2, entry);
        this.unlink(oldFilepath);
      }
      stat(filepath) {
        return this._lookup(filepath).get(STAT);
      }
      lstat(filepath) {
        return this._lookup(filepath, false).get(STAT);
      }
      readlink(filepath) {
        return this._lookup(filepath, false).get(STAT).target;
      }
      symlink(target, filepath) {
        let ino, mode;
        try {
          let oldStat = this.stat(filepath);
          if (mode === null) {
            mode = oldStat.mode;
          }
          ino = oldStat.ino;
        } catch (err) {
        }
        if (mode == null) {
          mode = 40960;
        }
        if (ino == null) {
          ino = this.autoinc();
        }
        let dir = this._lookup(path.dirname(filepath));
        let basename2 = path.basename(filepath);
        let stat = {
          mode,
          type: "symlink",
          target,
          size: 0,
          mtimeMs: Date.now(),
          ino
        };
        let entry = /* @__PURE__ */ new Map();
        entry.set(STAT, stat);
        dir.set(basename2, entry);
        return stat;
      }
      _du(dir) {
        let size = 0;
        for (const [name, entry] of dir.entries()) {
          if (name === STAT) {
            size += entry.size;
          } else {
            size += this._du(entry);
          }
        }
        return size;
      }
      du(filepath) {
        let dir = this._lookup(filepath);
        return this._du(dir);
      }
    };
  }
});

// node_modules/@isomorphic-git/idb-keyval/dist/idb-keyval-cjs.js
var require_idb_keyval_cjs = __commonJS({
  "node_modules/@isomorphic-git/idb-keyval/dist/idb-keyval-cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Store = class {
      constructor(dbName = "keyval-store", storeName = "keyval") {
        this.storeName = storeName;
        this._dbName = dbName;
        this._storeName = storeName;
        this._init();
      }
      _init() {
        if (this._dbp) {
          return;
        }
        this._dbp = new Promise((resolve, reject) => {
          const openreq = indexedDB.open(this._dbName);
          openreq.onerror = () => reject(openreq.error);
          openreq.onsuccess = () => resolve(openreq.result);
          openreq.onupgradeneeded = () => {
            openreq.result.createObjectStore(this._storeName);
          };
        });
      }
      _withIDBStore(type, callback) {
        this._init();
        return this._dbp.then((db) => new Promise((resolve, reject) => {
          const transaction = db.transaction(this.storeName, type);
          transaction.oncomplete = () => resolve();
          transaction.onabort = transaction.onerror = () => reject(transaction.error);
          callback(transaction.objectStore(this.storeName));
        }));
      }
      _close() {
        this._init();
        return this._dbp.then((db) => {
          db.close();
          this._dbp = void 0;
        });
      }
    };
    var store;
    function getDefaultStore() {
      if (!store)
        store = new Store();
      return store;
    }
    function get(key, store2 = getDefaultStore()) {
      let req;
      return store2._withIDBStore("readwrite", (store3) => {
        req = store3.get(key);
      }).then(() => req.result);
    }
    function set(key, value, store2 = getDefaultStore()) {
      return store2._withIDBStore("readwrite", (store3) => {
        store3.put(value, key);
      });
    }
    function update(key, updater, store2 = getDefaultStore()) {
      return store2._withIDBStore("readwrite", (store3) => {
        const req = store3.get(key);
        req.onsuccess = () => {
          store3.put(updater(req.result), key);
        };
      });
    }
    function del(key, store2 = getDefaultStore()) {
      return store2._withIDBStore("readwrite", (store3) => {
        store3.delete(key);
      });
    }
    function clear(store2 = getDefaultStore()) {
      return store2._withIDBStore("readwrite", (store3) => {
        store3.clear();
      });
    }
    function keys(store2 = getDefaultStore()) {
      const keys2 = [];
      return store2._withIDBStore("readwrite", (store3) => {
        (store3.openKeyCursor || store3.openCursor).call(store3).onsuccess = function() {
          if (!this.result)
            return;
          keys2.push(this.result.key);
          this.result.continue();
        };
      }).then(() => keys2);
    }
    function close(store2 = getDefaultStore()) {
      return store2._close();
    }
    exports.Store = Store;
    exports.get = get;
    exports.set = set;
    exports.update = update;
    exports.del = del;
    exports.clear = clear;
    exports.keys = keys;
    exports.close = close;
  }
});

// node_modules/@isomorphic-git/lightning-fs/src/IdbBackend.js
var require_IdbBackend = __commonJS({
  "node_modules/@isomorphic-git/lightning-fs/src/IdbBackend.js"(exports, module) {
    var idb = require_idb_keyval_cjs();
    module.exports = class IdbBackend {
      constructor(dbname, storename) {
        this._database = dbname;
        this._storename = storename;
        this._store = new idb.Store(this._database, this._storename);
      }
      saveSuperblock(superblock) {
        return idb.set("!root", superblock, this._store);
      }
      loadSuperblock() {
        return idb.get("!root", this._store);
      }
      readFile(inode) {
        return idb.get(inode, this._store);
      }
      writeFile(inode, data) {
        return idb.set(inode, data, this._store);
      }
      unlink(inode) {
        return idb.del(inode, this._store);
      }
      wipe() {
        return idb.clear(this._store);
      }
      close() {
        return idb.close(this._store);
      }
    };
  }
});

// node_modules/@isomorphic-git/lightning-fs/src/HttpBackend.js
var require_HttpBackend = __commonJS({
  "node_modules/@isomorphic-git/lightning-fs/src/HttpBackend.js"(exports, module) {
    module.exports = class HttpBackend {
      constructor(url) {
        this._url = url;
      }
      loadSuperblock() {
        return fetch(this._url + "/.superblock.txt").then((res) => res.ok ? res.text() : null);
      }
      async readFile(filepath) {
        const res = await fetch(this._url + filepath);
        if (res.status === 200) {
          return res.arrayBuffer();
        } else {
          throw new Error("ENOENT");
        }
      }
      async sizeFile(filepath) {
        const res = await fetch(this._url + filepath, { method: "HEAD" });
        if (res.status === 200) {
          return res.headers.get("content-length");
        } else {
          throw new Error("ENOENT");
        }
      }
    };
  }
});

// node_modules/@isomorphic-git/lightning-fs/src/Mutex.js
var require_Mutex = __commonJS({
  "node_modules/@isomorphic-git/lightning-fs/src/Mutex.js"(exports, module) {
    var idb = require_idb_keyval_cjs();
    var sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    module.exports = class Mutex {
      constructor(dbname, storename) {
        this._id = Math.random();
        this._database = dbname;
        this._storename = storename;
        this._store = new idb.Store(this._database, this._storename);
        this._lock = null;
      }
      async has({ margin = 2e3 } = {}) {
        if (this._lock && this._lock.holder === this._id) {
          const now = Date.now();
          if (this._lock.expires > now + margin) {
            return true;
          } else {
            return await this.renew();
          }
        } else {
          return false;
        }
      }
      // Returns true if successful
      async renew({ ttl = 5e3 } = {}) {
        let success;
        await idb.update("lock", (current) => {
          const now = Date.now();
          const expires = now + ttl;
          success = current && current.holder === this._id;
          this._lock = success ? { holder: this._id, expires } : current;
          return this._lock;
        }, this._store);
        return success;
      }
      // Returns true if successful
      async acquire({ ttl = 5e3 } = {}) {
        let success;
        let expired;
        let doubleLock;
        await idb.update("lock", (current) => {
          const now = Date.now();
          const expires = now + ttl;
          expired = current && current.expires < now;
          success = current === void 0 || expired;
          doubleLock = current && current.holder === this._id;
          this._lock = success ? { holder: this._id, expires } : current;
          return this._lock;
        }, this._store);
        if (doubleLock) {
          throw new Error("Mutex double-locked");
        }
        return success;
      }
      // check at 10Hz, give up after 10 minutes
      async wait({ interval = 100, limit = 6e3, ttl } = {}) {
        while (limit--) {
          if (await this.acquire({ ttl })) return true;
          await sleep(interval);
        }
        throw new Error("Mutex timeout");
      }
      // Returns true if successful
      async release({ force = false } = {}) {
        let success;
        let doubleFree;
        let someoneElseHasIt;
        await idb.update("lock", (current) => {
          success = force || current && current.holder === this._id;
          doubleFree = current === void 0;
          someoneElseHasIt = current && current.holder !== this._id;
          this._lock = success ? void 0 : current;
          return this._lock;
        }, this._store);
        await idb.close(this._store);
        if (!success && !force) {
          if (doubleFree) throw new Error("Mutex double-freed");
          if (someoneElseHasIt) throw new Error("Mutex lost ownership");
        }
        return success;
      }
    };
  }
});

// node_modules/@isomorphic-git/lightning-fs/src/Mutex2.js
var require_Mutex2 = __commonJS({
  "node_modules/@isomorphic-git/lightning-fs/src/Mutex2.js"(exports, module) {
    module.exports = class Mutex {
      constructor(name) {
        this._id = Math.random();
        this._database = name;
        this._has = false;
        this._release = null;
      }
      async has() {
        return this._has;
      }
      // Returns true if successful
      async acquire() {
        return new Promise((resolve) => {
          navigator.locks.request(this._database + "_lock", { ifAvailable: true }, (lock2) => {
            this._has = !!lock2;
            resolve(!!lock2);
            return new Promise((resolve2) => {
              this._release = resolve2;
            });
          });
        });
      }
      // Returns true if successful, gives up after 10 minutes
      async wait({ timeout = 6e5 } = {}) {
        return new Promise((resolve, reject) => {
          const controller = new AbortController();
          setTimeout(() => {
            controller.abort();
            reject(new Error("Mutex timeout"));
          }, timeout);
          navigator.locks.request(this._database + "_lock", { signal: controller.signal }, (lock2) => {
            this._has = !!lock2;
            resolve(!!lock2);
            return new Promise((resolve2) => {
              this._release = resolve2;
            });
          });
        });
      }
      // Returns true if successful
      async release({ force = false } = {}) {
        this._has = false;
        if (this._release) {
          this._release();
        } else if (force) {
          navigator.locks.request(this._database + "_lock", { steal: true }, (lock2) => true);
        }
      }
    };
  }
});

// node_modules/@isomorphic-git/lightning-fs/src/DefaultBackend.js
var require_DefaultBackend = __commonJS({
  "node_modules/@isomorphic-git/lightning-fs/src/DefaultBackend.js"(exports, module) {
    var { encode, decode } = require_browser();
    var debounce = require_just_debounce_it();
    var CacheFS = require_CacheFS();
    var { ENOENT, ENOTEMPTY, ETIMEDOUT } = require_errors();
    var IdbBackend = require_IdbBackend();
    var HttpBackend = require_HttpBackend();
    var Mutex = require_Mutex();
    var Mutex2 = require_Mutex2();
    var path = require_path();
    module.exports = class DefaultBackend {
      constructor() {
        this.saveSuperblock = debounce(() => {
          this.flush();
        }, 500);
      }
      async init(name, {
        wipe,
        url,
        urlauto,
        fileDbName = name,
        db = null,
        fileStoreName = name + "_files",
        lockDbName = name + "_lock",
        lockStoreName = name + "_lock"
      } = {}) {
        this._name = name;
        this._idb = db || new IdbBackend(fileDbName, fileStoreName);
        this._mutex = navigator.locks ? new Mutex2(name) : new Mutex(lockDbName, lockStoreName);
        this._cache = new CacheFS(name);
        this._opts = { wipe, url };
        this._needsWipe = !!wipe;
        if (url) {
          this._http = new HttpBackend(url);
          this._urlauto = !!urlauto;
        }
      }
      async activate() {
        if (this._cache.activated) return;
        if (this._needsWipe) {
          this._needsWipe = false;
          await this._idb.wipe();
          await this._mutex.release({ force: true });
        }
        if (!await this._mutex.has()) await this._mutex.wait();
        const root = await this._idb.loadSuperblock();
        if (root) {
          this._cache.activate(root);
        } else if (this._http) {
          const text = await this._http.loadSuperblock();
          this._cache.activate(text);
          await this._saveSuperblock();
        } else {
          this._cache.activate();
        }
        if (await this._mutex.has()) {
          return;
        } else {
          throw new ETIMEDOUT();
        }
      }
      async deactivate() {
        if (await this._mutex.has()) {
          await this._saveSuperblock();
        }
        this._cache.deactivate();
        try {
          await this._mutex.release();
        } catch (e) {
          console.log(e);
        }
        await this._idb.close();
      }
      async _saveSuperblock() {
        if (this._cache.activated) {
          this._lastSavedAt = Date.now();
          await this._idb.saveSuperblock(this._cache._root);
        }
      }
      _writeStat(filepath, size, opts) {
        let dirparts = path.split(path.dirname(filepath));
        let dir = dirparts.shift();
        for (let dirpart of dirparts) {
          dir = path.join(dir, dirpart);
          try {
            this._cache.mkdir(dir, { mode: 511 });
          } catch (e) {
          }
        }
        return this._cache.writeStat(filepath, size, opts);
      }
      async readFile(filepath, opts) {
        const encoding = typeof opts === "string" ? opts : opts && opts.encoding;
        if (encoding && encoding !== "utf8") throw new Error('Only "utf8" encoding is supported in readFile');
        let data = null, stat = null;
        try {
          stat = this._cache.stat(filepath);
          data = await this._idb.readFile(stat.ino);
        } catch (e) {
          if (!this._urlauto) throw e;
        }
        if (!data && this._http) {
          let lstat = this._cache.lstat(filepath);
          while (lstat.type === "symlink") {
            filepath = path.resolve(path.dirname(filepath), lstat.target);
            lstat = this._cache.lstat(filepath);
          }
          data = await this._http.readFile(filepath);
        }
        if (data) {
          if (!stat || stat.size != data.byteLength) {
            stat = await this._writeStat(filepath, data.byteLength, { mode: stat ? stat.mode : 438 });
            this.saveSuperblock();
          }
          if (encoding === "utf8") {
            data = decode(data);
          } else {
            data.toString = () => decode(data);
          }
        }
        if (!stat) throw new ENOENT(filepath);
        return data;
      }
      async writeFile(filepath, data, opts) {
        const { mode, encoding = "utf8" } = opts;
        if (typeof data === "string") {
          if (encoding !== "utf8") {
            throw new Error('Only "utf8" encoding is supported in writeFile');
          }
          data = encode(data);
        }
        const stat = await this._cache.writeStat(filepath, data.byteLength, { mode });
        await this._idb.writeFile(stat.ino, data);
      }
      async unlink(filepath, opts) {
        const stat = this._cache.lstat(filepath);
        this._cache.unlink(filepath);
        if (stat.type !== "symlink") {
          await this._idb.unlink(stat.ino);
        }
      }
      readdir(filepath, opts) {
        return this._cache.readdir(filepath);
      }
      mkdir(filepath, opts) {
        const { mode = 511 } = opts;
        this._cache.mkdir(filepath, { mode });
      }
      rmdir(filepath, opts) {
        if (filepath === "/") {
          throw new ENOTEMPTY();
        }
        this._cache.rmdir(filepath);
      }
      rename(oldFilepath, newFilepath) {
        this._cache.rename(oldFilepath, newFilepath);
      }
      stat(filepath, opts) {
        return this._cache.stat(filepath);
      }
      lstat(filepath, opts) {
        return this._cache.lstat(filepath);
      }
      readlink(filepath, opts) {
        return this._cache.readlink(filepath);
      }
      symlink(target, filepath) {
        this._cache.symlink(target, filepath);
      }
      async backFile(filepath, opts) {
        let size = await this._http.sizeFile(filepath);
        await this._writeStat(filepath, size, opts);
      }
      du(filepath) {
        return this._cache.du(filepath);
      }
      flush() {
        return this._saveSuperblock();
      }
    };
  }
});

// node_modules/@isomorphic-git/lightning-fs/src/Stat.js
var require_Stat = __commonJS({
  "node_modules/@isomorphic-git/lightning-fs/src/Stat.js"(exports, module) {
    module.exports = class Stat {
      constructor(stats) {
        this.type = stats.type;
        this.mode = stats.mode;
        this.size = stats.size;
        this.ino = stats.ino;
        this.mtimeMs = stats.mtimeMs;
        this.ctimeMs = stats.ctimeMs || stats.mtimeMs;
        this.uid = 1;
        this.gid = 1;
        this.dev = 1;
      }
      isFile() {
        return this.type === "file";
      }
      isDirectory() {
        return this.type === "dir";
      }
      isSymbolicLink() {
        return this.type === "symlink";
      }
    };
  }
});

// node_modules/@isomorphic-git/lightning-fs/src/PromisifiedFS.js
var require_PromisifiedFS = __commonJS({
  "node_modules/@isomorphic-git/lightning-fs/src/PromisifiedFS.js"(exports, module) {
    var DefaultBackend = require_DefaultBackend();
    var Stat = require_Stat();
    var path = require_path();
    function cleanParamsFilepathOpts(filepath, opts, ...rest) {
      filepath = path.normalize(filepath);
      if (typeof opts === "undefined" || typeof opts === "function") {
        opts = {};
      }
      if (typeof opts === "string") {
        opts = {
          encoding: opts
        };
      }
      return [filepath, opts, ...rest];
    }
    function cleanParamsFilepathDataOpts(filepath, data, opts, ...rest) {
      filepath = path.normalize(filepath);
      if (typeof opts === "undefined" || typeof opts === "function") {
        opts = {};
      }
      if (typeof opts === "string") {
        opts = {
          encoding: opts
        };
      }
      return [filepath, data, opts, ...rest];
    }
    function cleanParamsFilepathFilepath(oldFilepath, newFilepath, ...rest) {
      return [path.normalize(oldFilepath), path.normalize(newFilepath), ...rest];
    }
    module.exports = class PromisifiedFS {
      constructor(name, options = {}) {
        this.init = this.init.bind(this);
        this.readFile = this._wrap(this.readFile, cleanParamsFilepathOpts, false);
        this.writeFile = this._wrap(this.writeFile, cleanParamsFilepathDataOpts, true);
        this.unlink = this._wrap(this.unlink, cleanParamsFilepathOpts, true);
        this.readdir = this._wrap(this.readdir, cleanParamsFilepathOpts, false);
        this.mkdir = this._wrap(this.mkdir, cleanParamsFilepathOpts, true);
        this.rmdir = this._wrap(this.rmdir, cleanParamsFilepathOpts, true);
        this.rename = this._wrap(this.rename, cleanParamsFilepathFilepath, true);
        this.stat = this._wrap(this.stat, cleanParamsFilepathOpts, false);
        this.lstat = this._wrap(this.lstat, cleanParamsFilepathOpts, false);
        this.readlink = this._wrap(this.readlink, cleanParamsFilepathOpts, false);
        this.symlink = this._wrap(this.symlink, cleanParamsFilepathFilepath, true);
        this.backFile = this._wrap(this.backFile, cleanParamsFilepathOpts, true);
        this.du = this._wrap(this.du, cleanParamsFilepathOpts, false);
        this._deactivationPromise = null;
        this._deactivationTimeout = null;
        this._activationPromise = null;
        this._operations = /* @__PURE__ */ new Set();
        if (name) {
          this.init(name, options);
        }
      }
      async init(...args) {
        if (this._initPromiseResolve) await this._initPromise;
        this._initPromise = this._init(...args);
        return this._initPromise;
      }
      async _init(name, options = {}) {
        await this._gracefulShutdown();
        if (this._activationPromise) await this._deactivate();
        if (this._backend && this._backend.destroy) {
          await this._backend.destroy();
        }
        this._backend = options.backend || new DefaultBackend();
        if (this._backend.init) {
          await this._backend.init(name, options);
        }
        if (this._initPromiseResolve) {
          this._initPromiseResolve();
          this._initPromiseResolve = null;
        }
        if (!options.defer) {
          this.stat("/");
        }
      }
      async _gracefulShutdown() {
        if (this._operations.size > 0) {
          this._isShuttingDown = true;
          await new Promise((resolve) => this._gracefulShutdownResolve = resolve);
          this._isShuttingDown = false;
          this._gracefulShutdownResolve = null;
        }
      }
      _wrap(fn, paramCleaner, mutating) {
        return async (...args) => {
          args = paramCleaner(...args);
          let op = {
            name: fn.name,
            args
          };
          this._operations.add(op);
          try {
            await this._activate();
            return await fn.apply(this, args);
          } finally {
            this._operations.delete(op);
            if (mutating) this._backend.saveSuperblock();
            if (this._operations.size === 0) {
              if (!this._deactivationTimeout) clearTimeout(this._deactivationTimeout);
              this._deactivationTimeout = setTimeout(this._deactivate.bind(this), 500);
            }
          }
        };
      }
      async _activate() {
        if (!this._initPromise) console.warn(new Error(`Attempted to use LightningFS ${this._name} before it was initialized.`));
        await this._initPromise;
        if (this._deactivationTimeout) {
          clearTimeout(this._deactivationTimeout);
          this._deactivationTimeout = null;
        }
        if (this._deactivationPromise) await this._deactivationPromise;
        this._deactivationPromise = null;
        if (!this._activationPromise) {
          this._activationPromise = this._backend.activate ? this._backend.activate() : Promise.resolve();
        }
        await this._activationPromise;
      }
      async _deactivate() {
        if (this._activationPromise) await this._activationPromise;
        if (!this._deactivationPromise) {
          this._deactivationPromise = this._backend.deactivate ? this._backend.deactivate() : Promise.resolve();
        }
        this._activationPromise = null;
        if (this._gracefulShutdownResolve) this._gracefulShutdownResolve();
        return this._deactivationPromise;
      }
      async readFile(filepath, opts) {
        return this._backend.readFile(filepath, opts);
      }
      async writeFile(filepath, data, opts) {
        await this._backend.writeFile(filepath, data, opts);
        return null;
      }
      async unlink(filepath, opts) {
        await this._backend.unlink(filepath, opts);
        return null;
      }
      async readdir(filepath, opts) {
        return this._backend.readdir(filepath, opts);
      }
      async mkdir(filepath, opts) {
        await this._backend.mkdir(filepath, opts);
        return null;
      }
      async rmdir(filepath, opts) {
        await this._backend.rmdir(filepath, opts);
        return null;
      }
      async rename(oldFilepath, newFilepath) {
        await this._backend.rename(oldFilepath, newFilepath);
        return null;
      }
      async stat(filepath, opts) {
        const data = await this._backend.stat(filepath, opts);
        return new Stat(data);
      }
      async lstat(filepath, opts) {
        const data = await this._backend.lstat(filepath, opts);
        return new Stat(data);
      }
      async readlink(filepath, opts) {
        return this._backend.readlink(filepath, opts);
      }
      async symlink(target, filepath) {
        await this._backend.symlink(target, filepath);
        return null;
      }
      async backFile(filepath, opts) {
        await this._backend.backFile(filepath, opts);
        return null;
      }
      async du(filepath) {
        return this._backend.du(filepath);
      }
      async flush() {
        return this._backend.flush();
      }
    };
  }
});

// node_modules/@isomorphic-git/lightning-fs/src/MemoryBackend.js
var require_MemoryBackend = __commonJS({
  "node_modules/@isomorphic-git/lightning-fs/src/MemoryBackend.js"(exports, module) {
    module.exports = class MemoryBackend {
      constructor() {
        this._map = /* @__PURE__ */ new Map();
      }
      // -----------------------------------------------------------------------
      // The five methods LightningFS expects from every backend
      // -----------------------------------------------------------------------
      /**
       * Persist the serialised directory tree (superblock).
       * LightningFS calls this whenever the in-memory CacheFS is dirtied.
       * @param {any} superblock
       */
      saveSuperblock(superblock) {
        this._map.set("!root", superblock);
      }
      /**
       * Load the serialised directory tree on startup.
       * Return null if nothing has been saved yet (fresh filesystem).
       * @returns {any|null}
       */
      loadSuperblock() {
        return this._map.get("!root") || null;
      }
      /**
       * Read raw file bytes by inode key.
       * @param {number} inode
       * @returns {any|null}
       */
      readFile(inode) {
        return this._map.get(inode) || null;
      }
      /**
       * Write raw file bytes by inode key.
       * @param {number} inode
       * @param {any} data
       */
      writeFile(inode, data) {
        this._map.set(inode, data);
      }
      /**
       * Delete a file by inode key.
       * @param {number} inode
       */
      unlink(inode) {
        this._map.delete(inode);
      }
      // -----------------------------------------------------------------------
      // Optional helpers (same surface as IdbBackend)
      // -----------------------------------------------------------------------
      /**
       * Wipe all stored data.  Called when LightningFS is initialised with
       * `{ wipe: true }`.
       */
      async wipe() {
        this._map.clear();
      }
      /**
       * No-op: there is no connection to close for an in-memory store.
       * Provided for API parity with IdbBackend.
       */
      close() {
      }
    };
  }
});

// node_modules/@isomorphic-git/lightning-fs/src/index.js
var require_src = __commonJS({
  "node_modules/@isomorphic-git/lightning-fs/src/index.js"(exports, module) {
    var once = require_just_once();
    var PromisifiedFS = require_PromisifiedFS();
    var MemoryBackend = require_MemoryBackend();
    function wrapCallback(opts, cb) {
      if (typeof opts === "function") {
        cb = opts;
      }
      cb = once(cb);
      const resolve = (...args) => cb(null, ...args);
      return [resolve, cb];
    }
    module.exports = class FS {
      constructor(...args) {
        this.promises = new PromisifiedFS(...args);
        this.init = this.init.bind(this);
        this.readFile = this.readFile.bind(this);
        this.writeFile = this.writeFile.bind(this);
        this.unlink = this.unlink.bind(this);
        this.readdir = this.readdir.bind(this);
        this.mkdir = this.mkdir.bind(this);
        this.rmdir = this.rmdir.bind(this);
        this.rename = this.rename.bind(this);
        this.stat = this.stat.bind(this);
        this.lstat = this.lstat.bind(this);
        this.readlink = this.readlink.bind(this);
        this.symlink = this.symlink.bind(this);
        this.backFile = this.backFile.bind(this);
        this.du = this.du.bind(this);
        this.flush = this.flush.bind(this);
      }
      init(name, options) {
        return this.promises.init(name, options);
      }
      readFile(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.readFile(filepath, opts).then(resolve).catch(reject);
      }
      writeFile(filepath, data, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.writeFile(filepath, data, opts).then(resolve).catch(reject);
      }
      unlink(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.unlink(filepath, opts).then(resolve).catch(reject);
      }
      readdir(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.readdir(filepath, opts).then(resolve).catch(reject);
      }
      mkdir(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.mkdir(filepath, opts).then(resolve).catch(reject);
      }
      rmdir(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.rmdir(filepath, opts).then(resolve).catch(reject);
      }
      rename(oldFilepath, newFilepath, cb) {
        const [resolve, reject] = wrapCallback(cb);
        this.promises.rename(oldFilepath, newFilepath).then(resolve).catch(reject);
      }
      stat(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.stat(filepath).then(resolve).catch(reject);
      }
      lstat(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.lstat(filepath).then(resolve).catch(reject);
      }
      readlink(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.readlink(filepath).then(resolve).catch(reject);
      }
      symlink(target, filepath, cb) {
        const [resolve, reject] = wrapCallback(cb);
        this.promises.symlink(target, filepath).then(resolve).catch(reject);
      }
      backFile(filepath, opts, cb) {
        const [resolve, reject] = wrapCallback(opts, cb);
        this.promises.backFile(filepath, opts).then(resolve).catch(reject);
      }
      du(filepath, cb) {
        const [resolve, reject] = wrapCallback(cb);
        this.promises.du(filepath).then(resolve).catch(reject);
      }
      flush(cb) {
        const [resolve, reject] = wrapCallback(cb);
        this.promises.flush().then(resolve).catch(reject);
      }
    };
    module.exports.MemoryBackend = MemoryBackend;
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports, module) {
    if (typeof Object.create === "function") {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports, module) {
    var buffer = require_buffer();
    var Buffer3 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer3.from && Buffer3.alloc && Buffer3.allocUnsafe && Buffer3.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer3(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer3.prototype);
    copyProps(Buffer3, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer3(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer3(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer3(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/isarray/index.js
var require_isarray = __commonJS({
  "node_modules/isarray/index.js"(exports, module) {
    var toString = {}.toString;
    module.exports = Array.isArray || function(arr) {
      return toString.call(arr) == "[object Array]";
    };
  }
});

// node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/es-errors/type.js"(exports, module) {
    "use strict";
    module.exports = TypeError;
  }
});

// node_modules/es-object-atoms/index.js
var require_es_object_atoms = __commonJS({
  "node_modules/es-object-atoms/index.js"(exports, module) {
    "use strict";
    module.exports = Object;
  }
});

// node_modules/es-errors/index.js
var require_es_errors = __commonJS({
  "node_modules/es-errors/index.js"(exports, module) {
    "use strict";
    module.exports = Error;
  }
});

// node_modules/es-errors/eval.js
var require_eval = __commonJS({
  "node_modules/es-errors/eval.js"(exports, module) {
    "use strict";
    module.exports = EvalError;
  }
});

// node_modules/es-errors/range.js
var require_range = __commonJS({
  "node_modules/es-errors/range.js"(exports, module) {
    "use strict";
    module.exports = RangeError;
  }
});

// node_modules/es-errors/ref.js
var require_ref = __commonJS({
  "node_modules/es-errors/ref.js"(exports, module) {
    "use strict";
    module.exports = ReferenceError;
  }
});

// node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/es-errors/syntax.js"(exports, module) {
    "use strict";
    module.exports = SyntaxError;
  }
});

// node_modules/es-errors/uri.js
var require_uri = __commonJS({
  "node_modules/es-errors/uri.js"(exports, module) {
    "use strict";
    module.exports = URIError;
  }
});

// node_modules/math-intrinsics/abs.js
var require_abs = __commonJS({
  "node_modules/math-intrinsics/abs.js"(exports, module) {
    "use strict";
    module.exports = Math.abs;
  }
});

// node_modules/math-intrinsics/floor.js
var require_floor = __commonJS({
  "node_modules/math-intrinsics/floor.js"(exports, module) {
    "use strict";
    module.exports = Math.floor;
  }
});

// node_modules/math-intrinsics/max.js
var require_max = __commonJS({
  "node_modules/math-intrinsics/max.js"(exports, module) {
    "use strict";
    module.exports = Math.max;
  }
});

// node_modules/math-intrinsics/min.js
var require_min = __commonJS({
  "node_modules/math-intrinsics/min.js"(exports, module) {
    "use strict";
    module.exports = Math.min;
  }
});

// node_modules/math-intrinsics/pow.js
var require_pow = __commonJS({
  "node_modules/math-intrinsics/pow.js"(exports, module) {
    "use strict";
    module.exports = Math.pow;
  }
});

// node_modules/math-intrinsics/round.js
var require_round = __commonJS({
  "node_modules/math-intrinsics/round.js"(exports, module) {
    "use strict";
    module.exports = Math.round;
  }
});

// node_modules/math-intrinsics/isNaN.js
var require_isNaN = __commonJS({
  "node_modules/math-intrinsics/isNaN.js"(exports, module) {
    "use strict";
    module.exports = Number.isNaN || function isNaN2(a) {
      return a !== a;
    };
  }
});

// node_modules/math-intrinsics/sign.js
var require_sign = __commonJS({
  "node_modules/math-intrinsics/sign.js"(exports, module) {
    "use strict";
    var $isNaN = require_isNaN();
    module.exports = function sign(number) {
      if ($isNaN(number) || number === 0) {
        return number;
      }
      return number < 0 ? -1 : 1;
    };
  }
});

// node_modules/gopd/gOPD.js
var require_gOPD = __commonJS({
  "node_modules/gopd/gOPD.js"(exports, module) {
    "use strict";
    module.exports = Object.getOwnPropertyDescriptor;
  }
});

// node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/gopd/index.js"(exports, module) {
    "use strict";
    var $gOPD = require_gOPD();
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module.exports = $gOPD;
  }
});

// node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "node_modules/es-define-property/index.js"(exports, module) {
    "use strict";
    var $defineProperty = Object.defineProperty || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    module.exports = $defineProperty;
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports, module) {
    "use strict";
    module.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = /* @__PURE__ */ Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (var _ in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = (
          /** @type {PropertyDescriptor} */
          Object.getOwnPropertyDescriptor(obj, sym)
        );
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports, module) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof /* @__PURE__ */ Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = __commonJS({
  "node_modules/get-proto/Reflect.getPrototypeOf.js"(exports, module) {
    "use strict";
    module.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
  }
});

// node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = __commonJS({
  "node_modules/get-proto/Object.getPrototypeOf.js"(exports, module) {
    "use strict";
    var $Object = require_es_object_atoms();
    module.exports = $Object.getPrototypeOf || null;
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports, module) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports, module) {
    "use strict";
    var implementation = require_implementation();
    module.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = __commonJS({
  "node_modules/call-bind-apply-helpers/functionCall.js"(exports, module) {
    "use strict";
    module.exports = Function.prototype.call;
  }
});

// node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = __commonJS({
  "node_modules/call-bind-apply-helpers/functionApply.js"(exports, module) {
    "use strict";
    module.exports = Function.prototype.apply;
  }
});

// node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = __commonJS({
  "node_modules/call-bind-apply-helpers/reflectApply.js"(exports, module) {
    "use strict";
    module.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
  }
});

// node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = __commonJS({
  "node_modules/call-bind-apply-helpers/actualApply.js"(exports, module) {
    "use strict";
    var bind = require_function_bind();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var $reflectApply = require_reflectApply();
    module.exports = $reflectApply || bind.call($call, $apply);
  }
});

// node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = __commonJS({
  "node_modules/call-bind-apply-helpers/index.js"(exports, module) {
    "use strict";
    var bind = require_function_bind();
    var $TypeError = require_type();
    var $call = require_functionCall();
    var $actualApply = require_actualApply();
    module.exports = function callBindBasic(args) {
      if (args.length < 1 || typeof args[0] !== "function") {
        throw new $TypeError("a function is required");
      }
      return $actualApply(bind, $call, args);
    };
  }
});

// node_modules/dunder-proto/get.js
var require_get = __commonJS({
  "node_modules/dunder-proto/get.js"(exports, module) {
    "use strict";
    var callBind = require_call_bind_apply_helpers();
    var gOPD = require_gopd();
    var hasProtoAccessor;
    try {
      hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
      [].__proto__ === Array.prototype;
    } catch (e) {
      if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
        throw e;
      }
    }
    var desc = !!hasProtoAccessor && gOPD && gOPD(
      Object.prototype,
      /** @type {keyof typeof Object.prototype} */
      "__proto__"
    );
    var $Object = Object;
    var $getPrototypeOf = $Object.getPrototypeOf;
    module.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
      /** @type {import('./get')} */
      function getDunder(value) {
        return $getPrototypeOf(value == null ? value : $Object(value));
      }
    ) : false;
  }
});

// node_modules/get-proto/index.js
var require_get_proto = __commonJS({
  "node_modules/get-proto/index.js"(exports, module) {
    "use strict";
    var reflectGetProto = require_Reflect_getPrototypeOf();
    var originalGetProto = require_Object_getPrototypeOf();
    var getDunderProto = require_get();
    module.exports = reflectGetProto ? function getProto(O) {
      return reflectGetProto(O);
    } : originalGetProto ? function getProto(O) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new TypeError("getProto: not an object");
      }
      return originalGetProto(O);
    } : getDunderProto ? function getProto(O) {
      return getDunderProto(O);
    } : null;
  }
});

// node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/hasown/index.js"(exports, module) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module.exports = bind.call(call, $hasOwn);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports, module) {
    "use strict";
    var undefined2;
    var $Object = require_es_object_atoms();
    var $Error = require_es_errors();
    var $EvalError = require_eval();
    var $RangeError = require_range();
    var $ReferenceError = require_ref();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var $URIError = require_uri();
    var abs = require_abs();
    var floor = require_floor();
    var max = require_max();
    var min = require_min();
    var pow = require_pow();
    var round = require_round();
    var sign = require_sign();
    var $Function = Function;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = require_gopd();
    var $defineProperty = require_es_define_property();
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? (function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    })() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = require_get_proto();
    var $ObjectGPO = require_Object_getPrototypeOf();
    var $ReflectGPO = require_Reflect_getPrototypeOf();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": $Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": $EvalError,
      "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": $Object,
      "%Object.getOwnPropertyDescriptor%": $gOPD,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": $ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": $URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
      "%Function.prototype.call%": $call,
      "%Function.prototype.apply%": $apply,
      "%Object.defineProperty%": $defineProperty,
      "%Object.getPrototypeOf%": $ObjectGPO,
      "%Math.abs%": abs,
      "%Math.floor%": floor,
      "%Math.max%": max,
      "%Math.min%": min,
      "%Math.pow%": pow,
      "%Math.round%": round,
      "%Math.sign%": sign,
      "%Reflect.getPrototypeOf%": $ReflectGPO
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind.call($call, Array.prototype.concat);
    var $spliceApply = bind.call($apply, Array.prototype.splice);
    var $replace = bind.call($call, String.prototype.replace);
    var $strSlice = bind.call($call, String.prototype.slice);
    var $exec = bind.call($call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void undefined2;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/call-bound/index.js
var require_call_bound = __commonJS({
  "node_modules/call-bound/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBindBasic = require_call_bind_apply_helpers();
    var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
    module.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = (
        /** @type {(this: unknown, ...args: unknown[]) => unknown} */
        GetIntrinsic(name, !!allowMissing)
      );
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBindBasic(
          /** @type {const} */
          [intrinsic]
        );
      }
      return intrinsic;
    };
  }
});

// node_modules/is-callable/index.js
var require_is_callable = __commonJS({
  "node_modules/is-callable/index.js"(exports, module) {
    "use strict";
    var fnToStr = Function.prototype.toString;
    var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
    var badArrayLike;
    var isCallableMarker;
    if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
      try {
        badArrayLike = Object.defineProperty({}, "length", {
          get: function() {
            throw isCallableMarker;
          }
        });
        isCallableMarker = {};
        reflectApply(function() {
          throw 42;
        }, null, badArrayLike);
      } catch (_) {
        if (_ !== isCallableMarker) {
          reflectApply = null;
        }
      }
    } else {
      reflectApply = null;
    }
    var constructorRegex = /^\s*class\b/;
    var isES6ClassFn = function isES6ClassFunction(value) {
      try {
        var fnStr = fnToStr.call(value);
        return constructorRegex.test(fnStr);
      } catch (e) {
        return false;
      }
    };
    var tryFunctionObject = function tryFunctionToStr(value) {
      try {
        if (isES6ClassFn(value)) {
          return false;
        }
        fnToStr.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var objectClass = "[object Object]";
    var fnClass = "[object Function]";
    var genClass = "[object GeneratorFunction]";
    var ddaClass = "[object HTMLAllCollection]";
    var ddaClass2 = "[object HTML document.all class]";
    var ddaClass3 = "[object HTMLCollection]";
    var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
    var isIE68 = !(0 in [,]);
    var isDDA = function isDocumentDotAll() {
      return false;
    };
    if (typeof document === "object") {
      all = document.all;
      if (toStr.call(all) === toStr.call(document.all)) {
        isDDA = function isDocumentDotAll(value) {
          if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
            try {
              var str = toStr.call(value);
              return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
            } catch (e) {
            }
          }
          return false;
        };
      }
    }
    var all;
    module.exports = reflectApply ? function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      try {
        reflectApply(value, null, badArrayLike);
      } catch (e) {
        if (e !== isCallableMarker) {
          return false;
        }
      }
      return !isES6ClassFn(value) && tryFunctionObject(value);
    } : function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      if (hasToStringTag) {
        return tryFunctionObject(value);
      }
      if (isES6ClassFn(value)) {
        return false;
      }
      var strClass = toStr.call(value);
      if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
        return false;
      }
      return tryFunctionObject(value);
    };
  }
});

// node_modules/for-each/index.js
var require_for_each = __commonJS({
  "node_modules/for-each/index.js"(exports, module) {
    "use strict";
    var isCallable = require_is_callable();
    var toStr = Object.prototype.toString;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var forEachArray = function forEachArray2(array, iterator, receiver) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
          if (receiver == null) {
            iterator(array[i], i, array);
          } else {
            iterator.call(receiver, array[i], i, array);
          }
        }
      }
    };
    var forEachString = function forEachString2(string, iterator, receiver) {
      for (var i = 0, len = string.length; i < len; i++) {
        if (receiver == null) {
          iterator(string.charAt(i), i, string);
        } else {
          iterator.call(receiver, string.charAt(i), i, string);
        }
      }
    };
    var forEachObject = function forEachObject2(object, iterator, receiver) {
      for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
          if (receiver == null) {
            iterator(object[k], k, object);
          } else {
            iterator.call(receiver, object[k], k, object);
          }
        }
      }
    };
    function isArray2(x) {
      return toStr.call(x) === "[object Array]";
    }
    module.exports = function forEach(list, iterator, thisArg) {
      if (!isCallable(iterator)) {
        throw new TypeError("iterator must be a function");
      }
      var receiver;
      if (arguments.length >= 3) {
        receiver = thisArg;
      }
      if (isArray2(list)) {
        forEachArray(list, iterator, receiver);
      } else if (typeof list === "string") {
        forEachString(list, iterator, receiver);
      } else {
        forEachObject(list, iterator, receiver);
      }
    };
  }
});

// node_modules/possible-typed-array-names/index.js
var require_possible_typed_array_names = __commonJS({
  "node_modules/possible-typed-array-names/index.js"(exports, module) {
    "use strict";
    module.exports = [
      "Float16Array",
      "Float32Array",
      "Float64Array",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "BigInt64Array",
      "BigUint64Array"
    ];
  }
});

// node_modules/available-typed-arrays/index.js
var require_available_typed_arrays = __commonJS({
  "node_modules/available-typed-arrays/index.js"(exports, module) {
    "use strict";
    var possibleNames = require_possible_typed_array_names();
    var g = typeof globalThis === "undefined" ? window : globalThis;
    module.exports = function availableTypedArrays() {
      var out = [];
      for (var i = 0; i < possibleNames.length; i++) {
        if (typeof g[possibleNames[i]] === "function") {
          out[out.length] = possibleNames[i];
        }
      }
      return out;
    };
  }
});

// node_modules/define-data-property/index.js
var require_define_data_property = __commonJS({
  "node_modules/define-data-property/index.js"(exports, module) {
    "use strict";
    var $defineProperty = require_es_define_property();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var gopd = require_gopd();
    module.exports = function defineDataProperty(obj, property, value) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new $TypeError("`obj` must be an object or a function`");
      }
      if (typeof property !== "string" && typeof property !== "symbol") {
        throw new $TypeError("`property` must be a string or a symbol`");
      }
      if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
        throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
        throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
        throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
        throw new $TypeError("`loose`, if provided, must be a boolean");
      }
      var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
      var nonWritable = arguments.length > 4 ? arguments[4] : null;
      var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
      var loose = arguments.length > 6 ? arguments[6] : false;
      var desc = !!gopd && gopd(obj, property);
      if ($defineProperty) {
        $defineProperty(obj, property, {
          configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
          enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
          value,
          writable: nonWritable === null && desc ? desc.writable : !nonWritable
        });
      } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
        obj[property] = value;
      } else {
        throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
      }
    };
  }
});

// node_modules/has-property-descriptors/index.js
var require_has_property_descriptors = __commonJS({
  "node_modules/has-property-descriptors/index.js"(exports, module) {
    "use strict";
    var $defineProperty = require_es_define_property();
    var hasPropertyDescriptors = function hasPropertyDescriptors2() {
      return !!$defineProperty;
    };
    hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
      if (!$defineProperty) {
        return null;
      }
      try {
        return $defineProperty([], "length", { value: 1 }).length !== 1;
      } catch (e) {
        return true;
      }
    };
    module.exports = hasPropertyDescriptors;
  }
});

// node_modules/set-function-length/index.js
var require_set_function_length = __commonJS({
  "node_modules/set-function-length/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var define2 = require_define_data_property();
    var hasDescriptors = require_has_property_descriptors()();
    var gOPD = require_gopd();
    var $TypeError = require_type();
    var $floor = GetIntrinsic("%Math.floor%");
    module.exports = function setFunctionLength(fn, length) {
      if (typeof fn !== "function") {
        throw new $TypeError("`fn` is not a function");
      }
      if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
        throw new $TypeError("`length` must be a positive 32-bit integer");
      }
      var loose = arguments.length > 2 && !!arguments[2];
      var functionLengthIsConfigurable = true;
      var functionLengthIsWritable = true;
      if ("length" in fn && gOPD) {
        var desc = gOPD(fn, "length");
        if (desc && !desc.configurable) {
          functionLengthIsConfigurable = false;
        }
        if (desc && !desc.writable) {
          functionLengthIsWritable = false;
        }
      }
      if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
        if (hasDescriptors) {
          define2(
            /** @type {Parameters<define>[0]} */
            fn,
            "length",
            length,
            true,
            true
          );
        } else {
          define2(
            /** @type {Parameters<define>[0]} */
            fn,
            "length",
            length
          );
        }
      }
      return fn;
    };
  }
});

// node_modules/call-bind-apply-helpers/applyBind.js
var require_applyBind = __commonJS({
  "node_modules/call-bind-apply-helpers/applyBind.js"(exports, module) {
    "use strict";
    var bind = require_function_bind();
    var $apply = require_functionApply();
    var actualApply = require_actualApply();
    module.exports = function applyBind() {
      return actualApply(bind, $apply, arguments);
    };
  }
});

// node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/call-bind/index.js"(exports, module) {
    "use strict";
    var setFunctionLength = require_set_function_length();
    var $defineProperty = require_es_define_property();
    var callBindBasic = require_call_bind_apply_helpers();
    var applyBind = require_applyBind();
    module.exports = function callBind(originalFunction) {
      var func = callBindBasic(arguments);
      var adjustedLength = 1 + originalFunction.length - (arguments.length - 1);
      return setFunctionLength(
        func,
        adjustedLength > 0 ? adjustedLength : 0,
        true
      );
    };
    if ($defineProperty) {
      $defineProperty(module.exports, "apply", { value: applyBind });
    } else {
      module.exports.apply = applyBind;
    }
  }
});

// node_modules/has-tostringtag/shams.js
var require_shams2 = __commonJS({
  "node_modules/has-tostringtag/shams.js"(exports, module) {
    "use strict";
    var hasSymbols = require_shams();
    module.exports = function hasToStringTagShams() {
      return hasSymbols() && !!Symbol.toStringTag;
    };
  }
});

// node_modules/which-typed-array/index.js
var require_which_typed_array = __commonJS({
  "node_modules/which-typed-array/index.js"(exports, module) {
    "use strict";
    var forEach = require_for_each();
    var availableTypedArrays = require_available_typed_arrays();
    var callBind = require_call_bind();
    var callBound = require_call_bound();
    var gOPD = require_gopd();
    var getProto = require_get_proto();
    var $toString = callBound("Object.prototype.toString");
    var hasToStringTag = require_shams2()();
    var g = typeof globalThis === "undefined" ? window : globalThis;
    var typedArrays = availableTypedArrays();
    var $slice = callBound("String.prototype.slice");
    var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    };
    var cache = { __proto__: null };
    if (hasToStringTag && gOPD && getProto) {
      forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        if (Symbol.toStringTag in arr && getProto) {
          var proto = getProto(arr);
          var descriptor = gOPD(proto, Symbol.toStringTag);
          if (!descriptor && proto) {
            var superProto = getProto(proto);
            descriptor = gOPD(superProto, Symbol.toStringTag);
          }
          if (descriptor && descriptor.get) {
            var bound = callBind(descriptor.get);
            cache[
              /** @type {`$${TypedArrayName}`} */
              "$" + typedArray
            ] = bound;
          }
        }
      });
    } else {
      forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        var fn = arr.slice || arr.set;
        if (fn) {
          var bound = (
            /** @type {BoundSlice | BoundSet} */
            // @ts-expect-error TODO FIXME
            callBind(fn)
          );
          cache[
            /** @type {`$${TypedArrayName}`} */
            "$" + typedArray
          ] = bound;
        }
      });
    }
    function tryTypedArrays(value) {
      var found = false;
      forEach(
        /** @type {Record<`$${TypedArrayName}`, Getter>} */
        cache,
        /** @param {Getter} getter @param {`$${TypedArrayName}`} typedArray */
        function(getter, typedArray) {
          if (!found) {
            try {
              if ("$" + getter(value) === typedArray) {
                found = /** @type {TypedArrayName} */
                $slice(typedArray, 1);
              }
            } catch (e) {
            }
          }
        }
      );
      return found;
    }
    function trySlices(value) {
      var found = false;
      forEach(
        /** @type {Record<`$${TypedArrayName}`, Getter>} */
        cache,
        /** @param {Getter} getter @param {`$${TypedArrayName}`} name */
        function(getter, name) {
          if (!found) {
            try {
              getter(value);
              found = /** @type {TypedArrayName} */
              $slice(name, 1);
            } catch (e) {
            }
          }
        }
      );
      return found;
    }
    function isTATag(tag2) {
      return $indexOf(typedArrays, tag2) > -1;
    }
    module.exports = function whichTypedArray(value) {
      if (!value || typeof value !== "object") {
        return false;
      }
      if (!hasToStringTag) {
        var tag2 = $slice($toString(value), 8, -1);
        if (isTATag(tag2)) {
          return tag2;
        }
        if (tag2 !== "Object") {
          return false;
        }
        return trySlices(value);
      }
      if (!gOPD) {
        return null;
      }
      return tryTypedArrays(value);
    };
  }
});

// node_modules/is-typed-array/index.js
var require_is_typed_array = __commonJS({
  "node_modules/is-typed-array/index.js"(exports, module) {
    "use strict";
    var whichTypedArray = require_which_typed_array();
    module.exports = function isTypedArray(value) {
      return !!whichTypedArray(value);
    };
  }
});

// node_modules/typed-array-buffer/index.js
var require_typed_array_buffer = __commonJS({
  "node_modules/typed-array-buffer/index.js"(exports, module) {
    "use strict";
    var $TypeError = require_type();
    var callBound = require_call_bound();
    var $typedArrayBuffer = callBound("TypedArray.prototype.buffer", true);
    var isTypedArray = require_is_typed_array();
    module.exports = $typedArrayBuffer || function typedArrayBuffer(x) {
      if (!isTypedArray(x)) {
        throw new $TypeError("Not a Typed Array");
      }
      return x.buffer;
    };
  }
});

// node_modules/to-buffer/index.js
var require_to_buffer = __commonJS({
  "node_modules/to-buffer/index.js"(exports, module) {
    "use strict";
    var Buffer3 = require_safe_buffer().Buffer;
    var isArray2 = require_isarray();
    var typedArrayBuffer = require_typed_array_buffer();
    var isView = ArrayBuffer.isView || function isView2(obj) {
      try {
        typedArrayBuffer(obj);
        return true;
      } catch (e) {
        return false;
      }
    };
    var useUint8Array = typeof Uint8Array !== "undefined";
    var useArrayBuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
    var useFromArrayBuffer = useArrayBuffer && (Buffer3.prototype instanceof Uint8Array || Buffer3.TYPED_ARRAY_SUPPORT);
    module.exports = function toBuffer(data, encoding) {
      if (Buffer3.isBuffer(data)) {
        if (data.constructor && !("isBuffer" in data)) {
          return Buffer3.from(data);
        }
        return data;
      }
      if (typeof data === "string") {
        return Buffer3.from(data, encoding);
      }
      if (useArrayBuffer && isView(data)) {
        if (data.byteLength === 0) {
          return Buffer3.alloc(0);
        }
        if (useFromArrayBuffer) {
          var res = Buffer3.from(data.buffer, data.byteOffset, data.byteLength);
          if (res.byteLength === data.byteLength) {
            return res;
          }
        }
        var uint8 = data instanceof Uint8Array ? data : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        var result = Buffer3.from(uint8);
        if (result.length === data.byteLength) {
          return result;
        }
      }
      if (useUint8Array && data instanceof Uint8Array) {
        return Buffer3.from(data);
      }
      var isArr = isArray2(data);
      if (isArr) {
        for (var i = 0; i < data.length; i += 1) {
          var x = data[i];
          if (typeof x !== "number" || x < 0 || x > 255 || ~~x !== x) {
            throw new RangeError("Array items must be numbers in the range 0-255.");
          }
        }
      }
      if (isArr || Buffer3.isBuffer(data) && data.constructor && typeof data.constructor.isBuffer === "function" && data.constructor.isBuffer(data)) {
        return Buffer3.from(data);
      }
      throw new TypeError('The "data" argument must be a string, an Array, a Buffer, a Uint8Array, or a DataView.');
    };
  }
});

// node_modules/sha.js/hash.js
var require_hash = __commonJS({
  "node_modules/sha.js/hash.js"(exports, module) {
    "use strict";
    var Buffer3 = require_safe_buffer().Buffer;
    var toBuffer = require_to_buffer();
    function Hash2(blockSize, finalSize) {
      this._block = Buffer3.alloc(blockSize);
      this._finalSize = finalSize;
      this._blockSize = blockSize;
      this._len = 0;
    }
    Hash2.prototype.update = function(data, enc) {
      data = toBuffer(data, enc || "utf8");
      var block = this._block;
      var blockSize = this._blockSize;
      var length = data.length;
      var accum = this._len;
      for (var offset = 0; offset < length; ) {
        var assigned = accum % blockSize;
        var remainder = Math.min(length - offset, blockSize - assigned);
        for (var i = 0; i < remainder; i++) {
          block[assigned + i] = data[offset + i];
        }
        accum += remainder;
        offset += remainder;
        if (accum % blockSize === 0) {
          this._update(block);
        }
      }
      this._len += length;
      return this;
    };
    Hash2.prototype.digest = function(enc) {
      var rem = this._len % this._blockSize;
      this._block[rem] = 128;
      this._block.fill(0, rem + 1);
      if (rem >= this._finalSize) {
        this._update(this._block);
        this._block.fill(0);
      }
      var bits = this._len * 8;
      if (bits <= 4294967295) {
        this._block.writeUInt32BE(bits, this._blockSize - 4);
      } else {
        var lowBits = (bits & 4294967295) >>> 0;
        var highBits = (bits - lowBits) / 4294967296;
        this._block.writeUInt32BE(highBits, this._blockSize - 8);
        this._block.writeUInt32BE(lowBits, this._blockSize - 4);
      }
      this._update(this._block);
      var hash = this._hash();
      return enc ? hash.toString(enc) : hash;
    };
    Hash2.prototype._update = function() {
      throw new Error("_update must be implemented by subclass");
    };
    module.exports = Hash2;
  }
});

// node_modules/sha.js/sha1.js
var require_sha1 = __commonJS({
  "node_modules/sha.js/sha1.js"(exports, module) {
    "use strict";
    var inherits = require_inherits_browser();
    var Hash2 = require_hash();
    var Buffer3 = require_safe_buffer().Buffer;
    var K = [
      1518500249,
      1859775393,
      2400959708 | 0,
      3395469782 | 0
    ];
    var W = new Array(80);
    function Sha1() {
      this.init();
      this._w = W;
      Hash2.call(this, 64, 56);
    }
    inherits(Sha1, Hash2);
    Sha1.prototype.init = function() {
      this._a = 1732584193;
      this._b = 4023233417;
      this._c = 2562383102;
      this._d = 271733878;
      this._e = 3285377520;
      return this;
    };
    function rotl1(num2) {
      return num2 << 1 | num2 >>> 31;
    }
    function rotl5(num2) {
      return num2 << 5 | num2 >>> 27;
    }
    function rotl30(num2) {
      return num2 << 30 | num2 >>> 2;
    }
    function ft(s, b, c, d) {
      if (s === 0) {
        return b & c | ~b & d;
      }
      if (s === 2) {
        return b & c | b & d | c & d;
      }
      return b ^ c ^ d;
    }
    Sha1.prototype._update = function(M) {
      var w = this._w;
      var a = this._a | 0;
      var b = this._b | 0;
      var c = this._c | 0;
      var d = this._d | 0;
      var e = this._e | 0;
      for (var i = 0; i < 16; ++i) {
        w[i] = M.readInt32BE(i * 4);
      }
      for (; i < 80; ++i) {
        w[i] = rotl1(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]);
      }
      for (var j = 0; j < 80; ++j) {
        var s = ~~(j / 20);
        var t = rotl5(a) + ft(s, b, c, d) + e + w[j] + K[s] | 0;
        e = d;
        d = c;
        c = rotl30(b);
        b = a;
        a = t;
      }
      this._a = a + this._a | 0;
      this._b = b + this._b | 0;
      this._c = c + this._c | 0;
      this._d = d + this._d | 0;
      this._e = e + this._e | 0;
    };
    Sha1.prototype._hash = function() {
      var H = Buffer3.allocUnsafe(20);
      H.writeInt32BE(this._a | 0, 0);
      H.writeInt32BE(this._b | 0, 4);
      H.writeInt32BE(this._c | 0, 8);
      H.writeInt32BE(this._d | 0, 12);
      H.writeInt32BE(this._e | 0, 16);
      return H;
    };
    module.exports = Sha1;
  }
});

// node_modules/async-lock/lib/index.js
var require_lib = __commonJS({
  "node_modules/async-lock/lib/index.js"(exports, module) {
    "use strict";
    var AsyncLock2 = function(opts) {
      opts = opts || {};
      this.Promise = opts.Promise || Promise;
      this.queues = /* @__PURE__ */ Object.create(null);
      this.domainReentrant = opts.domainReentrant || false;
      if (this.domainReentrant) {
        if (typeof process === "undefined" || typeof process.domain === "undefined") {
          throw new Error(
            "Domain-reentrant locks require `process.domain` to exist. Please flip `opts.domainReentrant = false`, use a NodeJS version that still implements Domain, or install a browser polyfill."
          );
        }
        this.domains = /* @__PURE__ */ Object.create(null);
      }
      this.timeout = opts.timeout || AsyncLock2.DEFAULT_TIMEOUT;
      this.maxOccupationTime = opts.maxOccupationTime || AsyncLock2.DEFAULT_MAX_OCCUPATION_TIME;
      this.maxExecutionTime = opts.maxExecutionTime || AsyncLock2.DEFAULT_MAX_EXECUTION_TIME;
      if (opts.maxPending === Infinity || Number.isInteger(opts.maxPending) && opts.maxPending >= 0) {
        this.maxPending = opts.maxPending;
      } else {
        this.maxPending = AsyncLock2.DEFAULT_MAX_PENDING;
      }
    };
    AsyncLock2.DEFAULT_TIMEOUT = 0;
    AsyncLock2.DEFAULT_MAX_OCCUPATION_TIME = 0;
    AsyncLock2.DEFAULT_MAX_EXECUTION_TIME = 0;
    AsyncLock2.DEFAULT_MAX_PENDING = 1e3;
    AsyncLock2.prototype.acquire = function(key, fn, cb, opts) {
      if (Array.isArray(key)) {
        return this._acquireBatch(key, fn, cb, opts);
      }
      if (typeof fn !== "function") {
        throw new Error("You must pass a function to execute");
      }
      var deferredResolve = null;
      var deferredReject = null;
      var deferred = null;
      if (typeof cb !== "function") {
        opts = cb;
        cb = null;
        deferred = new this.Promise(function(resolve, reject) {
          deferredResolve = resolve;
          deferredReject = reject;
        });
      }
      opts = opts || {};
      var resolved = false;
      var timer = null;
      var occupationTimer = null;
      var executionTimer = null;
      var self = this;
      var done = function(locked, err, ret) {
        if (occupationTimer) {
          clearTimeout(occupationTimer);
          occupationTimer = null;
        }
        if (executionTimer) {
          clearTimeout(executionTimer);
          executionTimer = null;
        }
        if (locked) {
          if (!!self.queues[key] && self.queues[key].length === 0) {
            delete self.queues[key];
          }
          if (self.domainReentrant) {
            delete self.domains[key];
          }
        }
        if (!resolved) {
          if (!deferred) {
            if (typeof cb === "function") {
              cb(err, ret);
            }
          } else {
            if (err) {
              deferredReject(err);
            } else {
              deferredResolve(ret);
            }
          }
          resolved = true;
        }
        if (locked) {
          if (!!self.queues[key] && self.queues[key].length > 0) {
            self.queues[key].shift()();
          }
        }
      };
      var exec = function(locked) {
        if (resolved) {
          return done(locked);
        }
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        if (self.domainReentrant && locked) {
          self.domains[key] = process.domain;
        }
        var maxExecutionTime = opts.maxExecutionTime || self.maxExecutionTime;
        if (maxExecutionTime) {
          executionTimer = setTimeout(function() {
            if (!!self.queues[key]) {
              done(locked, new Error("Maximum execution time is exceeded " + key));
            }
          }, maxExecutionTime);
        }
        if (fn.length === 1) {
          var called = false;
          try {
            fn(function(err, ret) {
              if (!called) {
                called = true;
                done(locked, err, ret);
              }
            });
          } catch (err) {
            if (!called) {
              called = true;
              done(locked, err);
            }
          }
        } else {
          self._promiseTry(function() {
            return fn();
          }).then(function(ret) {
            done(locked, void 0, ret);
          }, function(error) {
            done(locked, error);
          });
        }
      };
      if (self.domainReentrant && !!process.domain) {
        exec = process.domain.bind(exec);
      }
      var maxPending = opts.maxPending || self.maxPending;
      if (!self.queues[key]) {
        self.queues[key] = [];
        exec(true);
      } else if (self.domainReentrant && !!process.domain && process.domain === self.domains[key]) {
        exec(false);
      } else if (self.queues[key].length >= maxPending) {
        done(false, new Error("Too many pending tasks in queue " + key));
      } else {
        var taskFn = function() {
          exec(true);
        };
        if (opts.skipQueue) {
          self.queues[key].unshift(taskFn);
        } else {
          self.queues[key].push(taskFn);
        }
        var timeout = opts.timeout || self.timeout;
        if (timeout) {
          timer = setTimeout(function() {
            timer = null;
            done(false, new Error("async-lock timed out in queue " + key));
          }, timeout);
        }
      }
      var maxOccupationTime = opts.maxOccupationTime || self.maxOccupationTime;
      if (maxOccupationTime) {
        occupationTimer = setTimeout(function() {
          if (!!self.queues[key]) {
            done(false, new Error("Maximum occupation time is exceeded in queue " + key));
          }
        }, maxOccupationTime);
      }
      if (deferred) {
        return deferred;
      }
    };
    AsyncLock2.prototype._acquireBatch = function(keys, fn, cb, opts) {
      if (typeof cb !== "function") {
        opts = cb;
        cb = null;
      }
      var self = this;
      var getFn = function(key, fn2) {
        return function(cb2) {
          self.acquire(key, fn2, cb2, opts);
        };
      };
      var fnx = keys.reduceRight(function(prev, key) {
        return getFn(key, prev);
      }, fn);
      if (typeof cb === "function") {
        fnx(cb);
      } else {
        return new this.Promise(function(resolve, reject) {
          if (fnx.length === 1) {
            fnx(function(err, ret) {
              if (err) {
                reject(err);
              } else {
                resolve(ret);
              }
            });
          } else {
            resolve(fnx());
          }
        });
      }
    };
    AsyncLock2.prototype.isBusy = function(key) {
      if (!key) {
        return Object.keys(this.queues).length > 0;
      } else {
        return !!this.queues[key];
      }
    };
    AsyncLock2.prototype._promiseTry = function(fn) {
      try {
        return this.Promise.resolve(fn());
      } catch (e) {
        return this.Promise.reject(e);
      }
    };
    module.exports = AsyncLock2;
  }
});

// node_modules/async-lock/index.js
var require_async_lock = __commonJS({
  "node_modules/async-lock/index.js"(exports, module) {
    "use strict";
    module.exports = require_lib();
  }
});

// node_modules/crc-32/crc32.js
var require_crc32 = __commonJS({
  "node_modules/crc-32/crc32.js"(exports) {
    var CRC32;
    (function(factory) {
      if (typeof DO_NOT_EXPORT_CRC === "undefined") {
        if ("object" === typeof exports) {
          factory(exports);
        } else if ("function" === typeof define && define.amd) {
          define(function() {
            var module2 = {};
            factory(module2);
            return module2;
          });
        } else {
          factory(CRC32 = {});
        }
      } else {
        factory(CRC32 = {});
      }
    })(function(CRC322) {
      CRC322.version = "1.2.2";
      function signed_crc_table() {
        var c = 0, table = new Array(256);
        for (var n = 0; n != 256; ++n) {
          c = n;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          table[n] = c;
        }
        return typeof Int32Array !== "undefined" ? new Int32Array(table) : table;
      }
      var T0 = signed_crc_table();
      function slice_by_16_tables(T) {
        var c = 0, v = 0, n = 0, table = typeof Int32Array !== "undefined" ? new Int32Array(4096) : new Array(4096);
        for (n = 0; n != 256; ++n) table[n] = T[n];
        for (n = 0; n != 256; ++n) {
          v = T[n];
          for (c = 256 + n; c < 4096; c += 256) v = table[c] = v >>> 8 ^ T[v & 255];
        }
        var out = [];
        for (n = 1; n != 16; ++n) out[n - 1] = typeof Int32Array !== "undefined" ? table.subarray(n * 256, n * 256 + 256) : table.slice(n * 256, n * 256 + 256);
        return out;
      }
      var TT = slice_by_16_tables(T0);
      var T1 = TT[0], T2 = TT[1], T3 = TT[2], T4 = TT[3], T5 = TT[4];
      var T6 = TT[5], T7 = TT[6], T8 = TT[7], T9 = TT[8], Ta = TT[9];
      var Tb = TT[10], Tc = TT[11], Td = TT[12], Te = TT[13], Tf = TT[14];
      function crc32_bstr(bstr, seed) {
        var C = seed ^ -1;
        for (var i = 0, L = bstr.length; i < L; ) C = C >>> 8 ^ T0[(C ^ bstr.charCodeAt(i++)) & 255];
        return ~C;
      }
      function crc32_buf(B, seed) {
        var C = seed ^ -1, L = B.length - 15, i = 0;
        for (; i < L; ) C = Tf[B[i++] ^ C & 255] ^ Te[B[i++] ^ C >> 8 & 255] ^ Td[B[i++] ^ C >> 16 & 255] ^ Tc[B[i++] ^ C >>> 24] ^ Tb[B[i++]] ^ Ta[B[i++]] ^ T9[B[i++]] ^ T8[B[i++]] ^ T7[B[i++]] ^ T6[B[i++]] ^ T5[B[i++]] ^ T4[B[i++]] ^ T3[B[i++]] ^ T2[B[i++]] ^ T1[B[i++]] ^ T0[B[i++]];
        L += 15;
        while (i < L) C = C >>> 8 ^ T0[(C ^ B[i++]) & 255];
        return ~C;
      }
      function crc32_str(str, seed) {
        var C = seed ^ -1;
        for (var i = 0, L = str.length, c = 0, d = 0; i < L; ) {
          c = str.charCodeAt(i++);
          if (c < 128) {
            C = C >>> 8 ^ T0[(C ^ c) & 255];
          } else if (c < 2048) {
            C = C >>> 8 ^ T0[(C ^ (192 | c >> 6 & 31)) & 255];
            C = C >>> 8 ^ T0[(C ^ (128 | c & 63)) & 255];
          } else if (c >= 55296 && c < 57344) {
            c = (c & 1023) + 64;
            d = str.charCodeAt(i++) & 1023;
            C = C >>> 8 ^ T0[(C ^ (240 | c >> 8 & 7)) & 255];
            C = C >>> 8 ^ T0[(C ^ (128 | c >> 2 & 63)) & 255];
            C = C >>> 8 ^ T0[(C ^ (128 | d >> 6 & 15 | (c & 3) << 4)) & 255];
            C = C >>> 8 ^ T0[(C ^ (128 | d & 63)) & 255];
          } else {
            C = C >>> 8 ^ T0[(C ^ (224 | c >> 12 & 15)) & 255];
            C = C >>> 8 ^ T0[(C ^ (128 | c >> 6 & 63)) & 255];
            C = C >>> 8 ^ T0[(C ^ (128 | c & 63)) & 255];
          }
        }
        return ~C;
      }
      CRC322.table = T0;
      CRC322.bstr = crc32_bstr;
      CRC322.buf = crc32_buf;
      CRC322.str = crc32_str;
    });
  }
});

// node_modules/pako/lib/utils/common.js
var require_common = __commonJS({
  "node_modules/pako/lib/utils/common.js"(exports) {
    "use strict";
    var TYPED_OK = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
    function _has(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
    exports.assign = function(obj) {
      var sources = Array.prototype.slice.call(arguments, 1);
      while (sources.length) {
        var source = sources.shift();
        if (!source) {
          continue;
        }
        if (typeof source !== "object") {
          throw new TypeError(source + "must be non-object");
        }
        for (var p in source) {
          if (_has(source, p)) {
            obj[p] = source[p];
          }
        }
      }
      return obj;
    };
    exports.shrinkBuf = function(buf, size) {
      if (buf.length === size) {
        return buf;
      }
      if (buf.subarray) {
        return buf.subarray(0, size);
      }
      buf.length = size;
      return buf;
    };
    var fnTyped = {
      arraySet: function(dest, src, src_offs, len, dest_offs) {
        if (src.subarray && dest.subarray) {
          dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
          return;
        }
        for (var i = 0; i < len; i++) {
          dest[dest_offs + i] = src[src_offs + i];
        }
      },
      // Join array of chunks to single array.
      flattenChunks: function(chunks) {
        var i, l, len, pos, chunk, result;
        len = 0;
        for (i = 0, l = chunks.length; i < l; i++) {
          len += chunks[i].length;
        }
        result = new Uint8Array(len);
        pos = 0;
        for (i = 0, l = chunks.length; i < l; i++) {
          chunk = chunks[i];
          result.set(chunk, pos);
          pos += chunk.length;
        }
        return result;
      }
    };
    var fnUntyped = {
      arraySet: function(dest, src, src_offs, len, dest_offs) {
        for (var i = 0; i < len; i++) {
          dest[dest_offs + i] = src[src_offs + i];
        }
      },
      // Join array of chunks to single array.
      flattenChunks: function(chunks) {
        return [].concat.apply([], chunks);
      }
    };
    exports.setTyped = function(on) {
      if (on) {
        exports.Buf8 = Uint8Array;
        exports.Buf16 = Uint16Array;
        exports.Buf32 = Int32Array;
        exports.assign(exports, fnTyped);
      } else {
        exports.Buf8 = Array;
        exports.Buf16 = Array;
        exports.Buf32 = Array;
        exports.assign(exports, fnUntyped);
      }
    };
    exports.setTyped(TYPED_OK);
  }
});

// node_modules/pako/lib/zlib/trees.js
var require_trees = __commonJS({
  "node_modules/pako/lib/zlib/trees.js"(exports) {
    "use strict";
    var utils = require_common();
    var Z_FIXED = 4;
    var Z_BINARY = 0;
    var Z_TEXT = 1;
    var Z_UNKNOWN = 2;
    function zero(buf) {
      var len = buf.length;
      while (--len >= 0) {
        buf[len] = 0;
      }
    }
    var STORED_BLOCK = 0;
    var STATIC_TREES = 1;
    var DYN_TREES = 2;
    var MIN_MATCH = 3;
    var MAX_MATCH = 258;
    var LENGTH_CODES = 29;
    var LITERALS = 256;
    var L_CODES = LITERALS + 1 + LENGTH_CODES;
    var D_CODES = 30;
    var BL_CODES = 19;
    var HEAP_SIZE = 2 * L_CODES + 1;
    var MAX_BITS = 15;
    var Buf_size = 16;
    var MAX_BL_BITS = 7;
    var END_BLOCK = 256;
    var REP_3_6 = 16;
    var REPZ_3_10 = 17;
    var REPZ_11_138 = 18;
    var extra_lbits = (
      /* extra bits for each length code */
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
    );
    var extra_dbits = (
      /* extra bits for each distance code */
      [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
    );
    var extra_blbits = (
      /* extra bits for each bit length code */
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
    );
    var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    var DIST_CODE_LEN = 512;
    var static_ltree = new Array((L_CODES + 2) * 2);
    zero(static_ltree);
    var static_dtree = new Array(D_CODES * 2);
    zero(static_dtree);
    var _dist_code = new Array(DIST_CODE_LEN);
    zero(_dist_code);
    var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
    zero(_length_code);
    var base_length = new Array(LENGTH_CODES);
    zero(base_length);
    var base_dist = new Array(D_CODES);
    zero(base_dist);
    function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
      this.static_tree = static_tree;
      this.extra_bits = extra_bits;
      this.extra_base = extra_base;
      this.elems = elems;
      this.max_length = max_length;
      this.has_stree = static_tree && static_tree.length;
    }
    var static_l_desc;
    var static_d_desc;
    var static_bl_desc;
    function TreeDesc(dyn_tree, stat_desc) {
      this.dyn_tree = dyn_tree;
      this.max_code = 0;
      this.stat_desc = stat_desc;
    }
    function d_code(dist) {
      return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
    }
    function put_short(s, w) {
      s.pending_buf[s.pending++] = w & 255;
      s.pending_buf[s.pending++] = w >>> 8 & 255;
    }
    function send_bits(s, value, length) {
      if (s.bi_valid > Buf_size - length) {
        s.bi_buf |= value << s.bi_valid & 65535;
        put_short(s, s.bi_buf);
        s.bi_buf = value >> Buf_size - s.bi_valid;
        s.bi_valid += length - Buf_size;
      } else {
        s.bi_buf |= value << s.bi_valid & 65535;
        s.bi_valid += length;
      }
    }
    function send_code(s, c, tree) {
      send_bits(
        s,
        tree[c * 2],
        tree[c * 2 + 1]
        /*.Len*/
      );
    }
    function bi_reverse(code, len) {
      var res = 0;
      do {
        res |= code & 1;
        code >>>= 1;
        res <<= 1;
      } while (--len > 0);
      return res >>> 1;
    }
    function bi_flush(s) {
      if (s.bi_valid === 16) {
        put_short(s, s.bi_buf);
        s.bi_buf = 0;
        s.bi_valid = 0;
      } else if (s.bi_valid >= 8) {
        s.pending_buf[s.pending++] = s.bi_buf & 255;
        s.bi_buf >>= 8;
        s.bi_valid -= 8;
      }
    }
    function gen_bitlen(s, desc) {
      var tree = desc.dyn_tree;
      var max_code = desc.max_code;
      var stree = desc.stat_desc.static_tree;
      var has_stree = desc.stat_desc.has_stree;
      var extra = desc.stat_desc.extra_bits;
      var base = desc.stat_desc.extra_base;
      var max_length = desc.stat_desc.max_length;
      var h;
      var n, m;
      var bits;
      var xbits;
      var f;
      var overflow = 0;
      for (bits = 0; bits <= MAX_BITS; bits++) {
        s.bl_count[bits] = 0;
      }
      tree[s.heap[s.heap_max] * 2 + 1] = 0;
      for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
        n = s.heap[h];
        bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
        if (bits > max_length) {
          bits = max_length;
          overflow++;
        }
        tree[n * 2 + 1] = bits;
        if (n > max_code) {
          continue;
        }
        s.bl_count[bits]++;
        xbits = 0;
        if (n >= base) {
          xbits = extra[n - base];
        }
        f = tree[n * 2];
        s.opt_len += f * (bits + xbits);
        if (has_stree) {
          s.static_len += f * (stree[n * 2 + 1] + xbits);
        }
      }
      if (overflow === 0) {
        return;
      }
      do {
        bits = max_length - 1;
        while (s.bl_count[bits] === 0) {
          bits--;
        }
        s.bl_count[bits]--;
        s.bl_count[bits + 1] += 2;
        s.bl_count[max_length]--;
        overflow -= 2;
      } while (overflow > 0);
      for (bits = max_length; bits !== 0; bits--) {
        n = s.bl_count[bits];
        while (n !== 0) {
          m = s.heap[--h];
          if (m > max_code) {
            continue;
          }
          if (tree[m * 2 + 1] !== bits) {
            s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
            tree[m * 2 + 1] = bits;
          }
          n--;
        }
      }
    }
    function gen_codes(tree, max_code, bl_count) {
      var next_code = new Array(MAX_BITS + 1);
      var code = 0;
      var bits;
      var n;
      for (bits = 1; bits <= MAX_BITS; bits++) {
        next_code[bits] = code = code + bl_count[bits - 1] << 1;
      }
      for (n = 0; n <= max_code; n++) {
        var len = tree[n * 2 + 1];
        if (len === 0) {
          continue;
        }
        tree[n * 2] = bi_reverse(next_code[len]++, len);
      }
    }
    function tr_static_init() {
      var n;
      var bits;
      var length;
      var code;
      var dist;
      var bl_count = new Array(MAX_BITS + 1);
      length = 0;
      for (code = 0; code < LENGTH_CODES - 1; code++) {
        base_length[code] = length;
        for (n = 0; n < 1 << extra_lbits[code]; n++) {
          _length_code[length++] = code;
        }
      }
      _length_code[length - 1] = code;
      dist = 0;
      for (code = 0; code < 16; code++) {
        base_dist[code] = dist;
        for (n = 0; n < 1 << extra_dbits[code]; n++) {
          _dist_code[dist++] = code;
        }
      }
      dist >>= 7;
      for (; code < D_CODES; code++) {
        base_dist[code] = dist << 7;
        for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
          _dist_code[256 + dist++] = code;
        }
      }
      for (bits = 0; bits <= MAX_BITS; bits++) {
        bl_count[bits] = 0;
      }
      n = 0;
      while (n <= 143) {
        static_ltree[n * 2 + 1] = 8;
        n++;
        bl_count[8]++;
      }
      while (n <= 255) {
        static_ltree[n * 2 + 1] = 9;
        n++;
        bl_count[9]++;
      }
      while (n <= 279) {
        static_ltree[n * 2 + 1] = 7;
        n++;
        bl_count[7]++;
      }
      while (n <= 287) {
        static_ltree[n * 2 + 1] = 8;
        n++;
        bl_count[8]++;
      }
      gen_codes(static_ltree, L_CODES + 1, bl_count);
      for (n = 0; n < D_CODES; n++) {
        static_dtree[n * 2 + 1] = 5;
        static_dtree[n * 2] = bi_reverse(n, 5);
      }
      static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
      static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
      static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);
    }
    function init_block(s) {
      var n;
      for (n = 0; n < L_CODES; n++) {
        s.dyn_ltree[n * 2] = 0;
      }
      for (n = 0; n < D_CODES; n++) {
        s.dyn_dtree[n * 2] = 0;
      }
      for (n = 0; n < BL_CODES; n++) {
        s.bl_tree[n * 2] = 0;
      }
      s.dyn_ltree[END_BLOCK * 2] = 1;
      s.opt_len = s.static_len = 0;
      s.last_lit = s.matches = 0;
    }
    function bi_windup(s) {
      if (s.bi_valid > 8) {
        put_short(s, s.bi_buf);
      } else if (s.bi_valid > 0) {
        s.pending_buf[s.pending++] = s.bi_buf;
      }
      s.bi_buf = 0;
      s.bi_valid = 0;
    }
    function copy_block(s, buf, len, header) {
      bi_windup(s);
      if (header) {
        put_short(s, len);
        put_short(s, ~len);
      }
      utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
      s.pending += len;
    }
    function smaller(tree, n, m, depth) {
      var _n2 = n * 2;
      var _m2 = m * 2;
      return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
    }
    function pqdownheap(s, tree, k) {
      var v = s.heap[k];
      var j = k << 1;
      while (j <= s.heap_len) {
        if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
          j++;
        }
        if (smaller(tree, v, s.heap[j], s.depth)) {
          break;
        }
        s.heap[k] = s.heap[j];
        k = j;
        j <<= 1;
      }
      s.heap[k] = v;
    }
    function compress_block(s, ltree, dtree) {
      var dist;
      var lc;
      var lx = 0;
      var code;
      var extra;
      if (s.last_lit !== 0) {
        do {
          dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
          lc = s.pending_buf[s.l_buf + lx];
          lx++;
          if (dist === 0) {
            send_code(s, lc, ltree);
          } else {
            code = _length_code[lc];
            send_code(s, code + LITERALS + 1, ltree);
            extra = extra_lbits[code];
            if (extra !== 0) {
              lc -= base_length[code];
              send_bits(s, lc, extra);
            }
            dist--;
            code = d_code(dist);
            send_code(s, code, dtree);
            extra = extra_dbits[code];
            if (extra !== 0) {
              dist -= base_dist[code];
              send_bits(s, dist, extra);
            }
          }
        } while (lx < s.last_lit);
      }
      send_code(s, END_BLOCK, ltree);
    }
    function build_tree(s, desc) {
      var tree = desc.dyn_tree;
      var stree = desc.stat_desc.static_tree;
      var has_stree = desc.stat_desc.has_stree;
      var elems = desc.stat_desc.elems;
      var n, m;
      var max_code = -1;
      var node;
      s.heap_len = 0;
      s.heap_max = HEAP_SIZE;
      for (n = 0; n < elems; n++) {
        if (tree[n * 2] !== 0) {
          s.heap[++s.heap_len] = max_code = n;
          s.depth[n] = 0;
        } else {
          tree[n * 2 + 1] = 0;
        }
      }
      while (s.heap_len < 2) {
        node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
        tree[node * 2] = 1;
        s.depth[node] = 0;
        s.opt_len--;
        if (has_stree) {
          s.static_len -= stree[node * 2 + 1];
        }
      }
      desc.max_code = max_code;
      for (n = s.heap_len >> 1; n >= 1; n--) {
        pqdownheap(s, tree, n);
      }
      node = elems;
      do {
        n = s.heap[
          1
          /*SMALLEST*/
        ];
        s.heap[
          1
          /*SMALLEST*/
        ] = s.heap[s.heap_len--];
        pqdownheap(
          s,
          tree,
          1
          /*SMALLEST*/
        );
        m = s.heap[
          1
          /*SMALLEST*/
        ];
        s.heap[--s.heap_max] = n;
        s.heap[--s.heap_max] = m;
        tree[node * 2] = tree[n * 2] + tree[m * 2];
        s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
        tree[n * 2 + 1] = tree[m * 2 + 1] = node;
        s.heap[
          1
          /*SMALLEST*/
        ] = node++;
        pqdownheap(
          s,
          tree,
          1
          /*SMALLEST*/
        );
      } while (s.heap_len >= 2);
      s.heap[--s.heap_max] = s.heap[
        1
        /*SMALLEST*/
      ];
      gen_bitlen(s, desc);
      gen_codes(tree, max_code, s.bl_count);
    }
    function scan_tree(s, tree, max_code) {
      var n;
      var prevlen = -1;
      var curlen;
      var nextlen = tree[0 * 2 + 1];
      var count = 0;
      var max_count = 7;
      var min_count = 4;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      }
      tree[(max_code + 1) * 2 + 1] = 65535;
      for (n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[(n + 1) * 2 + 1];
        if (++count < max_count && curlen === nextlen) {
          continue;
        } else if (count < min_count) {
          s.bl_tree[curlen * 2] += count;
        } else if (curlen !== 0) {
          if (curlen !== prevlen) {
            s.bl_tree[curlen * 2]++;
          }
          s.bl_tree[REP_3_6 * 2]++;
        } else if (count <= 10) {
          s.bl_tree[REPZ_3_10 * 2]++;
        } else {
          s.bl_tree[REPZ_11_138 * 2]++;
        }
        count = 0;
        prevlen = curlen;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        } else if (curlen === nextlen) {
          max_count = 6;
          min_count = 3;
        } else {
          max_count = 7;
          min_count = 4;
        }
      }
    }
    function send_tree(s, tree, max_code) {
      var n;
      var prevlen = -1;
      var curlen;
      var nextlen = tree[0 * 2 + 1];
      var count = 0;
      var max_count = 7;
      var min_count = 4;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      }
      for (n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[(n + 1) * 2 + 1];
        if (++count < max_count && curlen === nextlen) {
          continue;
        } else if (count < min_count) {
          do {
            send_code(s, curlen, s.bl_tree);
          } while (--count !== 0);
        } else if (curlen !== 0) {
          if (curlen !== prevlen) {
            send_code(s, curlen, s.bl_tree);
            count--;
          }
          send_code(s, REP_3_6, s.bl_tree);
          send_bits(s, count - 3, 2);
        } else if (count <= 10) {
          send_code(s, REPZ_3_10, s.bl_tree);
          send_bits(s, count - 3, 3);
        } else {
          send_code(s, REPZ_11_138, s.bl_tree);
          send_bits(s, count - 11, 7);
        }
        count = 0;
        prevlen = curlen;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        } else if (curlen === nextlen) {
          max_count = 6;
          min_count = 3;
        } else {
          max_count = 7;
          min_count = 4;
        }
      }
    }
    function build_bl_tree(s) {
      var max_blindex;
      scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
      scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
      build_tree(s, s.bl_desc);
      for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
        if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
          break;
        }
      }
      s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
      return max_blindex;
    }
    function send_all_trees(s, lcodes, dcodes, blcodes) {
      var rank;
      send_bits(s, lcodes - 257, 5);
      send_bits(s, dcodes - 1, 5);
      send_bits(s, blcodes - 4, 4);
      for (rank = 0; rank < blcodes; rank++) {
        send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1], 3);
      }
      send_tree(s, s.dyn_ltree, lcodes - 1);
      send_tree(s, s.dyn_dtree, dcodes - 1);
    }
    function detect_data_type(s) {
      var black_mask = 4093624447;
      var n;
      for (n = 0; n <= 31; n++, black_mask >>>= 1) {
        if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
          return Z_BINARY;
        }
      }
      if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
        return Z_TEXT;
      }
      for (n = 32; n < LITERALS; n++) {
        if (s.dyn_ltree[n * 2] !== 0) {
          return Z_TEXT;
        }
      }
      return Z_BINARY;
    }
    var static_init_done = false;
    function _tr_init(s) {
      if (!static_init_done) {
        tr_static_init();
        static_init_done = true;
      }
      s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
      s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
      s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
      s.bi_buf = 0;
      s.bi_valid = 0;
      init_block(s);
    }
    function _tr_stored_block(s, buf, stored_len, last) {
      send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
      copy_block(s, buf, stored_len, true);
    }
    function _tr_align(s) {
      send_bits(s, STATIC_TREES << 1, 3);
      send_code(s, END_BLOCK, static_ltree);
      bi_flush(s);
    }
    function _tr_flush_block(s, buf, stored_len, last) {
      var opt_lenb, static_lenb;
      var max_blindex = 0;
      if (s.level > 0) {
        if (s.strm.data_type === Z_UNKNOWN) {
          s.strm.data_type = detect_data_type(s);
        }
        build_tree(s, s.l_desc);
        build_tree(s, s.d_desc);
        max_blindex = build_bl_tree(s);
        opt_lenb = s.opt_len + 3 + 7 >>> 3;
        static_lenb = s.static_len + 3 + 7 >>> 3;
        if (static_lenb <= opt_lenb) {
          opt_lenb = static_lenb;
        }
      } else {
        opt_lenb = static_lenb = stored_len + 5;
      }
      if (stored_len + 4 <= opt_lenb && buf !== -1) {
        _tr_stored_block(s, buf, stored_len, last);
      } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
        send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
        compress_block(s, static_ltree, static_dtree);
      } else {
        send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
        send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
        compress_block(s, s.dyn_ltree, s.dyn_dtree);
      }
      init_block(s);
      if (last) {
        bi_windup(s);
      }
    }
    function _tr_tally(s, dist, lc) {
      s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 255;
      s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 255;
      s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
      s.last_lit++;
      if (dist === 0) {
        s.dyn_ltree[lc * 2]++;
      } else {
        s.matches++;
        dist--;
        s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]++;
        s.dyn_dtree[d_code(dist) * 2]++;
      }
      return s.last_lit === s.lit_bufsize - 1;
    }
    exports._tr_init = _tr_init;
    exports._tr_stored_block = _tr_stored_block;
    exports._tr_flush_block = _tr_flush_block;
    exports._tr_tally = _tr_tally;
    exports._tr_align = _tr_align;
  }
});

// node_modules/pako/lib/zlib/adler32.js
var require_adler32 = __commonJS({
  "node_modules/pako/lib/zlib/adler32.js"(exports, module) {
    "use strict";
    function adler32(adler, buf, len, pos) {
      var s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
      while (len !== 0) {
        n = len > 2e3 ? 2e3 : len;
        len -= n;
        do {
          s1 = s1 + buf[pos++] | 0;
          s2 = s2 + s1 | 0;
        } while (--n);
        s1 %= 65521;
        s2 %= 65521;
      }
      return s1 | s2 << 16 | 0;
    }
    module.exports = adler32;
  }
});

// node_modules/pako/lib/zlib/crc32.js
var require_crc322 = __commonJS({
  "node_modules/pako/lib/zlib/crc32.js"(exports, module) {
    "use strict";
    function makeTable() {
      var c, table = [];
      for (var n = 0; n < 256; n++) {
        c = n;
        for (var k = 0; k < 8; k++) {
          c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
        }
        table[n] = c;
      }
      return table;
    }
    var crcTable = makeTable();
    function crc322(crc, buf, len, pos) {
      var t = crcTable, end = pos + len;
      crc ^= -1;
      for (var i = pos; i < end; i++) {
        crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
      }
      return crc ^ -1;
    }
    module.exports = crc322;
  }
});

// node_modules/pako/lib/zlib/messages.js
var require_messages = __commonJS({
  "node_modules/pako/lib/zlib/messages.js"(exports, module) {
    "use strict";
    module.exports = {
      2: "need dictionary",
      /* Z_NEED_DICT       2  */
      1: "stream end",
      /* Z_STREAM_END      1  */
      0: "",
      /* Z_OK              0  */
      "-1": "file error",
      /* Z_ERRNO         (-1) */
      "-2": "stream error",
      /* Z_STREAM_ERROR  (-2) */
      "-3": "data error",
      /* Z_DATA_ERROR    (-3) */
      "-4": "insufficient memory",
      /* Z_MEM_ERROR     (-4) */
      "-5": "buffer error",
      /* Z_BUF_ERROR     (-5) */
      "-6": "incompatible version"
      /* Z_VERSION_ERROR (-6) */
    };
  }
});

// node_modules/pako/lib/zlib/deflate.js
var require_deflate = __commonJS({
  "node_modules/pako/lib/zlib/deflate.js"(exports) {
    "use strict";
    var utils = require_common();
    var trees = require_trees();
    var adler32 = require_adler32();
    var crc322 = require_crc322();
    var msg = require_messages();
    var Z_NO_FLUSH = 0;
    var Z_PARTIAL_FLUSH = 1;
    var Z_FULL_FLUSH = 3;
    var Z_FINISH = 4;
    var Z_BLOCK = 5;
    var Z_OK = 0;
    var Z_STREAM_END = 1;
    var Z_STREAM_ERROR = -2;
    var Z_DATA_ERROR = -3;
    var Z_BUF_ERROR = -5;
    var Z_DEFAULT_COMPRESSION = -1;
    var Z_FILTERED = 1;
    var Z_HUFFMAN_ONLY = 2;
    var Z_RLE = 3;
    var Z_FIXED = 4;
    var Z_DEFAULT_STRATEGY = 0;
    var Z_UNKNOWN = 2;
    var Z_DEFLATED = 8;
    var MAX_MEM_LEVEL = 9;
    var MAX_WBITS = 15;
    var DEF_MEM_LEVEL = 8;
    var LENGTH_CODES = 29;
    var LITERALS = 256;
    var L_CODES = LITERALS + 1 + LENGTH_CODES;
    var D_CODES = 30;
    var BL_CODES = 19;
    var HEAP_SIZE = 2 * L_CODES + 1;
    var MAX_BITS = 15;
    var MIN_MATCH = 3;
    var MAX_MATCH = 258;
    var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
    var PRESET_DICT = 32;
    var INIT_STATE = 42;
    var EXTRA_STATE = 69;
    var NAME_STATE = 73;
    var COMMENT_STATE = 91;
    var HCRC_STATE = 103;
    var BUSY_STATE = 113;
    var FINISH_STATE = 666;
    var BS_NEED_MORE = 1;
    var BS_BLOCK_DONE = 2;
    var BS_FINISH_STARTED = 3;
    var BS_FINISH_DONE = 4;
    var OS_CODE = 3;
    function err(strm, errorCode) {
      strm.msg = msg[errorCode];
      return errorCode;
    }
    function rank(f) {
      return (f << 1) - (f > 4 ? 9 : 0);
    }
    function zero(buf) {
      var len = buf.length;
      while (--len >= 0) {
        buf[len] = 0;
      }
    }
    function flush_pending(strm) {
      var s = strm.state;
      var len = s.pending;
      if (len > strm.avail_out) {
        len = strm.avail_out;
      }
      if (len === 0) {
        return;
      }
      utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
      strm.next_out += len;
      s.pending_out += len;
      strm.total_out += len;
      strm.avail_out -= len;
      s.pending -= len;
      if (s.pending === 0) {
        s.pending_out = 0;
      }
    }
    function flush_block_only(s, last) {
      trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
      s.block_start = s.strstart;
      flush_pending(s.strm);
    }
    function put_byte(s, b) {
      s.pending_buf[s.pending++] = b;
    }
    function putShortMSB(s, b) {
      s.pending_buf[s.pending++] = b >>> 8 & 255;
      s.pending_buf[s.pending++] = b & 255;
    }
    function read_buf(strm, buf, start, size) {
      var len = strm.avail_in;
      if (len > size) {
        len = size;
      }
      if (len === 0) {
        return 0;
      }
      strm.avail_in -= len;
      utils.arraySet(buf, strm.input, strm.next_in, len, start);
      if (strm.state.wrap === 1) {
        strm.adler = adler32(strm.adler, buf, len, start);
      } else if (strm.state.wrap === 2) {
        strm.adler = crc322(strm.adler, buf, len, start);
      }
      strm.next_in += len;
      strm.total_in += len;
      return len;
    }
    function longest_match(s, cur_match) {
      var chain_length = s.max_chain_length;
      var scan = s.strstart;
      var match;
      var len;
      var best_len = s.prev_length;
      var nice_match = s.nice_match;
      var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
      var _win = s.window;
      var wmask = s.w_mask;
      var prev = s.prev;
      var strend = s.strstart + MAX_MATCH;
      var scan_end1 = _win[scan + best_len - 1];
      var scan_end = _win[scan + best_len];
      if (s.prev_length >= s.good_match) {
        chain_length >>= 2;
      }
      if (nice_match > s.lookahead) {
        nice_match = s.lookahead;
      }
      do {
        match = cur_match;
        if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
          continue;
        }
        scan += 2;
        match++;
        do {
        } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
        len = MAX_MATCH - (strend - scan);
        scan = strend - MAX_MATCH;
        if (len > best_len) {
          s.match_start = cur_match;
          best_len = len;
          if (len >= nice_match) {
            break;
          }
          scan_end1 = _win[scan + best_len - 1];
          scan_end = _win[scan + best_len];
        }
      } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
      if (best_len <= s.lookahead) {
        return best_len;
      }
      return s.lookahead;
    }
    function fill_window(s) {
      var _w_size = s.w_size;
      var p, n, m, more, str;
      do {
        more = s.window_size - s.lookahead - s.strstart;
        if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
          utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
          s.match_start -= _w_size;
          s.strstart -= _w_size;
          s.block_start -= _w_size;
          n = s.hash_size;
          p = n;
          do {
            m = s.head[--p];
            s.head[p] = m >= _w_size ? m - _w_size : 0;
          } while (--n);
          n = _w_size;
          p = n;
          do {
            m = s.prev[--p];
            s.prev[p] = m >= _w_size ? m - _w_size : 0;
          } while (--n);
          more += _w_size;
        }
        if (s.strm.avail_in === 0) {
          break;
        }
        n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
        s.lookahead += n;
        if (s.lookahead + s.insert >= MIN_MATCH) {
          str = s.strstart - s.insert;
          s.ins_h = s.window[str];
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask;
          while (s.insert) {
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
            s.prev[str & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = str;
            str++;
            s.insert--;
            if (s.lookahead + s.insert < MIN_MATCH) {
              break;
            }
          }
        }
      } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
    }
    function deflate_stored(s, flush) {
      var max_block_size = 65535;
      if (max_block_size > s.pending_buf_size - 5) {
        max_block_size = s.pending_buf_size - 5;
      }
      for (; ; ) {
        if (s.lookahead <= 1) {
          fill_window(s);
          if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) {
            break;
          }
        }
        s.strstart += s.lookahead;
        s.lookahead = 0;
        var max_start = s.block_start + max_block_size;
        if (s.strstart === 0 || s.strstart >= max_start) {
          s.lookahead = s.strstart - max_start;
          s.strstart = max_start;
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      }
      s.insert = 0;
      if (flush === Z_FINISH) {
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        return BS_FINISH_DONE;
      }
      if (s.strstart > s.block_start) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      return BS_NEED_MORE;
    }
    function deflate_fast(s, flush) {
      var hash_head;
      var bflush;
      for (; ; ) {
        if (s.lookahead < MIN_LOOKAHEAD) {
          fill_window(s);
          if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) {
            break;
          }
        }
        hash_head = 0;
        if (s.lookahead >= MIN_MATCH) {
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        }
        if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
          s.match_length = longest_match(s, hash_head);
        }
        if (s.match_length >= MIN_MATCH) {
          bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
          s.lookahead -= s.match_length;
          if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
            s.match_length--;
            do {
              s.strstart++;
              s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
              hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = s.strstart;
            } while (--s.match_length !== 0);
            s.strstart++;
          } else {
            s.strstart += s.match_length;
            s.match_length = 0;
            s.ins_h = s.window[s.strstart];
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;
          }
        } else {
          bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
          s.lookahead--;
          s.strstart++;
        }
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      }
      s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
      if (flush === Z_FINISH) {
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        return BS_FINISH_DONE;
      }
      if (s.last_lit) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      return BS_BLOCK_DONE;
    }
    function deflate_slow(s, flush) {
      var hash_head;
      var bflush;
      var max_insert;
      for (; ; ) {
        if (s.lookahead < MIN_LOOKAHEAD) {
          fill_window(s);
          if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) {
            break;
          }
        }
        hash_head = 0;
        if (s.lookahead >= MIN_MATCH) {
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        }
        s.prev_length = s.match_length;
        s.prev_match = s.match_start;
        s.match_length = MIN_MATCH - 1;
        if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
          s.match_length = longest_match(s, hash_head);
          if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
            s.match_length = MIN_MATCH - 1;
          }
        }
        if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
          max_insert = s.strstart + s.lookahead - MIN_MATCH;
          bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
          s.lookahead -= s.prev_length - 1;
          s.prev_length -= 2;
          do {
            if (++s.strstart <= max_insert) {
              s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
              hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = s.strstart;
            }
          } while (--s.prev_length !== 0);
          s.match_available = 0;
          s.match_length = MIN_MATCH - 1;
          s.strstart++;
          if (bflush) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        } else if (s.match_available) {
          bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
          if (bflush) {
            flush_block_only(s, false);
          }
          s.strstart++;
          s.lookahead--;
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        } else {
          s.match_available = 1;
          s.strstart++;
          s.lookahead--;
        }
      }
      if (s.match_available) {
        bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
        s.match_available = 0;
      }
      s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
      if (flush === Z_FINISH) {
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        return BS_FINISH_DONE;
      }
      if (s.last_lit) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      return BS_BLOCK_DONE;
    }
    function deflate_rle(s, flush) {
      var bflush;
      var prev;
      var scan, strend;
      var _win = s.window;
      for (; ; ) {
        if (s.lookahead <= MAX_MATCH) {
          fill_window(s);
          if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) {
            break;
          }
        }
        s.match_length = 0;
        if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
          scan = s.strstart - 1;
          prev = _win[scan];
          if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
            strend = s.strstart + MAX_MATCH;
            do {
            } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
            s.match_length = MAX_MATCH - (strend - scan);
            if (s.match_length > s.lookahead) {
              s.match_length = s.lookahead;
            }
          }
        }
        if (s.match_length >= MIN_MATCH) {
          bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);
          s.lookahead -= s.match_length;
          s.strstart += s.match_length;
          s.match_length = 0;
        } else {
          bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
          s.lookahead--;
          s.strstart++;
        }
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      }
      s.insert = 0;
      if (flush === Z_FINISH) {
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        return BS_FINISH_DONE;
      }
      if (s.last_lit) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      return BS_BLOCK_DONE;
    }
    function deflate_huff(s, flush) {
      var bflush;
      for (; ; ) {
        if (s.lookahead === 0) {
          fill_window(s);
          if (s.lookahead === 0) {
            if (flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            break;
          }
        }
        s.match_length = 0;
        bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      }
      s.insert = 0;
      if (flush === Z_FINISH) {
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        return BS_FINISH_DONE;
      }
      if (s.last_lit) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      return BS_BLOCK_DONE;
    }
    function Config(good_length, max_lazy, nice_length, max_chain, func) {
      this.good_length = good_length;
      this.max_lazy = max_lazy;
      this.nice_length = nice_length;
      this.max_chain = max_chain;
      this.func = func;
    }
    var configuration_table;
    configuration_table = [
      /*      good lazy nice chain */
      new Config(0, 0, 0, 0, deflate_stored),
      /* 0 store only */
      new Config(4, 4, 8, 4, deflate_fast),
      /* 1 max speed, no lazy matches */
      new Config(4, 5, 16, 8, deflate_fast),
      /* 2 */
      new Config(4, 6, 32, 32, deflate_fast),
      /* 3 */
      new Config(4, 4, 16, 16, deflate_slow),
      /* 4 lazy matches */
      new Config(8, 16, 32, 32, deflate_slow),
      /* 5 */
      new Config(8, 16, 128, 128, deflate_slow),
      /* 6 */
      new Config(8, 32, 128, 256, deflate_slow),
      /* 7 */
      new Config(32, 128, 258, 1024, deflate_slow),
      /* 8 */
      new Config(32, 258, 258, 4096, deflate_slow)
      /* 9 max compression */
    ];
    function lm_init(s) {
      s.window_size = 2 * s.w_size;
      zero(s.head);
      s.max_lazy_match = configuration_table[s.level].max_lazy;
      s.good_match = configuration_table[s.level].good_length;
      s.nice_match = configuration_table[s.level].nice_length;
      s.max_chain_length = configuration_table[s.level].max_chain;
      s.strstart = 0;
      s.block_start = 0;
      s.lookahead = 0;
      s.insert = 0;
      s.match_length = s.prev_length = MIN_MATCH - 1;
      s.match_available = 0;
      s.ins_h = 0;
    }
    function DeflateState() {
      this.strm = null;
      this.status = 0;
      this.pending_buf = null;
      this.pending_buf_size = 0;
      this.pending_out = 0;
      this.pending = 0;
      this.wrap = 0;
      this.gzhead = null;
      this.gzindex = 0;
      this.method = Z_DEFLATED;
      this.last_flush = -1;
      this.w_size = 0;
      this.w_bits = 0;
      this.w_mask = 0;
      this.window = null;
      this.window_size = 0;
      this.prev = null;
      this.head = null;
      this.ins_h = 0;
      this.hash_size = 0;
      this.hash_bits = 0;
      this.hash_mask = 0;
      this.hash_shift = 0;
      this.block_start = 0;
      this.match_length = 0;
      this.prev_match = 0;
      this.match_available = 0;
      this.strstart = 0;
      this.match_start = 0;
      this.lookahead = 0;
      this.prev_length = 0;
      this.max_chain_length = 0;
      this.max_lazy_match = 0;
      this.level = 0;
      this.strategy = 0;
      this.good_match = 0;
      this.nice_match = 0;
      this.dyn_ltree = new utils.Buf16(HEAP_SIZE * 2);
      this.dyn_dtree = new utils.Buf16((2 * D_CODES + 1) * 2);
      this.bl_tree = new utils.Buf16((2 * BL_CODES + 1) * 2);
      zero(this.dyn_ltree);
      zero(this.dyn_dtree);
      zero(this.bl_tree);
      this.l_desc = null;
      this.d_desc = null;
      this.bl_desc = null;
      this.bl_count = new utils.Buf16(MAX_BITS + 1);
      this.heap = new utils.Buf16(2 * L_CODES + 1);
      zero(this.heap);
      this.heap_len = 0;
      this.heap_max = 0;
      this.depth = new utils.Buf16(2 * L_CODES + 1);
      zero(this.depth);
      this.l_buf = 0;
      this.lit_bufsize = 0;
      this.last_lit = 0;
      this.d_buf = 0;
      this.opt_len = 0;
      this.static_len = 0;
      this.matches = 0;
      this.insert = 0;
      this.bi_buf = 0;
      this.bi_valid = 0;
    }
    function deflateResetKeep(strm) {
      var s;
      if (!strm || !strm.state) {
        return err(strm, Z_STREAM_ERROR);
      }
      strm.total_in = strm.total_out = 0;
      strm.data_type = Z_UNKNOWN;
      s = strm.state;
      s.pending = 0;
      s.pending_out = 0;
      if (s.wrap < 0) {
        s.wrap = -s.wrap;
      }
      s.status = s.wrap ? INIT_STATE : BUSY_STATE;
      strm.adler = s.wrap === 2 ? 0 : 1;
      s.last_flush = Z_NO_FLUSH;
      trees._tr_init(s);
      return Z_OK;
    }
    function deflateReset(strm) {
      var ret = deflateResetKeep(strm);
      if (ret === Z_OK) {
        lm_init(strm.state);
      }
      return ret;
    }
    function deflateSetHeader(strm, head) {
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR;
      }
      if (strm.state.wrap !== 2) {
        return Z_STREAM_ERROR;
      }
      strm.state.gzhead = head;
      return Z_OK;
    }
    function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
      if (!strm) {
        return Z_STREAM_ERROR;
      }
      var wrap = 1;
      if (level === Z_DEFAULT_COMPRESSION) {
        level = 6;
      }
      if (windowBits < 0) {
        wrap = 0;
        windowBits = -windowBits;
      } else if (windowBits > 15) {
        wrap = 2;
        windowBits -= 16;
      }
      if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
        return err(strm, Z_STREAM_ERROR);
      }
      if (windowBits === 8) {
        windowBits = 9;
      }
      var s = new DeflateState();
      strm.state = s;
      s.strm = strm;
      s.wrap = wrap;
      s.gzhead = null;
      s.w_bits = windowBits;
      s.w_size = 1 << s.w_bits;
      s.w_mask = s.w_size - 1;
      s.hash_bits = memLevel + 7;
      s.hash_size = 1 << s.hash_bits;
      s.hash_mask = s.hash_size - 1;
      s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
      s.window = new utils.Buf8(s.w_size * 2);
      s.head = new utils.Buf16(s.hash_size);
      s.prev = new utils.Buf16(s.w_size);
      s.lit_bufsize = 1 << memLevel + 6;
      s.pending_buf_size = s.lit_bufsize * 4;
      s.pending_buf = new utils.Buf8(s.pending_buf_size);
      s.d_buf = 1 * s.lit_bufsize;
      s.l_buf = (1 + 2) * s.lit_bufsize;
      s.level = level;
      s.strategy = strategy;
      s.method = method;
      return deflateReset(strm);
    }
    function deflateInit(strm, level) {
      return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
    }
    function deflate2(strm, flush) {
      var old_flush, s;
      var beg, val;
      if (!strm || !strm.state || flush > Z_BLOCK || flush < 0) {
        return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
      }
      s = strm.state;
      if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH) {
        return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR);
      }
      s.strm = strm;
      old_flush = s.last_flush;
      s.last_flush = flush;
      if (s.status === INIT_STATE) {
        if (s.wrap === 2) {
          strm.adler = 0;
          put_byte(s, 31);
          put_byte(s, 139);
          put_byte(s, 8);
          if (!s.gzhead) {
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
            put_byte(s, OS_CODE);
            s.status = BUSY_STATE;
          } else {
            put_byte(
              s,
              (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
            );
            put_byte(s, s.gzhead.time & 255);
            put_byte(s, s.gzhead.time >> 8 & 255);
            put_byte(s, s.gzhead.time >> 16 & 255);
            put_byte(s, s.gzhead.time >> 24 & 255);
            put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
            put_byte(s, s.gzhead.os & 255);
            if (s.gzhead.extra && s.gzhead.extra.length) {
              put_byte(s, s.gzhead.extra.length & 255);
              put_byte(s, s.gzhead.extra.length >> 8 & 255);
            }
            if (s.gzhead.hcrc) {
              strm.adler = crc322(strm.adler, s.pending_buf, s.pending, 0);
            }
            s.gzindex = 0;
            s.status = EXTRA_STATE;
          }
        } else {
          var header = Z_DEFLATED + (s.w_bits - 8 << 4) << 8;
          var level_flags = -1;
          if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
            level_flags = 0;
          } else if (s.level < 6) {
            level_flags = 1;
          } else if (s.level === 6) {
            level_flags = 2;
          } else {
            level_flags = 3;
          }
          header |= level_flags << 6;
          if (s.strstart !== 0) {
            header |= PRESET_DICT;
          }
          header += 31 - header % 31;
          s.status = BUSY_STATE;
          putShortMSB(s, header);
          if (s.strstart !== 0) {
            putShortMSB(s, strm.adler >>> 16);
            putShortMSB(s, strm.adler & 65535);
          }
          strm.adler = 1;
        }
      }
      if (s.status === EXTRA_STATE) {
        if (s.gzhead.extra) {
          beg = s.pending;
          while (s.gzindex < (s.gzhead.extra.length & 65535)) {
            if (s.pending === s.pending_buf_size) {
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              flush_pending(strm);
              beg = s.pending;
              if (s.pending === s.pending_buf_size) {
                break;
              }
            }
            put_byte(s, s.gzhead.extra[s.gzindex] & 255);
            s.gzindex++;
          }
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          if (s.gzindex === s.gzhead.extra.length) {
            s.gzindex = 0;
            s.status = NAME_STATE;
          }
        } else {
          s.status = NAME_STATE;
        }
      }
      if (s.status === NAME_STATE) {
        if (s.gzhead.name) {
          beg = s.pending;
          do {
            if (s.pending === s.pending_buf_size) {
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              flush_pending(strm);
              beg = s.pending;
              if (s.pending === s.pending_buf_size) {
                val = 1;
                break;
              }
            }
            if (s.gzindex < s.gzhead.name.length) {
              val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
            } else {
              val = 0;
            }
            put_byte(s, val);
          } while (val !== 0);
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          if (val === 0) {
            s.gzindex = 0;
            s.status = COMMENT_STATE;
          }
        } else {
          s.status = COMMENT_STATE;
        }
      }
      if (s.status === COMMENT_STATE) {
        if (s.gzhead.comment) {
          beg = s.pending;
          do {
            if (s.pending === s.pending_buf_size) {
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              flush_pending(strm);
              beg = s.pending;
              if (s.pending === s.pending_buf_size) {
                val = 1;
                break;
              }
            }
            if (s.gzindex < s.gzhead.comment.length) {
              val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
            } else {
              val = 0;
            }
            put_byte(s, val);
          } while (val !== 0);
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          if (val === 0) {
            s.status = HCRC_STATE;
          }
        } else {
          s.status = HCRC_STATE;
        }
      }
      if (s.status === HCRC_STATE) {
        if (s.gzhead.hcrc) {
          if (s.pending + 2 > s.pending_buf_size) {
            flush_pending(strm);
          }
          if (s.pending + 2 <= s.pending_buf_size) {
            put_byte(s, strm.adler & 255);
            put_byte(s, strm.adler >> 8 & 255);
            strm.adler = 0;
            s.status = BUSY_STATE;
          }
        } else {
          s.status = BUSY_STATE;
        }
      }
      if (s.pending !== 0) {
        flush_pending(strm);
        if (strm.avail_out === 0) {
          s.last_flush = -1;
          return Z_OK;
        }
      } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH) {
        return err(strm, Z_BUF_ERROR);
      }
      if (s.status === FINISH_STATE && strm.avail_in !== 0) {
        return err(strm, Z_BUF_ERROR);
      }
      if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH && s.status !== FINISH_STATE) {
        var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
        if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
          s.status = FINISH_STATE;
        }
        if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
          if (strm.avail_out === 0) {
            s.last_flush = -1;
          }
          return Z_OK;
        }
        if (bstate === BS_BLOCK_DONE) {
          if (flush === Z_PARTIAL_FLUSH) {
            trees._tr_align(s);
          } else if (flush !== Z_BLOCK) {
            trees._tr_stored_block(s, 0, 0, false);
            if (flush === Z_FULL_FLUSH) {
              zero(s.head);
              if (s.lookahead === 0) {
                s.strstart = 0;
                s.block_start = 0;
                s.insert = 0;
              }
            }
          }
          flush_pending(strm);
          if (strm.avail_out === 0) {
            s.last_flush = -1;
            return Z_OK;
          }
        }
      }
      if (flush !== Z_FINISH) {
        return Z_OK;
      }
      if (s.wrap <= 0) {
        return Z_STREAM_END;
      }
      if (s.wrap === 2) {
        put_byte(s, strm.adler & 255);
        put_byte(s, strm.adler >> 8 & 255);
        put_byte(s, strm.adler >> 16 & 255);
        put_byte(s, strm.adler >> 24 & 255);
        put_byte(s, strm.total_in & 255);
        put_byte(s, strm.total_in >> 8 & 255);
        put_byte(s, strm.total_in >> 16 & 255);
        put_byte(s, strm.total_in >> 24 & 255);
      } else {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 65535);
      }
      flush_pending(strm);
      if (s.wrap > 0) {
        s.wrap = -s.wrap;
      }
      return s.pending !== 0 ? Z_OK : Z_STREAM_END;
    }
    function deflateEnd(strm) {
      var status2;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR;
      }
      status2 = strm.state.status;
      if (status2 !== INIT_STATE && status2 !== EXTRA_STATE && status2 !== NAME_STATE && status2 !== COMMENT_STATE && status2 !== HCRC_STATE && status2 !== BUSY_STATE && status2 !== FINISH_STATE) {
        return err(strm, Z_STREAM_ERROR);
      }
      strm.state = null;
      return status2 === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
    }
    function deflateSetDictionary(strm, dictionary) {
      var dictLength = dictionary.length;
      var s;
      var str, n;
      var wrap;
      var avail;
      var next;
      var input;
      var tmpDict;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR;
      }
      s = strm.state;
      wrap = s.wrap;
      if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
        return Z_STREAM_ERROR;
      }
      if (wrap === 1) {
        strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
      }
      s.wrap = 0;
      if (dictLength >= s.w_size) {
        if (wrap === 0) {
          zero(s.head);
          s.strstart = 0;
          s.block_start = 0;
          s.insert = 0;
        }
        tmpDict = new utils.Buf8(s.w_size);
        utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
        dictionary = tmpDict;
        dictLength = s.w_size;
      }
      avail = strm.avail_in;
      next = strm.next_in;
      input = strm.input;
      strm.avail_in = dictLength;
      strm.next_in = 0;
      strm.input = dictionary;
      fill_window(s);
      while (s.lookahead >= MIN_MATCH) {
        str = s.strstart;
        n = s.lookahead - (MIN_MATCH - 1);
        do {
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
          s.prev[str & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = str;
          str++;
        } while (--n);
        s.strstart = str;
        s.lookahead = MIN_MATCH - 1;
        fill_window(s);
      }
      s.strstart += s.lookahead;
      s.block_start = s.strstart;
      s.insert = s.lookahead;
      s.lookahead = 0;
      s.match_length = s.prev_length = MIN_MATCH - 1;
      s.match_available = 0;
      strm.next_in = next;
      strm.input = input;
      strm.avail_in = avail;
      s.wrap = wrap;
      return Z_OK;
    }
    exports.deflateInit = deflateInit;
    exports.deflateInit2 = deflateInit2;
    exports.deflateReset = deflateReset;
    exports.deflateResetKeep = deflateResetKeep;
    exports.deflateSetHeader = deflateSetHeader;
    exports.deflate = deflate2;
    exports.deflateEnd = deflateEnd;
    exports.deflateSetDictionary = deflateSetDictionary;
    exports.deflateInfo = "pako deflate (from Nodeca project)";
  }
});

// node_modules/pako/lib/utils/strings.js
var require_strings = __commonJS({
  "node_modules/pako/lib/utils/strings.js"(exports) {
    "use strict";
    var utils = require_common();
    var STR_APPLY_OK = true;
    var STR_APPLY_UIA_OK = true;
    try {
      String.fromCharCode.apply(null, [0]);
    } catch (__) {
      STR_APPLY_OK = false;
    }
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (__) {
      STR_APPLY_UIA_OK = false;
    }
    var _utf8len = new utils.Buf8(256);
    for (q = 0; q < 256; q++) {
      _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
    }
    var q;
    _utf8len[254] = _utf8len[254] = 1;
    exports.string2buf = function(str) {
      var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
      for (m_pos = 0; m_pos < str_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
          c2 = str.charCodeAt(m_pos + 1);
          if ((c2 & 64512) === 56320) {
            c = 65536 + (c - 55296 << 10) + (c2 - 56320);
            m_pos++;
          }
        }
        buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
      }
      buf = new utils.Buf8(buf_len);
      for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
          c2 = str.charCodeAt(m_pos + 1);
          if ((c2 & 64512) === 56320) {
            c = 65536 + (c - 55296 << 10) + (c2 - 56320);
            m_pos++;
          }
        }
        if (c < 128) {
          buf[i++] = c;
        } else if (c < 2048) {
          buf[i++] = 192 | c >>> 6;
          buf[i++] = 128 | c & 63;
        } else if (c < 65536) {
          buf[i++] = 224 | c >>> 12;
          buf[i++] = 128 | c >>> 6 & 63;
          buf[i++] = 128 | c & 63;
        } else {
          buf[i++] = 240 | c >>> 18;
          buf[i++] = 128 | c >>> 12 & 63;
          buf[i++] = 128 | c >>> 6 & 63;
          buf[i++] = 128 | c & 63;
        }
      }
      return buf;
    };
    function buf2binstring(buf, len) {
      if (len < 65534) {
        if (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK) {
          return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
        }
      }
      var result = "";
      for (var i = 0; i < len; i++) {
        result += String.fromCharCode(buf[i]);
      }
      return result;
    }
    exports.buf2binstring = function(buf) {
      return buf2binstring(buf, buf.length);
    };
    exports.binstring2buf = function(str) {
      var buf = new utils.Buf8(str.length);
      for (var i = 0, len = buf.length; i < len; i++) {
        buf[i] = str.charCodeAt(i);
      }
      return buf;
    };
    exports.buf2string = function(buf, max) {
      var i, out, c, c_len;
      var len = max || buf.length;
      var utf16buf = new Array(len * 2);
      for (out = 0, i = 0; i < len; ) {
        c = buf[i++];
        if (c < 128) {
          utf16buf[out++] = c;
          continue;
        }
        c_len = _utf8len[c];
        if (c_len > 4) {
          utf16buf[out++] = 65533;
          i += c_len - 1;
          continue;
        }
        c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
        while (c_len > 1 && i < len) {
          c = c << 6 | buf[i++] & 63;
          c_len--;
        }
        if (c_len > 1) {
          utf16buf[out++] = 65533;
          continue;
        }
        if (c < 65536) {
          utf16buf[out++] = c;
        } else {
          c -= 65536;
          utf16buf[out++] = 55296 | c >> 10 & 1023;
          utf16buf[out++] = 56320 | c & 1023;
        }
      }
      return buf2binstring(utf16buf, out);
    };
    exports.utf8border = function(buf, max) {
      var pos;
      max = max || buf.length;
      if (max > buf.length) {
        max = buf.length;
      }
      pos = max - 1;
      while (pos >= 0 && (buf[pos] & 192) === 128) {
        pos--;
      }
      if (pos < 0) {
        return max;
      }
      if (pos === 0) {
        return max;
      }
      return pos + _utf8len[buf[pos]] > max ? pos : max;
    };
  }
});

// node_modules/pako/lib/zlib/zstream.js
var require_zstream = __commonJS({
  "node_modules/pako/lib/zlib/zstream.js"(exports, module) {
    "use strict";
    function ZStream() {
      this.input = null;
      this.next_in = 0;
      this.avail_in = 0;
      this.total_in = 0;
      this.output = null;
      this.next_out = 0;
      this.avail_out = 0;
      this.total_out = 0;
      this.msg = "";
      this.state = null;
      this.data_type = 2;
      this.adler = 0;
    }
    module.exports = ZStream;
  }
});

// node_modules/pako/lib/deflate.js
var require_deflate2 = __commonJS({
  "node_modules/pako/lib/deflate.js"(exports) {
    "use strict";
    var zlib_deflate = require_deflate();
    var utils = require_common();
    var strings = require_strings();
    var msg = require_messages();
    var ZStream = require_zstream();
    var toString = Object.prototype.toString;
    var Z_NO_FLUSH = 0;
    var Z_FINISH = 4;
    var Z_OK = 0;
    var Z_STREAM_END = 1;
    var Z_SYNC_FLUSH = 2;
    var Z_DEFAULT_COMPRESSION = -1;
    var Z_DEFAULT_STRATEGY = 0;
    var Z_DEFLATED = 8;
    function Deflate(options) {
      if (!(this instanceof Deflate)) return new Deflate(options);
      this.options = utils.assign({
        level: Z_DEFAULT_COMPRESSION,
        method: Z_DEFLATED,
        chunkSize: 16384,
        windowBits: 15,
        memLevel: 8,
        strategy: Z_DEFAULT_STRATEGY,
        to: ""
      }, options || {});
      var opt = this.options;
      if (opt.raw && opt.windowBits > 0) {
        opt.windowBits = -opt.windowBits;
      } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
        opt.windowBits += 16;
      }
      this.err = 0;
      this.msg = "";
      this.ended = false;
      this.chunks = [];
      this.strm = new ZStream();
      this.strm.avail_out = 0;
      var status2 = zlib_deflate.deflateInit2(
        this.strm,
        opt.level,
        opt.method,
        opt.windowBits,
        opt.memLevel,
        opt.strategy
      );
      if (status2 !== Z_OK) {
        throw new Error(msg[status2]);
      }
      if (opt.header) {
        zlib_deflate.deflateSetHeader(this.strm, opt.header);
      }
      if (opt.dictionary) {
        var dict;
        if (typeof opt.dictionary === "string") {
          dict = strings.string2buf(opt.dictionary);
        } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
          dict = new Uint8Array(opt.dictionary);
        } else {
          dict = opt.dictionary;
        }
        status2 = zlib_deflate.deflateSetDictionary(this.strm, dict);
        if (status2 !== Z_OK) {
          throw new Error(msg[status2]);
        }
        this._dict_set = true;
      }
    }
    Deflate.prototype.push = function(data, mode) {
      var strm = this.strm;
      var chunkSize = this.options.chunkSize;
      var status2, _mode;
      if (this.ended) {
        return false;
      }
      _mode = mode === ~~mode ? mode : mode === true ? Z_FINISH : Z_NO_FLUSH;
      if (typeof data === "string") {
        strm.input = strings.string2buf(data);
      } else if (toString.call(data) === "[object ArrayBuffer]") {
        strm.input = new Uint8Array(data);
      } else {
        strm.input = data;
      }
      strm.next_in = 0;
      strm.avail_in = strm.input.length;
      do {
        if (strm.avail_out === 0) {
          strm.output = new utils.Buf8(chunkSize);
          strm.next_out = 0;
          strm.avail_out = chunkSize;
        }
        status2 = zlib_deflate.deflate(strm, _mode);
        if (status2 !== Z_STREAM_END && status2 !== Z_OK) {
          this.onEnd(status2);
          this.ended = true;
          return false;
        }
        if (strm.avail_out === 0 || strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH)) {
          if (this.options.to === "string") {
            this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
          } else {
            this.onData(utils.shrinkBuf(strm.output, strm.next_out));
          }
        }
      } while ((strm.avail_in > 0 || strm.avail_out === 0) && status2 !== Z_STREAM_END);
      if (_mode === Z_FINISH) {
        status2 = zlib_deflate.deflateEnd(this.strm);
        this.onEnd(status2);
        this.ended = true;
        return status2 === Z_OK;
      }
      if (_mode === Z_SYNC_FLUSH) {
        this.onEnd(Z_OK);
        strm.avail_out = 0;
        return true;
      }
      return true;
    };
    Deflate.prototype.onData = function(chunk) {
      this.chunks.push(chunk);
    };
    Deflate.prototype.onEnd = function(status2) {
      if (status2 === Z_OK) {
        if (this.options.to === "string") {
          this.result = this.chunks.join("");
        } else {
          this.result = utils.flattenChunks(this.chunks);
        }
      }
      this.chunks = [];
      this.err = status2;
      this.msg = this.strm.msg;
    };
    function deflate2(input, options) {
      var deflator = new Deflate(options);
      deflator.push(input, true);
      if (deflator.err) {
        throw deflator.msg || msg[deflator.err];
      }
      return deflator.result;
    }
    function deflateRaw(input, options) {
      options = options || {};
      options.raw = true;
      return deflate2(input, options);
    }
    function gzip(input, options) {
      options = options || {};
      options.gzip = true;
      return deflate2(input, options);
    }
    exports.Deflate = Deflate;
    exports.deflate = deflate2;
    exports.deflateRaw = deflateRaw;
    exports.gzip = gzip;
  }
});

// node_modules/pako/lib/zlib/inffast.js
var require_inffast = __commonJS({
  "node_modules/pako/lib/zlib/inffast.js"(exports, module) {
    "use strict";
    var BAD = 30;
    var TYPE = 12;
    module.exports = function inflate_fast(strm, start) {
      var state;
      var _in;
      var last;
      var _out;
      var beg;
      var end;
      var dmax;
      var wsize;
      var whave;
      var wnext;
      var s_window;
      var hold;
      var bits;
      var lcode;
      var dcode;
      var lmask;
      var dmask;
      var here;
      var op;
      var len;
      var dist;
      var from;
      var from_source;
      var input, output;
      state = strm.state;
      _in = strm.next_in;
      input = strm.input;
      last = _in + (strm.avail_in - 5);
      _out = strm.next_out;
      output = strm.output;
      beg = _out - (start - strm.avail_out);
      end = _out + (strm.avail_out - 257);
      dmax = state.dmax;
      wsize = state.wsize;
      whave = state.whave;
      wnext = state.wnext;
      s_window = state.window;
      hold = state.hold;
      bits = state.bits;
      lcode = state.lencode;
      dcode = state.distcode;
      lmask = (1 << state.lenbits) - 1;
      dmask = (1 << state.distbits) - 1;
      top:
        do {
          if (bits < 15) {
            hold += input[_in++] << bits;
            bits += 8;
            hold += input[_in++] << bits;
            bits += 8;
          }
          here = lcode[hold & lmask];
          dolen:
            for (; ; ) {
              op = here >>> 24;
              hold >>>= op;
              bits -= op;
              op = here >>> 16 & 255;
              if (op === 0) {
                output[_out++] = here & 65535;
              } else if (op & 16) {
                len = here & 65535;
                op &= 15;
                if (op) {
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                  }
                  len += hold & (1 << op) - 1;
                  hold >>>= op;
                  bits -= op;
                }
                if (bits < 15) {
                  hold += input[_in++] << bits;
                  bits += 8;
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                here = dcode[hold & dmask];
                dodist:
                  for (; ; ) {
                    op = here >>> 24;
                    hold >>>= op;
                    bits -= op;
                    op = here >>> 16 & 255;
                    if (op & 16) {
                      dist = here & 65535;
                      op &= 15;
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                        if (bits < op) {
                          hold += input[_in++] << bits;
                          bits += 8;
                        }
                      }
                      dist += hold & (1 << op) - 1;
                      if (dist > dmax) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD;
                        break top;
                      }
                      hold >>>= op;
                      bits -= op;
                      op = _out - beg;
                      if (dist > op) {
                        op = dist - op;
                        if (op > whave) {
                          if (state.sane) {
                            strm.msg = "invalid distance too far back";
                            state.mode = BAD;
                            break top;
                          }
                        }
                        from = 0;
                        from_source = s_window;
                        if (wnext === 0) {
                          from += wsize - op;
                          if (op < len) {
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        } else if (wnext < op) {
                          from += wsize + wnext - op;
                          op -= wnext;
                          if (op < len) {
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = 0;
                            if (wnext < len) {
                              op = wnext;
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = _out - dist;
                              from_source = output;
                            }
                          }
                        } else {
                          from += wnext - op;
                          if (op < len) {
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        }
                        while (len > 2) {
                          output[_out++] = from_source[from++];
                          output[_out++] = from_source[from++];
                          output[_out++] = from_source[from++];
                          len -= 3;
                        }
                        if (len) {
                          output[_out++] = from_source[from++];
                          if (len > 1) {
                            output[_out++] = from_source[from++];
                          }
                        }
                      } else {
                        from = _out - dist;
                        do {
                          output[_out++] = output[from++];
                          output[_out++] = output[from++];
                          output[_out++] = output[from++];
                          len -= 3;
                        } while (len > 2);
                        if (len) {
                          output[_out++] = output[from++];
                          if (len > 1) {
                            output[_out++] = output[from++];
                          }
                        }
                      }
                    } else if ((op & 64) === 0) {
                      here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                      continue dodist;
                    } else {
                      strm.msg = "invalid distance code";
                      state.mode = BAD;
                      break top;
                    }
                    break;
                  }
              } else if ((op & 64) === 0) {
                here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
                continue dolen;
              } else if (op & 32) {
                state.mode = TYPE;
                break top;
              } else {
                strm.msg = "invalid literal/length code";
                state.mode = BAD;
                break top;
              }
              break;
            }
        } while (_in < last && _out < end);
      len = bits >> 3;
      _in -= len;
      bits -= len << 3;
      hold &= (1 << bits) - 1;
      strm.next_in = _in;
      strm.next_out = _out;
      strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
      strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
      state.hold = hold;
      state.bits = bits;
      return;
    };
  }
});

// node_modules/pako/lib/zlib/inftrees.js
var require_inftrees = __commonJS({
  "node_modules/pako/lib/zlib/inftrees.js"(exports, module) {
    "use strict";
    var utils = require_common();
    var MAXBITS = 15;
    var ENOUGH_LENS = 852;
    var ENOUGH_DISTS = 592;
    var CODES = 0;
    var LENS = 1;
    var DISTS = 2;
    var lbase = [
      /* Length codes 257..285 base */
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      13,
      15,
      17,
      19,
      23,
      27,
      31,
      35,
      43,
      51,
      59,
      67,
      83,
      99,
      115,
      131,
      163,
      195,
      227,
      258,
      0,
      0
    ];
    var lext = [
      /* Length codes 257..285 extra */
      16,
      16,
      16,
      16,
      16,
      16,
      16,
      16,
      17,
      17,
      17,
      17,
      18,
      18,
      18,
      18,
      19,
      19,
      19,
      19,
      20,
      20,
      20,
      20,
      21,
      21,
      21,
      21,
      16,
      72,
      78
    ];
    var dbase = [
      /* Distance codes 0..29 base */
      1,
      2,
      3,
      4,
      5,
      7,
      9,
      13,
      17,
      25,
      33,
      49,
      65,
      97,
      129,
      193,
      257,
      385,
      513,
      769,
      1025,
      1537,
      2049,
      3073,
      4097,
      6145,
      8193,
      12289,
      16385,
      24577,
      0,
      0
    ];
    var dext = [
      /* Distance codes 0..29 extra */
      16,
      16,
      16,
      16,
      17,
      17,
      18,
      18,
      19,
      19,
      20,
      20,
      21,
      21,
      22,
      22,
      23,
      23,
      24,
      24,
      25,
      25,
      26,
      26,
      27,
      27,
      28,
      28,
      29,
      29,
      64,
      64
    ];
    module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
      var bits = opts.bits;
      var len = 0;
      var sym = 0;
      var min = 0, max = 0;
      var root = 0;
      var curr = 0;
      var drop = 0;
      var left = 0;
      var used = 0;
      var huff = 0;
      var incr;
      var fill;
      var low;
      var mask;
      var next;
      var base = null;
      var base_index = 0;
      var end;
      var count = new utils.Buf16(MAXBITS + 1);
      var offs = new utils.Buf16(MAXBITS + 1);
      var extra = null;
      var extra_index = 0;
      var here_bits, here_op, here_val;
      for (len = 0; len <= MAXBITS; len++) {
        count[len] = 0;
      }
      for (sym = 0; sym < codes; sym++) {
        count[lens[lens_index + sym]]++;
      }
      root = bits;
      for (max = MAXBITS; max >= 1; max--) {
        if (count[max] !== 0) {
          break;
        }
      }
      if (root > max) {
        root = max;
      }
      if (max === 0) {
        table[table_index++] = 1 << 24 | 64 << 16 | 0;
        table[table_index++] = 1 << 24 | 64 << 16 | 0;
        opts.bits = 1;
        return 0;
      }
      for (min = 1; min < max; min++) {
        if (count[min] !== 0) {
          break;
        }
      }
      if (root < min) {
        root = min;
      }
      left = 1;
      for (len = 1; len <= MAXBITS; len++) {
        left <<= 1;
        left -= count[len];
        if (left < 0) {
          return -1;
        }
      }
      if (left > 0 && (type === CODES || max !== 1)) {
        return -1;
      }
      offs[1] = 0;
      for (len = 1; len < MAXBITS; len++) {
        offs[len + 1] = offs[len] + count[len];
      }
      for (sym = 0; sym < codes; sym++) {
        if (lens[lens_index + sym] !== 0) {
          work[offs[lens[lens_index + sym]]++] = sym;
        }
      }
      if (type === CODES) {
        base = extra = work;
        end = 19;
      } else if (type === LENS) {
        base = lbase;
        base_index -= 257;
        extra = lext;
        extra_index -= 257;
        end = 256;
      } else {
        base = dbase;
        extra = dext;
        end = -1;
      }
      huff = 0;
      sym = 0;
      len = min;
      next = table_index;
      curr = root;
      drop = 0;
      low = -1;
      used = 1 << root;
      mask = used - 1;
      if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
        return 1;
      }
      for (; ; ) {
        here_bits = len - drop;
        if (work[sym] < end) {
          here_op = 0;
          here_val = work[sym];
        } else if (work[sym] > end) {
          here_op = extra[extra_index + work[sym]];
          here_val = base[base_index + work[sym]];
        } else {
          here_op = 32 + 64;
          here_val = 0;
        }
        incr = 1 << len - drop;
        fill = 1 << curr;
        min = fill;
        do {
          fill -= incr;
          table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
        } while (fill !== 0);
        incr = 1 << len - 1;
        while (huff & incr) {
          incr >>= 1;
        }
        if (incr !== 0) {
          huff &= incr - 1;
          huff += incr;
        } else {
          huff = 0;
        }
        sym++;
        if (--count[len] === 0) {
          if (len === max) {
            break;
          }
          len = lens[lens_index + work[sym]];
        }
        if (len > root && (huff & mask) !== low) {
          if (drop === 0) {
            drop = root;
          }
          next += min;
          curr = len - drop;
          left = 1 << curr;
          while (curr + drop < max) {
            left -= count[curr + drop];
            if (left <= 0) {
              break;
            }
            curr++;
            left <<= 1;
          }
          used += 1 << curr;
          if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
            return 1;
          }
          low = huff & mask;
          table[low] = root << 24 | curr << 16 | next - table_index | 0;
        }
      }
      if (huff !== 0) {
        table[next + huff] = len - drop << 24 | 64 << 16 | 0;
      }
      opts.bits = root;
      return 0;
    };
  }
});

// node_modules/pako/lib/zlib/inflate.js
var require_inflate = __commonJS({
  "node_modules/pako/lib/zlib/inflate.js"(exports) {
    "use strict";
    var utils = require_common();
    var adler32 = require_adler32();
    var crc322 = require_crc322();
    var inflate_fast = require_inffast();
    var inflate_table = require_inftrees();
    var CODES = 0;
    var LENS = 1;
    var DISTS = 2;
    var Z_FINISH = 4;
    var Z_BLOCK = 5;
    var Z_TREES = 6;
    var Z_OK = 0;
    var Z_STREAM_END = 1;
    var Z_NEED_DICT = 2;
    var Z_STREAM_ERROR = -2;
    var Z_DATA_ERROR = -3;
    var Z_MEM_ERROR = -4;
    var Z_BUF_ERROR = -5;
    var Z_DEFLATED = 8;
    var HEAD = 1;
    var FLAGS = 2;
    var TIME = 3;
    var OS = 4;
    var EXLEN = 5;
    var EXTRA = 6;
    var NAME = 7;
    var COMMENT = 8;
    var HCRC = 9;
    var DICTID = 10;
    var DICT = 11;
    var TYPE = 12;
    var TYPEDO = 13;
    var STORED = 14;
    var COPY_ = 15;
    var COPY = 16;
    var TABLE = 17;
    var LENLENS = 18;
    var CODELENS = 19;
    var LEN_ = 20;
    var LEN = 21;
    var LENEXT = 22;
    var DIST = 23;
    var DISTEXT = 24;
    var MATCH = 25;
    var LIT = 26;
    var CHECK = 27;
    var LENGTH = 28;
    var DONE = 29;
    var BAD = 30;
    var MEM = 31;
    var SYNC = 32;
    var ENOUGH_LENS = 852;
    var ENOUGH_DISTS = 592;
    var MAX_WBITS = 15;
    var DEF_WBITS = MAX_WBITS;
    function zswap32(q) {
      return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
    }
    function InflateState() {
      this.mode = 0;
      this.last = false;
      this.wrap = 0;
      this.havedict = false;
      this.flags = 0;
      this.dmax = 0;
      this.check = 0;
      this.total = 0;
      this.head = null;
      this.wbits = 0;
      this.wsize = 0;
      this.whave = 0;
      this.wnext = 0;
      this.window = null;
      this.hold = 0;
      this.bits = 0;
      this.length = 0;
      this.offset = 0;
      this.extra = 0;
      this.lencode = null;
      this.distcode = null;
      this.lenbits = 0;
      this.distbits = 0;
      this.ncode = 0;
      this.nlen = 0;
      this.ndist = 0;
      this.have = 0;
      this.next = null;
      this.lens = new utils.Buf16(320);
      this.work = new utils.Buf16(288);
      this.lendyn = null;
      this.distdyn = null;
      this.sane = 0;
      this.back = 0;
      this.was = 0;
    }
    function inflateResetKeep(strm) {
      var state;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR;
      }
      state = strm.state;
      strm.total_in = strm.total_out = state.total = 0;
      strm.msg = "";
      if (state.wrap) {
        strm.adler = state.wrap & 1;
      }
      state.mode = HEAD;
      state.last = 0;
      state.havedict = 0;
      state.dmax = 32768;
      state.head = null;
      state.hold = 0;
      state.bits = 0;
      state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
      state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);
      state.sane = 1;
      state.back = -1;
      return Z_OK;
    }
    function inflateReset(strm) {
      var state;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR;
      }
      state = strm.state;
      state.wsize = 0;
      state.whave = 0;
      state.wnext = 0;
      return inflateResetKeep(strm);
    }
    function inflateReset2(strm, windowBits) {
      var wrap;
      var state;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR;
      }
      state = strm.state;
      if (windowBits < 0) {
        wrap = 0;
        windowBits = -windowBits;
      } else {
        wrap = (windowBits >> 4) + 1;
        if (windowBits < 48) {
          windowBits &= 15;
        }
      }
      if (windowBits && (windowBits < 8 || windowBits > 15)) {
        return Z_STREAM_ERROR;
      }
      if (state.window !== null && state.wbits !== windowBits) {
        state.window = null;
      }
      state.wrap = wrap;
      state.wbits = windowBits;
      return inflateReset(strm);
    }
    function inflateInit2(strm, windowBits) {
      var ret;
      var state;
      if (!strm) {
        return Z_STREAM_ERROR;
      }
      state = new InflateState();
      strm.state = state;
      state.window = null;
      ret = inflateReset2(strm, windowBits);
      if (ret !== Z_OK) {
        strm.state = null;
      }
      return ret;
    }
    function inflateInit(strm) {
      return inflateInit2(strm, DEF_WBITS);
    }
    var virgin = true;
    var lenfix;
    var distfix;
    function fixedtables(state) {
      if (virgin) {
        var sym;
        lenfix = new utils.Buf32(512);
        distfix = new utils.Buf32(32);
        sym = 0;
        while (sym < 144) {
          state.lens[sym++] = 8;
        }
        while (sym < 256) {
          state.lens[sym++] = 9;
        }
        while (sym < 280) {
          state.lens[sym++] = 7;
        }
        while (sym < 288) {
          state.lens[sym++] = 8;
        }
        inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
        sym = 0;
        while (sym < 32) {
          state.lens[sym++] = 5;
        }
        inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
        virgin = false;
      }
      state.lencode = lenfix;
      state.lenbits = 9;
      state.distcode = distfix;
      state.distbits = 5;
    }
    function updatewindow(strm, src, end, copy) {
      var dist;
      var state = strm.state;
      if (state.window === null) {
        state.wsize = 1 << state.wbits;
        state.wnext = 0;
        state.whave = 0;
        state.window = new utils.Buf8(state.wsize);
      }
      if (copy >= state.wsize) {
        utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
        state.wnext = 0;
        state.whave = state.wsize;
      } else {
        dist = state.wsize - state.wnext;
        if (dist > copy) {
          dist = copy;
        }
        utils.arraySet(state.window, src, end - copy, dist, state.wnext);
        copy -= dist;
        if (copy) {
          utils.arraySet(state.window, src, end - copy, copy, 0);
          state.wnext = copy;
          state.whave = state.wsize;
        } else {
          state.wnext += dist;
          if (state.wnext === state.wsize) {
            state.wnext = 0;
          }
          if (state.whave < state.wsize) {
            state.whave += dist;
          }
        }
      }
      return 0;
    }
    function inflate2(strm, flush) {
      var state;
      var input, output;
      var next;
      var put;
      var have, left;
      var hold;
      var bits;
      var _in, _out;
      var copy;
      var from;
      var from_source;
      var here = 0;
      var here_bits, here_op, here_val;
      var last_bits, last_op, last_val;
      var len;
      var ret;
      var hbuf = new utils.Buf8(4);
      var opts;
      var n;
      var order = (
        /* permutation of code lengths */
        [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
      );
      if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
        return Z_STREAM_ERROR;
      }
      state = strm.state;
      if (state.mode === TYPE) {
        state.mode = TYPEDO;
      }
      put = strm.next_out;
      output = strm.output;
      left = strm.avail_out;
      next = strm.next_in;
      input = strm.input;
      have = strm.avail_in;
      hold = state.hold;
      bits = state.bits;
      _in = have;
      _out = left;
      ret = Z_OK;
      inf_leave:
        for (; ; ) {
          switch (state.mode) {
            case HEAD:
              if (state.wrap === 0) {
                state.mode = TYPEDO;
                break;
              }
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (state.wrap & 2 && hold === 35615) {
                state.check = 0;
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc322(state.check, hbuf, 2, 0);
                hold = 0;
                bits = 0;
                state.mode = FLAGS;
                break;
              }
              state.flags = 0;
              if (state.head) {
                state.head.done = false;
              }
              if (!(state.wrap & 1) || /* check if zlib header allowed */
              (((hold & 255) << 8) + (hold >> 8)) % 31) {
                strm.msg = "incorrect header check";
                state.mode = BAD;
                break;
              }
              if ((hold & 15) !== Z_DEFLATED) {
                strm.msg = "unknown compression method";
                state.mode = BAD;
                break;
              }
              hold >>>= 4;
              bits -= 4;
              len = (hold & 15) + 8;
              if (state.wbits === 0) {
                state.wbits = len;
              } else if (len > state.wbits) {
                strm.msg = "invalid window size";
                state.mode = BAD;
                break;
              }
              state.dmax = 1 << len;
              strm.adler = state.check = 1;
              state.mode = hold & 512 ? DICTID : TYPE;
              hold = 0;
              bits = 0;
              break;
            case FLAGS:
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.flags = hold;
              if ((state.flags & 255) !== Z_DEFLATED) {
                strm.msg = "unknown compression method";
                state.mode = BAD;
                break;
              }
              if (state.flags & 57344) {
                strm.msg = "unknown header flags set";
                state.mode = BAD;
                break;
              }
              if (state.head) {
                state.head.text = hold >> 8 & 1;
              }
              if (state.flags & 512) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc322(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
              state.mode = TIME;
            /* falls through */
            case TIME:
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (state.head) {
                state.head.time = hold;
              }
              if (state.flags & 512) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                hbuf[2] = hold >>> 16 & 255;
                hbuf[3] = hold >>> 24 & 255;
                state.check = crc322(state.check, hbuf, 4, 0);
              }
              hold = 0;
              bits = 0;
              state.mode = OS;
            /* falls through */
            case OS:
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (state.head) {
                state.head.xflags = hold & 255;
                state.head.os = hold >> 8;
              }
              if (state.flags & 512) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc322(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
              state.mode = EXLEN;
            /* falls through */
            case EXLEN:
              if (state.flags & 1024) {
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.length = hold;
                if (state.head) {
                  state.head.extra_len = hold;
                }
                if (state.flags & 512) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc322(state.check, hbuf, 2, 0);
                }
                hold = 0;
                bits = 0;
              } else if (state.head) {
                state.head.extra = null;
              }
              state.mode = EXTRA;
            /* falls through */
            case EXTRA:
              if (state.flags & 1024) {
                copy = state.length;
                if (copy > have) {
                  copy = have;
                }
                if (copy) {
                  if (state.head) {
                    len = state.head.extra_len - state.length;
                    if (!state.head.extra) {
                      state.head.extra = new Array(state.head.extra_len);
                    }
                    utils.arraySet(
                      state.head.extra,
                      input,
                      next,
                      // extra field is limited to 65536 bytes
                      // - no need for additional size check
                      copy,
                      /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                      len
                    );
                  }
                  if (state.flags & 512) {
                    state.check = crc322(state.check, input, copy, next);
                  }
                  have -= copy;
                  next += copy;
                  state.length -= copy;
                }
                if (state.length) {
                  break inf_leave;
                }
              }
              state.length = 0;
              state.mode = NAME;
            /* falls through */
            case NAME:
              if (state.flags & 2048) {
                if (have === 0) {
                  break inf_leave;
                }
                copy = 0;
                do {
                  len = input[next + copy++];
                  if (state.head && len && state.length < 65536) {
                    state.head.name += String.fromCharCode(len);
                  }
                } while (len && copy < have);
                if (state.flags & 512) {
                  state.check = crc322(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                if (len) {
                  break inf_leave;
                }
              } else if (state.head) {
                state.head.name = null;
              }
              state.length = 0;
              state.mode = COMMENT;
            /* falls through */
            case COMMENT:
              if (state.flags & 4096) {
                if (have === 0) {
                  break inf_leave;
                }
                copy = 0;
                do {
                  len = input[next + copy++];
                  if (state.head && len && state.length < 65536) {
                    state.head.comment += String.fromCharCode(len);
                  }
                } while (len && copy < have);
                if (state.flags & 512) {
                  state.check = crc322(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                if (len) {
                  break inf_leave;
                }
              } else if (state.head) {
                state.head.comment = null;
              }
              state.mode = HCRC;
            /* falls through */
            case HCRC:
              if (state.flags & 512) {
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (hold !== (state.check & 65535)) {
                  strm.msg = "header crc mismatch";
                  state.mode = BAD;
                  break;
                }
                hold = 0;
                bits = 0;
              }
              if (state.head) {
                state.head.hcrc = state.flags >> 9 & 1;
                state.head.done = true;
              }
              strm.adler = state.check = 0;
              state.mode = TYPE;
              break;
            case DICTID:
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              strm.adler = state.check = zswap32(hold);
              hold = 0;
              bits = 0;
              state.mode = DICT;
            /* falls through */
            case DICT:
              if (state.havedict === 0) {
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                return Z_NEED_DICT;
              }
              strm.adler = state.check = 1;
              state.mode = TYPE;
            /* falls through */
            case TYPE:
              if (flush === Z_BLOCK || flush === Z_TREES) {
                break inf_leave;
              }
            /* falls through */
            case TYPEDO:
              if (state.last) {
                hold >>>= bits & 7;
                bits -= bits & 7;
                state.mode = CHECK;
                break;
              }
              while (bits < 3) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.last = hold & 1;
              hold >>>= 1;
              bits -= 1;
              switch (hold & 3) {
                case 0:
                  state.mode = STORED;
                  break;
                case 1:
                  fixedtables(state);
                  state.mode = LEN_;
                  if (flush === Z_TREES) {
                    hold >>>= 2;
                    bits -= 2;
                    break inf_leave;
                  }
                  break;
                case 2:
                  state.mode = TABLE;
                  break;
                case 3:
                  strm.msg = "invalid block type";
                  state.mode = BAD;
              }
              hold >>>= 2;
              bits -= 2;
              break;
            case STORED:
              hold >>>= bits & 7;
              bits -= bits & 7;
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
                strm.msg = "invalid stored block lengths";
                state.mode = BAD;
                break;
              }
              state.length = hold & 65535;
              hold = 0;
              bits = 0;
              state.mode = COPY_;
              if (flush === Z_TREES) {
                break inf_leave;
              }
            /* falls through */
            case COPY_:
              state.mode = COPY;
            /* falls through */
            case COPY:
              copy = state.length;
              if (copy) {
                if (copy > have) {
                  copy = have;
                }
                if (copy > left) {
                  copy = left;
                }
                if (copy === 0) {
                  break inf_leave;
                }
                utils.arraySet(output, input, next, copy, put);
                have -= copy;
                next += copy;
                left -= copy;
                put += copy;
                state.length -= copy;
                break;
              }
              state.mode = TYPE;
              break;
            case TABLE:
              while (bits < 14) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.nlen = (hold & 31) + 257;
              hold >>>= 5;
              bits -= 5;
              state.ndist = (hold & 31) + 1;
              hold >>>= 5;
              bits -= 5;
              state.ncode = (hold & 15) + 4;
              hold >>>= 4;
              bits -= 4;
              if (state.nlen > 286 || state.ndist > 30) {
                strm.msg = "too many length or distance symbols";
                state.mode = BAD;
                break;
              }
              state.have = 0;
              state.mode = LENLENS;
            /* falls through */
            case LENLENS:
              while (state.have < state.ncode) {
                while (bits < 3) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.lens[order[state.have++]] = hold & 7;
                hold >>>= 3;
                bits -= 3;
              }
              while (state.have < 19) {
                state.lens[order[state.have++]] = 0;
              }
              state.lencode = state.lendyn;
              state.lenbits = 7;
              opts = { bits: state.lenbits };
              ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
              state.lenbits = opts.bits;
              if (ret) {
                strm.msg = "invalid code lengths set";
                state.mode = BAD;
                break;
              }
              state.have = 0;
              state.mode = CODELENS;
            /* falls through */
            case CODELENS:
              while (state.have < state.nlen + state.ndist) {
                for (; ; ) {
                  here = state.lencode[hold & (1 << state.lenbits) - 1];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (here_val < 16) {
                  hold >>>= here_bits;
                  bits -= here_bits;
                  state.lens[state.have++] = here_val;
                } else {
                  if (here_val === 16) {
                    n = here_bits + 2;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    hold >>>= here_bits;
                    bits -= here_bits;
                    if (state.have === 0) {
                      strm.msg = "invalid bit length repeat";
                      state.mode = BAD;
                      break;
                    }
                    len = state.lens[state.have - 1];
                    copy = 3 + (hold & 3);
                    hold >>>= 2;
                    bits -= 2;
                  } else if (here_val === 17) {
                    n = here_bits + 3;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    hold >>>= here_bits;
                    bits -= here_bits;
                    len = 0;
                    copy = 3 + (hold & 7);
                    hold >>>= 3;
                    bits -= 3;
                  } else {
                    n = here_bits + 7;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    hold >>>= here_bits;
                    bits -= here_bits;
                    len = 0;
                    copy = 11 + (hold & 127);
                    hold >>>= 7;
                    bits -= 7;
                  }
                  if (state.have + copy > state.nlen + state.ndist) {
                    strm.msg = "invalid bit length repeat";
                    state.mode = BAD;
                    break;
                  }
                  while (copy--) {
                    state.lens[state.have++] = len;
                  }
                }
              }
              if (state.mode === BAD) {
                break;
              }
              if (state.lens[256] === 0) {
                strm.msg = "invalid code -- missing end-of-block";
                state.mode = BAD;
                break;
              }
              state.lenbits = 9;
              opts = { bits: state.lenbits };
              ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
              state.lenbits = opts.bits;
              if (ret) {
                strm.msg = "invalid literal/lengths set";
                state.mode = BAD;
                break;
              }
              state.distbits = 6;
              state.distcode = state.distdyn;
              opts = { bits: state.distbits };
              ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
              state.distbits = opts.bits;
              if (ret) {
                strm.msg = "invalid distances set";
                state.mode = BAD;
                break;
              }
              state.mode = LEN_;
              if (flush === Z_TREES) {
                break inf_leave;
              }
            /* falls through */
            case LEN_:
              state.mode = LEN;
            /* falls through */
            case LEN:
              if (have >= 6 && left >= 258) {
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                inflate_fast(strm, _out);
                put = strm.next_out;
                output = strm.output;
                left = strm.avail_out;
                next = strm.next_in;
                input = strm.input;
                have = strm.avail_in;
                hold = state.hold;
                bits = state.bits;
                if (state.mode === TYPE) {
                  state.back = -1;
                }
                break;
              }
              state.back = 0;
              for (; ; ) {
                here = state.lencode[hold & (1 << state.lenbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (here_op && (here_op & 240) === 0) {
                last_bits = here_bits;
                last_op = here_op;
                last_val = here_val;
                for (; ; ) {
                  here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (last_bits + here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= last_bits;
                bits -= last_bits;
                state.back += last_bits;
              }
              hold >>>= here_bits;
              bits -= here_bits;
              state.back += here_bits;
              state.length = here_val;
              if (here_op === 0) {
                state.mode = LIT;
                break;
              }
              if (here_op & 32) {
                state.back = -1;
                state.mode = TYPE;
                break;
              }
              if (here_op & 64) {
                strm.msg = "invalid literal/length code";
                state.mode = BAD;
                break;
              }
              state.extra = here_op & 15;
              state.mode = LENEXT;
            /* falls through */
            case LENEXT:
              if (state.extra) {
                n = state.extra;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.length += hold & (1 << state.extra) - 1;
                hold >>>= state.extra;
                bits -= state.extra;
                state.back += state.extra;
              }
              state.was = state.length;
              state.mode = DIST;
            /* falls through */
            case DIST:
              for (; ; ) {
                here = state.distcode[hold & (1 << state.distbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if ((here_op & 240) === 0) {
                last_bits = here_bits;
                last_op = here_op;
                last_val = here_val;
                for (; ; ) {
                  here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (last_bits + here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= last_bits;
                bits -= last_bits;
                state.back += last_bits;
              }
              hold >>>= here_bits;
              bits -= here_bits;
              state.back += here_bits;
              if (here_op & 64) {
                strm.msg = "invalid distance code";
                state.mode = BAD;
                break;
              }
              state.offset = here_val;
              state.extra = here_op & 15;
              state.mode = DISTEXT;
            /* falls through */
            case DISTEXT:
              if (state.extra) {
                n = state.extra;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.offset += hold & (1 << state.extra) - 1;
                hold >>>= state.extra;
                bits -= state.extra;
                state.back += state.extra;
              }
              if (state.offset > state.dmax) {
                strm.msg = "invalid distance too far back";
                state.mode = BAD;
                break;
              }
              state.mode = MATCH;
            /* falls through */
            case MATCH:
              if (left === 0) {
                break inf_leave;
              }
              copy = _out - left;
              if (state.offset > copy) {
                copy = state.offset - copy;
                if (copy > state.whave) {
                  if (state.sane) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD;
                    break;
                  }
                }
                if (copy > state.wnext) {
                  copy -= state.wnext;
                  from = state.wsize - copy;
                } else {
                  from = state.wnext - copy;
                }
                if (copy > state.length) {
                  copy = state.length;
                }
                from_source = state.window;
              } else {
                from_source = output;
                from = put - state.offset;
                copy = state.length;
              }
              if (copy > left) {
                copy = left;
              }
              left -= copy;
              state.length -= copy;
              do {
                output[put++] = from_source[from++];
              } while (--copy);
              if (state.length === 0) {
                state.mode = LEN;
              }
              break;
            case LIT:
              if (left === 0) {
                break inf_leave;
              }
              output[put++] = state.length;
              left--;
              state.mode = LEN;
              break;
            case CHECK:
              if (state.wrap) {
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold |= input[next++] << bits;
                  bits += 8;
                }
                _out -= left;
                strm.total_out += _out;
                state.total += _out;
                if (_out) {
                  strm.adler = state.check = /*UPDATE(state.check, put - _out, _out);*/
                  state.flags ? crc322(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
                }
                _out = left;
                if ((state.flags ? hold : zswap32(hold)) !== state.check) {
                  strm.msg = "incorrect data check";
                  state.mode = BAD;
                  break;
                }
                hold = 0;
                bits = 0;
              }
              state.mode = LENGTH;
            /* falls through */
            case LENGTH:
              if (state.wrap && state.flags) {
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (hold !== (state.total & 4294967295)) {
                  strm.msg = "incorrect length check";
                  state.mode = BAD;
                  break;
                }
                hold = 0;
                bits = 0;
              }
              state.mode = DONE;
            /* falls through */
            case DONE:
              ret = Z_STREAM_END;
              break inf_leave;
            case BAD:
              ret = Z_DATA_ERROR;
              break inf_leave;
            case MEM:
              return Z_MEM_ERROR;
            case SYNC:
            /* falls through */
            default:
              return Z_STREAM_ERROR;
          }
        }
      strm.next_out = put;
      strm.avail_out = left;
      strm.next_in = next;
      strm.avail_in = have;
      state.hold = hold;
      state.bits = bits;
      if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) {
        if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
          state.mode = MEM;
          return Z_MEM_ERROR;
        }
      }
      _in -= strm.avail_in;
      _out -= strm.avail_out;
      strm.total_in += _in;
      strm.total_out += _out;
      state.total += _out;
      if (state.wrap && _out) {
        strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
        state.flags ? crc322(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
      }
      strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
      if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
        ret = Z_BUF_ERROR;
      }
      return ret;
    }
    function inflateEnd(strm) {
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR;
      }
      var state = strm.state;
      if (state.window) {
        state.window = null;
      }
      strm.state = null;
      return Z_OK;
    }
    function inflateGetHeader(strm, head) {
      var state;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR;
      }
      state = strm.state;
      if ((state.wrap & 2) === 0) {
        return Z_STREAM_ERROR;
      }
      state.head = head;
      head.done = false;
      return Z_OK;
    }
    function inflateSetDictionary(strm, dictionary) {
      var dictLength = dictionary.length;
      var state;
      var dictid;
      var ret;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR;
      }
      state = strm.state;
      if (state.wrap !== 0 && state.mode !== DICT) {
        return Z_STREAM_ERROR;
      }
      if (state.mode === DICT) {
        dictid = 1;
        dictid = adler32(dictid, dictionary, dictLength, 0);
        if (dictid !== state.check) {
          return Z_DATA_ERROR;
        }
      }
      ret = updatewindow(strm, dictionary, dictLength, dictLength);
      if (ret) {
        state.mode = MEM;
        return Z_MEM_ERROR;
      }
      state.havedict = 1;
      return Z_OK;
    }
    exports.inflateReset = inflateReset;
    exports.inflateReset2 = inflateReset2;
    exports.inflateResetKeep = inflateResetKeep;
    exports.inflateInit = inflateInit;
    exports.inflateInit2 = inflateInit2;
    exports.inflate = inflate2;
    exports.inflateEnd = inflateEnd;
    exports.inflateGetHeader = inflateGetHeader;
    exports.inflateSetDictionary = inflateSetDictionary;
    exports.inflateInfo = "pako inflate (from Nodeca project)";
  }
});

// node_modules/pako/lib/zlib/constants.js
var require_constants = __commonJS({
  "node_modules/pako/lib/zlib/constants.js"(exports, module) {
    "use strict";
    module.exports = {
      /* Allowed flush values; see deflate() and inflate() below for details */
      Z_NO_FLUSH: 0,
      Z_PARTIAL_FLUSH: 1,
      Z_SYNC_FLUSH: 2,
      Z_FULL_FLUSH: 3,
      Z_FINISH: 4,
      Z_BLOCK: 5,
      Z_TREES: 6,
      /* Return codes for the compression/decompression functions. Negative values
      * are errors, positive values are used for special but normal events.
      */
      Z_OK: 0,
      Z_STREAM_END: 1,
      Z_NEED_DICT: 2,
      Z_ERRNO: -1,
      Z_STREAM_ERROR: -2,
      Z_DATA_ERROR: -3,
      //Z_MEM_ERROR:     -4,
      Z_BUF_ERROR: -5,
      //Z_VERSION_ERROR: -6,
      /* compression levels */
      Z_NO_COMPRESSION: 0,
      Z_BEST_SPEED: 1,
      Z_BEST_COMPRESSION: 9,
      Z_DEFAULT_COMPRESSION: -1,
      Z_FILTERED: 1,
      Z_HUFFMAN_ONLY: 2,
      Z_RLE: 3,
      Z_FIXED: 4,
      Z_DEFAULT_STRATEGY: 0,
      /* Possible values of the data_type field (though see inflate()) */
      Z_BINARY: 0,
      Z_TEXT: 1,
      //Z_ASCII:                1, // = Z_TEXT (deprecated)
      Z_UNKNOWN: 2,
      /* The deflate compression method */
      Z_DEFLATED: 8
      //Z_NULL:                 null // Use -1 or null inline, depending on var type
    };
  }
});

// node_modules/pako/lib/zlib/gzheader.js
var require_gzheader = __commonJS({
  "node_modules/pako/lib/zlib/gzheader.js"(exports, module) {
    "use strict";
    function GZheader() {
      this.text = 0;
      this.time = 0;
      this.xflags = 0;
      this.os = 0;
      this.extra = null;
      this.extra_len = 0;
      this.name = "";
      this.comment = "";
      this.hcrc = 0;
      this.done = false;
    }
    module.exports = GZheader;
  }
});

// node_modules/pako/lib/inflate.js
var require_inflate2 = __commonJS({
  "node_modules/pako/lib/inflate.js"(exports) {
    "use strict";
    var zlib_inflate = require_inflate();
    var utils = require_common();
    var strings = require_strings();
    var c = require_constants();
    var msg = require_messages();
    var ZStream = require_zstream();
    var GZheader = require_gzheader();
    var toString = Object.prototype.toString;
    function Inflate(options) {
      if (!(this instanceof Inflate)) return new Inflate(options);
      this.options = utils.assign({
        chunkSize: 16384,
        windowBits: 0,
        to: ""
      }, options || {});
      var opt = this.options;
      if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
        opt.windowBits = -opt.windowBits;
        if (opt.windowBits === 0) {
          opt.windowBits = -15;
        }
      }
      if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
        opt.windowBits += 32;
      }
      if (opt.windowBits > 15 && opt.windowBits < 48) {
        if ((opt.windowBits & 15) === 0) {
          opt.windowBits |= 15;
        }
      }
      this.err = 0;
      this.msg = "";
      this.ended = false;
      this.chunks = [];
      this.strm = new ZStream();
      this.strm.avail_out = 0;
      var status2 = zlib_inflate.inflateInit2(
        this.strm,
        opt.windowBits
      );
      if (status2 !== c.Z_OK) {
        throw new Error(msg[status2]);
      }
      this.header = new GZheader();
      zlib_inflate.inflateGetHeader(this.strm, this.header);
      if (opt.dictionary) {
        if (typeof opt.dictionary === "string") {
          opt.dictionary = strings.string2buf(opt.dictionary);
        } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
          opt.dictionary = new Uint8Array(opt.dictionary);
        }
        if (opt.raw) {
          status2 = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
          if (status2 !== c.Z_OK) {
            throw new Error(msg[status2]);
          }
        }
      }
    }
    Inflate.prototype.push = function(data, mode) {
      var strm = this.strm;
      var chunkSize = this.options.chunkSize;
      var dictionary = this.options.dictionary;
      var status2, _mode;
      var next_out_utf8, tail, utf8str;
      var allowBufError = false;
      if (this.ended) {
        return false;
      }
      _mode = mode === ~~mode ? mode : mode === true ? c.Z_FINISH : c.Z_NO_FLUSH;
      if (typeof data === "string") {
        strm.input = strings.binstring2buf(data);
      } else if (toString.call(data) === "[object ArrayBuffer]") {
        strm.input = new Uint8Array(data);
      } else {
        strm.input = data;
      }
      strm.next_in = 0;
      strm.avail_in = strm.input.length;
      do {
        if (strm.avail_out === 0) {
          strm.output = new utils.Buf8(chunkSize);
          strm.next_out = 0;
          strm.avail_out = chunkSize;
        }
        status2 = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);
        if (status2 === c.Z_NEED_DICT && dictionary) {
          status2 = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
        }
        if (status2 === c.Z_BUF_ERROR && allowBufError === true) {
          status2 = c.Z_OK;
          allowBufError = false;
        }
        if (status2 !== c.Z_STREAM_END && status2 !== c.Z_OK) {
          this.onEnd(status2);
          this.ended = true;
          return false;
        }
        if (strm.next_out) {
          if (strm.avail_out === 0 || status2 === c.Z_STREAM_END || strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH)) {
            if (this.options.to === "string") {
              next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
              tail = strm.next_out - next_out_utf8;
              utf8str = strings.buf2string(strm.output, next_out_utf8);
              strm.next_out = tail;
              strm.avail_out = chunkSize - tail;
              if (tail) {
                utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
              }
              this.onData(utf8str);
            } else {
              this.onData(utils.shrinkBuf(strm.output, strm.next_out));
            }
          }
        }
        if (strm.avail_in === 0 && strm.avail_out === 0) {
          allowBufError = true;
        }
      } while ((strm.avail_in > 0 || strm.avail_out === 0) && status2 !== c.Z_STREAM_END);
      if (status2 === c.Z_STREAM_END) {
        _mode = c.Z_FINISH;
      }
      if (_mode === c.Z_FINISH) {
        status2 = zlib_inflate.inflateEnd(this.strm);
        this.onEnd(status2);
        this.ended = true;
        return status2 === c.Z_OK;
      }
      if (_mode === c.Z_SYNC_FLUSH) {
        this.onEnd(c.Z_OK);
        strm.avail_out = 0;
        return true;
      }
      return true;
    };
    Inflate.prototype.onData = function(chunk) {
      this.chunks.push(chunk);
    };
    Inflate.prototype.onEnd = function(status2) {
      if (status2 === c.Z_OK) {
        if (this.options.to === "string") {
          this.result = this.chunks.join("");
        } else {
          this.result = utils.flattenChunks(this.chunks);
        }
      }
      this.chunks = [];
      this.err = status2;
      this.msg = this.strm.msg;
    };
    function inflate2(input, options) {
      var inflator = new Inflate(options);
      inflator.push(input, true);
      if (inflator.err) {
        throw inflator.msg || msg[inflator.err];
      }
      return inflator.result;
    }
    function inflateRaw(input, options) {
      options = options || {};
      options.raw = true;
      return inflate2(input, options);
    }
    exports.Inflate = Inflate;
    exports.inflate = inflate2;
    exports.inflateRaw = inflateRaw;
    exports.ungzip = inflate2;
  }
});

// node_modules/pako/index.js
var require_pako = __commonJS({
  "node_modules/pako/index.js"(exports, module) {
    "use strict";
    var assign = require_common().assign;
    var deflate2 = require_deflate2();
    var inflate2 = require_inflate2();
    var constants = require_constants();
    var pako2 = {};
    assign(pako2, deflate2, inflate2, constants);
    module.exports = pako2;
  }
});

// node_modules/pify/index.js
var require_pify = __commonJS({
  "node_modules/pify/index.js"(exports, module) {
    "use strict";
    var processFn = (fn, options) => function(...args) {
      const P = options.promiseModule;
      return new P((resolve, reject) => {
        if (options.multiArgs) {
          args.push((...result) => {
            if (options.errorFirst) {
              if (result[0]) {
                reject(result);
              } else {
                result.shift();
                resolve(result);
              }
            } else {
              resolve(result);
            }
          });
        } else if (options.errorFirst) {
          args.push((error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        } else {
          args.push(resolve);
        }
        fn.apply(this, args);
      });
    };
    module.exports = (input, options) => {
      options = Object.assign({
        exclude: [/.+(Sync|Stream)$/],
        errorFirst: true,
        promiseModule: Promise
      }, options);
      const objType = typeof input;
      if (!(input !== null && (objType === "object" || objType === "function"))) {
        throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? "null" : objType}\``);
      }
      const filter = (key) => {
        const match = (pattern) => typeof pattern === "string" ? key === pattern : pattern.test(key);
        return options.include ? options.include.some(match) : !options.exclude.some(match);
      };
      let ret;
      if (objType === "function") {
        ret = function(...args) {
          return options.excludeMain ? input(...args) : processFn(input, options).apply(this, args);
        };
      } else {
        ret = Object.create(Object.getPrototypeOf(input));
      }
      for (const key in input) {
        const property = input[key];
        ret[key] = typeof property === "function" && filter(key) ? processFn(property, options) : property;
      }
      return ret;
    };
  }
});

// node_modules/ignore/index.js
var require_ignore = __commonJS({
  "node_modules/ignore/index.js"(exports, module) {
    function makeArray(subject) {
      return Array.isArray(subject) ? subject : [subject];
    }
    var EMPTY = "";
    var SPACE = " ";
    var ESCAPE = "\\";
    var REGEX_TEST_BLANK_LINE = /^\s+$/;
    var REGEX_INVALID_TRAILING_BACKSLASH = /(?:[^\\]|^)\\$/;
    var REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/;
    var REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/;
    var REGEX_SPLITALL_CRLF = /\r?\n/g;
    var REGEX_TEST_INVALID_PATH = /^\.*\/|^\.+$/;
    var SLASH = "/";
    var TMP_KEY_IGNORE = "node-ignore";
    if (typeof Symbol !== "undefined") {
      TMP_KEY_IGNORE = /* @__PURE__ */ Symbol.for("node-ignore");
    }
    var KEY_IGNORE = TMP_KEY_IGNORE;
    var define2 = (object, key, value) => Object.defineProperty(object, key, { value });
    var REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g;
    var RETURN_FALSE = () => false;
    var sanitizeRange = (range2) => range2.replace(
      REGEX_REGEXP_RANGE,
      (match, from, to) => from.charCodeAt(0) <= to.charCodeAt(0) ? match : EMPTY
    );
    var cleanRangeBackSlash = (slashes) => {
      const { length } = slashes;
      return slashes.slice(0, length - length % 2);
    };
    var REPLACERS = [
      [
        // remove BOM
        // TODO:
        // Other similar zero-width characters?
        /^\uFEFF/,
        () => EMPTY
      ],
      // > Trailing spaces are ignored unless they are quoted with backslash ("\")
      [
        // (a\ ) -> (a )
        // (a  ) -> (a)
        // (a ) -> (a)
        // (a \ ) -> (a  )
        /((?:\\\\)*?)(\\?\s+)$/,
        (_, m1, m2) => m1 + (m2.indexOf("\\") === 0 ? SPACE : EMPTY)
      ],
      // replace (\ ) with ' '
      // (\ ) -> ' '
      // (\\ ) -> '\\ '
      // (\\\ ) -> '\\ '
      [
        /(\\+?)\s/g,
        (_, m1) => {
          const { length } = m1;
          return m1.slice(0, length - length % 2) + SPACE;
        }
      ],
      // Escape metacharacters
      // which is written down by users but means special for regular expressions.
      // > There are 12 characters with special meanings:
      // > - the backslash \,
      // > - the caret ^,
      // > - the dollar sign $,
      // > - the period or dot .,
      // > - the vertical bar or pipe symbol |,
      // > - the question mark ?,
      // > - the asterisk or star *,
      // > - the plus sign +,
      // > - the opening parenthesis (,
      // > - the closing parenthesis ),
      // > - and the opening square bracket [,
      // > - the opening curly brace {,
      // > These special characters are often called "metacharacters".
      [
        /[\\$.|*+(){^]/g,
        (match) => `\\${match}`
      ],
      [
        // > a question mark (?) matches a single character
        /(?!\\)\?/g,
        () => "[^/]"
      ],
      // leading slash
      [
        // > A leading slash matches the beginning of the pathname.
        // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
        // A leading slash matches the beginning of the pathname
        /^\//,
        () => "^"
      ],
      // replace special metacharacter slash after the leading slash
      [
        /\//g,
        () => "\\/"
      ],
      [
        // > A leading "**" followed by a slash means match in all directories.
        // > For example, "**/foo" matches file or directory "foo" anywhere,
        // > the same as pattern "foo".
        // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
        // >   under directory "foo".
        // Notice that the '*'s have been replaced as '\\*'
        /^\^*\\\*\\\*\\\//,
        // '**/foo' <-> 'foo'
        () => "^(?:.*\\/)?"
      ],
      // starting
      [
        // there will be no leading '/'
        //   (which has been replaced by section "leading slash")
        // If starts with '**', adding a '^' to the regular expression also works
        /^(?=[^^])/,
        function startingReplacer() {
          return !/\/(?!$)/.test(this) ? "(?:^|\\/)" : "^";
        }
      ],
      // two globstars
      [
        // Use lookahead assertions so that we could match more than one `'/**'`
        /\\\/\\\*\\\*(?=\\\/|$)/g,
        // Zero, one or several directories
        // should not use '*', or it will be replaced by the next replacer
        // Check if it is not the last `'/**'`
        (_, index3, str) => index3 + 6 < str.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
      ],
      // normal intermediate wildcards
      [
        // Never replace escaped '*'
        // ignore rule '\*' will match the path '*'
        // 'abc.*/' -> go
        // 'abc.*'  -> skip this rule,
        //    coz trailing single wildcard will be handed by [trailing wildcard]
        /(^|[^\\]+)(\\\*)+(?=.+)/g,
        // '*.js' matches '.js'
        // '*.js' doesn't match 'abc'
        (_, p1, p2) => {
          const unescaped = p2.replace(/\\\*/g, "[^\\/]*");
          return p1 + unescaped;
        }
      ],
      [
        // unescape, revert step 3 except for back slash
        // For example, if a user escape a '\\*',
        // after step 3, the result will be '\\\\\\*'
        /\\\\\\(?=[$.|*+(){^])/g,
        () => ESCAPE
      ],
      [
        // '\\\\' -> '\\'
        /\\\\/g,
        () => ESCAPE
      ],
      [
        // > The range notation, e.g. [a-zA-Z],
        // > can be used to match one of the characters in a range.
        // `\` is escaped by step 3
        /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
        (match, leadEscape, range2, endEscape, close) => leadEscape === ESCAPE ? `\\[${range2}${cleanRangeBackSlash(endEscape)}${close}` : close === "]" ? endEscape.length % 2 === 0 ? `[${sanitizeRange(range2)}${endEscape}]` : "[]" : "[]"
      ],
      // ending
      [
        // 'js' will not match 'js.'
        // 'ab' will not match 'abc'
        /(?:[^*])$/,
        // WTF!
        // https://git-scm.com/docs/gitignore
        // changes in [2.22.1](https://git-scm.com/docs/gitignore/2.22.1)
        // which re-fixes #24, #38
        // > If there is a separator at the end of the pattern then the pattern
        // > will only match directories, otherwise the pattern can match both
        // > files and directories.
        // 'js*' will not match 'a.js'
        // 'js/' will not match 'a.js'
        // 'js' will match 'a.js' and 'a.js/'
        (match) => /\/$/.test(match) ? `${match}$` : `${match}(?=$|\\/$)`
      ],
      // trailing wildcard
      [
        /(\^|\\\/)?\\\*$/,
        (_, p1) => {
          const prefix = p1 ? `${p1}[^/]+` : "[^/]*";
          return `${prefix}(?=$|\\/$)`;
        }
      ]
    ];
    var regexCache = /* @__PURE__ */ Object.create(null);
    var makeRegex = (pattern, ignoreCase) => {
      let source = regexCache[pattern];
      if (!source) {
        source = REPLACERS.reduce(
          (prev, [matcher, replacer]) => prev.replace(matcher, replacer.bind(pattern)),
          pattern
        );
        regexCache[pattern] = source;
      }
      return ignoreCase ? new RegExp(source, "i") : new RegExp(source);
    };
    var isString = (subject) => typeof subject === "string";
    var checkPattern = (pattern) => pattern && isString(pattern) && !REGEX_TEST_BLANK_LINE.test(pattern) && !REGEX_INVALID_TRAILING_BACKSLASH.test(pattern) && pattern.indexOf("#") !== 0;
    var splitPattern = (pattern) => pattern.split(REGEX_SPLITALL_CRLF);
    var IgnoreRule = class {
      constructor(origin, pattern, negative, regex) {
        this.origin = origin;
        this.pattern = pattern;
        this.negative = negative;
        this.regex = regex;
      }
    };
    var createRule = (pattern, ignoreCase) => {
      const origin = pattern;
      let negative = false;
      if (pattern.indexOf("!") === 0) {
        negative = true;
        pattern = pattern.substr(1);
      }
      pattern = pattern.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
      const regex = makeRegex(pattern, ignoreCase);
      return new IgnoreRule(
        origin,
        pattern,
        negative,
        regex
      );
    };
    var throwError = (message, Ctor) => {
      throw new Ctor(message);
    };
    var checkPath = (path, originalPath, doThrow) => {
      if (!isString(path)) {
        return doThrow(
          `path must be a string, but got \`${originalPath}\``,
          TypeError
        );
      }
      if (!path) {
        return doThrow(`path must not be empty`, TypeError);
      }
      if (checkPath.isNotRelative(path)) {
        const r = "`path.relative()`d";
        return doThrow(
          `path should be a ${r} string, but got "${originalPath}"`,
          RangeError
        );
      }
      return true;
    };
    var isNotRelative = (path) => REGEX_TEST_INVALID_PATH.test(path);
    checkPath.isNotRelative = isNotRelative;
    checkPath.convert = (p) => p;
    var Ignore = class {
      constructor({
        ignorecase = true,
        ignoreCase = ignorecase,
        allowRelativePaths = false
      } = {}) {
        define2(this, KEY_IGNORE, true);
        this._rules = [];
        this._ignoreCase = ignoreCase;
        this._allowRelativePaths = allowRelativePaths;
        this._initCache();
      }
      _initCache() {
        this._ignoreCache = /* @__PURE__ */ Object.create(null);
        this._testCache = /* @__PURE__ */ Object.create(null);
      }
      _addPattern(pattern) {
        if (pattern && pattern[KEY_IGNORE]) {
          this._rules = this._rules.concat(pattern._rules);
          this._added = true;
          return;
        }
        if (checkPattern(pattern)) {
          const rule = createRule(pattern, this._ignoreCase);
          this._added = true;
          this._rules.push(rule);
        }
      }
      // @param {Array<string> | string | Ignore} pattern
      add(pattern) {
        this._added = false;
        makeArray(
          isString(pattern) ? splitPattern(pattern) : pattern
        ).forEach(this._addPattern, this);
        if (this._added) {
          this._initCache();
        }
        return this;
      }
      // legacy
      addPattern(pattern) {
        return this.add(pattern);
      }
      //          |           ignored : unignored
      // negative |   0:0   |   0:1   |   1:0   |   1:1
      // -------- | ------- | ------- | ------- | --------
      //     0    |  TEST   |  TEST   |  SKIP   |    X
      //     1    |  TESTIF |  SKIP   |  TEST   |    X
      // - SKIP: always skip
      // - TEST: always test
      // - TESTIF: only test if checkUnignored
      // - X: that never happen
      // @param {boolean} whether should check if the path is unignored,
      //   setting `checkUnignored` to `false` could reduce additional
      //   path matching.
      // @returns {TestResult} true if a file is ignored
      _testOne(path, checkUnignored) {
        let ignored = false;
        let unignored = false;
        this._rules.forEach((rule) => {
          const { negative } = rule;
          if (unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored) {
            return;
          }
          const matched = rule.regex.test(path);
          if (matched) {
            ignored = !negative;
            unignored = negative;
          }
        });
        return {
          ignored,
          unignored
        };
      }
      // @returns {TestResult}
      _test(originalPath, cache, checkUnignored, slices) {
        const path = originalPath && checkPath.convert(originalPath);
        checkPath(
          path,
          originalPath,
          this._allowRelativePaths ? RETURN_FALSE : throwError
        );
        return this._t(path, cache, checkUnignored, slices);
      }
      _t(path, cache, checkUnignored, slices) {
        if (path in cache) {
          return cache[path];
        }
        if (!slices) {
          slices = path.split(SLASH);
        }
        slices.pop();
        if (!slices.length) {
          return cache[path] = this._testOne(path, checkUnignored);
        }
        const parent = this._t(
          slices.join(SLASH) + SLASH,
          cache,
          checkUnignored,
          slices
        );
        return cache[path] = parent.ignored ? parent : this._testOne(path, checkUnignored);
      }
      ignores(path) {
        return this._test(path, this._ignoreCache, false).ignored;
      }
      createFilter() {
        return (path) => !this.ignores(path);
      }
      filter(paths) {
        return makeArray(paths).filter(this.createFilter());
      }
      // @returns {TestResult}
      test(path) {
        return this._test(path, this._testCache, true);
      }
    };
    var factory = (options) => new Ignore(options);
    var isPathValid = (path) => checkPath(path && checkPath.convert(path), path, RETURN_FALSE);
    factory.isPathValid = isPathValid;
    factory.default = factory;
    module.exports = factory;
    if (
      // Detect `process` so that it can run in browsers.
      typeof process !== "undefined" && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === "win32")
    ) {
      const makePosix = (str) => /^\\\\\?\\/.test(str) || /["<>|\u0000-\u001F]+/u.test(str) ? str : str.replace(/\\/g, "/");
      checkPath.convert = makePosix;
      const REGIX_IS_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
      checkPath.isNotRelative = (path) => REGIX_IS_WINDOWS_PATH_ABSOLUTE.test(path) || isNotRelative(path);
    }
  }
});

// node_modules/clean-git-ref/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/clean-git-ref/lib/index.js"(exports, module) {
    "use strict";
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function replaceAll(str, search, replacement) {
      search = search instanceof RegExp ? search : new RegExp(escapeRegExp(search), "g");
      return str.replace(search, replacement);
    }
    var CleanGitRef = {
      clean: function clean(value) {
        if (typeof value !== "string") {
          throw new Error("Expected a string, received: " + value);
        }
        value = replaceAll(value, "./", "/");
        value = replaceAll(value, "..", ".");
        value = replaceAll(value, " ", "-");
        value = replaceAll(value, /^[~^:?*\\\-]/g, "");
        value = replaceAll(value, /[~^:?*\\]/g, "-");
        value = replaceAll(value, /[~^:?*\\\-]$/g, "");
        value = replaceAll(value, "@{", "-");
        value = replaceAll(value, /\.$/g, "");
        value = replaceAll(value, /\/$/g, "");
        value = replaceAll(value, /\.lock$/g, "");
        return value;
      }
    };
    module.exports = CleanGitRef;
  }
});

// node_modules/diff3/onp.js
var require_onp = __commonJS({
  "node_modules/diff3/onp.js"(exports, module) {
    module.exports = function(a_, b_) {
      var a = a_, b = b_, m = a.length, n = b.length, reverse = false, ed = null, offset = m + 1, path = [], pathposi = [], ses = [], lcs = "", SES_DELETE = -1, SES_COMMON = 0, SES_ADD = 1;
      var tmp1, tmp2;
      var init3 = function() {
        if (m >= n) {
          tmp1 = a;
          tmp2 = m;
          a = b;
          b = tmp1;
          m = n;
          n = tmp2;
          reverse = true;
          offset = m + 1;
        }
      };
      var P = function(x, y, k) {
        return {
          "x": x,
          "y": y,
          "k": k
        };
      };
      var seselem = function(elem, t) {
        return {
          "elem": elem,
          "t": t
        };
      };
      var snake = function(k, p, pp) {
        var r, x, y;
        if (p > pp) {
          r = path[k - 1 + offset];
        } else {
          r = path[k + 1 + offset];
        }
        y = Math.max(p, pp);
        x = y - k;
        while (x < m && y < n && a[x] === b[y]) {
          ++x;
          ++y;
        }
        path[k + offset] = pathposi.length;
        pathposi[pathposi.length] = new P(x, y, r);
        return y;
      };
      var recordseq = function(epc) {
        var x_idx, y_idx, px_idx, py_idx, i;
        x_idx = y_idx = 1;
        px_idx = py_idx = 0;
        for (i = epc.length - 1; i >= 0; --i) {
          while (px_idx < epc[i].x || py_idx < epc[i].y) {
            if (epc[i].y - epc[i].x > py_idx - px_idx) {
              if (reverse) {
                ses[ses.length] = new seselem(b[py_idx], SES_DELETE);
              } else {
                ses[ses.length] = new seselem(b[py_idx], SES_ADD);
              }
              ++y_idx;
              ++py_idx;
            } else if (epc[i].y - epc[i].x < py_idx - px_idx) {
              if (reverse) {
                ses[ses.length] = new seselem(a[px_idx], SES_ADD);
              } else {
                ses[ses.length] = new seselem(a[px_idx], SES_DELETE);
              }
              ++x_idx;
              ++px_idx;
            } else {
              ses[ses.length] = new seselem(a[px_idx], SES_COMMON);
              lcs += a[px_idx];
              ++x_idx;
              ++y_idx;
              ++px_idx;
              ++py_idx;
            }
          }
        }
      };
      init3();
      return {
        SES_DELETE: -1,
        SES_COMMON: 0,
        SES_ADD: 1,
        editdistance: function() {
          return ed;
        },
        getlcs: function() {
          return lcs;
        },
        getses: function() {
          return ses;
        },
        compose: function() {
          var delta, size, fp, p, r, epc, i, k;
          delta = n - m;
          size = m + n + 3;
          fp = {};
          for (i = 0; i < size; ++i) {
            fp[i] = -1;
            path[i] = -1;
          }
          p = -1;
          do {
            ++p;
            for (k = -p; k <= delta - 1; ++k) {
              fp[k + offset] = snake(k, fp[k - 1 + offset] + 1, fp[k + 1 + offset]);
            }
            for (k = delta + p; k >= delta + 1; --k) {
              fp[k + offset] = snake(k, fp[k - 1 + offset] + 1, fp[k + 1 + offset]);
            }
            fp[delta + offset] = snake(delta, fp[delta - 1 + offset] + 1, fp[delta + 1 + offset]);
          } while (fp[delta + offset] !== n);
          ed = delta + 2 * p;
          r = path[delta + offset];
          epc = [];
          while (r !== -1) {
            epc[epc.length] = new P(pathposi[r].x, pathposi[r].y, null);
            r = pathposi[r].k;
          }
          recordseq(epc);
        }
      };
    };
  }
});

// node_modules/diff3/diff3.js
var require_diff3 = __commonJS({
  "node_modules/diff3/diff3.js"(exports, module) {
    var onp = require_onp();
    function longestCommonSubsequence(file1, file2) {
      var diff = new onp(file1, file2);
      diff.compose();
      var ses = diff.getses();
      var root;
      var prev;
      var file1RevIdx = file1.length - 1, file2RevIdx = file2.length - 1;
      for (var i = ses.length - 1; i >= 0; --i) {
        if (ses[i].t === diff.SES_COMMON) {
          if (prev) {
            prev.chain = {
              file1index: file1RevIdx,
              file2index: file2RevIdx,
              chain: null
            };
            prev = prev.chain;
          } else {
            root = {
              file1index: file1RevIdx,
              file2index: file2RevIdx,
              chain: null
            };
            prev = root;
          }
          file1RevIdx--;
          file2RevIdx--;
        } else if (ses[i].t === diff.SES_DELETE) {
          file1RevIdx--;
        } else if (ses[i].t === diff.SES_ADD) {
          file2RevIdx--;
        }
      }
      var tail = {
        file1index: -1,
        file2index: -1,
        chain: null
      };
      if (!prev) {
        return tail;
      }
      prev.chain = tail;
      return root;
    }
    function diffIndices(file1, file2) {
      var result = [];
      var tail1 = file1.length;
      var tail2 = file2.length;
      for (var candidate = longestCommonSubsequence(file1, file2); candidate !== null; candidate = candidate.chain) {
        var mismatchLength1 = tail1 - candidate.file1index - 1;
        var mismatchLength2 = tail2 - candidate.file2index - 1;
        tail1 = candidate.file1index;
        tail2 = candidate.file2index;
        if (mismatchLength1 || mismatchLength2) {
          result.push({
            file1: [tail1 + 1, mismatchLength1],
            file2: [tail2 + 1, mismatchLength2]
          });
        }
      }
      result.reverse();
      return result;
    }
    function diff3MergeIndices(a, o, b) {
      var i;
      var m1 = diffIndices(o, a);
      var m2 = diffIndices(o, b);
      var hunks = [];
      function addHunk(h, side2) {
        hunks.push([h.file1[0], side2, h.file1[1], h.file2[0], h.file2[1]]);
      }
      for (i = 0; i < m1.length; i++) {
        addHunk(m1[i], 0);
      }
      for (i = 0; i < m2.length; i++) {
        addHunk(m2[i], 2);
      }
      hunks.sort(function(x, y) {
        return x[0] - y[0];
      });
      var result = [];
      var commonOffset = 0;
      function copyCommon(targetOffset) {
        if (targetOffset > commonOffset) {
          result.push([1, commonOffset, targetOffset - commonOffset]);
          commonOffset = targetOffset;
        }
      }
      for (var hunkIndex = 0; hunkIndex < hunks.length; hunkIndex++) {
        var firstHunkIndex = hunkIndex;
        var hunk = hunks[hunkIndex];
        var regionLhs = hunk[0];
        var regionRhs = regionLhs + hunk[2];
        while (hunkIndex < hunks.length - 1) {
          var maybeOverlapping = hunks[hunkIndex + 1];
          var maybeLhs = maybeOverlapping[0];
          if (maybeLhs > regionRhs) break;
          regionRhs = Math.max(regionRhs, maybeLhs + maybeOverlapping[2]);
          hunkIndex++;
        }
        copyCommon(regionLhs);
        if (firstHunkIndex == hunkIndex) {
          if (hunk[4] > 0) {
            result.push([hunk[1], hunk[3], hunk[4]]);
          }
        } else {
          var regions = {
            0: [a.length, -1, o.length, -1],
            2: [b.length, -1, o.length, -1]
          };
          for (i = firstHunkIndex; i <= hunkIndex; i++) {
            hunk = hunks[i];
            var side = hunk[1];
            var r = regions[side];
            var oLhs = hunk[0];
            var oRhs = oLhs + hunk[2];
            var abLhs = hunk[3];
            var abRhs = abLhs + hunk[4];
            r[0] = Math.min(abLhs, r[0]);
            r[1] = Math.max(abRhs, r[1]);
            r[2] = Math.min(oLhs, r[2]);
            r[3] = Math.max(oRhs, r[3]);
          }
          var aLhs = regions[0][0] + (regionLhs - regions[0][2]);
          var aRhs = regions[0][1] + (regionRhs - regions[0][3]);
          var bLhs = regions[2][0] + (regionLhs - regions[2][2]);
          var bRhs = regions[2][1] + (regionRhs - regions[2][3]);
          result.push([
            -1,
            aLhs,
            aRhs - aLhs,
            regionLhs,
            regionRhs - regionLhs,
            bLhs,
            bRhs - bLhs
          ]);
        }
        commonOffset = regionRhs;
      }
      copyCommon(o.length);
      return result;
    }
    function diff3Merge2(a, o, b) {
      var result = [];
      var files = [a, o, b];
      var indices = diff3MergeIndices(a, o, b);
      var okLines = [];
      function flushOk() {
        if (okLines.length) {
          result.push({
            ok: okLines
          });
        }
        okLines = [];
      }
      function pushOk(xs) {
        for (var j = 0; j < xs.length; j++) {
          okLines.push(xs[j]);
        }
      }
      function isTrueConflict(rec) {
        if (rec[2] != rec[6]) return true;
        var aoff = rec[1];
        var boff = rec[5];
        for (var j = 0; j < rec[2]; j++) {
          if (a[j + aoff] != b[j + boff]) return true;
        }
        return false;
      }
      for (var i = 0; i < indices.length; i++) {
        var x = indices[i];
        var side = x[0];
        if (side == -1) {
          if (!isTrueConflict(x)) {
            pushOk(files[0].slice(x[1], x[1] + x[2]));
          } else {
            flushOk();
            result.push({
              conflict: {
                a: a.slice(x[1], x[1] + x[2]),
                aIndex: x[1],
                o: o.slice(x[3], x[3] + x[4]),
                oIndex: x[3],
                b: b.slice(x[5], x[5] + x[6]),
                bIndex: x[5]
              }
            });
          }
        } else {
          pushOk(files[side].slice(x[1], x[1] + x[2]));
        }
      }
      flushOk();
      return result;
    }
    module.exports = diff3Merge2;
  }
});

// src/app.js
var import_buffer = __toESM(require_buffer());

// src/config.js
var STORAGE_KEY = "terminsync_config_v1";
function getConfig() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : { remoteUrl: "", token: "", corsProxy: "https://cors.isomorphic-git.org" };
}
function saveConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}
function isConfigured() {
  const c = getConfig();
  return Boolean(c.remoteUrl && c.token);
}
function authCallback() {
  const { token } = getConfig();
  return () => ({ username: token, password: "x-oauth-basic" });
}

// src/userRegistry.js
var KEY = "terminsync_username";
function getLocalUsername() {
  return localStorage.getItem(KEY);
}
function setLocalUsername(username) {
  const trimmed = username.trim();
  if (!trimmed) throw new Error("Username darf nicht leer sein.");
  localStorage.setItem(KEY, trimmed);
}

// src/gitSync.js
var import_lightning_fs = __toESM(require_src());

// node_modules/isomorphic-git/index.js
var import_sha1 = __toESM(require_sha1(), 1);
var import_async_lock = __toESM(require_async_lock(), 1);
var import_crc_32 = __toESM(require_crc32(), 1);
var import_pako = __toESM(require_pako(), 1);
var import_pify = __toESM(require_pify(), 1);
var import_ignore = __toESM(require_ignore(), 1);
var import_clean_git_ref = __toESM(require_lib2(), 1);
var import_diff3 = __toESM(require_diff3(), 1);
var BaseError = class _BaseError extends Error {
  constructor(message) {
    super(message);
    this.caller = "";
  }
  toJSON() {
    return {
      code: this.code,
      data: this.data,
      caller: this.caller,
      message: this.message,
      stack: this.stack
    };
  }
  fromJSON(json) {
    const e = new _BaseError(json.message);
    e.code = json.code;
    e.data = json.data;
    e.caller = json.caller;
    e.stack = json.stack;
    return e;
  }
  get isIsomorphicGitError() {
    return true;
  }
};
var UnmergedPathsError = class _UnmergedPathsError extends BaseError {
  /**
   * @param {Array<string>} filepaths
   */
  constructor(filepaths) {
    super(
      `Modifying the index is not possible because you have unmerged files: ${filepaths.toString}. Fix them up in the work tree, and then use 'git add/rm as appropriate to mark resolution and make a commit.`
    );
    this.code = this.name = _UnmergedPathsError.code;
    this.data = { filepaths };
  }
};
UnmergedPathsError.code = "UnmergedPathsError";
var InternalError = class _InternalError extends BaseError {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(
      `An internal error caused this command to fail.

If you're using an application that depends on isomorphic-git, please report this error to that application's developers.

If you're a developer and you believe this is a bug in isomorphic-git, please file an issue at https://github.com/isomorphic-git/isomorphic-git/issues with a minimal reproduction, version and environment details, and this error message: ${message}`
    );
    this.code = this.name = _InternalError.code;
    this.data = { message };
  }
};
InternalError.code = "InternalError";
var UnsafeFilepathError = class _UnsafeFilepathError extends BaseError {
  /**
   * @param {string} filepath
   */
  constructor(filepath) {
    super(`The filepath "${filepath}" contains unsafe character sequences`);
    this.code = this.name = _UnsafeFilepathError.code;
    this.data = { filepath };
  }
};
UnsafeFilepathError.code = "UnsafeFilepathError";
var BufferCursor = class {
  constructor(buffer) {
    this.buffer = buffer;
    this._start = 0;
  }
  eof() {
    return this._start >= this.buffer.length;
  }
  tell() {
    return this._start;
  }
  seek(n) {
    this._start = n;
  }
  slice(n) {
    const r = this.buffer.slice(this._start, this._start + n);
    this._start += n;
    return r;
  }
  toString(enc, length) {
    const r = this.buffer.toString(enc, this._start, this._start + length);
    this._start += length;
    return r;
  }
  write(value, length, enc) {
    const r = this.buffer.write(value, this._start, length, enc);
    this._start += length;
    return r;
  }
  copy(source, start, end) {
    const r = source.copy(this.buffer, this._start, start, end);
    this._start += r;
    return r;
  }
  readUInt8() {
    const r = this.buffer.readUInt8(this._start);
    this._start += 1;
    return r;
  }
  writeUInt8(value) {
    const r = this.buffer.writeUInt8(value, this._start);
    this._start += 1;
    return r;
  }
  readUInt16BE() {
    const r = this.buffer.readUInt16BE(this._start);
    this._start += 2;
    return r;
  }
  writeUInt16BE(value) {
    const r = this.buffer.writeUInt16BE(value, this._start);
    this._start += 2;
    return r;
  }
  readUInt32BE() {
    const r = this.buffer.readUInt32BE(this._start);
    this._start += 4;
    return r;
  }
  writeUInt32BE(value) {
    const r = this.buffer.writeUInt32BE(value, this._start);
    this._start += 4;
    return r;
  }
};
function compareStrings(a, b) {
  return -(a < b) || +(a > b);
}
function comparePath(a, b) {
  return compareStrings(a.path, b.path);
}
function normalizeMode(mode) {
  let type = mode > 0 ? mode >> 12 : 0;
  if (type !== 4 && type !== 8 && type !== 10 && type !== 14) {
    type = 8;
  }
  let permissions = mode & 511;
  if (permissions & 73) {
    permissions = 493;
  } else {
    permissions = 420;
  }
  if (type !== 8) permissions = 0;
  return (type << 12) + permissions;
}
var MAX_UINT32 = 2 ** 32;
function SecondsNanoseconds(givenSeconds, givenNanoseconds, milliseconds, date) {
  if (givenSeconds !== void 0 && givenNanoseconds !== void 0) {
    return [givenSeconds, givenNanoseconds];
  }
  if (milliseconds === void 0) {
    milliseconds = date.valueOf();
  }
  const seconds = Math.floor(milliseconds / 1e3);
  const nanoseconds = (milliseconds - seconds * 1e3) * 1e6;
  return [seconds, nanoseconds];
}
function normalizeStats(e) {
  const [ctimeSeconds, ctimeNanoseconds] = SecondsNanoseconds(
    e.ctimeSeconds,
    e.ctimeNanoseconds,
    e.ctimeMs,
    e.ctime
  );
  const [mtimeSeconds, mtimeNanoseconds] = SecondsNanoseconds(
    e.mtimeSeconds,
    e.mtimeNanoseconds,
    e.mtimeMs,
    e.mtime
  );
  return {
    ctimeSeconds: ctimeSeconds % MAX_UINT32,
    ctimeNanoseconds: ctimeNanoseconds % MAX_UINT32,
    mtimeSeconds: mtimeSeconds % MAX_UINT32,
    mtimeNanoseconds: mtimeNanoseconds % MAX_UINT32,
    dev: e.dev % MAX_UINT32,
    ino: e.ino % MAX_UINT32,
    mode: normalizeMode(e.mode % MAX_UINT32),
    uid: e.uid % MAX_UINT32,
    gid: e.gid % MAX_UINT32,
    // size of -1 happens over a BrowserFS HTTP Backend that doesn't serve Content-Length headers
    // (like the Karma webserver) because BrowserFS HTTP Backend uses HTTP HEAD requests to do fs.stat
    size: e.size > -1 ? e.size % MAX_UINT32 : 0
  };
}
function toHex(buffer) {
  let hex = "";
  for (const byte of new Uint8Array(buffer)) {
    if (byte < 16) hex += "0";
    hex += byte.toString(16);
  }
  return hex;
}
var supportsSubtleSHA1 = null;
async function shasum(buffer) {
  if (supportsSubtleSHA1 === null) {
    supportsSubtleSHA1 = await testSubtleSHA1();
  }
  return supportsSubtleSHA1 ? subtleSHA1(buffer) : shasumSync(buffer);
}
function shasumSync(buffer) {
  return new import_sha1.default().update(buffer).digest("hex");
}
async function subtleSHA1(buffer) {
  const hash = await crypto.subtle.digest("SHA-1", buffer);
  return toHex(hash);
}
async function testSubtleSHA1() {
  try {
    const hash = await subtleSHA1(new Uint8Array([]));
    return hash === "da39a3ee5e6b4b0d3255bfef95601890afd80709";
  } catch (_) {
  }
  return false;
}
function parseCacheEntryFlags(bits) {
  return {
    assumeValid: Boolean(bits & 32768),
    extended: Boolean(bits & 16384),
    stage: (bits & 12288) >> 12,
    nameLength: bits & 4095
  };
}
function renderCacheEntryFlags(entry) {
  const flags = entry.flags;
  flags.extended = false;
  flags.nameLength = Math.min(Buffer.from(entry.path).length, 4095);
  return (flags.assumeValid ? 32768 : 0) + (flags.extended ? 16384 : 0) + ((flags.stage & 3) << 12) + (flags.nameLength & 4095);
}
var GitIndex = class _GitIndex {
  /*::
   _entries: Map<string, CacheEntry>
   _dirty: boolean // Used to determine if index needs to be saved to filesystem
   */
  constructor(entries, unmergedPaths) {
    this._dirty = false;
    this._unmergedPaths = unmergedPaths || /* @__PURE__ */ new Set();
    this._entries = entries || /* @__PURE__ */ new Map();
  }
  _addEntry(entry) {
    if (entry.flags.stage === 0) {
      entry.stages = [entry];
      this._entries.set(entry.path, entry);
      this._unmergedPaths.delete(entry.path);
    } else {
      let existingEntry = this._entries.get(entry.path);
      if (!existingEntry) {
        this._entries.set(entry.path, entry);
        existingEntry = entry;
      }
      existingEntry.stages[entry.flags.stage] = entry;
      this._unmergedPaths.add(entry.path);
    }
  }
  static async from(buffer) {
    if (Buffer.isBuffer(buffer)) {
      return _GitIndex.fromBuffer(buffer);
    } else if (buffer === null) {
      return new _GitIndex(null);
    } else {
      throw new InternalError("invalid type passed to GitIndex.from");
    }
  }
  static async fromBuffer(buffer) {
    if (buffer.length === 0) {
      throw new InternalError("Index file is empty (.git/index)");
    }
    const index3 = new _GitIndex();
    const reader = new BufferCursor(buffer);
    const magic = reader.toString("utf8", 4);
    if (magic !== "DIRC") {
      throw new InternalError(`Invalid dircache magic file number: ${magic}`);
    }
    const shaComputed = await shasum(buffer.slice(0, -20));
    const shaClaimed = buffer.slice(-20).toString("hex");
    if (shaClaimed !== shaComputed) {
      throw new InternalError(
        `Invalid checksum in GitIndex buffer: expected ${shaClaimed} but saw ${shaComputed}`
      );
    }
    const version2 = reader.readUInt32BE();
    if (version2 !== 2) {
      throw new InternalError(`Unsupported dircache version: ${version2}`);
    }
    const numEntries = reader.readUInt32BE();
    let i = 0;
    while (!reader.eof() && i < numEntries) {
      const entry = {};
      entry.ctimeSeconds = reader.readUInt32BE();
      entry.ctimeNanoseconds = reader.readUInt32BE();
      entry.mtimeSeconds = reader.readUInt32BE();
      entry.mtimeNanoseconds = reader.readUInt32BE();
      entry.dev = reader.readUInt32BE();
      entry.ino = reader.readUInt32BE();
      entry.mode = reader.readUInt32BE();
      entry.uid = reader.readUInt32BE();
      entry.gid = reader.readUInt32BE();
      entry.size = reader.readUInt32BE();
      entry.oid = reader.slice(20).toString("hex");
      const flags = reader.readUInt16BE();
      entry.flags = parseCacheEntryFlags(flags);
      const pathlength = buffer.indexOf(0, reader.tell() + 1) - reader.tell();
      if (pathlength < 1) {
        throw new InternalError(`Got a path length of: ${pathlength}`);
      }
      entry.path = reader.toString("utf8", pathlength);
      if (entry.path.includes("..\\") || entry.path.includes("../")) {
        throw new UnsafeFilepathError(entry.path);
      }
      let padding = 8 - (reader.tell() - 12) % 8;
      if (padding === 0) padding = 8;
      while (padding--) {
        const tmp = reader.readUInt8();
        if (tmp !== 0) {
          throw new InternalError(
            `Expected 1-8 null characters but got '${tmp}' after ${entry.path}`
          );
        } else if (reader.eof()) {
          throw new InternalError("Unexpected end of file");
        }
      }
      entry.stages = [];
      index3._addEntry(entry);
      i++;
    }
    return index3;
  }
  get unmergedPaths() {
    return [...this._unmergedPaths];
  }
  get entries() {
    return [...this._entries.values()].sort(comparePath);
  }
  get entriesMap() {
    return this._entries;
  }
  get entriesFlat() {
    return [...this.entries].flatMap((entry) => {
      return entry.stages.length > 1 ? entry.stages.filter((x) => x) : entry;
    });
  }
  *[Symbol.iterator]() {
    for (const entry of this.entries) {
      yield entry;
    }
  }
  insert({ filepath, stats, oid, stage = 0 }) {
    if (!stats) {
      stats = {
        ctimeSeconds: 0,
        ctimeNanoseconds: 0,
        mtimeSeconds: 0,
        mtimeNanoseconds: 0,
        dev: 0,
        ino: 0,
        mode: 0,
        uid: 0,
        gid: 0,
        size: 0
      };
    }
    stats = normalizeStats(stats);
    const bfilepath = Buffer.from(filepath);
    const entry = {
      ctimeSeconds: stats.ctimeSeconds,
      ctimeNanoseconds: stats.ctimeNanoseconds,
      mtimeSeconds: stats.mtimeSeconds,
      mtimeNanoseconds: stats.mtimeNanoseconds,
      dev: stats.dev,
      ino: stats.ino,
      // We provide a fallback value for `mode` here because not all fs
      // implementations assign it, but we use it in GitTree.
      // '100644' is for a "regular non-executable file"
      mode: stats.mode || 33188,
      uid: stats.uid,
      gid: stats.gid,
      size: stats.size,
      path: filepath,
      oid,
      flags: {
        assumeValid: false,
        extended: false,
        stage,
        nameLength: bfilepath.length < 4095 ? bfilepath.length : 4095
      },
      stages: []
    };
    this._addEntry(entry);
    this._dirty = true;
  }
  delete({ filepath }) {
    if (this._entries.has(filepath)) {
      this._entries.delete(filepath);
    } else {
      for (const key of this._entries.keys()) {
        if (key.startsWith(filepath + "/")) {
          this._entries.delete(key);
        }
      }
    }
    if (this._unmergedPaths.has(filepath)) {
      this._unmergedPaths.delete(filepath);
    }
    this._dirty = true;
  }
  clear() {
    this._entries.clear();
    this._dirty = true;
  }
  has({ filepath }) {
    return this._entries.has(filepath);
  }
  render() {
    return this.entries.map((entry) => `${entry.mode.toString(8)} ${entry.oid}    ${entry.path}`).join("\n");
  }
  static async _entryToBuffer(entry) {
    const bpath = Buffer.from(entry.path);
    const length = Math.ceil((62 + bpath.length + 1) / 8) * 8;
    const written = Buffer.alloc(length);
    const writer = new BufferCursor(written);
    const stat = normalizeStats(entry);
    writer.writeUInt32BE(stat.ctimeSeconds);
    writer.writeUInt32BE(stat.ctimeNanoseconds);
    writer.writeUInt32BE(stat.mtimeSeconds);
    writer.writeUInt32BE(stat.mtimeNanoseconds);
    writer.writeUInt32BE(stat.dev);
    writer.writeUInt32BE(stat.ino);
    writer.writeUInt32BE(stat.mode);
    writer.writeUInt32BE(stat.uid);
    writer.writeUInt32BE(stat.gid);
    writer.writeUInt32BE(stat.size);
    writer.write(entry.oid, 20, "hex");
    writer.writeUInt16BE(renderCacheEntryFlags(entry));
    writer.write(entry.path, bpath.length, "utf8");
    return written;
  }
  async toObject() {
    const header = Buffer.alloc(12);
    const writer = new BufferCursor(header);
    writer.write("DIRC", 4, "utf8");
    writer.writeUInt32BE(2);
    writer.writeUInt32BE(this.entriesFlat.length);
    let entryBuffers = [];
    for (const entry of this.entries) {
      entryBuffers.push(_GitIndex._entryToBuffer(entry));
      if (entry.stages.length > 1) {
        for (const stage of entry.stages) {
          if (stage && stage !== entry) {
            entryBuffers.push(_GitIndex._entryToBuffer(stage));
          }
        }
      }
    }
    entryBuffers = await Promise.all(entryBuffers);
    const body = Buffer.concat(entryBuffers);
    const main = Buffer.concat([header, body]);
    const sum = await shasum(main);
    return Buffer.concat([main, Buffer.from(sum, "hex")]);
  }
};
function compareStats(entry, stats, filemode = true, trustino = true) {
  const e = normalizeStats(entry);
  const s = normalizeStats(stats);
  const staleness = filemode && e.mode !== s.mode || e.mtimeSeconds !== s.mtimeSeconds || e.ctimeSeconds !== s.ctimeSeconds || e.uid !== s.uid || e.gid !== s.gid || trustino && e.ino !== s.ino || e.size !== s.size;
  return staleness;
}
var lock;
function getLock() {
  if (lock === void 0) lock = new import_async_lock.default({ maxPending: Infinity });
  return lock;
}
function acquireLock(key, callback) {
  return getLock().acquire(key, callback);
}
var IndexCache = /* @__PURE__ */ Symbol("IndexCache");
function createCache() {
  return {
    map: /* @__PURE__ */ new Map(),
    stats: /* @__PURE__ */ new Map()
  };
}
async function updateCachedIndexFile(fs2, filepath, cache) {
  const [stat, rawIndexFile] = await Promise.all([
    fs2.lstat(filepath),
    fs2.read(filepath)
  ]);
  const index3 = await GitIndex.from(rawIndexFile);
  cache.map.set(filepath, index3);
  cache.stats.set(filepath, stat);
}
async function isIndexStale(fs2, filepath, cache) {
  const savedStats = cache.stats.get(filepath);
  if (savedStats === void 0) return true;
  if (savedStats === null) return false;
  const currStats = await fs2.lstat(filepath);
  if (currStats === null) return false;
  return compareStats(savedStats, currStats);
}
var GitIndexManager = class {
  /**
   * Manages access to the Git index file, ensuring thread-safe operations and caching.
   *
   * @param {object} opts - Options for acquiring the Git index.
   * @param {FSClient} opts.fs - A file system implementation.
   * @param {string} opts.gitdir - The path to the `.git` directory.
   * @param {object} opts.cache - A shared cache object for storing index data.
   * @param {boolean} [opts.allowUnmerged=true] - Whether to allow unmerged paths in the index.
   * @param {function(GitIndex): any} closure - A function to execute with the Git index.
   * @returns {Promise<any>} The result of the closure function.
   * @throws {UnmergedPathsError} If unmerged paths exist and `allowUnmerged` is `false`.
   */
  static async acquire({ fs: fs2, gitdir, cache, allowUnmerged = true }, closure) {
    if (!cache[IndexCache]) {
      cache[IndexCache] = createCache();
    }
    const filepath = `${gitdir}/index`;
    let result;
    let unmergedPaths = [];
    await acquireLock(filepath, async () => {
      const theIndexCache = cache[IndexCache];
      if (await isIndexStale(fs2, filepath, theIndexCache)) {
        await updateCachedIndexFile(fs2, filepath, theIndexCache);
      }
      const index3 = theIndexCache.map.get(filepath);
      unmergedPaths = index3.unmergedPaths;
      if (unmergedPaths.length && !allowUnmerged)
        throw new UnmergedPathsError(unmergedPaths);
      result = await closure(index3);
      if (index3._dirty) {
        const buffer = await index3.toObject();
        await fs2.write(filepath, buffer);
        theIndexCache.stats.set(filepath, await fs2.lstat(filepath));
        index3._dirty = false;
      }
    });
    return result;
  }
};
function basename(path) {
  const last = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
  if (last > -1) {
    path = path.slice(last + 1);
  }
  return path;
}
function dirname(path) {
  const last = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
  if (last === -1) return ".";
  if (last === 0) return "/";
  return path.slice(0, last);
}
function flatFileListToDirectoryStructure(files) {
  const inodes = /* @__PURE__ */ new Map();
  const mkdir = function(name) {
    if (!inodes.has(name)) {
      const dir = {
        type: "tree",
        fullpath: name,
        basename: basename(name),
        metadata: {},
        children: []
      };
      inodes.set(name, dir);
      dir.parent = mkdir(dirname(name));
      if (dir.parent && dir.parent !== dir) dir.parent.children.push(dir);
    }
    return inodes.get(name);
  };
  const mkfile = function(name, metadata) {
    if (!inodes.has(name)) {
      const file = {
        type: "blob",
        fullpath: name,
        basename: basename(name),
        metadata,
        // This recursively generates any missing parent folders.
        parent: mkdir(dirname(name)),
        children: []
      };
      if (file.parent) file.parent.children.push(file);
      inodes.set(name, file);
    }
    return inodes.get(name);
  };
  mkdir(".");
  for (const file of files) {
    mkfile(file.path, file);
  }
  return inodes;
}
function mode2type(mode) {
  switch (mode) {
    case 16384:
      return "tree";
    case 33188:
      return "blob";
    case 33261:
      return "blob";
    case 40960:
      return "blob";
    case 57344:
      return "commit";
  }
  throw new InternalError(`Unexpected GitTree entry mode: ${mode.toString(8)}`);
}
var GitWalkerIndex = class {
  constructor({ fs: fs2, gitdir, cache }) {
    this.treePromise = GitIndexManager.acquire(
      { fs: fs2, gitdir, cache },
      async function(index3) {
        return flatFileListToDirectoryStructure(index3.entries);
      }
    );
    const walker = this;
    this.ConstructEntry = class StageEntry {
      constructor(fullpath) {
        this._fullpath = fullpath;
        this._type = false;
        this._mode = false;
        this._stat = false;
        this._oid = false;
      }
      async type() {
        return walker.type(this);
      }
      async mode() {
        return walker.mode(this);
      }
      async stat() {
        return walker.stat(this);
      }
      async content() {
        return walker.content(this);
      }
      async oid() {
        return walker.oid(this);
      }
    };
  }
  async readdir(entry) {
    const filepath = entry._fullpath;
    const tree = await this.treePromise;
    const inode = tree.get(filepath);
    if (!inode) return null;
    if (inode.type === "blob") return null;
    if (inode.type !== "tree") {
      throw new Error(`ENOTDIR: not a directory, scandir '${filepath}'`);
    }
    const names = inode.children.map((inode2) => inode2.fullpath);
    names.sort(compareStrings);
    return names;
  }
  async type(entry) {
    if (entry._type === false) {
      await entry.stat();
    }
    return entry._type;
  }
  async mode(entry) {
    if (entry._mode === false) {
      await entry.stat();
    }
    return entry._mode;
  }
  async stat(entry) {
    if (entry._stat === false) {
      const tree = await this.treePromise;
      const inode = tree.get(entry._fullpath);
      if (!inode) {
        throw new Error(
          `ENOENT: no such file or directory, lstat '${entry._fullpath}'`
        );
      }
      const stats = inode.type === "tree" ? {} : normalizeStats(inode.metadata);
      entry._type = inode.type === "tree" ? "tree" : mode2type(stats.mode);
      entry._mode = stats.mode;
      if (inode.type === "tree") {
        entry._stat = void 0;
      } else {
        entry._stat = stats;
      }
    }
    return entry._stat;
  }
  async content(_entry) {
  }
  async oid(entry) {
    if (entry._oid === false) {
      const tree = await this.treePromise;
      const inode = tree.get(entry._fullpath);
      entry._oid = inode.metadata.oid;
    }
    return entry._oid;
  }
};
var GitWalkSymbol = /* @__PURE__ */ Symbol("GitWalkSymbol");
function STAGE() {
  const o = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(o, GitWalkSymbol, {
    value: function({ fs: fs2, gitdir, cache }) {
      return new GitWalkerIndex({ fs: fs2, gitdir, cache });
    }
  });
  Object.freeze(o);
  return o;
}
var NotFoundError = class _NotFoundError extends BaseError {
  /**
   * @param {string} what
   */
  constructor(what) {
    super(`Could not find ${what}.`);
    this.code = this.name = _NotFoundError.code;
    this.data = { what };
  }
};
NotFoundError.code = "NotFoundError";
var ObjectTypeError = class _ObjectTypeError extends BaseError {
  /**
   * @param {string} oid
   * @param {'blob'|'commit'|'tag'|'tree'} actual
   * @param {'blob'|'commit'|'tag'|'tree'} expected
   * @param {string} [filepath]
   */
  constructor(oid, actual, expected, filepath) {
    super(
      `Object ${oid} ${filepath ? `at ${filepath}` : ""}was anticipated to be a ${expected} but it is a ${actual}.`
    );
    this.code = this.name = _ObjectTypeError.code;
    this.data = { oid, actual, expected, filepath };
  }
};
ObjectTypeError.code = "ObjectTypeError";
var InvalidOidError = class _InvalidOidError extends BaseError {
  /**
   * @param {string} value
   */
  constructor(value) {
    super(`Expected a 40-char hex object id but saw "${value}".`);
    this.code = this.name = _InvalidOidError.code;
    this.data = { value };
  }
};
InvalidOidError.code = "InvalidOidError";
var InvalidRefNameError = class _InvalidRefNameError extends BaseError {
  /**
   * @param {string} ref
   * @param {string} suggestion
   * @param {boolean} canForce
   */
  constructor(ref, suggestion) {
    super(
      `"${ref}" would be an invalid git reference. (Hint: a valid alternative would be "${suggestion}".)`
    );
    this.code = this.name = _InvalidRefNameError.code;
    this.data = { ref, suggestion };
  }
};
InvalidRefNameError.code = "InvalidRefNameError";
var NoRefspecError = class _NoRefspecError extends BaseError {
  /**
   * @param {string} remote
   */
  constructor(remote) {
    super(`Could not find a fetch refspec for remote "${remote}". Make sure the config file has an entry like the following:
[remote "${remote}"]
	fetch = +refs/heads/*:refs/remotes/origin/*
`);
    this.code = this.name = _NoRefspecError.code;
    this.data = { remote };
  }
};
NoRefspecError.code = "NoRefspecError";
var GitPackedRefs = class _GitPackedRefs {
  constructor(text) {
    this.refs = /* @__PURE__ */ new Map();
    this.parsedConfig = [];
    if (text) {
      let key = null;
      this.parsedConfig = text.trim().split("\n").map((line) => {
        if (/^\s*#/.test(line)) {
          return { line, comment: true };
        }
        const i = line.indexOf(" ");
        if (line.startsWith("^")) {
          const value = line.slice(1);
          this.refs.set(key + "^{}", value);
          return { line, ref: key, peeled: value };
        } else {
          const value = line.slice(0, i);
          key = line.slice(i + 1);
          this.refs.set(key, value);
          return { line, ref: key, oid: value };
        }
      });
    }
    return this;
  }
  static from(text) {
    return new _GitPackedRefs(text);
  }
  delete(ref) {
    this.parsedConfig = this.parsedConfig.filter((entry) => entry.ref !== ref);
    this.refs.delete(ref);
  }
  toString() {
    return this.parsedConfig.map(({ line }) => line).join("\n") + "\n";
  }
};
var GitRefSpec = class _GitRefSpec {
  constructor({ remotePath, localPath, force, matchPrefix }) {
    Object.assign(this, {
      remotePath,
      localPath,
      force,
      matchPrefix
    });
  }
  static from(refspec) {
    const [forceMatch, remotePath, remoteGlobMatch, localPath, localGlobMatch] = refspec.match(/^(\+?)(.*?)(\*?):(.*?)(\*?)$/).slice(1);
    const force = forceMatch === "+";
    const remoteIsGlob = remoteGlobMatch === "*";
    const localIsGlob = localGlobMatch === "*";
    if (remoteIsGlob !== localIsGlob) {
      throw new InternalError("Invalid refspec");
    }
    return new _GitRefSpec({
      remotePath,
      localPath,
      force,
      matchPrefix: remoteIsGlob
    });
  }
  translate(remoteBranch) {
    if (this.matchPrefix) {
      if (remoteBranch.startsWith(this.remotePath)) {
        return this.localPath + remoteBranch.replace(this.remotePath, "");
      }
    } else {
      if (remoteBranch === this.remotePath) return this.localPath;
    }
    return null;
  }
  reverseTranslate(localBranch) {
    if (this.matchPrefix) {
      if (localBranch.startsWith(this.localPath)) {
        return this.remotePath + localBranch.replace(this.localPath, "");
      }
    } else {
      if (localBranch === this.localPath) return this.remotePath;
    }
    return null;
  }
};
var GitRefSpecSet = class _GitRefSpecSet {
  constructor(rules = []) {
    this.rules = rules;
  }
  static from(refspecs) {
    const rules = [];
    for (const refspec of refspecs) {
      rules.push(GitRefSpec.from(refspec));
    }
    return new _GitRefSpecSet(rules);
  }
  add(refspec) {
    const rule = GitRefSpec.from(refspec);
    this.rules.push(rule);
  }
  translate(remoteRefs) {
    const result = [];
    for (const rule of this.rules) {
      for (const remoteRef of remoteRefs) {
        const localRef = rule.translate(remoteRef);
        if (localRef) {
          result.push([remoteRef, localRef]);
        }
      }
    }
    return result;
  }
  translateOne(remoteRef) {
    let result = null;
    for (const rule of this.rules) {
      const localRef = rule.translate(remoteRef);
      if (localRef) {
        result = localRef;
      }
    }
    return result;
  }
  localNamespaces() {
    return this.rules.filter((rule) => rule.matchPrefix).map((rule) => rule.localPath.replace(/\/$/, ""));
  }
};
function compareRefNames(a, b) {
  const _a = a.replace(/\^\{\}$/, "");
  const _b = b.replace(/\^\{\}$/, "");
  const tmp = -(_a < _b) || +(_a > _b);
  if (tmp === 0) {
    return a.endsWith("^{}") ? 1 : -1;
  }
  return tmp;
}
function normalizeString(path, aar) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = "\0";
  for (let i = 0; i <= path.length; ++i) {
    if (i < path.length) char = path[i];
    else if (char === "/") break;
    else char = "/";
    if (char === "/") {
      if (lastSlash === i - 1 || dots === 1) {
      } else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.at(-1) !== "." || res.at(-2) !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length !== 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (aar) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += "/" + path.slice(lastSlash + 1, i);
        else res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function getWindowsDrivePrefix(path) {
  if (path.length >= 2 && /^[a-zA-Z]:/.test(path)) {
    return path.slice(0, 2);
  }
  return null;
}
function normalize(path) {
  if (!path.length) return ".";
  path = path.replace(/\\/g, "/");
  const drivePrefix = getWindowsDrivePrefix(path);
  const isAbsolute2 = path[0] === "/" || drivePrefix !== null && path[2] === "/";
  const trailingSeparator = path.at(-1) === "/";
  const pathBody = drivePrefix ? path.slice(2) : path;
  let normalized = normalizeString(pathBody, !isAbsolute2);
  if (!normalized.length) {
    const root = drivePrefix ? isAbsolute2 ? drivePrefix + "/" : drivePrefix : isAbsolute2 ? "/" : ".";
    return trailingSeparator && !isAbsolute2 ? root + "/" : root;
  }
  if (trailingSeparator) normalized += "/";
  if (drivePrefix) {
    return isAbsolute2 ? `${drivePrefix}/${normalized}` : `${drivePrefix}${normalized}`;
  }
  return isAbsolute2 ? `/${normalized}` : normalized;
}
function join(...args) {
  if (args.length === 0) return ".";
  let joined;
  for (let i = 0; i < args.length; ++i) {
    const arg = args[i].replace(/\\/g, "/");
    if (arg.length === 0) continue;
    if (/^[a-zA-Z]:\//.test(arg)) {
      joined = arg;
    } else {
      if (joined === void 0) joined = arg;
      else joined += "/" + arg;
    }
  }
  if (joined === void 0) return ".";
  return normalize(joined);
}
var num = (val) => {
  if (typeof val === "number") {
    return val;
  }
  val = val.toLowerCase();
  let n = parseInt(val);
  if (val.endsWith("k")) n *= 1024;
  if (val.endsWith("m")) n *= 1024 * 1024;
  if (val.endsWith("g")) n *= 1024 * 1024 * 1024;
  return n;
};
var bool = (val) => {
  if (typeof val === "boolean") {
    return val;
  }
  val = val.trim().toLowerCase();
  if (val === "true" || val === "yes" || val === "on") return true;
  if (val === "false" || val === "no" || val === "off") return false;
  throw Error(
    `Expected 'true', 'false', 'yes', 'no', 'on', or 'off', but got ${val}`
  );
};
var schema = {
  core: {
    filemode: bool,
    bare: bool,
    logallrefupdates: bool,
    symlinks: bool,
    ignorecase: bool,
    bigFileThreshold: num
  }
};
var SECTION_LINE_REGEX = /^\[([A-Za-z0-9-.]+)(?: "(.*)")?\]$/;
var SECTION_REGEX = /^[A-Za-z0-9-.]+$/;
var VARIABLE_LINE_REGEX = /^([A-Za-z][A-Za-z-]*)(?: *= *(.*))?$/;
var VARIABLE_NAME_REGEX = /^[A-Za-z][A-Za-z-]*$/;
var VARIABLE_VALUE_COMMENT_REGEX = /^(.*?)( *[#;].*)$/;
var extractSectionLine = (line) => {
  const matches = SECTION_LINE_REGEX.exec(line);
  if (matches != null) {
    const [section, subsection] = matches.slice(1);
    return [section, subsection];
  }
  return null;
};
var extractVariableLine = (line) => {
  const matches = VARIABLE_LINE_REGEX.exec(line);
  if (matches != null) {
    const [name, rawValue = "true"] = matches.slice(1);
    const valueWithoutComments = removeComments(rawValue);
    const valueWithoutQuotes = removeQuotes(valueWithoutComments);
    return [name, valueWithoutQuotes];
  }
  return null;
};
var removeComments = (rawValue) => {
  const commentMatches = VARIABLE_VALUE_COMMENT_REGEX.exec(rawValue);
  if (commentMatches == null) {
    return rawValue;
  }
  const [valueWithoutComment, comment] = commentMatches.slice(1);
  if (hasOddNumberOfQuotes(valueWithoutComment) && hasOddNumberOfQuotes(comment)) {
    return `${valueWithoutComment}${comment}`;
  }
  return valueWithoutComment;
};
var hasOddNumberOfQuotes = (text) => {
  const numberOfQuotes = (text.match(/(?:^|[^\\])"/g) || []).length;
  return numberOfQuotes % 2 !== 0;
};
var removeQuotes = (text) => {
  return text.split("").reduce((newText, c, idx, text2) => {
    const isQuote = c === '"' && text2[idx - 1] !== "\\";
    const isEscapeForQuote = c === "\\" && text2[idx + 1] === '"';
    if (isQuote || isEscapeForQuote) {
      return newText;
    }
    return newText + c;
  }, "");
};
var lower = (text) => {
  return text != null ? text.toLowerCase() : null;
};
var getPath = (section, subsection, name) => {
  return [lower(section), subsection, lower(name)].filter((a) => a != null).join(".");
};
var normalizePath = (path) => {
  const pathSegments = path.split(".");
  const section = pathSegments.shift();
  const name = pathSegments.pop();
  const subsection = pathSegments.length ? pathSegments.join(".") : void 0;
  return {
    section,
    subsection,
    name,
    path: getPath(section, subsection, name),
    sectionPath: getPath(section, subsection, null),
    isSection: !!section
  };
};
var findLastIndex = (array, callback) => {
  return array.reduce((lastIndex, item, index3) => {
    return callback(item) ? index3 : lastIndex;
  }, -1);
};
var GitConfig = class _GitConfig {
  constructor(text) {
    let section = null;
    let subsection = null;
    this.parsedConfig = text ? text.split("\n").map((line) => {
      let name = null;
      let value = null;
      const trimmedLine = line.trim();
      const extractedSection = extractSectionLine(trimmedLine);
      const isSection = extractedSection != null;
      if (isSection) {
        ;
        [section, subsection] = extractedSection;
      } else {
        const extractedVariable = extractVariableLine(trimmedLine);
        const isVariable = extractedVariable != null;
        if (isVariable) {
          ;
          [name, value] = extractedVariable;
        }
      }
      const path = getPath(section, subsection, name);
      return { line, isSection, section, subsection, name, value, path };
    }) : [];
  }
  static from(text) {
    return new _GitConfig(text);
  }
  async get(path, getall = false) {
    const normalizedPath = normalizePath(path).path;
    const allValues = this.parsedConfig.filter((config) => config.path === normalizedPath).map(({ section, name, value }) => {
      const fn = schema[section] && schema[section][name];
      return fn ? fn(value) : value;
    });
    return getall ? allValues : allValues.pop();
  }
  async getall(path) {
    return this.get(path, true);
  }
  async getSubsections(section) {
    return this.parsedConfig.filter((config) => config.isSection && config.section === section).map((config) => config.subsection);
  }
  async deleteSection(section, subsection) {
    this.parsedConfig = this.parsedConfig.filter(
      (config) => !(config.section === section && config.subsection === subsection)
    );
  }
  async append(path, value) {
    return this.set(path, value, true);
  }
  async set(path, value, append = false) {
    const {
      section,
      subsection,
      name,
      path: normalizedPath,
      sectionPath,
      isSection
    } = normalizePath(path);
    const configIndex = findLastIndex(
      this.parsedConfig,
      (config) => config.path === normalizedPath
    );
    if (value == null) {
      if (configIndex !== -1) {
        this.parsedConfig.splice(configIndex, 1);
      }
    } else {
      if (configIndex !== -1) {
        const config = this.parsedConfig[configIndex];
        const modifiedConfig = Object.assign({}, config, {
          name,
          value,
          modified: true
        });
        if (append) {
          this.parsedConfig.splice(configIndex + 1, 0, modifiedConfig);
        } else {
          this.parsedConfig[configIndex] = modifiedConfig;
        }
      } else {
        const sectionIndex = this.parsedConfig.findIndex(
          (config) => config.path === sectionPath
        );
        const newConfig = {
          section,
          subsection,
          name,
          value,
          modified: true,
          path: normalizedPath
        };
        if (SECTION_REGEX.test(section) && VARIABLE_NAME_REGEX.test(name)) {
          if (sectionIndex >= 0) {
            this.parsedConfig.splice(sectionIndex + 1, 0, newConfig);
          } else {
            const newSection = {
              isSection,
              section,
              subsection,
              modified: true,
              path: sectionPath
            };
            this.parsedConfig.push(newSection, newConfig);
          }
        }
      }
    }
  }
  toString() {
    return this.parsedConfig.map(({ line, section, subsection, name, value, modified: modified2 = false }) => {
      if (!modified2) {
        return line;
      }
      if (name != null && value != null) {
        if (typeof value === "string" && /[#;]/.test(value)) {
          return `	${name} = "${value}"`;
        }
        return `	${name} = ${value}`;
      }
      if (subsection != null) {
        return `[${section} "${subsection}"]`;
      }
      return `[${section}]`;
    }).join("\n");
  }
};
var GitConfigManager = class {
  /**
   * Reads the Git configuration file from the specified `.git` directory.
   *
   * @param {object} opts - Options for reading the Git configuration.
   * @param {FSClient} opts.fs - A file system implementation.
   * @param {string} opts.gitdir - The path to the `.git` directory.
   * @returns {Promise<GitConfig>} A `GitConfig` object representing the parsed configuration.
   */
  static async get({ fs: fs2, gitdir }) {
    const text = await fs2.read(`${gitdir}/config`, { encoding: "utf8" });
    return GitConfig.from(text);
  }
  /**
   * Saves the provided Git configuration to the specified `.git` directory.
   *
   * @param {object} opts - Options for saving the Git configuration.
   * @param {FSClient} opts.fs - A file system implementation.
   * @param {string} opts.gitdir - The path to the `.git` directory.
   * @param {GitConfig} opts.config - The `GitConfig` object to save.
   * @returns {Promise<void>} Resolves when the configuration has been successfully saved.
   */
  static async save({ fs: fs2, gitdir, config }) {
    await fs2.write(`${gitdir}/config`, config.toString(), {
      encoding: "utf8"
    });
  }
};
var refpaths = (ref) => [
  `${ref}`,
  `refs/${ref}`,
  `refs/tags/${ref}`,
  `refs/heads/${ref}`,
  `refs/remotes/${ref}`,
  `refs/remotes/${ref}/HEAD`
];
var GIT_FILES = ["config", "description", "index", "shallow", "commondir"];
function assertWritableRef(ref) {
  if (GIT_FILES.includes(ref)) {
    throw new InvalidRefNameError(ref, `refs/heads/${ref}`);
  }
}
var GitRefManager = class _GitRefManager {
  /**
   * Updates remote refs based on the provided refspecs and options.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} [args.gitdir=join(dir, '.git')] - [required] The [git directory](dir-vs-gitdir.md) path
   * @param {string} args.remote - The name of the remote.
   * @param {Map<string, string>} args.refs - A map of refs to their object IDs.
   * @param {Map<string, string>} args.symrefs - A map of symbolic refs.
   * @param {boolean} args.tags - Whether to fetch tags.
   * @param {string[]} [args.refspecs = undefined] - The refspecs to use.
   * @param {boolean} [args.prune = false] - Whether to prune stale refs.
   * @param {boolean} [args.pruneTags = false] - Whether to prune tags.
   * @returns {Promise<Object>} - An object containing pruned refs.
   */
  static async updateRemoteRefs({
    fs: fs2,
    gitdir,
    remote,
    refs,
    symrefs,
    tags,
    refspecs = void 0,
    prune = false,
    pruneTags = false
  }) {
    for (const value of refs.values()) {
      if (!value.match(/[0-9a-f]{40}/)) {
        throw new InvalidOidError(value);
      }
    }
    const config = await GitConfigManager.get({ fs: fs2, gitdir });
    if (!refspecs) {
      refspecs = await config.getall(`remote.${remote}.fetch`);
      if (refspecs.length === 0) {
        throw new NoRefspecError(remote);
      }
      refspecs.unshift(`+HEAD:refs/remotes/${remote}/HEAD`);
    }
    const refspec = GitRefSpecSet.from(refspecs);
    const actualRefsToWrite = /* @__PURE__ */ new Map();
    const refTranslations = refspec.translate([...refs.keys()]);
    const symrefTranslations = [];
    for (const [serverRef, translatedRef] of refspec.translate([
      ...symrefs.keys()
    ])) {
      const symtarget = refspec.translateOne(symrefs.get(serverRef));
      if (symtarget) {
        symrefTranslations.push([translatedRef, `ref: ${symtarget}`]);
      }
    }
    for (const [, translatedRef] of refTranslations) {
      assertWritableRef(translatedRef);
    }
    for (const [translatedRef] of symrefTranslations) {
      assertWritableRef(translatedRef);
    }
    if (pruneTags) {
      const tags2 = await _GitRefManager.listRefs({
        fs: fs2,
        gitdir,
        filepath: "refs/tags"
      });
      await _GitRefManager.deleteRefs({
        fs: fs2,
        gitdir,
        refs: tags2.map((tag2) => `refs/tags/${tag2}`)
      });
    }
    if (tags) {
      for (const serverRef of refs.keys()) {
        if (serverRef.startsWith("refs/tags") && !serverRef.endsWith("^{}")) {
          if (!await _GitRefManager.exists({ fs: fs2, gitdir, ref: serverRef })) {
            const oid = refs.get(serverRef);
            actualRefsToWrite.set(serverRef, oid);
          }
        }
      }
    }
    for (const [serverRef, translatedRef] of refTranslations) {
      const value = refs.get(serverRef);
      actualRefsToWrite.set(translatedRef, value);
    }
    for (const [translatedRef, value] of symrefTranslations) {
      actualRefsToWrite.set(translatedRef, value);
    }
    const pruned = [];
    if (prune) {
      for (const filepath of refspec.localNamespaces()) {
        const refs2 = (await _GitRefManager.listRefs({
          fs: fs2,
          gitdir,
          filepath
        })).map((file) => `${filepath}/${file}`);
        for (const ref of refs2) {
          if (!actualRefsToWrite.has(ref)) {
            pruned.push(ref);
          }
        }
      }
      if (pruned.length > 0) {
        await _GitRefManager.deleteRefs({ fs: fs2, gitdir, refs: pruned });
      }
    }
    for (const [key, value] of actualRefsToWrite) {
      await acquireLock(
        key,
        async () => fs2.write(join(gitdir, key), `${value.trim()}
`, "utf8")
      );
    }
    return { pruned };
  }
  /**
   * Writes a ref to the file system.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} [args.gitdir] - [required] The [git directory](dir-vs-gitdir.md) path
   * @param {string} args.ref - The ref to write.
   * @param {string} args.value - The object ID to write.
   * @returns {Promise<void>}
   */
  // TODO: make this less crude?
  static async writeRef({ fs: fs2, gitdir, ref, value }) {
    assertWritableRef(ref);
    if (!value.match(/[0-9a-f]{40}/)) {
      throw new InvalidOidError(value);
    }
    await acquireLock(
      ref,
      async () => fs2.write(join(gitdir, ref), `${value.trim()}
`, "utf8")
    );
  }
  /**
   * Writes a symbolic ref to the file system.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} [args.gitdir] - [required] The [git directory](dir-vs-gitdir.md) path
   * @param {string} args.ref - The ref to write.
   * @param {string} args.value - The target ref.
   * @returns {Promise<void>}
   */
  static async writeSymbolicRef({ fs: fs2, gitdir, ref, value }) {
    assertWritableRef(ref);
    await acquireLock(
      ref,
      async () => fs2.write(join(gitdir, ref), `ref: ${value.trim()}
`, "utf8")
    );
  }
  /**
   * Deletes a single ref.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} [args.gitdir] - [required] The [git directory](dir-vs-gitdir.md) path
   * @param {string} args.ref - The ref to delete.
   * @returns {Promise<void>}
   */
  static async deleteRef({ fs: fs2, gitdir, ref }) {
    return _GitRefManager.deleteRefs({ fs: fs2, gitdir, refs: [ref] });
  }
  /**
   * Deletes multiple refs.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} [args.gitdir] - [required] The [git directory](dir-vs-gitdir.md) path
   * @param {string[]} args.refs - The refs to delete.
   * @returns {Promise<void>}
   */
  static async deleteRefs({ fs: fs2, gitdir, refs }) {
    refs.forEach(assertWritableRef);
    await Promise.all(refs.map((ref) => fs2.rm(join(gitdir, ref))));
    let text = await acquireLock(
      "packed-refs",
      async () => fs2.read(`${gitdir}/packed-refs`, { encoding: "utf8" })
    );
    const packed = GitPackedRefs.from(text);
    const beforeSize = packed.refs.size;
    for (const ref of refs) {
      if (packed.refs.has(ref)) {
        packed.delete(ref);
      }
    }
    if (packed.refs.size < beforeSize) {
      text = packed.toString();
      await acquireLock(
        "packed-refs",
        async () => fs2.write(`${gitdir}/packed-refs`, text, { encoding: "utf8" })
      );
    }
  }
  /**
   * Resolves a ref to its object ID.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} [args.gitdir] - [required] The [git directory](dir-vs-gitdir.md) path
   * @param {string} args.ref - The ref to resolve.
   * @param {number} [args.depth = undefined] - The maximum depth to resolve symbolic refs.
   * @returns {Promise<string>} - The resolved object ID.
   */
  static async resolve({
    fs: fs2,
    gitdir,
    ref,
    depth = void 0,
    visited = /* @__PURE__ */ new Set()
  }) {
    if (depth !== void 0) {
      depth--;
      if (depth === -1) {
        return ref;
      }
    }
    if (ref.startsWith("ref: ")) {
      ref = ref.slice("ref: ".length);
      return _GitRefManager.resolve({ fs: fs2, gitdir, ref, depth, visited });
    }
    if (ref.length === 40 && /[0-9a-f]{40}/.test(ref)) {
      return ref;
    }
    const packedMap = await _GitRefManager.packedRefs({ fs: fs2, gitdir });
    const allpaths = refpaths(ref).filter((p) => !GIT_FILES.includes(p));
    for (const ref2 of allpaths) {
      const sha = await acquireLock(
        ref2,
        async () => await fs2.read(`${gitdir}/${ref2}`, { encoding: "utf8" }) || packedMap.get(ref2)
      );
      if (sha) {
        if (visited.has(ref2)) {
          throw new InternalError(
            `Circular reference detected while resolving ref "${ref2}"`
          );
        }
        visited.add(ref2);
        return _GitRefManager.resolve({
          fs: fs2,
          gitdir,
          ref: sha.trim(),
          depth,
          visited
        });
      }
    }
    throw new NotFoundError(ref);
  }
  /**
   * Checks whether a ref names the branch HEAD points at in a repository where
   * that branch has no commits yet.
   *
   * A repository created by `git init` has a HEAD pointing at a branch that
   * does not exist on disk. Resolving that branch fails the same way resolving
   * a misspelled ref does, so callers that want to treat the two differently
   * need this to tell them apart.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} [args.gitdir=join(dir, '.git')] - [required] The [git directory](dir-vs-gitdir.md) path
   * @param {string} args.ref - The ref to check.
   * @returns {Promise<boolean>} - True if the ref names an unborn branch.
   */
  static async isUnbornBranch({ fs: fs2, gitdir, ref }) {
    let target;
    try {
      target = await _GitRefManager.resolve({
        fs: fs2,
        gitdir,
        ref: "HEAD",
        depth: 2
      });
    } catch (_) {
      return false;
    }
    if (!target.startsWith("refs/heads/")) return false;
    return ref === "HEAD" || refpaths(ref).includes(target);
  }
  /**
   * Checks if a ref exists.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} [args.gitdir=join(dir, '.git')] - [required] The [git directory](dir-vs-gitdir.md) path
   * @param {string} args.ref - The ref to check.
   * @returns {Promise<boolean>} - True if the ref exists, false otherwise.
   */
  static async exists({ fs: fs2, gitdir, ref }) {
    try {
      await _GitRefManager.expand({ fs: fs2, gitdir, ref });
      return true;
    } catch (err) {
      return false;
    }
  }
  /**
   * Expands a ref to its full name.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} [args.gitdir=join(dir, '.git')] - [required] The [git directory](dir-vs-gitdir.md) path
   * @param {string} args.ref - The ref to expand.
   * @returns {Promise<string>} - The full ref name.
   */
  static async expand({ fs: fs2, gitdir, ref }) {
    if (ref.length === 40 && /[0-9a-f]{40}/.test(ref)) {
      return ref;
    }
    const packedMap = await _GitRefManager.packedRefs({ fs: fs2, gitdir });
    const allpaths = refpaths(ref).filter((p) => !GIT_FILES.includes(p));
    for (const ref2 of allpaths) {
      const refExists = await acquireLock(
        ref2,
        async () => fs2.exists(`${gitdir}/${ref2}`)
      );
      if (refExists) return ref2;
      if (packedMap.has(ref2)) return ref2;
    }
    throw new NotFoundError(ref);
  }
  /**
   * Expands a ref against a provided map.
   *
   * @param {Object} args
   * @param {string} args.ref - The ref to expand.
   * @param {Map<string, string>} args.map - The map of refs.
   * @returns {Promise<string>} - The expanded ref.
   */
  static async expandAgainstMap({ ref, map }) {
    const allpaths = refpaths(ref);
    for (const ref2 of allpaths) {
      if (await map.has(ref2)) return ref2;
    }
    throw new NotFoundError(ref);
  }
  /**
   * Resolves a ref against a provided map.
   *
   * @param {Object} args
   * @param {string} args.ref - The ref to resolve.
   * @param {string} [args.fullref = args.ref] - The full ref name.
   * @param {number} [args.depth = undefined] - The maximum depth to resolve symbolic refs.
   * @param {Map<string, string>} args.map - The map of refs.
   * @returns {Object} - An object containing the full ref and its object ID.
   */
  static resolveAgainstMap({ ref, fullref = ref, depth = void 0, map }) {
    if (depth !== void 0) {
      depth--;
      if (depth === -1) {
        return { fullref, oid: ref };
      }
    }
    if (ref.startsWith("ref: ")) {
      ref = ref.slice("ref: ".length);
      return _GitRefManager.resolveAgainstMap({ ref, fullref, depth, map });
    }
    if (ref.length === 40 && /[0-9a-f]{40}/.test(ref)) {
      return { fullref, oid: ref };
    }
    const allpaths = refpaths(ref);
    for (const ref2 of allpaths) {
      const sha = map.get(ref2);
      if (sha) {
        return _GitRefManager.resolveAgainstMap({
          ref: sha.trim(),
          fullref: ref2,
          depth,
          map
        });
      }
    }
    throw new NotFoundError(ref);
  }
  /**
   * Reads the packed refs file and returns a map of refs.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} [args.gitdir=join(dir, '.git')] - [required] The [git directory](dir-vs-gitdir.md) path
   * @returns {Promise<Map<string, string>>} - A map of packed refs.
   */
  static async packedRefs({ fs: fs2, gitdir }) {
    const text = await acquireLock(
      "packed-refs",
      async () => fs2.read(`${gitdir}/packed-refs`, { encoding: "utf8" })
    );
    const packed = GitPackedRefs.from(text);
    return packed.refs;
  }
  /**
   * Lists all refs matching a given filepath prefix.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} [args.gitdir=join(dir, '.git')] - [required] The [git directory](dir-vs-gitdir.md) path
   * @param {string} args.filepath - The filepath prefix to match.
   * @returns {Promise<string[]>} - A sorted list of refs.
   */
  static async listRefs({ fs: fs2, gitdir, filepath }) {
    const packedMap = _GitRefManager.packedRefs({ fs: fs2, gitdir });
    let files = null;
    try {
      files = await fs2.readdirDeep(`${gitdir}/${filepath}`);
      files = files.map((x) => x.replace(`${gitdir}/${filepath}/`, ""));
    } catch (err) {
      files = [];
    }
    for (let key of (await packedMap).keys()) {
      if (key.startsWith(filepath)) {
        key = key.replace(filepath + "/", "");
        if (!files.includes(key)) {
          files.push(key);
        }
      }
    }
    files.sort(compareRefNames);
    return files;
  }
  /**
   * Lists all branches, optionally filtered by remote.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} [args.gitdir=join(dir, '.git')] - [required] The [git directory](dir-vs-gitdir.md) path
   * @param {string} [args.remote] - The remote to filter branches by.
   * @returns {Promise<string[]>} - A list of branch names.
   */
  static async listBranches({ fs: fs2, gitdir, remote }) {
    if (remote) {
      return _GitRefManager.listRefs({
        fs: fs2,
        gitdir,
        filepath: `refs/remotes/${remote}`
      });
    } else {
      return _GitRefManager.listRefs({ fs: fs2, gitdir, filepath: `refs/heads` });
    }
  }
  /**
   * Lists all tags.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} [args.gitdir=join(dir, '.git')] - [required] The [git directory](dir-vs-gitdir.md) path
   * @returns {Promise<string[]>} - A list of tag names.
   */
  static async listTags({ fs: fs2, gitdir }) {
    const tags = await _GitRefManager.listRefs({
      fs: fs2,
      gitdir,
      filepath: `refs/tags`
    });
    return tags.filter((x) => !x.endsWith("^{}"));
  }
};
function compareTreeEntryPath(a, b) {
  return compareStrings(appendSlashIfDir(a), appendSlashIfDir(b));
}
function appendSlashIfDir(entry) {
  return entry.mode === "040000" ? entry.path + "/" : entry.path;
}
function mode2type$1(mode) {
  switch (mode) {
    case "040000":
      return "tree";
    case "100644":
      return "blob";
    case "100755":
      return "blob";
    case "120000":
      return "blob";
    case "160000":
      return "commit";
  }
  throw new InternalError(`Unexpected GitTree entry mode: ${mode}`);
}
function parseBuffer(buffer) {
  const _entries = [];
  let cursor = 0;
  while (cursor < buffer.length) {
    const space = buffer.indexOf(32, cursor);
    if (space === -1) {
      throw new InternalError(
        `GitTree: Error parsing buffer at byte location ${cursor}: Could not find the next space character.`
      );
    }
    const nullchar = buffer.indexOf(0, cursor);
    if (nullchar === -1) {
      throw new InternalError(
        `GitTree: Error parsing buffer at byte location ${cursor}: Could not find the next null character.`
      );
    }
    let mode = buffer.slice(cursor, space).toString("utf8");
    if (mode === "40000") mode = "040000";
    const type = mode2type$1(mode);
    const path = buffer.slice(space + 1, nullchar).toString("utf8");
    const hfsClean = path.replace(
      /[\u200C-\u200F\u202A-\u202E\u206A-\u206F\uFEFF]/g,
      ""
    );
    const ntfsClean = hfsClean.split(":")[0];
    const normalized = ntfsClean.toLowerCase().replace(/[. ]+$/, "");
    if (path.includes("\\") || path.includes("/") || hfsClean === "." || hfsClean === ".." || normalized === ".git" || /^\.?git~[1-9]$/.test(normalized)) {
      throw new UnsafeFilepathError(path);
    }
    const oid = buffer.slice(nullchar + 1, nullchar + 21).toString("hex");
    cursor = nullchar + 21;
    _entries.push({ mode, path, oid, type });
  }
  return _entries;
}
function limitModeToAllowed(mode) {
  if (typeof mode === "number") {
    mode = mode.toString(8);
  }
  if (mode.match(/^0?4.*/)) return "040000";
  if (mode.match(/^1006.*/)) return "100644";
  if (mode.match(/^1007.*/)) return "100755";
  if (mode.match(/^120.*/)) return "120000";
  if (mode.match(/^160.*/)) return "160000";
  throw new InternalError(`Could not understand file mode: ${mode}`);
}
function nudgeIntoShape(entry) {
  if (!entry.oid && entry.sha) {
    entry.oid = entry.sha;
  }
  entry.mode = limitModeToAllowed(entry.mode);
  if (!entry.type) {
    entry.type = mode2type$1(entry.mode);
  }
  return entry;
}
var GitTree = class _GitTree {
  constructor(entries) {
    if (Buffer.isBuffer(entries)) {
      this._entries = parseBuffer(entries);
    } else if (Array.isArray(entries)) {
      this._entries = entries.map(nudgeIntoShape);
    } else {
      throw new InternalError("invalid type passed to GitTree constructor");
    }
    this._entries.sort(comparePath);
  }
  static from(tree) {
    return new _GitTree(tree);
  }
  render() {
    return this._entries.map((entry) => `${entry.mode} ${entry.type} ${entry.oid}    ${entry.path}`).join("\n");
  }
  toObject() {
    const entries = [...this._entries];
    entries.sort(compareTreeEntryPath);
    return Buffer.concat(
      entries.map((entry) => {
        const mode = Buffer.from(entry.mode.replace(/^0/, ""));
        const space = Buffer.from(" ");
        const path = Buffer.from(entry.path, "utf8");
        const nullchar = Buffer.from([0]);
        const oid = Buffer.from(entry.oid, "hex");
        return Buffer.concat([mode, space, path, nullchar, oid]);
      })
    );
  }
  /**
   * @returns {TreeEntry[]}
   */
  entries() {
    return this._entries;
  }
  *[Symbol.iterator]() {
    for (const entry of this._entries) {
      yield entry;
    }
  }
};
var GitObject = class {
  /**
   * Wraps a raw object with a Git header.
   *
   * @param {Object} params - The parameters for wrapping.
   * @param {string} params.type - The type of the Git object (e.g., 'blob', 'tree', 'commit').
   * @param {Uint8Array} params.object - The raw object data to wrap.
   * @returns {Uint8Array} The wrapped Git object as a single buffer.
   */
  static wrap({ type, object }) {
    const header = `${type} ${object.length}\0`;
    const headerLen = header.length;
    const totalLength = headerLen + object.length;
    const wrappedObject = new Uint8Array(totalLength);
    for (let i = 0; i < headerLen; i++) {
      wrappedObject[i] = header.charCodeAt(i);
    }
    wrappedObject.set(object, headerLen);
    return wrappedObject;
  }
  /**
   * Unwraps a Git object buffer into its type and raw object data.
   *
   * @param {Buffer|Uint8Array} buffer - The buffer containing the wrapped Git object.
   * @returns {{ type: string, object: Buffer }} An object containing the type and the raw object data.
   * @throws {InternalError} If the length specified in the header does not match the actual object length.
   */
  static unwrap(buffer) {
    const s = buffer.indexOf(32);
    const i = buffer.indexOf(0);
    const type = buffer.slice(0, s).toString("utf8");
    const length = buffer.slice(s + 1, i).toString("utf8");
    const actualLength = buffer.length - (i + 1);
    if (parseInt(length) !== actualLength) {
      throw new InternalError(
        `Length mismatch: expected ${length} bytes but got ${actualLength} instead.`
      );
    }
    return {
      type,
      object: Buffer.from(buffer.slice(i + 1))
    };
  }
};
async function readObjectLoose({ fs: fs2, gitdir, oid }) {
  const source = `objects/${oid.slice(0, 2)}/${oid.slice(2)}`;
  const file = await fs2.read(`${gitdir}/${source}`);
  if (!file) {
    return null;
  }
  return { object: file, format: "deflated", source };
}
function applyDelta(delta, source) {
  const reader = new BufferCursor(delta);
  const sourceSize = readVarIntLE(reader);
  if (sourceSize !== source.byteLength) {
    throw new InternalError(
      `applyDelta expected source buffer to be ${sourceSize} bytes but the provided buffer was ${source.length} bytes`
    );
  }
  const targetSize = readVarIntLE(reader);
  let target;
  const firstOp = readOp(reader, source);
  if (firstOp.byteLength === targetSize) {
    target = firstOp;
  } else {
    const chunks = [firstOp];
    let tell = firstOp.byteLength;
    while (!reader.eof()) {
      const op = readOp(reader, source);
      chunks.push(op);
      tell += op.byteLength;
    }
    if (targetSize !== tell) {
      throw new InternalError(
        `applyDelta expected target buffer to be ${targetSize} bytes but the resulting buffer was ${tell} bytes`
      );
    }
    target = Buffer.concat(chunks, targetSize);
  }
  return target;
}
function readVarIntLE(reader) {
  let result = 0;
  let shift = 0;
  let byte = null;
  do {
    byte = reader.readUInt8();
    result |= (byte & 127) << shift;
    shift += 7;
  } while (byte & 128);
  return result;
}
function readCompactLE(reader, flags, size) {
  let result = 0;
  let shift = 0;
  while (size--) {
    if (flags & 1) {
      result |= reader.readUInt8() << shift;
    }
    flags >>= 1;
    shift += 8;
  }
  return result;
}
function readOp(reader, source) {
  const byte = reader.readUInt8();
  const COPY = 128;
  const OFFS = 15;
  const SIZE = 112;
  if (byte & COPY) {
    const offset = readCompactLE(reader, byte & OFFS, 4);
    let size = readCompactLE(reader, (byte & SIZE) >> 4, 3);
    if (size === 0) size = 65536;
    return source.slice(offset, offset + size);
  } else {
    return reader.slice(byte);
  }
}
function fromValue(value) {
  let queue = [value];
  return {
    next() {
      return Promise.resolve({ done: queue.length === 0, value: queue.pop() });
    },
    return() {
      queue = [];
      return {};
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
function getIterator(iterable) {
  if (iterable[Symbol.asyncIterator]) {
    return iterable[Symbol.asyncIterator]();
  }
  if (iterable[Symbol.iterator]) {
    return iterable[Symbol.iterator]();
  }
  if (iterable.next) {
    return iterable;
  }
  return fromValue(iterable);
}
var StreamReader = class {
  constructor(stream) {
    if (typeof Buffer === "undefined") {
      throw new Error("Missing Buffer dependency");
    }
    this.stream = getIterator(stream);
    this.buffer = null;
    this.cursor = 0;
    this.undoCursor = 0;
    this.started = false;
    this._ended = false;
    this._discardedBytes = 0;
  }
  eof() {
    return this._ended && this.cursor === this.buffer.length;
  }
  tell() {
    return this._discardedBytes + this.cursor;
  }
  async byte() {
    if (this.eof()) return;
    if (!this.started) await this._init();
    if (this.cursor === this.buffer.length) {
      await this._loadnext();
      if (this._ended) return;
    }
    this._moveCursor(1);
    return this.buffer[this.undoCursor];
  }
  async chunk() {
    if (this.eof()) return;
    if (!this.started) await this._init();
    if (this.cursor === this.buffer.length) {
      await this._loadnext();
      if (this._ended) return;
    }
    this._moveCursor(this.buffer.length);
    return this.buffer.slice(this.undoCursor, this.cursor);
  }
  async read(n) {
    if (this.eof()) return;
    if (!this.started) await this._init();
    if (this.cursor + n > this.buffer.length) {
      this._trim();
      await this._accumulate(n);
    }
    this._moveCursor(n);
    return this.buffer.slice(this.undoCursor, this.cursor);
  }
  async skip(n) {
    if (this.eof()) return;
    if (!this.started) await this._init();
    if (this.cursor + n > this.buffer.length) {
      this._trim();
      await this._accumulate(n);
    }
    this._moveCursor(n);
  }
  async undo() {
    this.cursor = this.undoCursor;
  }
  async _next() {
    this.started = true;
    let { done, value } = await this.stream.next();
    if (done) {
      this._ended = true;
      if (!value) return Buffer.alloc(0);
    }
    if (value) {
      value = Buffer.from(value);
    }
    return value;
  }
  _trim() {
    this.buffer = this.buffer.slice(this.undoCursor);
    this.cursor -= this.undoCursor;
    this._discardedBytes += this.undoCursor;
    this.undoCursor = 0;
  }
  _moveCursor(n) {
    this.undoCursor = this.cursor;
    this.cursor += n;
    if (this.cursor > this.buffer.length) {
      this.cursor = this.buffer.length;
    }
  }
  async _accumulate(n) {
    if (this._ended) return;
    const buffers = [this.buffer];
    while (this.cursor + n > lengthBuffers(buffers)) {
      const nextbuffer = await this._next();
      if (this._ended) break;
      buffers.push(nextbuffer);
    }
    this.buffer = Buffer.concat(buffers);
  }
  async _loadnext() {
    this._discardedBytes += this.buffer.length;
    this.undoCursor = 0;
    this.cursor = 0;
    this.buffer = await this._next();
  }
  async _init() {
    this.buffer = await this._next();
  }
};
function lengthBuffers(buffers) {
  return buffers.reduce((acc, buffer) => acc + buffer.length, 0);
}
async function listpack(stream, onData) {
  const reader = new StreamReader(stream);
  let PACK = await reader.read(4);
  PACK = PACK.toString("utf8");
  if (PACK !== "PACK") {
    throw new InternalError(`Invalid PACK header '${PACK}'`);
  }
  let version2 = await reader.read(4);
  version2 = version2.readUInt32BE(0);
  if (version2 !== 2) {
    throw new InternalError(`Invalid packfile version: ${version2}`);
  }
  let numObjects = await reader.read(4);
  numObjects = numObjects.readUInt32BE(0);
  if (numObjects < 1) return;
  while (!reader.eof() && numObjects--) {
    const offset = reader.tell();
    const { type, length, ofs, reference } = await parseHeader(reader);
    const inflator = new import_pako.default.Inflate();
    while (!inflator.result) {
      const chunk = await reader.chunk();
      if (!chunk) break;
      inflator.push(chunk, false);
      if (inflator.err) {
        throw new InternalError(`Pako error: ${inflator.msg}`);
      }
      if (inflator.result) {
        if (inflator.result.length !== length) {
          throw new InternalError(
            `Inflated object size is different from that stated in packfile.`
          );
        }
        await reader.undo();
        await reader.read(chunk.length - inflator.strm.avail_in);
        const end = reader.tell();
        await onData({
          data: inflator.result,
          type,
          num: numObjects,
          offset,
          end,
          reference,
          ofs
        });
      }
    }
  }
}
async function parseHeader(reader) {
  let byte = await reader.byte();
  const type = byte >> 4 & 7;
  let length = byte & 15;
  if (byte & 128) {
    let shift = 4;
    do {
      byte = await reader.byte();
      length |= (byte & 127) << shift;
      shift += 7;
    } while (byte & 128);
  }
  let ofs;
  let reference;
  if (type === 6) {
    let shift = 0;
    ofs = 0;
    const bytes = [];
    do {
      byte = await reader.byte();
      ofs |= (byte & 127) << shift;
      shift += 7;
      bytes.push(byte);
    } while (byte & 128);
    reference = Buffer.from(bytes);
  }
  if (type === 7) {
    const buf = await reader.read(20);
    reference = buf;
  }
  return { type, length, ofs, reference };
}
var supportsDecompressionStream = false;
async function inflate(buffer) {
  if (supportsDecompressionStream === null) {
    supportsDecompressionStream = testDecompressionStream();
  }
  return supportsDecompressionStream ? browserInflate(buffer) : import_pako.default.inflate(buffer);
}
async function browserInflate(buffer) {
  const ds = new DecompressionStream("deflate");
  const d = new Blob([buffer]).stream().pipeThrough(ds);
  return new Uint8Array(await new Response(d).arrayBuffer());
}
function testDecompressionStream() {
  try {
    const ds = new DecompressionStream("deflate");
    if (ds) return true;
  } catch (_) {
  }
  return false;
}
function decodeVarInt(reader) {
  const bytes = [];
  let byte = 0;
  let multibyte = 0;
  do {
    byte = reader.readUInt8();
    const lastSeven = byte & 127;
    bytes.push(lastSeven);
    multibyte = byte & 128;
  } while (multibyte);
  return bytes.reduce((a, b) => a + 1 << 7 | b, -1);
}
function otherVarIntDecode(reader, startWith) {
  let result = startWith;
  let shift = 4;
  let byte = null;
  do {
    byte = reader.readUInt8();
    result |= (byte & 127) << shift;
    shift += 7;
  } while (byte & 128);
  return result;
}
var GitPackIndex = class _GitPackIndex {
  constructor(stuff) {
    Object.assign(this, stuff);
    this.offsetCache = {};
  }
  static async fromIdx({ idx, getExternalRefDelta }) {
    const reader = new BufferCursor(idx);
    const magic = reader.slice(4).toString("hex");
    if (magic !== "ff744f63") {
      return;
    }
    const version2 = reader.readUInt32BE();
    if (version2 !== 2) {
      throw new InternalError(
        `Unable to read version ${version2} packfile IDX. (Only version 2 supported)`
      );
    }
    if (idx.byteLength > 2048 * 1024 * 1024) {
      throw new InternalError(
        `To keep implementation simple, I haven't implemented the layer 5 feature needed to support packfiles > 2GB in size.`
      );
    }
    reader.seek(reader.tell() + 4 * 255);
    const size = reader.readUInt32BE();
    const hashes = [];
    for (let i = 0; i < size; i++) {
      const hash = reader.slice(20).toString("hex");
      hashes[i] = hash;
    }
    reader.seek(reader.tell() + 4 * size);
    const offsets = /* @__PURE__ */ new Map();
    for (let i = 0; i < size; i++) {
      offsets.set(hashes[i], reader.readUInt32BE());
    }
    const packfileSha = reader.slice(20).toString("hex");
    return new _GitPackIndex({
      hashes,
      crcs: {},
      offsets,
      packfileSha,
      getExternalRefDelta
    });
  }
  static async fromPack({ pack, getExternalRefDelta, onProgress }) {
    const listpackTypes = {
      1: "commit",
      2: "tree",
      3: "blob",
      4: "tag",
      6: "ofs-delta",
      7: "ref-delta"
    };
    const offsetToObject = {};
    const packfileSha = pack.slice(-20).toString("hex");
    const hashes = [];
    const crcs = {};
    const offsets = /* @__PURE__ */ new Map();
    let totalObjectCount = null;
    let lastPercent = null;
    await listpack([pack], async ({ data, type, reference, offset, num: num2 }) => {
      if (totalObjectCount === null) totalObjectCount = num2;
      const percent = Math.floor(
        (totalObjectCount - num2) * 100 / totalObjectCount
      );
      if (percent !== lastPercent) {
        if (onProgress) {
          await onProgress({
            phase: "Receiving objects",
            loaded: totalObjectCount - num2,
            total: totalObjectCount
          });
        }
      }
      lastPercent = percent;
      type = listpackTypes[type];
      if (["commit", "tree", "blob", "tag"].includes(type)) {
        offsetToObject[offset] = {
          type,
          offset
        };
      } else if (type === "ofs-delta") {
        offsetToObject[offset] = {
          type,
          offset
        };
      } else if (type === "ref-delta") {
        offsetToObject[offset] = {
          type,
          offset
        };
      }
    });
    const offsetArray = Object.keys(offsetToObject).map(Number);
    for (const [i, start] of offsetArray.entries()) {
      const end = i + 1 === offsetArray.length ? pack.byteLength - 20 : offsetArray[i + 1];
      const o = offsetToObject[start];
      const crc = import_crc_32.default.buf(pack.slice(start, end)) >>> 0;
      o.end = end;
      o.crc = crc;
    }
    const p = new _GitPackIndex({
      pack: Promise.resolve(pack),
      packfileSha,
      crcs,
      hashes,
      offsets,
      getExternalRefDelta
    });
    lastPercent = null;
    let count = 0;
    const objectsByDepth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let offset in offsetToObject) {
      offset = Number(offset);
      const percent = Math.floor(count * 100 / totalObjectCount);
      if (percent !== lastPercent) {
        if (onProgress) {
          await onProgress({
            phase: "Resolving deltas",
            loaded: count,
            total: totalObjectCount
          });
        }
      }
      count++;
      lastPercent = percent;
      const o = offsetToObject[offset];
      if (o.oid) continue;
      try {
        p.readDepth = 0;
        p.externalReadDepth = 0;
        const { type, object } = await p.readSlice({ start: offset });
        objectsByDepth[p.readDepth] += 1;
        const oid = await shasum(GitObject.wrap({ type, object }));
        o.oid = oid;
        hashes.push(oid);
        offsets.set(oid, offset);
        crcs[oid] = o.crc;
      } catch (err) {
        continue;
      }
    }
    hashes.sort();
    return p;
  }
  async toBuffer() {
    const buffers = [];
    const write = (str, encoding) => {
      buffers.push(Buffer.from(str, encoding));
    };
    write("ff744f63", "hex");
    write("00000002", "hex");
    const fanoutBuffer = new BufferCursor(Buffer.alloc(256 * 4));
    for (let i = 0; i < 256; i++) {
      let count = 0;
      for (const hash of this.hashes) {
        if (parseInt(hash.slice(0, 2), 16) <= i) count++;
      }
      fanoutBuffer.writeUInt32BE(count);
    }
    buffers.push(fanoutBuffer.buffer);
    for (const hash of this.hashes) {
      write(hash, "hex");
    }
    const crcsBuffer = new BufferCursor(Buffer.alloc(this.hashes.length * 4));
    for (const hash of this.hashes) {
      crcsBuffer.writeUInt32BE(this.crcs[hash]);
    }
    buffers.push(crcsBuffer.buffer);
    const offsetsBuffer = new BufferCursor(Buffer.alloc(this.hashes.length * 4));
    for (const hash of this.hashes) {
      offsetsBuffer.writeUInt32BE(this.offsets.get(hash));
    }
    buffers.push(offsetsBuffer.buffer);
    write(this.packfileSha, "hex");
    const totalBuffer = Buffer.concat(buffers);
    const sha = await shasum(totalBuffer);
    const shaBuffer = Buffer.alloc(20);
    shaBuffer.write(sha, "hex");
    return Buffer.concat([totalBuffer, shaBuffer]);
  }
  async load({ pack }) {
    this.pack = pack;
  }
  async unload() {
    this.pack = null;
  }
  async read({ oid }) {
    if (!this.offsets.get(oid)) {
      if (this.getExternalRefDelta) {
        this.externalReadDepth++;
        return this.getExternalRefDelta(oid);
      } else {
        throw new InternalError(`Could not read object ${oid} from packfile`);
      }
    }
    const start = this.offsets.get(oid);
    return this.readSlice({ start });
  }
  async readSlice({ start }) {
    if (this.offsetCache[start]) {
      return Object.assign({}, this.offsetCache[start]);
    }
    this.readDepth++;
    const types2 = {
      16: "commit",
      32: "tree",
      48: "blob",
      64: "tag",
      96: "ofs_delta",
      112: "ref_delta"
    };
    const pack = await this.pack;
    if (!pack) {
      throw new InternalError(
        "Could not read packfile data. The packfile may be missing, corrupted, or too large to read into memory."
      );
    }
    const raw = pack.slice(start);
    const reader = new BufferCursor(raw);
    const byte = reader.readUInt8();
    const btype = byte & 112;
    let type = types2[btype];
    if (type === void 0) {
      throw new InternalError("Unrecognized type: 0b" + btype.toString(2));
    }
    const lastFour = byte & 15;
    let length = lastFour;
    const multibyte = byte & 128;
    if (multibyte) {
      length = otherVarIntDecode(reader, lastFour);
    }
    let base = null;
    let object = null;
    if (type === "ofs_delta") {
      const offset = decodeVarInt(reader);
      const baseOffset = start - offset;
      ({ object: base, type } = await this.readSlice({ start: baseOffset }));
    }
    if (type === "ref_delta") {
      const oid = reader.slice(20).toString("hex");
      ({ object: base, type } = await this.read({ oid }));
    }
    const buffer = raw.slice(reader.tell());
    object = Buffer.from(await inflate(buffer));
    if (object.byteLength !== length) {
      throw new InternalError(
        `Packfile told us object would have length ${length} but it had length ${object.byteLength}`
      );
    }
    if (base) {
      object = Buffer.from(applyDelta(object, base));
    }
    if (this.readDepth > 3) {
      this.offsetCache[start] = { type, object };
    }
    return { type, format: "content", object };
  }
};
var PackfileCache = /* @__PURE__ */ Symbol("PackfileCache");
async function loadPackIndex({
  fs: fs2,
  filename,
  getExternalRefDelta,
  emitter,
  emitterPrefix
}) {
  const idx = await fs2.read(filename);
  return GitPackIndex.fromIdx({ idx, getExternalRefDelta });
}
function readPackIndex({
  fs: fs2,
  cache,
  filename,
  getExternalRefDelta,
  emitter,
  emitterPrefix
}) {
  if (!cache[PackfileCache]) cache[PackfileCache] = /* @__PURE__ */ new Map();
  let p = cache[PackfileCache].get(filename);
  if (!p) {
    p = loadPackIndex({
      fs: fs2,
      filename,
      getExternalRefDelta,
      emitter,
      emitterPrefix
    });
    cache[PackfileCache].set(filename, p);
  }
  return p;
}
async function shasumRange(buffer, { start = 0, end = buffer.length } = {}) {
  return shasum(buffer.subarray(start, end));
}
async function readObjectPacked({
  fs: fs2,
  cache,
  gitdir,
  oid,
  format = "content",
  getExternalRefDelta
}) {
  let list = await fs2.readdir(join(gitdir, "objects/pack"));
  list = list.filter((x) => x.endsWith(".idx"));
  for (const filename of list) {
    const indexFile = `${gitdir}/objects/pack/${filename}`;
    const p = await readPackIndex({
      fs: fs2,
      cache,
      filename: indexFile,
      getExternalRefDelta
    });
    if (p.error) throw new InternalError(p.error);
    if (p.offsets.has(oid)) {
      const packFile = indexFile.replace(/idx$/, "pack");
      if (!p.pack) {
        p.pack = fs2.read(packFile);
      }
      const pack = await p.pack;
      if (!pack) {
        p.pack = null;
        throw new InternalError(
          `Could not read packfile at ${packFile}. The file may be missing, corrupted, or too large to read into memory.`
        );
      }
      if (!p._checksumVerified) {
        const expectedShaFromIndex = p.packfileSha;
        const packTrailer = pack.subarray(-20);
        const packTrailerSha = Array.from(packTrailer).map((b) => b.toString(16).padStart(2, "0")).join("");
        if (packTrailerSha !== expectedShaFromIndex) {
          throw new InternalError(
            `Packfile trailer mismatch: expected ${expectedShaFromIndex}, got ${packTrailerSha}. The packfile may be corrupted.`
          );
        }
        const actualPayloadSha = await shasumRange(pack, {
          start: 0,
          end: pack.length - 20
        });
        if (actualPayloadSha !== expectedShaFromIndex) {
          throw new InternalError(
            `Packfile payload corrupted: calculated ${actualPayloadSha} but expected ${expectedShaFromIndex}. The packfile may have been tampered with.`
          );
        }
        p._checksumVerified = true;
      }
      const result = await p.read({ oid, getExternalRefDelta });
      result.format = "content";
      result.source = `objects/pack/${filename.replace(/idx$/, "pack")}`;
      return result;
    }
  }
  return null;
}
async function _readObject({
  fs: fs2,
  cache,
  gitdir,
  oid,
  format = "content"
}) {
  if (!["deflated", "wrapped", "content"].includes(format)) {
    throw new InternalError(`invalid requested format "${format}"`);
  }
  const getExternalRefDelta = (oid2) => _readObject({ fs: fs2, cache, gitdir, oid: oid2 });
  let result;
  if (oid === "4b825dc642cb6eb9a060e54bf8d69288fbee4904") {
    result = { format: "wrapped", object: Buffer.from(`tree 0\0`) };
  }
  if (!result) {
    result = await readObjectLoose({ fs: fs2, gitdir, oid });
  }
  if (!result) {
    result = await readObjectPacked({
      fs: fs2,
      cache,
      gitdir,
      oid,
      getExternalRefDelta
    });
    if (!result) {
      throw new NotFoundError(oid);
    }
    return result;
  }
  if (format === "deflated") {
    return result;
  }
  if (result.format === "deflated") {
    result.object = Buffer.from(await inflate(result.object));
    result.format = "wrapped";
  }
  if (format === "wrapped") {
    return result;
  }
  const sha = await shasum(result.object);
  if (sha !== oid) {
    throw new InternalError(
      `SHA check failed! Expected ${oid}, computed ${sha}`
    );
  }
  const { object, type } = GitObject.unwrap(result.object);
  result.type = type;
  result.object = object;
  result.format = "content";
  return result;
}
var AlreadyExistsError = class _AlreadyExistsError extends BaseError {
  /**
   * @param {'note'|'remote'|'tag'|'branch'} noun
   * @param {string} where
   * @param {boolean} canForce
   */
  constructor(noun, where, canForce = true) {
    super(
      `Failed to create ${noun} at ${where} because it already exists.${canForce ? ` (Hint: use 'force: true' parameter to overwrite existing ${noun}.)` : ""}`
    );
    this.code = this.name = _AlreadyExistsError.code;
    this.data = { noun, where, canForce };
  }
};
AlreadyExistsError.code = "AlreadyExistsError";
var AmbiguousError = class _AmbiguousError extends BaseError {
  /**
   * @param {'oids'|'refs'} nouns
   * @param {string} short
   * @param {string[]} matches
   */
  constructor(nouns, short, matches) {
    super(
      `Found multiple ${nouns} matching "${short}" (${matches.join(
        ", "
      )}). Use a longer abbreviation length to disambiguate them.`
    );
    this.code = this.name = _AmbiguousError.code;
    this.data = { nouns, short, matches };
  }
};
AmbiguousError.code = "AmbiguousError";
var CheckoutConflictError = class _CheckoutConflictError extends BaseError {
  /**
   * @param {string[]} filepaths
   */
  constructor(filepaths) {
    super(
      `Your local changes to the following files would be overwritten by checkout: ${filepaths.join(
        ", "
      )}`
    );
    this.code = this.name = _CheckoutConflictError.code;
    this.data = { filepaths };
  }
};
CheckoutConflictError.code = "CheckoutConflictError";
var CherryPickMergeCommitError = class _CherryPickMergeCommitError extends BaseError {
  /**
   * @param {string} oid
   * @param {number} parentCount
   */
  constructor(oid, parentCount) {
    super(
      `Cannot cherry-pick merge commit ${oid}. Merge commits have ${parentCount} parents and require specifying which parent to use as the base.`
    );
    this.code = this.name = _CherryPickMergeCommitError.code;
    this.data = { oid, parentCount };
  }
};
CherryPickMergeCommitError.code = "CherryPickMergeCommitError";
var CherryPickRootCommitError = class _CherryPickRootCommitError extends BaseError {
  /**
   * @param {string} oid
   */
  constructor(oid) {
    super(
      `Cannot cherry-pick root commit ${oid}. Root commits have no parents.`
    );
    this.code = this.name = _CherryPickRootCommitError.code;
    this.data = { oid };
  }
};
CherryPickRootCommitError.code = "CherryPickRootCommitError";
var CommitNotFetchedError = class _CommitNotFetchedError extends BaseError {
  /**
   * @param {string} ref
   * @param {string} oid
   */
  constructor(ref, oid) {
    super(
      `Failed to checkout "${ref}" because commit ${oid} is not available locally. Do a git fetch to make the branch available locally.`
    );
    this.code = this.name = _CommitNotFetchedError.code;
    this.data = { ref, oid };
  }
};
CommitNotFetchedError.code = "CommitNotFetchedError";
var EmptyCommitError = class _EmptyCommitError extends BaseError {
  constructor() {
    super("Cannot create an empty commit when disallowEmpty is true.");
    this.code = this.name = _EmptyCommitError.code;
    this.data = {};
  }
};
EmptyCommitError.code = "EmptyCommitError";
var EmptyServerResponseError = class _EmptyServerResponseError extends BaseError {
  constructor() {
    super(`Empty response from git server.`);
    this.code = this.name = _EmptyServerResponseError.code;
    this.data = {};
  }
};
EmptyServerResponseError.code = "EmptyServerResponseError";
var FastForwardError = class _FastForwardError extends BaseError {
  constructor() {
    super(`A simple fast-forward merge was not possible.`);
    this.code = this.name = _FastForwardError.code;
    this.data = {};
  }
};
FastForwardError.code = "FastForwardError";
var GitPushError = class _GitPushError extends BaseError {
  /**
   * @param {string} prettyDetails
   * @param {PushResult} result
   */
  constructor(prettyDetails, result) {
    super(`One or more branches were not updated: ${prettyDetails}`);
    this.code = this.name = _GitPushError.code;
    this.data = { prettyDetails, result };
  }
};
GitPushError.code = "GitPushError";
var HttpError = class _HttpError extends BaseError {
  /**
   * @param {number} statusCode
   * @param {string} statusMessage
   * @param {string} response
   */
  constructor(statusCode, statusMessage, response) {
    super(`HTTP Error: ${statusCode} ${statusMessage}`);
    this.code = this.name = _HttpError.code;
    this.data = { statusCode, statusMessage, response };
  }
};
HttpError.code = "HttpError";
var InvalidFilepathError = class _InvalidFilepathError extends BaseError {
  /**
   * @param {'leading-slash'|'trailing-slash'|'directory'} [reason]
   */
  constructor(reason) {
    let message = "invalid filepath";
    if (reason === "leading-slash" || reason === "trailing-slash") {
      message = `"filepath" parameter should not include leading or trailing directory separators because these can cause problems on some platforms.`;
    } else if (reason === "directory") {
      message = `"filepath" should not be a directory.`;
    }
    super(message);
    this.code = this.name = _InvalidFilepathError.code;
    this.data = { reason };
  }
};
InvalidFilepathError.code = "InvalidFilepathError";
var MaxDepthError = class _MaxDepthError extends BaseError {
  /**
   * @param {number} depth
   */
  constructor(depth) {
    super(`Maximum search depth of ${depth} exceeded.`);
    this.code = this.name = _MaxDepthError.code;
    this.data = { depth };
  }
};
MaxDepthError.code = "MaxDepthError";
var MergeNotSupportedError = class _MergeNotSupportedError extends BaseError {
  constructor() {
    super(`Merges with conflicts are not supported yet.`);
    this.code = this.name = _MergeNotSupportedError.code;
    this.data = {};
  }
};
MergeNotSupportedError.code = "MergeNotSupportedError";
var MergeConflictError = class _MergeConflictError extends BaseError {
  /**
   * @param {Array<string>} filepaths
   * @param {Array<string>} bothModified
   * @param {Array<string>} deleteByUs
   * @param {Array<string>} deleteByTheirs
   */
  constructor(filepaths, bothModified, deleteByUs, deleteByTheirs) {
    super(
      `Automatic merge failed with one or more merge conflicts in the following files: ${filepaths.toString()}. Fix conflicts then commit the result.`
    );
    this.code = this.name = _MergeConflictError.code;
    this.data = { filepaths, bothModified, deleteByUs, deleteByTheirs };
  }
};
MergeConflictError.code = "MergeConflictError";
var MissingNameError = class _MissingNameError extends BaseError {
  /**
   * @param {'author'|'committer'|'tagger'} role
   */
  constructor(role) {
    super(
      `No name was provided for ${role} in the argument or in the .git/config file.`
    );
    this.code = this.name = _MissingNameError.code;
    this.data = { role };
  }
};
MissingNameError.code = "MissingNameError";
var MissingParameterError = class _MissingParameterError extends BaseError {
  /**
   * @param {string} parameter
   */
  constructor(parameter) {
    super(
      `The function requires a "${parameter}" parameter but none was provided.`
    );
    this.code = this.name = _MissingParameterError.code;
    this.data = { parameter };
  }
};
MissingParameterError.code = "MissingParameterError";
var MultipleGitError = class _MultipleGitError extends BaseError {
  /**
   * @param {Error[]} errors
   * @param {string} message
   */
  constructor(errors) {
    super(
      `There are multiple errors that were thrown by the method. Please refer to the "errors" property to see more`
    );
    this.code = this.name = _MultipleGitError.code;
    this.data = { errors };
    this.errors = errors;
  }
};
MultipleGitError.code = "MultipleGitError";
var ParseError = class _ParseError extends BaseError {
  /**
   * @param {string} expected
   * @param {string} actual
   */
  constructor(expected, actual) {
    super(`Expected "${expected}" but received "${actual}".`);
    this.code = this.name = _ParseError.code;
    this.data = { expected, actual };
  }
};
ParseError.code = "ParseError";
var PushRejectedError = class _PushRejectedError extends BaseError {
  /**
   * @param {'not-fast-forward'|'tag-exists'} reason
   */
  constructor(reason) {
    let message = "";
    if (reason === "not-fast-forward") {
      message = " because it was not a simple fast-forward";
    } else if (reason === "tag-exists") {
      message = " because tag already exists";
    }
    super(`Push rejected${message}. Use "force: true" to override.`);
    this.code = this.name = _PushRejectedError.code;
    this.data = { reason };
  }
};
PushRejectedError.code = "PushRejectedError";
var RemoteCapabilityError = class _RemoteCapabilityError extends BaseError {
  /**
   * @param {'shallow'|'deepen-since'|'deepen-not'|'deepen-relative'} capability
   * @param {'depth'|'since'|'exclude'|'relative'} parameter
   */
  constructor(capability, parameter) {
    super(
      `Remote does not support the "${capability}" so the "${parameter}" parameter cannot be used.`
    );
    this.code = this.name = _RemoteCapabilityError.code;
    this.data = { capability, parameter };
  }
};
RemoteCapabilityError.code = "RemoteCapabilityError";
var SmartHttpError = class _SmartHttpError extends BaseError {
  /**
   * @param {string} preview
   * @param {string} response
   */
  constructor(preview, response) {
    super(
      `Remote did not reply using the "smart" HTTP protocol. Expected "001e# service=git-upload-pack" but received: ${preview}`
    );
    this.code = this.name = _SmartHttpError.code;
    this.data = { preview, response };
  }
};
SmartHttpError.code = "SmartHttpError";
var UnknownTransportError = class _UnknownTransportError extends BaseError {
  /**
   * @param {string} url
   * @param {string} transport
   * @param {string} [suggestion]
   */
  constructor(url, transport, suggestion) {
    super(
      `Git remote "${url}" uses an unrecognized transport protocol: "${transport}"`
    );
    this.code = this.name = _UnknownTransportError.code;
    this.data = { url, transport, suggestion };
  }
};
UnknownTransportError.code = "UnknownTransportError";
var UrlParseError = class _UrlParseError extends BaseError {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(`Cannot parse remote URL: "${url}"`);
    this.code = this.name = _UrlParseError.code;
    this.data = { url };
  }
};
UrlParseError.code = "UrlParseError";
var UserCanceledError = class _UserCanceledError extends BaseError {
  constructor() {
    super(`The operation was canceled.`);
    this.code = this.name = _UserCanceledError.code;
    this.data = {};
  }
};
UserCanceledError.code = "UserCanceledError";
var IndexResetError = class _IndexResetError extends BaseError {
  /**
   * @param {Array<string>} filepaths
   */
  constructor(filepath) {
    super(
      `Could not merge index: Entry for '${filepath}' is not up to date. Either reset the index entry to HEAD, or stage your unstaged changes.`
    );
    this.code = this.name = _IndexResetError.code;
    this.data = { filepath };
  }
};
IndexResetError.code = "IndexResetError";
var NoCommitError = class _NoCommitError extends BaseError {
  /**
   * @param {string} ref
   */
  constructor(ref) {
    super(
      `"${ref}" does not point to any commit. You're maybe working on a repository with no commits yet. `
    );
    this.code = this.name = _NoCommitError.code;
    this.data = { ref };
  }
};
NoCommitError.code = "NoCommitError";
var Errors = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  AlreadyExistsError,
  AmbiguousError,
  CheckoutConflictError,
  CherryPickMergeCommitError,
  CherryPickRootCommitError,
  CommitNotFetchedError,
  EmptyCommitError,
  EmptyServerResponseError,
  FastForwardError,
  GitPushError,
  HttpError,
  InternalError,
  InvalidFilepathError,
  InvalidOidError,
  InvalidRefNameError,
  MaxDepthError,
  MergeNotSupportedError,
  MergeConflictError,
  MissingNameError,
  MissingParameterError,
  MultipleGitError,
  NoRefspecError,
  NotFoundError,
  ObjectTypeError,
  ParseError,
  PushRejectedError,
  RemoteCapabilityError,
  SmartHttpError,
  UnknownTransportError,
  UnsafeFilepathError,
  UrlParseError,
  UserCanceledError,
  UnmergedPathsError,
  IndexResetError,
  NoCommitError
});
function formatAuthor({ name, email, timestamp, timezoneOffset }) {
  timezoneOffset = formatTimezoneOffset(timezoneOffset);
  return `${name} <${email}> ${timestamp} ${timezoneOffset}`;
}
function formatTimezoneOffset(minutes) {
  const sign = simpleSign(negateExceptForZero(minutes));
  minutes = Math.abs(minutes);
  const hours = Math.floor(minutes / 60);
  minutes -= hours * 60;
  let strHours = String(hours);
  let strMinutes = String(minutes);
  if (strHours.length < 2) strHours = "0" + strHours;
  if (strMinutes.length < 2) strMinutes = "0" + strMinutes;
  return (sign === -1 ? "-" : "+") + strHours + strMinutes;
}
function simpleSign(n) {
  return Math.sign(n) || (Object.is(n, -0) ? -1 : 1);
}
function negateExceptForZero(n) {
  return n === 0 ? n : -n;
}
function normalizeNewlines(str) {
  str = str.replace(/\r/g, "");
  str = str.replace(/^\n+/, "");
  str = str.replace(/\n+$/, "") + "\n";
  return str;
}
function parseAuthor(author) {
  const [, name, email, timestamp, offset] = author.match(
    /^(.*) <(.*)> (.*) (.*)$/
  );
  return {
    name,
    email,
    timestamp: Number(timestamp),
    timezoneOffset: parseTimezoneOffset(offset)
  };
}
function parseTimezoneOffset(offset) {
  let [, sign, hours, minutes] = offset.match(/(\+|-)(\d\d)(\d\d)/);
  minutes = (sign === "+" ? 1 : -1) * (Number(hours) * 60 + Number(minutes));
  return negateExceptForZero$1(minutes);
}
function negateExceptForZero$1(n) {
  return n === 0 ? n : -n;
}
var GitAnnotatedTag = class _GitAnnotatedTag {
  constructor(tag2) {
    if (typeof tag2 === "string") {
      this._tag = tag2;
    } else if (Buffer.isBuffer(tag2)) {
      this._tag = tag2.toString("utf8");
    } else if (typeof tag2 === "object") {
      this._tag = _GitAnnotatedTag.render(tag2);
    } else {
      throw new InternalError(
        "invalid type passed to GitAnnotatedTag constructor"
      );
    }
  }
  static from(tag2) {
    return new _GitAnnotatedTag(tag2);
  }
  static render(obj) {
    return `object ${obj.object}
type ${obj.type}
tag ${obj.tag}
tagger ${formatAuthor(obj.tagger)}

${obj.message}
${obj.gpgsig ? obj.gpgsig : ""}`;
  }
  justHeaders() {
    return this._tag.slice(0, this._tag.indexOf("\n\n"));
  }
  message() {
    const tag2 = this.withoutSignature();
    return tag2.slice(tag2.indexOf("\n\n") + 2);
  }
  parse() {
    return Object.assign(this.headers(), {
      message: this.message(),
      gpgsig: this.gpgsig()
    });
  }
  render() {
    return this._tag;
  }
  headers() {
    const headers = this.justHeaders().split("\n");
    const hs = [];
    for (const h of headers) {
      if (h[0] === " ") {
        hs[hs.length - 1] += "\n" + h.slice(1);
      } else {
        hs.push(h);
      }
    }
    const obj = {};
    for (const h of hs) {
      const key = h.slice(0, h.indexOf(" "));
      const value = h.slice(h.indexOf(" ") + 1);
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = value;
      }
    }
    if (obj.tagger) {
      obj.tagger = parseAuthor(obj.tagger);
    }
    if (obj.committer) {
      obj.committer = parseAuthor(obj.committer);
    }
    return obj;
  }
  withoutSignature() {
    const tag2 = normalizeNewlines(this._tag);
    if (tag2.indexOf("\n-----BEGIN PGP SIGNATURE-----") === -1) return tag2;
    return tag2.slice(0, tag2.lastIndexOf("\n-----BEGIN PGP SIGNATURE-----"));
  }
  gpgsig() {
    if (this._tag.indexOf("\n-----BEGIN PGP SIGNATURE-----") === -1) return;
    const signature = this._tag.slice(
      this._tag.indexOf("-----BEGIN PGP SIGNATURE-----"),
      this._tag.indexOf("-----END PGP SIGNATURE-----") + "-----END PGP SIGNATURE-----".length
    );
    return normalizeNewlines(signature);
  }
  payload() {
    return this.withoutSignature() + "\n";
  }
  toObject() {
    return Buffer.from(this._tag, "utf8");
  }
  static async sign(tag2, sign, secretKey) {
    const payload = tag2.payload();
    let { signature } = await sign({ payload, secretKey });
    signature = normalizeNewlines(signature);
    const signedTag = payload + signature;
    return _GitAnnotatedTag.from(signedTag);
  }
};
function indent(str) {
  return str.trim().split("\n").map((x) => " " + x).join("\n") + "\n";
}
function outdent(str) {
  return str.split("\n").map((x) => x.replace(/^ /, "")).join("\n");
}
var GitCommit = class _GitCommit {
  constructor(commit2) {
    if (typeof commit2 === "string") {
      this._commit = commit2;
    } else if (Buffer.isBuffer(commit2)) {
      this._commit = commit2.toString("utf8");
    } else if (typeof commit2 === "object") {
      this._commit = _GitCommit.render(commit2);
    } else {
      throw new InternalError("invalid type passed to GitCommit constructor");
    }
  }
  static fromPayloadSignature({ payload, signature }) {
    const headers = _GitCommit.justHeaders(payload);
    const message = _GitCommit.justMessage(payload);
    const commit2 = normalizeNewlines(
      headers + "\ngpgsig" + indent(signature) + "\n" + message
    );
    return new _GitCommit(commit2);
  }
  static from(commit2) {
    return new _GitCommit(commit2);
  }
  toObject() {
    return Buffer.from(this._commit, "utf8");
  }
  // Todo: allow setting the headers and message
  headers() {
    return this.parseHeaders();
  }
  // Todo: allow setting the headers and message
  message() {
    return _GitCommit.justMessage(this._commit);
  }
  parse() {
    return Object.assign({ message: this.message() }, this.headers());
  }
  static justMessage(commit2) {
    return normalizeNewlines(commit2.slice(commit2.indexOf("\n\n") + 2));
  }
  static justHeaders(commit2) {
    return commit2.slice(0, commit2.indexOf("\n\n"));
  }
  parseHeaders() {
    const headers = _GitCommit.justHeaders(this._commit).split("\n");
    const hs = [];
    for (const h of headers) {
      if (h[0] === " ") {
        hs[hs.length - 1] += "\n" + h.slice(1);
      } else {
        hs.push(h);
      }
    }
    const obj = {
      parent: []
    };
    for (const h of hs) {
      const key = h.slice(0, h.indexOf(" "));
      const value = h.slice(h.indexOf(" ") + 1);
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = value;
      }
    }
    if (obj.author) {
      obj.author = parseAuthor(obj.author);
    }
    if (obj.committer) {
      obj.committer = parseAuthor(obj.committer);
    }
    return obj;
  }
  static renderHeaders(obj) {
    let headers = "";
    if (obj.tree) {
      headers += `tree ${obj.tree}
`;
    } else {
      headers += `tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
`;
    }
    if (obj.parent) {
      if (obj.parent.length === void 0) {
        throw new InternalError(`commit 'parent' property should be an array`);
      }
      for (const p of obj.parent) {
        headers += `parent ${p}
`;
      }
    }
    const author = obj.author;
    headers += `author ${formatAuthor(author)}
`;
    const committer = obj.committer || obj.author;
    headers += `committer ${formatAuthor(committer)}
`;
    if (obj.gpgsig) {
      headers += "gpgsig" + indent(obj.gpgsig);
    }
    return headers;
  }
  static render(obj) {
    return _GitCommit.renderHeaders(obj) + "\n" + normalizeNewlines(obj.message);
  }
  render() {
    return this._commit;
  }
  withoutSignature() {
    const commit2 = normalizeNewlines(this._commit);
    if (commit2.indexOf("\ngpgsig") === -1) return commit2;
    const headers = commit2.slice(0, commit2.indexOf("\ngpgsig"));
    const message = commit2.slice(
      commit2.indexOf("-----END PGP SIGNATURE-----\n") + "-----END PGP SIGNATURE-----\n".length
    );
    return normalizeNewlines(headers + "\n" + message);
  }
  isolateSignature() {
    const signature = this._commit.slice(
      this._commit.indexOf("-----BEGIN PGP SIGNATURE-----"),
      this._commit.indexOf("-----END PGP SIGNATURE-----") + "-----END PGP SIGNATURE-----".length
    );
    return outdent(signature);
  }
  static async sign(commit2, sign, secretKey) {
    const payload = commit2.withoutSignature();
    const message = _GitCommit.justMessage(commit2._commit);
    let { signature } = await sign({ payload, secretKey });
    signature = normalizeNewlines(signature);
    const headers = _GitCommit.justHeaders(commit2._commit);
    const signedCommit = headers + "\ngpgsig" + indent(signature) + "\n" + message;
    return _GitCommit.from(signedCommit);
  }
};
async function resolveTree({ fs: fs2, cache, gitdir, oid }) {
  if (oid === "4b825dc642cb6eb9a060e54bf8d69288fbee4904") {
    return { tree: GitTree.from([]), oid };
  }
  const { type, object } = await _readObject({ fs: fs2, cache, gitdir, oid });
  if (type === "tag") {
    oid = GitAnnotatedTag.from(object).parse().object;
    return resolveTree({ fs: fs2, cache, gitdir, oid });
  }
  if (type === "commit") {
    oid = GitCommit.from(object).parse().tree;
    return resolveTree({ fs: fs2, cache, gitdir, oid });
  }
  if (type !== "tree") {
    throw new ObjectTypeError(oid, type, "tree");
  }
  return { tree: GitTree.from(object), oid };
}
var GitWalkerRepo = class {
  constructor({ fs: fs2, gitdir, ref, cache }) {
    this.fs = fs2;
    this.cache = cache;
    this.gitdir = gitdir;
    this.mapPromise = (async () => {
      const map = /* @__PURE__ */ new Map();
      let oid;
      try {
        oid = await GitRefManager.resolve({ fs: fs2, gitdir, ref });
      } catch (e) {
        if (e instanceof NotFoundError && await GitRefManager.isUnbornBranch({ fs: fs2, gitdir, ref })) {
          oid = "4b825dc642cb6eb9a060e54bf8d69288fbee4904";
        } else {
          throw e;
        }
      }
      const tree = await resolveTree({ fs: fs2, cache: this.cache, gitdir, oid });
      tree.type = "tree";
      tree.mode = "40000";
      map.set(".", tree);
      return map;
    })();
    const walker = this;
    this.ConstructEntry = class TreeEntry {
      constructor(fullpath) {
        this._fullpath = fullpath;
        this._type = false;
        this._mode = false;
        this._stat = false;
        this._content = false;
        this._oid = false;
      }
      async type() {
        return walker.type(this);
      }
      async mode() {
        return walker.mode(this);
      }
      async stat() {
        return walker.stat(this);
      }
      async content() {
        return walker.content(this);
      }
      async oid() {
        return walker.oid(this);
      }
    };
  }
  async readdir(entry) {
    const filepath = entry._fullpath;
    const { fs: fs2, cache, gitdir } = this;
    const map = await this.mapPromise;
    const obj = map.get(filepath);
    if (!obj) throw new Error(`No obj for ${filepath}`);
    const oid = obj.oid;
    if (!oid) throw new Error(`No oid for obj ${JSON.stringify(obj)}`);
    if (obj.type !== "tree") {
      return null;
    }
    const { type, object } = await _readObject({ fs: fs2, cache, gitdir, oid });
    if (type !== obj.type) {
      throw new ObjectTypeError(oid, type, obj.type);
    }
    const tree = GitTree.from(object);
    for (const entry2 of tree) {
      map.set(join(filepath, entry2.path), entry2);
    }
    return tree.entries().map((entry2) => join(filepath, entry2.path));
  }
  async type(entry) {
    if (entry._type === false) {
      const map = await this.mapPromise;
      const { type } = map.get(entry._fullpath);
      entry._type = type;
    }
    return entry._type;
  }
  async mode(entry) {
    if (entry._mode === false) {
      const map = await this.mapPromise;
      const { mode } = map.get(entry._fullpath);
      entry._mode = normalizeMode(parseInt(mode, 8));
    }
    return entry._mode;
  }
  async stat(_entry) {
  }
  async content(entry) {
    if (entry._content === false) {
      const map = await this.mapPromise;
      const { fs: fs2, cache, gitdir } = this;
      const obj = map.get(entry._fullpath);
      const oid = obj.oid;
      const { type, object } = await _readObject({ fs: fs2, cache, gitdir, oid });
      if (type !== "blob") {
        entry._content = void 0;
      } else {
        entry._content = new Uint8Array(object);
      }
    }
    return entry._content;
  }
  async oid(entry) {
    if (entry._oid === false) {
      const map = await this.mapPromise;
      const obj = map.get(entry._fullpath);
      entry._oid = obj.oid;
    }
    return entry._oid;
  }
};
function TREE({ ref = "HEAD" } = {}) {
  const o = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(o, GitWalkSymbol, {
    value: function({ fs: fs2, gitdir, cache }) {
      return new GitWalkerRepo({ fs: fs2, gitdir, ref, cache });
    }
  });
  Object.freeze(o);
  return o;
}
var GitWalkerFs = class {
  constructor({ fs: fs2, dir, gitdir, cache, refresh = true }) {
    this.fs = fs2;
    this.cache = cache;
    this.dir = dir;
    this.gitdir = gitdir;
    this.refresh = refresh;
    this.config = null;
    const walker = this;
    this.ConstructEntry = class WorkdirEntry {
      constructor(fullpath) {
        this._fullpath = fullpath;
        this._type = false;
        this._mode = false;
        this._stat = false;
        this._content = false;
        this._oid = false;
      }
      async type() {
        return walker.type(this);
      }
      async mode() {
        return walker.mode(this);
      }
      async stat() {
        return walker.stat(this);
      }
      async content() {
        return walker.content(this);
      }
      async oid() {
        return walker.oid(this);
      }
    };
  }
  async readdir(entry) {
    if (await entry.type() !== "tree") return null;
    const filepath = entry._fullpath;
    const { fs: fs2, dir } = this;
    const names = await fs2.readdir(join(dir, filepath));
    if (names === null) return null;
    return names.map((name) => join(filepath, name));
  }
  async type(entry) {
    if (entry._type === false) {
      await entry.stat();
    }
    return entry._type;
  }
  async mode(entry) {
    if (entry._mode === false) {
      await entry.stat();
    }
    return entry._mode;
  }
  async stat(entry) {
    if (entry._stat === false) {
      const { fs: fs2, dir } = this;
      let stat = await fs2.lstat(`${dir}/${entry._fullpath}`);
      if (!stat) {
        throw new Error(
          `ENOENT: no such file or directory, lstat '${entry._fullpath}'`
        );
      }
      let type = stat.isDirectory() ? "tree" : "blob";
      if (type === "blob" && !stat.isFile() && !stat.isSymbolicLink()) {
        type = "special";
      }
      entry._type = type;
      stat = normalizeStats(stat);
      entry._mode = stat.mode;
      if (stat.size === -1 && entry._actualSize) {
        stat.size = entry._actualSize;
      }
      entry._stat = stat;
    }
    return entry._stat;
  }
  async content(entry) {
    if (entry._content === false) {
      const { fs: fs2, dir, gitdir } = this;
      if (await entry.type() === "tree") {
        entry._content = void 0;
      } else {
        let content;
        if (await entry.mode() >> 12 === 10) {
          content = await fs2.readlink(`${dir}/${entry._fullpath}`);
        } else {
          const config = await this._getGitConfig(fs2, gitdir);
          const autocrlf = await config.get("core.autocrlf");
          content = await fs2.read(`${dir}/${entry._fullpath}`, { autocrlf });
        }
        entry._actualSize = content.length;
        if (entry._stat && entry._stat.size === -1) {
          entry._stat.size = entry._actualSize;
        }
        entry._content = new Uint8Array(content);
      }
    }
    return entry._content;
  }
  async oid(entry) {
    if (entry._oid === false) {
      const self = this;
      const { fs: fs2, gitdir, cache } = this;
      let oid;
      await GitIndexManager.acquire(
        { fs: fs2, gitdir, cache },
        async function(index3) {
          const stage = index3.entriesMap.get(entry._fullpath);
          const stats = await entry.stat();
          const config = await self._getGitConfig(fs2, gitdir);
          const filemode = await config.get("core.filemode");
          const trustino = typeof process !== "undefined" ? !(process.platform === "win32") : true;
          if (!stage || compareStats(stats, stage, filemode, trustino)) {
            const content = await entry.content();
            if (content === void 0) {
              oid = void 0;
            } else {
              oid = await shasum(
                GitObject.wrap({ type: "blob", object: content })
              );
              if (self.refresh && stage && oid === stage.oid && (!filemode || stats.mode === stage.mode) && compareStats(stats, stage, filemode, trustino)) {
                index3.insert({
                  filepath: entry._fullpath,
                  stats,
                  oid
                });
              }
            }
          } else {
            oid = stage.oid;
          }
        }
      );
      entry._oid = oid;
    }
    return entry._oid;
  }
  async _getGitConfig(fs2, gitdir) {
    if (this.config) {
      return this.config;
    }
    this.config = await GitConfigManager.get({ fs: fs2, gitdir });
    return this.config;
  }
};
function WORKDIR({ refresh = true } = {}) {
  const o = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(o, GitWalkSymbol, {
    value: function({ fs: fs2, dir, gitdir, cache }) {
      return new GitWalkerFs({ fs: fs2, dir, gitdir, cache, refresh });
    }
  });
  Object.freeze(o);
  return o;
}
function arrayRange(start, end) {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
}
var flat = typeof Array.prototype.flat === "undefined" ? (entries) => entries.reduce((acc, x) => acc.concat(x), []) : (entries) => entries.flat();
var RunningMinimum = class {
  constructor() {
    this.value = null;
  }
  consider(value) {
    if (value === null || value === void 0) return;
    if (this.value === null) {
      this.value = value;
    } else if (value < this.value) {
      this.value = value;
    }
  }
  reset() {
    this.value = null;
  }
};
function* unionOfIterators(sets) {
  const min = new RunningMinimum();
  let minimum;
  const heads = [];
  const numsets = sets.length;
  for (let i = 0; i < numsets; i++) {
    heads[i] = sets[i].next().value;
    if (heads[i] !== void 0) {
      min.consider(heads[i]);
    }
  }
  if (min.value === null) return;
  while (true) {
    const result = [];
    minimum = min.value;
    min.reset();
    for (let i = 0; i < numsets; i++) {
      if (heads[i] !== void 0 && heads[i] === minimum) {
        result[i] = heads[i];
        heads[i] = sets[i].next().value;
      } else {
        result[i] = null;
      }
      if (heads[i] !== void 0) {
        min.consider(heads[i]);
      }
    }
    yield result;
    if (min.value === null) return;
  }
}
async function _walk({
  fs: fs2,
  cache,
  dir,
  gitdir,
  trees,
  // @ts-ignore
  map = async (_, entry) => entry,
  // The default reducer is a flatmap that filters out undefineds.
  reduce = async (parent, children) => {
    const flatten = flat(children);
    if (parent !== void 0) flatten.unshift(parent);
    return flatten;
  },
  // The default iterate function walks all children concurrently
  iterate = (walk2, children) => Promise.all([...children].map(walk2))
}) {
  const walkers = trees.map(
    (proxy) => proxy[GitWalkSymbol]({ fs: fs2, dir, gitdir, cache })
  );
  const root = new Array(walkers.length).fill(".");
  const range2 = arrayRange(0, walkers.length);
  const unionWalkerFromReaddir = async (entries) => {
    range2.forEach((i) => {
      const entry = entries[i];
      entries[i] = entry && new walkers[i].ConstructEntry(entry);
    });
    const subdirs = await Promise.all(
      range2.map((i) => {
        const entry = entries[i];
        return entry ? walkers[i].readdir(entry) : [];
      })
    );
    const iterators = subdirs.map((array) => {
      return (array === null ? [] : array)[Symbol.iterator]();
    });
    return {
      entries,
      children: unionOfIterators(iterators)
    };
  };
  const walk2 = async (root2) => {
    const { entries, children } = await unionWalkerFromReaddir(root2);
    const fullpath = entries.find((entry) => entry && entry._fullpath)._fullpath;
    const parent = await map(fullpath, entries);
    if (parent !== null) {
      let walkedChildren = await iterate(walk2, children);
      walkedChildren = walkedChildren.filter((x) => x !== void 0);
      return reduce(parent, walkedChildren);
    }
  };
  return walk2(root);
}
async function mkdirp(mkdir, filepath, retries = 10) {
  try {
    await mkdir(filepath);
  } catch (err) {
    if (err === null) return;
    if (err.code === "EEXIST") return;
    if (err.code !== "ENOENT") throw err;
    const parent = dirname(filepath);
    if (parent === "." || parent === "/" || parent === filepath) throw err;
    await mkdirp(mkdir, parent, retries);
    for (let attempt = 0; ; attempt++) {
      try {
        await mkdir(filepath);
        return;
      } catch (err2) {
        if (err2 === null || err2.code === "EEXIST") return;
        if (err2.code === "ENOENT" && attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, 0));
          continue;
        }
        throw err2;
      }
    }
  }
}
async function rmRecursive(fs2, filepath) {
  const entries = await fs2.readdir(filepath);
  if (entries == null) {
    await fs2.rm(filepath);
  } else if (entries.length) {
    await Promise.all(
      entries.map((entry) => {
        const subpath = join(filepath, entry);
        return fs2.lstat(subpath).then((stat) => {
          if (!stat) return;
          return stat.isDirectory() ? rmRecursive(fs2, subpath) : fs2.rm(subpath);
        });
      })
    ).then(() => fs2.rmdir(filepath));
  } else {
    await fs2.rmdir(filepath);
  }
}
function isPromiseLike(obj) {
  return isObject(obj) && isFunction(obj.then) && isFunction(obj.catch);
}
function isObject(obj) {
  return obj && typeof obj === "object";
}
function isFunction(obj) {
  return typeof obj === "function";
}
function isPromiseFs(fs2) {
  const test = (targetFs) => {
    try {
      return targetFs.readFile().catch((e) => e);
    } catch (e) {
      return e;
    }
  };
  return isPromiseLike(test(fs2));
}
var commands = [
  "readFile",
  "writeFile",
  "mkdir",
  "rmdir",
  "unlink",
  "stat",
  "lstat",
  "readdir",
  "readlink",
  "symlink"
];
function bindFs(target, fs2) {
  if (isPromiseFs(fs2)) {
    for (const command of commands) {
      target[`_${command}`] = fs2[command].bind(fs2);
    }
  } else {
    for (const command of commands) {
      target[`_${command}`] = (0, import_pify.default)(fs2[command].bind(fs2));
    }
  }
  if (isPromiseFs(fs2)) {
    if (fs2.cp) target._cp = fs2.cp.bind(fs2);
    if (fs2.rm) target._rm = fs2.rm.bind(fs2);
    else if (fs2.rmdir.length > 1) target._rm = fs2.rmdir.bind(fs2);
    else target._rm = rmRecursive.bind(null, target);
  } else {
    if (fs2.cp) target._cp = (0, import_pify.default)(fs2.cp.bind(fs2));
    if (fs2.rm) target._rm = (0, import_pify.default)(fs2.rm.bind(fs2));
    else if (fs2.rmdir.length > 2) target._rm = (0, import_pify.default)(fs2.rmdir.bind(fs2));
    else target._rm = rmRecursive.bind(null, target);
  }
}
var FileSystem = class {
  /**
   * Creates an instance of FileSystem.
   *
   * @param {Object} fs - A file system implementation to wrap.
   */
  constructor(fs2) {
    if (typeof fs2._original_unwrapped_fs !== "undefined") return fs2;
    const promises = Object.getOwnPropertyDescriptor(fs2, "promises");
    if (promises && promises.enumerable) {
      bindFs(this, fs2.promises);
    } else {
      bindFs(this, fs2);
    }
    this._original_unwrapped_fs = fs2;
  }
  /**
   * Return true if a file exists, false if it doesn't exist.
   * Rethrows errors that aren't related to file existence.
   *
   * @param {string} filepath - The path to the file.
   * @param {Object} [options] - Additional options.
   * @returns {Promise<boolean>} - `true` if the file exists, `false` otherwise.
   */
  async exists(filepath, options = {}) {
    try {
      await this._stat(filepath);
      return true;
    } catch (err) {
      if (err.code === "ENOENT" || err.code === "ENOTDIR" || (err.code || "").includes("ENS")) {
        return false;
      } else {
        console.log('Unhandled error in "FileSystem.exists()" function', err);
        throw err;
      }
    }
  }
  /**
   * Return the contents of a file if it exists, otherwise returns null.
   *
   * @param {string} filepath - The path to the file.
   * @param {Object} [options] - Options for reading the file.
   * @returns {Promise<Buffer|string|null>} - The file contents, or `null` if the file doesn't exist.
   */
  async read(filepath, options = {}) {
    try {
      let buffer = await this._readFile(filepath, options);
      if (options.autocrlf === "true") {
        try {
          buffer = new TextDecoder("utf8", { fatal: true }).decode(buffer);
          buffer = buffer.replace(/\r\n/g, "\n");
          buffer = new TextEncoder().encode(buffer);
        } catch (error) {
        }
      }
      if (typeof buffer !== "string") {
        buffer = Buffer.from(buffer);
      }
      return buffer;
    } catch (err) {
      return null;
    }
  }
  /**
   * Write a file (creating missing directories if need be) without throwing errors.
   *
   * @param {string} filepath - The path to the file.
   * @param {Buffer|Uint8Array|string} contents - The data to write.
   * @param {Object|string} [options] - Options for writing the file.
   * @returns {Promise<void>}
   */
  async write(filepath, contents, options = {}) {
    try {
      await this._writeFile(filepath, contents, options);
    } catch (err) {
      await this.mkdir(dirname(filepath));
      await this._writeFile(filepath, contents, options);
    }
  }
  /**
   * Make a directory (or series of nested directories) without throwing an error if it already exists.
   *
   * @param {string} filepath - The path to the directory.
   * @returns {Promise<void>}
   */
  async mkdir(filepath) {
    await mkdirp(this._mkdir, filepath);
  }
  /**
   * Delete a file without throwing an error if it is already deleted.
   *
   * @param {string} filepath - The path to the file.
   * @returns {Promise<void>}
   */
  async rm(filepath) {
    try {
      await this._unlink(filepath);
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }
  }
  /**
   * Delete a directory without throwing an error if it is already deleted.
   *
   * @param {string} filepath - The path to the directory.
   * @param {Object} [opts] - Options for deleting the directory.
   * @returns {Promise<void>}
   */
  async rmdir(filepath, opts) {
    try {
      if (opts && opts.recursive) {
        await this._rm(filepath, opts);
      } else {
        await this._rmdir(filepath);
      }
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }
  }
  /**
   * Read a directory without throwing an error is the directory doesn't exist
   *
   * @param {string} filepath - The path to the directory.
   * @returns {Promise<string[]|null>} - An array of file names, or `null` if the path is not a directory.
   */
  async readdir(filepath) {
    try {
      const names = await this._readdir(filepath);
      names.sort(compareStrings);
      return names;
    } catch (err) {
      if (err.code === "ENOTDIR") return null;
      return [];
    }
  }
  /**
   * Return a flat list of all the files nested inside a directory
   *
   * Based on an elegant concurrent recursive solution from SO
   * https://stackoverflow.com/a/45130990/2168416
   *
   * @param {string} dir - The directory to read.
   * @returns {Promise<string[]>} - A flat list of all files in the directory.
   */
  async readdirDeep(dir) {
    const subdirs = await this._readdir(dir);
    const files = await Promise.all(
      subdirs.map(async (subdir) => {
        const res = dir + "/" + subdir;
        return (await this._stat(res)).isDirectory() ? this.readdirDeep(res) : res;
      })
    );
    return files.reduce((a, f) => a.concat(f), []);
  }
  /**
   * Return the Stats of a file/symlink if it exists, otherwise returns null.
   * Rethrows errors that aren't related to file existence.
   *
   * @param {string} filename - The path to the file or symlink.
   * @returns {Promise<Object|null>} - The stats object, or `null` if the file doesn't exist.
   */
  async lstat(filename) {
    try {
      const stats = await this._lstat(filename);
      return stats;
    } catch (err) {
      if (err.code === "ENOENT" || (err.code || "").includes("ENS")) {
        return null;
      }
      throw err;
    }
  }
  /**
   * Reads the contents of a symlink if it exists, otherwise returns null.
   * Rethrows errors that aren't related to file existence.
   *
   * @param {string} filename - The path to the symlink.
   * @param {Object} [opts={ encoding: 'buffer' }] - Options for reading the symlink.
   * @returns {Promise<Buffer|null>} - The symlink target, or `null` if it doesn't exist.
   */
  async readlink(filename, opts = { encoding: "buffer" }) {
    try {
      const link = await this._readlink(filename, opts);
      return Buffer.isBuffer(link) ? link : Buffer.from(link);
    } catch (err) {
      if (err.code === "ENOENT" || (err.code || "").includes("ENS")) {
        return null;
      }
      throw err;
    }
  }
  /**
   * Write the contents of buffer to a symlink.
   *
   * @param {string} filename - The path to the symlink.
   * @param {Buffer} buffer - The symlink target.
   * @returns {Promise<void>}
   */
  async writelink(filename, buffer) {
    return this._symlink(buffer.toString("utf8"), filename);
  }
};
function assertParameter(name, value) {
  if (value === void 0) {
    throw new MissingParameterError(name);
  }
}
function isAbsolute(filepath) {
  return filepath.startsWith("/") || /^[a-zA-Z]:[\\/]/.test(filepath);
}
async function discoverGitdir({ fsp, dotgit }) {
  assertParameter("fsp", fsp);
  assertParameter("dotgit", dotgit);
  const dotgitStat = await fsp._stat(dotgit).catch(() => ({ isFile: () => false, isDirectory: () => false }));
  if (dotgitStat.isDirectory()) {
    return dotgit;
  } else if (dotgitStat.isFile()) {
    return fsp._readFile(dotgit, "utf8").then((contents) => contents.trimRight().substr(8)).then((submoduleGitdir) => {
      if (isAbsolute(submoduleGitdir)) {
        return submoduleGitdir;
      }
      const gitdir = join(dirname(dotgit), submoduleGitdir);
      return gitdir;
    });
  } else {
    return dotgit;
  }
}
async function modified(entry, base) {
  if (!entry && !base) return false;
  if (entry && !base) return true;
  if (!entry && base) return true;
  if (await entry.type() === "tree" && await base.type() === "tree") {
    return false;
  }
  if (await entry.type() === await base.type() && await entry.mode() === await base.mode() && await entry.oid() === await base.oid()) {
    return false;
  }
  return true;
}
async function abortMerge({
  fs: _fs,
  dir,
  gitdir = join(dir, ".git"),
  commit: commit2 = "HEAD",
  cache = {}
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("dir", dir);
    assertParameter("gitdir", gitdir);
    const fs2 = new FileSystem(_fs);
    const trees = [TREE({ ref: commit2 }), WORKDIR(), STAGE()];
    let unmergedPaths = [];
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    await GitIndexManager.acquire(
      { fs: fs2, gitdir: updatedGitdir, cache },
      async function(index3) {
        unmergedPaths = index3.unmergedPaths;
      }
    );
    const results = await _walk({
      fs: fs2,
      cache,
      dir,
      gitdir: updatedGitdir,
      trees,
      map: async function(path, [head, workdir, index3]) {
        const staged = !await modified(workdir, index3);
        const unmerged = unmergedPaths.includes(path);
        const unmodified = !await modified(index3, head);
        if (staged || unmerged) {
          return head ? {
            path,
            mode: await head.mode(),
            oid: await head.oid(),
            type: await head.type(),
            content: await head.content()
          } : void 0;
        }
        if (unmodified) return false;
        else throw new IndexResetError(path);
      }
    });
    await GitIndexManager.acquire(
      { fs: fs2, gitdir: updatedGitdir, cache },
      async function(index3) {
        for (const entry of results) {
          if (entry === false) continue;
          if (!entry) {
            await fs2.rmdir(`${dir}/${entry.path}`, { recursive: true });
            index3.delete({ filepath: entry.path });
            continue;
          }
          if (entry.type === "blob") {
            const content = new TextDecoder().decode(entry.content);
            await fs2.write(`${dir}/${entry.path}`, content, {
              mode: entry.mode
            });
            index3.insert({
              filepath: entry.path,
              oid: entry.oid,
              stage: 0
            });
          }
        }
      }
    );
  } catch (err) {
    err.caller = "git.abortMerge";
    throw err;
  }
}
var GitIgnoreManager = class {
  /**
   * Determines whether a given file is ignored based on `.gitignore` rules and exclusion files.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} args.dir - The working directory.
   * @param {string} [args.gitdir=join(dir, '.git')] - [required] The [git directory](dir-vs-gitdir.md) path
   * @param {string} args.filepath - The path of the file to check.
   * @returns {Promise<boolean>} - `true` if the file is ignored, `false` otherwise.
   */
  static async isIgnored({ fs: fs2, dir, gitdir = join(dir, ".git"), filepath }) {
    if (basename(filepath) === ".git") return true;
    if (filepath === ".") return false;
    let excludes = "";
    const excludesFile = join(gitdir, "info", "exclude");
    if (await fs2.exists(excludesFile)) {
      excludes = await fs2.read(excludesFile, "utf8");
    }
    const pairs = [
      {
        gitignore: join(dir, ".gitignore"),
        filepath
      }
    ];
    const pieces = filepath.split("/").filter(Boolean);
    for (let i = 1; i < pieces.length; i++) {
      const folder = pieces.slice(0, i).join("/");
      const file = pieces.slice(i).join("/");
      pairs.push({
        gitignore: join(dir, folder, ".gitignore"),
        filepath: file
      });
    }
    let ignoredStatus = false;
    for (const p of pairs) {
      let file;
      try {
        file = await fs2.read(p.gitignore, "utf8");
      } catch (err) {
        if (err.code === "NOENT") continue;
      }
      const ign = (0, import_ignore.default)().add(excludes);
      ign.add(file);
      const parentdir = dirname(p.filepath);
      if (parentdir !== "." && ign.ignores(parentdir)) return true;
      if (ignoredStatus) {
        ignoredStatus = !ign.test(p.filepath).unignored;
      } else {
        ignoredStatus = ign.test(p.filepath).ignored;
      }
    }
    return ignoredStatus;
  }
};
async function writeObjectLoose({ fs: fs2, gitdir, object, format, oid }) {
  if (format !== "deflated") {
    throw new InternalError(
      "GitObjectStoreLoose expects objects to write to be in deflated format"
    );
  }
  const source = `objects/${oid.slice(0, 2)}/${oid.slice(2)}`;
  const filepath = `${gitdir}/${source}`;
  if (!await fs2.exists(filepath)) await fs2.write(filepath, object);
}
var supportsCompressionStream = null;
async function deflate(buffer) {
  if (supportsCompressionStream === null) {
    supportsCompressionStream = testCompressionStream();
  }
  return supportsCompressionStream ? browserDeflate(buffer) : import_pako.default.deflate(buffer);
}
async function browserDeflate(buffer) {
  const cs = new CompressionStream("deflate");
  const c = new Blob([buffer]).stream().pipeThrough(cs);
  return new Uint8Array(await new Response(c).arrayBuffer());
}
function testCompressionStream() {
  try {
    const cs = new CompressionStream("deflate");
    cs.writable.close();
    const stream = new Blob([]).stream();
    stream.cancel();
    return true;
  } catch (_) {
    return false;
  }
}
async function _writeObject({
  fs: fs2,
  gitdir,
  type,
  object,
  format = "content",
  oid = void 0,
  dryRun = false
}) {
  if (format !== "deflated") {
    if (format !== "wrapped") {
      object = GitObject.wrap({ type, object });
    }
    oid = await shasum(object);
    object = Buffer.from(await deflate(object));
  }
  if (!dryRun) {
    await writeObjectLoose({ fs: fs2, gitdir, object, format: "deflated", oid });
  }
  return oid;
}
function posixifyPathBuffer(buffer) {
  let idx;
  while (~(idx = buffer.indexOf(92))) buffer[idx] = 47;
  return buffer;
}
async function add({
  fs: _fs,
  dir,
  gitdir = join(dir, ".git"),
  filepath,
  cache = {},
  force = false,
  parallel = true
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("dir", dir);
    assertParameter("gitdir", gitdir);
    assertParameter("filepath", filepath);
    const fs2 = new FileSystem(_fs);
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    await GitIndexManager.acquire(
      { fs: fs2, gitdir: updatedGitdir, cache },
      async (index3) => {
        const config = await GitConfigManager.get({ fs: fs2, gitdir: updatedGitdir });
        const autocrlf = await config.get("core.autocrlf");
        return addToIndex({
          dir,
          gitdir: updatedGitdir,
          fs: fs2,
          filepath,
          index: index3,
          force,
          parallel,
          autocrlf
        });
      }
    );
  } catch (err) {
    err.caller = "git.add";
    throw err;
  }
}
function isTracked(index3, filepath) {
  if (index3.has({ filepath })) return true;
  const prefix = `${filepath}/`;
  for (const entry of index3.entriesMap.keys()) {
    if (entry.startsWith(prefix)) return true;
  }
  return false;
}
async function addToIndex({
  dir,
  gitdir,
  fs: fs2,
  filepath,
  index: index3,
  force,
  parallel,
  autocrlf
}) {
  filepath = Array.isArray(filepath) ? filepath : [filepath];
  const promises = filepath.map(async (currentFilepath) => {
    if (!force && !isTracked(index3, currentFilepath)) {
      const ignored = await GitIgnoreManager.isIgnored({
        fs: fs2,
        dir,
        gitdir,
        filepath: currentFilepath
      });
      if (ignored) return;
    }
    const stats = await fs2.lstat(join(dir, currentFilepath));
    if (!stats) throw new NotFoundError(currentFilepath);
    if (stats.isDirectory()) {
      const children = await fs2.readdir(join(dir, currentFilepath));
      if (parallel) {
        const promises2 = children.map(
          (child) => addToIndex({
            dir,
            gitdir,
            fs: fs2,
            filepath: [join(currentFilepath, child)],
            index: index3,
            force,
            parallel,
            autocrlf
          })
        );
        await Promise.all(promises2);
      } else {
        for (const child of children) {
          await addToIndex({
            dir,
            gitdir,
            fs: fs2,
            filepath: [join(currentFilepath, child)],
            index: index3,
            force,
            parallel,
            autocrlf
          });
        }
      }
    } else {
      const object = stats.isSymbolicLink() ? await fs2.readlink(join(dir, currentFilepath)).then(posixifyPathBuffer) : await fs2.read(join(dir, currentFilepath), { autocrlf });
      if (object === null) throw new NotFoundError(currentFilepath);
      const oid = await _writeObject({ fs: fs2, gitdir, type: "blob", object });
      index3.insert({ filepath: currentFilepath, stats, oid });
    }
  });
  const settledPromises = await Promise.allSettled(promises);
  const rejectedPromises = settledPromises.filter((settle) => settle.status === "rejected").map((settle) => settle.reason);
  if (rejectedPromises.length > 1) {
    throw new MultipleGitError(rejectedPromises);
  }
  if (rejectedPromises.length === 1) {
    throw rejectedPromises[0];
  }
  const fulfilledPromises = settledPromises.filter((settle) => settle.status === "fulfilled" && settle.value).map((settle) => settle.value);
  return fulfilledPromises;
}
async function _getConfig({ fs: fs2, gitdir, path }) {
  const config = await GitConfigManager.get({ fs: fs2, gitdir });
  return config.get(path);
}
function assignDefined(target, ...sources) {
  for (const source of sources) {
    if (source) {
      for (const key of Object.keys(source)) {
        const val = source[key];
        if (val !== void 0) {
          target[key] = val;
        }
      }
    }
  }
  return target;
}
async function normalizeAuthorObject({ fs: fs2, gitdir, author, commit: commit2 }) {
  const timestamp = Math.floor(Date.now() / 1e3);
  const defaultAuthor = {
    name: await _getConfig({ fs: fs2, gitdir, path: "user.name" }),
    email: await _getConfig({ fs: fs2, gitdir, path: "user.email" }) || "",
    // author.email is allowed to be empty string
    timestamp,
    timezoneOffset: new Date(timestamp * 1e3).getTimezoneOffset()
  };
  const normalizedAuthor = assignDefined(
    {},
    defaultAuthor,
    commit2 ? commit2.author : void 0,
    author
  );
  if (normalizedAuthor.name === void 0) {
    return void 0;
  }
  return normalizedAuthor;
}
async function normalizeCommitterObject({
  fs: fs2,
  gitdir,
  author,
  committer,
  commit: commit2
}) {
  const timestamp = Math.floor(Date.now() / 1e3);
  const defaultCommitter = {
    name: await _getConfig({ fs: fs2, gitdir, path: "user.name" }),
    email: await _getConfig({ fs: fs2, gitdir, path: "user.email" }) || "",
    // committer.email is allowed to be empty string
    timestamp,
    timezoneOffset: new Date(timestamp * 1e3).getTimezoneOffset()
  };
  const normalizedCommitter = assignDefined(
    {},
    defaultCommitter,
    commit2 ? commit2.committer : void 0,
    author,
    committer
  );
  if (normalizedCommitter.name === void 0) {
    return void 0;
  }
  return normalizedCommitter;
}
async function resolveCommit({ fs: fs2, cache, gitdir, oid }) {
  const { type, object } = await _readObject({ fs: fs2, cache, gitdir, oid });
  if (type === "tag") {
    oid = GitAnnotatedTag.from(object).parse().object;
    return resolveCommit({ fs: fs2, cache, gitdir, oid });
  }
  if (type !== "commit") {
    throw new ObjectTypeError(oid, type, "commit");
  }
  return { commit: GitCommit.from(object), oid };
}
async function _readCommit({ fs: fs2, cache, gitdir, oid }) {
  const { commit: commit2, oid: commitOid } = await resolveCommit({
    fs: fs2,
    cache,
    gitdir,
    oid
  });
  const result = {
    oid: commitOid,
    commit: commit2.parse(),
    payload: commit2.withoutSignature()
  };
  return result;
}
var EMPTY_TREE_OID = "4b825dc642cb6eb9a060e54bf8d69288fbee4904";
async function _commit({
  fs: fs2,
  cache,
  onSign,
  gitdir,
  message,
  author: _author,
  committer: _committer,
  signingKey,
  amend = false,
  dryRun = false,
  noUpdateBranch = false,
  disallowEmpty = false,
  ref,
  parent,
  tree
}) {
  let initialCommit = false;
  let detachedHead = false;
  if (!ref) {
    const headContent = await fs2.read(`${gitdir}/HEAD`, { encoding: "utf8" });
    detachedHead = !headContent.startsWith("ref:");
    ref = await GitRefManager.resolve({
      fs: fs2,
      gitdir,
      ref: "HEAD",
      depth: 2
    });
  }
  let refOid, refCommit;
  try {
    refOid = await GitRefManager.resolve({
      fs: fs2,
      gitdir,
      ref
    });
    refCommit = await _readCommit({ fs: fs2, gitdir, oid: refOid, cache: {} });
  } catch {
    initialCommit = true;
  }
  if (amend && initialCommit) {
    throw new NoCommitError(ref);
  }
  const author = !amend ? await normalizeAuthorObject({ fs: fs2, gitdir, author: _author }) : await normalizeAuthorObject({
    fs: fs2,
    gitdir,
    author: _author,
    commit: refCommit.commit
  });
  if (!author) throw new MissingNameError("author");
  const committer = !amend ? await normalizeCommitterObject({
    fs: fs2,
    gitdir,
    author,
    committer: _committer
  }) : await normalizeCommitterObject({
    fs: fs2,
    gitdir,
    author,
    committer: _committer,
    commit: refCommit.commit
  });
  if (!committer) throw new MissingNameError("committer");
  return GitIndexManager.acquire(
    { fs: fs2, gitdir, cache, allowUnmerged: false },
    async function(index3) {
      const inodes = flatFileListToDirectoryStructure(index3.entries);
      const inode = inodes.get(".");
      if (!tree) {
        tree = await constructTree({ fs: fs2, gitdir, inode, dryRun });
      }
      if (!parent) {
        if (!amend) {
          parent = refOid ? [refOid] : [];
        } else {
          parent = refCommit.commit.parent;
        }
      } else {
        parent = await Promise.all(
          parent.map((p) => {
            return GitRefManager.resolve({ fs: fs2, gitdir, ref: p });
          })
        );
      }
      if (disallowEmpty && !amend && (initialCommit && tree === EMPTY_TREE_OID || !initialCommit && tree === refCommit.commit.tree)) {
        throw new EmptyCommitError();
      }
      if (!message) {
        if (!amend) {
          throw new MissingParameterError("message");
        } else {
          message = refCommit.commit.message;
        }
      }
      let comm = GitCommit.from({
        tree,
        parent,
        author,
        committer,
        message
      });
      if (signingKey) {
        comm = await GitCommit.sign(comm, onSign, signingKey);
      }
      const oid = await _writeObject({
        fs: fs2,
        gitdir,
        type: "commit",
        object: comm.toObject(),
        dryRun
      });
      if (!noUpdateBranch && !dryRun) {
        await GitRefManager.writeRef({
          fs: fs2,
          gitdir,
          ref: detachedHead ? "HEAD" : ref,
          value: oid
        });
      }
      return oid;
    }
  );
}
async function constructTree({ fs: fs2, gitdir, inode, dryRun }) {
  const children = inode.children;
  for (const inode2 of children) {
    if (inode2.type === "tree") {
      inode2.metadata.mode = "040000";
      inode2.metadata.oid = await constructTree({ fs: fs2, gitdir, inode: inode2, dryRun });
    }
  }
  const entries = children.map((inode2) => ({
    mode: inode2.metadata.mode,
    path: inode2.basename,
    oid: inode2.metadata.oid,
    type: inode2.type
  }));
  const tree = GitTree.from(entries);
  const oid = await _writeObject({
    fs: fs2,
    gitdir,
    type: "tree",
    object: tree.toObject(),
    dryRun
  });
  return oid;
}
async function resolveFilepath({ fs: fs2, cache, gitdir, oid, filepath }) {
  const entry = await resolveFilepathEntry({
    fs: fs2,
    cache,
    gitdir,
    oid,
    filepath
  });
  return entry.oid;
}
async function resolveFilepathEntry({
  fs: fs2,
  cache,
  gitdir,
  oid,
  filepath
}) {
  if (filepath.startsWith("/")) {
    throw new InvalidFilepathError("leading-slash");
  } else if (filepath.endsWith("/")) {
    throw new InvalidFilepathError("trailing-slash");
  }
  const _oid = oid;
  const result = await resolveTree({ fs: fs2, cache, gitdir, oid });
  const tree = result.tree;
  if (filepath === "") {
    return { mode: "040000", oid: result.oid, path: "", type: "tree" };
  } else {
    const pathArray = filepath.split("/");
    return _resolveFilepath({
      fs: fs2,
      cache,
      gitdir,
      tree,
      pathArray,
      oid: _oid,
      filepath
    });
  }
}
async function _resolveFilepath({
  fs: fs2,
  cache,
  gitdir,
  tree,
  pathArray,
  oid,
  filepath
}) {
  const name = pathArray.shift();
  for (const entry of tree) {
    if (entry.path === name) {
      if (pathArray.length === 0) {
        return entry;
      } else {
        const { type, object } = await _readObject({
          fs: fs2,
          cache,
          gitdir,
          oid: entry.oid
        });
        if (type !== "tree") {
          throw new ObjectTypeError(oid, type, "tree", filepath);
        }
        tree = GitTree.from(object);
        return _resolveFilepath({
          fs: fs2,
          cache,
          gitdir,
          tree,
          pathArray,
          oid,
          filepath
        });
      }
    }
  }
  throw new NotFoundError(`file or directory found at "${oid}:${filepath}"`);
}
async function _readTree({
  fs: fs2,
  cache,
  gitdir,
  oid,
  filepath = void 0
}) {
  if (filepath !== void 0) {
    oid = await resolveFilepath({ fs: fs2, cache, gitdir, oid, filepath });
  }
  const { tree, oid: treeOid } = await resolveTree({ fs: fs2, cache, gitdir, oid });
  const result = {
    oid: treeOid,
    tree: tree.entries()
  };
  return result;
}
async function _writeTree({ fs: fs2, gitdir, tree }) {
  const object = GitTree.from(tree).toObject();
  const oid = await _writeObject({
    fs: fs2,
    gitdir,
    type: "tree",
    object,
    format: "content"
  });
  return oid;
}
async function _addNote({
  fs: fs2,
  cache,
  onSign,
  gitdir,
  ref,
  oid,
  note,
  force,
  author,
  committer,
  signingKey
}) {
  let parent;
  try {
    parent = await GitRefManager.resolve({ gitdir, fs: fs2, ref });
  } catch (err) {
    if (!(err instanceof NotFoundError)) {
      throw err;
    }
  }
  const result = await _readTree({
    fs: fs2,
    cache,
    gitdir,
    oid: parent || "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
  });
  let tree = result.tree;
  if (force) {
    tree = tree.filter((entry) => entry.path !== oid);
  } else {
    for (const entry of tree) {
      if (entry.path === oid) {
        throw new AlreadyExistsError("note", oid);
      }
    }
  }
  if (typeof note === "string") {
    note = Buffer.from(note, "utf8");
  }
  const noteOid = await _writeObject({
    fs: fs2,
    gitdir,
    type: "blob",
    object: note,
    format: "content"
  });
  tree.push({ mode: "100644", path: oid, oid: noteOid, type: "blob" });
  const treeOid = await _writeTree({
    fs: fs2,
    gitdir,
    tree
  });
  const commitOid = await _commit({
    fs: fs2,
    cache,
    onSign,
    gitdir,
    ref,
    tree: treeOid,
    parent: parent && [parent],
    message: `Note added by 'isomorphic-git addNote'
`,
    author,
    committer,
    signingKey
  });
  return commitOid;
}
async function addNote({
  fs: _fs,
  onSign,
  dir,
  gitdir = join(dir, ".git"),
  ref = "refs/notes/commits",
  oid,
  note,
  force,
  author: _author,
  committer: _committer,
  signingKey,
  cache = {}
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("gitdir", gitdir);
    assertParameter("oid", oid);
    assertParameter("note", note);
    if (signingKey) {
      assertParameter("onSign", onSign);
    }
    const fs2 = new FileSystem(_fs);
    const author = await normalizeAuthorObject({ fs: fs2, gitdir, author: _author });
    if (!author) throw new MissingNameError("author");
    const committer = await normalizeCommitterObject({
      fs: fs2,
      gitdir,
      author,
      committer: _committer
    });
    if (!committer) throw new MissingNameError("committer");
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    return await _addNote({
      fs: fs2,
      cache,
      onSign,
      gitdir: updatedGitdir,
      ref,
      oid,
      note,
      force,
      author,
      committer,
      signingKey
    });
  } catch (err) {
    err.caller = "git.addNote";
    throw err;
  }
}
var bad = /(^|[/.])([/.]|$)|^@$|@{|[\x00-\x20\x7f~^:?*[\\]|\.lock(\/|$)/;
function isValidRef(name, onelevel) {
  if (typeof name !== "string")
    throw new TypeError("Reference name must be a string");
  return !bad.test(name) && (!!onelevel || name.includes("/"));
}
async function _addRemote({ fs: fs2, gitdir, remote, url, force }) {
  if (!isValidRef(remote, true)) {
    throw new InvalidRefNameError(remote, import_clean_git_ref.default.clean(remote));
  }
  const config = await GitConfigManager.get({ fs: fs2, gitdir });
  if (!force) {
    const remoteNames = await config.getSubsections("remote");
    if (remoteNames.includes(remote)) {
      if (url !== await config.get(`remote.${remote}.url`)) {
        throw new AlreadyExistsError("remote", remote);
      }
    }
  }
  await config.set(`remote.${remote}.url`, url);
  await config.set(
    `remote.${remote}.fetch`,
    `+refs/heads/*:refs/remotes/${remote}/*`
  );
  await GitConfigManager.save({ fs: fs2, gitdir, config });
}
async function addRemote({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  remote,
  url,
  force = false
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("remote", remote);
    assertParameter("url", url);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _addRemote({
      fs: fsp,
      gitdir: updatedGitdir,
      remote,
      url,
      force
    });
  } catch (err) {
    err.caller = "git.addRemote";
    throw err;
  }
}
async function _annotatedTag({
  fs: fs2,
  cache,
  onSign,
  gitdir,
  ref,
  tagger,
  message = ref,
  gpgsig,
  object,
  signingKey,
  force = false
}) {
  ref = ref.startsWith("refs/tags/") ? ref : `refs/tags/${ref}`;
  if (!force && await GitRefManager.exists({ fs: fs2, gitdir, ref })) {
    throw new AlreadyExistsError("tag", ref);
  }
  const oid = await GitRefManager.resolve({
    fs: fs2,
    gitdir,
    ref: object || "HEAD"
  });
  const { type } = await _readObject({ fs: fs2, cache, gitdir, oid });
  let tagObject = GitAnnotatedTag.from({
    object: oid,
    type,
    tag: ref.replace("refs/tags/", ""),
    tagger,
    message,
    gpgsig
  });
  if (signingKey) {
    tagObject = await GitAnnotatedTag.sign(tagObject, onSign, signingKey);
  }
  const value = await _writeObject({
    fs: fs2,
    gitdir,
    type: "tag",
    object: tagObject.toObject()
  });
  await GitRefManager.writeRef({ fs: fs2, gitdir, ref, value });
}
async function annotatedTag({
  fs: _fs,
  onSign,
  dir,
  gitdir = join(dir, ".git"),
  ref,
  tagger: _tagger,
  message = ref,
  gpgsig,
  object,
  signingKey,
  force = false,
  cache = {}
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("gitdir", gitdir);
    assertParameter("ref", ref);
    if (signingKey) {
      assertParameter("onSign", onSign);
    }
    const fs2 = new FileSystem(_fs);
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    const tagger = await normalizeAuthorObject({
      fs: fs2,
      gitdir: updatedGitdir,
      author: _tagger
    });
    if (!tagger) throw new MissingNameError("tagger");
    return await _annotatedTag({
      fs: fs2,
      cache,
      onSign,
      gitdir: updatedGitdir,
      ref,
      tagger,
      message,
      gpgsig,
      object,
      signingKey,
      force
    });
  } catch (err) {
    err.caller = "git.annotatedTag";
    throw err;
  }
}
async function _branch({
  fs: fs2,
  gitdir,
  ref,
  object,
  checkout: checkout2 = false,
  force = false
}) {
  if (!isValidRef(ref, true)) {
    throw new InvalidRefNameError(ref, import_clean_git_ref.default.clean(ref));
  }
  const fullref = `refs/heads/${ref}`;
  if (!force) {
    const exist = await GitRefManager.exists({ fs: fs2, gitdir, ref: fullref });
    if (exist) {
      throw new AlreadyExistsError("branch", ref, false);
    }
  }
  let oid;
  try {
    oid = await GitRefManager.resolve({ fs: fs2, gitdir, ref: object || "HEAD" });
  } catch (e) {
  }
  if (oid) {
    await GitRefManager.writeRef({ fs: fs2, gitdir, ref: fullref, value: oid });
  }
  if (checkout2) {
    await GitRefManager.writeSymbolicRef({
      fs: fs2,
      gitdir,
      ref: "HEAD",
      value: fullref
    });
  }
}
async function branch({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  ref,
  object,
  checkout: checkout2 = false,
  force = false
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("ref", ref);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _branch({
      fs: fsp,
      gitdir: updatedGitdir,
      ref,
      object,
      checkout: checkout2,
      force
    });
  } catch (err) {
    err.caller = "git.branch";
    throw err;
  }
}
async function assertNoSymlinkInLeadingPath(fs2, dir, fullpath) {
  const parts = fullpath.split("/");
  parts.pop();
  let current = dir;
  for (const part of parts) {
    if (part === "" || part === ".") continue;
    current = `${current}/${part}`;
    const stats = await fs2.lstat(current);
    if (stats && stats.isSymbolicLink()) {
      throw new UnsafeFilepathError(fullpath);
    }
  }
}
var worthWalking = (filepath, root) => {
  if (filepath === "." || root == null || root.length === 0 || root === ".") {
    return true;
  }
  const base = root.endsWith("/") ? root.slice(0, -1) : root;
  if (base === ".") {
    return true;
  }
  if (base.length >= filepath.length) {
    return base === filepath || base.startsWith(`${filepath}/`);
  }
  return filepath.startsWith(`${base}/`);
};
async function _checkout({
  fs: fs2,
  cache,
  onProgress,
  onPostCheckout,
  dir,
  gitdir,
  remote,
  ref,
  filepaths,
  noCheckout,
  noUpdateHead,
  dryRun,
  force,
  track = true,
  restoreFromIndex = false,
  nonBlocking = false,
  batchSize = 100
}) {
  let oldOid;
  if (onPostCheckout) {
    try {
      oldOid = await GitRefManager.resolve({ fs: fs2, gitdir, ref: "HEAD" });
    } catch (err) {
      oldOid = "0000000000000000000000000000000000000000";
    }
  }
  let oid;
  try {
    oid = await GitRefManager.resolve({ fs: fs2, gitdir, ref });
  } catch (err) {
    if (ref === "HEAD") throw err;
    const remoteRef = `${remote}/${ref}`;
    oid = await GitRefManager.resolve({
      fs: fs2,
      gitdir,
      ref: remoteRef
    });
    if (track) {
      const config = await GitConfigManager.get({ fs: fs2, gitdir });
      await config.set(`branch.${ref}.remote`, remote);
      await config.set(`branch.${ref}.merge`, `refs/heads/${ref}`);
      await GitConfigManager.save({ fs: fs2, gitdir, config });
    }
    await GitRefManager.writeRef({
      fs: fs2,
      gitdir,
      ref: `refs/heads/${ref}`,
      value: oid
    });
  }
  if (!noCheckout) {
    let ops;
    try {
      ops = await analyze({
        fs: fs2,
        cache,
        onProgress,
        dir,
        gitdir,
        ref,
        force,
        filepaths,
        restoreFromIndex
      });
    } catch (err) {
      if (err instanceof NotFoundError && err.data.what === oid) {
        throw new CommitNotFetchedError(ref, oid);
      } else {
        throw err;
      }
    }
    const conflicts = ops.filter(([method]) => method === "conflict").map(([method, fullpath]) => fullpath);
    if (conflicts.length > 0) {
      throw new CheckoutConflictError(conflicts);
    }
    const errors = ops.filter(([method]) => method === "error").map(([method, fullpath]) => fullpath);
    if (errors.length > 0) {
      throw new InternalError(errors.join(", "));
    }
    if (dryRun) {
      if (onPostCheckout) {
        await onPostCheckout({
          previousHead: oldOid,
          newHead: oid,
          type: filepaths != null && filepaths.length > 0 ? "file" : "branch"
        });
      }
      return;
    }
    let count = 0;
    const total = ops.length;
    await GitIndexManager.acquire(
      { fs: fs2, gitdir, cache },
      async function(index3) {
        await Promise.all(
          ops.filter(
            ([method]) => method === "delete" || method === "delete-index"
          ).map(async function([method, fullpath]) {
            const filepath = `${dir}/${fullpath}`;
            if (method === "delete") {
              await fs2.rm(filepath);
            }
            index3.delete({ filepath: fullpath });
            if (onProgress) {
              await onProgress({
                phase: "Updating workdir",
                loaded: ++count,
                total
              });
            }
          })
        );
      }
    );
    await GitIndexManager.acquire(
      { fs: fs2, gitdir, cache },
      async function(index3) {
        for (const [method, fullpath] of ops) {
          if (method === "rmdir" || method === "rmdir-index") {
            const filepath = `${dir}/${fullpath}`;
            try {
              if (method === "rmdir") {
                await fs2.rmdir(filepath);
              }
              index3.delete({ filepath: fullpath });
              if (onProgress) {
                await onProgress({
                  phase: "Updating workdir",
                  loaded: ++count,
                  total
                });
              }
            } catch (e) {
              if (e.code === "ENOTEMPTY") {
                console.log(
                  `Did not delete ${fullpath} because directory is not empty`
                );
              } else {
                throw e;
              }
            }
          }
        }
      }
    );
    await Promise.all(
      ops.filter(([method]) => method === "mkdir" || method === "mkdir-index").map(async function([_, fullpath]) {
        const filepath = `${dir}/${fullpath}`;
        await assertNoSymlinkInLeadingPath(fs2, dir, fullpath);
        await fs2.mkdir(filepath);
        if (onProgress) {
          await onProgress({
            phase: "Updating workdir",
            loaded: ++count,
            total
          });
        }
      })
    );
    if (nonBlocking) {
      const eligibleOps = ops.filter(
        ([method]) => method === "create" || method === "create-index" || method === "update" || method === "mkdir-index"
      );
      const updateWorkingDirResults = await batchAllSettled(
        "Update Working Dir",
        eligibleOps.map(
          ([method, fullpath, oid2, mode, chmod]) => () => updateWorkingDir({ fs: fs2, cache, gitdir, dir }, [
            method,
            fullpath,
            oid2,
            mode,
            chmod
          ])
        ),
        onProgress,
        batchSize
      );
      await GitIndexManager.acquire(
        { fs: fs2, gitdir, cache, allowUnmerged: true },
        async function(index3) {
          await batchAllSettled(
            "Update Index",
            updateWorkingDirResults.map(
              ([fullpath, oid2, stats]) => () => updateIndex({ index: index3, fullpath, oid: oid2, stats })
            ),
            onProgress,
            batchSize
          );
        }
      );
    } else {
      await GitIndexManager.acquire(
        { fs: fs2, gitdir, cache, allowUnmerged: true },
        async function(index3) {
          const settled = await Promise.allSettled(
            ops.filter(
              ([method]) => method === "create" || method === "create-index" || method === "update" || method === "mkdir-index"
            ).map(async function([method, fullpath, oid2, mode, chmod]) {
              const filepath = `${dir}/${fullpath}`;
              if (method !== "create-index" && method !== "mkdir-index") {
                await assertNoSymlinkInLeadingPath(fs2, dir, fullpath);
                const { object } = await _readObject({
                  fs: fs2,
                  cache,
                  gitdir,
                  oid: oid2
                });
                if (chmod) {
                  await fs2.rm(filepath);
                }
                if (mode === 33188) {
                  await fs2.write(filepath, object);
                } else if (mode === 33261) {
                  await fs2.write(filepath, object, { mode: 511 });
                } else if (mode === 40960) {
                  await fs2.writelink(filepath, object);
                } else {
                  throw new InternalError(
                    `Invalid mode 0o${mode.toString(
                      8
                    )} detected in blob ${oid2}`
                  );
                }
              }
              const stats = await fs2.lstat(filepath);
              if (mode === 33261) {
                stats.mode = 493;
              }
              if (method === "mkdir-index") {
                stats.mode = 57344;
              }
              index3.insert({
                filepath: fullpath,
                stats,
                oid: oid2
              });
              if (onProgress) {
                await onProgress({
                  phase: "Updating workdir",
                  loaded: ++count,
                  total
                });
              }
            })
          );
          const rejections = [];
          for (const result of settled) {
            if (result.status === "rejected") {
              rejections.push(result.reason);
              console.error(
                "[isomorphic-git checkout] task rejected:",
                result.reason?.stack ?? result.reason
              );
            }
          }
          if (rejections.length > 0) {
            throw new MultipleGitError(rejections);
          }
        }
      );
    }
    if (onPostCheckout) {
      await onPostCheckout({
        previousHead: oldOid,
        newHead: oid,
        type: filepaths != null && filepaths.length > 0 ? "file" : "branch"
      });
    }
  }
  if (!noUpdateHead) {
    const fullRef = await GitRefManager.expand({ fs: fs2, gitdir, ref });
    if (fullRef.startsWith("refs/heads")) {
      await GitRefManager.writeSymbolicRef({
        fs: fs2,
        gitdir,
        ref: "HEAD",
        value: fullRef
      });
    } else {
      await GitRefManager.writeRef({ fs: fs2, gitdir, ref: "HEAD", value: oid });
    }
  }
}
async function analyze({
  fs: fs2,
  cache,
  onProgress,
  dir,
  gitdir,
  ref,
  force,
  filepaths,
  restoreFromIndex
}) {
  let count = 0;
  return _walk({
    fs: fs2,
    cache,
    dir,
    gitdir,
    trees: [restoreFromIndex ? STAGE() : TREE({ ref }), WORKDIR(), STAGE()],
    map: async function(fullpath, [commit2, workdir, stage]) {
      if (fullpath === ".") return;
      if (filepaths && !filepaths.some((base) => worthWalking(fullpath, base))) {
        return null;
      }
      if (onProgress) {
        await onProgress({ phase: "Analyzing workdir", loaded: ++count });
      }
      const key = [!!stage, !!commit2, !!workdir].map(Number).join("");
      switch (key) {
        // Impossible case.
        case "000":
          return;
        // Ignore workdir files that are not tracked and not part of the new commit.
        case "001":
          if (!restoreFromIndex && force && filepaths && filepaths.includes(fullpath)) {
            return ["delete", fullpath];
          }
          return;
        // New entries
        case "010": {
          switch (await commit2.type()) {
            case "tree": {
              return ["mkdir", fullpath];
            }
            case "blob": {
              return [
                "create",
                fullpath,
                await commit2.oid(),
                await commit2.mode()
              ];
            }
            case "commit": {
              return [
                "mkdir-index",
                fullpath,
                await commit2.oid(),
                await commit2.mode()
              ];
            }
            default: {
              return [
                "error",
                `new entry Unhandled type ${await commit2.type()}`
              ];
            }
          }
        }
        // New entries but there is already something in the workdir there.
        case "011": {
          switch (`${await commit2.type()}-${await workdir.type()}`) {
            case "tree-tree": {
              return;
            }
            case "tree-blob":
            case "blob-tree": {
              return ["conflict", fullpath];
            }
            case "blob-blob": {
              if (await commit2.oid() !== await workdir.oid()) {
                if (force) {
                  return [
                    "update",
                    fullpath,
                    await commit2.oid(),
                    await commit2.mode(),
                    await commit2.mode() !== await workdir.mode()
                  ];
                } else {
                  return ["conflict", fullpath];
                }
              } else {
                if (await commit2.mode() !== await workdir.mode()) {
                  if (force) {
                    return [
                      "update",
                      fullpath,
                      await commit2.oid(),
                      await commit2.mode(),
                      true
                    ];
                  } else {
                    return ["conflict", fullpath];
                  }
                } else {
                  return [
                    "create-index",
                    fullpath,
                    await commit2.oid(),
                    await commit2.mode()
                  ];
                }
              }
            }
            case "commit-tree": {
              return;
            }
            case "commit-blob": {
              return ["conflict", fullpath];
            }
            default: {
              return ["error", `new entry Unhandled type ${commit2.type}`];
            }
          }
        }
        // Something in stage but not in the commit OR the workdir.
        // Note: I verified this behavior against canonical git.
        case "100": {
          return ["delete-index", fullpath];
        }
        // Deleted entries
        // TODO: How to handle if stage type and workdir type mismatch?
        case "101": {
          switch (await stage.type()) {
            case "tree": {
              return ["rmdir-index", fullpath];
            }
            case "blob": {
              if (await stage.oid() !== await workdir.oid()) {
                if (force) {
                  return ["delete", fullpath];
                } else {
                  return ["conflict", fullpath];
                }
              } else {
                return ["delete", fullpath];
              }
            }
            case "commit": {
              return ["rmdir-index", fullpath];
            }
            default: {
              return [
                "error",
                `delete entry Unhandled type ${await stage.type()}`
              ];
            }
          }
        }
        /* eslint-disable no-fallthrough */
        // File missing from workdir
        case "110":
        // Possibly modified entries
        case "111": {
          switch (`${await stage.type()}-${await commit2.type()}`) {
            case "tree-tree": {
              return;
            }
            case "blob-blob": {
              if (await stage.oid() === await commit2.oid() && await stage.mode() === await commit2.mode() && !force) {
                return;
              }
              if (workdir) {
                if (await workdir.oid() !== await stage.oid() && await workdir.oid() !== await commit2.oid()) {
                  if (force) {
                    return [
                      "update",
                      fullpath,
                      await commit2.oid(),
                      await commit2.mode(),
                      await commit2.mode() !== await workdir.mode()
                    ];
                  } else {
                    return ["conflict", fullpath];
                  }
                }
              } else if (force) {
                return [
                  "update",
                  fullpath,
                  await commit2.oid(),
                  await commit2.mode(),
                  await commit2.mode() !== await stage.mode()
                ];
              }
              if (await commit2.mode() !== await stage.mode()) {
                return [
                  "update",
                  fullpath,
                  await commit2.oid(),
                  await commit2.mode(),
                  true
                ];
              }
              if (await commit2.oid() !== await stage.oid()) {
                return [
                  "update",
                  fullpath,
                  await commit2.oid(),
                  await commit2.mode(),
                  false
                ];
              } else {
                return;
              }
            }
            case "tree-blob": {
              return ["update-dir-to-blob", fullpath, await commit2.oid()];
            }
            case "blob-tree": {
              return ["update-blob-to-tree", fullpath];
            }
            case "commit-commit": {
              return [
                "mkdir-index",
                fullpath,
                await commit2.oid(),
                await commit2.mode()
              ];
            }
            default: {
              return [
                "error",
                `update entry Unhandled type ${await stage.type()}-${await commit2.type()}`
              ];
            }
          }
        }
      }
    },
    // Modify the default flat mapping
    reduce: async function(parent, children) {
      children = flat(children);
      if (!parent) {
        return children;
      } else if (parent && parent[0] === "rmdir") {
        children.push(parent);
        return children;
      } else {
        children.unshift(parent);
        return children;
      }
    }
  });
}
async function updateIndex({ index: index3, fullpath, stats, oid }) {
  try {
    index3.insert({
      filepath: fullpath,
      stats,
      oid
    });
  } catch (e) {
    console.warn(`Error inserting ${fullpath} into index:`, e);
  }
}
async function updateWorkingDir({ fs: fs2, cache, gitdir, dir }, [method, fullpath, oid, mode, chmod]) {
  const filepath = `${dir}/${fullpath}`;
  if (method !== "create-index" && method !== "mkdir-index") {
    await assertNoSymlinkInLeadingPath(fs2, dir, fullpath);
    const { object } = await _readObject({ fs: fs2, cache, gitdir, oid });
    if (chmod) {
      await fs2.rm(filepath);
    }
    if (mode === 33188) {
      await fs2.write(filepath, object);
    } else if (mode === 33261) {
      await fs2.write(filepath, object, { mode: 511 });
    } else if (mode === 40960) {
      await fs2.writelink(filepath, object);
    } else {
      throw new InternalError(
        `Invalid mode 0o${mode.toString(8)} detected in blob ${oid}`
      );
    }
  }
  const stats = await fs2.lstat(filepath);
  if (mode === 33261) {
    stats.mode = 493;
  }
  if (method === "mkdir-index") {
    stats.mode = 57344;
  }
  return [fullpath, oid, stats];
}
async function batchAllSettled(operationName, tasks, onProgress, batchSize) {
  const results = [];
  const rejections = [];
  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize).map((task) => task());
    const batchResults = await Promise.allSettled(batch);
    batchResults.forEach((result) => {
      if (result.status === "fulfilled") {
        results.push(result.value);
      } else {
        rejections.push(result.reason);
        console.error(
          `[isomorphic-git ${operationName}] task rejected:`,
          result.reason?.stack ?? result.reason
        );
      }
    });
    if (onProgress) {
      await onProgress({
        phase: "Updating workdir",
        loaded: i + batch.length,
        total: tasks.length
      });
    }
  }
  if (rejections.length > 0) {
    throw new MultipleGitError(rejections);
  }
  return results;
}
async function checkout({
  fs: fs2,
  onProgress,
  onPostCheckout,
  dir,
  gitdir = join(dir, ".git"),
  remote = "origin",
  ref: _ref,
  filepaths,
  noCheckout = false,
  noUpdateHead = _ref === void 0,
  dryRun = false,
  force = false,
  track = true,
  cache = {},
  nonBlocking = false,
  batchSize = 100
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("dir", dir);
    assertParameter("gitdir", gitdir);
    const ref = _ref || "HEAD";
    const restoreFromIndex = _ref === void 0 && filepaths != null && filepaths.length > 0;
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _checkout({
      fs: fsp,
      cache,
      onProgress,
      onPostCheckout,
      dir,
      gitdir: updatedGitdir,
      remote,
      ref,
      filepaths,
      noCheckout,
      noUpdateHead,
      dryRun,
      force,
      track,
      restoreFromIndex,
      nonBlocking,
      batchSize
    });
  } catch (err) {
    err.caller = "git.checkout";
    throw err;
  }
}
var LINEBREAKS = /^.*(\r?\n|$)/gm;
function mergeFile({ branches, contents }) {
  const ourName = branches[1];
  const theirName = branches[2];
  const baseContent = contents[0];
  const ourContent = contents[1];
  const theirContent = contents[2];
  const ours = ourContent.match(LINEBREAKS);
  const base = baseContent.match(LINEBREAKS);
  const theirs = theirContent.match(LINEBREAKS);
  const result = (0, import_diff3.default)(ours, base, theirs);
  const markerSize = 7;
  let mergedText = "";
  let cleanMerge = true;
  for (const item of result) {
    if (item.ok) {
      mergedText += item.ok.join("");
    }
    if (item.conflict) {
      cleanMerge = false;
      mergedText += `${"<".repeat(markerSize)} ${ourName}
`;
      mergedText += item.conflict.a.join("");
      mergedText += `${"=".repeat(markerSize)}
`;
      mergedText += item.conflict.b.join("");
      mergedText += `${">".repeat(markerSize)} ${theirName}
`;
    }
  }
  return { cleanMerge, mergedText };
}
async function mergeTree({
  fs: fs2,
  cache,
  dir,
  gitdir = join(dir, ".git"),
  index: index3,
  ourOid,
  baseOid,
  theirOid,
  ourName = "ours",
  baseName = "base",
  theirName = "theirs",
  dryRun = false,
  abortOnConflict = true,
  mergeDriver
}) {
  const ourTree = TREE({ ref: ourOid });
  const baseTree = TREE({ ref: baseOid });
  const theirTree = TREE({ ref: theirOid });
  const unmergedFiles = [];
  const bothModified = [];
  const deleteByUs = [];
  const deleteByTheirs = [];
  const results = await _walk({
    fs: fs2,
    cache,
    dir,
    gitdir,
    trees: [ourTree, baseTree, theirTree],
    map: async function(filepath, [ours, base, theirs]) {
      const path = basename(filepath);
      const ourChange = await modified(ours, base);
      const theirChange = await modified(theirs, base);
      switch (`${ourChange}-${theirChange}`) {
        case "false-false": {
          return {
            mode: await base.mode(),
            path,
            oid: await base.oid(),
            type: await base.type()
          };
        }
        case "false-true": {
          if (!theirs && await ours.type() === "tree") {
            return {
              mode: await ours.mode(),
              path,
              oid: await ours.oid(),
              type: await ours.type()
            };
          }
          return theirs ? {
            mode: await theirs.mode(),
            path,
            oid: await theirs.oid(),
            type: await theirs.type()
          } : void 0;
        }
        case "true-false": {
          if (!ours && await theirs.type() === "tree") {
            return {
              mode: await theirs.mode(),
              path,
              oid: await theirs.oid(),
              type: await theirs.type()
            };
          }
          return ours ? {
            mode: await ours.mode(),
            path,
            oid: await ours.oid(),
            type: await ours.type()
          } : void 0;
        }
        case "true-true": {
          if (ours && theirs && await ours.type() === "tree" && await theirs.type() === "tree") {
            return {
              mode: await ours.mode(),
              path,
              oid: await ours.oid(),
              type: "tree"
            };
          }
          if (ours && theirs && await ours.type() === "blob" && await theirs.type() === "blob") {
            return mergeBlobs({
              fs: fs2,
              gitdir,
              path,
              ours,
              base,
              theirs,
              ourName,
              baseName,
              theirName,
              mergeDriver
            }).then(async (r) => {
              if (!r.cleanMerge) {
                unmergedFiles.push(filepath);
                bothModified.push(filepath);
                if (!abortOnConflict) {
                  let baseOid2 = "";
                  if (base && await base.type() === "blob") {
                    baseOid2 = await base.oid();
                  }
                  const ourOid2 = await ours.oid();
                  const theirOid2 = await theirs.oid();
                  index3.delete({ filepath });
                  if (baseOid2) {
                    index3.insert({ filepath, oid: baseOid2, stage: 1 });
                  }
                  index3.insert({ filepath, oid: ourOid2, stage: 2 });
                  index3.insert({ filepath, oid: theirOid2, stage: 3 });
                }
              } else if (!abortOnConflict) {
                index3.insert({ filepath, oid: r.mergeResult.oid, stage: 0 });
              }
              return r.mergeResult;
            });
          }
          if (base && !ours && theirs && await base.type() === "blob" && await theirs.type() === "blob") {
            unmergedFiles.push(filepath);
            deleteByUs.push(filepath);
            if (!abortOnConflict) {
              const baseOid2 = await base.oid();
              const theirOid2 = await theirs.oid();
              index3.delete({ filepath });
              index3.insert({ filepath, oid: baseOid2, stage: 1 });
              index3.insert({ filepath, oid: theirOid2, stage: 3 });
            }
            return {
              mode: await theirs.mode(),
              oid: await theirs.oid(),
              type: "blob",
              path
            };
          }
          if (base && ours && !theirs && await base.type() === "blob" && await ours.type() === "blob") {
            unmergedFiles.push(filepath);
            deleteByTheirs.push(filepath);
            if (!abortOnConflict) {
              const baseOid2 = await base.oid();
              const ourOid2 = await ours.oid();
              index3.delete({ filepath });
              index3.insert({ filepath, oid: baseOid2, stage: 1 });
              index3.insert({ filepath, oid: ourOid2, stage: 2 });
            }
            return {
              mode: await ours.mode(),
              oid: await ours.oid(),
              type: "blob",
              path
            };
          }
          if (base && !ours && !theirs && (await base.type() === "blob" || await base.type() === "tree")) {
            return void 0;
          }
          throw new MergeNotSupportedError();
        }
      }
    },
    /**
     * @param {TreeEntry} [parent]
     * @param {Array<TreeEntry>} children
     */
    reduce: unmergedFiles.length !== 0 && (!dir || abortOnConflict) ? void 0 : async (parent, children) => {
      const entries = children.filter(Boolean);
      if (!parent) return;
      if (parent && parent.type === "tree" && entries.length === 0 && parent.path !== ".")
        return;
      if (entries.length > 0 || parent.path === "." && entries.length === 0) {
        const tree = new GitTree(entries);
        const object = tree.toObject();
        const oid = await _writeObject({
          fs: fs2,
          gitdir,
          type: "tree",
          object,
          dryRun
        });
        parent.oid = oid;
      }
      return parent;
    }
  });
  if (unmergedFiles.length !== 0) {
    if (dir && !abortOnConflict) {
      await _walk({
        fs: fs2,
        cache,
        dir,
        gitdir,
        trees: [TREE({ ref: results.oid })],
        map: async function(filepath, [entry]) {
          const path = `${dir}/${filepath}`;
          if (await entry.type() === "blob") {
            const mode = await entry.mode();
            const content = await entry.content();
            await fs2.write(path, content, { mode });
          }
          return true;
        }
      });
    }
    return new MergeConflictError(
      unmergedFiles,
      bothModified,
      deleteByUs,
      deleteByTheirs
    );
  }
  return results.oid;
}
async function mergeBlobs({
  fs: fs2,
  gitdir,
  path,
  ours,
  base,
  theirs,
  ourName,
  theirName,
  baseName,
  dryRun,
  mergeDriver = mergeFile
}) {
  const type = "blob";
  let baseMode = "100755";
  let baseOid = "";
  let baseContent = "";
  if (base && await base.type() === "blob") {
    baseMode = await base.mode();
    baseOid = await base.oid();
    baseContent = Buffer.from(await base.content()).toString("utf8");
  }
  const mode = baseMode === await ours.mode() ? await theirs.mode() : await ours.mode();
  if (await ours.oid() === await theirs.oid()) {
    return {
      cleanMerge: true,
      mergeResult: { mode, path, oid: await ours.oid(), type }
    };
  }
  if (await ours.oid() === baseOid) {
    return {
      cleanMerge: true,
      mergeResult: { mode, path, oid: await theirs.oid(), type }
    };
  }
  if (await theirs.oid() === baseOid) {
    return {
      cleanMerge: true,
      mergeResult: { mode, path, oid: await ours.oid(), type }
    };
  }
  const ourContent = Buffer.from(await ours.content()).toString("utf8");
  const theirContent = Buffer.from(await theirs.content()).toString("utf8");
  const { mergedText, cleanMerge } = await mergeDriver({
    branches: [baseName, ourName, theirName],
    contents: [baseContent, ourContent, theirContent],
    path
  });
  const oid = await _writeObject({
    fs: fs2,
    gitdir,
    type: "blob",
    object: Buffer.from(mergedText, "utf8"),
    dryRun
  });
  return { cleanMerge, mergeResult: { mode, path, oid, type } };
}
var _TreeMap = {
  stage: STAGE,
  workdir: WORKDIR
};
async function checkAndWriteBlob(fs2, gitdir, dir, filepath, oid = null) {
  const currentFilepath = join(dir, filepath);
  const stats = await fs2.lstat(currentFilepath);
  if (!stats) throw new NotFoundError(currentFilepath);
  if (stats.isDirectory())
    throw new InternalError(
      `${currentFilepath}: file expected, but found directory`
    );
  const objContent = oid ? await readObjectLoose({ fs: fs2, gitdir, oid }) : void 0;
  let retOid = objContent ? oid : void 0;
  if (!objContent) {
    await acquireLock(currentFilepath, async () => {
      const object = stats.isSymbolicLink() ? await fs2.readlink(currentFilepath).then(posixifyPathBuffer) : await fs2.read(currentFilepath);
      if (object === null) throw new NotFoundError(currentFilepath);
      retOid = await _writeObject({ fs: fs2, gitdir, type: "blob", object });
    });
  }
  return retOid;
}
async function processTreeEntries({ fs: fs2, dir, gitdir, entries }) {
  async function processTreeEntry(entry) {
    if (entry.type === "tree") {
      if (!entry.oid) {
        const children = await Promise.all(entry.children.map(processTreeEntry));
        entry.oid = await _writeTree({
          fs: fs2,
          gitdir,
          tree: children
        });
        entry.mode = 16384;
      }
    } else if (entry.type === "blob") {
      entry.oid = await checkAndWriteBlob(
        fs2,
        gitdir,
        dir,
        entry.path,
        entry.oid
      );
      entry.mode = 33188;
    }
    entry.path = entry.path.split("/").pop();
    return entry;
  }
  return Promise.all(entries.map(processTreeEntry));
}
async function writeTreeChanges({
  fs: fs2,
  dir,
  gitdir,
  treePair
  // [TREE({ ref: 'HEAD' }), 'STAGE'] would be the equivalent of `git write-tree`
}) {
  const isStage = treePair[1] === "stage";
  const trees = treePair.map((t) => typeof t === "string" ? _TreeMap[t]() : t);
  const changedEntries = [];
  const map = async (filepath, [head, stage]) => {
    if (filepath === "." || await GitIgnoreManager.isIgnored({ fs: fs2, dir, gitdir, filepath })) {
      return;
    }
    if (stage) {
      if (!head || await head.oid() !== await stage.oid() && await stage.oid() !== void 0) {
        changedEntries.push([head, stage]);
      }
      return {
        mode: await stage.mode(),
        path: filepath,
        oid: await stage.oid(),
        type: await stage.type()
      };
    }
  };
  const reduce = async (parent, children) => {
    children = children.filter(Boolean);
    if (!parent) {
      return children.length > 0 ? children : void 0;
    } else {
      parent.children = children;
      return parent;
    }
  };
  const iterate = async (walk2, children) => {
    const filtered = [];
    for (const child of children) {
      const [head, stage] = child;
      if (isStage) {
        if (stage) {
          if (await fs2.exists(`${dir}/${stage.toString()}`)) {
            filtered.push(child);
          } else {
            changedEntries.push([null, stage]);
          }
        }
      } else if (head) {
        if (!stage) {
          changedEntries.push([head, null]);
        } else {
          filtered.push(child);
        }
      }
    }
    return filtered.length ? Promise.all(filtered.map(walk2)) : [];
  };
  const entries = await _walk({
    fs: fs2,
    cache: {},
    dir,
    gitdir,
    trees,
    map,
    reduce,
    iterate
  });
  if (changedEntries.length === 0 || entries.length === 0) {
    return null;
  }
  const processedEntries = await processTreeEntries({
    fs: fs2,
    dir,
    gitdir,
    entries
  });
  const treeEntries = processedEntries.filter(Boolean).map((entry) => ({
    mode: entry.mode,
    path: entry.path,
    oid: entry.oid,
    type: entry.type
  }));
  return _writeTree({ fs: fs2, gitdir, tree: treeEntries });
}
async function applyTreeChanges({
  fs: fs2,
  dir,
  gitdir,
  stashCommit,
  parentCommit,
  wasStaged
}) {
  const dirRemoved = [];
  const stageUpdated = [];
  const ops = await _walk({
    fs: fs2,
    cache: {},
    dir,
    gitdir,
    trees: [TREE({ ref: parentCommit }), TREE({ ref: stashCommit })],
    map: async (filepath, [parent, stash2]) => {
      if (filepath === "." || await GitIgnoreManager.isIgnored({ fs: fs2, dir, gitdir, filepath })) {
        return;
      }
      const type = stash2 ? await stash2.type() : await parent.type();
      if (type !== "tree" && type !== "blob") {
        return;
      }
      if (!stash2 && parent) {
        const method = type === "tree" ? "rmdir" : "rm";
        if (type === "tree") dirRemoved.push(filepath);
        if (type === "blob" && wasStaged)
          stageUpdated.push({ filepath, oid: await parent.oid() });
        return { method, filepath };
      }
      const oid = await stash2.oid();
      if (!parent || await parent.oid() !== oid) {
        if (type === "tree") {
          return { method: "mkdir", filepath };
        } else {
          if (wasStaged)
            stageUpdated.push({
              filepath,
              oid,
              stats: await fs2.lstat(join(dir, filepath))
            });
          return {
            method: "write",
            filepath,
            oid
          };
        }
      }
    }
  });
  await acquireLock(gitdir, async () => {
    for (const op of ops) {
      const currentFilepath = join(dir, op.filepath);
      switch (op.method) {
        case "rmdir":
          await fs2.rmdir(currentFilepath);
          break;
        case "mkdir":
          await assertNoSymlinkInLeadingPath(fs2, dir, op.filepath);
          await fs2.mkdir(currentFilepath);
          break;
        case "rm":
          await fs2.rm(currentFilepath);
          break;
        case "write":
          if (!dirRemoved.some(
            (removedDir) => currentFilepath.startsWith(removedDir)
          )) {
            await assertNoSymlinkInLeadingPath(fs2, dir, op.filepath);
            const { object } = await _readObject({
              fs: fs2,
              cache: {},
              gitdir,
              oid: op.oid
            });
            if (await fs2.exists(currentFilepath)) {
              await fs2.rm(currentFilepath);
            }
            await fs2.write(currentFilepath, object);
          }
          break;
      }
    }
  });
  await GitIndexManager.acquire({ fs: fs2, gitdir, cache: {} }, async (index3) => {
    stageUpdated.forEach(({ filepath, stats, oid }) => {
      index3.insert({ filepath, stats, oid });
    });
  });
}
async function _cherryPick({
  fs: fs2,
  cache,
  dir,
  gitdir,
  oid,
  dryRun = false,
  noUpdateBranch = false,
  abortOnConflict = true,
  committer,
  mergeDriver
}) {
  const { commit: cherryCommit, oid: cherryOid } = await _readCommit({
    fs: fs2,
    cache,
    gitdir,
    oid
  });
  if (cherryCommit.parent.length > 1) {
    throw new CherryPickMergeCommitError(cherryOid, cherryCommit.parent.length);
  }
  if (cherryCommit.parent.length === 0) {
    throw new CherryPickRootCommitError(cherryOid);
  }
  const currentOid = await GitRefManager.resolve({
    fs: fs2,
    gitdir,
    ref: "HEAD"
  });
  const { commit: currentCommit } = await _readCommit({
    fs: fs2,
    cache,
    gitdir,
    oid: currentOid
  });
  const cherryParentOid = cherryCommit.parent[0];
  const { commit: cherryParent } = await _readCommit({
    fs: fs2,
    cache,
    gitdir,
    oid: cherryParentOid
  });
  const mergedTreeOid = await GitIndexManager.acquire(
    { fs: fs2, gitdir, cache, allowUnmerged: false },
    async (index3) => {
      return mergeTree({
        fs: fs2,
        cache,
        dir,
        gitdir,
        index: index3,
        ourOid: currentCommit.tree,
        baseOid: cherryParent.tree,
        theirOid: cherryCommit.tree,
        ourName: "HEAD",
        baseName: `parent of ${cherryOid.slice(0, 7)}`,
        theirName: cherryOid.slice(0, 7),
        dryRun,
        abortOnConflict,
        mergeDriver
      });
    }
  );
  if (mergedTreeOid instanceof MergeConflictError) {
    throw mergedTreeOid;
  }
  const newOid = await _commit({
    fs: fs2,
    cache,
    gitdir,
    message: cherryCommit.message,
    tree: mergedTreeOid,
    parent: [currentOid],
    // Single parent: current HEAD
    author: cherryCommit.author,
    // Preserve original author
    committer,
    // New committer
    dryRun,
    noUpdateBranch
  });
  if (dir && !dryRun && !noUpdateBranch) {
    await applyTreeChanges({
      fs: fs2,
      dir,
      gitdir,
      stashCommit: newOid,
      parentCommit: currentOid,
      wasStaged: true
    });
  }
  return newOid;
}
async function cherryPick({
  fs: _fs,
  dir,
  gitdir = join(dir, ".git"),
  oid,
  cache = {},
  committer,
  dryRun = false,
  noUpdateBranch = false,
  abortOnConflict = true,
  mergeDriver
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("gitdir", gitdir);
    assertParameter("oid", oid);
    const fs2 = new FileSystem(_fs);
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    const { commit: cherryCommit } = await _readCommit({
      fs: fs2,
      cache,
      gitdir: updatedGitdir,
      oid
    });
    if (cherryCommit.parent && cherryCommit.parent.length > 1) {
      return await _cherryPick({
        fs: fs2,
        cache,
        dir,
        gitdir: updatedGitdir,
        oid,
        dryRun,
        noUpdateBranch,
        abortOnConflict,
        committer: void 0,
        mergeDriver
      });
    }
    const normalizedCommitter = await normalizeCommitterObject({
      fs: fs2,
      gitdir: updatedGitdir,
      committer
    });
    if (!normalizedCommitter) {
      throw new MissingNameError("committer");
    }
    return await _cherryPick({
      fs: fs2,
      cache,
      dir,
      gitdir: updatedGitdir,
      oid,
      dryRun,
      noUpdateBranch,
      abortOnConflict,
      committer: normalizedCommitter,
      mergeDriver
    });
  } catch (err) {
    err.caller = "git.cherryPick";
    throw err;
  }
}
var abbreviateRx = /^refs\/(heads\/|tags\/|remotes\/)?(.*)/;
function abbreviateRef(ref) {
  const match = abbreviateRx.exec(ref);
  if (match) {
    if (match[1] === "remotes/" && ref.endsWith("/HEAD")) {
      return match[2].slice(0, -5);
    } else {
      return match[2];
    }
  }
  return ref;
}
async function _currentBranch({
  fs: fs2,
  gitdir,
  fullname = false,
  test = false
}) {
  const ref = await GitRefManager.resolve({
    fs: fs2,
    gitdir,
    ref: "HEAD",
    depth: 2
  });
  if (test) {
    try {
      await GitRefManager.resolve({ fs: fs2, gitdir, ref });
    } catch (_) {
      return;
    }
  }
  if (!ref.startsWith("refs/")) return;
  return fullname ? ref : abbreviateRef(ref);
}
function translateSSHtoHTTP(url) {
  url = url.replace(/^[^/@:]+@([^/@:]+):/, "https://$1/");
  url = url.replace(/^ssh:\/\//, "https://");
  return url;
}
function calculateBasicAuthHeader({ username = "", password = "" }) {
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}
async function forAwait(iterable, cb) {
  const iter2 = getIterator(iterable);
  while (true) {
    const { value, done } = await iter2.next();
    if (value) await cb(value);
    if (done) break;
  }
  if (iter2.return) iter2.return();
}
async function collect(iterable) {
  let size = 0;
  const buffers = [];
  await forAwait(iterable, (value) => {
    buffers.push(value);
    size += value.byteLength;
  });
  const result = new Uint8Array(size);
  let nextIndex = 0;
  for (const buffer of buffers) {
    result.set(buffer, nextIndex);
    nextIndex += buffer.byteLength;
  }
  return result;
}
var CREDENTIALS = /^(https?:\/\/)([^/?#]+)@/i;
function extractAuthFromUrl(url) {
  const credentials = url.match(CREDENTIALS);
  if (credentials == null) return { url, auth: {} };
  return {
    url: url.replace(CREDENTIALS, "$1"),
    auth: parseUserinfo(url, credentials[2])
  };
}
function parseUserinfo(url, userpass) {
  const parsed = parseUrl(url);
  const hasPassword = userpass.indexOf(":") !== -1;
  if (parsed !== null) {
    return {
      username: decodeUserinfo(parsed.username),
      password: hasPassword ? decodeUserinfo(parsed.password) : void 0
    };
  }
  const separatorIndex = userpass.indexOf(":");
  return {
    username: hasPassword ? userpass.slice(0, separatorIndex) : userpass,
    password: hasPassword ? userpass.slice(separatorIndex + 1) : void 0
  };
}
function parseUrl(url) {
  if (typeof URL !== "function") return null;
  try {
    return new URL(url);
  } catch (_) {
    return null;
  }
}
function decodeUserinfo(value) {
  try {
    return decodeURIComponent(value);
  } catch (_) {
    return value;
  }
}
function padHex(b, n) {
  const s = n.toString(16);
  return "0".repeat(b - s.length) + s;
}
var GitPktLine = class {
  static flush() {
    return Buffer.from("0000", "utf8");
  }
  static delim() {
    return Buffer.from("0001", "utf8");
  }
  static encode(line) {
    if (typeof line === "string") {
      line = Buffer.from(line);
    }
    const length = line.length + 4;
    const hexlength = padHex(4, length);
    return Buffer.concat([Buffer.from(hexlength, "utf8"), line]);
  }
  static streamReader(stream) {
    const reader = new StreamReader(stream);
    return async function read() {
      try {
        let length = await reader.read(4);
        if (length == null) return true;
        length = parseInt(length.toString("utf8"), 16);
        if (length === 0) return null;
        if (length === 1) return null;
        const buffer = await reader.read(length - 4);
        if (buffer == null) return true;
        return buffer;
      } catch (err) {
        stream.error = err;
        return true;
      }
    };
  }
};
async function parseCapabilitiesV2(read) {
  const capabilities2 = {};
  let line;
  while (true) {
    line = await read();
    if (line === true) break;
    if (line === null) continue;
    line = line.toString("utf8").replace(/\n$/, "");
    const i = line.indexOf("=");
    if (i > -1) {
      const key = line.slice(0, i);
      const value = line.slice(i + 1);
      capabilities2[key] = value;
    } else {
      capabilities2[line] = true;
    }
  }
  return { protocolVersion: 2, capabilities2 };
}
async function parseRefsAdResponse(stream, { service }) {
  const capabilities = /* @__PURE__ */ new Set();
  const refs = /* @__PURE__ */ new Map();
  const symrefs = /* @__PURE__ */ new Map();
  const read = GitPktLine.streamReader(stream);
  let lineOne = await read();
  while (lineOne === null) lineOne = await read();
  if (lineOne === true) throw new EmptyServerResponseError();
  if (lineOne.includes("version 2")) {
    return parseCapabilitiesV2(read);
  }
  if (lineOne.toString("utf8").replace(/\n$/, "") !== `# service=${service}`) {
    throw new ParseError(`# service=${service}\\n`, lineOne.toString("utf8"));
  }
  let lineTwo = await read();
  while (lineTwo === null) lineTwo = await read();
  if (lineTwo === true) return { capabilities, refs, symrefs };
  lineTwo = lineTwo.toString("utf8");
  if (lineTwo.includes("version 2")) {
    return parseCapabilitiesV2(read);
  }
  const [firstRef, capabilitiesLine] = splitAndAssert(lineTwo, "\0", "\\x00");
  capabilitiesLine.split(" ").map((x) => capabilities.add(x));
  if (firstRef !== "0000000000000000000000000000000000000000 capabilities^{}") {
    const [ref, name] = splitAndAssert(firstRef, " ", " ");
    refs.set(name, ref);
    while (true) {
      const line = await read();
      if (line === true) break;
      if (line !== null) {
        const [ref2, name2] = splitAndAssert(line.toString("utf8"), " ", " ");
        refs.set(name2, ref2);
      }
    }
  }
  for (const cap of capabilities) {
    if (cap.startsWith("symref=")) {
      const m = cap.match(/symref=([^:]+):(.*)/);
      if (m.length === 3) {
        symrefs.set(m[1], m[2]);
      }
    }
  }
  return { protocolVersion: 1, capabilities, refs, symrefs };
}
function splitAndAssert(line, sep, expected) {
  const split2 = line.trim().split(sep);
  if (split2.length !== 2) {
    throw new ParseError(
      `Two strings separated by '${expected}'`,
      line.toString("utf8")
    );
  }
  return split2;
}
var corsProxify = (corsProxy, url) => corsProxy.endsWith("?") ? `${corsProxy}${url}` : `${corsProxy}/${url.replace(/^https?:\/\//, "")}`;
var updateHeaders = (headers, auth) => {
  if (auth.username || auth.password) {
    headers.Authorization = calculateBasicAuthHeader(auth);
  }
  if (auth.headers) {
    Object.assign(headers, auth.headers);
  }
};
var stringifyBody = async (res) => {
  try {
    const data = Buffer.from(await collect(res.body));
    const response = data.toString("utf8");
    const preview = response.length < 256 ? response : response.slice(0, 256) + "...";
    return { preview, response, data };
  } catch (e) {
    return {};
  }
};
var GitRemoteHTTP = class {
  /**
   * Returns the capabilities of the GitRemoteHTTP class.
   *
   * @returns {Promise<string[]>} - An array of supported capabilities.
   */
  static async capabilities() {
    return ["discover", "connect"];
  }
  /**
   * Discovers references from a remote Git repository.
   *
   * @param {Object} args
   * @param {HttpClient} args.http - The HTTP client to use for requests.
   * @param {ProgressCallback} [args.onProgress] - Callback for progress updates.
   * @param {AuthCallback} [args.onAuth] - Callback for providing authentication credentials.
   * @param {AuthFailureCallback} [args.onAuthFailure] - Callback for handling authentication failures.
   * @param {AuthSuccessCallback} [args.onAuthSuccess] - Callback for handling successful authentication.
   * @param {string} [args.corsProxy] - Optional CORS proxy URL.
   * @param {string} args.service - The Git service (e.g., "git-upload-pack").
   * @param {string} args.url - The URL of the remote repository.
   * @param {Object<string, string>} args.headers - HTTP headers to include in the request.
   * @param {1 | 2} args.protocolVersion - The Git protocol version to use.
   * @returns {Promise<Object>} - The parsed response from the remote repository.
   * @throws {HttpError} - If the HTTP request fails.
   * @throws {SmartHttpError} - If the response cannot be parsed.
   * @throws {UserCanceledError} - If the user cancels the operation.
   */
  static async discover({
    http,
    onProgress,
    onAuth,
    onAuthSuccess,
    onAuthFailure,
    corsProxy,
    service,
    url: _origUrl,
    headers,
    protocolVersion
  }) {
    let { url, auth } = extractAuthFromUrl(_origUrl);
    const proxifiedURL = corsProxy ? corsProxify(corsProxy, url) : url;
    if (auth.username || auth.password) {
      headers.Authorization = calculateBasicAuthHeader(auth);
    }
    if (protocolVersion === 2) {
      headers["Git-Protocol"] = "version=2";
    }
    let res;
    let tryAgain;
    let providedAuthBefore = false;
    do {
      res = await http.request({
        onProgress,
        method: "GET",
        url: `${proxifiedURL}/info/refs?service=${service}`,
        headers
      });
      tryAgain = false;
      if (res.statusCode === 401 || res.statusCode === 203) {
        const getAuth = providedAuthBefore ? onAuthFailure : onAuth;
        if (getAuth) {
          auth = await getAuth(url, {
            ...auth,
            headers: { ...headers }
          });
          if (auth && auth.cancel) {
            throw new UserCanceledError();
          } else if (auth) {
            updateHeaders(headers, auth);
            providedAuthBefore = true;
            tryAgain = true;
          }
        }
      } else if (res.statusCode === 200 && providedAuthBefore && onAuthSuccess) {
        await onAuthSuccess(url, auth);
      }
    } while (tryAgain);
    if (res.statusCode !== 200) {
      const { response } = await stringifyBody(res);
      throw new HttpError(res.statusCode, res.statusMessage, response);
    }
    if (res.headers["content-type"] === `application/x-${service}-advertisement`) {
      const remoteHTTP = await parseRefsAdResponse(res.body, { service });
      remoteHTTP.auth = auth;
      return remoteHTTP;
    } else {
      const { preview, response, data } = await stringifyBody(res);
      try {
        const remoteHTTP = await parseRefsAdResponse([data], { service });
        remoteHTTP.auth = auth;
        return remoteHTTP;
      } catch (e) {
        throw new SmartHttpError(preview, response);
      }
    }
  }
  /**
   * Connects to a remote Git repository and sends a request.
   *
   * @param {Object} args
   * @param {HttpClient} args.http - The HTTP client to use for requests.
   * @param {ProgressCallback} [args.onProgress] - Callback for progress updates.
   * @param {string} [args.corsProxy] - Optional CORS proxy URL.
   * @param {string} args.service - The Git service (e.g., "git-upload-pack").
   * @param {string} args.url - The URL of the remote repository.
   * @param {Object<string, string>} [args.headers] - HTTP headers to include in the request.
   * @param {any} args.body - The request body to send.
   * @param {any} args.auth - Authentication credentials.
   * @returns {Promise<GitHttpResponse>} - The HTTP response from the remote repository.
   * @throws {HttpError} - If the HTTP request fails.
   */
  static async connect({
    http,
    onProgress,
    corsProxy,
    service,
    url,
    auth,
    body,
    headers
  }) {
    const urlAuth = extractAuthFromUrl(url);
    if (urlAuth) url = urlAuth.url;
    if (corsProxy) url = corsProxify(corsProxy, url);
    headers["content-type"] = `application/x-${service}-request`;
    headers.accept = `application/x-${service}-result`;
    updateHeaders(headers, auth);
    const res = await http.request({
      onProgress,
      method: "POST",
      url: `${url}/${service}`,
      body,
      headers
    });
    if (res.statusCode !== 200) {
      const { response } = stringifyBody(res);
      throw new HttpError(res.statusCode, res.statusMessage, response);
    }
    return res;
  }
};
var GitRemoteManager = class {
  /**
   * Determines the appropriate remote helper for the given URL.
   *
   * @param {Object} args
   * @param {string} args.url - The URL of the remote repository.
   * @returns {Object} - The remote helper class for the specified transport.
   * @throws {UrlParseError} - If the URL cannot be parsed.
   * @throws {UnknownTransportError} - If the transport is not supported.
   */
  static getRemoteHelperFor({ url }) {
    const remoteHelpers = /* @__PURE__ */ new Map();
    remoteHelpers.set("http", GitRemoteHTTP);
    remoteHelpers.set("https", GitRemoteHTTP);
    const parts = parseRemoteUrl({ url });
    if (!parts) {
      throw new UrlParseError(url);
    }
    if (remoteHelpers.has(parts.transport)) {
      return remoteHelpers.get(parts.transport);
    }
    throw new UnknownTransportError(
      url,
      parts.transport,
      parts.transport === "ssh" ? translateSSHtoHTTP(url) : void 0
    );
  }
};
var scpLike = /^[^/@:]+@[^/@:]+:/;
function parseRemoteUrl({ url }) {
  if (scpLike.test(url)) {
    return {
      transport: "ssh",
      address: url
    };
  }
  const matches = url.match(/(\w+)(:\/\/|::)(.*)/);
  if (matches === null) return;
  if (matches[2] === "://") {
    return {
      transport: matches[1],
      address: matches[0]
    };
  }
  if (matches[2] === "::") {
    return {
      transport: matches[1],
      address: matches[3]
    };
  }
}
var GitShallowManager = class {
  /**
   * Reads the `shallow` file in the Git repository and returns a set of object IDs (OIDs).
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} [args.gitdir] - [required] The [git directory](dir-vs-gitdir.md) path
   * @returns {Promise<Set<string>>} - A set of shallow object IDs.
   */
  static async read({ fs: fs2, gitdir }) {
    const filepath = join(gitdir, "shallow");
    const oids = /* @__PURE__ */ new Set();
    await acquireLock(filepath, async function() {
      const text = await fs2.read(filepath, { encoding: "utf8" });
      if (text === null) return oids;
      if (text.trim() === "") return oids;
      text.trim().split("\n").map((oid) => oids.add(oid));
    });
    return oids;
  }
  /**
   * Writes a set of object IDs (OIDs) to the `shallow` file in the Git repository.
   * If the set is empty, the `shallow` file is removed.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} [args.gitdir] - [required] The [git directory](dir-vs-gitdir.md) path
   * @param {Set<string>} args.oids - A set of shallow object IDs to write.
   * @returns {Promise<void>}
   */
  static async write({ fs: fs2, gitdir, oids }) {
    const filepath = join(gitdir, "shallow");
    if (oids.size > 0) {
      const text = [...oids].join("\n") + "\n";
      await acquireLock(filepath, async function() {
        await fs2.write(filepath, text, {
          encoding: "utf8"
        });
      });
    } else {
      await acquireLock(filepath, async function() {
        await fs2.rm(filepath);
      });
    }
  }
};
async function hasObjectLoose({ fs: fs2, gitdir, oid }) {
  const source = `objects/${oid.slice(0, 2)}/${oid.slice(2)}`;
  return fs2.exists(`${gitdir}/${source}`);
}
async function hasObjectPacked({
  fs: fs2,
  cache,
  gitdir,
  oid,
  getExternalRefDelta
}) {
  let list = await fs2.readdir(join(gitdir, "objects/pack"));
  list = list.filter((x) => x.endsWith(".idx"));
  for (const filename of list) {
    const indexFile = `${gitdir}/objects/pack/${filename}`;
    const p = await readPackIndex({
      fs: fs2,
      cache,
      filename: indexFile,
      getExternalRefDelta
    });
    if (p.error) throw new InternalError(p.error);
    if (p.offsets.has(oid)) {
      return true;
    }
  }
  return false;
}
async function hasObject({
  fs: fs2,
  cache,
  gitdir,
  oid,
  format = "content"
}) {
  const getExternalRefDelta = (oid2) => _readObject({ fs: fs2, cache, gitdir, oid: oid2 });
  let result = await hasObjectLoose({ fs: fs2, gitdir, oid });
  if (!result) {
    result = await hasObjectPacked({
      fs: fs2,
      cache,
      gitdir,
      oid,
      getExternalRefDelta
    });
  }
  return result;
}
function addCredentialUsername({ config, onAuth }) {
  if (!onAuth) return onAuth;
  return async (url, auth) => {
    const username = auth.username || await config.get(`credential.${url}.username`);
    return onAuth(url, username ? { ...auth, username } : auth);
  };
}
function emptyPackfile(pack) {
  const pheader = "5041434b";
  const version2 = "00000002";
  const obCount = "00000000";
  const header = pheader + version2 + obCount;
  return pack.slice(0, 12).toString("hex") === header;
}
function filterCapabilities(server, client) {
  const serverNames = server.map((cap) => cap.split("=", 1)[0]);
  return client.filter((cap) => {
    const name = cap.split("=", 1)[0];
    return serverNames.includes(name);
  });
}
var pkg = {
  name: "isomorphic-git",
  version: "1.41.9",
  agent: "git/isomorphic-git@1.41.9"
};
var FIFO = class {
  constructor() {
    this._queue = [];
  }
  write(chunk) {
    if (this._ended) {
      throw Error("You cannot write to a FIFO that has already been ended!");
    }
    if (this._waiting) {
      const resolve = this._waiting;
      this._waiting = null;
      resolve({ value: chunk });
    } else {
      this._queue.push(chunk);
    }
  }
  end() {
    this._ended = true;
    if (this._waiting) {
      const resolve = this._waiting;
      this._waiting = null;
      resolve({ done: true });
    }
  }
  destroy(err) {
    this.error = err;
    this.end();
  }
  async next() {
    if (this._queue.length > 0) {
      return { value: this._queue.shift() };
    }
    if (this._ended) {
      return { done: true };
    }
    if (this._waiting) {
      throw Error(
        "You cannot call read until the previous call to read has returned!"
      );
    }
    return new Promise((resolve) => {
      this._waiting = resolve;
    });
  }
};
function findSplit(str) {
  const r = str.indexOf("\r");
  const n = str.indexOf("\n");
  if (r === -1 && n === -1) return -1;
  if (r === -1) return n + 1;
  if (n === -1) return r + 1;
  if (n === r + 1) return n + 1;
  return Math.min(r, n) + 1;
}
function splitLines(input) {
  const output = new FIFO();
  let tmp = "";
  (async () => {
    await forAwait(input, (chunk) => {
      chunk = chunk.toString("utf8");
      tmp += chunk;
      while (true) {
        const i = findSplit(tmp);
        if (i === -1) break;
        if (i === tmp.length && tmp[i - 1] === "\r") break;
        output.write(tmp.slice(0, i));
        tmp = tmp.slice(i);
      }
    });
    if (tmp.length > 0) {
      output.write(tmp);
    }
    output.end();
  })();
  return output;
}
var GitSideBand = class {
  static demux(input) {
    const read = GitPktLine.streamReader(input);
    const packetlines = new FIFO();
    const packfile = new FIFO();
    const progress = new FIFO();
    const nextBit = async function() {
      const line = await read();
      if (line === null) return nextBit();
      if (line === true) {
        packetlines.end();
        progress.end();
        input.error ? packfile.destroy(input.error) : packfile.end();
        return;
      }
      switch (line[0]) {
        case 1: {
          packfile.write(line.slice(1));
          break;
        }
        case 2: {
          progress.write(line.slice(1));
          break;
        }
        case 3: {
          const error = line.slice(1);
          progress.write(error);
          packetlines.end();
          progress.end();
          packfile.destroy(new Error(error.toString("utf8")));
          return;
        }
        default: {
          packetlines.write(line);
        }
      }
      nextBit();
    };
    nextBit();
    return {
      packetlines,
      packfile,
      progress
    };
  }
  // static mux ({
  //   protocol, // 'side-band' or 'side-band-64k'
  //   packetlines,
  //   packfile,
  //   progress,
  //   error
  // }) {
  //   const MAX_PACKET_LENGTH = protocol === 'side-band-64k' ? 999 : 65519
  //   let output = new PassThrough()
  //   packetlines.on('data', data => {
  //     if (data === null) {
  //       output.write(GitPktLine.flush())
  //     } else {
  //       output.write(GitPktLine.encode(data))
  //     }
  //   })
  //   let packfileWasEmpty = true
  //   let packfileEnded = false
  //   let progressEnded = false
  //   let errorEnded = false
  //   let goodbye = Buffer.concat([
  //     GitPktLine.encode(Buffer.from('010A', 'hex')),
  //     GitPktLine.flush()
  //   ])
  //   packfile
  //     .on('data', data => {
  //       packfileWasEmpty = false
  //       const buffers = splitBuffer(data, MAX_PACKET_LENGTH)
  //       for (const buffer of buffers) {
  //         output.write(
  //           GitPktLine.encode(Buffer.concat([Buffer.from('01', 'hex'), buffer]))
  //         )
  //       }
  //     })
  //     .on('end', () => {
  //       packfileEnded = true
  //       if (!packfileWasEmpty) output.write(goodbye)
  //       if (progressEnded && errorEnded) output.end()
  //     })
  //   progress
  //     .on('data', data => {
  //       const buffers = splitBuffer(data, MAX_PACKET_LENGTH)
  //       for (const buffer of buffers) {
  //         output.write(
  //           GitPktLine.encode(Buffer.concat([Buffer.from('02', 'hex'), buffer]))
  //         )
  //       }
  //     })
  //     .on('end', () => {
  //       progressEnded = true
  //       if (packfileEnded && errorEnded) output.end()
  //     })
  //   error
  //     .on('data', data => {
  //       const buffers = splitBuffer(data, MAX_PACKET_LENGTH)
  //       for (const buffer of buffers) {
  //         output.write(
  //           GitPktLine.encode(Buffer.concat([Buffer.from('03', 'hex'), buffer]))
  //         )
  //       }
  //     })
  //     .on('end', () => {
  //       errorEnded = true
  //       if (progressEnded && packfileEnded) output.end()
  //     })
  //   return output
  // }
};
async function parseUploadPackResponse(stream) {
  const { packetlines, packfile, progress } = GitSideBand.demux(stream);
  const shallows = [];
  const unshallows = [];
  const acks = [];
  let nak = false;
  let done = false;
  return new Promise((resolve, reject) => {
    forAwait(packetlines, (data) => {
      const line = data.toString("utf8").trim();
      if (line.startsWith("shallow")) {
        const oid = line.slice(-41).trim();
        if (oid.length !== 40) {
          reject(new InvalidOidError(oid));
        }
        shallows.push(oid);
      } else if (line.startsWith("unshallow")) {
        const oid = line.slice(-41).trim();
        if (oid.length !== 40) {
          reject(new InvalidOidError(oid));
        }
        unshallows.push(oid);
      } else if (line.startsWith("ACK")) {
        const [, oid, status2] = line.split(" ");
        acks.push({ oid, status: status2 });
        if (!status2) done = true;
      } else if (line.startsWith("NAK")) {
        nak = true;
        done = true;
      } else {
        done = true;
        nak = true;
      }
      if (done) {
        stream.error ? reject(stream.error) : resolve({ shallows, unshallows, acks, nak, packfile, progress });
      }
    }).finally(() => {
      if (!done) {
        stream.error ? reject(stream.error) : resolve({ shallows, unshallows, acks, nak, packfile, progress });
      }
    });
  });
}
function writeUploadPackRequest({
  capabilities = [],
  wants = [],
  haves = [],
  shallows = [],
  depth = null,
  since = null,
  exclude = []
}) {
  const packstream = [];
  wants = [...new Set(wants)];
  let firstLineCapabilities = ` ${capabilities.join(" ")}`;
  for (const oid of wants) {
    packstream.push(GitPktLine.encode(`want ${oid}${firstLineCapabilities}
`));
    firstLineCapabilities = "";
  }
  for (const oid of shallows) {
    packstream.push(GitPktLine.encode(`shallow ${oid}
`));
  }
  if (depth !== null) {
    packstream.push(GitPktLine.encode(`deepen ${depth}
`));
  }
  if (since !== null) {
    packstream.push(
      GitPktLine.encode(`deepen-since ${Math.floor(since.valueOf() / 1e3)}
`)
    );
  }
  for (const oid of exclude) {
    packstream.push(GitPktLine.encode(`deepen-not ${oid}
`));
  }
  packstream.push(GitPktLine.flush());
  for (const oid of haves) {
    packstream.push(GitPktLine.encode(`have ${oid}
`));
  }
  packstream.push(GitPktLine.encode(`done
`));
  return packstream;
}
async function _fetch({
  fs: fs2,
  cache,
  http,
  onProgress,
  onMessage,
  onAuth,
  onAuthSuccess,
  onAuthFailure,
  gitdir,
  ref: _ref,
  remoteRef: _remoteRef,
  remote: _remote,
  url: _url,
  corsProxy,
  depth = null,
  since = null,
  exclude = [],
  relative = false,
  tags = false,
  singleBranch = false,
  headers = {},
  prune = false,
  pruneTags = false
}) {
  const ref = _ref || await _currentBranch({ fs: fs2, gitdir, test: true });
  const config = await GitConfigManager.get({ fs: fs2, gitdir });
  const remote = _remote || ref && await config.get(`branch.${ref}.remote`) || "origin";
  const url = _url || await config.get(`remote.${remote}.url`);
  if (typeof url === "undefined") {
    throw new MissingParameterError("remote OR url");
  }
  const remoteRef = _remoteRef || ref && await config.get(`branch.${ref}.merge`) || _ref || "HEAD";
  if (corsProxy === void 0) {
    corsProxy = await config.get("http.corsProxy");
  }
  const GitRemoteHTTP2 = GitRemoteManager.getRemoteHelperFor({ url });
  const remoteHTTP = await GitRemoteHTTP2.discover({
    http,
    onAuth: addCredentialUsername({ config, onAuth }),
    onAuthSuccess,
    onAuthFailure: addCredentialUsername({ config, onAuth: onAuthFailure }),
    corsProxy,
    service: "git-upload-pack",
    url,
    headers,
    protocolVersion: 1
  });
  const auth = remoteHTTP.auth;
  const remoteRefs = remoteHTTP.refs;
  if (remoteRefs.size === 0) {
    return {
      defaultBranch: null,
      fetchHead: null,
      fetchHeadDescription: null
    };
  }
  if (depth !== null && !remoteHTTP.capabilities.has("shallow")) {
    throw new RemoteCapabilityError("shallow", "depth");
  }
  if (since !== null && !remoteHTTP.capabilities.has("deepen-since")) {
    throw new RemoteCapabilityError("deepen-since", "since");
  }
  if (exclude.length > 0 && !remoteHTTP.capabilities.has("deepen-not")) {
    throw new RemoteCapabilityError("deepen-not", "exclude");
  }
  if (relative === true && !remoteHTTP.capabilities.has("deepen-relative")) {
    throw new RemoteCapabilityError("deepen-relative", "relative");
  }
  const { oid, fullref } = GitRefManager.resolveAgainstMap({
    ref: remoteRef,
    map: remoteRefs
  });
  for (const remoteRef2 of remoteRefs.keys()) {
    if (remoteRef2 === fullref || remoteRef2 === "HEAD" || remoteRef2.startsWith("refs/heads/") || tags && remoteRef2.startsWith("refs/tags/")) {
      continue;
    }
    remoteRefs.delete(remoteRef2);
  }
  const capabilities = filterCapabilities(
    [...remoteHTTP.capabilities],
    [
      "multi_ack_detailed",
      "no-done",
      "side-band-64k",
      // Note: I removed 'thin-pack' option since our code doesn't "fatten" packfiles,
      // which is necessary for compatibility with git. It was the cause of mysterious
      // 'fatal: pack has [x] unresolved deltas' errors that plagued us for some time.
      // isomorphic-git is perfectly happy with thin packfiles in .git/objects/pack but
      // canonical git it turns out is NOT.
      "ofs-delta",
      `agent=${pkg.agent}`
    ]
  );
  if (relative) capabilities.push("deepen-relative");
  const wants = singleBranch ? [oid] : remoteRefs.values();
  const haveRefs = singleBranch ? [ref] : await GitRefManager.listRefs({
    fs: fs2,
    gitdir,
    filepath: `refs`
  });
  let haves = [];
  for (let ref2 of haveRefs) {
    try {
      ref2 = await GitRefManager.expand({ fs: fs2, gitdir, ref: ref2 });
      const oid2 = await GitRefManager.resolve({ fs: fs2, gitdir, ref: ref2 });
      if (await hasObject({ fs: fs2, cache, gitdir, oid: oid2 })) {
        haves.push(oid2);
      }
    } catch (err) {
    }
  }
  haves = [...new Set(haves)];
  const oids = await GitShallowManager.read({ fs: fs2, gitdir });
  const shallows = remoteHTTP.capabilities.has("shallow") ? [...oids] : [];
  const packstream = writeUploadPackRequest({
    capabilities,
    wants,
    haves,
    shallows,
    depth,
    since,
    exclude
  });
  const packbuffer = Buffer.from(await collect(packstream));
  const raw = await GitRemoteHTTP2.connect({
    http,
    onProgress,
    corsProxy,
    service: "git-upload-pack",
    url,
    auth,
    body: [packbuffer],
    headers
  });
  const response = await parseUploadPackResponse(raw.body);
  if (raw.headers) {
    response.headers = raw.headers;
  }
  for (const oid2 of response.shallows) {
    if (!oids.has(oid2)) {
      try {
        const { object } = await _readObject({ fs: fs2, cache, gitdir, oid: oid2 });
        const commit2 = new GitCommit(object);
        const hasParents = await Promise.all(
          commit2.headers().parent.map((oid3) => hasObject({ fs: fs2, cache, gitdir, oid: oid3 }))
        );
        const haveAllParents = hasParents.length === 0 || hasParents.every((has) => has);
        if (!haveAllParents) {
          oids.add(oid2);
        }
      } catch (err) {
        oids.add(oid2);
      }
    }
  }
  for (const oid2 of response.unshallows) {
    oids.delete(oid2);
  }
  await GitShallowManager.write({ fs: fs2, gitdir, oids });
  if (singleBranch) {
    const refs = /* @__PURE__ */ new Map([[fullref, oid]]);
    const symrefs = /* @__PURE__ */ new Map();
    let bail = 10;
    let key = fullref;
    while (bail--) {
      const value = remoteHTTP.symrefs.get(key);
      if (value === void 0) break;
      symrefs.set(key, value);
      key = value;
    }
    const realRef = remoteRefs.get(key);
    if (realRef) {
      refs.set(key, realRef);
    }
    const { pruned } = await GitRefManager.updateRemoteRefs({
      fs: fs2,
      gitdir,
      remote,
      refs,
      symrefs,
      tags,
      prune
    });
    if (prune) {
      response.pruned = pruned;
    }
  } else {
    const { pruned } = await GitRefManager.updateRemoteRefs({
      fs: fs2,
      gitdir,
      remote,
      refs: remoteRefs,
      symrefs: remoteHTTP.symrefs,
      tags,
      prune,
      pruneTags
    });
    if (prune) {
      response.pruned = pruned;
    }
  }
  response.HEAD = remoteHTTP.symrefs.get("HEAD");
  if (response.HEAD === void 0) {
    const { oid: oid2 } = GitRefManager.resolveAgainstMap({
      ref: "HEAD",
      map: remoteRefs
    });
    for (const [key, value] of remoteRefs.entries()) {
      if (key !== "HEAD" && value === oid2) {
        response.HEAD = key;
        break;
      }
    }
  }
  const noun = fullref.startsWith("refs/tags") ? "tag" : "branch";
  response.FETCH_HEAD = {
    oid,
    description: `${noun} '${abbreviateRef(fullref)}' of ${url}`
  };
  if (onProgress || onMessage) {
    const lines = splitLines(response.progress);
    forAwait(lines, async (line) => {
      if (onMessage) await onMessage(line);
      if (onProgress) {
        const matches = line.match(/([^:]*).*\((\d+?)\/(\d+?)\)/);
        if (matches) {
          await onProgress({
            phase: matches[1].trim(),
            loaded: parseInt(matches[2], 10),
            total: parseInt(matches[3], 10)
          });
        }
      }
    });
  }
  const packfile = Buffer.from(await collect(response.packfile));
  if (raw.body.error) throw raw.body.error;
  const packfileSha = packfile.slice(-20).toString("hex");
  const res = {
    defaultBranch: response.HEAD,
    fetchHead: response.FETCH_HEAD.oid,
    fetchHeadDescription: response.FETCH_HEAD.description
  };
  if (response.headers) {
    res.headers = response.headers;
  }
  if (prune) {
    res.pruned = response.pruned;
  }
  if (packfileSha !== "" && !emptyPackfile(packfile)) {
    res.packfile = `objects/pack/pack-${packfileSha}.pack`;
    const fullpath = join(gitdir, res.packfile);
    await fs2.write(fullpath, packfile);
    const getExternalRefDelta = (oid2) => _readObject({ fs: fs2, cache, gitdir, oid: oid2 });
    const idx = await GitPackIndex.fromPack({
      pack: packfile,
      getExternalRefDelta,
      onProgress
    });
    await fs2.write(fullpath.replace(/\.pack$/, ".idx"), await idx.toBuffer());
  }
  return res;
}
async function _init({
  fs: fs2,
  bare = false,
  dir,
  gitdir = bare ? dir : join(dir, ".git"),
  defaultBranch = "master"
}) {
  if (await fs2.exists(gitdir + "/config")) return;
  let folders = [
    "hooks",
    "info",
    "objects/info",
    "objects/pack",
    "refs/heads",
    "refs/tags"
  ];
  folders = folders.map((dir2) => gitdir + "/" + dir2);
  for (const folder of folders) {
    await fs2.mkdir(folder);
  }
  await fs2.write(
    gitdir + "/config",
    `[core]
	repositoryformatversion = 0
	filemode = false
	bare = ${bare}
` + (bare ? "" : "	logallrefupdates = true\n") + "	symlinks = false\n	ignorecase = true\n"
  );
  await fs2.write(gitdir + "/HEAD", `ref: refs/heads/${defaultBranch}
`);
}
async function _clone({
  fs: fs2,
  cache,
  http,
  onProgress,
  onMessage,
  onAuth,
  onAuthSuccess,
  onAuthFailure,
  onPostCheckout,
  dir,
  gitdir,
  url,
  corsProxy,
  ref,
  remote,
  depth,
  since,
  exclude,
  relative,
  singleBranch,
  noCheckout,
  noTags,
  headers,
  nonBlocking,
  batchSize = 100
}) {
  try {
    await _init({ fs: fs2, gitdir });
    await _addRemote({ fs: fs2, gitdir, remote, url, force: false });
    if (corsProxy) {
      const config = await GitConfigManager.get({ fs: fs2, gitdir });
      await config.set(`http.corsProxy`, corsProxy);
      await GitConfigManager.save({ fs: fs2, gitdir, config });
    }
    const { defaultBranch, fetchHead } = await _fetch({
      fs: fs2,
      cache,
      http,
      onProgress,
      onMessage,
      onAuth,
      onAuthSuccess,
      onAuthFailure,
      gitdir,
      ref,
      remote,
      corsProxy,
      depth,
      since,
      exclude,
      relative,
      singleBranch,
      headers,
      tags: !noTags
    });
    if (fetchHead === null) return;
    ref = ref || defaultBranch;
    ref = ref.replace("refs/heads/", "");
    await _checkout({
      fs: fs2,
      cache,
      onProgress,
      onPostCheckout,
      dir,
      gitdir,
      ref,
      remote,
      noCheckout,
      nonBlocking,
      batchSize
    });
  } catch (err) {
    await fs2.rmdir(gitdir, { recursive: true, maxRetries: 10 }).catch(() => void 0);
    throw err;
  }
}
async function clone({
  fs: fs2,
  http,
  onProgress,
  onMessage,
  onAuth,
  onAuthSuccess,
  onAuthFailure,
  onPostCheckout,
  dir,
  gitdir = join(dir, ".git"),
  url,
  corsProxy = void 0,
  ref = void 0,
  remote = "origin",
  depth = void 0,
  since = void 0,
  exclude = [],
  relative = false,
  singleBranch = false,
  noCheckout = false,
  noTags = false,
  headers = {},
  cache = {},
  nonBlocking = false,
  batchSize = 100
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("http", http);
    assertParameter("gitdir", gitdir);
    if (!noCheckout) {
      assertParameter("dir", dir);
    }
    assertParameter("url", url);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _clone({
      fs: fsp,
      cache,
      http,
      onProgress,
      onMessage,
      onAuth,
      onAuthSuccess,
      onAuthFailure,
      onPostCheckout,
      dir,
      gitdir: updatedGitdir,
      url,
      corsProxy,
      ref,
      remote,
      depth,
      since,
      exclude,
      relative,
      singleBranch,
      noCheckout,
      noTags,
      headers,
      nonBlocking,
      batchSize
    });
  } catch (err) {
    err.caller = "git.clone";
    throw err;
  }
}
async function commit({
  fs: _fs,
  onSign,
  dir,
  gitdir = join(dir, ".git"),
  message,
  author,
  committer,
  signingKey,
  amend = false,
  dryRun = false,
  noUpdateBranch = false,
  disallowEmpty = false,
  ref,
  parent,
  tree,
  cache = {}
}) {
  try {
    assertParameter("fs", _fs);
    if (!amend) {
      assertParameter("message", message);
    }
    if (signingKey) {
      assertParameter("onSign", onSign);
    }
    const fs2 = new FileSystem(_fs);
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    return await _commit({
      fs: fs2,
      cache,
      onSign,
      gitdir: updatedGitdir,
      message,
      author,
      committer,
      signingKey,
      amend,
      dryRun,
      noUpdateBranch,
      disallowEmpty,
      ref,
      parent,
      tree
    });
  } catch (err) {
    err.caller = "git.commit";
    throw err;
  }
}
async function currentBranch({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  fullname = false,
  test = false
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _currentBranch({
      fs: fsp,
      gitdir: updatedGitdir,
      fullname,
      test
    });
  } catch (err) {
    err.caller = "git.currentBranch";
    throw err;
  }
}
async function _deleteBranch({ fs: fs2, gitdir, ref }) {
  ref = ref.startsWith("refs/heads/") ? ref : `refs/heads/${ref}`;
  const exist = await GitRefManager.exists({ fs: fs2, gitdir, ref });
  if (!exist) {
    throw new NotFoundError(ref);
  }
  const fullRef = await GitRefManager.expand({ fs: fs2, gitdir, ref });
  const currentRef = await _currentBranch({ fs: fs2, gitdir, fullname: true });
  if (fullRef === currentRef) {
    const value = await GitRefManager.resolve({ fs: fs2, gitdir, ref: fullRef });
    await GitRefManager.writeRef({ fs: fs2, gitdir, ref: "HEAD", value });
  }
  await GitRefManager.deleteRef({ fs: fs2, gitdir, ref: fullRef });
  const abbrevRef = abbreviateRef(ref);
  const config = await GitConfigManager.get({ fs: fs2, gitdir });
  await config.deleteSection("branch", abbrevRef);
  await GitConfigManager.save({ fs: fs2, gitdir, config });
}
async function deleteBranch({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  ref
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("ref", ref);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _deleteBranch({
      fs: fsp,
      gitdir: updatedGitdir,
      ref
    });
  } catch (err) {
    err.caller = "git.deleteBranch";
    throw err;
  }
}
async function deleteRef({ fs: fs2, dir, gitdir = join(dir, ".git"), ref }) {
  try {
    assertParameter("fs", fs2);
    assertParameter("ref", ref);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    await GitRefManager.deleteRef({ fs: fsp, gitdir: updatedGitdir, ref });
  } catch (err) {
    err.caller = "git.deleteRef";
    throw err;
  }
}
async function _deleteRemote({ fs: fs2, gitdir, remote }) {
  const config = await GitConfigManager.get({ fs: fs2, gitdir });
  await config.deleteSection("remote", remote);
  await GitConfigManager.save({ fs: fs2, gitdir, config });
}
async function deleteRemote({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  remote
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("remote", remote);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _deleteRemote({
      fs: fsp,
      gitdir: updatedGitdir,
      remote
    });
  } catch (err) {
    err.caller = "git.deleteRemote";
    throw err;
  }
}
async function _deleteTag({ fs: fs2, gitdir, ref }) {
  ref = ref.startsWith("refs/tags/") ? ref : `refs/tags/${ref}`;
  await GitRefManager.deleteRef({ fs: fs2, gitdir, ref });
}
async function deleteTag({ fs: fs2, dir, gitdir = join(dir, ".git"), ref }) {
  try {
    assertParameter("fs", fs2);
    assertParameter("ref", ref);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _deleteTag({
      fs: fsp,
      gitdir: updatedGitdir,
      ref
    });
  } catch (err) {
    err.caller = "git.deleteTag";
    throw err;
  }
}
async function expandOidLoose({ fs: fs2, gitdir, oid: short }) {
  const prefix = short.slice(0, 2);
  const objectsSuffixes = await fs2.readdir(`${gitdir}/objects/${prefix}`);
  return objectsSuffixes.map((suffix) => `${prefix}${suffix}`).filter((_oid) => _oid.startsWith(short));
}
async function expandOidPacked({
  fs: fs2,
  cache,
  gitdir,
  oid: short,
  getExternalRefDelta
}) {
  const results = [];
  let list = await fs2.readdir(join(gitdir, "objects/pack"));
  list = list.filter((x) => x.endsWith(".idx"));
  for (const filename of list) {
    const indexFile = `${gitdir}/objects/pack/${filename}`;
    const p = await readPackIndex({
      fs: fs2,
      cache,
      filename: indexFile,
      getExternalRefDelta
    });
    if (p.error) throw new InternalError(p.error);
    for (const oid of p.offsets.keys()) {
      if (oid.startsWith(short)) results.push(oid);
    }
  }
  return results;
}
async function _expandOid({ fs: fs2, cache, gitdir, oid: short }) {
  const getExternalRefDelta = (oid) => _readObject({ fs: fs2, cache, gitdir, oid });
  const results = await expandOidLoose({ fs: fs2, gitdir, oid: short });
  const packedOids = await expandOidPacked({
    fs: fs2,
    cache,
    gitdir,
    oid: short,
    getExternalRefDelta
  });
  for (const packedOid of packedOids) {
    if (results.indexOf(packedOid) === -1) {
      results.push(packedOid);
    }
  }
  if (results.length === 1) {
    return results[0];
  }
  if (results.length > 1) {
    throw new AmbiguousError("oids", short, results);
  }
  throw new NotFoundError(`an object matching "${short}"`);
}
async function expandOid({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  oid,
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("oid", oid);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _expandOid({
      fs: fsp,
      cache,
      gitdir: updatedGitdir,
      oid
    });
  } catch (err) {
    err.caller = "git.expandOid";
    throw err;
  }
}
async function expandRef({ fs: fs2, dir, gitdir = join(dir, ".git"), ref }) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("ref", ref);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await GitRefManager.expand({
      fs: fsp,
      gitdir: updatedGitdir,
      ref
    });
  } catch (err) {
    err.caller = "git.expandRef";
    throw err;
  }
}
async function _findMergeBase({ fs: fs2, cache, gitdir, oids }) {
  const visits = {};
  const passes = oids.length;
  const common2 = /* @__PURE__ */ new Set();
  const parents = /* @__PURE__ */ new Map();
  const shallows = await GitShallowManager.read({ fs: fs2, gitdir });
  const readParents = async (oid) => {
    if (parents.has(oid)) return parents.get(oid);
    const { object, type } = await _readObject({ fs: fs2, cache, gitdir, oid });
    if (type !== "commit") {
      throw new ObjectTypeError(oid, type, "commit");
    }
    const commit2 = GitCommit.from(object);
    const { parent } = commit2.parseHeaders();
    const result = shallows.has(oid) ? [] : parent;
    parents.set(oid, result);
    return result;
  };
  let heads = oids.map((oid, index3) => ({ index: index3, oid }));
  while (heads.length) {
    for (const { oid, index: index3 } of heads) {
      await readParents(oid);
      if (!visits[oid]) visits[oid] = /* @__PURE__ */ new Set();
      visits[oid].add(index3);
      if (visits[oid].size === passes) {
        common2.add(oid);
      }
    }
    const newheads = /* @__PURE__ */ new Map();
    for (const { oid, index: index3 } of heads) {
      if (common2.has(oid)) continue;
      for (const parent of await readParents(oid)) {
        if (!visits[parent] || !visits[parent].has(index3)) {
          newheads.set(parent + ":" + index3, { oid: parent, index: index3 });
        }
      }
    }
    heads = Array.from(newheads.values());
  }
  if (common2.size < 2) return [...common2];
  const redundant = /* @__PURE__ */ new Set();
  for (const oid of common2) {
    const ancestors = [...await readParents(oid)];
    const seen = /* @__PURE__ */ new Set();
    while (ancestors.length) {
      const ancestor = ancestors.pop();
      if (seen.has(ancestor)) continue;
      seen.add(ancestor);
      if (common2.has(ancestor)) {
        redundant.add(ancestor);
      } else {
        ancestors.push(...await readParents(ancestor));
      }
    }
  }
  return [...common2].filter((oid) => !redundant.has(oid));
}
async function _merge({
  fs: fs2,
  cache,
  dir,
  gitdir,
  ours,
  theirs,
  fastForward: fastForward2 = true,
  fastForwardOnly = false,
  dryRun = false,
  noUpdateBranch = false,
  abortOnConflict = true,
  message,
  author,
  committer,
  signingKey,
  onSign,
  mergeDriver,
  allowUnrelatedHistories = false
}) {
  if (ours === void 0) {
    ours = await _currentBranch({ fs: fs2, gitdir, fullname: true });
  }
  ours = await GitRefManager.expand({
    fs: fs2,
    gitdir,
    ref: ours
  });
  theirs = await GitRefManager.expand({
    fs: fs2,
    gitdir,
    ref: theirs
  });
  const ourOid = await GitRefManager.resolve({
    fs: fs2,
    gitdir,
    ref: ours
  });
  const theirOid = await GitRefManager.resolve({
    fs: fs2,
    gitdir,
    ref: theirs
  });
  const baseOids = await _findMergeBase({
    fs: fs2,
    cache,
    gitdir,
    oids: [ourOid, theirOid]
  });
  if (baseOids.length !== 1) {
    if (baseOids.length === 0 && allowUnrelatedHistories) {
      baseOids.push("4b825dc642cb6eb9a060e54bf8d69288fbee4904");
    } else {
      throw new MergeNotSupportedError();
    }
  }
  const baseOid = baseOids[0];
  if (baseOid === theirOid) {
    return {
      oid: ourOid,
      alreadyMerged: true
    };
  }
  if (fastForward2 && baseOid === ourOid) {
    if (!dryRun && !noUpdateBranch) {
      await GitRefManager.writeRef({ fs: fs2, gitdir, ref: ours, value: theirOid });
    }
    return {
      oid: theirOid,
      fastForward: true
    };
  } else {
    if (fastForwardOnly) {
      throw new FastForwardError();
    }
    const tree = await GitIndexManager.acquire(
      { fs: fs2, gitdir, cache, allowUnmerged: false },
      async (index3) => {
        return mergeTree({
          fs: fs2,
          cache,
          dir,
          gitdir,
          index: index3,
          ourOid,
          theirOid,
          baseOid,
          ourName: abbreviateRef(ours),
          baseName: "base",
          theirName: abbreviateRef(theirs),
          dryRun,
          abortOnConflict,
          mergeDriver
        });
      }
    );
    if (tree instanceof MergeConflictError) throw tree;
    if (!message) {
      message = `Merge branch '${abbreviateRef(theirs)}' into ${abbreviateRef(
        ours
      )}`;
    }
    const oid = await _commit({
      fs: fs2,
      cache,
      gitdir,
      message,
      ref: ours,
      tree,
      parent: [ourOid, theirOid],
      author,
      committer,
      signingKey,
      onSign,
      dryRun,
      noUpdateBranch
    });
    return {
      oid,
      tree,
      mergeCommit: true
    };
  }
}
async function _pull({
  fs: fs2,
  cache,
  http,
  onProgress,
  onMessage,
  onAuth,
  onAuthSuccess,
  onAuthFailure,
  dir,
  gitdir,
  ref,
  url,
  remote,
  remoteRef,
  prune,
  pruneTags,
  fastForward: fastForward2,
  fastForwardOnly,
  corsProxy,
  singleBranch,
  headers,
  author,
  committer,
  signingKey
}) {
  try {
    if (!ref) {
      const head = await _currentBranch({ fs: fs2, gitdir });
      if (!head) {
        throw new MissingParameterError("ref");
      }
      ref = head;
    }
    const { fetchHead, fetchHeadDescription } = await _fetch({
      fs: fs2,
      cache,
      http,
      onProgress,
      onMessage,
      onAuth,
      onAuthSuccess,
      onAuthFailure,
      gitdir,
      corsProxy,
      ref,
      url,
      remote,
      remoteRef,
      singleBranch,
      headers,
      prune,
      pruneTags
    });
    await _merge({
      fs: fs2,
      cache,
      gitdir,
      ours: ref,
      theirs: fetchHead,
      fastForward: fastForward2,
      fastForwardOnly,
      message: `Merge ${fetchHeadDescription}`,
      author,
      committer,
      signingKey,
      dryRun: false,
      noUpdateBranch: false
    });
    await _checkout({
      fs: fs2,
      cache,
      onProgress,
      dir,
      gitdir,
      ref,
      remote,
      noCheckout: false
    });
  } catch (err) {
    err.caller = "git.pull";
    throw err;
  }
}
async function fastForward({
  fs: fs2,
  http,
  onProgress,
  onMessage,
  onAuth,
  onAuthSuccess,
  onAuthFailure,
  dir,
  gitdir = join(dir, ".git"),
  ref,
  url,
  remote,
  remoteRef,
  corsProxy,
  singleBranch,
  headers = {},
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("http", http);
    assertParameter("gitdir", gitdir);
    const thisWillNotBeUsed = {
      name: "",
      email: "",
      timestamp: Date.now(),
      timezoneOffset: 0
    };
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _pull({
      fs: fsp,
      cache,
      http,
      onProgress,
      onMessage,
      onAuth,
      onAuthSuccess,
      onAuthFailure,
      dir,
      gitdir: updatedGitdir,
      ref,
      url,
      remote,
      remoteRef,
      fastForwardOnly: true,
      corsProxy,
      singleBranch,
      headers,
      author: thisWillNotBeUsed,
      committer: thisWillNotBeUsed
    });
  } catch (err) {
    err.caller = "git.fastForward";
    throw err;
  }
}
async function fetch2({
  fs: fs2,
  http,
  onProgress,
  onMessage,
  onAuth,
  onAuthSuccess,
  onAuthFailure,
  dir,
  gitdir = join(dir, ".git"),
  ref,
  remote,
  remoteRef,
  url,
  corsProxy,
  depth = null,
  since = null,
  exclude = [],
  relative = false,
  tags = false,
  singleBranch = false,
  headers = {},
  prune = false,
  pruneTags = false,
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("http", http);
    assertParameter("gitdir", gitdir);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _fetch({
      fs: fsp,
      cache,
      http,
      onProgress,
      onMessage,
      onAuth,
      onAuthSuccess,
      onAuthFailure,
      gitdir: updatedGitdir,
      ref,
      remote,
      remoteRef,
      url,
      corsProxy,
      depth,
      since,
      exclude,
      relative,
      tags,
      singleBranch,
      headers,
      prune,
      pruneTags
    });
  } catch (err) {
    err.caller = "git.fetch";
    throw err;
  }
}
async function findMergeBase({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  oids,
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("oids", oids);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _findMergeBase({
      fs: fsp,
      cache,
      gitdir: updatedGitdir,
      oids
    });
  } catch (err) {
    err.caller = "git.findMergeBase";
    throw err;
  }
}
async function _findRoot({ fs: fs2, filepath }) {
  if (await fs2.exists(join(filepath, ".git"))) {
    return filepath;
  } else {
    const parent = dirname(filepath);
    if (parent === filepath) {
      throw new NotFoundError(`git root for ${filepath}`);
    }
    return _findRoot({ fs: fs2, filepath: parent });
  }
}
async function findRoot({ fs: fs2, filepath }) {
  try {
    assertParameter("fs", fs2);
    assertParameter("filepath", filepath);
    return await _findRoot({ fs: new FileSystem(fs2), filepath });
  } catch (err) {
    err.caller = "git.findRoot";
    throw err;
  }
}
async function getConfig2({ fs: fs2, dir, gitdir = join(dir, ".git"), path }) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("path", path);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _getConfig({
      fs: fsp,
      gitdir: updatedGitdir,
      path
    });
  } catch (err) {
    err.caller = "git.getConfig";
    throw err;
  }
}
async function _getConfigAll({ fs: fs2, gitdir, path }) {
  const config = await GitConfigManager.get({ fs: fs2, gitdir });
  return config.getall(path);
}
async function getConfigAll({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  path
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("path", path);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _getConfigAll({
      fs: fsp,
      gitdir: updatedGitdir,
      path
    });
  } catch (err) {
    err.caller = "git.getConfigAll";
    throw err;
  }
}
async function getRemoteInfo({
  http,
  onAuth,
  onAuthSuccess,
  onAuthFailure,
  corsProxy,
  url,
  headers = {},
  forPush = false
}) {
  try {
    assertParameter("http", http);
    assertParameter("url", url);
    const GitRemoteHTTP2 = GitRemoteManager.getRemoteHelperFor({ url });
    const remote = await GitRemoteHTTP2.discover({
      http,
      onAuth,
      onAuthSuccess,
      onAuthFailure,
      corsProxy,
      service: forPush ? "git-receive-pack" : "git-upload-pack",
      url,
      headers,
      protocolVersion: 1
    });
    const result = {
      capabilities: [...remote.capabilities]
    };
    for (const [ref, oid] of remote.refs) {
      const parts = ref.split("/");
      const last = parts.pop();
      let o = result;
      for (const part of parts) {
        o[part] = o[part] || {};
        o = o[part];
      }
      o[last] = oid;
    }
    for (const [symref, ref] of remote.symrefs) {
      const parts = symref.split("/");
      const last = parts.pop();
      let o = result;
      for (const part of parts) {
        o[part] = o[part] || {};
        o = o[part];
      }
      o[last] = ref;
    }
    return result;
  } catch (err) {
    err.caller = "git.getRemoteInfo";
    throw err;
  }
}
function formatInfoRefs(remote, prefix, symrefs, peelTags) {
  const refs = [];
  for (const [key, value] of remote.refs) {
    if (prefix && !key.startsWith(prefix)) continue;
    if (key.endsWith("^{}")) {
      if (peelTags) {
        const _key = key.replace("^{}", "");
        const last = refs[refs.length - 1];
        const r = last?.ref === _key ? last : refs.find((x) => x.ref === _key);
        if (r !== void 0) {
          r.peeled = value;
        }
      }
      continue;
    }
    const ref = { ref: key, oid: value };
    if (symrefs) {
      if (remote.symrefs.has(key)) {
        ref.target = remote.symrefs.get(key);
      }
    }
    refs.push(ref);
  }
  return refs;
}
async function getRemoteInfo2({
  http,
  onAuth,
  onAuthSuccess,
  onAuthFailure,
  corsProxy,
  url,
  headers = {},
  forPush = false,
  protocolVersion = 2
}) {
  try {
    assertParameter("http", http);
    assertParameter("url", url);
    const GitRemoteHTTP2 = GitRemoteManager.getRemoteHelperFor({ url });
    const remote = await GitRemoteHTTP2.discover({
      http,
      onAuth,
      onAuthSuccess,
      onAuthFailure,
      corsProxy,
      service: forPush ? "git-receive-pack" : "git-upload-pack",
      url,
      headers,
      protocolVersion
    });
    if (remote.protocolVersion === 2) {
      return {
        protocolVersion: remote.protocolVersion,
        capabilities: remote.capabilities2
      };
    }
    const capabilities = {};
    for (const cap of remote.capabilities) {
      const [key, value] = cap.split("=");
      if (value) {
        capabilities[key] = value;
      } else {
        capabilities[key] = true;
      }
    }
    return {
      protocolVersion: 1,
      capabilities,
      refs: formatInfoRefs(remote, void 0, true, true)
    };
  } catch (err) {
    err.caller = "git.getRemoteInfo2";
    throw err;
  }
}
async function hashObject({
  type,
  object,
  format = "content",
  oid = void 0
}) {
  if (format !== "deflated") {
    if (format !== "wrapped") {
      object = GitObject.wrap({ type, object });
    }
    oid = await shasum(object);
  }
  return { oid, object };
}
async function hashBlob({ object }) {
  try {
    assertParameter("object", object);
    if (typeof object === "string") {
      object = Buffer.from(object, "utf8");
    } else if (!(object instanceof Uint8Array)) {
      object = new Uint8Array(object);
    }
    const type = "blob";
    const { oid, object: _object } = await hashObject({
      type,
      format: "content",
      object
    });
    return { oid, type, object: _object, format: "wrapped" };
  } catch (err) {
    err.caller = "git.hashBlob";
    throw err;
  }
}
async function _indexPack({
  fs: fs2,
  cache,
  onProgress,
  dir,
  gitdir,
  filepath
}) {
  try {
    filepath = join(dir, filepath);
    const pack = await fs2.read(filepath);
    const getExternalRefDelta = (oid) => _readObject({ fs: fs2, cache, gitdir, oid });
    const idx = await GitPackIndex.fromPack({
      pack,
      getExternalRefDelta,
      onProgress
    });
    await fs2.write(filepath.replace(/\.pack$/, ".idx"), await idx.toBuffer());
    return {
      oids: [...idx.hashes]
    };
  } catch (err) {
    err.caller = "git.indexPack";
    throw err;
  }
}
async function indexPack({
  fs: fs2,
  onProgress,
  dir,
  gitdir = join(dir, ".git"),
  filepath,
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("dir", dir);
    assertParameter("gitdir", dir);
    assertParameter("filepath", filepath);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _indexPack({
      fs: fsp,
      cache,
      onProgress,
      dir,
      gitdir: updatedGitdir,
      filepath
    });
  } catch (err) {
    err.caller = "git.indexPack";
    throw err;
  }
}
async function init({
  fs: fs2,
  bare = false,
  dir,
  gitdir = bare ? dir : join(dir, ".git"),
  defaultBranch = "master"
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    if (!bare) {
      assertParameter("dir", dir);
    }
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _init({
      fs: fsp,
      bare,
      dir,
      gitdir: updatedGitdir,
      defaultBranch
    });
  } catch (err) {
    err.caller = "git.init";
    throw err;
  }
}
async function _isDescendent({
  fs: fs2,
  cache,
  gitdir,
  oid,
  ancestor,
  depth
}) {
  const shallows = await GitShallowManager.read({ fs: fs2, gitdir });
  if (!oid) {
    throw new MissingParameterError("oid");
  }
  if (!ancestor) {
    throw new MissingParameterError("ancestor");
  }
  if (oid === ancestor) return false;
  const queue = [oid];
  const visited = /* @__PURE__ */ new Set();
  let searchdepth = 0;
  while (queue.length) {
    if (searchdepth++ === depth) {
      throw new MaxDepthError(depth);
    }
    const oid2 = queue.shift();
    const { type, object } = await _readObject({
      fs: fs2,
      cache,
      gitdir,
      oid: oid2
    });
    if (type !== "commit") {
      throw new ObjectTypeError(oid2, type, "commit");
    }
    const commit2 = GitCommit.from(object).parse();
    for (const parent of commit2.parent) {
      if (parent === ancestor) return true;
    }
    if (!shallows.has(oid2)) {
      for (const parent of commit2.parent) {
        if (!visited.has(parent)) {
          queue.push(parent);
          visited.add(parent);
        }
      }
    }
  }
  return false;
}
async function isDescendent({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  oid,
  ancestor,
  depth = -1,
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("oid", oid);
    assertParameter("ancestor", ancestor);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _isDescendent({
      fs: fsp,
      cache,
      gitdir: updatedGitdir,
      oid,
      ancestor,
      depth
    });
  } catch (err) {
    err.caller = "git.isDescendent";
    throw err;
  }
}
async function isIgnored({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  filepath
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("dir", dir);
    assertParameter("gitdir", gitdir);
    assertParameter("filepath", filepath);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return GitIgnoreManager.isIgnored({
      fs: fsp,
      dir,
      gitdir: updatedGitdir,
      filepath
    });
  } catch (err) {
    err.caller = "git.isIgnored";
    throw err;
  }
}
async function listBranches({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  remote
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return GitRefManager.listBranches({
      fs: fsp,
      gitdir: updatedGitdir,
      remote
    });
  } catch (err) {
    err.caller = "git.listBranches";
    throw err;
  }
}
async function _listFiles({ fs: fs2, gitdir, ref, cache }) {
  if (ref) {
    const oid = await GitRefManager.resolve({ gitdir, fs: fs2, ref });
    const filenames = [];
    await accumulateFilesFromOid({
      fs: fs2,
      cache,
      gitdir,
      oid,
      filenames,
      prefix: ""
    });
    return filenames;
  } else {
    return GitIndexManager.acquire(
      { fs: fs2, gitdir, cache },
      async function(index3) {
        return index3.entries.map((x) => x.path);
      }
    );
  }
}
async function accumulateFilesFromOid({
  fs: fs2,
  cache,
  gitdir,
  oid,
  filenames,
  prefix
}) {
  const { tree } = await _readTree({ fs: fs2, cache, gitdir, oid });
  for (const entry of tree) {
    if (entry.type === "tree") {
      await accumulateFilesFromOid({
        fs: fs2,
        cache,
        gitdir,
        oid: entry.oid,
        filenames,
        prefix: join(prefix, entry.path)
      });
    } else {
      filenames.push(join(prefix, entry.path));
    }
  }
}
async function listFiles({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  ref,
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _listFiles({
      fs: fsp,
      cache,
      gitdir: updatedGitdir,
      ref
    });
  } catch (err) {
    err.caller = "git.listFiles";
    throw err;
  }
}
async function _listNotes({ fs: fs2, cache, gitdir, ref }) {
  let parent;
  try {
    parent = await GitRefManager.resolve({ gitdir, fs: fs2, ref });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return [];
    }
  }
  const result = await _readTree({
    fs: fs2,
    cache,
    gitdir,
    oid: parent
  });
  const notes = result.tree.map((entry) => ({
    target: entry.path,
    note: entry.oid
  }));
  return notes;
}
async function listNotes({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  ref = "refs/notes/commits",
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("ref", ref);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _listNotes({
      fs: fsp,
      cache,
      gitdir: updatedGitdir,
      ref
    });
  } catch (err) {
    err.caller = "git.listNotes";
    throw err;
  }
}
async function listRefs({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  filepath
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return GitRefManager.listRefs({ fs: fsp, gitdir: updatedGitdir, filepath });
  } catch (err) {
    err.caller = "git.listRefs";
    throw err;
  }
}
async function _listRemotes({ fs: fs2, gitdir }) {
  const config = await GitConfigManager.get({ fs: fs2, gitdir });
  const remoteNames = await config.getSubsections("remote");
  const remotes = Promise.all(
    remoteNames.map(async (remote) => {
      const url = await config.get(`remote.${remote}.url`);
      return { remote, url };
    })
  );
  return remotes;
}
async function listRemotes({ fs: fs2, dir, gitdir = join(dir, ".git") }) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _listRemotes({
      fs: fsp,
      gitdir: updatedGitdir
    });
  } catch (err) {
    err.caller = "git.listRemotes";
    throw err;
  }
}
async function parseListRefsResponse(stream) {
  const read = GitPktLine.streamReader(stream);
  const refs = [];
  let line;
  while (true) {
    line = await read();
    if (line === true) break;
    if (line === null) continue;
    line = line.toString("utf8").replace(/\n$/, "");
    const [oid, ref, ...attrs] = line.split(" ");
    const r = { ref, oid };
    for (const attr of attrs) {
      const [name, value] = attr.split(":");
      if (name === "symref-target") {
        r.target = value;
      } else if (name === "peeled") {
        r.peeled = value;
      }
    }
    refs.push(r);
  }
  return refs;
}
async function writeListRefsRequest({ prefix, symrefs, peelTags }) {
  const packstream = [];
  packstream.push(GitPktLine.encode("command=ls-refs\n"));
  packstream.push(GitPktLine.encode(`agent=${pkg.agent}
`));
  if (peelTags || symrefs || prefix) {
    packstream.push(GitPktLine.delim());
  }
  if (peelTags) packstream.push(GitPktLine.encode("peel"));
  if (symrefs) packstream.push(GitPktLine.encode("symrefs"));
  if (prefix) packstream.push(GitPktLine.encode(`ref-prefix ${prefix}`));
  packstream.push(GitPktLine.flush());
  return packstream;
}
async function listServerRefs({
  http,
  onAuth,
  onAuthSuccess,
  onAuthFailure,
  corsProxy,
  url,
  headers = {},
  forPush = false,
  protocolVersion = 2,
  prefix,
  symrefs,
  peelTags
}) {
  try {
    assertParameter("http", http);
    assertParameter("url", url);
    const remote = await GitRemoteHTTP.discover({
      http,
      onAuth,
      onAuthSuccess,
      onAuthFailure,
      corsProxy,
      service: forPush ? "git-receive-pack" : "git-upload-pack",
      url,
      headers,
      protocolVersion
    });
    if (remote.protocolVersion === 1) {
      return formatInfoRefs(remote, prefix, symrefs, peelTags);
    }
    const body = await writeListRefsRequest({ prefix, symrefs, peelTags });
    const res = await GitRemoteHTTP.connect({
      http,
      auth: remote.auth,
      headers,
      corsProxy,
      service: forPush ? "git-receive-pack" : "git-upload-pack",
      url,
      body
    });
    return parseListRefsResponse(res.body);
  } catch (err) {
    err.caller = "git.listServerRefs";
    throw err;
  }
}
async function listTags({ fs: fs2, dir, gitdir = join(dir, ".git") }) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return GitRefManager.listTags({ fs: fsp, gitdir: updatedGitdir });
  } catch (err) {
    err.caller = "git.listTags";
    throw err;
  }
}
function compareAge(a, b) {
  return a.committer.timestamp - b.committer.timestamp;
}
var EMPTY_OID = "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391";
async function resolveFileIdInTree({ fs: fs2, cache, gitdir, oid, fileId }) {
  if (fileId === EMPTY_OID) return;
  const _oid = oid;
  let filepath;
  const result = await resolveTree({ fs: fs2, cache, gitdir, oid });
  const tree = result.tree;
  if (fileId === result.oid) {
    filepath = result.path;
  } else {
    filepath = await _resolveFileId({
      fs: fs2,
      cache,
      gitdir,
      tree,
      fileId,
      oid: _oid
    });
    if (Array.isArray(filepath)) {
      if (filepath.length === 0) filepath = void 0;
      else if (filepath.length === 1) filepath = filepath[0];
    }
  }
  return filepath;
}
async function _resolveFileId({
  fs: fs2,
  cache,
  gitdir,
  tree,
  fileId,
  oid,
  filepaths = [],
  parentPath = ""
}) {
  const walks = tree.entries().map(function(entry) {
    let result;
    if (entry.oid === fileId) {
      result = join(parentPath, entry.path);
      filepaths.push(result);
    } else if (entry.type === "tree") {
      result = _readObject({
        fs: fs2,
        cache,
        gitdir,
        oid: entry.oid
      }).then(function({ object }) {
        return _resolveFileId({
          fs: fs2,
          cache,
          gitdir,
          tree: GitTree.from(object),
          fileId,
          oid,
          filepaths,
          parentPath: join(parentPath, entry.path)
        });
      });
    }
    return result;
  });
  await Promise.all(walks);
  return filepaths;
}
async function _log({
  fs: fs2,
  cache,
  gitdir,
  filepath,
  ref,
  depth,
  since,
  force,
  follow,
  includeChanges
}) {
  const sinceTimestamp = typeof since === "undefined" ? void 0 : Math.floor(since.valueOf() / 1e3);
  const commits = [];
  const shallowCommits = await GitShallowManager.read({ fs: fs2, gitdir });
  const oid = await GitRefManager.resolve({ fs: fs2, gitdir, ref });
  const tips = [await _readCommit({ fs: fs2, cache, gitdir, oid })];
  let lastFileOid;
  let lastFileMode;
  let lastCommit;
  let isOk;
  function endCommit(commit2) {
    if (isOk && filepath) commits.push(commit2);
  }
  while (tips.length > 0) {
    const commit2 = tips.pop();
    if (sinceTimestamp !== void 0 && commit2.commit.committer.timestamp <= sinceTimestamp) {
      break;
    }
    if (filepath) {
      let vFileEntry;
      try {
        vFileEntry = await resolveFilepathEntry({
          fs: fs2,
          cache,
          gitdir,
          oid: commit2.commit.tree,
          filepath
        });
        if (lastCommit && (lastFileOid !== vFileEntry.oid || lastFileMode !== vFileEntry.mode)) {
          commits.push(lastCommit);
        }
        lastFileOid = vFileEntry.oid;
        lastFileMode = vFileEntry.mode;
        lastCommit = commit2;
        isOk = true;
      } catch (e) {
        if (e instanceof NotFoundError) {
          let found = follow && lastFileOid;
          if (found) {
            found = await resolveFileIdInTree({
              fs: fs2,
              cache,
              gitdir,
              oid: commit2.commit.tree,
              fileId: lastFileOid
            });
            if (found) {
              if (Array.isArray(found)) {
                if (lastCommit) {
                  const lastFound = await resolveFileIdInTree({
                    fs: fs2,
                    cache,
                    gitdir,
                    oid: lastCommit.commit.tree,
                    fileId: lastFileOid
                  });
                  if (Array.isArray(lastFound)) {
                    found = found.filter((p) => lastFound.indexOf(p) === -1);
                    if (found.length === 1) {
                      found = found[0];
                      filepath = found;
                      if (lastCommit) commits.push(lastCommit);
                    } else {
                      found = false;
                      if (lastCommit) commits.push(lastCommit);
                      break;
                    }
                  }
                }
              } else {
                filepath = found;
                if (lastCommit) commits.push(lastCommit);
              }
            }
          }
          if (!found) {
            if (isOk && lastFileOid) {
              commits.push(lastCommit);
              if (!force) break;
            }
            if (!force && !follow) throw e;
          }
          lastCommit = commit2;
          isOk = false;
        } else throw e;
      }
    } else {
      commits.push(commit2);
    }
    if (depth !== void 0 && commits.length === depth) {
      endCommit(commit2);
      break;
    }
    if (!shallowCommits.has(commit2.oid)) {
      for (const oid2 of commit2.commit.parent) {
        const commit3 = await _readCommit({ fs: fs2, cache, gitdir, oid: oid2 });
        if (!tips.map((commit4) => commit4.oid).includes(commit3.oid)) {
          tips.push(commit3);
        }
      }
    }
    if (tips.length === 0) {
      endCommit(commit2);
    }
    tips.sort((a, b) => compareAge(a.commit, b.commit));
  }
  if (includeChanges) {
    for (const commit2 of commits) {
      commit2.commit.changes = await getChanges({
        fs: fs2,
        cache,
        gitdir,
        commit: commit2,
        shallow: shallowCommits.has(commit2.oid)
      });
    }
  }
  return commits;
}
async function getChanges({ fs: fs2, cache, gitdir, commit: commit2, shallow }) {
  const parent = shallow || !commit2.commit.parent[0] ? "4b825dc642cb6eb9a060e54bf8d69288fbee4904" : commit2.commit.parent[0];
  return _walk({
    fs: fs2,
    cache,
    gitdir,
    trees: [TREE({ ref: commit2.oid }), TREE({ ref: parent })],
    map: async (filepath, [current, previous]) => {
      const [currentType, previousType] = await Promise.all([
        current && current.type(),
        previous && previous.type()
      ]);
      if (currentType === "tree") {
        if (previousType && previousType !== "tree") {
          return [null, await previous.oid(), filepath];
        }
        return;
      }
      if (previousType === "tree") {
        if (currentType) {
          return [await current.oid(), null, filepath];
        }
        return;
      }
      const [newOid, oldOid] = await Promise.all([
        current ? current.oid() : null,
        previous ? previous.oid() : null
      ]);
      if (newOid === oldOid) return;
      return [newOid, oldOid, filepath];
    }
  });
}
async function log({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  filepath,
  ref = "HEAD",
  depth,
  since,
  // Date
  force,
  follow,
  includeChanges = false,
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("ref", ref);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _log({
      fs: fsp,
      cache,
      gitdir: updatedGitdir,
      filepath,
      ref,
      depth,
      since,
      force,
      follow,
      includeChanges
    });
  } catch (err) {
    err.caller = "git.log";
    throw err;
  }
}
async function merge({
  fs: _fs,
  onSign,
  dir,
  gitdir = join(dir, ".git"),
  ours,
  theirs,
  fastForward: fastForward2 = true,
  fastForwardOnly = false,
  dryRun = false,
  noUpdateBranch = false,
  abortOnConflict = true,
  message,
  author: _author,
  committer: _committer,
  signingKey,
  cache = {},
  mergeDriver,
  allowUnrelatedHistories = false
}) {
  try {
    assertParameter("fs", _fs);
    if (signingKey) {
      assertParameter("onSign", onSign);
    }
    const fs2 = new FileSystem(_fs);
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    const author = await normalizeAuthorObject({
      fs: fs2,
      gitdir: updatedGitdir,
      author: _author
    });
    if (!author && (!fastForwardOnly || !fastForward2)) {
      throw new MissingNameError("author");
    }
    const committer = await normalizeCommitterObject({
      fs: fs2,
      gitdir: updatedGitdir,
      author,
      committer: _committer
    });
    if (!committer && (!fastForwardOnly || !fastForward2)) {
      throw new MissingNameError("committer");
    }
    return await _merge({
      fs: fs2,
      cache,
      dir,
      gitdir: updatedGitdir,
      ours,
      theirs,
      fastForward: fastForward2,
      fastForwardOnly,
      dryRun,
      noUpdateBranch,
      abortOnConflict,
      message,
      author,
      committer,
      signingKey,
      onSign,
      mergeDriver,
      allowUnrelatedHistories
    });
  } catch (err) {
    err.caller = "git.merge";
    throw err;
  }
}
var types = {
  commit: 16,
  tree: 32,
  blob: 48,
  tag: 64,
  ofs_delta: 96,
  ref_delta: 112
};
async function _pack({
  fs: fs2,
  cache,
  dir,
  gitdir = join(dir, ".git"),
  oids
}) {
  const hash = new import_sha1.default();
  const outputStream = [];
  function write(chunk, enc) {
    const buff = Buffer.from(chunk, enc);
    outputStream.push(buff);
    hash.update(buff);
  }
  async function writeObject2({ stype, object }) {
    const type = types[stype];
    let length = object.length;
    let multibyte = length > 15 ? 128 : 0;
    const lastFour = length & 15;
    length = length >>> 4;
    let byte = (multibyte | type | lastFour).toString(16);
    write(byte, "hex");
    while (multibyte) {
      multibyte = length > 127 ? 128 : 0;
      byte = multibyte | length & 127;
      write(padHex(2, byte), "hex");
      length = length >>> 7;
    }
    write(Buffer.from(await deflate(object)));
  }
  write("PACK");
  write("00000002", "hex");
  write(padHex(8, oids.length), "hex");
  for (const oid of oids) {
    const { type, object } = await _readObject({ fs: fs2, cache, gitdir, oid });
    await writeObject2({ write, object, stype: type });
  }
  const digest = hash.digest();
  outputStream.push(digest);
  return outputStream;
}
async function _packObjects({ fs: fs2, cache, gitdir, oids, write }) {
  const buffers = await _pack({ fs: fs2, cache, gitdir, oids });
  const packfile = Buffer.from(await collect(buffers));
  const packfileSha = packfile.slice(-20).toString("hex");
  const filename = `pack-${packfileSha}.pack`;
  if (write) {
    await fs2.write(join(gitdir, `objects/pack/${filename}`), packfile);
    return { filename };
  }
  return {
    filename,
    packfile: new Uint8Array(packfile)
  };
}
async function packObjects({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  oids,
  write = false,
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("oids", oids);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _packObjects({
      fs: fsp,
      cache,
      gitdir: updatedGitdir,
      oids,
      write
    });
  } catch (err) {
    err.caller = "git.packObjects";
    throw err;
  }
}
async function pull({
  fs: _fs,
  http,
  onProgress,
  onMessage,
  onAuth,
  onAuthSuccess,
  onAuthFailure,
  dir,
  gitdir = join(dir, ".git"),
  ref,
  url,
  remote,
  remoteRef,
  prune = false,
  pruneTags = false,
  fastForward: fastForward2 = true,
  fastForwardOnly = false,
  corsProxy,
  singleBranch,
  headers = {},
  author: _author,
  committer: _committer,
  signingKey,
  cache = {}
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("gitdir", gitdir);
    const fs2 = new FileSystem(_fs);
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    const author = await normalizeAuthorObject({
      fs: fs2,
      gitdir: updatedGitdir,
      author: _author
    });
    if (!author) throw new MissingNameError("author");
    const committer = await normalizeCommitterObject({
      fs: fs2,
      gitdir: updatedGitdir,
      author,
      committer: _committer
    });
    if (!committer) throw new MissingNameError("committer");
    return await _pull({
      fs: fs2,
      cache,
      http,
      onProgress,
      onMessage,
      onAuth,
      onAuthSuccess,
      onAuthFailure,
      dir,
      gitdir: updatedGitdir,
      ref,
      url,
      remote,
      remoteRef,
      fastForward: fastForward2,
      fastForwardOnly,
      corsProxy,
      singleBranch,
      headers,
      author,
      committer,
      signingKey,
      prune,
      pruneTags
    });
  } catch (err) {
    err.caller = "git.pull";
    throw err;
  }
}
async function listCommitsAndTags({
  fs: fs2,
  cache,
  dir,
  gitdir = join(dir, ".git"),
  start,
  finish
}) {
  const shallows = await GitShallowManager.read({ fs: fs2, gitdir });
  const startingSet = /* @__PURE__ */ new Set();
  const finishingSet = /* @__PURE__ */ new Set();
  for (const ref of start) {
    startingSet.add(await GitRefManager.resolve({ fs: fs2, gitdir, ref }));
  }
  for (const ref of finish) {
    try {
      const oid = await GitRefManager.resolve({ fs: fs2, gitdir, ref });
      finishingSet.add(oid);
    } catch (err) {
    }
  }
  const visited = /* @__PURE__ */ new Set();
  async function walk2(oid) {
    visited.add(oid);
    const { type, object } = await _readObject({ fs: fs2, cache, gitdir, oid });
    if (type === "tag") {
      const tag2 = GitAnnotatedTag.from(object);
      const commit2 = tag2.headers().object;
      return walk2(commit2);
    }
    if (type !== "commit") {
      throw new ObjectTypeError(oid, type, "commit");
    }
    if (!shallows.has(oid)) {
      const commit2 = GitCommit.from(object);
      const parents = commit2.headers().parent;
      for (oid of parents) {
        if (!finishingSet.has(oid) && !visited.has(oid)) {
          await walk2(oid);
        }
      }
    }
  }
  for (const oid of startingSet) {
    await walk2(oid);
  }
  return visited;
}
async function listObjects({
  fs: fs2,
  cache,
  dir,
  gitdir = join(dir, ".git"),
  oids
}) {
  const visited = /* @__PURE__ */ new Set();
  async function walk2(oid) {
    if (visited.has(oid)) return;
    visited.add(oid);
    const { type, object } = await _readObject({ fs: fs2, cache, gitdir, oid });
    if (type === "tag") {
      const tag2 = GitAnnotatedTag.from(object);
      const obj = tag2.headers().object;
      await walk2(obj);
    } else if (type === "commit") {
      const commit2 = GitCommit.from(object);
      const tree = commit2.headers().tree;
      await walk2(tree);
    } else if (type === "tree") {
      const tree = GitTree.from(object);
      for (const entry of tree) {
        if (entry.type === "blob") {
          visited.add(entry.oid);
        }
        if (entry.type === "tree") {
          await walk2(entry.oid);
        }
      }
    }
  }
  for (const oid of oids) {
    await walk2(oid);
  }
  return visited;
}
async function parseReceivePackResponse(packfile) {
  const result = {};
  let response = "";
  const read = GitPktLine.streamReader(packfile);
  let line = await read();
  while (line !== true) {
    if (line !== null) response += line.toString("utf8") + "\n";
    line = await read();
  }
  const lines = response.toString("utf8").split("\n");
  line = lines.shift();
  if (!line.startsWith("unpack ")) {
    throw new ParseError('unpack ok" or "unpack [error message]', line);
  }
  result.ok = line === "unpack ok";
  if (!result.ok) {
    result.error = line.slice("unpack ".length);
  }
  result.refs = {};
  for (const line2 of lines) {
    if (line2.trim() === "") continue;
    const status2 = line2.slice(0, 2);
    const refAndMessage = line2.slice(3);
    let space = refAndMessage.indexOf(" ");
    if (space === -1) space = refAndMessage.length;
    const ref = refAndMessage.slice(0, space);
    const error = refAndMessage.slice(space + 1);
    result.refs[ref] = {
      ok: status2 === "ok",
      error
    };
  }
  return result;
}
async function writeReceivePackRequest({
  capabilities = [],
  triplets = []
}) {
  const packstream = [];
  let capsFirstLine = `\0 ${capabilities.join(" ")}`;
  for (const trip of triplets) {
    packstream.push(
      GitPktLine.encode(
        `${trip.oldoid} ${trip.oid} ${trip.fullRef}${capsFirstLine}
`
      )
    );
    capsFirstLine = "";
  }
  packstream.push(GitPktLine.flush());
  return packstream;
}
async function _push({
  fs: fs2,
  cache,
  http,
  onProgress,
  onMessage,
  onAuth,
  onAuthSuccess,
  onAuthFailure,
  onPrePush,
  gitdir,
  ref: _ref,
  remoteRef: _remoteRef,
  remote,
  url: _url,
  force = false,
  delete: _delete = false,
  corsProxy,
  headers = {}
}) {
  const ref = _ref || await _currentBranch({ fs: fs2, gitdir });
  if (typeof ref === "undefined") {
    throw new MissingParameterError("ref");
  }
  const config = await GitConfigManager.get({ fs: fs2, gitdir });
  remote = remote || await config.get(`branch.${ref}.pushRemote`) || await config.get("remote.pushDefault") || await config.get(`branch.${ref}.remote`) || "origin";
  const url = _url || await config.get(`remote.${remote}.pushurl`) || await config.get(`remote.${remote}.url`);
  if (typeof url === "undefined") {
    throw new MissingParameterError("remote OR url");
  }
  const remoteRef = _remoteRef || await config.get(`branch.${ref}.merge`);
  if (typeof url === "undefined") {
    throw new MissingParameterError("remoteRef");
  }
  if (corsProxy === void 0) {
    corsProxy = await config.get("http.corsProxy");
  }
  const fullRef = await GitRefManager.expand({ fs: fs2, gitdir, ref });
  const oid = _delete ? "0000000000000000000000000000000000000000" : await GitRefManager.resolve({ fs: fs2, gitdir, ref: fullRef });
  const GitRemoteHTTP2 = GitRemoteManager.getRemoteHelperFor({ url });
  const httpRemote = await GitRemoteHTTP2.discover({
    http,
    onAuth: addCredentialUsername({ config, onAuth }),
    onAuthSuccess,
    onAuthFailure: addCredentialUsername({ config, onAuth: onAuthFailure }),
    corsProxy,
    service: "git-receive-pack",
    url,
    headers,
    protocolVersion: 1
  });
  const auth = httpRemote.auth;
  let fullRemoteRef;
  if (!remoteRef) {
    fullRemoteRef = fullRef;
  } else {
    try {
      fullRemoteRef = await GitRefManager.expandAgainstMap({
        ref: remoteRef,
        map: httpRemote.refs
      });
    } catch (err) {
      if (err instanceof NotFoundError) {
        fullRemoteRef = remoteRef.startsWith("refs/") ? remoteRef : `refs/heads/${remoteRef}`;
      } else {
        throw err;
      }
    }
  }
  const oldoid = httpRemote.refs.get(fullRemoteRef) || "0000000000000000000000000000000000000000";
  if (onPrePush) {
    const hookCancel = await onPrePush({
      remote,
      url,
      localRef: { ref: _delete ? "(delete)" : fullRef, oid },
      remoteRef: { ref: fullRemoteRef, oid: oldoid }
    });
    if (!hookCancel) throw new UserCanceledError();
  }
  const thinPack = !httpRemote.capabilities.has("no-thin");
  let objects = /* @__PURE__ */ new Set();
  if (!_delete) {
    const finish = [...httpRemote.refs.values()];
    let skipObjects = /* @__PURE__ */ new Set();
    if (oldoid !== "0000000000000000000000000000000000000000") {
      const mergebase = await _findMergeBase({
        fs: fs2,
        cache,
        gitdir,
        oids: [oid, oldoid]
      });
      for (const oid2 of mergebase) finish.push(oid2);
      if (thinPack) {
        skipObjects = await listObjects({ fs: fs2, cache, gitdir, oids: mergebase });
      }
    }
    if (!finish.includes(oid)) {
      const commits = await listCommitsAndTags({
        fs: fs2,
        cache,
        gitdir,
        start: [oid],
        finish
      });
      objects = await listObjects({ fs: fs2, cache, gitdir, oids: commits });
    }
    if (thinPack) {
      try {
        const ref2 = await GitRefManager.resolve({
          fs: fs2,
          gitdir,
          ref: `refs/remotes/${remote}/HEAD`,
          depth: 2
        });
        const { oid: oid2 } = await GitRefManager.resolveAgainstMap({
          ref: ref2.replace(`refs/remotes/${remote}/`, ""),
          fullref: ref2,
          map: httpRemote.refs
        });
        const oids = [oid2];
        for (const oid3 of await listObjects({ fs: fs2, cache, gitdir, oids })) {
          skipObjects.add(oid3);
        }
      } catch (e) {
      }
      for (const oid2 of skipObjects) {
        objects.delete(oid2);
      }
    }
    if (oid === oldoid) force = true;
    if (!force) {
      if (fullRef.startsWith("refs/tags") && oldoid !== "0000000000000000000000000000000000000000") {
        throw new PushRejectedError("tag-exists");
      }
      if (oid !== "0000000000000000000000000000000000000000" && oldoid !== "0000000000000000000000000000000000000000" && !await _isDescendent({
        fs: fs2,
        cache,
        gitdir,
        oid,
        ancestor: oldoid,
        depth: -1
      })) {
        throw new PushRejectedError("not-fast-forward");
      }
    }
  }
  const capabilities = filterCapabilities(
    [...httpRemote.capabilities],
    ["report-status", "side-band-64k", `agent=${pkg.agent}`]
  );
  const packstream1 = await writeReceivePackRequest({
    capabilities,
    triplets: [{ oldoid, oid, fullRef: fullRemoteRef }]
  });
  const packstream2 = _delete ? [] : await _pack({
    fs: fs2,
    cache,
    gitdir,
    oids: [...objects]
  });
  const res = await GitRemoteHTTP2.connect({
    http,
    onProgress,
    corsProxy,
    service: "git-receive-pack",
    url,
    auth,
    headers,
    body: [...packstream1, ...packstream2]
  });
  const { packfile, progress } = await GitSideBand.demux(res.body);
  if (onMessage) {
    const lines = splitLines(progress);
    forAwait(lines, async (line) => {
      await onMessage(line);
    });
  }
  const result = await parseReceivePackResponse(packfile);
  if (res.headers) {
    result.headers = res.headers;
  }
  if (remote && result.ok && result.refs[fullRemoteRef].ok && !fullRef.startsWith("refs/tags")) {
    const ref2 = `refs/remotes/${remote}/${fullRemoteRef.replace(
      "refs/heads",
      ""
    )}`;
    if (_delete) {
      await GitRefManager.deleteRef({ fs: fs2, gitdir, ref: ref2 });
    } else {
      await GitRefManager.writeRef({ fs: fs2, gitdir, ref: ref2, value: oid });
    }
  }
  if (result.ok && Object.values(result.refs).every((result2) => result2.ok)) {
    return result;
  } else {
    const prettyDetails = Object.entries(result.refs).filter(([k, v]) => !v.ok).map(([k, v]) => `
  - ${k}: ${v.error}`).join("");
    throw new GitPushError(prettyDetails, result);
  }
}
async function push({
  fs: fs2,
  http,
  onProgress,
  onMessage,
  onAuth,
  onAuthSuccess,
  onAuthFailure,
  onPrePush,
  dir,
  gitdir = join(dir, ".git"),
  ref,
  remoteRef,
  remote = "origin",
  url,
  force = false,
  delete: _delete = false,
  corsProxy,
  headers = {},
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("http", http);
    assertParameter("gitdir", gitdir);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _push({
      fs: fsp,
      cache,
      http,
      onProgress,
      onMessage,
      onAuth,
      onAuthSuccess,
      onAuthFailure,
      onPrePush,
      gitdir: updatedGitdir,
      ref,
      remoteRef,
      remote,
      url,
      force,
      delete: _delete,
      corsProxy,
      headers
    });
  } catch (err) {
    err.caller = "git.push";
    throw err;
  }
}
async function resolveBlob({ fs: fs2, cache, gitdir, oid }) {
  const { type, object } = await _readObject({ fs: fs2, cache, gitdir, oid });
  if (type === "tag") {
    oid = GitAnnotatedTag.from(object).parse().object;
    return resolveBlob({ fs: fs2, cache, gitdir, oid });
  }
  if (type !== "blob") {
    throw new ObjectTypeError(oid, type, "blob");
  }
  return { oid, blob: new Uint8Array(object) };
}
async function _readBlob({
  fs: fs2,
  cache,
  gitdir,
  oid,
  filepath = void 0
}) {
  if (filepath !== void 0) {
    oid = await resolveFilepath({ fs: fs2, cache, gitdir, oid, filepath });
  }
  const blob = await resolveBlob({
    fs: fs2,
    cache,
    gitdir,
    oid
  });
  return blob;
}
async function readBlob({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  oid,
  filepath,
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("oid", oid);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _readBlob({
      fs: fsp,
      cache,
      gitdir: updatedGitdir,
      oid,
      filepath
    });
  } catch (err) {
    err.caller = "git.readBlob";
    throw err;
  }
}
async function readCommit({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  oid,
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("oid", oid);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _readCommit({
      fs: fsp,
      cache,
      gitdir: updatedGitdir,
      oid
    });
  } catch (err) {
    err.caller = "git.readCommit";
    throw err;
  }
}
async function _readNote({
  fs: fs2,
  cache,
  gitdir,
  ref = "refs/notes/commits",
  oid
}) {
  const parent = await GitRefManager.resolve({ gitdir, fs: fs2, ref });
  const { blob } = await _readBlob({
    fs: fs2,
    cache,
    gitdir,
    oid: parent,
    filepath: oid
  });
  return blob;
}
async function readNote({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  ref = "refs/notes/commits",
  oid,
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("ref", ref);
    assertParameter("oid", oid);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _readNote({
      fs: fsp,
      cache,
      gitdir: updatedGitdir,
      ref,
      oid
    });
  } catch (err) {
    err.caller = "git.readNote";
    throw err;
  }
}
async function readObject({
  fs: _fs,
  dir,
  gitdir = join(dir, ".git"),
  oid,
  format = "parsed",
  filepath = void 0,
  encoding = void 0,
  cache = {}
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("gitdir", gitdir);
    assertParameter("oid", oid);
    const fs2 = new FileSystem(_fs);
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    if (filepath !== void 0) {
      oid = await resolveFilepath({
        fs: fs2,
        cache,
        gitdir: updatedGitdir,
        oid,
        filepath
      });
    }
    const _format = format === "parsed" ? "content" : format;
    const result = await _readObject({
      fs: fs2,
      cache,
      gitdir: updatedGitdir,
      oid,
      format: _format
    });
    result.oid = oid;
    if (format === "parsed") {
      result.format = "parsed";
      switch (result.type) {
        case "commit":
          result.object = GitCommit.from(result.object).parse();
          break;
        case "tree":
          result.object = GitTree.from(result.object).entries();
          break;
        case "blob":
          if (encoding) {
            result.object = result.object.toString(encoding);
          } else {
            result.object = new Uint8Array(result.object);
            result.format = "content";
          }
          break;
        case "tag":
          result.object = GitAnnotatedTag.from(result.object).parse();
          break;
        default:
          throw new ObjectTypeError(
            result.oid,
            result.type,
            "blob|commit|tag|tree"
          );
      }
    } else if (result.format === "deflated" || result.format === "wrapped") {
      result.type = result.format;
    }
    return result;
  } catch (err) {
    err.caller = "git.readObject";
    throw err;
  }
}
async function _readTag({ fs: fs2, cache, gitdir, oid }) {
  const { type, object } = await _readObject({
    fs: fs2,
    cache,
    gitdir,
    oid,
    format: "content"
  });
  if (type !== "tag") {
    throw new ObjectTypeError(oid, type, "tag");
  }
  const tag2 = GitAnnotatedTag.from(object);
  const result = {
    oid,
    tag: tag2.parse(),
    payload: tag2.payload()
  };
  return result;
}
async function readTag({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  oid,
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("oid", oid);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _readTag({
      fs: fsp,
      cache,
      gitdir: updatedGitdir,
      oid
    });
  } catch (err) {
    err.caller = "git.readTag";
    throw err;
  }
}
async function readTree({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  oid,
  filepath = void 0,
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("oid", oid);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _readTree({
      fs: fsp,
      cache,
      gitdir: updatedGitdir,
      oid,
      filepath
    });
  } catch (err) {
    err.caller = "git.readTree";
    throw err;
  }
}
async function remove({
  fs: _fs,
  dir,
  gitdir = join(dir, ".git"),
  filepath,
  cache = {}
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("gitdir", gitdir);
    assertParameter("filepath", filepath);
    const fsp = new FileSystem(_fs);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    await GitIndexManager.acquire(
      { fs: fsp, gitdir: updatedGitdir, cache },
      async function(index3) {
        index3.delete({ filepath });
      }
    );
  } catch (err) {
    err.caller = "git.remove";
    throw err;
  }
}
async function _removeNote({
  fs: fs2,
  cache,
  onSign,
  gitdir,
  ref = "refs/notes/commits",
  oid,
  author,
  committer,
  signingKey
}) {
  let parent;
  try {
    parent = await GitRefManager.resolve({ gitdir, fs: fs2, ref });
  } catch (err) {
    if (!(err instanceof NotFoundError)) {
      throw err;
    }
  }
  const result = await _readTree({
    fs: fs2,
    cache,
    gitdir,
    oid: parent || "4b825dc642cb6eb9a060e54bf8d69288fbee4904"
  });
  let tree = result.tree;
  tree = tree.filter((entry) => entry.path !== oid);
  const treeOid = await _writeTree({
    fs: fs2,
    gitdir,
    tree
  });
  const commitOid = await _commit({
    fs: fs2,
    cache,
    onSign,
    gitdir,
    ref,
    tree: treeOid,
    parent: parent && [parent],
    message: `Note removed by 'isomorphic-git removeNote'
`,
    author,
    committer,
    signingKey
  });
  return commitOid;
}
async function removeNote({
  fs: _fs,
  onSign,
  dir,
  gitdir = join(dir, ".git"),
  ref = "refs/notes/commits",
  oid,
  author: _author,
  committer: _committer,
  signingKey,
  cache = {}
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("gitdir", gitdir);
    assertParameter("oid", oid);
    const fs2 = new FileSystem(_fs);
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    const author = await normalizeAuthorObject({
      fs: fs2,
      gitdir: updatedGitdir,
      author: _author
    });
    if (!author) throw new MissingNameError("author");
    const committer = await normalizeCommitterObject({
      fs: fs2,
      gitdir: updatedGitdir,
      author,
      committer: _committer
    });
    if (!committer) throw new MissingNameError("committer");
    return await _removeNote({
      fs: fs2,
      cache,
      onSign,
      gitdir: updatedGitdir,
      ref,
      oid,
      author,
      committer,
      signingKey
    });
  } catch (err) {
    err.caller = "git.removeNote";
    throw err;
  }
}
async function _renameBranch({
  fs: fs2,
  gitdir,
  oldref,
  ref,
  checkout: checkout2 = false
}) {
  if (!isValidRef(ref, true)) {
    throw new InvalidRefNameError(ref, import_clean_git_ref.default.clean(ref));
  }
  if (!isValidRef(oldref, true)) {
    throw new InvalidRefNameError(oldref, import_clean_git_ref.default.clean(oldref));
  }
  const fulloldref = `refs/heads/${oldref}`;
  const fullnewref = `refs/heads/${ref}`;
  const newexist = await GitRefManager.exists({ fs: fs2, gitdir, ref: fullnewref });
  if (newexist) {
    throw new AlreadyExistsError("branch", ref, false);
  }
  const value = await GitRefManager.resolve({
    fs: fs2,
    gitdir,
    ref: fulloldref,
    depth: 1
  });
  await GitRefManager.writeRef({ fs: fs2, gitdir, ref: fullnewref, value });
  await GitRefManager.deleteRef({ fs: fs2, gitdir, ref: fulloldref });
  const fullCurrentBranchRef = await _currentBranch({
    fs: fs2,
    gitdir,
    fullname: true
  });
  const isCurrentBranch = fullCurrentBranchRef === fulloldref;
  if (checkout2 || isCurrentBranch) {
    await GitRefManager.writeSymbolicRef({
      fs: fs2,
      gitdir,
      ref: "HEAD",
      value: fullnewref
    });
  }
}
async function renameBranch({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  ref,
  oldref,
  checkout: checkout2 = false
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("ref", ref);
    assertParameter("oldref", oldref);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _renameBranch({
      fs: fsp,
      gitdir: updatedGitdir,
      ref,
      oldref,
      checkout: checkout2
    });
  } catch (err) {
    err.caller = "git.renameBranch";
    throw err;
  }
}
async function hashObject$1({ gitdir, type, object }) {
  return shasum(GitObject.wrap({ type, object }));
}
async function resetIndex({
  fs: _fs,
  dir,
  gitdir = join(dir, ".git"),
  filepath,
  ref,
  cache = {}
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("gitdir", gitdir);
    assertParameter("filepath", filepath);
    const fs2 = new FileSystem(_fs);
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    let oid;
    let workdirOid;
    try {
      oid = await GitRefManager.resolve({
        fs: fs2,
        gitdir: updatedGitdir,
        ref: ref || "HEAD"
      });
    } catch (e) {
      if (ref) {
        throw e;
      }
    }
    if (oid) {
      try {
        oid = await resolveFilepath({
          fs: fs2,
          cache,
          gitdir: updatedGitdir,
          oid,
          filepath
        });
      } catch (e) {
        oid = null;
      }
    }
    let stats = {
      ctime: /* @__PURE__ */ new Date(0),
      mtime: /* @__PURE__ */ new Date(0),
      dev: 0,
      ino: 0,
      mode: 0,
      uid: 0,
      gid: 0,
      size: 0
    };
    const object = dir && await fs2.read(join(dir, filepath));
    if (object) {
      workdirOid = await hashObject$1({
        gitdir: updatedGitdir,
        type: "blob",
        object
      });
      if (oid === workdirOid) {
        stats = await fs2.lstat(join(dir, filepath));
      }
    }
    await GitIndexManager.acquire(
      { fs: fs2, gitdir: updatedGitdir, cache },
      async function(index3) {
        index3.delete({ filepath });
        if (oid) {
          index3.insert({ filepath, stats, oid });
        }
      }
    );
  } catch (err) {
    err.caller = "git.reset";
    throw err;
  }
}
async function resolveRef({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  ref,
  depth
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("ref", ref);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    const oid = await GitRefManager.resolve({
      fs: fsp,
      gitdir: updatedGitdir,
      ref,
      depth
    });
    return oid;
  } catch (err) {
    err.caller = "git.resolveRef";
    throw err;
  }
}
async function setConfig({
  fs: _fs,
  dir,
  gitdir = join(dir, ".git"),
  path,
  value,
  append = false
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("gitdir", gitdir);
    assertParameter("path", path);
    const fs2 = new FileSystem(_fs);
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    const config = await GitConfigManager.get({ fs: fs2, gitdir: updatedGitdir });
    if (append) {
      await config.append(path, value);
    } else {
      await config.set(path, value);
    }
    await GitConfigManager.save({ fs: fs2, gitdir: updatedGitdir, config });
  } catch (err) {
    err.caller = "git.setConfig";
    throw err;
  }
}
async function _writeCommit({ fs: fs2, gitdir, commit: commit2 }) {
  const object = GitCommit.from(commit2).toObject();
  const oid = await _writeObject({
    fs: fs2,
    gitdir,
    type: "commit",
    object,
    format: "content"
  });
  return oid;
}
var GitRefStash = class _GitRefStash {
  // constructor removed
  static get timezoneOffsetForRefLogEntry() {
    const offsetMinutes = (/* @__PURE__ */ new Date()).getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
    const offsetMinutesFormatted = Math.abs(offsetMinutes % 60).toString().padStart(2, "0");
    const sign = offsetMinutes > 0 ? "-" : "+";
    return `${sign}${offsetHours.toString().padStart(2, "0")}${offsetMinutesFormatted}`;
  }
  static createStashReflogEntry(author, stashCommit, message) {
    const nameNoSpace = author.name.replace(/\s/g, "");
    const z40 = "0000000000000000000000000000000000000000";
    const timestamp = Math.floor(Date.now() / 1e3);
    const timezoneOffset = _GitRefStash.timezoneOffsetForRefLogEntry;
    return `${z40} ${stashCommit} ${nameNoSpace} ${author.email} ${timestamp} ${timezoneOffset}	${message}
`;
  }
  static getStashReflogEntry(reflogString, parsed = false) {
    const reflogLines = reflogString.split("\n");
    const entries = reflogLines.filter((l) => l).reverse().map(
      (line, idx) => parsed ? `stash@{${idx}}: ${line.split("	")[1]}` : line
    );
    return entries;
  }
};
var GitStashManager = class _GitStashManager {
  /**
   * Creates an instance of GitStashManager.
   *
   * @param {Object} args
   * @param {FSClient} args.fs - A file system implementation.
   * @param {string} args.dir - The working directory.
   * @param {string}[args.gitdir=join(dir, '.git')] - [required] The [git directory](dir-vs-gitdir.md) path
   */
  constructor({ fs: fs2, dir, gitdir = join(dir, ".git") }) {
    Object.assign(this, {
      fs: fs2,
      dir,
      gitdir,
      _author: null
    });
  }
  /**
   * Gets the reference name for the stash.
   *
   * @returns {string} - The stash reference name.
   */
  static get refStash() {
    return "refs/stash";
  }
  /**
   * Gets the reference name for the stash reflogs.
   *
   * @returns {string} - The stash reflogs reference name.
   */
  static get refLogsStash() {
    return "logs/refs/stash";
  }
  /**
   * Gets the file path for the stash reference.
   *
   * @returns {string} - The file path for the stash reference.
   */
  get refStashPath() {
    return join(this.gitdir, _GitStashManager.refStash);
  }
  /**
   * Gets the file path for the stash reflogs.
   *
   * @returns {string} - The file path for the stash reflogs.
   */
  get refLogsStashPath() {
    return join(this.gitdir, _GitStashManager.refLogsStash);
  }
  /**
   * Retrieves the author information for the stash.
   *
   * @returns {Promise<Object>} - The author object.
   * @throws {MissingNameError} - If the author name is missing.
   */
  async getAuthor() {
    if (!this._author) {
      this._author = await normalizeAuthorObject({
        fs: this.fs,
        gitdir: this.gitdir,
        author: {}
      });
      if (!this._author) throw new MissingNameError("author");
    }
    return this._author;
  }
  /**
   * Gets the SHA of a stash entry by its index.
   *
   * @param {number} refIdx - The index of the stash entry.
   * @param {string[]} [stashEntries] - Optional preloaded stash entries.
   * @returns {Promise<string|null>} - The SHA of the stash entry or `null` if not found.
   */
  async getStashSHA(refIdx, stashEntries) {
    if (!await this.fs.exists(this.refStashPath)) {
      return null;
    }
    const entries = stashEntries || await this.readStashReflogs({ parsed: false });
    return entries[refIdx].split(" ")[1];
  }
  /**
   * Writes a stash commit to the repository.
   *
   * @param {Object} args
   * @param {string} args.message - The commit message.
   * @param {string} args.tree - The tree object ID.
   * @param {string[]} args.parent - The parent commit object IDs.
   * @returns {Promise<string>} - The object ID of the written commit.
   */
  async writeStashCommit({ message, tree, parent }) {
    return _writeCommit({
      fs: this.fs,
      gitdir: this.gitdir,
      commit: {
        message,
        tree,
        parent,
        author: await this.getAuthor(),
        committer: await this.getAuthor()
      }
    });
  }
  /**
   * Reads a stash commit by its index.
   *
   * @param {number} refIdx - The index of the stash entry.
   * @returns {Promise<Object>} - The stash commit object.
   * @throws {InvalidRefNameError} - If the index is invalid.
   */
  async readStashCommit(refIdx) {
    const stashEntries = await this.readStashReflogs({ parsed: false });
    if (refIdx !== 0) {
      if (refIdx < 0 || refIdx > stashEntries.length - 1) {
        throw new InvalidRefNameError(
          `stash@${refIdx}`,
          "number that is in range of [0, num of stash pushed]"
        );
      }
    }
    const stashSHA = await this.getStashSHA(refIdx, stashEntries);
    if (!stashSHA) {
      return {};
    }
    return _readCommit({
      fs: this.fs,
      cache: {},
      gitdir: this.gitdir,
      oid: stashSHA
    });
  }
  /**
   * Writes a stash reference to the repository.
   *
   * @param {string} stashCommit - The object ID of the stash commit.
   * @returns {Promise<void>}
   */
  async writeStashRef(stashCommit) {
    return GitRefManager.writeRef({
      fs: this.fs,
      gitdir: this.gitdir,
      ref: _GitStashManager.refStash,
      value: stashCommit
    });
  }
  /**
   * Writes a reflog entry for a stash commit.
   *
   * @param {Object} args
   * @param {string} args.stashCommit - The object ID of the stash commit.
   * @param {string} args.message - The reflog message.
   * @returns {Promise<void>}
   */
  async writeStashReflogEntry({ stashCommit, message }) {
    const author = await this.getAuthor();
    const entry = GitRefStash.createStashReflogEntry(
      author,
      stashCommit,
      message
    );
    const filepath = this.refLogsStashPath;
    await acquireLock(filepath, async () => {
      const appendTo = await this.fs.exists(filepath) ? await this.fs.read(filepath, "utf8") : "";
      await this.fs.write(filepath, appendTo + entry, "utf8");
    });
  }
  /**
   * Reads the stash reflogs.
   *
   * @param {Object} args
   * @param {boolean} [args.parsed=false] - Whether to parse the reflog entries.
   * @returns {Promise<string[]|Object[]>} - The reflog entries as strings or parsed objects.
   */
  async readStashReflogs({ parsed = false }) {
    if (!await this.fs.exists(this.refLogsStashPath)) {
      return [];
    }
    const reflogString = await this.fs.read(this.refLogsStashPath, "utf8");
    return GitRefStash.getStashReflogEntry(reflogString, parsed);
  }
};
async function _createStashCommit({ fs: fs2, dir, gitdir, message = "" }) {
  const stashMgr = new GitStashManager({ fs: fs2, dir, gitdir });
  await stashMgr.getAuthor();
  const branch2 = await _currentBranch({
    fs: fs2,
    gitdir,
    fullname: false
  });
  const headCommit = await GitRefManager.resolve({
    fs: fs2,
    gitdir,
    ref: "HEAD"
  });
  const headCommitObj = await readCommit({ fs: fs2, dir, gitdir, oid: headCommit });
  const headMsg = headCommitObj.commit.message;
  const stashCommitParents = [headCommit];
  let stashCommitTree = null;
  let workDirCompareBase = TREE({ ref: "HEAD" });
  const indexTree = await writeTreeChanges({
    fs: fs2,
    dir,
    gitdir,
    treePair: [TREE({ ref: "HEAD" }), "stage"]
  });
  if (indexTree) {
    const stashCommitOne = await stashMgr.writeStashCommit({
      message: `stash-Index: WIP on ${branch2} - ${(/* @__PURE__ */ new Date()).toISOString()}`,
      tree: indexTree,
      parent: stashCommitParents
    });
    stashCommitParents.push(stashCommitOne);
    stashCommitTree = indexTree;
    workDirCompareBase = STAGE();
  }
  const workingTree = await writeTreeChanges({
    fs: fs2,
    dir,
    gitdir,
    treePair: [workDirCompareBase, "workdir"]
  });
  if (workingTree) {
    const workingHeadCommit = await stashMgr.writeStashCommit({
      message: `stash-WorkDir: WIP on ${branch2} - ${(/* @__PURE__ */ new Date()).toISOString()}`,
      tree: workingTree,
      parent: [stashCommitParents[stashCommitParents.length - 1]]
    });
    stashCommitParents.push(workingHeadCommit);
    stashCommitTree = workingTree;
  }
  if (!stashCommitTree || !indexTree && !workingTree) {
    throw new NotFoundError("changes, nothing to stash");
  }
  const stashMsg = (message.trim() || `WIP on ${branch2}`) + `: ${headCommit.substring(0, 7)} ${headMsg}`;
  const stashCommit = await stashMgr.writeStashCommit({
    message: stashMsg,
    tree: stashCommitTree,
    parent: stashCommitParents
  });
  return { stashCommit, stashMsg, branch: branch2, stashMgr };
}
async function _stashPush({ fs: fs2, dir, gitdir, message = "" }) {
  const { stashCommit, stashMsg, branch: branch2, stashMgr } = await _createStashCommit({
    fs: fs2,
    dir,
    gitdir,
    message
  });
  await stashMgr.writeStashRef(stashCommit);
  await stashMgr.writeStashReflogEntry({
    stashCommit,
    message: stashMsg
  });
  await checkout({
    fs: fs2,
    dir,
    gitdir,
    ref: branch2,
    track: false,
    force: true
    // force checkout to discard changes
  });
  return stashCommit;
}
async function _stashCreate({ fs: fs2, dir, gitdir, message = "" }) {
  const { stashCommit } = await _createStashCommit({
    fs: fs2,
    dir,
    gitdir,
    message
  });
  return stashCommit;
}
async function _stashApply({ fs: fs2, dir, gitdir, refIdx = 0 }) {
  const stashMgr = new GitStashManager({ fs: fs2, dir, gitdir });
  const stashCommit = await stashMgr.readStashCommit(refIdx);
  const { parent: stashParents = null } = stashCommit.commit ? stashCommit.commit : {};
  if (!stashParents || !Array.isArray(stashParents)) {
    return;
  }
  for (let i = 0; i < stashParents.length - 1; i++) {
    const applyingCommit = await _readCommit({
      fs: fs2,
      cache: {},
      gitdir,
      oid: stashParents[i + 1]
    });
    const wasStaged = applyingCommit.commit.message.startsWith("stash-Index");
    await applyTreeChanges({
      fs: fs2,
      dir,
      gitdir,
      stashCommit: stashParents[i + 1],
      parentCommit: stashParents[i],
      wasStaged
    });
  }
}
async function _stashDrop({ fs: fs2, dir, gitdir, refIdx = 0 }) {
  const stashMgr = new GitStashManager({ fs: fs2, dir, gitdir });
  const stashCommit = await stashMgr.readStashCommit(refIdx);
  if (!stashCommit.commit) {
    return;
  }
  const stashRefPath = stashMgr.refStashPath;
  await acquireLock(stashRefPath, async () => {
    if (await fs2.exists(stashRefPath)) {
      await fs2.rm(stashRefPath);
    }
  });
  const reflogEntries = await stashMgr.readStashReflogs({ parsed: false });
  if (!reflogEntries.length) {
    return;
  }
  reflogEntries.splice(refIdx, 1);
  const stashReflogPath = stashMgr.refLogsStashPath;
  await acquireLock(stashReflogPath, async () => {
    if (reflogEntries.length) {
      await fs2.write(
        stashReflogPath,
        reflogEntries.reverse().join("\n") + "\n",
        "utf8"
      );
      const lastStashCommit = reflogEntries[reflogEntries.length - 1].split(" ")[1];
      await stashMgr.writeStashRef(lastStashCommit);
    } else {
      await fs2.rm(stashReflogPath);
    }
  });
}
async function _stashList({ fs: fs2, dir, gitdir }) {
  const stashMgr = new GitStashManager({ fs: fs2, dir, gitdir });
  return stashMgr.readStashReflogs({ parsed: true });
}
async function _stashClear({ fs: fs2, dir, gitdir }) {
  const stashMgr = new GitStashManager({ fs: fs2, dir, gitdir });
  const stashRefPath = [stashMgr.refStashPath, stashMgr.refLogsStashPath];
  await acquireLock(stashRefPath, async () => {
    await Promise.all(
      stashRefPath.map(async (path) => {
        if (await fs2.exists(path)) {
          return fs2.rm(path);
        }
      })
    );
  });
}
async function _stashPop({ fs: fs2, dir, gitdir, refIdx = 0 }) {
  await _stashApply({ fs: fs2, dir, gitdir, refIdx });
  await _stashDrop({ fs: fs2, dir, gitdir, refIdx });
}
async function stash({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  op = "push",
  message = "",
  refIdx = 0
}) {
  assertParameter("fs", fs2);
  assertParameter("dir", dir);
  assertParameter("gitdir", gitdir);
  assertParameter("op", op);
  const stashMap = {
    push: _stashPush,
    apply: _stashApply,
    drop: _stashDrop,
    list: _stashList,
    clear: _stashClear,
    pop: _stashPop,
    create: _stashCreate
  };
  const opsNeedRefIdx = ["apply", "drop", "pop"];
  try {
    const _fs = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp: _fs, dotgit: gitdir });
    const folders = ["refs", "logs", "logs/refs"];
    folders.map((f) => join(updatedGitdir, f)).forEach(async (folder) => {
      if (!await _fs.exists(folder)) {
        await _fs.mkdir(folder);
      }
    });
    const opFunc = stashMap[op];
    if (opFunc) {
      if (opsNeedRefIdx.includes(op) && refIdx < 0) {
        throw new InvalidRefNameError(
          `stash@${refIdx}`,
          "number that is in range of [0, num of stash pushed]"
        );
      }
      return await opFunc({
        fs: _fs,
        dir,
        gitdir: updatedGitdir,
        message,
        refIdx
      });
    }
    throw new Error(`To be implemented: ${op}`);
  } catch (err) {
    err.caller = "git.stash";
    throw err;
  }
}
async function status({
  fs: _fs,
  dir,
  gitdir = join(dir, ".git"),
  filepath,
  cache = {},
  refresh = true
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("gitdir", gitdir);
    assertParameter("filepath", filepath);
    const fs2 = new FileSystem(_fs);
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    const headTree = await getHeadTree({ fs: fs2, cache, gitdir: updatedGitdir });
    const treeOid = await getOidAtPath({
      fs: fs2,
      cache,
      gitdir: updatedGitdir,
      tree: headTree,
      path: filepath
    });
    const indexEntry = await GitIndexManager.acquire(
      { fs: fs2, gitdir: updatedGitdir, cache },
      async function(index3) {
        for (const entry of index3) {
          if (entry.path === filepath) return entry;
        }
        return null;
      }
    );
    if (treeOid === null && indexEntry === null) {
      const ignored = await GitIgnoreManager.isIgnored({
        fs: fs2,
        gitdir: updatedGitdir,
        dir,
        filepath
      });
      if (ignored) {
        return "ignored";
      }
    }
    const stats = await fs2.lstat(join(dir, filepath));
    const H = treeOid !== null;
    const I = indexEntry !== null;
    const W = stats !== null;
    const getWorkdirOid = async () => {
      if (I && !compareStats(indexEntry, stats)) {
        return indexEntry.oid;
      } else {
        const config = await GitConfigManager.get({ fs: fs2, gitdir: updatedGitdir });
        const autocrlf = await config.get("core.autocrlf");
        const object = await fs2.read(join(dir, filepath), { autocrlf });
        const workdirOid = await hashObject$1({
          gitdir: updatedGitdir,
          type: "blob",
          object
        });
        if (refresh && I && indexEntry.oid === workdirOid) {
          if (stats.size !== -1) {
            GitIndexManager.acquire(
              { fs: fs2, gitdir: updatedGitdir, cache },
              async function(index3) {
                index3.insert({ filepath, stats, oid: workdirOid });
              }
            );
          }
        }
        return workdirOid;
      }
    };
    if (!H && !W && !I) return "absent";
    if (!H && !W && I) return "*absent";
    if (!H && W && !I) return "*added";
    if (!H && W && I) {
      const workdirOid = await getWorkdirOid();
      return workdirOid === indexEntry.oid ? "added" : "*added";
    }
    if (H && !W && !I) return "deleted";
    if (H && !W && I) {
      return treeOid === indexEntry.oid ? "*deleted" : "*deleted";
    }
    if (H && W && !I) {
      const workdirOid = await getWorkdirOid();
      return workdirOid === treeOid ? "*undeleted" : "*undeletemodified";
    }
    if (H && W && I) {
      const workdirOid = await getWorkdirOid();
      if (workdirOid === treeOid) {
        return workdirOid === indexEntry.oid ? "unmodified" : "*unmodified";
      } else {
        return workdirOid === indexEntry.oid ? "modified" : "*modified";
      }
    }
  } catch (err) {
    err.caller = "git.status";
    throw err;
  }
}
async function getOidAtPath({ fs: fs2, cache, gitdir: updatedGitdir, tree, path }) {
  if (typeof path === "string") path = path.split("/");
  const dirname2 = path.shift();
  for (const entry of tree) {
    if (entry.path === dirname2) {
      if (path.length === 0) {
        return entry.oid;
      }
      const { type, object } = await _readObject({
        fs: fs2,
        cache,
        gitdir: updatedGitdir,
        oid: entry.oid
      });
      if (type === "tree") {
        const tree2 = GitTree.from(object);
        return getOidAtPath({ fs: fs2, cache, gitdir: updatedGitdir, tree: tree2, path });
      }
      if (type === "blob") {
        throw new ObjectTypeError(entry.oid, type, "blob", path.join("/"));
      }
    }
  }
  return null;
}
async function getHeadTree({ fs: fs2, cache, gitdir: updatedGitdir }) {
  let oid;
  try {
    oid = await GitRefManager.resolve({
      fs: fs2,
      gitdir: updatedGitdir,
      ref: "HEAD"
    });
  } catch (e) {
    if (e instanceof NotFoundError) {
      return [];
    }
  }
  const { tree } = await _readTree({ fs: fs2, cache, gitdir: updatedGitdir, oid });
  return tree;
}
async function statusMatrix({
  fs: _fs,
  dir,
  gitdir = join(dir, ".git"),
  ref = "HEAD",
  filepaths = ["."],
  filter,
  cache = {},
  ignored: shouldIgnore = false,
  refresh = true
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("gitdir", gitdir);
    assertParameter("ref", ref);
    const fs2 = new FileSystem(_fs);
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    return await _walk({
      fs: fs2,
      cache,
      dir,
      gitdir: updatedGitdir,
      trees: [TREE({ ref }), WORKDIR({ refresh }), STAGE()],
      map: async function(filepath, [head, workdir, stage]) {
        if (!head && !stage && workdir) {
          if (!shouldIgnore) {
            const isIgnored2 = await GitIgnoreManager.isIgnored({
              fs: fs2,
              dir,
              filepath
            });
            if (isIgnored2) {
              return null;
            }
          }
        }
        if (!filepaths.some((base) => worthWalking(filepath, base))) {
          return null;
        }
        if (filter) {
          if (!filter(filepath)) return;
        }
        const [headType, workdirType, stageType] = await Promise.all([
          head && head.type(),
          workdir && workdir.type(),
          stage && stage.type()
        ]);
        const isBlob = [headType, workdirType, stageType].includes("blob");
        if ((headType === "tree" || headType === "special") && !isBlob) return;
        if (headType === "commit") return null;
        if ((workdirType === "tree" || workdirType === "special") && !isBlob)
          return;
        if (stageType === "commit") return null;
        if ((stageType === "tree" || stageType === "special") && !isBlob) return;
        const headOid = headType === "blob" ? await head.oid() : void 0;
        const stageOid = stageType === "blob" ? await stage.oid() : void 0;
        let workdirOid;
        if (headType !== "blob" && workdirType === "blob" && stageType !== "blob") {
          workdirOid = "42";
        } else if (workdirType === "blob") {
          workdirOid = await workdir.oid();
        }
        const entry = [void 0, headOid, workdirOid, stageOid];
        const result = entry.map((value) => entry.indexOf(value));
        result.shift();
        return [filepath, ...result];
      }
    });
  } catch (err) {
    err.caller = "git.statusMatrix";
    throw err;
  }
}
async function tag({
  fs: _fs,
  dir,
  gitdir = join(dir, ".git"),
  ref,
  object,
  force = false
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("gitdir", gitdir);
    assertParameter("ref", ref);
    const fs2 = new FileSystem(_fs);
    if (ref === void 0) {
      throw new MissingParameterError("ref");
    }
    ref = ref.startsWith("refs/tags/") ? ref : `refs/tags/${ref}`;
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    const value = await GitRefManager.resolve({
      fs: fs2,
      gitdir: updatedGitdir,
      ref: object || "HEAD"
    });
    if (!force && await GitRefManager.exists({ fs: fs2, gitdir: updatedGitdir, ref })) {
      throw new AlreadyExistsError("tag", ref);
    }
    await GitRefManager.writeRef({ fs: fs2, gitdir: updatedGitdir, ref, value });
  } catch (err) {
    err.caller = "git.tag";
    throw err;
  }
}
async function updateIndex$1({
  fs: _fs,
  dir,
  gitdir = join(dir, ".git"),
  cache = {},
  filepath,
  oid,
  mode,
  add: add2,
  remove: remove2,
  force
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("gitdir", gitdir);
    assertParameter("filepath", filepath);
    const fs2 = new FileSystem(_fs);
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    if (remove2) {
      return await GitIndexManager.acquire(
        { fs: fs2, gitdir: updatedGitdir, cache },
        async function(index3) {
          if (!force) {
            const fileStats2 = await fs2.lstat(join(dir, filepath));
            if (fileStats2) {
              if (fileStats2.isDirectory()) {
                throw new InvalidFilepathError("directory");
              }
              return;
            }
          }
          if (index3.has({ filepath })) {
            index3.delete({
              filepath
            });
          }
        }
      );
    }
    let fileStats;
    if (!oid) {
      fileStats = await fs2.lstat(join(dir, filepath));
      if (!fileStats) {
        throw new NotFoundError(
          `file at "${filepath}" on disk and "remove" not set`
        );
      }
      if (fileStats.isDirectory()) {
        throw new InvalidFilepathError("directory");
      }
    }
    return await GitIndexManager.acquire(
      { fs: fs2, gitdir: updatedGitdir, cache },
      async function(index3) {
        if (!add2 && !index3.has({ filepath })) {
          throw new NotFoundError(
            `file at "${filepath}" in index and "add" not set`
          );
        }
        let stats;
        if (!oid) {
          stats = fileStats;
          const object = stats.isSymbolicLink() ? await fs2.readlink(join(dir, filepath)) : await fs2.read(join(dir, filepath));
          oid = await _writeObject({
            fs: fs2,
            gitdir: updatedGitdir,
            type: "blob",
            format: "content",
            object
          });
        } else {
          stats = {
            ctime: /* @__PURE__ */ new Date(0),
            mtime: /* @__PURE__ */ new Date(0),
            dev: 0,
            ino: 0,
            mode,
            uid: 0,
            gid: 0,
            size: 0
          };
        }
        index3.insert({
          filepath,
          oid,
          stats
        });
        return oid;
      }
    );
  } catch (err) {
    err.caller = "git.updateIndex";
    throw err;
  }
}
function version() {
  try {
    return pkg.version;
  } catch (err) {
    err.caller = "git.version";
    throw err;
  }
}
async function walk({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  trees,
  map,
  reduce,
  iterate,
  cache = {}
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("trees", trees);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _walk({
      fs: fsp,
      cache,
      dir,
      gitdir: updatedGitdir,
      trees,
      map,
      reduce,
      iterate
    });
  } catch (err) {
    err.caller = "git.walk";
    throw err;
  }
}
async function writeBlob({ fs: fs2, dir, gitdir = join(dir, ".git"), blob }) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("blob", blob);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _writeObject({
      fs: fsp,
      gitdir: updatedGitdir,
      type: "blob",
      object: blob,
      format: "content"
    });
  } catch (err) {
    err.caller = "git.writeBlob";
    throw err;
  }
}
async function writeCommit({
  fs: fs2,
  dir,
  gitdir = join(dir, ".git"),
  commit: commit2
}) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("commit", commit2);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _writeCommit({
      fs: fsp,
      gitdir: updatedGitdir,
      commit: commit2
    });
  } catch (err) {
    err.caller = "git.writeCommit";
    throw err;
  }
}
async function writeObject({
  fs: _fs,
  dir,
  gitdir = join(dir, ".git"),
  type,
  object,
  format = "parsed",
  oid,
  encoding = void 0
}) {
  try {
    const fs2 = new FileSystem(_fs);
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    if (format === "parsed") {
      switch (type) {
        case "commit":
          object = GitCommit.from(object).toObject();
          break;
        case "tree":
          object = GitTree.from(object).toObject();
          break;
        case "blob":
          object = Buffer.from(object, encoding);
          break;
        case "tag":
          object = GitAnnotatedTag.from(object).toObject();
          break;
        default:
          throw new ObjectTypeError(oid || "", type, "blob|commit|tag|tree");
      }
      format = "content";
    }
    oid = await _writeObject({
      fs: fs2,
      gitdir: updatedGitdir,
      type,
      object,
      oid,
      format
    });
    return oid;
  } catch (err) {
    err.caller = "git.writeObject";
    throw err;
  }
}
async function writeRef({
  fs: _fs,
  dir,
  gitdir = join(dir, ".git"),
  ref,
  value,
  force = false,
  symbolic = false
}) {
  try {
    assertParameter("fs", _fs);
    assertParameter("gitdir", gitdir);
    assertParameter("ref", ref);
    assertParameter("value", value);
    const fs2 = new FileSystem(_fs);
    if (!isValidRef(ref, true)) {
      throw new InvalidRefNameError(ref, import_clean_git_ref.default.clean(ref));
    }
    const updatedGitdir = await discoverGitdir({ fsp: fs2, dotgit: gitdir });
    if (!force && await GitRefManager.exists({ fs: fs2, gitdir: updatedGitdir, ref })) {
      throw new AlreadyExistsError("ref", ref);
    }
    if (symbolic) {
      await GitRefManager.writeSymbolicRef({
        fs: fs2,
        gitdir: updatedGitdir,
        ref,
        value
      });
    } else {
      value = await GitRefManager.resolve({
        fs: fs2,
        gitdir: updatedGitdir,
        ref: value
      });
      await GitRefManager.writeRef({
        fs: fs2,
        gitdir: updatedGitdir,
        ref,
        value
      });
    }
  } catch (err) {
    err.caller = "git.writeRef";
    throw err;
  }
}
async function _writeTag({ fs: fs2, gitdir, tag: tag2 }) {
  const object = GitAnnotatedTag.from(tag2).toObject();
  const oid = await _writeObject({
    fs: fs2,
    gitdir,
    type: "tag",
    object,
    format: "content"
  });
  return oid;
}
async function writeTag({ fs: fs2, dir, gitdir = join(dir, ".git"), tag: tag2 }) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("tag", tag2);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _writeTag({
      fs: fsp,
      gitdir: updatedGitdir,
      tag: tag2
    });
  } catch (err) {
    err.caller = "git.writeTag";
    throw err;
  }
}
async function writeTree({ fs: fs2, dir, gitdir = join(dir, ".git"), tree }) {
  try {
    assertParameter("fs", fs2);
    assertParameter("gitdir", gitdir);
    assertParameter("tree", tree);
    const fsp = new FileSystem(fs2);
    const updatedGitdir = await discoverGitdir({ fsp, dotgit: gitdir });
    return await _writeTree({
      fs: fsp,
      gitdir: updatedGitdir,
      tree
    });
  } catch (err) {
    err.caller = "git.writeTree";
    throw err;
  }
}
var index = {
  Errors,
  STAGE,
  TREE,
  WORKDIR,
  add,
  abortMerge,
  addNote,
  addRemote,
  annotatedTag,
  branch,
  cherryPick,
  checkout,
  clone,
  commit,
  getConfig: getConfig2,
  getConfigAll,
  setConfig,
  currentBranch,
  deleteBranch,
  deleteRef,
  deleteRemote,
  deleteTag,
  expandOid,
  expandRef,
  fastForward,
  fetch: fetch2,
  findMergeBase,
  findRoot,
  getRemoteInfo,
  getRemoteInfo2,
  hashBlob,
  indexPack,
  init,
  isDescendent,
  isIgnored,
  listBranches,
  listFiles,
  listNotes,
  listRefs,
  listRemotes,
  listServerRefs,
  listTags,
  log,
  merge,
  packObjects,
  pull,
  push,
  readBlob,
  readCommit,
  readNote,
  readObject,
  readTag,
  readTree,
  remove,
  removeNote,
  renameBranch,
  resetIndex,
  updateIndex: updateIndex$1,
  resolveRef,
  status,
  statusMatrix,
  tag,
  version,
  walk,
  writeBlob,
  writeCommit,
  writeObject,
  writeRef,
  writeTag,
  writeTree,
  stash
};
var isomorphic_git_default = index;

// node_modules/isomorphic-git/http/web/index.js
function fromValue2(value) {
  let queue = [value];
  return {
    next() {
      return Promise.resolve({ done: queue.length === 0, value: queue.pop() });
    },
    return() {
      queue = [];
      return {};
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
function getIterator2(iterable) {
  if (iterable[Symbol.asyncIterator]) {
    return iterable[Symbol.asyncIterator]();
  }
  if (iterable[Symbol.iterator]) {
    return iterable[Symbol.iterator]();
  }
  if (iterable.next) {
    return iterable;
  }
  return fromValue2(iterable);
}
async function forAwait2(iterable, cb) {
  const iter2 = getIterator2(iterable);
  while (true) {
    const { value, done } = await iter2.next();
    if (value) await cb(value);
    if (done) break;
  }
  if (iter2.return) iter2.return();
}
async function collect2(iterable) {
  let size = 0;
  const buffers = [];
  await forAwait2(iterable, (value) => {
    buffers.push(value);
    size += value.byteLength;
  });
  const result = new Uint8Array(size);
  let nextIndex = 0;
  for (const buffer of buffers) {
    result.set(buffer, nextIndex);
    nextIndex += buffer.byteLength;
  }
  return result;
}
function fromStream(stream) {
  if (stream[Symbol.asyncIterator]) return stream;
  const reader = stream.getReader();
  return {
    next() {
      return reader.read();
    },
    return() {
      reader.releaseLock();
      return {};
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
async function request({
  onProgress,
  url,
  method = "GET",
  headers = {},
  fetchOptions = {},
  body
}) {
  if (body) {
    body = await collect2(body);
  }
  const res = await fetch(url, { ...fetchOptions, method, headers, body });
  const iter2 = (
    // @ts-expect-error
    res.body && res.body.getReader ? fromStream(res.body) : [new Uint8Array(await res.arrayBuffer())]
  );
  headers = {};
  for (const [key, value] of res.headers.entries()) {
    headers[key] = value;
  }
  return {
    url: res.url,
    // @ts-expect-error
    method: res.method,
    statusCode: res.status,
    statusMessage: res.statusText,
    body: iter2,
    headers
  };
}
var index2 = { request };
var web_default = index2;

// src/gitSync.js
var fs = new import_lightning_fs.default("terminsync-fs");
var pfs = fs.promises;
var REPO_DIR = "/repo";
async function repoExists() {
  try {
    await pfs.stat(`${REPO_DIR}/.git`);
    return true;
  } catch {
    return false;
  }
}
async function pullOnStartup(onProgress = () => {
}) {
  const { remoteUrl, corsProxy } = getConfig();
  if (!remoteUrl) return { ok: false, reason: "Keine Repo-URL konfiguriert." };
  try {
    if (!await repoExists()) {
      onProgress("Klone Repo ...");
      await isomorphic_git_default.clone({
        fs,
        http: web_default,
        dir: REPO_DIR,
        url: remoteUrl,
        corsProxy,
        onAuth: authCallback(),
        singleBranch: true,
        depth: 1
      });
    } else {
      onProgress("Hole neueste \xC4nderungen ...");
      await isomorphic_git_default.pull({
        fs,
        http: web_default,
        dir: REPO_DIR,
        corsProxy,
        onAuth: authCallback(),
        author: { name: "terminsync", email: "terminsync@local" },
        singleBranch: true
      });
    }
    return { ok: true };
  } catch (e) {
    console.error("Pull fehlgeschlagen:", e);
    return { ok: false, reason: String(e) };
  }
}
async function pushChanges(commitMessage, authorName) {
  const { remoteUrl, corsProxy } = getConfig();
  if (!remoteUrl) return { ok: false, reason: "Keine Repo-URL konfiguriert." };
  try {
    await isomorphic_git_default.add({ fs, dir: REPO_DIR, filepath: "." });
    const statusMatrix2 = await isomorphic_git_default.statusMatrix({ fs, dir: REPO_DIR });
    const hasChanges = statusMatrix2.some(([, head, workdir, stage]) => head !== 1 || workdir !== 1 || stage !== 1);
    if (!hasChanges) {
      return { ok: true, reason: "Keine \xC4nderungen vorhanden." };
    }
    await isomorphic_git_default.commit({
      fs,
      dir: REPO_DIR,
      message: commitMessage,
      author: { name: authorName || "terminsync", email: `${authorName || "terminsync"}@local` }
    });
    await isomorphic_git_default.push({ fs, http: web_default, dir: REPO_DIR, corsProxy, onAuth: authCallback() });
    return { ok: true };
  } catch (e) {
    console.error("Push fehlgeschlagen:", e);
    return { ok: false, reason: String(e) };
  }
}
async function listFiles2(subdir) {
  try {
    return await pfs.readdir(`${REPO_DIR}/${subdir}`);
  } catch {
    return [];
  }
}
async function readFile(path) {
  try {
    const data = await pfs.readFile(`${REPO_DIR}/${path}`, "utf8");
    return data;
  } catch {
    return null;
  }
}
async function writeFile(path, content) {
  const fullPath = `${REPO_DIR}/${path}`;
  const dir = fullPath.substring(0, fullPath.lastIndexOf("/"));
  await mkdirp2(dir);
  await pfs.writeFile(fullPath, content, "utf8");
}
async function mkdirp2(dir) {
  const parts = dir.split("/").filter(Boolean);
  let current = "";
  for (const part of parts) {
    current += `/${part}`;
    try {
      await pfs.mkdir(current);
    } catch {
    }
  }
}

// src/jsonStore.js
function userCalendarPath(username) {
  return `data/users/${username}.json`;
}
async function loadUserCalendar(username) {
  const raw = await readFile(userCalendarPath(username));
  if (!raw) return [];
  const data = JSON.parse(raw);
  return data.events || [];
}
async function saveUserCalendar(username, events) {
  const sorted = [...events].sort((a, b) => a.id.localeCompare(b.id));
  const data = { user: username, events: sorted };
  await writeFile(userCalendarPath(username), JSON.stringify(data, null, 2) + "\n");
}
async function listKnownUsers() {
  const files = await listFiles2("data/users");
  return files.filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, "")).sort();
}

// node_modules/rrule/dist/esm/weekday.js
var ALL_WEEKDAYS = [
  "MO",
  "TU",
  "WE",
  "TH",
  "FR",
  "SA",
  "SU"
];
var Weekday = (
  /** @class */
  (function() {
    function Weekday2(weekday, n) {
      if (n === 0)
        throw new Error("Can't create weekday with n == 0");
      this.weekday = weekday;
      this.n = n;
    }
    Weekday2.fromStr = function(str) {
      return new Weekday2(ALL_WEEKDAYS.indexOf(str));
    };
    Weekday2.prototype.nth = function(n) {
      return this.n === n ? this : new Weekday2(this.weekday, n);
    };
    Weekday2.prototype.equals = function(other) {
      return this.weekday === other.weekday && this.n === other.n;
    };
    Weekday2.prototype.toString = function() {
      var s = ALL_WEEKDAYS[this.weekday];
      if (this.n)
        s = (this.n > 0 ? "+" : "") + String(this.n) + s;
      return s;
    };
    Weekday2.prototype.getJsWeekday = function() {
      return this.weekday === 6 ? 0 : this.weekday + 1;
    };
    return Weekday2;
  })()
);

// node_modules/rrule/dist/esm/helpers.js
var isPresent = function(value) {
  return value !== null && value !== void 0;
};
var isNumber = function(value) {
  return typeof value === "number";
};
var isWeekdayStr = function(value) {
  return typeof value === "string" && ALL_WEEKDAYS.includes(value);
};
var isArray = Array.isArray;
var range = function(start, end) {
  if (end === void 0) {
    end = start;
  }
  if (arguments.length === 1) {
    end = start;
    start = 0;
  }
  var rang = [];
  for (var i = start; i < end; i++)
    rang.push(i);
  return rang;
};
var repeat = function(value, times) {
  var i = 0;
  var array = [];
  if (isArray(value)) {
    for (; i < times; i++)
      array[i] = [].concat(value);
  } else {
    for (; i < times; i++)
      array[i] = value;
  }
  return array;
};
var toArray = function(item) {
  if (isArray(item)) {
    return item;
  }
  return [item];
};
function padStart(item, targetLength, padString) {
  if (padString === void 0) {
    padString = " ";
  }
  var str = String(item);
  targetLength = targetLength >> 0;
  if (str.length > targetLength) {
    return String(str);
  }
  targetLength = targetLength - str.length;
  if (targetLength > padString.length) {
    padString += repeat(padString, targetLength / padString.length);
  }
  return padString.slice(0, targetLength) + String(str);
}
var split = function(str, sep, num2) {
  var splits = str.split(sep);
  return num2 ? splits.slice(0, num2).concat([splits.slice(num2).join(sep)]) : splits;
};
var pymod = function(a, b) {
  var r = a % b;
  return r * b < 0 ? r + b : r;
};
var divmod = function(a, b) {
  return { div: Math.floor(a / b), mod: pymod(a, b) };
};
var empty = function(obj) {
  return !isPresent(obj) || obj.length === 0;
};
var notEmpty = function(obj) {
  return !empty(obj);
};
var includes = function(arr, val) {
  return notEmpty(arr) && arr.indexOf(val) !== -1;
};

// node_modules/rrule/dist/esm/dateutil.js
var datetime = function(y, m, d, h, i, s) {
  if (h === void 0) {
    h = 0;
  }
  if (i === void 0) {
    i = 0;
  }
  if (s === void 0) {
    s = 0;
  }
  return new Date(Date.UTC(y, m - 1, d, h, i, s));
};
var MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var ONE_DAY = 1e3 * 60 * 60 * 24;
var MAXYEAR = 9999;
var ORDINAL_BASE = datetime(1970, 1, 1);
var PY_WEEKDAYS = [6, 0, 1, 2, 3, 4, 5];
var isLeapYear = function(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
};
var isDate = function(value) {
  return value instanceof Date;
};
var isValidDate = function(value) {
  return isDate(value) && !isNaN(value.getTime());
};
var daysBetween = function(date1, date2) {
  var date1ms = date1.getTime();
  var date2ms = date2.getTime();
  var differencems = date1ms - date2ms;
  return Math.round(differencems / ONE_DAY);
};
var toOrdinal = function(date) {
  return daysBetween(date, ORDINAL_BASE);
};
var fromOrdinal = function(ordinal) {
  return new Date(ORDINAL_BASE.getTime() + ordinal * ONE_DAY);
};
var getMonthDays = function(date) {
  var month = date.getUTCMonth();
  return month === 1 && isLeapYear(date.getUTCFullYear()) ? 29 : MONTH_DAYS[month];
};
var getWeekday = function(date) {
  return PY_WEEKDAYS[date.getUTCDay()];
};
var monthRange = function(year, month) {
  var date = datetime(year, month + 1, 1);
  return [getWeekday(date), getMonthDays(date)];
};
var combine = function(date, time) {
  time = time || date;
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds()));
};
var clone2 = function(date) {
  var dolly = new Date(date.getTime());
  return dolly;
};
var cloneDates = function(dates) {
  var clones = [];
  for (var i = 0; i < dates.length; i++) {
    clones.push(clone2(dates[i]));
  }
  return clones;
};
var sort = function(dates) {
  dates.sort(function(a, b) {
    return a.getTime() - b.getTime();
  });
};
var timeToUntilString = function(time, utc) {
  if (utc === void 0) {
    utc = true;
  }
  var date = new Date(time);
  return [
    padStart(date.getUTCFullYear().toString(), 4, "0"),
    padStart(date.getUTCMonth() + 1, 2, "0"),
    padStart(date.getUTCDate(), 2, "0"),
    "T",
    padStart(date.getUTCHours(), 2, "0"),
    padStart(date.getUTCMinutes(), 2, "0"),
    padStart(date.getUTCSeconds(), 2, "0"),
    utc ? "Z" : ""
  ].join("");
};
var untilStringToDate = function(until) {
  var re = /^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z?)?$/;
  var bits = re.exec(until);
  if (!bits)
    throw new Error("Invalid UNTIL value: ".concat(until));
  return new Date(Date.UTC(parseInt(bits[1], 10), parseInt(bits[2], 10) - 1, parseInt(bits[3], 10), parseInt(bits[5], 10) || 0, parseInt(bits[6], 10) || 0, parseInt(bits[7], 10) || 0));
};
var dateTZtoISO8601 = function(date, timeZone) {
  var dateStr = date.toLocaleString("sv-SE", { timeZone });
  return dateStr.replace(" ", "T") + "Z";
};
var dateInTimeZone = function(date, timeZone) {
  var localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var dateInLocalTZ = new Date(dateTZtoISO8601(date, localTimeZone));
  var dateInTargetTZ = new Date(dateTZtoISO8601(date, timeZone !== null && timeZone !== void 0 ? timeZone : "UTC"));
  var tzOffset = dateInTargetTZ.getTime() - dateInLocalTZ.getTime();
  return new Date(date.getTime() - tzOffset);
};

// node_modules/rrule/dist/esm/iterresult.js
var IterResult = (
  /** @class */
  (function() {
    function IterResult2(method, args) {
      this.minDate = null;
      this.maxDate = null;
      this._result = [];
      this.total = 0;
      this.method = method;
      this.args = args;
      if (method === "between") {
        this.maxDate = args.inc ? args.before : new Date(args.before.getTime() - 1);
        this.minDate = args.inc ? args.after : new Date(args.after.getTime() + 1);
      } else if (method === "before") {
        this.maxDate = args.inc ? args.dt : new Date(args.dt.getTime() - 1);
      } else if (method === "after") {
        this.minDate = args.inc ? args.dt : new Date(args.dt.getTime() + 1);
      }
    }
    IterResult2.prototype.accept = function(date) {
      ++this.total;
      var tooEarly = this.minDate && date < this.minDate;
      var tooLate = this.maxDate && date > this.maxDate;
      if (this.method === "between") {
        if (tooEarly)
          return true;
        if (tooLate)
          return false;
      } else if (this.method === "before") {
        if (tooLate)
          return false;
      } else if (this.method === "after") {
        if (tooEarly)
          return true;
        this.add(date);
        return false;
      }
      return this.add(date);
    };
    IterResult2.prototype.add = function(date) {
      this._result.push(date);
      return true;
    };
    IterResult2.prototype.getValue = function() {
      var res = this._result;
      switch (this.method) {
        case "all":
        case "between":
          return res;
        case "before":
        case "after":
        default:
          return res.length ? res[res.length - 1] : null;
      }
    };
    IterResult2.prototype.clone = function() {
      return new IterResult2(this.method, this.args);
    };
    return IterResult2;
  })()
);
var iterresult_default = IterResult;

// node_modules/tslib/tslib.es6.mjs
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

// node_modules/rrule/dist/esm/callbackiterresult.js
var CallbackIterResult = (
  /** @class */
  (function(_super) {
    __extends(CallbackIterResult2, _super);
    function CallbackIterResult2(method, args, iterator) {
      var _this = _super.call(this, method, args) || this;
      _this.iterator = iterator;
      return _this;
    }
    CallbackIterResult2.prototype.add = function(date) {
      if (this.iterator(date, this._result.length)) {
        this._result.push(date);
        return true;
      }
      return false;
    };
    return CallbackIterResult2;
  })(iterresult_default)
);
var callbackiterresult_default = CallbackIterResult;

// node_modules/rrule/dist/esm/nlp/i18n.js
var ENGLISH = {
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  tokens: {
    SKIP: /^[ \r\n\t]+|^\.$/,
    number: /^[1-9][0-9]*/,
    numberAsText: /^(one|two|three)/i,
    every: /^every/i,
    "day(s)": /^days?/i,
    "weekday(s)": /^weekdays?/i,
    "week(s)": /^weeks?/i,
    "hour(s)": /^hours?/i,
    "minute(s)": /^minutes?/i,
    "month(s)": /^months?/i,
    "year(s)": /^years?/i,
    on: /^(on|in)/i,
    at: /^(at)/i,
    the: /^the/i,
    first: /^first/i,
    second: /^second/i,
    third: /^third/i,
    nth: /^([1-9][0-9]*)(\.|th|nd|rd|st)/i,
    last: /^last/i,
    for: /^for/i,
    "time(s)": /^times?/i,
    until: /^(un)?til/i,
    monday: /^mo(n(day)?)?/i,
    tuesday: /^tu(e(s(day)?)?)?/i,
    wednesday: /^we(d(n(esday)?)?)?/i,
    thursday: /^th(u(r(sday)?)?)?/i,
    friday: /^fr(i(day)?)?/i,
    saturday: /^sa(t(urday)?)?/i,
    sunday: /^su(n(day)?)?/i,
    january: /^jan(uary)?/i,
    february: /^feb(ruary)?/i,
    march: /^mar(ch)?/i,
    april: /^apr(il)?/i,
    may: /^may/i,
    june: /^june?/i,
    july: /^july?/i,
    august: /^aug(ust)?/i,
    september: /^sep(t(ember)?)?/i,
    october: /^oct(ober)?/i,
    november: /^nov(ember)?/i,
    december: /^dec(ember)?/i,
    comma: /^(,\s*|(and|or)\s*)+/i
  }
};
var i18n_default = ENGLISH;

// node_modules/rrule/dist/esm/nlp/totext.js
var contains = function(arr, val) {
  return arr.indexOf(val) !== -1;
};
var defaultGetText = function(id) {
  return id.toString();
};
var defaultDateFormatter = function(year, month, day) {
  return "".concat(month, " ").concat(day, ", ").concat(year);
};
var ToText = (
  /** @class */
  (function() {
    function ToText2(rrule, gettext, language, dateFormatter) {
      if (gettext === void 0) {
        gettext = defaultGetText;
      }
      if (language === void 0) {
        language = i18n_default;
      }
      if (dateFormatter === void 0) {
        dateFormatter = defaultDateFormatter;
      }
      this.text = [];
      this.language = language || i18n_default;
      this.gettext = gettext;
      this.dateFormatter = dateFormatter;
      this.rrule = rrule;
      this.options = rrule.options;
      this.origOptions = rrule.origOptions;
      if (this.origOptions.bymonthday) {
        var bymonthday = [].concat(this.options.bymonthday);
        var bynmonthday = [].concat(this.options.bynmonthday);
        bymonthday.sort(function(a, b) {
          return a - b;
        });
        bynmonthday.sort(function(a, b) {
          return b - a;
        });
        this.bymonthday = bymonthday.concat(bynmonthday);
        if (!this.bymonthday.length)
          this.bymonthday = null;
      }
      if (isPresent(this.origOptions.byweekday)) {
        var byweekday = !isArray(this.origOptions.byweekday) ? [this.origOptions.byweekday] : this.origOptions.byweekday;
        var days = String(byweekday);
        this.byweekday = {
          allWeeks: byweekday.filter(function(weekday) {
            return !weekday.n;
          }),
          someWeeks: byweekday.filter(function(weekday) {
            return Boolean(weekday.n);
          }),
          isWeekdays: days.indexOf("MO") !== -1 && days.indexOf("TU") !== -1 && days.indexOf("WE") !== -1 && days.indexOf("TH") !== -1 && days.indexOf("FR") !== -1 && days.indexOf("SA") === -1 && days.indexOf("SU") === -1,
          isEveryDay: days.indexOf("MO") !== -1 && days.indexOf("TU") !== -1 && days.indexOf("WE") !== -1 && days.indexOf("TH") !== -1 && days.indexOf("FR") !== -1 && days.indexOf("SA") !== -1 && days.indexOf("SU") !== -1
        };
        var sortWeekDays = function(a, b) {
          return a.weekday - b.weekday;
        };
        this.byweekday.allWeeks.sort(sortWeekDays);
        this.byweekday.someWeeks.sort(sortWeekDays);
        if (!this.byweekday.allWeeks.length)
          this.byweekday.allWeeks = null;
        if (!this.byweekday.someWeeks.length)
          this.byweekday.someWeeks = null;
      } else {
        this.byweekday = null;
      }
    }
    ToText2.isFullyConvertible = function(rrule) {
      var canConvert = true;
      if (!(rrule.options.freq in ToText2.IMPLEMENTED))
        return false;
      if (rrule.origOptions.until && rrule.origOptions.count)
        return false;
      for (var key in rrule.origOptions) {
        if (contains(["dtstart", "tzid", "wkst", "freq"], key))
          return true;
        if (!contains(ToText2.IMPLEMENTED[rrule.options.freq], key))
          return false;
      }
      return canConvert;
    };
    ToText2.prototype.isFullyConvertible = function() {
      return ToText2.isFullyConvertible(this.rrule);
    };
    ToText2.prototype.toString = function() {
      var gettext = this.gettext;
      if (!(this.options.freq in ToText2.IMPLEMENTED)) {
        return gettext("RRule error: Unable to fully convert this rrule to text");
      }
      this.text = [gettext("every")];
      this[RRule.FREQUENCIES[this.options.freq]]();
      if (this.options.until) {
        this.add(gettext("until"));
        var until = this.options.until;
        this.add(this.dateFormatter(until.getUTCFullYear(), this.language.monthNames[until.getUTCMonth()], until.getUTCDate()));
      } else if (this.options.count) {
        this.add(gettext("for")).add(this.options.count.toString()).add(this.plural(this.options.count) ? gettext("times") : gettext("time"));
      }
      if (!this.isFullyConvertible())
        this.add(gettext("(~ approximate)"));
      return this.text.join("");
    };
    ToText2.prototype.HOURLY = function() {
      var gettext = this.gettext;
      if (this.options.interval !== 1)
        this.add(this.options.interval.toString());
      this.add(this.plural(this.options.interval) ? gettext("hours") : gettext("hour"));
    };
    ToText2.prototype.MINUTELY = function() {
      var gettext = this.gettext;
      if (this.options.interval !== 1)
        this.add(this.options.interval.toString());
      this.add(this.plural(this.options.interval) ? gettext("minutes") : gettext("minute"));
    };
    ToText2.prototype.DAILY = function() {
      var gettext = this.gettext;
      if (this.options.interval !== 1)
        this.add(this.options.interval.toString());
      if (this.byweekday && this.byweekday.isWeekdays) {
        this.add(this.plural(this.options.interval) ? gettext("weekdays") : gettext("weekday"));
      } else {
        this.add(this.plural(this.options.interval) ? gettext("days") : gettext("day"));
      }
      if (this.origOptions.bymonth) {
        this.add(gettext("in"));
        this._bymonth();
      }
      if (this.bymonthday) {
        this._bymonthday();
      } else if (this.byweekday) {
        this._byweekday();
      } else if (this.origOptions.byhour) {
        this._byhour();
      }
    };
    ToText2.prototype.WEEKLY = function() {
      var gettext = this.gettext;
      if (this.options.interval !== 1) {
        this.add(this.options.interval.toString()).add(this.plural(this.options.interval) ? gettext("weeks") : gettext("week"));
      }
      if (this.byweekday && this.byweekday.isWeekdays) {
        if (this.options.interval === 1) {
          this.add(this.plural(this.options.interval) ? gettext("weekdays") : gettext("weekday"));
        } else {
          this.add(gettext("on")).add(gettext("weekdays"));
        }
      } else if (this.byweekday && this.byweekday.isEveryDay) {
        this.add(this.plural(this.options.interval) ? gettext("days") : gettext("day"));
      } else {
        if (this.options.interval === 1)
          this.add(gettext("week"));
        if (this.origOptions.bymonth) {
          this.add(gettext("in"));
          this._bymonth();
        }
        if (this.bymonthday) {
          this._bymonthday();
        } else if (this.byweekday) {
          this._byweekday();
        }
        if (this.origOptions.byhour) {
          this._byhour();
        }
      }
    };
    ToText2.prototype.MONTHLY = function() {
      var gettext = this.gettext;
      if (this.origOptions.bymonth) {
        if (this.options.interval !== 1) {
          this.add(this.options.interval.toString()).add(gettext("months"));
          if (this.plural(this.options.interval))
            this.add(gettext("in"));
        } else {
        }
        this._bymonth();
      } else {
        if (this.options.interval !== 1) {
          this.add(this.options.interval.toString());
        }
        this.add(this.plural(this.options.interval) ? gettext("months") : gettext("month"));
      }
      if (this.bymonthday) {
        this._bymonthday();
      } else if (this.byweekday && this.byweekday.isWeekdays) {
        this.add(gettext("on")).add(gettext("weekdays"));
      } else if (this.byweekday) {
        this._byweekday();
      }
    };
    ToText2.prototype.YEARLY = function() {
      var gettext = this.gettext;
      if (this.origOptions.bymonth) {
        if (this.options.interval !== 1) {
          this.add(this.options.interval.toString());
          this.add(gettext("years"));
        } else {
        }
        this._bymonth();
      } else {
        if (this.options.interval !== 1) {
          this.add(this.options.interval.toString());
        }
        this.add(this.plural(this.options.interval) ? gettext("years") : gettext("year"));
      }
      if (this.bymonthday) {
        this._bymonthday();
      } else if (this.byweekday) {
        this._byweekday();
      }
      if (this.options.byyearday) {
        this.add(gettext("on the")).add(this.list(this.options.byyearday, this.nth, gettext("and"))).add(gettext("day"));
      }
      if (this.options.byweekno) {
        this.add(gettext("in")).add(this.plural(this.options.byweekno.length) ? gettext("weeks") : gettext("week")).add(this.list(this.options.byweekno, void 0, gettext("and")));
      }
    };
    ToText2.prototype._bymonthday = function() {
      var gettext = this.gettext;
      if (this.byweekday && this.byweekday.allWeeks) {
        this.add(gettext("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext, gettext("or"))).add(gettext("the")).add(this.list(this.bymonthday, this.nth, gettext("or")));
      } else {
        this.add(gettext("on the")).add(this.list(this.bymonthday, this.nth, gettext("and")));
      }
    };
    ToText2.prototype._byweekday = function() {
      var gettext = this.gettext;
      if (this.byweekday.allWeeks && !this.byweekday.isWeekdays) {
        this.add(gettext("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext));
      }
      if (this.byweekday.someWeeks) {
        if (this.byweekday.allWeeks)
          this.add(gettext("and"));
        this.add(gettext("on the")).add(this.list(this.byweekday.someWeeks, this.weekdaytext, gettext("and")));
      }
    };
    ToText2.prototype._byhour = function() {
      var gettext = this.gettext;
      this.add(gettext("at")).add(this.list(this.origOptions.byhour, void 0, gettext("and")));
    };
    ToText2.prototype._bymonth = function() {
      this.add(this.list(this.options.bymonth, this.monthtext, this.gettext("and")));
    };
    ToText2.prototype.nth = function(n) {
      n = parseInt(n.toString(), 10);
      var nth;
      var gettext = this.gettext;
      if (n === -1)
        return gettext("last");
      var npos = Math.abs(n);
      switch (npos) {
        case 1:
        case 21:
        case 31:
          nth = npos + gettext("st");
          break;
        case 2:
        case 22:
          nth = npos + gettext("nd");
          break;
        case 3:
        case 23:
          nth = npos + gettext("rd");
          break;
        default:
          nth = npos + gettext("th");
      }
      return n < 0 ? nth + " " + gettext("last") : nth;
    };
    ToText2.prototype.monthtext = function(m) {
      return this.language.monthNames[m - 1];
    };
    ToText2.prototype.weekdaytext = function(wday) {
      var weekday = isNumber(wday) ? (wday + 1) % 7 : wday.getJsWeekday();
      return (wday.n ? this.nth(wday.n) + " " : "") + this.language.dayNames[weekday];
    };
    ToText2.prototype.plural = function(n) {
      return n % 100 !== 1;
    };
    ToText2.prototype.add = function(s) {
      this.text.push(" ");
      this.text.push(s);
      return this;
    };
    ToText2.prototype.list = function(arr, callback, finalDelim, delim) {
      var _this = this;
      if (delim === void 0) {
        delim = ",";
      }
      if (!isArray(arr)) {
        arr = [arr];
      }
      var delimJoin = function(array, delimiter, finalDelimiter) {
        var list = "";
        for (var i = 0; i < array.length; i++) {
          if (i !== 0) {
            if (i === array.length - 1) {
              list += " " + finalDelimiter + " ";
            } else {
              list += delimiter + " ";
            }
          }
          list += array[i];
        }
        return list;
      };
      callback = callback || function(o) {
        return o.toString();
      };
      var realCallback = function(arg) {
        return callback && callback.call(_this, arg);
      };
      if (finalDelim) {
        return delimJoin(arr.map(realCallback), delim, finalDelim);
      } else {
        return arr.map(realCallback).join(delim + " ");
      }
    };
    return ToText2;
  })()
);
var totext_default = ToText;

// node_modules/rrule/dist/esm/nlp/parsetext.js
var Parser = (
  /** @class */
  (function() {
    function Parser2(rules) {
      this.done = true;
      this.rules = rules;
    }
    Parser2.prototype.start = function(text) {
      this.text = text;
      this.done = false;
      return this.nextSymbol();
    };
    Parser2.prototype.isDone = function() {
      return this.done && this.symbol === null;
    };
    Parser2.prototype.nextSymbol = function() {
      var best;
      var bestSymbol;
      this.symbol = null;
      this.value = null;
      do {
        if (this.done)
          return false;
        var rule = void 0;
        best = null;
        for (var name_1 in this.rules) {
          rule = this.rules[name_1];
          var match = rule.exec(this.text);
          if (match) {
            if (best === null || match[0].length > best[0].length) {
              best = match;
              bestSymbol = name_1;
            }
          }
        }
        if (best != null) {
          this.text = this.text.substr(best[0].length);
          if (this.text === "")
            this.done = true;
        }
        if (best == null) {
          this.done = true;
          this.symbol = null;
          this.value = null;
          return;
        }
      } while (bestSymbol === "SKIP");
      this.symbol = bestSymbol;
      this.value = best;
      return true;
    };
    Parser2.prototype.accept = function(name) {
      if (this.symbol === name) {
        if (this.value) {
          var v = this.value;
          this.nextSymbol();
          return v;
        }
        this.nextSymbol();
        return true;
      }
      return false;
    };
    Parser2.prototype.acceptNumber = function() {
      return this.accept("number");
    };
    Parser2.prototype.expect = function(name) {
      if (this.accept(name))
        return true;
      throw new Error("expected " + name + " but found " + this.symbol);
    };
    return Parser2;
  })()
);
function parseText(text, language) {
  if (language === void 0) {
    language = i18n_default;
  }
  var options = {};
  var ttr = new Parser(language.tokens);
  if (!ttr.start(text))
    return null;
  S();
  return options;
  function S() {
    ttr.expect("every");
    var n = ttr.acceptNumber();
    if (n)
      options.interval = parseInt(n[0], 10);
    if (ttr.isDone())
      throw new Error("Unexpected end");
    switch (ttr.symbol) {
      case "day(s)":
        options.freq = RRule.DAILY;
        if (ttr.nextSymbol()) {
          AT();
          F();
        }
        break;
      // FIXME Note: every 2 weekdays != every two weeks on weekdays.
      // DAILY on weekdays is not a valid rule
      case "weekday(s)":
        options.freq = RRule.WEEKLY;
        options.byweekday = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR];
        ttr.nextSymbol();
        AT();
        F();
        break;
      case "week(s)":
        options.freq = RRule.WEEKLY;
        if (ttr.nextSymbol()) {
          ON();
          AT();
          F();
        }
        break;
      case "hour(s)":
        options.freq = RRule.HOURLY;
        if (ttr.nextSymbol()) {
          ON();
          F();
        }
        break;
      case "minute(s)":
        options.freq = RRule.MINUTELY;
        if (ttr.nextSymbol()) {
          ON();
          F();
        }
        break;
      case "month(s)":
        options.freq = RRule.MONTHLY;
        if (ttr.nextSymbol()) {
          ON();
          F();
        }
        break;
      case "year(s)":
        options.freq = RRule.YEARLY;
        if (ttr.nextSymbol()) {
          ON();
          F();
        }
        break;
      case "monday":
      case "tuesday":
      case "wednesday":
      case "thursday":
      case "friday":
      case "saturday":
      case "sunday":
        options.freq = RRule.WEEKLY;
        var key = ttr.symbol.substr(0, 2).toUpperCase();
        options.byweekday = [RRule[key]];
        if (!ttr.nextSymbol())
          return;
        while (ttr.accept("comma")) {
          if (ttr.isDone())
            throw new Error("Unexpected end");
          var wkd = decodeWKD();
          if (!wkd) {
            throw new Error("Unexpected symbol " + ttr.symbol + ", expected weekday");
          }
          options.byweekday.push(RRule[wkd]);
          ttr.nextSymbol();
        }
        AT();
        MDAYs();
        F();
        break;
      case "january":
      case "february":
      case "march":
      case "april":
      case "may":
      case "june":
      case "july":
      case "august":
      case "september":
      case "october":
      case "november":
      case "december":
        options.freq = RRule.YEARLY;
        options.bymonth = [decodeM()];
        if (!ttr.nextSymbol())
          return;
        while (ttr.accept("comma")) {
          if (ttr.isDone())
            throw new Error("Unexpected end");
          var m = decodeM();
          if (!m) {
            throw new Error("Unexpected symbol " + ttr.symbol + ", expected month");
          }
          options.bymonth.push(m);
          ttr.nextSymbol();
        }
        ON();
        F();
        break;
      default:
        throw new Error("Unknown symbol");
    }
  }
  function ON() {
    var on = ttr.accept("on");
    var the = ttr.accept("the");
    if (!(on || the))
      return;
    do {
      var nth = decodeNTH();
      var wkd = decodeWKD();
      var m = decodeM();
      if (nth) {
        if (wkd) {
          ttr.nextSymbol();
          if (!options.byweekday)
            options.byweekday = [];
          options.byweekday.push(RRule[wkd].nth(nth));
        } else {
          if (!options.bymonthday)
            options.bymonthday = [];
          options.bymonthday.push(nth);
          ttr.accept("day(s)");
        }
      } else if (wkd) {
        ttr.nextSymbol();
        if (!options.byweekday)
          options.byweekday = [];
        options.byweekday.push(RRule[wkd]);
      } else if (ttr.symbol === "weekday(s)") {
        ttr.nextSymbol();
        if (!options.byweekday) {
          options.byweekday = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR];
        }
      } else if (ttr.symbol === "week(s)") {
        ttr.nextSymbol();
        var n = ttr.acceptNumber();
        if (!n) {
          throw new Error("Unexpected symbol " + ttr.symbol + ", expected week number");
        }
        options.byweekno = [parseInt(n[0], 10)];
        while (ttr.accept("comma")) {
          n = ttr.acceptNumber();
          if (!n) {
            throw new Error("Unexpected symbol " + ttr.symbol + "; expected monthday");
          }
          options.byweekno.push(parseInt(n[0], 10));
        }
      } else if (m) {
        ttr.nextSymbol();
        if (!options.bymonth)
          options.bymonth = [];
        options.bymonth.push(m);
      } else {
        return;
      }
    } while (ttr.accept("comma") || ttr.accept("the") || ttr.accept("on"));
  }
  function AT() {
    var at = ttr.accept("at");
    if (!at)
      return;
    do {
      var n = ttr.acceptNumber();
      if (!n) {
        throw new Error("Unexpected symbol " + ttr.symbol + ", expected hour");
      }
      options.byhour = [parseInt(n[0], 10)];
      while (ttr.accept("comma")) {
        n = ttr.acceptNumber();
        if (!n) {
          throw new Error("Unexpected symbol " + ttr.symbol + "; expected hour");
        }
        options.byhour.push(parseInt(n[0], 10));
      }
    } while (ttr.accept("comma") || ttr.accept("at"));
  }
  function decodeM() {
    switch (ttr.symbol) {
      case "january":
        return 1;
      case "february":
        return 2;
      case "march":
        return 3;
      case "april":
        return 4;
      case "may":
        return 5;
      case "june":
        return 6;
      case "july":
        return 7;
      case "august":
        return 8;
      case "september":
        return 9;
      case "october":
        return 10;
      case "november":
        return 11;
      case "december":
        return 12;
      default:
        return false;
    }
  }
  function decodeWKD() {
    switch (ttr.symbol) {
      case "monday":
      case "tuesday":
      case "wednesday":
      case "thursday":
      case "friday":
      case "saturday":
      case "sunday":
        return ttr.symbol.substr(0, 2).toUpperCase();
      default:
        return false;
    }
  }
  function decodeNTH() {
    switch (ttr.symbol) {
      case "last":
        ttr.nextSymbol();
        return -1;
      case "first":
        ttr.nextSymbol();
        return 1;
      case "second":
        ttr.nextSymbol();
        return ttr.accept("last") ? -2 : 2;
      case "third":
        ttr.nextSymbol();
        return ttr.accept("last") ? -3 : 3;
      case "nth":
        var v = parseInt(ttr.value[1], 10);
        if (v < -366 || v > 366)
          throw new Error("Nth out of range: " + v);
        ttr.nextSymbol();
        return ttr.accept("last") ? -v : v;
      default:
        return false;
    }
  }
  function MDAYs() {
    ttr.accept("on");
    ttr.accept("the");
    var nth = decodeNTH();
    if (!nth)
      return;
    options.bymonthday = [nth];
    ttr.nextSymbol();
    while (ttr.accept("comma")) {
      nth = decodeNTH();
      if (!nth) {
        throw new Error("Unexpected symbol " + ttr.symbol + "; expected monthday");
      }
      options.bymonthday.push(nth);
      ttr.nextSymbol();
    }
  }
  function F() {
    if (ttr.symbol === "until") {
      var date = Date.parse(ttr.text);
      if (!date)
        throw new Error("Cannot parse until date:" + ttr.text);
      options.until = new Date(date);
    } else if (ttr.accept("for")) {
      options.count = parseInt(ttr.value[0], 10);
      ttr.expect("number");
    }
  }
}

// node_modules/rrule/dist/esm/types.js
var Frequency;
(function(Frequency2) {
  Frequency2[Frequency2["YEARLY"] = 0] = "YEARLY";
  Frequency2[Frequency2["MONTHLY"] = 1] = "MONTHLY";
  Frequency2[Frequency2["WEEKLY"] = 2] = "WEEKLY";
  Frequency2[Frequency2["DAILY"] = 3] = "DAILY";
  Frequency2[Frequency2["HOURLY"] = 4] = "HOURLY";
  Frequency2[Frequency2["MINUTELY"] = 5] = "MINUTELY";
  Frequency2[Frequency2["SECONDLY"] = 6] = "SECONDLY";
})(Frequency || (Frequency = {}));
function freqIsDailyOrGreater(freq) {
  return freq < Frequency.HOURLY;
}

// node_modules/rrule/dist/esm/nlp/index.js
var fromText = function(text, language) {
  if (language === void 0) {
    language = i18n_default;
  }
  return new RRule(parseText(text, language) || void 0);
};
var common = [
  "count",
  "until",
  "interval",
  "byweekday",
  "bymonthday",
  "bymonth"
];
totext_default.IMPLEMENTED = [];
totext_default.IMPLEMENTED[Frequency.HOURLY] = common;
totext_default.IMPLEMENTED[Frequency.MINUTELY] = common;
totext_default.IMPLEMENTED[Frequency.DAILY] = ["byhour"].concat(common);
totext_default.IMPLEMENTED[Frequency.WEEKLY] = common;
totext_default.IMPLEMENTED[Frequency.MONTHLY] = common;
totext_default.IMPLEMENTED[Frequency.YEARLY] = ["byweekno", "byyearday"].concat(common);
var toText = function(rrule, gettext, language, dateFormatter) {
  return new totext_default(rrule, gettext, language, dateFormatter).toString();
};
var isFullyConvertible = totext_default.isFullyConvertible;

// node_modules/rrule/dist/esm/datetime.js
var Time = (
  /** @class */
  (function() {
    function Time3(hour, minute, second, millisecond) {
      this.hour = hour;
      this.minute = minute;
      this.second = second;
      this.millisecond = millisecond || 0;
    }
    Time3.prototype.getHours = function() {
      return this.hour;
    };
    Time3.prototype.getMinutes = function() {
      return this.minute;
    };
    Time3.prototype.getSeconds = function() {
      return this.second;
    };
    Time3.prototype.getMilliseconds = function() {
      return this.millisecond;
    };
    Time3.prototype.getTime = function() {
      return (this.hour * 60 * 60 + this.minute * 60 + this.second) * 1e3 + this.millisecond;
    };
    return Time3;
  })()
);
var DateTime = (
  /** @class */
  (function(_super) {
    __extends(DateTime2, _super);
    function DateTime2(year, month, day, hour, minute, second, millisecond) {
      var _this = _super.call(this, hour, minute, second, millisecond) || this;
      _this.year = year;
      _this.month = month;
      _this.day = day;
      return _this;
    }
    DateTime2.fromDate = function(date) {
      return new this(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.valueOf() % 1e3);
    };
    DateTime2.prototype.getWeekday = function() {
      return getWeekday(new Date(this.getTime()));
    };
    DateTime2.prototype.getTime = function() {
      return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond)).getTime();
    };
    DateTime2.prototype.getDay = function() {
      return this.day;
    };
    DateTime2.prototype.getMonth = function() {
      return this.month;
    };
    DateTime2.prototype.getYear = function() {
      return this.year;
    };
    DateTime2.prototype.addYears = function(years) {
      this.year += years;
    };
    DateTime2.prototype.addMonths = function(months) {
      this.month += months;
      if (this.month > 12) {
        var yearDiv = Math.floor(this.month / 12);
        var monthMod = pymod(this.month, 12);
        this.month = monthMod;
        this.year += yearDiv;
        if (this.month === 0) {
          this.month = 12;
          --this.year;
        }
      }
    };
    DateTime2.prototype.addWeekly = function(days, wkst) {
      if (wkst > this.getWeekday()) {
        this.day += -(this.getWeekday() + 1 + (6 - wkst)) + days * 7;
      } else {
        this.day += -(this.getWeekday() - wkst) + days * 7;
      }
      this.fixDay();
    };
    DateTime2.prototype.addDaily = function(days) {
      this.day += days;
      this.fixDay();
    };
    DateTime2.prototype.addHours = function(hours, filtered, byhour) {
      if (filtered) {
        this.hour += Math.floor((23 - this.hour) / hours) * hours;
      }
      for (; ; ) {
        this.hour += hours;
        var _a = divmod(this.hour, 24), dayDiv = _a.div, hourMod = _a.mod;
        if (dayDiv) {
          this.hour = hourMod;
          this.addDaily(dayDiv);
        }
        if (empty(byhour) || includes(byhour, this.hour))
          break;
      }
    };
    DateTime2.prototype.addMinutes = function(minutes, filtered, byhour, byminute) {
      if (filtered) {
        this.minute += Math.floor((1439 - (this.hour * 60 + this.minute)) / minutes) * minutes;
      }
      for (; ; ) {
        this.minute += minutes;
        var _a = divmod(this.minute, 60), hourDiv = _a.div, minuteMod = _a.mod;
        if (hourDiv) {
          this.minute = minuteMod;
          this.addHours(hourDiv, false, byhour);
        }
        if ((empty(byhour) || includes(byhour, this.hour)) && (empty(byminute) || includes(byminute, this.minute))) {
          break;
        }
      }
    };
    DateTime2.prototype.addSeconds = function(seconds, filtered, byhour, byminute, bysecond) {
      if (filtered) {
        this.second += Math.floor((86399 - (this.hour * 3600 + this.minute * 60 + this.second)) / seconds) * seconds;
      }
      for (; ; ) {
        this.second += seconds;
        var _a = divmod(this.second, 60), minuteDiv = _a.div, secondMod = _a.mod;
        if (minuteDiv) {
          this.second = secondMod;
          this.addMinutes(minuteDiv, false, byhour, byminute);
        }
        if ((empty(byhour) || includes(byhour, this.hour)) && (empty(byminute) || includes(byminute, this.minute)) && (empty(bysecond) || includes(bysecond, this.second))) {
          break;
        }
      }
    };
    DateTime2.prototype.fixDay = function() {
      if (this.day <= 28) {
        return;
      }
      var daysinmonth = monthRange(this.year, this.month - 1)[1];
      if (this.day <= daysinmonth) {
        return;
      }
      while (this.day > daysinmonth) {
        this.day -= daysinmonth;
        ++this.month;
        if (this.month === 13) {
          this.month = 1;
          ++this.year;
          if (this.year > MAXYEAR) {
            return;
          }
        }
        daysinmonth = monthRange(this.year, this.month - 1)[1];
      }
    };
    DateTime2.prototype.add = function(options, filtered) {
      var freq = options.freq, interval = options.interval, wkst = options.wkst, byhour = options.byhour, byminute = options.byminute, bysecond = options.bysecond;
      switch (freq) {
        case Frequency.YEARLY:
          return this.addYears(interval);
        case Frequency.MONTHLY:
          return this.addMonths(interval);
        case Frequency.WEEKLY:
          return this.addWeekly(interval, wkst);
        case Frequency.DAILY:
          return this.addDaily(interval);
        case Frequency.HOURLY:
          return this.addHours(interval, filtered, byhour);
        case Frequency.MINUTELY:
          return this.addMinutes(interval, filtered, byhour, byminute);
        case Frequency.SECONDLY:
          return this.addSeconds(interval, filtered, byhour, byminute, bysecond);
      }
    };
    return DateTime2;
  })(Time)
);

// node_modules/rrule/dist/esm/parseoptions.js
function initializeOptions(options) {
  var invalid = [];
  var keys = Object.keys(options);
  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i];
    if (!includes(defaultKeys, key))
      invalid.push(key);
    if (isDate(options[key]) && !isValidDate(options[key])) {
      invalid.push(key);
    }
  }
  if (invalid.length) {
    throw new Error("Invalid options: " + invalid.join(", "));
  }
  return __assign({}, options);
}
function parseOptions(options) {
  var opts = __assign(__assign({}, DEFAULT_OPTIONS), initializeOptions(options));
  if (isPresent(opts.byeaster))
    opts.freq = RRule.YEARLY;
  if (!(isPresent(opts.freq) && RRule.FREQUENCIES[opts.freq])) {
    throw new Error("Invalid frequency: ".concat(opts.freq, " ").concat(options.freq));
  }
  if (!opts.dtstart)
    opts.dtstart = new Date((/* @__PURE__ */ new Date()).setMilliseconds(0));
  if (!isPresent(opts.wkst)) {
    opts.wkst = RRule.MO.weekday;
  } else if (isNumber(opts.wkst)) {
  } else {
    opts.wkst = opts.wkst.weekday;
  }
  if (isPresent(opts.bysetpos)) {
    if (isNumber(opts.bysetpos))
      opts.bysetpos = [opts.bysetpos];
    for (var i = 0; i < opts.bysetpos.length; i++) {
      var v = opts.bysetpos[i];
      if (v === 0 || !(v >= -366 && v <= 366)) {
        throw new Error("bysetpos must be between 1 and 366, or between -366 and -1");
      }
    }
  }
  if (!(Boolean(opts.byweekno) || notEmpty(opts.byweekno) || notEmpty(opts.byyearday) || Boolean(opts.bymonthday) || notEmpty(opts.bymonthday) || isPresent(opts.byweekday) || isPresent(opts.byeaster))) {
    switch (opts.freq) {
      case RRule.YEARLY:
        if (!opts.bymonth)
          opts.bymonth = opts.dtstart.getUTCMonth() + 1;
        opts.bymonthday = opts.dtstart.getUTCDate();
        break;
      case RRule.MONTHLY:
        opts.bymonthday = opts.dtstart.getUTCDate();
        break;
      case RRule.WEEKLY:
        opts.byweekday = [getWeekday(opts.dtstart)];
        break;
    }
  }
  if (isPresent(opts.bymonth) && !isArray(opts.bymonth)) {
    opts.bymonth = [opts.bymonth];
  }
  if (isPresent(opts.byyearday) && !isArray(opts.byyearday) && isNumber(opts.byyearday)) {
    opts.byyearday = [opts.byyearday];
  }
  if (!isPresent(opts.bymonthday)) {
    opts.bymonthday = [];
    opts.bynmonthday = [];
  } else if (isArray(opts.bymonthday)) {
    var bymonthday = [];
    var bynmonthday = [];
    for (var i = 0; i < opts.bymonthday.length; i++) {
      var v = opts.bymonthday[i];
      if (v > 0) {
        bymonthday.push(v);
      } else if (v < 0) {
        bynmonthday.push(v);
      }
    }
    opts.bymonthday = bymonthday;
    opts.bynmonthday = bynmonthday;
  } else if (opts.bymonthday < 0) {
    opts.bynmonthday = [opts.bymonthday];
    opts.bymonthday = [];
  } else {
    opts.bynmonthday = [];
    opts.bymonthday = [opts.bymonthday];
  }
  if (isPresent(opts.byweekno) && !isArray(opts.byweekno)) {
    opts.byweekno = [opts.byweekno];
  }
  if (!isPresent(opts.byweekday)) {
    opts.bynweekday = null;
  } else if (isNumber(opts.byweekday)) {
    opts.byweekday = [opts.byweekday];
    opts.bynweekday = null;
  } else if (isWeekdayStr(opts.byweekday)) {
    opts.byweekday = [Weekday.fromStr(opts.byweekday).weekday];
    opts.bynweekday = null;
  } else if (opts.byweekday instanceof Weekday) {
    if (!opts.byweekday.n || opts.freq > RRule.MONTHLY) {
      opts.byweekday = [opts.byweekday.weekday];
      opts.bynweekday = null;
    } else {
      opts.bynweekday = [[opts.byweekday.weekday, opts.byweekday.n]];
      opts.byweekday = null;
    }
  } else {
    var byweekday = [];
    var bynweekday = [];
    for (var i = 0; i < opts.byweekday.length; i++) {
      var wday = opts.byweekday[i];
      if (isNumber(wday)) {
        byweekday.push(wday);
        continue;
      } else if (isWeekdayStr(wday)) {
        byweekday.push(Weekday.fromStr(wday).weekday);
        continue;
      }
      if (!wday.n || opts.freq > RRule.MONTHLY) {
        byweekday.push(wday.weekday);
      } else {
        bynweekday.push([wday.weekday, wday.n]);
      }
    }
    opts.byweekday = notEmpty(byweekday) ? byweekday : null;
    opts.bynweekday = notEmpty(bynweekday) ? bynweekday : null;
  }
  if (!isPresent(opts.byhour)) {
    opts.byhour = opts.freq < RRule.HOURLY ? [opts.dtstart.getUTCHours()] : null;
  } else if (isNumber(opts.byhour)) {
    opts.byhour = [opts.byhour];
  }
  if (!isPresent(opts.byminute)) {
    opts.byminute = opts.freq < RRule.MINUTELY ? [opts.dtstart.getUTCMinutes()] : null;
  } else if (isNumber(opts.byminute)) {
    opts.byminute = [opts.byminute];
  }
  if (!isPresent(opts.bysecond)) {
    opts.bysecond = opts.freq < RRule.SECONDLY ? [opts.dtstart.getUTCSeconds()] : null;
  } else if (isNumber(opts.bysecond)) {
    opts.bysecond = [opts.bysecond];
  }
  return { parsedOptions: opts };
}
function buildTimeset(opts) {
  var millisecondModulo = opts.dtstart.getTime() % 1e3;
  if (!freqIsDailyOrGreater(opts.freq)) {
    return [];
  }
  var timeset = [];
  opts.byhour.forEach(function(hour) {
    opts.byminute.forEach(function(minute) {
      opts.bysecond.forEach(function(second) {
        timeset.push(new Time(hour, minute, second, millisecondModulo));
      });
    });
  });
  return timeset;
}

// node_modules/rrule/dist/esm/parsestring.js
function parseString(rfcString) {
  var options = rfcString.split("\n").map(parseLine).filter(function(x) {
    return x !== null;
  });
  return __assign(__assign({}, options[0]), options[1]);
}
function parseDtstart(line) {
  var options = {};
  var dtstartWithZone = /DTSTART(?:;TZID=([^:=]+?))?(?::|=)([^;\s]+)/i.exec(line);
  if (!dtstartWithZone) {
    return options;
  }
  var tzid = dtstartWithZone[1], dtstart = dtstartWithZone[2];
  if (tzid) {
    options.tzid = tzid;
  }
  options.dtstart = untilStringToDate(dtstart);
  return options;
}
function parseLine(rfcString) {
  rfcString = rfcString.replace(/^\s+|\s+$/, "");
  if (!rfcString.length)
    return null;
  var header = /^([A-Z]+?)[:;]/.exec(rfcString.toUpperCase());
  if (!header) {
    return parseRrule(rfcString);
  }
  var key = header[1];
  switch (key.toUpperCase()) {
    case "RRULE":
    case "EXRULE":
      return parseRrule(rfcString);
    case "DTSTART":
      return parseDtstart(rfcString);
    default:
      throw new Error("Unsupported RFC prop ".concat(key, " in ").concat(rfcString));
  }
}
function parseRrule(line) {
  var strippedLine = line.replace(/^RRULE:/i, "");
  var options = parseDtstart(strippedLine);
  var attrs = line.replace(/^(?:RRULE|EXRULE):/i, "").split(";");
  attrs.forEach(function(attr) {
    var _a = attr.split("="), key = _a[0], value = _a[1];
    switch (key.toUpperCase()) {
      case "FREQ":
        options.freq = Frequency[value.toUpperCase()];
        break;
      case "WKST":
        options.wkst = Days[value.toUpperCase()];
        break;
      case "COUNT":
      case "INTERVAL":
      case "BYSETPOS":
      case "BYMONTH":
      case "BYMONTHDAY":
      case "BYYEARDAY":
      case "BYWEEKNO":
      case "BYHOUR":
      case "BYMINUTE":
      case "BYSECOND":
        var num2 = parseNumber(value);
        var optionKey = key.toLowerCase();
        options[optionKey] = num2;
        break;
      case "BYWEEKDAY":
      case "BYDAY":
        options.byweekday = parseWeekday(value);
        break;
      case "DTSTART":
      case "TZID":
        var dtstart = parseDtstart(line);
        options.tzid = dtstart.tzid;
        options.dtstart = dtstart.dtstart;
        break;
      case "UNTIL":
        options.until = untilStringToDate(value);
        break;
      case "BYEASTER":
        options.byeaster = Number(value);
        break;
      default:
        throw new Error("Unknown RRULE property '" + key + "'");
    }
  });
  return options;
}
function parseNumber(value) {
  if (value.indexOf(",") !== -1) {
    var values = value.split(",");
    return values.map(parseIndividualNumber);
  }
  return parseIndividualNumber(value);
}
function parseIndividualNumber(value) {
  if (/^[+-]?\d+$/.test(value)) {
    return Number(value);
  }
  return value;
}
function parseWeekday(value) {
  var days = value.split(",");
  return days.map(function(day) {
    if (day.length === 2) {
      return Days[day];
    }
    var parts = day.match(/^([+-]?\d{1,2})([A-Z]{2})$/);
    if (!parts || parts.length < 3) {
      throw new SyntaxError("Invalid weekday string: ".concat(day));
    }
    var n = Number(parts[1]);
    var wdaypart = parts[2];
    var wday = Days[wdaypart].weekday;
    return new Weekday(wday, n);
  });
}

// node_modules/rrule/dist/esm/datewithzone.js
var DateWithZone = (
  /** @class */
  (function() {
    function DateWithZone2(date, tzid) {
      if (isNaN(date.getTime())) {
        throw new RangeError("Invalid date passed to DateWithZone");
      }
      this.date = date;
      this.tzid = tzid;
    }
    Object.defineProperty(DateWithZone2.prototype, "isUTC", {
      get: function() {
        return !this.tzid || this.tzid.toUpperCase() === "UTC";
      },
      enumerable: false,
      configurable: true
    });
    DateWithZone2.prototype.toString = function() {
      var datestr = timeToUntilString(this.date.getTime(), this.isUTC);
      if (!this.isUTC) {
        return ";TZID=".concat(this.tzid, ":").concat(datestr);
      }
      return ":".concat(datestr);
    };
    DateWithZone2.prototype.getTime = function() {
      return this.date.getTime();
    };
    DateWithZone2.prototype.rezonedDate = function() {
      if (this.isUTC) {
        return this.date;
      }
      return dateInTimeZone(this.date, this.tzid);
    };
    return DateWithZone2;
  })()
);

// node_modules/rrule/dist/esm/optionstostring.js
function optionsToString(options) {
  var rrule = [];
  var dtstart = "";
  var keys = Object.keys(options);
  var defaultKeys2 = Object.keys(DEFAULT_OPTIONS);
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] === "tzid")
      continue;
    if (!includes(defaultKeys2, keys[i]))
      continue;
    var key = keys[i].toUpperCase();
    var value = options[keys[i]];
    var outValue = "";
    if (!isPresent(value) || isArray(value) && !value.length)
      continue;
    switch (key) {
      case "FREQ":
        outValue = RRule.FREQUENCIES[options.freq];
        break;
      case "WKST":
        if (isNumber(value)) {
          outValue = new Weekday(value).toString();
        } else {
          outValue = value.toString();
        }
        break;
      case "BYWEEKDAY":
        key = "BYDAY";
        outValue = toArray(value).map(function(wday) {
          if (wday instanceof Weekday) {
            return wday;
          }
          if (isArray(wday)) {
            return new Weekday(wday[0], wday[1]);
          }
          return new Weekday(wday);
        }).toString();
        break;
      case "DTSTART":
        dtstart = buildDtstart(value, options.tzid);
        break;
      case "UNTIL":
        outValue = timeToUntilString(value, !options.tzid);
        break;
      default:
        if (isArray(value)) {
          var strValues = [];
          for (var j = 0; j < value.length; j++) {
            strValues[j] = String(value[j]);
          }
          outValue = strValues.toString();
        } else {
          outValue = String(value);
        }
    }
    if (outValue) {
      rrule.push([key, outValue]);
    }
  }
  var rules = rrule.map(function(_a) {
    var key2 = _a[0], value2 = _a[1];
    return "".concat(key2, "=").concat(value2.toString());
  }).join(";");
  var ruleString = "";
  if (rules !== "") {
    ruleString = "RRULE:".concat(rules);
  }
  return [dtstart, ruleString].filter(function(x) {
    return !!x;
  }).join("\n");
}
function buildDtstart(dtstart, tzid) {
  if (!dtstart) {
    return "";
  }
  return "DTSTART" + new DateWithZone(new Date(dtstart), tzid).toString();
}

// node_modules/rrule/dist/esm/cache.js
function argsMatch(left, right) {
  if (Array.isArray(left)) {
    if (!Array.isArray(right))
      return false;
    if (left.length !== right.length)
      return false;
    return left.every(function(date, i) {
      return date.getTime() === right[i].getTime();
    });
  }
  if (left instanceof Date) {
    return right instanceof Date && left.getTime() === right.getTime();
  }
  return left === right;
}
var Cache = (
  /** @class */
  (function() {
    function Cache2() {
      this.all = false;
      this.before = [];
      this.after = [];
      this.between = [];
    }
    Cache2.prototype._cacheAdd = function(what, value, args) {
      if (value) {
        value = value instanceof Date ? clone2(value) : cloneDates(value);
      }
      if (what === "all") {
        this.all = value;
      } else {
        args._value = value;
        this[what].push(args);
      }
    };
    Cache2.prototype._cacheGet = function(what, args) {
      var cached = false;
      var argsKeys = args ? Object.keys(args) : [];
      var findCacheDiff = function(item2) {
        for (var i2 = 0; i2 < argsKeys.length; i2++) {
          var key = argsKeys[i2];
          if (!argsMatch(args[key], item2[key])) {
            return true;
          }
        }
        return false;
      };
      var cachedObject = this[what];
      if (what === "all") {
        cached = this.all;
      } else if (isArray(cachedObject)) {
        for (var i = 0; i < cachedObject.length; i++) {
          var item = cachedObject[i];
          if (argsKeys.length && findCacheDiff(item))
            continue;
          cached = item._value;
          break;
        }
      }
      if (!cached && this.all) {
        var iterResult = new iterresult_default(what, args);
        for (var i = 0; i < this.all.length; i++) {
          if (!iterResult.accept(this.all[i]))
            break;
        }
        cached = iterResult.getValue();
        this._cacheAdd(what, cached, args);
      }
      return isArray(cached) ? cloneDates(cached) : cached instanceof Date ? clone2(cached) : cached;
    };
    return Cache2;
  })()
);

// node_modules/rrule/dist/esm/masks.js
var M365MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], repeat(1, 31), true), repeat(2, 28), true), repeat(3, 31), true), repeat(4, 30), true), repeat(5, 31), true), repeat(6, 30), true), repeat(7, 31), true), repeat(8, 31), true), repeat(9, 30), true), repeat(10, 31), true), repeat(11, 30), true), repeat(12, 31), true), repeat(1, 7), true);
var M366MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], repeat(1, 31), true), repeat(2, 29), true), repeat(3, 31), true), repeat(4, 30), true), repeat(5, 31), true), repeat(6, 30), true), repeat(7, 31), true), repeat(8, 31), true), repeat(9, 30), true), repeat(10, 31), true), repeat(11, 30), true), repeat(12, 31), true), repeat(1, 7), true);
var M28 = range(1, 29);
var M29 = range(1, 30);
var M30 = range(1, 31);
var M31 = range(1, 32);
var MDAY366MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], M31, true), M29, true), M31, true), M30, true), M31, true), M30, true), M31, true), M31, true), M30, true), M31, true), M30, true), M31, true), M31.slice(0, 7), true);
var MDAY365MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], M31, true), M28, true), M31, true), M30, true), M31, true), M30, true), M31, true), M31, true), M30, true), M31, true), M30, true), M31, true), M31.slice(0, 7), true);
var NM28 = range(-28, 0);
var NM29 = range(-29, 0);
var NM30 = range(-30, 0);
var NM31 = range(-31, 0);
var NMDAY366MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], NM31, true), NM29, true), NM31, true), NM30, true), NM31, true), NM30, true), NM31, true), NM31, true), NM30, true), NM31, true), NM30, true), NM31, true), NM31.slice(0, 7), true);
var NMDAY365MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], NM31, true), NM28, true), NM31, true), NM30, true), NM31, true), NM30, true), NM31, true), NM31, true), NM30, true), NM31, true), NM30, true), NM31, true), NM31.slice(0, 7), true);
var M366RANGE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
var M365RANGE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
var WDAYMASK = (function() {
  var wdaymask = [];
  for (var i = 0; i < 55; i++)
    wdaymask = wdaymask.concat(range(7));
  return wdaymask;
})();

// node_modules/rrule/dist/esm/iterinfo/yearinfo.js
function rebuildYear(year, options) {
  var firstyday = datetime(year, 1, 1);
  var yearlen = isLeapYear(year) ? 366 : 365;
  var nextyearlen = isLeapYear(year + 1) ? 366 : 365;
  var yearordinal = toOrdinal(firstyday);
  var yearweekday = getWeekday(firstyday);
  var result = __assign(__assign({ yearlen, nextyearlen, yearordinal, yearweekday }, baseYearMasks(year)), { wnomask: null });
  if (empty(options.byweekno)) {
    return result;
  }
  result.wnomask = repeat(0, yearlen + 7);
  var firstwkst;
  var wyearlen;
  var no1wkst = firstwkst = pymod(7 - yearweekday + options.wkst, 7);
  if (no1wkst >= 4) {
    no1wkst = 0;
    wyearlen = result.yearlen + pymod(yearweekday - options.wkst, 7);
  } else {
    wyearlen = yearlen - no1wkst;
  }
  var div = Math.floor(wyearlen / 7);
  var mod = pymod(wyearlen, 7);
  var numweeks = Math.floor(div + mod / 4);
  for (var j = 0; j < options.byweekno.length; j++) {
    var n = options.byweekno[j];
    if (n < 0) {
      n += numweeks + 1;
    }
    if (!(n > 0 && n <= numweeks)) {
      continue;
    }
    var i = void 0;
    if (n > 1) {
      i = no1wkst + (n - 1) * 7;
      if (no1wkst !== firstwkst) {
        i -= 7 - firstwkst;
      }
    } else {
      i = no1wkst;
    }
    for (var k = 0; k < 7; k++) {
      result.wnomask[i] = 1;
      i++;
      if (result.wdaymask[i] === options.wkst)
        break;
    }
  }
  if (includes(options.byweekno, 1)) {
    var i = no1wkst + numweeks * 7;
    if (no1wkst !== firstwkst)
      i -= 7 - firstwkst;
    if (i < yearlen) {
      for (var j = 0; j < 7; j++) {
        result.wnomask[i] = 1;
        i += 1;
        if (result.wdaymask[i] === options.wkst)
          break;
      }
    }
  }
  if (no1wkst) {
    var lnumweeks = void 0;
    if (!includes(options.byweekno, -1)) {
      var lyearweekday = getWeekday(datetime(year - 1, 1, 1));
      var lno1wkst = pymod(7 - lyearweekday.valueOf() + options.wkst, 7);
      var lyearlen = isLeapYear(year - 1) ? 366 : 365;
      var weekst = void 0;
      if (lno1wkst >= 4) {
        lno1wkst = 0;
        weekst = lyearlen + pymod(lyearweekday - options.wkst, 7);
      } else {
        weekst = yearlen - no1wkst;
      }
      lnumweeks = Math.floor(52 + pymod(weekst, 7) / 4);
    } else {
      lnumweeks = -1;
    }
    if (includes(options.byweekno, lnumweeks)) {
      for (var i = 0; i < no1wkst; i++)
        result.wnomask[i] = 1;
    }
  }
  return result;
}
function baseYearMasks(year) {
  var yearlen = isLeapYear(year) ? 366 : 365;
  var firstyday = datetime(year, 1, 1);
  var wday = getWeekday(firstyday);
  if (yearlen === 365) {
    return {
      mmask: M365MASK,
      mdaymask: MDAY365MASK,
      nmdaymask: NMDAY365MASK,
      wdaymask: WDAYMASK.slice(wday),
      mrange: M365RANGE
    };
  }
  return {
    mmask: M366MASK,
    mdaymask: MDAY366MASK,
    nmdaymask: NMDAY366MASK,
    wdaymask: WDAYMASK.slice(wday),
    mrange: M366RANGE
  };
}

// node_modules/rrule/dist/esm/iterinfo/monthinfo.js
function rebuildMonth(year, month, yearlen, mrange, wdaymask, options) {
  var result = {
    lastyear: year,
    lastmonth: month,
    nwdaymask: []
  };
  var ranges = [];
  if (options.freq === RRule.YEARLY) {
    if (empty(options.bymonth)) {
      ranges = [[0, yearlen]];
    } else {
      for (var j = 0; j < options.bymonth.length; j++) {
        month = options.bymonth[j];
        ranges.push(mrange.slice(month - 1, month + 1));
      }
    }
  } else if (options.freq === RRule.MONTHLY) {
    ranges = [mrange.slice(month - 1, month + 1)];
  }
  if (empty(ranges)) {
    return result;
  }
  result.nwdaymask = repeat(0, yearlen);
  for (var j = 0; j < ranges.length; j++) {
    var rang = ranges[j];
    var first = rang[0];
    var last = rang[1] - 1;
    for (var k = 0; k < options.bynweekday.length; k++) {
      var i = void 0;
      var _a = options.bynweekday[k], wday = _a[0], n = _a[1];
      if (n < 0) {
        i = last + (n + 1) * 7;
        i -= pymod(wdaymask[i] - wday, 7);
      } else {
        i = first + (n - 1) * 7;
        i += pymod(7 - wdaymask[i] + wday, 7);
      }
      if (first <= i && i <= last)
        result.nwdaymask[i] = 1;
    }
  }
  return result;
}

// node_modules/rrule/dist/esm/iterinfo/easter.js
function easter(y, offset) {
  if (offset === void 0) {
    offset = 0;
  }
  var a = y % 19;
  var b = Math.floor(y / 100);
  var c = y % 100;
  var d = Math.floor(b / 4);
  var e = b % 4;
  var f = Math.floor((b + 8) / 25);
  var g = Math.floor((b - f + 1) / 3);
  var h = Math.floor(19 * a + b - d - g + 15) % 30;
  var i = Math.floor(c / 4);
  var k = c % 4;
  var l = Math.floor(32 + 2 * e + 2 * i - h - k) % 7;
  var m = Math.floor((a + 11 * h + 22 * l) / 451);
  var month = Math.floor((h + l - 7 * m + 114) / 31);
  var day = (h + l - 7 * m + 114) % 31 + 1;
  var date = Date.UTC(y, month - 1, day + offset);
  var yearStart = Date.UTC(y, 0, 1);
  return [Math.ceil((date - yearStart) / (1e3 * 60 * 60 * 24))];
}

// node_modules/rrule/dist/esm/iterinfo/index.js
var Iterinfo = (
  /** @class */
  (function() {
    function Iterinfo2(options) {
      this.options = options;
    }
    Iterinfo2.prototype.rebuild = function(year, month) {
      var options = this.options;
      if (year !== this.lastyear) {
        this.yearinfo = rebuildYear(year, options);
      }
      if (notEmpty(options.bynweekday) && (month !== this.lastmonth || year !== this.lastyear)) {
        var _a = this.yearinfo, yearlen = _a.yearlen, mrange = _a.mrange, wdaymask = _a.wdaymask;
        this.monthinfo = rebuildMonth(year, month, yearlen, mrange, wdaymask, options);
      }
      if (isPresent(options.byeaster)) {
        this.eastermask = easter(year, options.byeaster);
      }
    };
    Object.defineProperty(Iterinfo2.prototype, "lastyear", {
      get: function() {
        return this.monthinfo ? this.monthinfo.lastyear : null;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Iterinfo2.prototype, "lastmonth", {
      get: function() {
        return this.monthinfo ? this.monthinfo.lastmonth : null;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Iterinfo2.prototype, "yearlen", {
      get: function() {
        return this.yearinfo.yearlen;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Iterinfo2.prototype, "yearordinal", {
      get: function() {
        return this.yearinfo.yearordinal;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Iterinfo2.prototype, "mrange", {
      get: function() {
        return this.yearinfo.mrange;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Iterinfo2.prototype, "wdaymask", {
      get: function() {
        return this.yearinfo.wdaymask;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Iterinfo2.prototype, "mmask", {
      get: function() {
        return this.yearinfo.mmask;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Iterinfo2.prototype, "wnomask", {
      get: function() {
        return this.yearinfo.wnomask;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Iterinfo2.prototype, "nwdaymask", {
      get: function() {
        return this.monthinfo ? this.monthinfo.nwdaymask : [];
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Iterinfo2.prototype, "nextyearlen", {
      get: function() {
        return this.yearinfo.nextyearlen;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Iterinfo2.prototype, "mdaymask", {
      get: function() {
        return this.yearinfo.mdaymask;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Iterinfo2.prototype, "nmdaymask", {
      get: function() {
        return this.yearinfo.nmdaymask;
      },
      enumerable: false,
      configurable: true
    });
    Iterinfo2.prototype.ydayset = function() {
      return [range(this.yearlen), 0, this.yearlen];
    };
    Iterinfo2.prototype.mdayset = function(_, month) {
      var start = this.mrange[month - 1];
      var end = this.mrange[month];
      var set = repeat(null, this.yearlen);
      for (var i = start; i < end; i++)
        set[i] = i;
      return [set, start, end];
    };
    Iterinfo2.prototype.wdayset = function(year, month, day) {
      var set = repeat(null, this.yearlen + 7);
      var i = toOrdinal(datetime(year, month, day)) - this.yearordinal;
      var start = i;
      for (var j = 0; j < 7; j++) {
        set[i] = i;
        ++i;
        if (this.wdaymask[i] === this.options.wkst)
          break;
      }
      return [set, start, i];
    };
    Iterinfo2.prototype.ddayset = function(year, month, day) {
      var set = repeat(null, this.yearlen);
      var i = toOrdinal(datetime(year, month, day)) - this.yearordinal;
      set[i] = i;
      return [set, i, i + 1];
    };
    Iterinfo2.prototype.htimeset = function(hour, _, second, millisecond) {
      var _this = this;
      var set = [];
      this.options.byminute.forEach(function(minute) {
        set = set.concat(_this.mtimeset(hour, minute, second, millisecond));
      });
      sort(set);
      return set;
    };
    Iterinfo2.prototype.mtimeset = function(hour, minute, _, millisecond) {
      var set = this.options.bysecond.map(function(second) {
        return new Time(hour, minute, second, millisecond);
      });
      sort(set);
      return set;
    };
    Iterinfo2.prototype.stimeset = function(hour, minute, second, millisecond) {
      return [new Time(hour, minute, second, millisecond)];
    };
    Iterinfo2.prototype.getdayset = function(freq) {
      switch (freq) {
        case Frequency.YEARLY:
          return this.ydayset.bind(this);
        case Frequency.MONTHLY:
          return this.mdayset.bind(this);
        case Frequency.WEEKLY:
          return this.wdayset.bind(this);
        case Frequency.DAILY:
          return this.ddayset.bind(this);
        default:
          return this.ddayset.bind(this);
      }
    };
    Iterinfo2.prototype.gettimeset = function(freq) {
      switch (freq) {
        case Frequency.HOURLY:
          return this.htimeset.bind(this);
        case Frequency.MINUTELY:
          return this.mtimeset.bind(this);
        case Frequency.SECONDLY:
          return this.stimeset.bind(this);
      }
    };
    return Iterinfo2;
  })()
);
var iterinfo_default = Iterinfo;

// node_modules/rrule/dist/esm/iter/poslist.js
function buildPoslist(bysetpos, timeset, start, end, ii, dayset) {
  var poslist = [];
  for (var j = 0; j < bysetpos.length; j++) {
    var daypos = void 0;
    var timepos = void 0;
    var pos = bysetpos[j];
    if (pos < 0) {
      daypos = Math.floor(pos / timeset.length);
      timepos = pymod(pos, timeset.length);
    } else {
      daypos = Math.floor((pos - 1) / timeset.length);
      timepos = pymod(pos - 1, timeset.length);
    }
    var tmp = [];
    for (var k = start; k < end; k++) {
      var val = dayset[k];
      if (!isPresent(val))
        continue;
      tmp.push(val);
    }
    var i = void 0;
    if (daypos < 0) {
      i = tmp.slice(daypos)[0];
    } else {
      i = tmp[daypos];
    }
    var time = timeset[timepos];
    var date = fromOrdinal(ii.yearordinal + i);
    var res = combine(date, time);
    if (!includes(poslist, res))
      poslist.push(res);
  }
  sort(poslist);
  return poslist;
}

// node_modules/rrule/dist/esm/iter/index.js
function iter(iterResult, options) {
  var dtstart = options.dtstart, freq = options.freq, interval = options.interval, until = options.until, bysetpos = options.bysetpos;
  var count = options.count;
  if (count === 0 || interval === 0) {
    return emitResult(iterResult);
  }
  var counterDate = DateTime.fromDate(dtstart);
  var ii = new iterinfo_default(options);
  ii.rebuild(counterDate.year, counterDate.month);
  var timeset = makeTimeset(ii, counterDate, options);
  for (; ; ) {
    var _a = ii.getdayset(freq)(counterDate.year, counterDate.month, counterDate.day), dayset = _a[0], start = _a[1], end = _a[2];
    var filtered = removeFilteredDays(dayset, start, end, ii, options);
    if (notEmpty(bysetpos)) {
      var poslist = buildPoslist(bysetpos, timeset, start, end, ii, dayset);
      for (var j = 0; j < poslist.length; j++) {
        var res = poslist[j];
        if (until && res > until) {
          return emitResult(iterResult);
        }
        if (res >= dtstart) {
          var rezonedDate = rezoneIfNeeded(res, options);
          if (!iterResult.accept(rezonedDate)) {
            return emitResult(iterResult);
          }
          if (count) {
            --count;
            if (!count) {
              return emitResult(iterResult);
            }
          }
        }
      }
    } else {
      for (var j = start; j < end; j++) {
        var currentDay = dayset[j];
        if (!isPresent(currentDay)) {
          continue;
        }
        var date = fromOrdinal(ii.yearordinal + currentDay);
        for (var k = 0; k < timeset.length; k++) {
          var time = timeset[k];
          var res = combine(date, time);
          if (until && res > until) {
            return emitResult(iterResult);
          }
          if (res >= dtstart) {
            var rezonedDate = rezoneIfNeeded(res, options);
            if (!iterResult.accept(rezonedDate)) {
              return emitResult(iterResult);
            }
            if (count) {
              --count;
              if (!count) {
                return emitResult(iterResult);
              }
            }
          }
        }
      }
    }
    if (options.interval === 0) {
      return emitResult(iterResult);
    }
    counterDate.add(options, filtered);
    if (counterDate.year > MAXYEAR) {
      return emitResult(iterResult);
    }
    if (!freqIsDailyOrGreater(freq)) {
      timeset = ii.gettimeset(freq)(counterDate.hour, counterDate.minute, counterDate.second, 0);
    }
    ii.rebuild(counterDate.year, counterDate.month);
  }
}
function isFiltered(ii, currentDay, options) {
  var bymonth = options.bymonth, byweekno = options.byweekno, byweekday = options.byweekday, byeaster = options.byeaster, bymonthday = options.bymonthday, bynmonthday = options.bynmonthday, byyearday = options.byyearday;
  return notEmpty(bymonth) && !includes(bymonth, ii.mmask[currentDay]) || notEmpty(byweekno) && !ii.wnomask[currentDay] || notEmpty(byweekday) && !includes(byweekday, ii.wdaymask[currentDay]) || notEmpty(ii.nwdaymask) && !ii.nwdaymask[currentDay] || byeaster !== null && !includes(ii.eastermask, currentDay) || (notEmpty(bymonthday) || notEmpty(bynmonthday)) && !includes(bymonthday, ii.mdaymask[currentDay]) && !includes(bynmonthday, ii.nmdaymask[currentDay]) || notEmpty(byyearday) && (currentDay < ii.yearlen && !includes(byyearday, currentDay + 1) && !includes(byyearday, -ii.yearlen + currentDay) || currentDay >= ii.yearlen && !includes(byyearday, currentDay + 1 - ii.yearlen) && !includes(byyearday, -ii.nextyearlen + currentDay - ii.yearlen));
}
function rezoneIfNeeded(date, options) {
  return new DateWithZone(date, options.tzid).rezonedDate();
}
function emitResult(iterResult) {
  return iterResult.getValue();
}
function removeFilteredDays(dayset, start, end, ii, options) {
  var filtered = false;
  for (var dayCounter = start; dayCounter < end; dayCounter++) {
    var currentDay = dayset[dayCounter];
    filtered = isFiltered(ii, currentDay, options);
    if (filtered)
      dayset[currentDay] = null;
  }
  return filtered;
}
function makeTimeset(ii, counterDate, options) {
  var freq = options.freq, byhour = options.byhour, byminute = options.byminute, bysecond = options.bysecond;
  if (freqIsDailyOrGreater(freq)) {
    return buildTimeset(options);
  }
  if (freq >= RRule.HOURLY && notEmpty(byhour) && !includes(byhour, counterDate.hour) || freq >= RRule.MINUTELY && notEmpty(byminute) && !includes(byminute, counterDate.minute) || freq >= RRule.SECONDLY && notEmpty(bysecond) && !includes(bysecond, counterDate.second)) {
    return [];
  }
  return ii.gettimeset(freq)(counterDate.hour, counterDate.minute, counterDate.second, counterDate.millisecond);
}

// node_modules/rrule/dist/esm/rrule.js
var Days = {
  MO: new Weekday(0),
  TU: new Weekday(1),
  WE: new Weekday(2),
  TH: new Weekday(3),
  FR: new Weekday(4),
  SA: new Weekday(5),
  SU: new Weekday(6)
};
var DEFAULT_OPTIONS = {
  freq: Frequency.YEARLY,
  dtstart: null,
  interval: 1,
  wkst: Days.MO,
  count: null,
  until: null,
  tzid: null,
  bysetpos: null,
  bymonth: null,
  bymonthday: null,
  bynmonthday: null,
  byyearday: null,
  byweekno: null,
  byweekday: null,
  bynweekday: null,
  byhour: null,
  byminute: null,
  bysecond: null,
  byeaster: null
};
var defaultKeys = Object.keys(DEFAULT_OPTIONS);
var RRule = (
  /** @class */
  (function() {
    function RRule2(options, noCache) {
      if (options === void 0) {
        options = {};
      }
      if (noCache === void 0) {
        noCache = false;
      }
      this._cache = noCache ? null : new Cache();
      this.origOptions = initializeOptions(options);
      var parsedOptions = parseOptions(options).parsedOptions;
      this.options = parsedOptions;
    }
    RRule2.parseText = function(text, language) {
      return parseText(text, language);
    };
    RRule2.fromText = function(text, language) {
      return fromText(text, language);
    };
    RRule2.fromString = function(str) {
      return new RRule2(RRule2.parseString(str) || void 0);
    };
    RRule2.prototype._iter = function(iterResult) {
      return iter(iterResult, this.options);
    };
    RRule2.prototype._cacheGet = function(what, args) {
      if (!this._cache)
        return false;
      return this._cache._cacheGet(what, args);
    };
    RRule2.prototype._cacheAdd = function(what, value, args) {
      if (!this._cache)
        return;
      return this._cache._cacheAdd(what, value, args);
    };
    RRule2.prototype.all = function(iterator) {
      if (iterator) {
        return this._iter(new callbackiterresult_default("all", {}, iterator));
      }
      var result = this._cacheGet("all");
      if (result === false) {
        result = this._iter(new iterresult_default("all", {}));
        this._cacheAdd("all", result);
      }
      return result;
    };
    RRule2.prototype.between = function(after, before, inc, iterator) {
      if (inc === void 0) {
        inc = false;
      }
      if (!isValidDate(after) || !isValidDate(before)) {
        throw new Error("Invalid date passed in to RRule.between");
      }
      var args = {
        before,
        after,
        inc
      };
      if (iterator) {
        return this._iter(new callbackiterresult_default("between", args, iterator));
      }
      var result = this._cacheGet("between", args);
      if (result === false) {
        result = this._iter(new iterresult_default("between", args));
        this._cacheAdd("between", result, args);
      }
      return result;
    };
    RRule2.prototype.before = function(dt, inc) {
      if (inc === void 0) {
        inc = false;
      }
      if (!isValidDate(dt)) {
        throw new Error("Invalid date passed in to RRule.before");
      }
      var args = { dt, inc };
      var result = this._cacheGet("before", args);
      if (result === false) {
        result = this._iter(new iterresult_default("before", args));
        this._cacheAdd("before", result, args);
      }
      return result;
    };
    RRule2.prototype.after = function(dt, inc) {
      if (inc === void 0) {
        inc = false;
      }
      if (!isValidDate(dt)) {
        throw new Error("Invalid date passed in to RRule.after");
      }
      var args = { dt, inc };
      var result = this._cacheGet("after", args);
      if (result === false) {
        result = this._iter(new iterresult_default("after", args));
        this._cacheAdd("after", result, args);
      }
      return result;
    };
    RRule2.prototype.count = function() {
      return this.all().length;
    };
    RRule2.prototype.toString = function() {
      return optionsToString(this.origOptions);
    };
    RRule2.prototype.toText = function(gettext, language, dateFormatter) {
      return toText(this, gettext, language, dateFormatter);
    };
    RRule2.prototype.isFullyConvertibleToText = function() {
      return isFullyConvertible(this);
    };
    RRule2.prototype.clone = function() {
      return new RRule2(this.origOptions);
    };
    RRule2.FREQUENCIES = [
      "YEARLY",
      "MONTHLY",
      "WEEKLY",
      "DAILY",
      "HOURLY",
      "MINUTELY",
      "SECONDLY"
    ];
    RRule2.YEARLY = Frequency.YEARLY;
    RRule2.MONTHLY = Frequency.MONTHLY;
    RRule2.WEEKLY = Frequency.WEEKLY;
    RRule2.DAILY = Frequency.DAILY;
    RRule2.HOURLY = Frequency.HOURLY;
    RRule2.MINUTELY = Frequency.MINUTELY;
    RRule2.SECONDLY = Frequency.SECONDLY;
    RRule2.MO = Days.MO;
    RRule2.TU = Days.TU;
    RRule2.WE = Days.WE;
    RRule2.TH = Days.TH;
    RRule2.FR = Days.FR;
    RRule2.SA = Days.SA;
    RRule2.SU = Days.SU;
    RRule2.parseString = parseString;
    RRule2.optionsToString = optionsToString;
    return RRule2;
  })()
);

// node_modules/rrule/dist/esm/iterset.js
function iterSet(iterResult, _rrule, _exrule, _rdate, _exdate, tzid) {
  var _exdateHash = {};
  var _accept = iterResult.accept;
  function evalExdate(after, before) {
    _exrule.forEach(function(rrule) {
      rrule.between(after, before, true).forEach(function(date) {
        _exdateHash[Number(date)] = true;
      });
    });
  }
  _exdate.forEach(function(date) {
    var zonedDate2 = new DateWithZone(date, tzid).rezonedDate();
    _exdateHash[Number(zonedDate2)] = true;
  });
  iterResult.accept = function(date) {
    var dt = Number(date);
    if (isNaN(dt))
      return _accept.call(this, date);
    if (!_exdateHash[dt]) {
      evalExdate(new Date(dt - 1), new Date(dt + 1));
      if (!_exdateHash[dt]) {
        _exdateHash[dt] = true;
        return _accept.call(this, date);
      }
    }
    return true;
  };
  if (iterResult.method === "between") {
    evalExdate(iterResult.args.after, iterResult.args.before);
    iterResult.accept = function(date) {
      var dt = Number(date);
      if (!_exdateHash[dt]) {
        _exdateHash[dt] = true;
        return _accept.call(this, date);
      }
      return true;
    };
  }
  for (var i = 0; i < _rdate.length; i++) {
    var zonedDate = new DateWithZone(_rdate[i], tzid).rezonedDate();
    if (!iterResult.accept(new Date(zonedDate.getTime())))
      break;
  }
  _rrule.forEach(function(rrule) {
    iter(iterResult, rrule.options);
  });
  var res = iterResult._result;
  sort(res);
  switch (iterResult.method) {
    case "all":
    case "between":
      return res;
    case "before":
      return res.length && res[res.length - 1] || null;
    case "after":
    default:
      return res.length && res[0] || null;
  }
}

// node_modules/rrule/dist/esm/rrulestr.js
var DEFAULT_OPTIONS2 = {
  dtstart: null,
  cache: false,
  unfold: false,
  forceset: false,
  compatible: false,
  tzid: null
};
function parseInput(s, options) {
  var rrulevals = [];
  var rdatevals = [];
  var exrulevals = [];
  var exdatevals = [];
  var parsedDtstart = parseDtstart(s);
  var dtstart = parsedDtstart.dtstart;
  var tzid = parsedDtstart.tzid;
  var lines = splitIntoLines(s, options.unfold);
  lines.forEach(function(line) {
    var _a;
    if (!line)
      return;
    var _b = breakDownLine(line), name = _b.name, parms = _b.parms, value = _b.value;
    switch (name.toUpperCase()) {
      case "RRULE":
        if (parms.length) {
          throw new Error("unsupported RRULE parm: ".concat(parms.join(",")));
        }
        rrulevals.push(parseString(line));
        break;
      case "RDATE":
        var _c = (_a = /RDATE(?:;TZID=([^:=]+))?/i.exec(line)) !== null && _a !== void 0 ? _a : [], rdateTzid = _c[1];
        if (rdateTzid && !tzid) {
          tzid = rdateTzid;
        }
        rdatevals = rdatevals.concat(parseRDate(value, parms));
        break;
      case "EXRULE":
        if (parms.length) {
          throw new Error("unsupported EXRULE parm: ".concat(parms.join(",")));
        }
        exrulevals.push(parseString(value));
        break;
      case "EXDATE":
        exdatevals = exdatevals.concat(parseRDate(value, parms));
        break;
      case "DTSTART":
        break;
      default:
        throw new Error("unsupported property: " + name);
    }
  });
  return {
    dtstart,
    tzid,
    rrulevals,
    rdatevals,
    exrulevals,
    exdatevals
  };
}
function buildRule(s, options) {
  var _a = parseInput(s, options), rrulevals = _a.rrulevals, rdatevals = _a.rdatevals, exrulevals = _a.exrulevals, exdatevals = _a.exdatevals, dtstart = _a.dtstart, tzid = _a.tzid;
  var noCache = options.cache === false;
  if (options.compatible) {
    options.forceset = true;
    options.unfold = true;
  }
  if (options.forceset || rrulevals.length > 1 || rdatevals.length || exrulevals.length || exdatevals.length) {
    var rset_1 = new RRuleSet(noCache);
    rset_1.dtstart(dtstart);
    rset_1.tzid(tzid || void 0);
    rrulevals.forEach(function(val2) {
      rset_1.rrule(new RRule(groomRruleOptions(val2, dtstart, tzid), noCache));
    });
    rdatevals.forEach(function(date) {
      rset_1.rdate(date);
    });
    exrulevals.forEach(function(val2) {
      rset_1.exrule(new RRule(groomRruleOptions(val2, dtstart, tzid), noCache));
    });
    exdatevals.forEach(function(date) {
      rset_1.exdate(date);
    });
    if (options.compatible && options.dtstart)
      rset_1.rdate(dtstart);
    return rset_1;
  }
  var val = rrulevals[0] || {};
  return new RRule(groomRruleOptions(val, val.dtstart || options.dtstart || dtstart, val.tzid || options.tzid || tzid), noCache);
}
function rrulestr(s, options) {
  if (options === void 0) {
    options = {};
  }
  return buildRule(s, initializeOptions2(options));
}
function groomRruleOptions(val, dtstart, tzid) {
  return __assign(__assign({}, val), { dtstart, tzid });
}
function initializeOptions2(options) {
  var invalid = [];
  var keys = Object.keys(options);
  var defaultKeys2 = Object.keys(DEFAULT_OPTIONS2);
  keys.forEach(function(key) {
    if (!includes(defaultKeys2, key))
      invalid.push(key);
  });
  if (invalid.length) {
    throw new Error("Invalid options: " + invalid.join(", "));
  }
  return __assign(__assign({}, DEFAULT_OPTIONS2), options);
}
function extractName(line) {
  if (line.indexOf(":") === -1) {
    return {
      name: "RRULE",
      value: line
    };
  }
  var _a = split(line, ":", 1), name = _a[0], value = _a[1];
  return {
    name,
    value
  };
}
function breakDownLine(line) {
  var _a = extractName(line), name = _a.name, value = _a.value;
  var parms = name.split(";");
  if (!parms)
    throw new Error("empty property name");
  return {
    name: parms[0].toUpperCase(),
    parms: parms.slice(1),
    value
  };
}
function splitIntoLines(s, unfold) {
  if (unfold === void 0) {
    unfold = false;
  }
  s = s && s.trim();
  if (!s)
    throw new Error("Invalid empty string");
  if (!unfold) {
    return s.split(/\s/);
  }
  var lines = s.split("\n");
  var i = 0;
  while (i < lines.length) {
    var line = lines[i] = lines[i].replace(/\s+$/g, "");
    if (!line) {
      lines.splice(i, 1);
    } else if (i > 0 && line[0] === " ") {
      lines[i - 1] += line.slice(1);
      lines.splice(i, 1);
    } else {
      i += 1;
    }
  }
  return lines;
}
function validateDateParm(parms) {
  parms.forEach(function(parm) {
    if (!/(VALUE=DATE(-TIME)?)|(TZID=)/.test(parm)) {
      throw new Error("unsupported RDATE/EXDATE parm: " + parm);
    }
  });
}
function parseRDate(rdateval, parms) {
  validateDateParm(parms);
  return rdateval.split(",").map(function(datestr) {
    return untilStringToDate(datestr);
  });
}

// node_modules/rrule/dist/esm/rruleset.js
function createGetterSetter(fieldName) {
  var _this = this;
  return function(field) {
    if (field !== void 0) {
      _this["_".concat(fieldName)] = field;
    }
    if (_this["_".concat(fieldName)] !== void 0) {
      return _this["_".concat(fieldName)];
    }
    for (var i = 0; i < _this._rrule.length; i++) {
      var field_1 = _this._rrule[i].origOptions[fieldName];
      if (field_1) {
        return field_1;
      }
    }
  };
}
var RRuleSet = (
  /** @class */
  (function(_super) {
    __extends(RRuleSet2, _super);
    function RRuleSet2(noCache) {
      if (noCache === void 0) {
        noCache = false;
      }
      var _this = _super.call(this, {}, noCache) || this;
      _this.dtstart = createGetterSetter.apply(_this, ["dtstart"]);
      _this.tzid = createGetterSetter.apply(_this, ["tzid"]);
      _this._rrule = [];
      _this._rdate = [];
      _this._exrule = [];
      _this._exdate = [];
      return _this;
    }
    RRuleSet2.prototype._iter = function(iterResult) {
      return iterSet(iterResult, this._rrule, this._exrule, this._rdate, this._exdate, this.tzid());
    };
    RRuleSet2.prototype.rrule = function(rrule) {
      _addRule(rrule, this._rrule);
    };
    RRuleSet2.prototype.exrule = function(rrule) {
      _addRule(rrule, this._exrule);
    };
    RRuleSet2.prototype.rdate = function(date) {
      _addDate(date, this._rdate);
    };
    RRuleSet2.prototype.exdate = function(date) {
      _addDate(date, this._exdate);
    };
    RRuleSet2.prototype.rrules = function() {
      return this._rrule.map(function(e) {
        return rrulestr(e.toString());
      });
    };
    RRuleSet2.prototype.exrules = function() {
      return this._exrule.map(function(e) {
        return rrulestr(e.toString());
      });
    };
    RRuleSet2.prototype.rdates = function() {
      return this._rdate.map(function(e) {
        return new Date(e.getTime());
      });
    };
    RRuleSet2.prototype.exdates = function() {
      return this._exdate.map(function(e) {
        return new Date(e.getTime());
      });
    };
    RRuleSet2.prototype.valueOf = function() {
      var result = [];
      if (!this._rrule.length && this._dtstart) {
        result = result.concat(optionsToString({ dtstart: this._dtstart }));
      }
      this._rrule.forEach(function(rrule) {
        result = result.concat(rrule.toString().split("\n"));
      });
      this._exrule.forEach(function(exrule) {
        result = result.concat(exrule.toString().split("\n").map(function(line) {
          return line.replace(/^RRULE:/, "EXRULE:");
        }).filter(function(line) {
          return !/^DTSTART/.test(line);
        }));
      });
      if (this._rdate.length) {
        result.push(rdatesToString("RDATE", this._rdate, this.tzid()));
      }
      if (this._exdate.length) {
        result.push(rdatesToString("EXDATE", this._exdate, this.tzid()));
      }
      return result;
    };
    RRuleSet2.prototype.toString = function() {
      return this.valueOf().join("\n");
    };
    RRuleSet2.prototype.clone = function() {
      var rrs = new RRuleSet2(!!this._cache);
      this._rrule.forEach(function(rule) {
        return rrs.rrule(rule.clone());
      });
      this._exrule.forEach(function(rule) {
        return rrs.exrule(rule.clone());
      });
      this._rdate.forEach(function(date) {
        return rrs.rdate(new Date(date.getTime()));
      });
      this._exdate.forEach(function(date) {
        return rrs.exdate(new Date(date.getTime()));
      });
      return rrs;
    };
    return RRuleSet2;
  })(RRule)
);
function _addRule(rrule, collection) {
  if (!(rrule instanceof RRule)) {
    throw new TypeError(String(rrule) + " is not RRule instance");
  }
  if (!includes(collection.map(String), String(rrule))) {
    collection.push(rrule);
  }
}
function _addDate(date, collection) {
  if (!(date instanceof Date)) {
    throw new TypeError(String(date) + " is not Date instance");
  }
  if (!includes(collection.map(Number), Number(date))) {
    collection.push(date);
    sort(collection);
  }
}
function rdatesToString(param, rdates, tzid) {
  var isUTC = !tzid || tzid.toUpperCase() === "UTC";
  var header = isUTC ? "".concat(param, ":") : "".concat(param, ";TZID=").concat(tzid, ":");
  var dateString = rdates.map(function(rdate) {
    return timeToUntilString(rdate.valueOf(), isUTC);
  }).join(",");
  return "".concat(header).concat(dateString);
}

// src/expand.js
function expandEvents(events, username, rangeStart, rangeEnd) {
  const blocks = [];
  for (const event of events) {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const durationMs = end - start;
    if (!event.rrule) {
      if (end > rangeStart && start < rangeEnd) {
        blocks.push({ start, end, user: username, title: event.title });
      }
      continue;
    }
    const options = RRule.parseString(event.rrule);
    options.dtstart = start;
    const rule = new RRule(options);
    const searchStart = new Date(rangeStart.getTime() - durationMs);
    const occurrences = rule.between(searchStart, rangeEnd, true);
    for (const occStart of occurrences) {
      const occEnd = new Date(occStart.getTime() + durationMs);
      if (occEnd > rangeStart && occStart < rangeEnd) {
        blocks.push({ start: occStart, end: occEnd, user: username, title: event.title });
      }
    }
  }
  return blocks.sort((a, b) => a.start - b.start);
}

// src/availability.js
var WEEKDAYS_DE = {
  montag: 0,
  dienstag: 1,
  mittwoch: 2,
  donnerstag: 3,
  freitag: 4,
  samstag: 5,
  sonntag: 6
};
function parseWeekday2(value) {
  const v = String(value).trim().toLowerCase();
  if (v in WEEKDAYS_DE) return WEEKDAYS_DE[v];
  return parseInt(v, 10);
}
function toJsWeekday(mondayBasedWeekday) {
  return (mondayBasedWeekday + 1) % 7;
}
function datesForWeekday(rangeStart, rangeEnd, weekday) {
  const jsWeekday = toJsWeekday(weekday);
  const dates = [];
  let current = new Date(rangeStart);
  const offset = (jsWeekday - current.getDay() + 7) % 7;
  current.setDate(current.getDate() + offset);
  while (current <= rangeEnd) {
    dates.push(new Date(current));
    current = new Date(current);
    current.setDate(current.getDate() + 7);
  }
  return dates;
}
function combineDateTime(date, hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(date);
  d.setHours(h, m, 0, 0);
  return d;
}
function subtractBusy(windowStart, windowEnd, busy) {
  const relevant = busy.filter((b) => b.end > windowStart && b.start < windowEnd).sort((a, b) => a.start - b.start);
  const merged = [];
  for (const b of relevant) {
    const start = new Date(Math.max(b.start, windowStart));
    const end = new Date(Math.min(b.end, windowEnd));
    if (merged.length && start <= merged[merged.length - 1][1]) {
      merged[merged.length - 1][1] = new Date(Math.max(merged[merged.length - 1][1], end));
    } else {
      merged.push([start, end]);
    }
  }
  const free = [];
  let cursor = windowStart;
  for (const [start, end] of merged) {
    if (start > cursor) free.push({ start: cursor, end: start });
    cursor = new Date(Math.max(cursor, end));
  }
  if (cursor < windowEnd) free.push({ start: cursor, end: windowEnd });
  return free;
}
function findCommonFreeSlots(busyBlocks, weekday, rangeStartDate, rangeEndDate, dayStartTime, dayEndTime, minDurationMinutes = 30) {
  const dates = datesForWeekday(rangeStartDate, rangeEndDate, weekday);
  const allFree = [];
  for (const d of dates) {
    const windowStart = combineDateTime(d, dayStartTime);
    const windowEnd = combineDateTime(d, dayEndTime);
    const freeSlots = subtractBusy(windowStart, windowEnd, busyBlocks);
    for (const s of freeSlots) {
      const durationMinutes = (s.end - s.start) / 6e4;
      if (durationMinutes >= minDurationMinutes) {
        allFree.push({ ...s, durationMinutes });
      }
    }
  }
  return allFree;
}
var WEEKDAY_LABELS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
function formatSlot(slot) {
  const pad = (n) => String(n).padStart(2, "0");
  const d = slot.start;
  const dateStr = `${WEEKDAY_LABELS[d.getDay()]} ${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
  const startStr = `${pad(slot.start.getHours())}:${pad(slot.start.getMinutes())}`;
  const endStr = `${pad(slot.end.getHours())}:${pad(slot.end.getMinutes())}`;
  return `${dateStr}, ${startStr}\u2013${endStr} (${Math.round(slot.durationMinutes)} min)`;
}

// node_modules/ical.js/dist/ical.js
var Binary = class _Binary {
  /**
   * Creates a binary value from the given string.
   *
   * @param {String} aString        The binary value string
   * @return {Binary}               The binary value instance
   */
  static fromString(aString) {
    return new _Binary(aString);
  }
  /**
   * Creates a new ICAL.Binary instance
   *
   * @param {String} aValue     The binary data for this value
   */
  constructor(aValue) {
    this.value = aValue;
  }
  /**
   * The type name, to be used in the jCal object.
   * @default "binary"
   * @constant
   */
  icaltype = "binary";
  /**
   * Base64 decode the current value
   *
   * @return {String}         The base64-decoded value
   */
  decodeValue() {
    return this._b64_decode(this.value);
  }
  /**
   * Encodes the passed parameter with base64 and sets the internal
   * value to the result.
   *
   * @param {String} aValue      The raw binary value to encode
   */
  setEncodedValue(aValue) {
    this.value = this._b64_encode(aValue);
  }
  _b64_encode(data) {
    let b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = "", tmp_arr = [];
    if (!data) {
      return data;
    }
    do {
      o1 = data.charCodeAt(i++);
      o2 = data.charCodeAt(i++);
      o3 = data.charCodeAt(i++);
      bits = o1 << 16 | o2 << 8 | o3;
      h1 = bits >> 18 & 63;
      h2 = bits >> 12 & 63;
      h3 = bits >> 6 & 63;
      h4 = bits & 63;
      tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);
    enc = tmp_arr.join("");
    let r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
  }
  _b64_decode(data) {
    let b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];
    if (!data) {
      return data;
    }
    data += "";
    do {
      h1 = b64.indexOf(data.charAt(i++));
      h2 = b64.indexOf(data.charAt(i++));
      h3 = b64.indexOf(data.charAt(i++));
      h4 = b64.indexOf(data.charAt(i++));
      bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
      o1 = bits >> 16 & 255;
      o2 = bits >> 8 & 255;
      o3 = bits & 255;
      if (h3 == 64) {
        tmp_arr[ac++] = String.fromCharCode(o1);
      } else if (h4 == 64) {
        tmp_arr[ac++] = String.fromCharCode(o1, o2);
      } else {
        tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
      }
    } while (i < data.length);
    dec = tmp_arr.join("");
    return dec;
  }
  /**
   * The string representation of this value
   * @return {String}
   */
  toString() {
    return this.value;
  }
};
var DURATION_LETTERS = /([PDWHMTS]{1,1})/;
var DATA_PROPS_TO_COPY = ["weeks", "days", "hours", "minutes", "seconds", "isNegative"];
var Duration = class _Duration {
  /**
   * Returns a new ICAL.Duration instance from the passed seconds value.
   *
   * @param {Number} aSeconds       The seconds to create the instance from
   * @return {Duration}             The newly created duration instance
   */
  static fromSeconds(aSeconds) {
    return new _Duration().fromSeconds(aSeconds);
  }
  /**
   * Checks if the given string is an iCalendar duration value.
   *
   * @param {String} value      The raw ical value
   * @return {Boolean}          True, if the given value is of the
   *                              duration ical type
   */
  static isValueString(string) {
    return string[0] === "P" || string[1] === "P";
  }
  /**
   * Creates a new {@link ICAL.Duration} instance from the passed string.
   *
   * @param {String} aStr       The string to parse
   * @return {Duration}         The created duration instance
   */
  static fromString(aStr) {
    let pos = 0;
    let dict = /* @__PURE__ */ Object.create(null);
    let chunks = 0;
    while ((pos = aStr.search(DURATION_LETTERS)) !== -1) {
      let type = aStr[pos];
      let numeric = aStr.slice(0, Math.max(0, pos));
      aStr = aStr.slice(pos + 1);
      chunks += parseDurationChunk(type, numeric, dict);
    }
    if (chunks < 2) {
      throw new Error(
        'invalid duration value: Not enough duration components in "' + aStr + '"'
      );
    }
    return new _Duration(dict);
  }
  /**
   * Creates a new ICAL.Duration instance from the given data object.
   *
   * @param {Object} aData                An object with members of the duration
   * @param {Number=} aData.weeks         Duration in weeks
   * @param {Number=} aData.days          Duration in days
   * @param {Number=} aData.hours         Duration in hours
   * @param {Number=} aData.minutes       Duration in minutes
   * @param {Number=} aData.seconds       Duration in seconds
   * @param {Boolean=} aData.isNegative   If true, the duration is negative
   * @return {Duration}                   The createad duration instance
   */
  static fromData(aData) {
    return new _Duration(aData);
  }
  /**
   * Creates a new ICAL.Duration instance.
   *
   * @param {Object} data                 An object with members of the duration
   * @param {Number=} data.weeks          Duration in weeks
   * @param {Number=} data.days           Duration in days
   * @param {Number=} data.hours          Duration in hours
   * @param {Number=} data.minutes        Duration in minutes
   * @param {Number=} data.seconds        Duration in seconds
   * @param {Boolean=} data.isNegative    If true, the duration is negative
   */
  constructor(data) {
    this.wrappedJSObject = this;
    this.fromData(data);
  }
  /**
   * The weeks in this duration
   * @type {Number}
   * @default 0
   */
  weeks = 0;
  /**
   * The days in this duration
   * @type {Number}
   * @default 0
   */
  days = 0;
  /**
   * The days in this duration
   * @type {Number}
   * @default 0
   */
  hours = 0;
  /**
   * The minutes in this duration
   * @type {Number}
   * @default 0
   */
  minutes = 0;
  /**
   * The seconds in this duration
   * @type {Number}
   * @default 0
   */
  seconds = 0;
  /**
   * The seconds in this duration
   * @type {Boolean}
   * @default false
   */
  isNegative = false;
  /**
   * The class identifier.
   * @constant
   * @type {String}
   * @default "icalduration"
   */
  icalclass = "icalduration";
  /**
   * The type name, to be used in the jCal object.
   * @constant
   * @type {String}
   * @default "duration"
   */
  icaltype = "duration";
  /**
   * Returns a clone of the duration object.
   *
   * @return {Duration}      The cloned object
   */
  clone() {
    return _Duration.fromData(this);
  }
  /**
   * The duration value expressed as a number of seconds.
   *
   * @return {Number}             The duration value in seconds
   */
  toSeconds() {
    let seconds = this.seconds + 60 * this.minutes + 3600 * this.hours + 86400 * this.days + 7 * 86400 * this.weeks;
    return this.isNegative ? -seconds : seconds;
  }
  /**
   * Reads the passed seconds value into this duration object. Afterwards,
   * members like {@link ICAL.Duration#days days} and {@link ICAL.Duration#weeks weeks} will be set up
   * accordingly.
   *
   * @param {Number} aSeconds     The duration value in seconds
   * @return {Duration}           Returns this instance
   */
  fromSeconds(aSeconds) {
    let secs = Math.abs(aSeconds);
    this.isNegative = aSeconds < 0;
    this.days = trunc(secs / 86400);
    if (this.days % 7 == 0) {
      this.weeks = this.days / 7;
      this.days = 0;
    } else {
      this.weeks = 0;
    }
    secs -= (this.days + 7 * this.weeks) * 86400;
    this.hours = trunc(secs / 3600);
    secs -= this.hours * 3600;
    this.minutes = trunc(secs / 60);
    secs -= this.minutes * 60;
    this.seconds = secs;
    return this;
  }
  /**
   * Sets up the current instance using members from the passed data object.
   *
   * @param {Object} aData                An object with members of the duration
   * @param {Number=} aData.weeks         Duration in weeks
   * @param {Number=} aData.days          Duration in days
   * @param {Number=} aData.hours         Duration in hours
   * @param {Number=} aData.minutes       Duration in minutes
   * @param {Number=} aData.seconds       Duration in seconds
   * @param {Boolean=} aData.isNegative   If true, the duration is negative
   */
  fromData(aData) {
    for (let prop of DATA_PROPS_TO_COPY) {
      if (aData && prop in aData) {
        this[prop] = aData[prop];
      } else {
        this[prop] = 0;
      }
    }
  }
  /**
   * Resets the duration instance to the default values, i.e. PT0S
   */
  reset() {
    this.isNegative = false;
    this.weeks = 0;
    this.days = 0;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }
  /**
   * Compares the duration instance with another one.
   *
   * @param {Duration} aOther             The instance to compare with
   * @return {Number}                     -1, 0 or 1 for less/equal/greater
   */
  compare(aOther) {
    let thisSeconds = this.toSeconds();
    let otherSeconds = aOther.toSeconds();
    return (thisSeconds > otherSeconds) - (thisSeconds < otherSeconds);
  }
  /**
   * Normalizes the duration instance. For example, a duration with a value
   * of 61 seconds will be normalized to 1 minute and 1 second.
   */
  normalize() {
    this.fromSeconds(this.toSeconds());
  }
  /**
   * The string representation of this duration.
   * @return {String}
   */
  toString() {
    if (this.toSeconds() == 0) {
      return "PT0S";
    } else {
      let str = "";
      if (this.isNegative) str += "-";
      str += "P";
      let hasWeeks = false;
      if (this.weeks) {
        if (this.days || this.hours || this.minutes || this.seconds) {
          str += this.weeks * 7 + this.days + "D";
        } else {
          str += this.weeks + "W";
          hasWeeks = true;
        }
      } else if (this.days) {
        str += this.days + "D";
      }
      if (!hasWeeks) {
        if (this.hours || this.minutes || this.seconds) {
          str += "T";
          if (this.hours) {
            str += this.hours + "H";
          }
          if (this.minutes) {
            str += this.minutes + "M";
          }
          if (this.seconds) {
            str += this.seconds + "S";
          }
        }
      }
      return str;
    }
  }
  /**
   * The iCalendar string representation of this duration.
   * @return {String}
   */
  toICALString() {
    return this.toString();
  }
};
function parseDurationChunk(letter, number, object) {
  let type;
  switch (letter) {
    case "P":
      if (number && number === "-") {
        object.isNegative = true;
      } else {
        object.isNegative = false;
      }
      break;
    case "D":
      type = "days";
      break;
    case "W":
      type = "weeks";
      break;
    case "H":
      type = "hours";
      break;
    case "M":
      type = "minutes";
      break;
    case "S":
      type = "seconds";
      break;
    default:
      return 0;
  }
  if (type) {
    if (!number && number !== 0) {
      throw new Error(
        'invalid duration value: Missing number before "' + letter + '"'
      );
    }
    let num2 = parseInt(number, 10);
    if (isStrictlyNaN(num2)) {
      throw new Error(
        'invalid duration value: Invalid number "' + number + '" before "' + letter + '"'
      );
    }
    object[type] = num2;
  }
  return 1;
}
var Period = class _Period {
  /**
   * Creates a new {@link ICAL.Period} instance from the passed string.
   *
   * @param {String} str            The string to parse
   * @param {Property} prop         The property this period will be on
   * @return {Period}               The created period instance
   */
  static fromString(str, prop) {
    let parts = str.split("/");
    if (parts.length !== 2) {
      throw new Error(
        'Invalid string value: "' + str + '" must contain a "/" char.'
      );
    }
    let options = {
      start: Time2.fromDateTimeString(parts[0], prop)
    };
    let end = parts[1];
    if (Duration.isValueString(end)) {
      options.duration = Duration.fromString(end);
    } else {
      options.end = Time2.fromDateTimeString(end, prop);
    }
    return new _Period(options);
  }
  /**
   * Creates a new {@link ICAL.Period} instance from the given data object.
   * The passed data object cannot contain both and end date and a duration.
   *
   * @param {Object} aData                  An object with members of the period
   * @param {Time=} aData.start             The start of the period
   * @param {Time=} aData.end               The end of the period
   * @param {Duration=} aData.duration      The duration of the period
   * @return {Period}                       The period instance
   */
  static fromData(aData) {
    return new _Period(aData);
  }
  /**
   * Returns a new period instance from the given jCal data array. The first
   * member is always the start date string, the second member is either a
   * duration or end date string.
   *
   * @param {jCalComponent} aData           The jCal data array
   * @param {Property} aProp                The property this jCal data is on
   * @param {Boolean} aLenient              If true, data value can be both date and date-time
   * @return {Period}                       The period instance
   */
  static fromJSON(aData, aProp, aLenient) {
    function fromDateOrDateTimeString(aValue, dateProp) {
      if (aLenient) {
        return Time2.fromString(aValue, dateProp);
      } else {
        return Time2.fromDateTimeString(aValue, dateProp);
      }
    }
    if (Duration.isValueString(aData[1])) {
      return _Period.fromData({
        start: fromDateOrDateTimeString(aData[0], aProp),
        duration: Duration.fromString(aData[1])
      });
    } else {
      return _Period.fromData({
        start: fromDateOrDateTimeString(aData[0], aProp),
        end: fromDateOrDateTimeString(aData[1], aProp)
      });
    }
  }
  /**
   * Creates a new ICAL.Period instance. The passed data object cannot contain both and end date and
   * a duration.
   *
   * @param {Object} aData                  An object with members of the period
   * @param {Time=} aData.start             The start of the period
   * @param {Time=} aData.end               The end of the period
   * @param {Duration=} aData.duration      The duration of the period
   */
  constructor(aData) {
    this.wrappedJSObject = this;
    if (aData && "start" in aData) {
      if (aData.start && !(aData.start instanceof Time2)) {
        throw new TypeError(".start must be an instance of ICAL.Time");
      }
      this.start = aData.start;
    }
    if (aData && aData.end && aData.duration) {
      throw new Error("cannot accept both end and duration");
    }
    if (aData && "end" in aData) {
      if (aData.end && !(aData.end instanceof Time2)) {
        throw new TypeError(".end must be an instance of ICAL.Time");
      }
      this.end = aData.end;
    }
    if (aData && "duration" in aData) {
      if (aData.duration && !(aData.duration instanceof Duration)) {
        throw new TypeError(".duration must be an instance of ICAL.Duration");
      }
      this.duration = aData.duration;
    }
  }
  /**
   * The start of the period
   * @type {Time}
   */
  start = null;
  /**
   * The end of the period
   * @type {Time}
   */
  end = null;
  /**
   * The duration of the period
   * @type {Duration}
   */
  duration = null;
  /**
   * The class identifier.
   * @constant
   * @type {String}
   * @default "icalperiod"
   */
  icalclass = "icalperiod";
  /**
   * The type name, to be used in the jCal object.
   * @constant
   * @type {String}
   * @default "period"
   */
  icaltype = "period";
  /**
   * Returns a clone of the duration object.
   *
   * @return {Period}      The cloned object
   */
  clone() {
    return _Period.fromData({
      start: this.start ? this.start.clone() : null,
      end: this.end ? this.end.clone() : null,
      duration: this.duration ? this.duration.clone() : null
    });
  }
  /**
   * Calculates the duration of the period, either directly or by subtracting
   * start from end date.
   *
   * @return {Duration}      The calculated duration
   */
  getDuration() {
    if (this.duration) {
      return this.duration;
    } else {
      return this.end.subtractDate(this.start);
    }
  }
  /**
   * Calculates the end date of the period, either directly or by adding
   * duration to start date.
   *
   * @return {Time}          The calculated end date
   */
  getEnd() {
    if (this.end) {
      return this.end;
    } else {
      let end = this.start.clone();
      end.addDuration(this.duration);
      return end;
    }
  }
  /**
   * Compare this period with a date or other period. To maintain the logic where a.compare(b)
   * returns 1 when a > b, this function will return 1 when the period is after the date, 0 when the
   * date is within the period, and -1 when the period is before the date. When comparing two
   * periods, as soon as they overlap in any way this will return 0.
   *
   * @param {Time|Period} dt    The date or other period to compare with
   */
  compare(dt) {
    if (dt.compare(this.start) < 0) {
      return 1;
    } else if (dt.compare(this.getEnd()) > 0) {
      return -1;
    } else {
      return 0;
    }
  }
  /**
   * The string representation of this period.
   * @return {String}
   */
  toString() {
    return this.start + "/" + (this.end || this.duration);
  }
  /**
   * The jCal representation of this period type.
   * @return {Object}
   */
  toJSON() {
    return [this.start.toString(), (this.end || this.duration).toString()];
  }
  /**
   * The iCalendar string representation of this period.
   * @return {String}
   */
  toICALString() {
    return this.start.toICALString() + "/" + (this.end || this.duration).toICALString();
  }
};
var Time2 = class _Time {
  static _dowCache = {};
  static _wnCache = {};
  /**
   * Returns the days in the given month
   *
   * @param {Number} month      The month to check
   * @param {Number} year       The year to check
   * @return {Number}           The number of days in the month
   */
  static daysInMonth(month, year) {
    let _daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let days = 30;
    if (month < 1 || month > 12) return days;
    days = _daysInMonth[month];
    if (month == 2) {
      days += _Time.isLeapYear(year);
    }
    return days;
  }
  /**
   * Checks if the year is a leap year
   *
   * @param {Number} year       The year to check
   * @return {Boolean}          True, if the year is a leap year
   */
  static isLeapYear(year) {
    if (year <= 1752) {
      return year % 4 == 0;
    } else {
      return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
    }
  }
  /**
   * Create a new ICAL.Time from the day of year and year. The date is returned
   * in floating timezone.
   *
   * @param {Number} aDayOfYear     The day of year
   * @param {Number} aYear          The year to create the instance in
   * @return {Time}                 The created instance with the calculated date
   */
  static fromDayOfYear(aDayOfYear, aYear) {
    let year = aYear;
    let doy = aDayOfYear;
    let tt = new _Time();
    tt.auto_normalize = false;
    let is_leap = _Time.isLeapYear(year) ? 1 : 0;
    if (doy < 1) {
      year--;
      is_leap = _Time.isLeapYear(year) ? 1 : 0;
      doy += _Time.daysInYearPassedMonth[is_leap][12];
      return _Time.fromDayOfYear(doy, year);
    } else if (doy > _Time.daysInYearPassedMonth[is_leap][12]) {
      is_leap = _Time.isLeapYear(year) ? 1 : 0;
      doy -= _Time.daysInYearPassedMonth[is_leap][12];
      year++;
      return _Time.fromDayOfYear(doy, year);
    }
    tt.year = year;
    tt.isDate = true;
    for (let month = 11; month >= 0; month--) {
      if (doy > _Time.daysInYearPassedMonth[is_leap][month]) {
        tt.month = month + 1;
        tt.day = doy - _Time.daysInYearPassedMonth[is_leap][month];
        break;
      }
    }
    tt.auto_normalize = true;
    return tt;
  }
  /**
   * Returns a new ICAL.Time instance from a date string, e.g 2015-01-02.
   *
   * @deprecated                Use {@link ICAL.Time.fromDateString} instead
   * @param {String} str        The string to create from
   * @return {Time}             The date/time instance
   */
  static fromStringv2(str) {
    return new _Time({
      year: parseInt(str.slice(0, 4), 10),
      month: parseInt(str.slice(5, 7), 10),
      day: parseInt(str.slice(8, 10), 10),
      isDate: true
    });
  }
  /**
   * Returns a new ICAL.Time instance from a date string, e.g 2015-01-02.
   *
   * @param {String} aValue     The string to create from
   * @return {Time}             The date/time instance
   */
  static fromDateString(aValue) {
    return new _Time({
      year: strictParseInt(aValue.slice(0, 4)),
      month: strictParseInt(aValue.slice(5, 7)),
      day: strictParseInt(aValue.slice(8, 10)),
      isDate: true
    });
  }
  /**
   * Returns a new ICAL.Time instance from a date-time string, e.g
   * 2015-01-02T03:04:05. If a property is specified, the timezone is set up
   * from the property's TZID parameter.
   *
   * @param {String} aValue         The string to create from
   * @param {Property=} prop        The property the date belongs to
   * @return {Time}                 The date/time instance
   */
  static fromDateTimeString(aValue, prop) {
    if (aValue.length < 19) {
      throw new Error(
        'invalid date-time value: "' + aValue + '"'
      );
    }
    let zone;
    let zoneId;
    if (aValue.slice(-1) === "Z") {
      zone = Timezone.utcTimezone;
    } else if (prop) {
      zoneId = prop.getParameter("tzid");
      if (prop.parent) {
        if (prop.parent.name === "standard" || prop.parent.name === "daylight") {
          zone = Timezone.localTimezone;
        } else if (zoneId) {
          zone = prop.parent.getTimeZoneByID(zoneId);
        }
      }
    }
    const timeData = {
      year: strictParseInt(aValue.slice(0, 4)),
      month: strictParseInt(aValue.slice(5, 7)),
      day: strictParseInt(aValue.slice(8, 10)),
      hour: strictParseInt(aValue.slice(11, 13)),
      minute: strictParseInt(aValue.slice(14, 16)),
      second: strictParseInt(aValue.slice(17, 19))
    };
    if (zoneId && !zone) {
      timeData.timezone = zoneId;
    }
    return new _Time(timeData, zone);
  }
  /**
   * Returns a new ICAL.Time instance from a date or date-time string,
   *
   * @param {String} aValue         The string to create from
   * @param {Property=} prop        The property the date belongs to
   * @return {Time}                 The date/time instance
   */
  static fromString(aValue, aProperty) {
    if (aValue.length > 10) {
      return _Time.fromDateTimeString(aValue, aProperty);
    } else {
      return _Time.fromDateString(aValue);
    }
  }
  /**
   * Creates a new ICAL.Time instance from the given Javascript Date.
   *
   * @param {?Date} aDate             The Javascript Date to read, or null to reset
   * @param {Boolean} [useUTC=false]  If true, the UTC values of the date will be used
   */
  static fromJSDate(aDate, useUTC) {
    let tt = new _Time();
    return tt.fromJSDate(aDate, useUTC);
  }
  /**
   * Creates a new ICAL.Time instance from the the passed data object.
   *
   * @param {timeInit} aData          Time initialization
   * @param {Timezone=} aZone         Timezone this position occurs in
   */
  static fromData = function fromData(aData, aZone) {
    let t = new _Time();
    return t.fromData(aData, aZone);
  };
  /**
   * Creates a new ICAL.Time instance from the current moment.
   * The instance is “floating” - has no timezone relation.
   * To create an instance considering the time zone, call
   * ICAL.Time.fromJSDate(new Date(), true)
   * @return {Time}
   */
  static now() {
    return _Time.fromJSDate(/* @__PURE__ */ new Date(), false);
  }
  /**
   * Returns the date on which ISO week number 1 starts.
   *
   * @see Time#weekNumber
   * @param {Number} aYear                  The year to search in
   * @param {weekDay=} aWeekStart           The week start weekday, used for calculation.
   * @return {Time}                         The date on which week number 1 starts
   */
  static weekOneStarts(aYear, aWeekStart) {
    let t = _Time.fromData({
      year: aYear,
      month: 1,
      day: 1,
      isDate: true
    });
    let dow = t.dayOfWeek();
    let wkst = aWeekStart || _Time.DEFAULT_WEEK_START;
    if (dow > _Time.THURSDAY) {
      t.day += 7;
    }
    if (wkst > _Time.THURSDAY) {
      t.day -= 7;
    }
    t.day -= dow - wkst;
    return t;
  }
  /**
   * Get the dominical letter for the given year. Letters range from A - G for
   * common years, and AG to GF for leap years.
   *
   * @param {Number} yr           The year to retrieve the letter for
   * @return {String}             The dominical letter.
   */
  static getDominicalLetter(yr) {
    let LTRS = "GFEDCBA";
    let dom = (yr + (yr / 4 | 0) + (yr / 400 | 0) - (yr / 100 | 0) - 1) % 7;
    let isLeap = _Time.isLeapYear(yr);
    if (isLeap) {
      return LTRS[(dom + 6) % 7] + LTRS[dom];
    } else {
      return LTRS[dom];
    }
  }
  static #epochTime = null;
  /**
   * January 1st, 1970 as an ICAL.Time.
   * @type {Time}
   * @constant
   * @instance
   */
  static get epochTime() {
    if (!this.#epochTime) {
      this.#epochTime = _Time.fromData({
        year: 1970,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        isDate: false,
        timezone: "Z"
      });
    }
    return this.#epochTime;
  }
  static _cmp_attr(a, b, attr) {
    if (a[attr] > b[attr]) return 1;
    if (a[attr] < b[attr]) return -1;
    return 0;
  }
  /**
   * The days that have passed in the year after a given month. The array has
   * two members, one being an array of passed days for non-leap years, the
   * other analog for leap years.
   * @example
   * var isLeapYear = ICAL.Time.isLeapYear(year);
   * var passedDays = ICAL.Time.daysInYearPassedMonth[isLeapYear][month];
   * @type {Array.<Array.<Number>>}
   */
  static daysInYearPassedMonth = [
    [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
    [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366]
  ];
  static SUNDAY = 1;
  static MONDAY = 2;
  static TUESDAY = 3;
  static WEDNESDAY = 4;
  static THURSDAY = 5;
  static FRIDAY = 6;
  static SATURDAY = 7;
  /**
   * The default weekday for the WKST part.
   * @constant
   * @default ICAL.Time.MONDAY
   */
  static DEFAULT_WEEK_START = 2;
  // MONDAY
  /**
   * Creates a new ICAL.Time instance.
   *
   * @param {timeInit} data           Time initialization
   * @param {Timezone} zone           timezone this position occurs in
   */
  constructor(data, zone) {
    this.wrappedJSObject = this;
    this._time = /* @__PURE__ */ Object.create(null);
    this._time.year = 0;
    this._time.month = 1;
    this._time.day = 1;
    this._time.hour = 0;
    this._time.minute = 0;
    this._time.second = 0;
    this._time.isDate = false;
    this.fromData(data, zone);
  }
  /**
   * The class identifier.
   * @constant
   * @type {String}
   * @default "icaltime"
   */
  icalclass = "icaltime";
  _cachedUnixTime = null;
  /**
   * The type name, to be used in the jCal object. This value may change and
   * is strictly defined by the {@link ICAL.Time#isDate isDate} member.
   * @type {String}
   * @default "date-time"
   */
  get icaltype() {
    return this.isDate ? "date" : "date-time";
  }
  /**
   * The timezone for this time.
   * @type {Timezone}
   */
  zone = null;
  /**
   * Internal uses to indicate that a change has been made and the next read
   * operation must attempt to normalize the value (for example changing the
   * day to 33).
   *
   * @type {Boolean}
   * @private
   */
  _pendingNormalization = false;
  /**
   * The year of this date.
   * @type {Number}
   */
  get year() {
    return this._getTimeAttr("year");
  }
  set year(val) {
    this._setTimeAttr("year", val);
  }
  /**
   * The month of this date.
   * @type {Number}
   */
  get month() {
    return this._getTimeAttr("month");
  }
  set month(val) {
    this._setTimeAttr("month", val);
  }
  /**
   * The day of this date.
   * @type {Number}
   */
  get day() {
    return this._getTimeAttr("day");
  }
  set day(val) {
    this._setTimeAttr("day", val);
  }
  /**
   * The hour of this date-time.
   * @type {Number}
   */
  get hour() {
    return this._getTimeAttr("hour");
  }
  set hour(val) {
    this._setTimeAttr("hour", val);
  }
  /**
   * The minute of this date-time.
   * @type {Number}
   */
  get minute() {
    return this._getTimeAttr("minute");
  }
  set minute(val) {
    this._setTimeAttr("minute", val);
  }
  /**
   * The second of this date-time.
   * @type {Number}
   */
  get second() {
    return this._getTimeAttr("second");
  }
  set second(val) {
    this._setTimeAttr("second", val);
  }
  /**
   * If true, the instance represents a date (as opposed to a date-time)
   * @type {Boolean}
   */
  get isDate() {
    return this._getTimeAttr("isDate");
  }
  set isDate(val) {
    this._setTimeAttr("isDate", val);
  }
  /**
   * @private
   * @param {String} attr             Attribute to get (one of: year, month,
   *                                  day, hour, minute, second, isDate)
   * @return {Number|Boolean}         Current value for the attribute
   */
  _getTimeAttr(attr) {
    if (this._pendingNormalization) {
      this._normalize();
      this._pendingNormalization = false;
    }
    return this._time[attr];
  }
  /**
   * @private
   * @param {String} attr             Attribute to set (one of: year, month,
   *                                  day, hour, minute, second, isDate)
   * @param {Number|Boolean} val      New value for the attribute
   */
  _setTimeAttr(attr, val) {
    if (attr === "isDate" && val && !this._time.isDate) {
      this.adjust(0, 0, 0, 0);
    }
    this._cachedUnixTime = null;
    this._pendingNormalization = true;
    this._time[attr] = val;
  }
  /**
   * Returns a clone of the time object.
   *
   * @return {Time}              The cloned object
   */
  clone() {
    return new _Time(this._time, this.zone);
  }
  /**
   * Reset the time instance to epoch time
   */
  reset() {
    this.fromData(_Time.epochTime);
    this.zone = Timezone.utcTimezone;
  }
  /**
   * Reset the time instance to the given date/time values.
   *
   * @param {Number} year             The year to set
   * @param {Number} month            The month to set
   * @param {Number} day              The day to set
   * @param {Number} hour             The hour to set
   * @param {Number} minute           The minute to set
   * @param {Number} second           The second to set
   * @param {Timezone} timezone       The timezone to set
   */
  resetTo(year, month, day, hour, minute, second, timezone) {
    this.fromData({
      year,
      month,
      day,
      hour,
      minute,
      second,
      zone: timezone
    });
  }
  /**
   * Set up the current instance from the Javascript date value.
   *
   * @param {?Date} aDate             The Javascript Date to read, or null to reset
   * @param {Boolean} [useUTC=false]  If true, the UTC values of the date will be used
   */
  fromJSDate(aDate, useUTC) {
    if (!aDate) {
      this.reset();
    } else {
      if (useUTC) {
        this.zone = Timezone.utcTimezone;
        this.year = aDate.getUTCFullYear();
        this.month = aDate.getUTCMonth() + 1;
        this.day = aDate.getUTCDate();
        this.hour = aDate.getUTCHours();
        this.minute = aDate.getUTCMinutes();
        this.second = aDate.getUTCSeconds();
      } else {
        this.zone = Timezone.localTimezone;
        this.year = aDate.getFullYear();
        this.month = aDate.getMonth() + 1;
        this.day = aDate.getDate();
        this.hour = aDate.getHours();
        this.minute = aDate.getMinutes();
        this.second = aDate.getSeconds();
      }
    }
    this._cachedUnixTime = null;
    return this;
  }
  /**
   * Sets up the current instance using members from the passed data object.
   *
   * @param {timeInit} aData          Time initialization
   * @param {Timezone=} aZone         Timezone this position occurs in
   */
  fromData(aData, aZone) {
    if (aData) {
      for (let [key, value] of Object.entries(aData)) {
        if (key === "icaltype") continue;
        this[key] = value;
      }
    }
    if (aZone) {
      this.zone = aZone;
    }
    if (aData && !("isDate" in aData)) {
      this.isDate = !("hour" in aData);
    } else if (aData && "isDate" in aData) {
      this.isDate = aData.isDate;
    }
    if (aData && "timezone" in aData) {
      let zone = TimezoneService.get(
        aData.timezone
      );
      this.zone = zone || Timezone.localTimezone;
    }
    if (aData && "zone" in aData) {
      this.zone = aData.zone;
    }
    if (!this.zone) {
      this.zone = Timezone.localTimezone;
    }
    this._cachedUnixTime = null;
    return this;
  }
  /**
   * Calculate the day of week.
   * @param {weekDay=} aWeekStart
   *        The week start weekday, defaults to SUNDAY
   * @return {weekDay}
   */
  dayOfWeek(aWeekStart) {
    let firstDow = aWeekStart || _Time.SUNDAY;
    let dowCacheKey = (this.year << 12) + (this.month << 8) + (this.day << 3) + firstDow;
    if (dowCacheKey in _Time._dowCache) {
      return _Time._dowCache[dowCacheKey];
    }
    let q = this.day;
    let m = this.month + (this.month < 3 ? 12 : 0);
    let Y = this.year - (this.month < 3 ? 1 : 0);
    let h = q + Y + trunc((m + 1) * 26 / 10) + trunc(Y / 4);
    {
      h += trunc(Y / 100) * 6 + trunc(Y / 400);
    }
    h = (h + 7 - firstDow) % 7 + 1;
    _Time._dowCache[dowCacheKey] = h;
    return h;
  }
  /**
   * Calculate the day of year.
   * @return {Number}
   */
  dayOfYear() {
    let is_leap = _Time.isLeapYear(this.year) ? 1 : 0;
    let diypm = _Time.daysInYearPassedMonth;
    return diypm[is_leap][this.month - 1] + this.day;
  }
  /**
   * Returns a copy of the current date/time, rewound to the start of the
   * week. The resulting ICAL.Time instance is of icaltype date, even if this
   * is a date-time.
   *
   * @param {weekDay=} aWeekStart
   *        The week start weekday, defaults to SUNDAY
   * @return {Time}      The start of the week (cloned)
   */
  startOfWeek(aWeekStart) {
    let firstDow = aWeekStart || _Time.SUNDAY;
    let result = this.clone();
    result.day -= (this.dayOfWeek() + 7 - firstDow) % 7;
    result.isDate = true;
    result.hour = 0;
    result.minute = 0;
    result.second = 0;
    return result;
  }
  /**
   * Returns a copy of the current date/time, shifted to the end of the week.
   * The resulting ICAL.Time instance is of icaltype date, even if this is a
   * date-time.
   *
   * @param {weekDay=} aWeekStart
   *        The week start weekday, defaults to SUNDAY
   * @return {Time}      The end of the week (cloned)
   */
  endOfWeek(aWeekStart) {
    let firstDow = aWeekStart || _Time.SUNDAY;
    let result = this.clone();
    result.day += (7 - this.dayOfWeek() + firstDow - _Time.SUNDAY) % 7;
    result.isDate = true;
    result.hour = 0;
    result.minute = 0;
    result.second = 0;
    return result;
  }
  /**
   * Returns a copy of the current date/time, rewound to the start of the
   * month. The resulting ICAL.Time instance is of icaltype date, even if
   * this is a date-time.
   *
   * @return {Time}      The start of the month (cloned)
   */
  startOfMonth() {
    let result = this.clone();
    result.day = 1;
    result.isDate = true;
    result.hour = 0;
    result.minute = 0;
    result.second = 0;
    return result;
  }
  /**
   * Returns a copy of the current date/time, shifted to the end of the
   * month.  The resulting ICAL.Time instance is of icaltype date, even if
   * this is a date-time.
   *
   * @return {Time}      The end of the month (cloned)
   */
  endOfMonth() {
    let result = this.clone();
    result.day = _Time.daysInMonth(result.month, result.year);
    result.isDate = true;
    result.hour = 0;
    result.minute = 0;
    result.second = 0;
    return result;
  }
  /**
   * Returns a copy of the current date/time, rewound to the start of the
   * year. The resulting ICAL.Time instance is of icaltype date, even if
   * this is a date-time.
   *
   * @return {Time}      The start of the year (cloned)
   */
  startOfYear() {
    let result = this.clone();
    result.day = 1;
    result.month = 1;
    result.isDate = true;
    result.hour = 0;
    result.minute = 0;
    result.second = 0;
    return result;
  }
  /**
   * Returns a copy of the current date/time, shifted to the end of the
   * year.  The resulting ICAL.Time instance is of icaltype date, even if
   * this is a date-time.
   *
   * @return {Time}      The end of the year (cloned)
   */
  endOfYear() {
    let result = this.clone();
    result.day = 31;
    result.month = 12;
    result.isDate = true;
    result.hour = 0;
    result.minute = 0;
    result.second = 0;
    return result;
  }
  /**
   * First calculates the start of the week, then returns the day of year for
   * this date. If the day falls into the previous year, the day is zero or negative.
   *
   * @param {weekDay=} aFirstDayOfWeek
   *        The week start weekday, defaults to SUNDAY
   * @return {Number}     The calculated day of year
   */
  startDoyWeek(aFirstDayOfWeek) {
    let firstDow = aFirstDayOfWeek || _Time.SUNDAY;
    let delta = this.dayOfWeek() - firstDow;
    if (delta < 0) delta += 7;
    return this.dayOfYear() - delta;
  }
  /**
   * Get the dominical letter for the current year. Letters range from A - G
   * for common years, and AG to GF for leap years.
   *
   * @param {Number} yr           The year to retrieve the letter for
   * @return {String}             The dominical letter.
   */
  getDominicalLetter() {
    return _Time.getDominicalLetter(this.year);
  }
  /**
   * Finds the nthWeekDay relative to the current month (not day).  The
   * returned value is a day relative the month that this month belongs to so
   * 1 would indicate the first of the month and 40 would indicate a day in
   * the following month.
   *
   * @param {Number} aDayOfWeek   Day of the week see the day name constants
   * @param {Number} aPos         Nth occurrence of a given week day values
   *        of 1 and 0 both indicate the first weekday of that type. aPos may
   *        be either positive or negative
   *
   * @return {Number} numeric value indicating a day relative
   *                   to the current month of this time object
   */
  nthWeekDay(aDayOfWeek, aPos) {
    let daysInMonth = _Time.daysInMonth(this.month, this.year);
    let weekday;
    let pos = aPos;
    let start = 0;
    let otherDay = this.clone();
    if (pos >= 0) {
      otherDay.day = 1;
      if (pos != 0) {
        pos--;
      }
      start = otherDay.day;
      let startDow = otherDay.dayOfWeek();
      let offset = aDayOfWeek - startDow;
      if (offset < 0)
        offset += 7;
      start += offset;
      start -= aDayOfWeek;
      weekday = aDayOfWeek;
    } else {
      otherDay.day = daysInMonth;
      let endDow = otherDay.dayOfWeek();
      pos++;
      weekday = endDow - aDayOfWeek;
      if (weekday < 0) {
        weekday += 7;
      }
      weekday = daysInMonth - weekday;
    }
    weekday += pos * 7;
    return start + weekday;
  }
  /**
   * Checks if current time is the nth weekday, relative to the current
   * month.  Will always return false when rule resolves outside of current
   * month.
   *
   * @param {weekDay} aDayOfWeek                 Day of week to check
   * @param {Number} aPos                        Relative position
   * @return {Boolean}                           True, if it is the nth weekday
   */
  isNthWeekDay(aDayOfWeek, aPos) {
    let dow = this.dayOfWeek();
    if (aPos === 0 && dow === aDayOfWeek) {
      return true;
    }
    let day = this.nthWeekDay(aDayOfWeek, aPos);
    if (day === this.day) {
      return true;
    }
    return false;
  }
  /**
   * Calculates the ISO 8601 week number. The first week of a year is the
   * week that contains the first Thursday. The year can have 53 weeks, if
   * January 1st is a Friday.
   *
   * Note there are regions where the first week of the year is the one that
   * starts on January 1st, which may offset the week number. Also, if a
   * different week start is specified, this will also affect the week
   * number.
   *
   * @see Time.weekOneStarts
   * @param {weekDay} aWeekStart                  The weekday the week starts with
   * @return {Number}                             The ISO week number
   */
  weekNumber(aWeekStart) {
    let wnCacheKey = (this.year << 12) + (this.month << 8) + (this.day << 3) + aWeekStart;
    if (wnCacheKey in _Time._wnCache) {
      return _Time._wnCache[wnCacheKey];
    }
    let week1;
    let dt = this.clone();
    dt.isDate = true;
    let isoyear = this.year;
    if (dt.month == 12 && dt.day > 25) {
      week1 = _Time.weekOneStarts(isoyear + 1, aWeekStart);
      if (dt.compare(week1) < 0) {
        week1 = _Time.weekOneStarts(isoyear, aWeekStart);
      } else {
        isoyear++;
      }
    } else {
      week1 = _Time.weekOneStarts(isoyear, aWeekStart);
      if (dt.compare(week1) < 0) {
        week1 = _Time.weekOneStarts(--isoyear, aWeekStart);
      }
    }
    let daysBetween2 = dt.subtractDate(week1).toSeconds() / 86400;
    let answer = trunc(daysBetween2 / 7) + 1;
    _Time._wnCache[wnCacheKey] = answer;
    return answer;
  }
  /**
   * Adds the duration to the current time. The instance is modified in
   * place.
   *
   * @param {Duration} aDuration         The duration to add
   */
  addDuration(aDuration) {
    let mult = aDuration.isNegative ? -1 : 1;
    let second = this.second;
    let minute = this.minute;
    let hour = this.hour;
    let day = this.day;
    second += mult * aDuration.seconds;
    minute += mult * aDuration.minutes;
    hour += mult * aDuration.hours;
    day += mult * aDuration.days;
    day += mult * 7 * aDuration.weeks;
    this.second = second;
    this.minute = minute;
    this.hour = hour;
    this.day = day;
    this._cachedUnixTime = null;
  }
  /**
   * Subtract the date details (_excluding_ timezone).  Useful for finding
   * the relative difference between two time objects excluding their
   * timezone differences.
   *
   * @param {Time} aDate     The date to subtract
   * @return {Duration}      The difference as a duration
   */
  subtractDate(aDate) {
    let unixTime = this.toUnixTime() + this.utcOffset();
    let other = aDate.toUnixTime() + aDate.utcOffset();
    return Duration.fromSeconds(unixTime - other);
  }
  /**
   * Subtract the date details, taking timezones into account.
   *
   * @param {Time} aDate  The date to subtract
   * @return {Duration}   The difference in duration
   */
  subtractDateTz(aDate) {
    let unixTime = this.toUnixTime();
    let other = aDate.toUnixTime();
    return Duration.fromSeconds(unixTime - other);
  }
  /**
   * Compares the ICAL.Time instance with another one, or a period.
   *
   * @param {Time|Period} aOther                  The instance to compare with
   * @return {Number}                             -1, 0 or 1 for less/equal/greater
   */
  compare(other) {
    if (other instanceof Period) {
      return -1 * other.compare(this);
    } else {
      let a = this.toUnixTime();
      let b = other.toUnixTime();
      if (a > b) return 1;
      if (b > a) return -1;
      return 0;
    }
  }
  /**
   * Compares only the date part of this instance with another one.
   *
   * @param {Time} other                  The instance to compare with
   * @param {Timezone} tz                 The timezone to compare in
   * @return {Number}                     -1, 0 or 1 for less/equal/greater
   */
  compareDateOnlyTz(other, tz) {
    let a = this.convertToZone(tz);
    let b = other.convertToZone(tz);
    let rc = 0;
    if ((rc = _Time._cmp_attr(a, b, "year")) != 0) return rc;
    if ((rc = _Time._cmp_attr(a, b, "month")) != 0) return rc;
    if ((rc = _Time._cmp_attr(a, b, "day")) != 0) return rc;
    return rc;
  }
  /**
   * Convert the instance into another timezone. The returned ICAL.Time
   * instance is always a copy.
   *
   * @param {Timezone} zone      The zone to convert to
   * @return {Time}              The copy, converted to the zone
   */
  convertToZone(zone) {
    let copy = this.clone();
    let zone_equals = this.zone.tzid == zone.tzid;
    if (!this.isDate && !zone_equals) {
      Timezone.convert_time(copy, this.zone, zone);
    }
    copy.zone = zone;
    return copy;
  }
  /**
   * Calculates the UTC offset of the current date/time in the timezone it is
   * in.
   *
   * @return {Number}     UTC offset in seconds
   */
  utcOffset() {
    if (this.zone == Timezone.localTimezone || this.zone == Timezone.utcTimezone) {
      return 0;
    } else {
      return this.zone.utcOffset(this);
    }
  }
  /**
   * Returns an RFC 5545 compliant ical representation of this object.
   *
   * @return {String} ical date/date-time
   */
  toICALString() {
    let string = this.toString();
    if (string.length > 10) {
      return design.icalendar.value["date-time"].toICAL(string);
    } else {
      return design.icalendar.value.date.toICAL(string);
    }
  }
  /**
   * The string representation of this date/time, in jCal form
   * (including : and - separators).
   * @return {String}
   */
  toString() {
    let result = this.year + "-" + pad2(this.month) + "-" + pad2(this.day);
    if (!this.isDate) {
      result += "T" + pad2(this.hour) + ":" + pad2(this.minute) + ":" + pad2(this.second);
      if (this.zone === Timezone.utcTimezone) {
        result += "Z";
      }
    }
    return result;
  }
  /**
   * Converts the current instance to a Javascript date
   * @return {Date}
   */
  toJSDate() {
    if (this.zone == Timezone.localTimezone) {
      if (this.isDate) {
        return new Date(this.year, this.month - 1, this.day);
      } else {
        return new Date(
          this.year,
          this.month - 1,
          this.day,
          this.hour,
          this.minute,
          this.second,
          0
        );
      }
    } else {
      return new Date(this.toUnixTime() * 1e3);
    }
  }
  _normalize() {
    if (this._time.isDate) {
      this._time.hour = 0;
      this._time.minute = 0;
      this._time.second = 0;
    }
    this.adjust(0, 0, 0, 0);
    return this;
  }
  /**
   * Adjust the date/time by the given offset
   *
   * @param {Number} aExtraDays       The extra amount of days
   * @param {Number} aExtraHours      The extra amount of hours
   * @param {Number} aExtraMinutes    The extra amount of minutes
   * @param {Number} aExtraSeconds    The extra amount of seconds
   * @param {Number=} aTime           The time to adjust, defaults to the
   *                                    current instance.
   */
  adjust(aExtraDays, aExtraHours, aExtraMinutes, aExtraSeconds, aTime) {
    let minutesOverflow, hoursOverflow, daysOverflow = 0, yearsOverflow = 0;
    let second, minute, hour, day;
    let daysInMonth;
    let time = aTime || this._time;
    if (!time.isDate) {
      second = time.second + aExtraSeconds;
      time.second = second % 60;
      minutesOverflow = trunc(second / 60);
      if (time.second < 0) {
        time.second += 60;
        minutesOverflow--;
      }
      minute = time.minute + aExtraMinutes + minutesOverflow;
      time.minute = minute % 60;
      hoursOverflow = trunc(minute / 60);
      if (time.minute < 0) {
        time.minute += 60;
        hoursOverflow--;
      }
      hour = time.hour + aExtraHours + hoursOverflow;
      time.hour = hour % 24;
      daysOverflow = trunc(hour / 24);
      if (time.hour < 0) {
        time.hour += 24;
        daysOverflow--;
      }
    }
    if (time.month > 12) {
      yearsOverflow = trunc((time.month - 1) / 12);
    } else if (time.month < 1) {
      yearsOverflow = trunc(time.month / 12) - 1;
    }
    time.year += yearsOverflow;
    time.month -= 12 * yearsOverflow;
    day = time.day + aExtraDays + daysOverflow;
    if (day > 0) {
      for (; ; ) {
        daysInMonth = _Time.daysInMonth(time.month, time.year);
        if (day <= daysInMonth) {
          break;
        }
        time.month++;
        if (time.month > 12) {
          time.year++;
          time.month = 1;
        }
        day -= daysInMonth;
      }
    } else {
      while (day <= 0) {
        if (time.month == 1) {
          time.year--;
          time.month = 12;
        } else {
          time.month--;
        }
        day += _Time.daysInMonth(time.month, time.year);
      }
    }
    time.day = day;
    this._cachedUnixTime = null;
    return this;
  }
  /**
   * Sets up the current instance from unix time, the number of seconds since
   * January 1st, 1970.
   *
   * @param {Number} seconds      The seconds to set up with
   */
  fromUnixTime(seconds) {
    this.zone = Timezone.utcTimezone;
    let date = new Date(seconds * 1e3);
    this.year = date.getUTCFullYear();
    this.month = date.getUTCMonth() + 1;
    this.day = date.getUTCDate();
    if (this._time.isDate) {
      this.hour = 0;
      this.minute = 0;
      this.second = 0;
    } else {
      this.hour = date.getUTCHours();
      this.minute = date.getUTCMinutes();
      this.second = date.getUTCSeconds();
    }
    this._cachedUnixTime = null;
  }
  /**
   * Converts the current instance to seconds since January 1st 1970.
   *
   * @return {Number}         Seconds since 1970
   */
  toUnixTime() {
    if (this._cachedUnixTime !== null) {
      return this._cachedUnixTime;
    }
    let offset = this.utcOffset();
    let ms = Date.UTC(
      this.year,
      this.month - 1,
      this.day,
      this.hour,
      this.minute,
      this.second - offset
    );
    this._cachedUnixTime = ms / 1e3;
    return this._cachedUnixTime;
  }
  /**
   * Converts time to into Object which can be serialized then re-created
   * using the constructor.
   *
   * @example
   * // toJSON will automatically be called
   * var json = JSON.stringify(mytime);
   *
   * var deserialized = JSON.parse(json);
   *
   * var time = new ICAL.Time(deserialized);
   *
   * @return {Object}
   */
  toJSON() {
    let copy = [
      "year",
      "month",
      "day",
      "hour",
      "minute",
      "second",
      "isDate"
    ];
    let result = /* @__PURE__ */ Object.create(null);
    let i = 0;
    let len = copy.length;
    let prop;
    for (; i < len; i++) {
      prop = copy[i];
      result[prop] = this[prop];
    }
    if (this.zone) {
      result.timezone = this.zone.tzid;
    }
    return result;
  }
};
var CHAR = /[^ \t]/;
var VALUE_DELIMITER = ":";
var PARAM_DELIMITER = ";";
var PARAM_NAME_DELIMITER = "=";
var DEFAULT_VALUE_TYPE$1 = "unknown";
var DEFAULT_PARAM_TYPE = "text";
var RFC6868_REPLACE_MAP$1 = { "^'": '"', "^n": "\n", "^^": "^" };
function parse(input) {
  let state = {};
  let root = state.component = [];
  state.stack = [root];
  parse._eachLine(input, function(err, line) {
    parse._handleContentLine(line, state);
  });
  if (state.stack.length > 1) {
    throw new ParserError(
      "invalid ical body. component began but did not end"
    );
  }
  state = null;
  return root.length == 1 ? root[0] : root;
}
parse.property = function(str, designSet) {
  let state = {
    component: [[], []],
    designSet: designSet || design.defaultSet
  };
  parse._handleContentLine(str, state);
  return state.component[1][0];
};
parse.component = function(str) {
  return parse(str);
};
var ParserError = class extends Error {
  name = this.constructor.name;
};
parse.ParserError = ParserError;
parse._handleContentLine = function(line, state) {
  let valuePos = line.indexOf(VALUE_DELIMITER);
  let paramPos = line.indexOf(PARAM_DELIMITER);
  let lastParamIndex;
  let lastValuePos;
  let name;
  let value;
  let params = {};
  if (paramPos !== -1 && valuePos !== -1) {
    if (paramPos > valuePos) {
      paramPos = -1;
    }
  }
  let parsedParams;
  if (paramPos !== -1) {
    name = line.slice(0, Math.max(0, paramPos)).toLowerCase();
    parsedParams = parse._parseParameters(line.slice(Math.max(0, paramPos)), 0, state.designSet);
    if (parsedParams[2] == -1) {
      throw new ParserError("Invalid parameters in '" + line + "'");
    }
    params = parsedParams[0];
    let parsedParamLength;
    if (typeof parsedParams[1] === "string") {
      parsedParamLength = parsedParams[1].length;
    } else {
      parsedParamLength = parsedParams[1].reduce((accumulator, currentValue) => {
        return accumulator + currentValue.length;
      }, 0);
    }
    lastParamIndex = parsedParamLength + parsedParams[2] + paramPos;
    if ((lastValuePos = line.slice(Math.max(0, lastParamIndex)).indexOf(VALUE_DELIMITER)) !== -1) {
      value = line.slice(Math.max(0, lastParamIndex + lastValuePos + 1));
    } else {
      throw new ParserError("Missing parameter value in '" + line + "'");
    }
  } else if (valuePos !== -1) {
    name = line.slice(0, Math.max(0, valuePos)).toLowerCase();
    value = line.slice(Math.max(0, valuePos + 1));
    if (name === "begin") {
      let newComponent = [value.toLowerCase(), [], []];
      if (state.stack.length === 1) {
        state.component.push(newComponent);
      } else {
        state.component[2].push(newComponent);
      }
      state.stack.push(state.component);
      state.component = newComponent;
      if (!state.designSet) {
        state.designSet = design.getDesignSet(state.component[0]);
      }
      return;
    } else if (name === "end") {
      state.component = state.stack.pop();
      return;
    }
  } else {
    throw new ParserError(
      'invalid line (no token ";" or ":") "' + line + '"'
    );
  }
  let valueType;
  let multiValue = false;
  let structuredValue = false;
  let propertyDetails;
  let splitName;
  let ungroupedName;
  if (state.designSet.propertyGroups && name.indexOf(".") !== -1) {
    splitName = name.split(".");
    params.group = splitName[0];
    ungroupedName = splitName[1];
  } else {
    ungroupedName = name;
  }
  if (ungroupedName in state.designSet.property) {
    propertyDetails = state.designSet.property[ungroupedName];
    if ("multiValue" in propertyDetails) {
      multiValue = propertyDetails.multiValue;
    }
    if ("structuredValue" in propertyDetails) {
      structuredValue = propertyDetails.structuredValue;
    }
    if (value && "detectType" in propertyDetails) {
      valueType = propertyDetails.detectType(value);
    }
  }
  if (!valueType) {
    if (!("value" in params)) {
      if (propertyDetails) {
        valueType = propertyDetails.defaultType;
      } else {
        valueType = DEFAULT_VALUE_TYPE$1;
      }
    } else {
      valueType = params.value.toLowerCase();
    }
  }
  delete params.value;
  let result;
  if (multiValue && structuredValue) {
    value = parse._parseMultiValue(value, structuredValue, valueType, [], multiValue, state.designSet, structuredValue);
    result = [ungroupedName, params, valueType, value];
  } else if (multiValue) {
    result = [ungroupedName, params, valueType];
    parse._parseMultiValue(value, multiValue, valueType, result, null, state.designSet, false);
  } else if (structuredValue) {
    value = parse._parseMultiValue(value, structuredValue, valueType, [], null, state.designSet, structuredValue);
    result = [ungroupedName, params, valueType, value];
  } else {
    value = parse._parseValue(value, valueType, state.designSet, false);
    result = [ungroupedName, params, valueType, value];
  }
  if (state.component[0] === "vcard" && state.component[1].length === 0 && !(name === "version" && value === "4.0")) {
    state.designSet = design.getDesignSet("vcard3");
  }
  state.component[1].push(result);
};
parse._parseValue = function(value, type, designSet, structuredValue) {
  if (type in designSet.value && "fromICAL" in designSet.value[type]) {
    return designSet.value[type].fromICAL(value, structuredValue);
  }
  return value;
};
parse._parseParameters = function(line, start, designSet) {
  let lastParam = start;
  let pos = 0;
  let delim = PARAM_NAME_DELIMITER;
  let result = {};
  let name, lcname;
  let value, valuePos = -1;
  let type, multiValue, mvdelim;
  while (pos !== false && (pos = line.indexOf(delim, pos + 1)) !== -1) {
    name = line.slice(lastParam + 1, pos);
    if (name.length == 0) {
      throw new ParserError("Empty parameter name in '" + line + "'");
    }
    lcname = name.toLowerCase();
    mvdelim = false;
    multiValue = false;
    if (lcname in designSet.param && designSet.param[lcname].valueType) {
      type = designSet.param[lcname].valueType;
    } else {
      type = DEFAULT_PARAM_TYPE;
    }
    if (lcname in designSet.param) {
      multiValue = designSet.param[lcname].multiValue;
      if (designSet.param[lcname].multiValueSeparateDQuote) {
        mvdelim = parse._rfc6868Escape('"' + multiValue + '"');
      }
    }
    let nextChar = line[pos + 1];
    if (nextChar === '"') {
      valuePos = pos + 2;
      pos = line.indexOf('"', valuePos);
      if (multiValue && pos != -1) {
        let extendedValue = true;
        while (extendedValue) {
          if (line[pos + 1] == multiValue && line[pos + 2] == '"') {
            pos = line.indexOf('"', pos + 3);
          } else {
            extendedValue = false;
          }
        }
      }
      if (pos === -1) {
        throw new ParserError(
          'invalid line (no matching double quote) "' + line + '"'
        );
      }
      value = line.slice(valuePos, pos);
      lastParam = line.indexOf(PARAM_DELIMITER, pos);
      let propValuePos = line.indexOf(VALUE_DELIMITER, pos);
      if (lastParam === -1 || propValuePos !== -1 && lastParam > propValuePos) {
        pos = false;
      }
    } else {
      valuePos = pos + 1;
      let nextPos = line.indexOf(PARAM_DELIMITER, valuePos);
      let propValuePos = line.indexOf(VALUE_DELIMITER, valuePos);
      if (propValuePos !== -1 && nextPos > propValuePos) {
        nextPos = propValuePos;
        pos = false;
      } else if (nextPos === -1) {
        if (propValuePos === -1) {
          nextPos = line.length;
        } else {
          nextPos = propValuePos;
        }
        pos = false;
      } else {
        lastParam = nextPos;
        pos = nextPos;
      }
      value = line.slice(valuePos, nextPos);
    }
    const length_before = value.length;
    value = parse._rfc6868Escape(value);
    valuePos += length_before - value.length;
    if (multiValue) {
      let delimiter = mvdelim || multiValue;
      value = parse._parseMultiValue(value, delimiter, type, [], null, designSet);
    } else {
      value = parse._parseValue(value, type, designSet);
    }
    if (multiValue && lcname in result) {
      if (Array.isArray(result[lcname])) {
        result[lcname].push(value);
      } else {
        result[lcname] = [
          result[lcname],
          value
        ];
      }
    } else {
      result[lcname] = value;
    }
  }
  return [result, value, valuePos];
};
parse._rfc6868Escape = function(val) {
  return val.replace(/\^['n^]/g, function(x) {
    return RFC6868_REPLACE_MAP$1[x];
  });
};
parse._parseMultiValue = function(buffer, delim, type, result, innerMulti, designSet, structuredValue) {
  let pos = 0;
  let lastPos = 0;
  let value;
  if (delim.length === 0) {
    return buffer;
  }
  while ((pos = unescapedIndexOf(buffer, delim, lastPos)) !== -1) {
    value = buffer.slice(lastPos, pos);
    if (innerMulti) {
      value = parse._parseMultiValue(value, innerMulti, type, [], null, designSet, structuredValue);
    } else {
      value = parse._parseValue(value, type, designSet, structuredValue);
    }
    result.push(value);
    lastPos = pos + delim.length;
  }
  value = buffer.slice(lastPos);
  if (innerMulti) {
    value = parse._parseMultiValue(value, innerMulti, type, [], null, designSet, structuredValue);
  } else {
    value = parse._parseValue(value, type, designSet, structuredValue);
  }
  result.push(value);
  return result.length == 1 ? result[0] : result;
};
parse._eachLine = function(buffer, callback) {
  let len = buffer.length;
  let lastPos = buffer.search(CHAR);
  let pos = lastPos;
  let line;
  let firstChar;
  let newlineOffset;
  do {
    pos = buffer.indexOf("\n", lastPos) + 1;
    if (pos > 1 && buffer[pos - 2] === "\r") {
      newlineOffset = 2;
    } else {
      newlineOffset = 1;
    }
    if (pos === 0) {
      pos = len;
      newlineOffset = 0;
    }
    firstChar = buffer[lastPos];
    if (firstChar === " " || firstChar === "	") {
      line += buffer.slice(lastPos + 1, pos - newlineOffset);
    } else {
      if (line)
        callback(null, line);
      line = buffer.slice(lastPos, pos - newlineOffset);
    }
    lastPos = pos;
  } while (pos !== len);
  line = line.trim();
  if (line.length)
    callback(null, line);
};
var OPTIONS = ["tzid", "location", "tznames", "latitude", "longitude"];
var Timezone = class _Timezone {
  static _compare_change_fn(a, b) {
    if (a.year < b.year) return -1;
    else if (a.year > b.year) return 1;
    if (a.month < b.month) return -1;
    else if (a.month > b.month) return 1;
    if (a.day < b.day) return -1;
    else if (a.day > b.day) return 1;
    if (a.hour < b.hour) return -1;
    else if (a.hour > b.hour) return 1;
    if (a.minute < b.minute) return -1;
    else if (a.minute > b.minute) return 1;
    if (a.second < b.second) return -1;
    else if (a.second > b.second) return 1;
    return 0;
  }
  /**
   * Convert the date/time from one zone to the next.
   *
   * @param {Time} tt                  The time to convert
   * @param {Timezone} from_zone       The source zone to convert from
   * @param {Timezone} to_zone         The target zone to convert to
   * @return {Time}                    The converted date/time object
   */
  static convert_time(tt, from_zone, to_zone) {
    if (tt.isDate || from_zone.tzid == to_zone.tzid || from_zone == _Timezone.localTimezone || to_zone == _Timezone.localTimezone) {
      tt.zone = to_zone;
      return tt;
    }
    let utcOffset = from_zone.utcOffset(tt);
    tt.adjust(0, 0, 0, -utcOffset);
    utcOffset = to_zone.utcOffset(tt);
    tt.adjust(0, 0, 0, utcOffset);
    return null;
  }
  /**
   * Creates a new ICAL.Timezone instance from the passed data object.
   *
   * @param {Component|Object} aData options for class
   * @param {String|Component} aData.component
   *        If aData is a simple object, then this member can be set to either a
   *        string containing the component data, or an already parsed
   *        ICAL.Component
   * @param {String} aData.tzid      The timezone identifier
   * @param {String} aData.location  The timezone locationw
   * @param {String} aData.tznames   An alternative string representation of the
   *                                  timezone
   * @param {Number} aData.latitude  The latitude of the timezone
   * @param {Number} aData.longitude The longitude of the timezone
   */
  static fromData(aData) {
    let tt = new _Timezone();
    return tt.fromData(aData);
  }
  /**
   * The instance describing the UTC timezone
   * @type {Timezone}
   * @constant
   * @instance
   */
  static #utcTimezone = null;
  static get utcTimezone() {
    if (!this.#utcTimezone) {
      this.#utcTimezone = _Timezone.fromData({
        tzid: "UTC"
      });
    }
    return this.#utcTimezone;
  }
  /**
   * The instance describing the local timezone
   * @type {Timezone}
   * @constant
   * @instance
   */
  static #localTimezone = null;
  static get localTimezone() {
    if (!this.#localTimezone) {
      this.#localTimezone = _Timezone.fromData({
        tzid: "floating"
      });
    }
    return this.#localTimezone;
  }
  /**
   * Adjust a timezone change object.
   * @private
   * @param {Object} change     The timezone change object
   * @param {Number} days       The extra amount of days
   * @param {Number} hours      The extra amount of hours
   * @param {Number} minutes    The extra amount of minutes
   * @param {Number} seconds    The extra amount of seconds
   */
  static adjust_change(change, days, hours, minutes, seconds) {
    return Time2.prototype.adjust.call(
      change,
      days,
      hours,
      minutes,
      seconds,
      change
    );
  }
  static _minimumExpansionYear = -1;
  static EXTRA_COVERAGE = 5;
  /**
   * Creates a new ICAL.Timezone instance, by passing in a tzid and component.
   *
   * @param {Component|Object} data options for class
   * @param {String|Component} data.component
   *        If data is a simple object, then this member can be set to either a
   *        string containing the component data, or an already parsed
   *        ICAL.Component
   * @param {String} data.tzid      The timezone identifier
   * @param {String} data.location  The timezone locationw
   * @param {String} data.tznames   An alternative string representation of the
   *                                  timezone
   * @param {Number} data.latitude  The latitude of the timezone
   * @param {Number} data.longitude The longitude of the timezone
   */
  constructor(data) {
    this.wrappedJSObject = this;
    this.fromData(data);
  }
  /**
   * Timezone identifier
   * @type {String}
   */
  tzid = "";
  /**
   * Timezone location
   * @type {String}
   */
  location = "";
  /**
   * Alternative timezone name, for the string representation
   * @type {String}
   */
  tznames = "";
  /**
   * The primary latitude for the timezone.
   * @type {Number}
   */
  latitude = 0;
  /**
   * The primary longitude for the timezone.
   * @type {Number}
   */
  longitude = 0;
  /**
   * The vtimezone component for this timezone.
   * @type {Component}
   */
  component = null;
  /**
   * The year this timezone has been expanded to. All timezone transition
   * dates until this year are known and can be used for calculation
   *
   * @private
   * @type {Number}
   */
  expandedUntilYear = 0;
  /**
   * The class identifier.
   * @constant
   * @type {String}
   * @default "icaltimezone"
   */
  icalclass = "icaltimezone";
  /**
   * Sets up the current instance using members from the passed data object.
   *
   * @param {Component|Object} aData options for class
   * @param {String|Component} aData.component
   *        If aData is a simple object, then this member can be set to either a
   *        string containing the component data, or an already parsed
   *        ICAL.Component
   * @param {String} aData.tzid      The timezone identifier
   * @param {String} aData.location  The timezone locationw
   * @param {String} aData.tznames   An alternative string representation of the
   *                                  timezone
   * @param {Number} aData.latitude  The latitude of the timezone
   * @param {Number} aData.longitude The longitude of the timezone
   */
  fromData(aData) {
    this.expandedUntilYear = 0;
    this.changes = [];
    if (aData instanceof Component) {
      this.component = aData;
    } else {
      if (aData && "component" in aData) {
        if (typeof aData.component == "string") {
          let jCal = parse(aData.component);
          this.component = new Component(jCal);
        } else if (aData.component instanceof Component) {
          this.component = aData.component;
        } else {
          this.component = null;
        }
      }
      for (let prop of OPTIONS) {
        if (aData && prop in aData) {
          this[prop] = aData[prop];
        }
      }
    }
    if (this.component instanceof Component && !this.tzid) {
      this.tzid = this.component.getFirstPropertyValue("tzid");
    }
    return this;
  }
  /**
   * Finds the utcOffset the given time would occur in this timezone.
   *
   * @param {Time} tt         The time to check for
   * @return {Number}         utc offset in seconds
   */
  utcOffset(tt) {
    if (this == _Timezone.utcTimezone || this == _Timezone.localTimezone) {
      return 0;
    }
    this._ensureCoverage(tt.year);
    if (!this.changes.length) {
      return 0;
    }
    let tt_change = {
      year: tt.year,
      month: tt.month,
      day: tt.day,
      hour: tt.hour,
      minute: tt.minute,
      second: tt.second
    };
    let change_num = this._findNearbyChange(tt_change);
    let change_num_to_use = -1;
    let step = 1;
    for (; ; ) {
      let change = clone3(this.changes[change_num], true);
      if (change.utcOffset < change.prevUtcOffset) {
        _Timezone.adjust_change(change, 0, 0, 0, change.utcOffset);
      } else {
        _Timezone.adjust_change(
          change,
          0,
          0,
          0,
          change.prevUtcOffset
        );
      }
      let cmp = _Timezone._compare_change_fn(tt_change, change);
      if (cmp >= 0) {
        change_num_to_use = change_num;
      } else {
        step = -1;
      }
      if (step == -1 && change_num_to_use != -1) {
        break;
      }
      change_num += step;
      if (change_num < 0) {
        return 0;
      }
      if (change_num >= this.changes.length) {
        break;
      }
    }
    let zone_change = this.changes[change_num_to_use];
    let utcOffset_change = zone_change.utcOffset - zone_change.prevUtcOffset;
    if (utcOffset_change < 0 && change_num_to_use > 0) {
      let tmp_change = clone3(zone_change, true);
      _Timezone.adjust_change(tmp_change, 0, 0, 0, tmp_change.prevUtcOffset);
      if (_Timezone._compare_change_fn(tt_change, tmp_change) < 0) {
        let prev_zone_change = this.changes[change_num_to_use - 1];
        let want_daylight = false;
        if (zone_change.is_daylight != want_daylight && prev_zone_change.is_daylight == want_daylight) {
          zone_change = prev_zone_change;
        }
      }
    }
    return zone_change.utcOffset;
  }
  _findNearbyChange(change) {
    let idx = binsearchInsert(
      this.changes,
      change,
      _Timezone._compare_change_fn
    );
    if (idx >= this.changes.length) {
      return this.changes.length - 1;
    }
    return idx;
  }
  _ensureCoverage(aYear) {
    if (_Timezone._minimumExpansionYear == -1) {
      let today = Time2.now();
      _Timezone._minimumExpansionYear = today.year;
    }
    let changesEndYear = aYear;
    if (changesEndYear < _Timezone._minimumExpansionYear) {
      changesEndYear = _Timezone._minimumExpansionYear;
    }
    changesEndYear += _Timezone.EXTRA_COVERAGE;
    if (!this.changes.length || this.expandedUntilYear < aYear) {
      let subcomps = this.component.getAllSubcomponents();
      let compLen = subcomps.length;
      let compIdx = 0;
      for (; compIdx < compLen; compIdx++) {
        this._expandComponent(
          subcomps[compIdx],
          changesEndYear,
          this.changes
        );
      }
      this.changes.sort(_Timezone._compare_change_fn);
      this.expandedUntilYear = changesEndYear;
    }
  }
  _expandComponent(aComponent, aYear, changes) {
    if (!aComponent.hasProperty("dtstart") || !aComponent.hasProperty("tzoffsetto") || !aComponent.hasProperty("tzoffsetfrom")) {
      return null;
    }
    let dtstart = aComponent.getFirstProperty("dtstart").getFirstValue();
    let change;
    function convert_tzoffset(offset) {
      return offset.factor * (offset.hours * 3600 + offset.minutes * 60);
    }
    function init_changes() {
      let changebase = {};
      changebase.is_daylight = aComponent.name == "daylight";
      changebase.utcOffset = convert_tzoffset(
        aComponent.getFirstProperty("tzoffsetto").getFirstValue()
      );
      changebase.prevUtcOffset = convert_tzoffset(
        aComponent.getFirstProperty("tzoffsetfrom").getFirstValue()
      );
      return changebase;
    }
    if (!aComponent.hasProperty("rrule") && !aComponent.hasProperty("rdate")) {
      change = init_changes();
      change.year = dtstart.year;
      change.month = dtstart.month;
      change.day = dtstart.day;
      change.hour = dtstart.hour;
      change.minute = dtstart.minute;
      change.second = dtstart.second;
      _Timezone.adjust_change(change, 0, 0, 0, -change.prevUtcOffset);
      changes.push(change);
    } else {
      let props = aComponent.getAllProperties("rdate");
      for (let rdate of props) {
        let time = rdate.getFirstValue();
        change = init_changes();
        change.year = time.year;
        change.month = time.month;
        change.day = time.day;
        if (time.isDate) {
          change.hour = dtstart.hour;
          change.minute = dtstart.minute;
          change.second = dtstart.second;
          if (dtstart.zone != _Timezone.utcTimezone) {
            _Timezone.adjust_change(change, 0, 0, 0, -change.prevUtcOffset);
          }
        } else {
          change.hour = time.hour;
          change.minute = time.minute;
          change.second = time.second;
          if (time.zone != _Timezone.utcTimezone) {
            _Timezone.adjust_change(change, 0, 0, 0, -change.prevUtcOffset);
          }
        }
        changes.push(change);
      }
      let rrule = aComponent.getFirstProperty("rrule");
      if (rrule) {
        rrule = rrule.getFirstValue();
        change = init_changes();
        if (rrule.until && rrule.until.zone == _Timezone.utcTimezone) {
          rrule.until.adjust(0, 0, 0, change.prevUtcOffset);
          rrule.until.zone = _Timezone.localTimezone;
        }
        let iterator = rrule.iterator(dtstart);
        let occ;
        while (occ = iterator.next()) {
          change = init_changes();
          if (occ.year > aYear || !occ) {
            break;
          }
          change.year = occ.year;
          change.month = occ.month;
          change.day = occ.day;
          change.hour = occ.hour;
          change.minute = occ.minute;
          change.second = occ.second;
          change.isDate = occ.isDate;
          _Timezone.adjust_change(change, 0, 0, 0, -change.prevUtcOffset);
          changes.push(change);
        }
      }
    }
    return changes;
  }
  /**
   * The string representation of this timezone.
   * @return {String}
   */
  toString() {
    return this.tznames ? this.tznames : this.tzid;
  }
};
var zones = null;
var TimezoneService = {
  get count() {
    if (zones === null) {
      return 0;
    }
    return Object.keys(zones).length;
  },
  reset: function() {
    zones = /* @__PURE__ */ Object.create(null);
    let utc = Timezone.utcTimezone;
    zones.Z = utc;
    zones.UTC = utc;
    zones.GMT = utc;
  },
  _hard_reset: function() {
    zones = null;
  },
  /**
   * Checks if timezone id has been registered.
   *
   * @param {String} tzid     Timezone identifier (e.g. America/Los_Angeles)
   * @return {Boolean}        False, when not present
   */
  has: function(tzid) {
    if (zones === null) {
      return false;
    }
    return !!zones[tzid];
  },
  /**
   * Returns a timezone by its tzid if present.
   *
   * @param {String} tzid               Timezone identifier (e.g. America/Los_Angeles)
   * @return {Timezone | undefined}     The timezone, or undefined if not found
   */
  get: function(tzid) {
    if (zones === null) {
      this.reset();
    }
    return zones[tzid];
  },
  /**
   * Registers a timezone object or component.
   *
   * @param {Component|Timezone} timezone
   *        The initialized zone or vtimezone.
   *
   * @param {String=} name
   *        The name of the timezone. Defaults to the component's TZID if not
   *        passed.
   */
  register: function(timezone, name) {
    if (zones === null) {
      this.reset();
    }
    if (typeof timezone === "string" && name instanceof Timezone) {
      [timezone, name] = [name, timezone];
    }
    if (!name) {
      if (timezone instanceof Timezone) {
        name = timezone.tzid;
      } else {
        if (timezone.name === "vtimezone") {
          timezone = new Timezone(timezone);
          name = timezone.tzid;
        }
      }
    }
    if (!name) {
      throw new TypeError("Neither a timezone nor a name was passed");
    }
    if (timezone instanceof Timezone) {
      zones[name] = timezone;
    } else {
      throw new TypeError("timezone must be ICAL.Timezone or ICAL.Component");
    }
  },
  /**
   * Removes a timezone by its tzid from the list.
   *
   * @param {String} tzid     Timezone identifier (e.g. America/Los_Angeles)
   * @return {?Timezone}      The removed timezone, or null if not registered
   */
  remove: function(tzid) {
    if (zones === null) {
      return null;
    }
    return delete zones[tzid];
  }
};
function updateTimezones(vcal) {
  let allsubs, properties, vtimezones, reqTzid, i;
  if (!vcal || vcal.name !== "vcalendar") {
    return vcal;
  }
  allsubs = vcal.getAllSubcomponents();
  properties = [];
  vtimezones = {};
  for (i = 0; i < allsubs.length; i++) {
    if (allsubs[i].name === "vtimezone") {
      let tzid = allsubs[i].getFirstProperty("tzid").getFirstValue();
      vtimezones[tzid] = allsubs[i];
    } else {
      properties = properties.concat(allsubs[i].getAllProperties());
    }
  }
  reqTzid = {};
  for (i = 0; i < properties.length; i++) {
    let tzid = properties[i].getParameter("tzid");
    if (tzid) {
      reqTzid[tzid] = true;
    }
  }
  for (let [tzid, comp] of Object.entries(vtimezones)) {
    if (!reqTzid[tzid]) {
      vcal.removeSubcomponent(comp);
    }
  }
  for (let tzid of Object.keys(reqTzid)) {
    if (!vtimezones[tzid] && TimezoneService.has(tzid)) {
      vcal.addSubcomponent(TimezoneService.get(tzid).component);
    }
  }
  return vcal;
}
function isStrictlyNaN(number) {
  return typeof number === "number" && isNaN(number);
}
function strictParseInt(string) {
  let result = parseInt(string, 10);
  if (isStrictlyNaN(result)) {
    throw new Error(
      'Could not extract integer from "' + string + '"'
    );
  }
  return result;
}
function formatClassType(data, type) {
  if (typeof data === "undefined") {
    return void 0;
  }
  if (data instanceof type) {
    return data;
  }
  return new type(data);
}
function unescapedIndexOf(buffer, search, pos) {
  while ((pos = buffer.indexOf(search, pos)) !== -1) {
    if (pos > 0 && buffer[pos - 1] === "\\") {
      pos += 1;
    } else {
      return pos;
    }
  }
  return -1;
}
function binsearchInsert(list, seekVal, cmpfunc) {
  if (!list.length)
    return 0;
  let low = 0, high = list.length - 1, mid, cmpval;
  while (low <= high) {
    mid = low + Math.floor((high - low) / 2);
    cmpval = cmpfunc(seekVal, list[mid]);
    if (cmpval < 0)
      high = mid - 1;
    else if (cmpval > 0)
      low = mid + 1;
    else
      break;
  }
  if (cmpval < 0)
    return mid;
  else if (cmpval > 0)
    return mid + 1;
  else
    return mid;
}
function clone3(aSrc, aDeep) {
  if (!aSrc || typeof aSrc != "object") {
    return aSrc;
  } else if (aSrc instanceof Date) {
    return new Date(aSrc.getTime());
  } else if ("clone" in aSrc) {
    return aSrc.clone();
  } else if (Array.isArray(aSrc)) {
    let arr = [];
    for (let i = 0; i < aSrc.length; i++) {
      arr.push(aDeep ? clone3(aSrc[i], true) : aSrc[i]);
    }
    return arr;
  } else {
    let obj = {};
    for (let [name, value] of Object.entries(aSrc)) {
      if (aDeep) {
        obj[name] = clone3(value, true);
      } else {
        obj[name] = value;
      }
    }
    return obj;
  }
}
function foldline(aLine) {
  let result = "";
  let line = aLine || "", pos = 0, line_length = 0;
  while (line.length) {
    let cp = line.codePointAt(pos);
    if (cp < 128) ++line_length;
    else if (cp < 2048) line_length += 2;
    else if (cp < 65536) line_length += 3;
    else line_length += 4;
    if (line_length < ICALmodule.foldLength + 1)
      pos += cp > 65535 ? 2 : 1;
    else {
      result += ICALmodule.newLineChar + " " + line.slice(0, Math.max(0, pos));
      line = line.slice(Math.max(0, pos));
      pos = line_length = 0;
    }
  }
  return result.slice(ICALmodule.newLineChar.length + 1);
}
function pad2(data) {
  if (typeof data !== "string") {
    if (typeof data === "number") {
      data = parseInt(data);
    }
    data = String(data);
  }
  let len = data.length;
  switch (len) {
    case 0:
      return "00";
    case 1:
      return "0" + data;
    default:
      return data;
  }
}
function trunc(number) {
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
function extend(source, target) {
  for (let key in source) {
    let descr = Object.getOwnPropertyDescriptor(source, key);
    if (descr && !Object.getOwnPropertyDescriptor(target, key)) {
      Object.defineProperty(target, key, descr);
    }
  }
  return target;
}
var helpers = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  binsearchInsert,
  clone: clone3,
  extend,
  foldline,
  formatClassType,
  isStrictlyNaN,
  pad2,
  strictParseInt,
  trunc,
  unescapedIndexOf,
  updateTimezones
});
var UtcOffset = class _UtcOffset {
  /**
   * Creates a new {@link ICAL.UtcOffset} instance from the passed string.
   *
   * @param {String} aString    The string to parse
   * @return {Duration}         The created utc-offset instance
   */
  static fromString(aString) {
    let options = {};
    options.factor = aString[0] === "+" ? 1 : -1;
    options.hours = strictParseInt(aString.slice(1, 3));
    options.minutes = strictParseInt(aString.slice(4, 6));
    return new _UtcOffset(options);
  }
  /**
   * Creates a new {@link ICAL.UtcOffset} instance from the passed seconds
   * value.
   *
   * @param {Number} aSeconds       The number of seconds to convert
   */
  static fromSeconds(aSeconds) {
    let instance = new _UtcOffset();
    instance.fromSeconds(aSeconds);
    return instance;
  }
  /**
   * Creates a new ICAL.UtcOffset instance.
   *
   * @param {Object} aData          An object with members of the utc offset
   * @param {Number=} aData.hours   The hours for the utc offset
   * @param {Number=} aData.minutes The minutes in the utc offset
   * @param {Number=} aData.factor  The factor for the utc-offset, either -1 or 1
   */
  constructor(aData) {
    this.fromData(aData);
  }
  /**
   * The hours in the utc-offset
   * @type {Number}
   */
  hours = 0;
  /**
   * The minutes in the utc-offset
   * @type {Number}
   */
  minutes = 0;
  /**
   * The sign of the utc offset, 1 for positive offset, -1 for negative
   * offsets.
   * @type {Number}
   */
  factor = 1;
  /**
   * The type name, to be used in the jCal object.
   * @constant
   * @type {String}
   * @default "utc-offset"
   */
  icaltype = "utc-offset";
  /**
   * Returns a clone of the utc offset object.
   *
   * @return {UtcOffset}     The cloned object
   */
  clone() {
    return _UtcOffset.fromSeconds(this.toSeconds());
  }
  /**
   * Sets up the current instance using members from the passed data object.
   *
   * @param {Object} aData          An object with members of the utc offset
   * @param {Number=} aData.hours   The hours for the utc offset
   * @param {Number=} aData.minutes The minutes in the utc offset
   * @param {Number=} aData.factor  The factor for the utc-offset, either -1 or 1
   */
  fromData(aData) {
    if (aData) {
      for (let [key, value] of Object.entries(aData)) {
        this[key] = value;
      }
    }
    this._normalize();
  }
  /**
   * Sets up the current instance from the given seconds value. The seconds
   * value is truncated to the minute. Offsets are wrapped when the world
   * ends, the hour after UTC+14:00 is UTC-12:00.
   *
   * @param {Number} aSeconds         The seconds to convert into an offset
   */
  fromSeconds(aSeconds) {
    let secs = Math.abs(aSeconds);
    this.factor = aSeconds < 0 ? -1 : 1;
    this.hours = trunc(secs / 3600);
    secs -= this.hours * 3600;
    this.minutes = trunc(secs / 60);
    return this;
  }
  /**
   * Convert the current offset to a value in seconds
   *
   * @return {Number}                 The offset in seconds
   */
  toSeconds() {
    return this.factor * (60 * this.minutes + 3600 * this.hours);
  }
  /**
   * Compare this utc offset with another one.
   *
   * @param {UtcOffset} other             The other offset to compare with
   * @return {Number}                     -1, 0 or 1 for less/equal/greater
   */
  compare(other) {
    let a = this.toSeconds();
    let b = other.toSeconds();
    return (a > b) - (b > a);
  }
  _normalize() {
    let secs = this.toSeconds();
    let factor = this.factor;
    while (secs < -43200) {
      secs += 97200;
    }
    while (secs > 50400) {
      secs -= 97200;
    }
    this.fromSeconds(secs);
    if (secs == 0) {
      this.factor = factor;
    }
  }
  /**
   * The iCalendar string representation of this utc-offset.
   * @return {String}
   */
  toICALString() {
    return design.icalendar.value["utc-offset"].toICAL(this.toString());
  }
  /**
   * The string representation of this utc-offset.
   * @return {String}
   */
  toString() {
    return (this.factor == 1 ? "+" : "-") + pad2(this.hours) + ":" + pad2(this.minutes);
  }
};
var VCardTime = class _VCardTime extends Time2 {
  /**
   * Returns a new ICAL.VCardTime instance from a date and/or time string.
   *
   * @param {String} aValue     The string to create from
   * @param {String} aIcalType  The type for this instance, e.g. date-and-or-time
   * @return {VCardTime}        The date/time instance
   */
  static fromDateAndOrTimeString(aValue, aIcalType) {
    function part(v, s, e) {
      return v ? strictParseInt(v.slice(s, s + e)) : null;
    }
    let parts = aValue.split("T");
    let dt = parts[0], tmz = parts[1];
    let splitzone = tmz ? design.vcard.value.time._splitZone(tmz) : [];
    let zone = splitzone[0], tm = splitzone[1];
    let dtlen = dt ? dt.length : 0;
    let tmlen = tm ? tm.length : 0;
    let hasDashDate = dt && dt[0] == "-" && dt[1] == "-";
    let hasDashTime = tm && tm[0] == "-";
    let o = {
      year: hasDashDate ? null : part(dt, 0, 4),
      month: hasDashDate && (dtlen == 4 || dtlen == 7) ? part(dt, 2, 2) : dtlen == 7 ? part(dt, 5, 2) : dtlen == 10 ? part(dt, 5, 2) : null,
      day: dtlen == 5 ? part(dt, 3, 2) : dtlen == 7 && hasDashDate ? part(dt, 5, 2) : dtlen == 10 ? part(dt, 8, 2) : null,
      hour: hasDashTime ? null : part(tm, 0, 2),
      minute: hasDashTime && tmlen == 3 ? part(tm, 1, 2) : tmlen > 4 ? hasDashTime ? part(tm, 1, 2) : part(tm, 3, 2) : null,
      second: tmlen == 4 ? part(tm, 2, 2) : tmlen == 6 ? part(tm, 4, 2) : tmlen == 8 ? part(tm, 6, 2) : null
    };
    if (zone == "Z") {
      zone = Timezone.utcTimezone;
    } else if (zone && zone[3] == ":") {
      zone = UtcOffset.fromString(zone);
    } else {
      zone = null;
    }
    return new _VCardTime(o, zone, aIcalType);
  }
  /**
   * Creates a new ICAL.VCardTime instance.
   *
   * @param {Object} data                           The data for the time instance
   * @param {Number=} data.year                     The year for this date
   * @param {Number=} data.month                    The month for this date
   * @param {Number=} data.day                      The day for this date
   * @param {Number=} data.hour                     The hour for this date
   * @param {Number=} data.minute                   The minute for this date
   * @param {Number=} data.second                   The second for this date
   * @param {Timezone|UtcOffset} zone               The timezone to use
   * @param {String} icaltype                       The type for this date/time object
   */
  constructor(data, zone, icaltype) {
    super(data, zone);
    this.icaltype = icaltype || "date-and-or-time";
  }
  /**
   * The class identifier.
   * @constant
   * @type {String}
   * @default "vcardtime"
   */
  icalclass = "vcardtime";
  /**
   * The type name, to be used in the jCal object.
   * @type {String}
   * @default "date-and-or-time"
   */
  icaltype = "date-and-or-time";
  /**
   * Returns a clone of the vcard date/time object.
   *
   * @return {VCardTime}     The cloned object
   */
  clone() {
    return new _VCardTime(this._time, this.zone, this.icaltype);
  }
  _normalize() {
    return this;
  }
  /**
   * @inheritdoc
   */
  utcOffset() {
    if (this.zone instanceof UtcOffset) {
      return this.zone.toSeconds();
    } else {
      return Time2.prototype.utcOffset.apply(this, arguments);
    }
  }
  /**
   * Returns an RFC 6350 compliant representation of this object.
   *
   * @return {String}         vcard date/time string
   */
  toICALString() {
    return design.vcard.value[this.icaltype].toICAL(this.toString());
  }
  /**
   * The string representation of this date/time, in jCard form
   * (including : and - separators).
   * @return {String}
   */
  toString() {
    let y = this.year, m = this.month, d = this.day;
    let h = this.hour, mm = this.minute, s = this.second;
    let hasYear = y !== null, hasMonth = m !== null, hasDay = d !== null;
    let hasHour = h !== null, hasMinute = mm !== null, hasSecond = s !== null;
    let datepart = (hasYear ? pad2(y) + (hasMonth || hasDay ? "-" : "") : hasMonth || hasDay ? "--" : "") + (hasMonth ? pad2(m) : "") + (hasDay ? "-" + pad2(d) : "");
    let timepart = (hasHour ? pad2(h) : "-") + (hasHour && hasMinute ? ":" : "") + (hasMinute ? pad2(mm) : "") + (!hasHour && !hasMinute ? "-" : "") + (hasMinute && hasSecond ? ":" : "") + (hasSecond ? pad2(s) : "");
    let zone;
    if (this.zone === Timezone.utcTimezone) {
      zone = "Z";
    } else if (this.zone instanceof UtcOffset) {
      zone = this.zone.toString();
    } else if (this.zone === Timezone.localTimezone) {
      zone = "";
    } else if (this.zone instanceof Timezone) {
      let offset = UtcOffset.fromSeconds(this.zone.utcOffset(this));
      zone = offset.toString();
    } else {
      zone = "";
    }
    switch (this.icaltype) {
      case "time":
        return timepart + zone;
      case "date-and-or-time":
      case "date-time":
        return datepart + (timepart == "--" ? "" : "T" + timepart + zone);
      case "date":
        return datepart;
    }
    return null;
  }
};
var RecurIterator = class _RecurIterator {
  static _indexMap = {
    "BYSECOND": 0,
    "BYMINUTE": 1,
    "BYHOUR": 2,
    "BYDAY": 3,
    "BYMONTHDAY": 4,
    "BYYEARDAY": 5,
    "BYWEEKNO": 6,
    "BYMONTH": 7,
    "BYSETPOS": 8
  };
  static _expandMap = {
    "SECONDLY": [1, 1, 1, 1, 1, 1, 1, 1],
    "MINUTELY": [2, 1, 1, 1, 1, 1, 1, 1],
    "HOURLY": [2, 2, 1, 1, 1, 1, 1, 1],
    "DAILY": [2, 2, 2, 1, 1, 1, 1, 1],
    "WEEKLY": [2, 2, 2, 2, 3, 3, 1, 1],
    "MONTHLY": [2, 2, 2, 2, 2, 3, 3, 1],
    "YEARLY": [2, 2, 2, 2, 2, 2, 2, 2]
  };
  static UNKNOWN = 0;
  static CONTRACT = 1;
  static EXPAND = 2;
  static ILLEGAL = 3;
  /**
   * Creates a new ICAL.RecurIterator instance. The options object may contain additional members
   * when resuming iteration from a previous run.
   *
   * @param {Object} options                The iterator options
   * @param {Recur} options.rule            The rule to iterate.
   * @param {Time} options.dtstart          The start date of the event.
   * @param {Boolean=} options.initialized  When true, assume that options are
   *        from a previously constructed iterator. Initialization will not be
   *        repeated.
   */
  constructor(options) {
    this.fromData(options);
  }
  /**
   * True when iteration is finished.
   * @type {Boolean}
   */
  completed = false;
  /**
   * The rule that is being iterated
   * @type {Recur}
   */
  rule = null;
  /**
   * The start date of the event being iterated.
   * @type {Time}
   */
  dtstart = null;
  /**
   * The last occurrence that was returned from the
   * {@link RecurIterator#next} method.
   * @type {Time}
   */
  last = null;
  /**
   * The sequence number from the occurrence
   * @type {Number}
   */
  occurrence_number = 0;
  /**
   * The indices used for the {@link ICAL.RecurIterator#by_data} object.
   * @type {Object}
   * @private
   */
  by_indices = null;
  /**
   * If true, the iterator has already been initialized
   * @type {Boolean}
   * @private
   */
  initialized = false;
  /**
   * The initializd by-data.
   * @type {Object}
   * @private
   */
  by_data = null;
  /**
   * The expanded yeardays
   * @type {Array}
   * @private
   */
  days = null;
  /**
   * The index in the {@link ICAL.RecurIterator#days} array.
   * @type {Number}
   * @private
   */
  days_index = 0;
  /**
   * Initialize the recurrence iterator from the passed data object. This
   * method is usually not called directly, you can initialize the iterator
   * through the constructor.
   *
   * @param {Object} options                The iterator options
   * @param {Recur} options.rule            The rule to iterate.
   * @param {Time} options.dtstart          The start date of the event.
   * @param {Boolean=} options.initialized  When true, assume that options are
   *        from a previously constructed iterator. Initialization will not be
   *        repeated.
   */
  fromData(options) {
    this.rule = formatClassType(options.rule, Recur);
    if (!this.rule) {
      throw new Error("iterator requires a (ICAL.Recur) rule");
    }
    this.dtstart = formatClassType(options.dtstart, Time2);
    if (!this.dtstart) {
      throw new Error("iterator requires a (ICAL.Time) dtstart");
    }
    if (options.by_data) {
      this.by_data = options.by_data;
    } else {
      this.by_data = clone3(this.rule.parts, true);
    }
    if (options.occurrence_number)
      this.occurrence_number = options.occurrence_number;
    this.days = options.days || [];
    if (options.last) {
      this.last = formatClassType(options.last, Time2);
    }
    this.by_indices = options.by_indices;
    if (!this.by_indices) {
      this.by_indices = {
        "BYSECOND": 0,
        "BYMINUTE": 0,
        "BYHOUR": 0,
        "BYDAY": 0,
        "BYMONTH": 0,
        "BYWEEKNO": 0,
        "BYMONTHDAY": 0
      };
    }
    this.initialized = options.initialized || false;
    if (!this.initialized) {
      try {
        this.init();
      } catch (e) {
        if (e instanceof InvalidRecurrenceRuleError) {
          this.completed = true;
        } else {
          throw e;
        }
      }
    }
  }
  /**
   * Initialize the iterator
   * @private
   */
  init() {
    this.initialized = true;
    this.last = this.dtstart.clone();
    let parts = this.by_data;
    if ("BYDAY" in parts) {
      this.sort_byday_rules(parts.BYDAY);
    }
    if ("BYYEARDAY" in parts) {
      if ("BYMONTH" in parts || "BYWEEKNO" in parts || "BYMONTHDAY" in parts) {
        throw new Error("Invalid BYYEARDAY rule");
      }
    }
    if ("BYWEEKNO" in parts && "BYMONTHDAY" in parts) {
      throw new Error("BYWEEKNO does not fit to BYMONTHDAY");
    }
    if (this.rule.freq == "MONTHLY" && ("BYYEARDAY" in parts || "BYWEEKNO" in parts)) {
      throw new Error("For MONTHLY recurrences neither BYYEARDAY nor BYWEEKNO may appear");
    }
    if (this.rule.freq == "WEEKLY" && ("BYYEARDAY" in parts || "BYMONTHDAY" in parts)) {
      throw new Error("For WEEKLY recurrences neither BYMONTHDAY nor BYYEARDAY may appear");
    }
    if (this.rule.freq != "YEARLY" && "BYYEARDAY" in parts) {
      throw new Error("BYYEARDAY may only appear in YEARLY rules");
    }
    this.last.second = this.setup_defaults("BYSECOND", "SECONDLY", this.dtstart.second);
    this.last.minute = this.setup_defaults("BYMINUTE", "MINUTELY", this.dtstart.minute);
    this.last.hour = this.setup_defaults("BYHOUR", "HOURLY", this.dtstart.hour);
    this.last.day = this.setup_defaults("BYMONTHDAY", "DAILY", this.dtstart.day);
    this.last.month = this.setup_defaults("BYMONTH", "MONTHLY", this.dtstart.month);
    if (this.rule.freq == "WEEKLY") {
      if ("BYDAY" in parts) {
        let [, dow] = this.ruleDayOfWeek(parts.BYDAY[0], this.rule.wkst);
        let wkdy = dow - this.last.dayOfWeek(this.rule.wkst);
        if (this.last.dayOfWeek(this.rule.wkst) < dow && wkdy >= 0 || wkdy < 0) {
          this.last.day += wkdy;
        }
      } else {
        let dayName = Recur.numericDayToIcalDay(this.dtstart.dayOfWeek());
        parts.BYDAY = [dayName];
      }
    }
    if (this.rule.freq == "YEARLY") {
      const untilYear = this.rule.until ? this.rule.until.year : 2e4;
      while (this.last.year <= untilYear) {
        this.expand_year_days(this.last.year);
        if (this.days.length > 0) {
          break;
        }
        this.increment_year(this.rule.interval);
      }
      if (this.days.length == 0) {
        throw new InvalidRecurrenceRuleError();
      }
      if (!this._nextByYearDay() && !this.next_year() && !this.next_year() && !this.next_year()) {
        throw new InvalidRecurrenceRuleError();
      }
    }
    if (this.rule.freq == "MONTHLY") {
      if (this.has_by_data("BYDAY")) {
        let tempLast = null;
        let initLast = this.last.clone();
        let daysInMonth = Time2.daysInMonth(this.last.month, this.last.year);
        for (let bydow of this.by_data.BYDAY) {
          this.last = initLast.clone();
          let [pos, dow] = this.ruleDayOfWeek(bydow);
          let dayOfMonth = this.last.nthWeekDay(dow, pos);
          if (pos >= 6 || pos <= -6) {
            throw new Error("Malformed values in BYDAY part");
          }
          if (dayOfMonth > daysInMonth || dayOfMonth <= 0) {
            if (tempLast && tempLast.month == initLast.month) {
              continue;
            }
            while (dayOfMonth > daysInMonth || dayOfMonth <= 0) {
              this.increment_month();
              daysInMonth = Time2.daysInMonth(this.last.month, this.last.year);
              dayOfMonth = this.last.nthWeekDay(dow, pos);
            }
          }
          this.last.day = dayOfMonth;
          if (!tempLast || this.last.compare(tempLast) < 0) {
            tempLast = this.last.clone();
          }
        }
        this.last = tempLast.clone();
        if (this.has_by_data("BYMONTHDAY")) {
          this._byDayAndMonthDay(true);
        }
        if (this.last.day > daysInMonth || this.last.day == 0) {
          throw new Error("Malformed values in BYDAY part");
        }
      } else if (this.has_by_data("BYMONTHDAY")) {
        this.last.day = 1;
        let normalized = this.normalizeByMonthDayRules(
          this.last.year,
          this.last.month,
          this.rule.parts.BYMONTHDAY
        ).filter((d) => d >= this.last.day);
        if (normalized.length) {
          this.last.day = normalized[0];
          this.by_data.BYMONTHDAY = normalized;
        } else {
          if (!this.next_month() && !this.next_month() && !this.next_month()) {
            throw new InvalidRecurrenceRuleError();
          }
        }
      }
    }
  }
  /**
   * Retrieve the next occurrence from the iterator.
   * @return {Time}
   */
  next(again = false) {
    let before = this.last ? this.last.clone() : null;
    if (this.rule.count && this.occurrence_number >= this.rule.count || this.rule.until && this.last.compare(this.rule.until) > 0) {
      this.completed = true;
    }
    if (this.completed) {
      return null;
    }
    if (this.occurrence_number == 0 && this.last.compare(this.dtstart) >= 0) {
      this.occurrence_number++;
      return this.last;
    }
    let valid;
    let invalid_count = 0;
    do {
      valid = 1;
      switch (this.rule.freq) {
        case "SECONDLY":
          this.next_second();
          break;
        case "MINUTELY":
          this.next_minute();
          break;
        case "HOURLY":
          this.next_hour();
          break;
        case "DAILY":
          this.next_day();
          break;
        case "WEEKLY":
          this.next_week();
          break;
        case "MONTHLY":
          valid = this.next_month();
          if (valid) {
            invalid_count = 0;
          } else if (++invalid_count == 336) {
            this.completed = true;
            return null;
          }
          break;
        case "YEARLY":
          valid = this.next_year();
          if (valid) {
            invalid_count = 0;
          } else if (++invalid_count == 28) {
            this.completed = true;
            return null;
          }
          break;
        default:
          return null;
      }
    } while (!this.check_contracting_rules() || this.last.compare(this.dtstart) < 0 || !valid);
    if (this.last.compare(before) == 0) {
      if (again) {
        throw new Error("Same occurrence found twice, protecting you from death by recursion");
      }
      this.next(true);
    }
    if (this.rule.until && this.last.compare(this.rule.until) > 0) {
      this.completed = true;
      return null;
    } else {
      this.occurrence_number++;
      return this.last;
    }
  }
  next_second() {
    return this.next_generic("BYSECOND", "SECONDLY", "second", "minute");
  }
  increment_second(inc) {
    return this.increment_generic(inc, "second", 60, "minute");
  }
  next_minute() {
    return this.next_generic(
      "BYMINUTE",
      "MINUTELY",
      "minute",
      "hour",
      "next_second"
    );
  }
  increment_minute(inc) {
    return this.increment_generic(inc, "minute", 60, "hour");
  }
  next_hour() {
    return this.next_generic(
      "BYHOUR",
      "HOURLY",
      "hour",
      "monthday",
      "next_minute"
    );
  }
  increment_hour(inc) {
    this.increment_generic(inc, "hour", 24, "monthday");
  }
  next_day() {
    let this_freq = this.rule.freq == "DAILY";
    if (this.next_hour() == 0) {
      return 0;
    }
    if (this_freq) {
      this.increment_monthday(this.rule.interval);
    } else {
      this.increment_monthday(1);
    }
    return 0;
  }
  next_week() {
    let end_of_data = 0;
    if (this.next_weekday_by_week() == 0) {
      return end_of_data;
    }
    if (this.has_by_data("BYWEEKNO")) {
      this.by_indices.BYWEEKNO++;
      if (this.by_indices.BYWEEKNO == this.by_data.BYWEEKNO.length) {
        this.by_indices.BYWEEKNO = 0;
        end_of_data = 1;
      }
      this.last.month = 1;
      this.last.day = 1;
      let week_no = this.by_data.BYWEEKNO[this.by_indices.BYWEEKNO];
      this.last.day += 7 * week_no;
      if (end_of_data) {
        this.increment_year(1);
      }
    } else {
      this.increment_monthday(7 * this.rule.interval);
    }
    return end_of_data;
  }
  /**
   * Normalize each by day rule for a given year/month.
   * Takes into account ordering and negative rules
   *
   * @private
   * @param {Number} year         Current year.
   * @param {Number} month        Current month.
   * @param {Array}  rules        Array of rules.
   *
   * @return {Array} sorted and normalized rules.
   *                 Negative rules will be expanded to their
   *                 correct positive values for easier processing.
   */
  normalizeByMonthDayRules(year, month, rules) {
    let daysInMonth = Time2.daysInMonth(month, year);
    let newRules = [];
    let ruleIdx = 0;
    let len = rules.length;
    let rule;
    for (; ruleIdx < len; ruleIdx++) {
      rule = parseInt(rules[ruleIdx], 10);
      if (isNaN(rule)) {
        throw new Error("Invalid BYMONTHDAY value");
      }
      if (Math.abs(rule) > daysInMonth) {
        continue;
      }
      if (rule < 0) {
        rule = daysInMonth + (rule + 1);
      } else if (rule === 0) {
        continue;
      }
      if (newRules.indexOf(rule) === -1) {
        newRules.push(rule);
      }
    }
    return newRules.sort(function(a, b) {
      return a - b;
    });
  }
  /**
   * NOTES:
   * We are given a list of dates in the month (BYMONTHDAY) (23, etc..)
   * Also we are given a list of days (BYDAY) (MO, 2SU, etc..) when
   * both conditions match a given date (this.last.day) iteration stops.
   *
   * @private
   * @param {Boolean=} isInit     When given true will not increment the
   *                                current day (this.last).
   */
  _byDayAndMonthDay(isInit) {
    let byMonthDay;
    let byDay = this.by_data.BYDAY;
    let date;
    let dateIdx = 0;
    let dateLen;
    let dayLen = byDay.length;
    let dataIsValid = 0;
    let daysInMonth;
    let self = this;
    let lastDay = this.last.day;
    function initMonth() {
      daysInMonth = Time2.daysInMonth(
        self.last.month,
        self.last.year
      );
      byMonthDay = self.normalizeByMonthDayRules(
        self.last.year,
        self.last.month,
        self.by_data.BYMONTHDAY
      );
      dateLen = byMonthDay.length;
      while (byMonthDay[dateIdx] <= lastDay && !(isInit && byMonthDay[dateIdx] == lastDay) && dateIdx < dateLen - 1) {
        dateIdx++;
      }
    }
    function nextMonth() {
      lastDay = 0;
      self.increment_month();
      dateIdx = 0;
      initMonth();
    }
    initMonth();
    if (isInit) {
      lastDay -= 1;
    }
    let monthsCounter = 48;
    while (!dataIsValid && monthsCounter) {
      monthsCounter--;
      date = lastDay + 1;
      if (date > daysInMonth) {
        nextMonth();
        continue;
      }
      let next = byMonthDay[dateIdx++];
      if (next >= date) {
        lastDay = next;
      } else {
        nextMonth();
        continue;
      }
      for (let dayIdx = 0; dayIdx < dayLen; dayIdx++) {
        let parts = this.ruleDayOfWeek(byDay[dayIdx]);
        let pos = parts[0];
        let dow = parts[1];
        this.last.day = lastDay;
        if (this.last.isNthWeekDay(dow, pos)) {
          dataIsValid = 1;
          break;
        }
      }
      if (!dataIsValid && dateIdx === dateLen) {
        nextMonth();
        continue;
      }
    }
    if (monthsCounter <= 0) {
      throw new Error("Malformed values in BYDAY combined with BYMONTHDAY parts");
    }
    return dataIsValid;
  }
  next_month() {
    let data_valid = 1;
    if (this.next_hour() == 0) {
      return data_valid;
    }
    if (this.has_by_data("BYDAY") && this.has_by_data("BYMONTHDAY")) {
      data_valid = this._byDayAndMonthDay();
    } else if (this.has_by_data("BYDAY")) {
      let daysInMonth = Time2.daysInMonth(this.last.month, this.last.year);
      let setpos = 0;
      let setpos_total = 0;
      if (this.has_by_data("BYSETPOS")) {
        let last_day = this.last.day;
        for (let day2 = 1; day2 <= daysInMonth; day2++) {
          this.last.day = day2;
          if (this.is_day_in_byday(this.last)) {
            setpos_total++;
            if (day2 <= last_day) {
              setpos++;
            }
          }
        }
        this.last.day = last_day;
      }
      data_valid = 0;
      let day;
      for (day = this.last.day + 1; day <= daysInMonth; day++) {
        this.last.day = day;
        if (this.is_day_in_byday(this.last)) {
          if (!this.has_by_data("BYSETPOS") || this.check_set_position(++setpos) || this.check_set_position(setpos - setpos_total - 1)) {
            data_valid = 1;
            break;
          }
        }
      }
      if (day > daysInMonth) {
        this.last.day = 1;
        this.increment_month();
        if (this.is_day_in_byday(this.last)) {
          if (!this.has_by_data("BYSETPOS") || this.check_set_position(1)) {
            data_valid = 1;
          }
        } else {
          data_valid = 0;
        }
      }
    } else if (this.has_by_data("BYMONTHDAY")) {
      this.by_indices.BYMONTHDAY++;
      if (this.by_indices.BYMONTHDAY >= this.by_data.BYMONTHDAY.length) {
        this.by_indices.BYMONTHDAY = 0;
        this.increment_month();
        if (this.by_indices.BYMONTHDAY >= this.by_data.BYMONTHDAY.length) {
          return 0;
        }
      }
      let daysInMonth = Time2.daysInMonth(this.last.month, this.last.year);
      let day = this.by_data.BYMONTHDAY[this.by_indices.BYMONTHDAY];
      if (day < 0) {
        day = daysInMonth + day + 1;
      }
      if (day > daysInMonth) {
        this.last.day = 1;
        data_valid = this.is_day_in_byday(this.last);
      } else {
        this.last.day = day;
      }
    } else {
      this.increment_month();
      let daysInMonth = Time2.daysInMonth(this.last.month, this.last.year);
      if (this.by_data.BYMONTHDAY[0] > daysInMonth) {
        data_valid = 0;
      } else {
        this.last.day = this.by_data.BYMONTHDAY[0];
      }
    }
    return data_valid;
  }
  next_weekday_by_week() {
    let end_of_data = 0;
    if (this.next_hour() == 0) {
      return end_of_data;
    }
    if (!this.has_by_data("BYDAY")) {
      return 1;
    }
    for (; ; ) {
      let tt = new Time2();
      this.by_indices.BYDAY++;
      if (this.by_indices.BYDAY == Object.keys(this.by_data.BYDAY).length) {
        this.by_indices.BYDAY = 0;
        end_of_data = 1;
      }
      let coded_day = this.by_data.BYDAY[this.by_indices.BYDAY];
      let parts = this.ruleDayOfWeek(coded_day);
      let dow = parts[1];
      dow -= this.rule.wkst;
      if (dow < 0) {
        dow += 7;
      }
      tt.year = this.last.year;
      tt.month = this.last.month;
      tt.day = this.last.day;
      let startOfWeek = tt.startDoyWeek(this.rule.wkst);
      if (dow + startOfWeek < 1) {
        if (!end_of_data) {
          continue;
        }
      }
      let next = Time2.fromDayOfYear(startOfWeek + dow, this.last.year);
      this.last.year = next.year;
      this.last.month = next.month;
      this.last.day = next.day;
      return end_of_data;
    }
  }
  next_year() {
    if (this.next_hour() == 0) {
      return 0;
    }
    if (this.days.length == 0 || ++this.days_index == this.days.length) {
      this.days_index = 0;
      this.increment_year(this.rule.interval);
      if (this.has_by_data("BYMONTHDAY")) {
        this.by_data.BYMONTHDAY = this.normalizeByMonthDayRules(
          this.last.year,
          this.last.month,
          this.rule.parts.BYMONTHDAY
        );
      }
      this.expand_year_days(this.last.year);
      if (this.days.length == 0) {
        return 0;
      }
    }
    return this._nextByYearDay();
  }
  _nextByYearDay() {
    let doy = this.days[this.days_index];
    let year = this.last.year;
    if (Math.abs(doy) == 366 && !Time2.isLeapYear(this.last.year)) {
      return 0;
    }
    if (doy < 1) {
      doy += 1;
      year += 1;
    }
    let next = Time2.fromDayOfYear(doy, year);
    this.last.day = next.day;
    this.last.month = next.month;
    return 1;
  }
  /**
   * @param dow (eg: '1TU', '-1MO')
   * @param {weekDay=} aWeekStart The week start weekday
   * @return [pos, numericDow] (eg: [1, 3]) numericDow is relative to aWeekStart
   */
  ruleDayOfWeek(dow, aWeekStart) {
    let matches = dow.match(/([+-]?[0-9])?(MO|TU|WE|TH|FR|SA|SU)/);
    if (matches) {
      let pos = parseInt(matches[1] || 0, 10);
      dow = Recur.icalDayToNumericDay(matches[2], aWeekStart);
      return [pos, dow];
    } else {
      return [0, 0];
    }
  }
  next_generic(aRuleType, aInterval, aDateAttr, aFollowingAttr, aPreviousIncr) {
    let has_by_rule = aRuleType in this.by_data;
    let this_freq = this.rule.freq == aInterval;
    let end_of_data = 0;
    if (aPreviousIncr && this[aPreviousIncr]() == 0) {
      return end_of_data;
    }
    if (has_by_rule) {
      this.by_indices[aRuleType]++;
      let dta = this.by_data[aRuleType];
      if (this.by_indices[aRuleType] == dta.length) {
        this.by_indices[aRuleType] = 0;
        end_of_data = 1;
      }
      this.last[aDateAttr] = dta[this.by_indices[aRuleType]];
    } else if (this_freq) {
      this["increment_" + aDateAttr](this.rule.interval);
    }
    if (has_by_rule && end_of_data && this_freq) {
      this["increment_" + aFollowingAttr](1);
    }
    return end_of_data;
  }
  increment_monthday(inc) {
    for (let i = 0; i < inc; i++) {
      let daysInMonth = Time2.daysInMonth(this.last.month, this.last.year);
      this.last.day++;
      if (this.last.day > daysInMonth) {
        this.last.day -= daysInMonth;
        this.increment_month();
      }
    }
  }
  increment_month() {
    this.last.day = 1;
    if (this.has_by_data("BYMONTH")) {
      this.by_indices.BYMONTH++;
      if (this.by_indices.BYMONTH == this.by_data.BYMONTH.length) {
        this.by_indices.BYMONTH = 0;
        this.increment_year(1);
      }
      this.last.month = this.by_data.BYMONTH[this.by_indices.BYMONTH];
    } else {
      if (this.rule.freq == "MONTHLY") {
        this.last.month += this.rule.interval;
      } else {
        this.last.month++;
      }
      this.last.month--;
      let years = trunc(this.last.month / 12);
      this.last.month %= 12;
      this.last.month++;
      if (years != 0) {
        this.increment_year(years);
      }
    }
    if (this.has_by_data("BYMONTHDAY")) {
      this.by_data.BYMONTHDAY = this.normalizeByMonthDayRules(
        this.last.year,
        this.last.month,
        this.rule.parts.BYMONTHDAY
      );
    }
  }
  increment_year(inc) {
    this.last.day = 1;
    this.last.year += inc;
  }
  increment_generic(inc, aDateAttr, aFactor, aNextIncrement) {
    this.last[aDateAttr] += inc;
    let nextunit = trunc(this.last[aDateAttr] / aFactor);
    this.last[aDateAttr] %= aFactor;
    if (nextunit != 0) {
      this["increment_" + aNextIncrement](nextunit);
    }
  }
  has_by_data(aRuleType) {
    return aRuleType in this.rule.parts;
  }
  expand_year_days(aYear) {
    let t = new Time2();
    this.days = [];
    let parts = {};
    let rules = ["BYDAY", "BYWEEKNO", "BYMONTHDAY", "BYMONTH", "BYYEARDAY"];
    for (let part of rules) {
      if (part in this.rule.parts) {
        parts[part] = this.rule.parts[part];
      }
    }
    if ("BYMONTH" in parts && "BYWEEKNO" in parts) {
      let valid = 1;
      let validWeeks = {};
      t.year = aYear;
      t.isDate = true;
      for (let monthIdx = 0; monthIdx < this.by_data.BYMONTH.length; monthIdx++) {
        let month = this.by_data.BYMONTH[monthIdx];
        t.month = month;
        t.day = 1;
        let first_week = t.weekNumber(this.rule.wkst);
        t.day = Time2.daysInMonth(month, aYear);
        let last_week = t.weekNumber(this.rule.wkst);
        for (monthIdx = first_week; monthIdx < last_week; monthIdx++) {
          validWeeks[monthIdx] = 1;
        }
      }
      for (let weekIdx = 0; weekIdx < this.by_data.BYWEEKNO.length && valid; weekIdx++) {
        let weekno = this.by_data.BYWEEKNO[weekIdx];
        if (weekno < 52) {
          valid &= validWeeks[weekIdx];
        } else {
          valid = 0;
        }
      }
      if (valid) {
        delete parts.BYMONTH;
      } else {
        delete parts.BYWEEKNO;
      }
    }
    let partCount = Object.keys(parts).length;
    if (partCount == 0) {
      let t1 = this.dtstart.clone();
      t1.year = this.last.year;
      this.days.push(t1.dayOfYear());
    } else if (partCount == 1 && "BYMONTH" in parts) {
      for (let month of this.by_data.BYMONTH) {
        let t2 = this.dtstart.clone();
        t2.year = aYear;
        t2.month = month;
        t2.isDate = true;
        this.days.push(t2.dayOfYear());
      }
    } else if (partCount == 1 && "BYMONTHDAY" in parts) {
      for (let monthday of this.by_data.BYMONTHDAY) {
        let t3 = this.dtstart.clone();
        if (monthday < 0) {
          let daysInMonth = Time2.daysInMonth(t3.month, aYear);
          monthday = monthday + daysInMonth + 1;
        }
        t3.day = monthday;
        t3.year = aYear;
        t3.isDate = true;
        this.days.push(t3.dayOfYear());
      }
    } else if (partCount == 2 && "BYMONTHDAY" in parts && "BYMONTH" in parts) {
      for (let month of this.by_data.BYMONTH) {
        let daysInMonth = Time2.daysInMonth(month, aYear);
        for (let monthday of this.by_data.BYMONTHDAY) {
          if (monthday < 0) {
            monthday = monthday + daysInMonth + 1;
          }
          t.day = monthday;
          t.month = month;
          t.year = aYear;
          t.isDate = true;
          this.days.push(t.dayOfYear());
        }
      }
    } else if (partCount == 1 && "BYWEEKNO" in parts) ;
    else if (partCount == 2 && "BYWEEKNO" in parts && "BYMONTHDAY" in parts) ;
    else if (partCount == 1 && "BYDAY" in parts) {
      this.days = this.days.concat(this.expand_by_day(aYear));
    } else if (partCount == 2 && "BYDAY" in parts && "BYMONTH" in parts) {
      for (let month of this.by_data.BYMONTH) {
        let daysInMonth = Time2.daysInMonth(month, aYear);
        t.year = aYear;
        t.month = month;
        t.day = 1;
        t.isDate = true;
        let first_dow = t.dayOfWeek();
        let doy_offset = t.dayOfYear() - 1;
        t.day = daysInMonth;
        let last_dow = t.dayOfWeek();
        if (this.has_by_data("BYSETPOS")) {
          let by_month_day = [];
          for (let day = 1; day <= daysInMonth; day++) {
            t.day = day;
            if (this.is_day_in_byday(t)) {
              by_month_day.push(day);
            }
          }
          for (let spIndex = 0; spIndex < by_month_day.length; spIndex++) {
            if (this.check_set_position(spIndex + 1) || this.check_set_position(spIndex - by_month_day.length)) {
              this.days.push(doy_offset + by_month_day[spIndex]);
            }
          }
        } else {
          for (let coded_day of this.by_data.BYDAY) {
            let bydayParts = this.ruleDayOfWeek(coded_day);
            let pos = bydayParts[0];
            let dow = bydayParts[1];
            let month_day;
            let first_matching_day = (dow + 7 - first_dow) % 7 + 1;
            let last_matching_day = daysInMonth - (last_dow + 7 - dow) % 7;
            if (pos == 0) {
              for (let day = first_matching_day; day <= daysInMonth; day += 7) {
                this.days.push(doy_offset + day);
              }
            } else if (pos > 0) {
              month_day = first_matching_day + (pos - 1) * 7;
              if (month_day <= daysInMonth) {
                this.days.push(doy_offset + month_day);
              }
            } else {
              month_day = last_matching_day + (pos + 1) * 7;
              if (month_day > 0) {
                this.days.push(doy_offset + month_day);
              }
            }
          }
        }
      }
      this.days.sort(function(a, b) {
        return a - b;
      });
    } else if (partCount == 2 && "BYDAY" in parts && "BYMONTHDAY" in parts) {
      let expandedDays = this.expand_by_day(aYear);
      for (let day of expandedDays) {
        let tt = Time2.fromDayOfYear(day, aYear);
        if (this.by_data.BYMONTHDAY.indexOf(tt.day) >= 0) {
          this.days.push(day);
        }
      }
    } else if (partCount == 3 && "BYDAY" in parts && "BYMONTHDAY" in parts && "BYMONTH" in parts) {
      let expandedDays = this.expand_by_day(aYear);
      for (let day of expandedDays) {
        let tt = Time2.fromDayOfYear(day, aYear);
        if (this.by_data.BYMONTH.indexOf(tt.month) >= 0 && this.by_data.BYMONTHDAY.indexOf(tt.day) >= 0) {
          this.days.push(day);
        }
      }
    } else if (partCount == 2 && "BYDAY" in parts && "BYWEEKNO" in parts) {
      let expandedDays = this.expand_by_day(aYear);
      for (let day of expandedDays) {
        let tt = Time2.fromDayOfYear(day, aYear);
        let weekno = tt.weekNumber(this.rule.wkst);
        if (this.by_data.BYWEEKNO.indexOf(weekno)) {
          this.days.push(day);
        }
      }
    } else if (partCount == 3 && "BYDAY" in parts && "BYWEEKNO" in parts && "BYMONTHDAY" in parts) ;
    else if (partCount == 1 && "BYYEARDAY" in parts) {
      this.days = this.days.concat(this.by_data.BYYEARDAY);
    } else if (partCount == 2 && "BYYEARDAY" in parts && "BYDAY" in parts) {
      let daysInYear2 = Time2.isLeapYear(aYear) ? 366 : 365;
      let expandedDays = new Set(this.expand_by_day(aYear));
      for (let doy of this.by_data.BYYEARDAY) {
        if (doy < 0) {
          doy += daysInYear2 + 1;
        }
        if (expandedDays.has(doy)) {
          this.days.push(doy);
        }
      }
    } else {
      this.days = [];
    }
    let daysInYear = Time2.isLeapYear(aYear) ? 366 : 365;
    this.days.sort((a, b) => {
      if (a < 0) a += daysInYear + 1;
      if (b < 0) b += daysInYear + 1;
      return a - b;
    });
    return 0;
  }
  expand_by_day(aYear) {
    let days_list = [];
    let tmp = this.last.clone();
    tmp.year = aYear;
    tmp.month = 1;
    tmp.day = 1;
    tmp.isDate = true;
    let start_dow = tmp.dayOfWeek();
    tmp.month = 12;
    tmp.day = 31;
    tmp.isDate = true;
    let end_dow = tmp.dayOfWeek();
    let end_year_day = tmp.dayOfYear();
    for (let day of this.by_data.BYDAY) {
      let parts = this.ruleDayOfWeek(day);
      let pos = parts[0];
      let dow = parts[1];
      if (pos == 0) {
        let tmp_start_doy = (dow + 7 - start_dow) % 7 + 1;
        for (let doy = tmp_start_doy; doy <= end_year_day; doy += 7) {
          days_list.push(doy);
        }
      } else if (pos > 0) {
        let first;
        if (dow >= start_dow) {
          first = dow - start_dow + 1;
        } else {
          first = dow - start_dow + 8;
        }
        days_list.push(first + (pos - 1) * 7);
      } else {
        let last;
        pos = -pos;
        if (dow <= end_dow) {
          last = end_year_day - end_dow + dow;
        } else {
          last = end_year_day - end_dow + dow - 7;
        }
        days_list.push(last - (pos - 1) * 7);
      }
    }
    return days_list;
  }
  is_day_in_byday(tt) {
    if (this.by_data.BYDAY) {
      for (let day of this.by_data.BYDAY) {
        let parts = this.ruleDayOfWeek(day);
        let pos = parts[0];
        let dow = parts[1];
        let this_dow = tt.dayOfWeek();
        if (pos == 0 && dow == this_dow || tt.nthWeekDay(dow, pos) == tt.day) {
          return 1;
        }
      }
    }
    return 0;
  }
  /**
   * Checks if given value is in BYSETPOS.
   *
   * @private
   * @param {Numeric} aPos position to check for.
   * @return {Boolean} false unless BYSETPOS rules exist
   *                   and the given value is present in rules.
   */
  check_set_position(aPos) {
    if (this.has_by_data("BYSETPOS")) {
      let idx = this.by_data.BYSETPOS.indexOf(aPos);
      return idx !== -1;
    }
    return false;
  }
  sort_byday_rules(aRules) {
    for (let i = 0; i < aRules.length; i++) {
      for (let j = 0; j < i; j++) {
        let one = this.ruleDayOfWeek(aRules[j], this.rule.wkst)[1];
        let two = this.ruleDayOfWeek(aRules[i], this.rule.wkst)[1];
        if (one > two) {
          let tmp = aRules[i];
          aRules[i] = aRules[j];
          aRules[j] = tmp;
        }
      }
    }
  }
  check_contract_restriction(aRuleType, v) {
    let indexMapValue = _RecurIterator._indexMap[aRuleType];
    let ruleMapValue = _RecurIterator._expandMap[this.rule.freq][indexMapValue];
    let pass = false;
    if (aRuleType in this.by_data && ruleMapValue == _RecurIterator.CONTRACT) {
      let ruleType = this.by_data[aRuleType];
      for (let bydata of ruleType) {
        if (bydata == v) {
          pass = true;
          break;
        }
      }
    } else {
      pass = true;
    }
    return pass;
  }
  check_contracting_rules() {
    let dow = this.last.dayOfWeek();
    let weekNo = this.last.weekNumber(this.rule.wkst);
    let doy = this.last.dayOfYear();
    return this.check_contract_restriction("BYSECOND", this.last.second) && this.check_contract_restriction("BYMINUTE", this.last.minute) && this.check_contract_restriction("BYHOUR", this.last.hour) && this.check_contract_restriction("BYDAY", Recur.numericDayToIcalDay(dow)) && this.check_contract_restriction("BYWEEKNO", weekNo) && this.check_contract_restriction("BYMONTHDAY", this.last.day) && this.check_contract_restriction("BYMONTH", this.last.month) && this.check_contract_restriction("BYYEARDAY", doy);
  }
  setup_defaults(aRuleType, req, deftime) {
    let indexMapValue = _RecurIterator._indexMap[aRuleType];
    let ruleMapValue = _RecurIterator._expandMap[this.rule.freq][indexMapValue];
    if (ruleMapValue != _RecurIterator.CONTRACT) {
      if (!(aRuleType in this.by_data)) {
        this.by_data[aRuleType] = [deftime];
      }
      if (this.rule.freq != req) {
        return this.by_data[aRuleType][0];
      }
    }
    return deftime;
  }
  /**
   * Convert iterator into a serialize-able object.  Will preserve current
   * iteration sequence to ensure the seamless continuation of the recurrence
   * rule.
   * @return {Object}
   */
  toJSON() {
    let result = /* @__PURE__ */ Object.create(null);
    result.initialized = this.initialized;
    result.rule = this.rule.toJSON();
    result.dtstart = this.dtstart.toJSON();
    result.by_data = this.by_data;
    result.days = this.days;
    result.last = this.last.toJSON();
    result.by_indices = this.by_indices;
    result.occurrence_number = this.occurrence_number;
    return result;
  }
};
var InvalidRecurrenceRuleError = class extends Error {
  constructor() {
    super("Recurrence rule has no valid occurrences");
  }
};
var VALID_DAY_NAMES = /^(SU|MO|TU|WE|TH|FR|SA)$/;
var VALID_BYDAY_PART = /^([+-])?(5[0-3]|[1-4][0-9]|[1-9])?(SU|MO|TU|WE|TH|FR|SA)$/;
var DOW_MAP = {
  SU: Time2.SUNDAY,
  MO: Time2.MONDAY,
  TU: Time2.TUESDAY,
  WE: Time2.WEDNESDAY,
  TH: Time2.THURSDAY,
  FR: Time2.FRIDAY,
  SA: Time2.SATURDAY
};
var REVERSE_DOW_MAP = Object.fromEntries(Object.entries(DOW_MAP).map((entry) => entry.reverse()));
var ALLOWED_FREQ = [
  "SECONDLY",
  "MINUTELY",
  "HOURLY",
  "DAILY",
  "WEEKLY",
  "MONTHLY",
  "YEARLY"
];
var Recur = class _Recur {
  /**
   * Creates a new {@link ICAL.Recur} instance from the passed string.
   *
   * @param {String} string         The string to parse
   * @return {Recur}                The created recurrence instance
   */
  static fromString(string) {
    let data = this._stringToData(string, false);
    return new _Recur(data);
  }
  /**
   * Creates a new {@link ICAL.Recur} instance using members from the passed
   * data object.
   *
   * @param {Object} aData                              An object with members of the recurrence
   * @param {frequencyValues=} aData.freq               The frequency value
   * @param {Number=} aData.interval                    The INTERVAL value
   * @param {weekDay=} aData.wkst                       The week start value
   * @param {Time=} aData.until                         The end of the recurrence set
   * @param {Number=} aData.count                       The number of occurrences
   * @param {Array.<Number>=} aData.bysecond            The seconds for the BYSECOND part
   * @param {Array.<Number>=} aData.byminute            The minutes for the BYMINUTE part
   * @param {Array.<Number>=} aData.byhour              The hours for the BYHOUR part
   * @param {Array.<String>=} aData.byday               The BYDAY values
   * @param {Array.<Number>=} aData.bymonthday          The days for the BYMONTHDAY part
   * @param {Array.<Number>=} aData.byyearday           The days for the BYYEARDAY part
   * @param {Array.<Number>=} aData.byweekno            The weeks for the BYWEEKNO part
   * @param {Array.<Number>=} aData.bymonth             The month for the BYMONTH part
   * @param {Array.<Number>=} aData.bysetpos            The positionals for the BYSETPOS part
   */
  static fromData(aData) {
    return new _Recur(aData);
  }
  /**
   * Converts a recurrence string to a data object, suitable for the fromData
   * method.
   *
   * @private
   * @param {String} string     The string to parse
   * @param {Boolean} fmtIcal   If true, the string is considered to be an
   *                              iCalendar string
   * @return {Recur}            The recurrence instance
   */
  static _stringToData(string, fmtIcal) {
    let dict = /* @__PURE__ */ Object.create(null);
    let values = string.split(";");
    let len = values.length;
    for (let i = 0; i < len; i++) {
      let parts = values[i].split("=");
      let ucname = parts[0].toUpperCase();
      let lcname = parts[0].toLowerCase();
      let name = fmtIcal ? lcname : ucname;
      let value = parts[1];
      if (ucname in partDesign) {
        let partArr = value.split(",");
        let partSet = /* @__PURE__ */ new Set();
        for (let part of partArr) {
          partSet.add(partDesign[ucname](part));
        }
        partArr = [...partSet];
        dict[name] = partArr.length == 1 ? partArr[0] : partArr;
      } else if (ucname in optionDesign) {
        optionDesign[ucname](value, dict, fmtIcal);
      } else {
        dict[lcname] = value;
      }
    }
    return dict;
  }
  /**
   * Convert an ical representation of a day (SU, MO, etc..)
   * into a numeric value of that day.
   *
   * @param {String} string     The iCalendar day name
   * @param {weekDay=} aWeekStart
   *        The week start weekday, defaults to SUNDAY
   * @return {Number}           Numeric value of given day
   */
  static icalDayToNumericDay(string, aWeekStart) {
    let firstDow = aWeekStart || Time2.SUNDAY;
    return (DOW_MAP[string] - firstDow + 7) % 7 + 1;
  }
  /**
   * Convert a numeric day value into its ical representation (SU, MO, etc..)
   *
   * @param {Number} num        Numeric value of given day
   * @param {weekDay=} aWeekStart
   *        The week start weekday, defaults to SUNDAY
   * @return {String}           The ICAL day value, e.g SU,MO,...
   */
  static numericDayToIcalDay(num2, aWeekStart) {
    let firstDow = aWeekStart || Time2.SUNDAY;
    let dow = num2 + firstDow - Time2.SUNDAY;
    if (dow > 7) {
      dow -= 7;
    }
    return REVERSE_DOW_MAP[dow];
  }
  /**
   * Create a new instance of the Recur class.
   *
   * @param {Object} data                               An object with members of the recurrence
   * @param {frequencyValues=} data.freq                The frequency value
   * @param {Number=} data.interval                     The INTERVAL value
   * @param {weekDay=} data.wkst                        The week start value
   * @param {Time=} data.until                          The end of the recurrence set
   * @param {Number=} data.count                        The number of occurrences
   * @param {Array.<Number>=} data.bysecond             The seconds for the BYSECOND part
   * @param {Array.<Number>=} data.byminute             The minutes for the BYMINUTE part
   * @param {Array.<Number>=} data.byhour               The hours for the BYHOUR part
   * @param {Array.<String>=} data.byday                The BYDAY values
   * @param {Array.<Number>=} data.bymonthday           The days for the BYMONTHDAY part
   * @param {Array.<Number>=} data.byyearday            The days for the BYYEARDAY part
   * @param {Array.<Number>=} data.byweekno             The weeks for the BYWEEKNO part
   * @param {Array.<Number>=} data.bymonth              The month for the BYMONTH part
   * @param {Array.<Number>=} data.bysetpos             The positionals for the BYSETPOS part
   */
  constructor(data) {
    this.wrappedJSObject = this;
    this.parts = {};
    if (data && typeof data === "object") {
      this.fromData(data);
    }
  }
  /**
   * An object holding the BY-parts of the recurrence rule
   * @memberof ICAL.Recur
   * @typedef {Object} byParts
   * @property {Array.<Number>=} BYSECOND            The seconds for the BYSECOND part
   * @property {Array.<Number>=} BYMINUTE            The minutes for the BYMINUTE part
   * @property {Array.<Number>=} BYHOUR              The hours for the BYHOUR part
   * @property {Array.<String>=} BYDAY               The BYDAY values
   * @property {Array.<Number>=} BYMONTHDAY          The days for the BYMONTHDAY part
   * @property {Array.<Number>=} BYYEARDAY           The days for the BYYEARDAY part
   * @property {Array.<Number>=} BYWEEKNO            The weeks for the BYWEEKNO part
   * @property {Array.<Number>=} BYMONTH             The month for the BYMONTH part
   * @property {Array.<Number>=} BYSETPOS            The positionals for the BYSETPOS part
   */
  /**
   * An object holding the BY-parts of the recurrence rule
   * @type {byParts}
   */
  parts = null;
  /**
   * The interval value for the recurrence rule.
   * @type {Number}
   */
  interval = 1;
  /**
   * The week start day
   *
   * @type {weekDay}
   * @default ICAL.Time.MONDAY
   */
  wkst = Time2.MONDAY;
  /**
   * The end of the recurrence
   * @type {?Time}
   */
  until = null;
  /**
   * The maximum number of occurrences
   * @type {?Number}
   */
  count = null;
  /**
   * The frequency value.
   * @type {frequencyValues}
   */
  freq = null;
  /**
   * The class identifier.
   * @constant
   * @type {String}
   * @default "icalrecur"
   */
  icalclass = "icalrecur";
  /**
   * The type name, to be used in the jCal object.
   * @constant
   * @type {String}
   * @default "recur"
   */
  icaltype = "recur";
  /**
   * Create a new iterator for this recurrence rule. The passed start date
   * must be the start date of the event, not the start of the range to
   * search in.
   *
   * @example
   * let recur = comp.getFirstPropertyValue('rrule');
   * let dtstart = comp.getFirstPropertyValue('dtstart');
   * let iter = recur.iterator(dtstart);
   * for (let next = iter.next(); next; next = iter.next()) {
   *   if (next.compare(rangeStart) < 0) {
   *     continue;
   *   }
   *   console.log(next.toString());
   * }
   *
   * @param {Time} aStart        The item's start date
   * @return {RecurIterator}     The recurrence iterator
   */
  iterator(aStart) {
    return new RecurIterator({
      rule: this,
      dtstart: aStart
    });
  }
  /**
   * Returns a clone of the recurrence object.
   *
   * @return {Recur}      The cloned object
   */
  clone() {
    return new _Recur(this.toJSON());
  }
  /**
   * Checks if the current rule is finite, i.e. has a count or until part.
   *
   * @return {Boolean}        True, if the rule is finite
   */
  isFinite() {
    return !!(this.count || this.until);
  }
  /**
   * Checks if the current rule has a count part, and not limited by an until
   * part.
   *
   * @return {Boolean}        True, if the rule is by count
   */
  isByCount() {
    return !!(this.count && !this.until);
  }
  /**
   * Adds a component (part) to the recurrence rule. This is not a component
   * in the sense of {@link ICAL.Component}, but a part of the recurrence
   * rule, i.e. BYMONTH.
   *
   * @param {String} aType            The name of the component part
   * @param {Array|String} aValue     The component value
   */
  addComponent(aType, aValue) {
    let ucname = aType.toUpperCase();
    if (ucname in this.parts) {
      this.parts[ucname].push(aValue);
    } else {
      this.parts[ucname] = [aValue];
    }
  }
  /**
   * Sets the component value for the given by-part.
   *
   * @param {String} aType        The component part name
   * @param {Array} aValues       The component values
   */
  setComponent(aType, aValues) {
    this.parts[aType.toUpperCase()] = aValues.slice();
  }
  /**
   * Gets (a copy) of the requested component value.
   *
   * @param {String} aType        The component part name
   * @return {Array}              The component part value
   */
  getComponent(aType) {
    let ucname = aType.toUpperCase();
    return ucname in this.parts ? this.parts[ucname].slice() : [];
  }
  /**
   * Retrieves the next occurrence after the given recurrence id. See the
   * guide on {@tutorial terminology} for more details.
   *
   * NOTE: Currently, this method iterates all occurrences from the start
   * date. It should not be called in a loop for performance reasons. If you
   * would like to get more than one occurrence, you can iterate the
   * occurrences manually, see the example on the
   * {@link ICAL.Recur#iterator iterator} method.
   *
   * @param {Time} aStartTime        The start of the event series
   * @param {Time} aRecurrenceId     The date of the last occurrence
   * @return {Time}                  The next occurrence after
   */
  getNextOccurrence(aStartTime, aRecurrenceId) {
    let iter2 = this.iterator(aStartTime);
    let next;
    do {
      next = iter2.next();
    } while (next && next.compare(aRecurrenceId) <= 0);
    if (next && aRecurrenceId.zone) {
      next.zone = aRecurrenceId.zone;
    }
    return next;
  }
  /**
   * Sets up the current instance using members from the passed data object.
   *
   * @param {Object} data                               An object with members of the recurrence
   * @param {frequencyValues=} data.freq                The frequency value
   * @param {Number=} data.interval                     The INTERVAL value
   * @param {weekDay=} data.wkst                        The week start value
   * @param {Time=} data.until                          The end of the recurrence set
   * @param {Number=} data.count                        The number of occurrences
   * @param {Array.<Number>=} data.bysecond             The seconds for the BYSECOND part
   * @param {Array.<Number>=} data.byminute             The minutes for the BYMINUTE part
   * @param {Array.<Number>=} data.byhour               The hours for the BYHOUR part
   * @param {Array.<String>=} data.byday                The BYDAY values
   * @param {Array.<Number>=} data.bymonthday           The days for the BYMONTHDAY part
   * @param {Array.<Number>=} data.byyearday            The days for the BYYEARDAY part
   * @param {Array.<Number>=} data.byweekno             The weeks for the BYWEEKNO part
   * @param {Array.<Number>=} data.bymonth              The month for the BYMONTH part
   * @param {Array.<Number>=} data.bysetpos             The positionals for the BYSETPOS part
   */
  fromData(data) {
    for (let key in data) {
      let uckey = key.toUpperCase();
      if (uckey in partDesign) {
        if (Array.isArray(data[key])) {
          this.parts[uckey] = data[key];
        } else {
          this.parts[uckey] = [data[key]];
        }
      } else {
        this[key] = data[key];
      }
    }
    if (this.interval && typeof this.interval != "number") {
      optionDesign.INTERVAL(this.interval, this);
    }
    if (this.wkst && typeof this.wkst != "number") {
      this.wkst = _Recur.icalDayToNumericDay(this.wkst);
    }
    if (this.until && !(this.until instanceof Time2)) {
      this.until = Time2.fromString(this.until);
    }
  }
  /**
   * The jCal representation of this recurrence type.
   * @return {Object}
   */
  toJSON() {
    let res = /* @__PURE__ */ Object.create(null);
    res.freq = this.freq;
    if (this.count) {
      res.count = this.count;
    }
    if (this.interval > 1) {
      res.interval = this.interval;
    }
    for (let [k, kparts] of Object.entries(this.parts)) {
      if (Array.isArray(kparts) && kparts.length == 1) {
        res[k.toLowerCase()] = kparts[0];
      } else {
        res[k.toLowerCase()] = clone3(kparts);
      }
    }
    if (this.until) {
      res.until = this.until.toString();
    }
    if ("wkst" in this && this.wkst !== Time2.DEFAULT_WEEK_START) {
      res.wkst = _Recur.numericDayToIcalDay(this.wkst);
    }
    return res;
  }
  /**
   * The string representation of this recurrence rule.
   * @return {String}
   */
  toString() {
    let str = "FREQ=" + this.freq;
    if (this.count) {
      str += ";COUNT=" + this.count;
    }
    if (this.interval > 1) {
      str += ";INTERVAL=" + this.interval;
    }
    for (let [k, v] of Object.entries(this.parts)) {
      str += ";" + k + "=" + v;
    }
    if (this.until) {
      str += ";UNTIL=" + this.until.toICALString();
    }
    if ("wkst" in this && this.wkst !== Time2.DEFAULT_WEEK_START) {
      str += ";WKST=" + _Recur.numericDayToIcalDay(this.wkst);
    }
    return str;
  }
};
function parseNumericValue(type, min, max, value) {
  let result = value;
  if (value[0] === "+") {
    result = value.slice(1);
  }
  result = strictParseInt(result);
  if (min !== void 0 && value < min) {
    throw new Error(
      type + ': invalid value "' + value + '" must be > ' + min
    );
  }
  if (max !== void 0 && value > max) {
    throw new Error(
      type + ': invalid value "' + value + '" must be < ' + min
    );
  }
  return result;
}
var optionDesign = {
  FREQ: function(value, dict, fmtIcal) {
    if (ALLOWED_FREQ.indexOf(value) !== -1) {
      dict.freq = value;
    } else {
      throw new Error(
        'invalid frequency "' + value + '" expected: "' + ALLOWED_FREQ.join(", ") + '"'
      );
    }
  },
  COUNT: function(value, dict, fmtIcal) {
    dict.count = strictParseInt(value);
  },
  INTERVAL: function(value, dict, fmtIcal) {
    dict.interval = strictParseInt(value);
    if (dict.interval < 1) {
      dict.interval = 1;
    }
  },
  UNTIL: function(value, dict, fmtIcal) {
    if (value.length > 10) {
      dict.until = design.icalendar.value["date-time"].fromICAL(value);
    } else {
      dict.until = design.icalendar.value.date.fromICAL(value);
    }
    if (!fmtIcal) {
      dict.until = Time2.fromString(dict.until);
    }
  },
  WKST: function(value, dict, fmtIcal) {
    if (VALID_DAY_NAMES.test(value)) {
      dict.wkst = Recur.icalDayToNumericDay(value);
    } else {
      throw new Error('invalid WKST value "' + value + '"');
    }
  }
};
var partDesign = {
  BYSECOND: parseNumericValue.bind(void 0, "BYSECOND", 0, 60),
  BYMINUTE: parseNumericValue.bind(void 0, "BYMINUTE", 0, 59),
  BYHOUR: parseNumericValue.bind(void 0, "BYHOUR", 0, 23),
  BYDAY: function(value) {
    if (VALID_BYDAY_PART.test(value)) {
      return value;
    } else {
      throw new Error('invalid BYDAY value "' + value + '"');
    }
  },
  BYMONTHDAY: parseNumericValue.bind(void 0, "BYMONTHDAY", -31, 31),
  BYYEARDAY: parseNumericValue.bind(void 0, "BYYEARDAY", -366, 366),
  BYWEEKNO: parseNumericValue.bind(void 0, "BYWEEKNO", -53, 53),
  BYMONTH: parseNumericValue.bind(void 0, "BYMONTH", 1, 12),
  BYSETPOS: parseNumericValue.bind(void 0, "BYSETPOS", -366, 366)
};
var FROM_ICAL_NEWLINE = /\\\\|\\;|\\,|\\[Nn]/g;
var TO_ICAL_NEWLINE = /\\|;|,|\n/g;
var FROM_VCARD_NEWLINE = /\\\\|\\,|\\[Nn]/g;
var TO_VCARD_NEWLINE = /\\|,|\n/g;
function createTextType(fromNewline, toNewline) {
  let result = {
    matches: /.*/,
    fromICAL: function(aValue, structuredEscape) {
      return replaceNewline(aValue, fromNewline, structuredEscape);
    },
    toICAL: function(aValue, structuredEscape) {
      let regEx = toNewline;
      if (structuredEscape)
        regEx = new RegExp(regEx.source + "|" + structuredEscape, regEx.flags);
      return aValue.replace(regEx, function(str) {
        switch (str) {
          case "\\":
            return "\\\\";
          case ";":
            return "\\;";
          case ",":
            return "\\,";
          case "\n":
            return "\\n";
          /* c8 ignore next 2 */
          default:
            return str;
        }
      });
    }
  };
  return result;
}
var DEFAULT_TYPE_TEXT = { defaultType: "text" };
var DEFAULT_TYPE_TEXT_MULTI = { defaultType: "text", multiValue: "," };
var DEFAULT_TYPE_TEXT_STRUCTURED = { defaultType: "text", structuredValue: ";" };
var DEFAULT_TYPE_INTEGER = { defaultType: "integer" };
var DEFAULT_TYPE_DATETIME_DATE = { defaultType: "date-time", allowedTypes: ["date-time", "date"] };
var DEFAULT_TYPE_DATETIME = { defaultType: "date-time" };
var DEFAULT_TYPE_URI = { defaultType: "uri" };
var DEFAULT_TYPE_UTCOFFSET = { defaultType: "utc-offset" };
var DEFAULT_TYPE_RECUR = { defaultType: "recur" };
var DEFAULT_TYPE_DATE_ANDOR_TIME = { defaultType: "date-and-or-time", allowedTypes: ["date-time", "date", "text"] };
function replaceNewlineReplace(string) {
  switch (string) {
    case "\\\\":
      return "\\";
    case "\\;":
      return ";";
    case "\\,":
      return ",";
    case "\\n":
    case "\\N":
      return "\n";
    /* c8 ignore next 2 */
    default:
      return string;
  }
}
function replaceNewline(value, newline, structuredEscape) {
  if (value.indexOf("\\") === -1) {
    return value;
  }
  if (structuredEscape)
    newline = new RegExp(newline.source + "|\\\\" + structuredEscape, newline.flags);
  return value.replace(newline, replaceNewlineReplace);
}
var commonProperties = {
  "categories": DEFAULT_TYPE_TEXT_MULTI,
  "url": DEFAULT_TYPE_URI,
  "version": DEFAULT_TYPE_TEXT,
  "uid": DEFAULT_TYPE_TEXT
};
var commonValues = {
  "boolean": {
    values: ["TRUE", "FALSE"],
    fromICAL: function(aValue) {
      switch (aValue) {
        case "TRUE":
          return true;
        case "FALSE":
          return false;
        default:
          return false;
      }
    },
    toICAL: function(aValue) {
      if (aValue) {
        return "TRUE";
      }
      return "FALSE";
    }
  },
  float: {
    matches: /^[+-]?\d+\.\d+$/,
    fromICAL: function(aValue) {
      let parsed = parseFloat(aValue);
      if (isStrictlyNaN(parsed)) {
        return 0;
      }
      return parsed;
    },
    toICAL: function(aValue) {
      return String(aValue);
    }
  },
  integer: {
    fromICAL: function(aValue) {
      let parsed = parseInt(aValue);
      if (isStrictlyNaN(parsed)) {
        return 0;
      }
      return parsed;
    },
    toICAL: function(aValue) {
      return String(aValue);
    }
  },
  "utc-offset": {
    toICAL: function(aValue) {
      if (aValue.length < 7) {
        return aValue.slice(0, 3) + aValue.slice(4, 6);
      } else {
        return aValue.slice(0, 3) + aValue.slice(4, 6) + aValue.slice(7, 9);
      }
    },
    fromICAL: function(aValue) {
      if (aValue.length < 6) {
        return aValue.slice(0, 3) + ":" + aValue.slice(3, 5);
      } else {
        return aValue.slice(0, 3) + ":" + aValue.slice(3, 5) + ":" + aValue.slice(5, 7);
      }
    },
    decorate: function(aValue) {
      return UtcOffset.fromString(aValue);
    },
    undecorate: function(aValue) {
      return aValue.toString();
    }
  }
};
var icalParams = {
  // Although the syntax is DQUOTE uri DQUOTE, I don't think we should
  // enforce anything aside from it being a valid content line.
  //
  // At least some params require - if multi values are used - DQUOTEs
  // for each of its values - e.g. delegated-from="uri1","uri2"
  // To indicate this, I introduced the new k/v pair
  // multiValueSeparateDQuote: true
  //
  // "ALTREP": { ... },
  // CN just wants a param-value
  // "CN": { ... }
  "cutype": {
    values: ["INDIVIDUAL", "GROUP", "RESOURCE", "ROOM", "UNKNOWN"],
    allowXName: true,
    allowIanaToken: true
  },
  "delegated-from": {
    valueType: "cal-address",
    multiValue: ",",
    multiValueSeparateDQuote: true
  },
  "delegated-to": {
    valueType: "cal-address",
    multiValue: ",",
    multiValueSeparateDQuote: true
  },
  // "DIR": { ... }, // See ALTREP
  "encoding": {
    values: ["8BIT", "BASE64"]
  },
  // "FMTTYPE": { ... }, // See ALTREP
  "fbtype": {
    values: ["FREE", "BUSY", "BUSY-UNAVAILABLE", "BUSY-TENTATIVE"],
    allowXName: true,
    allowIanaToken: true
  },
  // "LANGUAGE": { ... }, // See ALTREP
  "member": {
    valueType: "cal-address",
    multiValue: ",",
    multiValueSeparateDQuote: true
  },
  "partstat": {
    // TODO These values are actually different per-component
    values: [
      "NEEDS-ACTION",
      "ACCEPTED",
      "DECLINED",
      "TENTATIVE",
      "DELEGATED",
      "COMPLETED",
      "IN-PROCESS"
    ],
    allowXName: true,
    allowIanaToken: true
  },
  "range": {
    values: ["THISANDFUTURE"]
  },
  "related": {
    values: ["START", "END"]
  },
  "reltype": {
    values: ["PARENT", "CHILD", "SIBLING"],
    allowXName: true,
    allowIanaToken: true
  },
  "role": {
    values: [
      "REQ-PARTICIPANT",
      "CHAIR",
      "OPT-PARTICIPANT",
      "NON-PARTICIPANT"
    ],
    allowXName: true,
    allowIanaToken: true
  },
  "rsvp": {
    values: ["TRUE", "FALSE"]
  },
  "sent-by": {
    valueType: "cal-address"
  },
  "tzid": {
    matches: /^\//
  },
  "value": {
    // since the value here is a 'type' lowercase is used.
    values: [
      "binary",
      "boolean",
      "cal-address",
      "date",
      "date-time",
      "duration",
      "float",
      "integer",
      "period",
      "recur",
      "text",
      "time",
      "uri",
      "utc-offset"
    ],
    allowXName: true,
    allowIanaToken: true
  }
};
var icalValues = extend(commonValues, {
  text: createTextType(FROM_ICAL_NEWLINE, TO_ICAL_NEWLINE),
  uri: {
    // TODO
    /* ... */
  },
  "binary": {
    decorate: function(aString) {
      return Binary.fromString(aString);
    },
    undecorate: function(aBinary) {
      return aBinary.toString();
    }
  },
  "cal-address": {
    // needs to be an uri
  },
  "date": {
    decorate: function(aValue, aProp) {
      if (design.strict) {
        return Time2.fromDateString(aValue, aProp);
      } else {
        return Time2.fromString(aValue, aProp);
      }
    },
    /**
     * undecorates a time object.
     */
    undecorate: function(aValue) {
      return aValue.toString();
    },
    fromICAL: function(aValue) {
      if (!design.strict && aValue.length >= 15) {
        return icalValues["date-time"].fromICAL(aValue);
      } else {
        return aValue.slice(0, 4) + "-" + aValue.slice(4, 6) + "-" + aValue.slice(6, 8);
      }
    },
    toICAL: function(aValue) {
      let len = aValue.length;
      if (len == 10) {
        return aValue.slice(0, 4) + aValue.slice(5, 7) + aValue.slice(8, 10);
      } else if (len >= 19) {
        return icalValues["date-time"].toICAL(aValue);
      } else {
        return aValue;
      }
    }
  },
  "date-time": {
    fromICAL: function(aValue) {
      if (!design.strict && aValue.length == 8) {
        return icalValues.date.fromICAL(aValue);
      } else {
        let result = aValue.slice(0, 4) + "-" + aValue.slice(4, 6) + "-" + aValue.slice(6, 8) + "T" + aValue.slice(9, 11) + ":" + aValue.slice(11, 13) + ":" + aValue.slice(13, 15);
        if (aValue[15] && aValue[15] === "Z") {
          result += "Z";
        }
        return result;
      }
    },
    toICAL: function(aValue) {
      let len = aValue.length;
      if (len == 10 && !design.strict) {
        return icalValues.date.toICAL(aValue);
      } else if (len >= 19) {
        let result = aValue.slice(0, 4) + aValue.slice(5, 7) + // grab the (DDTHH) segment
        aValue.slice(8, 13) + // MM
        aValue.slice(14, 16) + // SS
        aValue.slice(17, 19);
        if (aValue[19] && aValue[19] === "Z") {
          result += "Z";
        }
        return result;
      } else {
        return aValue;
      }
    },
    decorate: function(aValue, aProp) {
      if (design.strict) {
        return Time2.fromDateTimeString(aValue, aProp);
      } else {
        return Time2.fromString(aValue, aProp);
      }
    },
    undecorate: function(aValue) {
      return aValue.toString();
    }
  },
  duration: {
    decorate: function(aValue) {
      return Duration.fromString(aValue);
    },
    undecorate: function(aValue) {
      return aValue.toString();
    }
  },
  period: {
    fromICAL: function(string) {
      let parts = string.split("/");
      parts[0] = icalValues["date-time"].fromICAL(parts[0]);
      if (!Duration.isValueString(parts[1])) {
        parts[1] = icalValues["date-time"].fromICAL(parts[1]);
      }
      return parts;
    },
    toICAL: function(parts) {
      parts = parts.slice();
      if (!design.strict && parts[0].length == 10) {
        parts[0] = icalValues.date.toICAL(parts[0]);
      } else {
        parts[0] = icalValues["date-time"].toICAL(parts[0]);
      }
      if (!Duration.isValueString(parts[1])) {
        if (!design.strict && parts[1].length == 10) {
          parts[1] = icalValues.date.toICAL(parts[1]);
        } else {
          parts[1] = icalValues["date-time"].toICAL(parts[1]);
        }
      }
      return parts.join("/");
    },
    decorate: function(aValue, aProp) {
      return Period.fromJSON(aValue, aProp, !design.strict);
    },
    undecorate: function(aValue) {
      return aValue.toJSON();
    }
  },
  recur: {
    fromICAL: function(string) {
      return Recur._stringToData(string, true);
    },
    toICAL: function(data) {
      let str = "";
      for (let [k, val] of Object.entries(data)) {
        if (k == "until") {
          if (val.length > 10) {
            val = icalValues["date-time"].toICAL(val);
          } else {
            val = icalValues.date.toICAL(val);
          }
        } else if (k == "wkst") {
          if (typeof val === "number") {
            val = Recur.numericDayToIcalDay(val);
          }
        } else if (Array.isArray(val)) {
          val = val.join(",");
        }
        str += k.toUpperCase() + "=" + val + ";";
      }
      return str.slice(0, Math.max(0, str.length - 1));
    },
    decorate: function decorate(aValue) {
      return Recur.fromData(aValue);
    },
    undecorate: function(aRecur) {
      return aRecur.toJSON();
    }
  },
  time: {
    fromICAL: function(aValue) {
      if (aValue.length < 6) {
        return aValue;
      }
      let result = aValue.slice(0, 2) + ":" + aValue.slice(2, 4) + ":" + aValue.slice(4, 6);
      if (aValue[6] === "Z") {
        result += "Z";
      }
      return result;
    },
    toICAL: function(aValue) {
      if (aValue.length < 8) {
        return aValue;
      }
      let result = aValue.slice(0, 2) + aValue.slice(3, 5) + aValue.slice(6, 8);
      if (aValue[8] === "Z") {
        result += "Z";
      }
      return result;
    }
  }
});
var icalProperties = extend(commonProperties, {
  "action": DEFAULT_TYPE_TEXT,
  "attach": { defaultType: "uri" },
  "attendee": { defaultType: "cal-address" },
  "calscale": DEFAULT_TYPE_TEXT,
  "class": DEFAULT_TYPE_TEXT,
  "comment": DEFAULT_TYPE_TEXT,
  "completed": DEFAULT_TYPE_DATETIME,
  "contact": DEFAULT_TYPE_TEXT,
  "created": DEFAULT_TYPE_DATETIME,
  "description": DEFAULT_TYPE_TEXT,
  "dtend": DEFAULT_TYPE_DATETIME_DATE,
  "dtstamp": DEFAULT_TYPE_DATETIME,
  "dtstart": DEFAULT_TYPE_DATETIME_DATE,
  "due": DEFAULT_TYPE_DATETIME_DATE,
  "duration": { defaultType: "duration" },
  "exdate": {
    defaultType: "date-time",
    allowedTypes: ["date-time", "date"],
    multiValue: ","
  },
  "exrule": DEFAULT_TYPE_RECUR,
  "freebusy": { defaultType: "period", multiValue: "," },
  "geo": { defaultType: "float", structuredValue: ";" },
  "last-modified": DEFAULT_TYPE_DATETIME,
  "location": DEFAULT_TYPE_TEXT,
  "method": DEFAULT_TYPE_TEXT,
  "organizer": { defaultType: "cal-address" },
  "percent-complete": DEFAULT_TYPE_INTEGER,
  "priority": DEFAULT_TYPE_INTEGER,
  "prodid": DEFAULT_TYPE_TEXT,
  "related-to": DEFAULT_TYPE_TEXT,
  "repeat": DEFAULT_TYPE_INTEGER,
  "rdate": {
    defaultType: "date-time",
    allowedTypes: ["date-time", "date", "period"],
    multiValue: ",",
    detectType: function(string) {
      if (string.indexOf("/") !== -1) {
        return "period";
      }
      return string.indexOf("T") === -1 ? "date" : "date-time";
    }
  },
  "recurrence-id": DEFAULT_TYPE_DATETIME_DATE,
  "resources": DEFAULT_TYPE_TEXT_MULTI,
  "request-status": DEFAULT_TYPE_TEXT_STRUCTURED,
  "rrule": DEFAULT_TYPE_RECUR,
  "sequence": DEFAULT_TYPE_INTEGER,
  "status": DEFAULT_TYPE_TEXT,
  "summary": DEFAULT_TYPE_TEXT,
  "transp": DEFAULT_TYPE_TEXT,
  "trigger": { defaultType: "duration", allowedTypes: ["duration", "date-time"] },
  "tzoffsetfrom": DEFAULT_TYPE_UTCOFFSET,
  "tzoffsetto": DEFAULT_TYPE_UTCOFFSET,
  "tzurl": DEFAULT_TYPE_URI,
  "tzid": DEFAULT_TYPE_TEXT,
  "tzname": DEFAULT_TYPE_TEXT
});
var vcardValues = extend(commonValues, {
  text: createTextType(FROM_VCARD_NEWLINE, TO_VCARD_NEWLINE),
  uri: createTextType(FROM_VCARD_NEWLINE, TO_VCARD_NEWLINE),
  date: {
    decorate: function(aValue) {
      return VCardTime.fromDateAndOrTimeString(aValue, "date");
    },
    undecorate: function(aValue) {
      return aValue.toString();
    },
    fromICAL: function(aValue) {
      if (aValue.length == 8) {
        return icalValues.date.fromICAL(aValue);
      } else if (aValue[0] == "-" && aValue.length == 6) {
        return aValue.slice(0, 4) + "-" + aValue.slice(4);
      } else {
        return aValue;
      }
    },
    toICAL: function(aValue) {
      if (aValue.length == 10) {
        return icalValues.date.toICAL(aValue);
      } else if (aValue[0] == "-" && aValue.length == 7) {
        return aValue.slice(0, 4) + aValue.slice(5);
      } else {
        return aValue;
      }
    }
  },
  time: {
    decorate: function(aValue) {
      return VCardTime.fromDateAndOrTimeString("T" + aValue, "time");
    },
    undecorate: function(aValue) {
      return aValue.toString();
    },
    fromICAL: function(aValue) {
      let splitzone = vcardValues.time._splitZone(aValue, true);
      let zone = splitzone[0], value = splitzone[1];
      if (value.length == 6) {
        value = value.slice(0, 2) + ":" + value.slice(2, 4) + ":" + value.slice(4, 6);
      } else if (value.length == 4 && value[0] != "-") {
        value = value.slice(0, 2) + ":" + value.slice(2, 4);
      } else if (value.length == 5) {
        value = value.slice(0, 3) + ":" + value.slice(3, 5);
      }
      if (zone.length == 5 && (zone[0] == "-" || zone[0] == "+")) {
        zone = zone.slice(0, 3) + ":" + zone.slice(3);
      }
      return value + zone;
    },
    toICAL: function(aValue) {
      let splitzone = vcardValues.time._splitZone(aValue);
      let zone = splitzone[0], value = splitzone[1];
      if (value.length == 8) {
        value = value.slice(0, 2) + value.slice(3, 5) + value.slice(6, 8);
      } else if (value.length == 5 && value[0] != "-") {
        value = value.slice(0, 2) + value.slice(3, 5);
      } else if (value.length == 6) {
        value = value.slice(0, 3) + value.slice(4, 6);
      }
      if (zone.length == 6 && (zone[0] == "-" || zone[0] == "+")) {
        zone = zone.slice(0, 3) + zone.slice(4);
      }
      return value + zone;
    },
    _splitZone: function(aValue, isFromIcal) {
      let lastChar = aValue.length - 1;
      let signChar = aValue.length - (isFromIcal ? 5 : 6);
      let sign = aValue[signChar];
      let zone, value;
      if (aValue[lastChar] == "Z") {
        zone = aValue[lastChar];
        value = aValue.slice(0, Math.max(0, lastChar));
      } else if (aValue.length > 6 && (sign == "-" || sign == "+")) {
        zone = aValue.slice(signChar);
        value = aValue.slice(0, Math.max(0, signChar));
      } else {
        zone = "";
        value = aValue;
      }
      return [zone, value];
    }
  },
  "date-time": {
    decorate: function(aValue) {
      return VCardTime.fromDateAndOrTimeString(aValue, "date-time");
    },
    undecorate: function(aValue) {
      return aValue.toString();
    },
    fromICAL: function(aValue) {
      return vcardValues["date-and-or-time"].fromICAL(aValue);
    },
    toICAL: function(aValue) {
      return vcardValues["date-and-or-time"].toICAL(aValue);
    }
  },
  "date-and-or-time": {
    decorate: function(aValue) {
      return VCardTime.fromDateAndOrTimeString(aValue, "date-and-or-time");
    },
    undecorate: function(aValue) {
      return aValue.toString();
    },
    fromICAL: function(aValue) {
      let parts = aValue.split("T");
      return (parts[0] ? vcardValues.date.fromICAL(parts[0]) : "") + (parts[1] ? "T" + vcardValues.time.fromICAL(parts[1]) : "");
    },
    toICAL: function(aValue) {
      let parts = aValue.split("T");
      return vcardValues.date.toICAL(parts[0]) + (parts[1] ? "T" + vcardValues.time.toICAL(parts[1]) : "");
    }
  },
  timestamp: icalValues["date-time"],
  "language-tag": {
    matches: /^[a-zA-Z0-9-]+$/
    // Could go with a more strict regex here
  },
  "phone-number": {
    fromICAL: function(aValue) {
      return Array.from(aValue).filter(function(c) {
        return c === "\\" ? void 0 : c;
      }).join("");
    },
    toICAL: function(aValue) {
      return Array.from(aValue).map(function(c) {
        return c === "," || c === ";" ? "\\" + c : c;
      }).join("");
    }
  }
});
var vcardParams = {
  "type": {
    valueType: "text",
    multiValue: ","
  },
  "value": {
    // since the value here is a 'type' lowercase is used.
    values: [
      "text",
      "uri",
      "date",
      "time",
      "date-time",
      "date-and-or-time",
      "timestamp",
      "boolean",
      "integer",
      "float",
      "utc-offset",
      "language-tag"
    ],
    allowXName: true,
    allowIanaToken: true
  }
};
var vcardProperties = extend(commonProperties, {
  "adr": { defaultType: "text", structuredValue: ";", multiValue: "," },
  "anniversary": DEFAULT_TYPE_DATE_ANDOR_TIME,
  "bday": DEFAULT_TYPE_DATE_ANDOR_TIME,
  "caladruri": DEFAULT_TYPE_URI,
  "caluri": DEFAULT_TYPE_URI,
  "clientpidmap": DEFAULT_TYPE_TEXT_STRUCTURED,
  "email": DEFAULT_TYPE_TEXT,
  "fburl": DEFAULT_TYPE_URI,
  "fn": DEFAULT_TYPE_TEXT,
  "gender": DEFAULT_TYPE_TEXT_STRUCTURED,
  "geo": DEFAULT_TYPE_URI,
  "impp": DEFAULT_TYPE_URI,
  "key": DEFAULT_TYPE_URI,
  "kind": DEFAULT_TYPE_TEXT,
  "lang": { defaultType: "language-tag" },
  "logo": DEFAULT_TYPE_URI,
  "member": DEFAULT_TYPE_URI,
  "n": { defaultType: "text", structuredValue: ";", multiValue: "," },
  "nickname": DEFAULT_TYPE_TEXT_MULTI,
  "note": DEFAULT_TYPE_TEXT,
  "org": { defaultType: "text", structuredValue: ";" },
  "photo": DEFAULT_TYPE_URI,
  "related": DEFAULT_TYPE_URI,
  "rev": { defaultType: "timestamp" },
  "role": DEFAULT_TYPE_TEXT,
  "sound": DEFAULT_TYPE_URI,
  "source": DEFAULT_TYPE_URI,
  "tel": { defaultType: "uri", allowedTypes: ["uri", "text"] },
  "title": DEFAULT_TYPE_TEXT,
  "tz": { defaultType: "text", allowedTypes: ["text", "utc-offset", "uri"] },
  "xml": DEFAULT_TYPE_TEXT
});
var vcard3Values = extend(commonValues, {
  binary: icalValues.binary,
  date: vcardValues.date,
  "date-time": vcardValues["date-time"],
  "phone-number": vcardValues["phone-number"],
  uri: icalValues.uri,
  text: vcardValues.text,
  time: icalValues.time,
  vcard: icalValues.text,
  "utc-offset": {
    toICAL: function(aValue) {
      return aValue.slice(0, 7);
    },
    fromICAL: function(aValue) {
      return aValue.slice(0, 7);
    },
    decorate: function(aValue) {
      return UtcOffset.fromString(aValue);
    },
    undecorate: function(aValue) {
      return aValue.toString();
    }
  }
});
var vcard3Params = {
  "type": {
    valueType: "text",
    multiValue: ","
  },
  "value": {
    // since the value here is a 'type' lowercase is used.
    values: [
      "text",
      "uri",
      "date",
      "date-time",
      "phone-number",
      "time",
      "boolean",
      "integer",
      "float",
      "utc-offset",
      "vcard",
      "binary"
    ],
    allowXName: true,
    allowIanaToken: true
  }
};
var vcard3Properties = extend(commonProperties, {
  fn: DEFAULT_TYPE_TEXT,
  n: { defaultType: "text", structuredValue: ";", multiValue: "," },
  nickname: DEFAULT_TYPE_TEXT_MULTI,
  photo: { defaultType: "binary", allowedTypes: ["binary", "uri"] },
  bday: {
    defaultType: "date-time",
    allowedTypes: ["date-time", "date"],
    detectType: function(string) {
      return string.indexOf("T") === -1 ? "date" : "date-time";
    }
  },
  adr: { defaultType: "text", structuredValue: ";", multiValue: "," },
  label: DEFAULT_TYPE_TEXT,
  tel: { defaultType: "phone-number" },
  email: DEFAULT_TYPE_TEXT,
  mailer: DEFAULT_TYPE_TEXT,
  tz: { defaultType: "utc-offset", allowedTypes: ["utc-offset", "text"] },
  geo: { defaultType: "float", structuredValue: ";" },
  title: DEFAULT_TYPE_TEXT,
  role: DEFAULT_TYPE_TEXT,
  logo: { defaultType: "binary", allowedTypes: ["binary", "uri"] },
  agent: { defaultType: "vcard", allowedTypes: ["vcard", "text", "uri"] },
  org: DEFAULT_TYPE_TEXT_STRUCTURED,
  note: DEFAULT_TYPE_TEXT_MULTI,
  prodid: DEFAULT_TYPE_TEXT,
  rev: {
    defaultType: "date-time",
    allowedTypes: ["date-time", "date"],
    detectType: function(string) {
      return string.indexOf("T") === -1 ? "date" : "date-time";
    }
  },
  "sort-string": DEFAULT_TYPE_TEXT,
  sound: { defaultType: "binary", allowedTypes: ["binary", "uri"] },
  class: DEFAULT_TYPE_TEXT,
  key: { defaultType: "binary", allowedTypes: ["binary", "text"] }
});
var icalSet = {
  name: "ical",
  value: icalValues,
  param: icalParams,
  property: icalProperties,
  propertyGroups: false
};
var vcardSet = {
  name: "vcard4",
  value: vcardValues,
  param: vcardParams,
  property: vcardProperties,
  propertyGroups: true
};
var vcard3Set = {
  name: "vcard3",
  value: vcard3Values,
  param: vcard3Params,
  property: vcard3Properties,
  propertyGroups: true
};
var design = {
  /**
   * Can be set to false to make the parser more lenient.
   */
  strict: true,
  /**
   * The default set for new properties and components if none is specified.
   * @type {designSet}
   */
  defaultSet: icalSet,
  /**
   * The default type for unknown properties
   * @type {String}
   */
  defaultType: "unknown",
  /**
   * Holds the design set for known top-level components
   *
   * @type {Object}
   * @property {designSet} vcard       vCard VCARD
   * @property {designSet} vevent      iCalendar VEVENT
   * @property {designSet} vtodo       iCalendar VTODO
   * @property {designSet} vjournal    iCalendar VJOURNAL
   * @property {designSet} valarm      iCalendar VALARM
   * @property {designSet} vtimezone   iCalendar VTIMEZONE
   * @property {designSet} daylight    iCalendar DAYLIGHT
   * @property {designSet} standard    iCalendar STANDARD
   *
   * @example
   * let propertyName = 'fn';
   * let componentDesign = ICAL.design.components.vcard;
   * let propertyDetails = componentDesign.property[propertyName];
   * if (propertyDetails.defaultType == 'text') {
   *   // Yep, sure is...
   * }
   */
  components: {
    vcard: vcardSet,
    vcard3: vcard3Set,
    vevent: icalSet,
    vtodo: icalSet,
    vjournal: icalSet,
    valarm: icalSet,
    vtimezone: icalSet,
    daylight: icalSet,
    standard: icalSet
  },
  /**
   * The design set for iCalendar (rfc5545/rfc7265) components.
   * @type {designSet}
   */
  icalendar: icalSet,
  /**
   * The design set for vCard (rfc6350/rfc7095) components.
   * @type {designSet}
   */
  vcard: vcardSet,
  /**
   * The design set for vCard (rfc2425/rfc2426/rfc7095) components.
   * @type {designSet}
   */
  vcard3: vcard3Set,
  /**
   * Gets the design set for the given component name.
   *
   * @param {String} componentName        The name of the component
   * @return {designSet}      The design set for the component
   */
  getDesignSet: function(componentName) {
    let isInDesign = componentName && componentName in design.components;
    return isInDesign ? design.components[componentName] : design.defaultSet;
  }
};
var LINE_ENDING = "\r\n";
var DEFAULT_VALUE_TYPE = "unknown";
var RFC6868_REPLACE_MAP = { '"': "^'", "\n": "^n", "^": "^^" };
function stringify(jCal) {
  if (typeof jCal[0] == "string") {
    jCal = [jCal];
  }
  let i = 0;
  let len = jCal.length;
  let result = "";
  for (; i < len; i++) {
    result += stringify.component(jCal[i]) + LINE_ENDING;
  }
  return result;
}
stringify.component = function(component, designSet) {
  let name = component[0].toUpperCase();
  let result = "BEGIN:" + name + LINE_ENDING;
  let props = component[1];
  let propIdx = 0;
  let propLen = props.length;
  let designSetName = component[0];
  if (designSetName === "vcard" && component[1].length > 0 && !(component[1][0][0] === "version" && component[1][0][3] === "4.0")) {
    designSetName = "vcard3";
  }
  designSet = designSet || design.getDesignSet(designSetName);
  for (; propIdx < propLen; propIdx++) {
    result += stringify.property(props[propIdx], designSet) + LINE_ENDING;
  }
  let comps = component[2] || [];
  let compIdx = 0;
  let compLen = comps.length;
  for (; compIdx < compLen; compIdx++) {
    result += stringify.component(comps[compIdx], designSet) + LINE_ENDING;
  }
  result += "END:" + name;
  return result;
};
stringify.property = function(property, designSet, noFold) {
  let name = property[0].toUpperCase();
  let jsName = property[0];
  let params = property[1];
  if (!designSet) {
    designSet = design.defaultSet;
  }
  let groupName = params.group;
  let line;
  if (designSet.propertyGroups && groupName) {
    line = groupName.toUpperCase() + "." + name;
  } else {
    line = name;
  }
  for (let [paramName, value] of Object.entries(params)) {
    if (designSet.propertyGroups && paramName == "group") {
      continue;
    }
    let paramDesign = designSet.param[paramName];
    let multiValue2 = paramDesign && paramDesign.multiValue;
    if (multiValue2 && Array.isArray(value)) {
      value = value.map(function(val) {
        val = stringify._rfc6868Unescape(val);
        val = stringify.paramPropertyValue(val, paramDesign.multiValueSeparateDQuote);
        return val;
      });
      value = stringify.multiValue(value, multiValue2, "unknown", null, designSet);
    } else {
      value = stringify._rfc6868Unescape(value);
      value = stringify.paramPropertyValue(value);
    }
    line += ";" + paramName.toUpperCase() + "=" + value;
  }
  if (property.length === 3) {
    return line + ":";
  }
  let valueType = property[2];
  let propDetails;
  let multiValue = false;
  let structuredValue = false;
  let isDefault = false;
  if (jsName in designSet.property) {
    propDetails = designSet.property[jsName];
    if ("multiValue" in propDetails) {
      multiValue = propDetails.multiValue;
    }
    if ("structuredValue" in propDetails && Array.isArray(property[3])) {
      structuredValue = propDetails.structuredValue;
    }
    if ("defaultType" in propDetails) {
      if (valueType === propDetails.defaultType) {
        isDefault = true;
      }
    } else {
      if (valueType === DEFAULT_VALUE_TYPE) {
        isDefault = true;
      }
    }
  } else {
    if (valueType === DEFAULT_VALUE_TYPE) {
      isDefault = true;
    }
  }
  if (!isDefault) {
    line += ";VALUE=" + valueType.toUpperCase();
  }
  line += ":";
  if (multiValue && structuredValue) {
    line += stringify.multiValue(
      property[3],
      structuredValue,
      valueType,
      multiValue,
      designSet,
      structuredValue
    );
  } else if (multiValue) {
    line += stringify.multiValue(
      property.slice(3),
      multiValue,
      valueType,
      null,
      designSet,
      false
    );
  } else if (structuredValue) {
    line += stringify.multiValue(
      property[3],
      structuredValue,
      valueType,
      null,
      designSet,
      structuredValue
    );
  } else {
    line += stringify.value(property[3], valueType, designSet, false);
  }
  return noFold ? line : foldline(line);
};
stringify.paramPropertyValue = function(value, force) {
  if (!force && value.indexOf(",") === -1 && value.indexOf(":") === -1 && value.indexOf(";") === -1) {
    return value;
  }
  return '"' + value + '"';
};
stringify.multiValue = function(values, delim, type, innerMulti, designSet, structuredValue) {
  let result = "";
  let len = values.length;
  let i = 0;
  for (; i < len; i++) {
    if (innerMulti && Array.isArray(values[i])) {
      result += stringify.multiValue(values[i], innerMulti, type, null, designSet, structuredValue);
    } else {
      result += stringify.value(values[i], type, designSet, structuredValue);
    }
    if (i !== len - 1) {
      result += delim;
    }
  }
  return result;
};
stringify.value = function(value, type, designSet, structuredValue) {
  if (type in designSet.value && "toICAL" in designSet.value[type]) {
    return designSet.value[type].toICAL(value, structuredValue);
  }
  return value;
};
stringify._rfc6868Unescape = function(val) {
  return val.replace(/[\n^"]/g, function(x) {
    return RFC6868_REPLACE_MAP[x];
  });
};
var NAME_INDEX$1 = 0;
var PROP_INDEX = 1;
var TYPE_INDEX = 2;
var VALUE_INDEX = 3;
var Property = class _Property {
  /**
   * Create an {@link ICAL.Property} by parsing the passed iCalendar string.
   *
   * @param {String} str            The iCalendar string to parse
   * @param {designSet=} designSet  The design data to use for this property
   * @return {Property}             The created iCalendar property
   */
  static fromString(str, designSet) {
    return new _Property(parse.property(str, designSet));
  }
  /**
   * Creates a new ICAL.Property instance.
   *
   * It is important to note that mutations done in the wrapper directly mutate the jCal object used
   * to initialize.
   *
   * Can also be used to create new properties by passing the name of the property (as a String).
   *
   * @param {Array|String} jCal         Raw jCal representation OR the new name of the property
   * @param {Component=} parent         Parent component
   */
  constructor(jCal, parent) {
    this._parent = parent || null;
    if (typeof jCal === "string") {
      this.jCal = [jCal, {}, design.defaultType];
      this.jCal[TYPE_INDEX] = this.getDefaultType();
    } else {
      this.jCal = jCal;
    }
    this._updateType();
  }
  /**
   * The value type for this property
   * @type {String}
   */
  get type() {
    return this.jCal[TYPE_INDEX];
  }
  /**
   * The name of this property, in lowercase.
   * @type {String}
   */
  get name() {
    return this.jCal[NAME_INDEX$1];
  }
  /**
   * The parent component for this property.
   * @type {Component}
   */
  get parent() {
    return this._parent;
  }
  set parent(p) {
    let designSetChanged = !this._parent || p && p._designSet != this._parent._designSet;
    this._parent = p;
    if (this.type == design.defaultType && designSetChanged) {
      this.jCal[TYPE_INDEX] = this.getDefaultType();
      this._updateType();
    }
  }
  /**
   * The design set for this property, e.g. icalendar vs vcard
   *
   * @type {designSet}
   * @private
   */
  get _designSet() {
    return this.parent ? this.parent._designSet : design.defaultSet;
  }
  /**
   * Updates the type metadata from the current jCal type and design set.
   *
   * @private
   */
  _updateType() {
    let designSet = this._designSet;
    if (this.type in designSet.value) {
      if ("decorate" in designSet.value[this.type]) {
        this.isDecorated = true;
      } else {
        this.isDecorated = false;
      }
      if (this.name in designSet.property) {
        this.isMultiValue = "multiValue" in designSet.property[this.name];
        this.isStructuredValue = "structuredValue" in designSet.property[this.name];
      }
    }
  }
  /**
   * Hydrate a single value. The act of hydrating means turning the raw jCal
   * value into a potentially wrapped object, for example {@link ICAL.Time}.
   *
   * @private
   * @param {Number} index        The index of the value to hydrate
   * @return {?Object}             The decorated value.
   */
  _hydrateValue(index3) {
    if (this._values && this._values[index3]) {
      return this._values[index3];
    }
    if (this.jCal.length <= VALUE_INDEX + index3) {
      return null;
    }
    if (this.isDecorated) {
      if (!this._values) {
        this._values = [];
      }
      return this._values[index3] = this._decorate(
        this.jCal[VALUE_INDEX + index3]
      );
    } else {
      return this.jCal[VALUE_INDEX + index3];
    }
  }
  /**
   * Decorate a single value, returning its wrapped object. This is used by
   * the hydrate function to actually wrap the value.
   *
   * @private
   * @param {?} value         The value to decorate
   * @return {Object}         The decorated value
   */
  _decorate(value) {
    return this._designSet.value[this.type].decorate(value, this);
  }
  /**
   * Undecorate a single value, returning its raw jCal data.
   *
   * @private
   * @param {Object} value         The value to undecorate
   * @return {?}                   The undecorated value
   */
  _undecorate(value) {
    return this._designSet.value[this.type].undecorate(value, this);
  }
  /**
   * Sets the value at the given index while also hydrating it. The passed
   * value can either be a decorated or undecorated value.
   *
   * @private
   * @param {?} value             The value to set
   * @param {Number} index        The index to set it at
   */
  _setDecoratedValue(value, index3) {
    if (!this._values) {
      this._values = [];
    }
    if (typeof value === "object" && "icaltype" in value) {
      this.jCal[VALUE_INDEX + index3] = this._undecorate(value);
      this._values[index3] = value;
    } else {
      this.jCal[VALUE_INDEX + index3] = value;
      this._values[index3] = this._decorate(value);
    }
  }
  /**
   * Gets a parameter on the property.
   *
   * @param {String}        name   Parameter name (lowercase)
   * @return {Array|String}        Parameter value
   */
  getParameter(name) {
    if (name in this.jCal[PROP_INDEX]) {
      return this.jCal[PROP_INDEX][name];
    } else {
      return void 0;
    }
  }
  /**
   * Gets first parameter on the property.
   *
   * @param {String}        name   Parameter name (lowercase)
   * @return {String}        Parameter value
   */
  getFirstParameter(name) {
    let parameters = this.getParameter(name);
    if (Array.isArray(parameters)) {
      return parameters[0];
    }
    return parameters;
  }
  /**
   * Sets a parameter on the property.
   *
   * @param {String}       name     The parameter name
   * @param {Array|String} value    The parameter value
   */
  setParameter(name, value) {
    let lcname = name.toLowerCase();
    if (typeof value === "string" && lcname in this._designSet.param && "multiValue" in this._designSet.param[lcname]) {
      value = [value];
    }
    this.jCal[PROP_INDEX][name] = value;
  }
  /**
   * Removes a parameter
   *
   * @param {String} name     The parameter name
   */
  removeParameter(name) {
    delete this.jCal[PROP_INDEX][name];
  }
  /**
   * Get the default type based on this property's name.
   *
   * @return {String}     The default type for this property
   */
  getDefaultType() {
    let name = this.jCal[NAME_INDEX$1];
    let designSet = this._designSet;
    if (name in designSet.property) {
      let details = designSet.property[name];
      if ("defaultType" in details) {
        return details.defaultType;
      }
    }
    return design.defaultType;
  }
  /**
   * Sets type of property and clears out any existing values of the current
   * type.
   *
   * @param {String} type     New iCAL type (see design.*.values)
   */
  resetType(type) {
    this.removeAllValues();
    this.jCal[TYPE_INDEX] = type;
    this._updateType();
  }
  /**
   * Finds the first property value.
   *
   * @return {Binary | Duration | Period |
   * Recur | Time | UtcOffset | Geo | string | null}         First property value
   */
  getFirstValue() {
    return this._hydrateValue(0);
  }
  /**
   * Gets all values on the property.
   *
   * NOTE: this creates an array during each call.
   *
   * @return {Array}          List of values
   */
  getValues() {
    let len = this.jCal.length - VALUE_INDEX;
    if (len < 1) {
      return [];
    }
    let i = 0;
    let result = [];
    for (; i < len; i++) {
      result[i] = this._hydrateValue(i);
    }
    return result;
  }
  /**
   * Removes all values from this property
   */
  removeAllValues() {
    if (this._values) {
      this._values.length = 0;
    }
    this.jCal.length = 3;
  }
  /**
   * Sets the values of the property.  Will overwrite the existing values.
   * This can only be used for multi-value properties.
   *
   * @param {Array} values    An array of values
   */
  setValues(values) {
    if (!this.isMultiValue) {
      throw new Error(
        this.name + ": does not not support mulitValue.\noverride isMultiValue"
      );
    }
    let len = values.length;
    let i = 0;
    this.removeAllValues();
    if (len > 0 && typeof values[0] === "object" && "icaltype" in values[0]) {
      this.resetType(values[0].icaltype);
    }
    if (this.isDecorated) {
      for (; i < len; i++) {
        this._setDecoratedValue(values[i], i);
      }
    } else {
      for (; i < len; i++) {
        this.jCal[VALUE_INDEX + i] = values[i];
      }
    }
  }
  /**
   * Sets the current value of the property. If this is a multi-value
   * property, all other values will be removed.
   *
   * @param {String|Object} value     New property value.
   */
  setValue(value) {
    this.removeAllValues();
    if (typeof value === "object" && "icaltype" in value) {
      this.resetType(value.icaltype);
    }
    if (this.isDecorated) {
      this._setDecoratedValue(value, 0);
    } else {
      this.jCal[VALUE_INDEX] = value;
    }
  }
  /**
   * Returns the Object representation of this component. The returned object
   * is a live jCal object and should be cloned if modified.
   * @return {Object}
   */
  toJSON() {
    return this.jCal;
  }
  /**
   * The string representation of this component.
   * @return {String}
   */
  toICALString() {
    return stringify.property(
      this.jCal,
      this._designSet,
      true
    );
  }
};
var NAME_INDEX = 0;
var PROPERTY_INDEX = 1;
var COMPONENT_INDEX = 2;
var PROPERTY_NAME_INDEX = 0;
var PROPERTY_VALUE_INDEX = 3;
var Component = class _Component {
  /**
   * Create an {@link ICAL.Component} by parsing the passed iCalendar string.
   *
   * @param {String} str        The iCalendar string to parse
   */
  static fromString(str) {
    return new _Component(parse.component(str));
  }
  /**
   * Creates a new Component instance.
   *
   * @param {Array|String} jCal         Raw jCal component data OR name of new
   *                                      component
   * @param {Component=} parent     Parent component to associate
   */
  constructor(jCal, parent) {
    if (typeof jCal === "string") {
      jCal = [jCal, [], []];
    }
    this.jCal = jCal;
    this.parent = parent || null;
    if (!this.parent && this.name === "vcalendar") {
      this._timezoneCache = /* @__PURE__ */ new Map();
    }
  }
  /**
   * Hydrated properties are inserted into the _properties array at the same
   * position as in the jCal array, so it is possible that the array contains
   * undefined values for unhydrdated properties. To avoid iterating the
   * array when checking if all properties have been hydrated, we save the
   * count here.
   *
   * @type {Number}
   * @private
   */
  _hydratedPropertyCount = 0;
  /**
   * The same count as for _hydratedPropertyCount, but for subcomponents
   *
   * @type {Number}
   * @private
   */
  _hydratedComponentCount = 0;
  /**
   * A cache of hydrated time zone objects which may be used by consumers, keyed
   * by time zone ID.
   *
   * @type {Map}
   * @private
   */
  _timezoneCache = null;
  /**
   * @private
   */
  _components = null;
  /**
   * @private
   */
  _properties = null;
  /**
   * The name of this component
   *
   * @type {String}
   */
  get name() {
    return this.jCal[NAME_INDEX];
  }
  /**
   * The design set for this component, e.g. icalendar vs vcard
   *
   * @type {designSet}
   * @private
   */
  get _designSet() {
    let parentDesign = this.parent && this.parent._designSet;
    if (!parentDesign && this.name == "vcard") {
      let versionProp = this.jCal[PROPERTY_INDEX]?.[0];
      if (versionProp && versionProp[PROPERTY_NAME_INDEX] == "version" && versionProp[PROPERTY_VALUE_INDEX] == "3.0") {
        return design.getDesignSet("vcard3");
      }
    }
    return parentDesign || design.getDesignSet(this.name);
  }
  /**
   * @private
   */
  _hydrateComponent(index3) {
    if (!this._components) {
      this._components = [];
      this._hydratedComponentCount = 0;
    }
    if (this._components[index3]) {
      return this._components[index3];
    }
    let comp = new _Component(
      this.jCal[COMPONENT_INDEX][index3],
      this
    );
    this._hydratedComponentCount++;
    return this._components[index3] = comp;
  }
  /**
   * @private
   */
  _hydrateProperty(index3) {
    if (!this._properties) {
      this._properties = [];
      this._hydratedPropertyCount = 0;
    }
    if (this._properties[index3]) {
      return this._properties[index3];
    }
    let prop = new Property(
      this.jCal[PROPERTY_INDEX][index3],
      this
    );
    this._hydratedPropertyCount++;
    return this._properties[index3] = prop;
  }
  /**
   * Finds first sub component, optionally filtered by name.
   *
   * @param {String=} name        Optional name to filter by
   * @return {?Component}     The found subcomponent
   */
  getFirstSubcomponent(name) {
    if (name) {
      let i = 0;
      let comps = this.jCal[COMPONENT_INDEX];
      let len = comps.length;
      for (; i < len; i++) {
        if (comps[i][NAME_INDEX] === name) {
          let result = this._hydrateComponent(i);
          return result;
        }
      }
    } else {
      if (this.jCal[COMPONENT_INDEX].length) {
        return this._hydrateComponent(0);
      }
    }
    return null;
  }
  /**
   * Finds all sub components, optionally filtering by name.
   *
   * @param {String=} name            Optional name to filter by
   * @return {Component[]}       The found sub components
   */
  getAllSubcomponents(name) {
    let jCalLen = this.jCal[COMPONENT_INDEX].length;
    let i = 0;
    if (name) {
      let comps = this.jCal[COMPONENT_INDEX];
      let result = [];
      for (; i < jCalLen; i++) {
        if (name === comps[i][NAME_INDEX]) {
          result.push(
            this._hydrateComponent(i)
          );
        }
      }
      return result;
    } else {
      if (!this._components || this._hydratedComponentCount !== jCalLen) {
        for (; i < jCalLen; i++) {
          this._hydrateComponent(i);
        }
      }
      return this._components || [];
    }
  }
  /**
   * Returns true when a named property exists.
   *
   * @param {String} name     The property name
   * @return {Boolean}        True, when property is found
   */
  hasProperty(name) {
    let props = this.jCal[PROPERTY_INDEX];
    let len = props.length;
    let i = 0;
    for (; i < len; i++) {
      if (props[i][NAME_INDEX] === name) {
        return true;
      }
    }
    return false;
  }
  /**
   * Finds the first property, optionally with the given name.
   *
   * @param {String=} name        Lowercase property name
   * @return {?Property}     The found property
   */
  getFirstProperty(name) {
    if (name) {
      let i = 0;
      let props = this.jCal[PROPERTY_INDEX];
      let len = props.length;
      for (; i < len; i++) {
        if (props[i][NAME_INDEX] === name) {
          let result = this._hydrateProperty(i);
          return result;
        }
      }
    } else {
      if (this.jCal[PROPERTY_INDEX].length) {
        return this._hydrateProperty(0);
      }
    }
    return null;
  }
  /**
   * Returns first property's value, if available.
   *
   * @param {String=} name                    Lowercase property name
   * @return {Binary | Duration | Period |
   * Recur | Time | UtcOffset | Geo | string | null}         The found property value.
   */
  getFirstPropertyValue(name) {
    let prop = this.getFirstProperty(name);
    if (prop) {
      return prop.getFirstValue();
    }
    return null;
  }
  /**
   * Get all properties in the component, optionally filtered by name.
   *
   * @param {String=} name        Lowercase property name
   * @return {Property[]}    List of properties
   */
  getAllProperties(name) {
    let jCalLen = this.jCal[PROPERTY_INDEX].length;
    let i = 0;
    if (name) {
      let props = this.jCal[PROPERTY_INDEX];
      let result = [];
      for (; i < jCalLen; i++) {
        if (name === props[i][NAME_INDEX]) {
          result.push(
            this._hydrateProperty(i)
          );
        }
      }
      return result;
    } else {
      if (!this._properties || this._hydratedPropertyCount !== jCalLen) {
        for (; i < jCalLen; i++) {
          this._hydrateProperty(i);
        }
      }
      return this._properties || [];
    }
  }
  /**
   * @private
   */
  _removeObjectByIndex(jCalIndex, cache, index3) {
    cache = cache || [];
    if (cache[index3]) {
      let obj = cache[index3];
      if ("parent" in obj) {
        obj.parent = null;
      }
    }
    cache.splice(index3, 1);
    this.jCal[jCalIndex].splice(index3, 1);
  }
  /**
   * @private
   */
  _removeObject(jCalIndex, cache, nameOrObject) {
    let i = 0;
    let objects = this.jCal[jCalIndex];
    let len = objects.length;
    let cached = this[cache];
    if (typeof nameOrObject === "string") {
      for (; i < len; i++) {
        if (objects[i][NAME_INDEX] === nameOrObject) {
          this._removeObjectByIndex(jCalIndex, cached, i);
          return true;
        }
      }
    } else if (cached) {
      for (; i < len; i++) {
        if (cached[i] && cached[i] === nameOrObject) {
          this._removeObjectByIndex(jCalIndex, cached, i);
          return true;
        }
      }
    }
    return false;
  }
  /**
   * @private
   */
  _removeAllObjects(jCalIndex, cache, name) {
    let cached = this[cache];
    let objects = this.jCal[jCalIndex];
    let i = objects.length - 1;
    for (; i >= 0; i--) {
      if (!name || objects[i][NAME_INDEX] === name) {
        this._removeObjectByIndex(jCalIndex, cached, i);
      }
    }
  }
  /**
   * Adds a single sub component.
   *
   * @param {Component} component        The component to add
   * @return {Component}                 The passed in component
   */
  addSubcomponent(component) {
    if (!this._components) {
      this._components = [];
      this._hydratedComponentCount = 0;
    }
    if (component.parent) {
      component.parent.removeSubcomponent(component);
    }
    let idx = this.jCal[COMPONENT_INDEX].push(component.jCal);
    this._components[idx - 1] = component;
    this._hydratedComponentCount++;
    component.parent = this;
    return component;
  }
  /**
   * Removes a single component by name or the instance of a specific
   * component.
   *
   * @param {Component|String} nameOrComp    Name of component, or component
   * @return {Boolean}                            True when comp is removed
   */
  removeSubcomponent(nameOrComp) {
    let removed = this._removeObject(COMPONENT_INDEX, "_components", nameOrComp);
    if (removed) {
      this._hydratedComponentCount--;
    }
    return removed;
  }
  /**
   * Removes all components or (if given) all components by a particular
   * name.
   *
   * @param {String=} name            Lowercase component name
   */
  removeAllSubcomponents(name) {
    let removed = this._removeAllObjects(COMPONENT_INDEX, "_components", name);
    this._hydratedComponentCount = 0;
    return removed;
  }
  /**
   * Adds an {@link ICAL.Property} to the component.
   *
   * @param {Property} property      The property to add
   * @return {Property}              The passed in property
   */
  addProperty(property) {
    if (!(property instanceof Property)) {
      throw new TypeError("must be instance of ICAL.Property");
    }
    if (!this._properties) {
      this._properties = [];
      this._hydratedPropertyCount = 0;
    }
    if (property.parent) {
      property.parent.removeProperty(property);
    }
    let idx = this.jCal[PROPERTY_INDEX].push(property.jCal);
    this._properties[idx - 1] = property;
    this._hydratedPropertyCount++;
    property.parent = this;
    return property;
  }
  /**
   * Helper method to add a property with a value to the component.
   *
   * @param {String}               name         Property name to add
   * @param {String|Number|Object} value        Property value
   * @return {Property}                    The created property
   */
  addPropertyWithValue(name, value) {
    let prop = new Property(name);
    prop.setValue(value);
    this.addProperty(prop);
    return prop;
  }
  /**
   * Helper method that will update or create a property of the given name
   * and sets its value. If multiple properties with the given name exist,
   * only the first is updated.
   *
   * @param {String}               name         Property name to update
   * @param {String|Number|Object} value        Property value
   * @return {Property}                    The created property
   */
  updatePropertyWithValue(name, value) {
    let prop = this.getFirstProperty(name);
    if (prop) {
      prop.setValue(value);
    } else {
      prop = this.addPropertyWithValue(name, value);
    }
    return prop;
  }
  /**
   * Removes a single property by name or the instance of the specific
   * property.
   *
   * @param {String|Property} nameOrProp     Property name or instance to remove
   * @return {Boolean}                            True, when deleted
   */
  removeProperty(nameOrProp) {
    let removed = this._removeObject(PROPERTY_INDEX, "_properties", nameOrProp);
    if (removed) {
      this._hydratedPropertyCount--;
    }
    return removed;
  }
  /**
   * Removes all properties associated with this component, optionally
   * filtered by name.
   *
   * @param {String=} name        Lowercase property name
   * @return {Boolean}            True, when deleted
   */
  removeAllProperties(name) {
    let removed = this._removeAllObjects(PROPERTY_INDEX, "_properties", name);
    this._hydratedPropertyCount = 0;
    return removed;
  }
  /**
   * Returns the Object representation of this component. The returned object
   * is a live jCal object and should be cloned if modified.
   * @return {Object}
   */
  toJSON() {
    return this.jCal;
  }
  /**
   * The string representation of this component.
   * @return {String}
   */
  toString() {
    return stringify.component(
      this.jCal,
      this._designSet
    );
  }
  /**
   * Retrieve a time zone definition from the component tree, if any is present.
   * If the tree contains no time zone definitions or the TZID cannot be
   * matched, returns null.
   *
   * @param {String} tzid     The ID of the time zone to retrieve
   * @return {Timezone}  The time zone corresponding to the ID, or null
   */
  getTimeZoneByID(tzid) {
    if (this.parent) {
      return this.parent.getTimeZoneByID(tzid);
    }
    if (!this._timezoneCache) {
      return null;
    }
    if (this._timezoneCache.has(tzid)) {
      return this._timezoneCache.get(tzid);
    }
    const zones2 = this.getAllSubcomponents("vtimezone");
    for (const zone of zones2) {
      if (zone.getFirstProperty("tzid").getFirstValue() === tzid) {
        const hydratedZone = new Timezone({
          component: zone,
          tzid
        });
        this._timezoneCache.set(tzid, hydratedZone);
        return hydratedZone;
      }
    }
    return null;
  }
};
var RecurExpansion = class {
  /**
   * Creates a new ICAL.RecurExpansion instance.
   *
   * The options object can be filled with the specified initial values. It can also contain
   * additional members, as a result of serializing a previous expansion state, as shown in the
   * example.
   *
   * @param {Object} options
   *        Recurrence expansion options
   * @param {Time} options.dtstart
   *        Start time of the event
   * @param {Component=} options.component
   *        Component for expansion, required if not resuming.
   */
  constructor(options) {
    this.ruleDates = [];
    this.exDates = [];
    this.fromData(options);
  }
  /**
   * True when iteration is fully completed.
   * @type {Boolean}
   */
  complete = false;
  /**
   * Array of rrule iterators.
   *
   * @type {RecurIterator[]}
   * @private
   */
  ruleIterators = null;
  /**
   * Array of rdate instances.
   *
   * @type {Time[]}
   * @private
   */
  ruleDates = null;
  /**
   * Array of exdate instances.
   *
   * @type {Time[]}
   * @private
   */
  exDates = null;
  /**
   * Current position in ruleDates array.
   * @type {Number}
   * @private
   */
  ruleDateInc = 0;
  /**
   * Current position in exDates array
   * @type {Number}
   * @private
   */
  exDateInc = 0;
  /**
   * Current negative date.
   *
   * @type {Time}
   * @private
   */
  exDate = null;
  /**
   * Current additional date.
   *
   * @type {Time}
   * @private
   */
  ruleDate = null;
  /**
   * Start date of recurring rules.
   *
   * @type {Time}
   */
  dtstart = null;
  /**
   * Last expanded time
   *
   * @type {Time}
   */
  last = null;
  /**
   * Initialize the recurrence expansion from the data object. The options
   * object may also contain additional members, see the
   * {@link ICAL.RecurExpansion constructor} for more details.
   *
   * @param {Object} options
   *        Recurrence expansion options
   * @param {Time} options.dtstart
   *        Start time of the event
   * @param {Component=} options.component
   *        Component for expansion, required if not resuming.
   */
  fromData(options) {
    let start = formatClassType(options.dtstart, Time2);
    if (!start) {
      throw new Error(".dtstart (ICAL.Time) must be given");
    } else {
      this.dtstart = start;
    }
    if (options.component) {
      this._init(options.component);
    } else {
      this.last = formatClassType(options.last, Time2) || start.clone();
      if (!options.ruleIterators) {
        throw new Error(".ruleIterators or .component must be given");
      }
      this.ruleIterators = options.ruleIterators.map(function(item) {
        return formatClassType(item, RecurIterator);
      });
      this.ruleDateInc = options.ruleDateInc;
      this.exDateInc = options.exDateInc;
      if (options.ruleDates) {
        this.ruleDates = options.ruleDates.map((item) => formatClassType(item, Time2));
        this.ruleDate = this.ruleDates[this.ruleDateInc];
      }
      if (options.exDates) {
        this.exDates = options.exDates.map((item) => formatClassType(item, Time2));
        this.exDate = this.exDates[this.exDateInc];
      }
      if (typeof options.complete !== "undefined") {
        this.complete = options.complete;
      }
    }
  }
  /**
   * Compare two ICAL.Time objects.  When the second parameter is a DATE and the first parameter is
   * DATE-TIME, strip the time and compare only the days.
   *
   * @private
   * @param {Time} a   The one object to compare
   * @param {Time} b   The other object to compare
   */
  _compare_special(a, b) {
    if (!a.isDate && b.isDate)
      return new Time2({ year: a.year, month: a.month, day: a.day }).compare(b);
    return a.compare(b);
  }
  /**
   * Retrieve the next occurrence in the series.
   * @return {Time}
   */
  next() {
    let iter2;
    let next;
    let compare;
    let maxTries = 500;
    let currentTry = 0;
    while (true) {
      if (currentTry++ > maxTries) {
        throw new Error(
          "max tries have occurred, rule may be impossible to fulfill."
        );
      }
      next = this.ruleDate;
      iter2 = this._nextRecurrenceIter(this.last);
      if (!next && !iter2) {
        this.complete = true;
        break;
      }
      if (!next || iter2 && next.compare(iter2.last) > 0) {
        next = iter2.last.clone();
        iter2.next();
      }
      if (this.ruleDate === next) {
        this._nextRuleDay();
      }
      this.last = next;
      if (this.exDate) {
        compare = this._compare_special(this.last, this.exDate);
        if (compare > 0) {
          this._nextExDay();
        }
        if (compare === 0) {
          this._nextExDay();
          continue;
        }
      }
      return this.last;
    }
  }
  /**
   * Converts object into a serialize-able format. This format can be passed
   * back into the expansion to resume iteration.
   * @return {Object}
   */
  toJSON() {
    function toJSON(item) {
      return item.toJSON();
    }
    let result = /* @__PURE__ */ Object.create(null);
    result.ruleIterators = this.ruleIterators.map(toJSON);
    if (this.ruleDates) {
      result.ruleDates = this.ruleDates.map(toJSON);
    }
    if (this.exDates) {
      result.exDates = this.exDates.map(toJSON);
    }
    result.ruleDateInc = this.ruleDateInc;
    result.exDateInc = this.exDateInc;
    result.last = this.last.toJSON();
    result.dtstart = this.dtstart.toJSON();
    result.complete = this.complete;
    return result;
  }
  /**
   * Extract all dates from the properties in the given component. The
   * properties will be filtered by the property name.
   *
   * @private
   * @param {Component} component             The component to search in
   * @param {String} propertyName             The property name to search for
   * @return {Time[]}                         The extracted dates.
   */
  _extractDates(component, propertyName) {
    let result = [];
    let props = component.getAllProperties(propertyName);
    for (let i = 0, len = props.length; i < len; i++) {
      for (let prop of props[i].getValues()) {
        let idx = binsearchInsert(
          result,
          prop,
          (a, b) => a.compare(b)
        );
        result.splice(idx, 0, prop);
      }
    }
    return result;
  }
  /**
   * Initialize the recurrence expansion.
   *
   * @private
   * @param {Component} component    The component to initialize from.
   */
  _init(component) {
    this.ruleIterators = [];
    this.last = this.dtstart.clone();
    if (!component.hasProperty("rdate") && !component.hasProperty("rrule") && !component.hasProperty("recurrence-id")) {
      this.ruleDate = this.last.clone();
      this.complete = true;
      return;
    }
    if (component.hasProperty("rdate")) {
      this.ruleDates = this._extractDates(component, "rdate");
      if (this.ruleDates[0] && this.ruleDates[0].compare(this.dtstart) < 0) {
        this.ruleDateInc = 0;
        this.last = this.ruleDates[0].clone();
      } else {
        this.ruleDateInc = binsearchInsert(
          this.ruleDates,
          this.last,
          (a, b) => a.compare(b)
        );
      }
      this.ruleDate = this.ruleDates[this.ruleDateInc];
    }
    if (component.hasProperty("rrule")) {
      let rules = component.getAllProperties("rrule");
      let i = 0;
      let len = rules.length;
      let rule;
      let iter2;
      for (; i < len; i++) {
        rule = rules[i].getFirstValue();
        iter2 = rule.iterator(this.dtstart);
        this.ruleIterators.push(iter2);
        iter2.next();
      }
    }
    if (component.hasProperty("exdate")) {
      this.exDates = this._extractDates(component, "exdate");
      this.exDateInc = binsearchInsert(
        this.exDates,
        this.last,
        this._compare_special
      );
      this.exDate = this.exDates[this.exDateInc];
    }
  }
  /**
   * Advance to the next exdate
   * @private
   */
  _nextExDay() {
    this.exDate = this.exDates[++this.exDateInc];
  }
  /**
   * Advance to the next rule date
   * @private
   */
  _nextRuleDay() {
    this.ruleDate = this.ruleDates[++this.ruleDateInc];
  }
  /**
   * Find and return the recurrence rule with the most recent event and
   * return it.
   *
   * @private
   * @return {?RecurIterator}    Found iterator.
   */
  _nextRecurrenceIter() {
    let iters = this.ruleIterators;
    if (iters.length === 0) {
      return null;
    }
    let len = iters.length;
    let iter2;
    let iterTime;
    let iterIdx = 0;
    let chosenIter;
    for (; iterIdx < len; iterIdx++) {
      iter2 = iters[iterIdx];
      iterTime = iter2.last;
      if (iter2.completed) {
        len--;
        if (iterIdx !== 0) {
          iterIdx--;
        }
        iters.splice(iterIdx, 1);
        continue;
      }
      if (!chosenIter || chosenIter.last.compare(iterTime) > 0) {
        chosenIter = iter2;
      }
    }
    return chosenIter;
  }
};
var Event = class _Event {
  /**
   * Creates a new ICAL.Event instance.
   *
   * @param {Component=} component              The ICAL.Component to base this event on
   * @param {Object} [options]                  Options for this event
   * @param {Boolean=} options.strictExceptions  When true, will verify exceptions are related by
   *                                              their UUID
   * @param {Array<Component|Event>=} options.exceptions
   *          Exceptions to this event, either as components or events. If not
   *            specified exceptions will automatically be set in relation of
   *            component's parent
   */
  constructor(component, options) {
    if (!(component instanceof Component)) {
      options = component;
      component = null;
    }
    if (component) {
      this.component = component;
    } else {
      this.component = new Component("vevent");
    }
    this._rangeExceptionCache = /* @__PURE__ */ Object.create(null);
    this.exceptions = /* @__PURE__ */ Object.create(null);
    this.rangeExceptions = [];
    if (options && options.strictExceptions) {
      this.strictExceptions = options.strictExceptions;
    }
    if (options && options.exceptions) {
      options.exceptions.forEach(this.relateException, this);
    } else if (this.component.parent && !this.isRecurrenceException()) {
      this.component.parent.getAllSubcomponents("vevent").forEach(function(event) {
        if (event.hasProperty("recurrence-id")) {
          this.relateException(event);
        }
      }, this);
    }
  }
  static THISANDFUTURE = "THISANDFUTURE";
  /**
   * List of related event exceptions.
   *
   * @type {Event[]}
   */
  exceptions = null;
  /**
   * When true, will verify exceptions are related by their UUID.
   *
   * @type {Boolean}
   */
  strictExceptions = false;
  /**
   * Relates a given event exception to this object.  If the given component
   * does not share the UID of this event it cannot be related and will throw
   * an exception.
   *
   * If this component is an exception it cannot have other exceptions
   * related to it.
   *
   * @param {Component|Event} obj       Component or event
   */
  relateException(obj) {
    if (this.isRecurrenceException()) {
      throw new Error("cannot relate exception to exceptions");
    }
    if (obj instanceof Component) {
      obj = new _Event(obj);
    }
    if (this.strictExceptions && obj.uid !== this.uid) {
      throw new Error("attempted to relate unrelated exception");
    }
    let id = obj.recurrenceId.toString();
    this.exceptions[id] = obj;
    if (obj.modifiesFuture()) {
      let item = [
        obj.recurrenceId.toUnixTime(),
        id
      ];
      let idx = binsearchInsert(
        this.rangeExceptions,
        item,
        compareRangeException
      );
      this.rangeExceptions.splice(idx, 0, item);
    }
  }
  /**
   * Checks if this record is an exception and has the RANGE=THISANDFUTURE
   * value.
   *
   * @return {Boolean}        True, when exception is within range
   */
  modifiesFuture() {
    if (!this.component.hasProperty("recurrence-id")) {
      return false;
    }
    let range2 = this.component.getFirstProperty("recurrence-id").getParameter("range");
    return range2 === _Event.THISANDFUTURE;
  }
  /**
   * Finds the range exception nearest to the given date.
   *
   * @param {Time} time   usually an occurrence time of an event
   * @return {?Event}     the related event/exception or null
   */
  findRangeException(time) {
    if (!this.rangeExceptions.length) {
      return null;
    }
    let utc = time.toUnixTime();
    let idx = binsearchInsert(
      this.rangeExceptions,
      [utc],
      compareRangeException
    );
    idx -= 1;
    if (idx < 0) {
      return null;
    }
    let rangeItem = this.rangeExceptions[idx];
    if (utc < rangeItem[0]) {
      return null;
    }
    return rangeItem[1];
  }
  /**
   * Returns the occurrence details based on its start time.  If the
   * occurrence has an exception will return the details for that exception.
   *
   * NOTE: this method is intend to be used in conjunction
   *       with the {@link ICAL.Event#iterator iterator} method.
   *
   * @param {Time} occurrence               time occurrence
   * @return {occurrenceDetails}            Information about the occurrence
   */
  getOccurrenceDetails(occurrence) {
    let id = occurrence.toString();
    let utcId = occurrence.convertToZone(Timezone.utcTimezone).toString();
    let item;
    let result = {
      //XXX: Clone?
      recurrenceId: occurrence
    };
    if (id in this.exceptions) {
      item = result.item = this.exceptions[id];
      result.startDate = item.startDate;
      result.endDate = item.endDate;
      result.item = item;
    } else if (utcId in this.exceptions) {
      item = this.exceptions[utcId];
      result.startDate = item.startDate;
      result.endDate = item.endDate;
      result.item = item;
    } else {
      let rangeExceptionId = this.findRangeException(
        occurrence
      );
      let end;
      if (rangeExceptionId) {
        let exception = this.exceptions[rangeExceptionId];
        result.item = exception;
        let startDiff = this._rangeExceptionCache[rangeExceptionId];
        if (!startDiff) {
          let original = exception.recurrenceId.clone();
          let newStart = exception.startDate.clone();
          original.zone = newStart.zone;
          startDiff = newStart.subtractDate(original);
          this._rangeExceptionCache[rangeExceptionId] = startDiff;
        }
        let start = occurrence.clone();
        start.zone = exception.startDate.zone;
        start.addDuration(startDiff);
        end = start.clone();
        end.addDuration(exception.duration);
        result.startDate = start;
        result.endDate = end;
      } else {
        end = occurrence.clone();
        end.addDuration(this.duration);
        result.endDate = end;
        result.startDate = occurrence;
        result.item = this;
      }
    }
    return result;
  }
  /**
   * Builds a recur expansion instance for a specific point in time (defaults
   * to startDate).
   *
   * @param {Time=} startTime     Starting point for expansion
   * @return {RecurExpansion}    Expansion object
   */
  iterator(startTime) {
    return new RecurExpansion({
      component: this.component,
      dtstart: startTime || this.startDate
    });
  }
  /**
   * Checks if the event is recurring
   *
   * @return {Boolean}        True, if event is recurring
   */
  isRecurring() {
    let comp = this.component;
    return comp.hasProperty("rrule") || comp.hasProperty("rdate");
  }
  /**
   * Checks if the event describes a recurrence exception. See
   * {@tutorial terminology} for details.
   *
   * @return {Boolean}    True, if the event describes a recurrence exception
   */
  isRecurrenceException() {
    return this.component.hasProperty("recurrence-id");
  }
  /**
   * Returns the types of recurrences this event may have.
   *
   * Returned as an object with the following possible keys:
   *
   *    - YEARLY
   *    - MONTHLY
   *    - WEEKLY
   *    - DAILY
   *    - MINUTELY
   *    - SECONDLY
   *
   * @return {Object.<frequencyValues, Boolean>}
   *          Object of recurrence flags
   */
  getRecurrenceTypes() {
    let rules = this.component.getAllProperties("rrule");
    let i = 0;
    let len = rules.length;
    let result = /* @__PURE__ */ Object.create(null);
    for (; i < len; i++) {
      let value = rules[i].getFirstValue();
      result[value.freq] = true;
    }
    return result;
  }
  /**
   * The uid of this event
   * @type {String}
   */
  get uid() {
    return this._firstProp("uid");
  }
  set uid(value) {
    this._setProp("uid", value);
  }
  /**
   * The start date
   * @type {Time}
   */
  get startDate() {
    return this._firstProp("dtstart");
  }
  set startDate(value) {
    this._setTime("dtstart", value);
  }
  /**
   * The end date. This can be the result directly from the property, or the
   * end date calculated from start date and duration. Setting the property
   * will remove any duration properties.
   * @type {Time}
   */
  get endDate() {
    let endDate = this._firstProp("dtend");
    if (!endDate) {
      let duration = this._firstProp("duration");
      endDate = this.startDate.clone();
      if (duration) {
        endDate.addDuration(duration);
      } else if (endDate.isDate) {
        endDate.day += 1;
      }
    }
    return endDate;
  }
  set endDate(value) {
    if (this.component.hasProperty("duration")) {
      this.component.removeProperty("duration");
    }
    this._setTime("dtend", value);
  }
  /**
   * The duration. This can be the result directly from the property, or the
   * duration calculated from start date and end date. Setting the property
   * will remove any `dtend` properties.
   * @type {Duration}
   */
  get duration() {
    let duration = this._firstProp("duration");
    if (!duration) {
      return this.endDate.subtractDateTz(this.startDate);
    }
    return duration;
  }
  set duration(value) {
    if (this.component.hasProperty("dtend")) {
      this.component.removeProperty("dtend");
    }
    this._setProp("duration", value);
  }
  /**
   * The location of the event.
   * @type {String}
   */
  get location() {
    return this._firstProp("location");
  }
  set location(value) {
    this._setProp("location", value);
  }
  /**
   * The attendees in the event
   * @type {Property[]}
   */
  get attendees() {
    return this.component.getAllProperties("attendee");
  }
  /**
   * The event summary
   * @type {String}
   */
  get summary() {
    return this._firstProp("summary");
  }
  set summary(value) {
    this._setProp("summary", value);
  }
  /**
   * The event description.
   * @type {String}
   */
  get description() {
    return this._firstProp("description");
  }
  set description(value) {
    this._setProp("description", value);
  }
  /**
   * The event color from [rfc7986](https://datatracker.ietf.org/doc/html/rfc7986)
   * @type {String}
   */
  get color() {
    return this._firstProp("color");
  }
  set color(value) {
    this._setProp("color", value);
  }
  /**
   * The organizer value as an uri. In most cases this is a mailto: uri, but
   * it can also be something else, like urn:uuid:...
   * @type {String}
   */
  get organizer() {
    return this._firstProp("organizer");
  }
  set organizer(value) {
    this._setProp("organizer", value);
  }
  /**
   * The sequence value for this event. Used for scheduling
   * see {@tutorial terminology}.
   * @type {Number}
   */
  get sequence() {
    return this._firstProp("sequence");
  }
  set sequence(value) {
    this._setProp("sequence", value);
  }
  /**
   * The recurrence id for this event. See {@tutorial terminology} for details.
   * @type {Time}
   */
  get recurrenceId() {
    return this._firstProp("recurrence-id");
  }
  set recurrenceId(value) {
    this._setTime("recurrence-id", value);
  }
  /**
   * Set/update a time property's value.
   * This will also update the TZID of the property.
   *
   * TODO: this method handles the case where we are switching
   * from a known timezone to an implied timezone (one without TZID).
   * This does _not_ handle the case of moving between a known
   *  (by TimezoneService) timezone to an unknown timezone...
   *
   * We will not add/remove/update the VTIMEZONE subcomponents
   *  leading to invalid ICAL data...
   * @private
   * @param {String} propName     The property name
   * @param {Time} time           The time to set
   */
  _setTime(propName, time) {
    let prop = this.component.getFirstProperty(propName);
    if (!prop) {
      prop = new Property(propName);
      this.component.addProperty(prop);
    }
    if (time.zone === Timezone.localTimezone || time.zone === Timezone.utcTimezone) {
      prop.removeParameter("tzid");
    } else {
      prop.setParameter("tzid", time.zone.tzid);
    }
    prop.setValue(time);
  }
  _setProp(name, value) {
    this.component.updatePropertyWithValue(name, value);
  }
  _firstProp(name) {
    return this.component.getFirstPropertyValue(name);
  }
  /**
   * The string representation of this event.
   * @return {String}
   */
  toString() {
    return this.component.toString();
  }
};
function compareRangeException(a, b) {
  if (a[0] > b[0]) return 1;
  if (b[0] > a[0]) return -1;
  return 0;
}
var ComponentParser = class {
  /**
   * Creates a new ICAL.ComponentParser instance.
   *
   * @param {Object=} options                   Component parser options
   * @param {Boolean} options.parseEvent        Whether events should be parsed
   * @param {Boolean} options.parseTimezeone    Whether timezones should be parsed
   */
  constructor(options) {
    if (typeof options === "undefined") {
      options = {};
    }
    for (let [key, value] of Object.entries(options)) {
      this[key] = value;
    }
  }
  /**
   * When true, parse events
   *
   * @type {Boolean}
   */
  parseEvent = true;
  /**
   * When true, parse timezones
   *
   * @type {Boolean}
   */
  parseTimezone = true;
  /* SAX like events here for reference */
  /**
   * Fired when parsing is complete
   * @callback
   */
  oncomplete = (
    /* c8 ignore next */
    function() {
    }
  );
  /**
   * Fired if an error occurs during parsing.
   *
   * @callback
   * @param {Error} err details of error
   */
  onerror = (
    /* c8 ignore next */
    function(err) {
    }
  );
  /**
   * Fired when a top level component (VTIMEZONE) is found
   *
   * @callback
   * @param {Timezone} component     Timezone object
   */
  ontimezone = (
    /* c8 ignore next */
    function(component) {
    }
  );
  /**
   * Fired when a top level component (VEVENT) is found.
   *
   * @callback
   * @param {Event} component    Top level component
   */
  onevent = (
    /* c8 ignore next */
    function(component) {
    }
  );
  /**
   * Process a string or parse ical object.  This function itself will return
   * nothing but will start the parsing process.
   *
   * Events must be registered prior to calling this method.
   *
   * @param {Component|String|Object} ical      The component to process,
   *        either in its final form, as a jCal Object, or string representation
   */
  process(ical) {
    if (typeof ical === "string") {
      ical = parse(ical);
    }
    if (!(ical instanceof Component)) {
      ical = new Component(ical);
    }
    let components = ical.getAllSubcomponents();
    let i = 0;
    let len = components.length;
    let component;
    for (; i < len; i++) {
      component = components[i];
      switch (component.name) {
        case "vtimezone":
          if (this.parseTimezone) {
            let tzid = component.getFirstPropertyValue("tzid");
            if (tzid) {
              this.ontimezone(new Timezone({
                tzid,
                component
              }));
            }
          }
          break;
        case "vevent":
          if (this.parseEvent) {
            this.onevent(new Event(component));
          }
          break;
        default:
          continue;
      }
    }
    this.oncomplete();
  }
};
var ICALmodule = {
  /**
   * The number of characters before iCalendar line folding should occur
   * @type {Number}
   * @default 75
   */
  foldLength: 75,
  debug: false,
  /**
   * The character(s) to be used for a newline. The default value is provided by
   * rfc5545.
   * @type {String}
   * @default "\r\n"
   */
  newLineChar: "\r\n",
  Binary,
  Component,
  ComponentParser,
  Duration,
  Event,
  Period,
  Property,
  Recur,
  RecurExpansion,
  RecurIterator,
  Time: Time2,
  Timezone,
  TimezoneService,
  UtcOffset,
  VCardTime,
  parse,
  stringify,
  design,
  helpers
};

// src/icsParser.js
function parseIcsToEvents(icsText) {
  const jcalData = ICALmodule.parse(icsText);
  const component = new ICALmodule.Component(jcalData);
  const vevents = component.getAllSubcomponents("vevent");
  return vevents.map((vevent, index3) => {
    const event = new ICALmodule.Event(vevent);
    const rruleProp = vevent.getFirstProperty("rrule");
    return {
      id: event.uid || `evt-${index3}`,
      title: event.summary || "Termin",
      start: event.startDate.toJSDate().toISOString(),
      end: event.endDate.toJSDate().toISOString(),
      rrule: rruleProp ? rruleProp.getFirstValue().toString() : null
    };
  });
}

// src/app.js
window.Buffer = import_buffer.Buffer;
var $ = (id) => document.getElementById(id);
var screens = ["setup", "onboarding", "settings", "main"];
function showScreen(name) {
  for (const s of screens) {
    $(`screen-${s}`).classList.toggle("hidden", s !== name);
  }
}
function setSyncStatus(text, state) {
  const el = $("syncStatus");
  el.textContent = text;
  el.dataset.state = state || "";
}
async function refreshUserList() {
  const users = await listKnownUsers();
  const container = $("userList");
  container.innerHTML = "";
  if (users.length === 0) {
    container.innerHTML = '<p class="hint">Noch keine Teilnehmer gefunden \u2013 erst synchronisieren.</p>';
    return;
  }
  for (const username of users) {
    const wrapper = document.createElement("label");
    wrapper.className = "user-item";
    wrapper.innerHTML = `<input type="checkbox" value="${username}" /> ${username}`;
    container.appendChild(wrapper);
  }
}
async function syncPull() {
  setSyncStatus("Synchronisiere \u2026");
  const result = await pullOnStartup((msg) => setSyncStatus(msg));
  if (result.ok) {
    setSyncStatus("Zuletzt synchronisiert: " + (/* @__PURE__ */ new Date()).toLocaleTimeString("de-DE"), "ok");
  } else {
    setSyncStatus("Sync fehlgeschlagen: " + result.reason, "error");
  }
  await refreshUserList();
}
async function syncPush() {
  const username = getLocalUsername();
  setSyncStatus("Sende \xC4nderungen \u2026");
  const result = await pushChanges("Termine aktualisiert von " + username, username);
  if (result.ok) {
    setSyncStatus(result.reason || "Erfolgreich synchronisiert.", "ok");
  } else {
    setSyncStatus("Push fehlgeschlagen: " + result.reason, "error");
  }
}
async function handleIcsImport(file) {
  const username = getLocalUsername();
  const text = await file.text();
  const events = parseIcsToEvents(text);
  await saveUserCalendar(username, events);
  setSyncStatus(`${events.length} Termine importiert f\xFCr ${username}. Nicht vergessen zu syncen!`, "ok");
  await refreshUserList();
}
async function handleFindSlots() {
  const weekday = parseWeekday2($("weekdaySelect").value);
  const fromDate = new Date($("fromDate").value);
  const toDate = new Date($("toDate").value);
  const startTime = $("startTime").value;
  const endTime = $("endTime").value;
  const selectedUsers = [...document.querySelectorAll("#userList input[type=checkbox]:checked")].map((cb) => cb.value);
  const resultsEl = $("results");
  if (!$("fromDate").value || !$("toDate").value) {
    resultsEl.innerHTML = '<p class="empty">Bitte Zeitraum (Von/Bis) angeben.</p>';
    return;
  }
  if (selectedUsers.length === 0) {
    resultsEl.innerHTML = '<p class="empty">Bitte mindestens einen Teilnehmer ausw\xE4hlen.</p>';
    return;
  }
  const rangeStartDt = new Date(fromDate);
  const rangeEndDt = new Date(toDate);
  rangeEndDt.setHours(23, 59, 59, 999);
  let allBusy = [];
  for (const username of selectedUsers) {
    const events = await loadUserCalendar(username);
    allBusy = allBusy.concat(expandEvents(events, username, rangeStartDt, rangeEndDt));
  }
  const slots = findCommonFreeSlots(allBusy, weekday, fromDate, toDate, startTime, endTime);
  if (slots.length === 0) {
    resultsEl.innerHTML = '<p class="empty">Keine gemeinsamen freien Slots gefunden.</p>';
  } else {
    resultsEl.innerHTML = slots.map((s) => `<div class="slot">${formatSlot(s)}</div>`).join("");
  }
}
function wireEvents() {
  $("setupSaveBtn").addEventListener("click", async () => {
    const remoteUrl = $("setupRemoteUrl").value.trim();
    const token = $("setupToken").value.trim();
    if (!remoteUrl || !token) return;
    saveConfig({ ...getConfig(), remoteUrl, token });
    await routeToInitialScreen();
  });
  $("onboardingSaveBtn").addEventListener("click", async () => {
    const name = $("onboardingName").value.trim();
    if (!name) return;
    setLocalUsername(name);
    await routeToInitialScreen();
  });
  $("settingsBtn").addEventListener("click", () => {
    const cfg = getConfig();
    $("settingsRemoteUrl").value = cfg.remoteUrl || "";
    $("settingsToken").value = cfg.token || "";
    $("settingsName").value = getLocalUsername() || "";
    showScreen("settings");
  });
  $("settingsBackBtn").addEventListener("click", () => showScreen("main"));
  $("settingsSaveBtn").addEventListener("click", () => {
    saveConfig({ ...getConfig(), remoteUrl: $("settingsRemoteUrl").value.trim(), token: $("settingsToken").value.trim() });
    if ($("settingsName").value.trim()) setLocalUsername($("settingsName").value.trim());
    showScreen("main");
  });
  $("importBtn").addEventListener("click", () => $("importFile").click());
  $("importFile").addEventListener("change", (e) => {
    if (e.target.files[0]) handleIcsImport(e.target.files[0]);
  });
  $("pushBtn").addEventListener("click", syncPush);
  $("findSlotsBtn").addEventListener("click", handleFindSlots);
}
async function routeToInitialScreen() {
  if (!isConfigured()) {
    showScreen("setup");
    return;
  }
  if (!getLocalUsername()) {
    showScreen("onboarding");
    return;
  }
  showScreen("main");
  await syncPull();
}
async function init2() {
  wireEvents();
  await routeToInitialScreen();
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
    });
  }
}
init2();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

crc-32/crc32.js:
  (*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com *)

isomorphic-git/index.js:
  (*!
   * This code for `path.join` is directly copied from @zenfs/core/path for bundle size improvements.
   * SPDX-License-Identifier: LGPL-3.0-or-later
   * Copyright (c) James Prevett and other ZenFS contributors.
   *
   * Windows support added:
   *   - Backslashes are normalised to forward slashes before processing.
   *   - Drive-letter prefixes (e.g. "C:") are detected and preserved through
   *     normalisation, so absolute Windows paths are handled correctly.
   *   - An absolute argument passed to join() resets the accumulated path,
   *     matching Node behaviour and handling worktree gitdir paths properly.
   *
   * Limitation: UNC paths (e.g. \\server\share) are not supported. The leading
   *   backslashes are normalised to forward slashes and then collapsed by
   *   normalizeString, losing the UNC root. Git on Windows works with
   *   drive-letter paths, so this is not expected to be a practical issue.
   *)
*/
