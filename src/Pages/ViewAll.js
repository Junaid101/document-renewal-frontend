import React, { useState, useEffect } from 'react';
import baseURL from './config';
import NavigationMenu from '../Parts/NavigationMenu';
import './Table.css'; // Import your styles

function GetAlldata() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once when the component mounts

  // Custom headers for your table
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
    'Unique ID',
  ];

  // Function to map custom headers to JSON keys
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
      'Unique ID': 'id',
    };

    // Fallback to the original header if mapping not found
    return headerMapping[header] || header;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container h-100">
      <NavigationMenu />
      <div className="card table-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            gap: '10px',
          }}
        >
          {data.length === 0 ? (
            <div>No data available</div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default GetAlldata;