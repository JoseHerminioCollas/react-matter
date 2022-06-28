const meteorDetails = [
  'year',
  'reclat',
  'reclong',
  'geolocation',
  'recclass',
];

const nasaMeteor = (data: any[]) => {
  const config = data
    .sort((a: any, b: any) => Number(b.mass) - Number(a.mass))
    .slice(0, 100)
    .map((e, i) => {
      const x = 0;
      const y = 0;
      const size = (i < 3) ? 75 : 30;
      const rand = Math.round(Math.random() * 5 + 10).toString(16);
      const color = `#${rand}${rand}${rand}`;

      return {
        id: i,
        name: e.name,
        mass: `${e.mass} (g)`,
        details: Object
          .entries(e)
          .filter(([k, v]) => meteorDetails.includes(k))
          .reduce((acc, v) => {
            const key = v[0];
            let value: any = v[1];
            if (key === 'year') value = new Date(value).toDateString();
            if (key === 'geolocation') {
              value = `  ${value.coordinates[0]}, ${value.coordinates[1]}`;
            }
            if (key === 'mass') value = `${value} (g)`;
            return { ...acc, [key]: value };
          }, {}),
        x,
        y,
        size,
        color,
        lineWidth: 2,
      };
    });

  return config;
};

export default nasaMeteor;
