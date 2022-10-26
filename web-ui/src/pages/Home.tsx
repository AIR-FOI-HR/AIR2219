import React from 'react';
import Button, { ButtonType } from '../components/Button';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <Link to={"/button"}>
        <Button text="Go to buttons" type={ButtonType.PRIMARY} />
      </Link>
    </>
  );
};

export default Home;
