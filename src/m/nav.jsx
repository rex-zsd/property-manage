import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';



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
        showMenuIconButton={false}
      />
    )
  }
})
export default Nav;
