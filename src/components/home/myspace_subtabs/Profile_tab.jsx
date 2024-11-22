import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import apiService from "../../../api/apiService";
import { toast } from "react-toastify";


const Profile = () => {
  const [profileData, setProfileData] = useState({
    Emp_id: "",
    NickName: "",
    Name: "",
    date_joined: "",
    Role: "",
    PersonalMobileNumber: "",
    FatherName: "",
    MotherName: "",
  });

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const GET_PROFILE_DATA = 'api/profile/'
  const MODIFY_PROFILE_DATA = 'api/profile/'
  
  useEffect(() => {
    const fetchProfilData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if(!token){
          console.error("No token found");
          return;
        }
        const response = await apiService.fetchInstance(GET_PROFILE_DATA);
        profileData.date_joined =  profileData.date_joined
        ? new Date(profileData.date_joined).toISOString().split("T")[0]
        : "";
        setProfileData(response.data);

      } catch (error) {
        console.error("Error fetching profile", error);
        
      }

    }
    fetchProfilData();
  }, [])
  
  
  const handleEditClick = () => {
    setIsModalOpen(true);
  };




  const handleSubmit = async (updatedData) => {
    const empId = profileData.id;

    try {
      const token = localStorage.getItem("accessToken");
      if(!token){
        console.error("No token found");
        return;
      }
      const updatedFormData = {
        ...updatedData,
        date_joined: updatedData.date_joined
        ? new Date(updatedData.date_joined).toISOString()
        : "",
      }

      const response = await apiService.modifyInstance(`${MODIFY_PROFILE_DATA}${empId}/`, updatedFormData);
      console.log(response.data); 
      
      setProfileData(response.data);
      updatedData = response.data;
      console.log("updatedData", updatedData);
      
      toast.success("Profile Data updated successfully...")
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error Updating profile", error);
      
    }
    
  };

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>

      {/* Profile Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Employee ID</p>
            <p className="text-gray-800 font-medium">{profileData.Emp_id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nick Name</p>
            <p className="text-gray-800 font-medium">{profileData.NickName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-gray-800 font-medium">{profileData.Name}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Work Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Date of Joining</p>
            <p className="text-gray-800 font-medium">{profileData.date_joined}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-gray-800 font-medium">{profileData.Role}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Dependent Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Father Name</p>
            <p className="text-gray-800 font-medium">{profileData.FatherName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Mother Name</p>
            <p className="text-gray-800 font-medium">{profileData.MotherName}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Contact Details</h2>
        <div>
          <p className="text-sm text-gray-500">Personal Mobile Number</p>
          <p className="text-gray-800 font-medium">{profileData.PersonalMobileNumber}</p>
        </div>
      </div>

      <button
        onClick={handleEditClick}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Edit Profile
      </button>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <EditProfile
          profileData={profileData}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Profile;
