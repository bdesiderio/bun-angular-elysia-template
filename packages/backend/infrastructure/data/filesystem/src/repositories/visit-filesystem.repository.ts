import { IVisitRepository, Visit } from 'app-core';
import { promises as fs } from 'fs';
import { injectable } from 'inversify';
import path from 'path';

@injectable()
export class VisitRepository implements IVisitRepository {
    private readonly filePath: string;

    constructor() {
        this.filePath = path.join(process.cwd(), 'data', 'visits.json');
    }

    async update(entity: Visit): Promise<void> {
        // Ensure data directory exists
        await fs.mkdir(path.dirname(this.filePath), { recursive: true });
        await fs.writeFile(this.filePath, JSON.stringify(entity, null, 2));
    }

    async getAll(): Promise<Visit> {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // If file doesn't exist, return initial state
            return {
                totalVisits: 0,
                lastVisit: new Date().toISOString()
            };
        }
    }

    async saveVisit(visit: Visit): Promise<void> {
        // Ensure data directory exists
        await fs.mkdir(path.dirname(this.filePath), { recursive: true });
        await fs.writeFile(this.filePath, JSON.stringify(visit, null, 2));
    }
} 