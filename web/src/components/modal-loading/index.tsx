import React from 'react';
import './modal-loading.scss';

const ModalLoading = () => {

  return (
    <div className='modal-loading-content'>
      <div className='spin spin-spinning'>
        <span className='spin-dot spin-dot-spin'>
          <i className='spin-dot-item' />
          <i className='spin-dot-item' />
          <i className='spin-dot-item' />
          <i className='spin-dot-item' />
        </span>
      </div>
    </div>
  );

};

export default ModalLoading;
