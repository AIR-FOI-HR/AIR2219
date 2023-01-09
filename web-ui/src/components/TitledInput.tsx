import React from "react";
import myLogo from '../assets/ic_Logo.svg';

interface Props{
    title?:string;
    placeholder:string;
    onChange: any;
    onBlur: any;
    value:string;
    touched:boolean | undefined;
    errors:string | undefined;
}

const TitledInput : React.FC<Props> = ({title,placeholder,...props}) => {
  return (
    <div className='mt-3 mb-3'>
      { title && <p className='text-base m-1'>{title}</p>}
      <input 
      className={`text-sm font-openSans text-black m-1 pt-2 pb-2 pl-5 pr-5 border-2 rounded-full border-primaryBlue ${(props.errors && props.touched) ? "border-failureRed": "border-primaryBlue"} focus:ring-1 outline-none ring-primaryBlue`}
      //onChange={props.onChange}
      //onBlur = {props.onBlur}
      //value= {props.value}
      placeholder={placeholder}
      
      />
      
      <img src={myLogo} alt="SVG logo image"/>
    {(props.errors && props.touched) &&
      <p className="text-xs font-openSans text-failureRed m-1">*{props.errors}</p>
    }
    </div>
  )
}

export default TitledInput

// const styles = StyleSheet.create({
//     container:{
//         marginTop:10,
//         marginBottom:10,
//     },

//     title:{
//         fontSize:16,
//         fontFamily:font.regular,
//         color: color.black,
//         margin:5,
//     },

//     input:{
//         fontSize:14,
//         fontFamily:font.regular,
//         color: color.black,
//         margin:5,
//         paddingTop:10,
//         paddingBottom:10,
//         paddingLeft:20,
//         paddingRight:20,
//         borderWidth:1,
//         borderRadius:40,
//         borderColor: color.primaryBlue

//     },

//     warning:{
//         fontSize:12,
//         fontFamily:font.lightItalic,
//         color:color.failureRed,
//         margin:3,
//     }

// })