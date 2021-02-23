export interface CheckoutItem {
    barcode?: string,
    name?: string,
    nameInArabic?: string,
    category?: string,
    discount?:number ,
    quantity?:number,
    mrp?: number,
    price?: number,
    tax?: string,
    inventory?: number,
    unit?: string
    id?: string,
    total?:number,
    inEx?:any
}