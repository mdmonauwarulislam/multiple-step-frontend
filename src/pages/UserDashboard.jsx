import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);

  // Fetch user profile data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/api/user/${id}`
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("address", userData.address);
    formData.append("phoneNumber", userData.phoneNumber);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API}/api/user/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Profile updated successfully!");
      setEditing(false);
      setUserData(response.data.data);
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data.errors || {});
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-8/12 mx-auto mt-20">
      <div className="shadow-md bg-white py-6 px-20 rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">User Profile</h1>
        {editing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md bg-gray-50 text-gray-700 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`w-full p-3 border rounded-md bg-gray-50 text-gray-700 focus:outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full p-3 border rounded-md bg-gray-50 text-gray-700 focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Address</label>
              <input
                name="address"
                value={userData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className={`w-full p-3 border rounded-md bg-gray-50 text-gray-700 focus:outline-none ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={`w-full p-3 border rounded-md bg-gray-50 text-gray-700 focus:outline-none ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
            >
              Update
            </button>
          </form>
        ) : (
          <div className="w-full">
            <div className="flex gap-20">
              <img
                src={`http://localhost:8000/uploads/${userData.profilePicture}`}
                alt="Profile"
                className="w-28 h-28 rounded-full border-2 mb-4"
              />
              <div className="">
                <p className="text-gray-700 text-3xl font-semibold">Name: {userData.name}</p>
                <p className="text-gray-700 text-xl ">Email: {userData.email}</p>
                <p className="text-gray-700 text-xl">Address: {userData.address}</p>
                <p className="text-gray-700 text-xl">
                  Phone Number: {userData.phoneNumber}
                </p>
              </div>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="mt-10 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
