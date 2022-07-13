import axios from 'axios';
import { useEffect, useState } from 'react';
import { CustomButton } from '../../components/Button';
import { Form } from '../../components/Form';
import { Modal } from '../../components/Modal';

function Main() {


  const API = axios.create({ baseURL: 'http://localhost:3003' });
  const [data, setData] = useState([]);
  const [newPersonModal, setNewPersonModal] = useState(false);

  async function fetchData() {
    let response;
    try {
      response = await API.get('/');
      setData(response.data);
    }
    catch (e) {
      console.log(e);
    }
  }
  /*TODO YUP REact-hook-form*/
  async function handleCreatePerson() {
    try {
      await API.post('/', {
        person_name: "Joao Marcos teste Post"
        , encrypt_pass: "abacaxi"
        , person_login: "juandrade"
        , person_type: "fisica"
        , cpf_cnpj: "dsassdddas"
        , rg_stateinsc: "aasdsasd"
      });
      //setData(response.data);
    }
    catch (e) {
      console.log(e);
    }
  }


  async function handleDeletePerson(pk_person) {
    console.log(pk_person + 'aqui');
    try {
      await API.delete(`/${pk_person}`);
      const newData = data.filter((person) => {
        return (person.pk_person !== pk_person);
      })
      console.log(newData);
      setData(newData);
    }
    catch (e) {
      console.log(e);
    }
  }

  async function handleUpdatePerson() {

  }
  useEffect(() => { fetchData() }, []);




  return (
    <>
      {/* {
        newPersonModal && <div style={{ backgroundColor: '#e2e2e2', opacity: '0.5', width: '100%', height: '100%', position: 'absolute', display: 'flex' }}>
          <div style={{ zIndex: '1', backgroundColor: 'green', opacity: '0 !important', width: '80%', height: '80%', margin: 'auto' }}>
            <button onClick={() => { setNewPersonModal(false) }}></button>
          </div>

        </div>
      } */}
      {newPersonModal && <Modal open={newPersonModal} setOpen={setNewPersonModal}>
        <Form />
      </Modal>}
      <div style={{ backgroundColor: 'red', width: '100%', height: '40px', display: 'flex', alignItems: 'center' }}>
        <div style={{ marginLeft: '10px', witdh: '50%', height: '50%' }}>
          <CustomButton onClick={() => { setNewPersonModal(true); handleCreatePerson() }}>Novo</CustomButton>
        </div>
      </div>
      <div style={{ backgroundColor: 'yellow', width: '100%', height: '400px', display: 'flex' }}>
        <table border={1} style={{ width: '100%', height: '14px' }}>
          <thead style={{ height: '10%' }}>
            <tr>
              <th>Cod Pessoa</th>
              <th>Nome</th>
              <th>Login</th>
              <th>Senha</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {data.map((person) => {
              return (
                <tr key={person.pk_person}>
                  <td>{person.pk_person}</td>
                  <td>{person.person_name}</td>
                  <td>{person.person_login}</td>
                  <td>{person.encrypt_pass}</td>
                  <td>
                    <CustomButton onClick={() => { handleDeletePerson(person.pk_person) }}>Excluir</CustomButton>
                    <CustomButton onClick={() => { handleDeletePerson(person.pk_person) }}>Editar</CustomButton></td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </>

  )
}

export default Main