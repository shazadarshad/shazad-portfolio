import type { Metadata, Viewport } from "next";
import { Outfit, Syne, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";
import Intro from "@/components/ui/Intro";

/* ── Fonts ───────────────────────────────────────────────────────── */
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600"],
});

/* ── Site config ─────────────────────────────────────────────────── */
const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shazadar.com";
const SITE_NAME = "Shazad Arshad";

/* 50-60 chars — shows fully in Google title */
const SITE_TITLE = "Shazad Arshad — Web Developer | Colombo, Sri Lanka";

/* 145-155 chars — shows fully in Google snippet */
const SITE_DESCRIPTION =
  "Shazad Arshad is a CS student & freelance web developer in Colombo, Sri Lanka. Building fast, modern web apps with React, Next.js & TypeScript. Available worldwide.";

/* ── Metadata ────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  keywords: [
    /* Brand */
    "Shazad Arshad",
    "Shazad Arshad developer",
    "Shazad Arshad portfolio",
    "shazadar.com",
    /* Location */
    "web developer Sri Lanka",
    "web developer Colombo",
    "frontend developer Colombo",
    "freelance developer Sri Lanka",
    "software developer Sri Lanka",
    "hire web developer Sri Lanka",
    /* Skills */
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "JavaScript developer",
    "Node.js developer",
    "full stack developer",
    "frontend developer",
    /* Service */
    "freelance web developer",
    "freelance React developer",
    "web development services",
    "custom website development",
    "portfolio website",
  ],

  authors:   [{ name: SITE_NAME, url: SITE_URL }],
  creator:   SITE_NAME,
  publisher: SITE_NAME,

  /* Explicit index + rich snippet allowances */
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  /* Open Graph */
  openGraph: {
    type:        "profile",
    locale:      "en_US",
    url:         SITE_URL,
    siteName:    SITE_NAME,
    title:       SITE_TITLE,
    description: SITE_DESCRIPTION,
    firstName:   "Shazad",
    lastName:    "Arshad",
    username:    "shazadarshad",
    images: [
      {
        url:    `${SITE_URL}/opengraph-image`,
        width:  1200,
        height: 630,
        alt:    `${SITE_NAME} — Web Developer from Colombo, Sri Lanka`,
        type:   "image/png",
      },
    ],
  },

  /* Twitter / X */
  twitter: {
    card:        "summary_large_image",
    title:       SITE_TITLE,
    description: SITE_DESCRIPTION,
    images:      [`${SITE_URL}/opengraph-image`],
    creator:     "@shazadarshad",
    site:        "@shazadarshad",
  },

  alternates: { canonical: SITE_URL },
  category:   "technology",

  /* Verification placeholders — add real tokens once you verify in Search Console */
  // verification: { google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN" },
};

/* ── Viewport ────────────────────────────────────────────────────── */
export const viewport: Viewport = {
  width:      "device-width",
  initialScale: 1,
  themeColor: "#f5f5fb",
};

/* ── JSON-LD: Person ─────────────────────────────────────────────── */
const personSchema = {
  "@context": "https://schema.org",
  "@type":    "Person",
  "@id":      `${SITE_URL}/#person`,

  name:       "Shazad Arshad",
  givenName:  "Shazad",
  familyName: "Arshad",
  url:        SITE_URL,

  image: {
    "@type":  "ImageObject",
    url:      `${SITE_URL}/opengraph-image`,
    width:    1200,
    height:   630,
  },

  jobTitle:    "Freelance Web Developer & Computer Science Student",
  description: SITE_DESCRIPTION,

  email:     "shazadarshadcbs@gmail.com",
  telephone: "+94776512486",

  address: {
    "@type":           "PostalAddress",
    addressLocality:   "Colombo",
    addressRegion:     "Western Province",
    addressCountry:    "LK",
    addressCountryName: "Sri Lanka",
  },

  nationality: {
    "@type": "Country",
    name:    "Sri Lanka",
  },

  knowsAbout: [
    "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
    "Tailwind CSS", "PostgreSQL", "MongoDB", "REST APIs",
    "Web Development", "Frontend Development", "Full-Stack Development",
    "UI/UX Design", "Responsive Design", "Vercel", "AWS",
  ],

  knowsLanguage: ["en", "si"],

  alumniOf: {
    "@type": "CollegeOrUniversity",
    name:    "University of Technology",
    address: {
      "@type":         "PostalAddress",
      addressLocality: "Colombo",
      addressCountry:  "LK",
    },
  },

  hasCredential: [
    {
      "@type":         "EducationalOccupationalCredential",
      name:            "Introduction to Databases",
      credentialCategory: "Certificate",
      recognizedBy:    { "@type": "Organization", name: "IBM" },
      url:             "https://www.coursera.org/account/accomplishments/records/YAM9SJYA2ZEI",
    },
    {
      "@type":         "EducationalOccupationalCredential",
      name:            "Introduction to HTML, CSS & JavaScript",
      credentialCategory: "Certificate",
      recognizedBy:    { "@type": "Organization", name: "IBM" },
      url:             "https://www.coursera.org/account/accomplishments/records/AY0D9033OEAF",
    },
    {
      "@type":         "EducationalOccupationalCredential",
      name:            "Getting Started with Git and GitHub",
      credentialCategory: "Certificate",
      recognizedBy:    { "@type": "Organization", name: "IBM" },
      url:             "https://www.coursera.org/account/accomplishments/records/OO3KI0IE7DK9",
    },
  ],

  worksFor: {
    "@type": "Organization",
    name:    "Self-Employed",
    description: "Freelance web development services",
  },

  contactPoint: {
    "@type":          "ContactPoint",
    email:            "shazadarshadcbs@gmail.com",
    telephone:        "+94776512486",
    contactType:      "customer service",
    availableLanguage: ["English"],
    areaServed:       "Worldwide",
    hoursAvailable: {
      "@type":    "OpeningHoursSpecification",
      dayOfWeek:  ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      opens:      "09:00",
      closes:     "18:00",
    },
  },

  sameAs: [
    "https://github.com/shazadarshad",
    "https://linkedin.com/in/shazadarshad",
    `${SITE_URL}`,
  ],

  offers: {
    "@type":       "Offer",
    name:          "Freelance Web Development",
    description:   "Custom website and web application development using React, Next.js, TypeScript and Node.js",
    areaServed:    "Worldwide",
    price:         "0",
    priceCurrency: "USD",
    availability:  "https://schema.org/InStock",
  },
};

/* ── JSON-LD: WebSite ────────────────────────────────────────────── */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type":    "WebSite",
  "@id":      `${SITE_URL}/#website`,

  name:        SITE_NAME,
  url:         SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage:  "en-US",

  author:    { "@id": `${SITE_URL}/#person` },
  publisher: { "@id": `${SITE_URL}/#person` },

  copyrightYear: 2024,
  copyrightHolder: { "@id": `${SITE_URL}/#person` },

  potentialAction: {
    "@type":       "SearchAction",
    target:        { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

/* ── JSON-LD: ProfilePage ────────────────────────────────────────── */
const profilePageSchema = {
  "@context":   "https://schema.org",
  "@type":      "ProfilePage",
  "@id":        `${SITE_URL}/#profilepage`,

  name:        `${SITE_NAME} — Web Developer Portfolio`,
  url:         SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage:  "en-US",

  about:        { "@id": `${SITE_URL}/#person` },
  mainEntity:   { "@id": `${SITE_URL}/#person` },

  dateCreated:  "2024-01-01",
  dateModified: "2026-04-04",

  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type":  "ListItem",
        position: 1,
        name:     "Home",
        item:     SITE_URL,
      },
    ],
  },
};

/* ── Root layout ─────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="canonical" href={SITE_URL} />

        {/* Geo targeting */}
        <meta name="geo.region"    content="LK-1" />
        <meta name="geo.placename" content="Colombo, Sri Lanka" />
        <meta name="geo.position"  content="6.9271;79.8612" />
        <meta name="ICBM"          content="6.9271, 79.8612" />

        {/* Extra identity signals */}
        <meta name="author"       content="Shazad Arshad" />
        <meta name="designer"     content="Shazad Arshad" />
        <meta name="reply-to"     content="shazadarshadcbs@gmail.com" />
        <meta name="format-detection" content="telephone=no" />

        {/* Preconnect to CDNs used */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* JSON-LD structured data — all three schemas */}
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          strategy="beforeInteractive"
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          strategy="beforeInteractive"
        />
        <Script
          id="schema-profilepage"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
          strategy="beforeInteractive"
        />

        <Intro />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
