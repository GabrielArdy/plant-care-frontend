'use client';

import React from 'react';
import { TbLeaf, TbPlant2, TbScan, TbHistory, TbChartBar } from 'react-icons/tb';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function DashboardPage() {
  return (
    <div className="flex flex-col px-4 pb-6">
      {/* Welcome Section */}
      <section className="py-6">
        <h1 className="text-2xl font-bold">Welcome, User!</h1>
        <p className="text-gray-600 mt-1">Let's keep your plants healthy</p>
      </section>
      
      {/* Quick Actions */}
      <section className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Link href="/dashboard/scan" className="w-full">
            <div className="bg-green/10 rounded-xl p-5 flex flex-col items-center justify-center text-center h-32">
              <TbScan size={32} className="text-green mb-2" />
              <h3 className="font-medium">Scan Plant</h3>
              <p className="text-xs text-gray-500">Detect diseases</p>
            </div>
          </Link>
          
          <Link href="/dashboard/history" className="w-full">
            <div className="bg-blue-50 rounded-xl p-5 flex flex-col items-center justify-center text-center h-32">
              <TbHistory size={32} className="text-blue-500 mb-2" />
              <h3 className="font-medium">History</h3>
              <p className="text-xs text-gray-500">View past scans</p>
            </div>
          </Link>
        </div>
      </section>
      
      {/* Recent Scans */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Scans</h2>
          <Link href="/dashboard/history" className="text-green text-sm">View all</Link>
        </div>
        
        {/* If no recent scans */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              <TbLeaf size={32} className="text-gray-400" />
            </div>
            <h3 className="font-medium mb-1">No recent scans</h3>
            <p className="text-gray-500 text-sm text-center mb-4">
              Scan your first plant to get started
            </p>
            <Link href="/dashboard/scan">
              <Button variant="primary" className="flex items-center">
                <TbScan className="mr-2" />
                Scan Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
      
      {/* Tips & Articles */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Plant Care Tips</h2>
        
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="flex">
              <div className="w-24 h-24 bg-gray-100 flex-shrink-0 relative">
                <Image
                  src="/next.svg"
                  alt="Plant watering"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="py-3">
                <h3 className="font-medium mb-1">Watering Best Practices</h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  Learn how to properly water your plants for optimal growth and health.
                </p>
              </CardContent>
            </div>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="flex">
              <div className="w-24 h-24 bg-gray-100 flex-shrink-0 relative">
                <Image
                  src="/next.svg"
                  alt="Disease prevention"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="py-3">
                <h3 className="font-medium mb-1">Prevent Common Diseases</h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  Simple steps to prevent common plant diseases before they start.
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
