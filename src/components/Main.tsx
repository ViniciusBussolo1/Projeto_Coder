import { ReactNode } from "react";

import "../styles/main.scss";

type HeaderProps = {
  title: string;
  subtitle: string;
  icon: string;
  children?: ReactNode;
};

export function Main({ title, subtitle, children, icon }: HeaderProps) {
  return (
    <div id="main-component">
      <header>
        <h1>
          <img src={icon} alt="Icone casa" />
          {title}
        </h1>
        <p>{subtitle}</p>
      </header>
      <main>
        <div>{children}</div>
      </main>
    </div>
  );
}

export default Main;
