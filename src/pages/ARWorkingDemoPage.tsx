import { useEffect } from 'react';

const ARWorkingDemoPage = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = "https://augmentedreality-six.vercel.app/";
    }, 1000); // 1-second delay before redirect

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-500"></div>
    </div>
  );
};

export default ARWorkingDemoPage;
