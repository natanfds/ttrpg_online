import {configureStore, ConfigureStoreOptions} from '@reduxjs/toolkit'
import reducer from './reducer.tsx';

const storeConfigs: ConfigureStoreOptions = {
  reducer
}

const store = configureStore(storeConfigs);

export default store;
export * from './actions.tsx';