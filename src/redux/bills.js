import axios from 'axios';

/* -----------------    ACTION TYPES    ------------------ */

const INITIALIZE = 'INITIALIZE_BILLS';
const CREATE     = 'CREATE_BILL';
const UPDATE     = 'UPDATE_BILL';
const REMOVE     = 'REMOVE_BILL';

/* ------------    ACTION CREATORS      ------------------ */

const init   = bills => ({ type: INITIALIZE, bills });
const create = bill   => ({ type: CREATE, bill });
const remove = id      => ({ type: REMOVE, id });
const update = bill   => ({ type: UPDATE, bill });

/* ------------         REDUCER         ------------------ */

export default function reducer (bills = [], action) {
  switch (action.type) {

    case INITIALIZE:
      return action.bills;

    case CREATE:
      return [action.bill, ...bills];

    case REMOVE:
      return bills.filter(bill => bill.id !== action.id);

    case UPDATE:
      return bills.map(bill => (
        action.bill.id === bill.id ? action.bill : bill
      ));

    default:
      return bills;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const fetchBills = () => dispatch => {
  axios.get('https://truvote-api.herokuapp.com/api/v1/bills.json')
       .then(res => dispatch(init(res.data)))
       .catch(err => console.error('Fetching bills unsuccessful', err));
};

export const removeBill = id => dispatch => {
  axios.delete(`https://truvote-api.herokuapp.com/api/v1/bills/${id}.json`)
       .then(() => dispatch(remove(id)))
       .catch(err => console.error(`Removing bill: ${id} unsuccessful`, err));
};

export const addBill = bill => dispatch => {
  axios.post('https://truvote-api.herokuapp.com/api/v1/bills.json', bill)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating bill: ${bill} unsuccessful`, err));
};

export const updateBill = (id, bill) => dispatch => {
  axios.put(`https://truvote-api.herokuapp.com/api/v1/bills/${id}.json`, bill)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating bill: ${bill} unsuccessful`, err));
};