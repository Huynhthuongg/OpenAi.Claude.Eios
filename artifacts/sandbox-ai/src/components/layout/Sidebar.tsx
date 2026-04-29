import { X } from "lucide-react";

export function Sidebar({ 
  mobileOpen, 
  onClose 
}: { 
  mobileOpen: boolean; 
  onClose: () => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 
        bg-background border-r border-border
        transition-transform duration-200
        lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <span className="font-bold text-lg">Sandbox.ai</span>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden p-1 rounded-md hover:bg-muted"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="flex-1 p-4">
            <div className="text-sm text-muted-foreground">
              Navigation coming soon...
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
