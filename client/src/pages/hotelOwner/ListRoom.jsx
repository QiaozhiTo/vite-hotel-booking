import React from 'react'
import Title from '../../components/Title'
// import { roomsDummyData } from '../../assets/assets'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const ListRoom = () => {
    const [rooms, setRooms] = useState([]);
    const {axios, getToken, user, currency} = useAppContext();


    // fetch rooms of the hotel owner
    const fetchRooms = async () =>{
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/rooms/owner', 
            {headers:{Authorization : `Bearer ${ token }`}})
            if (data.success) {
                setRooms(data.rooms)
                console.log("yes")
                console.log(data)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }

//     const toggleAvailability = async (roomId) => {
//   console.log("➡️ call toggle with roomId =", roomId);
//   try {
//     const token = await getToken();               // 确保是字符串
//     const resp = await axios.post(
//       "/api/rooms/toggle-availability",
//       { roomId },                                 // 确保不是 undefined/空
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     console.log("✅ status:", resp.status, "data:", resp.data);
//     const { data } = resp;                        // 这里再解构
//     // ...处理 data
//   } catch (err) {
//     console.log(
//       "❌ request failed:",
//       err.response?.status,
//       err.response?.data || err.message
//     );
//     // 让 UI 看到后端报的 message
//     toast.error(err.response?.data?.message || err.message);
//   }
// };

        // toggle availability of the room
    const toggleAvailability = async (roomId)=>{ 
        // console.log("🛰️  toggle hit:", { body: req.body, userId: req.userId });

        const { data } = await axios.post('/api/rooms/toggle-availability', {roomId},
                                      {headers:{Authorization: `Bearer ${ await getToken() }`}})
   
        if (data.success){
            console.log('yes2')
                toast.success(data.message)
                fetchRooms()
            } else {
                toast.error(data.message)
            }

    }


    useEffect(()=>{
        if (user) {
            fetchRooms()
        }
    }, [user])



  return (
    <div>
        <Title align='left' font='outfit' title="Room Listings" subTitle = 'View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.'></Title>
        <p className='text-gray-500 mt-8'>Total Hotels</p>
        <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>
            <table className='w-full'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                        <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
                        <th className='py-3 px-4 text-gray-800 font-medium'>Price/ night</th>
                        <th className='py-3 px-4 text-gray-800 font-medium text-center'>Action</th>
                    </tr>
                </thead>
                <tbody className='text-sm'>
                    {
                    rooms.map((item,index)=>(
                    <tr key={index}>
                        <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                            {item.roomType}
                        </td>
                        <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                            {item.amenities.join(',')}
                        </td>
                        <td className='py-3 px-4 text-gray-700 border-t border-gray-300 '>
                            {currency}{item.pricePerNight}
                        </td>
                        <td className='py-3 px-4 border-t border-gray-300 text-center'>
                            <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                                <input onChange = {()=> toggleAvailability(item._id)} type='checkbox' className='sr-only peer' checked = {Boolean(item.isAvailable)}/>
                                <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'></div>
                                <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                            </label>

                        </td>
                    </tr>
                    ))
                    }

                </tbody>
            </table>
        </div>
       

    </div>
  )
}

export default ListRoom