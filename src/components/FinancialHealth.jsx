import React, { useMemo } from 'react';
import { Progress } from 'antd';
import { HeartOutlined, CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '../context/CurrencyContext';
import './BudgetStatus.css';

const FinancialHealth = ({ expense }) => {
  const { formatAmount } = useCurrency();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const budget = Number(localStorage.getItem("vault_budget")) || 0;
  const goals = JSON.parse(localStorage.getItem('vault_goals') || "[]");

  const healthData = useMemo(() => {

    let budgetScore = 0;
    if (budget > 0) {
      const usage = expense / budget;
      budgetScore = usage <= 1 ? (1 - usage) * 40 : 0;
    }

    let savingsScore = 0;
    const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
    const totalCurrent = goals.reduce((sum, g) => sum + g.current, 0);
    if (totalTarget > 0) {
      savingsScore = (totalCurrent / totalTarget) * 40;
    }

    const trendScore = expense < (budget * 0.8) ? 20 : 10;

    const totalScore = Math.round(budgetScore + savingsScore + trendScore);
    
    let status = "Needs Attention";
    let color = "#ff4d4f";
    if (totalScore >= 80) { status = "Excellent"; color = "#52c41a"; }
    else if (totalScore >= 60) { status = "Good"; color = "#faad14"; }
    
    return { score: totalScore, status, color, budgetScore, savingsScore, trendScore };
  }, [expense, budget, goals]);

  return (
    <>
      <motion.div 
        initial={{ width: '80px', height: '80px' }}
        whileHover={{ width: '300px', height: 'auto' }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="budget-floating-card"
        style={{ marginBottom: '180px' }} 
      >
        <div className="gauge-wrapper-initial">
          <Progress
            type="circle"
            percent={healthData.score}
            width={50}
            strokeColor={healthData.color}
            trailColor="rgba(255,255,255,0.1)"
            strokeWidth={12}
            format={() => <HeartOutlined style={{ fontSize: '18px', color: '#fff' }} />}
          />
        </div>

        <div className="expanded-content">
          <div className="budget-header">
            <p className="budget-label">Financial Health</p>
            <InfoCircleOutlined 
              className="settings-icon" 
              onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }} 
            />
          </div>
          
          <div className="budget-details">
            <h3 className="budget-value">
              {healthData.score}/100 — {healthData.status}!
            </h3>
            <p className="budget-total-label">Based on Vault Analytics</p>
          </div>

          <div className="mini-progress-track" style={{ marginTop: '12px' }}>
            <div 
              className="mini-progress-fill" 
              style={{ width: `${healthData.score}%`, background: healthData.color }}
            ></div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="custom-dark-modal"
            >
              <div className="modal-header">
                <div className="header-title">
                  <span className="accent-line" style={{ background: healthData.color }}></span>
                  <h3>Health Breakdown</h3>
                </div>
                <CloseOutlined className="close-btn" onClick={() => setIsModalOpen(false)} />
              </div>

              <div className="modal-body">
                <div className="spending-summary" style={{ flexDirection: 'column', gap: '15px' }}>
                  <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <p>Budget Adherence</p>
                    <span>{Math.round(healthData.budgetScore)} / 40</span>
                  </div>
                  <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <p>Goal Progress</p>
                    <span>{Math.round(healthData.savingsScore)} / 40</span>
                  </div>
                  <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <p>Spending Trends</p>
                    <span>{Math.round(healthData.trendScore)} / 20</span>
                  </div>
                </div>
                
                <p style={{ color: '#666', fontSize: '0.75rem', lineHeight: '1.5', marginTop: '10px' }}>
                  Your score increases as you stay under your monthly limit and contribute consistently to your savings goals.
                </p>
              </div>

              <div className="modal-footer">
                <button className="vault-btn primary" style={{ background: healthData.color }} onClick={() => setIsModalOpen(false)}>
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FinancialHealth;