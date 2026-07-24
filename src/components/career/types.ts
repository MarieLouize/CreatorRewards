export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  workType: "Remote" | "On-site" | "Hybrid";
  experienceLevel: "Junior" | "Intermediate" | "Senior" | "Intern";
  description: string;
  requirements: string[];
}

export interface ApplicationForm {
  fullName: string;
  email: string;
  portfolio: string;
  message: string;
}
