import React, { useEffect, useState } from "react";
import AddLeavePolicyForm from "../../../utility/forms/AddLeavePolicyForm";
import apiService from "../../../api/apiService";

const LeavePolicies_tab = () => {
  const [policies, setPolicies] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState(null);

  const FETCH_POLICIES = "api/leave-policies/";
  const ADD_POLICY = "api/leave-policies/create/";
  const DELETE_POLICY = "api/leave-policies/";
  const GET_LEAVE_TYPES = "api/leave-types/";

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await apiService.fetchInstance(FETCH_POLICIES);
        setPolicies(response.data.policy_types || []);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    const fetchLeaveTypes = async () => {
      try {
        const response = await apiService.fetchAllInstances(GET_LEAVE_TYPES);
        setLeaveTypes(response.data || []);
      } catch (error) {
        console.error("Error fetching leave types:", error);
      }
    };

    fetchLeaveTypes();
    fetchPolicies();
  }, []);

  const getLeaveTypeName = (leaveTypeId) => {
    const leaveType = leaveTypes.find((type) => type.id === Number(leaveTypeId));
    return leaveType ? leaveType.leavename : "Unknown";
  };

  const handleAddPolicy = async (newPolicy) => {
    try {
      const response = await apiService.createInstance(ADD_POLICY, newPolicy);
      const leaveTypeName = getLeaveTypeName(response.data.leave_type);
      const enrichedPolicy = { ...response.data, leave_type_name: leaveTypeName };
      setPolicies((prevPolicies) => [enrichedPolicy, ...prevPolicies]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding policy:", error);
    }
  };

  const openDeleteConfirmationModal = (policyId) => {
    setPolicyToDelete(policyId);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!policyToDelete) return;
    try {
      await apiService.deleteInstance(`${DELETE_POLICY}${policyToDelete}/delete/`);
      setPolicies(policies.filter((policy) => policy.id !== policyToDelete));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting policy:", error);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Leave Policies</h2>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 sm:px-6 sm:py-2"
      >
        Add Leave Policy
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto text-sm sm:text-base">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Leave Policy Name</th>
              <th className="px-4 py-2 border-b text-left">Max Days</th>
              <th className="px-4 py-2 border-b text-left">Carry Forward Type</th>
              <th className="px-4 py-2 border-b text-left">Carry Forward</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">{getLeaveTypeName(policy.leave_type)}</td>
                <td className="px-4 py-2 border-b">{policy.max_days}</td>
                <td className="px-4 py-2 border-b">{policy.carry_forward_type}</td>
                <td className="px-4 py-2 border-b">{policy.carry_forward ? "Yes" : "No"}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => openDeleteConfirmationModal(policy.id)}
                    className="px-2 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-md w-full">
            <AddLeavePolicyForm
              leaveTypes={leaveTypes}
              onClose={() => setIsModalOpen(false)}
              onSave={handleAddPolicy}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeavePolicies_tab;
