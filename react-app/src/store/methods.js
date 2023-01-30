const GET_ALL_METHODS = 'method/GET_ALL_METHODS'
const GET_ONE_METHOD = 'method/GET_ONE_METHOD'
const POST_METHOD = 'method/POST_METHODS'
const UPDATE_METHOD = 'method/UPDATE_METHOD'
const DELETE_METHOD = 'method/DELETE_METHOD'


const postMethods = (method) => ({
    type: POST_METHOD,
    method
})

const getAllMethods = (methods) => ({
    type: GET_ALL_METHODS,
    methods
})

const getOneMethod = (method) => ({
    type: GET_ONE_METHOD,
    method
})

const updateMethod = (method) => ({
    type: UPDATE_METHOD,
    method
})

const deleteMethod = (method) => ({
    type: DELETE_METHOD,
    method
})


export const createMethod = (newMethod) => async (dispatch) => {
    console.log('thunk', newMethod)
    const response = await fetch('/api/payments/', {
        method: 'POST',
        body: newMethod
    })
    // console.log('err?', response)

    if (response.ok) {
        const createdNewMethod = await response.json();
        dispatch(postMethods(createdNewMethod));
        return createdNewMethod;
    }
}

export const getAllPayment = (id) => async (dispatch) => {
    const response = await fetch(`/api/payments/${id}`);

    if (response.ok) {
        const methods = await response.json();

        dispatch(getAllMethods(methods));
    }
    return response
};


export const getOnePayment = (id) => async (dispatch) => {
    const response = await fetch(`/api/payments/${id}/specific`);

    if (response.ok) {
        const method = await response.json();

        dispatch(getOneMethod(method));
    }
    return response
};





const initialState = { paymentmethods: {}, onePaymentMethod: {} }


const paymentMethodReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_METHODS: {

            const newState = { ...state }
            const newObject = {}
            action.methods.methods.forEach(method => {
                newObject[method.id] = method
            })

            newState.methods = newObject
            return newState
        }
        case GET_ONE_METHOD:{
            const newState = { ...state }
            const specificMethod = action.method
            newState.onePaymentMethod = specificMethod
            return newState
        }



        default:
            return state
    }

}

export default paymentMethodReducer
