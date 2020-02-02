import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ContentEditable from 'react-contenteditable';
import { updateBill } from '../redux/bills';

/* -----------------    COMPONENT     ------------------ */

class BillDetail extends Component {
  constructor(props) {
    super(props)
    
    console.log("--------------->", props)
    this.state = {
      bill: "x"
    };

  }


  render() {
    const bill = this.state.bill;
    if (!bill) return <div />; // the bill id is invalid or the data isnt loaded yet
    return (
      <div>
        <h1>We're at Bill Detail here</h1>
        <h1>{bill}</h1>
      </div>
      // <div className="container bill-container">
      //   <ul className="list-inline large-font">
      //     <li>
      //       <input
      //         className="form-like large-font"
      //         value={bill.title}
      //         onChange={evt => this.onBillUpdate({ title: evt.target.value })}
      //       />
      //     </li>
      //     <li><span className="muted">by</span></li>
      //     <li>
      //       <select
      //         value={bill.author_id}
      //         onChange={evt => this.onBillUpdate({ author_id: evt.target.value })}>
      //       {
      //         users.map(user => (
      //           <option key={user.id} value={user.id}>{user.name}</option>
      //         ))
      //       }
      //       </select>
      //     </li>
      //   </ul>
      //   <br />
      // </div>
    );
  }

}


/* -----------------    CONTAINER     ------------------ */

const mapState = ({ bills }, ownProps) => {
  console.log('@@@@@@@---->', bills, ownProps)
  const paramId = Number(ownProps.match.params.id);
  const bill = bills.find(bill => bill.id === paramId);
  return { bill };
};

const mapDispatch = (dispatch, ownProps) => ({
    debouncedUpdateBill: ((...args) => {
      dispatch(updateBill(...args));
    }, 500) 
  });

export default connect(mapState, mapDispatch)(BillDetail);