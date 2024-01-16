import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationMenu from '../Parts/NavigationMenu';
import { baseURL, category_name_options, contract_type_options } from '../Parts/constants';
import ErrorFetchingMessage from "../Parts/ErrorFetchingMessage";
import SubmissionStatusMessage from "../Parts/SubmissionStatusMessage";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedFormData, setEditedFormData] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState("");

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
        } else {
          const result = await response.json();
          //result.category_name = getCategoryName(result.category_name);
          setFormData(result);
          setFetchingStatus("success");
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



  const handleEditClick = () => {
    setIsEditing(true);
    setEditedFormData({ ...formData });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${baseURL}/contracts/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedFormData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSubmissionStatus("success");

        // Refetch the data after a successful save
        const refetchResponse = await fetch(`${baseURL}/contracts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (refetchResponse.ok) {
          const result = await refetchResponse.json();
          setFormData(result);
        } else {
          setExplicitError("Error Refetching Data.");
          setFetchingStatus("error");
        }
      } else if (response.status === 400) {
        setExplicitError('Invalid data. Please check your input.');
        setSubmissionStatus('error');
      } else {
        setExplicitError(`Status Code: (${response.status}). Error: ${responseData.errors}`);
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error('Error submitting/processing data:', error);
      setExplicitError(`Error: ${error}`);
      setSubmissionStatus('error');
    } finally {
      setIsEditing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFormData({
      ...editedFormData,
      [name]: value,
    });
  };

  return (
    <div className='container'>
      <NavigationMenu />
      <div className="card">
        {fetchingStatus === "error" && (
          <ErrorFetchingMessage
            status={fetchingStatus}
            errorMessage={explicitError}
          />
        )}
        {loading && fetchingStatus === "loading" && <p>Loading...</p>}
        {!loading && fetchingStatus === "success" && (
          <div>
            <form
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                gap: "10px",
              }}
            >
              <label htmlFor="id">Contract ID:</label>
              <input type="text" id="id" name="id" value={formData.id} readOnly />

              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={isEditing ? editedFormData.title : formData.title}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />

              <label htmlFor="contract_type">Contract Type:</label>
              {isEditing ? (
                <select
                  id="contract_type"
                  name="contract_type"
                  value={editedFormData.contract_type}
                  onChange={handleInputChange}
                >
                  <option value="">Select Contract</option>
                  {contract_type_options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  id="contract_type"
                  name="contract_type"
                  value={formData.contract_type}
                  readOnly
                />
              )}


              <label htmlFor="oem_id">OEM:</label>
              <input
                type="text"
                id="oem_id"
                name="oem_id"
                value={isEditing ? editedFormData.oem_id : formData.oem_id}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />

              <label htmlFor="model">Model:</label>
              <input
                type="text"
                id="model"
                name="model"
                value={isEditing ? editedFormData.model : formData.model}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />

              <label htmlFor="serial_number">Serial Number:</label>
              <input
                type="text"
                id="serial_number"
                name="serial_number"
                value={isEditing ? editedFormData.serial_number : formData.serial_number}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />

              <label htmlFor="category_name">Contract Type:</label>
              {isEditing ? (
                <select
                  type="text"
                  id="category_name"
                  name="category_name"
                  value={isEditing ? editedFormData.category_name : formData.category_name}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {category_name_options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  id="category_name"
                  name="category_name"
                  value={formData.category_name}
                  readOnly
                />
              )}

              <label htmlFor="partner_name">Partner Name:</label>
              <input
                type="text"
                id="partner_name"
                name="partner_name"
                value={isEditing ? editedFormData.partner_name : formData.partner_name}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />

              <label htmlFor="start_date">Start Date:</label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={isEditing ? editedFormData.start_date : formData.start_date}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />

              <label htmlFor="expiry_date">Expiry Date:</label>
              <input
                type="date"
                id="expiry_date"
                name="expiry_date"
                value={isEditing ? editedFormData.expiry_date : formData.expiry_date}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />

              <label htmlFor="previous_contract">Previous Contract:</label>
              <input
                type="text"
                id="previous_contract"
                name="previous_contract"
                value={formData.previous_contract}
                readOnly
              />
            </form>
            <div>
              {!isEditing && (
                <button onClick={handleEditClick}>Edit</button>
              )}
              {isEditing && (
                <button onClick={handleSaveClick}>Save</button>
              )}

              <SubmissionStatusMessage status={submissionStatus} errorMessage={explicitError} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentDetailPage;