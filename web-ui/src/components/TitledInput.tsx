import React, { useState } from "react";
import hidePasswordIcon from '../assets/ic_HidePassword.svg'
import showPasswordIcon from '../assets/ic_SeePasswordEye.svg'

interface Props{
    title?:string;
    placeholder:string;
    onChange: any;
    onBlur: any;
    value:string;
    touched:boolean | undefined;
    errors:string | undefined;
    password?:boolean;
}

const TitledInput : React.FC<Props> = ({title,placeholder,password=false,...props}) => {
  const [hidePassword,setHidePassword] = useState<boolean>(true)
  const [focus,setFocus] = useState<boolean>(false)
  return (
    <div className='mt-3 mb-3'>
      { title && <p className='text-base m-1'>{title}</p>}
      <div className={`flex flex-row justify-between items-center text-sm font-openSans text-black m-1 pt-2 pb-2 pl-5 pr-5 border-2 rounded-full border-primaryBlue ${(props.errors && props.touched) ? "border-failureRed": "border-primaryBlue"} ${focus?"ring-1":""}`}>

          <input 
          className={`${password?"w-11/12":"flex flex-1"}  focus:outline-none`}
          //onChange={props.onChange}
          //onBlur = {props.onBlur}
          //value= {props.value}
          placeholder={placeholder}
          onFocus={()=>{setFocus(true)}}
          onBlur={()=>{setFocus(false)}}
          type={(password && hidePassword)?"password":"text"}
          />
          {password && 
            <img src={hidePassword?showPasswordIcon:hidePasswordIcon} alt="Hide password icon" onClick={()=>setHidePassword(!hidePassword)} className="cursor-pointer pointer-events-auto w-1/12"/>
          }
      </div>

    {(props.errors && props.touched) &&
      <p className="text-xs font-openSans text-failureRed m-1">*{props.errors}</p>
    }
    </div>
  )
}

export default TitledInput
