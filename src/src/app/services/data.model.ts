export class DBInBoundData {
    error: boolean | undefined;
    statusCode: number | undefined; // 0 initial, 1 saved, 2 others
    statusMessage!: string; // error or success message from server
    // error or success message from server
    rowCount: number | undefined; // number of rows returned
    data: any | undefined; // actual data
}

export class DBOutBoundData {
    rowCount: number | undefined;
    recordType: string | undefined;
    data: any;
}