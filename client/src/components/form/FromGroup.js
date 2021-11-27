import React from "react";

function FromGroup({ id, label, type, name, value, placeholder, autoFocus, disabled, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type ?? "text"}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus ?? false}
        disabled={disabled ?? false}
        placeholder={placeholder ?? label + "..."}
      />
    </div>
  );
}

export default FromGroup;
