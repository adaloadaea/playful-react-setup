
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  Eye, 
  Users, 
  Globe, 
  Smartphone,
  Monitor,
  TrendingUp,
  Clock,
  MapPin
} from 'lucide-react';
import axios from 'axios';

interface VisitorStats {
  visitorsToday: number;
  pageviewsToday: number;
  avgTimeOnSite: string;
  bounceRate: number;
  dailyVisitors: Array<{
    date: string;
    visitors: number;
    pageviews: number;
    bounceRate: number;
  }>;
  topPages: Array<{
    page: string;
    visitors: number;
    percentage: number;
  }>;
  trafficSources: Array<{
    source: string;
    visitors: number;
    color: string;
  }>;
  countries: Array<{
    country: string;
    visitors: number;
    flag: string;
  }>;
  deviceData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const AdminVisitors = () => {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitorStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://www.draminesaid.com/luccy/api/get_visitor_stats.php');
        
        if (response.data.success) {
          setStats(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch visitor statistics');
        }
      } catch (err) {
        console.error('Error fetching visitor stats:', err);
        setError('Failed to fetch visitor statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorStats();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchVisitorStats, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Erreur lors du chargement'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-playfair font-bold text-gray-900">
                Statistiques des Visiteurs
              </h1>
              <p className="text-gray-600 mt-1">
                Analyse du trafic et comportement des visiteurs
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Mise à jour en temps réel</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleString('fr-FR')}
                </p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">
                Visiteurs Aujourd'hui
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{stats.visitorsToday.toLocaleString('fr-FR')}</div>
              <p className="text-xs text-blue-600">
                visiteurs uniques
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-900">
                Pages Vues
              </CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{stats.pageviewsToday.toLocaleString('fr-FR')}</div>
              <p className="text-xs text-green-600">
                pages vues aujourd'hui
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-900">
                Temps Moyen
              </CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{stats.avgTimeOnSite}</div>
              <p className="text-xs text-purple-600">
                temps moyen sur site
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">
                Taux de Rebond
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">{stats.bounceRate}%</div>
              <p className="text-xs text-orange-600">
                taux de rebond
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Traffic Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="font-playfair text-gray-900">
              Évolution du Trafic (7 derniers jours)
            </CardTitle>
            <CardDescription>
              Visiteurs et pages vues par jour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={stats.dailyVisitors}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1f2937" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1f2937" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6b7280" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6b7280" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#1f2937" 
                  fillOpacity={1} 
                  fill="url(#colorVisitors)"
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="pageviews" 
                  stroke="#6b7280" 
                  fillOpacity={1} 
                  fill="url(#colorPageviews)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device & Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Device Breakdown */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="font-playfair text-gray-900">
                Appareils Utilisés
              </CardTitle>
              <CardDescription>
                Répartition par type d'appareil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-6 mt-4">
                {stats.deviceData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{entry.name}</span>
                    <span className="text-sm font-medium">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="font-playfair text-gray-900">
                Sources de Trafic
              </CardTitle>
              <CardDescription>
                D'où viennent vos visiteurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: source.color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">
                        {source.source}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">
                        {source.visitors.toLocaleString('fr-FR')}
                      </div>
                      <div className="text-xs text-gray-500">visiteurs</div>
                    </div>
                  </div>
                ))}
                {stats.trafficSources.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Aucune donnée de source de trafic disponible</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Pages & Countries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="font-playfair text-gray-900">
                Pages les Plus Visitées
              </CardTitle>
              <CardDescription>
                Contenu le plus populaire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {page.page}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">
                        {page.visitors.toLocaleString('fr-FR')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {page.percentage}% du trafic
                      </div>
                    </div>
                  </div>
                ))}
                {stats.topPages.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Aucune donnée de page disponible</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Top Countries */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="font-playfair text-gray-900 flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Pays des Visiteurs
              </CardTitle>
              <CardDescription>
                Répartition géographique
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.countries.map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{country.flag}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {country.country}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">
                        {country.visitors.toLocaleString('fr-FR')}
                      </div>
                      <div className="text-xs text-gray-500">visiteurs</div>
                    </div>
                  </div>
                ))}
                {stats.countries.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Aucune donnée de pays disponible</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminVisitors;
