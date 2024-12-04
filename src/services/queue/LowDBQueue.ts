import path from 'path';
import jiti from 'jiti';
import { Queue } from './Queue';

export class LowDBQueue<T> implements Queue<T> {
  protected db: any;

  constructor(fileName: string) {
    this.initialize(fileName);
  }

  private async initialize(fileName: string): Promise<void> {
    const _require = jiti.createJiti(__dirname);
    const { Low } = _require('lowdb');
    const { JSONFile } = _require('lowdb/node');

    const filePath = path.join(__dirname, fileName);

    const adapter = new JSONFile(filePath);
    this.db = new Low(adapter, { queue: [] });
    await this.db.read();
  }

  async enqueue(item: T): Promise<void> {
    await this.db.read();
    this.db.data!.queue.push(item);
    await this.db.write();
  }

  async dequeue(): Promise<T | null> {
    await this.db.read();
    const item = this.db.data!.queue.shift() || null;
    if(item) {
        await this.db.write();   
    }
    return item;
  }

  async process(handler: (item: T) => Promise<void>): Promise<void> {
      const item = await this.dequeue();
      if (item) {
        try {
          await handler(item);
          console.log(`Processed item:`, item);
        } catch (error) {
          console.error('Error processing item:', item, error);
          await this.enqueue(item);
        }
      }
  }
}
