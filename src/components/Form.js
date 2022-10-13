import React, { useState } from "react";
import "./Form.css";
export const Form = ({ searchPeople }) => {
  const initialForm = {
    search: "",
  };
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    if (form.search === "") {
      setForm(initialForm);
    }
    if (form.search !== "") {
      searchPeople(form.search);
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.search === "") setForm(initialForm);
    else searchPeople(form.search);
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={form.search}
          onChange={handleChange}
          onKeyUp={handleSubmit}
          placeholder="busca un personaje"
          className="input-form"
        />
        <button className="button-form">Buscar</button>
      </form>
    </div>
  );
};
