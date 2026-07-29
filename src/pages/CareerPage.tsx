import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import BackButton from "../components/BackButton";
import CareerHeader from '../components/career/CareerHeader';
// import JobFilters, {
//   Department,
//   WorkType,
//   ExperienceLevel,
// } from "../components/career/JobFilters";
import JobCard from '../components/career/JobCard';
import ApplyModal from '../components/career/ApplyModal';
// import EmptyState from "../components/career/EmptyState";
// import { JobPosting } from "../components/career/types";
import { MOCK_JOBS } from '../components/career/data';
import type {
  Department,
  ExperienceLevel,
  WorkType,
} from '../components/career/JobFilters';
import type { JobPosting } from '../components/career/types';
import BackButton from '../components/props/BackButton';
import JobFilters from '../components/career/JobFilters';
import EmptyState from '../components/career/EmptyState';

export default function CareerPage() {
  const [filters, setFilters] = useState<{
    dept: Department;
    workType: WorkType;
    experience: ExperienceLevel;
  }>({
    dept: 'All',
    workType: 'All',
    experience: 'All',
  });
  const [applyingFor, setApplyingFor] = useState<JobPosting | null>(null);

  const filteredJobs = useMemo(() => {
    let jobs = MOCK_JOBS;

    if (filters.dept !== 'All') {
      jobs = jobs.filter((job) => job.department === filters.dept);
    }
    if (filters.workType !== 'All') {
      jobs = jobs.filter((job) => job.workType === filters.workType);
    }
    if (filters.experience !== 'All') {
      jobs = jobs.filter((job) => job.experienceLevel === filters.experience);
    }

    return jobs;
  }, [filters]);

  const hasActiveFilters =
    filters.dept !== 'All' ||
    filters.workType !== 'All' ||
    filters.experience !== 'All';

  return (
    <div
      className="bg-matcha-grad"
      style={{
        minHeight: '100vh',
        color: 'var(--cr-dark)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '960px',
          margin: '0 auto',
          padding: '100px 24px 60px',
        }}
      >
        <BackButton label="Back" useHistory />

        <CareerHeader />

        <JobFilters jobs={MOCK_JOBS} onFilterChange={setFilters} />

        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '24px',
          }}
        >
          {filteredJobs.length} open position
          {filteredJobs.length !== 1 ? 's' : ''}
          {filters.dept !== 'All' ? ` in ${filters.dept}` : ''}
          {filters.workType !== 'All' ? ` • ${filters.workType}` : ''}
          {filters.experience !== 'All' ? ` • ${filters.experience}` : ''}
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            animation:
              'slideUpSmooth 0.6s cubic-bezier(0.16,1,0.3,1) both 160ms',
          }}
        >
          {filteredJobs.map((job, index) => (
            <JobCard
              key={job.id}
              job={job}
              index={index}
              onApply={setApplyingFor}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <EmptyState hasFilters={hasActiveFilters} />
        )}
      </div>

      <Footer />

      {applyingFor && (
        <ApplyModal job={applyingFor} onClose={() => setApplyingFor(null)} />
      )}
    </div>
  );
}

// const {
//       fullName,
//       email,
//       jobTitle = "General Application",
//       phone = "Not provided",
//       portfolio = "Not provided",
//       linkedin = "Not provided",
//       message = "No cover letter provided."
//     } = payload;
