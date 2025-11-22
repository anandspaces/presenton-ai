"use client";
import React, { useEffect } from "react";

import UploadPage from "./components/UploadPage";
import Header from "@/app/(presentation-generator)/dashboard/components/Header";
import { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { setUserIdCookie } from "@/app/hooks/useUserId";

// export const metadata: Metadata = {
//   title: "Presenton | Open Source AI presentation generator",
//   description:
//     "Open-source AI presentation generator with custom layouts, multi-model support (OpenAI, Gemini, Ollama), and PDF/PPTX export. A free Gamma alternative.",
//   alternates: {
//     canonical: "https://presenton.ai/create",
//   },
//   keywords: [
//     "presentation generator",
//     "AI presentations",
//     "data visualization",
//     "automatic presentation maker",
//     "professional slides",
//     "data-driven presentations",
//     "document to presentation",
//     "presentation automation",
//     "smart presentation tool",
//     "business presentations",
//   ],
//   openGraph: {
//     title: "Create Data Presentation | PresentOn",
//     description:
//       "Open-source AI presentation generator with custom layouts, multi-model support (OpenAI, Gemini, Ollama), and PDF/PPTX export. A free Gamma alternative.",
//     type: "website",
//     url: "https://presenton.ai/create",
//     siteName: "PresentOn",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Create Data Presentation | PresentOn",
//     description:
//       "Open-source AI presentation generator with custom layouts, multi-model support (OpenAI, Gemini, Ollama), and PDF/PPTX export. A free Gamma alternative.",
//     site: "@presenton_ai",
//     creator: "@presenton_ai",
//   },
// };

const page = () => {
  const searchParams = useSearchParams();
  
  const promptParam = searchParams.get("prompt") || "";
  const userIdParam = searchParams.get("userId") || searchParams.get("user_id") || "";

  // === STORE userId as soon as we have it ===
  useEffect(() => {
    if (userIdParam) {
       console.log("Setting user ID from URL param:", userIdParam);
       setUserIdCookie(userIdParam);
    }
  }, [userIdParam]);
  // Check if required parameters are missing
  const missingParams = [];
  if (!promptParam) missingParams.push("prompt");
  if (!userIdParam) missingParams.push("userId");

  const hasInvalidParams = missingParams.length > 0;
  if (hasInvalidParams) {
    return (
      <div className="relative">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-8">
          <div className="max-w-md w-full bg-red-50 border-2 border-red-200 rounded-lg p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold font-instrument_sans text-red-900 mb-2">
              Invalid Parameters
            </h1>
            <p className="text-red-700 mb-4">
              Required URL parameters are missing. Please provide the following:
            </p>
            {/* <ul className="text-left text-red-800 mb-4 space-y-2">
              {missingParams.map((param) => (
                <li key={param} className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  <code className="bg-red-100 px-2 py-1 rounded text-sm">{param}</code>
                </li>
              ))}
            </ul> */}
            <div className="bg-red-100 p-4 rounded text-left text-sm">
              <p className="font-semibold text-red-900 mb-2">Example URL:</p>
              <code className="text-red-800 break-all">
                /upload?prompt=Your%20presentation%20topic&userId=user_123
              </code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Header />
      <div className="flex flex-col items-center justify-center py-8">
        {/* <h1 className="text-3xl font-semibold font-instrument_sans">
          Create Presentation{" "}
        </h1> */}
        {/* <p className='text-sm text-gray-500'>We will generate a presentation for you</p> */}
      </div>

      <UploadPage 
        initialPrompt={decodeURIComponent(promptParam)}
        userId={userIdParam}
      />
    </div>
  );
};

export default page;
