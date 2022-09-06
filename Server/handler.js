const cart = require('./cart');
const fs = require('fs');

const actions = {
    add: cart.add,
    change: cart.change
};

//Handler отвечает за изменения данных в самом файле
let handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            let newCart = action[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({ result: 0, text: err }))
                } else {
                    res.send(JSON.stringify({ result: 1 }))
                }
            })
        }
    })
};

module.exports = handler;