import React, { useEffect, useState } from 'react'
import Loader from '../../component/loader/Loader';

const ForgotPassword = () => {
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
            <h3>Reset your password!</h3>
            <p>We will discover all about this preposition.</p>
          </div>
        </div>
      }
    </>
  )
}


export default ForgotPassword
