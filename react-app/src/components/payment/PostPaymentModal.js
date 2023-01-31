import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createMethod } from "../../store/methods";
import { useModal } from '../../context/Modal';
import './postpayment.css'



function CreatePaymentModal() {
    const history = useHistory()
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.session.user.id)


    const [card_number, setCard_Number] = useState('')
    const [expiration, setExpiration] = useState('')
    const [cvv, setCvv] = useState('')
    const [errors, setErrors] = useState([]);

    const { closeModal } = useModal();

    // useEffect(() => {
    //     dispatch(getAllPayment(id))

    // }, [userId, dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const formData = {
            card_number: card_number,
            expiration: expiration,
            cvv: cvv,
        }

        // return dispatch(createMethod(formData, userId))
        // .catch(
        //     async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(data.errors);
        //         if (data && data.message) setErrors([data.message])
        //     }
        //     )
        //     .then(() => history.push('/'))
        //     .then(() => (closeModal))
        // if (test){

        // closeModal
        // // history.push('/')
        // // .then(closeModal)
        // }


        const test = await dispatch(createMethod(formData, userId))
        .catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                if (data && data.message) setErrors([data.message])
            })

            if (test) {
                closeModal()
                history.push('/')

            }
    }




    return (
        <>
            <h1 className="title">Add Your Card</h1>
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
                                Card Number
                                <input
                                    type='text'
                                    onChange={(e) => setCard_Number(e.target.value)}
                                    value={card_number}
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
                                    onChange={(e) => setExpiration(e.target.value)}
                                    value={expiration}
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
                                    value={cvv}
                                    required
                                    placeholder='CVV'
                                    name='CVV'
                                />
                            </label>
                        </div>
                    </div>
                    <div className='submit-button-div'>
                        <button className="submit-create-card" type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}
export default CreatePaymentModal
