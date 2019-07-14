interface Read<T> {
  fetch: (condition: any) => Promise<T>;
  findById: (id: string) => Promise<T>;
  findByCriteria: (criteria: any) => Promise<T>;
}
export = Read;
