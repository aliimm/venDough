import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getSpecficTransaction } from '../../store/transactions'
import './transactiondetails.css'
import moment from 'moment'
import { getAllComments, postAComment, deleteAComment} from '../../store/comments'


moment.updateLocale("en", {
    relativeTime: {
        future: (diff) => (diff === "just now" ? diff : `in ${diff}`),
        past: (diff) => (diff === "just now" ? diff : `${diff}`),
        s: "just now",
        ss: "just now",
        m: "1 minute",
        mm: "%d min",
        h: "1 hr",
        hh: "%d hrs",
        d: "1 day",
        dd: "%d days",
        M: "1 month",
        MM: "%d months",
        y: "1 year",
        yy: "%d years",
    },
});


const TransactionDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [users, setUsers] = useState([])
    const [newComment, setNewComment] = useState('')
    const [errors, setErrors] = useState([])
    const history = useHistory()



    useEffect(() => {
        dispatch(getSpecficTransaction(id))
        dispatch(getAllComments(id))

        if (!users.length) {

            async function fetchData() {
                const response = await fetch('/api/users/')
                const responseData = await response.json()
                setUsers(responseData.users)
            }
            fetchData()
        }

    }, dispatch)

    const specificTransaction = useSelector(state => state.transactions.singleTransaction)
    const session = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments.comments)
    const commentData = Object.values(comments)

    if (!specificTransaction) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
          'transaction_id': Number(id),
          'user_id': session.id,
          'comment': newComment
        }
        const postedComment = await dispatch(postAComment(id, payload))
        .catch(
          async (res) => {
            const data = await res.json()
            if(data && data.errors) setErrors(data.errors)

          }
        )
        if(postedComment) {
          (history.push(`/${id}/transaction`))
        }
        setNewComment('')
      }

      let message = ''

      const handleDeletion = async (commentId) => {
        const response = await dispatch(deleteAComment(commentId))
        console.log('message', message)
        if (response){
          message = response.message
        }
      }




    return (
        <div className='details-container-transaction'>
            <div className='transaction-div'>
                <div><img className='image-avi-alltransactions' src={users?.find(user => user?.id === specificTransaction?.sender_id)?.profile_photo}></img></div>
                <div className='paid-message-and-notes-details'>
                    <div className='paid-message-details'><p><b>{users.find(user => user?.id === specificTransaction?.sender_id)?.first_name} {users.find(user => user?.id === specificTransaction?.sender_id)?.last_name}</b><span> paid</span> <b>{users?.find(user => user.id == specificTransaction?.recipient_id)?.first_name} {users?.find(user => user.id == specificTransaction?.recipient_id)?.last_name}</b></p></div>
                    <div>
                        {moment(specificTransaction.created_at).fromNow()} <i className="fa-solid fa-earth-americas"></i>
                    </div>

                    <div className='transaction-message'>{specificTransaction.message}</div>
                </div>
            </div>
            <div className='comments-container'>
                {commentData.map(comment => (
                    <div className='comments-div'>
                        <div><img className='image-avi-alltransactions' src={users?.find(user => user?.id === comment?.user_id)?.profile_photo}></img></div>
                        <div className='comment-details-div'>
                            <div className='paid-message-details' ><b>{users.find(user => user?.id === comment?.user_id)?.first_name} <b>{users.find(user => user?.id === comment?.user_id)?.last_name}</b></b></div>
                            <div className='timestamp-comment-details'>
                                {moment(comment.created_at).fromNow()}
                                {comment.user_id === session.id &&

                                    <div><button className='delete-comment' onClick={() => handleDeletion(comment.id)}><b>Delete</b></button></div>
                                }
                            </div>
                            <div className='comment-message-details'>
                                <p>{comment.comment}</p>
                            </div>
                        </div>



                    </div>


                ))}
                        <div className='comment-input'>
                            <input
                                type='text' required
                                onChange={(e) => setNewComment(e.target.value)}
                                value={newComment}
                                placeholder='Write a Comment'>
                            </input>
                            <button
                                className='post-comment-button'
                                onClick={handleSubmit}
                                >Post Comment</button>
                        </div>



            </div>

        </div>
    )
}

export default TransactionDetails
