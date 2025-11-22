import React, { useState, useEffect } from 'react';
import { Sparkles, FileText, Presentation, CheckCircle2 } from 'lucide-react';

const LoadingState = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: FileText, label: 'Analyzing content', color: 'text-blue-500' },
    { icon: Sparkles, label: 'Generating slides', color: 'text-purple-500' },
    { icon: Presentation, label: 'Applying design', color: 'text-indigo-500' },
    { icon: CheckCircle2, label: 'Finalizing', color: 'text-green-500' }
  ];

//   const tips = [
//     "AI is crafting engaging slide layouts tailored to your content",
//     "Smart algorithms are organizing your information for maximum impact",
//     "Creating visual hierarchy to guide your audience's attention",
//     "Optimizing content distribution across slides for better flow"
//   ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 80);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
          {/* Header */}
          {/* <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <Presentation className="w-8 h-8 text-purple-600 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Creating Your Presentation
            </h2>
            <p className="text-gray-500 text-sm">
              Please wait while we work our magic
            </p>
          </div> */}

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-600">Progress</span>
              <span className="text-sm font-semibold text-purple-600">{progress}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep || progress === 100;
              
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-purple-50 scale-105 shadow-md' 
                      : isCompleted
                      ? 'bg-green-50'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className={`relative ${isActive ? 'animate-bounce' : ''}`}>
                    <Icon 
                      className={`w-8 h-8 mb-2 transition-colors duration-300 ${
                        isActive 
                          ? step.color
                          : isCompleted
                          ? 'text-green-500'
                          : 'text-gray-400'
                      }`}
                    />
                    {/* {isCompleted && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )} */}
                  </div>
                  <span className={`text-xs text-center font-medium transition-colors duration-300 ${
                    isActive 
                      ? 'text-gray-800'
                      : isCompleted
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Tip Box */}
          {/* <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
            <div className="flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">Did you know?</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {tips[currentStep]}
                </p>
              </div>
            </div>
          </div> */}

          {/* Loading Dots */}
          <div className="flex justify-center items-center space-x-2 mt-6">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
        </div>

        {/* Subtle message below */}
        <p className="text-center text-gray-400 text-xs mt-4">
          This may take a few moments depending on the complexity of your content
        </p>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingState;