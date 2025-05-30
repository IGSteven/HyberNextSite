import React from "react";

// Discord Icon - SVG from Discord's branding
export const Discord = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 127.14 96.36"
    fill="currentColor"
    className={className}
  >
    <path
      d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
    />
  </svg>
);

// Microsoft Teams Icon - Larger sized
export const MsTeams = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 2228.833 2073.333"
    fill="currentColor"
    className={className}
  >
    <path d="M1554.637,777.5h575.713c54.391,0,98.483,44.092,98.483,98.483c0,0,0,0,0,0v524.398
      c0,199.901-162.051,361.952-361.952,361.952h0h-1.711c-199.901,0.028-361.975-162-362.004-361.901c0-0.017,0-0.034,0-0.052V828.971
      C1503.167,800.544,1526.211,777.5,1554.637,777.5L1554.637,777.5z"/>
    <circle cx="1943.75" cy="440.583" r="233.25"/>
    <path d="M1119.265,777.5h-1.3c-33.672,0-60.977,27.305-60.977,60.977c0,0,0,0,0,0v950.848
      c0,71.17-57.821,128.991-128.991,128.991l0,0H776.563c-71.17,0-128.991-57.821-128.991-128.991l0,0V580.682
      c-0.157-56.91,46.042-103.208,102.952-103.365c0.126-0.001,0.252-0.001,0.378-0.001h562.743
      c56.91-0.157,103.208,46.042,103.365,102.952c0.001,0.126,0.001,0.252,0.001,0.378V932.26
      C1417.012,842.752,1275.804,777.814,1119.265,777.5z"/>
    <circle cx="776.563" cy="283.218" r="233.25"/>
    <path d="M1493.37,1057.329L1493.37,1057.329c-120.864,0.024-218.854,98.045-218.83,218.909
      c0.024,120.864,98.045,218.854,218.909,218.83c120.84-0.024,218.806-98.014,218.83-218.854l0,0V1057.329H1493.37z"/>
  </svg>
);

// Custom Webhook Icon
export const WebhookIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 16.98h-5.99c-1.66 0-3.01-1.34-3.01-3s1.34-3 3.01-3H18" />
    <path d="M6 7.02h6c1.66 0 3 1.35 3 3.01s-1.34 3-3 3.01H6" />
    <path d="M12 22v-2" />
    <path d="M12 13v-2" />
    <path d="M12 4V2" />
    <path d="M7 5l1 1" />
    <path d="M16 5l-1 1" />
    <path d="M16 19l-1-1" />
    <path d="M7 19l1-1" />
  </svg>
);