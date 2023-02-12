const Transaction = (props) => {
    const transaction = props.transaction;
    return (
        <div>
            <h1>{transaction.name}</h1>
            <p>{transaction.amount}</p>
        </div>
    )
}

export default Transaction;