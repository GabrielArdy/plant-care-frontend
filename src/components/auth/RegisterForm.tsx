'use client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardFooter, CardHeader, CardLink } from '@/components/ui/Card';
import { TbLock, TbMail, TbUser } from 'react-icons/tb';
import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ 
    name?: string;
    email?: string; 
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Reset errors
    setErrors({});
    
    // Basic validation
    const newErrors: { 
      name?: string;
      email?: string; 
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    
    // Here you would normally call your API endpoint for registration
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, let's pretend registration was successful
      console.log('Registration successful!');
      
      // Redirect to login (or perhaps dashboard directly)
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ email: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader 
          title="Create an Account" 
          subtitle="Sign up to use Plant Disease Detection"
        />
        
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <TbUser className="text-gray-500" size={20} />
              <Input
                id="name"
                type="text"
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                error={errors.name}
              />
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <TbMail className="text-gray-500" size={20} />
              <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={errors.email}
              />
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <TbLock className="text-gray-500" size={20} />
              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={errors.password}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <TbLock className="text-gray-500" size={20} />
              <Input
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                error={errors.confirmPassword}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
            
            <div className="text-center text-sm">
              Already have an account? <Link href="/auth/login" className="text-[var(--secondary)] hover:underline">Sign in</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
