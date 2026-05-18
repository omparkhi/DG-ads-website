import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import AgencyIntro from "./components/pages/AgencyIntro";
import Hero from "./components/pages/Hero";
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
      </main>
    </>
  );
}

export default App;
