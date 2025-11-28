import React, { useEffect } from 'react'
// import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
// import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'

const RecommendedHotels = () => {
    
    const{ rooms, searchedCities } = useAppContext();
    const [recommended, setRecommended] = useState([]);
    const filterHotels = () =>{
        // const filteredHotels = rooms.slice().filter( room => searchedCities.includes(room.hotel.city));
        // recommend only the most recent searched City
        console.log('searchedCities = ', searchedCities, 'isArray?', Array.isArray(searchedCities));

        const currentCity = [...searchedCities]
                            .reverse()
                            .find(city => typeof city==='string' && city.trim() != '');
        if (!currentCity){
            setRecommended([]);
            return;
        }
        const filteredHotels = rooms.filter(
            room => room.hotel.city === currentCity
        );

        setRecommended(filteredHotels);
    }
    // console.log("hi")
    console.log('rooms:', rooms);
    console.log('searchedCities:', searchedCities);
    console.log('recommended:', recommended);

    useEffect(() =>{
        filterHotels()
    }, [rooms, searchedCities])

    return recommended.length > 0 && (
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
            <Title title='Recommended Hotels' subTitle={'Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences'}/>
            <div className = 'flex flex-wrap items-center justify-center gap-6 mt-20'>
                {recommended.slice(0, 4).map((room, index)=> (
                    <HotelCard key={room._id} room={room} index={index} />
                ))}
            </div>

        </div>
    )
}

export default RecommendedHotels