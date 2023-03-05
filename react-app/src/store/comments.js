const GET_ALL_COMMENTS = 'comment/GET_ALL_COMMENTS'
const POST_COMMENT = 'comment/POST_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'

const getAll = (comments) => ({
    type: GET_ALL_COMMENTS,
    comments
})

const postComment = (comment) => ({
  type: POST_COMMENT,
  comment
})



const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId
})

export const deleteAComment = (commentId) => async(dispatch) => {
  const response = await fetch(`/api/transactions/comments/${commentId}`, {
    method: 'DELETE'
  })
  console.log('response', response)
  if (response.ok){
    const deletionResponse = await response.json()

    dispatch(deleteComment(commentId))
    return deletionResponse
  }
}

export const postAComment = (id, payload) => async(dispatch) => {
  const response = await fetch(`/api/transactions/${id}/comments/new`, {

      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
  })

  if (response.ok){
    const newComment = await response.json()
    dispatch(postComment(newComment))
    return newComment
  }

}


export const getAllComments = (id) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${id}/comments`);

    if (response.ok) {
      const comments = await response.json();

      dispatch(getAll(comments));
    }
    return response
  };

  const initialState = { comments: {} }

  const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COMMENTS: {

          const newState = { ...state }
          const newObject = {}
          action.comments.comments.forEach(comment => {
            newObject[comment.id] = comment
          })

         newState.comments = newObject
         return newState

        }
        case POST_COMMENT: {
          const newState = {...state}
          const newObject = {...state.comments}
          newObject[action.comment.id] = action.comment
          newState.comments = newObject
          return newState
        }
        case DELETE_COMMENT:{
          const newState = {...state}
          const newObject = {...state.comments}
          delete newObject[action.commentId]
          newState.comments = newObject
          return newState
        }

        default:
          return state
      }
}


export default commentsReducer
