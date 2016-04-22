import AppBar from 'material-ui/AppBar';

const styles = {
  title: {
    cursor: 'pointer',
  },
  bar: {
    position: 'fixed',
    top: 0,
    left: 0
  }
};

const Nav = React.createClass({
  render(){
    return (
      <AppBar
        title={this.props.title}
        iconElementLeft={this.props.left}
        iconElementRight={this.props.right}
        style={styles.bar}
        showMenuIconButton={this.props.left ? true : false}
      />
    )
  }
})
export default Nav;
