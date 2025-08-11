import { useNavigate } from 'react-router-dom';

const SummaryCards = ({ savings = [] }) => {
  const navigate = useNavigate();

  const totalPlans = savings.length;
  const totalTarget = savings.reduce((sum, plan) => sum + (parseFloat(plan.amount) || 0), 0);
  
  // Calculate average progress using actual backend data
  const averageProgress = savings.length > 0 
    ? Math.round(savings.reduce((sum, plan) => {
        const targetAmount = parseFloat(plan.amount) || 0;
        const savedAmount = parseFloat(plan.total_saved_amount) || 0;
        const progress = targetAmount > 0 ? (savedAmount / targetAmount) * 100 : 0;
        return sum + progress;
      }, 0) / savings.length)
    : 0;

  const handleStatsClick = () => {
    navigate('/stats'); // You'll need to create this route
  };

  return (
    <div className="mb-8">
      <div className="bg-white bg-opacity-40 backdrop-blur-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Savings Overview</h3>
          <button 
            onClick={handleStatsClick}
            className="text-xs text-teal-600 hover:text-teal-700 transition-colors cursor-pointer"
          >
            Click for details →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center md:text-left">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Plans</div>
            <div className="text-2xl font-bold text-gray-900">{totalPlans}</div>
          </div>
          
          <div className="text-center md:text-left">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Target</div>
            <div className="text-2xl font-bold text-gray-900">${totalTarget.toLocaleString()}</div>
          </div>
          
          <div className="text-center md:text-left">
            <div className="text-sm font-medium text-gray-600 mb-1">Average Progress</div>
            <div className="text-2xl font-bold text-gray-900">{averageProgress}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;