import {Tabs, Tab} from 'material-ui/Tabs';
import {browserHistory} from 'react-router';
import IconPerson from 'material-ui/svg-icons/social/person';
import IconPublic from 'material-ui/svg-icons/social/public';
import IconBuild from 'material-ui/svg-icons/action/build';
import IconBad from 'material-ui/svg-icons/social/sentiment-dissatisfied';

const styles = {
  menu: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3000
  }
};

const Menu = React.createClass({
  getInitialState() {
    const preIndex = parseInt(localStorage['preIndex'], 10);
    return {
      index: preIndex || this.props.index,
      path: ['', '/', 'repair', 'complain', 'user']
    }
  },
  componentDidMount() {
    localStorage.removeItem('preIndex');
    this.setState({
      index: this.props.index
    });
  },
  handleChange(index, event, tab) {
    const self = this;
    const token = window.getCookie('TOKEN');
    const isLogIn = token.length>0;
    if( !isLogIn && (index == 2 || index == 3) ){
      index = 4;
    }
    if(index != this.props.index){
      const path = this.state.path[index];
      localStorage['preIndex'] = this.props.index;
      browserHistory.push(path);
    } else {
      setTimeout(
        function(){
          self.setState({
            index: self.props.index
          })
        }, 1000);
    }
  },
  render() {
    return (
      <Tabs style={styles.menu} value={this.state.index} onChange={this.handleChange}>
        <Tab
          icon={<IconPublic/>}
          label="公告"
          value={1}
          />
        <Tab
          icon={<IconBuild/>}
          label="报修"
          value={2}
          />
        <Tab
          icon={<IconBad/>}
          label="投诉"
          value={3}
          />
        <Tab
          icon={<IconPerson/>}
          label="个人中心"
          value={4}
          />
      </Tabs>
    );
  }
})
export default Menu;
