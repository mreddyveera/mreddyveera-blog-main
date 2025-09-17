import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Theme({ children }) {
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}

export default Theme;
