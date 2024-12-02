import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import apiService from "../../../api/apiService";
import { toast } from "react-toastify";
import { format } from "date-fns";


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

  const GET_PROFILE_DATA = "api/profile/";
  const MODIFY_PROFILE_DATA = "api/profile/";

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await apiService.fetchInstance(GET_PROFILE_DATA);

        const updatedData = {
          ...response.data,
          date_joined: response.data.date_joined
            ? new Date(response.data.date_joined).toISOString().split("T")[0]
            : "",
        };

        setProfileData(updatedData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  // Handle opening the Edit Modal
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  // Handle profile update submission
  const handleSubmit = async (updatedData) => {
    const empId = profileData.id;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      const updatedFormData = {
        ...updatedData,
        date_joined: updatedData.date_joined
          ? new Date(updatedData.date_joined).toISOString()
          : "",
      };

      const response = await apiService.modifyInstance(
        `${MODIFY_PROFILE_DATA}${empId}/`,
        updatedFormData
      );

      setProfileData(response.data);
      toast.success("Profile data updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile data.");
    }
  };

  // Reusable Profile Section Component
  const ProfileSection = ({ title, children }) => (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4 dark:text-white">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );

  // Reusable Profile Field Component
  const ProfileField = ({ label, value }) => (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-300">{label}</p>
      <p className="text-gray-800 font-medium dark:text-gray-400">{value}</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold dark:text-white mb-6">Profile</h1>

      {/* Profile Sections */}
      <ProfileSection title="Basic Information">
        <ProfileField label="Employee ID" value={profileData.Emp_id} />
        {/* <ProfileField label="Nick Name" value={profileData.NickName} /> */}
        <ProfileField label="Name" value={profileData.first_name} />
      </ProfileSection>

      <ProfileSection title="Work Information">
        <ProfileField label="Date of Joining" value={profileData.date_joined} />
        <ProfileField label="Role" value={profileData.Role} />
      </ProfileSection>

      <ProfileSection title="Dependent Details">
        <ProfileField label="Father Name" value={profileData.FatherName} />
        <ProfileField label="Mother Name" value={profileData.MotherName} />
      </ProfileSection>

      <ProfileSection title="Contact Details">
        <ProfileField
          label="Personal Mobile Number"
          value={profileData.PersonalMobileNumber}
        />
      </ProfileSection>

      {/* Edit Profile Button */}
      <button
        onClick={handleEditClick}
        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
