import Link from 'next/link';
import ChevronRight from '../assets/icons/Account/ChevronRight.svg';
import { Tag } from './Tags';
const RowItem = ({ icon, title, tags, description, link }) => {
  return (
    <Link href={link} passHref>
      <div className='flex items-center py-4 border-b-2 cursor-pointer border-b-gray-100'>
        <span>{icon}</span>
        <div className='ml-4'>
          <span className='font-medium text-gray-600 text-md font-heading'>{title}</span>
          {tags?.map((tag, idx) => {
            return (
              <span key={idx}>
                <Tag content={tag.content} colortheme={tag.colortheme} />
              </span>
            );
          })}
          <h6 className='text-sm font-normal text-gray-500'>{description}</h6>
        </div>
        <ChevronRight className='ml-auto' fill='#cecece' height='32px' width='32px' />
      </div>
    </Link>
  );
};

export default RowItem;
