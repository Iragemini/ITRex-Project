import { Storage } from '../Storage.js';

class Queue extends Storage {
    async getCurrentKey() {
        return Object.keys(this.storage[0])[0];
    }
}

const queue = new Queue();

export default queue;
