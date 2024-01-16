import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdOutlineContentCopy } from 'react-icons/md';
import axios from 'axios';

import { FileUploader } from '../FileUploader';
import { Copy } from './styled';

const FILTER_VALUE = ['evosw', 'pragmaticplaylive', 'pragmatic play live', 'pilot'];

export function Cashback() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://cashback-calc-mlr6.onrender.com/');

      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data?.slice(0, -1).filter(item => {
    return !FILTER_VALUE.some(value => {
      return item['﻿sep=']?.toLowerCase().includes(value);
    });
  });

  const filteredData2 = data?.filter(item => {
    return FILTER_VALUE.some(value => {
      return item['﻿sep=']?.toLowerCase().includes(value);
    });
  });

  const finalSumInLiveGames = filteredData2?.reduce((acc, el) => {
    const RealBets = Math.abs(el?._4 && Number(el?._4));
    const RealWins = Math.abs(el?._7 && Number(el?._7));

    if (typeof RealBets === 'number' && typeof RealWins === 'number') {
      const difference = RealBets - RealWins;

      return !isNaN(difference) ? acc + difference : acc;
    }
    return acc;
  }, 0);

  const finalSumWithoutLiveGames = filteredData?.reduce((acc, el) => {
    const RealBets = Math.abs(el?._4 && Number(el?._4));
    const RealWins = Math.abs(el?._7 && Number(el?._7));

    if (typeof RealBets === 'number' && typeof RealWins === 'number') {
      const difference = RealBets - RealWins;

      return !isNaN(difference) ? acc + difference : acc;
    }
    return acc;
  }, 0);

  return (
    <>
      <div
        style={{
          display: 'inline-block',
          padding: '10px',
          border: '3px solid black',
          marginLeft: 15,
        }}
      >
        <div
          style={{
            fontSize: '25px',
          }}
        >
          TOTAL: {finalSumWithoutLiveGames}{' '}
          <Copy type="button" onClick={() => navigator.clipboard.writeText(finalSumWithoutLiveGames)}>
            <MdOutlineContentCopy size="15" />
          </Copy>
        </div>
        <p style={{ color: 'red', margin: 0 }}>NGR в Live играх: {finalSumInLiveGames}</p>
      </div>

      <FileUploader />

      <div style={{ paddingLeft: 20, marginTop: 20 }}>
        <ul style={{ listStyle: 'none' }}>
          {!isLoading &&
            data.length > 0 &&
            data.slice(0, -1).map((el, index) => {
              return (
                <li key={uuidv4()}>
                  {index + 1} * {el['﻿sep=']} * {el['']} * {el?._4 && Number(el?._4)} *{' '}
                  {el?._7 && Math.abs(Number(el?._7))}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
