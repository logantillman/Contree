import React, { useState } from 'react';

import CategoryGrid from './Categories/CategoryGrid';
import Transaction from './Transaction/Transaction';
import Button from '@mui/material/Button';

const transactions = [
  {
    "amount": 2307.21,
    "name": "Apple Store",
  },
  {
    "amount": 21.72,
    "name": "Chipotle",
  }
]

function* transactionGenerator(transactions) {
  yield* transactions;
}

const generatorObject = transactionGenerator(transactions);
console.log(generatorObject);

const TransactionGrid = () => {
  const [transaction, setTransaction] = useState([]);

  const nextTransaction = () => {
    const next = generatorObject.next();
    const transaction = next.value;
    const done = next.done;

    if (done) {
      console.log("Maybe do some routing here");
      setTransaction({});
    } 
    else if (transaction) {
      setTransaction(transaction);
    }
  }

  return (
    <div>
      <Button variant="contained" onClick={nextTransaction}>next transaction</Button>
      <Transaction transaction={transaction}/>
      <CategoryGrid />
    </div>
  );
}

export default TransactionGrid;