import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import 'setimmediate';

require('dotenv').config({
  path: '.env.test',
});

jest.mock('./src/helper/getEnvironments', () => ({
  getEnvironments: () => ({ ...process.env }),
}));
