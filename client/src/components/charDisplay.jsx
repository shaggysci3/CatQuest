import React from 'react'



const CharDisplay = ({head}) => {
  return (
    <>
      <div className='characterDisplay'>
        <div className='headDiv'>
          <img className='charHead' src={`../src/assets/${head}`}></img>
        </div>
        
        <img className='charTorso' src='../src/assets/torsoHuman.png'></img>
        <img className='charLegs' src='../src/assets/legsChkn.png'></img>
      </div>
    </>
  )
}

export default CharDisplay
