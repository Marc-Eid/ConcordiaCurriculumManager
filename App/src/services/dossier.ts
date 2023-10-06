//this file is to define Dossier related types and apis.

import axios from "axios";

export interface DossierDTO {
    id: string;
    initiatorId: string;
    title: string | null;
    description: string | null;
    published: boolean;
}

export interface GetMyDossiersResponse {
    data: DossierDTO[];
}

export interface CreateDossierDTO {
    title: string | null;
    description: string | null;
}

//api calls with axios function style
export function getMyDossiers(): Promise<GetMyDossiersResponse> {
    return axios.get("/Dossier/GetDossiersByID");
}

export function createDossierForUser(dto: CreateDossierDTO): Promise<DossierDTO> {
    return axios.post("/Dossier/CreateDossierForUser", dto);
}
