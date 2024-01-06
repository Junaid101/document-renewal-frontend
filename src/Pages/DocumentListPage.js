import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import baseURL from "./config";
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
  
          // Replace category_name values based on conditions
          result.forEach((item) => {
            if (item.category_name === "enterprise_network_system") {
              item.category_name = "Network";
            } else if (item.category_name === "enterprise_system") {
              item.category_name = "System";
            } else if (item.category_name === "enterprise_database_system") {
              item.category_name = "Database";
            } else if (item.category_name === "enterprise_card_system") {
              item.category_name = "Card System";
            } else if (item.category_name === "enterprise_software_solutions") {
              item.category_name = "Application";
            } else if (item.category_name === "peripherals_devices") {
              item.category_name = "Peripherals Devices";
            } else if (item.category_name === "personal_computing") {
              item.category_name = "Personal Computing";
            } else if (item.category_name === "data_center_devices") {
              item.category_name = "Data Center Passive Items";
            }
          });
  
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
                  sortable: true,
                },
                {
                  field: "category_name",
                  headerName: "Category",
                  flex: 1,
                  sortable: true,
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
