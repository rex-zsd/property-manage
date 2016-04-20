//路由
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
//material-ui主题
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//页面
import Index from './p/index.jsx';
import Repair from './p/repair.jsx';
//基础样式
require('./style.less');
//初始化
import './init.js';
//fetch组件
import 'whatwg-fetch';
//promise组件
import Promise from 'es6-promise';
Promise.polyfill();
//tap组件
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const App = React.createClass({
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
});


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="repair" component={Repair}/>
      <IndexRoute component={Index}></IndexRoute>
    </Route>
  </Router>
), document.getElementById('J_page'));
