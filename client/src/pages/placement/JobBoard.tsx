import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Target, 
  Filter, 
  Sparkles,
  Building2,
  Clock,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';

import { useGetJobsQuery, useApplyForJobMutation } from '../../store/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const JobBoard = () => {
  const { data: response, isLoading } = useGetJobsQuery({});
  const [applyForJob, { isLoading: isApplying }] = useApplyForJobMutation();
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  
  // Filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const jobs = response?.data || [];

  const handleApply = async (jobId: string) => {
    setApplyingId(jobId);
    try {
      await applyForJob(jobId).unwrap();
      alert('Application submitted successfully!');
    } catch (error: any) {
      alert(error?.data?.message || 'Failed to apply. Please try again.');
    } finally {
      setApplyingId(null);
    }
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const toggleFilter = (setFn: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setFn(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const filteredJobs = jobs.filter((job: any) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Simulate type/location filtering (since mock data might not perfectly match types)
    const matchesType = selectedTypes.length === 0 || selectedTypes.some(t => job.type.toLowerCase().includes(t.toLowerCase()));
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.some(l => job.location.toLowerCase().includes(l.toLowerCase()));
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <motion.div 
      className="space-y-6 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold font-['Outfit'] text-white tracking-tight flex items-center gap-2">
            Job <span className="text-gradient">Board</span>
          </h1>
          <p className="text-slate-400 mt-2 text-lg">AI-curated opportunities perfectly matched to your skills.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-xl leading-5 bg-[#0f172a]/50 backdrop-blur-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-white/5 focus:border-blue-500/50 transition-colors sm:text-sm"
              placeholder="Search roles, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 shrink-0">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </div>
      </motion.div>

      <div className="flex gap-6">
        {/* Left Sidebar Filters (Hidden on Mobile) */}
        <motion.div variants={itemVariants} className="w-64 hidden lg:block shrink-0">
          <Card className="sticky top-24 border border-white/5 bg-white/[0.02] p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-400" /> AI Match Criteria
            </h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-slate-400 mb-3">Role Type</p>
                <div className="space-y-2">
                  {['Full-time', 'Internship', 'Contract'].map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleFilter(setSelectedTypes, type)}>
                      <div className={`w-4 h-4 rounded border ${selectedTypes.includes(type) ? 'border-blue-500 bg-blue-500/20' : 'border-white/20 bg-white/5'} flex items-center justify-center group-hover:border-blue-500/50 transition-colors`}>
                        {selectedTypes.includes(type) && <div className="w-2 h-2 rounded-sm bg-blue-500" />}
                      </div>
                      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-slate-400 mb-3">Location</p>
                <div className="space-y-2">
                  {['Remote', 'Bangalore', 'Hyderabad', 'Pune'].map(loc => (
                    <label key={loc} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleFilter(setSelectedLocations, loc)}>
                      <div className={`w-4 h-4 rounded border ${selectedLocations.includes(loc) ? 'border-blue-500 bg-blue-500/20' : 'border-white/20 bg-white/5'} flex items-center justify-center group-hover:border-blue-500/50 transition-colors`}>
                        {selectedLocations.includes(loc) && <div className="w-2 h-2 rounded-sm bg-blue-500" />}
                      </div>
                      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <Button className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20">
                  Apply Filters
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Job Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
              {[1, 2, 3, 4].map(i => (
                <Card key={i} className="h-64 bg-slate-800/30 border-white/5"><div /></Card>
              ))}
            </div>
          ) : (
            <motion.div variants={containerVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredJobs.length === 0 ? (
                <div className="col-span-1 xl:col-span-2 text-center py-12 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-slate-400">No jobs match your filters.</p>
                  <Button variant="ghost" className="mt-4" onClick={() => { setSearchQuery(''); setSelectedTypes([]); setSelectedLocations([]); }}>Clear Filters</Button>
                </div>
              ) : filteredJobs.map((job: any, index: number) => (
                <motion.div
                  key={job._id || job.id}
                  variants={itemVariants}
                >
                  <Card hoverable className="h-full flex flex-col border border-white/5 bg-gradient-to-b from-white/[0.05] to-transparent group cursor-pointer">
                    <div className="flex justify-between items-start mb-5">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#0f172a] border border-white/10 flex items-center justify-center shrink-0">
                          <Building2 className="w-6 h-6 text-slate-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">{job.title}</h3>
                          <p className="text-slate-400 font-medium text-sm mt-0.5">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                          job.match >= 90 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          job.match >= 80 ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          <Sparkles className="w-3 h-3" />
                          {job.match}% Match
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 uppercase font-semibold tracking-wider">AI Score</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-slate-300 space-y-3 flex-1">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-500" /> {job.location}</span>
                        <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-slate-500" /> {job.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-emerald-500" /> 
                        <span className="text-emerald-400 font-medium">₹{job.stipend} / month</span>
                      </div>

                      <div className="flex gap-2 mt-4 flex-wrap pt-2">
                        {job.tags.map((tag: string) => (
                          <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/5 border border-white/10 text-slate-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex gap-3">
                      <Button 
                        variant="primary" 
                        className="flex-1 shadow-lg shadow-blue-500/20"
                        onClick={() => handleApply(job._id || job.id)}
                        isLoading={applyingId === (job._id || job.id)}
                      >
                        Apply Now
                      </Button>
                      <Button 
                        variant="outline" 
                        className={`px-4 border-white/10 hover:bg-white/10 ${savedJobs.includes(job._id || job.id) ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-white/5'}`}
                        onClick={() => toggleSaveJob(job._id || job.id)}
                      >
                        {savedJobs.includes(job._id || job.id) ? <BookmarkCheck className="w-4 h-4" /> : 'Save'}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JobBoard;
