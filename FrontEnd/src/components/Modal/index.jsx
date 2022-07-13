import { Div, Conteiner } from './styles';
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


export const Modal = ({ open, setOpen, children }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    // <Div>
    //   {/* <div style={{ zIndex: '1', backgroundColor: 'green', opacity: '0 !important', width: '80%', height: '80%', margin: 'auto' }}>
    //     <button onClick={() => { setNewPersonModal(false) }}></button>
    //   </div> */}
    //   <Conteiner></Conteiner>
    // </Div>
    <Dialog maxWidth={false} onClose={handleClose} open={open}>
      {children}
      {/* <div style={{ width: '900px', height: '800px' }}></div> */}
    </Dialog>
  )
}