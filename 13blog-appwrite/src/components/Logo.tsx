function Logo({ width = "100px" }) {
  return <div>
    <div className="flex">
      <div className="flex flex-wrap w-15 h-auto">
        <img src="../public/pen.png" alt="" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold leading-tight tracking-widest text-[#5051C6]  uppercase font-playfair">echo</h1>
        <h1 className="text-2xl font-bold leading-tight tracking-widest text-[#E54B2F] uppercase font-poppins">pen</h1>
      </div>
    </div>
  </div>;
}

export default Logo;
