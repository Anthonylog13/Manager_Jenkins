import {ReviewTypes} from "../types"

export const reviewReducer = (state = {}, action) => {

    switch (action.type) {
        case ReviewTypes.saveReview:
            return {
                ...state,
                review: state.review.push(action.payload)
            }
        default:
            return state;
    }
}