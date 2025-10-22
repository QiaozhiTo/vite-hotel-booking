import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const ExclusiveOffer = ({offer,index}) => {
  return (
    <div>
        <div>
            <Title align='left' title='Exclusive Offers' subTitle='Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.'/>
            <button>
                View All Offers
                <img src={assets.arrowIcon} alt="arrow-icon" className='group-hover:translate-x-1 transition-all'/>
            </button>
        </div>
    </div>
 
  )
}

export default ExclusiveOffer