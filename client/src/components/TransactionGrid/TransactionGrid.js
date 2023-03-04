import React, { useState, useEffect } from 'react';

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

let categories = ['Food', 'Tech', 'Income', 'Random'];
const summary = {};

const TransactionGrid = () => {

  const [transaction, setTransaction] = useState({});
  const [index, setIndex] = useState(0);
  const [category, setCategory] = useState(null);

  useEffect(() => {   
    if (!category) return;

    if (!(category in summary)) {
      summary[category] = 0;
    }

    summary[category] += transaction.amount;

    setCategory(null);
    nextTransaction();
  }, [category]);

  useEffect(() => {
    if (index >= transactions.length) {
      console.log("Maybe do some routing here");
      console.log('c', categories);
      console.log('s', summary);
      setTransaction({});
    } else {
      setTransaction(transactions[index]);
    }
  }, [index]);

  const nextTransaction = () => {
    setIndex(index + 1);
  }

  const onCategoryClick = (categoryName) => {
    setCategory(categoryName);
  }

  const onCategoryCreate = (categoryName) => {
    categories.push(categoryName);
  }

  return (
    <div>
      <Button variant="contained" onClick={nextTransaction}>next transaction</Button>
      <Transaction transaction={transaction}/>
      <CategoryGrid setCategoryFunction={onCategoryClick} categories={categories} createCategoryFunction={onCategoryCreate}/>
    </div>
  );
}

export default TransactionGrid;