import { createContext, useContext, useState } from 'react';
import Modal from '../components/Modal';
import SupabaseLoginForm from '../features/users/components/SupabaseLoginForm';
import SupabaseRegisterForm from '../features/users/components/SupabaseRegisterForm';

const AuthModalContext = createContext();

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};

export const AuthModalProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsRegisterModalOpen(false); // Close register modal if open
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => {
    setIsLoginModalOpen(false); // Close login modal if open
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const contextValue = {
    openLoginModal,
    closeLoginModal,
    openRegisterModal,
    closeRegisterModal,
    isLoginModalOpen,
    isRegisterModalOpen,
  };

  return (
    <AuthModalContext.Provider value={contextValue}>
      {children}
      
      {/* Login Modal */}
      <Modal 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal}
        title="Sign In to Your Account"
      >
        <SupabaseLoginForm onSuccess={closeLoginModal} />
      </Modal>

      {/* Register Modal */}
      <Modal 
        isOpen={isRegisterModalOpen} 
        onClose={closeRegisterModal}
        title="Create Your Account"
      >
        <SupabaseRegisterForm onSuccess={closeRegisterModal} />
      </Modal>
    </AuthModalContext.Provider>
  );
};