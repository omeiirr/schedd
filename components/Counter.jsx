import Plus from 'assets/icons/Coursework/Plus.svg';
import Minus from 'assets/icons/Coursework/Minus.svg';

const Counter = ({
  value = 5,
  handleIncrement = () => {},
  handleDecrement = () => {},
  min = 0,
  max = 5
}) => {
  const svgConfig = {
    height: 20,
    width: 20,
    color: '#ccc'
  };

  return (
    <div className='flex items-center justify-between gap-4'>
      <Minus
        {...svgConfig}
        className={`transition-all duration-300 ${
          value > min ? 'fill-slate-900' : 'fill-gray-300'
        } `}
        onClick={() => {
          value > min && handleDecrement();
        }}
      />
      <span className='text-lg font-semibold'> {value} </span>
      <Plus
        {...svgConfig}
        className={`transition-all duration-300 ${
          value < max ? 'fill-slate-900' : 'fill-gray-300'
        } `}
        onClick={() => {
          value < max && handleIncrement();
        }}
      />
    </div>
  );
};

export default Counter;
