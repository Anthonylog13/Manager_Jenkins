import { useContext, useReducer } from 'react'
import { reviewReducer } from '../reducers'
import { AuthContext } from '../../auth'
//import { FirebaseDB } from '../../firebase/config'
import { ReviewTypes } from '../types'
import { ReviewContext } from './ReviewContext'
import { collection, doc, setDoc } from 'firebase/firestore/lite'



const initialState = {
    review: []
}

export const ReviewProvider = ({children}) => {
    const [reviewState, dispatch] = useReducer(reviewReducer, initialState);

    const { user } = useContext(AuthContext);

    const saveReview = async (review) => {
    
        try {
            console.log(review)
            /*const newReview = doc(collection(FirebaseDB, "review"));
           
            console.log(newReview)

            await setDoc(newReview, review);

            review.id = newReview.id

            const action = { type: ReviewTypes.saveReview, payload: review }

            dispatch(action); */

        } catch (error) {
            console.log(error)
        }

    }
    return (

        <ReviewContext.Provider value={
            {
                ...reviewState,
                saveReview,
                user
            }
        }> 
        {children}
        </ReviewContext.Provider>



    )

}
