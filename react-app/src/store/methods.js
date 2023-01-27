const GET_ALL_METHODS = 'method/GET_ALL_METHODS'
const POST_METHODS = 'method/POST_METHODS'
const UPDATE_METHODS = 'method/UPDATE_SONG'
const DELETE_SONG = 'method/DELETE_SONG'

const getAll = (allmethods) => ({
    type: GET_ALL_METHODS,
    allmethods
})


