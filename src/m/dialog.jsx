import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const Warn = React.createClass({
  getInitialState() {
    return {
      open: this.props.open
    }
  },
  handleOpen() {
    this.setState({open: true});
  },
  handleClose() {
    this.setState({open: false});
  },
  componentWillUpdate(nextProps, nextState) {
    if(nextProps.open != this.state.open && nextProps.open != nextState.open){
      this.setState({
        open: this.props.open
      });
    }
  },
  render(){
    const actions = [
      <FlatButton
        label="关闭"
        primary={true}
        onTouchTap={this.handleClose}
        keyboardFocused={true}
      />
    ];
    return (
      <div>
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.props.children}
        </Dialog>
      </div>
    );
  }
});

export default Warn;
