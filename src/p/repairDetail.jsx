import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import IconLeft from 'material-ui/svg-icons/navigation/chevron-left';
import {browserHistory} from 'react-router';

import Nav from '../m/nav.jsx';
import Menu from '../m/menu.jsx';

const styles = {
  table: {
    title: {
      width: '88px',
      textAlign: 'center',
      paddingTop: '10px',
      paddingBottom: '10px'
    }
  },
  content: {
    paddingTop: '80px'
  },
  picBox: {
    whiteSpace: 'normal',
    paddingRight: '14px'
  },
  picPaper: {
    height: '90px',
    lineHeight: '90px',
    width: '90px',
    margin: '0 10px 10px 0',
    textAlign: 'center',
    display: 'inline-block',
  },
  pic: {
    maxWidth: '100%',
    maxHeight: '100%',
    verticalAlign: 'middle'
  }
};

const RepairDetail = React.createClass({
  getInitialState() {
    return {
      type: 1,
      picList: []
    }
  },
  componentWillMount() {
    const id = location.search.slice(1);
    fetch(ZN.baseUrl + 'repair/detail?id=' + id, {
      method: "get",
      credentials: 'include'
    })
    .then((res) => res.json())
    .then((res) => {
      var repair = res.data;
      this.setState({
        type: ['', '个人住宅', '公共设施'][repair.type],
        content: repair.content,
        date: new Date(repair.date).format('yyyy-MM-dd'),
        picList: repair.imgList,
        createDate: repair.createDate
      });
    });

  },
  handleBack() {
    browserHistory.goBack();
  },
  render() {
    return (
      <div style={styles.content}>
        <Nav title="报修详情" left={<IconButton onTouchTap={this.handleBack}><IconLeft/></IconButton>}/>
          <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
              <TableRow displayBorder={false}>
                <TableRowColumn style={styles.table.title}>创建时间</TableRowColumn>
                <TableRowColumn>{new Date(this.state.createDate).format('yyyy-MM-dd hh:mm')}</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn style={styles.table.title}>报修类型</TableRowColumn>
                <TableRowColumn>{this.state.type}</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn style={styles.table.title}>报修内容</TableRowColumn>
                <TableRowColumn style={{whiteSpace: 'pre'}}>{this.state.content}</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn style={styles.table.title}>预约时间</TableRowColumn>
                <TableRowColumn>{this.state.date}</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn style={styles.table.title}>相关图片</TableRowColumn>
                <TableRowColumn style={styles.picBox}>
                  {this.state.picList.map((pic, index) => (
                    <Paper
                      zDepth={2}
                      style={styles.picPaper}
                      children={<img src={ ZN.imgUrl + pic.path} style={styles.pic}></img>}
                      key={index}
                    />
                  ))}
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
      </div>
    )
  }
});

export default RepairDetail;
