import React, { useState, useMemo } from 'react';
import { Users, Activity, TrendingUp, AlertTriangle, CheckCircle, XCircle, Search, Calendar, Award, Building2, Clock, Target, BarChart3, GitBranch, FileText, Bug } from 'lucide-react';

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
          productionLive: 9
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
          productionLive: 6
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
          productionLive: 16
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
          productionLive: 3
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
          productionLive: 12
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
    success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    warning: 'bg-amber-50 border-amber-200 text-amber-700',
    error: 'bg-red-50 border-red-200 text-red-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700'
  };

  return (
    <div className={`p-2 rounded-lg border ${variantStyles[variant]} transition-all duration-200 hover:shadow-md hover:scale-105 min-w-0`}>
      <div className="flex items-center space-x-1">
        <div className="p-1 rounded bg-white/60 flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium uppercase tracking-wide opacity-75 truncate">{label}</div>
          <div className="text-sm font-bold truncate">{value}</div>
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
      case 'healthy': return 'border-emerald-200 hover:border-emerald-300';
      case 'warning': return 'border-amber-200 hover:border-amber-300';
      case 'critical': return 'border-red-200 hover:border-red-300';
      default: return 'border-slate-200 hover:border-slate-300';
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
    <div className={`bg-white rounded-xl shadow-sm border-2 ${getStatusBorder(board.health.status)} p-4 hover:shadow-lg transition-all duration-300 group`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{board.name}</h3>
          <div className="flex items-center space-x-1 mt-1">
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{board.project}</span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-500">{board.projectManager}</span>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${getStatusColor(board.health.status)} shadow-sm`}></div>
      </div>

      {/* Sprint Information */}
      <div className="mb-3 p-2 bg-slate-50 rounded-lg">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-slate-600">{board.sprint}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getUnderstandingColor(board.health.sprintUnderstanding)}`}>
            {board.health.sprintUnderstanding} Level
          </span>
        </div>
        <div className="text-xs text-slate-700 mb-1">{board.health.sprintGoal}</div>
        <div className="text-xs text-slate-500 flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          {board.health.sprintDates}
        </div>
      </div>
      
      {/* Sprint Metrics Grid */}
      <div className="grid grid-cols-5 gap-1 mb-3 text-center">
        <div className="p-1 bg-blue-50 rounded">
          <div className="text-xs font-bold text-blue-600">{board.health.backlogItems}</div>
          <div className="text-xs text-blue-700">BL</div>
        </div>
        <div className="p-1 bg-green-50 rounded">
          <div className="text-xs font-bold text-green-600">{board.health.doneRatio}</div>
          <div className="text-xs text-green-700">DR</div>
        </div>
        <div className="p-1 bg-purple-50 rounded">
          <div className="text-xs font-bold text-purple-600">{board.health.doneGoals}</div>
          <div className="text-xs text-purple-700">DG</div>
        </div>
        <div className="p-1 bg-orange-50 rounded">
          <div className="text-xs font-bold text-orange-600">{board.health.pendingDeployment}</div>
          <div className="text-xs text-orange-700">PD</div>
        </div>
        <div className="p-1 bg-emerald-50 rounded">
          <div className="text-xs font-bold text-emerald-600">{board.health.productionLive}</div>
          <div className="text-xs text-emerald-700">PL</div>
        </div>
      </div>

      {/* Quality Metrics */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
          <div className="text-sm font-bold text-emerald-600">{board.health.estimationAccuracy}%</div>
          <div className="text-xs font-medium text-emerald-700">E/S Accuracy</div>
        </div>
        <div className="p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <div className="text-sm font-bold text-indigo-600">{board.health.devCount}</div>
          <div className="text-xs font-medium text-indigo-700">Dev Count</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="flex items-center space-x-1">
          <TrendingUp className="w-3 h-3 text-slate-500" />
          <span className="text-xs font-medium text-slate-600">Velocity: {board.health.velocity}%</span>
        </div>
        <div className="flex items-center space-x-1">
          <Activity className="w-3 h-3 text-emerald-500" />
          <span className="text-xs font-medium text-emerald-600">Active</span>
        </div>
      </div>
    </div>
  );
};

const HorizontalHealthTiles: React.FC<{ boards: Board[] }> = ({ boards }) => {
  const aggregatedHealth = boards.reduce((acc, board) => ({
    velocity: Math.round((acc.velocity + board.health.velocity) / 2),
    blockers: acc.blockers + board.health.blockers,
    overdue: acc.overdue + board.health.overdue,
    completed: acc.completed + board.health.completed,
    documentation: acc.documentation + board.health.documentation,
    umlDiagrams: acc.umlDiagrams + board.health.umlDiagrams,
    defectRemovalRate: acc.defectRemovalRate + board.health.defectRemovalRate,
    estimationAccuracy: Math.round((acc.estimationAccuracy + board.health.estimationAccuracy) / 2),
    devCount: acc.devCount + board.health.devCount,
    totalSprints: acc.totalSprints + 1
  }), { 
    velocity: 0, 
    blockers: 0, 
    overdue: 0, 
    completed: 0, 
    documentation: 0, 
    umlDiagrams: 0, 
    defectRemovalRate: 0, 
    estimationAccuracy: 0, 
    devCount: 0, 
    totalSprints: 0 
  });

  return (
    <div className="space-y-2">
      <div className="mb-2">
        <h4 className="text-sm font-semibold text-slate-900 mb-1">Team Health Overview</h4>
        <p className="text-xs text-slate-500">Aggregated metrics across all boards</p>
      </div>
      
      {/* First Row */}
      <div className="grid grid-cols-2 gap-2">
        <HealthTile
          label="Avg Velocity"
          value={`${aggregatedHealth.velocity}%`}
          icon={<TrendingUp className="w-3 h-3" />}
          variant={aggregatedHealth.velocity >= 80 ? 'success' : aggregatedHealth.velocity >= 60 ? 'warning' : 'error'}
        />
        <HealthTile
          label="Completed"
          value={aggregatedHealth.completed}
          icon={<CheckCircle className="w-3 h-3" />}
          variant="success"
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-2 gap-2">
        <HealthTile
          label="Blockers"
          value={aggregatedHealth.blockers}
          icon={<AlertTriangle className="w-3 h-3" />}
          variant={aggregatedHealth.blockers === 0 ? 'success' : aggregatedHealth.blockers <= 5 ? 'warning' : 'error'}
        />
        <HealthTile
          label="Overdue"
          value={aggregatedHealth.overdue}
          icon={<XCircle className="w-3 h-3" />}
          variant={aggregatedHealth.overdue === 0 ? 'success' : aggregatedHealth.overdue <= 3 ? 'warning' : 'error'}
        />
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-2 gap-2">
        <HealthTile
          label="Documentation"
          value={aggregatedHealth.documentation}
          icon={<FileText className="w-3 h-3" />}
          variant="info"
        />
        <HealthTile
          label="UML Diagrams"
          value={aggregatedHealth.umlDiagrams}
          icon={<BarChart3 className="w-3 h-3" />}
          variant="info"
        />
      </div>

      {/* Fourth Row */}
      <div className="grid grid-cols-2 gap-2">
        <HealthTile
          label="Defect Rate"
          value={aggregatedHealth.defectRemovalRate}
          icon={<Bug className="w-3 h-3" />}
          variant={aggregatedHealth.defectRemovalRate <= 2 ? 'success' : aggregatedHealth.defectRemovalRate <= 5 ? 'warning' : 'error'}
        />
        <HealthTile
          label="E/S Accuracy"
          value={`${aggregatedHealth.estimationAccuracy}%`}
          icon={<Target className="w-3 h-3" />}
          variant={aggregatedHealth.estimationAccuracy >= 85 ? 'success' : aggregatedHealth.estimationAccuracy >= 70 ? 'warning' : 'error'}
        />
      </div>

      {/* Fifth Row */}
      <div className="grid grid-cols-2 gap-2">
        <HealthTile
          label="Total Devs"
          value={aggregatedHealth.devCount}
          icon={<Users className="w-3 h-3" />}
          variant="info"
        />
        <HealthTile
          label="Active Sprints"
          value={aggregatedHealth.totalSprints}
          icon={<GitBranch className="w-3 h-3" />}
          variant="info"
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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-lg transition-all duration-300 hover:border-blue-300 group">
      <div className="flex items-start space-x-3 mb-4">
        <div className="relative">
          <img 
            src={em.avatar} 
            alt={em.name}
            className="w-12 h-12 rounded-xl object-cover border-2 border-blue-100 group-hover:border-blue-200 transition-colors"
          />
          <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold ${getRatingColor(em.understandingLevel)}`}>
            {em.understandingLevel}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{em.name}</h3>
          <p className="text-xs font-medium text-slate-600">{em.title}</p>
          <div className="flex items-center space-x-1 mt-1">
            <Building2 className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-500">{em.department}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-2">
          <div className="bg-slate-50 rounded-lg p-2">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-slate-500" />
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Experience</span>
            </div>
            <div className="text-sm font-semibold text-slate-900">{em.experience}</div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-2">
            <div className="flex items-center space-x-1">
              <Award className="w-3 h-3 text-slate-500" />
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Understanding Level</span>
            </div>
            <div className="text-sm font-semibold text-slate-900">Level {em.understandingLevel}</div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-2">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Target Date to A</span>
            </div>
            <div className="text-xs font-semibold text-slate-900">{formatDate(em.understandingTargetDate)}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3 text-slate-500" />
            <span className="text-xs font-medium text-slate-600">{em.teamsCount} Teams</span>
          </div>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold border border-blue-200">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Engineering Dashboard</h1>
              <p className="text-slate-600 mt-2">Board of Boards Overview • Real-time Engineering Metrics</p>
            </div>
            
            {/* Search Box */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search engineering managers, teams, or boards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-80 pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredData.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-400 text-lg">No results found for "{searchTerm}"</div>
            <p className="text-slate-500 mt-2">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredData.map((em) => (
              <div key={em.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-all duration-300">
                <div className="grid grid-cols-12 gap-4">
                  {/* Engineering Manager Card */}
                  <div className="col-span-12 lg:col-span-2">
                    <EMCard em={em} />
                  </div>

                  {/* Boards Section */}
                  <div className="col-span-12 lg:col-span-7">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      {em.boards.map((board) => (
                        <BoardCard key={board.id} board={board} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Health Overview - Horizontal tiles on the right */}
                  <div className="col-span-12 lg:col-span-3">
                    <HorizontalHealthTiles boards={em.boards} />
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