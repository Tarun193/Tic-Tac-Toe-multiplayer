const Square = ({ value, handleClick, index, style }) => {
  return (
    <button
      style={style}
      onClick={() => handleClick(index)}
      className="text-6xl md:text-8xl mx-1 my-1 w-20 h-20 md:w-28 md:h-28 bg-slate-800 bg-opacity-50"
    >
      {value}
    </button>
  );
};

export default Square;
