import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import React, { useState, useEffect } from "react";
import { uuid } from "uuidv4";

// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 600 },
//   { id: uuid(), charge: "car payment", amount: 2600 },
//   { id: uuid(), charge: "credit card bill", amount: 1000 },
// ];

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  //******** State Values//
  // all expenses , add expenses
  const [expenses, setExpenses] = useState(initialExpenses);

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  //For Storage
  useEffect(()=> {
    console.log('we called useEffect');
    localStorage.setItem('expenses', JSON.stringify(expenses))
  },[expenses])

  const chargeChangeHandler = (event) => {
    setCharge(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  const alertHandler = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 4000);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id
            ? { ...item, charge: charge, amount: amount }
            : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        alertHandler({ type: "success", text: "item Edited" });
      } else {
        const singleExpense = { id: uuid(), charge: charge, amount: amount };
        setExpenses([...expenses, singleExpense]);
        alertHandler({ type: "success", text: "item added" });
      }

      setAmount("");
      setCharge("");
    } else {
      alertHandler({
        type: "danger",
        text: `charge cant be empty and amount value has to be bigger than zero`,
      });
    }
  };

  //Clear all items

  const clearAllItems = () => {
    setExpenses([]);
    alertHandler({ type: "danger", text: "All Items Deleted" });
  };

  //Deleting single Items

  const clearSingleItems = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    console.log(tempExpenses);
    setExpenses(tempExpenses);
    alertHandler({ type: "danger", text: "Item Deleted" });
  };

  //edit handler

  const editHandler = (id) => {
    let expense = expenses.find((item) => item.id === id);
    console.log(expense);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <React.Fragment>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          onChargeChange={chargeChangeHandler}
          onAmountChange={amountChangeHandler}
          onSubmit={submitHandler}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          onClearExpenses={clearAllItems}
          onSingleItemDeletion={clearSingleItems}
          onEdit={editHandler}
        />
      </main>
      <h1>
        Total Spending :{" "}
        <span className="total">
          Rs.
          {expenses.reduce((prevValue, currValue) => {
            return (prevValue += parseInt(currValue.amount));
          }, 0)}
        </span>
      </h1>
    </React.Fragment>
  );
}

export default App;
