import React, { useState, useEffect } from 'react';

import CategoryGrid from './Categories/CategoryGrid';
import Transaction from './Transaction/Transaction';

const loadedTransactions = [
  {
    "amount": 2307.21,
    "name": "Apple Store",
  },
  {
    "amount": 21.72,
    "name": "Chipotle",
  }
]

const loadedCategories = ["Food", "Tech", "Cars"];

const reversedTransactions = loadedTransactions.reverse();

const summary = {};

const TransactionGrid = () => {
  const [categories, setCategories] = useState([]);
  const [transaction, setTransaction] = useState({});
  
  // Set these on load
  useEffect(() => {
    loadedCategories.forEach(category => summary[category] = 0);
    setCategories(loadedCategories);
    setTransaction(reversedTransactions.pop());
    return () => {
      console.log('cleaning up');
    }
  }, []);

  const onCategoryClick = (categoryName) => {
    summary[categoryName] = Object.hasOwn(summary, categoryName) ? summary[categoryName] + transaction.amount : transaction.amount;

    if (reversedTransactions.length !== 0) {
      setTransaction(reversedTransactions.pop());
    } else {
      // Process is finished
      console.log(summary);
      setTransaction({});
    }
  }

  const addCategory = (category) => {
    setCategories(prevState => {
      return [...prevState, category];
    });
  }

  return (
    <>
      <Transaction transaction={transaction}/>
      <CategoryGrid setCategoryFunction={onCategoryClick} categories={categories} addCategory={addCategory} />
    </>
  );
}

export default TransactionGrid;