import vue from 'vue';

import {
  Button,
  Container,
  Aside,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Header,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Main,
  Table,
  TableColumn,
  Form,
  FormItem,
  Input,
  Message,
  MessageBox,
  Select,
  Option,
  Upload,
  Rate
} from 'element-ui';

vue.use(Button);
vue.use(Container);
vue.use(Aside);
vue.use(Menu);
vue.use(Submenu);
vue.use(MenuItemGroup);
vue.use(MenuItem);
vue.use(Header);
vue.use(Dropdown);
vue.use(DropdownMenu);
vue.use(DropdownItem);
vue.use(Main);
vue.use(Table);
vue.use(Form);
vue.use(FormItem);
vue.use(Input);
vue.use(TableColumn);
vue.use(Select);
vue.use(Option);
vue.use(Upload);
vue.use(Rate);

vue.prototype.$message = Message;
vue.prototype.$confirm = MessageBox.confirm;
