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

function createTestWhisky()
{
    //Возвращает виски без необходимости тянуть файл

    //Конкретня реализация зависит от barmen.pour()

    //Сейчас drink там тупо игнорится поэтому можно тоже тупо возвращать строку
    return 'whisky';
}

suite('when barmen pours whisky', function () {
    let barmen = new Barmen();
    let me = new Visitor();
    let whisky = createTestWhisky();

    setup(function (done) {
        me.sober();
        let car = createTestCar();
        me.goToBar(car);
        barmen.free();

        done();
    });

    suite('I ask 50 grams of whisky', function () {
        test('I get 50 grams of whisky', function (done) {
            let iAskVolume = 50;

            let volumeInGlass = barmen.pour(whisky, iAskVolume);

            assert.equal(iAskVolume, volumeInGlass);

            done();
        });
    });

    suite('I drink 50 grams of whisky', function () {
        test('I did not get drunk', function (done) {
            let drinkVolume = 50;

            me.drink(drinkVolume);

            assert.equal(false, me.isDrunk());

            done();
        });
    });

    suite('I ask -10 grams', function () {
        test('Barmen rejects with reason: Invalid volume of whisky', function (done) {
            let iAskVolume = -10;

            //Вроде бы говорили о том что Act и Assert должны быть на разных строчках - здесь не так
            //Но здесь тестируется исключение, и возможно в js просто нельзя сделать по другому
            //Не уверен
            expect(() => barmen.pour(whisky, iAskVolume)).to.throw(/Invalid volume of whisky/);

            done();
        });
    });

    suite('I ask 500 grams', function () {
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