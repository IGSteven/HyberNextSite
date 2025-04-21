# HyberNextSite

Welcome to the HyberNextSite project! This repository contains the source code for HyberHost's official website built with Next.js.

![HyberHost Logo](public/double-h-monogram.png)

## About HyberHost

HyberHost is a web hosting and infrastructure company with datacenters in multiple locations including Coventry, London (UK), and Kitchener (Canada). We provide reliable hosting services with a commitment to uptime, security, and customer satisfaction.

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/HyberNextSite.git
    ```
2. Navigate to the project directory:
    ```bash
    cd HyberNextSite
    ```
3. Install dependencies:
    ```bash
    npm install
    # or
    pnpm install
    ```
4. Run the development server:
    ```bash
    npm run dev
    # or
    pnpm dev
    ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with React 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom components
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Database**: Flexible storage with File System or [MongoDB](https://www.mongodb.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns

## Key Features

- **Modern Architecture**: Server-side rendering (SSR) and static site generation (SSG)
- **Responsive Design**: Mobile-first layout that works on all device sizes
- **Dark/Light Mode**: Theme support with next-themes
- **Multi-datacenter Presentation**: Detailed pages for each datacenter location
- **Network Information**: Peering policies and global network infrastructure details

## Site Features

- **Content Management**
  - Full Blog System with categories and authors
  - Comprehensive Knowledge Base with search functionality
  - Admin interfaces for content management

- **Customer Features**
  - User authentication and dashboard
  - Service status monitoring
  - Support ticket system

- **Technical Infrastructure**
  - Optional storage drivers (File System OR MongoDB)
  - Integration with WHMCS for billing and provisioning
  - Responsive API endpoints

- **Legal and Compliance**
  - Complete set of legal documents
  - GDPR compliance features
  - Service level agreements

## Project Structure

```
app/               # Next.js app directory with route structure
  ├── page.tsx     # Homepage
  ├── about/       # About page
  ├── datacenters/ # Datacenter information pages
  ├── kb/          # Knowledge base
  ├── status/      # Service status
  ├── blog/        # Blog system
  └── api/         # API endpoints
components/        # Reusable UI components
lib/               # Utility functions and type definitions
public/            # Static assets
```

## Development

```bash
# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## License

This project is licensed under the MIT License

---
Built with ❤️ by the HyberHost team.