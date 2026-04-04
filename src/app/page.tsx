import dynamic from "next/dynamic";
import Nav from "@/components/nav/Nav";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Toolkit from "@/components/toolkit/Toolkit";
import Experience from "@/components/experience/Experience";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

// Lazy-load the heaviest client component
const Work = dynamic(() => import("@/components/work/Work"), {
  ssr: true,
});

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Toolkit />
      <Work />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
