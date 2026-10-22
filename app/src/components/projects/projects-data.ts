export interface Project {
  id: number;
  title: string;
  description: string;
  role: string;
  keyFeatures: string[];
  tech: string[];
  image: string;
  video?: string; 
  liveUrl: string;
  githubUrl?: string;
  teamSize?: number;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-stack MERN store with comprehensive product browsing and management system.",
    role: "Frontend Developer",
    keyFeatures: [
      "Product Details Page with Image Gallery",
      "Recently Viewed Products",
      "Related Products Recommendations",
      "Responsive Design"
    ],
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: "/photos/ecom.png", 
    video: "/videos/ecom.mp4",
    liveUrl: "https://ecom-store-pk.vercel.app/",
    teamSize: 6,
  },
  {
    id: 2,
    title: "Cakes Villa",
    description:
      "Complete cake ordering platform with dual-interface design for customers and administrators.",
    role: "Full-Stack Developer",
    keyFeatures: [
      "Customer Browsing & Ordering",
      "Product Details Management",
      "Admin Order Dashboard",
      "Database Management System"
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    image: "/photos/cake.png",
    video: "/videos/cakesvillas.mp4",
    liveUrl: "https://cakevillaa.vercel.app/",
    githubUrl: "https://github.com/Hammad-000/cake",
  },
  {
    id: 3,
    title: "Expense Tracker",
    description:
      "Personal finance management app with real-time data synchronization and category-based insights.",
    role: "Full-Stack Developer",
    keyFeatures: [
      "Secure Authentication System",
      "Cloud Database (Firebase)",
      "Category-Based Tracking",
      "Real-Time Data Sync"
    ],
    tech: ["React", "Firebase", "Tailwind"],
    image: "/photos/expencenew.webp",
    video: "/videos/expensetr.mp4",
    liveUrl: "https://expence-psi.vercel.app/login",
    githubUrl: "https://github.com/Hammad-000/expence",
  },
];