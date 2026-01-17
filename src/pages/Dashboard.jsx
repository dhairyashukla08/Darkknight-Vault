import React from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { useState } from "react";
import AddExpenseModal from "../components/AddExpenseModal";
import AddIncomeModal from "../components/AddIncomeModal";
import { addDoc, collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import TransactionTable from "../components/TransactionTable";
import ChartComponent from "../components/ChartComponent";
import NoTransactions from "../components/NoTransaction";
import BudgetStatus from "../components/BudgetStatus";
import GoalsTracker from "../components/GoalsTracker";
import FinancialHealth from "../components/FinancialHealth";

const Dashboard = () => {
  
  const [incomeTags, setIncomeTags] = useState([
    "Salary",
    "Freelance",
    "Investment",
  ]);
  const [expenseTags, setExpenseTags] = useState([
    "Food",
    "Education",
    "Office",
    "Rent",
    "Groceries",
  ]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date,
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    console.log("New Transaction Data:", newTransaction);

    addTransaction(newTransaction);

    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
  };

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document Witten with Id", docRef.id);
      if (!many) toast.success("Transaction Added!!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
      // setTransactions((prevTransactions) => [...prevTransactions, transaction]);
    } catch (e) {
      console.error("Error Adding Doc", e);
      if (!many) toast.error("Couldn't add Transaction!!");
    }
  }

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  function calculateBalance() {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  }

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log("transactionArray:", transactionsArray);
      toast.success("transactions Fetched");
    }
    setLoading(false);
  }

  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  async function resetBalance() {
  setLoading(true);
  try {
    const q = query(collection(db, `users/${user.uid}/transactions`));
    const querySnapshot = await getDocs(q);
  
    const deletePromises = querySnapshot.docs.map((document) => 
      deleteDoc(doc(db, `users/${user.uid}/transactions`, document.id))
    );
    
    await Promise.all(deletePromises);
    setTransactions([]);
    toast.success("Balance Reset! All transactions cleared.");
  } catch (e) {
    toast.error("Could not reset balance");
    console.error(e);
  }
  setLoading(false);
}

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            resetBalance={resetBalance}
          />
          {transactions.length !== 0 ? (
            <ChartComponent sortedTransactions={sortedTransactions} />
          ) : (
            <NoTransactions />
          )}
          <AddIncomeModal
            isOpen={isIncomeModalVisible}
            onClose={handleIncomeCancel}
            onFinish={onFinish}
            tags={incomeTags}
          ></AddIncomeModal>
          <AddExpenseModal
            isOpen={isExpenseModalVisible}
            onClose={handleExpenseCancel}
            onFinish={onFinish}
            tags={expenseTags}
          ></AddExpenseModal>
         
          <TransactionTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchTransactions={fetchTransactions}
          />
        <div className="floating-monitors-stack">
          <FinancialHealth expense={expense} />
          
  <GoalsTracker income={income} expense={expense} />
  <BudgetStatus expense={expense} />
</div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
