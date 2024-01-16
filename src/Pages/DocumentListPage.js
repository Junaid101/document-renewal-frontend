import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { baseURL, contract_type_options, category_name_options } from "../Parts/constants";
import NavigationMenu from "../Parts/NavigationMenu";
import ErrorFetchingMessage from "../Parts/ErrorFetchingMessage";

const DocumentListPage = () => {
  const [data, setData] = useState([]);
  const [explicitError, setExplicitError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingStatus, setFetchingStatus] = useState(null);
  const [sortModel, setSortModel] = useState([{ field: "title", sort: "asc" }]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [selectionModel, setSelectionModel] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/contracts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          setExplicitError("Error Fetching Data.");
          setFetchingStatus("error");
        }

        if (response.status === 400) {
          setExplicitError("No Data Available.");
          setFetchingStatus("error");
        }

        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setExplicitError(
          "Failed to fetch. Please check your database connection."
        );
        setFetchingStatus("error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSortModelChange = (model) => {
    setSortModel(model);
  };

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  const handleRowClick = (params) => {

    // 'id' is the key for the item-id in your data
    const itemId = params.row.id;

    // Navigate to the details page with the item-id
    navigate(`../document/details/${itemId}`);
  };


  return (
    <div className="container-l h-100">
      <NavigationMenu />
      <div className="card">
        {fetchingStatus === "error" && (
          <ErrorFetchingMessage
            status={fetchingStatus}
            errorMessage={explicitError}
          />
        )}
        <div>
          {!loading && fetchingStatus !== "error" && (
            <DataGrid
              rows={data}
              columns={[
                {
                  field: "id",
                  headerName: "Contract ID",
                  flex: 1,
                  sortable: false,
                },
                {
                  field: "title",
                  headerName: "Title",
                  flex: 1,
                  sortable: true,
                },
                {
                  field: "contract_type",
                  headerName: "Contract Type",
                  flex: 1,
                  sortable: true,
                  renderCell: (params) => (
                    <span>
                      {contract_type_options.find((option) => option.value === params.value)?.label}
                    </span>
                  ),

                },
                {
                  field: "oem_id",
                  headerName: "OEM Name",
                  flex: 1,
                  sortable: true,
                },
                {
                  field: "model",
                  headerName: "Model",
                  flex: 1,
                  sortable: true,
                },
                {
                  field: "serial_number",
                  headerName: "Serial Number",
                  flex: 1,
                },
                {
                  field: "category_name",
                  headerName: "Category",
                  flex: 1,
                  sortable: true,
                  renderCell: (params) => (
                    <span>
                      {category_name_options.find((option) => option.value === params.value)?.label}
                    </span>
                  ),
                },
                {
                  field: "partner_name",
                  headerName: "Partner Name",
                  flex: 1,
                  sortable: true,
                },
                {
                  field: "start_date",
                  headerName: "Start Date",
                  flex: 1,
                  sortable: true,
                },
                {
                  field: "expiry_date",
                  headerName: "Expiry Date",
                  flex: 1,
                  sortable: true,
                },
                {
                  field: "work_order_reference",
                  headerName: "Work Order Reference",
                  flex: 1,
                },
              ].map((column) => ({ ...column, disableColumnMenu: true }))}
              sortModel={sortModel}
              onRowClick={handleRowClick}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              onSortModelChange={handleSortModelChange}
              pageSize={pageSize}
              page={page}
              selectionModel={selectionModel}
              onSelectionModelChange={handleSelectionModelChange}
              checkboxSelection
              components={{
                Toolbar: GridToolbar,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentListPage;
