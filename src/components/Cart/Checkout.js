import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

// Clase 254 validaciones: https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25600080#overview
const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    // Referencio los campos
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    // Aplico validaciones con isEmpty() y isFiveChars()
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid =
      !isEmpty(enteredPostal) && isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    // Guardo el estado de validación
    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    // Guardo el estado de validación general del form
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    // Reboto si falla el form
    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };

  // Aplico estilos a partir de las validaciones
  const nameControlClasses = `${classes.control} ${
    !formInputsValidity.name && classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    !formInputsValidity.street && classes.invalid
  }`;

  const postalControlClasses = `${classes.control} ${
    !formInputsValidity.postal && classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    !formInputsValidity.city && classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Tu nombre</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && (
          <p>Por favor, ingrese un valor correcto.</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Calle</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && (
          <p>Por favor, ingrese un valor correcto.</p>
        )}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='cp'>Código postal</label>
        <input type='text' id='cp' ref={postalInputRef} />
        {!formInputsValidity.postal && (
          <p>Por favor, ingrese un valor correcto (5 dígitos).</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>Ciudad</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && (
          <p>Por favor, ingrese un valor correcto.</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancelar
        </button>
        <button type='submit'>Confirmar</button>
      </div>
    </form>
  );
};

export default Checkout;
