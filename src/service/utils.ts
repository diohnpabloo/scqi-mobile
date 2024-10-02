export function formateData(dateNumber: number) {
    const dateString = dateNumber.toString()
    const day = dateString.slice(0, 2)
    const month = dateString.slice(2, 4)
    const year = dateString.slice(4, 8)

    return `${day}/${month}/${year}`
}