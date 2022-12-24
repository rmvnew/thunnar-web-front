


export const getDateBr = (currentDate: Date) => {

    const date = new Date(currentDate)

    let day = `${date.getDate()}`.length == 1 ? `0${date.getDate()}` : `${date.getDate()}`
    let month = `${date.getMonth() + 1}`.length == 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
    let year = date.getFullYear()
    

    return `${day}/${month}/${year}`


}