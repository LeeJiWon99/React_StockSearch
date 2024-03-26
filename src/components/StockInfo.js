import React, { useState} from "react";
import "../App.css";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import ApiCaller from "./ApiCaller";

const StockInfo = () => {
  const [itemNames, setItemNames] = useState([]); //API로부터 받은 주식 정보를 저장
  const [noItem, setnoItem] = useState(false); //검색창 확인
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState(""); //검색할 주식 이름을 저장
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [totalPages, setTotalPages] = useState(0); //전체 페이지
  const [modalOpen, setModalOpen] = useState(false); //
  const [modalPost, setModalPost] = useState(null);

  

  return (
    <div>
      <h1>Stock Information</h1>

      <SearchBar
        name={name}
        setCurrentPage={setCurrentPage}
        setName={setName}
        setModalOpen={setModalOpen}
        setSearchName={setSearchName}
        searchName={searchName}
      />

      <ApiCaller
        setLoading={setLoading}
        setError={setError}
        setnoItem={setnoItem}
        searchName={searchName}
        currentPage={currentPage}
        setTotalPages={setTotalPages}
        setItemNames={setItemNames}
        noItem={noItem}
        loading={loading}
        error={error}
      />

      <Modal
      modalOpen={modalOpen}
      modalPost={modalPost}
      setModalOpen={setModalOpen}
      setModalPost={setModalPost}
      itemNames={itemNames}
      />

      

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setModalOpen={setModalOpen}
      />
    </div>
  );
};



export default StockInfo;
