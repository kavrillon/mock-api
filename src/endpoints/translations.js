import fs from 'fs';

export function generate(destination) {
  const folder = `${destination}/translations`;
  const objects = [
    {
      locale: 'fr',
      translations: {
        home: {
          title: 'Page de recherche',
          search: 'Trouver un point de vente',
          more: 'Afficher plus de résultats'
        },
        business: {
          latestReviews: 'Derniers avis',
          map: 'Carte'
        }
      }
    },
    {
      locale: 'en',
      translations: {
        home: {
          title: 'Search page',
          search: 'Find a shop',
          more: 'Show more results'
        },
        business: {
          latestReviews: 'Latest reviews',
          map: 'Map'
        }
      }
    },
    {
      locale: 'es',
      translations: {
        home: {
          title: 'Página de búsqueda',
          search: 'Encuentra una tienda',
          more: 'Mostrar más resultados'
        },
        business: {
          latestReviews: 'Últimas revisiones',
          map: 'Mapa'
        }
      }
    },
    {
      locale: 'ar',
      translations: {
        home: {
          title: 'صفحة البحث',
          search: 'العثور على نقطة البيع',
          more: 'عرض المزيد من النتائج'
        },
        business: {
          latestReviews: 'أحدث الاستعراضات',
          map: 'خريطة'
        }
      }
    }
  ];

  fs.mkdirSync(folder);
  objects.forEach(o => {
    fs.writeFileSync(
      `${folder}/${o.locale}.json`,
      JSON.stringify({ translation: o.translations }),
      () => {}
    );
  });
}
