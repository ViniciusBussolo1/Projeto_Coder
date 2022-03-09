import Logo from "../assets/images/logo.png";
import Icon_home from "../assets/images/icon-home.svg";
import Icon_user from "../assets/images/icon-user.svg";

import { Link } from "react-router-dom";
import { Main } from "../components/Main";

import "../styles/home.scss";

export function Home() {
  return (
    <div id="page-home">
      <div>
        <aside className="img-logo">
          <Link to="/">
            <img src={Logo} alt="Logo da Cod3r" />
          </Link>
        </aside>
        <nav>
          <Link to="/" className="link">
            <img src={Icon_home} alt="Icone casa" />
            <aside>Início</aside>
          </Link>
          <Link to="/users" className="link">
            <img src={Icon_user} alt="Icone Usuário" />
            <aside>Usuários</aside>
          </Link>
        </nav>
      </div>
      <Main
        title="Início"
        subtitle="Primeiro Projeto de React"
        icon={Icon_home}
      >
        <h1>Bem Vindo!</h1>
        <p>
          Sistema para exemplificar a contrução de um cadastro desenvolvido em
          React!
        </p>
      </Main>
    </div>
  );
}
