import { brigade } from "models/objects";
import { BrigadeRepository } from "repository/brigades";

export class BrigadesService {
    private readonly _repo: BrigadeRepository;

    constructor(repo: BrigadeRepository) {
        this._repo = repo;
    }

    public findBrigades = async () => {
        let brigades: brigade[];
        try {
            brigades = await this._repo.readAll();
        } catch (error) {
            throw error;
        }
        return brigades;
    }
};