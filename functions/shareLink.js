import ReactGA from 'react-ga4';

const shareLink = (
  title = 'Schedd',
  text = 'Check out Schedd. Track your Amizone classes, attendance, latest results, and much more!',
  url = 'https://schedd.xyz/'
) => {
  ReactGA.event('share_link_init', {
    event_category: 'APP',
    event_label: 'Check out Schedd'
  });

  if (navigator.share) {
    navigator
      .share({
        title: title,
        text: text,
        url: url
      })
      .then(() => {
        ReactGA.event('share_link_completed', {
          event_category: 'APP',
          event_label: 'Check out Schedd'
        });
      })
      .catch((error) => console.log('Error while sharing', error));
  } else {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  }
};

export default shareLink;
