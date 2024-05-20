import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdOutlineContentCopy } from 'react-icons/md';
import axios from 'axios';

import { FileUploader } from '../FileUploader';
import { Copy } from './styled';

const FILTER_VALUE = ['evosw', 'pragmaticplaylive', 'pragmatic play live', 'pilot'];

export default function Cashback() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://cashback-calc-mlr6.onrender.com/');
      // const response = await axios.get('http://localhost:3001');

      setData(response.data);
      console.log('response.data', response.data);
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
    console.log('el', el);
    const RealBets = Math.abs(el?._5 && Number(el?._5));
    const RealWins = Math.abs(el?._8 && Number(el?._8));

    if (typeof RealBets === 'number' && typeof RealWins === 'number') {
      const difference = RealBets - RealWins;

      return !isNaN(difference) ? acc + difference : acc;
    }
    return acc;
  }, 0);
  console.log('finalSumInLiveGames', finalSumInLiveGames);

  const finalSumWithoutLiveGames = filteredData?.reduce((acc, el) => {
    const RealBets = Math.abs(el?._5 && Number(el?._5));
    const RealWins = Math.abs(el?._8 && Number(el?._8));

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
                  {index + 1} * {el['﻿sep=']} * {el['']} * {el?._5 && Number(el?._5)} *{' '}
                  {el?._8 && Math.abs(Number(el?._8))}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
