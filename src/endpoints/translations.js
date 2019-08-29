import fs from 'fs';

const NB_BUSINESSES = 120;

export function generate(destination) {  
  const folder = `${destination}/translations`;
  const objects = [
    {
      locale: 'fr',
      translations: {
        about: 'À propos de nous',
        hello: 'Bonjour le monde !',
      }
    },
    {
      locale: 'en',
      translations: {
        about: 'About us',
        hello: 'Hello world!',
      }
    },
    {
      locale: 'ja',
      translations: {
        about: '私達について',
        hello: 'こんにちは、世界',
      }
    }
  ];
  
  fs.mkdirSync(folder);
  objects.forEach((o) => {
    fs.writeFileSync(`${folder}/${o.locale}.json`, JSON.stringify(o.translations), () => {});
  });
}