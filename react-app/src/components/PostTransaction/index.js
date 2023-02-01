import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createTransaction } from "../../store/transactions";


const CreateTransaction = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()

    console.log(id)
    const [payment_method, setPayment_method] = useState('')
    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState([]);


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
                history.push('/')
            }

        // const test = await dispatch(createTransaction(formData, id))

        // if (test && test.errors) {
        //     setErrors([test.errors])

        // } else {
        //     history.push('/')
        // }



    }





    return (
        <div>
            <div>Pay</div>
            <form className="add-card-form-container" onSubmit={handleSubmit} >
                <div>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul >
                    <div className="form-elements">
                        <div >
                            <label>
                                recipient
                                <input
                                    type='number'
                                    onChange={(e) => setRecipient(e.target.value)}
                                    value={recipient}
                                    placeholder='recipient'
                                    name="recipient"
                                />
                            </label>
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
                        <div >
                            <label>
                                amount
                                <input
                                    type='number'
                                    onChange={(e) => setAmount(e.target.value)}
                                    value={amount}
                                    required
                                    placeholder='amount'
                                    name='amount'
                                />
                            </label>
                        </div>
                        <div>
                            <label >
                                message
                                <input
                                    type='text'
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    required
                                    placeholder='message'
                                    name='message'
                                />
                            </label>
                        </div>
                    </div>
                    <div className='submit-button-div'>
                        <button className="submit-create-card" type='submit'>Submit</button>
                    </div>
                </div>
            </form>

        </div>
    )
}
export default CreateTransaction
