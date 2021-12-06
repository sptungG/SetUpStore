import React from "react";

function FormGroup({ id, label, type, value, placeholder, autoFocus, disabled, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type ?? "text"}
        className="form-control"
        // autoComplete="off"
        value={value}
        onChange={onChange}
        autoFocus={autoFocus ?? false}
        disabled={disabled ?? false}
        placeholder={placeholder ?? label + "..."}
      />
    </div>
  );
}

export default FormGroup;
