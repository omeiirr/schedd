const Tag = ({ content, colortheme }) => {
  switch (colortheme) {
    case 'green':
      return <span className='text-green-800 bg-green-300 card-tag'>{content}</span>;

    case 'red':
      return <span className='text-red-900 bg-red-300 card-tag '>{content}</span>;

    case 'blue':
      return <span className='text-blue-700 bg-blue-200 card-tag '>{content}</span>;

    case 'yellow':
      return <span className='text-yellow-900 bg-yellow-300 card-tag '>{content}</span>;

    default:
      return <span className='text-white bg-gray-800 card-tag'>{content}</span>;
  }
};

export { Tag };
