import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import { slide as Menu } from 'react-burger-menu';

const styles = {
  bmBurgerButton: {
    position: 'absolute',
    width: '36px',
    height: '30px',
    right: '1.65rem',
    top: '2.7rem',
  },
  bmBurgerBars: {
    background: 'rgb(32, 53, 70)',
    borderRadius: '5px',
    height: '0.25rem',
  },
  bmBurgerBarsHover: {
    background: '#a90000',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenuWrap: {
    position: 'fixed',
    top: '5.5rem',
    height: '100%',
  },
  bmMenu: {
    background: 'rgb(0, 168, 198)',
    padding: '1.2rem 1.2rem 0',
    fontSize: '1.15rem',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
    display: 'flex',
    flexDirection: 'column',
  },
  bmItem: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    paddingLeft: '0.5rem',
  },
};

const BurgerMenu: React.FC<unknown> = (props: unknown) => {
  return (
    <Menu right width={'65%'} styles={styles} {...props}>
      <Link to="/">Home</Link>
      <Link to="/">Für Talente</Link>
      <Link to="/">Für Arbeitgeber</Link>
      <Link to="/">Über uns</Link>
      <Link to="/signup">Mitglied werden</Link>
      <Link to="/sign-in">
        <Button>Login</Button>
      </Link>
    </Menu>
  );
};

export default BurgerMenu;
