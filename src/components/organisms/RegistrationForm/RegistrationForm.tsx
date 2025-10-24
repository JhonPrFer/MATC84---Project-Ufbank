"use client"

import React, { useState } from 'react';
import FormField from '../../molecules/FormField/FormField';
import Button from '../../atoms/Button/Button';
import { UserData } from '../../../types/user';

const initialFormState: UserData = {
  name: '',
  email: '',
  cpf: '',
  cellphoneNumber: '',
  birthday: '',
  password: '',
};

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<UserData>(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'cpf') {
      formattedValue = value.replace(/\D/g, '').slice(0, 11);
    }
    
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // --- MOCKED DATA SUBMISSION LOGIC ---
    console.log('Submitting Data:', formData);

    // Simulate an API call
    setTimeout(() => {
      console.log('✅ Registration successful (Mocked)');
      alert(`User registered: ${JSON.stringify(formData, null, 2)}`);
      setFormData(initialFormState);
      setLoading(false);
    }, 1500);
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Create Account</h2>
      
      <FormField
        label="Full Name" id="name" name="name" type="text"
        value={formData.name} onChange={handleChange} required
      />
      <FormField
        label="Email Address" id="email" name="email" type="email"
        value={formData.email} onChange={handleChange} required
      />
      <FormField
        label="CPF (ID)" id="cpf" name="cpf" type="text"
        value={formData.cpf} onChange={handleChange} placeholder="e.g., 12345678900" required
      />
      <FormField
        label="Cellphone Number" id="cellphoneNumber" name="cellphoneNumber" type="tel"
        value={formData.cellphoneNumber} onChange={handleChange} required
      />
      <FormField
        label="Birthday" id="birthday" name="birthday" type="date"
        value={formData.birthday} onChange={handleChange} required
      />
      <FormField
        label="Password" id="password" name="password" type="password"
        value={formData.password} onChange={handleChange} required
      />
      
      <div>
        <Button type="submit" onClick={() => {}} disabled={!isFormValid || loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;