"use client";

import React, { useState, useEffect } from "react";

import Wrapper from "@/components/Wrapper";
import { DashboardApi } from "@/app/(presentation-generator)/services/api/dashboard";
import { PresentationGrid } from "@/app/(presentation-generator)/dashboard/components/PresentationGrid";


import Header from "@/app/(presentation-generator)/dashboard/components/Header";
import { getUserIdCookie } from "@/app/hooks/useUserId";

const DashboardPage: React.FC = () => {
  const [presentations, setPresentations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const userId = getUserIdCookie()

  useEffect(() => {
    // If no userId after loading, show error state
    if (!userId) {
      console.error("No userId found in cookies");
      setError("Session not found. Please return to the upload page.");
      setIsLoading(false);
      return;
    }

    const fetchPresentations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("Fetching presentations for user:", userId);
        
        const data = await DashboardApi.getPresentations(userId);
        data.sort(
          (a: any, b: any) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        setPresentations(data);
      } catch (err) {
        console.error("Error fetching presentations:", err);
        setError("Failed to load presentations. Please try again.");
        setPresentations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPresentations();
  }, [userId]);

  const removePresentation = (presentationId: string) => {
    setPresentations((prev: any) =>
      prev ? prev.filter((p: any) => p.id !== presentationId) : []
    );
  };

  // Show error state if no userId found
  if (!userId) {
    return (
      <div className="min-h-screen bg-[#E9E8F8]">
        <Header />
        <Wrapper>
          <main className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center max-w-md">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold mb-2">Session Not Found</h2>
                <p className="text-gray-600 mb-4">
                  No active session detected. Please create a presentation first.
                </p>
                <a 
                  href="/upload" 
                  className="inline-block px-6 py-3 bg-purple-800 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Go to Upload Page
                </a>
              </div>
            </div>
          </main>
        </Wrapper>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9E8F8]">
      <Header />
      <Wrapper>
        <main className="container mx-auto px-4 py-8">
          <section>
            <h2 className="text-2xl font-roboto font-medium mb-6">
              Slide Presentation
            </h2>
            <PresentationGrid
              presentations={presentations}
              type="slide"
              isLoading={isLoading}
              error={error}
              onPresentationDeleted={removePresentation}
            />
          </section>
        </main>
      </Wrapper>
    </div>
  );
};

export default DashboardPage;
