import React , {useState,useEffect}from 'react';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './AccountModel.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AccountModal(props) {
  const {showModal,accountNumber} = props;
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleClose = () => 
  {
    setOpen(false);
    props.getModalStatus(false);
  }
  const onSubmit = (data) => {
    props.getModalStatus(false,data);
  };
  useEffect(()=>{
   setOpen(showModal);  
  },[showModal]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label>Account Number</label>
            <select {...register('accountNumber',{ required: true})}>
            <option value="">Select</option>
           {accountNumber.map((acc,index) => (
              <option key={index} value={acc}>{acc}</option>
            ))}
      </select>
      </div>
            {errors.role && <p className="error_acc">Please select Account Number</p>}
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Assign" />
            </div>
        </form>
        </Box>
      </Modal>
    </div>
  );
}