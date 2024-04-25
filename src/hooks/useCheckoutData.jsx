import { useState } from "react"

export const useCheckoutData = ()=>{
    const [isComplete,setIsComplete] = useState(false);

    const handleSubmit = (checkoutData)=>{
        console.log(checkoutData);
        setIsComplete(true)
    }
    return{
        isComplete,
        handleSubmit
    }
}