import React, { useState } from 'react';
import { Progress } from 'antd';
import { SettingOutlined, CloseOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '../context/CurrencyContext';
import './BudgetStatus.css';

const BudgetStatus = ({ expense }) => {
  const { formatAmount } = useCurrency();
  const [monthlyBudget, setMonthlyBudget] = useState(
    Number(localStorage.getItem("vault_budget")) || 20000
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempBudget, setTempBudget] = useState(monthlyBudget);

  const percentageSpent = (expense / monthlyBudget) * 100;
  const budgetRemaining = monthlyBudget - expense;

  const handleSave = () => {
    setMonthlyBudget(tempBudget);
    localStorage.setItem("vault_budget", tempBudget);
    setIsModalOpen(false);
  };

  if (expense === 0) return null;

  return (
    <>
      <motion.div 
        initial={{ width: '80px', height: '80px' }}
        whileHover={{ width: '280px', height: 'auto' }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`budget-floating-card ${percentageSpent > 90 ? 'critical' : ''}`}
      >
        {/* INITIAL STATE: Just the Progress Circle */}
        <div className="gauge-wrapper-initial">
          <Progress
            type="circle"
            percent={Math.round(percentageSpent)}
            width={50}
            strokeColor={percentageSpent > 90 ? '#ff4d4f' : '#ffffff'}
            trailColor="rgba(255,255,255,0.1)"
            strokeWidth={12}
          />
        </div>

        {/* HOVER STATE: Full Component Content */}
        <div className="expanded-content">
          <div className="budget-header">
            <p className="budget-label">Vault Monitor</p>
            <SettingOutlined 
              className="settings-icon" 
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }} 
            />
          </div>
          
          <div className="budget-details">
            <h3 className="budget-value">
              {budgetRemaining < 0 ? "Exceeded" : `${formatAmount(budgetRemaining)} Left`}
            </h3>
            <p className="budget-total-label">Limit: {formatAmount(monthlyBudget)}</p>
          </div>

          <div className="mini-progress-track">
            <div 
              className="mini-progress-fill" 
              style={{ width: `${Math.min(percentageSpent, 100)}%` }}
            ></div>
          </div>
        </div>
      </motion.div>

      {/* Custom Framer Motion Modal */}
      <AnimatePresence>
  {isModalOpen && (
    <div className="modal-overlay">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        className="custom-dark-modal"
      >
        <div className="modal-header">
          <div className="header-title">
            <span className="accent-line"></span>
            <h3>Vault Configuration</h3>
          </div>
          <CloseOutlined className="close-btn" onClick={() => setIsModalOpen(false)} />
        </div>

        <div className="modal-body">
          <div className="spending-summary">
            <div className="summary-item">
              <p>Current Spending</p>
              <span>{formatAmount(expense)}</span>
            </div>
            <div className="summary-item">
              <p>Status</p>
              <span style={{ color: percentageSpent > 90 ? '#ff4d4f' : '#52c41a' }}>
                {percentageSpent > 100 ? 'Over Limit' : 'Secure'}
              </span>
            </div>
          </div>

          <div className="input-section">
            <label className="input-label">New Monthly Spending Limit</label>
            <div className="vault-input-container">
              <input 
                type="number" 
                value={tempBudget} 
                onChange={(e) => setTempBudget(e.target.value)}
                className="vault-main-input"
                autoFocus
              />
              <span className="input-suffix">VAL</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="vault-btn secondary" onClick={() => setIsModalOpen(false)}>Discard</button>
          <button className="vault-btn primary" onClick={handleSave}>Initialize Limit</button>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
    </>
  );
};

export default BudgetStatus;