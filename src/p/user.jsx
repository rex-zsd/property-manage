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

import Menu from '../m/menu.jsx';
import Nav from '../m/nav.jsx';

const styles = {
  content: {
    padding: '80px 0 88px'
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
      openLogOut: false
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
  //注册账号
  handleRegister() {
    window.setCookie('TOKEN', 123);
    window.setCookie('USERNAME', 123);
    this.setState({
      userText: 123,
      isLogIn: true,
      openLogIn: false
    });
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
      openLogOut: false
    })
  },
  handleRepair() {
    browserHistory.push('repairDetail');
  },
  handleComplain() {
    browserHistory.push('complainDetail');
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
        onTouchTap={this.handleClose}
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
    return (
      <div style={styles.content}>
        <Nav title="个人中心" left={<IconButton><IconPerson /></IconButton>}/>
        <List>
          <ListItem
            primaryText={this.state.userText || '请登录或注册'}
            leftIcon={ this.state.isLogIn ? <IconPerson/> : <IconPersonOutLine/> }
            onTouchTap={this.state.isLogIn ? this.handleOpenLogOut : this.handleOpenLogIn}
          />
        </List>
        <Divider inset={true}/>
        <List style={{display: this.state.isLogIn ? 'block' : 'none'}}>
          <ListItem primaryText="我的报修" leftIcon={<IconList/>} onTouchTap={this.handleRepair}/>
          <ListItem primaryText="我的投诉" insetChildren={true} onTouchTap={this.handleComplain}/>
        </List>
        <Menu index={4}/>
        <Dialog
          actions={logInActions}
          open={this.state.openLogIn}
          onRequestClose={this.handleCloseLogIn}
        >
          <TextField
            hintText="用户名"
            maxLength={10}
            fullWidth={true}
            /><br/>
          <TextField
            hintText="密码"
            type="password"
            maxLength={10}
            fullWidth={true}
          />
        </Dialog>
        <Dialog
          title='确定要退出？'
          actions={logOutActions}
          open={this.state.openLogOut}
          onRequestClose={this.handleCloseLogOut}
        >
        </Dialog>
      </div>
    )
  }
});

export default User;
