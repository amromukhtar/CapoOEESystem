const getProductNo = (machineNo, productNo) => {
    let prodNo;
    if (machineNo == '3') {
        switch (productNo) {
            case '3':
            case '4':
            case '5':
                prodNo = '2'
                break;
            default:
                prodNo = productNo;
                break;
        }
    }
    else if (machineNo == '4') {
        switch (productNo) {
            case '5':
            case '6':
            case '7':
                prodNo = '4';
                break;
            case '8':
            case '9':
                prodNo = '5';
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
    machine: ['Trepko A', 'Trepko B', 'Trepko C', 'Erca A', 'Erca B', 'NovaPak'],
    machine_id: ['Trepko_A', 'Trepko_B', 'Trepko_C', 'Erca_A', 'Erca_B', 'NovaPak'],
    batchName: ['batch1', 'batch2', 'batch3', 'batch4', 'batch5', 'batch6'],
    product: {
        Trepko_A: ['Natural', 'Set', 'Delights Custard', 'Delights Chocolate', 'Millet Madida', 'Hilba Madida', 'Date & Millet Madida'],
        Trepko_B: ['Natural', 'Set'],
        Trepko_C: ['Natural', 'Set'],
        Erca_A: ['Natural', 'Set', 'Flavor Straw', 'Flavor Mongo', 'Flavor Vanila', 'Flavor Coconut'],
        Erca_B: ['Natural', 'Set', 'Delights Custard', 'Delights Chocolate', 'Flavor Straw', 'Flavor Mongo', 'Flavor Vanila', 'Flavor Coconut', 'Fruit Straw', 'Fruit Pineapp'],
        NovaPak: ['Mish'],
    },
    image: {
        Trepko_A: ['natural_AB', 'set_AB', 'delights_custard', 'delights_chocolate', 'millet_madida', 'hilba_madida', 'date_millet_madida'],
        Trepko_B: ['natural_AB', 'set_AB'],
        Trepko_C: ['natural_C', 'set_C'],
        Erca_A: ['natural', 'set-yoghurt', 'flavor_straw', 'flavor_mongo', 'flavor_vanila', 'flavor_coconut'],
        Erca_B: ['natural', 'set-yoghur', 'delights_custard', 'delights_chocolate', 'flavor_straw', 'flavor_mongo', 'flavor_vanila', 'flavor_coconut', 'fruit_straw', 'fruit_pineapp'],
        NovaPak: ['mish'],
    },
    getProductNo: getProductNo
}