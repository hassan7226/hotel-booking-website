import React, { useState } from 'react';
import { assets } from '../../assets/assets';

const AddRoom = () => {
  const [formData, setFormData] = useState({
    roomTitle: '',
    roomNumber: '',
    roomType: 'single',
    description: '',
    price: '',
    capacity: '1',
    amenities: []
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });

  const roomTypes = [
    { value: 'single', label: 'Single Room' },
    { value: 'double', label: 'Double Room' },
    { value: 'luxury', label: 'Luxury Room' },
    { value: 'suite', label: 'Suite' }
  ];

  const capacityOptions = [
    { value: '1', label: '1 Guest' },
    { value: '2', label: '2 Guests' },
    { value: '3', label: '3 Guests' },
    { value: '4', label: '4+ Guests' }
  ];

  const amenitiesList = [
    { id: 'wifi', label: 'Free Wi-Fi', icon: assets.freeWifiIcon },
    { id: 'breakfast', label: 'Free Breakfast', icon: assets.freeBreakfastIcon },
    { id: 'service', label: 'Room Service', icon: assets.roomServiceIcon },
    { id: 'pool', label: 'Pool Access', icon: assets.poolIcon },
    { id: 'mountain', label: 'Mountain View', icon: assets.mountainIcon },
  ];
/* 
  // Show notification
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: '', message: '' });
    }, 3000);
  }; */

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.roomTitle.trim()) {
      newErrors.roomTitle = 'Room title is required';
    }
    if (!formData.roomNumber.trim()) {
      newErrors.roomNumber = 'Room number is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    if (uploadedImages.length === 0) {
      newErrors.images = 'Please upload at least one image';
    }
    if (formData.amenities.length === 0) {
      newErrors.amenities = 'Please select at least one amenity';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle amenities toggle
  const handleAmenityToggle = (amenityId) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
    if (errors.amenities) {
      setErrors(prev => ({ ...prev, amenities: '' }));
    }
  };

  const handleFileInput = (e) => {
    const files = [...e.target.files];
    if (uploadedImages.length + files.length > 4) {
      showNotification('error', 'Maximum 4 images allowed');
      return;
    }
    processFiles(files);
  };

  const processFiles = (files) => {
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) {
          showNotification('error', 'Image size must be less than 5MB');
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          setUploadedImages(prev => [...prev, {
            id: Date.now() + Math.random(),
            src: event.target.result
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
    if (errors.images) {
      setErrors(prev => ({ ...prev, images: '' }));
    }
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification('error', 'Please fix all errors');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Room Data:', { ...formData, images: uploadedImages });
      showNotification('success', 'Room added successfully!');
      
      // Reset form
      handleClear();
      setIsSubmitting(false);
    }, 1500);
  };

  const handleClear = () => {
    setFormData({
      roomTitle: '',
      roomNumber: '',
      roomType: 'single',
      description: '',
      price: '',
      capacity: '1',
      amenities: []
    });
    setUploadedImages([]);
    setErrors({});
  };

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
      
      {/* Notification */}
      {notification.message && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg text-white font-medium shadow-lg z-50 transition-all ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-2'>
          Add Room
        </h1>
        <p className='text-gray-600 text-base md:text-lg'>
          Add a new room to your hotel with images, pricing, and amenities information.
        </p>
      </div>

      {/* Form Container */}
      <div className='max-w-4xl'>
        <form onSubmit={handleSubmit} className='bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8 space-y-8'>
          
          {/* Image Upload Section */}
          <div>
            <h2 className='text-xl font-playfair font-bold text-gray-900 mb-6'>
              Room Images
            </h2>
            
            {/* 4 Upload Boxes Grid */}
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
              {[1, 2, 3, 4].map((box) => (
                <label
                  key={box}
                  className='relative group cursor-pointer'
                >
                  <div className='border-2 border-dashed border-gray-300 rounded-lg aspect-square flex items-center justify-center bg-white hover:bg-gray-50 hover:border-blue-400 transition-all duration-200'>
                    <div className='text-center'>
                      <img
                        src={assets.uploadArea}
                        alt='upload'
                        className='w-12 h-12 mx-auto mb-2 opacity-60 group-hover:opacity-90 transition'
                      />
                      <p className='text-xs font-medium text-gray-600 group-hover:text-blue-600 transition'>
                        Upload Image
                      </p>
                    </div>
                  </div>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleFileInput}
                    disabled={uploadedImages.length >= 4}
                    className='hidden'
                  />
                </label>
              ))}
            </div>

            {/* Error Message */}
            {errors.images && (
              <p className='text-sm text-red-500 font-medium mb-4'>
                {errors.images}
              </p>
            )}

            {/* Uploaded Images Grid */}
            {uploadedImages.length > 0 && (
              <div className='mt-6'>
                <p className='text-sm font-semibold text-gray-700 mb-3'>
                  Uploaded Images ({uploadedImages.length}/4)
                </p>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                  {uploadedImages.map((image) => (
                    <div key={image.id} className='relative group'>
                      <img
                        src={image.src}
                        alt='room'
                        className='w-full aspect-square object-cover rounded-lg border border-gray-200'
                      />
                      <button
                        type='button'
                        onClick={() => removeImage(image.id)}
                        className='absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition font-bold'
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Room Information Section */}
          <div>
            <h2 className='text-xl font-playfair font-bold text-gray-900 mb-6'>
              Room Information
            </h2>

            <div className='space-y-5'>
              {/* Room Title */}
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>
                  Room Title <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='roomTitle'
                  value={formData.roomTitle}
                  onChange={handleInputChange}
                  placeholder='e.g., Luxury Double Bedroom'
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition ${
                    errors.roomTitle
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                />
                {errors.roomTitle && (
                  <p className='text-sm text-red-500 font-medium mt-1'>{errors.roomTitle}</p>
                )}
              </div>

              {/* Room Number & Type Row */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                  <label className='block text-sm font-semibold text-gray-900 mb-2'>
                    Room Number <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    name='roomNumber'
                    value={formData.roomNumber}
                    onChange={handleInputChange}
                    placeholder='e.g., 101'
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition ${
                      errors.roomNumber
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                  {errors.roomNumber && (
                    <p className='text-sm text-red-500 font-medium mt-1'>{errors.roomNumber}</p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-900 mb-2'>
                    Room Type
                  </label>
                  <select
                    name='roomType'
                    value={formData.roomType}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition'
                  >
                    {roomTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>
                  Description <span className='text-red-500'>*</span>
                </label>
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder='Describe your room features and atmosphere...'
                  rows='4'
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition resize-none ${
                    errors.description
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                />
                {errors.description && (
                  <p className='text-sm text-red-500 font-medium mt-1'>{errors.description}</p>
                )}
              </div>

              {/* Price & Capacity Row */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                  <label className='block text-sm font-semibold text-gray-900 mb-2'>
                    Price Per Night <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold'>$</span>
                    <input
                      type='number'
                      name='price'
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder='0.00'
                      min='0'
                      step='0.01'
                      className={`w-full pl-8 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1 transition ${
                        errors.price
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                    />
                  </div>
                  {errors.price && (
                    <p className='text-sm text-red-500 font-medium mt-1'>{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-900 mb-2'>
                    Guest Capacity
                  </label>
                  <select
                    name='capacity'
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition'
                  >
                    {capacityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div>
            <h2 className='text-xl font-playfair font-bold text-gray-900 mb-6'>
              Amenities <span className='text-red-500'>*</span>
            </h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-2'>
              {amenitiesList.map(amenity => (
                <label key={amenity.id} className='flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition'>
                  <input
                    type='checkbox'
                    checked={formData.amenities.includes(amenity.id)}
                    onChange={() => handleAmenityToggle(amenity.id)}
                    className='w-5 h-5 text-blue-600 rounded cursor-pointer accent-blue-600'
                  />
                  <img src={amenity.icon} alt={amenity.label} className='w-5 h-5 opacity-70' />
                  <span className='text-gray-900 font-medium flex-1'>{amenity.label}</span>
                </label>
              ))}
            </div>
            {errors.amenities && (
              <p className='text-sm text-red-500 font-medium'>{errors.amenities}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className='flex gap-4 pt-6 border-t border-gray-200'>
            <button
              type='submit'
              disabled={isSubmitting}
              className={`flex-1 px-6 py-3 font-semibold rounded-lg transition duration-200 ${
                isSubmitting
                  ? 'bg-blue-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <span className='flex items-center justify-center gap-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Adding Room...
                </span>
              ) : (
                'Add Room'
              )}
            </button>
            <button
              type='button'
              onClick={handleClear}
              disabled={isSubmitting}
              className='flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition duration-200 disabled:opacity-50'
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
