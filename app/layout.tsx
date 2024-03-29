import RecoilWrapper from "@/app/components/RecoilWrapper";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RecoilWrapper>
          <main
            className="min-h-screen bg-background flex flex-col items-center"
            id="__modal"
          >
            {children}
          </main>
        </RecoilWrapper>
      </body>
    </html>
  );
}
