import { Div, Conteiner } from './styles';
import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


export const Modal = ({ open, setOpen, children }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog maxWidth={false} onClose={handleClose} open={open}>
      {children}
    </Dialog>
  )
}