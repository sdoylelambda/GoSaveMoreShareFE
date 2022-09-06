import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../src/redux/reducers/index'
import thunk from 'redux-thunk'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_aV0fFptXSImmrfG1E85kGPRu004sVf5J9S')
console.log('stripePromise', stripePromise)

const logger = createLogger()
const middlewares = [logger, thunk]
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 })
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

ReactDOM.render(
  <Elements stripe={stripePromise}>
    <Provider store={store}>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </Provider>
  </Elements>,
  document.getElementById('root')
)

serviceWorker.unregister()
