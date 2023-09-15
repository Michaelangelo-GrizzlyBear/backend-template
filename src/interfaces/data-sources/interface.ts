export interface IDeletedDocument {
    deleted_count: number,
}

export interface IDataSource {
    truncate: () => Promise<IDeletedDocument>,
}
