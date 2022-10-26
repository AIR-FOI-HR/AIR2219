export enum ButtonType {
    PRIMARY = 'bg-teal-800',
    SECONDARY = 'bg-yellow-400',
    DANGER = 'bg-rose-900'
}

interface Props {
    text: string;
    type: ButtonType;
}

const Button: React.FC<Props> = (props) => {
  return (
    <button className={'text-white h-12 w-20 rounded-full ' + props.type}>{props.text}</button>
  );
}

export default Button;
