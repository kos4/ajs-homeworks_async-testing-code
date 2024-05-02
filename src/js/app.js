import read from './Modules/reader';
import json from './Modules/parser';

export default async function app() {
  const data = await read();

  if (data.length === 0) {
    throw new Error('Данные не пришли.');
  } else {
    const value = await json(data);

    return value;
  }
}
