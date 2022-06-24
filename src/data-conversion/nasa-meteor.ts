const meteorDetails = [
  'year',
  'reclat',
  'reclong',
  'geolocation',
];
const nasaMeteor = (data: any[]) => {
  const config = data
    .sort((a: any, b: any) => Number(b.mass) - Number(a.mass))
    .slice(0, 100)
    .map((e, i) => {
      const x = (i * 50) % 900;
      const y = Math.floor(i / 15) * 15 + 90;
      const size = (i < 3) ? 80 : 40;
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
