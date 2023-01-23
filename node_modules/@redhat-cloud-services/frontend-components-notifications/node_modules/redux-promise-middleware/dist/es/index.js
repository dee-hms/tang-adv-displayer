function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import isPromise from './isPromise.js';
/**
 * For TypeScript support: Remember to check and make sure
 * that `index.d.ts` is also up to date with the implementation.
 */

export var ActionType = {
  Pending: 'PENDING',
  Fulfilled: 'FULFILLED',
  Rejected: 'REJECTED'
};
/**
 * Function: createPromise
 * Description: The main createPromise accepts a configuration
 * object and returns the middleware.
 */

export function createPromise() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultTypes = [ActionType.Pending, ActionType.Fulfilled, ActionType.Rejected];
  var PROMISE_TYPE_SUFFIXES = config.promiseTypeSuffixes || defaultTypes;
  var PROMISE_TYPE_DELIMITER = config.promiseTypeDelimiter === undefined ? '_' : config.promiseTypeDelimiter;
  return function (ref) {
    var dispatch = ref.dispatch;
    return function (next) {
      return function (action) {
        /**
         * Instantiate variables to hold:
         * (1) the promise
         * (2) the data for optimistic updates
         */
        var promise;
        var data;
        /**
         * There are multiple ways to dispatch a promise. The first step is to
         * determine if the promise is defined:
         * (a) explicitly (action.payload.promise is the promise)
         * (b) implicitly (action.payload is the promise)
         * (c) as an async function (returns a promise when called)
         *
         * If the promise is not defined in one of these three ways, we don't do
         * anything and move on to the next middleware in the middleware chain.
         */
        // Step 1a: Is there a payload?

        if (action.payload) {
          var PAYLOAD = action.payload; // Step 1.1: Is the promise implicitly defined?

          if (isPromise(PAYLOAD)) {
            promise = PAYLOAD;
          } // Step 1.2: Is the promise explicitly defined?
          else if (isPromise(PAYLOAD.promise)) {
              promise = PAYLOAD.promise;
              data = PAYLOAD.data;
            } // Step 1.3: Is the promise returned by an async function?
            else if (typeof PAYLOAD === 'function' || typeof PAYLOAD.promise === 'function') {
                promise = PAYLOAD.promise ? PAYLOAD.promise() : PAYLOAD();
                data = PAYLOAD.promise ? PAYLOAD.data : undefined; // Step 1.3.1: Is the return of action.payload a promise?

                if (!isPromise(promise)) {
                  // If not, move on to the next middleware.
                  return next(_objectSpread({}, action, {
                    payload: promise
                  }));
                }
              } // Step 1.4: If there's no promise, move on to the next middleware.
              else {
                  return next(action);
                } // Step 1b: If there's no payload, move on to the next middleware.

        } else {
          return next(action);
        }
        /**
         * Instantiate and define constants for:
         * (1) the action type
         * (2) the action meta
         */


        var TYPE = action.type;
        var META = action.meta;
        /**
         * Instantiate and define constants for the action type suffixes.
         * These are appended to the end of the action type.
         */

        var _PROMISE_TYPE_SUFFIXE = _slicedToArray(PROMISE_TYPE_SUFFIXES, 3),
            PENDING = _PROMISE_TYPE_SUFFIXE[0],
            FULFILLED = _PROMISE_TYPE_SUFFIXE[1],
            REJECTED = _PROMISE_TYPE_SUFFIXE[2];
        /**
         * Function: getAction
         * Description: This function constructs and returns a rejected
         * or fulfilled action object. The action object is based off the Flux
         * Standard Action (FSA).
         *
         * Given an original action with the type FOO:
         *
         * The rejected object model will be:
         * {
         *   error: true,
         *   type: 'FOO_REJECTED',
         *   payload: ...,
         *   meta: ... (optional)
         * }
         *
         * The fulfilled object model will be:
         * {
         *   type: 'FOO_FULFILLED',
         *   payload: ...,
         *   meta: ... (optional)
         * }
         */


        var getAction = function getAction(newPayload, isRejected) {
          return _objectSpread({
            // Concatenate the type string property.
            type: [TYPE, isRejected ? REJECTED : FULFILLED].join(PROMISE_TYPE_DELIMITER)
          }, newPayload === null || typeof newPayload === 'undefined' ? {} : {
            payload: newPayload
          }, {}, META !== undefined ? {
            meta: META
          } : {}, {}, isRejected ? {
            error: true
          } : {});
        };
        /**
         * Function: handleReject
         * Calls: getAction to construct the rejected action
         * Description: This function dispatches the rejected action and returns
         * the original Error object. Please note the developer is responsible
         * for constructing and throwing an Error object. The middleware does not
         * construct any Errors.
         */


        var handleReject = function handleReject(reason) {
          var rejectedAction = getAction(reason, true);
          dispatch(rejectedAction);
          throw reason;
        };
        /**
         * Function: handleFulfill
         * Calls: getAction to construct the fullfilled action
         * Description: This function dispatches the fulfilled action and
         * returns the success object. The success object should
         * contain the value and the dispatched action.
         */


        var handleFulfill = function handleFulfill() {
          var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          var resolvedAction = getAction(value, false);
          dispatch(resolvedAction);
          return {
            value: value,
            action: resolvedAction
          };
        };
        /**
         * First, dispatch the pending action:
         * This object describes the pending state of a promise and will include
         * any data (for optimistic updates) and/or meta from the original action.
         */


        next(_objectSpread({
          // Concatenate the type string.
          type: [TYPE, PENDING].join(PROMISE_TYPE_DELIMITER)
        }, data !== undefined ? {
          payload: data
        } : {}, {}, META !== undefined ? {
          meta: META
        } : {}));
        /**
         * Second, dispatch a rejected or fulfilled action and move on to the
         * next middleware.
         */

        return promise.then(handleFulfill, handleReject);
      };
    };
  };
}
export default function middleware() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      dispatch = _ref.dispatch;

  if (typeof dispatch === 'function') {
    return createPromise()({
      dispatch: dispatch
    });
  }

  if (process && process.env && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn("Redux Promise Middleware: As of version 6.0.0, the middleware library supports both preconfigured and custom configured middleware. To use a custom configuration, use the \"createPromise\" export and call this function with your configuration property. To use a preconfiguration, use the default export. For more help, check the upgrading guide: https://docs.psb.design/redux-promise-middleware/upgrade-guides/v6\n\nFor custom configuration:\nimport { createPromise } from 'redux-promise-middleware';\nconst promise = createPromise({ promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'] });\napplyMiddleware(promise);\n\nFor preconfiguration:\nimport promise from 'redux-promise-middleware';\napplyMiddleware(promise);\n    ");
  }

  return null;
}