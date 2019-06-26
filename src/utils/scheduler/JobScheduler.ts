export interface Scheduler {
  queueName: string;
  createJob<T, K>(data: T, options?: K): void;
  processJob(): void;
}

export class JobScheduler {
  constructor(scheduler: Scheduler) {}
}
