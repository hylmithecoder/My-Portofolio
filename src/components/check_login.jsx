import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // const isLoggedin = localStorage.getItem('isLoggedIn');
    const user = localStorage.getItem('username');
    if (!user) navigate('/login');
  }, [navigate]);
};

export default useAuthRedirect;
