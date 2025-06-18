import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"

const DoctorsList = () => {
  const {doctors, aToken, changeAvailability, getAllDoctors} = useContext(AdminContext)
      
  useEffect(()=>{
    if(aToken){
      getAllDoctors()
    }
  },[aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-auto'> {/* Changed from scroll to auto */}
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5'>
        {
          doctors.map((item,index)=>(
            <div className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer group hover:shadow-md transition-shadow' key={index}>
              <div className='aspect-square bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500'>
                <img className='w-full h-full object-cover' src={item.image} alt=""/>
              </div>
              <div className='p-4'>
                <p className='text-[#262626] text-lg font-medium truncate'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm truncate'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available}/>
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList