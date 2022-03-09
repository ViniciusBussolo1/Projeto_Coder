import { FormEvent, useState } from "react";

import Logo from "../assets/images/logo.png";
import Icon_home from "../assets/images/icon-home.svg";
import Icon_user from "../assets/images/icon-user.svg";
import Icon_delete from "../assets/images/icon-delete.svg";
import Icon_edit from "../assets/images/icon-edit.svg";

import { Link } from "react-router-dom";
import { Main } from "../components/Main";

import { database } from "../services/firebase";
import { UseData } from "../hooks/UseData";

export function Users() {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newId, setNewId] = useState("");

  const { data } = UseData();

  async function handleSendData(event: FormEvent) {
    event.preventDefault();

    if (newName.trim() === "" || newEmail.trim() === "") {
      window.alert("Campo vazio");
    }

    const roomRef = database.ref("users");

    if (!newId) {
      await roomRef.push({
        name: newName,
        email: newEmail,
      });
    } else {
      await roomRef.child(newId).set({
        name: newName,
        email: newEmail,
      });
    }

    setNewId("");
    setNewName("");
    setNewEmail("");
  }

  function handleCancel() {
    setNewName("");
    setNewEmail("");
  }

  async function handleRemoveData(dataId: string) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`users/${dataId}`).remove();
    }
  }

  function handleEditData(dataName: string, dataEmail: string, dataId: string) {
    setNewName(dataName);
    setNewEmail(dataEmail);
    setNewId(dataId);
  }

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
        title="Usuarios"
        subtitle="Cadastro de usuários: Incluir, Listar, Alterar e Excluir!"
        icon={Icon_user}
      >
        <form onSubmit={handleSendData}>
          <div className="form-inputs">
            <div>
              <label>Nome</label>
              <input
                type="Name"
                placeholder="Digite o nome..."
                onChange={(event) => setNewName(event.target.value)}
                value={newName}
              />
            </div>
            <div>
              <label>E-mail</label>
              <input
                type="Email"
                placeholder="Digite o e-mail..."
                onChange={(event) => setNewEmail(event.target.value)}
                value={newEmail}
              ></input>
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit" className="button-save">
              Salvar
            </button>
            <button
              type="reset"
              className="button-cancel"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((datas) => (
              <tr key={datas.id}>
                <td>{datas.name}</td>
                <td>{datas.email}</td>
                <td>
                  <button
                    className="button_edit"
                    onClick={() =>
                      handleEditData(datas.name, datas.email, datas.id)
                    }
                  >
                    <img src={Icon_edit} alt="Icone de editar" />
                  </button>
                  <button
                    className="button_remove"
                    onClick={() => handleRemoveData(datas.id)}
                  >
                    <img src={Icon_delete} alt="Icone de deletar" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Main>
    </div>
  );
}
