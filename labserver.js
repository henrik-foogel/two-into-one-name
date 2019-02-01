const fs = require('fs');
const http = require('http');

var options = {
    encoding: 'utf8',
    flag: 'r'
};
var optionsTwo = {encoding: 'utf8', flag: 'w'};

var firstFile = fs.readFile('./one.txt', options, (err, data) => {
    if(err) {
        console.error(err)
    } else {
        console.log(data)
    }
    var secondFile = fs.readFile('./two.txt', options, (err, data2) => {
        if(err) {
            console.error(err)
        } else {
            console.log(data2);
        }
        fs.writeFile('three.txt', data+data2, optionsTwo, (err) => {
            if(err) {
                console.error(err)
            } else {
                console.log('Filen är sparad')
            }

            var thirdFile = fs.readFile('./three.txt', options, (err, data3) => {
                if(err) {
                    console.error(err)
                } else {
                    console.log(data3);
                }
                const webbserver = http.createServer((req, res) => {
                        res.write(data3)
                        res.end();
                });
                
                webbserver.listen(3000, () => {
                    console.log('Server is up on 3000')
                });
            })
        });
    })
});



