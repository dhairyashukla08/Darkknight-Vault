  import React from 'react'
  import {Row,Card} from "antd";
  import Button from './Button';
  import './Cards.css';
  import { useCurrency } from '../context/CurrencyContext';
  import { Progress } from 'antd';

  const Cards = ({income,expense,totalBalance, showExpenseModal,showIncomeModal,resetBalance}) => {
    const { formatAmount } = useCurrency();
  return (

      <div className="cards-container">
        <Row className='my-row'>
          <Card className='my-card' title="Current Balance">
            <p className="card-amount">{formatAmount(totalBalance)}</p>
            <Button text="Reset Balance" blue={true} onClick={resetBalance} />
          </Card>
          
          <Card className='my-card' title="Total Income">
            <p className="card-amount">{formatAmount(income)}</p>
            <Button text="Add Income" blue={true} onClick={showIncomeModal} />
          </Card>
          
          <Card className='my-card' title="Total Expenses">
            <p className="card-amount">{formatAmount(expense)}</p>
            <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
          </Card>
        </Row>
      </div>
    );
  }

  export default Cards