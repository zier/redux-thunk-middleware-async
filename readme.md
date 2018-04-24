## redux-thunk-middleware-async

middleware redux-thunk support async & await

### Set up

```
import { createStore, applyMiddleware } from 'redux';
import middlewareAsync from './index';

const store = createStore(
  rootReducer,
  applyMiddleware(middlewareAsync)
);

```

### Usage
```
const requestIncrementAsync = async () => {
  const newNumber = await promiseActionFunc()
  return {
    type: 'SET_NUMBER',
    data: newNumber,
  }
}

store.dispatch(requestIncrementAsync());

```

### When promise error
```
  dispatch({ ...action, payload: errorData, error: true })
```

