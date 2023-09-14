import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';
import { UnstyledButton } from '@mantine/core';
import { IconExchange, IconHome } from '@tabler/icons';

import useStyles from './NavbarLinks.styles';

const links = [
  { link: 'overview', label: 'Overview', icon: IconHome },
  {
    link: 'onlineGoodsServices',
    label: 'Online goods and services',
    icon: IconExchange,
  },
];

const NavbarLink = ({ children, to, ...props }: LinkProps) => {
  const { classes, cx } = useStyles();
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname });
  const childMatch = useMatch({ path: resolved.pathname + '/:child' });

  return (
    <UnstyledButton<typeof Link>
      component={Link}
      className={cx(classes.link, {
        [classes.linkActive]: match || childMatch,
      })}
      to={to}
      {...props}
    >
      {children}
    </UnstyledButton>
  );
};

export const NavbarLinks = () => {
  const { classes } = useStyles();

  return (
    <>
      {links.map((item) => (
        <NavbarLink to={item.link} key={item.label}>
          <item.icon className={classes.linkIcon} />
          <span>{item.label}</span>
        </NavbarLink>
      ))}
    </>
  );
};
