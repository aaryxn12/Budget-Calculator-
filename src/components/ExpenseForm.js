import React from "react";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
  charge,
  amount,
  onChargeChange,
  onAmountChange,
  onSubmit,
  edit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="expense">Charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="e.g. rent"
            value={charge}
            onChange={onChargeChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="e.g. 100"
            value={amount}
            onChange={onAmountChange}
          />
        </div>
      </div>

      <button type="submit" className="btn">
        {edit ? 'edit' : 'submit'}
        <MdSend className="btn-icon" />
      </button>
    </form>
  );
};

export default ExpenseForm;
