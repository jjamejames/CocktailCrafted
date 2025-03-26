function Footer() {
  return (
    <div className="footer w-[100%] h-[120px] bg-[#4D0000] grid grid-cols-3  xl:h-[50px] md:h-[100px] lg:h-[100px] sm:h-[100px]">
      <span className="flex-1 flex justify-start ml-[30px] items-center">
        Developed By James Anurak
      </span>

      <a
        href="mailto:jameanurak.wa@gmail.com"
        className="flex-1 flex justify-center items-center"
      >
        Contact Me
      </a>
      <span className="flex-1 flex justify-end mr-[30px] items-center">© 2025 Anurak</span>
    </div>
  );
}
export default Footer;
