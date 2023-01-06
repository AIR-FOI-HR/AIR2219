

interface Props{
    text:string;
    disabled?:boolean;
    buttonColor?:string;
    width?:string;
    textColor?:string;
    svgImage?:any;
    onClick: any;
}

const SimpleButton : React.FC<Props> = ({text,disabled=false,width=undefined,buttonColor="bg-primaryBlue",textColor="text-white",svgImage=null,onClick}) => {
  return (
    <button onClick={disabled?()=>{}:onClick} className={`mx-14 my-2 p-4 rounded-full shadow-md ${disabled?"bg-borderGrey":buttonColor} ${width} `}>
        <div className="flex flex-row justify-between mx-1 items-center">
            {svgImage && <img src={svgImage} alt="alt"/>}
            <p className={`font-openSans font-semibold text-base text-center mx-7 ${textColor}`}>{text}</p>
            <div className={`${svgImage?"w-5 h-5 bg-transparent":null}`}></div>
        </div>
    </button>
  )
}

export default SimpleButton;
