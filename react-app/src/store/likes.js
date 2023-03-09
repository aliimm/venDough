const GET_LIKES = 'likes/GET_LIKES'
const POST_LIKE = 'likes/POST_LIKE'

const getLikes = (likes) => ({
    type:GET_LIKES,
    likes
})

const postLike = (like) => ({
    type: POST_LIKE,
    like
})


export const postALike = (payload, id) => async dispatch => {
    console.log(payload)
    const response = await fetch(`/api/transactions/${id}/likes`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    if (response.ok){
        const newLikes = await response.json()
        newLikes['likes'] = newLikes.likes
        dispatch(postLike(newLikes))
        return newLikes
    }


}


export const getLikesBySongId = (id) => async(dispatch) => {
    const response = await fetch(`/api/transactions/${id}/likes`)

    if(response.ok){
        const likes = await response.json()

        dispatch(getLikes(likes))
    }
    return response
}

const initialState = {likes: {}}

const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIKES: {

          const newState = { ...state }
          const updated_likes =  {}
          updated_likes["totalLikes"] = action.likes.likes
          newState.likes = updated_likes
         return newState
        }
        case POST_LIKE: {
            const newState = {...state}
            const updated_likes = {}
            updated_likes['totalLikes'] = action.like.likes
            newState.likes = updated_likes
            return newState
          }
        default:
          return state

      }

}
export default likesReducer
