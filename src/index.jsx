//路由
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
//material-ui主题
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//页面
import Index from './p/index.jsx';
import Repair from './p/repair.jsx';
import Complain from './p/complain.jsx';
import User from './p/user.jsx';
import RepairDetail from './p/repairDetail.jsx';
import ComplainDetail from './p/complainDetail.jsx';
import RepairList from './p/repairList.jsx';
import ComplainList from './p/complainList.jsx';

//基础样式
import styles from './style.less';
console.log(styles);
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
          <div className={styles.v} className='J_a'></div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
});

window.ZN = {
  baseUrl: 'http://localhost:10005/back/',
  imgUrl: 'http://localhost:10004/'
};

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="repair" component={Repair}/>
      <Route path="complain" component={Complain}/>
      <Route path="user" component={User}/>
      <Route path="repairDetail" component={RepairDetail}/>
      <Route path="complainDetail" component={ComplainDetail}/>
      <Route path="repairList" component={RepairList}/>
      <Route path="complainList" component={ComplainList}/>
      <IndexRoute component={Index}></IndexRoute>
    </Route>
  </Router>
), document.getElementById('J_page'));
