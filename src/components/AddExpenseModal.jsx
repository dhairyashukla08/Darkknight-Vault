import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Modals.css";

const AddExpenseModal = ({ isOpen, onClose, onFinish,tags }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    onFinish(values, "expense");
    e.target.reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="custom-modal-overlay">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose} 
            className="custom-modal-backdrop" 
          />
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="custom-modal-content"
          >
            <div className="modal-header">
              <h2>Add Expense</h2>
              <button className="close-x" onClick={onClose}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="custom-modal-form">
              <div className="form-group">
                <label>Name</label>
                <input name="name" type="text" placeholder="Rent, Groceries..." required />
              </div>
              
              <div className="form-group">
                <label>Amount</label>
                <input name="amount" type="number" placeholder="0.00" required />
              </div>
              
              <div className="form-group">
                <label>Date</label>
                <input name="date" type="date" required />
              </div>
              
              <div className="form-group">
                <label>Tag</label>
                <select name="tag" required>
                  <option value="" disabled selected>Select Tag</option>
                 {tags.map((tag, index) => (
                  <option key={index} value={tag.toLowerCase()}>
                    {tag}
                  </option>
                ))}
                </select>
              </div>
              
              <button type="submit" className="btn btn-blue">Add Expense</button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddExpenseModal;