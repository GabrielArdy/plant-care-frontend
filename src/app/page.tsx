import Image from "next/image";
import Link from "next/link";
import { TbPlant2, TbLogin, TbUserPlus, TbScan, TbLeaf, TbClipboardCheck } from "react-icons/tb";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Header/Navigation */}
      <header className="w-full px-4 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center">
          <TbPlant2 size={32} className="text-[var(--secondary)]" />
          <span className="text-xl font-bold ml-2">PlantCare</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#about" className="text-gray-600 hover:text-[var(--secondary)]">
            About
          </Link>
          <Link href="#features" className="text-gray-600 hover:text-[var(--secondary)]">
            Features
          </Link>
          <Link href="#contact" className="text-gray-600 hover:text-[var(--secondary)]">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Link href="/auth/login" className="flex items-center text-[var(--foreground)] hover:text-[var(--secondary)]">
            <TbLogin className="mr-1" />
            <span className="hidden sm:inline">Login</span>
          </Link>
          <Link href="/auth/register">
            <Button variant="primary" className="flex items-center">
              <TbUserPlus className="mr-1" />
              <span className="hidden sm:inline">Register</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 md:py-20 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Plant Disease Detection Made <span className="text-[var(--secondary)]">Simple</span>
          </h1>
          <p className="text-lg mb-6 text-gray-600">
            Snap a photo of your plant and our AI will identify diseases instantly.
            Protect your garden with quick, accurate diagnostics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth/register">
              <Button className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <Image 
            src="/next.svg" 
            alt="Plant care illustration" 
            width={400} 
            height={400}
            className="max-w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our plant disease detection app makes it easy to keep your plants healthy with just a few simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="bg-[var(--secondary)]/10 p-4 rounded-full mb-4">
                <TbScan size={36} className="text-[var(--secondary)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scan Plant</h3>
              <p className="text-gray-600">
                Take a clear photo of the affected area of your plant using our mobile-optimized interface.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="bg-[var(--secondary)]/10 p-4 rounded-full mb-4">
                <TbLeaf size={36} className="text-[var(--secondary)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Diagnosis</h3>
              <p className="text-gray-600">
                Our advanced ML model analyzes the image and identifies the disease with high accuracy.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="bg-[var(--secondary)]/10 p-4 rounded-full mb-4">
                <TbClipboardCheck size={36} className="text-[var(--secondary)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Treatment Plan</h3>
              <p className="text-gray-600">
                Receive detailed information about the disease and recommended treatments to save your plant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[var(--secondary)]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to protect your plants?</h2>
          <p className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
            Join thousands of plant lovers who use our app to keep their plants healthy and thriving.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth/register">
              <Button className="w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <TbPlant2 size={24} className="text-[var(--secondary)]" />
              <span className="text-lg font-bold ml-2">PlantCare</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <Link href="#features" className="text-gray-600 hover:text-[var(--secondary)]">
                Features
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-[var(--secondary)]">
                About
              </Link>
              <Link href="/auth/login" className="text-gray-600 hover:text-[var(--secondary)]">
                Login
              </Link>
              <Link href="/auth/admin/login" className="text-gray-600 hover:text-[var(--secondary)]">
                Admin
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} PlantCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
