import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";


export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [doctors,setDoctors] = useState([])
    const [token,setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'):'')
    const [userData,setUserData] = useState(false)

    const currencySymbol = '₹';
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    

    const getDoctorsData = async()=>{
        try{
            const {data} = await axios.get(backendUrl+'/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }

    const loadUserProfileData = async()=>{
        try{
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
            if(data.success){
                console.log("Token:",token)
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }

        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }
    
    

    const value ={
        doctors,currencySymbol,token,setToken,backendUrl,userData,setUserData,loadUserProfileData,getDoctorsData
    }
    

    useEffect(()=>{
        getDoctorsData()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }else{
            setUserData(false)
        }
    },[token])

    

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider