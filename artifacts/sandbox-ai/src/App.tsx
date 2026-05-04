import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AppLayout } from './components/layout/AppLayout';

function App() {
  return (
    <>
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-4xl font-bold mb-4">Welcome to Sandbox.ai</h1>
          <p className="text-muted-foreground">The AI Command Center</p>
        </div>
      </AppLayout>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
