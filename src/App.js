import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import AppRouter from "./routers";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ReduxStore from "./store";
import { setAuthToken } from "./services/config";

// const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { pageProps } = props;
  const JWT = localStorage.getItem("JWT");
  if (JWT) setAuthToken(JWT);

  // const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
      <Provider store={ReduxStore.store}>
        <PersistGate loading={null} persistor={ReduxStore.persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRouter {...pageProps} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
      {/* </LocalizationProvider> */}
    </>
  );
};

export default App;
