import { useState } from "react";
import SavingPlanForm from "./SavingPlanForm";
import SavingPlanList from "../features/savings/SavingPlanList";
import Modal from "./Modal";
import SummaryCards from "./SummaryCards";
import EmptyState from "./EmptyState";
import { useSelector } from "react-redux";
import { selectAllSavings } from "../features/savings/savingsSlice";
import { SelectUserInfo } from "../features/auth/authSliceNew";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, isSuccess, savings, error } =
    useSelector(selectAllSavings);

  const userInfo = useSelector(SelectUserInfo);
  
  const handleCreatePlan = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const hasSavings = savings && savings.length > 0;

  return (
    <div className="max-container">
      {isLoading || !userInfo ? (
        <div className="text-center py-8">
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {/* Header with Create Button */}
          <div className="flex justify-between items-start mb-6">
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl mb-2">
                Hi{" "}
                <span className="font-bold text-teal-700 capitalize">
                  {userInfo?.first_name}
                </span>
                , Welcome to Your Savings Dashboard
              </h2>
            </div>
            
            {/* Create Plan Button */}
            <button
              onClick={handleCreatePlan}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Plan
            </button>
          </div>

          {/* Summary Cards - only show if user has savings */}
          {hasSavings && <SummaryCards savings={savings} />}

          {/* Error Display */}
          {error && (
            <div className="text-center text-red-600 mb-4">
              {error.message}
            </div>
          )}

          {/* Content based on savings existence */}
          {isSuccess && (
            <>
              {hasSavings ? (
                <>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 text-left">
                    Your Saved Plans:
                  </h3>
                  <SavingPlanList savings={savings} />
                </>
              ) : (
                <EmptyState onCreatePlan={handleCreatePlan} />
              )}
            </>
          )}

          {/* Create Plan Modal */}
          <Modal 
            isOpen={isModalOpen} 
            onClose={handleCloseModal}
            title="Create New Savings Plan"
          >
            <SavingPlanForm onSuccess={handleCloseModal} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default Home;
