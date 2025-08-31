import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/contactsOps';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import css from './ContactForm.module.css';
import toast, { Toaster } from 'react-hot-toast';

const initialValues = {
  name: '',
  number: '',
};

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  number: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
});

export default function ContactForm() {
  const nameId = useId();
  const numberId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        name: values.name,
        number: values.number,
      })
    )
      .unwrap()
      .then(() => toast.success('Contact added!'))
      .catch(() => toast.error('Oops... Try again!'));;
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.fieldContainer}>
          <label htmlFor={nameId}>Name</label>
          <Field type="text" name="name" id={nameId} className={css.input} />
          <ErrorMessage name="name" component="span" className={css.error} />
        </div>
        <div className={css.fieldContainer}>
          <label htmlFor={numberId}>Number</label>
          <Field
            type="text"
            name="number"
            id={numberId}
            className={css.input}
          />
          <ErrorMessage name="number" component="span" className={css.error} />
        </div>
        <button className={css.button} type="submit">
          Add contact
        </button>
        <Toaster />
      </Form>
    </Formik>
  );
}
