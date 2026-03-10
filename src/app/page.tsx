import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Packages from "@/components/Packages";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Loader />
      <Nav />
      <Hero />
      <Skills />
      <Experience />
      <Packages />
      <Contact />
      <Footer />
    </main>
  );
}
