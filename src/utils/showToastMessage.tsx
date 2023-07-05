import { toast } from 'react-toastify';
//assets
import { errorIcon } from '../assets/icons';

interface FunctionProps {
  type?: 'base' | 'error';
  text?: string;
}

export const showToastMessage = ({
  type = 'base',
  text = '',
}: FunctionProps) => {
  toast(
    <div className={`toast toast--${type}`}>
      {type === 'error' && <img src={errorIcon} alt='Toast Error' />}
      {text}
    </div>,
    {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'default',
    }
  );
};
