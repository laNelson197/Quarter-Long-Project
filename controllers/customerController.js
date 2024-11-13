const customers = [
    "John Doe",
    "Jane Doe",
    "Rick Grimes",
    "Lori Grimes",
    "Carl Grimes",
    "Judith Grimes",
    "RJ Grimes",
    "Glen Green",
    "Maggie Green",
    "Hershal Green"
];

export const getCust = async (req, res) => {
    res.status(200).send({
        customers
    })
}
export const getCustByName = (req, res) => {

}

export const addCust = (req, res) => {

}

export const updateCust = (req, res) => {
    
}

export const delCust = (req, res) => {

}