import React from 'react'
import {render} from 'react-dom'
import {Router, match, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import routes from './routes'
import configureStore from './store/configureStore'
import './assets/css/index.scss'
const store = configureStore(window.REDUX_STATE)

match({history: browserHistory, routes}, (error, redirectLocation, renderProps) => {
    render(
        <Provider store={store}>
            <Router {...renderProps}/>
        </Provider>,
        document.getElementById('root')
    )
})
