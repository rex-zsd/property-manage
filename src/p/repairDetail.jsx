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
  componentWillMount() {
    this.setState({
      type: '公共设施',
      content: '12312321',
      date: '2016-05-06',
      picList: []
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
                <TableRowColumn style={styles.table.title}>报修类型</TableRowColumn>
                <TableRowColumn>{this.state.type}</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn style={styles.table.title}>报修内容</TableRowColumn>
                <TableRowColumn>{this.state.content}</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn style={styles.table.title}>预约时间</TableRowColumn>
                <TableRowColumn>{this.state.date}</TableRowColumn>
              </TableRow>
              <TableRow displayBorder={false}>
                <TableRowColumn style={styles.table.title}>相关图片</TableRowColumn>
                <TableRowColumn style={styles.picBox}>
                  {this.state.picList.map((src, index) => (
                    <Paper
                      zDepth={2}
                      style={styles.picPaper}
                      children={<img src={src} style={styles.pic}></img>}
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
