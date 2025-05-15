'use client';

import React from 'react';
import { TbHistory, TbLeaf, TbPlant2, TbArrowRight, TbCalendar } from 'react-icons/tb';
import { Card, CardContent } from '@/components/ui/Card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// Sample history data (in a real app, this would come from an API)
const mockHistory = [
  // Empty for now
];

export default function HistoryPage() {
  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-2">Scan History</h1>
      <p className="text-gray-600 mb-6">View your previous plant scans and diagnoses</p>
      
      {mockHistory.length > 0 ? (
        <div className="space-y-4">
          {mockHistory.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="flex">
                <div className="w-24 h-24 bg-gray-100 flex-shrink-0 relative">
                  <Image
                    src="/vercel.svg"
                    alt="Plant scan"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="py-3 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-medium">Plant Name</h3>
                    <p className="text-gray-500 text-sm">Disease Name</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400 flex items-center">
                      <TbCalendar size={14} className="mr-1" />
                      April 15, 2025
                    </span>
                    <Link href={`/dashboard/history/details/1`}>
                      <Button variant="outline" size="sm" className="text-xs py-1 px-2">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-gray-100 rounded-full p-6 mb-4">
            <TbHistory size={48} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No scan history yet</h2>
          <p className="text-gray-500 text-center max-w-xs mb-6">
            When you scan plants, your history will appear here
          </p>
          
          <Link href="/dashboard/scan">
            <Button className="flex items-center">
              Scan Your First Plant
              <TbArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
