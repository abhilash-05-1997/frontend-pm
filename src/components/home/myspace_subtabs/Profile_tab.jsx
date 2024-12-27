import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import EditEducation from "./EditEducation";
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

  const [educationData, setEducationData] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);

  const GET_PROFILE_DATA = "api/profile/";
  const MODIFY_PROFILE_DATA = "api/profile/";
  const MODIFY_EDUCATION_DATA = "api/education/";
  const GET_EDUCATION_DATA = "api/education/";

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

    const fetchEducationData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await apiService.fetchInstance(GET_EDUCATION_DATA);
        setEducationData(response.data);
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };

    fetchProfileData();
    fetchEducationData();
  }, []);

  // Handle opening the Edit Modal
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleEditEducationClick = (education) => {
    setSelectedEducation(education);
    setIsEducationModalOpen(true);
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

  const handleEducationSubmit = async (updatedEducation) => {
    const educationId = selectedEducation.id;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await apiService.modifyInstance(
        `${MODIFY_EDUCATION_DATA}${educationId}/`,
        updatedEducation
      );

      setEducationData((prev) =>
        prev.map((edu) => (edu.id === educationId ? response.data : edu))
      );

      toast.success("Education data updated successfully!");
      setIsEducationModalOpen(false);
    } catch (error) {
      console.error("Error updating education:", error);
      toast.error("Failed to update education data.");
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
      {/* Edit Profile Button */}
      <button
        onClick={handleEditClick}
        className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-auto"
      >
        Edit Profile
      </button>

      {/* Profile Sections */}
      <ProfileSection title="Basic Information">
        <ProfileField label="Employee ID" value={profileData.Emp_id} />
        {/* <ProfileField label="Nick Name" value={profileData.NickName} /> */}
        <ProfileField
          label="Name"
          value={`${profileData.first_name} ${profileData.last_name}`}
        />
      </ProfileSection>

      <ProfileSection title="Work Information">
        <ProfileField label="Date of Joining" value={profileData.date_joined} />
        <ProfileField label="Role" value={profileData.Role} />
      </ProfileSection>

      <ProfileSection title="Dependent Details">
        <ProfileField label="Father's Name" value={profileData.FatherName} />
        <ProfileField label="Mother's Name" value={profileData.MotherName} />
        <ProfileField
          label="Emergency Contact"
          value={profileData.emergency_number}
        />
      </ProfileSection>
      <ProfileSection title="Contact Details">
        <ProfileField
          label="Personal Mobile Number"
          value={profileData.PersonalMobileNumber}
        />
      </ProfileSection>
      <ProfileSection title="Government ID Proofs">
        <ProfileField label="Adhaar Number" value={profileData.adhaar_number} />
        <ProfileField label="Pan Number" value={profileData.pan_number} />
        <ProfileField label="Adhaar File" value={profileData.adhaar_file} />
        <ProfileField label="PAN File" value={profileData.pan_file} />
      </ProfileSection>

      <button
        onClick={handleEditEducationClick}
        className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-auto"
      >
        Edit Education
      </button>
      <ProfileSection title="Education Details"></ProfileSection>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <EditProfile
          profileData={profileData}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      {isEducationModalOpen && selectedEducation && (
        <EditEducation
          educationData={selectedEducation}
          onClose={() => setIsEducationModalOpen(false)}
          onSubmit={handleEducationSubmit}
        />
      )}
    </div>
  );
};

export default Profile;
