import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import IconBuild from 'material-ui/svg-icons/action/build';

import Nav from '../m/nav.jsx';
import Menu from '../m/menu.jsx';

const styles = {
  content: {
    padding: '80px 0 88px',
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
  },
  tip: {
    marginBottom: '72px'
  }
}
let _imgList = [];
const Repair = React.createClass({
  getInitialState() {
    return {
      type: 1,
      picList: [],
      disableButton: false,
      date: new Date(),
      openTip: false,
      tipText: ''
    }
  },
  handleSubmit() {
    console.log(this.state);
    var form = new FormData();
    var state = this.state;
    var self = this;
    if (!this.state.content) {
      self.setState({
        tipText: '请填写保修内容',
        openTip: true
      });
    } else if (!this.state.date) {
      self.setState({
        tipText: '请选择预约时间',
        openTip: true
      });
    } else {
      form.append('type', state.type);
      form.append('content', state.content);
      form.append('date', state.date.getTime());
      _imgList.forEach(function(img, index){
        form.append('file', img.file, img.name);
      });
      fetch(ZN.baseUrl + 'repair/save', {
        method: "post",
        credentials: 'include',
        body: form
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(res){
        if(res.status == 100){
          self.setState({
            tipText: '保存成功',
            openTip: true
          });
        } else {
          self.setState({
            tipText: '保存失败',
            openTip: true
          });
        }
      })
      .catch(err => {
        alert(err)
      });
    }
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
    if (!file.type.match(/image/)) {
      this.setState({
        openTip: true,
        tipText: '只接受图片'
      });
    } else if (file.size > 1024 * 1024 * 10) {
      this.setState({
        openTip: true,
        tipText: '图片大小不得超过10M'
      });
    } else {
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
    }
  },
  handleContent(event) {
    this.setState({
      content: event.target.value
    })
  },
  handleDate(no, date) {
    this.setState({
      date: date
    });
  },
  handleTip() {
    this.setState({
      openTip: false
    });
  },
  render() {
    return (
      <div style={styles.content}>
        <Nav
          title="设施报修"
          left={<IconButton><IconBuild/></IconButton>}
          right={<FlatButton label="提交" onClick={this.handleSubmit}/>}
        />
        <Table selectable={false}>
          <TableBody displayRowCheckbox={false}>
            <TableRow displayBorder={false}>
              <TableRowColumn style={styles.table.title}>报修类型</TableRowColumn>
              <TableRowColumn>
                <SelectField value={this.state.type} onChange={this.handleType} fullWidth={true}>
                  <MenuItem value={1} primaryText="个人住宅" />
                  <MenuItem value={2} primaryText="公共设施" />
                </SelectField>
              </TableRowColumn>
            </TableRow>
            <TableRow displayBorder={false}>
              <TableRowColumn style={styles.table.title}>报修内容</TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="100字以内"
                  fullWidth={true}
                  multiLine={true}
                  style={{overflow: 'hidden'}}
                  textareaStyle={{height: '6em'}}
                  rows={2}
                  rowsMax={4}
                  name="desc"
                  onChange={this.handleContent}
                  value={this.state.content}
                  maxLength={100}
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
        <Snackbar
          open={this.state.openTip}
          message={this.state.tipText}
          autoHideDuration={2000}
          onRequestClose={this.handleTip}
          style={styles.tip}
        />
      <Menu index={2}/>
      </div>
    )
  }
});

export default Repair;
