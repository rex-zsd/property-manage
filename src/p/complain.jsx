import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import IconBad from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import {browserHistory} from 'react-router';
import Dialog from 'material-ui/Dialog';

import Nav from '../m/nav.jsx';
import Menu from '../m/menu.jsx';

const styles = {
  content: {
    marginTop: '80px',
    marginBottom: '88px',
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
      picList: [],
      disableButton: false,
      openTip: false,
      tipText: '',
      openDialog: false
    }
  },
  handleSubmit() {
    if (!this.state.content) {
      this.setState({
        tipText: '请填写投诉内容',
        openTip: true
      });
    } else {
      this.setState({
        openDialog: true
      });
    }
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
  handleTip() {
    this.setState({
      openTip: false
    });
  },
  handleCloseSubmit() {
    this.setState({
      openDialog: false
    });
  },
  handleFetch() {
    var form = new FormData();
    var state = this.state;
    var self = this;
    form.append('content', state.content);
    _imgList.forEach(function(img, index){
      form.append('file', img.file, img.name);
    });
    fetch( ZN.baseUrl + 'complain/save', {
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
          tipText: res.info,
          openTip: true
        });
        setTimeout(function(){
          browserHistory.push('/complainDetail?' + res.data.id);
        }, 2000);
      } else {
        self.setState({
          tipText: res.info,
          openTip: true
        });
      }
    })
    .catch(err => {
      alert(err)
    });
  },
  render() {
    const submitActions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleCloseSubmit}
      />,
      <FlatButton
        label="确定"
        primary={true}
        onTouchTap={this.handleFetch}
      />
    ];
    return (
      <div style={styles.content}>
        <Nav
          title="投诉物业"
          left={<IconButton><IconBad/></IconButton>}
          right={<FlatButton label="提交" onClick={this.handleSubmit}/>}
        />
        <Table selectable={false}>
          <TableBody displayRowCheckbox={false}>
            <TableRow displayBorder={false}>
              <TableRowColumn style={styles.table.title}>投诉内容</TableRowColumn>
              <TableRowColumn>
                <TextField
                  fullWidth={true}
                  multiLine={true}
                  style={{overflow: 'hidden'}}
                  textareaStyle={{height: '6em'}}
                  rows={2}
                  rowsMax={4}
                  name="desc"
                  onChange={this.handleContent}
                  value={this.state.content}
                  hintText="100字以内"
                  maxLength={100}
                />
              </TableRowColumn>
            </TableRow>
            <TableRow displayBorder={false}>
              <TableRowColumn style={styles.table.title}>
                <RaisedButton label="添加图片" primary={true} onClick={this.addImg} style={styles.button} disabled={this.state.disableButton}/>
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
        <Menu index={3}/>
        <Snackbar
          open={this.state.openTip}
          message={this.state.tipText}
          autoHideDuration={2000}
          onRequestClose={this.handleTip}
          style={styles.tip}
        />
        <Dialog
          title='确定要提交？'
          actions={submitActions}
          open={this.state.openDialog}
        ></Dialog>
      </div>
    )
  }
});

export default Repair;
