import { Loader2 } from "lucide-react";

export function HydrateFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen-header">
      <Loader2 className="h-16 w-16 text-neutral-600 animate-spin" />
      <p className="text-md font-medium text-muted-foreground">Loading...</p>
    </div>
  );
}
