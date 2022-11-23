const getTotalRegisters = async (dbCollection) => {
    return await dbCollection.countDocuments().exec();
};

const getErrorObject = (text) => {
    return {
        ok: false,
        msg: text
    };
};

const getErrorMessage = (text) => {
    return { error: text };
};

const checkValidValues = (values) => {
    let isEmpty = 0;
    for (let i = 0; i < values.length; i++) {
        if (values[i].trim().length === 0) {
            isEmpty++;
        }
    }
    return isEmpty === 0 ? true : false;
};

module.exports={
    getTotalRegisters, 
    getErrorObject, 
    getErrorMessage, 
    checkValidValues
};