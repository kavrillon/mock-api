import fs from 'fs';
import faker from 'faker';
import slugify from 'slugify';

const NB_CLIENTS = 10;
const SLUGIFY_CONF = { lower: true };

export function generate(destination) {
  const folder = `${destination}/clients`;
  const objects = Array(NB_CLIENTS)
    .fill()
    .map((_, i) => {
      const id = i + 1;
      const brand = faker.company.companyName(0);

      const headerLinks = Array(Math.floor(Math.random() * 3) + 1)
        .fill()
        .map((_, j) => ({
          name: `Link ${j + 1}`,
          link: 'https://www.google.com'
        }));

      const locales = ['ar', 'en', 'fr'];

      return {
        id,
        name: brand,
        slug: slugify(brand, SLUGIFY_CONF),
        locales: locales,
        defaultLocale: 'fr',
        headerLinks
      };
    });

  fs.mkdirSync(folder);
  fs.writeFileSync(`${folder}/list.json`, JSON.stringify(objects), () => {});

  objects.forEach(o => {
    fs.writeFileSync(`${folder}/${o.id}.json`, JSON.stringify(o), () => {});
  });
}
