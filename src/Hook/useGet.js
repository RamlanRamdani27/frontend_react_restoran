import { useState, useEffect } from 'react';
import { link } from '../Axios/link';

const useGet = (url) => {
  const [isi, setIsi] = useState([]);

  useEffect(() => {
    let ambil = true;

    async function fetchData() {
      const res = await link.get(url);
      if (ambil) {
        setIsi(res.data);
      }
    }

    fetchData();
    return () => {
      ambil = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isi]);

  return [isi];
};

export default useGet;
