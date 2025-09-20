import React, { useState } from 'react';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Valid email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerUser = async (data) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate success/failure
        const success = Math.random() > 0.3; // 70% success rate for demo
        resolve({
          success,
          message: success ? 'Registration successful!' : 'Registration failed. Please try again.'
        });
      }, 2000);
    });
  };

  const navigate = (path) => {
    // Simulate navigation
    console.log(`Navigating to: ${path}`);
    alert(`Would navigate to: ${path}`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setError(null);
    setLoading(true);
    
    try {
      const res = await registerUser(formData);
      if (res.success) {
        navigate('/login');
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #1a1f29 0%, #2d3748 50%, #1a1f29 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md p-6 rounded-2xl border border-gray-700/50 shadow-2xl"
        style={{
          background: 'rgba(45, 55, 72, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
      >
        {/* Branding Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2" style={{
            background: 'linear-gradient(135deg, #48cc6c 0%, #2dd4bf 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Sign Up
          </h2>
          <p className="text-gray-300 text-base">Create your free account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/60 text-red-200 px-4 py-2 rounded-lg text-xs text-center font-medium mb-6 border border-red-500/30">
            {error}
          </div>
        )}

        {/* Input Fields */}
        <div className="space-y-4 mb-6">
          <div>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-base rounded-xl border border-gray-600/50 text-gray-200 placeholder-gray-400 outline-none transition-all duration-300 focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20"
              style={{
                background: 'rgba(45, 55, 72, 0.3)',
                backdropFilter: 'blur(5px)'
              }}
              placeholder="Enter your name"
              autoComplete="name"
            />
            {errors.name && <span className="text-xs text-red-400 mt-1 block">{errors.name}</span>}
          </div>
          
          <div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-base rounded-xl border border-gray-600/50 text-gray-200 placeholder-gray-400 outline-none transition-all duration-300 focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20"
              style={{
                background: 'rgba(45, 55, 72, 0.3)',
                backdropFilter: 'blur(5px)'
              }}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {errors.email && <span className="text-xs text-red-400 mt-1 block">{errors.email}</span>}
          </div>
          
          <div>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-base rounded-xl border border-gray-600/50 text-gray-200 placeholder-gray-400 outline-none transition-all duration-300 focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20"
              style={{
                background: 'rgba(45, 55, 72, 0.3)',
                backdropFilter: 'blur(5px)'
              }}
              placeholder="Create a password"
              autoComplete="new-password"
            />
            {errors.password && (
              <span className="text-xs text-red-400 mt-1 block">{errors.password}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400/50 mb-4"
          style={{
            background: 'linear-gradient(135deg, #48cc6c 0%, #2dd4bf 100%)',
            boxShadow: '0 8px 32px rgba(72, 204, 108, 0.3)'
          }}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          ) : 'Sign Up'}
        </button>

        {/* Footer */}
        <div className="text-center">
          <span className="text-gray-300 text-base">Already have an account? </span>
          <a 
            href="/login" 
            className="font-semibold text-base transition-colors duration-300 hover:underline"
            style={{
              background: 'linear-gradient(135deg, #48cc6c 0%, #2dd4bf 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Sign in
          </a>
        </div>
      </form>
    </div>
  );
}