const EmptyState = ({ onCreatePlan }) => {
  return (
    <div className="text-center py-16">
      <div className="mb-6">
        {/* Piggy Bank Icon */}
        <svg 
          className="mx-auto h-24 w-24 text-gray-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1} 
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 002 2zm8-8V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" 
          />
        </svg>
      </div>
      
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        No savings plans yet
      </h3>
      
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        Start your savings journey by creating your first plan. Set a goal and watch your savings grow week by week.
      </p>
      
      <button
        onClick={onCreatePlan}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Create Your First Plan
      </button>
    </div>
  );
};

export default EmptyState;