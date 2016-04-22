import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconPublic from 'material-ui/svg-icons/social/public';

import Nav from '../m/nav.jsx';
import Menu from '../m/menu.jsx';

const styles = {
  card: {
    margin: '16px'
  },
  cardHeader: {
    lineHeight: '1.5em'
  },
  content: {
    padding: '80px 0 88px'
  }
};

const Bulletin = React.createClass({
  render() {
    const bulletin  = this.props.bulletin;
    const time = new Date(bulletin.time).format('yyyy-MM-dd hh:mm');
    return (
      <Card style={styles.card}>
        <CardHeader
          title={bulletin.title}
          subtitle={time}
          actAsExpander={true}
          showExpandableButton={true}
          style={styles.cardHeader}
          />
        <CardText expandable={true}>
          {bulletin.content}
        </CardText>
      </Card>
    )
  }
});

const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
const Index = React.createClass({
  getInitialState() {
    return {
      bulletinList: [], //通知列表
      isLoading: false, //通知是否正在加载中
      isEnd: false  //通知是否已全部加载
    }
  },
  /**
   * 组件加载阶段挂载 handleScroll 方法
   * @return {[type]} [description]
   */
  componentDidMount(){
    var self = this;
    window.addEventListener('scroll', this.handleScroll, false);
    this.handleScroll();
  },
  /**
   * 组件卸载阶段移除 handleScroll 方法
   * @return {[type]} [description]
   */
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll, false);
  },
  /**
   * 滚动加载通知
   * @return {[type]} [description]
   */
  handleScroll(){
    var self = this;
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var docHeight = document.body.scrollHeight ;
    if (!self.state.isLoading && !self.state.isEnd && docHeight - scrollTop - windowHeight < 100) {
      this.setState({
        isLoading: true
      });
      fetch('http://192.168.199.111:10005/back/index?size=20')
      .then(function(res) {
        return res.json();
      })
      .then(function(res){
        self.setState({
          isLoading: false,
          isEnd: res.data.length < 20,
          bulletinList: [...self.state.bulletinList, ...res.data]
        });
      })
      .catch(err => {
        alert(err)
      });
    }
  },
  /**
   * 渲染组件
   * @return {[type]} [description]
   */
  render() {
    const bulletinList = this.state.bulletinList.map((bulletin, index) => (
      <Bulletin bulletin={bulletin} key={index}/>
    ));
    return (
      <div style={styles.content}>
        <Nav title="社区公告" left={<IconButton><IconPublic /></IconButton>}/>
        <div>{bulletinList}</div>
        <Menu index={1}/>
      </div>
    )
  }
});

export default Index;
