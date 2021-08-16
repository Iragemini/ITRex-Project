import { Storage } from './Storage.js';

export class Queue extends Storage {
    async getCurrentKey() {
        return Object.keys(this.storage[0])[0];
    }

    async getNameByIndex(index) {
        return Object.keys(this.storage[index])[0];
    }
}

