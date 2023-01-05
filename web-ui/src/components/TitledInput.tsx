
interface Props{
    title:string;
    placeholder:string;
    onChangeText:(event: string) => void;
    //onBlur:(event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    value:string;
    touched:boolean | undefined;
    errors:string | undefined;
}

const TitledInput : React.FC<Props> = ({title,placeholder,...props}) => {
  
  return (
    <div className='mt-3 mb-3'>
      <p className='text-base m-1'>{title}</p>
      <input 
      style={{/*[styles.input, /*{borderColor: (props.errors && props.touched) ? color.failureRed:color.primaryBlue}]*/}} 
      placeholder={placeholder}
      //onChangeText={props.onChangeText}
      //onBlur = {props.onBlur}
      value= {props.value}
      />
    {(props.errors && props.touched) &&
      <p /*style={[styles.warning,]}*/>*{props.errors}</p>
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