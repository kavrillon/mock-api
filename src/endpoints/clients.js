import fs from 'fs';
import faker from 'faker';
import slugify from 'slugify';

const NB_CLIENTS = 10;
const SLUGIFY_CONF = { lower: true };
const THEMES = [
  {
    backgroundColorMain: '#fff',
    backgroundColorAlternate: '#059347',
    backgroundColorAccent: '#fff',
    backgroundColorCta: '#ffd33d',
    textColorMain: '#000',
    textColorAlternate: '#fff',
    textColorAccent: '#ffd33d',
    textColorLink: '#059347',
    textColorCta: '#fff'
  },
  {
    backgroundColorMain: '#fff',
    backgroundColorAlternate: '#28283f',
    backgroundColorAccent: '#f4f4f4',
    backgroundColorCta: '#ee212b',
    textColorMain: '#222',
    textColorAlternate: '#222',
    textColorAccent: '#000',
    textColorLink: '#ee212b',
    textColorCta: '#fff'
  }
];

const LOCALES = [['ar', 'en', 'fr', 'es'], ['ar', 'en', 'fr']];

export function generate(destination) {
  const folder = `${destination}/clients`;
  const objects = Array(NB_CLIENTS)
    .fill()
    .map((_, i) => {
      const id = i;
      const brand = faker.company.companyName(0);

      const headerLinks = Array(Math.floor(Math.random() * 3) + 1)
        .fill()
        .map((_, j) => ({
          name: `Link ${j + 1}`,
          link: 'https://www.google.com'
        }));

      return {
        id,
        index: 'test',
        name: brand,
        slug: slugify(brand, SLUGIFY_CONF),
        locales: LOCALES[i] ? LOCALES[i] : LOCALES[0],
        defaultLocale: 'fr',
        headerLinks,
        theme: THEMES[i] ? THEMES[i] : THEMES[0],
        messages: {
          fr: {
            translation: {
              home: {
                title: 'Page de recherche',
                search: 'Trouver un point de vente',
                more: 'Afficher plus de résultats'
              },
              business: {
                latestReviews: 'Derniers avis',
                map: 'Carte'
              },
              search: {
                placeholder: 'Nom de magasin, ville, etc.'
              }
            }
          },
          en: {
            translation: {
              home: {
                title: 'Search page',
                search: 'Find a shop',
                more: 'Show more results'
              },
              business: {
                latestReviews: 'Latest reviews',
                map: 'Map'
              },
              search: {
                placeholder: 'Shop name, city, etc.'
              }
            }
          },
          es: {
            translation: {
              home: {
                title: 'Página de búsqueda',
                search: 'Encuentra una tienda',
                more: 'Mostrar más resultados'
              },
              business: {
                latestReviews: 'Últimas revisiones',
                map: 'Mapa'
              },
              search: {
                placeholder: 'Nombre de la tienda, ciudad, etc.'
              }
            }
          },
          ar: {
            translation: {
              home: {
                title: 'صفحة البحث',
                search: 'العثور على نقطة البيع',
                more: 'عرض المزيد من النتائج'
              },
              business: {
                latestReviews: 'أحدث الاستعراضات',
                map: 'خريطة'
              },
              search: {
                placeholder: 'اسم المحل ، المدينة ، إلخ'
              }
            }
          }
        }
      };
    });

  fs.mkdirSync(folder);
  fs.writeFileSync(`${folder}/list.json`, JSON.stringify(objects), () => {});

  objects.forEach(o => {
    fs.writeFileSync(`${folder}/${o.id}.json`, JSON.stringify(o), () => {});
  });
}
