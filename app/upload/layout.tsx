import { UploadNavbar } from "@/components/navbar";

export default function ExternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <UploadNavbar />
      {children}
    </div>
  );
}
