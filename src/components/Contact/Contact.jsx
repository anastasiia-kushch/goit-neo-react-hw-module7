import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contactsOps';

import { IoPerson } from 'react-icons/io5';
import { IoCall } from 'react-icons/io5';

import css from './Contact.module.css';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { selectError, selectLoading } from '../../redux/contacts/contactsSlice';

export default function Contact({ data: { id, name, number } }) {
  const [isEditing, setIsEditing] = useState(false);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() =>
        toast('Contact deleted!', {
          icon: '🗑',
        })
      )
      .catch(() => toast.error('Oops... Try again!'));
  };

  const handleClick = () => {
    setIsEditing(true);
  };
  return (
    <div className={css.contactContainer}>
      {loading && <Loader />}
      {error && <ErrorComponent />}
      {isEditing ? (
        <ContactEditor
          name={name}
          number={number}
          edit={setIsEditing}
          id={id}
        />
      ) : (
        <div className={css.infoContainer}>
          <div className={css.info}>
            <IoPerson size={18} />
            <p onClick={handleClick}>{name}</p>
          </div>

          <div className={css.info}>
            <IoCall size={18} />
            <p onClick={handleClick}>{number}</p>
          </div>
        </div>
      )}

      <button className={css.button} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
