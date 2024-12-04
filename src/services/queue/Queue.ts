export interface Queue<T> {
  enqueue(item: T): Promise<void>;
  dequeue(): Promise<T | null>;
  process(handler: (item: T) => Promise<void>): Promise<void>;
}
