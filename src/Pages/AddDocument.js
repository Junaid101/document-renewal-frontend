import { useState } from "react";
import SubmissionStatusMessage from "./SubmissionStatusMessage";
import NavigationMenu from "../Parts/NavigationMenu";

export default function AddDocument() {
  const [formData, setFormData] = useState({
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
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [explicitError, setExplicitError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace 'your-api-endpoint' with the actual API endpoint
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json()

      if (response.status in [200, 201, 202]) {
        setSubmissionStatus("success");
      } 
      else {
        setExplicitError(`Status Code: (${response.status}). Error:${responseData.errors}`);
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error('Error submitting/processing data:', error);
      setExplicitError(`Error:${error}`);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="container h-100">
      <NavigationMenu />
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gap: "10px",
            }}
          >
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.name}
              onChange={handleChange}
            />

            <label htmlFor="contract_type">Contract Type:</label>
            <input
              type="text"
              id="contract_type"
              name="contract_type"
              value={formData.contract_type}
              onChange={handleChange}
            />

            <label htmlFor="oem_id">OEM ID:</label>
            <input
              type="text"
              id="oem_id"
              name="oem_id"
              value={formData.oem_id}
              onChange={handleChange}
            />

            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
            />

            <label htmlFor="serial_number">Serial Number:</label>
            <input
              type="text"
              id="serial_number"
              name="serial_number"
              value={formData.serial_number}
              onChange={handleChange}
            />

            <label htmlFor="category_name">Category Name:</label>
            <input
              type="text"
              id="category_name"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
            />

            <label htmlFor="partner_name">Partner Name:</label>
            <input
              type="text"
              id="partner_name"
              name="partner_name"
              value={formData.partner_name}
              onChange={handleChange}
            />

            <label htmlFor="start_date">Start Date:</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />

            <label htmlFor="expiry_date">Expiry Date:</label>
            <input
              type="date"
              id="expiry_date"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
            />

            <label htmlFor="expiry_date">Word Order Reference:</label>
            <input
              type="text"
              id="work_order_reference"
              name="work_order_reference"
              value={formData.work_order_reference}
              onChange={handleChange}
            />
          </div>

          <button className="m-auto" type="submit">Submit</button>
        </form>

        <SubmissionStatusMessage status={submissionStatus} errorMessage={explicitError} />
      </div>
    </div>
  );
}
