import { useLayoutEffect, useState } from 'react';
import Head from 'next/head';

// Libraries
import { SkeletonCircle } from '@chakra-ui/react';
import axios from 'axios';

// Components
import Header from 'components/Header';

const Contribute = () => {
  const [contributors, setContributors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const fetchContributors = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_GITHUB_API_URL}/repos/omeiirr/schedd/contributors`)
      .then((res) => {
        if (res.status === 200) {
          let tempArray = [];
          res.data.map((item) => {
            let tempObject = {};
            tempObject['userId'] = item.id;
            tempObject['username'] = item.login;
            tempObject['url'] = item.html_url;
            tempObject['avatarUrl'] = item.avatar_url;

            tempArray.push(tempObject);
          });
          setContributors(tempArray);
          setIsLoaded(true);
        }
      })
      .catch((err) => console.log(err.response));
  };

  useLayoutEffect(() => {
    fetchContributors();
  }, []);

  return (
    <>
      <Head>
        <title>Contribute - Schedd</title>
      </Head>
      <div>
        <Header title='Contribute' />
        <main className='p-4 text-sm'>
          <p className='text-left'>
            Schedd depends on contributions from the open-source community for its maintenance.
          </p>
          <p>
            Check out the repository{' '}
            <a
              href='https://github.com/omeiirr/schedd'
              className='external-link'
              target='_blank'
              rel='noreferrer'
            >
              here
            </a>{' '}
            .
          </p>
          {/* <p>This project exists because of the efforts of all the people who contribute.</p> */}
          <p className='mt-8'>Present contributors:</p>
          <div
            style={{
              marginTop: '1rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
              gap: '20px'
            }}
          >
            {contributors.map((contributor, idx) => (
              <div key={idx}>
                <a href={contributor.url} target='_blank' rel='noreferrer'>
                  <SkeletonCircle isLoaded={isLoaded} width={80} height={80}>
                    <img
                      src={contributor.avatarUrl}
                      alt={contributor.username}
                      title={contributor.username}
                      width={80}
                      height={80}
                      className='rounded-full shadow-lg hover:shadow-xl'
                    />
                  </SkeletonCircle>
                </a>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};
export default Contribute;
