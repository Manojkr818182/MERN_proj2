import React, { useEffect, useState } from 'react'
import Loader from '../../component/loader/Loader';

const Home = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  return (
    <>
      {loading &&
        <Loader />
      }
      {!loading &&
        <div style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <h3>Home !</h3>
            <p>It's home page.</p>
          </div>
        </div>
      }
    </>
  )
}

export default Home;
