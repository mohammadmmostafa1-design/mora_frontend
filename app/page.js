'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/public/jobs`)
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Open Positions</h1>
      <div className="grid gap-4">
        {jobs.map(job => (
          <div key={job.id} className="border p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-600">{job.title}</h2>
            <p className="text-gray-600 mb-4">{job.department} • {job.location}</p>
          </div>
        ))}
      </div>
    </main>
  );
}