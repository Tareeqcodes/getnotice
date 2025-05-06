import { Poppins } from "next/font/google";
import ".././assets/globals.css";
import { AuthProvider } from "../context/authContext";
import { UserProvider } from "@/context/UserContext";
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
  metadataBase: new URL('https://devsrealm.vercel.app/'),
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
    url: "https://devsrealm.vercel.app/",
    siteName: "Devs Realm",
    images: [
      {
        url: "/images/realm.png",
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
    images: ["/images/realm.png"],
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
    canonical: "https://devsrealm.vercel.app/",
    languages: {
      en: "https://devsrealm.vercel.app/en",
    },
  },
  verification: {
    google: "6GPrJZ7YUXkR3Qt38gEbtqi7dBrrv_bNVv9DUbArgGA",
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

        <div className="mb-20">
        <UserProvider>
          {children}
        </UserProvider>
        </div>
        <Footer />
         <Bottomnav />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
