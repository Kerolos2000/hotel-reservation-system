export function HydrateFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen-header gap-3">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-gray-500 text-sm">Loading...</p>
    </div>
  );
}
