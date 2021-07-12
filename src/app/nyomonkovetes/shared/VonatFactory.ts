import { Vonat } from "./vonat";

export class VonatFactory {

    static convertRawToVonat(raw: Vonat): Vonat {
        return {
            ...raw,
            erkIdo: new Date(raw.erkIdo),
            tervIdo: new Date(raw.tervIdo)
        }
    }

}