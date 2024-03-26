import React from "react";

const SearchBar=(props)=>{
    //검색구현
  const handleSubmit = (event) => {
    event.preventDefault();
    if(props.name===''){
      alert('종목명을 입력해주세요.');
    }
    else{
      props.setCurrentPage(1);
      props.setModalOpen(false);
      props.setSearchName(props.name);
      props.setName("");
    }
  };
  const handleNameChange = (event) => {
    props.setName(event.target.value);
  };
    return(
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={props.name}
            onChange={handleNameChange}
            placeholder="종목명"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }


export default SearchBar;