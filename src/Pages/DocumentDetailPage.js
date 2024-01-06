import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationMenu from '../Parts/NavigationMenu';


const DocumentDetailPage = () => {
  const { id } = useParams();

  return (
  <div className='container'>
      <NavigationMenu />
    <div className='card'>
    I'm done here.
    Data of ContractID : {id}
    </div>
  </div>
  );
  };

export default DocumentDetailPage;