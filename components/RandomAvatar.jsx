import { useState, useEffect } from 'react';

const RandomAvatar = ({ setAvatar }) => {
  const avatarCategories = [
    // Inactive
    // 'jdenticon',
    // 'pixel-art-neutral',
    // 'croodles',

    // Active
    'avataaars',
    'gridy',
    'bottts',
    'adventurer',
    'adventurer-neutral',
    'micah',
    'miniavs',
    'open-peeps',
    'personas',
    'pixel-art'
  ];
  const [avatarCategory, setAvatarCategory] = useState('');
  const [avatarSeed, setAvatarSeed] = useState('');
  const [avatarLink, setAvatarLink] = useState(
    `https://avatars.dicebear.com/api/${avatarCategory}/${avatarSeed}.svg?options[radius]=50`
  );

  const generateRandomSeed = () => {
    const tempCategory = avatarCategories[Math.floor(Math.random() * avatarCategories.length)];
    const tempSeed = Math.random().toString(36);
    setAvatarCategory(tempCategory);
    setAvatarSeed(tempSeed);
  };

  useEffect(() => {
    generateRandomSeed();
  }, []);

  useEffect(() => {
    setAvatar(
      `https://avatars.dicebear.com/api/${avatarCategory}/${avatarSeed}.svg?options[radius]=50`
    );
    setAvatarLink(
      `https://avatars.dicebear.com/api/${avatarCategory}/${avatarSeed}.svg?options[radius]=50`
    );
    // Use multiple options like this:
    // `https://avatars.dicebear.com/api/${avatarCategory}/${avatarSeed}.svg?options[radius]=50&options[dataUri]=true`
  }, [avatarCategory, avatarSeed]);

  return (
    <div className='flex flex-col items-center '>
      <img
        src={avatarLink}
        alt='avatar'
        onClick={generateRandomSeed}
        width={60}
        height={60}
        className='bg-blue-100 rounded-full shadow-md'
      />
    </div>
  );
};

export default RandomAvatar;
