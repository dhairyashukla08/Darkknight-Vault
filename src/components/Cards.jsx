import React from 'react'
import {Row,Card} from "antd";
import Button from './Button';
import './Cards.css';

const Cards = ({income,expense,totalBalance, showExpenseModal,showIncomeModal}) => {
 return (
    <div className="cards-container">
      <Row className='my-row'>
        <Card className='my-card' title="Current Balance">
          <p className="card-amount">₹{totalBalance}</p>
          <Button text="Reset Balance" blue={true} />
        </Card>
        
        <Card className='my-card' title="Total Income">
          <p className="card-amount">₹{income}</p>
          <Button text="Add Income" blue={true} onClick={showIncomeModal} />
        </Card>
        
        <Card className='my-card' title="Total Expenses">
          <p className="card-amount">₹{expense}</p>
          <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
        </Card>
      </Row>
    </div>
  );
}

export default Cards