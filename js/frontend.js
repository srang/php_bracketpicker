/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
;/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.4
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.4
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.4'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.4
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.4'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.4
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.4'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.4
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.4'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.4
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.4'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--                        // up
    if (e.which == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.4
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.4'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.4
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.4'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (self && self.$tip && self.$tip.is(':visible')) {
      self.hoverState = 'in'
      return
    }

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $container   = this.options.container ? $(this.options.container) : this.$element.parent()
        var containerDim = this.getPosition($container)

        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.4
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.4'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.4
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.4'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.4
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.3.4'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.4
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.4'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = $(document.body).height()

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
;/*! Quill Editor v0.19.10
 *  https://quilljs.com/
 *  Copyright (c) 2014, Jason Chen
 *  Copyright (c) 2013, salesforce.com
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Quill = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
/**
 * @license
 * lodash 3.5.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern include="difference,intersection,last,all,each,invoke,map,reduce,bind,defer,partial,clone,extend,defaults,omit,values,isElement,isEqual,isFunction,isNumber,isObject,isString,uniqueId" --development --output .build/lodash.js`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as the semantic version number. */
  var VERSION = '3.5.0';

  /** Used to compose bitmasks for wrapper metadata. */
  var BIND_FLAG = 1,
      BIND_KEY_FLAG = 2,
      CURRY_BOUND_FLAG = 4,
      CURRY_FLAG = 8,
      CURRY_RIGHT_FLAG = 16,
      PARTIAL_FLAG = 32,
      PARTIAL_RIGHT_FLAG = 64,
      REARG_FLAG = 128,
      ARY_FLAG = 256;

  /** Used to detect when a function becomes hot. */
  var HOT_COUNT = 150,
      HOT_SPAN = 16;

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /** Used to detect named functions. */
  var reFuncName = /^\s*function[ \n\r\t]+\w/;

  /** Used to detect host constructors (Safari > 5). */
  var reHostCtor = /^\[object .+?Constructor\]$/;

  /**
   * Used to match `RegExp` special characters.
   * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
   * for more details.
   */
  var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
      reHasRegExpChars = RegExp(reRegExpChars.source);

  /** Used to detect functions containing a `this` reference. */
  var reThis = /\bthis\b/;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dateTag] = typedArrayTags[errorTag] =
  typedArrayTags[funcTag] = typedArrayTags[mapTag] =
  typedArrayTags[numberTag] = typedArrayTags[objectTag] =
  typedArrayTags[regexpTag] = typedArrayTags[setTag] =
  typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
  cloneableTags[dateTag] = cloneableTags[float32Tag] =
  cloneableTags[float64Tag] = cloneableTags[int8Tag] =
  cloneableTags[int16Tag] = cloneableTags[int32Tag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[stringTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[mapTag] = cloneableTags[setTag] =
  cloneableTags[weakMapTag] = false;

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;

  /** Detect free variable `window`. */
  var freeWindow = objectTypes[typeof window] && window;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /**
   * Used as a reference to the global object.
   *
   * The `this` value is used if it is the global object to avoid Greasemonkey's
   * restricted `window` object, otherwise the `window` object is used.
   */
  var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || this;

  /*--------------------------------------------------------------------------*/

  /**
   * The base implementation of `_.indexOf` without support for binary searches.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    if (value !== value) {
      return indexOfNaN(array, fromIndex);
    }
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.isFunction` without support for environments
   * with incorrect `typeof` results.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   */
  function baseIsFunction(value) {
    // Avoid a Chakra JIT bug in compatibility modes of IE 11.
    // See https://github.com/jashkenas/underscore/issues/1621 for more details.
    return typeof value == 'function' || false;
  }

  /**
   * Converts `value` to a string if it is not one. An empty string is returned
   * for `null` or `undefined` values.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    if (typeof value == 'string') {
      return value;
    }
    return value == null ? '' : (value + '');
  }

  /**
   * Gets the index at which the first occurrence of `NaN` is found in `array`.
   * If `fromRight` is provided elements of `array` are iterated from right to left.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
   */
  function indexOfNaN(array, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 0 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      var other = array[index];
      if (other !== other) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Checks if `value` is object-like.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   */
  function isObjectLike(value) {
    return (value && typeof value == 'object') || false;
  }

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      if (array[index] === placeholder) {
        array[index] = PLACEHOLDER;
        result[++resIndex] = index;
      }
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /** Used for native method references. */
  var objectProto = Object.prototype;

  /** Used to detect DOM support. */
  var document = (document = root.window) && document.document;

  /** Used to resolve the decompiled source of functions. */
  var fnToString = Function.prototype.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to generate unique IDs. */
  var idCounter = 0;

  /**
   * Used to resolve the `toStringTag` of values.
   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
   * for more details.
   */
  var objToString = objectProto.toString;

  /** Used to detect if a method is native. */
  var reNative = RegExp('^' +
    escapeRegExp(objToString)
    .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /** Native method references. */
  var ArrayBuffer = isNative(ArrayBuffer = root.ArrayBuffer) && ArrayBuffer,
      bufferSlice = isNative(bufferSlice = ArrayBuffer && new ArrayBuffer(0).slice) && bufferSlice,
      floor = Math.floor,
      getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
      propertyIsEnumerable = objectProto.propertyIsEnumerable,
      Set = isNative(Set = root.Set) && Set,
      Uint8Array = isNative(Uint8Array = root.Uint8Array) && Uint8Array,
      WeakMap = isNative(WeakMap = root.WeakMap) && WeakMap;

  /** Used to clone array buffers. */
  var Float64Array = (function() {
    // Safari 5 errors when using an array buffer to initialize a typed array
    // where the array buffer's `byteLength` is not a multiple of the typed
    // array's `BYTES_PER_ELEMENT`.
    try {
      var func = isNative(func = root.Float64Array) && func,
          result = new func(new ArrayBuffer(10), 0, 1) && func;
    } catch(e) {}
    return result;
  }());

  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
      nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate,
      nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys,
      nativeMax = Math.max,
      nativeMin = Math.min,
      nativeNow = isNative(nativeNow = Date.now) && nativeNow;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1,
      MAX_ARRAY_INDEX =  MAX_ARRAY_LENGTH - 1,
      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

  /** Used as the size, in bytes, of each `Float64Array` element. */
  var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

  /**
   * Used as the maximum length of an array-like value.
   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
   * for more details.
   */
  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

  /** Used to store function metadata. */
  var metaMap = WeakMap && new WeakMap;

  /*------------------------------------------------------------------------*/

  /**
   * Creates a `lodash` object which wraps `value` to enable implicit chaining.
   * Methods that operate on and return arrays, collections, and functions can
   * be chained together. Methods that return a boolean or single value will
   * automatically end the chain returning the unwrapped value. Explicit chaining
   * may be enabled using `_.chain`. The execution of chained methods is lazy,
   * that is, execution is deferred until `_#value` is implicitly or explicitly
   * called.
   *
   * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
   * fusion is an optimization that merges iteratees to avoid creating intermediate
   * arrays and reduce the number of iteratee executions.
   *
   * Chaining is supported in custom builds as long as the `_#value` method is
   * directly or indirectly included in the build.
   *
   * In addition to lodash methods, wrappers have `Array` and `String` methods.
   *
   * The wrapper `Array` methods are:
   * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
   * `splice`, and `unshift`
   *
   * The wrapper `String` methods are:
   * `replace` and `split`
   *
   * The wrapper methods that support shortcut fusion are:
   * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
   * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
   * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
   * and `where`
   *
   * The chainable wrapper methods are:
   * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
   * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
   * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defer`, `delay`,
   * `difference`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `fill`,
   * `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`, `forEach`,
   * `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `functions`,
   * `groupBy`, `indexBy`, `initial`, `intersection`, `invert`, `invoke`, `keys`,
   * `keysIn`, `map`, `mapValues`, `matches`, `matchesProperty`, `memoize`, `merge`,
   * `mixin`, `negate`, `noop`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
   * `partition`, `pick`, `plant`, `pluck`, `property`, `propertyOf`, `pull`,
   * `pullAt`, `push`, `range`, `rearg`, `reject`, `remove`, `rest`, `reverse`,
   * `shuffle`, `slice`, `sort`, `sortBy`, `sortByAll`, `sortByOrder`, `splice`,
   * `spread`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `tap`,
   * `throttle`, `thru`, `times`, `toArray`, `toPlainObject`, `transform`,
   * `union`, `uniq`, `unshift`, `unzip`, `values`, `valuesIn`, `where`,
   * `without`, `wrap`, `xor`, `zip`, and `zipObject`
   *
   * The wrapper methods that are **not** chainable by default are:
   * `add`, `attempt`, `camelCase`, `capitalize`, `clone`, `cloneDeep`, `deburr`,
   * `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`,
   * `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`, `has`,
   * `identity`, `includes`, `indexOf`, `inRange`, `isArguments`, `isArray`,
   * `isBoolean`, `isDate`, `isElement`, `isEmpty`, `isEqual`, `isError`,
   * `isFinite`,`isFunction`, `isMatch`, `isNative`, `isNaN`, `isNull`, `isNumber`,
   * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`,
   * `isTypedArray`, `join`, `kebabCase`, `last`, `lastIndexOf`, `max`, `min`,
   * `noConflict`, `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`,
   * `random`, `reduce`, `reduceRight`, `repeat`, `result`, `runInContext`,
   * `shift`, `size`, `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`,
   * `startCase`, `startsWith`, `sum`, `template`, `trim`, `trimLeft`,
   * `trimRight`, `trunc`, `unescape`, `uniqueId`, `value`, and `words`
   *
   * The wrapper method `sample` will return a wrapped value when `n` is provided,
   * otherwise an unwrapped value is returned.
   *
   * @name _
   * @constructor
   * @category Chain
   * @param {*} value The value to wrap in a `lodash` instance.
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * var wrapped = _([1, 2, 3]);
   *
   * // returns an unwrapped value
   * wrapped.reduce(function(sum, n) {
   *   return sum + n;
   * });
   * // => 6
   *
   * // returns a wrapped value
   * var squares = wrapped.map(function(n) {
   *   return n * n;
   * });
   *
   * _.isArray(squares);
   * // => false
   *
   * _.isArray(squares.value());
   * // => true
   */
  function lodash() {
    // No operation performed.
  }

  /**
   * An object environment feature flags.
   *
   * @static
   * @memberOf _
   * @type Object
   */
  var support = lodash.support = {};

  (function(x) {

    /**
     * Detect if functions can be decompiled by `Function#toString`
     * (all but Firefox OS certified apps, older Opera mobile browsers, and
     * the PlayStation 3; forced `false` for Windows 8 apps).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcDecomp = !isNative(root.WinRTError) && reThis.test(function() { return this; });

    /**
     * Detect if `Function#name` is supported (all but IE).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcNames = typeof Function.name == 'string';

    /**
     * Detect if the DOM is supported.
     *
     * @memberOf _.support
     * @type boolean
     */
    try {
      support.dom = document.createDocumentFragment().nodeType === 11;
    } catch(e) {
      support.dom = false;
    }

    /**
     * Detect if `arguments` object indexes are non-enumerable.
     *
     * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
     * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
     * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
     * checks for indexes that exceed their function's formal parameters with
     * associated values of `0`.
     *
     * @memberOf _.support
     * @type boolean
     */
    try {
      support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
    } catch(e) {
      support.nonEnumArgs = true;
    }
  }(0, 0));

  /*------------------------------------------------------------------------*/

  /**
   *
   * Creates a cache object to store unique values.
   *
   * @private
   * @param {Array} [values] The values to cache.
   */
  function SetCache(values) {
    var length = values ? values.length : 0;

    this.data = { 'hash': nativeCreate(null), 'set': new Set };
    while (length--) {
      this.push(values[length]);
    }
  }

  /**
   * Checks if `value` is in `cache` mimicking the return signature of
   * `_.indexOf` by returning `0` if the value is found, else `-1`.
   *
   * @private
   * @param {Object} cache The cache to search.
   * @param {*} value The value to search for.
   * @returns {number} Returns `0` if `value` is found, else `-1`.
   */
  function cacheIndexOf(cache, value) {
    var data = cache.data,
        result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

    return result ? 0 : -1;
  }

  /**
   * Adds `value` to the cache.
   *
   * @private
   * @name push
   * @memberOf SetCache
   * @param {*} value The value to cache.
   */
  function cachePush(value) {
    var data = this.data;
    if (typeof value == 'string' || isObject(value)) {
      data.set.add(value);
    } else {
      data.hash[value] = true;
    }
  }

  /*------------------------------------------------------------------------*/

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function arrayCopy(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  /**
   * A specialized version of `_.forEach` for arrays without support for callback
   * shorthands or `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.every` for arrays without support for callback
   * shorthands or `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   */
  function arrayEvery(array, predicate) {
    var index = -1,
        length = array.length;

    while (++index < length) {
      if (!predicate(array[index], index, array)) {
        return false;
      }
    }
    return true;
  }

  /**
   * A specialized version of `_.map` for arrays without support for callback
   * shorthands or `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /**
   * A specialized version of `_.reduce` for arrays without support for callback
   * shorthands or `this` binding.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initFromArray] Specify using the first element of `array`
   *  as the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduce(array, iteratee, accumulator, initFromArray) {
    var index = -1,
        length = array.length;

    if (initFromArray && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }

  /**
   * Used by `_.defaults` to customize its `_.assign` use.
   *
   * @private
   * @param {*} objectValue The destination object property value.
   * @param {*} sourceValue The source object property value.
   * @returns {*} Returns the value to assign to the destination object.
   */
  function assignDefaults(objectValue, sourceValue) {
    return typeof objectValue == 'undefined' ? sourceValue : objectValue;
  }

  /**
   * The base implementation of `_.assign` without support for argument juggling,
   * multiple sources, and `this` binding `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {Function} [customizer] The function to customize assigning values.
   * @returns {Object} Returns the destination object.
   */
  function baseAssign(object, source, customizer) {
    var props = keys(source);
    if (!customizer) {
      return baseCopy(source, object, props);
    }
    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index],
          value = object[key],
          result = customizer(value, source[key], key, object, source);

      if ((result === result ? (result !== value) : (value === value)) ||
          (typeof value == 'undefined' && !(key in object))) {
        object[key] = result;
      }
    }
    return object;
  }

  /**
   * Copies the properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Array} props The property names to copy.
   * @returns {Object} Returns `object`.
   */
  function baseCopy(source, object, props) {
    if (!props) {
      props = object;
      object = {};
    }
    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];
      object[key] = source[key];
    }
    return object;
  }

  /**
   * The base implementation of `_.callback` which supports specifying the
   * number of arguments to provide to `func`.
   *
   * @private
   * @param {*} [func=_.identity] The value to convert to a callback.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {number} [argCount] The number of arguments to provide to `func`.
   * @returns {Function} Returns the callback.
   */
  function baseCallback(func, thisArg, argCount) {
    var type = typeof func;
    if (type == 'function') {
      return (typeof thisArg != 'undefined' && isBindable(func))
        ? bindCallback(func, thisArg, argCount)
        : func;
    }
    if (func == null) {
      return identity;
    }
    if (type == 'object') {
      return baseMatches(func);
    }
    return typeof thisArg == 'undefined'
      ? baseProperty(func + '')
      : baseMatchesProperty(func + '', thisArg);
  }

  /**
   * The base implementation of `_.clone` without support for argument juggling
   * and `this` binding `customizer` functions.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @param {Function} [customizer] The function to customize cloning values.
   * @param {string} [key] The key of `value`.
   * @param {Object} [object] The object `value` belongs to.
   * @param {Array} [stackA=[]] Tracks traversed source objects.
   * @param {Array} [stackB=[]] Associates clones with source counterparts.
   * @returns {*} Returns the cloned value.
   */
  function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
    var result;
    if (customizer) {
      result = object ? customizer(value, key, object) : customizer(value);
    }
    if (typeof result != 'undefined') {
      return result;
    }
    if (!isObject(value)) {
      return value;
    }
    var isArr = isArray(value);
    if (isArr) {
      result = initCloneArray(value);
      if (!isDeep) {
        return arrayCopy(value, result);
      }
    } else {
      var tag = objToString.call(value),
          isFunc = tag == funcTag;

      if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
        result = initCloneObject(isFunc ? {} : value);
        if (!isDeep) {
          return baseCopy(value, result, keys(value));
        }
      } else {
        return cloneableTags[tag]
          ? initCloneByTag(value, tag, isDeep)
          : (object ? value : {});
      }
    }
    // Check for circular references and return corresponding clone.
    stackA || (stackA = []);
    stackB || (stackB = []);

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == value) {
        return stackB[length];
      }
    }
    // Add the source value to the stack of traversed objects and associate it with its clone.
    stackA.push(value);
    stackB.push(result);

    // Recursively populate clone (susceptible to call stack limits).
    (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
      result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
    });
    return result;
  }

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} prototype The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function Object() {}
    return function(prototype) {
      if (isObject(prototype)) {
        Object.prototype = prototype;
        var result = new Object;
        Object.prototype = null;
      }
      return result || root.Object();
    };
  }());

  /**
   * The base implementation of `_.delay` and `_.defer` which accepts an index
   * of where to slice the arguments to provide to `func`.
   *
   * @private
   * @param {Function} func The function to delay.
   * @param {number} wait The number of milliseconds to delay invocation.
   * @param {Object} args The `arguments` object to slice and provide to `func`.
   * @returns {number} Returns the timer id.
   */
  function baseDelay(func, wait, args, fromIndex) {
    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    return setTimeout(function() { func.apply(undefined, baseSlice(args, fromIndex)); }, wait);
  }

  /**
   * The base implementation of `_.difference` which accepts a single array
   * of values to exclude.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Array} values The values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   */
  function baseDifference(array, values) {
    var length = array ? array.length : 0,
        result = [];

    if (!length) {
      return result;
    }
    var index = -1,
        indexOf = getIndexOf(),
        isCommon = indexOf == baseIndexOf,
        cache = (isCommon && values.length >= 200) ? createCache(values) : null,
        valuesLength = values.length;

    if (cache) {
      indexOf = cacheIndexOf;
      isCommon = false;
      values = cache;
    }
    outer:
    while (++index < length) {
      var value = array[index];

      if (isCommon && value === value) {
        var valuesIndex = valuesLength;
        while (valuesIndex--) {
          if (values[valuesIndex] === value) {
            continue outer;
          }
        }
        result.push(value);
      }
      else if (indexOf(values, value, 0) < 0) {
        result.push(value);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.forEach` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object|string} Returns `collection`.
   */
  function baseEach(collection, iteratee) {
    var length = collection ? collection.length : 0;
    if (!isLength(length)) {
      return baseForOwn(collection, iteratee);
    }
    var index = -1,
        iterable = toObject(collection);

    while (++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  }

  /**
   * The base implementation of `_.every` without support for callback
   * shorthands or `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`
   */
  function baseEvery(collection, predicate) {
    var result = true;
    baseEach(collection, function(value, index, collection) {
      result = !!predicate(value, index, collection);
      return result;
    });
    return result;
  }

  /**
   * The base implementation of `_.flatten` with added support for restricting
   * flattening and specifying the start index.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {boolean} isDeep Specify a deep flatten.
   * @param {boolean} isStrict Restrict flattening to arrays and `arguments` objects.
   * @param {number} fromIndex The index to start from.
   * @returns {Array} Returns the new flattened array.
   */
  function baseFlatten(array, isDeep, isStrict, fromIndex) {
    var index = fromIndex - 1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      var value = array[index];

      if (isObjectLike(value) && isLength(value.length) && (isArray(value) || isArguments(value))) {
        if (isDeep) {
          // Recursively flatten arrays (susceptible to call stack limits).
          value = baseFlatten(value, isDeep, isStrict, 0);
        }
        var valIndex = -1,
            valLength = value.length;

        result.length += valLength;
        while (++valIndex < valLength) {
          result[++resIndex] = value[valIndex];
        }
      } else if (!isStrict) {
        result[++resIndex] = value;
      }
    }
    return result;
  }

  /**
   * The base implementation of `baseForIn` and `baseForOwn` which iterates
   * over `object` properties returned by `keysFunc` invoking `iteratee` for
   * each property. Iterator functions may exit iteration early by explicitly
   * returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  function baseFor(object, iteratee, keysFunc) {
    var index = -1,
        iterable = toObject(object),
        props = keysFunc(object),
        length = props.length;

    while (++index < length) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  }

  /**
   * The base implementation of `_.forIn` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForIn(object, iteratee) {
    return baseFor(object, iteratee, keysIn);
  }

  /**
   * The base implementation of `_.forOwn` without support for callback
   * shorthands and `this` binding.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return baseFor(object, iteratee, keys);
  }

  /**
   * The base implementation of `_.invoke` which requires additional arguments
   * to be provided as an array of arguments rather than individually.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|string} methodName The name of the method to invoke or
   *  the function invoked per iteration.
   * @param {Array} [args] The arguments to invoke the method with.
   * @returns {Array} Returns the array of results.
   */
  function baseInvoke(collection, methodName, args) {
    var index = -1,
        isFunc = typeof methodName == 'function',
        length = collection ? collection.length : 0,
        result = isLength(length) ? Array(length) : [];

    baseEach(collection, function(value) {
      var func = isFunc ? methodName : (value != null && value[methodName]);
      result[++index] = func ? func.apply(value, args) : undefined;
    });
    return result;
  }

  /**
   * The base implementation of `_.isEqual` without support for `this` binding
   * `customizer` functions.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {Function} [customizer] The function to customize comparing values.
   * @param {boolean} [isWhere] Specify performing partial comparisons.
   * @param {Array} [stackA] Tracks traversed `value` objects.
   * @param {Array} [stackB] Tracks traversed `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, customizer, isWhere, stackA, stackB) {
    // Exit early for identical values.
    if (value === other) {
      // Treat `+0` vs. `-0` as not equal.
      return value !== 0 || (1 / value == 1 / other);
    }
    var valType = typeof value,
        othType = typeof other;

    // Exit early for unlike primitive values.
    if ((valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object') ||
        value == null || other == null) {
      // Return `false` unless both values are `NaN`.
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, baseIsEqual, customizer, isWhere, stackA, stackB);
  }

  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} [customizer] The function to customize comparing objects.
   * @param {boolean} [isWhere] Specify performing partial comparisons.
   * @param {Array} [stackA=[]] Tracks traversed `value` objects.
   * @param {Array} [stackB=[]] Tracks traversed `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseIsEqualDeep(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
    var objIsArr = isArray(object),
        othIsArr = isArray(other),
        objTag = arrayTag,
        othTag = arrayTag;

    if (!objIsArr) {
      objTag = objToString.call(object);
      if (objTag == argsTag) {
        objTag = objectTag;
      } else if (objTag != objectTag) {
        objIsArr = isTypedArray(object);
      }
    }
    if (!othIsArr) {
      othTag = objToString.call(other);
      if (othTag == argsTag) {
        othTag = objectTag;
      } else if (othTag != objectTag) {
        othIsArr = isTypedArray(other);
      }
    }
    var objIsObj = objTag == objectTag,
        othIsObj = othTag == objectTag,
        isSameTag = objTag == othTag;

    if (isSameTag && !(objIsArr || objIsObj)) {
      return equalByTag(object, other, objTag);
    }
    var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (valWrapped || othWrapped) {
      return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isWhere, stackA, stackB);
    }
    if (!isSameTag) {
      return false;
    }
    // Assume cyclic values are equal.
    // For more information on detecting circular references see https://es5.github.io/#JO.
    stackA || (stackA = []);
    stackB || (stackB = []);

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == object) {
        return stackB[length] == other;
      }
    }
    // Add `object` and `other` to the stack of traversed objects.
    stackA.push(object);
    stackB.push(other);

    var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isWhere, stackA, stackB);

    stackA.pop();
    stackB.pop();

    return result;
  }

  /**
   * The base implementation of `_.isMatch` without support for callback
   * shorthands or `this` binding.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Array} props The source property names to match.
   * @param {Array} values The source values to match.
   * @param {Array} strictCompareFlags Strict comparison flags for source values.
   * @param {Function} [customizer] The function to customize comparing objects.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   */
  function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
    var length = props.length;
    if (object == null) {
      return !length;
    }
    var index = -1,
        noCustomizer = !customizer;

    while (++index < length) {
      if ((noCustomizer && strictCompareFlags[index])
            ? values[index] !== object[props[index]]
            : !hasOwnProperty.call(object, props[index])
          ) {
        return false;
      }
    }
    index = -1;
    while (++index < length) {
      var key = props[index];
      if (noCustomizer && strictCompareFlags[index]) {
        var result = hasOwnProperty.call(object, key);
      } else {
        var objValue = object[key],
            srcValue = values[index];

        result = customizer ? customizer(objValue, srcValue, key) : undefined;
        if (typeof result == 'undefined') {
          result = baseIsEqual(srcValue, objValue, customizer, true);
        }
      }
      if (!result) {
        return false;
      }
    }
    return true;
  }

  /**
   * The base implementation of `_.map` without support for callback shorthands
   * or `this` binding.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function baseMap(collection, iteratee) {
    var result = [];
    baseEach(collection, function(value, key, collection) {
      result.push(iteratee(value, key, collection));
    });
    return result;
  }

  /**
   * The base implementation of `_.matches` which does not clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new function.
   */
  function baseMatches(source) {
    var props = keys(source),
        length = props.length;

    if (length == 1) {
      var key = props[0],
          value = source[key];

      if (isStrictComparable(value)) {
        return function(object) {
          return object != null && object[key] === value && hasOwnProperty.call(object, key);
        };
      }
    }
    var values = Array(length),
        strictCompareFlags = Array(length);

    while (length--) {
      value = source[props[length]];
      values[length] = value;
      strictCompareFlags[length] = isStrictComparable(value);
    }
    return function(object) {
      return baseIsMatch(object, props, values, strictCompareFlags);
    };
  }

  /**
   * The base implementation of `_.matchesProperty` which does not coerce `key`
   * to a string.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @param {*} value The value to compare.
   * @returns {Function} Returns the new function.
   */
  function baseMatchesProperty(key, value) {
    if (isStrictComparable(value)) {
      return function(object) {
        return object != null && object[key] === value;
      };
    }
    return function(object) {
      return object != null && baseIsEqual(value, object[key], null, true);
    };
  }

  /**
   * The base implementation of `_.property` which does not coerce `key` to a string.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.reduce` and `_.reduceRight` without support
   * for callback shorthands or `this` binding, which iterates over `collection`
   * using the provided `eachFunc`.
   *
   * @private
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initFromCollection Specify using the first or last element
   *  of `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */
  function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
    eachFunc(collection, function(value, index, collection) {
      accumulator = initFromCollection
        ? (initFromCollection = false, value)
        : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
  }

  /**
   * The base implementation of `setData` without support for hot loop detection.
   *
   * @private
   * @param {Function} func The function to associate metadata with.
   * @param {*} data The metadata.
   * @returns {Function} Returns `func`.
   */
  var baseSetData = !metaMap ? identity : function(func, data) {
    metaMap.set(func, data);
    return func;
  };

  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;

    start = start == null ? 0 : (+start || 0);
    if (start < 0) {
      start = -start > length ? 0 : (length + start);
    }
    end = (typeof end == 'undefined' || end > length) ? length : (+end || 0);
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;

    var result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * returned by `keysFunc`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    var index = -1,
        length = props.length,
        result = Array(length);

    while (++index < length) {
      result[index] = object[props[index]];
    }
    return result;
  }

  /**
   * Performs a binary search of `array` to determine the index at which `value`
   * should be inserted into `array` in order to maintain its sort order.
   *
   * @private
   * @param {Array} array The sorted array to inspect.
   * @param {*} value The value to evaluate.
   * @param {boolean} [retHighest] Specify returning the highest, instead
   *  of the lowest, index at which a value should be inserted into `array`.
   * @returns {number} Returns the index at which `value` should be inserted
   *  into `array`.
   */
  function binaryIndex(array, value, retHighest) {
    var low = 0,
        high = array ? array.length : low;

    if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
      while (low < high) {
        var mid = (low + high) >>> 1,
            computed = array[mid];

        if (retHighest ? (computed <= value) : (computed < value)) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return high;
    }
    return binaryIndexBy(array, value, identity, retHighest);
  }

  /**
   * This function is like `binaryIndex` except that it invokes `iteratee` for
   * `value` and each element of `array` to compute their sort ranking. The
   * iteratee is invoked with one argument; (value).
   *
   * @private
   * @param {Array} array The sorted array to inspect.
   * @param {*} value The value to evaluate.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {boolean} [retHighest] Specify returning the highest, instead
   *  of the lowest, index at which a value should be inserted into `array`.
   * @returns {number} Returns the index at which `value` should be inserted
   *  into `array`.
   */
  function binaryIndexBy(array, value, iteratee, retHighest) {
    value = iteratee(value);

    var low = 0,
        high = array ? array.length : 0,
        valIsNaN = value !== value,
        valIsUndef = typeof value == 'undefined';

    while (low < high) {
      var mid = floor((low + high) / 2),
          computed = iteratee(array[mid]),
          isReflexive = computed === computed;

      if (valIsNaN) {
        var setLow = isReflexive || retHighest;
      } else if (valIsUndef) {
        setLow = isReflexive && (retHighest || typeof computed != 'undefined');
      } else {
        setLow = retHighest ? (computed <= value) : (computed < value);
      }
      if (setLow) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return nativeMin(high, MAX_ARRAY_INDEX);
  }

  /**
   * A specialized version of `baseCallback` which only supports `this` binding
   * and specifying the number of arguments to provide to `func`.
   *
   * @private
   * @param {Function} func The function to bind.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {number} [argCount] The number of arguments to provide to `func`.
   * @returns {Function} Returns the callback.
   */
  function bindCallback(func, thisArg, argCount) {
    if (typeof func != 'function') {
      return identity;
    }
    if (typeof thisArg == 'undefined') {
      return func;
    }
    switch (argCount) {
      case 1: return function(value) {
        return func.call(thisArg, value);
      };
      case 3: return function(value, index, collection) {
        return func.call(thisArg, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(thisArg, accumulator, value, index, collection);
      };
      case 5: return function(value, other, key, object, source) {
        return func.call(thisArg, value, other, key, object, source);
      };
    }
    return function() {
      return func.apply(thisArg, arguments);
    };
  }

  /**
   * Creates a clone of the given array buffer.
   *
   * @private
   * @param {ArrayBuffer} buffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function bufferClone(buffer) {
    return bufferSlice.call(buffer, 0);
  }
  if (!bufferSlice) {
    // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
    bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
      var byteLength = buffer.byteLength,
          floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
          offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
          result = new ArrayBuffer(byteLength);

      if (floatLength) {
        var view = new Float64Array(result, 0, floatLength);
        view.set(new Float64Array(buffer, 0, floatLength));
      }
      if (byteLength != offset) {
        view = new Uint8Array(result, offset);
        view.set(new Uint8Array(buffer, offset));
      }
      return result;
    };
  }

  /**
   * Creates an array that is the composition of partially applied arguments,
   * placeholders, and provided arguments into a single array of arguments.
   *
   * @private
   * @param {Array|Object} args The provided arguments.
   * @param {Array} partials The arguments to prepend to those provided.
   * @param {Array} holders The `partials` placeholder indexes.
   * @returns {Array} Returns the new array of composed arguments.
   */
  function composeArgs(args, partials, holders) {
    var holdersLength = holders.length,
        argsIndex = -1,
        argsLength = nativeMax(args.length - holdersLength, 0),
        leftIndex = -1,
        leftLength = partials.length,
        result = Array(argsLength + leftLength);

    while (++leftIndex < leftLength) {
      result[leftIndex] = partials[leftIndex];
    }
    while (++argsIndex < holdersLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
    while (argsLength--) {
      result[leftIndex++] = args[argsIndex++];
    }
    return result;
  }

  /**
   * This function is like `composeArgs` except that the arguments composition
   * is tailored for `_.partialRight`.
   *
   * @private
   * @param {Array|Object} args The provided arguments.
   * @param {Array} partials The arguments to append to those provided.
   * @param {Array} holders The `partials` placeholder indexes.
   * @returns {Array} Returns the new array of composed arguments.
   */
  function composeArgsRight(args, partials, holders) {
    var holdersIndex = -1,
        holdersLength = holders.length,
        argsIndex = -1,
        argsLength = nativeMax(args.length - holdersLength, 0),
        rightIndex = -1,
        rightLength = partials.length,
        result = Array(argsLength + rightLength);

    while (++argsIndex < argsLength) {
      result[argsIndex] = args[argsIndex];
    }
    var pad = argsIndex;
    while (++rightIndex < rightLength) {
      result[pad + rightIndex] = partials[rightIndex];
    }
    while (++holdersIndex < holdersLength) {
      result[pad + holders[holdersIndex]] = args[argsIndex++];
    }
    return result;
  }

  /**
   * Creates a function that assigns properties of source object(s) to a given
   * destination object.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return function() {
      var args = arguments,
          length = args.length,
          object = args[0];

      if (length < 2 || object == null) {
        return object;
      }
      var customizer = args[length - 2],
          thisArg = args[length - 1],
          guard = args[3];

      if (length > 3 && typeof customizer == 'function') {
        customizer = bindCallback(customizer, thisArg, 5);
        length -= 2;
      } else {
        customizer = (length > 2 && typeof thisArg == 'function') ? thisArg : null;
        length -= (customizer ? 1 : 0);
      }
      if (guard && isIterateeCall(args[1], args[2], guard)) {
        customizer = length == 3 ? null : customizer;
        length = 2;
      }
      var index = 0;
      while (++index < length) {
        var source = args[index];
        if (source) {
          assigner(object, source, customizer);
        }
      }
      return object;
    };
  }

  /**
   * Creates a function that wraps `func` and invokes it with the `this`
   * binding of `thisArg`.
   *
   * @private
   * @param {Function} func The function to bind.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @returns {Function} Returns the new bound function.
   */
  function createBindWrapper(func, thisArg) {
    var Ctor = createCtorWrapper(func);

    function wrapper() {
      var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
      return fn.apply(thisArg, arguments);
    }
    return wrapper;
  }

  /**
   * Creates a `Set` cache object to optimize linear searches of large arrays.
   *
   * @private
   * @param {Array} [values] The values to cache.
   * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
   */
  var createCache = !(nativeCreate && Set) ? constant(null) : function(values) {
    return new SetCache(values);
  };

  /**
   * Creates a function that produces an instance of `Ctor` regardless of
   * whether it was invoked as part of a `new` expression or by `call` or `apply`.
   *
   * @private
   * @param {Function} Ctor The constructor to wrap.
   * @returns {Function} Returns the new wrapped function.
   */
  function createCtorWrapper(Ctor) {
    return function() {
      var thisBinding = baseCreate(Ctor.prototype),
          result = Ctor.apply(thisBinding, arguments);

      // Mimic the constructor's `return` behavior.
      // See https://es5.github.io/#x13.2.2 for more details.
      return isObject(result) ? result : thisBinding;
    };
  }

  /**
   * Creates a function that wraps `func` and invokes it with optional `this`
   * binding of, partial application, and currying.
   *
   * @private
   * @param {Function|string} func The function or method name to reference.
   * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {Array} [partials] The arguments to prepend to those provided to the new function.
   * @param {Array} [holders] The `partials` placeholder indexes.
   * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
   * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
   * @param {Array} [argPos] The argument positions of the new function.
   * @param {number} [ary] The arity cap of `func`.
   * @param {number} [arity] The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
    var isAry = bitmask & ARY_FLAG,
        isBind = bitmask & BIND_FLAG,
        isBindKey = bitmask & BIND_KEY_FLAG,
        isCurry = bitmask & CURRY_FLAG,
        isCurryBound = bitmask & CURRY_BOUND_FLAG,
        isCurryRight = bitmask & CURRY_RIGHT_FLAG;

    var Ctor = !isBindKey && createCtorWrapper(func),
        key = func;

    function wrapper() {
      // Avoid `arguments` object use disqualifying optimizations by
      // converting it to an array before providing it to other functions.
      var length = arguments.length,
          index = length,
          args = Array(length);

      while (index--) {
        args[index] = arguments[index];
      }
      if (partials) {
        args = composeArgs(args, partials, holders);
      }
      if (partialsRight) {
        args = composeArgsRight(args, partialsRight, holdersRight);
      }
      if (isCurry || isCurryRight) {
        var placeholder = wrapper.placeholder,
            argsHolders = replaceHolders(args, placeholder);

        length -= argsHolders.length;
        if (length < arity) {
          var newArgPos = argPos ? arrayCopy(argPos) : null,
              newArity = nativeMax(arity - length, 0),
              newsHolders = isCurry ? argsHolders : null,
              newHoldersRight = isCurry ? null : argsHolders,
              newPartials = isCurry ? args : null,
              newPartialsRight = isCurry ? null : args;

          bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
          bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

          if (!isCurryBound) {
            bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
          }
          var result = createHybridWrapper(func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity);
          result.placeholder = placeholder;
          return result;
        }
      }
      var thisBinding = isBind ? thisArg : this;
      if (isBindKey) {
        func = thisBinding[key];
      }
      if (argPos) {
        args = reorder(args, argPos);
      }
      if (isAry && ary < args.length) {
        args.length = ary;
      }
      var fn = (this && this !== root && this instanceof wrapper) ? (Ctor || createCtorWrapper(func)) : func;
      return fn.apply(thisBinding, args);
    }
    return wrapper;
  }

  /**
   * Creates a function that wraps `func` and invokes it with the optional `this`
   * binding of `thisArg` and the `partials` prepended to those provided to
   * the wrapper.
   *
   * @private
   * @param {Function} func The function to partially apply arguments to.
   * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} partials The arguments to prepend to those provided to the new function.
   * @returns {Function} Returns the new bound function.
   */
  function createPartialWrapper(func, bitmask, thisArg, partials) {
    var isBind = bitmask & BIND_FLAG,
        Ctor = createCtorWrapper(func);

    function wrapper() {
      // Avoid `arguments` object use disqualifying optimizations by
      // converting it to an array before providing it `func`.
      var argsIndex = -1,
          argsLength = arguments.length,
          leftIndex = -1,
          leftLength = partials.length,
          args = Array(argsLength + leftLength);

      while (++leftIndex < leftLength) {
        args[leftIndex] = partials[leftIndex];
      }
      while (argsLength--) {
        args[leftIndex++] = arguments[++argsIndex];
      }
      var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
      return fn.apply(isBind ? thisArg : this, args);
    }
    return wrapper;
  }

  /**
   * Creates a function that either curries or invokes `func` with optional
   * `this` binding and partially applied arguments.
   *
   * @private
   * @param {Function|string} func The function or method name to reference.
   * @param {number} bitmask The bitmask of flags.
   *  The bitmask may be composed of the following flags:
   *     1 - `_.bind`
   *     2 - `_.bindKey`
   *     4 - `_.curry` or `_.curryRight` of a bound function
   *     8 - `_.curry`
   *    16 - `_.curryRight`
   *    32 - `_.partial`
   *    64 - `_.partialRight`
   *   128 - `_.rearg`
   *   256 - `_.ary`
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {Array} [partials] The arguments to be partially applied.
   * @param {Array} [holders] The `partials` placeholder indexes.
   * @param {Array} [argPos] The argument positions of the new function.
   * @param {number} [ary] The arity cap of `func`.
   * @param {number} [arity] The arity of `func`.
   * @returns {Function} Returns the new wrapped function.
   */
  function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
    var isBindKey = bitmask & BIND_KEY_FLAG;
    if (!isBindKey && typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var length = partials ? partials.length : 0;
    if (!length) {
      bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
      partials = holders = null;
    }
    length -= (holders ? holders.length : 0);
    if (bitmask & PARTIAL_RIGHT_FLAG) {
      var partialsRight = partials,
          holdersRight = holders;

      partials = holders = null;
    }
    var data = !isBindKey && getData(func),
        newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

    if (data && data !== true) {
      mergeData(newData, data);
      bitmask = newData[1];
      arity = newData[9];
    }
    newData[9] = arity == null
      ? (isBindKey ? 0 : func.length)
      : (nativeMax(arity - length, 0) || 0);

    if (bitmask == BIND_FLAG) {
      var result = createBindWrapper(newData[0], newData[2]);
    } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
      result = createPartialWrapper.apply(undefined, newData);
    } else {
      result = createHybridWrapper.apply(undefined, newData);
    }
    var setter = data ? baseSetData : setData;
    return setter(result, newData);
  }

  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} [customizer] The function to customize comparing arrays.
   * @param {boolean} [isWhere] Specify performing partial comparisons.
   * @param {Array} [stackA] Tracks traversed `value` objects.
   * @param {Array} [stackB] Tracks traversed `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */
  function equalArrays(array, other, equalFunc, customizer, isWhere, stackA, stackB) {
    var index = -1,
        arrLength = array.length,
        othLength = other.length,
        result = true;

    if (arrLength != othLength && !(isWhere && othLength > arrLength)) {
      return false;
    }
    // Deep compare the contents, ignoring non-numeric properties.
    while (result && ++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      result = undefined;
      if (customizer) {
        result = isWhere
          ? customizer(othValue, arrValue, index)
          : customizer(arrValue, othValue, index);
      }
      if (typeof result == 'undefined') {
        // Recursively compare arrays (susceptible to call stack limits).
        if (isWhere) {
          var othIndex = othLength;
          while (othIndex--) {
            othValue = other[othIndex];
            result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
            if (result) {
              break;
            }
          }
        } else {
          result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
        }
      }
    }
    return !!result;
  }

  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} value The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalByTag(object, other, tag) {
    switch (tag) {
      case boolTag:
      case dateTag:
        // Coerce dates and booleans to numbers, dates to milliseconds and booleans
        // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
        return +object == +other;

      case errorTag:
        return object.name == other.name && object.message == other.message;

      case numberTag:
        // Treat `NaN` vs. `NaN` as equal.
        return (object != +object)
          ? other != +other
          // But, treat `-0` vs. `+0` as not equal.
          : (object == 0 ? ((1 / object) == (1 / other)) : object == +other);

      case regexpTag:
      case stringTag:
        // Coerce regexes to strings and treat strings primitives and string
        // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
        return object == (other + '');
    }
    return false;
  }

  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} [customizer] The function to customize comparing values.
   * @param {boolean} [isWhere] Specify performing partial comparisons.
   * @param {Array} [stackA] Tracks traversed `value` objects.
   * @param {Array} [stackB] Tracks traversed `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalObjects(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
    var objProps = keys(object),
        objLength = objProps.length,
        othProps = keys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isWhere) {
      return false;
    }
    var hasCtor,
        index = -1;

    while (++index < objLength) {
      var key = objProps[index],
          result = hasOwnProperty.call(other, key);

      if (result) {
        var objValue = object[key],
            othValue = other[key];

        result = undefined;
        if (customizer) {
          result = isWhere
            ? customizer(othValue, objValue, key)
            : customizer(objValue, othValue, key);
        }
        if (typeof result == 'undefined') {
          // Recursively compare objects (susceptible to call stack limits).
          result = (objValue && objValue === othValue) || equalFunc(objValue, othValue, customizer, isWhere, stackA, stackB);
        }
      }
      if (!result) {
        return false;
      }
      hasCtor || (hasCtor = key == 'constructor');
    }
    if (!hasCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor;

      // Non `Object` object instances with different constructors are not equal.
      if (objCtor != othCtor &&
          ('constructor' in object && 'constructor' in other) &&
          !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
            typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Gets the appropriate "callback" function. If the `_.callback` method is
   * customized this function returns the custom method, otherwise it returns
   * the `baseCallback` function. If arguments are provided the chosen function
   * is invoked with them and its result is returned.
   *
   * @private
   * @returns {Function} Returns the chosen function or its result.
   */
  function getCallback(func, thisArg, argCount) {
    var result = lodash.callback || callback;
    result = result === callback ? baseCallback : result;
    return argCount ? result(func, thisArg, argCount) : result;
  }

  /**
   * Gets metadata for `func`.
   *
   * @private
   * @param {Function} func The function to query.
   * @returns {*} Returns the metadata for `func`.
   */
  var getData = !metaMap ? noop : function(func) {
    return metaMap.get(func);
  };

  /**
   * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
   * customized this function returns the custom method, otherwise it returns
   * the `baseIndexOf` function. If arguments are provided the chosen function
   * is invoked with them and its result is returned.
   *
   * @private
   * @returns {Function|number} Returns the chosen function or its result.
   */
  function getIndexOf(collection, target, fromIndex) {
    var result = lodash.indexOf || indexOf;
    result = result === indexOf ? baseIndexOf : result;
    return collection ? result(collection, target, fromIndex) : result;
  }

  /**
   * Initializes an array clone.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the initialized clone.
   */
  function initCloneArray(array) {
    var length = array.length,
        result = new array.constructor(length);

    // Add array properties assigned by `RegExp#exec`.
    if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    var Ctor = object.constructor;
    if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
      Ctor = Object;
    }
    return new Ctor;
  }

  /**
   * Initializes an object clone based on its `toStringTag`.
   *
   * **Note:** This function only supports cloning values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {string} tag The `toStringTag` of the object to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag:
        return bufferClone(object);

      case boolTag:
      case dateTag:
        return new Ctor(+object);

      case float32Tag: case float64Tag:
      case int8Tag: case int16Tag: case int32Tag:
      case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
        var buffer = object.buffer;
        return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

      case numberTag:
      case stringTag:
        return new Ctor(object);

      case regexpTag:
        var result = new Ctor(object.source, reFlags.exec(object));
        result.lastIndex = object.lastIndex;
    }
    return result;
  }

  /**
   * Checks if `func` is eligible for `this` binding.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is eligible, else `false`.
   */
  function isBindable(func) {
    var support = lodash.support,
        result = !(support.funcNames ? func.name : support.funcDecomp);

    if (!result) {
      var source = fnToString.call(func);
      if (!support.funcNames) {
        result = !reFuncName.test(source);
      }
      if (!result) {
        // Check if `func` references the `this` keyword and store the result.
        result = reThis.test(source) || isNative(func);
        baseSetData(func, result);
      }
    }
    return result;
  }

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    value = +value;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return value > -1 && value % 1 == 0 && value < length;
  }

  /**
   * Checks if the provided arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number') {
      var length = object.length,
          prereq = isLength(length) && isIndex(index, length);
    } else {
      prereq = type == 'string' && index in object;
    }
    if (prereq) {
      var other = object[index];
      return value === value ? (value === other) : (other !== other);
    }
    return false;
  }

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This function is based on ES `ToLength`. See the
   * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
   * for more details.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   */
  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */
  function isStrictComparable(value) {
    return value === value && (value === 0 ? ((1 / value) > 0) : !isObject(value));
  }

  /**
   * Merges the function metadata of `source` into `data`.
   *
   * Merging metadata reduces the number of wrappers required to invoke a function.
   * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
   * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
   * augment function arguments, making the order in which they are executed important,
   * preventing the merging of metadata. However, we make an exception for a safe
   * common case where curried functions have `_.ary` and or `_.rearg` applied.
   *
   * @private
   * @param {Array} data The destination metadata.
   * @param {Array} source The source metadata.
   * @returns {Array} Returns `data`.
   */
  function mergeData(data, source) {
    var bitmask = data[1],
        srcBitmask = source[1],
        newBitmask = bitmask | srcBitmask;

    var arityFlags = ARY_FLAG | REARG_FLAG,
        bindFlags = BIND_FLAG | BIND_KEY_FLAG,
        comboFlags = arityFlags | bindFlags | CURRY_BOUND_FLAG | CURRY_RIGHT_FLAG;

    var isAry = bitmask & ARY_FLAG && !(srcBitmask & ARY_FLAG),
        isRearg = bitmask & REARG_FLAG && !(srcBitmask & REARG_FLAG),
        argPos = (isRearg ? data : source)[7],
        ary = (isAry ? data : source)[8];

    var isCommon = !(bitmask >= REARG_FLAG && srcBitmask > bindFlags) &&
      !(bitmask > bindFlags && srcBitmask >= REARG_FLAG);

    var isCombo = (newBitmask >= arityFlags && newBitmask <= comboFlags) &&
      (bitmask < REARG_FLAG || ((isRearg || isAry) && argPos.length <= ary));

    // Exit early if metadata can't be merged.
    if (!(isCommon || isCombo)) {
      return data;
    }
    // Use source `thisArg` if available.
    if (srcBitmask & BIND_FLAG) {
      data[2] = source[2];
      // Set when currying a bound function.
      newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
    }
    // Compose partial arguments.
    var value = source[3];
    if (value) {
      var partials = data[3];
      data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
      data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
    }
    // Compose partial right arguments.
    value = source[5];
    if (value) {
      partials = data[5];
      data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
      data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
    }
    // Use source `argPos` if available.
    value = source[7];
    if (value) {
      data[7] = arrayCopy(value);
    }
    // Use source `ary` if it's smaller.
    if (srcBitmask & ARY_FLAG) {
      data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
    }
    // Use source `arity` if one is not provided.
    if (data[9] == null) {
      data[9] = source[9];
    }
    // Use source `func` and merge bitmasks.
    data[0] = source[0];
    data[1] = newBitmask;

    return data;
  }

  /**
   * A specialized version of `_.pick` that picks `object` properties specified
   * by the `props` array.
   *
   * @private
   * @param {Object} object The source object.
   * @param {string[]} props The property names to pick.
   * @returns {Object} Returns the new object.
   */
  function pickByArray(object, props) {
    object = toObject(object);

    var index = -1,
        length = props.length,
        result = {};

    while (++index < length) {
      var key = props[index];
      if (key in object) {
        result[key] = object[key];
      }
    }
    return result;
  }

  /**
   * A specialized version of `_.pick` that picks `object` properties `predicate`
   * returns truthy for.
   *
   * @private
   * @param {Object} object The source object.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Object} Returns the new object.
   */
  function pickByCallback(object, predicate) {
    var result = {};
    baseForIn(object, function(value, key, object) {
      if (predicate(value, key, object)) {
        result[key] = value;
      }
    });
    return result;
  }

  /**
   * Reorder `array` according to the specified indexes where the element at
   * the first index is assigned as the first element, the element at
   * the second index is assigned as the second element, and so on.
   *
   * @private
   * @param {Array} array The array to reorder.
   * @param {Array} indexes The arranged array indexes.
   * @returns {Array} Returns `array`.
   */
  function reorder(array, indexes) {
    var arrLength = array.length,
        length = nativeMin(indexes.length, arrLength),
        oldArray = arrayCopy(array);

    while (length--) {
      var index = indexes[length];
      array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
    }
    return array;
  }

  /**
   * Sets metadata for `func`.
   *
   * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
   * period of time, it will trip its breaker and transition to an identity function
   * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
   * for more details.
   *
   * @private
   * @param {Function} func The function to associate metadata with.
   * @param {*} data The metadata.
   * @returns {Function} Returns `func`.
   */
  var setData = (function() {
    var count = 0,
        lastCalled = 0;

    return function(key, value) {
      var stamp = now(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return key;
        }
      } else {
        count = 0;
      }
      return baseSetData(key, value);
    };
  }());

  /**
   * A fallback implementation of `_.isPlainObject` which checks if `value`
   * is an object created by the `Object` constructor or has a `[[Prototype]]`
   * of `null`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   */
  function shimIsPlainObject(value) {
    var Ctor,
        support = lodash.support;

    // Exit early for non `Object` objects.
    if (!(isObjectLike(value) && objToString.call(value) == objectTag) ||
        (!hasOwnProperty.call(value, 'constructor') &&
          (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
      return false;
    }
    // IE < 9 iterates inherited properties before own properties. If the first
    // iterated property is an object's own property then there are no inherited
    // enumerable properties.
    var result;
    // In most environments an object's own properties are iterated before
    // its inherited properties. If the last iterated property is an object's
    // own property then there are no inherited enumerable properties.
    baseForIn(value, function(subValue, key) {
      result = key;
    });
    return typeof result == 'undefined' || hasOwnProperty.call(value, result);
  }

  /**
   * A fallback implementation of `Object.keys` which creates an array of the
   * own enumerable property names of `object`.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns the array of property names.
   */
  function shimKeys(object) {
    var props = keysIn(object),
        propsLength = props.length,
        length = propsLength && object.length,
        support = lodash.support;

    var allowIndexes = length && isLength(length) &&
      (isArray(object) || (support.nonEnumArgs && isArguments(object)));

    var index = -1,
        result = [];

    while (++index < propsLength) {
      var key = props[index];
      if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Converts `value` to an object if it is not one.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {Object} Returns the object.
   */
  function toObject(value) {
    return isObject(value) ? value : Object(value);
  }

  /*------------------------------------------------------------------------*/

  /**
   * Creates an array excluding all values of the provided arrays using
   * `SameValueZero` for equality comparisons.
   *
   * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
   * e.g. `===`, except that `NaN` matches `NaN`. See the
   * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {...Array} [values] The arrays of values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.difference([1, 2, 3], [4, 2]);
   * // => [1, 3]
   */
  function difference() {
    var args = arguments,
        index = -1,
        length = args.length;

    while (++index < length) {
      var value = args[index];
      if (isArray(value) || isArguments(value)) {
        break;
      }
    }
    return baseDifference(value, baseFlatten(args, false, true, ++index));
  }

  /**
   * Gets the index at which the first occurrence of `value` is found in `array`
   * using `SameValueZero` for equality comparisons. If `fromIndex` is negative,
   * it is used as the offset from the end of `array`. If `array` is sorted
   * providing `true` for `fromIndex` performs a faster binary search.
   *
   * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
   * e.g. `===`, except that `NaN` matches `NaN`. See the
   * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {boolean|number} [fromIndex=0] The index to search from or `true`
   *  to perform a binary search on a sorted array.
   * @returns {number} Returns the index of the matched value, else `-1`.
   * @example
   *
   * _.indexOf([1, 2, 1, 2], 2);
   * // => 1
   *
   * // using `fromIndex`
   * _.indexOf([1, 2, 1, 2], 2, 2);
   * // => 3
   *
   * // performing a binary search
   * _.indexOf([1, 1, 2, 2], 2, true);
   * // => 2
   */
  function indexOf(array, value, fromIndex) {
    var length = array ? array.length : 0;
    if (!length) {
      return -1;
    }
    if (typeof fromIndex == 'number') {
      fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
    } else if (fromIndex) {
      var index = binaryIndex(array, value),
          other = array[index];

      if (value === value ? (value === other) : (other !== other)) {
        return index;
      }
      return -1;
    }
    return baseIndexOf(array, value, fromIndex || 0);
  }

  /**
   * Creates an array of unique values in all provided arrays using `SameValueZero`
   * for equality comparisons.
   *
   * **Note:** `SameValueZero` comparisons are like strict equality comparisons,
   * e.g. `===`, except that `NaN` matches `NaN`. See the
   * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of shared values.
   * @example
   * _.intersection([1, 2], [4, 2], [2, 1]);
   * // => [2]
   */
  function intersection() {
    var args = [],
        argsIndex = -1,
        argsLength = arguments.length,
        caches = [],
        indexOf = getIndexOf(),
        isCommon = indexOf == baseIndexOf;

    while (++argsIndex < argsLength) {
      var value = arguments[argsIndex];
      if (isArray(value) || isArguments(value)) {
        args.push(value);
        caches.push((isCommon && value.length >= 120) ? createCache(argsIndex && value) : null);
      }
    }
    argsLength = args.length;
    var array = args[0],
        index = -1,
        length = array ? array.length : 0,
        result = [],
        seen = caches[0];

    outer:
    while (++index < length) {
      value = array[index];
      if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
        argsIndex = argsLength;
        while (--argsIndex) {
          var cache = caches[argsIndex];
          if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value, 0)) < 0) {
            continue outer;
          }
        }
        if (seen) {
          seen.push(value);
        }
        result.push(value);
      }
    }
    return result;
  }

  /**
   * Gets the last element of `array`.
   *
   * @static
   * @memberOf _
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the last element of `array`.
   * @example
   *
   * _.last([1, 2, 3]);
   * // => 3
   */
  function last(array) {
    var length = array ? array.length : 0;
    return length ? array[length - 1] : undefined;
  }

  /*------------------------------------------------------------------------*/

  /**
   * Checks if `predicate` returns truthy for **all** elements of `collection`.
   * The predicate is bound to `thisArg` and invoked with three arguments;
   * (value, index|key, collection).
   *
   * If a property name is provided for `predicate` the created `_.property`
   * style callback returns the property value of the given element.
   *
   * If a value is also provided for `thisArg` the created `_.matchesProperty`
   * style callback returns `true` for elements that have a matching property
   * value, else `false`.
   *
   * If an object is provided for `predicate` the created `_.matches` style
   * callback returns `true` for elements that have the properties of the given
   * object, else `false`.
   *
   * @static
   * @memberOf _
   * @alias all
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [predicate=_.identity] The function invoked
   *  per iteration.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   * @example
   *
   * _.every([true, 1, null, 'yes'], Boolean);
   * // => false
   *
   * var users = [
   *   { 'user': 'barney', 'active': false },
   *   { 'user': 'fred',   'active': false }
   * ];
   *
   * // using the `_.matches` callback shorthand
   * _.every(users, { 'user': 'barney', 'active': false });
   * // => false
   *
   * // using the `_.matchesProperty` callback shorthand
   * _.every(users, 'active', false);
   * // => true
   *
   * // using the `_.property` callback shorthand
   * _.every(users, 'active');
   * // => false
   */
  function every(collection, predicate, thisArg) {
    var func = isArray(collection) ? arrayEvery : baseEvery;
    if (typeof predicate != 'function' || typeof thisArg != 'undefined') {
      predicate = getCallback(predicate, thisArg, 3);
    }
    return func(collection, predicate);
  }

  /**
   * Iterates over elements of `collection` invoking `iteratee` for each element.
   * The `iteratee` is bound to `thisArg` and invoked with three arguments;
   * (value, index|key, collection). Iterator functions may exit iteration early
   * by explicitly returning `false`.
   *
   * **Note:** As with other "Collections" methods, objects with a `length` property
   * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
   * may be used for object iteration.
   *
   * @static
   * @memberOf _
   * @alias each
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {Array|Object|string} Returns `collection`.
   * @example
   *
   * _([1, 2]).forEach(function(n) {
   *   console.log(n);
   * }).value();
   * // => logs each value from left to right and returns the array
   *
   * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
   *   console.log(n, key);
   * });
   * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
   */
  function forEach(collection, iteratee, thisArg) {
    return (typeof iteratee == 'function' && typeof thisArg == 'undefined' && isArray(collection))
      ? arrayEach(collection, iteratee)
      : baseEach(collection, bindCallback(iteratee, thisArg, 3));
  }

  /**
   * Invokes the method named by `methodName` on each element in `collection`,
   * returning an array of the results of each invoked method. Any additional
   * arguments are provided to each invoked method. If `methodName` is a function
   * it is invoked for, and `this` bound to, each element in `collection`.
   *
   * @static
   * @memberOf _
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|string} methodName The name of the method to invoke or
   *  the function invoked per iteration.
   * @param {...*} [args] The arguments to invoke the method with.
   * @returns {Array} Returns the array of results.
   * @example
   *
   * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
   * // => [[1, 5, 7], [1, 2, 3]]
   *
   * _.invoke([123, 456], String.prototype.split, '');
   * // => [['1', '2', '3'], ['4', '5', '6']]
   */
  function invoke(collection, methodName) {
    return baseInvoke(collection, methodName, baseSlice(arguments, 2));
  }

  /**
   * Creates an array of values by running each element in `collection` through
   * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
   * arguments; (value, index|key, collection).
   *
   * If a property name is provided for `predicate` the created `_.property`
   * style callback returns the property value of the given element.
   *
   * If a value is also provided for `thisArg` the created `_.matchesProperty`
   * style callback returns `true` for elements that have a matching property
   * value, else `false`.
   *
   * If an object is provided for `predicate` the created `_.matches` style
   * callback returns `true` for elements that have the properties of the given
   * object, else `false`.
   *
   * Many lodash methods are guarded to work as interatees for methods like
   * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
   *
   * The guarded methods are:
   * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`, `drop`,
   * `dropRight`, `fill`, `flatten`, `invert`, `max`, `min`, `parseInt`, `slice`,
   * `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimLeft`, `trimRight`,
   * `trunc`, `random`, `range`, `sample`, `uniq`, and `words`
   *
   * @static
   * @memberOf _
   * @alias collect
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [iteratee=_.identity] The function invoked
   *  per iteration.
   *  create a `_.property` or `_.matches` style callback respectively.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {Array} Returns the new mapped array.
   * @example
   *
   * function timesThree(n) {
   *   return n * 3;
   * }
   *
   * _.map([1, 2], timesThree);
   * // => [3, 6]
   *
   * _.map({ 'a': 1, 'b': 2 }, timesThree);
   * // => [3, 6] (iteration order is not guaranteed)
   *
   * var users = [
   *   { 'user': 'barney' },
   *   { 'user': 'fred' }
   * ];
   *
   * // using the `_.property` callback shorthand
   * _.map(users, 'user');
   * // => ['barney', 'fred']
   */
  function map(collection, iteratee, thisArg) {
    var func = isArray(collection) ? arrayMap : baseMap;
    iteratee = getCallback(iteratee, thisArg, 3);
    return func(collection, iteratee);
  }

  /**
   * Reduces `collection` to a value which is the accumulated result of running
   * each element in `collection` through `iteratee`, where each successive
   * invocation is supplied the return value of the previous. If `accumulator`
   * is not provided the first element of `collection` is used as the initial
   * value. The `iteratee` is bound to `thisArg`and invoked with four arguments;
   * (accumulator, value, index|key, collection).
   *
   * Many lodash methods are guarded to work as interatees for methods like
   * `_.reduce`, `_.reduceRight`, and `_.transform`.
   *
   * The guarded methods are:
   * `assign`, `defaults`, `merge`, and `sortAllBy`
   *
   * @static
   * @memberOf _
   * @alias foldl, inject
   * @category Collection
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {*} [thisArg] The `this` binding of `iteratee`.
   * @returns {*} Returns the accumulated value.
   * @example
   *
   * _.reduce([1, 2], function(sum, n) {
   *   return sum + n;
   * });
   * // => 3
   *
   * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
   *   result[key] = n * 3;
   *   return result;
   * }, {});
   * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
   */
  function reduce(collection, iteratee, accumulator, thisArg) {
    var func = isArray(collection) ? arrayReduce : baseReduce;
    return func(collection, getCallback(iteratee, thisArg, 4), accumulator, arguments.length < 3, baseEach);
  }

  /*------------------------------------------------------------------------*/

  /**
   * Gets the number of milliseconds that have elapsed since the Unix epoch
   * (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @category Date
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => logs the number of milliseconds it took for the deferred function to be invoked
   */
  var now = nativeNow || function() {
    return new Date().getTime();
  };

  /*------------------------------------------------------------------------*/

  /**
   * Creates a function that invokes `func` with the `this` binding of `thisArg`
   * and prepends any additional `_.bind` arguments to those provided to the
   * bound function.
   *
   * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
   * may be used as a placeholder for partially applied arguments.
   *
   * **Note:** Unlike native `Function#bind` this method does not set the `length`
   * property of bound functions.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to bind.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {...*} [args] The arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var greet = function(greeting, punctuation) {
   *   return greeting + ' ' + this.user + punctuation;
   * };
   *
   * var object = { 'user': 'fred' };
   *
   * var bound = _.bind(greet, object, 'hi');
   * bound('!');
   * // => 'hi fred!'
   *
   * // using placeholders
   * var bound = _.bind(greet, object, _, '!');
   * bound('hi');
   * // => 'hi fred!'
   */
  function bind(func, thisArg) {
    var bitmask = BIND_FLAG;
    if (arguments.length > 2) {
      var partials = baseSlice(arguments, 2),
          holders = replaceHolders(partials, bind.placeholder);

      bitmask |= PARTIAL_FLAG;
    }
    return createWrapper(func, bitmask, thisArg, partials, holders);
  }

  /**
   * Defers invoking the `func` until the current call stack has cleared. Any
   * additional arguments are provided to `func` when it is invoked.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to defer.
   * @param {...*} [args] The arguments to invoke the function with.
   * @returns {number} Returns the timer id.
   * @example
   *
   * _.defer(function(text) {
   *   console.log(text);
   * }, 'deferred');
   * // logs 'deferred' after one or more milliseconds
   */
  function defer(func) {
    return baseDelay(func, 1, arguments, 1);
  }

  /**
   * Creates a function that invokes `func` with `partial` arguments prepended
   * to those provided to the new function. This method is like `_.bind` except
   * it does **not** alter the `this` binding.
   *
   * The `_.partial.placeholder` value, which defaults to `_` in monolithic
   * builds, may be used as a placeholder for partially applied arguments.
   *
   * **Note:** This method does not set the `length` property of partially
   * applied functions.
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to partially apply arguments to.
   * @param {...*} [args] The arguments to be partially applied.
   * @returns {Function} Returns the new partially applied function.
   * @example
   *
   * var greet = function(greeting, name) {
   *   return greeting + ' ' + name;
   * };
   *
   * var sayHelloTo = _.partial(greet, 'hello');
   * sayHelloTo('fred');
   * // => 'hello fred'
   *
   * // using placeholders
   * var greetFred = _.partial(greet, _, 'fred');
   * greetFred('hi');
   * // => 'hi fred'
   */
  function partial(func) {
    var partials = baseSlice(arguments, 1),
        holders = replaceHolders(partials, partial.placeholder);

    return createWrapper(func, PARTIAL_FLAG, null, partials, holders);
  }

  /*------------------------------------------------------------------------*/

  /**
   * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
   * otherwise they are assigned by reference. If `customizer` is provided it is
   * invoked to produce the cloned values. If `customizer` returns `undefined`
   * cloning is handled by the method instead. The `customizer` is bound to
   * `thisArg` and invoked with two argument; (value [, index|key, object]).
   *
   * **Note:** This method is loosely based on the structured clone algorithm.
   * The enumerable properties of `arguments` objects and objects created by
   * constructors other than `Object` are cloned to plain `Object` objects. An
   * empty object is returned for uncloneable values such as functions, DOM nodes,
   * Maps, Sets, and WeakMaps. See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @param {Function} [customizer] The function to customize cloning values.
   * @param {*} [thisArg] The `this` binding of `customizer`.
   * @returns {*} Returns the cloned value.
   * @example
   *
   * var users = [
   *   { 'user': 'barney' },
   *   { 'user': 'fred' }
   * ];
   *
   * var shallow = _.clone(users);
   * shallow[0] === users[0];
   * // => true
   *
   * var deep = _.clone(users, true);
   * deep[0] === users[0];
   * // => false
   *
   * // using a customizer callback
   * var el = _.clone(document.body, function(value) {
   *   if (_.isElement(value)) {
   *     return value.cloneNode(false);
   *   }
   * });
   *
   * el === document.body
   * // => false
   * el.nodeName
   * // => BODY
   * el.childNodes.length;
   * // => 0
   */
  function clone(value, isDeep, customizer, thisArg) {
    if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
      isDeep = false;
    }
    else if (typeof isDeep == 'function') {
      thisArg = customizer;
      customizer = isDeep;
      isDeep = false;
    }
    customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 1);
    return baseClone(value, isDeep, customizer);
  }

  /**
   * Checks if `value` is classified as an `arguments` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  function isArguments(value) {
    var length = isObjectLike(value) ? value.length : undefined;
    return (isLength(length) && objToString.call(value) == argsTag) || false;
  }

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(function() { return arguments; }());
   * // => false
   */
  var isArray = nativeIsArray || function(value) {
    return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
  };

  /**
   * Checks if `value` is a DOM element.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
   * @example
   *
   * _.isElement(document.body);
   * // => true
   *
   * _.isElement('<body>');
   * // => false
   */
  function isElement(value) {
    return (value && value.nodeType === 1 && isObjectLike(value) &&
      (objToString.call(value).indexOf('Element') > -1)) || false;
  }
  // Fallback for environments without DOM support.
  if (!support.dom) {
    isElement = function(value) {
      return (value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value)) || false;
    };
  }

  /**
   * Performs a deep comparison between two values to determine if they are
   * equivalent. If `customizer` is provided it is invoked to compare values.
   * If `customizer` returns `undefined` comparisons are handled by the method
   * instead. The `customizer` is bound to `thisArg` and invoked with three
   * arguments; (value, other [, index|key]).
   *
   * **Note:** This method supports comparing arrays, booleans, `Date` objects,
   * numbers, `Object` objects, regexes, and strings. Objects are compared by
   * their own, not inherited, enumerable properties. Functions and DOM nodes
   * are **not** supported. Provide a customizer function to extend support
   * for comparing other values.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {Function} [customizer] The function to customize comparing values.
   * @param {*} [thisArg] The `this` binding of `customizer`.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'user': 'fred' };
   * var other = { 'user': 'fred' };
   *
   * object == other;
   * // => false
   *
   * _.isEqual(object, other);
   * // => true
   *
   * // using a customizer callback
   * var array = ['hello', 'goodbye'];
   * var other = ['hi', 'goodbye'];
   *
   * _.isEqual(array, other, function(value, other) {
   *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
   *     return true;
   *   }
   * });
   * // => true
   */
  function isEqual(value, other, customizer, thisArg) {
    customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 3);
    if (!customizer && isStrictComparable(value) && isStrictComparable(other)) {
      return value === other;
    }
    var result = customizer ? customizer(value, other) : undefined;
    return typeof result == 'undefined' ? baseIsEqual(value, other, customizer) : !!result;
  }

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in older versions of Chrome and Safari which return 'function' for regexes
    // and Safari 8 equivalents which return 'object' for typed array constructors.
    return objToString.call(value) == funcTag;
  };

  /**
   * Checks if `value` is the language type of `Object`.
   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(1);
   * // => false
   */
  function isObject(value) {
    // Avoid a V8 JIT bug in Chrome 19-20.
    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
    var type = typeof value;
    return type == 'function' || (value && type == 'object') || false;
  }

  /**
   * Checks if `value` is a native function.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
   * @example
   *
   * _.isNative(Array.prototype.push);
   * // => true
   *
   * _.isNative(_);
   * // => false
   */
  function isNative(value) {
    if (value == null) {
      return false;
    }
    if (objToString.call(value) == funcTag) {
      return reNative.test(fnToString.call(value));
    }
    return (isObjectLike(value) && reHostCtor.test(value)) || false;
  }

  /**
   * Checks if `value` is classified as a `Number` primitive or object.
   *
   * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
   * as numbers, use the `_.isFinite` method.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isNumber(8.4);
   * // => true
   *
   * _.isNumber(NaN);
   * // => true
   *
   * _.isNumber('8.4');
   * // => false
   */
  function isNumber(value) {
    return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag) || false;
  }

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * **Note:** This method assumes objects created by the `Object` constructor
   * have no inherited enumerable properties.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
    if (!(value && objToString.call(value) == objectTag)) {
      return false;
    }
    var valueOf = value.valueOf,
        objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

    return objProto
      ? (value == objProto || getPrototypeOf(value) == objProto)
      : shimIsPlainObject(value);
  };

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag) || false;
  }

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  function isTypedArray(value) {
    return (isObjectLike(value) && isLength(value.length) && typedArrayTags[objToString.call(value)]) || false;
  }

  /*------------------------------------------------------------------------*/

  /**
   * Assigns own enumerable properties of source object(s) to the destination
   * object. Subsequent sources overwrite property assignments of previous sources.
   * If `customizer` is provided it is invoked to produce the assigned values.
   * The `customizer` is bound to `thisArg` and invoked with five arguments;
   * (objectValue, sourceValue, key, object, source).
   *
   * @static
   * @memberOf _
   * @alias extend
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @param {Function} [customizer] The function to customize assigning values.
   * @param {*} [thisArg] The `this` binding of `customizer`.
   * @returns {Object} Returns `object`.
   * @example
   *
   * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
   * // => { 'user': 'fred', 'age': 40 }
   *
   * // using a customizer callback
   * var defaults = _.partialRight(_.assign, function(value, other) {
   *   return typeof value == 'undefined' ? other : value;
   * });
   *
   * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
   * // => { 'user': 'barney', 'age': 36 }
   */
  var assign = createAssigner(baseAssign);

  /**
   * Assigns own enumerable properties of source object(s) to the destination
   * object for all destination properties that resolve to `undefined`. Once a
   * property is set, additional values of the same property are ignored.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
   * // => { 'user': 'barney', 'age': 36 }
   */
  function defaults(object) {
    if (object == null) {
      return object;
    }
    var args = arrayCopy(arguments);
    args.push(assignDefaults);
    return assign.apply(undefined, args);
  }

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  var keys = !nativeKeys ? shimKeys : function(object) {
    if (object) {
      var Ctor = object.constructor,
          length = object.length;
    }
    if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
        (typeof object != 'function' && (length && isLength(length)))) {
      return shimKeys(object);
    }
    return isObject(object) ? nativeKeys(object) : [];
  };

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    if (object == null) {
      return [];
    }
    if (!isObject(object)) {
      object = Object(object);
    }
    var length = object.length;
    length = (length && isLength(length) &&
      (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

    var Ctor = object.constructor,
        index = -1,
        isProto = typeof Ctor == 'function' && Ctor.prototype === object,
        result = Array(length),
        skipIndexes = length > 0;

    while (++index < length) {
      result[index] = (index + '');
    }
    for (var key in object) {
      if (!(skipIndexes && isIndex(key, length)) &&
          !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * The opposite of `_.pick`; this method creates an object composed of the
   * own and inherited enumerable properties of `object` that are not omitted.
   * Property names may be specified as individual arguments or as arrays of
   * property names. If `predicate` is provided it is invoked for each property
   * of `object` omitting the properties `predicate` returns truthy for. The
   * predicate is bound to `thisArg` and invoked with three arguments;
   * (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {Function|...(string|string[])} [predicate] The function invoked per
   *  iteration or property names to omit, specified as individual property
   *  names or arrays of property names.
   * @param {*} [thisArg] The `this` binding of `predicate`.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'user': 'fred', 'age': 40 };
   *
   * _.omit(object, 'age');
   * // => { 'user': 'fred' }
   *
   * _.omit(object, _.isNumber);
   * // => { 'user': 'fred' }
   */
  function omit(object, predicate, thisArg) {
    if (object == null) {
      return {};
    }
    if (typeof predicate != 'function') {
      var props = arrayMap(baseFlatten(arguments, false, false, 1), String);
      return pickByArray(object, baseDifference(keysIn(object), props));
    }
    predicate = bindCallback(predicate, thisArg, 3);
    return pickByCallback(object, function(value, key, object) {
      return !predicate(value, key, object);
    });
  }

  /**
   * Creates an array of the own enumerable property values of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property values.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.values(new Foo);
   * // => [1, 2] (iteration order is not guaranteed)
   *
   * _.values('hi');
   * // => ['h', 'i']
   */
  function values(object) {
    return baseValues(object, keys(object));
  }

  /*------------------------------------------------------------------------*/

  /**
   * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
   * "+", "(", ")", "[", "]", "{" and "}" in `string`.
   *
   * @static
   * @memberOf _
   * @category String
   * @param {string} [string=''] The string to escape.
   * @returns {string} Returns the escaped string.
   * @example
   *
   * _.escapeRegExp('[lodash](https://lodash.com/)');
   * // => '\[lodash\]\(https://lodash\.com/\)'
   */
  function escapeRegExp(string) {
    string = baseToString(string);
    return (string && reHasRegExpChars.test(string))
      ? string.replace(reRegExpChars, '\\$&')
      : string;
  }

  /*------------------------------------------------------------------------*/

  /**
   * Creates a function that invokes `func` with the `this` binding of `thisArg`
   * and arguments of the created function. If `func` is a property name the
   * created callback returns the property value for a given element. If `func`
   * is an object the created callback returns `true` for elements that contain
   * the equivalent object properties, otherwise it returns `false`.
   *
   * @static
   * @memberOf _
   * @alias iteratee
   * @category Utility
   * @param {*} [func=_.identity] The value to convert to a callback.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
   * @returns {Function} Returns the callback.
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36 },
   *   { 'user': 'fred',   'age': 40 }
   * ];
   *
   * // wrap to create custom callback shorthands
   * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
   *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
   *   if (!match) {
   *     return callback(func, thisArg);
   *   }
   *   return function(object) {
   *     return match[2] == 'gt'
   *       ? object[match[1]] > match[3]
   *       : object[match[1]] < match[3];
   *   };
   * });
   *
   * _.filter(users, 'age__gt36');
   * // => [{ 'user': 'fred', 'age': 40 }]
   */
  function callback(func, thisArg, guard) {
    if (guard && isIterateeCall(func, thisArg, guard)) {
      thisArg = null;
    }
    return isObjectLike(func)
      ? matches(func)
      : baseCallback(func, thisArg);
  }

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var object = { 'user': 'fred' };
   * var getter = _.constant(object);
   *
   * getter() === object;
   * // => true
   */
  function constant(value) {
    return function() {
      return value;
    };
  }

  /**
   * This method returns the first argument provided to it.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'user': 'fred' };
   *
   * _.identity(object) === object;
   * // => true
   */
  function identity(value) {
    return value;
  }

  /**
   * Creates a function which performs a deep comparison between a given object
   * and `source`, returning `true` if the given object has equivalent property
   * values, else `false`.
   *
   * **Note:** This method supports comparing arrays, booleans, `Date` objects,
   * numbers, `Object` objects, regexes, and strings. Objects are compared by
   * their own, not inherited, enumerable properties. For comparing a single
   * own or inherited property value see `_.matchesProperty`.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': true },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * _.filter(users, _.matches({ 'age': 40, 'active': false }));
   * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
   */
  function matches(source) {
    return baseMatches(baseClone(source, true));
  }

  /**
   * A no-operation function which returns `undefined` regardless of the
   * arguments it receives.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @example
   *
   * var object = { 'user': 'fred' };
   *
   * _.noop(object) === undefined;
   * // => true
   */
  function noop() {
    // No operation performed.
  }

  /**
   * Generates a unique ID. If `prefix` is provided the ID is appended to it.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {string} [prefix] The value to prefix the ID with.
   * @returns {string} Returns the unique ID.
   * @example
   *
   * _.uniqueId('contact_');
   * // => 'contact_104'
   *
   * _.uniqueId();
   * // => '105'
   */
  function uniqueId(prefix) {
    var id = ++idCounter;
    return baseToString(prefix) + id;
  }

  /*------------------------------------------------------------------------*/

  // Add functions to the `Set` cache.
  SetCache.prototype.push = cachePush;

  // Add functions that return wrapped values when chaining.
  lodash.assign = assign;
  lodash.bind = bind;
  lodash.callback = callback;
  lodash.constant = constant;
  lodash.defaults = defaults;
  lodash.defer = defer;
  lodash.difference = difference;
  lodash.forEach = forEach;
  lodash.intersection = intersection;
  lodash.invoke = invoke;
  lodash.keys = keys;
  lodash.keysIn = keysIn;
  lodash.map = map;
  lodash.matches = matches;
  lodash.omit = omit;
  lodash.partial = partial;
  lodash.values = values;

  // Add aliases.
  lodash.collect = map;
  lodash.each = forEach;
  lodash.extend = assign;
  lodash.iteratee = callback;

  /*------------------------------------------------------------------------*/

  // Add functions that return unwrapped values when chaining.
  lodash.clone = clone;
  lodash.escapeRegExp = escapeRegExp;
  lodash.every = every;
  lodash.identity = identity;
  lodash.indexOf = indexOf;
  lodash.isArguments = isArguments;
  lodash.isArray = isArray;
  lodash.isElement = isElement;
  lodash.isEqual = isEqual;
  lodash.isFunction = isFunction;
  lodash.isNative = isNative;
  lodash.isNumber = isNumber;
  lodash.isObject = isObject;
  lodash.isPlainObject = isPlainObject;
  lodash.isString = isString;
  lodash.isTypedArray = isTypedArray;
  lodash.last = last;
  lodash.noop = noop;
  lodash.now = now;
  lodash.reduce = reduce;
  lodash.uniqueId = uniqueId;

  // Add aliases.
  lodash.all = every;
  lodash.foldl = reduce;
  lodash.inject = reduce;

  /*------------------------------------------------------------------------*/

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type string
   */
  lodash.VERSION = VERSION;

  // Assign default placeholders.
  arrayEach(['bind', 'partial'], function(methodName) {
    lodash[methodName].placeholder = lodash;
  });

  /*--------------------------------------------------------------------------*/

  // Some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose lodash to the global object when an AMD loader is present to avoid
    // errors in cases where lodash is loaded by a script tag and not intended
    // as an AMD module. See http://requirejs.org/docs/errors.html#mismatch for
    // more details.
    root._ = lodash;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function() {
      return lodash;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
    // Export for Node.js or RingoJS.
    if (moduleExports) {
      (freeModule.exports = lodash)._ = lodash;
    }
    // Export for Narwhal or Rhino -require.
    else {
      freeExports._ = lodash;
    }
  }
  else {
    // Export for a browser or Rhino.
    root._ = lodash;
  }
}.call(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function(undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {

      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    configure.call(this, conf);
  }

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else if(typeof tree._listeners === 'function') {
          tree._listeners = [tree._listeners, listener];
        }
        else if (isArray(tree._listeners)) {

          tree._listeners.push(listener);

          if (!tree._listeners.warned) {

            var m = defaultMaxListeners;

            if (typeof this._events.maxListeners !== 'undefined') {
              m = this._events.maxListeners;
            }

            if (m > 0 && tree._listeners.length > m) {

              tree._listeners.warned = true;
              console.error('(node) warning: possible EventEmitter memory ' +
                            'leak detected. %d listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit.',
                            tree._listeners.length);
              console.trace();
            }
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    this._events || init.call(this);
    this._events.maxListeners = n;
    if (!this._conf) this._conf = {};
    this._conf.maxListeners = n;
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn) {
    this.many(event, 1, fn);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      fn.apply(this, arguments);
    }

    listener._origin = fn;

    this.on(event, listener);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) { return false; }
    }

    // Loop through the *_all* functions and invoke them.
    if (this._all) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        this._all[i].apply(this, args);
      }
    }

    // If there is no 'error' event listener then throw.
    if (type === 'error') {

      if (!this._all &&
        !this._events.error &&
        !(this.wildcard && this.listenerTree.error)) {

        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
    }

    var handler;

    if(this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    }
    else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      if (arguments.length === 1) {
        handler.call(this);
      }
      else if (arguments.length > 1)
        switch (arguments.length) {
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          // slower
          default:
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
            handler.apply(this, args);
        }
      return true;
    }
    else if (handler) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

      var listeners = handler.slice();
      for (var i = 0, l = listeners.length; i < l; i++) {
        this.event = type;
        listeners[i].apply(this, args);
      }
      return (listeners.length > 0) || !!this._all;
    }
    else {
      return !!this._all;
    }

  };

  EventEmitter.prototype.on = function(type, listener) {

    if (typeof type === 'function') {
      this.onAny(type);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if(this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else if(typeof this._events[type] === 'function') {
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];
    }
    else if (isArray(this._events[type])) {
      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (!this._events[type].warned) {

        var m = defaultMaxListeners;

        if (typeof this._events.maxListeners !== 'undefined') {
          m = this._events.maxListeners;
        }

        if (m > 0 && this._events[type].length > m) {

          this._events[type].warned = true;
          console.error('(node) warning: possible EventEmitter memory ' +
                        'leak detected. %d listeners added. ' +
                        'Use emitter.setMaxListeners() to increase limit.',
                        this._events[type].length);
          console.trace();
        }
      }
    }
    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {

    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if(!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    this._all.push(fn);
    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          return this;
        }
      }
    } else {
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else {
      if (!this._events[type]) return this;
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if(this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (typeof define === 'function' && define.amd) {
     // AMD. Register as an anonymous module.
    define(function() {
      return EventEmitter;
    });
  } else if (typeof exports === 'object') {
    // CommonJS
    exports.EventEmitter2 = EventEmitter;
  }
  else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();

},{}],3:[function(_dereq_,module,exports){
var diff = _dereq_('fast-diff');
var is = _dereq_('./is');
var op = _dereq_('./op');


var NULL_CHARACTER = String.fromCharCode(0);  // Placeholder char for embed in diff()


var Delta = function (ops) {
  // Assume we are given a well formed ops
  if (is.array(ops)) {
    this.ops = ops;
  } else if (is.object(ops) && is.array(ops.ops)) {
    this.ops = ops.ops;
  } else {
    this.ops = [];
  }
};


Delta.prototype.insert = function (text, attributes) {
  var newOp = {};
  if (is.string(text)) {
    if (text.length === 0) return this;
    newOp.insert = text;
  } else if (is.number(text)) {
    newOp.insert = text;
  }
  if (is.object(attributes) && Object.keys(attributes).length > 0) newOp.attributes = attributes;
  return this.push(newOp);
};

Delta.prototype['delete'] = function (length) {
  if (length <= 0) return this;
  return this.push({ 'delete': length });
};

Delta.prototype.retain = function (length, attributes) {
  if (length <= 0) return this;
  var newOp = { retain: length };
  if (is.object(attributes) && Object.keys(attributes).length > 0) newOp.attributes = attributes;
  return this.push(newOp);
};

Delta.prototype.push = function (newOp) {
  var index = this.ops.length;
  var lastOp = this.ops[index - 1];
  newOp = op.clone(newOp);
  if (is.object(lastOp)) {
    if (is.number(newOp['delete']) && is.number(lastOp['delete'])) {
      this.ops[index - 1] = { 'delete': lastOp['delete'] + newOp['delete'] };
      return this;
    }
    // Since it does not matter if we insert before or after deleting at the same index,
    // always prefer to insert first
    if (is.number(lastOp['delete']) && (is.string(newOp.insert) || is.number(newOp.insert))) {
      index -= 1;
      lastOp = this.ops[index - 1];
      if (!is.object(lastOp)) {
        this.ops.unshift(newOp);
        return this;
      }
    }
    if (is.equal(newOp.attributes, lastOp.attributes)) {
      if (is.string(newOp.insert) && is.string(lastOp.insert)) {
        this.ops[index - 1] = { insert: lastOp.insert + newOp.insert };
        if (is.object(newOp.attributes)) this.ops[index - 1].attributes = newOp.attributes
        return this;
      } else if (is.number(newOp.retain) && is.number(lastOp.retain)) {
        this.ops[index - 1] = { retain: lastOp.retain + newOp.retain };
        if (is.object(newOp.attributes)) this.ops[index - 1].attributes = newOp.attributes
        return this;
      }
    }
  }
  this.ops.splice(index, 0, newOp);
  return this;
};

Delta.prototype.chop = function () {
  var lastOp = this.ops[this.ops.length - 1];
  if (lastOp && lastOp.retain && !lastOp.attributes) {
    this.ops.pop();
  }
  return this;
};

Delta.prototype.length = function () {
  return this.ops.reduce(function (length, elem) {
    return length + op.length(elem);
  }, 0);
};

Delta.prototype.slice = function (start, end) {
  start = start || 0;
  if (!is.number(end)) end = Infinity;
  var delta = new Delta();
  var iter = op.iterator(this.ops);
  var index = 0;
  while (index < end && iter.hasNext()) {
    var nextOp;
    if (index < start) {
      nextOp = iter.next(start - index);
    } else {
      nextOp = iter.next(end - index);
      delta.push(nextOp);
    }
    index += op.length(nextOp);
  }
  return delta;
};


Delta.prototype.compose = function (other) {
  var thisIter = op.iterator(this.ops);
  var otherIter = op.iterator(other.ops);
  this.ops = [];
  while (thisIter.hasNext() || otherIter.hasNext()) {
    if (otherIter.peekType() === 'insert') {
      this.push(otherIter.next());
    } else if (thisIter.peekType() === 'delete') {
      this.push(thisIter.next());
    } else {
      var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
      var thisOp = thisIter.next(length);
      var otherOp = otherIter.next(length);
      if (is.number(otherOp.retain)) {
        var newOp = {};
        if (is.number(thisOp.retain)) {
          newOp.retain = length;
        } else {
          newOp.insert = thisOp.insert;
        }
        // Preserve null when composing with a retain, otherwise remove it for inserts
        var attributes = op.attributes.compose(thisOp.attributes, otherOp.attributes, is.number(thisOp.retain));
        if (attributes) newOp.attributes = attributes;
        this.push(newOp);
      // Other op should be delete, we could be an insert or retain
      // Insert + delete cancels out
      } else if (is.number(otherOp['delete']) && is.number(thisOp.retain)) {
        this.push(otherOp);
      }
    }
  }
  return this.chop();
};

Delta.prototype.diff = function (other) {
  var strings = [this.ops, other.ops].map(function (ops) {
    return ops.map(function (op) {
      if (is.string(op.insert)) return op.insert;
      if (is.number(op.insert)) return NULL_CHARACTER;
      var prep = ops === other.ops ? 'on' : 'with';
      throw new Error('diff() called ' + prep + ' non-document');
    }).join('');
  });
  var diffResult = diff(strings[0], strings[1]);
  var thisIter = op.iterator(this.ops);
  var otherIter = op.iterator(other.ops);
  var delta = new Delta();
  diffResult.forEach(function (component) {
    var length = component[1].length;
    while (length > 0) {
      var opLength = 0;
      switch (component[0]) {
        case diff.INSERT:
          opLength = Math.min(otherIter.peekLength(), length);
          delta.push(otherIter.next(opLength));
          break;
        case diff.DELETE:
          opLength = Math.min(length, thisIter.peekLength());
          thisIter.next(opLength);
          delta['delete'](opLength);
          break;
        case diff.EQUAL:
          opLength = Math.min(thisIter.peekLength(), otherIter.peekLength(), length);
          var thisOp = thisIter.next(opLength);
          var otherOp = otherIter.next(opLength);
          if (thisOp.insert === otherOp.insert) {
            delta.retain(opLength, op.attributes.diff(thisOp.attributes, otherOp.attributes));
          } else {
            delta.push(otherOp)['delete'](opLength);
          }
          break;
      }
      length -= opLength;
    }
  });
  return delta.chop();
};

Delta.prototype.transform = function (other, priority) {
  priority = !!priority;
  if (is.number(other)) {
    return this.transformPosition(other, priority);
  }
  var thisIter = op.iterator(this.ops);
  var otherIter = op.iterator(other.ops);
  var delta = new Delta();
  while (thisIter.hasNext() || otherIter.hasNext()) {
    if (thisIter.peekType() === 'insert' && (priority || otherIter.peekType() !== 'insert')) {
      delta.retain(op.length(thisIter.next()));
    } else if (otherIter.peekType() === 'insert') {
      delta.push(otherIter.next());
    } else {
      var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
      var thisOp = thisIter.next(length);
      var otherOp = otherIter.next(length);
      if (thisOp['delete']) {
        // Our delete either makes their delete redundant or removes their retain
        continue;
      } else if (otherOp['delete']) {
        delta.push(otherOp);
      } else {
        // We retain either their retain or insert
        delta.retain(length, op.attributes.transform(thisOp.attributes, otherOp.attributes, priority));
      }
    }
  }
  return delta.chop();
};

Delta.prototype.transformPosition = function (index, priority) {
  priority = !!priority;
  var thisIter = op.iterator(this.ops);
  var offset = 0;
  while (thisIter.hasNext() && offset <= index) {
    var length = thisIter.peekLength();
    var nextType = thisIter.peekType();
    thisIter.next();
    if (nextType === 'delete') {
      index -= Math.min(length, index - offset);
      continue;
    } else if (nextType === 'insert' && (offset < index || !priority)) {
      index += length;
    }
    offset += length;
  }
  return index;
};


module.exports = Delta;

},{"./is":4,"./op":5,"fast-diff":6}],4:[function(_dereq_,module,exports){
module.exports = {
  equal: function (a, b) {
    if (a === b) return true;
    if (a == null && b == null) return true;
    if (a == null || b == null) return false;
    if (Object.keys(a).length != Object.keys(b).length) return false;
    for(var key in a) {
      // Only compare one level deep
      if (a[key] !== b[key]) return false;
    }
    return true;
  },

  array: function (value) {
    return Array.isArray(value);
  },

  number: function (value) {
    if (typeof value === 'number') return true;
    if (typeof value === 'object' && Object.prototype.toString.call(value) === '[object Number]') return true;
    return false;
  },

  object: function (value) {
    if (!value) return false;
    return (typeof value === 'function' || typeof value === 'object');
  },

  string: function (value) {
    if (typeof value === 'string') return true;
    if (typeof value === 'object' && Object.prototype.toString.call(value) === '[object String]') return true;
    return false;
  }
};

},{}],5:[function(_dereq_,module,exports){
var is = _dereq_('./is');


var lib = {
  attributes: {
    clone: function (attributes, keepNull) {
      if (!is.object(attributes)) return {};
      return Object.keys(attributes).reduce(function (memo, key) {
        if (attributes[key] !== undefined && (attributes[key] !== null || keepNull)) {
          memo[key] = attributes[key];
        }
        return memo;
      }, {});
    },

    compose: function (a, b, keepNull) {
      if (!is.object(a)) a = {};
      if (!is.object(b)) b = {};
      var attributes = this.clone(b, keepNull);
      for (var key in a) {
        if (a[key] !== undefined && b[key] === undefined) {
          attributes[key] = a[key];
        }
      }
      return Object.keys(attributes).length > 0 ? attributes : undefined;
    },

    diff: function(a, b) {
      if (!is.object(a)) a = {};
      if (!is.object(b)) b = {};
      var attributes = Object.keys(a).concat(Object.keys(b)).reduce(function (attributes, key) {
        if (a[key] !== b[key]) {
          attributes[key] = b[key] === undefined ? null : b[key];
        }
        return attributes;
      }, {});
      return Object.keys(attributes).length > 0 ? attributes : undefined;
    },

    transform: function (a, b, priority) {
      if (!is.object(a)) return b;
      if (!is.object(b)) return undefined;
      if (!priority) return b;  // b simply overwrites us without priority
      var attributes = Object.keys(b).reduce(function (attributes, key) {
        if (a[key] === undefined) attributes[key] = b[key];  // null is a valid value
        return attributes;
      }, {});
      return Object.keys(attributes).length > 0 ? attributes : undefined;
    }
  },

  clone: function (op) {
    var newOp = this.attributes.clone(op);
    if (is.object(newOp.attributes)) {
      newOp.attributes = this.attributes.clone(newOp.attributes, true);
    }
    return newOp;
  },

  iterator: function (ops) {
    return new Iterator(ops);
  },

  length: function (op) {
    if (is.number(op['delete'])) {
      return op['delete'];
    } else if (is.number(op.retain)) {
      return op.retain;
    } else {
      return is.string(op.insert) ? op.insert.length : 1;
    }
  }
};


function Iterator(ops) {
  this.ops = ops;
  this.index = 0;
  this.offset = 0;
};

Iterator.prototype.hasNext = function () {
  return this.peekLength() < Infinity;
};

Iterator.prototype.next = function (length) {
  if (!length) length = Infinity;
  var nextOp = this.ops[this.index];
  if (nextOp) {
    var offset = this.offset;
    var opLength = lib.length(nextOp)
    if (length >= opLength - offset) {
      length = opLength - offset;
      this.index += 1;
      this.offset = 0;
    } else {
      this.offset += length;
    }
    if (is.number(nextOp['delete'])) {
      return { 'delete': length };
    } else {
      var retOp = {};
      if (nextOp.attributes) {
        retOp.attributes = nextOp.attributes;
      }
      if (is.number(nextOp.retain)) {
        retOp.retain = length;
      } else if (is.string(nextOp.insert)) {
        retOp.insert = nextOp.insert.substr(offset, length);
      } else {
        // offset should === 0, length should === 1
        retOp.insert = nextOp.insert;
      }
      return retOp;
    }
  } else {
    return { retain: Infinity };
  }
};

Iterator.prototype.peekLength = function () {
  if (this.ops[this.index]) {
    // Should never return 0 if our index is being managed correctly
    return lib.length(this.ops[this.index]) - this.offset;
  } else {
    return Infinity;
  }
};

Iterator.prototype.peekType = function () {
  if (this.ops[this.index]) {
    if (is.number(this.ops[this.index]['delete'])) {
      return 'delete';
    } else if (is.number(this.ops[this.index].retain)) {
      return 'retain';
    } else {
      return 'insert';
    }
  }
  return 'retain';
};


module.exports = lib;

},{"./is":4}],6:[function(_dereq_,module,exports){
/**
 * This library modifies the diff-patch-match library by Neil Fraser
 * by removing the patch and match functionality and certain advanced
 * options in the diff function. The original license is as follows:
 *
 * ===
 *
 * Diff Match and Patch
 *
 * Copyright 2006 Google Inc.
 * http://code.google.com/p/google-diff-match-patch/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * The data structure representing a diff is an array of tuples:
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
 */
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;


/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @return {Array} Array of diff tuples.
 */
function diff_main(text1, text2) {
  // Check for equality (speedup).
  if (text1 == text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }
    return [];
  }

  // Trim off common prefix (speedup).
  var commonlength = diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  // Trim off common suffix (speedup).
  commonlength = diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  // Compute the diff on the middle block.
  var diffs = diff_compute_(text1, text2);

  // Restore the prefix and suffix.
  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  diff_cleanupMerge(diffs);
  return diffs;
};


/**
 * Find the differences between two texts.  Assumes that the texts do not
 * have any common prefix or suffix.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @return {Array} Array of diff tuples.
 */
function diff_compute_(text1, text2) {
  var diffs;

  if (!text1) {
    // Just add some text (speedup).
    return [[DIFF_INSERT, text2]];
  }

  if (!text2) {
    // Just delete some text (speedup).
    return [[DIFF_DELETE, text1]];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i != -1) {
    // Shorter text is inside the longer text (speedup).
    diffs = [[DIFF_INSERT, longtext.substring(0, i)],
             [DIFF_EQUAL, shorttext],
             [DIFF_INSERT, longtext.substring(i + shorttext.length)]];
    // Swap insertions for deletions if diff is reversed.
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }

  if (shorttext.length == 1) {
    // Single character string.
    // After the previous speedup, the character can't be an equality.
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  }

  // Check to see if the problem can be split in two.
  var hm = diff_halfMatch_(text1, text2);
  if (hm) {
    // A half-match was found, sort out the return data.
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    // Send both pairs off for separate processing.
    var diffs_a = diff_main(text1_a, text2_a);
    var diffs_b = diff_main(text1_b, text2_b);
    // Merge the results.
    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
  }

  return diff_bisect_(text1, text2);
};


/**
 * Find the 'middle snake' of a diff, split the problem in two
 * and return the recursively constructed diff.
 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @return {Array} Array of diff tuples.
 * @private
 */
function diff_bisect_(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);
  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  // integers and undefined.
  for (var x = 0; x < v_length; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;
  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  var front = (delta % 2 != 0);
  // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.
  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d = 0; d < max_d; d++) {
    // Walk the front path one step.
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (x1 < text1_length && y1 < text2_length &&
             text1.charAt(x1) == text2.charAt(y1)) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2_length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
          // Mirror x2 onto top-left coordinate system.
          var x2 = text1_length - v2[k2_offset];
          if (x1 >= x2) {
            // Overlap detected.
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }

    // Walk the reverse path one step.
    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x2;
      if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
        x2 = v2[k2_offset + 1];
      } else {
        x2 = v2[k2_offset - 1] + 1;
      }
      var y2 = x2 - k2;
      while (x2 < text1_length && y2 < text2_length &&
             text1.charAt(text1_length - x2 - 1) ==
             text2.charAt(text2_length - y2 - 1)) {
        x2++;
        y2++;
      }
      v2[k2_offset] = x2;
      if (x2 > text1_length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2_length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;
          // Mirror x2 onto top-left coordinate system.
          x2 = text1_length - x2;
          if (x1 >= x2) {
            // Overlap detected.
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }
  }
  // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.
  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
};


/**
 * Given the location of the 'middle snake', split the diff in two parts
 * and recurse.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} x Index of split point in text1.
 * @param {number} y Index of split point in text2.
 * @return {Array} Array of diff tuples.
 */
function diff_bisectSplit_(text1, text2, x, y) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y);

  // Compute both diffs serially.
  var diffs = diff_main(text1a, text2a);
  var diffsb = diff_main(text1b, text2b);

  return diffs.concat(diffsb);
};


/**
 * Determine the common prefix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the start of each
 *     string.
 */
function diff_commonPrefix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (text1.substring(pointerstart, pointermid) ==
        text2.substring(pointerstart, pointermid)) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine the common suffix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of each string.
 */
function diff_commonSuffix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 ||
      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Do the two texts share a substring which is at least half the length of the
 * longer text?
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {Array.<string>} Five element Array, containing the prefix of
 *     text1, the suffix of text1, the prefix of text2, the suffix of
 *     text2 and the common middle.  Or null if there was no match.
 */
function diff_halfMatch_(text1, text2) {
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null;  // Pointless.
  }

  /**
   * Does a substring of shorttext exist within longtext such that the substring
   * is at least half the length of longtext?
   * Closure, but does not reference any external variables.
   * @param {string} longtext Longer string.
   * @param {string} shorttext Shorter string.
   * @param {number} i Start index of quarter length substring within longtext.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
   *     of shorttext and the common middle.  Or null if there was no match.
   * @private
   */
  function diff_halfMatchI_(longtext, shorttext, i) {
    // Start with a 1/4 length substring at position i as a seed.
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var best_common = '';
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
      var prefixLength = diff_commonPrefix(longtext.substring(i),
                                           shorttext.substring(j));
      var suffixLength = diff_commonSuffix(longtext.substring(0, i),
                                           shorttext.substring(0, j));
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext.substring(j - suffixLength, j) +
            shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext.length) {
      return [best_longtext_a, best_longtext_b,
              best_shorttext_a, best_shorttext_b, best_common];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  var hm1 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 4));
  // Check again based on the third quarter.
  var hm2 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 2));
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    // Both matched.  Select the longest.
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
};


/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {Array} diffs Array of diff tuples.
 */
function diff_cleanupMerge(diffs) {
  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  var commonlength;
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete + count_insert > 1) {
          if (count_delete !== 0 && count_insert !== 0) {
            // Factor out any common prefixies.
            commonlength = diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if ((pointer - count_delete - count_insert) > 0 &&
                  diffs[pointer - count_delete - count_insert - 1][0] ==
                  DIFF_EQUAL) {
                diffs[pointer - count_delete - count_insert - 1][1] +=
                    text_insert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, [DIFF_EQUAL,
                                    text_insert.substring(0, commonlength)]);
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            // Factor out any common suffixies.
            commonlength = diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] = text_insert.substring(text_insert.length -
                  commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(0, text_insert.length -
                  commonlength);
              text_delete = text_delete.substring(0, text_delete.length -
                  commonlength);
            }
          }
          // Delete the offending records and add the merged ones.
          if (count_delete === 0) {
            diffs.splice(pointer - count_insert,
                count_delete + count_insert, [DIFF_INSERT, text_insert]);
          } else if (count_insert === 0) {
            diffs.splice(pointer - count_delete,
                count_delete + count_insert, [DIFF_DELETE, text_delete]);
          } else {
            diffs.splice(pointer - count_delete - count_insert,
                count_delete + count_insert, [DIFF_DELETE, text_delete],
                [DIFF_INSERT, text_insert]);
          }
          pointer = pointer - count_delete - count_insert +
                    (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop();  // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  var changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (diffs[pointer][1].substring(diffs[pointer][1].length -
          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] +
            diffs[pointer][1].substring(0, diffs[pointer][1].length -
                                        diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
          diffs[pointer + 1][1]) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] =
            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
            diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    diff_cleanupMerge(diffs);
  }
};


var diff = diff_main;
diff.INSERT = DIFF_INSERT;
diff.DELETE = DIFF_DELETE;
diff.EQUAL = DIFF_EQUAL;


module.exports = diff;

},{}],7:[function(_dereq_,module,exports){
module.exports={"version":"0.19.10"}
},{}],8:[function(_dereq_,module,exports){
var Delta, Document, Format, Line, LinkedList, Normalizer, _, dom;

_ = _dereq_('lodash');

Delta = _dereq_('rich-text/lib/delta');

dom = _dereq_('../lib/dom');

Format = _dereq_('./format');

Line = _dereq_('./line');

LinkedList = _dereq_('../lib/linked-list');

Normalizer = _dereq_('./normalizer');

Document = (function() {
  function Document(root, options) {
    this.root = root;
    if (options == null) {
      options = {};
    }
    this.normalizer = new Normalizer();
    this.formats = {};
    _.each(options.formats, _.bind(this.addFormat, this));
    this.setHTML(this.root.innerHTML);
  }

  Document.prototype.addFormat = function(name, config) {
    if (!_.isObject(config)) {
      config = Format.FORMATS[name];
    }
    if (this.formats[name] != null) {
      console.warn('Overwriting format', name, this.formats[name]);
    }
    this.formats[name] = new Format(config);
    return this.normalizer.addFormat(config);
  };

  Document.prototype.appendLine = function(lineNode) {
    return this.insertLineBefore(lineNode, null);
  };

  Document.prototype.findLeafAt = function(index, inclusive) {
    var line, offset, ref;
    ref = this.findLineAt(index), line = ref[0], offset = ref[1];
    if (line != null) {
      return line.findLeafAt(offset, inclusive);
    } else {
      return [null, offset];
    }
  };

  Document.prototype.findLine = function(node) {
    var line;
    while ((node != null) && (dom.BLOCK_TAGS[node.tagName] == null)) {
      node = node.parentNode;
    }
    line = node != null ? this.lineMap[node.id] : null;
    if ((line != null ? line.node : void 0) === node) {
      return line;
    } else {
      return null;
    }
  };

  Document.prototype.findLineAt = function(index) {
    var curLine, length;
    if (!(this.lines.length > 0)) {
      return [null, index];
    }
    length = this.toDelta().length();
    if (index === length) {
      return [this.lines.last, this.lines.last.length];
    }
    if (index > length) {
      return [null, index - length];
    }
    curLine = this.lines.first;
    while (curLine != null) {
      if (index < curLine.length) {
        return [curLine, index];
      }
      index -= curLine.length;
      curLine = curLine.next;
    }
    return [null, index];
  };

  Document.prototype.getHTML = function() {
    var container, html;
    html = this.root.innerHTML;
    html = html.replace(/\>\s+\</g, '>&nbsp;<');
    container = document.createElement('div');
    container.innerHTML = html;
    _.each(container.querySelectorAll("." + Line.CLASS_NAME), function(node) {
      dom(node).removeClass(Line.CLASS_NAME);
      return node.removeAttribute('id');
    });
    return container.innerHTML;
  };

  Document.prototype.insertLineBefore = function(newLineNode, refLine) {
    var line;
    line = new Line(this, newLineNode);
    if (refLine != null) {
      if (!dom(newLineNode.parentNode).isElement()) {
        this.root.insertBefore(newLineNode, refLine.node);
      }
      this.lines.insertAfter(refLine.prev, line);
    } else {
      if (!dom(newLineNode.parentNode).isElement()) {
        this.root.appendChild(newLineNode);
      }
      this.lines.append(line);
    }
    this.lineMap[line.id] = line;
    return line;
  };

  Document.prototype.mergeLines = function(line, lineToMerge) {
    if (lineToMerge.length > 1) {
      if (line.length === 1) {
        dom(line.leaves.last.node).remove();
      }
      _.each(dom(lineToMerge.node).childNodes(), function(child) {
        if (child.tagName !== dom.DEFAULT_BREAK_TAG) {
          return line.node.appendChild(child);
        }
      });
    }
    this.removeLine(lineToMerge);
    return line.rebuild();
  };

  Document.prototype.optimizeLines = function() {
    return _.each(this.lines.toArray(), function(line, i) {
      line.optimize();
      return true;
    });
  };

  Document.prototype.rebuild = function() {
    var lineNode, lines, results;
    lines = this.lines.toArray();
    lineNode = this.root.firstChild;
    if ((lineNode != null) && (dom.LIST_TAGS[lineNode.tagName] != null)) {
      lineNode = lineNode.firstChild;
    }
    _.each(lines, (function(_this) {
      return function(line, index) {
        var newLine, ref;
        while (line.node !== lineNode) {
          if (line.node.parentNode === _this.root || ((ref = line.node.parentNode) != null ? ref.parentNode : void 0) === _this.root) {
            lineNode = _this.normalizer.normalizeLine(lineNode);
            newLine = _this.insertLineBefore(lineNode, line);
            lineNode = dom(lineNode).nextLineNode(_this.root);
          } else {
            return _this.removeLine(line);
          }
        }
        if (line.outerHTML !== lineNode.outerHTML) {
          line.node = _this.normalizer.normalizeLine(line.node);
          line.rebuild();
        }
        return lineNode = dom(lineNode).nextLineNode(_this.root);
      };
    })(this));
    results = [];
    while (lineNode != null) {
      lineNode = this.normalizer.normalizeLine(lineNode);
      this.appendLine(lineNode);
      results.push(lineNode = dom(lineNode).nextLineNode(this.root));
    }
    return results;
  };

  Document.prototype.removeLine = function(line) {
    if (line.node.parentNode != null) {
      if (dom.LIST_TAGS[line.node.parentNode.tagName] && line.node.parentNode.childNodes.length === 1) {
        dom(line.node.parentNode).remove();
      } else {
        dom(line.node).remove();
      }
    }
    delete this.lineMap[line.id];
    return this.lines.remove(line);
  };

  Document.prototype.setHTML = function(html) {
    html = Normalizer.stripComments(html);
    html = Normalizer.stripWhitespace(html);
    this.root.innerHTML = html;
    this.lines = new LinkedList();
    this.lineMap = {};
    return this.rebuild();
  };

  Document.prototype.splitLine = function(line, offset) {
    var lineNode1, lineNode2, newLine, ref;
    offset = Math.min(offset, line.length - 1);
    ref = dom(line.node).split(offset, true), lineNode1 = ref[0], lineNode2 = ref[1];
    line.node = lineNode1;
    line.rebuild();
    newLine = this.insertLineBefore(lineNode2, line.next);
    newLine.formats = _.clone(line.formats);
    newLine.resetContent();
    return newLine;
  };

  Document.prototype.toDelta = function() {
    var delta, lines;
    lines = this.lines.toArray();
    delta = new Delta();
    _.each(lines, function(line) {
      return _.each(line.delta.ops, function(op) {
        return delta.push(op);
      });
    });
    return delta;
  };

  return Document;

})();

module.exports = Document;



},{"../lib/dom":17,"../lib/linked-list":18,"./format":10,"./line":12,"./normalizer":13,"lodash":1,"rich-text/lib/delta":3}],9:[function(_dereq_,module,exports){
var Document, Editor, Line, Selection, _, dom;

_ = _dereq_('lodash');

dom = _dereq_('../lib/dom');

Document = _dereq_('./document');

Line = _dereq_('./line');

Selection = _dereq_('./selection');

Editor = (function() {
  Editor.sources = {
    API: 'api',
    SILENT: 'silent',
    USER: 'user'
  };

  function Editor(root, quill, options) {
    this.root = root;
    this.quill = quill;
    this.options = options != null ? options : {};
    this.root.setAttribute('id', this.options.id);
    this.doc = new Document(this.root, this.options);
    this.delta = this.doc.toDelta();
    this.length = this.delta.length();
    this.selection = new Selection(this.doc, this.quill);
    this.timer = setInterval(_.bind(this.checkUpdate, this), this.options.pollInterval);
    if (!this.options.readOnly) {
      this.enable();
    }
  }

  Editor.prototype.destroy = function() {
    return clearInterval(this.timer);
  };

  Editor.prototype.disable = function() {
    return this.enable(false);
  };

  Editor.prototype.enable = function(enabled) {
    if (enabled == null) {
      enabled = true;
    }
    return this.root.setAttribute('contenteditable', enabled);
  };

  Editor.prototype.applyDelta = function(delta, source) {
    var localDelta;
    localDelta = this._update();
    if (localDelta) {
      delta = localDelta.transform(delta, true);
      localDelta = delta.transform(localDelta, false);
    }
    if (delta.ops.length > 0) {
      delta = this._trackDelta((function(_this) {
        return function() {
          var index;
          index = 0;
          _.each(delta.ops, function(op) {
            if (_.isString(op.insert)) {
              _this._insertAt(index, op.insert, op.attributes);
              return index += op.insert.length;
            } else if (_.isNumber(op.insert)) {
              _this._insertAt(index, dom.EMBED_TEXT, op.attributes);
              return index += 1;
            } else if (_.isNumber(op["delete"])) {
              return _this._deleteAt(index, op["delete"]);
            } else if (_.isNumber(op.retain)) {
              _.each(op.attributes, function(value, name) {
                return _this._formatAt(index, op.retain, name, value);
              });
              return index += op.retain;
            }
          });
          return _this.selection.shiftAfter(0, 0, _.bind(_this.doc.optimizeLines, _this.doc));
        };
      })(this));
      this.delta = this.doc.toDelta();
      this.length = this.delta.length();
      this.innerHTML = this.root.innerHTML;
      if (delta && source !== Editor.sources.SILENT) {
        this.quill.emit(this.quill.constructor.events.TEXT_CHANGE, delta, source);
      }
    }
    if (localDelta && localDelta.ops.length > 0 && source !== Editor.sources.SILENT) {
      return this.quill.emit(this.quill.constructor.events.TEXT_CHANGE, localDelta, Editor.sources.USER);
    }
  };

  Editor.prototype.checkUpdate = function(source) {
    var delta;
    if (source == null) {
      source = 'user';
    }
    if (this.root.parentNode == null) {
      return clearInterval(this.timer);
    }
    delta = this._update();
    if (delta) {
      this.delta.compose(delta);
      this.length = this.delta.length();
      this.quill.emit(this.quill.constructor.events.TEXT_CHANGE, delta, source);
    }
    if (delta) {
      source = Editor.sources.SILENT;
    }
    return this.selection.update(source);
  };

  Editor.prototype.focus = function() {
    if (this.selection.range != null) {
      return this.selection.setRange(this.selection.range);
    } else {
      return this.root.focus();
    }
  };

  Editor.prototype.getBounds = function(index) {
    var bounds, containerBounds, leaf, offset, range, ref, side;
    this.checkUpdate();
    ref = this.doc.findLeafAt(index, true), leaf = ref[0], offset = ref[1];
    if (leaf == null) {
      throw new Error('Invalid index');
    }
    containerBounds = this.root.parentNode.getBoundingClientRect();
    side = 'left';
    if (leaf.length === 0) {
      bounds = leaf.node.parentNode.getBoundingClientRect();
    } else if (dom.VOID_TAGS[leaf.node.tagName]) {
      bounds = leaf.node.getBoundingClientRect();
      if (offset === 1) {
        side = 'right';
      }
    } else {
      range = document.createRange();
      if (offset < leaf.length) {
        range.setStart(leaf.node, offset);
        range.setEnd(leaf.node, offset + 1);
      } else {
        range.setStart(leaf.node, offset - 1);
        range.setEnd(leaf.node, offset);
        side = 'right';
      }
      bounds = range.getBoundingClientRect();
    }
    return {
      height: bounds.height,
      left: bounds[side] - containerBounds.left,
      top: bounds.top - containerBounds.top
    };
  };

  Editor.prototype._deleteAt = function(index, length) {
    if (length <= 0) {
      return;
    }
    return this.selection.shiftAfter(index, -1 * length, (function(_this) {
      return function() {
        var curLine, deleteLength, firstLine, mergeFirstLine, nextLine, offset, ref;
        ref = _this.doc.findLineAt(index), firstLine = ref[0], offset = ref[1];
        curLine = firstLine;
        mergeFirstLine = firstLine.length - offset <= length && offset > 0;
        while ((curLine != null) && length > 0) {
          nextLine = curLine.next;
          deleteLength = Math.min(curLine.length - offset, length);
          if (offset === 0 && length >= curLine.length) {
            _this.doc.removeLine(curLine);
          } else {
            curLine.deleteText(offset, deleteLength);
          }
          length -= deleteLength;
          curLine = nextLine;
          offset = 0;
        }
        if (mergeFirstLine && firstLine.next) {
          return _this.doc.mergeLines(firstLine, firstLine.next);
        }
      };
    })(this));
  };

  Editor.prototype._formatAt = function(index, length, name, value) {
    return this.selection.shiftAfter(index, 0, (function(_this) {
      return function() {
        var formatLength, line, offset, ref, results;
        ref = _this.doc.findLineAt(index), line = ref[0], offset = ref[1];
        results = [];
        while ((line != null) && length > 0) {
          formatLength = Math.min(length, line.length - offset - 1);
          line.formatText(offset, formatLength, name, value);
          length -= formatLength;
          if (length > 0) {
            line.format(name, value);
          }
          length -= 1;
          offset = 0;
          results.push(line = line.next);
        }
        return results;
      };
    })(this));
  };

  Editor.prototype._insertAt = function(index, text, formatting) {
    if (formatting == null) {
      formatting = {};
    }
    return this.selection.shiftAfter(index, text.length, (function(_this) {
      return function() {
        var line, lineTexts, offset, ref;
        text = text.replace(/\r\n?/g, '\n');
        lineTexts = text.split('\n');
        ref = _this.doc.findLineAt(index), line = ref[0], offset = ref[1];
        return _.each(lineTexts, function(lineText, i) {
          var nextLine;
          if ((line == null) || line.length <= offset) {
            if (i < lineTexts.length - 1 || lineText.length > 0) {
              line = _this.doc.appendLine(document.createElement(dom.DEFAULT_BLOCK_TAG));
              offset = 0;
              line.insertText(offset, lineText, formatting);
              line.format(formatting);
              nextLine = null;
            }
          } else {
            line.insertText(offset, lineText, formatting);
            if (i < lineTexts.length - 1) {
              nextLine = _this.doc.splitLine(line, offset + lineText.length);
              _.each(_.defaults({}, formatting, line.formats), function(value, format) {
                return line.format(format, formatting[format]);
              });
              offset = 0;
            }
          }
          return line = nextLine;
        });
      };
    })(this));
  };

  Editor.prototype._trackDelta = function(fn) {
    var delta, newDelta;
    fn();
    newDelta = this.doc.toDelta();
    delta = this.delta.diff(newDelta);
    return delta;
  };

  Editor.prototype._update = function() {
    var delta;
    if (this.innerHTML === this.root.innerHTML) {
      return false;
    }
    delta = this._trackDelta((function(_this) {
      return function() {
        _this.selection.preserve(_.bind(_this.doc.rebuild, _this.doc));
        return _this.selection.shiftAfter(0, 0, _.bind(_this.doc.optimizeLines, _this.doc));
      };
    })(this));
    this.innerHTML = this.root.innerHTML;
    if (delta.ops.length > 0) {
      return delta;
    } else {
      return false;
    }
  };

  return Editor;

})();

module.exports = Editor;



},{"../lib/dom":17,"./document":8,"./line":12,"./selection":14,"lodash":1}],10:[function(_dereq_,module,exports){
var Format, _, dom;

_ = _dereq_('lodash');

dom = _dereq_('../lib/dom');

Format = (function() {
  Format.types = {
    LINE: 'line'
  };

  Format.FORMATS = {
    bold: {
      tag: 'B',
      prepare: 'bold'
    },
    italic: {
      tag: 'I',
      prepare: 'italic'
    },
    underline: {
      tag: 'U',
      prepare: 'underline'
    },
    strike: {
      tag: 'S',
      prepare: 'strikeThrough'
    },
    color: {
      style: 'color',
      "default": 'rgb(0, 0, 0)',
      prepare: 'foreColor'
    },
    background: {
      style: 'backgroundColor',
      "default": 'rgb(255, 255, 255)',
      prepare: 'backColor'
    },
    font: {
      style: 'fontFamily',
      "default": "'Helvetica', 'Arial', sans-serif",
      prepare: 'fontName'
    },
    size: {
      style: 'fontSize',
      "default": '13px',
      prepare: function(value) {
        return document.execCommand('fontSize', false, dom.convertFontSize(value));
      }
    },
    link: {
      tag: 'A',
      attribute: 'href'
    },
    image: {
      tag: 'IMG',
      attribute: 'src'
    },
    align: {
      type: Format.types.LINE,
      style: 'textAlign',
      "default": 'left'
    },
    bullet: {
      type: Format.types.LINE,
      exclude: 'list',
      parentTag: 'UL',
      tag: 'LI'
    },
    list: {
      type: Format.types.LINE,
      exclude: 'bullet',
      parentTag: 'OL',
      tag: 'LI'
    }
  };

  function Format(config) {
    this.config = config;
  }

  Format.prototype.add = function(node, value) {
    var formatNode, inline, parentNode, ref, ref1;
    if (!value) {
      return this.remove(node);
    }
    if (this.value(node) === value) {
      return node;
    }
    if (_.isString(this.config.parentTag)) {
      parentNode = document.createElement(this.config.parentTag);
      dom(node).wrap(parentNode);
      if (node.parentNode.tagName === ((ref = node.parentNode.previousSibling) != null ? ref.tagName : void 0)) {
        dom(node.parentNode.previousSibling).merge(node.parentNode);
      }
      if (node.parentNode.tagName === ((ref1 = node.parentNode.nextSibling) != null ? ref1.tagName : void 0)) {
        dom(node.parentNode).merge(node.parentNode.nextSibling);
      }
    }
    if (_.isString(this.config.tag)) {
      formatNode = document.createElement(this.config.tag);
      if (dom.VOID_TAGS[formatNode.tagName] != null) {
        if (node.parentNode != null) {
          dom(node).replace(formatNode);
        }
        node = formatNode;
      } else if (this.isType(Format.types.LINE)) {
        node = dom(node).switchTag(this.config.tag);
      } else {
        dom(node).wrap(formatNode);
        node = formatNode;
      }
    }
    if (_.isString(this.config.style) || _.isString(this.config.attribute) || _.isString(this.config["class"])) {
      if (_.isString(this.config["class"])) {
        node = this.remove(node);
      }
      if (dom(node).isTextNode()) {
        inline = document.createElement(dom.DEFAULT_INLINE_TAG);
        dom(node).wrap(inline);
        node = inline;
      }
      if (_.isString(this.config.style)) {
        if (value !== this.config["default"]) {
          node.style[this.config.style] = value;
        }
      }
      if (_.isString(this.config.attribute)) {
        node.setAttribute(this.config.attribute, value);
      }
      if (_.isString(this.config["class"])) {
        dom(node).addClass(this.config["class"] + value);
      }
    }
    return node;
  };

  Format.prototype.isType = function(type) {
    return type === this.config.type;
  };

  Format.prototype.match = function(node) {
    var c, i, len, ref, ref1;
    if (!dom(node).isElement()) {
      return false;
    }
    if (_.isString(this.config.parentTag) && ((ref = node.parentNode) != null ? ref.tagName : void 0) !== this.config.parentTag) {
      return false;
    }
    if (_.isString(this.config.tag) && node.tagName !== this.config.tag) {
      return false;
    }
    if (_.isString(this.config.style) && (!node.style[this.config.style] || node.style[this.config.style] === this.config["default"])) {
      return false;
    }
    if (_.isString(this.config.attribute) && !node.hasAttribute(this.config.attribute)) {
      return false;
    }
    if (_.isString(this.config["class"])) {
      ref1 = dom(node).classes();
      for (i = 0, len = ref1.length; i < len; i++) {
        c = ref1[i];
        if (c.indexOf(this.config["class"]) === 0) {
          return true;
        }
      }
      return false;
    }
    return true;
  };

  Format.prototype.prepare = function(value) {
    if (_.isString(this.config.prepare)) {
      return document.execCommand(this.config.prepare, false, value);
    } else if (_.isFunction(this.config.prepare)) {
      return this.config.prepare(value);
    }
  };

  Format.prototype.remove = function(node) {
    var c, i, len, ref;
    if (!this.match(node)) {
      return node;
    }
    if (_.isString(this.config.style)) {
      node.style[this.config.style] = '';
      if (!node.getAttribute('style')) {
        node.removeAttribute('style');
      }
    }
    if (_.isString(this.config.attribute)) {
      node.removeAttribute(this.config.attribute);
    }
    if (_.isString(this.config["class"])) {
      ref = dom(node).classes();
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        if (c.indexOf(this.config["class"]) === 0) {
          dom(node).removeClass(c);
        }
      }
    }
    if (_.isString(this.config.tag)) {
      if (this.isType(Format.types.LINE)) {
        if (_.isString(this.config.parentTag)) {
          if (node.previousSibling != null) {
            dom(node).splitBefore(node.parentNode.parentNode);
          }
          if (node.nextSibling != null) {
            dom(node.nextSibling).splitBefore(node.parentNode.parentNode);
          }
        }
        node = dom(node).switchTag(dom.DEFAULT_BLOCK_TAG);
      } else {
        node = dom(node).switchTag(dom.DEFAULT_INLINE_TAG);
        if (dom.EMBED_TAGS[this.config.tag] != null) {
          dom(node).text(dom.EMBED_TEXT);
        }
      }
    }
    if (_.isString(this.config.parentTag)) {
      dom(node.parentNode).unwrap();
    }
    if (node.tagName === dom.DEFAULT_INLINE_TAG && !node.hasAttributes()) {
      node = dom(node).unwrap();
    }
    return node;
  };

  Format.prototype.value = function(node) {
    var c, i, len, ref;
    if (!this.match(node)) {
      return void 0;
    }
    if (_.isString(this.config.attribute)) {
      return node.getAttribute(this.config.attribute) || void 0;
    } else if (_.isString(this.config.style)) {
      return node.style[this.config.style] || void 0;
    } else if (_.isString(this.config["class"])) {
      ref = dom(node).classes();
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        if (c.indexOf(this.config["class"]) === 0) {
          return c.slice(this.config["class"].length);
        }
      }
    } else if (_.isString(this.config.tag)) {
      return true;
    }
    return void 0;
  };

  return Format;

})();

module.exports = Format;



},{"../lib/dom":17,"lodash":1}],11:[function(_dereq_,module,exports){
var Format, Leaf, LinkedList, _, dom,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = _dereq_('lodash');

dom = _dereq_('../lib/dom');

Format = _dereq_('./format');

LinkedList = _dereq_('../lib/linked-list');

Leaf = (function(superClass) {
  extend(Leaf, superClass);

  Leaf.ID_PREFIX = 'ql-leaf-';

  Leaf.isLeafNode = function(node) {
    return dom(node).isTextNode() || (node.firstChild == null);
  };

  function Leaf(node1, formats) {
    this.node = node1;
    this.formats = _.clone(formats);
    this.id = _.uniqueId(Leaf.ID_PREFIX);
    this.text = dom(this.node).text();
    this.length = this.text.length;
  }

  Leaf.prototype.deleteText = function(offset, length) {
    var textNode;
    if (!(length > 0)) {
      return;
    }
    this.text = this.text.slice(0, offset) + this.text.slice(offset + length);
    this.length = this.text.length;
    if (dom.EMBED_TAGS[this.node.tagName] != null) {
      textNode = document.createTextNode(this.text);
      return this.node = dom(this.node).replace(textNode);
    } else {
      return dom(this.node).text(this.text);
    }
  };

  Leaf.prototype.insertText = function(offset, text) {
    var textNode;
    this.text = this.text.slice(0, offset) + text + this.text.slice(offset);
    if (dom(this.node).isTextNode()) {
      dom(this.node).text(this.text);
    } else {
      textNode = document.createTextNode(text);
      if (this.node.tagName === dom.DEFAULT_BREAK_TAG) {
        this.node = dom(this.node).replace(textNode);
      } else {
        this.node.appendChild(textNode);
        this.node = textNode;
      }
    }
    return this.length = this.text.length;
  };

  return Leaf;

})(LinkedList.Node);

module.exports = Leaf;



},{"../lib/dom":17,"../lib/linked-list":18,"./format":10,"lodash":1}],12:[function(_dereq_,module,exports){
var Delta, Format, Leaf, Line, LinkedList, Normalizer, _, dom,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = _dereq_('lodash');

Delta = _dereq_('rich-text/lib/delta');

dom = _dereq_('../lib/dom');

Format = _dereq_('./format');

Leaf = _dereq_('./leaf');

Line = _dereq_('./line');

LinkedList = _dereq_('../lib/linked-list');

Normalizer = _dereq_('./normalizer');

Line = (function(superClass) {
  extend(Line, superClass);

  Line.CLASS_NAME = 'ql-line';

  Line.ID_PREFIX = 'ql-line-';

  function Line(doc, node1) {
    this.doc = doc;
    this.node = node1;
    this.id = _.uniqueId(Line.ID_PREFIX);
    this.formats = {};
    dom(this.node).addClass(Line.CLASS_NAME);
    this.rebuild();
    Line.__super__.constructor.call(this, this.node);
  }

  Line.prototype.buildLeaves = function(node, formats) {
    return _.each(dom(node).childNodes(), (function(_this) {
      return function(node) {
        var nodeFormats;
        node = _this.doc.normalizer.normalizeNode(node);
        nodeFormats = _.clone(formats);
        _.each(_this.doc.formats, function(format, name) {
          if (!format.isType(Format.types.LINE) && format.match(node)) {
            return nodeFormats[name] = format.value(node);
          }
        });
        if (Leaf.isLeafNode(node)) {
          return _this.leaves.append(new Leaf(node, nodeFormats));
        } else {
          return _this.buildLeaves(node, nodeFormats);
        }
      };
    })(this));
  };

  Line.prototype.deleteText = function(offset, length) {
    var deleteLength, leaf, ref;
    if (!(length > 0)) {
      return;
    }
    ref = this.findLeafAt(offset), leaf = ref[0], offset = ref[1];
    while ((leaf != null) && length > 0) {
      deleteLength = Math.min(length, leaf.length - offset);
      leaf.deleteText(offset, deleteLength);
      length -= deleteLength;
      leaf = leaf.next;
      offset = 0;
    }
    return this.rebuild();
  };

  Line.prototype.findLeaf = function(leafNode) {
    var curLeaf;
    curLeaf = this.leaves.first;
    while (curLeaf != null) {
      if (curLeaf.node === leafNode) {
        return curLeaf;
      }
      curLeaf = curLeaf.next;
    }
    return null;
  };

  Line.prototype.findLeafAt = function(offset, inclusive) {
    var leaf;
    if (inclusive == null) {
      inclusive = false;
    }
    if (offset >= this.length - 1) {
      return [this.leaves.last, this.leaves.last.length];
    }
    leaf = this.leaves.first;
    while (leaf != null) {
      if (offset < leaf.length || (offset === leaf.length && inclusive)) {
        return [leaf, offset];
      }
      offset -= leaf.length;
      leaf = leaf.next;
    }
    return [this.leaves.last, offset - this.leaves.last.length];
  };

  Line.prototype.format = function(name, value) {
    var formats;
    if (_.isObject(name)) {
      formats = name;
    } else {
      formats = {};
      formats[name] = value;
    }
    _.each(formats, (function(_this) {
      return function(value, name) {
        var excludeFormat, format;
        format = _this.doc.formats[name];
        if (format == null) {
          return;
        }
        if (format.isType(Format.types.LINE)) {
          if (format.config.exclude && _this.formats[format.config.exclude]) {
            excludeFormat = _this.doc.formats[format.config.exclude];
            if (excludeFormat != null) {
              _this.node = excludeFormat.remove(_this.node);
              delete _this.formats[format.config.exclude];
            }
          }
          _this.node = format.add(_this.node, value);
        }
        if (value) {
          return _this.formats[name] = value;
        } else {
          return delete _this.formats[name];
        }
      };
    })(this));
    return this.resetContent();
  };

  Line.prototype.formatText = function(offset, length, name, value) {
    var format, leaf, leafOffset, leftNode, nextLeaf, ref, ref1, ref2, rightNode, targetNode;
    ref = this.findLeafAt(offset), leaf = ref[0], leafOffset = ref[1];
    format = this.doc.formats[name];
    if (!((format != null) && format.config.type !== Format.types.LINE)) {
      return;
    }
    while ((leaf != null) && length > 0) {
      nextLeaf = leaf.next;
      if ((value && leaf.formats[name] !== value) || (!value && (leaf.formats[name] != null))) {
        targetNode = leaf.node;
        if (leaf.formats[name] != null) {
          dom(targetNode).splitBefore(this.node);
          while (!format.match(targetNode)) {
            targetNode = targetNode.parentNode;
          }
          dom(targetNode).split(leaf.length);
        }
        if (leafOffset > 0) {
          ref1 = dom(targetNode).split(leafOffset), leftNode = ref1[0], targetNode = ref1[1];
        }
        if (leaf.length > leafOffset + length) {
          ref2 = dom(targetNode).split(length), targetNode = ref2[0], rightNode = ref2[1];
        }
        format.add(targetNode, value);
      }
      length -= leaf.length - leafOffset;
      leafOffset = 0;
      leaf = nextLeaf;
    }
    return this.rebuild();
  };

  Line.prototype.insertText = function(offset, text, formats) {
    var leaf, leafOffset, nextNode, node, prevNode, ref, ref1;
    if (formats == null) {
      formats = {};
    }
    if (!(text.length > 0)) {
      return;
    }
    ref = this.findLeafAt(offset), leaf = ref[0], leafOffset = ref[1];
    if (_.isEqual(leaf.formats, formats)) {
      leaf.insertText(leafOffset, text);
      return this.resetContent();
    } else {
      node = _.reduce(formats, (function(_this) {
        return function(node, value, name) {
          var format;
          format = _this.doc.formats[name];
          if (format != null) {
            node = format.add(node, value);
          }
          return node;
        };
      })(this), document.createTextNode(text));
      ref1 = dom(leaf.node).split(leafOffset), prevNode = ref1[0], nextNode = ref1[1];
      if (nextNode) {
        nextNode = dom(nextNode).splitBefore(this.node).get();
      }
      this.node.insertBefore(node, nextNode);
      return this.rebuild();
    }
  };

  Line.prototype.optimize = function() {
    Normalizer.optimizeLine(this.node);
    return this.rebuild();
  };

  Line.prototype.rebuild = function(force) {
    if (force == null) {
      force = false;
    }
    if (!force && (this.outerHTML != null) && this.outerHTML === this.node.outerHTML) {
      if (_.all(this.leaves.toArray(), (function(_this) {
        return function(leaf) {
          return dom(leaf.node).isAncestor(_this.node);
        };
      })(this))) {
        return false;
      }
    }
    this.node = this.doc.normalizer.normalizeNode(this.node);
    if (dom(this.node).length() === 0 && !this.node.querySelector(dom.DEFAULT_BREAK_TAG)) {
      this.node.appendChild(document.createElement(dom.DEFAULT_BREAK_TAG));
    }
    this.leaves = new LinkedList();
    this.formats = _.reduce(this.doc.formats, (function(_this) {
      return function(formats, format, name) {
        if (format.isType(Format.types.LINE)) {
          if (format.match(_this.node)) {
            formats[name] = format.value(_this.node);
          } else {
            delete formats[name];
          }
        }
        return formats;
      };
    })(this), this.formats);
    this.buildLeaves(this.node, {});
    this.resetContent();
    return true;
  };

  Line.prototype.resetContent = function() {
    if (this.node.id !== this.id) {
      this.node.id = this.id;
    }
    this.outerHTML = this.node.outerHTML;
    this.length = 1;
    this.delta = new Delta();
    _.each(this.leaves.toArray(), (function(_this) {
      return function(leaf) {
        _this.length += leaf.length;
        if (dom.EMBED_TAGS[leaf.node.tagName] != null) {
          return _this.delta.insert(1, leaf.formats);
        } else {
          return _this.delta.insert(leaf.text, leaf.formats);
        }
      };
    })(this));
    return this.delta.insert('\n', this.formats);
  };

  return Line;

})(LinkedList.Node);

module.exports = Line;



},{"../lib/dom":17,"../lib/linked-list":18,"./format":10,"./leaf":11,"./line":12,"./normalizer":13,"lodash":1,"rich-text/lib/delta":3}],13:[function(_dereq_,module,exports){
var Normalizer, _, camelize, dom;

_ = _dereq_('lodash');

dom = _dereq_('../lib/dom');

camelize = function(str) {
  str = str.replace(/(?:^|[-_])(\w)/g, function(i, c) {
    if (c) {
      return c.toUpperCase();
    } else {
      return '';
    }
  });
  return str.charAt(0).toLowerCase() + str.slice(1);
};

Normalizer = (function() {
  Normalizer.ALIASES = {
    'STRONG': 'B',
    'EM': 'I',
    'DEL': 'S',
    'STRIKE': 'S'
  };

  Normalizer.ATTRIBUTES = {
    'color': 'color',
    'face': 'fontFamily',
    'size': 'fontSize'
  };

  function Normalizer() {
    this.whitelist = {
      styles: {},
      tags: {}
    };
    this.whitelist.tags[dom.DEFAULT_BREAK_TAG] = true;
    this.whitelist.tags[dom.DEFAULT_BLOCK_TAG] = true;
    this.whitelist.tags[dom.DEFAULT_INLINE_TAG] = true;
  }

  Normalizer.prototype.addFormat = function(config) {
    if (config.tag != null) {
      this.whitelist.tags[config.tag] = true;
    }
    if (config.parentTag != null) {
      this.whitelist.tags[config.parentTag] = true;
    }
    if (config.style != null) {
      return this.whitelist.styles[config.style] = true;
    }
  };

  Normalizer.prototype.normalizeLine = function(lineNode) {
    lineNode = Normalizer.wrapInline(lineNode);
    lineNode = Normalizer.handleBreaks(lineNode);
    lineNode = Normalizer.pullBlocks(lineNode);
    lineNode = this.normalizeNode(lineNode);
    Normalizer.unwrapText(lineNode);
    if ((lineNode != null) && (dom.LIST_TAGS[lineNode.tagName] != null)) {
      lineNode = lineNode.firstChild;
    }
    return lineNode;
  };

  Normalizer.prototype.normalizeNode = function(node) {
    if (dom(node).isTextNode()) {
      return node;
    }
    _.each(Normalizer.ATTRIBUTES, function(style, attribute) {
      var value;
      if (node.hasAttribute(attribute)) {
        value = node.getAttribute(attribute);
        if (attribute === 'size') {
          value = dom.convertFontSize(value);
        }
        node.style[style] = value;
        return node.removeAttribute(attribute);
      }
    });
    this.whitelistStyles(node);
    return this.whitelistTags(node);
  };

  Normalizer.prototype.whitelistStyles = function(node) {
    var original, styles;
    original = dom(node).styles();
    styles = _.omit(original, (function(_this) {
      return function(value, key) {
        return _this.whitelist.styles[camelize(key)] == null;
      };
    })(this));
    if (Object.keys(styles).length < Object.keys(original).length) {
      if (Object.keys(styles).length > 0) {
        return dom(node).styles(styles, true);
      } else {
        return node.removeAttribute('style');
      }
    }
  };

  Normalizer.prototype.whitelistTags = function(node) {
    if (!dom(node).isElement()) {
      return node;
    }
    if (Normalizer.ALIASES[node.tagName] != null) {
      node = dom(node).switchTag(Normalizer.ALIASES[node.tagName]);
    } else if (this.whitelist.tags[node.tagName] == null) {
      if (dom.BLOCK_TAGS[node.tagName] != null) {
        node = dom(node).switchTag(dom.DEFAULT_BLOCK_TAG);
      } else if (!node.hasAttributes() && (node.firstChild != null)) {
        node = dom(node).unwrap();
      } else {
        node = dom(node).switchTag(dom.DEFAULT_INLINE_TAG);
      }
    }
    return node;
  };

  Normalizer.handleBreaks = function(lineNode) {
    var breaks;
    breaks = _.map(lineNode.querySelectorAll(dom.DEFAULT_BREAK_TAG));
    _.each(breaks, (function(_this) {
      return function(br) {
        if ((br.nextSibling != null) && (!dom.isIE(10) || (br.previousSibling != null))) {
          return dom(br.nextSibling).splitBefore(lineNode.parentNode);
        }
      };
    })(this));
    return lineNode;
  };

  Normalizer.optimizeLine = function(lineNode) {
    var lineNodeLength, node, nodes, results;
    lineNode.normalize();
    lineNodeLength = dom(lineNode).length();
    nodes = dom(lineNode).descendants();
    results = [];
    while (nodes.length > 0) {
      node = nodes.pop();
      if ((node != null ? node.parentNode : void 0) == null) {
        continue;
      }
      if (dom.EMBED_TAGS[node.tagName] != null) {
        continue;
      }
      if (node.tagName === dom.DEFAULT_BREAK_TAG) {
        if (lineNodeLength !== 0) {
          results.push(dom(node).remove());
        } else {
          results.push(void 0);
        }
      } else if (dom(node).length() === 0) {
        nodes.push(node.nextSibling);
        results.push(dom(node).unwrap());
      } else if ((node.previousSibling != null) && node.tagName === node.previousSibling.tagName) {
        if (_.isEqual(dom(node).attributes(), dom(node.previousSibling).attributes())) {
          nodes.push(node.firstChild);
          results.push(dom(node.previousSibling).merge(node));
        } else {
          results.push(void 0);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Normalizer.pullBlocks = function(lineNode) {
    var curNode;
    curNode = lineNode.firstChild;
    while (curNode != null) {
      if ((dom.BLOCK_TAGS[curNode.tagName] != null) && curNode.tagName !== 'LI') {
        dom(curNode).isolate(lineNode.parentNode);
        if ((dom.LIST_TAGS[curNode.tagName] == null) || !curNode.firstChild) {
          dom(curNode).unwrap();
          Normalizer.pullBlocks(lineNode);
        } else {
          dom(curNode.parentNode).unwrap();
          if (lineNode.parentNode == null) {
            lineNode = curNode;
          }
        }
        break;
      }
      curNode = curNode.nextSibling;
    }
    return lineNode;
  };

  Normalizer.stripComments = function(html) {
    return html.replace(/<!--[\s\S]*?-->/g, '');
  };

  Normalizer.stripWhitespace = function(html) {
    html = html.trim();
    html = html.replace(/(\r?\n|\r)+/g, ' ');
    html = html.replace(/\>\s+\</g, '><');
    return html;
  };

  Normalizer.wrapInline = function(lineNode) {
    var blockNode, nextNode;
    if (dom.BLOCK_TAGS[lineNode.tagName] != null) {
      return lineNode;
    }
    blockNode = document.createElement(dom.DEFAULT_BLOCK_TAG);
    lineNode.parentNode.insertBefore(blockNode, lineNode);
    while ((lineNode != null) && (dom.BLOCK_TAGS[lineNode.tagName] == null)) {
      nextNode = lineNode.nextSibling;
      blockNode.appendChild(lineNode);
      lineNode = nextNode;
    }
    return blockNode;
  };

  Normalizer.unwrapText = function(lineNode) {
    var spans;
    spans = _.map(lineNode.querySelectorAll(dom.DEFAULT_INLINE_TAG));
    return _.each(spans, function(span) {
      if (!span.hasAttributes()) {
        return dom(span).unwrap();
      }
    });
  };

  return Normalizer;

})();

module.exports = Normalizer;



},{"../lib/dom":17,"lodash":1}],14:[function(_dereq_,module,exports){
var Leaf, Normalizer, Range, Selection, _, dom;

_ = _dereq_('lodash');

dom = _dereq_('../lib/dom');

Leaf = _dereq_('./leaf');

Normalizer = _dereq_('./normalizer');

Range = _dereq_('../lib/range');

Selection = (function() {
  function Selection(doc, emitter) {
    this.doc = doc;
    this.emitter = emitter;
    this.focus = false;
    this.range = new Range(0, 0);
    this.nullDelay = false;
    this.update('silent');
  }

  Selection.prototype.checkFocus = function() {
    return document.activeElement === this.doc.root;
  };

  Selection.prototype.getRange = function(ignoreFocus) {
    var end, nativeRange, start;
    if (ignoreFocus == null) {
      ignoreFocus = false;
    }
    if (this.checkFocus()) {
      nativeRange = this._getNativeRange();
      if (nativeRange == null) {
        return null;
      }
      start = this._positionToIndex(nativeRange.startContainer, nativeRange.startOffset);
      if (nativeRange.startContainer === nativeRange.endContainer && nativeRange.startOffset === nativeRange.endOffset) {
        end = start;
      } else {
        end = this._positionToIndex(nativeRange.endContainer, nativeRange.endOffset);
      }
      return new Range(Math.min(start, end), Math.max(start, end));
    } else if (ignoreFocus) {
      return this.range;
    } else {
      return null;
    }
  };

  Selection.prototype.preserve = function(fn) {
    var endNode, endOffset, nativeRange, ref, ref1, ref2, ref3, startNode, startOffset;
    nativeRange = this._getNativeRange();
    if ((nativeRange != null) && this.checkFocus()) {
      ref = this._encodePosition(nativeRange.startContainer, nativeRange.startOffset), startNode = ref[0], startOffset = ref[1];
      ref1 = this._encodePosition(nativeRange.endContainer, nativeRange.endOffset), endNode = ref1[0], endOffset = ref1[1];
      fn();
      ref2 = this._decodePosition(startNode, startOffset), startNode = ref2[0], startOffset = ref2[1];
      ref3 = this._decodePosition(endNode, endOffset), endNode = ref3[0], endOffset = ref3[1];
      return this._setNativeRange(startNode, startOffset, endNode, endOffset);
    } else {
      return fn();
    }
  };

  Selection.prototype.setRange = function(range, source) {
    var endNode, endOffset, ref, ref1, ref2, startNode, startOffset;
    if (range != null) {
      ref = this._indexToPosition(range.start), startNode = ref[0], startOffset = ref[1];
      if (range.isCollapsed()) {
        ref1 = [startNode, startOffset], endNode = ref1[0], endOffset = ref1[1];
      } else {
        ref2 = this._indexToPosition(range.end), endNode = ref2[0], endOffset = ref2[1];
      }
      this._setNativeRange(startNode, startOffset, endNode, endOffset);
    } else {
      this._setNativeRange(null);
    }
    return this.update(source);
  };

  Selection.prototype.shiftAfter = function(index, length, fn) {
    var range;
    range = this.getRange();
    fn();
    if (range != null) {
      range.shift(index, length);
      return this.setRange(range, 'silent');
    }
  };

  Selection.prototype.update = function(source) {
    var emit, focus, range, toEmit;
    focus = this.checkFocus();
    range = this.getRange(true);
    emit = source !== 'silent' && (!Range.compare(range, this.range) || focus !== this.focus);
    toEmit = focus ? range : null;
    if (toEmit === null && source === 'user' && !this.nullDelay) {
      return this.nullDelay = true;
    } else {
      this.nullDelay = false;
      this.range = range;
      this.focus = focus;
      if (emit) {
        return this.emitter.emit(this.emitter.constructor.events.SELECTION_CHANGE, toEmit, source);
      }
    }
  };

  Selection.prototype._decodePosition = function(node, offset) {
    var childIndex;
    if (dom(node).isElement()) {
      childIndex = dom(node.parentNode).childNodes().indexOf(node);
      offset += childIndex;
      node = node.parentNode;
    }
    return [node, offset];
  };

  Selection.prototype._encodePosition = function(node, offset) {
    var text;
    while (true) {
      if (dom(node).isTextNode() || node.tagName === dom.DEFAULT_BREAK_TAG || (dom.EMBED_TAGS[node.tagName] != null)) {
        return [node, offset];
      } else if (offset < node.childNodes.length) {
        node = node.childNodes[offset];
        offset = 0;
      } else if (node.childNodes.length === 0) {
        if (this.doc.normalizer.whitelist.tags[node.tagName] == null) {
          text = document.createTextNode('');
          node.appendChild(text);
          node = text;
        }
        return [node, 0];
      } else {
        node = node.lastChild;
        if (dom(node).isElement()) {
          if (node.tagName === dom.DEFAULT_BREAK_TAG || (dom.EMBED_TAGS[node.tagName] != null)) {
            return [node, 1];
          } else {
            offset = node.childNodes.length;
          }
        } else {
          return [node, dom(node).length()];
        }
      }
    }
  };

  Selection.prototype._getNativeRange = function() {
    var range, selection;
    selection = document.getSelection();
    if ((selection != null ? selection.rangeCount : void 0) > 0) {
      range = selection.getRangeAt(0);
      if (dom(range.startContainer).isAncestor(this.doc.root, true)) {
        if (range.startContainer === range.endContainer || dom(range.endContainer).isAncestor(this.doc.root, true)) {
          return range;
        }
      }
    }
    return null;
  };

  Selection.prototype._indexToPosition = function(index) {
    var leaf, offset, ref;
    if (this.doc.lines.length === 0) {
      return [this.doc.root, 0];
    }
    ref = this.doc.findLeafAt(index, true), leaf = ref[0], offset = ref[1];
    return this._decodePosition(leaf.node, offset);
  };

  Selection.prototype._positionToIndex = function(node, offset) {
    var leaf, leafNode, leafOffset, line, lineOffset, ref;
    if (dom.isIE(10) && node.tagName === 'BR' && offset === 1) {
      offset = 0;
    }
    ref = this._encodePosition(node, offset), leafNode = ref[0], offset = ref[1];
    line = this.doc.findLine(leafNode);
    if (line == null) {
      return 0;
    }
    leaf = line.findLeaf(leafNode);
    lineOffset = 0;
    while (line.prev != null) {
      line = line.prev;
      lineOffset += line.length;
    }
    if (leaf == null) {
      return lineOffset;
    }
    leafOffset = 0;
    while (leaf.prev != null) {
      leaf = leaf.prev;
      leafOffset += leaf.length;
    }
    return lineOffset + leafOffset + offset;
  };

  Selection.prototype._setNativeRange = function(startNode, startOffset, endNode, endOffset) {
    var nativeRange, selection;
    selection = document.getSelection();
    if (!selection) {
      return;
    }
    if (startNode != null) {
      if (!this.checkFocus()) {
        this.doc.root.focus();
      }
      nativeRange = this._getNativeRange();
      if ((nativeRange == null) || startNode !== nativeRange.startContainer || startOffset !== nativeRange.startOffset || endNode !== nativeRange.endContainer || endOffset !== nativeRange.endOffset) {
        selection.removeAllRanges();
        nativeRange = document.createRange();
        nativeRange.setStart(startNode, startOffset);
        nativeRange.setEnd(endNode, endOffset);
        return selection.addRange(nativeRange);
      }
    } else {
      selection.removeAllRanges();
      this.doc.root.blur();
      if (dom.isIE(11) && !dom.isIE(9)) {
        return document.body.focus();
      }
    }
  };

  return Selection;

})();

module.exports = Selection;



},{"../lib/dom":17,"../lib/range":20,"./leaf":11,"./normalizer":13,"lodash":1}],15:[function(_dereq_,module,exports){
_dereq_('./modules/authorship');

_dereq_('./modules/image-tooltip');

_dereq_('./modules/keyboard');

_dereq_('./modules/link-tooltip');

_dereq_('./modules/multi-cursor');

_dereq_('./modules/paste-manager');

_dereq_('./modules/toolbar');

_dereq_('./modules/tooltip');

_dereq_('./modules/undo-manager');

module.exports = _dereq_('./quill');



},{"./modules/authorship":21,"./modules/image-tooltip":22,"./modules/keyboard":23,"./modules/link-tooltip":24,"./modules/multi-cursor":25,"./modules/paste-manager":26,"./modules/toolbar":27,"./modules/tooltip":28,"./modules/undo-manager":29,"./quill":30}],16:[function(_dereq_,module,exports){
var ColorPicker, Picker, dom,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

dom = _dereq_('./dom');

Picker = _dereq_('./picker');

ColorPicker = (function(superClass) {
  extend(ColorPicker, superClass);

  function ColorPicker() {
    ColorPicker.__super__.constructor.apply(this, arguments);
    dom(this.container).addClass('ql-color-picker');
  }

  ColorPicker.prototype.buildItem = function(picker, option, index) {
    var item;
    item = ColorPicker.__super__.buildItem.call(this, picker, option, index);
    item.style.backgroundColor = option.value;
    return item;
  };

  return ColorPicker;

})(Picker);

module.exports = ColorPicker;



},{"./dom":17,"./picker":19}],17:[function(_dereq_,module,exports){
var SelectWrapper, Wrapper, _, dom, lastKeyEvent,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = _dereq_('lodash');

lastKeyEvent = null;

Wrapper = (function() {
  function Wrapper(node1) {
    this.node = node1;
    this.trigger = bind(this.trigger, this);
  }

  Wrapper.prototype.addClass = function(cssClass) {
    if (this.hasClass(cssClass)) {
      return;
    }
    if (this.node.classList != null) {
      this.node.classList.add(cssClass);
    } else if (this.node.className != null) {
      this.node.className = (this.node.className + ' ' + cssClass).trim();
    }
    return this;
  };

  Wrapper.prototype.attributes = function(attributes) {
    var attr, i, j, len, ref, value;
    if (attributes) {
      _.each(attributes, (function(_this) {
        return function(value, name) {
          return _this.node.setAttribute(name, value);
        };
      })(this));
      return this;
    } else {
      if (this.node.attributes == null) {
        return {};
      }
      attributes = {};
      ref = this.node.attributes;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        value = ref[i];
        attr = this.node.attributes[i];
        attributes[attr.name] = attr.value;
      }
      return attributes;
    }
  };

  Wrapper.prototype.child = function(offset) {
    var child, length;
    child = this.node.firstChild;
    length = dom(child).length();
    while (child != null) {
      if (offset < length) {
        break;
      }
      offset -= length;
      child = child.nextSibling;
      length = dom(child).length();
    }
    if (child == null) {
      child = this.node.lastChild;
      offset = dom(child).length();
    }
    return [child, offset];
  };

  Wrapper.prototype.childNodes = function() {
    return _.map(this.node.childNodes);
  };

  Wrapper.prototype.classes = function() {
    return this.node.className.split(/\s+/);
  };

  Wrapper.prototype.descendants = function() {
    return _.map(this.node.getElementsByTagName('*'));
  };

  Wrapper.prototype.get = function() {
    return this.node;
  };

  Wrapper.prototype.hasClass = function(cssClass) {
    if (this.node.classList != null) {
      return this.node.classList.contains(cssClass);
    } else if (this.node.className != null) {
      return this.classes().indexOf(cssClass) > -1;
    }
    return false;
  };

  Wrapper.prototype.isAncestor = function(ancestor, inclusive) {
    var node;
    if (inclusive == null) {
      inclusive = false;
    }
    if (ancestor === this.node) {
      return inclusive;
    }
    node = this.node;
    while (node) {
      if (node === ancestor) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };

  Wrapper.prototype.isElement = function() {
    var ref;
    return ((ref = this.node) != null ? ref.nodeType : void 0) === dom.ELEMENT_NODE;
  };

  Wrapper.prototype.isTextNode = function() {
    var ref;
    return ((ref = this.node) != null ? ref.nodeType : void 0) === dom.TEXT_NODE;
  };

  Wrapper.prototype.isolate = function(root) {
    if (this.node.nextSibling != null) {
      dom(this.node.nextSibling).splitBefore(root);
    }
    this.splitBefore(root);
    return this;
  };

  Wrapper.prototype.length = function() {
    var length;
    if (this.node == null) {
      return 0;
    }
    length = this.text().length;
    if (this.isElement()) {
      length += this.node.querySelectorAll(Object.keys(dom.EMBED_TAGS).join(',')).length;
    }
    return length;
  };

  Wrapper.prototype.merge = function(node) {
    var $node;
    $node = dom(node);
    if (this.isElement()) {
      $node.moveChildren(this.node);
      this.normalize();
    } else {
      this.text(this.text() + $node.text());
    }
    $node.remove();
    return this;
  };

  Wrapper.prototype.moveChildren = function(newParent) {
    _.each(this.childNodes(), function(child) {
      return newParent.appendChild(child);
    });
    return this;
  };

  Wrapper.prototype.nextLineNode = function(root) {
    var nextNode;
    nextNode = this.node.nextSibling;
    if ((nextNode == null) && this.node.parentNode !== root) {
      nextNode = this.node.parentNode.nextSibling;
    }
    if ((nextNode != null) && (dom.LIST_TAGS[nextNode.tagName] != null)) {
      nextNode = nextNode.firstChild;
    }
    return nextNode;
  };

  Wrapper.prototype.normalize = function() {
    var $node, curNode, followingNode, nextNode;
    curNode = this.node.firstChild;
    while (curNode != null) {
      nextNode = curNode.nextSibling;
      $node = dom(curNode);
      if ((nextNode != null) && dom(nextNode).isTextNode()) {
        if ($node.text().length === 0) {
          $node.remove();
        } else if ($node.isTextNode()) {
          followingNode = nextNode.nextSibling;
          $node.merge(nextNode);
          nextNode = followingNode;
        }
      }
      curNode = nextNode;
    }
    return this;
  };

  Wrapper.prototype.on = function(eventName, listener) {
    this.node.addEventListener(eventName, (function(_this) {
      return function(event) {
        var arg, propagate;
        arg = lastKeyEvent && (eventName === 'keydown' || eventName === 'keyup') ? lastKeyEvent : event;
        propagate = listener.call(_this.node, arg);
        if (!propagate) {
          event.preventDefault();
          event.stopPropagation();
        }
        return propagate;
      };
    })(this));
    return this;
  };

  Wrapper.prototype.remove = function() {
    var ref;
    if ((ref = this.node.parentNode) != null) {
      ref.removeChild(this.node);
    }
    this.node = null;
    return null;
  };

  Wrapper.prototype.removeClass = function(cssClass) {
    var classArray;
    if (!this.hasClass(cssClass)) {
      return;
    }
    if (this.node.classList != null) {
      this.node.classList.remove(cssClass);
    } else if (this.node.className != null) {
      classArray = this.classes();
      classArray.splice(classArray.indexOf(cssClass), 1);
      this.node.className = classArray.join(' ');
    }
    if (!this.node.getAttribute('class')) {
      this.node.removeAttribute('class');
    }
    return this;
  };

  Wrapper.prototype.replace = function(newNode) {
    this.node.parentNode.replaceChild(newNode, this.node);
    this.node = newNode;
    return newNode;
  };

  Wrapper.prototype.splitBefore = function(root, force) {
    var nextNode, parentClone, parentNode, refNode;
    if (force == null) {
      force = false;
    }
    if (this.node === root || this.node.parentNode === root) {
      return this;
    }
    if ((this.node.previousSibling != null) || force) {
      parentNode = this.node.parentNode;
      parentClone = parentNode.cloneNode(false);
      parentNode.parentNode.insertBefore(parentClone, parentNode.nextSibling);
      refNode = this.node;
      while (refNode != null) {
        nextNode = refNode.nextSibling;
        parentClone.appendChild(refNode);
        refNode = nextNode;
      }
      return dom(parentClone).splitBefore(root);
    } else {
      return dom(this.node.parentNode).splitBefore(root);
    }
  };

  Wrapper.prototype.split = function(offset, force) {
    var after, child, childLeft, childRight, left, nextRight, nodeLength, ref, ref1, right;
    if (force == null) {
      force = false;
    }
    nodeLength = this.length();
    offset = Math.max(0, offset);
    offset = Math.min(offset, nodeLength);
    if (!(force || offset !== 0)) {
      return [this.node.previousSibling, this.node, false];
    }
    if (!(force || offset !== nodeLength)) {
      return [this.node, this.node.nextSibling, false];
    }
    if (this.node.nodeType === dom.TEXT_NODE) {
      after = this.node.splitText(offset);
      return [this.node, after, true];
    } else {
      left = this.node;
      right = this.node.cloneNode(false);
      this.node.parentNode.insertBefore(right, left.nextSibling);
      ref = this.child(offset), child = ref[0], offset = ref[1];
      ref1 = dom(child).split(offset), childLeft = ref1[0], childRight = ref1[1];
      while (childRight !== null) {
        nextRight = childRight.nextSibling;
        right.appendChild(childRight);
        childRight = nextRight;
      }
      return [left, right, true];
    }
  };

  Wrapper.prototype.styles = function(styles, overwrite) {
    var obj, styleString;
    if (overwrite == null) {
      overwrite = false;
    }
    if (styles) {
      if (!overwrite) {
        styles = _.defaults(styles, this.styles());
      }
      styleString = _.map(styles, function(style, name) {
        return name + ": " + style;
      }).join('; ') + ';';
      this.node.setAttribute('style', styleString);
      return this;
    } else {
      styleString = this.node.getAttribute('style') || '';
      obj = _.reduce(styleString.split(';'), function(styles, str) {
        var name, ref, value;
        ref = str.split(':'), name = ref[0], value = ref[1];
        if (name && value) {
          name = name.trim();
          value = value.trim();
          styles[name.toLowerCase()] = value;
        }
        return styles;
      }, {});
      return obj;
    }
  };

  Wrapper.prototype.switchTag = function(newTag) {
    var attributes, newNode;
    newTag = newTag.toUpperCase();
    if (this.node.tagName === newTag) {
      return this;
    }
    newNode = document.createElement(newTag);
    attributes = this.attributes();
    if (dom.VOID_TAGS[newTag] == null) {
      this.moveChildren(newNode);
    }
    this.replace(newNode);
    return this.attributes(attributes).get();
  };

  Wrapper.prototype.text = function(text) {
    if (text != null) {
      switch (this.node.nodeType) {
        case dom.ELEMENT_NODE:
          this.node.textContent = text;
          break;
        case dom.TEXT_NODE:
          this.node.data = text;
      }
      return this;
    } else {
      switch (this.node.nodeType) {
        case dom.ELEMENT_NODE:
          if (this.node.tagName === dom.DEFAULT_BREAK_TAG) {
            return "";
          }
          if (dom.EMBED_TAGS[this.node.tagName] != null) {
            return dom.EMBED_TEXT;
          }
          if (this.node.textContent != null) {
            return this.node.textContent;
          }
          return "";
        case dom.TEXT_NODE:
          return this.node.data || "";
        default:
          return "";
      }
    }
  };

  Wrapper.prototype.textNodes = function() {
    var textNode, textNodes, walker;
    walker = document.createTreeWalker(this.node, NodeFilter.SHOW_TEXT, null, false);
    textNodes = [];
    while (textNode = walker.nextNode()) {
      textNodes.push(textNode);
    }
    return textNodes;
  };

  Wrapper.prototype.toggleClass = function(className, state) {
    if (state == null) {
      state = !this.hasClass(className);
    }
    if (state) {
      this.addClass(className);
    } else {
      this.removeClass(className);
    }
    return this;
  };

  Wrapper.prototype.trigger = function(eventName, options) {
    var event, initFn, modifiers;
    if (options == null) {
      options = {};
    }
    if (['keypress', 'keydown', 'keyup'].indexOf(eventName) < 0) {
      event = document.createEvent('Event');
      event.initEvent(eventName, options.bubbles, options.cancelable);
    } else {
      event = document.createEvent('KeyboardEvent');
      lastKeyEvent = _.clone(options);
      if (_.isNumber(options.key)) {
        lastKeyEvent.which = options.key;
      } else if (_.isString(options.key)) {
        lastKeyEvent.which = options.key.toUpperCase().charCodeAt(0);
      } else {
        lastKeyEvent.which = 0;
      }
      if (dom.isIE(10)) {
        modifiers = [];
        if (options.altKey) {
          modifiers.push('Alt');
        }
        if (options.ctrlKey) {
          modifiers.push('Control');
        }
        if (options.metaKey) {
          modifiers.push('Meta');
        }
        if (options.shiftKey) {
          modifiers.push('Shift');
        }
        event.initKeyboardEvent(eventName, options.bubbles, options.cancelable, window, 0, 0, modifiers.join(' '), null, null);
      } else {
        initFn = _.isFunction(event.initKeyboardEvent) ? 'initKeyboardEvent' : 'initKeyEvent';
        event[initFn](eventName, options.bubbles, options.cancelable, window, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, 0, 0);
      }
    }
    this.node.dispatchEvent(event);
    lastKeyEvent = null;
    return this;
  };

  Wrapper.prototype.unwrap = function() {
    var next, ret;
    ret = this.node.firstChild;
    next = this.node.nextSibling;
    _.each(this.childNodes(), (function(_this) {
      return function(child) {
        return _this.node.parentNode.insertBefore(child, next);
      };
    })(this));
    this.remove();
    return ret;
  };

  Wrapper.prototype.wrap = function(wrapper) {
    var parent;
    if (this.node.parentNode != null) {
      this.node.parentNode.insertBefore(wrapper, this.node);
    }
    parent = wrapper;
    while (parent.firstChild != null) {
      parent = wrapper.firstChild;
    }
    parent.appendChild(this.node);
    return this;
  };

  return Wrapper;

})();

SelectWrapper = (function(superClass) {
  extend(SelectWrapper, superClass);

  function SelectWrapper() {
    return SelectWrapper.__super__.constructor.apply(this, arguments);
  }

  SelectWrapper.prototype["default"] = function() {
    return this.node.querySelector('option[selected]');
  };

  SelectWrapper.prototype.option = function(option, trigger) {
    var child, i, j, len, ref, value;
    if (trigger == null) {
      trigger = true;
    }
    value = _.isElement(option) ? option.value : option;
    if (value) {
      value = value.replace(/[^\w]+/g, '');
      ref = this.node.children;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        child = ref[i];
        if (child.value.replace(/[^\w]+/g, '') === value) {
          this.node.selectedIndex = i;
          break;
        }
      }
    } else {
      this.node.selectedIndex = -1;
    }
    if (trigger) {
      this.trigger('change');
    }
    return this;
  };

  SelectWrapper.prototype.reset = function(trigger) {
    var option;
    if (trigger == null) {
      trigger = true;
    }
    option = this["default"]();
    if (option != null) {
      option.selected = true;
    } else {
      this.node.selectedIndex = 0;
    }
    if (trigger) {
      this.trigger('change');
    }
    return this;
  };

  SelectWrapper.prototype.value = function() {
    if (this.node.selectedIndex > -1) {
      return this.node.options[this.node.selectedIndex].value;
    } else {
      return '';
    }
  };

  return SelectWrapper;

})(Wrapper);

dom = function(node) {
  if ((node != null ? node.tagName : void 0) === 'SELECT') {
    return new SelectWrapper(node);
  } else {
    return new Wrapper(node);
  }
};

dom = _.extend(dom, {
  ELEMENT_NODE: 1,
  NOBREAK_SPACE: "&nbsp;",
  TEXT_NODE: 3,
  ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF",
  DEFAULT_BLOCK_TAG: 'DIV',
  DEFAULT_BREAK_TAG: 'BR',
  DEFAULT_INLINE_TAG: 'SPAN',
  EMBED_TEXT: '!',
  FONT_SIZES: {
    '10px': 1,
    '13px': 2,
    '16px': 3,
    '18px': 4,
    '24px': 5,
    '32px': 6,
    '48px': 7
  },
  KEYS: {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46
  },
  BLOCK_TAGS: {
    'ADDRESS': 'ADDRESS',
    'ARTICLE': 'ARTICLE',
    'ASIDE': 'ASIDE',
    'AUDIO': 'AUDIO',
    'BLOCKQUOTE': 'BLOCKQUOTE',
    'CANVAS': 'CANVAS',
    'DD': 'DD',
    'DIV': 'DIV',
    'DL': 'DL',
    'FIGCAPTION': 'FIGCAPTION',
    'FIGURE': 'FIGURE',
    'FOOTER': 'FOOTER',
    'FORM': 'FORM',
    'H1': 'H1',
    'H2': 'H2',
    'H3': 'H3',
    'H4': 'H4',
    'H5': 'H5',
    'H6': 'H6',
    'HEADER': 'HEADER',
    'HGROUP': 'HGROUP',
    'LI': 'LI',
    'OL': 'OL',
    'OUTPUT': 'OUTPUT',
    'P': 'P',
    'PRE': 'PRE',
    'SECTION': 'SECTION',
    'TABLE': 'TABLE',
    'TBODY': 'TBODY',
    'TD': 'TD',
    'TFOOT': 'TFOOT',
    'TH': 'TH',
    'THEAD': 'THEAD',
    'TR': 'TR',
    'UL': 'UL',
    'VIDEO': 'VIDEO'
  },
  EMBED_TAGS: {
    'IMG': 'IMG'
  },
  LINE_TAGS: {
    'DIV': 'DIV',
    'LI': 'LI'
  },
  LIST_TAGS: {
    'OL': 'OL',
    'UL': 'UL'
  },
  VOID_TAGS: {
    'AREA': 'AREA',
    'BASE': 'BASE',
    'BR': 'BR',
    'COL': 'COL',
    'COMMAND': 'COMMAND',
    'EMBED': 'EMBED',
    'HR': 'HR',
    'IMG': 'IMG',
    'INPUT': 'INPUT',
    'KEYGEN': 'KEYGEN',
    'LINK': 'LINK',
    'META': 'META',
    'PARAM': 'PARAM',
    'SOURCE': 'SOURCE',
    'TRACK': 'TRACK',
    'WBR': 'WBR'
  },
  convertFontSize: function(size) {
    var i, s, sources, targets;
    if (_.isString(size) && size.indexOf('px') > -1) {
      sources = Object.keys(dom.FONT_SIZES);
      targets = _.values(dom.FONT_SIZES);
    } else {
      targets = Object.keys(dom.FONT_SIZES);
      sources = _.values(dom.FONT_SIZES);
    }
    for (i in sources) {
      s = sources[i];
      if (parseInt(size) <= parseInt(s)) {
        return targets[i];
      }
    }
    return _.last(targets);
  },
  isIE: function(maxVersion) {
    var version;
    version = document.documentMode;
    return version && maxVersion >= version;
  },
  isIOS: function() {
    return /iPhone|iPad/i.test(navigator.userAgent);
  },
  isMac: function() {
    return /Mac/i.test(navigator.platform);
  }
});

module.exports = dom;



},{"lodash":1}],18:[function(_dereq_,module,exports){
var LinkedList, Node;

Node = (function() {
  function Node(data) {
    this.data = data;
    this.prev = this.next = null;
  }

  return Node;

})();

LinkedList = (function() {
  LinkedList.Node = Node;

  function LinkedList() {
    this.length = 0;
    this.first = this.last = null;
  }

  LinkedList.prototype.append = function(node) {
    if (this.first != null) {
      node.next = null;
      this.last.next = node;
    } else {
      this.first = node;
    }
    node.prev = this.last;
    this.last = node;
    return this.length += 1;
  };

  LinkedList.prototype.insertAfter = function(refNode, newNode) {
    newNode.prev = refNode;
    if (refNode != null) {
      newNode.next = refNode.next;
      if (refNode.next != null) {
        refNode.next.prev = newNode;
      }
      refNode.next = newNode;
      if (refNode === this.last) {
        this.last = newNode;
      }
    } else {
      newNode.next = this.first;
      this.first.prev = newNode;
      this.first = newNode;
    }
    return this.length += 1;
  };

  LinkedList.prototype.remove = function(node) {
    if (this.length > 1) {
      if (node.prev != null) {
        node.prev.next = node.next;
      }
      if (node.next != null) {
        node.next.prev = node.prev;
      }
      if (node === this.first) {
        this.first = node.next;
      }
      if (node === this.last) {
        this.last = node.prev;
      }
    } else {
      this.first = this.last = null;
    }
    node.prev = node.next = null;
    return this.length -= 1;
  };

  LinkedList.prototype.toArray = function() {
    var arr, cur;
    arr = [];
    cur = this.first;
    while (cur != null) {
      arr.push(cur);
      cur = cur.next;
    }
    return arr;
  };

  return LinkedList;

})();

module.exports = LinkedList;



},{}],19:[function(_dereq_,module,exports){
var Normalizer, Picker, _, dom;

_ = _dereq_('lodash');

dom = _dereq_('./dom');

Normalizer = _dereq_('../core/normalizer');

Picker = (function() {
  Picker.TEMPLATE = '<span class="ql-picker-label"></span><span class="ql-picker-options"></span>';

  function Picker(select) {
    this.select = select;
    this.container = document.createElement('span');
    this.buildPicker();
    dom(this.container).addClass('ql-picker');
    this.select.style.display = 'none';
    this.select.parentNode.insertBefore(this.container, this.select);
    dom(document).on('click', (function(_this) {
      return function() {
        _this.close();
        return true;
      };
    })(this));
    dom(this.label).on('click', (function(_this) {
      return function() {
        _.defer(function() {
          return dom(_this.container).toggleClass('ql-expanded');
        });
        return false;
      };
    })(this));
    dom(this.select).on('change', (function(_this) {
      return function() {
        var item, option;
        if (_this.select.selectedIndex > -1) {
          item = _this.container.querySelectorAll('.ql-picker-item')[_this.select.selectedIndex];
          option = _this.select.options[_this.select.selectedIndex];
        }
        _this.selectItem(item, false);
        return dom(_this.label).toggleClass('ql-active', option !== dom(_this.select)["default"]());
      };
    })(this));
  }

  Picker.prototype.buildItem = function(picker, option, index) {
    var item;
    item = document.createElement('span');
    item.setAttribute('data-value', option.getAttribute('value'));
    dom(item).addClass('ql-picker-item').text(dom(option).text()).on('click', (function(_this) {
      return function() {
        _this.selectItem(item, true);
        return _this.close();
      };
    })(this));
    if (this.select.selectedIndex === index) {
      this.selectItem(item, false);
    }
    return item;
  };

  Picker.prototype.buildPicker = function() {
    var picker;
    _.each(dom(this.select).attributes(), (function(_this) {
      return function(value, name) {
        return _this.container.setAttribute(name, value);
      };
    })(this));
    this.container.innerHTML = Normalizer.stripWhitespace(Picker.TEMPLATE);
    this.label = this.container.querySelector('.ql-picker-label');
    picker = this.container.querySelector('.ql-picker-options');
    return _.each(this.select.options, (function(_this) {
      return function(option, i) {
        var item;
        item = _this.buildItem(picker, option, i);
        return picker.appendChild(item);
      };
    })(this));
  };

  Picker.prototype.close = function() {
    return dom(this.container).removeClass('ql-expanded');
  };

  Picker.prototype.selectItem = function(item, trigger) {
    var selected, value;
    selected = this.container.querySelector('.ql-selected');
    if (selected != null) {
      dom(selected).removeClass('ql-selected');
    }
    if (item != null) {
      value = item.getAttribute('data-value');
      dom(item).addClass('ql-selected');
      dom(this.label).text(dom(item).text());
      dom(this.select).option(value, trigger);
      return this.label.setAttribute('data-value', value);
    } else {
      this.label.innerHTML = '&nbsp;';
      return this.label.removeAttribute('data-value');
    }
  };

  return Picker;

})();

module.exports = Picker;



},{"../core/normalizer":13,"./dom":17,"lodash":1}],20:[function(_dereq_,module,exports){
var Range, _;

_ = _dereq_('lodash');

Range = (function() {
  Range.compare = function(r1, r2) {
    if (r1 === r2) {
      return true;
    }
    if (!((r1 != null) && (r2 != null))) {
      return false;
    }
    return r1.equals(r2);
  };

  function Range(start, end) {
    this.start = start;
    this.end = end;
  }

  Range.prototype.equals = function(range) {
    if (range == null) {
      return false;
    }
    return this.start === range.start && this.end === range.end;
  };

  Range.prototype.shift = function(index, length) {
    var ref;
    return ref = _.map([this.start, this.end], function(pos) {
      if (index > pos) {
        return pos;
      }
      if (length >= 0) {
        return pos + length;
      } else {
        return Math.max(index, pos + length);
      }
    }), this.start = ref[0], this.end = ref[1], ref;
  };

  Range.prototype.isCollapsed = function() {
    return this.start === this.end;
  };

  return Range;

})();

module.exports = Range;



},{"lodash":1}],21:[function(_dereq_,module,exports){
var Authorship, Delta, Quill, _, dom;

Quill = _dereq_('../quill');

_ = Quill.require('lodash');

dom = Quill.require('dom');

Delta = Quill.require('delta');

Authorship = (function() {
  Authorship.DEFAULTS = {
    authorId: null,
    color: 'transparent',
    enabled: false
  };

  function Authorship(quill, options) {
    this.quill = quill;
    this.options = options;
    if (this.options.button != null) {
      this.attachButton(this.options.button);
    }
    if (this.options.enabled) {
      this.enable();
    }
    this.quill.addFormat('author', {
      "class": 'author-'
    });
    if (this.options.authorId == null) {
      return;
    }
    this.quill.on(this.quill.constructor.events.PRE_EVENT, (function(_this) {
      return function(eventName, delta, origin) {
        var authorDelta, authorFormat;
        if (eventName === _this.quill.constructor.events.TEXT_CHANGE && origin === 'user') {
          authorDelta = new Delta();
          authorFormat = {
            author: _this.options.authorId
          };
          _.each(delta.ops, function(op) {
            if (op["delete"] != null) {
              return;
            }
            if ((op.insert != null) || ((op.retain != null) && (op.attributes != null))) {
              op.attributes || (op.attributes = {});
              op.attributes.author = _this.options.authorId;
              return authorDelta.retain(op.retain || op.insert.length || 1, authorFormat);
            } else {
              return authorDelta.retain(op.retain);
            }
          });
          return _this.quill.updateContents(authorDelta, Quill.sources.SILENT);
        }
      };
    })(this));
    this.addAuthor(this.options.authorId, this.options.color);
  }

  Authorship.prototype.addAuthor = function(id, color) {
    var styles;
    styles = {};
    styles[".authorship .author-" + id] = {
      "background-color": "" + color
    };
    return this.quill.theme.addStyles(styles);
  };

  Authorship.prototype.attachButton = function(button) {
    var $button;
    $button = dom(button);
    return $button.on('click', (function(_this) {
      return function() {
        $button.toggleClass('ql-on');
        return _this.enable($dom.hasClass('ql-on'));
      };
    })(this));
  };

  Authorship.prototype.enable = function(enabled) {
    if (enabled == null) {
      enabled = true;
    }
    return dom(this.quill.root).toggleClass('authorship', enabled);
  };

  Authorship.prototype.disable = function() {
    return this.enable(false);
  };

  return Authorship;

})();

Quill.registerModule('authorship', Authorship);

module.exports = Authorship;



},{"../quill":30}],22:[function(_dereq_,module,exports){
var Delta, ImageTooltip, Quill, Range, Tooltip, _, dom,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Quill = _dereq_('../quill');

Tooltip = _dereq_('./tooltip');

_ = Quill.require('lodash');

dom = Quill.require('dom');

Delta = Quill.require('delta');

Range = Quill.require('range');

ImageTooltip = (function(superClass) {
  extend(ImageTooltip, superClass);

  ImageTooltip.DEFAULTS = {
    template: '<input class="input" type="textbox"> <div class="preview"> <span>Preview</span> </div> <a href="javascript:;" class="cancel">Cancel</a> <a href="javascript:;" class="insert">Insert</a>'
  };

  function ImageTooltip(quill, options) {
    this.quill = quill;
    this.options = options;
    this.options = _.defaults(this.options, Tooltip.DEFAULTS);
    ImageTooltip.__super__.constructor.call(this, this.quill, this.options);
    this.preview = this.container.querySelector('.preview');
    this.textbox = this.container.querySelector('.input');
    dom(this.container).addClass('ql-image-tooltip');
    this.initListeners();
  }

  ImageTooltip.prototype.initListeners = function() {
    dom(this.container.querySelector('.insert')).on('click', _.bind(this.insertImage, this));
    dom(this.container.querySelector('.cancel')).on('click', _.bind(this.hide, this));
    dom(this.textbox).on('input', _.bind(this._preview, this));
    this.initTextbox(this.textbox, this.insertImage, this.hide);
    return this.quill.onModuleLoad('toolbar', (function(_this) {
      return function(toolbar) {
        return toolbar.initFormat('image', _.bind(_this._onToolbar, _this));
      };
    })(this));
  };

  ImageTooltip.prototype.insertImage = function() {
    var index, url;
    url = this._normalizeURL(this.textbox.value);
    if (this.range == null) {
      this.range = new Range(0, 0);
    }
    if (this.range) {
      this.preview.innerHTML = '<span>Preview</span>';
      this.textbox.value = '';
      index = this.range.end;
      this.quill.insertEmbed(index, 'image', url, 'user');
      this.quill.setSelection(index + 1, index + 1);
    }
    return this.hide();
  };

  ImageTooltip.prototype._onToolbar = function(range, value) {
    if (value) {
      if (!this.textbox.value) {
        this.textbox.value = 'http://';
      }
      this.show();
      this.textbox.focus();
      return _.defer((function(_this) {
        return function() {
          return _this.textbox.setSelectionRange(_this.textbox.value.length, _this.textbox.value.length);
        };
      })(this));
    } else {
      return this.quill.deleteText(range, 'user');
    }
  };

  ImageTooltip.prototype._preview = function() {
    var img;
    if (!this._matchImageURL(this.textbox.value)) {
      return;
    }
    if (this.preview.firstChild.tagName === 'IMG') {
      return this.preview.firstChild.setAttribute('src', this.textbox.value);
    } else {
      img = document.createElement('img');
      img.setAttribute('src', this.textbox.value);
      return this.preview.replaceChild(img, this.preview.firstChild);
    }
  };

  ImageTooltip.prototype._matchImageURL = function(url) {
    return /^https?:\/\/.+\.(jpe?g|gif|png)$/.test(url);
  };

  ImageTooltip.prototype._normalizeURL = function(url) {
    if (!/^https?:\/\//.test(url)) {
      url = 'http://' + url;
    }
    return url;
  };

  return ImageTooltip;

})(Tooltip);

Quill.registerModule('image-tooltip', ImageTooltip);

module.exports = ImageTooltip;



},{"../quill":30,"./tooltip":28}],23:[function(_dereq_,module,exports){
var Delta, Keyboard, Quill, _, dom;

Quill = _dereq_('../quill');

_ = Quill.require('lodash');

dom = Quill.require('dom');

Delta = Quill.require('delta');

Keyboard = (function() {
  Keyboard.hotkeys = {
    BOLD: {
      key: 'B',
      metaKey: true
    },
    INDENT: {
      key: dom.KEYS.TAB
    },
    ITALIC: {
      key: 'I',
      metaKey: true
    },
    OUTDENT: {
      key: dom.KEYS.TAB,
      shiftKey: true
    },
    UNDERLINE: {
      key: 'U',
      metaKey: true
    }
  };

  function Keyboard(quill, options) {
    this.quill = quill;
    this.hotkeys = {};
    this._initListeners();
    this._initHotkeys();
    this._initDeletes();
  }

  Keyboard.prototype.addHotkey = function(hotkeys, callback) {
    if (!Array.isArray(hotkeys)) {
      hotkeys = [hotkeys];
    }
    return _.each(hotkeys, (function(_this) {
      return function(hotkey) {
        var base, which;
        hotkey = _.isObject(hotkey) ? _.clone(hotkey) : {
          key: hotkey
        };
        hotkey.callback = callback;
        which = _.isNumber(hotkey.key) ? hotkey.key : hotkey.key.toUpperCase().charCodeAt(0);
        if ((base = _this.hotkeys)[which] == null) {
          base[which] = [];
        }
        return _this.hotkeys[which].push(hotkey);
      };
    })(this));
  };

  Keyboard.prototype.toggleFormat = function(range, format) {
    var delta, toolbar, value;
    if (range.isCollapsed()) {
      delta = this.quill.getContents(Math.max(0, range.start - 1), range.end);
    } else {
      delta = this.quill.getContents(range);
    }
    value = delta.ops.length === 0 || !_.all(delta.ops, function(op) {
      var ref;
      return (ref = op.attributes) != null ? ref[format] : void 0;
    });
    if (range.isCollapsed()) {
      this.quill.prepareFormat(format, value, Quill.sources.USER);
    } else {
      this.quill.formatText(range, format, value, Quill.sources.USER);
    }
    toolbar = this.quill.getModule('toolbar');
    if (toolbar != null) {
      return toolbar.setActive(format, value);
    }
  };

  Keyboard.prototype._initDeletes = function() {
    return this.addHotkey([dom.KEYS.DELETE, dom.KEYS.BACKSPACE], (function(_this) {
      return function(range, hotkey) {
        var format, line, offset, ref;
        if ((range != null) && _this.quill.getLength() > 0) {
          if (range.start !== range.end) {
            _this.quill.deleteText(range.start, range.end, Quill.sources.USER);
          } else {
            if (hotkey.key === dom.KEYS.BACKSPACE) {
              ref = _this.quill.editor.doc.findLineAt(range.start), line = ref[0], offset = ref[1];
              if (offset === 0 && (line.formats.bullet || line.formats.list)) {
                format = line.format.bullet ? 'bullet' : 'list';
                _this.quill.formatLine(range.start, range.start, format, false);
              } else if (range.start > 0) {
                _this.quill.deleteText(range.start - 1, range.start, Quill.sources.USER);
              }
            } else if (range.start < _this.quill.getLength()) {
              _this.quill.deleteText(range.start, range.start + 1, Quill.sources.USER);
            }
          }
        }
        return false;
      };
    })(this));
  };

  Keyboard.prototype._initHotkeys = function() {
    this.addHotkey(Keyboard.hotkeys.INDENT, (function(_this) {
      return function(range) {
        _this._onTab(range, false);
        return false;
      };
    })(this));
    this.addHotkey(Keyboard.hotkeys.OUTDENT, (function(_this) {
      return function(range) {
        return false;
      };
    })(this));
    return _.each(['bold', 'italic', 'underline'], (function(_this) {
      return function(format) {
        return _this.addHotkey(Keyboard.hotkeys[format.toUpperCase()], function(range) {
          _this.toggleFormat(range, format);
          return false;
        });
      };
    })(this));
  };

  Keyboard.prototype._initListeners = function() {
    return dom(this.quill.root).on('keydown', (function(_this) {
      return function(event) {
        var prevent;
        prevent = false;
        _.each(_this.hotkeys[event.which], function(hotkey) {
          var metaKey;
          metaKey = dom.isMac() ? event.metaKey : event.metaKey || event.ctrlKey;
          if (!!hotkey.metaKey !== !!metaKey) {
            return;
          }
          if (!!hotkey.shiftKey !== !!event.shiftKey) {
            return;
          }
          if (!!hotkey.altKey !== !!event.altKey) {
            return;
          }
          prevent = hotkey.callback(_this.quill.getSelection(), hotkey, event) === false || prevent;
          return true;
        });
        return !prevent;
      };
    })(this));
  };

  Keyboard.prototype._onTab = function(range, shift) {
    var delta;
    if (shift == null) {
      shift = false;
    }
    delta = new Delta().retain(range.start).insert("\t")["delete"](range.end - range.start).retain(this.quill.getLength() - range.end);
    this.quill.updateContents(delta, Quill.sources.USER);
    return this.quill.setSelection(range.start + 1, range.start + 1);
  };

  return Keyboard;

})();

Quill.registerModule('keyboard', Keyboard);

module.exports = Keyboard;



},{"../quill":30}],24:[function(_dereq_,module,exports){
var LinkTooltip, Quill, Tooltip, _, dom,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Quill = _dereq_('../quill');

Tooltip = _dereq_('./tooltip');

_ = Quill.require('lodash');

dom = Quill.require('dom');

LinkTooltip = (function(superClass) {
  extend(LinkTooltip, superClass);

  LinkTooltip.DEFAULTS = {
    maxLength: 50,
    template: '<span class="title">Visit URL:&nbsp;</span> <a href="#" class="url" target="_blank" href="about:blank"></a> <input class="input" type="text"> <span>&nbsp;&#45;&nbsp;</span> <a href="javascript:;" class="change">Change</a> <a href="javascript:;" class="remove">Remove</a> <a href="javascript:;" class="done">Done</a>'
  };

  LinkTooltip.hotkeys = {
    LINK: {
      key: 'K',
      metaKey: true
    }
  };

  function LinkTooltip(quill, options) {
    this.quill = quill;
    this.options = options;
    this.options = _.defaults(this.options, Tooltip.DEFAULTS);
    LinkTooltip.__super__.constructor.call(this, this.quill, this.options);
    dom(this.container).addClass('ql-link-tooltip');
    this.textbox = this.container.querySelector('.input');
    this.link = this.container.querySelector('.url');
    this.initListeners();
  }

  LinkTooltip.prototype.initListeners = function() {
    this.quill.on(this.quill.constructor.events.SELECTION_CHANGE, (function(_this) {
      return function(range) {
        var anchor;
        if (!((range != null) && range.isCollapsed())) {
          return;
        }
        anchor = _this._findAnchor(range);
        if (anchor) {
          _this.setMode(anchor.href, false);
          return _this.show(anchor);
        } else {
          _this.range = null;
          return _this.hide();
        }
      };
    })(this));
    dom(this.container.querySelector('.done')).on('click', _.bind(this.saveLink, this));
    dom(this.container.querySelector('.remove')).on('click', (function(_this) {
      return function() {
        return _this.removeLink(_this.range);
      };
    })(this));
    dom(this.container.querySelector('.change')).on('click', (function(_this) {
      return function() {
        return _this.setMode(_this.link.href, true);
      };
    })(this));
    this.initTextbox(this.textbox, this.saveLink, this.hide);
    this.quill.onModuleLoad('toolbar', (function(_this) {
      return function(toolbar) {
        _this.toolbar = toolbar;
        return toolbar.initFormat('link', _.bind(_this._onToolbar, _this));
      };
    })(this));
    return this.quill.onModuleLoad('keyboard', (function(_this) {
      return function(keyboard) {
        return keyboard.addHotkey(LinkTooltip.hotkeys.LINK, _.bind(_this._onKeyboard, _this));
      };
    })(this));
  };

  LinkTooltip.prototype.saveLink = function() {
    var anchor, url;
    url = this._normalizeURL(this.textbox.value);
    if (this.range != null) {
      if (this.range.isCollapsed()) {
        anchor = this._findAnchor(this.range);
        if (anchor != null) {
          anchor.href = url;
        }
      } else {
        this.quill.formatText(this.range, 'link', url, 'user');
      }
    }
    return this.setMode(url, false);
  };

  LinkTooltip.prototype.removeLink = function(range) {
    if (range.isCollapsed()) {
      range = this._expandRange(range);
    }
    this.quill.formatText(range, 'link', false, 'user');
    if (this.toolbar != null) {
      return this.toolbar.setActive('link', false);
    }
  };

  LinkTooltip.prototype.setMode = function(url, edit) {
    var text;
    if (edit == null) {
      edit = false;
    }
    if (edit) {
      this.textbox.value = url;
      _.defer((function(_this) {
        return function() {
          _this.textbox.focus();
          return _this.textbox.setSelectionRange(url.length, url.length);
        };
      })(this));
    } else {
      this.link.href = url;
      text = url.length > this.options.maxLength ? url.slice(0, this.options.maxLength) + '...' : url;
      dom(this.link).text(text);
    }
    return dom(this.container).toggleClass('editing', edit);
  };

  LinkTooltip.prototype._findAnchor = function(range) {
    var leaf, node, offset, ref;
    ref = this.quill.editor.doc.findLeafAt(range.start, true), leaf = ref[0], offset = ref[1];
    if (leaf != null) {
      node = leaf.node;
    }
    while (node != null) {
      if (node.tagName === 'A') {
        return node;
      }
      node = node.parentNode;
    }
    return null;
  };

  LinkTooltip.prototype._expandRange = function(range) {
    var end, leaf, offset, ref, start;
    ref = this.quill.editor.doc.findLeafAt(range.start, true), leaf = ref[0], offset = ref[1];
    start = range.start - offset;
    end = start + leaf.length;
    return {
      start: start,
      end: end
    };
  };

  LinkTooltip.prototype._onToolbar = function(range, value) {
    return this._toggle(range, value);
  };

  LinkTooltip.prototype._onKeyboard = function() {
    var range;
    range = this.quill.getSelection();
    return this._toggle(range, true);
  };

  LinkTooltip.prototype._toggle = function(range, value) {
    var nativeRange;
    if (!range) {
      return;
    }
    if (value && !range.isCollapsed()) {
      this.setMode(this._suggestURL(range), true);
      nativeRange = this.quill.editor.selection._getNativeRange();
      return this.show(nativeRange);
    } else {
      return this.removeLink(range);
    }
  };

  LinkTooltip.prototype._normalizeURL = function(url) {
    if (!/^(https?:\/\/|mailto:)/.test(url)) {
      url = 'http://' + url;
    }
    return url;
  };

  LinkTooltip.prototype._suggestURL = function(range) {
    var text;
    text = this.quill.getText(range);
    return this._normalizeURL(text);
  };

  return LinkTooltip;

})(Tooltip);

Quill.registerModule('link-tooltip', LinkTooltip);

module.exports = LinkTooltip;



},{"../quill":30,"./tooltip":28}],25:[function(_dereq_,module,exports){
var EventEmitter2, MultiCursor, Quill, _, dom,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Quill = _dereq_('../quill');

EventEmitter2 = _dereq_('eventemitter2').EventEmitter2;

_ = Quill.require('lodash');

dom = Quill.require('dom');

MultiCursor = (function(superClass) {
  extend(MultiCursor, superClass);

  MultiCursor.DEFAULTS = {
    template: '<span class="cursor-flag"> <span class="cursor-name"></span> </span> <span class="cursor-caret"></span>',
    timeout: 2500
  };

  MultiCursor.events = {
    CURSOR_ADDED: 'cursor-addded',
    CURSOR_MOVED: 'cursor-moved',
    CURSOR_REMOVED: 'cursor-removed'
  };

  function MultiCursor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.cursors = {};
    this.container = this.quill.addContainer('ql-multi-cursor', true);
    this.quill.on(this.quill.constructor.events.TEXT_CHANGE, _.bind(this._applyDelta, this));
  }

  MultiCursor.prototype.clearCursors = function() {
    _.each(Object.keys(this.cursors), _.bind(this.removeCursor, this));
    return this.cursors = {};
  };

  MultiCursor.prototype.moveCursor = function(userId, index) {
    var cursor;
    cursor = this.cursors[userId];
    cursor.index = index;
    dom(cursor.elem).removeClass('hidden');
    clearTimeout(cursor.timer);
    cursor.timer = setTimeout((function(_this) {
      return function() {
        dom(cursor.elem).addClass('hidden');
        return cursor.timer = null;
      };
    })(this), this.options.timeout);
    this._updateCursor(cursor);
    return cursor;
  };

  MultiCursor.prototype.removeCursor = function(userId) {
    var cursor;
    cursor = this.cursors[userId];
    this.emit(MultiCursor.events.CURSOR_REMOVED, cursor);
    if (cursor != null) {
      cursor.elem.parentNode.removeChild(cursor.elem);
    }
    return delete this.cursors[userId];
  };

  MultiCursor.prototype.setCursor = function(userId, index, name, color) {
    var cursor;
    if (this.cursors[userId] == null) {
      this.cursors[userId] = cursor = {
        userId: userId,
        index: index,
        color: color,
        elem: this._buildCursor(name, color)
      };
      this.emit(MultiCursor.events.CURSOR_ADDED, cursor);
    }
    _.defer((function(_this) {
      return function() {
        return _this.moveCursor(userId, index);
      };
    })(this));
    return this.cursors[userId];
  };

  MultiCursor.prototype.shiftCursors = function(index, length, authorId) {
    if (authorId == null) {
      authorId = null;
    }
    return _.each(this.cursors, (function(_this) {
      return function(cursor, id) {
        if (!(cursor && (cursor.index > index || cursor.userId === authorId))) {
          return;
        }
        return cursor.index += Math.max(length, index - cursor.index);
      };
    })(this));
  };

  MultiCursor.prototype.update = function() {
    return _.each(this.cursors, (function(_this) {
      return function(cursor, id) {
        if (cursor == null) {
          return;
        }
        _this._updateCursor(cursor);
        return true;
      };
    })(this));
  };

  MultiCursor.prototype._applyDelta = function(delta) {
    var index;
    index = 0;
    _.each(delta.ops, (function(_this) {
      return function(op) {
        var length, ref;
        length = 0;
        if (op.insert != null) {
          length = op.insert.length || 1;
          _this.shiftCursors(index, length, (ref = op.attributes) != null ? ref['author'] : void 0);
        } else if (op["delete"] != null) {
          _this.shiftCursors(index, -1 * op["delete"], null);
        } else if (op.retain != null) {
          _this.shiftCursors(index, 0, null);
          length = op.retain;
        }
        return index += length;
      };
    })(this));
    return this.update();
  };

  MultiCursor.prototype._buildCursor = function(name, color) {
    var cursor, cursorCaret, cursorFlag, cursorName;
    cursor = document.createElement('span');
    dom(cursor).addClass('cursor');
    cursor.innerHTML = this.options.template;
    cursorFlag = cursor.querySelector('.cursor-flag');
    cursorName = cursor.querySelector('.cursor-name');
    dom(cursorName).text(name);
    cursorCaret = cursor.querySelector('.cursor-caret');
    cursorCaret.style.backgroundColor = cursorName.style.backgroundColor = color;
    this.container.appendChild(cursor);
    return cursor;
  };

  MultiCursor.prototype._updateCursor = function(cursor) {
    var bounds, flag;
    bounds = this.quill.getBounds(cursor.index);
    cursor.elem.style.top = (bounds.top - this.quill.container.scrollTop) + 'px';
    cursor.elem.style.left = bounds.left + 'px';
    cursor.elem.style.height = bounds.height + 'px';
    flag = cursor.elem.querySelector('.cursor-flag');
    dom(cursor.elem).toggleClass('top', parseInt(cursor.elem.style.top) <= flag.offsetHeight).toggleClass('left', parseInt(cursor.elem.style.left) <= flag.offsetWidth).toggleClass('right', this.quill.root.offsetWidth - parseInt(cursor.elem.style.left) <= flag.offsetWidth);
    return this.emit(MultiCursor.events.CURSOR_MOVED, cursor);
  };

  return MultiCursor;

})(EventEmitter2);

Quill.registerModule('multi-cursor', MultiCursor);

module.exports = MultiCursor;



},{"../quill":30,"eventemitter2":2}],26:[function(_dereq_,module,exports){
var Delta, Document, PasteManager, Quill, _, dom;

Quill = _dereq_('../quill');

Document = _dereq_('../core/document');

_ = Quill.require('lodash');

dom = Quill.require('dom');

Delta = Quill.require('delta');

PasteManager = (function() {
  function PasteManager(quill, options) {
    this.quill = quill;
    this.options = options;
    this.container = this.quill.addContainer('ql-paste-manager');
    this.container.setAttribute('contenteditable', true);
    dom(this.quill.root).on('paste', _.bind(this._paste, this));
  }

  PasteManager.prototype._paste = function() {
    var oldDocLength, range;
    oldDocLength = this.quill.getLength();
    range = this.quill.getSelection();
    if (range == null) {
      return;
    }
    this.container.focus();
    return _.defer((function(_this) {
      return function() {
        var delta, doc, lengthAdded, line, lineBottom, offset, ref, windowBottom;
        doc = new Document(_this.container, _this.quill.options);
        delta = doc.toDelta();
        lengthAdded = delta.length() - 1;
        delta.compose(new Delta().retain(lengthAdded)["delete"](1));
        if (range.start > 0) {
          delta.ops.unshift({
            retain: range.start
          });
        }
        delta["delete"](range.end - range.start);
        _this.quill.updateContents(delta, 'user');
        _this.quill.setSelection(range.start + lengthAdded, range.start + lengthAdded);
        ref = _this.quill.editor.doc.findLineAt(range.start + lengthAdded), line = ref[0], offset = ref[1];
        lineBottom = line.node.getBoundingClientRect().bottom;
        windowBottom = document.documentElement.clientHeight;
        if (lineBottom > windowBottom) {
          line.node.scrollIntoView(false);
        }
        return _this.container.innerHTML = "";
      };
    })(this));
  };

  return PasteManager;

})();

Quill.registerModule('paste-manager', PasteManager);

module.exports = PasteManager;



},{"../core/document":8,"../quill":30}],27:[function(_dereq_,module,exports){
var Quill, Toolbar, _, dom;

Quill = _dereq_('../quill');

_ = Quill.require('lodash');

dom = Quill.require('dom');

Toolbar = (function() {
  Toolbar.DEFAULTS = {
    container: null
  };

  Toolbar.formats = {
    LINE: {
      'align': 'align',
      'bullet': 'bullet',
      'list': 'list'
    },
    SELECT: {
      'align': 'align',
      'background': 'background',
      'color': 'color',
      'font': 'font',
      'size': 'size'
    },
    TOGGLE: {
      'bold': 'bold',
      'bullet': 'bullet',
      'image': 'image',
      'italic': 'italic',
      'link': 'link',
      'list': 'list',
      'strike': 'strike',
      'underline': 'underline'
    },
    TOOLTIP: {
      'image': 'image',
      'link': 'link'
    }
  };

  function Toolbar(quill, options) {
    this.quill = quill;
    this.options = options;
    if (_.isString(this.options) || _.isElement(this.options)) {
      this.options = {
        container: this.options
      };
    }
    if (this.options.container == null) {
      throw new Error('container required for toolbar', this.options);
    }
    this.container = _.isString(this.options.container) ? document.querySelector(this.options.container) : this.options.container;
    this.inputs = {};
    this.preventUpdate = false;
    this.triggering = false;
    _.each(this.quill.options.formats, (function(_this) {
      return function(format) {
        if (Toolbar.formats.TOOLTIP[format] != null) {
          return;
        }
        return _this.initFormat(format, function(range, value) {
          if (_this.triggering) {
            return;
          }
          if (range.isCollapsed()) {
            _this.quill.prepareFormat(format, value, 'user');
          } else if (Toolbar.formats.LINE[format] != null) {
            _this.quill.formatLine(range, format, value, 'user');
          } else {
            _this.quill.formatText(range, format, value, 'user');
          }
          return _.defer(function() {
            _this.updateActive(range, ['bullet', 'list']);
            return _this.setActive(format, value);
          });
        });
      };
    })(this));
    this.quill.on(this.quill.constructor.events.SELECTION_CHANGE, (function(_this) {
      return function(range) {
        if (range != null) {
          return _this.updateActive(range);
        }
      };
    })(this));
    this.quill.onModuleLoad('keyboard', (function(_this) {
      return function(keyboard) {
        return keyboard.addHotkey([dom.KEYS.BACKSPACE, dom.KEYS.DELETE, dom.KEYS.ENTER], function() {
          return _.defer(_.bind(_this.updateActive, _this));
        });
      };
    })(this));
    dom(this.container).addClass('ql-toolbar');
    if (dom.isIOS()) {
      dom(this.container).addClass('ios');
    }
    if (dom.isIE(11)) {
      dom(this.container).on('mousedown', (function(_this) {
        return function() {
          return false;
        };
      })(this));
    }
  }

  Toolbar.prototype.initFormat = function(format, callback) {
    var eventName, input, selector;
    selector = ".ql-" + format;
    if (Toolbar.formats.SELECT[format] != null) {
      selector = "select" + selector;
      eventName = 'change';
    } else {
      eventName = 'click';
    }
    input = this.container.querySelector(selector);
    if (input == null) {
      return;
    }
    this.inputs[format] = input;
    return dom(input).on(eventName, (function(_this) {
      return function() {
        var range, value;
        value = eventName === 'change' ? dom(input).value() : !dom(input).hasClass('ql-active');
        _this.preventUpdate = true;
        _this.quill.focus();
        range = _this.quill.getSelection();
        if (range != null) {
          callback(range, value);
        }
        _this.preventUpdate = false;
        return true;
      };
    })(this));
  };

  Toolbar.prototype.setActive = function(format, value) {
    var $input, input, ref, selectValue;
    input = this.inputs[format];
    if (input == null) {
      return;
    }
    $input = dom(input);
    if (input.tagName === 'SELECT') {
      this.triggering = true;
      selectValue = $input.value(input);
      if (value == null) {
        value = (ref = $input["default"]()) != null ? ref.value : void 0;
      }
      if (Array.isArray(value)) {
        value = '';
      }
      if (value !== selectValue) {
        if (value != null) {
          $input.option(value);
        } else {
          $input.reset();
        }
      }
      return this.triggering = false;
    } else {
      return $input.toggleClass('ql-active', value || false);
    }
  };

  Toolbar.prototype.updateActive = function(range, formats) {
    var activeFormats;
    if (formats == null) {
      formats = null;
    }
    range || (range = this.quill.getSelection());
    if (!((range != null) && !this.preventUpdate)) {
      return;
    }
    activeFormats = this._getActive(range);
    return _.each(this.inputs, (function(_this) {
      return function(input, format) {
        if (!Array.isArray(formats) || formats.indexOf(format) > -1) {
          _this.setActive(format, activeFormats[format]);
        }
        return true;
      };
    })(this));
  };

  Toolbar.prototype._getActive = function(range) {
    var leafFormats, lineFormats;
    leafFormats = this._getLeafActive(range);
    lineFormats = this._getLineActive(range);
    return _.defaults({}, leafFormats, lineFormats);
  };

  Toolbar.prototype._getLeafActive = function(range) {
    var contents, formatsArr, line, offset, ref;
    if (range.isCollapsed()) {
      ref = this.quill.editor.doc.findLineAt(range.start), line = ref[0], offset = ref[1];
      if (offset === 0) {
        contents = this.quill.getContents(range.start, range.end + 1);
      } else {
        contents = this.quill.getContents(range.start - 1, range.end);
      }
    } else {
      contents = this.quill.getContents(range);
    }
    formatsArr = _.map(contents.ops, 'attributes');
    return this._intersectFormats(formatsArr);
  };

  Toolbar.prototype._getLineActive = function(range) {
    var firstLine, formatsArr, lastLine, offset, ref, ref1;
    formatsArr = [];
    ref = this.quill.editor.doc.findLineAt(range.start), firstLine = ref[0], offset = ref[1];
    ref1 = this.quill.editor.doc.findLineAt(range.end), lastLine = ref1[0], offset = ref1[1];
    if ((lastLine != null) && lastLine === firstLine) {
      lastLine = lastLine.next;
    }
    while ((firstLine != null) && firstLine !== lastLine) {
      formatsArr.push(_.clone(firstLine.formats));
      firstLine = firstLine.next;
    }
    return this._intersectFormats(formatsArr);
  };

  Toolbar.prototype._intersectFormats = function(formatsArr) {
    return _.reduce(formatsArr.slice(1), function(activeFormats, formats) {
      var activeKeys, added, formatKeys, intersection, missing;
      if (formats == null) {
        formats = {};
      }
      activeKeys = Object.keys(activeFormats);
      formatKeys = formats != null ? Object.keys(formats) : {};
      intersection = _.intersection(activeKeys, formatKeys);
      missing = _.difference(activeKeys, formatKeys);
      added = _.difference(formatKeys, activeKeys);
      _.each(intersection, function(name) {
        if (Toolbar.formats.SELECT[name] != null) {
          if (Array.isArray(activeFormats[name])) {
            if (activeFormats[name].indexOf(formats[name]) < 0) {
              return activeFormats[name].push(formats[name]);
            }
          } else if (activeFormats[name] !== formats[name]) {
            return activeFormats[name] = [activeFormats[name], formats[name]];
          }
        }
      });
      _.each(missing, function(name) {
        if (Toolbar.formats.TOGGLE[name] != null) {
          return delete activeFormats[name];
        } else if ((Toolbar.formats.SELECT[name] != null) && !Array.isArray(activeFormats[name])) {
          return activeFormats[name] = [activeFormats[name]];
        }
      });
      _.each(added, function(name) {
        if (Toolbar.formats.SELECT[name] != null) {
          return activeFormats[name] = [formats[name]];
        }
      });
      return activeFormats;
    }, formatsArr[0] || {});
  };

  return Toolbar;

})();

Quill.registerModule('toolbar', Toolbar);

module.exports = Toolbar;



},{"../quill":30}],28:[function(_dereq_,module,exports){
var Normalizer, Quill, Tooltip, _, dom;

Quill = _dereq_('../quill');

_ = Quill.require('lodash');

dom = Quill.require('dom');

Normalizer = Quill.require('normalizer');

Tooltip = (function() {
  Tooltip.DEFAULTS = {
    offset: 10,
    template: ''
  };

  Tooltip.HIDE_MARGIN = '-10000px';

  function Tooltip(quill, options) {
    this.quill = quill;
    this.options = options;
    this.container = this.quill.addContainer('ql-tooltip');
    this.container.innerHTML = Normalizer.stripWhitespace(this.options.template);
    dom(this.quill.root).on('focus', _.bind(this.hide, this));
    this.hide();
    this.quill.on(this.quill.constructor.events.TEXT_CHANGE, (function(_this) {
      return function(delta, source) {
        if (source === 'user' && _this.container.style.left !== Tooltip.HIDE_MARGIN) {
          _this.range = null;
          return _this.hide();
        }
      };
    })(this));
  }

  Tooltip.prototype.initTextbox = function(textbox, enterCallback, escapeCallback) {
    return dom(textbox).on('keyup', (function(_this) {
      return function(event) {
        switch (event.which) {
          case dom.KEYS.ENTER:
            return enterCallback.call(_this);
          case dom.KEYS.ESCAPE:
            return escapeCallback.call(_this);
          default:
            return true;
        }
      };
    })(this));
  };

  Tooltip.prototype.hide = function() {
    this.container.style.left = Tooltip.HIDE_MARGIN;
    if (this.range) {
      this.quill.setSelection(this.range);
    }
    return this.range = null;
  };

  Tooltip.prototype.position = function(reference) {
    var left, offsetBottom, offsetLeft, offsetTop, parentBounds, referenceBounds, top;
    if (reference != null) {
      referenceBounds = reference.getBoundingClientRect();
      parentBounds = this.quill.container.getBoundingClientRect();
      offsetLeft = referenceBounds.left - parentBounds.left;
      offsetTop = referenceBounds.top - parentBounds.top;
      offsetBottom = referenceBounds.bottom - parentBounds.bottom;
      left = offsetLeft + referenceBounds.width / 2 - this.container.offsetWidth / 2;
      top = offsetTop + referenceBounds.height + this.options.offset;
      if (top + this.container.offsetHeight > this.quill.container.offsetHeight) {
        top = offsetTop - this.container.offsetHeight - this.options.offset;
      }
      left = Math.max(0, Math.min(left, this.quill.container.offsetWidth - this.container.offsetWidth));
      top = Math.max(0, Math.min(top, this.quill.container.offsetHeight - this.container.offsetHeight));
    } else {
      left = this.quill.container.offsetWidth / 2 - this.container.offsetWidth / 2;
      top = this.quill.container.offsetHeight / 2 - this.container.offsetHeight / 2;
    }
    top += this.quill.container.scrollTop;
    return [left, top];
  };

  Tooltip.prototype.show = function(reference) {
    var left, ref, top;
    this.range = this.quill.getSelection();
    ref = this.position(reference), left = ref[0], top = ref[1];
    this.container.style.left = left + "px";
    this.container.style.top = top + "px";
    return this.container.focus();
  };

  return Tooltip;

})();

Quill.registerModule('tooltip', Tooltip);

module.exports = Tooltip;



},{"../quill":30}],29:[function(_dereq_,module,exports){
var Delta, Quill, UndoManager, _;

Quill = _dereq_('../quill');

_ = Quill.require('lodash');

Delta = Quill.require('delta');

UndoManager = (function() {
  UndoManager.DEFAULTS = {
    delay: 1000,
    maxStack: 100
  };

  UndoManager.hotkeys = {
    UNDO: {
      key: 'Z',
      metaKey: true
    },
    REDO: {
      key: 'Z',
      metaKey: true,
      shiftKey: true
    }
  };

  function UndoManager(quill, options) {
    this.quill = quill;
    this.options = options != null ? options : {};
    this.lastRecorded = 0;
    this.ignoreChange = false;
    this.clear();
    this.initListeners();
  }

  UndoManager.prototype.initListeners = function() {
    this.quill.onModuleLoad('keyboard', (function(_this) {
      return function(keyboard) {
        keyboard.addHotkey(UndoManager.hotkeys.UNDO, function() {
          _this.quill.editor.checkUpdate();
          _this.undo();
          return false;
        });
        return keyboard.addHotkey(UndoManager.hotkeys.REDO, function() {
          _this.quill.editor.checkUpdate();
          _this.redo();
          return false;
        });
      };
    })(this));
    return this.quill.on(this.quill.constructor.events.TEXT_CHANGE, (function(_this) {
      return function(delta, origin) {
        if (_this.ignoreChange) {
          return;
        }
        _this.record(delta, _this.oldDelta);
        return _this.oldDelta = _this.quill.getContents();
      };
    })(this));
  };

  UndoManager.prototype.clear = function() {
    this.stack = {
      undo: [],
      redo: []
    };
    return this.oldDelta = this.quill.getContents();
  };

  UndoManager.prototype.record = function(changeDelta, oldDelta) {
    var change, ignored, timestamp, undoDelta;
    if (!(changeDelta.ops.length > 0)) {
      return;
    }
    this.stack.redo = [];
    try {
      undoDelta = this.quill.getContents().diff(this.oldDelta);
      timestamp = new Date().getTime();
      if (this.lastRecorded + this.options.delay > timestamp && this.stack.undo.length > 0) {
        change = this.stack.undo.pop();
        undoDelta = undoDelta.compose(change.undo);
        changeDelta = change.redo.compose(changeDelta);
      } else {
        this.lastRecorded = timestamp;
      }
      this.stack.undo.push({
        redo: changeDelta,
        undo: undoDelta
      });
      if (this.stack.undo.length > this.options.maxStack) {
        return this.stack.undo.unshift();
      }
    } catch (_error) {
      ignored = _error;
      console.warn('Could not record change... clearing undo stack.');
      return this.clear();
    }
  };

  UndoManager.prototype.redo = function() {
    return this._change('redo', 'undo');
  };

  UndoManager.prototype.undo = function() {
    return this._change('undo', 'redo');
  };

  UndoManager.prototype._getLastChangeIndex = function(delta) {
    var index, lastIndex;
    lastIndex = 0;
    index = 0;
    _.each(delta.ops, function(op) {
      if (op.insert != null) {
        return lastIndex = Math.max(index + (op.insert.length || 1), lastIndex);
      } else if (op["delete"] != null) {
        return lastIndex = Math.max(index, lastIndex);
      } else if (op.retain != null) {
        if (op.attributes != null) {
          lastIndex = Math.max(index + op.retain, lastIndex);
        }
        return index += op.retain;
      }
    });
    return lastIndex;
  };

  UndoManager.prototype._change = function(source, dest) {
    var change, index;
    if (this.stack[source].length > 0) {
      change = this.stack[source].pop();
      this.lastRecorded = 0;
      this.ignoreChange = true;
      this.quill.updateContents(change[source], 'user');
      this.ignoreChange = false;
      index = this._getLastChangeIndex(change[source]);
      this.quill.setSelection(index, index);
      this.oldDelta = this.quill.getContents();
      return this.stack[dest].push(change);
    }
  };

  return UndoManager;

})();

Quill.registerModule('undo-manager', UndoManager);

module.exports = UndoManager;



},{"../quill":30}],30:[function(_dereq_,module,exports){
var Delta, Editor, EventEmitter2, Format, Normalizer, Quill, Range, _, dom, pkg,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

_ = _dereq_('lodash');

pkg = _dereq_('../package.json');

Delta = _dereq_('rich-text/lib/delta');

EventEmitter2 = _dereq_('eventemitter2').EventEmitter2;

dom = _dereq_('./lib/dom');

Editor = _dereq_('./core/editor');

Format = _dereq_('./core/format');

Normalizer = _dereq_('./core/normalizer');

Range = _dereq_('./lib/range');

Quill = (function(superClass) {
  extend(Quill, superClass);

  Quill.version = pkg.version;

  Quill.editors = [];

  Quill.modules = [];

  Quill.themes = [];

  Quill.DEFAULTS = {
    formats: ['align', 'bold', 'italic', 'strike', 'underline', 'color', 'background', 'font', 'size', 'link', 'image', 'bullet', 'list'],
    modules: {
      'keyboard': true,
      'paste-manager': true,
      'undo-manager': true
    },
    pollInterval: 100,
    readOnly: false,
    styles: {},
    theme: 'base'
  };

  Quill.events = {
    MODULE_INIT: 'module-init',
    POST_EVENT: 'post-event',
    PRE_EVENT: 'pre-event',
    SELECTION_CHANGE: 'selection-change',
    TEXT_CHANGE: 'text-change'
  };

  Quill.sources = Editor.sources;

  Quill.registerModule = function(name, module) {
    if (Quill.modules[name] != null) {
      console.warn("Overwriting " + name + " module");
    }
    return Quill.modules[name] = module;
  };

  Quill.registerTheme = function(name, theme) {
    if (Quill.themes[name] != null) {
      console.warn("Overwriting " + name + " theme");
    }
    return Quill.themes[name] = theme;
  };

  Quill.require = function(name) {
    switch (name) {
      case 'lodash':
        return _;
      case 'delta':
        return Delta;
      case 'normalizer':
        return Normalizer;
      case 'dom':
        return dom;
      case 'range':
        return Range;
      default:
        return null;
    }
  };

  function Quill(container1, options) {
    var html, moduleOptions, themeClass;
    this.container = container1;
    if (options == null) {
      options = {};
    }
    if (_.isString(this.container)) {
      this.container = document.querySelector(this.container);
    }
    if (this.container == null) {
      throw new Error('Invalid Quill container');
    }
    moduleOptions = _.defaults(options.modules || {}, Quill.DEFAULTS.modules);
    html = this.container.innerHTML;
    this.container.innerHTML = '';
    this.options = _.defaults(options, Quill.DEFAULTS);
    this.options.modules = moduleOptions;
    this.options.id = this.id = "ql-editor-" + (Quill.editors.length + 1);
    this.modules = {};
    this.root = this.addContainer('ql-editor');
    this.editor = new Editor(this.root, this, this.options);
    Quill.editors.push(this);
    this.setHTML(html, Quill.sources.SILENT);
    themeClass = Quill.themes[this.options.theme];
    if (themeClass == null) {
      throw new Error("Cannot load " + this.options.theme + " theme. Are you sure you registered it?");
    }
    this.theme = new themeClass(this, this.options);
    _.each(this.options.modules, (function(_this) {
      return function(option, name) {
        return _this.addModule(name, option);
      };
    })(this));
  }

  Quill.prototype.destroy = function() {
    var html;
    html = this.getHTML();
    _.each(this.modules, function(module, name) {
      if (_.isFunction(module.destroy)) {
        return module.destroy();
      }
    });
    this.editor.destroy();
    this.removeAllListeners();
    Quill.editors.splice(_.indexOf(Quill.editors, this), 1);
    return this.container.innerHTML = html;
  };

  Quill.prototype.addContainer = function(className, before) {
    var container, refNode;
    if (before == null) {
      before = false;
    }
    refNode = before ? this.root : null;
    container = document.createElement('div');
    dom(container).addClass(className);
    this.container.insertBefore(container, refNode);
    return container;
  };

  Quill.prototype.addFormat = function(name, format) {
    return this.editor.doc.addFormat(name, format);
  };

  Quill.prototype.addModule = function(name, options) {
    var moduleClass;
    moduleClass = Quill.modules[name];
    if (moduleClass == null) {
      throw new Error("Cannot load " + name + " module. Are you sure you registered it?");
    }
    if (options === true) {
      options = {};
    }
    options = _.defaults(options, this.theme.constructor.OPTIONS[name] || {}, moduleClass.DEFAULTS || {});
    this.modules[name] = new moduleClass(this, options);
    this.emit(Quill.events.MODULE_INIT, name, this.modules[name]);
    return this.modules[name];
  };

  Quill.prototype.deleteText = function(start, end, source) {
    var delta, formats, ref;
    if (source == null) {
      source = Quill.sources.API;
    }
    ref = this._buildParams(start, end, {}, source), start = ref[0], end = ref[1], formats = ref[2], source = ref[3];
    if (!(end > start)) {
      return;
    }
    delta = new Delta().retain(start)["delete"](end - start);
    return this.editor.applyDelta(delta, source);
  };

  Quill.prototype.emit = function() {
    var args, eventName;
    eventName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    Quill.__super__.emit.apply(this, [Quill.events.PRE_EVENT, eventName].concat(slice.call(args)));
    Quill.__super__.emit.apply(this, [eventName].concat(slice.call(args)));
    return Quill.__super__.emit.apply(this, [Quill.events.POST_EVENT, eventName].concat(slice.call(args)));
  };

  Quill.prototype.focus = function() {
    return this.editor.focus();
  };

  Quill.prototype.formatLine = function(start, end, name, value, source) {
    var formats, line, offset, ref, ref1;
    ref = this._buildParams(start, end, name, value, source), start = ref[0], end = ref[1], formats = ref[2], source = ref[3];
    ref1 = this.editor.doc.findLineAt(end), line = ref1[0], offset = ref1[1];
    if (line != null) {
      end += line.length - offset;
    }
    return this.formatText(start, end, formats, source);
  };

  Quill.prototype.formatText = function(start, end, name, value, source) {
    var delta, formats, ref;
    ref = this._buildParams(start, end, name, value, source), start = ref[0], end = ref[1], formats = ref[2], source = ref[3];
    formats = _.reduce(formats, (function(_this) {
      return function(formats, value, name) {
        var format;
        format = _this.editor.doc.formats[name];
        if (!(value && value !== format.config["default"])) {
          formats[name] = null;
        }
        return formats;
      };
    })(this), formats);
    delta = new Delta().retain(start).retain(end - start, formats);
    return this.editor.applyDelta(delta, source);
  };

  Quill.prototype.getBounds = function(index) {
    return this.editor.getBounds(index);
  };

  Quill.prototype.getContents = function(start, end) {
    if (start == null) {
      start = 0;
    }
    if (end == null) {
      end = null;
    }
    if (_.isObject(start)) {
      end = start.end;
      start = start.start;
    }
    return this.editor.delta.slice(start, end);
  };

  Quill.prototype.getHTML = function() {
    return this.editor.doc.getHTML();
  };

  Quill.prototype.getLength = function() {
    return this.editor.length;
  };

  Quill.prototype.getModule = function(name) {
    return this.modules[name];
  };

  Quill.prototype.getSelection = function() {
    this.editor.checkUpdate();
    return this.editor.selection.getRange();
  };

  Quill.prototype.getText = function(start, end) {
    if (start == null) {
      start = 0;
    }
    if (end == null) {
      end = null;
    }
    return _.map(this.getContents(start, end).ops, function(op) {
      if (_.isString(op.insert)) {
        return op.insert;
      } else {
        return '';
      }
    }).join('');
  };

  Quill.prototype.insertEmbed = function(index, type, url, source) {
    return this.insertText(index, dom.EMBED_TEXT, type, url, source);
  };

  Quill.prototype.insertText = function(index, text, name, value, source) {
    var delta, end, formats, ref;
    ref = this._buildParams(index, 0, name, value, source), index = ref[0], end = ref[1], formats = ref[2], source = ref[3];
    if (!(text.length > 0)) {
      return;
    }
    delta = new Delta().retain(index).insert(text, formats);
    return this.editor.applyDelta(delta, source);
  };

  Quill.prototype.onModuleLoad = function(name, callback) {
    if (this.modules[name]) {
      return callback(this.modules[name]);
    }
    return this.on(Quill.events.MODULE_INIT, function(moduleName, module) {
      if (moduleName === name) {
        return callback(module);
      }
    });
  };

  Quill.prototype.prepareFormat = function(name, value, source) {
    var format, range;
    if (source == null) {
      source = Quill.sources.API;
    }
    format = this.editor.doc.formats[name];
    if (format == null) {
      return;
    }
    range = this.getSelection();
    if (!(range != null ? range.isCollapsed() : void 0)) {
      return;
    }
    if (format.isType(Format.types.LINE)) {
      return this.formatLine(range, name, value, source);
    } else {
      return format.prepare(value);
    }
  };

  Quill.prototype.setContents = function(delta, source) {
    if (source == null) {
      source = Quill.sources.API;
    }
    if (Array.isArray(delta)) {
      delta = {
        ops: delta.slice()
      };
    } else {
      delta = {
        ops: delta.ops.slice()
      };
    }
    delta.ops.push({
      "delete": this.getLength()
    });
    return this.updateContents(delta, source);
  };

  Quill.prototype.setHTML = function(html, source) {
    if (source == null) {
      source = Quill.sources.API;
    }
    if (!html.trim()) {
      html = "<" + dom.DEFAULT_BLOCK_TAG + "><" + dom.DEFAULT_BREAK_TAG + "></" + dom.DEFAULT_BLOCK_TAG + ">";
    }
    this.editor.doc.setHTML(html);
    return this.editor.checkUpdate(source);
  };

  Quill.prototype.setSelection = function(start, end, source) {
    var range;
    if (source == null) {
      source = Quill.sources.API;
    }
    if (_.isNumber(start) && _.isNumber(end)) {
      range = new Range(start, end);
    } else {
      range = start;
      source = end || source;
    }
    return this.editor.selection.setRange(range, source);
  };

  Quill.prototype.setText = function(text, source) {
    var delta;
    if (source == null) {
      source = Quill.sources.API;
    }
    delta = new Delta().insert(text);
    return this.setContents(delta, source);
  };

  Quill.prototype.updateContents = function(delta, source) {
    if (source == null) {
      source = Quill.sources.API;
    }
    if (Array.isArray(delta)) {
      delta = {
        ops: delta
      };
    }
    return this.editor.applyDelta(delta, source);
  };

  Quill.prototype._buildParams = function() {
    var formats, params;
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (_.isObject(params[0])) {
      params.splice(0, 1, params[0].start, params[0].end);
    }
    if (_.isString(params[2])) {
      formats = {};
      formats[params[2]] = params[3];
      params.splice(2, 2, formats);
    }
    if (params[3] == null) {
      params[3] = Quill.sources.API;
    }
    return params;
  };

  return Quill;

})(EventEmitter2);

Quill.registerTheme('base', _dereq_('./themes/base'));

Quill.registerTheme('snow', _dereq_('./themes/snow'));

module.exports = Quill;



},{"../package.json":7,"./core/editor":9,"./core/format":10,"./core/normalizer":13,"./lib/dom":17,"./lib/range":20,"./themes/base":32,"./themes/snow":33,"eventemitter2":2,"lodash":1,"rich-text/lib/delta":3}],31:[function(_dereq_,module,exports){
module.exports = ".ql-image-tooltip{padding:10px;width:300px}.ql-image-tooltip:after{clear:both;content:\"\";display:table}.ql-image-tooltip a{border:1px solid #000;box-sizing:border-box;display:inline-block;float:left;padding:5px;text-align:center;width:50%}.ql-image-tooltip img{bottom:0;left:0;margin:auto;max-height:100%;max-width:100%;position:absolute;right:0;top:0}.ql-image-tooltip .input{box-sizing:border-box;width:100%}.ql-image-tooltip .preview{margin:10px 0;position:relative;border:1px dashed #000;height:200px}.ql-image-tooltip .preview span{display:inline-block;position:absolute;text-align:center;top:40%;width:100%}.ql-link-tooltip{padding:5px 10px}.ql-link-tooltip input.input{width:170px}.ql-link-tooltip a.done,.ql-link-tooltip input.input{display:none}.ql-link-tooltip a.change{margin-right:4px}.ql-link-tooltip.editing a.done,.ql-link-tooltip.editing input.input{display:inline-block}.ql-link-tooltip.editing a.change,.ql-link-tooltip.editing a.remove,.ql-link-tooltip.editing a.url{display:none}.ql-multi-cursor{position:absolute;left:0;top:0;z-index:1000}.ql-multi-cursor .cursor{margin-left:-1px;position:absolute}.ql-multi-cursor .cursor-flag{bottom:100%;position:absolute;white-space:nowrap}.ql-multi-cursor .cursor-name{display:inline-block;color:#fff;padding:2px 8px}.ql-multi-cursor .cursor-caret{height:100%;position:absolute;width:2px}.ql-multi-cursor .cursor.hidden .cursor-flag{display:none}.ql-multi-cursor .cursor.top .cursor-flag{bottom:auto;top:100%}.ql-multi-cursor .cursor.right .cursor-flag{right:-2px}.ql-paste-manager{left:-100000px;position:absolute;top:50%}.ql-toolbar{box-sizing:border-box}.ql-tooltip{background-color:#fff;border:1px solid #000;box-sizing:border-box;position:absolute;top:0;white-space:nowrap;z-index:2000}.ql-tooltip a{cursor:pointer;text-decoration:none}.ql-container{box-sizing:border-box;cursor:text;font-family:Helvetica,Arial,sans-serif;font-size:13px;height:100%;line-height:1.42;margin:0;overflow-x:hidden;overflow-y:auto;padding:12px 15px;position:relative}.ql-editor{box-sizing:border-box;min-height:100%;outline:0;tab-size:4;white-space:pre-wrap}.ql-editor div{margin:0;padding:0}.ql-editor a{text-decoration:underline}.ql-editor b{font-weight:700}.ql-editor i{font-style:italic}.ql-editor s{text-decoration:line-through}.ql-editor u{text-decoration:underline}.ql-editor img{max-width:100%}.ql-editor blockquote,.ql-editor ol,.ql-editor ul{margin:0 0 0 2em;padding:0}.ql-editor ol{list-style-type:decimal}.ql-editor ul{list-style-type:disc}.ql-editor.ql-ie-10 br,.ql-editor.ql-ie-9 br{display:none}";
},{}],32:[function(_dereq_,module,exports){
var BaseTheme, _, baseStyles, dom;

_ = _dereq_('lodash');

dom = _dereq_('../../lib/dom');

baseStyles = _dereq_('./base.styl');

BaseTheme = (function() {
  BaseTheme.OPTIONS = {};

  BaseTheme.objToCss = function(obj) {
    return _.map(obj, function(value, key) {
      var innerStr;
      innerStr = _.map(value, function(innerValue, innerKey) {
        return innerKey + ": " + innerValue + ";";
      }).join(' ');
      return key + " { " + innerStr + " }";
    }).join("\n");
  };

  function BaseTheme(quill, options) {
    var version;
    this.quill = quill;
    this.options = options;
    dom(this.quill.container).addClass('ql-container');
    if (this.options.styles) {
      this.addStyles(baseStyles + BaseTheme.objToCss(this.options.styles));
    }
    if (dom.isIE(10)) {
      version = dom.isIE(9) ? '9' : '10';
      dom(this.quill.root).addClass('ql-ie-' + version);
    }
  }

  BaseTheme.prototype.addStyles = function(css) {
    var style;
    if (_.isObject(css)) {
      css = BaseTheme.objToCss(css);
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    return document.head.appendChild(style);
  };

  return BaseTheme;

})();

module.exports = BaseTheme;



},{"../../lib/dom":17,"./base.styl":31,"lodash":1}],33:[function(_dereq_,module,exports){
var BaseTheme, ColorPicker, Picker, SnowTheme, _, dom,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = _dereq_('lodash');

ColorPicker = _dereq_('../../lib/color-picker');

BaseTheme = _dereq_('../base');

dom = _dereq_('../../lib/dom');

Picker = _dereq_('../../lib/picker');

SnowTheme = (function(superClass) {
  extend(SnowTheme, superClass);

  SnowTheme.COLORS = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008A00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"];

  SnowTheme.OPTIONS = {
    'multi-cursor': {
      template: '<span class="cursor-flag"> <span class="cursor-triangle top"></span> <span class="cursor-name"></span> <span class="cursor-triangle bottom"></span> </span> <span class="cursor-caret"></span>'
    }
  };

  function SnowTheme(quill, options) {
    this.quill = quill;
    this.options = options;
    SnowTheme.__super__.constructor.apply(this, arguments);
    dom(this.quill.container).addClass('ql-snow');
    this.pickers = [];
    this.quill.on(this.quill.constructor.events.SELECTION_CHANGE, (function(_this) {
      return function(range) {
        if (range != null) {
          return _.invoke(_this.pickers, 'close');
        }
      };
    })(this));
    this.quill.onModuleLoad('multi-cursor', _.bind(this.extendMultiCursor, this));
    this.quill.onModuleLoad('toolbar', _.bind(this.extendToolbar, this));
  }

  SnowTheme.prototype.extendMultiCursor = function(module) {
    return module.on(module.constructor.events.CURSOR_ADDED, function(cursor) {
      var bottomTriangle, topTriangle;
      bottomTriangle = cursor.elem.querySelector('.cursor-triangle.bottom');
      topTriangle = cursor.elem.querySelector('.cursor-triangle.top');
      return bottomTriangle.style.borderTopColor = topTriangle.style.borderBottomColor = cursor.color;
    });
  };

  SnowTheme.prototype.extendToolbar = function(module) {
    dom(module.container).addClass('ql-snow');
    _.each(['color', 'background', 'font', 'size', 'align'], (function(_this) {
      return function(format) {
        var picker, select;
        select = module.container.querySelector(".ql-" + format);
        if (select == null) {
          return;
        }
        switch (format) {
          case 'font':
          case 'size':
          case 'align':
            picker = new Picker(select);
            break;
          case 'color':
          case 'background':
            picker = new ColorPicker(select);
            _.each(picker.container.querySelectorAll('.ql-picker-item'), function(item, i) {
              if (i < 7) {
                return dom(item).addClass('ql-primary-color');
              }
            });
        }
        if (picker != null) {
          return _this.pickers.push(picker);
        }
      };
    })(this));
    return _.each(dom(module.container).textNodes(), function(node) {
      if (dom(node).text().trim().length === 0) {
        return dom(node).remove();
      }
    });
  };

  return SnowTheme;

})(BaseTheme);

module.exports = SnowTheme;



},{"../../lib/color-picker":16,"../../lib/dom":17,"../../lib/picker":19,"../base":32,"lodash":1}]},{},[15])(15)
});;
  var fullEditor = new Quill('#full-editor', {
    modules: {
      'toolbar': { container: '#full-toolbar' }
    }
  });
