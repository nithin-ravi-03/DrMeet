import { createContext } from "react";

export const AppContext = createContext()

const AppContextprovider = (props)=>{
    
    const currency = import.meta.env.VITE_CURRENCY
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)
        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }
      



    const value={
        calculateAge,
        slotDateFormat,currency,backendUrl
        
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextprovider