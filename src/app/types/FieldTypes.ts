export interface IValueField {
    wasShot: boolean
    value: '.' | '#'
}

export type TField = Array<Array<IValueField>>
