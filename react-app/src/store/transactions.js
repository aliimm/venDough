const GET_ALL_TRANSACTIONS = 'transaction/GET_ALL_TRANSACTIONS'
const POST_TRANSACTIONS = 'transaction/POST_TRANSACTIONS'


const getAllTransaction = (transactions) => ({
    type: GET_ALL_TRANSACTIONS,
    transactions
})

const postTransactions = (transaction) => ({
    type: POST_TRANSACTIONS,
    transaction
})


// CREATE TRANSACTION BASE ON USER ID
export const createTransaction = (newTransaction, userId) => async (dispatch) => {
    console.log('@@@##$$$',userId)
    // const { recipient, payment_method, amount, message } = newTransaction;
    const response = await fetch(`/api/transactions/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({
        //     recipient,
        //     payment_method,
        //     amount,
        //     message
        //   }),
        body: JSON.stringify(newTransaction)

    })
    console.log('!!!!', response)

    if (response.ok) {
        console.log('YOOOO')
        const createdNewTransaction = await response.json();
        dispatch(postTransactions(createdNewTransaction));
        return createdNewTransaction;
    }

}

//GET ALL TRANSACTIONS MAIN PAGE
export const getAllTransactions = () => async (dispatch) => {
    const response = await fetch(`/api/transactions`);

    if (response.ok) {
        const transactions = await response.json();

        dispatch(getAllTransaction(transactions));
    }
    return response
};


const initialState = { transactions: {} }


const TransactionReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_TRANSACTIONS: {
            const newState = { transactions: {} }
            action.transactions.transactions.forEach(transaction => {
                newState.transactions[transaction.id] = transaction
            })
            return newState;
        }

        case POST_TRANSACTIONS: {
            const newState = { ...state }
            const newObject = { ...state.transactions }
            console.log('ACTIONN', action)
            newObject[action.transaction.id] = action.transaction
            newState.transactions = newObject
            return newState
        }





        default:
            return state
    }

}

export default TransactionReducer
