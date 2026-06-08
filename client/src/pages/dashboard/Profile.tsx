import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Card } from '../../components/common/Card';
import { motion } from 'framer-motion';
import { 
  UserCircle, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Award, 
  Code, 
  Target,
  FileCheck,
  Briefcase,
  Github,
  Linkedin
} from 'lucide-react';
import { Button } from '../../components/common/Button';

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

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <motion.div 
      className="space-y-8 max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Profile Section */}
      <motion.div variants={itemVariants}>
        <Card className="relative overflow-hidden p-0 border border-white/5">
          {/* Cover Photo */}
          <div className="h-48 w-full bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMEw4IDhaTTAgOEw4IDBaIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+Cjwvc3ZnPg==')] opacity-30"></div>
          </div>
          
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 relative z-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
                <div className="w-32 h-32 rounded-full border-4 border-[#0f172a] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-xl shadow-blue-500/20">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <div className="mb-2">
                  <h1 className="text-3xl font-bold font-['Outfit'] text-white">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p className="text-slate-400 font-medium mt-1 flex items-center justify-center sm:justify-start gap-2">
                    <GraduationCap className="w-4 h-4" /> B.Tech Computer Science (3rd Year)
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 mb-2">
                <Button variant="outline" size="sm" className="bg-white/5 hover:bg-white/10" leftIcon={<Github className="w-4 h-4" />}>
                  GitHub
                </Button>
                <Button variant="outline" size="sm" className="bg-white/5 hover:bg-white/10" leftIcon={<Linkedin className="w-4 h-4" />}>
                  LinkedIn
                </Button>
                <Button variant="primary" size="sm">
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Contact & About */}
        <motion.div variants={containerVariants} className="space-y-8">
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5">
              <h3 className="text-lg font-bold font-['Outfit'] text-white mb-4">About Me</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Passionate software engineering student with a strong foundation in full-stack development and cloud architecture. Looking for internship opportunities in fast-paced product environments.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>Bangalore, India</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Briefcase className="w-4 h-4 text-slate-500" />
                  <span className="capitalize">{user?.role} Role</span>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5 bg-gradient-to-br from-blue-500/10 to-purple-500/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-500/30 mb-4 shadow-lg shadow-blue-500/20">
                  <FileCheck className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold font-['Outfit'] text-white">AI Resume Score</h3>
                <div className="flex items-baseline gap-1 mt-2 mb-4">
                  <span className="text-5xl font-black font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">85</span>
                  <span className="text-slate-400 font-medium">/100</span>
                </div>
                <p className="text-sm text-slate-400 mb-6">Top 12% among peers for SDE roles.</p>
                <Button variant="primary" className="w-full">Improve Resume</Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Right Column: Skills, Projects, Goals */}
        <motion.div variants={containerVariants} className="lg:col-span-2 space-y-8">
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold font-['Outfit'] text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  Top Skills
                </h3>
                <Button variant="ghost" size="sm">Manage Skills</Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'React.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL', 'Tailwind CSS'].map((skill, idx) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-slate-300 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400 cursor-pointer transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5">
              <h3 className="text-lg font-bold font-['Outfit'] text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Career Goals
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/5">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-500/20">
                    <Briefcase className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Target Roles</h4>
                    <p className="text-sm text-slate-400 mt-1">Backend Engineer, Full Stack Developer</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/20">
                    <MapPin className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Preferred Locations</h4>
                    <p className="text-sm text-slate-400 mt-1">Bangalore, Remote, Hyderabad</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold font-['Outfit'] text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Certifications
                </h3>
                <Button variant="ghost" size="sm">Add New</Button>
              </div>
              
              <div className="space-y-4">
                <div className="group p-4 rounded-xl border border-white/5 bg-white/5 hover:border-white/10 transition-colors flex justify-between items-center cursor-pointer">
                  <div>
                    <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors">AWS Certified Developer – Associate</h4>
                    <p className="text-sm text-slate-400 mt-1">Amazon Web Services • Issued Jan 2024</p>
                  </div>
                  <Button variant="outline" size="sm">View Credential</Button>
                </div>
                <div className="group p-4 rounded-xl border border-white/5 bg-white/5 hover:border-white/10 transition-colors flex justify-between items-center cursor-pointer">
                  <div>
                    <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors">Advanced React Patterns</h4>
                    <p className="text-sm text-slate-400 mt-1">Frontend Masters • Issued Nov 2023</p>
                  </div>
                  <Button variant="outline" size="sm">View Credential</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
