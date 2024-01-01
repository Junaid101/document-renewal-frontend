import React, { useState, useEffect } from 'react';
import baseURL from './config';
import NavigationMenu from '../Parts/NavigationMenu';
import ErrorFetchingMessage from '../Parts/ErrorFetchingMessage';

// Define your DocumentTable component
const DocumentTable = React.memo(({ data, tableHeaders, mapHeaderToKey }) => {
  return (
    <table>
      <thead>
        <tr>
          {tableHeaders.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {tableHeaders.map((header, colIndex) => (
              <td key={colIndex}>{item[mapHeaderToKey(header)]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

// DocumentListPage component using DocumentTable
const DocumentListPage = () => {
  const [data, setData] = useState([]);
  const [explicitError, setExplicitError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingStatus, setFetchingStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/contracts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          setExplicitError('Error Fetching Data.');
          setFetchingStatus('error');
        }

        if (response.status === 400) {
          setExplicitError('No Data Available.');
          setFetchingStatus('error');
        }

        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setExplicitError('Failed to fetch. Please check your database connection.');
        setFetchingStatus('error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tableHeaders = [
    'Title',
    'Contract Type',
    'OEM Name',
    'Model',
    'Serial Number',
    'Category',
    'Partner Name',
    'Start Date',
    'Expiry Date',
    'Work Order Reference',
  ];

  const mapHeaderToKey = (header) => {
    const headerMapping = {
      'Title': 'title',
      'Contract Type': 'contract_type',
      'OEM Name': 'oem_id',
      'Model': 'model',
      'Serial Number': 'serial_number',
      'Category': 'category_name',
      'Partner Name': 'partner_name',
      'Start Date': 'start_date',
      'Expiry Date': 'expiry_date',
      'Work Order Reference': 'work_order_reference',
    };

    return headerMapping[header] || header;
  };

  return (
    <div className="container-l h-100">
      <NavigationMenu />
      <div className="card">
        {loading && <div>Loading...</div>}
        {fetchingStatus === 'error' && <ErrorFetchingMessage status={fetchingStatus} errorMessage={explicitError} />}
        {!loading && fetchingStatus !== 'error' && (
          <DocumentTable data={data} tableHeaders={tableHeaders} mapHeaderToKey={mapHeaderToKey} />
        )}
      </div>
    </div>
  );
};

export default DocumentListPage;