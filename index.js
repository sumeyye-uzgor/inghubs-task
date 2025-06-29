import '@webcomponents/webcomponentsjs/webcomponents-loader.js';
import '@vaadin/icons/vaadin-iconset.js';
import 'lit/polyfill-support.js';

import './src/app-root.js';

import {store} from './src/store/store.js';

import './src/global.css';
import './src/styles/theme.css';

window.store = store;
console.log('🚀 Application started');
