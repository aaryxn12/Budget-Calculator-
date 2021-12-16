import React from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = (props) => {
  return (
    <>
      <ul className="list">
        {props.expenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onSingleItemDeletion={props.onSingleItemDeletion}
              onEdit={props.onEdit}
            />
          );
        })}
      </ul>

      {props.expenses.length > 0 && (
        <button className="btn" onClick={props.onClearExpenses}>
          Clear Expenses
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
