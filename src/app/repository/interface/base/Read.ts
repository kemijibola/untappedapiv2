interface Read<T> {
  fetch: () => Promise<T>;
  findById: (id: string) => Promise<T>;
  findByCriteria: (criteria: any) => Promise<T>;
}
export = Read;
