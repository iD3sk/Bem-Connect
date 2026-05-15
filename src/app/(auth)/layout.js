export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Orbs */}
      <div className="glow-orb-blue top-[-20%] left-[-20%] opacity-30" />
      <div className="glow-orb-red bottom-[-20%] right-[-20%] opacity-20" />
      
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
