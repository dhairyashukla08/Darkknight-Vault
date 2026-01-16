import React, { createContext, useState, useContext } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('INR');

  const currencyMap = {
    INR: { symbol: '₹', rate: 1 },
    USD: { symbol: '$', rate: 0.012 }, 
    EUR: { symbol: '€', rate: 0.011 },
  };

  const formatAmount = (amount) => {
    const { symbol, rate } = currencyMap[currency];
    const convertedAmount = amount * rate;
    return `${symbol}${convertedAmount.toLocaleString(undefined, { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ 
        currency, 
        setCurrency, 
        formatAmount, 
        symbol: currencyMap[currency].symbol 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);