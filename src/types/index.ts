export enum CellValue {
    none,
    one,
    two,
    three,
    four,
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
    state: CellState
};

export enum FaceEmoji {
    smiling = '😊',
    surprised = '😮',
    dead = '😵',
    win = '😎'
}