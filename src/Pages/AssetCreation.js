import { useState } from "react";

export default function AssetCreation() {
    const[formData, setFormData] = useState({title:"",contract_type:"",oem_id:"",model:"",serial_number:"",category_name:"",parnter_name:"",start_date:"",expiry_date:"",work_order_refernce:""});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Title: ${formData.title}, Contract Type: ${formData.contract_type}, OEM ID: ${formData.oem_id},Model: ${formData.model},Serial Number: ${formData.serial_number}, Category Name: ${formData.category_name}, Partner Name: ${formData.parnter_name}, Start Date: ${formData.start_date}, Expiry Date: ${formData.expiry_date}, Work Order Refernce: ${formData.work_order_refernce}`
        );
    };

    return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input type="text" id="tile" name="tile" value={formData.name} onChange={handleChange}/>
    
          <label htmlFor="contract_type">Contract Type:</label>
          <input type="text" id="contract_type" name="contract_type" value={formData.contract_type} onChange={handleChange}/>
    
          <label htmlFor="oem_id">OEM ID:</label>
          <input type="text" id="oem_id" name="oem_id" value={formData.oem_id} onChange={handleChange}/>

          <label htmlFor="model">Model:</label>
          <input type="text" id="model" name="model" value={formData.model} onChange={handleChange}/>

          <label htmlFor="serial_number">Serial Number:</label>
          <input type="text" id="serial_number" name="serial_number" value={formData.serial_number} onChange={handleChange}/>      

          <label htmlFor="category_name">Category Name:</label>
          <input type="text" id="category_name" name="category_name" value={formData.category_name} onChange={handleChange}/>      

          <label htmlFor="partner_name">Partner Name:</label>
          <input type="text" id="partner_name" name="partner_name" value={formData.partner_name} onChange={handleChange}/>      

          <label htmlFor="start_date">Start Date:</label>
          <input type="date" id="start_date" name="start_date" value={formData.start_date} onChange={handleChange}/>      

          <label htmlFor="expiry_date">Expiry Date:</label>
          <input type="date" id="expiry_date" name="expiry_date" value={formData.expiry_date} onChange={handleChange}/>      


          <button type="submit">Submit</button>
        </form>
      );
    }