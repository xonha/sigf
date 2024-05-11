import RecoilWrapper from "@/app/components/RecoilWrapper";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";

export const metadata = {
  title: "SIGF",
  description: "Sistema de Gerenciamento do Forró de Segunda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <RecoilWrapper>
        <body
          className="min-h-screen bg-background flex flex-col items-center"
          id="__modal"
        >
          {children}
        </body>
      </RecoilWrapper>
    </html>
  );
}
