import React from "react";
import styled from "styled-components";

const FormRow = ({ name, type, labelText, required, defaultValue }) => {
  return (
    <Wrapper>
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue || ""}
        className="form-input"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  width: 100%;
`;

export default FormRow;
