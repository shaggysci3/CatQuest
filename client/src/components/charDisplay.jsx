import React from 'react'
import { GiBodyBalance } from 'react-icons/gi'



const CharDisplay = ({head,body,leg}) => {
  // console.log("this is head",head)
  return (
    <>
      <div className='characterDisplay'>
        <div className='headDiv'>
          <img className='charHead' src={`../src/assets/${head}`}></img>
        </div>
        <img className='charTorso' src={`../src/assets/${body}`}></img>
        <img className='charLegs' src={`../src/assets/${leg}`}></img>
        <div className='bactaScreen'></div>
      </div>
    </>
  )
}

export default CharDisplay
