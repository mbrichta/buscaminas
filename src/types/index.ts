export enum CellValue {
    none,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    bomb
};

export enum CellState {
    open,
    visible,
    flagged
};

export type CellType = {
    value: CellValue;
    state: CellState;
    red?: boolean | undefined;
};

export enum FaceEmoji {
    smiling = '😊',
    surprised = '😮',
    dead = '😵',
    win = '😎'
}