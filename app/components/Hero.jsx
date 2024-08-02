import React from "react";

const Hero = () => {
  return (
    <div className="hero">
      <div className="max-w-x grid grid-cols-12 items-center">
        <div className="col-span-8">
          <h1>I'm Michael - Web Developer & Software Engineer</h1>
        </div>
        <div className="col-span-4">
          <img src="logo-harf.png" className="w-60 rounded-xl"></img>
        </div>
      </div>
      <div className="section-col flex gap-4">
        <h3 className="">
          Driven Software Engineer with 2 years of experience building,
          upgrading, and maintaining websites. Team Collaborator and Passionate
          about the product.
        </h3>
      </div>
    </div>
  );
};
export default Hero;
