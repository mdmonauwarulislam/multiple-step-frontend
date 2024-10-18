import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoEyeSharp, IoEyeOffSharp, IoCheckmarkSharp, IoCloseSharp } from 'react-icons/io5';
import { nextStep, prevStep } from '../redux/slice/stepSlice'; 
// import { registerUser } from '../redux/slice/authSlice'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const step = useSelector((state) => state.step.step);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [passwordValidations, setPasswordValidations] = React.useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    minLength: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (e.target.name === 'password') {
      const password = e.target.value;
      setPasswordValidations({
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        minLength: password.length >= 8,
      });
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.password) newErrors.password = 'Password is required';
    } else if (step === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      if (step === 3) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API}/api/register`, formData);
          if (response.data.success) {
            toast.success('Registration successful!');
            navigate('/api/login');
          }
        } catch (error) {
          toast.error(error.response?.data?.message || 'Registration failed');
          if(error.response?.data?.message === "User already exists" ) {
            navigate('/api/login');
          }
        }
      } else {
        dispatch(nextStep());
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      <div className="shadow-md bg-white p-6 rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">User Registration</h1>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Step 1: Basic Information</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`w-full p-3 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full p-3 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full p-3 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? <IoEyeOffSharp size={20} /> : <IoEyeSharp size={20} />}
                  </span>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                <div className="mt-2">
                  <p className="flex items-center text-sm">
                    {passwordValidations.hasUpperCase ? (
                      <IoCheckmarkSharp className="text-green-500 mr-2" />
                    ) : (
                      <IoCloseSharp className="text-red-500 mr-2" />
                    )}
                    Must contain an uppercase letter
                  </p>
                  <p className="flex items-center text-sm">
                    {passwordValidations.hasLowerCase ? (
                      <IoCheckmarkSharp className="text-green-500 mr-2" />
                    ) : (
                      <IoCloseSharp className="text-red-500 mr-2" />
                    )}
                    Must contain a lowercase letter
                  </p>
                  <p className="flex items-center text-sm">
                    {passwordValidations.hasNumber ? (
                      <IoCheckmarkSharp className="text-green-500 mr-2" />
                    ) : (
                      <IoCloseSharp className="text-red-500 mr-2" />
                    )}
                    Must contain a number
                  </p>
                  <p className="flex items-center text-sm">
                    {passwordValidations.hasSpecialChar ? (
                      <IoCheckmarkSharp className="text-green-500 mr-2" />
                    ) : (
                      <IoCloseSharp className="text-red-500 mr-2" />
                    )}
                    Must contain a special character
                  </p>
                  <p className="flex items-center text-sm">
                    {passwordValidations.minLength ? (
                      <IoCheckmarkSharp className="text-green-500 mr-2" />
                    ) : (
                      <IoCloseSharp className="text-red-500 mr-2" />
                    )}
                    Minimum 8 characters
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Step 2: Profile Information</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className={`w-full p-3 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={`w-full p-3 border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
              <div className='flex justify-between items-center mt-5'>
              <button
                type="button"
                onClick={() => dispatch(prevStep())}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              >
                Next
              </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Confirm Registration</h2>
              <p className="text-gray-700 mb-2">Name: {formData.name}</p>
              <p className="text-gray-700 mb-2">Email: {formData.email}</p>
              <p className="text-gray-700 mb-2">Address: {formData.address}</p>
              <p className="text-gray-700 mb-2">Phone Number: {formData.phoneNumber}</p>
              <div className='flex justify-between items-center mt-5'>
              <button
                type="button"
                onClick={() => dispatch(prevStep())}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              >
                Submit
              </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
