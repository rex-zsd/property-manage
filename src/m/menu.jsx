import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import {Link, browserHistory} from 'react-router';

const styles = {
  menu: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0
  }
};

const Menu = React.createClass({
  getInitialState() {
    return {
      path: ['/', 'repair', 'suit']
    }
  },
  routeTo(tab) {
    var index = tab.props.tabIndex;
    if (index != this.props.index) {
      browserHistory.push(this.state.path[index]);
    }
  },
  render() {
    return (
      <Tabs style={styles.menu} initialSelectedIndex={this.props.index}>
        <Tab
          icon={< FontIcon className = "material-icons" > phone < /FontIcon>}
          label="首页"
          onActive={this.routeTo}
          />
        <Tab
          icon={< FontIcon className = "material-icons" > favorite < /FontIcon>}
          label="报修"
          onActive={this.routeTo}
          />
        <Tab
          icon={< FontIcon className = "material-icons" > person_pin < /FontIcon>}
          label="投诉"
          onActive={this.routeTo}
          />
      </Tabs>
    );
  }
})
export default Menu;
