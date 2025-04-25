import { Poppins } from "next/font/google";
import ".././assets/globals.css";
import { AuthProvider } from "../context/authContext";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import Bottomnav from "@/components/Buttomnav";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['100', '300', '400', '700'],
  display: "swap",
});


export const metadata = {
  metadataBase: new URL('https://getnotice.vercel.app/'),
  title: {
    default: "Devs Realm | Showcase Your Developer Journey",
    template: "%s | Devs Realm",
    dashboard: "Dashboard | Devs Realm",
    about: "About Us | Devs Realm",
    explore: "Explore Projects | Devs Realm",
  },
  description: "A platform to help junior developers showcase projects, gain visibility, and get noticed by recruiters and the tech community.",
  keywords: [
    "Devs Realm",
    "junior developers",
    "developer portfolio",
    "tech showcase",
    "frontend projects",
    "developer visibility",
    "hire developers",
    "showcase dev work",
    "frontend developer kano",
    "software developers kano", 
    "kano developers events"
  ],
  authors: [{ name: "Devs Realm Team" }],
  openGraph: {
    title: "Devs Realm - Let the World See Your Code",
    description: "Showcase your developer journey and get noticed by hiring managers and the community.",
    url: "https://getnotice.vercel.app/",
    siteName: "GetNotice",
    images: [
      {
        url: "/images/2.png",
        width: 1200,
        height: 630,
        alt: "Screenshot of a Devs Realm developer profile",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devs Realm",
    description: "Share your dev projects and get hired. Join the GetNotice community.",
    images: ["/images/3.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
    }
  },
  icons: {
    icon: "/images/1.png",
    shortcut: "/images/1.png",
    apple: "/images/1.png",
    other: {
      rel: "apple-touch--precomposed",
      url: "/images/1.png",
    },
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://getnotice.vercel.app/",
    languages: {
      en: "https://getnotice.vercel.app/en",
    },
  },
  verification: {
    google: "GetNoticeVerificationCodeHere",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
       className={poppins.className}
      >
        <AuthProvider>
          <main>
        <Navbar />
        {children}
        <Footer />
         <Bottomnav />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
