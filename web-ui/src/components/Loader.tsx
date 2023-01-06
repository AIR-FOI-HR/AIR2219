import { ClipLoader } from 'react-spinners';
import { colors } from '../lib/style/theme';

interface Props{
    loading:boolean;
}

const Loader: React.FC<Props> = ({loading}) => {
  return (
    <div hidden={!loading} className="absolute w-screen h-screen bg-primaryBlue z-10">
      <div className='relative'>
        <ClipLoader size={50} color={colors.primaryOrange} loading={loading} className="absolute left-1/2 top-1/2 -ml-6 mt-96"/>
      </div>
    </div>
  );
};

export default Loader;
