import { facility } from "models/objects";
import { FacilitiesRepository } from "repository/facilities";

export class FacilitiesService {
    private readonly _repo: FacilitiesRepository;

    constructor(repo: FacilitiesRepository) {
        this._repo = repo;
    };

    public findAll = async () => {
        let res: facility[];

        try {
            res = await this._repo.readAll();
        } catch (error) {
            throw error;
        }

        return res;
    }

    public insert = async (fac: facility) => {
        try {
            await this._repo.writeFacility(fac);
        } catch (error) {
            throw error;
        }
    }

    public remove = async (name: string) => {
        let status: boolean;

        try {
            status = await this._repo.deleteFacility(name);
        } catch (error) {
            throw error;
        }

        return status;
    }
};