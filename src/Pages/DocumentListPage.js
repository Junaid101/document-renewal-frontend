import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Card, CardContent } from '@mui/material';
import baseURL from './config';
import NavigationMenu from '../Parts/NavigationMenu';
import ErrorFetchingMessage from '../Parts/ErrorFetchingMessage';

const DocumentListPage = () => {
  const [data, setData] = useState([]);
  const [explicitError, setExplicitError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingStatus, setFetchingStatus] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (sortConfig.key) {
      const sortedArray = [...data].sort((a, b) => {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (valueA < valueB) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }

        if (valueA > valueB) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }

        return 0;
      });

      return sortedArray;
    }

    return data;
  }, [data, sortConfig]);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="container-l h-100">
      <NavigationMenu />
      <div className="card">
        {loading && <div>Loading...</div>}
        {fetchingStatus === 'error' && (
          <Card variant="outlined">
            <CardContent>
              <ErrorFetchingMessage status={fetchingStatus} errorMessage={explicitError} />
            </CardContent>
          </Card>
        )}
        {!loading && fetchingStatus !== 'error' && (
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {tableHeaders.map((header) => (
                      <TableCell key={header} sortDirection={sortConfig.key === mapHeaderToKey(header) ? sortConfig.direction : false}>
                        <TableSortLabel
                          active={sortConfig.key === mapHeaderToKey(header)}
                          direction={sortConfig.direction}
                          onClick={() => handleSort(mapHeaderToKey(header))}
                        >
                          {header}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <TableRow key={index}>
                      {tableHeaders.map((header) => (
                        <TableCell key={header}>{row[mapHeaderToKey(header)]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={sortedData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </div>
    </div>
  );
};

export default DocumentListPage;