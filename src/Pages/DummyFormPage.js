// pages/index.js
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DummyForm from '../Parts/DummyForm';
import NavigationMenu from "../Parts/NavigationMenu";


const DummyFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialData = { dropdownField: 'option1' };
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleEdit = () => {
    setIsEditing(true);
    // Update URL when entering edit mode
    navigate(`/dummy/edit/${id}`);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(initialData);
    // Update URL when canceling edit mode
    navigate(`/dummy/view/${id}`);
  };

  const handleUpdate = (updatedData) => {
    // Update logic (send data to server, etc.)
    console.log('Updated data:', updatedData);
    setIsEditing(false);
    // Update URL after successful update
    navigate(`/dummy/view/${id}`);
  };

  return (
    <div className='container'>
      <NavigationMenu />
      <div className='card'>
      <h1>Dummy Form</h1>
      {isEditing ? (
        <DummyForm data={formData} onSubmit={handleUpdate} onCancel={handleCancel} />
      ) : (
        <>
          <p>View Mode</p>
          <p>Dropdown Field: {formData.dropdownField}</p>
          {/* Add other view fields as needed */}
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
      </div>
    </div>
  );
};

export default DummyFormPage;
