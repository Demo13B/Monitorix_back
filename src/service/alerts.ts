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

    public findStats = async (code: number) => {
        try {
            if (code === 1)
                return await this._repo.readStatsByUser();

            if (code === 2)
                return await this._repo.readStatsByBrigade();

            if (code === 3)
                return await this._repo.readStatsByFacility();
        } catch (error) {
            throw error;
        }
    };

    public remove = async (login: string) => {
        let status: boolean;

        try {
            status = await this._repo.deleteByLogin(login);
        } catch (error) {
            throw error;
        }

        return status;
    }
};