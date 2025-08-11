import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import useCustomNavigation from "../../utils/useCustomNavigation";
import { datetime, timeAgo } from "../../utils/savingsUtils";
import { deleteSavingPlan } from "./savingAction";
import { planScheduleStatusURL } from "../../api/axiosUtil";
import getHeaders from "../../api/getHeaders";
import { getSupabaseToken } from "../../utils/supabase";

// Status indicator component using backend API data
const StatusIndicator = ({ status, message, loading = false }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'on-track':
        return 'bg-green-400';
      case 'ahead':
        return 'bg-blue-500';
      case 'behind':
        return 'bg-orange-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'completed':
        return 'Complete';
      case 'on-track':
        return 'On Track';
      case 'ahead':
        return 'Ahead';
      case 'behind':
        return 'Behind';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-gray-300 animate-pulse"></div>
        <span className="text-xs text-gray-400">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2" title={message}>
      <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
      <span className="text-xs text-gray-600">{getStatusLabel()}</span>
    </div>
  );
};

const SavingPlanListItem = ({ saving }) => {
  const dispatch = useDispatch();
  const { navigateSavingPlanDetail } = useCustomNavigation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [scheduleStatus, setScheduleStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);
  
  // Fetch schedule status from backend
  useEffect(() => {
    const fetchScheduleStatus = async () => {
      try {
        setStatusLoading(true);
        
        // Get authentication token
        const token = await getSupabaseToken();
        if (!token) {
          throw new Error('No authentication token available');
        }
        
        const response = await axios.get(planScheduleStatusURL(saving.id), getHeaders(token));
        setScheduleStatus(response.data);
      } catch (error) {
        console.error(`Error fetching schedule status for plan ${saving.id}:`, error);
        // Fallback to simple status if API fails
        setScheduleStatus({
          status: 'unknown',
          message: 'Unable to load schedule status'
        });
      } finally {
        setStatusLoading(false);
      }
    };

    if (saving.id) {
      fetchScheduleStatus();
    }
  }, [saving.id]);
  
  const handleNavigate = () => {
    navigateSavingPlanDetail(saving.id);
  };
  
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${saving.savings_name}"? This action cannot be undone.`)) {
      try {
        setIsDeleting(true);
        await dispatch(deleteSavingPlan(saving.id)).unwrap();
      } catch (error) {
        alert('Failed to delete saving plan. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-2">
        <h3
          onClick={handleNavigate}
          className="text-xl md:text-2xl font-bold text-sky-600 hover:text-sky-7000 hover:shadow-sm cursor-pointer uppercase flex-1"
        >
          {saving.savings_name}
        </h3>
        <StatusIndicator 
          status={scheduleStatus?.status} 
          message={scheduleStatus?.message} 
          loading={statusLoading}
        />
      </div>
      {/* Target Amount */}
      <p className="text-lg text-gray-700">
        <span className="text-teal-700 font-bold"> Target Amount:</span> £
        {saving.amount}
      </p>
      {/* Amount saved */}
      <p className="text-lg text-gray-700 ">
        <span className="text-sky-700 font-bold"> Saved:</span> £ {saving.total_saved_amount}
      </p>
      {/* Date Created */}
      <p className="text-lg text-gray-700">
        <span className="text-teal-700 font-bold">Date Created:</span>{" "}
        {datetime(saving.date_created)}
      </p>
      <p className="text-lg text-gray-700">
        <span className="text-teal-700 font-bold">Duration:</span>{" "}
        {saving?.number_of_weeks} weeks
      </p>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="btn" onClick={handleNavigate}>
            View
          </button>
          <button 
            className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 p-2 rounded text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[40px] border border-gray-200 hover:border-red-200"
            onClick={handleDelete}
            disabled={isDeleting}
            title={isDeleting ? 'Deleting...' : 'Delete saving plan'}
          >
            {isDeleting ? (
              <svg className="animate-spin h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </button>
        </div>
        <span className="text-sm italic bg-gray-100/90 rounded-full p-4">{timeAgo(saving.date_created)}</span>
      </div>
    </div>
  );
};
export default SavingPlanListItem;
