import fs from 'fs';

const NB_BUSINESSES = 500;

export function generate(destination) {  
  const folder = `${destination}/businesses`;
  const objects = Array(NB_BUSINESSES).fill().map((_, i) => {
    const id = i + 1;

    const reviews = Array(Math.floor(Math.random() * 10)).fill().map((_, j) => ({
      grade: Math.floor(Math.random() * 5) + 1,
      name: `Reviewer ${j+1}`,
      comment: `Comment for reviewer ${j+1} (business ${id})`
    }));
    
    return {
      id,
      name: `Bismock ${id}`,
      slug: `bismock-${id}`,
      address: `${id} business road, 1337 Mock`,
      position: { lat: getRandomInRange(-180, 180, 3), lng: getRandomInRange(-180, 180, 3)},
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