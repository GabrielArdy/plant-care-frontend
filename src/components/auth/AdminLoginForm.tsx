import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { TbLock, TbMail, TbShieldCheck } from 'react-icons/tb';
import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Reset errors
    setErrors({});
    
    // Basic validation
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    
    // Here you would normally call your API endpoint for administrator authentication
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, let's pretend authentication was successful
      console.log('Admin login successful!');
      
      // Redirect to admin dashboard
      window.location.href = '/admin/dashboard';
    } catch (error) {
      console.error('Admin login failed:', error);
      setErrors({ password: 'Invalid credentials or insufficient permissions' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader 
          title="Admin Access" 
          subtitle="Sign in to access the administrator dashboard"
        />
        
        <CardContent className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--secondary)]/20 text-[var(--secondary)]">
            <TbShieldCheck size={32} />
          </div>
        </CardContent>
        
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <TbMail className="text-gray-500" size={20} />
              <Input
                id="email"
                type="email"
                label="Admin Email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={errors.email}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <TbLock className="text-gray-500" size={20} />
              <Input
                id="password"
                type="password"
                label="Admin Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={errors.password}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Access Admin Panel'}
            </Button>
            
            <div className="text-center text-sm">
              <Link href="/auth/login" className="text-[var(--secondary)] hover:underline">Return to user login</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
