import IconButton from 'material-ui/IconButton';
import IconLeft from 'material-ui/svg-icons/navigation/chevron-left';
import {browserHistory} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Nav from '../m/nav.jsx';

const styles = {
  content: {
    padding: '80px 0 88px'
  }
};

const ComplainList = React.createClass({
  getInitialState() {
    return {
      complainList: [], //投诉列表
    }
  },
  componentWillMount() {
    fetch(ZN.baseUrl + 'complain/list', {
      credentials: 'include',
      method: 'get'
    })
    .then((res) => res.json())
    .then((res) => {
      this.setState({
        complainList: res.data
      });
    });
  },
  handleComplain(selected) {
    selected = selected[0];
    const complain = this.state.complainList[selected];
    browserHistory.push('/complainDetail?' + complain._id);
  },
  handleBack() {
    browserHistory.goBack();
  },
  /**
   * 渲染组件
   * @return {[type]} [description]
   */
  render() {
    return (
      <div style={styles.content}>
        <Nav title="投诉列表" left={<IconButton onTouchTap={this.handleBack}><IconLeft /></IconButton>}/>
        <Table onRowSelection={this.handleComplain}>
          <TableBody displayRowCheckbox={false}>
            {this.state.complainList.map( (complain, index) => (
              <TableRow key={index}>
                <TableRowColumn>
                  {complain.content}
                </TableRowColumn>
                <TableRowColumn style={{textAlign: 'right'}}>
                  {new Date(complain.createDate).format('yyyy-MM-dd hh:mm')}
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    )
  }
});

export default ComplainList;
