import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from '../../context/Modal';
import { updateACard } from "../../store/methods";




function EditPaymentModal() {

    const editpaymentSelector = useSelector((state) => state.methods.onePaymentMethod.method)
    // const testerrrr = Object.values(editpaymentSelector)
    const dispatch = useDispatch()
    const history = useHistory()
    const [newCardNumber, setCardNumber] = useState(editpaymentSelector.card_number)
    const [newExpirationDate, setExpirationDate] = useState(editpaymentSelector.expiration)
    const [newCvv, setCvv] = useState(editpaymentSelector.cvv)
    const [errors, setErrors] = useState([])

    const { closeModal } = useModal()

    const userId = editpaymentSelector.user_id
    const methodId = editpaymentSelector.id
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])


        const payload = {
            "id": methodId,
            "user_id": userId,
            "card_number": newCardNumber,
            "expiration": newExpirationDate,
            "cvv": newCvv,
        }


        const test = dispatch(updateACard(payload, methodId))
            // .then(closeModal)
            .then(() => history.push(`/`))
            .catch(
                async (res) => {
                    const data = await res.json()
                    if (data && data.errors) setErrors(data.errors)
                }
            )
            if(test){
                closeModal()

            }
            // .then(() => history.push(`/`))
    }


    return (

        <>
            <h1 className="title">Update Your Card</h1>
            <form className="form-container" onSubmit={handleSubmit} >
                <div>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul >
                    <div className="form-elements">
                        <div >
                            <label>
                                Card Number
                                <input
                                    type='text'
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    value={newCardNumber}
                                    placeholder='Card Number'
                                    name="Card Number"
                                />
                            </label>
                        </div>
                        <div >
                            <label>
                                Expiration Date
                                <input
                                    type='date'
                                    onChange={(e) => setExpirationDate(e.target.value)}
                                    value={newExpirationDate}
                                    required
                                    placeholder='Expiration Date'
                                    name='Expiration Date'
                                />
                            </label>
                        </div>
                        <div>
                            <label >
                                CVV
                                <input
                                    type='text'
                                    onChange={(e) => setCvv(e.target.value)}
                                    value={newCvv}
                                    required
                                    placeholder='CVV'
                                    name='CVV'
                                />
                            </label>
                        </div>
                    </div>
                    <div>
                        <button className="newHome-button" type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditPaymentModal
