import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Possession from "../models/possessions/Possession";


const CustomizedDatePicker = ({ possessions, setTotalValue }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const possessionInstances = possessions.map((possession) => 
    new Possession(
        possession.possesseur,
        possession.libelle,
        possession.valeur,
        new Date(possession.dateDebut),
        new Date(possession.dateFin),
        possession.tauxAmortissement
    )
);

  const calculateTotalValue = () => {
    if(!selectedDate) {
        return;
    }
    let totalValue = 0;
    possessionInstances.forEach((possession) => {
        totalValue += possession.getValeur(selectedDate);
    })
    setTotalValue(totalValue.toFixed(2));
  };

  return (
    <div className="my-4">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          calculateTotalValue();
        }}
        dateFormat="dd/MM/yyyy"
        placeholderText="Choisir une date"
        className="form-control"
      />
      <button onClick={calculateTotalValue} className="btn btn-primary mt-3">
        Calculer la valeur totale
      </button>
    </div>
  );
};

export default CustomizedDatePicker;
