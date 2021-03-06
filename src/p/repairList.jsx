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

const RepairList = React.createClass({
  getInitialState() {
    return {
      repairList: [], //报修列表
    }
  },
  componentWillMount() {
    fetch(ZN.baseUrl + 'repair/list', {
      credentials: 'include',
      method: 'get'
    })
    .then((res) => res.json())
    .then((res) => {

      this.setState({
        repairList: res.data
      });
    });
  },
  handleRepair(selected) {
    selected = selected[0];
    const repair = this.state.repairList[selected];
    browserHistory.push('/repairDetail?' + repair._id);
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
        <Nav title="报修列表" left={<IconButton onTouchTap={this.handleBack}><IconLeft /></IconButton>}/>
        <Table onRowSelection={this.handleRepair}>
          <TableBody displayRowCheckbox={false}>
            {this.state.repairList.map( (repair, index) => (
              <TableRow key={index}>
                <TableRowColumn>
                  {repair.content}
                </TableRowColumn>
                <TableRowColumn style={{textAlign: 'right'}}>
                  {new Date(repair.createDate).format('yyyy-MM-dd hh:mm')}
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    )
  }
});

export default RepairList;
