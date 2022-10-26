import Button, { ButtonType } from '../components/Button';
import { Link } from "react-router-dom"

const ButtonTest: React.FC = () => {
  return (
    <>
      <div className="text-center my-5 text-3xl">
        React/Tailwind proof of concept
      </div>
      <div className="flex justify-center gap-5">
        <Link to={"/"}>
          <Button text="Back" type={ButtonType.DANGER} />
        </Link>
        <Button text="Not cool" type={ButtonType.SECONDARY} />
        <Button text="Cool" type={ButtonType.PRIMARY} />
      </div>
    </>
  );
};

export default ButtonTest;
