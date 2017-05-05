import React from "react";
import {Route, IndexRoute,IndexRedirect} from "react-router";
import App from './App';
import Home from './containers/Home'
// Hook for server
if (typeof require.ensure !== 'function') {
    require.ensure = function(dependencies, callback) {
        callback(require)
    }
}
module.exports = (
   <Route path="/" component={App} >
     <IndexRoute component={Home} />
     <IndexRedirect to="home"/>
     <Route path="home" component={Home} />
   </Route>
 )

