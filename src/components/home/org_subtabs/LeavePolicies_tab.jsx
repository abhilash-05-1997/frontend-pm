import React, { useEffect, useState } from "react";
import AddLeavePolicyForm from "../../../utility/forms/AddLeavePolicyForm";
import apiService from "../../../api/apiService";
import { toast } from "react-toastify";
import {FaDumpster, FaEdit, FaRecycle, FaTrash} from 'react-icons/fa'
import { FaDeleteLeft } from "react-icons/fa6";

const LeavePolicies_tab = () => {
  const [policies, setPolicies] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState(null);

  const API_ENDPOINTS = {
    FETCH_POLICIES: "api/leave-policies/",
    ADD_POLICY: "api/leave-policies/create/",
    DELETE_POLICY: "api/leave-policies/",
    GET_LEAVE_TYPES: "api/leave-types/",
    CREATE_LEAVE_TYPE: "api/leave-types/create/",
    POLICY_DATA_API: "api/leave-policies/",
    UPDATE_LEAVE_TYPE: 'api/leave-types/',
    UPDATE_LEAVE_POLICY: 'api/update_leave_policy/',
    DELETE_LEAVE_POLICY: 'api/delete_leave_policy/'
  };

  useEffect(() => {
    fetchPolicies();
    fetchLeaveTypes();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await apiService.fetchInstance(
        API_ENDPOINTS.FETCH_POLICIES
      );
      setPolicies(response.data.policy_types || []);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  const fetchLeaveTypes = async () => {
    try {
      const response = await apiService.fetchAllInstances(
        API_ENDPOINTS.GET_LEAVE_TYPES
      );
      setLeaveTypes(response.data || []);
    } catch (error) {
      console.error("Error fetching leave types:", error);
    }
  };

  const getLeaveTypeName = (leaveTypeId) => {
    const leaveType = leaveTypes.find(
      (type) => type.id === Number(leaveTypeId)
    );
    return leaveType ? leaveType.leavename : "Unknown";
  };

  // const getLeaveTypeIndexId = (policyId) => {
  //   // const policy = policies.find((policy) => policy.id === Number(policyId));
  //     const leaveType = leaveTypes.find((type) => type.id === policyId);
  //     return leaveType ? leaveType.id || " " : " ";
    
    
  // };
  

  const openEditModal = async (policyId) => {
    try {
      const response = await apiService.fetchInstance(
        `${API_ENDPOINTS.POLICY_DATA_API}${policyId}/`
      );
    
      setSelectedPolicy(response.data); // Prepopulate with data from both tables      
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching policy details:", error);
    }
  };

  // const handleAddOrEditPolicy = async (policyData) => {
  //   const company_id = localStorage.getItem("company_id");

  //   const leavetypeData = {
  //     leavename: policyData.leavename,
  //     leave_description: policyData.description,
  //   };

  //   const leavePolicyData = {
  //     max_days: policyData.max_days,
  //     carry_forward_days: policyData.carry_forward_days,
  //     carry_forward_type: policyData.carry_forward_type,
  //     carry_forward: policyData.carry_forward,
  //   };

  //   try {
  //     let leaveTypeId = policyData.leave_type;

  //     // Create a new leave type if editing isn't specified or leave_type ID isn't provided
  //     if (!leaveTypeId) {
  //       const leaveTypeResponse = await apiService.createInstance(
  //         API_ENDPOINTS.CREATE_LEAVE_TYPE,
  //         {
  //           company: company_id,
  //           ...leavetypeData,
  //         }
  //       );
  //       leaveTypeId = leaveTypeResponse.data.id;
  //     }

  //     // Add new policy
  //     await apiService.createInstance(API_ENDPOINTS.ADD_POLICY, {
  //       leave_type: leaveTypeId,
  //       ...leavePolicyData,
  //     });

  //     fetchPolicies();
  //     fetchLeaveTypes();
  //     setIsModalOpen(false);
  //     setSelectedPolicy(null);
  //   } catch (error) {
  //     console.error("Error adding or updating policy:", error);
  //   }
  // };

  const handleAddOrEditPolicy = async (policyData) => {
    try {
      const response = await apiService.createInstance(
        "api/leave-policies/transaction/",
        {
          company: localStorage.getItem("company_id"),
          leavename: policyData.leavename,
          description: policyData.description,
          max_days: policyData.max_days,
          carry_forward_days: Number(policyData.carry_forward_days) || 0,
          carry_forward_type: policyData.carry_forward_type,
          carry_forward: policyData.carry_forward,
        }
      );
      toast.success("Policy added successfully!");
      fetchPolicies();
      fetchLeaveTypes();
      setIsModalOpen(false);
      setSelectedPolicy(null);
    } catch (error) {
      console.error("Error adding or updating policy:", error);
      toast.error("Failed to add or update policy. Please try again.");
    }
  };
  
  const handleEditPolicy = async (policyData) => {
    try {
      const leaveTypeId = policyData.leave_type;  // The ID of the leave type to be updated
      const leavePolicyId = policyData.id;  // The ID of the leave policy to be updated
      
      // Prepare the data for updating the leave type and policy
      const updatedData = {
        leave_policy_id: leavePolicyId,  // ID of the leave policy to be updated
        leavename: policyData.leavename,
        description: policyData.description,
        leave_type: leaveTypeId,  // ID of the leave type to be updated
        max_days: policyData.max_days,
        carry_forward_days: policyData.carry_forward_days,
        carry_forward_type: policyData.carry_forward_type,
        carry_forward: policyData.carry_forward,
      };
  
      // Make a PUT request to update both leave type and leave policy in a single transaction
      const response = await apiService.modifyInstance(
        `${API_ENDPOINTS.UPDATE_LEAVE_POLICY}`,
        updatedData
      );
      toast.success("Policy Updated Successfully...");
  
      // Refresh the policy list and close the modal
      fetchPolicies();
      setIsModalOpen(false);
      setSelectedPolicy(null);
    } catch (error) {
      toast.error("Failed to update policy!", );
      console.error("Error editing policy:", error);
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await apiService.deleteInstance(
        `${API_ENDPOINTS.DELETE_LEAVE_POLICY}?leave_type_id=${policyToDelete}`,// Sending the policy ID to delete
      );
  
      toast.success("Policy Deleted Successfully...");
  
      // Refresh the policy list after deletion
      fetchPolicies();
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete policy!");
      console.error("Error deleting policy:", error);
    }
  };
  

  const openDeleteConfirmationModal = (policyId) => {
    setPolicyToDelete(policyId);
    setIsDeleteModalOpen(true);
  };

  // return (
  //   <div className="dark:bg-dark-bg dark:text-dark-text ">
  //     <h2 className="text-xl sm:text-2xl font-bold text-start">
  //       Leave Policies
  //     </h2>

  //     <button
  //       onClick={() => {
  //         setSelectedPolicy(null);
  //         setIsModalOpen(true);
  //       }}
  //       className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 sm:px-6 sm:py-2 justify-end dark:bg-dark-add-button dark:text-dark-button-text font-bold"
  //     >
  //       Add Leave Policy
  //     </button>

  //     <div className="overflow-x-auto">
  //       <table className="min-w-full border-collapse table-auto text-sm sm:text-base">
  //         <thead>
  //           <tr>
  //             <th className="px-4 py-2 border-b text-left">
  //               Leave Policy Name
  //             </th>
  //             <th className="px-4 py-2 border-b text-left">
  //               Carry Forward Type
  //             </th>
  //             <th className="px-4 py-2 border-b text-left">Max Days</th>
  //             <th className="px-4 py-2 border-b text-left">Carry Forward</th>
  //             <th className="px-4 py-2 border-b text-left">
  //               Carry Forward Days
  //             </th>
  //             <th className="px-4 py-2 border-b text-left">Actions</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {policies.map((policy, index) => (
  //             <tr key={index}>
  //               <td className="px-4 py-2 border-b">
  //                 {getLeaveTypeName(policy.leave_type)}
  //               </td>
  //               <td className="px-4 py-2 border-b">
  //                 {policy.carry_forward_type}
  //               </td>
  //               <td className="px-4 py-2 border-b">{policy.max_days}</td>

  //               <td className="px-4 py-2 border-b">
  //                 {policy.carry_forward ? "Yes" : "No"}
  //               </td>
  //               <td className="px-4 py-2 border-b">
  //                 {policy.carry_forward_days}
  //               </td>
  //               <td className="px-4 py-2 border-b">
  //                 <button
  //                   onClick={() => openEditModal(policy.id)}
  //                   className="px-2 py-1 bg-yellow-600 text-white rounded-md hover:bg-blue-600"
  //                 >
  //                   <FaEdit/>
  //                 </button>
  //                 <button
  //                   onClick={() => openDeleteConfirmationModal(policy.leave_type)}
  //                   className="px-2 py-1 mx-2 bg-red-700 text-white rounded-md hover:bg-blue-600"
  //                 >
  //                   <FaTrash/>
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>

  //     {isDeleteModalOpen && (
  //       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-6">
  //         <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-md w-full">
  //           <h3 className="text-lg sm:text-xl font-semibold">
  //             Are you sure you want to delete this policy?
  //           </h3>
  //           <div className="mt-4 flex justify-end space-x-2 sm:space-x-4">
  //             <button
  //               onClick={() => setIsDeleteModalOpen(false)}
  //               className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-300 rounded-md"
  //             >
  //               Cancel
  //             </button>
  //             <button
  //               onClick={handleDelete}
  //               className="px-3 py-1 sm:px-4 sm:py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
  //             >
  //               Delete
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}

  //     {isModalOpen && (
  //       <AddLeavePolicyForm
  //         leaveTypes={leaveTypes}
  //         initialData={selectedPolicy}
  //         onClose={() => {
  //           setIsModalOpen(false);
  //           setSelectedPolicy(null);
  //         }}
  //         onSave={selectedPolicy ? handleEditPolicy : handleAddOrEditPolicy}
  //       />
  //     )}
  //   </div>
  // );

  return (
    <div className="dark:bg-dark-bg dark:text-dark-text">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            setSelectedPolicy(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 sm:px-6 sm:py-2 dark:bg-dark-add-button dark:text-dark-button-text font-bold"
        >
          Add Leave Policy
        </button>
  
        <h3 className="text-xl sm:text-2xl font-semibold text-center flex-grow">
          Leave Policies
        </h3>
      </div>
  
      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto text-sm sm:text-base">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Leave Policy Name</th>
              <th className="px-4 py-2 border-b text-left">
                Carry Forward Type
              </th>
              <th className="px-4 py-2 border-b text-left">Max Days</th>
              <th className="px-4 py-2 border-b text-left">Carry Forward</th>
              <th className="px-4 py-2 border-b text-left">
                Carry Forward Days
              </th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">
                  {getLeaveTypeName(policy.leave_type)}
                </td>
                <td className="px-4 py-2 border-b">
                  {policy.carry_forward_type}
                </td>
                <td className="px-4 py-2 border-b">{policy.max_days}</td>
                <td className="px-4 py-2 border-b">
                  {policy.carry_forward ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2 border-b">
                  {policy.carry_forward_days}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => openEditModal(policy.id)}
                    className="px-2 py-1 bg-yellow-600 text-white rounded-md hover:bg-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() =>
                      openDeleteConfirmationModal(policy.leave_type)
                    }
                    className="px-2 py-1 mx-2 bg-red-700 text-white rounded-md hover:bg-blue-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-md w-full">
            <h3 className="text-lg sm:text-xl font-semibold">
              Are you sure you want to delete this policy?
            </h3>
            <div className="mt-4 flex justify-end space-x-2 sm:space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* Add/Edit Leave Policy Modal */}
      {isModalOpen && (
        <AddLeavePolicyForm
          leaveTypes={leaveTypes}
          initialData={selectedPolicy}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPolicy(null);
          }}
          onSave={selectedPolicy ? handleEditPolicy : handleAddOrEditPolicy}
        />
      )}
    </div>
  );  
};

export default LeavePolicies_tab;
