import axios from 'axios';
import { useEffect, useState } from 'react';
import { CustomButton } from '../../components/Button';
import { Form } from '../../components/Form';
import { Modal } from '../../components/Modal';

import { FiEyeOff, FiEye, FiPlus } from "react-icons/fi";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';




export const API = axios.create({ baseURL: 'http://localhost:3003' });

function Main() {

  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [deletePersonData, setDeletePersonData] = useState([]);
  const [newPersonModal, setNewPersonModal] = useState(false);
  const [updatePersonModal, setupdatePersonModal] = useState(false);
  const [hasUpdateError, setHasUpdateError] = useState(false);
  const [deletePerson, setDeletePerson] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  function eyeToogle() {
    setShowPass(!showPass);
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
      {deletePerson && <Modal open={deletePerson} setOpen={setDeletePerson}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1>Deseja realmente excluir o cadastro ?</h1>
          <div style={{ width: '30%', display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Button variant="contained" size="medium" onClick={() => { handleDeletePerson(deletePersonData.pk_person); setDeletePerson(false) }}>
              Excluir
            </Button>
            <Button variant="contained" size="medium" onClick={() => setDeletePerson(false)}>
              Não
            </Button>
          </div>
        </div>
      </Modal>}

      {updatePersonModal && <Modal open={updatePersonModal} setOpen={setupdatePersonModal}>
        <Form handleUpdateByForm={handleUpdateByForm} editPerson={updateData} handleResposeError={handleResposeError} />
      </Modal>}
      <div style={{ backgroundColor: '#0070a4', width: '100%', height: '40px', display: 'flex', alignItems: 'center', borderRadius: '15px 15px 1px 1px' }}>
        <div style={{ marginLeft: '10px', witdh: '50%', height: '50%' }}>
          <CustomButton onClick={() => { setNewPersonModal(true) }}><FiPlus /></CustomButton>
        </div>
      </div>
      <div style={{ width: '100%', height: '80vh', display: 'flex', borderRadius: '1px 1px 15px 15px', border: '2px solid #0070a4' }}>
        <table border={1} style={{ width: '100%', height: '20px' }}>
          <thead style={{ height: '10%' }}>
            <tr>
              <th style={{ width: '60px' }}>Tipo</th>
              <th style={{ width: '200px' }}>Nome</th>
              <th style={{ maxWidth: '110px' }}>CPF/CNPJ</th>
              <th style={{ maxWidth: '110px' }}>RG/INSC ESTADUAL</th>
              <th style={{ width: '20px' }}>Login</th>
              <th style={{ width: '20px' }}>Senha</th>
              <th style={{ width: '120px' }}>Telefone</th>
              <th style={{ width: '120px' }}>Opções</th>
            </tr>
          </thead>
          <tbody>
            {data.map((person) => {
              const type = person.person_type[0].toUpperCase() + person.person_type.substring(1);
              return (
                <tr key={person.rg_stateinsc}>
                  <td>{type}</td>
                  <td>{person.person_name}</td>
                  <td>{person.cpf_cnpj}</td>
                  <td>{person.rg_stateinsc}</td>
                  <td>{person.person_login}</td>
                  <td> ******* </td>
                  <td style={{ maxWidth: '50px' }}>{person.tel}</td>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      {/* <CustomButton onClick={() => { handleDeletePerson(person.pk_person) }}>Excluir</CustomButton> */}
                      <CustomButton onClick={() => { setDeletePerson(true); setDeletePersonData(person) }}>Excluir</CustomButton >
                      <CustomButton onClick={() => { setupdatePersonModal(true); setUpdateData(person) }}> Editar</CustomButton >
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