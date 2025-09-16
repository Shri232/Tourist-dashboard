import React, { useEffect } from 'react';

/**
 * A utility component to help debug navigation issues
 */
const NavigationDebugger = () => {
  useEffect(() => {
    console.log("==== Navigation Debugger Initialized ====");
    console.log("Current URL:", window.location.href);
    console.log("Available routes:", getAvailableRoutes());
    
    // Add click listener to document to debug route structure
    document.addEventListener('click', (e) => {
      if (e.target.closest('#mapNavigationButton')) {
        setTimeout(() => {
          console.log("Navigation attempt completed");
          console.log("New URL:", window.location.href);
        }, 500);
      }
    });
    
    return () => {
      document.removeEventListener('click', () => {});
    };
  }, []);
  
  // Try to detect routes in the app
  const getAvailableRoutes = () => {
    try {
      // Look for React Router
      const routes = [];
      
      // Check for link elements that might indicate routes
      document.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#') && !routes.includes(href)) {
          routes.push(href);
        }
      });
      
      return routes;
    } catch (err) {
      return ["Unable to detect routes"];
    }
  };

  return null; // This component doesn't render anything
};

export default NavigationDebugger;
