import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';
import { PlusOutlined, DeleteOutlined, TrophyOutlined, CloseOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '../context/CurrencyContext';
import './GoalsTracker.css';

const GoalsTracker = () => {
  const { formatAmount, symbol } = useCurrency();
  
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem('vault_goals');
    return savedGoals ? JSON.parse(savedGoals) : [];
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');

  useEffect(() => {
    localStorage.setItem('vault_goals', JSON.stringify(goals));
  }, [goals]);

  const openModal = () => {
    setGoalName('');
    setTargetAmount('');
    setCurrentAmount('');
    setIsModalOpen(true);
  };

  const handleSaveGoal = () => {
    const target = parseFloat(targetAmount);
    const current = parseFloat(currentAmount) || 0;

    if (!goalName || isNaN(target) || target <= 0) return;

    const newGoal = {
      id: Date.now(),
      name: goalName,
      target,
      current,
    };

    setGoals([...goals, newGoal]);
    setIsModalOpen(false);
  };

  const deleteGoal = (e, id) => {
    e.stopPropagation();
    setGoals(goals.filter(g => g.id !== id));
  };

  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
  const totalCurrent = goals.reduce((sum, g) => sum + g.current, 0);
  const overallProgress = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;

  return (
    <>
      <motion.div 
        initial={{ width: '80px', height: '80px' }}
        whileHover={{ width: '320px', height: 'auto' }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="budget-floating-card" 
        style={{ marginBottom: '90px' }} 
      >
        <div className="gauge-wrapper-initial">
          <Progress
            type="circle"
            percent={Math.round(overallProgress)}
            width={50}
            strokeColor="#52c41a"
            trailColor="rgba(255,255,255,0.1)"
            strokeWidth={12}
            format={() => <TrophyOutlined style={{ fontSize: '18px', color: '#fff' }} />}
          />
        </div>

        <div className="expanded-content">
          <div className="budget-header">
            <div>
              <p className="budget-label">Savings Vault</p>
              <h3 className="budget-value">{formatAmount(totalCurrent)}</h3>
              <p className="budget-total-label">Target: {formatAmount(totalTarget)}</p>
            </div>
            <PlusOutlined className="settings-icon" onClick={(e) => { e.stopPropagation(); openModal(); }} />
          </div>

          <div style={{ marginTop: '15px', maxHeight: '200px', overflowY: 'auto' }}>
            {goals.map((goal) => {
              const remaining = goal.target - goal.current;
              
              return (
                <div key={goal.id} style={{ marginBottom: '12px', borderBottom: '1px solid #1a1a1a', paddingBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.85rem', textTransform: 'lowercase' }}>{goal.name}</h4>
                      <p style={{ margin: 0, fontSize: '0.7rem', color: '#52c41a', fontWeight: 'bold' }}>
                        {remaining > 0 ? `${formatAmount(remaining)} remaining` : 'Goal Completed'}
                      </p>
                    </div>
                    <DeleteOutlined style={{ fontSize: '0.7rem', color: '#444' }} onClick={(e) => deleteGoal(e, goal.id)} />
                  </div>
                  <div style={{ height: '3px', background: '#111', marginTop: '6px', borderRadius: '2px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        background: '#52c41a', 
                        width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                        transition: 'width 0.5s ease'
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              className="custom-dark-modal"
            >
              <div className="modal-header">
                <div className="header-title">
                  <div className="accent-line" style={{ background: '#52c41a' }}></div>
                  <h3>Initialize Goal</h3>
                </div>
                <CloseOutlined className="close-btn" onClick={() => setIsModalOpen(false)} />
              </div>

              <div className="modal-body">
                <div style={{ marginBottom: '20px' }}>
                  <label className="input-label">Asset Name</label>
                  <div className="vault-input-container">
                    <input 
                      className="vault-main-input" 
                      style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                      placeholder="e.g. house" 
                      value={goalName} 
                      onChange={(e) => setGoalName(e.target.value)} 
                    />
                    <span className="input-suffix">NAME</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <label className="input-label">Target Amount</label>
                    <div className="vault-input-container">
                      <input 
                        type="number" 
                        className="vault-main-input" 
                        style={{ fontSize: '1.2rem' }}
                        placeholder="50000" 
                        value={targetAmount} 
                        onChange={(e) => setTargetAmount(e.target.value)} 
                      />
                      <span className="input-suffix">{symbol}</span>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="input-label">Current Savings</label>
                    <div className="vault-input-container">
                      <input 
                        type="number" 
                        className="vault-main-input" 
                        style={{ fontSize: '1.2rem' }}
                        placeholder="10000" 
                        value={currentAmount} 
                        onChange={(e) => setCurrentAmount(e.target.value)} 
                      />
                      <span className="input-suffix">{symbol}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="vault-btn secondary" onClick={() => setIsModalOpen(false)}>Discard</button>
                <button className="vault-btn primary" style={{ background: '#52c41a', color: '#000', border: 'none' }} onClick={handleSaveGoal}>Secure Vault</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GoalsTracker;