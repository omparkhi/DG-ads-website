import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import AgencyIntro from "./components/pages/AgencyIntro";
import Hero from "./components/pages/Hero";
import Portfolio from "./components/pages/Portfolio";
import Services from "./components/pages/Services";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <AgencyIntro />
        <About />
        <Services />
        <Portfolio />
      </main>
    </>
  );
}

export default App;
