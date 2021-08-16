import { Queue } from '../queue/queue.storage.js';
import { Patients } from '../resolution/resolution.storage.js';

export const queue = new Queue();
export const patients = new Patients();
