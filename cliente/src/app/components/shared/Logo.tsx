import Image from "next/image";

import logo from "../../images/logo.png";

export const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <Image src={logo} alt="logo-rate-bite" width={32} />
      <div>
        <h2>Rate Bite</h2>
      </div>
    </div>
  );
};
