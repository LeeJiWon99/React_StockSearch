import React from "react";

const Pagination=(props)=>{
    //페이지이동
    const changePage = (page) => {
      if (page >= 1 && page <= props.totalPages) {
        props.setCurrentPage(page);
        props.setModalOpen(false);
      }
      window.scrollTo(0, 0);
    };
  
    //페이지번호
    const renderPageNumbers = () => {
      const pageNumbers = [];
      let startPage = 1;
      let endPage = props.totalPages > 10 ? 10 : props.totalPages; // 최대 10개 페이지까지만 표시
    
      if (props.currentPage > 10) { // 현재 페이지가 10 이상이면 시작 페이지를 조정
        startPage = Math.floor((props.currentPage - 1) / 10) * 10 + 1;
        endPage = startPage + 9;
        if (endPage > props.totalPages) { // 끝 페이지가 총 페이지 수를 초과하면 조정
          endPage = props.totalPages;
        }
      }
    
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button key={i} onClick={() => changePage(i)} className={props.currentPage === i ? 'active' : ''}>
            {i}
          </button>
        );
      }
    
      if (props.currentPage > 10) { // 현재 페이지가 10 이상이면 이전 페이지 묶음으로 이동하는 버튼 추가
        pageNumbers.unshift(
          <button key="prev" onClick={() => changePage(startPage - 10)}>
            &laquo;
          </button>
        );
      }
    
      if (props.totalPages > 10 && endPage < props.totalPages) { // 총 페이지가 10페이지 이상이고, 끝 페이지가 총 페이지 수보다 작으면 다음 페이지 묶음으로 이동하는 버튼 추가
        pageNumbers.push(
          <button key="next" onClick={() => changePage(endPage + 1)}>
            &raquo;
          </button>
        );
      }
    
      return pageNumbers;
    };
  
    
    return(
      <div className="pagination">
          {renderPageNumbers()}
      </div>
    )
  }

export default Pagination;
