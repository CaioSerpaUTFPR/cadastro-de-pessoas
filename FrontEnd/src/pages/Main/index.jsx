import axios from 'axios';
import { useEffect, useState } from 'react';
import { CustomButton } from '../../components/Button';
import { Form } from '../../components/Form';
import { Modal } from '../../components/Modal';


export const API = axios.create({ baseURL: 'http://localhost:3003' });

function Main() {



  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [newPersonModal, setNewPersonModal] = useState(false);
  const [updatePersonModal, setupdatePersonModal] = useState(false);

  const handleInsertByForm = () => {
    afterForm();
  }

  const handleUpdateByForm = () => {
    afterForm();
  }

  function afterForm() {
    setNewPersonModal(false);
    setupdatePersonModal(false);
    fetchData();
  }


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

  async function handleDeletePerson(pk_person) {
    try {
      await API.delete(`/${pk_person}`);
      const newData = data.filter((person) => {
        return (person.pk_person !== pk_person);
      })
      setData(newData);
    }
    catch (e) {
      console.log(e);
    }
  }


  useEffect(() => { fetchData() }, []);

  useEffect(() => { }, []);

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
        <Form handleInsertByForm={handleInsertByForm} />
      </Modal>}
      {updatePersonModal && <Modal open={updatePersonModal} setOpen={setupdatePersonModal}>
        <Form handleUpdateByForm={handleUpdateByForm} editPerson={updateData} />
      </Modal>}
      <div style={{ backgroundColor: 'red', width: '100%', height: '40px', display: 'flex', alignItems: 'center' }}>
        <div style={{ marginLeft: '10px', witdh: '50%', height: '50%' }}>
          <CustomButton onClick={() => { setNewPersonModal(true) }}>Novo</CustomButton>
        </div>
      </div>
      <div style={{ backgroundColor: 'yellow', width: '100%', height: '400px', display: 'flex' }}>
        <table border={1} style={{ width: '100%', height: '14px' }}>
          <thead style={{ height: '10%' }}>
            <tr>
              <th>Cod Pessoa</th>
              <th>Tipo</th>
              <th>Nome</th>
              <th>CPF/CNPJ</th>
              <th>RG/INSC ESTADUAL</th>
              <th>Login</th>
              <th>Senha</th>
              <th>Telefone</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {data.map((person) => {
              const type = person.person_type[0].toUpperCase() + person.person_type.substring(1);
              return (
                <tr key={person.rg_stateinsc}>
                  <td>{person.pk_person}</td>
                  <td>{type}</td>
                  <td>{person.person_name}</td>
                  <td>{person.cpf_cnpj}</td>
                  <td>{person.rg_stateinsc}</td>
                  <td>{person.person_login}</td>
                  <td>{person.encrypt_pass}</td>
                  <td>{person.tel}</td>
                  <td>
                    <div style={{ display: 'flex' }}>
                      <CustomButton onClick={() => { handleDeletePerson(person.pk_person) }}>Excluir</CustomButton>
                      <CustomButton onClick={() => { setupdatePersonModal(true); setUpdateData(person) }}>Editar</CustomButton>
                    </div>
                  </td>
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