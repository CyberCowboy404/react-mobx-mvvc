import React from 'react';
import Router from "pages/Router";
import { Provider } from 'mobx-react';
import stores from 'stores';
import Container from 'components/container/Container';

const App = () => {
  return (
    <React.StrictMode>
      <Provider {...stores}>
        <Container>
          <Router />
        </Container>
      </Provider>
    </React.StrictMode>
  );
};

export default App;