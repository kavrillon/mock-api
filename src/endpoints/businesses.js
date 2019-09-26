import fs from 'fs';
import faker from 'faker';
import slugify from 'slugify';

const NB_BUSINESSES = 200;
const SLUGIFY_CONF = {lower: true};

export function generate(destination) {
  const folder = `${destination}/businesses`;
  const brand = faker.company.companyName(0);
  const objects = Array(NB_BUSINESSES).fill().map((_, i) => {
  const id = i + 1;

  const reviews = Array(Math.floor(Math.random() * 10)).fill().map((_, j) => ({
    grade: Math.floor(Math.random() * 5) + 1,
    name: faker.fake('{{name.firstName}} {{name.lastName}}'),
    comment: faker.lorem.sentence()
  }));

  const city = faker.address.city();
  const country = faker.address.country();
  const lat = parseFloat(faker.address.latitude());
  const lng = parseFloat(faker.address.longitude());
  return {
    id,
    name: `${brand} ${city}`,
    slug: slugify(`${brand} ${city}`, SLUGIFY_CONF),
    address: {
      country: country,
      city,
      zip: faker.address.zipCode(),
      street: faker.fake('{{random.number}} {{address.streetName}} {{address.streetSuffix}}')
    },
    position: { lat: lat, lng: lng},
    grade: reviews.reduce((acc, value) => acc + value.grade, 0)/reviews.length,
    reviews,
  }
  });
  
  fs.mkdirSync(folder);
  fs.writeFileSync(`${folder}/list.json`, JSON.stringify(objects), () => {});

  objects.forEach((o) => {
    fs.writeFileSync(`${folder}/${o.id}.json`, JSON.stringify(o), () => {});
  });
}

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
