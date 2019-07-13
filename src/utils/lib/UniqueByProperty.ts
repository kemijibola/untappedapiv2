
export const UniqueValuesByProp = (property: string) => (arr: any[]) =>
Array.from(
  arr
    .reduce(
      (acc: any, item: any) => (
        item && item[property] && acc.set(item[property], item),
        acc
      ),
      new Map()
    )
    .values()
);


export const UniqueValues = (arr: any[]) =>
Array.from(
  arr.reduce(
    (acc: any, item: any) => (
      item && acc.set(item),
      acc
    ),
    new Map()
  )
  .values()
);
// const uniqueById = UniqueValuesByProp("id");

// const unifiedArray = uniqueById(arrayWithDuplicates);