import { createStore, applyMiddleware } from 'redux';
import thunk from './middleware';

// #region Set up
const rootReducer = (state = {number: 0}, action) => {
  if(action.type === 'SET_NUMBER') {
    return { number: action.data };
  }

  return state;
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
//#endregion

// #region Async function
const promiseActionFunc = (newNumber) => {
  return new Promise(resolve => {
    setTimeout(()=>{
      resolve(newNumber)
    }, 1000)
  });
}

const requestIncrementAsync = async () => {
  const newNumber = await promiseActionFunc(5)
  return {
    type: 'SET_NUMBER',
    data: newNumber,
  }
}
//#endregion

// #region Error async function
const promiseThrowError = () => {
  return Promise((resolve, reject) => {
    setTimeout(()=>{
      reject({
        type: 'SET_NUMBER_ERROR',
        error: new Error("Error testing")
      })
    }, 1000)
  })
}

const requestIncrementAsyncError = async() => {
  let action = {
    type: 'SET_NUMBER_ERROR'
  }

  try {
    await promiseThrowError()
  } catch (e) {
    action.data = e
  }

  return action
}
//#endregion

// #region Test case
test('call async function', (done) => {
  store.dispatch(requestIncrementAsync());
  store.subscribe(() => {
    const state = store.getState();
    expect(state.number).toBe(5);
    done();
  })
});

test('call error async function', (done) => {
  store.dispatch(requestIncrementAsyncError());
  store.subscribe(() => {
    const state = store.getState();
    expect(state.number).toBe(5);
    done();
  })
});
//#endregion
