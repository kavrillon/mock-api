import fs from 'fs';
import faker from 'faker';
import slugify from 'slugify';

const NB_CLIENTS = 2;
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
    textColorAlternate: '#fff',
    textColorAccent: '#000',
    textColorLink: '#ee212b',
    textColorCta: '#fff'
  }
];

const INDEXES = ['test', 'XDFG'];

const LOCALES = [['ar', 'en'], ['es', 'en', 'fr']];
const DEFAULT_LOCALES = ['en', 'fr'];

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
        index: INDEXES[i] ? INDEXES[i] : INDEXES[0],
        name: brand,
        logo: 'https://logoipsum.com/assets/logo/logo-3.svg',
        slug: slugify(brand, SLUGIFY_CONF),
        locales: LOCALES[i] ? LOCALES[i] : LOCALES[0],
        defaultLocale: DEFAULT_LOCALES[i]
          ? DEFAULT_LOCALES[i]
          : DEFAULT_LOCALES[0],
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
              location: {
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
              location: {
                itinerary: 'Itinerary',
                website: 'Website',
                email: 'Email',
                phone: 'Phone',
                hours: 'Opening hours',
                opened: 'Opened',
                closed: 'Closed',
                products: 'Our products',
                services: 'Our services',
                description: 'Description',
                find: 'Find your locations in:',
                latestReviews: 'Latest reviews',
                map: 'Map'
              },
              search: {
                placeholder: 'Shop name, city, etc.'
              },
              footer: {
                legals: 'Legals',
                cookie: 'Personal data & cookies'
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
              location: {
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
              location: {
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
