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
            const visit = JSON.parse(data);
            
            // Ensure socialClicks exists
            if (!visit.socialClicks) {
                visit.socialClicks = {
                    youtube: 0,
                    instagram: 0,
                    twitch: 0
                };
            }
            
            return visit;
        } catch (error) {
            // If file doesn't exist, return initial state
            return {
                totalVisits: 0,
                uniqueVisits: 0,
                lastVisit: new Date().toISOString(),
                socialClicks: {
                    youtube: 0,
                    instagram: 0,
                    twitch: 0
                }
            };
        }
    }

    async saveVisit(visit: Visit): Promise<void> {
        // Ensure data directory exists
        await fs.mkdir(path.dirname(this.filePath), { recursive: true });
        await fs.writeFile(this.filePath, JSON.stringify(visit, null, 2));
    }
} 