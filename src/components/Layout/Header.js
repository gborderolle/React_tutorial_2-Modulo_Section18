import { useState } from 'react';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = (props) => {

  const loadDummy = async () => {
    let id = uuidv4();
    const response = await fetch(
      'https://react-http-23a93-default-rtdb.firebaseio.com/meals.json',
      {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          name: id,
          description: 'dummy_description',
          price: 10,
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Ocurrió un error.');
    }
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <div className={classes.actions}>
          <button className={classes.button} onClick={loadDummy}>Dummy</button>
        </div>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
