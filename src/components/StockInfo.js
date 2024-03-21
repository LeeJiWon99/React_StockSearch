import React, { useState } from 'react';
import axios from 'axios';

const StockInfo = () => {
  const [itemNames, setItemNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");

  const url = 'https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo';
  const key = process.env.REACT_APP_API_KEY;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        params: {
          serviceKey: key,
          numOfRows: 1,
          resultType: 'json',
          itmsNm: name
        }
      });
      const items = response.data.response.body?.items?.item;
      if (!items) {
        console.log('No items found');
        setItemNames([]);
      } else {
        const itemNames = items.map(item => ({
          종목명: item.itmsNm,
          시가: item.clpr,
          거래량: item.trqu,
          시가총액: item.mkp,
          기준일자: item.basDt
        }));
        setItemNames(itemNames);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <h1>Stock Information</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="종목명"
        />
        <button type="submit">Submit</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error occurred: {error.message}</div>}
      <ul>
        {itemNames.map((item, index) => (
          <li key={index}>
            <h2>{item.종목명}</h2>
            <p>시가: {item.시가}</p>
            <p>거래량: {item.거래량}</p>
            <p>시가총액: {item.시가총액}</p>
            <p>기준일자: {item.기준일자}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockInfo;