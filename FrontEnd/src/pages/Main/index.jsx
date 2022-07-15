import axios from 'axios';
import { useEffect, useState } from 'react';
import { CustomButton } from '../../components/Button';
import { Form } from '../../components/Form';
import { Modal } from '../../components/Modal';
import Alert from '@mui/material/Alert';



export const API = axios.create({ baseURL: 'http://localhost:3003' });

function Main() {

  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [newPersonModal, setNewPersonModal] = useState(false);
  const [updatePersonModal, setupdatePersonModal] = useState(false);
  const [hasUpdateError, setHasUpdateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [deletePerson, setDeletePerson] = useState('');

  const handleInsertByForm = () => {
    afterForm();
  }

  const handleUpdateByForm = () => {
    afterForm();
  }

  async function handleResposeError(err) {
    afterForm(err);
  }

  function handleError(err) {
    setHasUpdateError(true);
    setErrorMessage(err);
    setTimeout(() => {
      setHasUpdateError(false);
      setErrorMessage('');
    }, 3000);
  }

  function afterForm(err) {
    setNewPersonModal(false);
    setupdatePersonModal(false);
    err && handleError(err);
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
      {hasUpdateError && <Alert severity="error">{errorMessage}</Alert>}
      {newPersonModal && <Modal open={newPersonModal} setOpen={setNewPersonModal}>
        <Form handleInsertByForm={handleInsertByForm} handleResposeError={handleResposeError} />
      </Modal>}

      {updatePersonModal && <Modal open={updatePersonModal} setOpen={setupdatePersonModal}>
        <Form handleUpdateByForm={handleUpdateByForm} editPerson={updateData} handleResposeError={handleResposeError} />
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