import { Provider } from "react-redux";
import Navigators from "./navigations";
import store from "./redux/store";

export default () => (
    
  <Provider store={store}>
    <Navigators />
  </Provider>
);
