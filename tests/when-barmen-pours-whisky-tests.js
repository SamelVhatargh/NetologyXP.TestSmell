let assert = require('assert');
let expect = require('chai').expect;
let Barmen = require('../src/barmen');
let Visitor = require('../src/visitor');
let ImageDownloader = require('../src/image-downloader');
let fs = require('fs');
let username = require('username');

function createTestCar()
{
    //здесь создаем тестовую машинку, без необходимости скачивания картинки

    //как именно создаем завист от внутреностей visitor.getMyCar() и visitor.goToBar()

    //Другим вариантом можно было бы подменить ImageDownloader, чтобы он всегда
    //возвращал какую-то конретную картинку без необходимости скачивания
}

suite('when barmen pours whisky', function () {
    let barmen = new Barmen();
    let me = new Visitor();

    setup(function (done) {
        me.sober();
        let car = createTestCar();
        me.goToBar(car);
        barmen.free();

        done();
    });

    suite('i ask 50 grams', function () {
        test('I get and drink whisky', function (done) {
            fs.readFile('whisky.jpg', function (err, whisky) {
                if (err) {
                    done(err);
                }

                let iAskVolume = 50;

                let volumeInGlass = barmen.pour(whisky, iAskVolume);
                me.drink(volumeInGlass);

                assert.equal(iAskVolume, volumeInGlass);
                assert.equal(false, me.isDrunk());
                assert.equal(50, me.getTotallyDrunk());

                done();
            });
        });
    });

    suite('i ask -10 grams', function () {
        test('I get an error', function (done) {
            fs.readFile('whisky.jpg', function (err, whisky) {
                if (err) {
                    done(err);
                }

                let iAskVolume = -10;

                expect(() => barmen.pour(whisky, iAskVolume)).to.throw(/Invalid volume of whisky/);
                done();
            });
        });
    });

    suite('i ask 500 grams', function () {
        test('Barmen said there is no such glass', function (done) {

            username().then(un => {
                console.log(un);

                if (un === "dpavlov") {
                    let iAskVolume = 500;
                    let whisky = 1;

                    expect(() => barmen.pour(whisky, iAskVolume)).to.throw(/There is no such glass/);
                    done();

                    return;
                }

                done();
            });
        })
    });

    teardown(function () {

    })
});