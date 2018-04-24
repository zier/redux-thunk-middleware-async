function createThunkMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (action instanceof Promise){
      action.then(
        resp => dispatch(resp),
        error => dispatch({ ...action, payload: error, error: true })
      )
    } else {
      return next(action);
    }
  };
}

const thunk = createThunkMiddleware();
export default thunk;
