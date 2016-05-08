import {List, ListItem} from 'material-ui/List';
import IconList from 'material-ui/svg-icons/action/list';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconPerson from 'material-ui/svg-icons/social/person';
import IconPersonOutLine from 'material-ui/svg-icons/social/person-outline';
import {browserHistory} from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import IconBuild from 'material-ui/svg-icons/action/build';
import IconBad from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import IconLogOut from 'material-ui/svg-icons/social/person-outline';
import IconSetting from 'material-ui/svg-icons/action/settings';

import Menu from '../m/menu.jsx';
import Nav from '../m/nav.jsx';

const styles = {
  content: {
    padding: '80px 0 88px'
  },
  tip: {
    marginBottom: '72px'
  }
};

const User = React.createClass({
  getInitialState() {
    const token = window.getCookie('TOKEN');
    const userName = window.getCookie('USERNAME');
    const isLogIn = token.length>0;
    return {
      userText: isLogIn ? userName : null,
      isLogIn: isLogIn,
      openLogIn: false,
      openLogOut: false,
      username: '',
      password: '',
      openTip: false,
      tipText: '',
      openNewPassword: false,
      newPasswordOne: '',
      newPasswordTwo: ''
    };
  },
  //关闭登录模态框
  handleCloseLogIn() {
    this.setState({
      openLogIn: false
    });
  },
  //打开登录模态框
  handleOpenLogIn() {
    this.setState({
      openLogIn: true
    });
  },
  //登陆
  handleLogIn() {
    const username = _.trim(this.state.username);
    const password = _.trim(this.state.password);
    if(!username.length) {
      this.setState({
        tipText: '请填写用户名',
        openTip: true
      });
    } else if(!password.length) {
      this.setState({
        tipText: '请填写密码',
        openTip: true
      });
    } else {
      fetch(ZN.baseUrl + 'users/login', {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          tipText: res.info,
          openTip: true
        });
        if(res.status == 100) {
          this.setState({
            userText: this.state.username,
            isLogIn: true,
            openLogIn: false
          });
        }
      });
    }
  },
  //注册账号
  handleRegister() {
    const username = _.trim(this.state.username);
    const password = _.trim(this.state.password);
    if(!username.length) {
      this.setState({
        tipText: '请填写用户名',
        openTip: true
      });
    } else if(!password.length) {
      this.setState({
        tipText: '请填写密码',
        openTip: true
      });
    } else {
      fetch(ZN.baseUrl + 'users/register', {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          tipText: res.info,
          openTip: true
        });
        if(res.status == 100) {
          this.setState({
            userText: this.state.username,
            isLogIn: true,
            openLogIn: false
          });
        }
      });
    }
  },
  //关闭登出模态框
  handleCloseLogOut() {
    this.setState({
      openLogOut: false
    });
  },
  //打开登出模态框
  handleOpenLogOut() {
    this.setState({
      openLogOut: true
    });
  },
  //登出
  handleLogOut() {
    window.clearCookie('TOKEN');
    window.clearCookie('USERNAME');
    this.setState({
      isLogIn: false,
      userText: null,
      openLogOut: false,
      tipText: '登出成功',
      openTip: true
    });
  },
  //前往报修列表
  handleRepair() {
    browserHistory.push('repairList');
  },
  //前往投诉列表
  handleComplain() {
    browserHistory.push('complainList');
  },
  //输入用户名
  handleUserName(event) {
    this.setState({
      username: event.target.value
    });
  },
  //输入密码
  handlePassWord(event) {
    this.setState({
      password: event.target.value
    });
  },
  //关闭提示
  handleTip() {
    this.setState({
      openTip: false
    });
  },
  //输入新密码一
  handleNewPassWordOne(event) {
    this.setState({
      newPasswordOne: event.target.value
    });
  },
  //输入新密码二
  handleNewPassWordTwo(event) {
    this.setState({
      newPasswordTwo: event.target.value
    });
  },
  //修改密码
  handleNewPassword() {
    this.setState({
      openNewPassword: true
    });
  },
  //取消修改密码
  handleCloseNewPassword() {
    this.setState({
      openNewPassword: false
    });
  },
  //确认修改密码
  handleSubmitNewPassword() {
    var self = this;
    if(this.state.newPasswordOne != this.state.newPasswordTwo) {
      this.setState({
        tipText: '两次密码不一致',
        openTip: true
      });
    } else {
      fetch(ZN.baseUrl + 'users/password', {
        method: 'post',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: this.state.newPasswordOne
        })
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(res){
        self.setState({
          tipText: res.info,
          openTip: true,
          openNewPassword: false,
          password: self.state.newPasswordOne,
          newPasswordOne: undefined,
          newPasswordTwo: undefined
        });
      })
      .catch(err => {
        self.setState({
          tipText: err,
          openTip: true,
        });
      });
    }
  },
  render() {
    const logInActions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleCloseLogIn}
      />,
      <FlatButton
        label="注册"
        primary={true}
        onTouchTap={this.handleRegister}
      />,
      <FlatButton
        label="登录"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleLogIn}
      />,
    ];
    const logOutActions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleCloseLogOut}
      />,
      <FlatButton
        label="确定"
        primary={true}
        onTouchTap={this.handleLogOut}
      />
    ];
    const newPasswordActions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleCloseNewPassword}
      />,
      <FlatButton
        label="确定"
        primary={true}
        onTouchTap={this.handleSubmitNewPassword}
      />
    ];
    return (
      <div style={styles.content}>
        <Nav title="个人中心" left={<IconButton><IconPerson /></IconButton>}/>
        <List>
          <ListItem
            primaryText={this.state.userText || '请登录或注册'}
            leftIcon={ this.state.isLogIn ? <IconPerson/> : <IconPersonOutLine/> }
            onTouchTap={this.state.isLogIn ? function(){} : this.handleOpenLogIn}
          />
        </List>
        <Divider inset={true}/>
        <List style={{display: this.state.isLogIn ? 'block' : 'none'}}>
          <ListItem primaryText="退出登录" leftIcon={<IconLogOut/>} onClick={this.handleOpenLogOut}/>
          <ListItem primaryText="修改密码" leftIcon={<IconSetting/>} onClick={this.handleNewPassword}/>
          <ListItem primaryText="我的报修" leftIcon={<IconBuild/>} onClick={this.handleRepair}/>
          <ListItem primaryText="我的投诉" leftIcon={<IconBad/>} insetChildren={true} onClick={this.handleComplain}/>
        </List>
        <Menu index={4}/>
        <Dialog
          actions={logInActions}
          open={this.state.openLogIn}
          onRequestClose={this.handleCloseLogIn}
        >
          <TextField
            hintText="用户名"
            maxLength={11}
            fullWidth={true}
            value={this.state.username}
            onChange={this.handleUserName}
            /><br/>
          <TextField
            hintText="密码"
            type="password"
            maxLength={10}
            fullWidth={true}
            value={this.state.password}
            onChange={this.handlePassWord}
          />
        </Dialog>
        <Dialog
          actions={newPasswordActions}
          open={this.state.openNewPassword}
          onRequestClose={this.handleCloseNewPassword}
        >
          <TextField
            hintText="请输入新的密码"
            type="password"
            maxLength={10}
            fullWidth={true}
            value={this.state.newPasswordOne}
            onChange={this.handleNewPassWordOne}
            /><br/>
          <TextField
            hintText="请再输入一次新密码"
            type="password"
            maxLength={10}
            fullWidth={true}
            value={this.state.newPasswordTwo}
            onChange={this.handleNewPassWordTwo}
          />
        </Dialog>
        <Dialog
          title='确定要退出？'
          actions={logOutActions}
          open={this.state.openLogOut}
        >
        </Dialog>
        <Snackbar
          open={this.state.openTip}
          message={this.state.tipText}
          autoHideDuration={2000}
          onRequestClose={this.handleTip}
          style={styles.tip}
        />
      </div>
    )
  }
});

export default User;
