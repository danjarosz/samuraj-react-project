import React, { useState, useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import { default as LoginFormStyles } from "./LoginForm.module.scss";
import Modal from  '../Modal/Modal';
import { StoreContext } from '../../store/StoreProvider';
import request from '../../helpers/request';

const style = bemCssModules(LoginFormStyles)

const LoginForm = ({ handleOnClose, isModalOpen }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

  const { setUser } = useContext(StoreContext);

  const handleLoginChange = ({ target: { value } }) => setLogin(value);
  const handlePasswordChange = ({ target: { value } }) => setPassword(value);

  const resetInputs = () => {
    setLogin("");resetInputs
    setPassword("");
  }

  const handleCloseModal = (event) => {
    event.preventDefault();
    handleOnClose();
    resetInputs();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("SUBMIT")
    const { data, status } = await request.post(
      '/users',
      { login, password }
    );

    if (status === 200) {
      setUser(data.user);
      resetInputs();
      handleOnClose();
    } else {
      setValidateMessage(data.message);
    }
  }

  const validateMessageComponent = validateMessage.length ? (
    <p className={style('validate-message')}>{validateMessage}</p>
  ) : null;

  return (
    <Modal 
      handleOnClose={handleOnClose} 
      isOpen={isModalOpen} 
      shouldBeClosedOnOutsideClick={true}
    >
      {validateMessageComponent}
      <form className={style()} method="post" onSubmit={handleSubmit}>
        <div className={style('row')}> 
          <label>
            Login:
            <input
              type="text"
              value={login}
              onChange={handleLoginChange}
            />
          </label>
        </div>
        <div className={style('row')}> 
          <label>
            Hasło:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <div className={style('row')}> 
          <button type="submit">Zaloguj się</button>
          <button type="button" onClick={handleCloseModal}>Zamknij</button>
        </div>
      </form>
    </Modal>
  )
};

export default LoginForm;