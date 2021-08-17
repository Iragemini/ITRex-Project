import { Queue } from './inMemory/queue.storage.js';
import { Patients } from './inMemory/resolution.storage.js';

export const queue = new Queue();
export const patients = new Patients();
