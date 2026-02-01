import { DashboardNavbar } from "@/components/navbar";

export default function ExternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-dashboard-bg">
      <DashboardNavbar />
      {children}
    </div>
  );
}
