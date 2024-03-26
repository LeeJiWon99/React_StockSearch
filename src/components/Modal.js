import React from "react";

const Modal=(props)=> {
  const updateModalOpen = (index) => {
    if (props.modalOpen && props.modalPost === index) {
      props.setModalOpen(false);
    } else {
      props.setModalOpen(true);
    }
    props.setModalPost(index);
  };

  return (
    <ul className="stockList">
        {props.itemNames.map((item, index) => (
          <li key={index}>
            <h2 key={index} onClick={() => updateModalOpen(index)}>
              {item.종목명}
            </h2>
            {props.modalOpen && index === props.modalPost && (
              <ModalInfo item={props.itemNames[props.modalPost]} />
            )}
          </li>
        ))}
      </ul>
    
  );
  }

  const ModalInfo=(props)=>{
    return(
      <div className="stockInfo">
      <h3>시가:{props.item.시가}</h3>
      <h3>거래량:{props.item.거래량}</h3>
      <h3>시가총액:{props.item.시가총액}</h3>
    </div>
    )
  }


  


export default Modal;