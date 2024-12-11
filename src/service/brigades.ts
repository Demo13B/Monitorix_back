import { brigade, brigadeDB, brigadeInput } from "models/objects";
import { BrigadeRepository } from "repository/brigades";
import { FacilitiesRepository } from "repository/facilities";

export class BrigadesService {
    private readonly _repo: BrigadeRepository;
    private readonly _facRepo: FacilitiesRepository;

    constructor(repo: BrigadeRepository, facRepo: FacilitiesRepository) {
        this._repo = repo;
        this._facRepo = facRepo;
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

    public insert = async (brig: brigadeInput) => {
        let id: number | null;

        try {
            id = await this._facRepo.readByName(brig.facility_name);
        } catch (error) {
            throw error;
        }

        if (id === null) {
            return false
        }


        let brigDB: brigadeDB = {
            name: brig.name,
            facility_id: id
        };

        try {
            await this._repo.writeBrigade(brigDB);
        } catch (error) {
            throw error;
        }

        return true;
    }
};