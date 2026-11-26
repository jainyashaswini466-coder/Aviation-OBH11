

import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    password:"",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const cleanPhone = formData.phoneNumber.replace(/\D/g, "");

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required.";
    }
    if (!formData.dateOfBirth) {
      nextErrors.dateOfBirth = "Date of birth is required.";
    }
    if (!formData.gender) {
      nextErrors.gender = "Please select a gender.";
    }
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      nextErrors.phoneNumber = "Enter a valid phone number (10–15 digits).";
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setMessage('');
    onSubmit?.(formData);

    try {
    const response = await fetch('http://localhost:5000/signup',{

        method:"POST",
        headers:{
            'Content-type':'application/json',
        },
        body: JSON.stringify(formData)
        })

const data = await response.json();
    setMessage(data.message || (response.ok ? 'Account created. You can now log in.' : 'Unable to create account.'));
    } catch {
      setMessage('Unable to reach the server. Please try again.');
    }

  };

  return (
    <section className="login-page panel">
      <span className="eyebrow">WELCOME ABOARD</span>
      <h1>Sign up</h1>
      <p>Create an account to begin your journey.</p>
      <form onSubmit={handleSubmit}>

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          autoComplete="name"
          required
        />
        {errors.name && <p role="alert">{errors.name}</p>}
      </div>

    <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="abc@gmail.com"
        />
        {errors.email && <p role="alert">{errors.email}</p>}
      </div>

    <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="***"
        />
        {errors.password && <p role="alert">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          max={new Date().toISOString().split("T")[0]}
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        {errors.dateOfBirth && <p role="alert">{errors.dateOfBirth}</p>}
      </div>

      <fieldset>
        <legend>Gender</legend>
        {["Female", "Male", "Non-binary", "Prefer not to say"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              style={{ width: 'auto', margin: '0 6px 0 0' }}
              name="gender"
              value={option}
              checked={formData.gender === option}
              onChange={handleChange}
            />
            {option}
          </label>
        ))}
        {errors.gender && <p role="alert">{errors.gender}</p>}
      </fieldset>

      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
        />
        {errors.phoneNumber && <p role="alert">{errors.phoneNumber}</p>}
      </div>

      <button className="button" type="submit">Create Account</button>
      </form>
      {message && <p role="status">{message}</p>}
      <p className="muted">Already have an account? <Link to="/login">Log in</Link></p>
    </section>
  );
}