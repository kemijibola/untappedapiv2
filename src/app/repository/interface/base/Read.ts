interface Read<T> {
  fetch: () => Promise<T>;
  findById: (id: string) => Promise<T>;
}
export = Read;
