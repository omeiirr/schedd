const handleLogout = () => {
  localStorage.removeItem('avatarUrl');
  localStorage.removeItem('username');
  localStorage.removeItem('password');
  window.location.href = '/';
};

export default handleLogout;
