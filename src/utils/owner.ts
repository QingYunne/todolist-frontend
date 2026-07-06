const OWNER_ID_KEY: string = "owner_id";

function uuidv4(): string {
    return crypto.randomUUID()
}

export function getOwnerId(): string {
    let id = localStorage.getItem(OWNER_ID_KEY)
    if (!id) {
        id = uuidv4();
        localStorage.setItem(OWNER_ID_KEY, id)
    }
    return id;
}

export function newOwnerId(): string {
    const id = uuidv4()
    localStorage.setItem(OWNER_ID_KEY, id)
    return id
}

