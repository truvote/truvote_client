import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ContentEditable from 'react-contenteditable';
import { updateBill } from '../redux/bills';

/* -----------------    COMPONENT     ------------------ */

class BillDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bill: props.bill
    };

    this.onBillUpdate = this.onBillUpdate.bind(this);
    this.renderRawHTML = this.renderRawHTML.bind(this);
  }

  componentWillReceiveProps (newProps, oldProps) {
    if (newProps.bill !== oldProps.bill) {
      this.setState({
        bill: newProps.bill
      });
    }
  }

  render() {
    console.log(this.state)
    const {users} = this.props;
    const bill = this.state.bill;
    if (!bill) return <div />; // the bill id is invalid or the data isnt loaded yet
    return (
      <div className="container bill-container">
        <ul className="list-inline large-font">
          <li>
            <input
              className="form-like large-font"
              value={bill.title}
              onChange={evt => this.onBillUpdate({ title: evt.target.value })}
            />
          </li>
          <li><span className="muted">by</span></li>
          <li>
            <select
              value={bill.author_id}
              onChange={evt => this.onBillUpdate({ author_id: evt.target.value })}>
            {
              users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))
            }
            </select>
          </li>
        </ul>
        <br />
      </div>
    );
  }

  renderRawHTML() {
    const { bill } = this.state;

    let billHtml = '';

    if (bill && bill.paragraphs && bill.paragraphs.length) {
      billHtml = bill.paragraphs.join('<br><br>');
    }

    return billHtml;
  }

  onStoryUpdate(billUpdateObj) {
    const {debouncedUpdateBill} = this.props;
    const {bill} = this.state;
    if (billUpdateObj.paragraphs) {
      billUpdateObj.paragraphs = billUpdateObj.paragraphs.split('<br>');
    }
    this.setState({
      bill: Object.assign(bill, billUpdateObj)
    });
    debouncedUpdateBill(bill.id, billUpdateObj);
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = ({ users, bills }, ownProps) => {
  const paramId = Number(ownProps.match.params.id);
  const bill = bills.find(bill => bill.id === paramId);
  return { bill, users };
};

const mapDispatch = (dispatch, ownProps) => ({
    debouncedUpdateBill: ((...args) => {
      dispatch(updateBill(...args));
    }, 500) 
  });

export default connect(mapState, mapDispatch)(BillDetail);