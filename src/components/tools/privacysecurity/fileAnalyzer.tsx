import { ShieldCheck, Zap, Lock } from 'lucide-react';
import { FileCheckupApp } from '@/components/tools/privacysecurity/fileCheckupApp';

export default function HomePage() {
  return (
    <main className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-foreground">
      <div className="mb-6 text-center sm:mb-8">
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[11px] text-muted-foreground">
          <Badge icon={Lock}>Nothing uploaded</Badge>
          <Badge icon={ShieldCheck}>Privacy &amp; security scan</Badge>
          <Badge icon={Zap}>Instant results</Badge>
        </div>
      </div>

      <FileCheckupApp />
    </main>
  );
}

function Badge({ icon: Icon, children }: { icon: typeof Lock; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5">
      <Icon className="h-3 w-3" aria-hidden="true" />
      {children}
    </span>
  );
}
