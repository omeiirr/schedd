import { useState } from 'react';
import Header from 'components/Header';
import Head from 'next/head';
import useDetectPWA from 'hooks/useDetectPWA';

const PWA = () => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isPwaInstalled] = useDetectPWA();
  const installDemonstrationImages = [
    'https://user-images.githubusercontent.com/54888682/151700960-f9540f10-60a0-4830-8de6-92de10cc1d48.jpg',
    'https://user-images.githubusercontent.com/54888682/151701252-b62b5a66-673a-4a63-a005-19cf1a5aa931.jpg',
    'https://user-images.githubusercontent.com/54888682/151701452-400198c6-1193-4965-b628-3da40f71aae3.jpg'
  ];
  return (
    <>
      <Head>
        <title>PWA - Schedd</title>
      </Head>
      <div>
        <Header title='PWA' />
        <main className='p-4 text-sm text-justify '>
          <p className='mb-5 '>
            Schedd is built as a PWA, or, Progressive Web Application. This means that you can
            install it on your your phone like a regular native app, but without it taking up space.
            <br /> Best of both worlds!
          </p>
          <p className='mb-5 '>
            Installation uses almost no storage and provides a quick way to return to this app, with
            many other features.
          </p>

          {isPwaInstalled ? (
            <p>PWA is already installed ✨</p>
          ) : (
            <div>
              <p className='text-sm'>Steps to install</p>
              <ul className='text-sm list-decimal list-inside'>
                <li>Open the browser menu</li>
                <li>Select 'Add to Home Screen'</li>
                <li>Place app icon on screen</li>
              </ul>
              {/* <button className='w-full px-4 py-2 text-white rounded-lg shadow-lg bg-primary-500'>
                Install now
              </button> */}
              <div className='w-full '>
                <div className='flex items-center w-full h-auto gap-4 px-4 pb-6 mt-4 overflow-hidden overflow-x-scroll '>
                  {installDemonstrationImages.map((image, idx) => {
                    return (
                      <img
                        key={idx}
                        src={image}
                        className='border-2 shadow-below h-96 rounded-2xl w-60'
                        alt={`install_demonstration${idx + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          <button
            className='mt-5 text-sm font-bold text-gray-500 transition-all'
            onClick={() => setShowMoreInfo(!showMoreInfo)}
          >
            {showMoreInfo && <p>Show less &#x25B2;</p>}
            {!showMoreInfo && <p>Learn more &#x25BC;</p>}
          </button>

          <div
            className={`transition-all duration-300 ${showMoreInfo ? 'opacity-100' : 'opacity-0'}`}
          >
            <p className='mb-5'>
              PWAs are a category of applications that bridge the gap between websites and native
              apps, offering features previosuly not possible on websites.
            </p>

            <p>Some more PWA features that Schedd leverages are:</p>
            <ul className='list-disc list-inside'>
              <li>Data caching (coming soon)</li>
              <li>Notifications (coming soon)</li>
              <li>Offline support (coming soon)</li>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
};

export default PWA;
