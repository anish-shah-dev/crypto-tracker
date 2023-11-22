const numberWithCommas = (x) => {
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return USDollar.format(x);
}

export {
    numberWithCommas 
}