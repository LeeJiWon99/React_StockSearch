import React, { useEffect } from "react";
import axios from "axios";

const ApiCaller = (props) => {
  const url =
    "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo";
  const key = process.env.REACT_APP_API_KEY;
  const currentDate = new Date();
      const lastFriday = new Date(currentDate);
      lastFriday.setDate(currentDate.getDate() - (currentDate.getDay() + 2) % 7);
      const formattedDate = `${lastFriday.getFullYear()}${String(lastFriday.getMonth() + 1).padStart(2, "0")}${String(lastFriday.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    const fetchData = async () => {
      props.setLoading(true);
      props.setnoItem(false);
      try {
        const response = await axios.get(url, {
          params: {
            serviceKey:key,
            resultType: "json",
            numOfRows: 10,
            likeItmsNm: props.searchName,
            basDt: 20240322,
            pageNo: props.currentPage,
          },
        });
        const items = response.data.response.body?.items?.item;
        props.setTotalPages(
          Math.ceil(response.data.response.body?.totalCount / 10)
        );
        if (!items.length) {
          props.setItemNames([]);
          props.setnoItem(true);
        } else {
          const itemNames = items.map((item) => ({
            종목명: item.itmsNm,
            시가: item.clpr,
            거래량: item.trqu,
            시가총액: item.mkp,
          }));
          props.setItemNames(itemNames);
        }
        props.setLoading(false);
      } catch (error) {
        props.setError(error);
        props.setLoading(false);
      }
    };

    fetchData();
  }, [props.currentPage, props.searchName]);

  return (
    <div>
      {props.noItem && <div>Not found stock</div>}
      {props.loading && <div>Loading...</div>}
      {props.error && <div>Error occurred: {props.error.message}</div>}
    </div>
  );
};

export default ApiCaller;
