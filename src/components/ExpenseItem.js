import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const ExpenseItem = (props) => {
  const { id, charge, amount } = props.expense;

  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">{amount}</span>
      </div>
      <div>
        <button
          className="edit-btn"
          aria-label="edit button"
          onClick={() => {
            props.onEdit(id);
          }}
        >
          <MdEdit />
        </button>
        <button
          className="clear-btn"
          aria-label="delete button"
          onClick={() => {
            props.onSingleItemDeletion(id);
          }}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
