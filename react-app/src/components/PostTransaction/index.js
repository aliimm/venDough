import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createTransaction } from "../../store/transactions";
import { getAllPayment } from '../../store/methods';
import ProgressBar from "@badrap/bar-of-progress";
import './transaction.css'
const progress = new ProgressBar();

const CreateTransaction = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()

    const currentUser = useSelector(state => state.session.user?.id)
    const alluserCards = useSelector(state => state.methods?.methods)
    const sessionCards = Object?.values(alluserCards)


    const [payment_method, setPayment_method] = useState('')
    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState('0')
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState([])
    const [validationErrors, SetvalidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = []
        if (!payment_method.length) errors.push('need to select payment')
        if (!recipient.length)  errors.push('need to select recipient')

        SetvalidationErrors(errors)
    }, [payment_method, recipient])



    useEffect(() => {
        progress.start();

        dispatch(getAllPayment(id))

        if (!users.length) {

            async function fetchData() {
                const response = await fetch('/api/users/')
                const responseData = await response.json()
                setUsers(responseData.users)
            }
            fetchData()
        }
        setTimeout(() => {
            progress.finish();
          }, 1000);

    }, id, [], [dispatch],)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true);
        if (validationErrors.length) return alert('Cannot Submit');

        const formData = {
            recipient_id: recipient,
            payment_method: payment_method,
            amount: amount,
            message: message,
        }

        const test = await dispatch(createTransaction(formData, id))
            .catch(
                async (res) => {
                    const data = await res.json();
                    // if (data && data.errors) setErrors(data.errors);
                    // if (data && data.message) setErrors([data.message])
                })

        if (test) {
            history.push('/home')
        }

    }
    const newusers = users?.filter(user => user.id !== currentUser)


    return (
        <div className="pay-container">
            <div className="container-content">
                    <ul className="errors-pay-transaction">
                        {hasSubmitted && validationErrors.length > 0 && (
                            <div>
                                The following errors were found:
                                <ul>
                                    {validationErrors.map(error => (
                                        <p className='specifc-errors-payform' key={error}>*{error}</p>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </ul >
                <div className="Pay-title">Pay</div>
                <form className="add-transaction-form-container" onSubmit={handleSubmit} >
                    <div>
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
                                    min={1}
                                />
                            </div>
                            <div >
                                <label id="myDropdown" className="recipient-label">
                                    recipient:
                                    <select onChange={(e) => setRecipient(e.target.value)} className='recipient-element' >
                                        <option hidden selected>Select one...</option>
                                        {newusers.map(user => (
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
                                    // style="resize: none;"
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
                                <div className="payment-method-field-title">payment method:</div>
                                <select id="myDropdown" className="payment-method-input" onChange={(e) => setPayment_method(e.target.value)}>
                                    <option hidden selected>Select one...</option>
                                    {sessionCards.map(card => (

                                        <option value={card.id} >Debit Card •• {card.card_number.substr(-4)}</option>

                                    ))}
                                </select>
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
