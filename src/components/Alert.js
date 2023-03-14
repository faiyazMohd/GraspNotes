import React,{useContext} from "react";
import AlertContext from "../context/alerts/AlertContext";

export default function Alert() {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;
  const capitalize = (word) => {
    if (word==="danger") {
      word="error"
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{height:'50px'}}>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(alert.type)}!</strong> {alert.message}
        </div>
      )}
    </div>
  );
}
