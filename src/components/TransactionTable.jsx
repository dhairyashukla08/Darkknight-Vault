import React, { useState } from "react";
import { Table, Tag, Select, Radio } from "antd";
import "./TransactionTable.css";
import Button from "./Button";
import { unparse, parse } from "papaparse";
import { toast } from "react-toastify";
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';   

import { useCurrency } from "../context/CurrencyContext";

const TransactionTable = ({
  transactions,
  addTransaction,
  fetchTransactions,
  deleteTransaction,
}) => {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

 
  const { formatAmount } = useCurrency();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",

      render: (text) => formatAmount(text),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "income" ? "green" : "red"}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <DeleteOutlined 
        onClick={() => {
          if (window.confirm('Delete this transaction?')) {
            deleteTransaction(record.id);
          }
        }}
        style={{ color: '#ff4d4f', cursor: 'pointer' }}
      />
    ),
  },
  ];

  function exportCSV() {
    const csv = unparse({
      fields: ["name", "type", "tag", "date", "amount"],
      data: transactions,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importCSV(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            if (!transaction.name) continue; 
            const newDoc = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newDoc, true);
          }
          toast.success("All Transactions Imported");
          fetchTransactions();
        },
      });
      event.target.value = null; 
    } catch (e) {
      toast.error(e.message);
    }
  }

  let filteredtransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "" || item.type === typeFilter)
  );

  let sortedTransactions = [...filteredtransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  return (
    <div className="table-wrapper">
      <div className="table-controls">
        <div className="controls-row-top">
          <div className="search-container">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="custom-search-input"
            />
          </div>
          <h2 className="table-heading">My Transactions</h2>
          <div className="select-container">
            <Select
              className="select-input"
              onChange={(value) => setTypeFilter(value || "")}
              value={typeFilter}
              placeholder="Filter by Type"
              allowClear
            >
              <Option value="">All Types</Option>
              <Option value="income">Income</Option>
              <Option value="expense">Expenses</Option>
            </Select>
          </div>
        </div>

        <div className="controls-row-bottom">
          <div className="spacer-left"></div>
          <div className="sort-group">
            <Radio.Group
              className="input-radio"
              onChange={(e) => setSortKey(e.target.value)}
              value={sortKey}
            >
              <Radio.Button value="">No Sort</Radio.Button>
              <Radio.Button value="date">Sort By Date</Radio.Button>
              <Radio.Button value="amount">Sort By Amount</Radio.Button>
            </Radio.Group>
          </div>
          <div className="csv-btn-group">
            <Button text="Export to CSV" onClick={exportCSV} blue={true} />
            <label htmlFor="file-csv" className="btn btn-blue-outline">
              Import from CSV
            </label>
            <input
              id="file-csv"
              type="file"
              accept=".csv"
              required
              onChange={importCSV}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>

      <div className="table-container">
        <Table
          dataSource={sortedTransactions}
          columns={columns}
          rowKey={(record, index) => record.id || index}
          pagination={{ pageSize: 10, showSizeChanger: false }}
        />
      </div>
    </div>
  );
};

export default TransactionTable;