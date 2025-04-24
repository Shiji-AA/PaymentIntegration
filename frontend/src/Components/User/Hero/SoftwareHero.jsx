import cat4 from "../../../assets/hero.jpg";
import rightArrow from '../../../assets/icons/rightArrow.png'

function SoftwareHero() {
  return (
    <section className="relative h-[320px] md:h-[420px] w-full flex flex-col items-center justify-center text-white">
      {/* Background Image with Black Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${cat4})`,
          filter: "brightness(50%)",
        }}
      ></div>

      {/* Overlay for Extra Darkness */}
      <div className="absolute inset-0 bg-gray-800 opacity-30"></div>

      {/* Centered Content */}
      <div className="relative text-center">
        <h1 className="text-5xl md:text-6xl font-bold">Software</h1>

        <nav className="mt-2 text-lg flex items-center justify-center gap-2">
  <a
    href="https://technical.arcite.in/"
    className="text-white hover:underline"
  >
    Home
  </a>
  <img
    src={rightArrow}
    alt="Right Arrow"
    className="w-4 h-4 inline-block"
  />
  <span className="text-gray-300">Department</span>
</nav>

      </div>
    </section>
  );
}

export default SoftwareHero;
