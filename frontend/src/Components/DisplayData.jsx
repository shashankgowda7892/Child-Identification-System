import React from "react";

const DisplayData = ({ currentPhoto, receivedData }) => {
  console.log(receivedData);
  const imageUrl = new URL(`../../../server/uploads/${receivedData.case.image}`, import.meta.url).href;

  return (
    <div className="flex flex-col md:flex-row justify-center mt-10 bg-gray-50 p-4 rounded-lg shadow-lg">
      <div className="w-full md:w-1/2 p-2">
        <h2 className="text-lg font-bold mb-4 text-center md:text-left">Uploaded Photo</h2>
        <div className="flex justify-center md:justify-start">
          <img src={currentPhoto} alt="Current" className="w-3/4 h-auto rounded-md shadow-md" />
        </div>
      </div>
      <div className="w-full md:w-1/2 p-2 mt-6 md:mt-0">
        <h2 className="text-lg font-bold mb-4 text-center md:text-left">Fetched Data</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="mt-4 flex justify-center">
            <img src={imageUrl} alt="Received" className="w-3/4 h-auto rounded-md shadow-md" />
          </div>
          <div className="mt-4">
            <p className="mb-2"><strong>Name:</strong> {receivedData.case.name}</p>
            <p className="mb-2"><strong>Address:</strong> {receivedData.case.address}</p>
            <p className="mb-2"><strong>Phone:</strong> {receivedData.case.phone}</p>
            <p className="mb-2"><strong>Status:</strong> {receivedData.case.status}</p>
            <p className="mb-2"><strong>Registration Date:</strong> {receivedData.case.reg_date}</p>
            <p className="mb-2"><strong>Station Number:</strong> {receivedData.case.station_id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
