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
};