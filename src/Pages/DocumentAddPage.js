import { useState } from "react";
import { baseURL, category_name_options, contract_type_options } from '../Parts/constants';
import SubmissionStatusMessage from "../Parts/SubmissionStatusMessage";
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
      const response = await fetch(`${baseURL}/contracts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSubmissionStatus("success");

        // Clear the form data
        setFormData({
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
      } else if (response.status === 400) {
        // Explicitly handle status code 400
        setExplicitError('Invalid data. Please check your input.');
        setSubmissionStatus('error');
      } else {
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
              value={formData.title}
              onChange={handleChange}
            />

            <label htmlFor="contract_type">Contract Type:</label>
            <select
              type="text"
              id="contract_type"
              name="contract_type"
              value={formData.contract_type}
              onChange={handleChange}
            >
              <option value="">Select Contract</option>
              {contract_type_options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <label htmlFor="oem_id">OEM</label>
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
            <select
              type="text"
              id="category_name"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {category_name_options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

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
