import React from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { useState } from "react";
import AddExpenseModal from "../components/AddExpenseModal";
import AddIncomeModal from "../components/AddIncomeModal";
import { addDoc, collection, doc, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

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

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document Witten with Id", docRef.id);
      toast.success("Transaction Added!!");
    } catch (e) {
      console.error("Error Adding Doc", e);
      toast.error("Couldn't add Transaction!!");
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

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
      console.log("transactionArray:" ,transactionsArray)
      toast.success("transactions Fetched");
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
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          <AddIncomeModal
            isOpen={isIncomeModalVisible}
            onClose={handleIncomeCancel}
            onFinish={onFinish}
          ></AddIncomeModal>
          <AddExpenseModal
            isOpen={isExpenseModalVisible}
            onClose={handleExpenseCancel}
            onFinish={onFinish}
          ></AddExpenseModal>
        </>
      )}
    </div>
  );
};

export default Dashboard;
