import { generate } from './endpoints/businesses';
import fs from 'fs';

const FOLDER_OUTPUT = './dist';
const FOLDER_API = FOLDER_OUTPUT + '/api';

fs.mkdirSync(FOLDER_OUTPUT);
fs.mkdirSync(FOLDER_API);
generate(FOLDER_API);