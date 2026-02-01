import { ExternalNavbar } from "@/components/navbar";

export default function ExternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ExternalNavbar />
      {children}
    </div>
  );
}
