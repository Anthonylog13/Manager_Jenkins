import React, { useContext, useReducer } from 'react'
import { productReducer } from '../reducers/productReducer'
import { AuthContext } from '../../auth'
//import { FirebaseDB } from '../../firebase/config'
import { productTypes } from '../types'
import { ProductContext } from './ProductContext'
import { collection, doc, setDoc } from 'firebase/firestore/lite'

const initialState = {
    product: []
}

export const ProductProvider = ({children}) => {
    const [productState, dispatch] = useReducer(productReducer, initialState);

    const { user } = useContext(AuthContext);

    const saveProduct = async (product) => {
    
        try {
            console.log(product)
           
           /* const newProduct = doc(collection(FirebaseDB, "products"));
           
            console.log(newProduct)

           await setDoc(newProduct, product);

            product.id = newProduct.id */

            const action = { type: productTypes.saveProduct, payload: product }

            dispatch(action);

        } catch (error) {
            console.log(error)
        }

    }
    return (

        <ProductContext.Provider value={
            {
                ...productState,
                saveProduct,
                user
            }
        }> 
        {children}
        </ProductContext.Provider>



    )

}

