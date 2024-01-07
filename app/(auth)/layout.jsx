import React from "react";
import css from "@/styles/authLayout.module.css";
import Image from "next/image";
export const metadata = {
  title: "Authentication",
};
const AuthLayout = ({ children }) => {
  return (
    <div className={css.wrapper}>
      <sdiv className={css.container}>
        <div className={css.left}>{children}</div>
        <div className={css.right}>
          <Image
            src="/images/auth.png"
            alt="branding-image"
            quality={100}
            width={400}
            height={480}
          />
        </div>
      </sdiv>
    </div>
  );
};

export default AuthLayout;
