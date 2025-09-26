import Image from "next/image";
import React from "react";
import { FaUser } from "react-icons/fa";

const LinkedInIcon = () => {
  // Redirect to LinkedIn
  const handleLinkedInRedirect = () => {
    window.open("https://www.linkedin.com/in/manav-bhatt1409/", "_blank");
  };

  return (
      <div className="icon cursor-default mt-5 text-3xl flex gap-5" >
        <p className=" -mt-6 font-semibold bg-gradient-to-l from-slate-700 via-slate-400 to-slate-100 bg-clip-text text-transparent">
            <p className="flex justify-center">Meet the</p> 
            <p>Developer Buddy: </p>
        </p>
        <div 
            className="cursor-pointer -mt-2 hover:bg-gray-400 rounded-xl h-[42px] w-[42px] flex justify-center items-center "
            onClick={handleLinkedInRedirect}
            role="button" 
            tabIndex={0} 
            onKeyPress={(e) => { if (e.key === 'Enter') handleLinkedInRedirect(); }}
        >
            <FaUser/>
        </div>
    </div>
  );
};

export default LinkedInIcon;
