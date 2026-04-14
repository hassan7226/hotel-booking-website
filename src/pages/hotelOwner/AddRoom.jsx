import React, { useState } from 'react';
import { assets } from '../../assets/assets';

const AddRoom = () => {
  // ===== PART 1: FORM DATA STATE =====
  const [roomTitle, setRoomTitle] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('single');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('1');
  const [amenities, setAmenities] = useState([]);
  
  // ===== PART 2: IMAGE STATE =====
  const [uploadedImages, setUploadedImages] = useState([]);
  
  // ===== PART 3: ERROR & UI STATE =====
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });

  // ===== PART 4: OPTIONS DATA =====
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

  // ===== HELPER: Show notification message =====
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: '', message: '' });
    }, 3000);
  };

  // ===== HELPER: Upload image from file input =====
  const handleFileInput = (e) => {
    const file = e.target.files[0]; // Get first file selected
    
    // Check if file exists
    if (!file) return;
    
    // Check if maximum images reached
    if (uploadedImages.length >= 4) {
      showNotification('error', 'Maximum 4 images allowed');
      return;
    }
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      showNotification('error', 'Please upload an image file');
      return;
    }
    
    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('error', 'Image size must be less than 5MB');
      return;
    }
    
    // Convert file to image and store it
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = {
        id: Date.now(), // Simple unique ID
        src: event.target.result // Base64 image data
      };
      setUploadedImages([...uploadedImages, imageData]);
    };
    reader.readAsDataURL(file);
  };

  // ===== HELPER: Remove image from list =====
  const removeImage = (imageId) => {
    const filteredImages = uploadedImages.filter(img => img.id !== imageId);
    setUploadedImages(filteredImages);
  };

  // ===== HELPER: Toggle amenity on/off =====
  const toggleAmenity = (amenityId) => {
    // Check if amenity is already selected
    if (amenities.includes(amenityId)) {
      // If yes, remove it
      const updatedAmenities = amenities.filter(id => id !== amenityId);
      setAmenities(updatedAmenities);
    } else {
      // If no, add it
      setAmenities([...amenities, amenityId]);
    }
  };

  // ===== HELPER: Validate all form fields =====
  const validateForm = () => {
    const newErrors = {};
    
    // Check room title
    if (roomTitle.trim() === '') {
      newErrors.roomTitle = 'Room title is required';
    }
    
    // Check room number
    if (roomNumber.trim() === '') {
      newErrors.roomNumber = 'Room number is required';
    }
    
    // Check description
    if (description.trim() === '') {
      newErrors.description = 'Description is required';
    }
    
    // Check price
    if (price === '' || parseFloat(price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    // Check at least one image uploaded
    if (uploadedImages.length === 0) {
      newErrors.images = 'Please upload at least one image';
    }
    
    // Check at least one amenity selected
    if (amenities.length === 0) {
      newErrors.amenities = 'Please select at least one amenity';
    }
    
    setErrors(newErrors);
    
    // Return true if NO errors, false if there ARE errors
    return Object.keys(newErrors).length === 0;
  };

  // ===== MAIN: Handle form submission =====
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Step 1: Validate form
    if (!validateForm()) {
      showNotification('error', 'Please fix all errors');
      return;
    }
    
    // Step 2: Show loading state
    setIsSubmitting(true);
    
    // Step 3: Prepare data to send
    const roomData = {
      roomTitle,
      roomNumber,
      roomType,
      description,
      price,
      capacity,
      amenities,
      images: uploadedImages
    };
    
    // Step 4: Simulate sending to backend (1.5 second delay)
    setTimeout(() => {
      console.log('Room Data:', roomData);
      showNotification('success', 'Room added successfully!');
      
      // Step 5: Clear form and reset state
      handleClear();
      setIsSubmitting(false);
    }, 1500);
  };

  // ===== HELPER: Clear all form data =====
  const handleClear = () => {
    setRoomTitle('');
    setRoomNumber('');
    setRoomType('single');
    setDescription('');
    setPrice('');
    setCapacity('1');
    setAmenities([]);
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
                  value={roomTitle}
                  onChange={(e) => setRoomTitle(e.target.value)}
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
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
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
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
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
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
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
                    checked={amenities.includes(amenity.id)}
                    onChange={() => toggleAmenity(amenity.id)}
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
