import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createTransaction } from "../../store/transactions";
import './transaction.css'

const CreateTransaction = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()

    const currentUser = useSelector(state => state.session.user.id)

    console.log(id)
    const [payment_method, setPayment_method] = useState('')
    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState('0')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState([]);
    const [users, setUsers] = useState([])

    useEffect(() => {

        if (!users.length) {

            async function fetchData() {
                const response = await fetch('/api/users/')
                const responseData = await response.json()
                setUsers(responseData.users)
            }
            fetchData()
        }

    }, [], [dispatch])

    console.log('list', users)






    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const formData = {
            recipient_id: recipient,
            payment_method: payment_method,
            amount: amount,
            message: message,
        }


        const test = await dispatch(createTransaction(formData, id))
            .catch(
                async (res) => {
                    console.log('RESSS', res)
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                    if (data && data.message) setErrors([data.message])
                })

        if (test) {
            history.push('/home')
        }

        // const test = await dispatch(createTransaction(formData, id))

        // if (test && test.errors) {
        //     setErrors([test.errors])

        // } else {
        //     history.push('/')
        // }



    }





    return (
        <div className="pay-container">
            <div className="container-content">
                <div className="Pay-title">Pay</div>
                <form className="add-transaction-form-container" onSubmit={handleSubmit} >
                    <div>
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul >
                        <div >
                            <div className="amount-form-div">
                                <div className="money-sign-amount">$</div>
                                <input
                                    className="amount-form-box"
                                    type='number'
                                    onChange={(e) => setAmount(e.target.value)}
                                    value={amount}
                                    required
                                    placeholder='0'
                                    name='amount'
                                />
                            </div>
                            <div >
                                <label>
                                    recipient:
                                    <select onChange={(e) => setRecipient(e.target.value)} className='recipient-element' >
                                        {users.map(user => (
                                            <option value={user.id}>{user.username}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div >
                            </div>
                            <div className="notes-text-area-div">
                                <textarea
                                    className="notes-text-area"
                                    type='text'
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    required
                                    placeholder='notes'
                                    name='notes'
                                />
                            </div>
                        </div>
                        <div >
                            <label>
                                payment method
                                <input
                                    type='number'
                                    onChange={(e) => setPayment_method(e.target.value)}
                                    value={payment_method}
                                    placeholder='payment method'
                                    name="payment method"
                                />
                            </label>
                        </div>
                        <div className='submit-button-div'>
                            <button className="submit-create-transaction" type='submit'>Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreateTransaction
