import React, { useState } from "react";
import logo from "/policelogo.svg";
import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import ClipLoader from "react-spinners/ClipLoader";
import DisplayData from "../Components/DisplayData"; // Import the new component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewCases = () => {
  const [formData, setFormData] = useState({
    photo: null,
    photoPreview: null,
    name: "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [receivedData, setReceivedData] = useState(null); // New state for incoming data

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setFormData({
        ...formData,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("photo", formData.photo);
    data.append("name", formData.name);
    data.append("address", formData.address);
    data.append("phone", formData.phone);
    data.append("station_id", localStorage.getItem("user_id"));

    try {
      const response = await fetch("http://127.0.0.1:5000/compare", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.error) {
        toast.error(result.error); // Display error message
      } else {
        setReceivedData(result); // Set the received data
        console.log("Success:", result);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <SideBar />
      <ToastContainer />
      <div className="flex flex-wrap md:w-3/4 md:ml-56 gap-5 ml-44 py-7 md:px-10 px-4 h-[calc(100vh-96px)] overflow-scroll overflow-x-hidden text-black">
        <div className="flex items-center justify-center w-full bg-gray-100">
          {loading ? (
            <div className="text-center">
              <ClipLoader color={"#4A90E2"} loading={loading} size={70} />
              <p className="mt-4 text-blue-500">Fetching...</p>
            </div>
          ) : receivedData ? (
            <DisplayData
              currentPhoto={formData.photoPreview}
              receivedData={receivedData}
            />
          ) : (
            <form
              className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
              onSubmit={handleSubmit}
            >
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="photo"
                >
                  Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
                {formData.photoPreview && (
                  <div className="mt-4">
                    <img
                      src={formData.photoPreview}
                      alt="Preview"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default NewCases;
