import fs from 'fs';
import faker from 'faker';
import { getRandomInRange } from '../lib/numbers';

const NB_REVIEWS = 50;
const SHOP_IDS = [409, 361, 326, 285];

export function generate(destination) {
  const folder = `${destination}/reviews`;

  const objects = Array(NB_REVIEWS)
    .fill()
    .map((_, i) => ({
      answer: faker.random.boolean()
        ? faker.lorem.sentences(getRandomInRange(1, 6, false))
        : null,
      comment: faker.lorem.sentences(getRandomInRange(1, 6, false)),
      date: faker.date.past(),
      id: i + 1,
      grade: Math.floor(Math.random() * 5) + 1,
      name: faker.fake('{{name.firstName}} {{name.lastName}}'),
      shopId: SHOP_IDS[getRandomInRange(0, 3, false)]
    }));

  fs.mkdirSync(folder);
  fs.writeFileSync(`${folder}/list.json`, JSON.stringify(objects), () => {});

  objects.forEach(o => {
    fs.writeFileSync(`${folder}/${o.id}.json`, JSON.stringify(o), () => {});
  });
}
