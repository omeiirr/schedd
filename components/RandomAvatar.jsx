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
    `https://api.dicebear.com/7.x/${avatarCategory}/svg?seed=${avatarSeed}&radius=50`
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
      `https://api.dicebear.com/7.x/${avatarCategory}/svg?seed=${avatarSeed}&radius=50`
      
    );
    setAvatarLink(
      `https://api.dicebear.com/7.x/${avatarCategory}/svg?seed=${avatarSeed}&radius=50`
    );

  }, [avatarCategory, avatarSeed]);

  return (
    <div className='flex flex-col items-center '>
      <img
        src={avatarLink}
        alt='avatar'
        onClick={generateRandomSeed}
        width={60}
        height={60}
        className='bg-primary-100 rounded-full shadow-md'
      />
    </div>
  );
};

export default RandomAvatar;
