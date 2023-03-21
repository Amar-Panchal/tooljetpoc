import React, { Suspense } from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter } from 'react-router-dom';
import { history } from '@/_helpers';
import { PrivateRoute } from '@/_components';
import Toast from '@/_ui/Toast';
import '@/_styles/theme.scss';
import 'emoji-mart/css/emoji-mart.css';
import { AppLoader } from '@/AppLoader';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      fetchedMetadata: false,
      darkMode: localStorage.getItem('darkMode') === 'true',
    };
  }

  componentDidMount() {}

  switchDarkMode = (newMode) => {
    this.setState({ darkMode: newMode });
    localStorage.setItem('darkMode', newMode);
  };

  render() {
    const { darkMode } = this.state;
    let toastOptions = {
      style: {
        wordBreak: 'break-all',
      },
    };

    if (darkMode) {
      toastOptions = {
        className: 'toast-dark-mode',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          wordBreak: 'break-all',
        },
      };
    }

    return (
      <Suspense fallback={null}>
        <BrowserRouter history={history} basename={window.public_config?.SUB_PATH || '/'}>
          <div className={`main-wrapper ${darkMode ? 'theme-dark' : ''}`} data-cy="main-wrapper">
            <PrivateRoute
              exact
              path="/apps/:id/:pageHandle?"
              component={AppLoader}
              switchDarkMode={this.switchDarkMode}
              darkMode={darkMode}
            />
          </div>
        </BrowserRouter>
        <Toast toastOptions={toastOptions} />
      </Suspense>
    );
  }
}

export { App };
