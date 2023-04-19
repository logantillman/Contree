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

const summary = {};

const TransactionGrid = () => {

  const [categories, setCategories] = useState(['Default']);
  const [transaction, setTransaction] = useState({});
  const [index, setIndex] = useState(0);
  const [category, setCategory] = useState(null);

  // TODO refactor transaction classification
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

  // TODO refactor here 
  const onCategoryClick = (categoryName) => {
    setCategory(categoryName);
  }

  const addCategory = (category) => {
    setCategories(prevState => {
      return [...prevState, category];
    });
  }

  return (
    <div>
      <Button variant="contained" onClick={nextTransaction}>next transaction</Button>
      <Transaction transaction={transaction}/>
      <CategoryGrid setCategoryFunction={onCategoryClick} categories={categories} addCategory={addCategory} />
    </div>
  );
}

export default TransactionGrid;