import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { editContact } from '../../redux/contacts/contactsOps';
import { selectError, selectLoading } from '../../redux/contacts/contactsSlice';
import { ErrorComponent, Loader } from '../StatusIndicators/StatusIndicators';
import { IoPerson } from 'react-icons/io5';
import { IoCall } from 'react-icons/io5';
import css from './ContactEditor.module.css';

export default function ContactEditor({ name, number, edit, id }) {
  const [nameValue, setNameValue] = useState(name);
  const [numberValue, setNumberValue] = useState(number);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editContact({ name: nameValue, number: numberValue, id }))
      .unwrap()
      .then(() => {
        edit(false);
        toast('Contact edited!', {
          icon: '✏️',
        });
      })
      .catch(() => toast.error('Oops... Try again!'));
  };
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.inputsDiv}>
        {loading && <Loader />}
        {error && <ErrorComponent />}
        <div className={css.inputIconDiv}>
          <IoPerson className={css.icon} size={18} />
          <input
            type="text"
            className={css.input}
            name="name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </div>
        <div className={css.inputIconDiv}>
          <IoCall className={css.icon} size={18} />
          <input
            type="text"
            className={css.input}
            name="number"
            value={numberValue}
            onChange={(e) => setNumberValue(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className={css.saveButton}>
        Save
      </button>
      <Toaster />
    </form>
  );
}
