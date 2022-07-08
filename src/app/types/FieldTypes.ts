export interface IFieldCell {
    wasShot: boolean
    value: '.' | '#'
}

export type TField = Array<Array<IFieldCell>>
