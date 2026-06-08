import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { setCredentials } from '../../store/authSlice';
import { useRegisterMutation } from '../../store/api';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await register(formData).unwrap();
      
      if (response.success) {
        navigate('/login', { state: { message: 'Registration successful! Please login.' } });
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err?.data?.message || 'Network error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-600/20 blur-[120px] animate-float"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md z-10"
      >
        <Card className="p-8 border border-white/10 shadow-2xl backdrop-blur-xl bg-surface/50">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gradient mb-2">Create Account</h1>
            <p className="text-slate-400 text-sm">Join the intelligent campus ecosystem</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex gap-4">
              <Input
                label="First Name"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="john@university.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-[var(--color-background)] border border-slate-700 rounded-lg py-2 pl-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full py-2.5 mt-2 font-semibold"
              isLoading={isLoading}
            >
              Sign Up
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Sign In
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
