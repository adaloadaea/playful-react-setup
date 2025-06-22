
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Mail, 
  BarChart3, 
  Menu, 
  X,
  LogOut,
  Settings
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: 'Tableau de bord',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Commandes',
      href: '/admin/orders',
      icon: Package,
    },
    {
      name: 'Clients',
      href: '/admin/clients',
      icon: Users,
    },
    {
      name: 'Newsletter',
      href: '/admin/newsletter',
      icon: Mail,
    },
    {
      name: 'Visiteurs',
      href: '/admin/visitors',
      icon: BarChart3,
    },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Fixed width sidebar for consistency */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-all duration-300 ease-in-out border-r border-gray-200
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:flex lg:flex-col
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <img 
                src="/lovable-uploads/04272c72-7979-4c68-9c37-efc9954ca58f.png" 
                alt="LUCCI BY E.Y" 
                className="h-4 w-auto object-contain"
              />
            </div>
            <div className="text-white min-w-0">
              <div className="font-playfair text-lg font-bold truncate">LUCCI Admin</div>
              <div className="text-xs text-gray-300 font-light">Back Office</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-gray-700 rounded-lg flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                  ${isActivePath(item.href)
                    ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon className={`mr-3 h-4 w-4 flex-shrink-0 transition-colors ${
                  isActivePath(item.href) ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                }`} />
                <span className="font-medium truncate">{item.name}</span>
                {isActivePath(item.href) && (
                  <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 p-3 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-gray-100 rounded-lg py-2 px-3"
          >
            <Settings className="mr-3 h-4 w-4 flex-shrink-0" />
            <span className="font-medium truncate">Paramètres</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50 rounded-lg py-2 px-3"
          >
            <LogOut className="mr-3 h-4 w-4 flex-shrink-0" />
            <span className="font-medium truncate">Déconnexion</span>
          </Button>
        </div>
      </div>

      {/* Main content with consistent left margin */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/04272c72-7979-4c68-9c37-efc9954ca58f.png" 
                alt="LUCCI BY E.Y" 
                className="h-6 object-contain"
              />
              <span className="font-playfair font-bold text-gray-900">Admin</span>
            </div>
            <div className="w-8" />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
