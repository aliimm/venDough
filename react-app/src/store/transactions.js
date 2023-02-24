const GET_ALL_TRANSACTIONS = 'transaction/GET_ALL_TRANSACTIONS'
const GET_ONE_TRANSACTIONS = 'transaction/GET_ONE_TRANSACTIONS'
const POST_TRANSACTIONS = 'transaction/POST_TRANSACTIONS'
const DELETE_TRANSACTIONS = 'transaction/DELETE_TRANSACTIONS'


const getAllTransaction = (transactions) => ({
    type: GET_ALL_TRANSACTIONS,
    transactions
})

const getOneTransaction = (transaction) => ({
    type: GET_ONE_TRANSACTIONS,
    transaction
})

const postTransactions = (transaction) => ({
    type: POST_TRANSACTIONS,
    transaction
})

const deleteTransactions = (transaction) => ({
    type: DELETE_TRANSACTIONS,
    transaction
})



export const getSpecficTransaction = (id) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${id}`);
    if (response.ok) {

        const transaction = await response.json();
        dispatch(getOneTransaction(transaction));
    }
    return response
}



// CREATE TRANSACTION BASE ON USER ID
export const createTransaction = (newTransaction, userId) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction)
    })

    if (response.ok) {
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


export const deleteATransaction = (id) => async (dispatch) => {

    const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const deletionResponse = await response.json()
        dispatch(deleteTransactions(id))
        return deletionResponse
    }
}


const initialState = { transactions: {},  singleransaction: {}  }


const TransactionReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ONE_TRANSACTIONS:{
            const newState = { ...state }
            const specificSong = action.transaction.Transaction
            newState.singleransaction = specificSong
            return newState
        }

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
            newObject[action.transaction.id] = action.transaction
            newState.transactions = newObject
            return newState
        }

        case DELETE_TRANSACTIONS: {
            const newState = {...state}
            const newObject = {...state.transactions}
            delete newObject[action.transaction]
            newState.transactions = newObject
            return newState
          }


        default:
            return state
    }

}

export default TransactionReducer
