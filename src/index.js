"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function createThunkMiddleware() {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (action instanceof Promise) {
          action.then(function (resp) {
            return dispatch(resp);
          }, function (error) {
            return dispatch(_extends({}, action, { payload: error, error: true }));
          });
        } else {
          return next(action);
        }
      };
    };
  };
}

var thunk = createThunkMiddleware();
exports.default = thunk;
