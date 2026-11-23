import { useState } from "react";

export default function SignupForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email:"",
    password:"",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

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

    if (!formData.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
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
    // const validationErrors = validate();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
    onSubmit?.(formData);

    const response = await fetch('http://localhost:5000/signup',{

        method:"POST",
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(formData)
        })
    //write an api call, for sending the formdata to server

  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Sign Up</h2>

      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Jane"
        />
        {errors.firstName && <p role="alert">{errors.firstName}</p>}
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Doe"
        />
        {errors.lastName && <p role="alert">{errors.lastName}</p>}
      </div>

    <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
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

      <button type="submit">Create Account</button>
    </form>
  );
}
