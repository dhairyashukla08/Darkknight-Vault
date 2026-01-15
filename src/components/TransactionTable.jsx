import React, { useState } from "react";
import { Table, Tag, Select, Radio } from "antd";
import "./TransactionTable.css";

const TransactionTable = ({ transactions }) => {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
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
      render: (text) => `₹${text}`,
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
  ];

  let filteredtransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
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
        {/* Row 1: Search and Select */}
        <div className="controls-row-top">
          <div className="search-container">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="custom-search-input"
            />
          </div>
          <Select
            className="select-input"
            onChange={(value) => setTypeFilter(value)}
            value={typeFilter}
            placeholder="Filter by Type"
            allowClear
          >
            <Option value="">All Types</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expenses</Option>
          </Select>
        </div>

        {/* Row 2: Radio Buttons Centered */}
        <div className="controls-row-bottom">
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
      </div>

      <div className="table-container">
        <Table
          dataSource={sortedTransactions}
          columns={columns}
          rowKey={(record, index) => index}
          pagination={{ pageSize: 10, showSizeChanger: false }}
        />
      </div>
    </div>
  );
};

export default TransactionTable;
