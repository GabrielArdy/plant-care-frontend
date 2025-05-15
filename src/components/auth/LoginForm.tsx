import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardFooter, CardHeader, CardLink } from '@/components/ui/Card';
import { TbLock, TbMail } from 'react-icons/tb';
import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginForm() {
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
    
    // Here you would normally call your API endpoint for authentication
    // For now, we'll just simulate a login
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, let's pretend authentication was successful
      console.log('Login successful!');
      
      // Redirect to dashboard (will be implemented later)
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ email: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader 
          title="Welcome Back" 
          subtitle="Sign in to continue to Plant Disease Detection"
        />
        
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              <TbMail className="text-gray-500" size={20} />
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="your@email.com"
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
                label="Password"
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
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
            
            <div className="text-center text-sm">
              Don't have an account? <Link href="/auth/register" className="text-[var(--secondary)] hover:underline">Register</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
