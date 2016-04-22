import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import IconLeft from 'material-ui/svg-icons/navigation/chevron-left';
import {browserHistory} from 'react-router';

import Nav from '../m/nav.jsx';

const styles = {
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
  },
  table: {
    title: {
      width: '88px',
      textAlign: 'center',
      paddingTop: '10px',
      paddingBottom: '10px'
    }
  }
};

const ComplainDetail = React.createClass({
  componentWillMount() {
    this.setState({
      content: '123123123',
      picList: []
    });
  },
  handleBack() {
    browserHistory.goBack();
  },
  render() {
    return (
      <div style={styles.content}>
        <Nav
          title="投诉详情"
          left={<IconButton onTouchTap={this.handleBack}><IconLeft/></IconButton>}
        />
        <Table selectable={false}>
          <TableBody displayRowCheckbox={false}>
            <TableRow displayBorder={false}>
              <TableRowColumn style={styles.table.title}>投诉内容</TableRowColumn>
              <TableRowColumn>{this.state.content}</TableRowColumn>
            </TableRow>
            <TableRow displayBorder={false}>
              <TableRowColumn style={styles.table.title}>
                <div>相关图片</div>
              </TableRowColumn>
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
    );
  }
});

export default ComplainDetail;
