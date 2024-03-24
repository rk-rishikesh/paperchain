import Hero from "./Hero";
import Navbar from "../Layouts/Navbar";
import Skills from "./Skills";
import Testimonials from "./Testimonials";
import Contact from "./Contact";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Skills/>
      <Testimonials />
      <Contact />
      <footer className="p-3 text-center">
        <h6 className="mb-3">PaperChain</h6>
        <p>Prana © All CopyRights Reserved 2024</p>
      </footer>
    </div>
  );
}
export default Home; 