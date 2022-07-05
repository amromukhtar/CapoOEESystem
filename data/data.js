const getProductNo = (machineNo, productNo) => {
    let prodNo;
    if (machineNo == '0') {
        switch (productNo) {
            case '3':
                prodNo = '2'
                break;
            default:
                prodNo = productNo;
                break;
        }
    }
    else if (machineNo == '3') {
        switch (productNo) {
            case '3':
            case '4':
            case '5':
            case '6':
                prodNo = '2'
                break;
            default:
                prodNo = productNo;
                break;
        }
    }
    else if (machineNo == '4') {
        switch (productNo) {
            case '3':
            case '4':
            case '5':
                prodNo = '2';
                break;
            case '6':
            case '7':
            case '8':
            case '9':
            case '10':
                prodNo = '3';
                break;
            case '11':
            case '12':
                prodNo = '4';
                break;
            default:
                prodNo = productNo;
                break;
        }
    }
    else prodNo = productNo;

    return prodNo;
}

module.exports = {
    machine: ['Simply 8', 'TFA A1 200', 'TFA A1 500', 'TCA'],
    machine_id: ['Simply_8', 'TFA_A1_200', 'TFA_A1_500', 'TCA'],
    batchName: ['batch1', 'batch2', 'batch3', 'batch4'],
    product: {
        Simply_8: ['Full cream milk', 'Sweetened milk', 'Low fat milk', 'Skimmed milk', 'Lactose free milk', 'Whipping cream', 'Date milk', 'Muganan plain milk', 'Muganan sweetend milk', 'Rio mango juice', 'Rio pineapple juice', 'Rio guava juice', 'Rio tamarind juice', 'Rio hibiscus juice', 'Rio baobab juice', 'Rio vimto juice'],
        TFA_A1_200: ['Full cream milk', 'Sweetened milk', 'Yomi sweetened milk', '90ml yomi sweetened'],
        TFA_A1_500: ['Full cream milk', 'Sweetened milk', 'Yomi sweetened milk'],
        TCA: ['Bibo Red cocktail', 'Bibo mango', 'Bibo pineapple ', 'Bibo vimto', 'Capo strawberry', 'Capo chocolate'],
    },
    image: {
        Simply_8: ['full_cream_milk', 'sweetened1L', 'low_fat1L', 'skimmed_milk', 'lactose_free', 'whipping_cream', 'date_milk', 'plain_milk', 'sweetend_milk', 'capo_mango', 'capo_pineapple', 'rio_guava', 'rio_tamarind', 'rio_hibiscus', 'rio_baobab', 'capo_vimto'],
        TFA_A1_200: ['full_cream_180', 'sweetened_180', 'yomi_180', 'yomi_180'],
        TFA_A1_500: ['full_cream_450', 'sweetened_450', 'yomi_450'],
        TCA: ['capo_cocktail', 'capo_mango', 'capo_pineapple', 'capo_vimto', 'capo_strawberry', 'capo_chocolate'],
    },
    getProductNo: getProductNo
}