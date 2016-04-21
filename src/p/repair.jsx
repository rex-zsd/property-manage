import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

import Nav from '../m/nav.jsx';
import Warn from '../m/dialog.jsx';
import Menu from '../m/menu.jsx';

const styles = {
  content: {
    marginTop: '80px',
    marginBottom: '88px',
    // padding: '0 16px',
    position: 'relative'
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
  },
  button: {
    marginTop: '16px'
  }
}
let _imgList = [];
const Repair = React.createClass({
  getInitialState() {
    return {
      type: 1,
      picList: [],
      disableButton: false,
      date: new Date()
    }
  },
  showWarn(content) {
    console.log(123);
  },
  handleType(event, index, value) {
    this.setState({
      type: value
    });
  },
  addImg() {
    this.refs.picInput.click();
  },
  handleImg(event) {
    const self = this;
    let node = event.target;
    const file = node.files[0];
    node.value = '';
    lrz(file, {
      quality: 0.5
    }).then(function(rst) {
      _imgList.push({
        name: file.name,
        file: rst.file
      });
      self.setState({
        picList: [...self.state.picList, rst.base64],
        disableButton: _imgList.length > 3
      });
    });
  },
  handleDesc(event) {
    this.setState({
      desc: event.target.value
    })
  },
  handleDate(no, date) {
    this.setState({
      date: date
    });
    console.log(this.state.date);
  },
  render() {
    return (
      <div style={styles.content}>
        <Nav
          title="设施报修"
          right={<FlatButton label="提交" onClick={this.showWarn}/>}
        />
        <Table selectable={false}>
          <TableBody displayRowCheckbox={false}>
            <TableRow displayBorder={false}>
              <TableRowColumn style={styles.table.title}>保修类型</TableRowColumn>
              <TableRowColumn>
                <SelectField value={this.state.type} onChange={this.handleType} fullWidth={true}>
                  <MenuItem value={1} primaryText="个人住宅" />
                  <MenuItem value={2} primaryText="公共设施" />
                </SelectField>
              </TableRowColumn>
            </TableRow>
            <TableRow displayBorder={false}>
              <TableRowColumn style={styles.table.title}>保修内容</TableRowColumn>
              <TableRowColumn>
                <TextField
                  fullWidth={true}
                  multiLine={true}
                  style={{overflow: 'hidden'}}
                  textareaStyle={{height: '6em'}}
                  rows={2}
                  rowsMax={4}
                  name="desc"
                  onChange={this.handleDesc}
                  value={this.state.desc}
                />
              </TableRowColumn>
            </TableRow>
            <TableRow displayBorder={false}>
              <TableRowColumn style={styles.table.title}>预约时间</TableRowColumn>
              <TableRowColumn>
                <DatePicker
                  textFieldStyle={{width: '100%'}}
                  hintText="Portrait Dialog"
                  autoOk={true}
                  minDate={this.state.date}
                  name="date"
                  onChange={this.handleDate}
                  value={this.state.date}
                />
              </TableRowColumn>
            </TableRow>
            <TableRow displayBorder={false}>
              <TableRowColumn style={styles.table.title}>
                <div>相关图片</div>
                <RaisedButton label="点我添加" primary={true} onClick={this.addImg} style={styles.button} disabled={this.state.disableButton}/>
                <input type="file" ref="picInput" onChange={this.handleImg} hidden/>
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
        <Menu index={1}/>
      </div>
    )
  }
});

export default Repair;
