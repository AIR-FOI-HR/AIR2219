import React from 'react'

interface Props{
    value:string;
    fontSize:string;
    color:string;
}

const Title : React.FC<Props>= ({value,fontSize,color}) => {
  return (
    <div className='m-5'>
      <p className= {`font-semibold text-center ${fontSize} ${color}`}>{value}</p>
    </div>
  )
}

export default Title
