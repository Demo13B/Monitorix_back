import { alert } from "models/objects";
import { AlertsRepository } from "repository/alerts";

export class AlertsService {
    private readonly _repo: AlertsRepository;

    constructor(repo: AlertsRepository) {
        this._repo = repo;
    }

    public findAlerts = async (user_id: string, brigade_id: string, access_rights: number) => {
        let res: alert[];

        if (access_rights === 1) {
            try {
                res = await this._repo.readByID(user_id);
            } catch (error) {
                throw error;
            }
            return res;
        }

        if (access_rights === 2) {
            try {
                res = await this._repo.readByBrigade(brigade_id);
            } catch (error) {
                throw error;
            }
            return res;
        }

        if (access_rights === 3) {
            try {
                res = await this._repo.readAll();
            } catch (error) {
                throw error;
            }
            return res;
        }

        return null;
    };
};