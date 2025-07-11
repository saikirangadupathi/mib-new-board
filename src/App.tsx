import React, { useState, useMemo } from 'react';
import { Users, Activity, TrendingUp, AlertTriangle, CheckCircle, XCircle, Search, Calendar, Award, Building2, Clock, Target, BarChart3, GitBranch, FileText, Bug, Zap, Shield, Timer, Gauge } from 'lucide-react';

interface BoardHealth {
  velocity: number;
  blockers: number;
  overdue: number;
  completed: number;
  status: 'healthy' | 'warning' | 'critical';
  // Additional metrics from the screenshots
  sprintGoal: string;
  sprintUnderstanding: 'A' | 'B' | 'C';
  estimationAccuracy: number; // E/S percentage
  documentation: number; // Doc count
  umlDiagrams: number; // UML count
  defectRemovalRate: number; // DRR
  defectRemovalSprint: number; // DRS
  defectRemovalFuture: number; // DRF
  devCount: number;
  // Sprint metrics
  sprintDates: string;
  backlogItems: number; // BL
  doneRatio: number; // DR
  doneGoals: number; // DG
  pendingDeployment: number; // PD
  productionLive: number; // PL
  // Weekly metrics (W1, W2, W3, W4)
  w1: number;
  w2: number;
  w3: number;
  w4: number;
}

interface Board {
  id: string;
  name: string;
  project: string;
  sprint: string;
  projectManager: string;
  totalIssues: number;
  inProgress: number;
  health: BoardHealth;
}

interface EngineeringManager {
  id: string;
  name: string;
  title: string;
  avatar: string;
  experience: string;
  understandingLevel: 'A' | 'B' | 'C';
  understandingTargetDate: string;
  department: string;
  teamsCount: number;
  boards: Board[];
}

const mockData: EngineeringManager[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Senior Engineering Manager',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    experience: '8+ years',
    understandingLevel: 'A',
    understandingTargetDate: '2024-06-15',
    department: 'Platform Engineering',
    teamsCount: 3,
    boards: [
      {
        id: 'board-1',
        name: 'Platform Core',
        project: 'PLAT',
        sprint: 'Sprint 23',
        projectManager: 'John Smith',
        totalIssues: 45,
        inProgress: 12,
        health: {
          velocity: 85,
          blockers: 2,
          overdue: 1,
          completed: 32,
          status: 'healthy',
          sprintGoal: 'Implement new authentication system',
          sprintUnderstanding: 'A',
          estimationAccuracy: 92.5,
          documentation: 8,
          umlDiagrams: 3,
          defectRemovalRate: 2,
          defectRemovalSprint: 1,
          defectRemovalFuture: 0,
          devCount: 8,
          sprintDates: 'Jul 7th - Jul 21st',
          backlogItems: 15,
          doneRatio: 8,
          doneGoals: 12,
          pendingDeployment: 3,
          productionLive: 9,
          w1: 12,
          w2: 18,
          w3: 15,
          w4: 22
        }
      },
      {
        id: 'board-2',
        name: 'API Gateway',
        project: 'API',
        sprint: 'Sprint 15',
        projectManager: 'Lisa Chen',
        totalIssues: 28,
        inProgress: 8,
        health: {
          velocity: 72,
          blockers: 4,
          overdue: 3,
          completed: 17,
          status: 'warning',
          sprintGoal: 'Optimize API response times',
          sprintUnderstanding: 'B',
          estimationAccuracy: 78.3,
          documentation: 5,
          umlDiagrams: 2,
          defectRemovalRate: 3,
          defectRemovalSprint: 2,
          defectRemovalFuture: 1,
          devCount: 6,
          sprintDates: 'Jul 1st - Jul 15th',
          backlogItems: 12,
          doneRatio: 6,
          doneGoals: 8,
          pendingDeployment: 2,
          productionLive: 6,
          w1: 8,
          w2: 14,
          w3: 11,
          w4: 16
        }
      }
    ]
  },
  {
    id: '2',
    name: 'Marcus Chen',
    title: 'Engineering Manager',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    experience: '6+ years',
    understandingLevel: 'B',
    understandingTargetDate: '2024-09-30',
    department: 'Mobile Development',
    teamsCount: 2,
    boards: [
      {
        id: 'board-3',
        name: 'Mobile App',
        project: 'MOB',
        sprint: 'Sprint 31',
        projectManager: 'David Kim',
        totalIssues: 62,
        inProgress: 18,
        health: {
          velocity: 90,
          blockers: 1,
          overdue: 0,
          completed: 43,
          status: 'healthy',
          sprintGoal: 'Launch new user onboarding flow',
          sprintUnderstanding: 'A',
          estimationAccuracy: 95.2,
          documentation: 12,
          umlDiagrams: 5,
          defectRemovalRate: 1,
          defectRemovalSprint: 0,
          defectRemovalFuture: 1,
          devCount: 10,
          sprintDates: 'Jul 5th - Jul 19th',
          backlogItems: 20,
          doneRatio: 15,
          doneGoals: 18,
          pendingDeployment: 2,
          productionLive: 16,
          w1: 20,
          w2: 25,
          w3: 28,
          w4: 32
        }
      },
      {
        id: 'board-4',
        name: 'User Experience',
        project: 'UX',
        sprint: 'Sprint 12',
        projectManager: 'Emma Wilson',
        totalIssues: 35,
        inProgress: 15,
        health: {
          velocity: 45,
          blockers: 8,
          overdue: 7,
          completed: 13,
          status: 'critical',
          sprintGoal: 'No Goals Defined',
          sprintUnderstanding: 'C',
          estimationAccuracy: 45.8,
          documentation: 2,
          umlDiagrams: 0,
          defectRemovalRate: 6,
          defectRemovalSprint: 4,
          defectRemovalFuture: 2,
          devCount: 5,
          sprintDates: 'Jun 28th - Jul 12th',
          backlogItems: 8,
          doneRatio: 3,
          doneGoals: 5,
          pendingDeployment: 7,
          productionLive: 3,
          w1: 5,
          w2: 8,
          w3: 6,
          w4: 9
        }
      }
    ]
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Principal Engineering Manager',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    experience: '12+ years',
    understandingLevel: 'A',
    understandingTargetDate: '2024-03-20',
    department: 'Data & Analytics',
    teamsCount: 4,
    boards: [
      {
        id: 'board-5',
        name: 'Data Pipeline',
        project: 'DATA',
        sprint: 'Sprint 8',
        projectManager: 'Michael Brown',
        totalIssues: 52,
        inProgress: 11,
        health: {
          velocity: 78,
          blockers: 3,
          overdue: 2,
          completed: 36,
          status: 'healthy',
          sprintGoal: 'Implement real-time data processing',
          sprintUnderstanding: 'B',
          estimationAccuracy: 88.7,
          documentation: 10,
          umlDiagrams: 4,
          defectRemovalRate: 2,
          defectRemovalSprint: 1,
          defectRemovalFuture: 1,
          devCount: 12,
          sprintDates: 'Jul 3rd - Jul 17th',
          backlogItems: 18,
          doneRatio: 12,
          doneGoals: 15,
          pendingDeployment: 3,
          productionLive: 12,
          w1: 15,
          w2: 19,
          w3: 17,
          w4: 24
        }
      }
    ]
  }
];

const HealthTile: React.FC<{ label: string; value: number | string; icon: React.ReactNode; variant: 'success' | 'warning' | 'error' | 'info' }> = ({
  label,
  value,
  icon,
  variant
}) => {
  const variantStyles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100',
    warning: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100',
    error: 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100',
    info: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
  };

  return (
    <div className={`p-3 rounded-lg border ${variantStyles[variant]} transition-all duration-200 hover:shadow-md hover:scale-105`}>
      <div className="flex items-center space-x-2">
        <div className="p-1.5 rounded-md bg-white/70 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium uppercase tracking-wide opacity-75">{label}</div>
          <div className="text-lg font-bold">{value}</div>
        </div>
      </div>
    </div>
  );
};

const BoardCard: React.FC<{ board: Board }> = ({ board }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-emerald-500';
      case 'warning': return 'bg-amber-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const getStatusBorder = (status: string) => {
    switch (status) {
      case 'healthy': return 'border-emerald-200 hover:border-emerald-300 shadow-emerald-100';
      case 'warning': return 'border-amber-200 hover:border-amber-300 shadow-amber-100';
      case 'critical': return 'border-red-200 hover:border-red-300 shadow-red-100';
      default: return 'border-slate-200 hover:border-slate-300 shadow-slate-100';
    }
  };

  const getUnderstandingColor = (level: string) => {
    switch (level) {
      case 'A': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Header Section */}
      <div className={`p-6 border-b border-slate-100 ${getStatusBorder(board.health.status)}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{board.name}</h3>
              <div className={`w-4 h-4 rounded-full ${getStatusColor(board.health.status)} shadow-sm`}></div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">{board.project}</span>
              <span className="text-sm text-slate-500">•</span>
              <span className="text-sm text-slate-600">{board.projectManager}</span>
            </div>
          </div>
        </div>

        {/* Sprint Information */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">{board.sprint}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getUnderstandingColor(board.health.sprintUnderstanding)}`}>
              Level {board.health.sprintUnderstanding}
            </span>
          </div>
          <div className="text-sm text-slate-800 font-medium mb-2">{board.health.sprintGoal}</div>
          <div className="text-sm text-slate-600 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {board.health.sprintDates}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Side - Sprint Metrics */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Sprint Metrics</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-blue-700">{board.health.backlogItems}</div>
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">BL</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-700">{board.health.doneRatio}</div>
                  <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">DR</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-purple-700">{board.health.doneGoals}</div>
                  <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide">DG</div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-orange-700">{board.health.pendingDeployment}</div>
                  <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide">PD</div>
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-emerald-700">{board.health.productionLive}</div>
                <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">PL</div>
              </div>
            </div>
          </div>

          {/* Right Side - Weekly Metrics */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Weekly Progress</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-indigo-700">{board.health.w1}</div>
                  <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">W1</div>
                </div>
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-cyan-700">{board.health.w2}</div>
                  <div className="text-xs font-semibold text-cyan-600 uppercase tracking-wide">W2</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-teal-700">{board.health.w3}</div>
                  <div className="text-xs font-semibold text-teal-600 uppercase tracking-wide">W3</div>
                </div>
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-rose-700">{board.health.w4}</div>
                  <div className="text-xs font-semibold text-rose-600 uppercase tracking-wide">W4</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Metrics */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-700">{board.health.estimationAccuracy}%</div>
              <div className="text-sm font-semibold text-emerald-600">E/S Accuracy</div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-indigo-200">
              <div className="text-2xl font-bold text-indigo-700">{board.health.devCount}</div>
              <div className="text-sm font-semibold text-indigo-600">Dev Count</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">Velocity: {board.health.velocity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-semibold text-emerald-600">Active Sprint</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const BoardHealthTiles: React.FC<{ board: Board }> = ({ board }) => {
  return (
    <div className="space-y-3">
      <div className="mb-4">
        <h4 className="text-lg font-bold text-slate-900 mb-1">{board.name} Health</h4>
        <p className="text-sm text-slate-600">Real-time board metrics</p>
      </div>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 gap-3">
        <HealthTile
          label="Velocity"
          value={`${board.health.velocity}%`}
          icon={<TrendingUp className="w-4 h-4" />}
          variant={board.health.velocity >= 80 ? 'success' : board.health.velocity >= 60 ? 'warning' : 'error'}
        />
        
        <HealthTile
          label="Completed"
          value={board.health.completed}
          icon={<CheckCircle className="w-4 h-4" />}
          variant="success"
        />
        
        <HealthTile
          label="Blockers"
          value={board.health.blockers}
          icon={<AlertTriangle className="w-4 h-4" />}
          variant={board.health.blockers === 0 ? 'success' : board.health.blockers <= 3 ? 'warning' : 'error'}
        />
        
        <HealthTile
          label="Overdue"
          value={board.health.overdue}
          icon={<XCircle className="w-4 h-4" />}
          variant={board.health.overdue === 0 ? 'success' : board.health.overdue <= 2 ? 'warning' : 'error'}
        />
        
        <HealthTile
          label="Documentation"
          value={board.health.documentation}
          icon={<FileText className="w-4 h-4" />}
          variant="info"
        />
        
        <HealthTile
          label="UML Diagrams"
          value={board.health.umlDiagrams}
          icon={<BarChart3 className="w-4 h-4" />}
          variant="info"
        />
        
        <HealthTile
          label="Defect Rate"
          value={board.health.defectRemovalRate}
          icon={<Bug className="w-4 h-4" />}
          variant={board.health.defectRemovalRate <= 2 ? 'success' : board.health.defectRemovalRate <= 4 ? 'warning' : 'error'}
        />
        
        <HealthTile
          label="E/S Accuracy"
          value={`${board.health.estimationAccuracy}%`}
          icon={<Target className="w-4 h-4" />}
          variant={board.health.estimationAccuracy >= 85 ? 'success' : board.health.estimationAccuracy >= 70 ? 'warning' : 'error'}
        />
      </div>
    </div>
  );
};

const EMCard: React.FC<{ em: EngineeringManager }> = ({ em }) => {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'A': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-300 group">
      <div className="flex items-start space-x-4 mb-6">
        <div className="relative">
          <img 
            src={em.avatar} 
            alt={em.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-100 group-hover:border-blue-200 transition-colors shadow-md"
          />
          <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-sm font-bold ${getRatingColor(em.understandingLevel)} shadow-lg`}>
            {em.understandingLevel}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{em.name}</h3>
          <p className="text-sm font-semibold text-slate-600 mb-2">{em.title}</p>
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-600">{em.department}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Experience</span>
            </div>
            <div className="text-lg font-bold text-slate-900">{em.experience}</div>
          </div>
          
          <div className="bg-gradient-to-r from-slate-50 to-purple-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Understanding Level</span>
            </div>
            <div className="text-lg font-bold text-slate-900">Level {em.understandingLevel}</div>
          </div>
          
          <div className="bg-gradient-to-r from-slate-50 to-amber-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Target Date to A</span>
            </div>
            <div className="text-sm font-bold text-slate-900">{formatDate(em.understandingTargetDate)}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">{em.teamsCount} Teams</span>
          </div>
          <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-bold border border-blue-200">
            {em.boards.length} Boards
          </span>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) return mockData;
    
    return mockData.filter(em => 
      em.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      em.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      em.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      em.boards.some(board => 
        board.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        board.project.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Engineering Dashboard</h1>
              <p className="text-slate-600 text-lg">Board of Boards Overview • Real-time Engineering Metrics</p>
            </div>
            
            {/* Search Box */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search engineering managers, teams, or boards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-96 pl-12 pr-4 py-4 border border-slate-300 rounded-2xl leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-slate-400 text-xl">No results found for "{searchTerm}"</div>
            <p className="text-slate-500 mt-2">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredData.map((em) => (
              <div key={em.id} className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 hover:shadow-2xl transition-all duration-300">
                <div className="grid grid-cols-12 gap-8">
                  {/* Engineering Manager Card */}
                  <div className="col-span-12 lg:col-span-3">
                    <EMCard em={em} />
                  </div>

                  {/* Boards Section - Now Vertical */}
                  <div className="col-span-12 lg:col-span-6">
                    <div className="space-y-6">
                      {em.boards.map((board) => (
                        <BoardCard key={board.id} board={board} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Individual Board Health Tiles */}
                  <div className="col-span-12 lg:col-span-3">
                    <div className="space-y-8">
                      {em.boards.map((board) => (
                        <BoardHealthTiles key={board.id} board={board} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;