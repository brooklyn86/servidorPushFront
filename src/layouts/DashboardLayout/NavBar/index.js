/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import { useLocation, matchPath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import {
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  ShoppingCart as ShoppingCartIcon,
  Folder as FolderIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  UserPlus as UserPlusIcon,
  Shield as ShieldIcon,
  AlertCircle as AlertCircleIcon,
  Trello as TrelloIcon,
  User as UserIcon,
  CreditCard,
  Phone,Key,
  Layout as LayoutIco,n,
  Edit as EditIcon,
  DollarSign as DollarSignIcon,
  Mail as MailIcon,
  MessageCircle as MessageCircleIcon,
  PieChart as PieChartIcon,
  LogOut,
  Share2 as ShareIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import {getUserData} from "../../../actions/accountActions";

const navConfig = [
  {
    subheader: 'Aplicação',
    items: [
      {
        title: 'Dashboard',
        icon: PieChartIcon,
        href: '/app/dashboard'
      },
      {
        title: 'Chaves',
        icon: Key,
        href: '/app/keys'
      },
    ]
  },
  //{
   // subheader: 'Usuarios',
   // items: [
    //  {
    //    title: 'Usuarios Cadastrados',
     //   icon: UserIcon,
      //  href: '/app/users'
     // },
     // {
      //  title: 'Cadastrar Usuario',
      //  icon: CreditCard,
      //  href: '/app/create/user'
     // },
    //]
  //},
  {
    subheader: 'Conta',
    items: [
      {
        title: 'Perfil',
        icon: UserIcon,
        href: '/app/account'
      },
      //{
        //title: 'Cota',
        //icon: CreditCard,
        //href: '/app'
      //},
    ]
  },
];
function AdminMenu(user){
    console.log(user.roles);
    //const hasAdmin = user.roles.filter(item => {
     // return item.roles.role_id == 1
    //});
   //console.log(hasAdmin)
  return null;

}
function renderNavItems({ items, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth = 0
}) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

function NavBar({ openMobile, onMobileClose, }) {
  const classes = useStyles();
  const location = useLocation();
  const [user, setUser] = useState([]);
  // const { user } = useSelector((state) => state.account);

  useEffect(async () => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    const response = await getUserData();
    setUser(response.user)
    // eslint-disable-next-line
  }, []);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box
            p={2}
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/">

              <img src="https://cdn.worldvectorlogo.com/logos/socket-io.svg" width="25"/>
            </RouterLink>
          </Box>
        </Hidden>
        <Divider />
        <Box p={2}>
          {navConfig.map((config) => (
            <List
              key={config.subheader}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                >
                  {config.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems({ items: config.items, pathname: location.pathname })}
            </List>
          ))}
        </Box>
        <Divider />
        {user &&
         <AdminMenu user={user}/>
        }
        <Box p={2}>

              <List
                  subheader={(
                      <ListSubheader
                          disableGutters
                          disableSticky
                      >
                        Logout
                      </ListSubheader>
                  )}
              >
                <NavItem
                    // depth={depth}
                    href='#'
                    icon={LogOut}
                    title='Logout'
                    onClick={() => localStorage.removeItem('token')}
                />
              </List>
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
