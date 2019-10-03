import { generate as generateBusinesses } from './endpoints/businesses';
import { generate as generateClients } from './endpoints/clients';
import { generate as generateTranslations } from './endpoints/translations';
import fs from 'fs';

const FOLDER_OUTPUT = './dist';
const FOLDER_API = FOLDER_OUTPUT + '/api';

fs.mkdirSync(FOLDER_OUTPUT);
fs.mkdirSync(FOLDER_API);

generateBusinesses(FOLDER_API);
generateTranslations(FOLDER_API);
generateClients(FOLDER_API);
