import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationMenu from '../Parts/NavigationMenu';
import baseURL from "./config";
import ErrorFetchingMessage from "../Parts/ErrorFetchingMessage";

const DocumentDetailPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    contract_type: "",
    oem_id: "",
    model: "",
    serial_number: "",
    category_name: "",
    partner_name: "",
    start_date: "",
    expiry_date: "",
    work_order_reference: "",
    previous_contract: ""
  });

  const [loading, setLoading] = useState(true);
  const [fetchingStatus, setFetchingStatus] = useState("loading");
  const [explicitError, setExplicitError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/contracts/${id}`, {
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
          setFormData(result);
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
  }, [id]);

  return (
    <div className='container'>
      <NavigationMenu />
      <div className="card">
        {loading && fetchingStatus === "error" && (
          <ErrorFetchingMessage
            status={fetchingStatus}
            errorMessage={explicitError}
          />
        )}
        <form style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "10px",
        }}>
          <label htmlFor="id">Contract ID:</label>
          <input type="text" id="id" name="id" value={formData.id} readOnly />
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} readOnly />
          <label htmlFor="contract_type">Contract Type:</label>
          <input type="text" id="contract_type" name="contract_type" value={formData.contract_type} readOnly />
          <label htmlFor="oem_id">OEM:</label>
          <input type="text" id="oem_id" name="oem_id" value={formData.oem_id} readOnly />
          <label htmlFor="model">Model:</label>
          <input type="text" id="model" name="model" value={formData.model} readOnly />
          <label htmlFor="serial_number">Serial Number:</label>
          <input type="text" id="serial_number" name="serial_number" value={formData.serial_number} readOnly />
          <label htmlFor="category_name">Category:</label>
          <input type="text" id="category_name" name="category_name" value={formData.category_name} readOnly />
          <label htmlFor="partner_name">Partner Name:</label>
          <input type="text" id="partner_name" name="partner_name" value={formData.partner_name} readOnly />
          <label htmlFor="start_date">Start Date:</label>
          <input type="date" id="start_date" name="start_date" value={formData.start_date} readOnly />
          <label htmlFor="expiry_date">Expiry Date:</label>
          <input type="date" id="expiry_date" name="expiry_date" value={formData.expiry_date} readOnly />
          <label htmlFor="previous_contract">Previous Contract:</label>
          <input type="date" id="previous_contract" name="previous_contract" value={formData.previous_contract} readOnly />
          </form>
      </div>
    </div>
  );
};

export default DocumentDetailPage;