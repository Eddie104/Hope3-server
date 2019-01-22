// const fs = require('fs');
// const path = require('path');
const Controller = require('../core/baseController');

class HomeController extends Controller {
    async index() {
        this.success('hi, welcome to HOPE3!');
    }

    async test() {
        /*
        const goodsArr = await this.ctx.model.Goods.find({
            goods_type_id: { $exists: false },
        }, { goods_color_id: 1 });
        let goodsColor = null;
        for (let i = 0; i < goodsArr.length; i++) {
            goodsColor = await this.ctx.model.GoodsColor.findOne({ _id: goodsArr[i].goods_color_id }, { goods_type_id: 1 });
            if (goodsColor) {
                await this.ctx.model.Goods.update({
                    _id: goodsArr[i]._id,
                }, {
                    $set: {
                        goods_type_id: goodsColor.goods_type_id,
                    },
                });
                console.log(`${i}/${goodsArr.length}`);
            }
        }
        */

        /*
        const goodsColorArr = await this.ctx.model.GoodsColor.find({}, { goods_type_id: 1 });
        let goodsType;
        for (let index = 0; index < goodsColorArr.length; index++) {
            console.log(`${index}/${goodsColorArr.length}`);
            goodsType = await this.ctx.model.GoodsType.findOne({ _id: goodsColorArr[index].goods_type_id }, { name: 1 });
            if (goodsType) {
                await this.ctx.model.GoodsColor.update({ _id: goodsColorArr[index]._id }, { $set: { name: goodsType.name } });
            } else {
                console.log(goodsColorArr[index]);
            }
        }
        */

        // const goodsTypeArr = await this.ctx.model.GoodsType.find({ is_deleted: false }, { goods_color_arr: 1 });
        // for (let i = 0; i < goodsTypeArr.length; i++) {
        //     await this.ctx.model.GoodsColor.update({
        //         _id: { $in: goodsTypeArr[i].goods_color_arr },
        //     }, {
        //         $set: {
        //             goods_type_id: goodsTypeArr[i]._id,
        //         },
        //     }, { multi: true });
        //     console.log(`${i}/${goodsTypeArr.length}`);
        // }

        // const goodsColorArr = await this.ctx.model.GoodsColor.find({ goods_type_id: null });
        // let goodsType = null;
        // for (let i = 0; i < goodsColorArr.length; i++) {
        //     goodsType = await this.ctx.model.GoodsType.findOne({ goods_color_arr: goodsColorArr[i]._id });
        //     if (goodsType) {
        //         await this.ctx.model.GoodsColor.update({
        //             _id: goodsColorArr[i]._id,
        //         }, {
        //             $set: {
        //                 goods_type_id: goodsType._id,
        //             },
        //         });
        //     }
        // }
        // const goodsTypeIdArr = [
        //     // '5adac8a4d4d146356a2dda00', '5ad343a07481447cd799bc65', '5adac8a4d4d146356a2dda00', '5b27800daf99ea7cbec8259a', '5ba49728a0af7a5a45dc46e7', '5b27800daf99ea7cbec8259a', '5ba396e5a0af7a5a45dc0e26', '5ba396e5a0af7a5a45dc0e26', '5b7a8d74d7050f0551d6b9bf', '5ad346d77481447cd799bdd7', '5ba3a5d9a0af7a5a45dc12d3', '5ad35b467481447cd799e24d', '5ad353607481447cd799d735', '5ad3525e7481447cd799d61e', '5ad346d77481447cd799bdd7', '5b5c47f7b3db8a711ad387e8', '5ba4405ea0af7a5a45dc1728', '5ba4405ea0af7a5a45dc1728', '5ba78f9ba0af7a5a45dc91eb', '5b7e16d2d7050f0551d6c68a', '5b7e824ed7050f0551d6db30', '5b7e16d2d7050f0551d6c68a', '5ad352687481447cd799d629', '5ad35be77481447cd799e290', '5ad352687481447cd799d629', '5ba449dba0af7a5a45dc1e17', '5ba449dba0af7a5a45dc1e17', '5ba449eda0af7a5a45dc1e42', '5ad344307481447cd799bcbd', '5ad344307481447cd799bcbd', '5ad357ba7481447cd799d8ae', '5ad357ab7481447cd799d8a1', '5ad345c17481447cd799bd46', '5ad345c17481447cd799bd46', '5ad366757481447cd799e92f', '5ad368057481447cd799ea08', '5ad358857481447cd799d92b', '5ad35aa87481447cd799e21a', '5ad35aa87481447cd799e21a', '5ae819f07e5cce53d58fa527', '5ad345b77481447cd799bd40', '5ad345b77481447cd799bd40', '5ad350867481447cd799d52a', '5ba79dc4a0af7a5a45dc97b3', '5ad3500d7481447cd799d4a6', '5ba79dc4a0af7a5a45dc97b3', '5ad343c67481447cd799bc82', '5ba4507ea0af7a5a45dc234e', '5ba450efa0af7a5a45dc2413', '5ad343c67481447cd799bc82', '5ad346e07481447cd799bde2', '5ad357017481447cd799d81e', '5b7e6214d7050f0551d6cf25', '5ad343c67481447cd799bc82', '5ad362337481447cd799e50f', '5ad343c67481447cd799bc82', '5ad344307481447cd799bcbd', '5ad344307481447cd799bcbd', '5ad344647481447cd799bce7', '5ad3589f7481447cd799d93c', '5ad358e87481447cd799d94b', '5ad3589f7481447cd799d93c', '5ad345c17481447cd799bd46', '5ba45c77a0af7a5a45dc2eb3', '5ad345c17481447cd799bd46', '5adbf51093e4be36d6a0584a', '5ba47607a0af7a5a45dc4301', '5adbf51093e4be36d6a0584a', '5b5426f52769bd65f7d659a2', '5ba4a6fca0af7a5a45dc53c8', '5b5426f52769bd65f7d659a2', '5ad351fc7481447cd799d5f5', '5ba4c282a0af7a5a45dc6e30', '5ba4c2b2a0af7a5a45dc6e6f', '5ba4c2bba0af7a5a45dc6e7e', '5ad351fc7481447cd799d5f5', '5b5303a2af53340c390fc6f4', '5b7d2049d7050f0551d6c4ee', '5b3a35274f09b2791cc59965', '5b5303a2af53340c390fc6f4', '5ad358f37481447cd799d953', '5ba4a09ba0af7a5a45dc4c40', '5ba4a0aba0af7a5a45dc4c56', '5ad358f37481447cd799d953', '5ad35ffc7481447cd799e436', '5ad358637481447cd799d918', '5ad369697481447cd799eaff', '5ad360137481447cd799e43a', '5ad367987481447cd799e9d6', '5ba497c4a0af7a5a45dc4769', '5ba4979fa0af7a5a45dc473c', '5ba497c4a0af7a5a45dc4769', '5ad358f37481447cd799d953', '5ba4a067a0af7a5a45dc4bd5', '5ad358f37481447cd799d953', '5ad35e0c7481447cd799e3c4', '5ad35e0c7481447cd799e3c4', '5ad35fab7481447cd799e421', '5ad367827481447cd799e9ce', '5ad35fb77481447cd799e425', '5ad367a87481447cd799e9e0', '5ad346907481447cd799bdae', '5ba4a2a4a0af7a5a45dc4e99', '5ba4a2b4a0af7a5a45dc4eaf', '5ba4a2cca0af7a5a45dc4eef', '5ba4a2e4a0af7a5a45dc4f05', '5ad357317481447cd799d83f', '5ad3661a7481447cd799e916', '5ad357877481447cd799d882', '5ad3575a7481447cd799d85c', '5ad3538b7481447cd799d770', '5ad346907481447cd799bdae', '5ad363f67481447cd799e641', '5b7d0b13d7050f0551d6bfa5', '5ba4a1cca0af7a5a45dc4dac', '5ba4a17aa0af7a5a45dc4d5e', '5ba4a1cca0af7a5a45dc4dac', '5ad346907481447cd799bdae', '5ba4a227a0af7a5a45dc4e1a', '5ba4a249a0af7a5a45dc4e45', '5ba4a267a0af7a5a45dc4e70', '5ad346907481447cd799bdae', '5ad346907481447cd799bdae', '5ba4a12da0af7a5a45dc4d10', '5ba4a2f5a0af7a5a45dc4f1b', '5ad346907481447cd799bdae', '5ad346907481447cd799bdae', '5ba4a110a0af7a5a45dc4cfa', '5ad346907481447cd799bdae', '5ad351e47481447cd799d5e2', '5ba79286a0af7a5a45dc9312', '5ba79292a0af7a5a45dc9321', '5ad366267481447cd799e91a', '5ba49ffea0af7a5a45dc4aee', '5ad366267481447cd799e91a', '5ad35dc97481447cd799e3a0', '5ad35dc97481447cd799e3a0', '5ad367717481447cd799e9c9', '5ad35d057481447cd799e331', '5ad35d057481447cd799e331', '5ad368197481447cd799ea1e', '5ad347167481447cd799be18', '5ba4b0dca0af7a5a45dc5ee7', '5ba4b10aa0af7a5a45dc5f51', '5ad347167481447cd799be18', '5ad3472a7481447cd799be2c', '5ad367fb7481447cd799e9fe', '5ad357e87481447cd799d8d4', '5ba7a34aa0af7a5a45dc9a79', '5b418283af53340c390fb8a8', '5ba372b7a0af7a5a45dc0a3f', '5ba372cea0af7a5a45dc0a55', '5ad367137481447cd799e9a5', '5ad362d97481447cd799e572', '5b418283af53340c390fb8a8',
        //     '5ba4a110a0af7a5a45dc4cfa', '5ad346907481447cd799bdae', '5ad351e47481447cd799d5e2', '5ba79286a0af7a5a45dc9312', '5ba79292a0af7a5a45dc9321',
        // ];
        // const goodsTypeArr = await this.ctx.model.GoodsType.find({
        //     _id: { $in: goodsTypeIdArr },
        // }, { name: 1 });
        // this.success(goodsTypeArr);

        /*
        // const goodsTypeArr = await this.ctx.model.GoodsType.find({ name: /^JORDAN AIR JORDAN/ }, { name: 1 });
        const goodsTypeArr = await this.ctx.model.GoodsType.find({
            name: {
                $regex: new RegExp('WOMEN\'?S'),
            },
        }, { name: 1 });
        const total = goodsTypeArr.length;
        for (let i = 0; i < goodsTypeArr.length; i++) {
            console.log(`${i + 1}/${total}`);
            await this.ctx.model.GoodsType.update({
                _id: goodsTypeArr[i]._id,
            }, {
                $set: {
                    name: goodsTypeArr[i].name.replace('WOMENS', 'WMNS').replace('WOMEN\'S', 'WMNS'),
                },
            });
        }
        */
        // let goods_color = null;
        // const goodsArr = await this.ctx.model.Goods.find({}, { goods_color_id: 1 });
        // for (let i = 0; i < goodsArr.length; i++) {
        //     console.log(`${i + 1}/${goodsArr.length}`);
        //     goods_color = await this.ctx.model.GoodsColor.findOne({ _id: goodsArr[i].goods_color_id }, { goods_type_id: 1 });
        //     await this.ctx.model.Goods.update({ _id: goodsArr[i]._id }, { $set: { goods_type_id: goods_color.goods_type_id } });
        // }
        /*
        const goodsColorArr = await this.ctx.model.GoodsColor.find({}, { goods_id_arr: 1, goods_type_id: 1 });
        for (let i = 0; i < goodsColorArr.length; i++) {
            console.log(`${i + 1}/${goodsColorArr.length}`);
            await this.ctx.model.Goods.update({
                _id: { $in: goodsColorArr[i].goods_id_arr },
            }, {
                $set: { goods_type_id: goodsColorArr[i].goods_type_id },
            }, { multi: true });
        }
        */
        /*
        const goodsArr = await this.ctx.model.Goods.find({}, { goods_color_id: 1, url: 1 });
        let goodsColor = null;
        for (let i = 0; i < goodsArr.length; i++) {
            goodsColor = await this.ctx.model.GoodsColor.findOne({ _id: goodsArr[i].goods_color_id }, { _id: 1 });
            if (!goodsColor) {
                await this.ctx.model.Goods.update({ _id: goodsArr[i]._id }, { $set: { is_deleted: true } });
                await this.ctx.model.PendingGoods.update({ url: goodsArr[i].url }, { $set: { is_checked: false } });
                console.log(goodsArr[i].url);
            }
        }
        */
        /*
        const goodsColorIdArr = [
            '5ad351c848555b1ba3210e30',
            '5ad3598048555b1ba32126bf',
            '5ad359ca48555b1ba3212e54',
            '5ad359cb48555b1ba3212e8c',
            '5ad359cd48555b1ba3212ec4',
            '5ad359cf48555b1ba3212eff',
            '5ad35a0b48555b1ba3213674',
            '5ba46751a0af7a5a45dc3a75',
            '5ba46c1ea0af7a5a45dc3c4f',
            '5ba468b9a0af7a5a45dc3b2b',
            '5ba46913a0af7a5a45dc3b41',
            '5ba46914a0af7a5a45dc3b57',
        ];
        let goods = null;
        for (let i = 0; i < goodsColorIdArr.length; i++) {
            goods = await this.ctx.model.Goods.findOne({ goods_color_id: goodsColorIdArr[i] }, { url: 1 });
            if (goods) {
                await this.ctx.model.Goods.update({ _id: goods._id }, { $set: { is_deleted: true } });
                await this.ctx.model.PendingGoods.update({ url: goods.url }, { $set: { is_checked: false } }, { multi: true });
                await this.ctx.model.GoodsType.update({ $pull: { goods_color_arr: goodsColorIdArr[i] } });
                console.log(goods.url);
            }
        }
        */
        /*
        const goodsArr = await this.ctx.model.Goods.find({ goods_type_id: { $exists: false } }, { goods_color_id: 1 });
        let goodsColor = null;
        for (let i = 0; i < goodsArr.length; i++) {
            console.log(`${i + 1}/${goodsArr.length}`);
            goodsColor = await this.ctx.model.GoodsColor.findOne({ _id: goodsArr[i].goods_color_id }, { goods_type_id: 1 });
            if (goodsColor) {
                await this.ctx.model.Goods.update({ _id: goodsArr[i]._id }, { $set: { goods_type_id: goodsColor.goods_type_id } });
            } else {
                console.log(goodsArr[i]._id);
            }
        }
        */
        /*
        const pendingGoods = await this.ctx.model.PendingGoods.find({
            $or: [
                {
                    name: {
                        $regex: 'nike',
                        $options: 'i',
                    },
                },
                {
                    name: {
                        $regex: 'air',
                        $options: 'i',
                    },
                },
            ],
        }, { name: 1 });
        */
        /*
        const goodsArr = await this.ctx.model.Goods.find({}, { number: 1 });
        const l = goodsArr.length;
        let newNumber = null;
        for (let i = 0; i < l; i++) {
            console.log(`${i}/${l}`);
            newNumber = this.ctx.helper.formatGoodsNumber(goodsArr[i].number);
            if (newNumber !== goodsArr[i].number) {
                await this.ctx.model.Goods.update({ _id: goodsArr[i]._id }, {
                    $set: {
                        number: newNumber,
                    },
                });
            }
        }
        */
        // const goodsColorArr = await this.ctx.model.GoodsColor.find({}, { number: 1 });
        // const l = goodsColorArr.length;
        // let newNumber = null;
        // for (let i = 0; i < l; i++) {
        //     console.log(`${i}/${l}`);
        //     newNumber = goodsColorArr[i].number;
        //     for (let j = 0; j < newNumber.length; j++) {
        //         newNumber[j] = this.ctx.helper.formatGoodsNumber(newNumber[j]);
        //     }
        //     newNumber = this.ctx.helper.unique(newNumber);
        //     await this.ctx.model.GoodsColor.update({ _id: goodsColorArr[i]._id }, {
        //         $set: {
        //             number: newNumber,
        //         },
        //     });
        // }

        /*
        const goodsColorArr = await this.ctx.model.GoodsColor.find({}, { goods_id_arr: 1, goods_type_id: 1 });
        let goodsColor = null;
        // let goodsType = null;
        let goodsArr = null;
        let firstNumber = null;
        for (let index = 0; index < goodsColorArr.length; index++) {
            console.log(`${index}/${goodsColorArr.length}`);
            goodsColor = goodsColorArr[index];
            goodsArr = await this.ctx.model.Goods.find({ _id: { $in: goodsColor.goods_id_arr } }, { number: 1, url: 1 });
            if (goodsArr && goodsArr.length > 1) {
                firstNumber = goodsArr[0].number;
                for (let i = 1; i < goodsArr.length; i++) {
                    if (goodsArr[i].number !== firstNumber) {
                        await this.ctx.model.Goods.remove({ _id: goodsArr[i]._id });
                        await this.ctx.model.PendingGoods.update({ url: goodsArr[i].url }, { is_checked: false });
                        await this.ctx.model.GoodsColor.update({ _id: goodsColor._id }, { $pull: { goods_id_arr: goodsArr[i]._id } });
                    }
                }
            }
        }
        // */
        /*
        const keywords = [
            'CORTEZ KENNY',
            'PG',
            'HUARACHE RUN',
            'HAWKFLIGHT',
            'PENNY',
            'PIPPEN',
            'TOKI SLIP',
            'VANDAL',
            'ACG',
            'HYPERPOSITE',
            'ROSHE LD',
            'MARIAH',
            'UPSTEP',
            'MAESTRO',
            'RIFT',
            'LIBERTY',
            'ROSHE',
            'TALARIA',
            'DOWNTOWN',
            'MERCURIAL',
            'TIEMPO',
            'FREE FLYKNIT',
            'FLIGHT ONE',
            'FLIGHTPOSITE',
            'ROOKIE',
            'FLYSTEPPER',
            'PAUL RODRIGUEZ',
            'SB WHAT THE DUNK',
            'AF-X',
            'LUNAR BRAATA',
            'GAME 3',
            'TRAINER 1.3',
            'DUNK LUX',
            'ALL OUT',
            'LUNAREPIC',
            'GAME 6',
            'TERMINATOR',
            'AF1 ULTRA',
            'FREE TR',
            '1/2 CENT',
            'KICKSHAWAII',
            'MOWABB',
            'POWERLINES',
            'TRAINER SC',
            'KOSTON',
            'DELTA FORCE',
            'HYPERCHASE',
            'LUNAR ROD',
            'FREE OG',
            'LUNAR CHUKKA',
            'SHOOTING',
            'FREE ORBIT',
            'SOLDIER',
            'FLYKNIT LUNAR',
            'ALL COURT',
            'TENNIS CLASSIC',
            'TOTAL MAX',
            'TRAINER 1.2',
            'COURT',
            'TRAINER DUNK',
            'VERONA',
            'ONCORE',
            'Court Force',
            'FLYPOSTIE',
            'HYPERMAX',
            'SOLARSOFT',
            'SPIRIMIC',
            'CMFT',
            'SWOOPES',
            'Sequent',
            'Manoadome',
            'Benassi',
            'Trey 5',
            'VORTAK',
            'ASSERSION',
            'First Class',
            'Monarch',
            'FL-Rue',
            'Metcon',
            'Gravity',
            'Humara',
            'LunarStelos',
            'LunarSolo',
            'Untouchable',
            'Romaleos',
            'Free',
            'Savage',
            'Flex RN',
            'Odyssey',
            'Shift',
            'JA Fly',
            'Free Trainer',
            'Tech Trainer',
            'Hypervenom',
            'Vapor',
            'Terra',
            'Superfly',
            'Structure',
            'Trout',
            'Zoom Elite',
            'Alpha Menace',
            'Advantage',
            'Ultrafly',
            'Inflict',
            'Commuter',
            'WINFLO',
            'Nike Duel',
            'Vomero',
            'Repper',
            'Clipper',
            'Tiempo',
            'Menace',
            'Flex',
            'Explorer',
            'Ultrafly Pro',
            'Magista',
            'Accurate',
            'Lunar Control',
            'Matumbo',
            'Lunar',
            'Roshe G',
            'Alpha Huarache',
            'Wildhorse',
            'Vapor Speed',
            'Vapor Shark',
            'Mamba',
            'Pocketknife',
            'SB Janoski',
            'Metcon DSX',
            'Zoom',
            'SB Portmore',
            'Vapor Varsity',
            'Zoom Structure',
            'Hoodland',
            'Court Lite',
            'Lupinek',
            'LUNARTEMPO',
            'Hyperdunk',
            'Trainer 7',
            'TRAINER 5',
            'Sequent',
            'Fingertrap',
            'Explorer',
            'Downtown',
            'Goaterra',
            'Rival',
            'HJ',
            'Streak',
            'LEGEND',
            'HUARACHE 6',
            'TROUT',
            'Clear Out',
            'Wildhorse',
            'Speed Turf',
            'Celar 5',
            'MAGISTAX',
            'Forever',
            'Aptare',
            'P-Rod',
            'Waffle',
            'Flex',
            'Train Action',
            'Hoodland',
            'Virtue',
            'Rotational',
            'Zoom SD',
            'SPAN',
            'Span 2',
            'Kynwood',
            'Check Solar',
            'PORTMORE',
            'Javelin',
            'EXP-X14',
            '91',
            'Blazer Royal',
            'Komyuter',
            'AUDACITY',
            'Current',
            'ROSHE NM',
            'HYPERQUICKNESS',
            'UNAR CALDRA',
            'KOTH ULTRA',
            'VEER',
            'ARCHIVE',
            'TENNIS',
            'WAFFLE',
            'TRAINER 3',
            'ACG',
            'Chalapuka',
            'Kobe AD',
            'Flylon Train',
            'Flow Laser',
            'React Element',
            'Team Classic',
            'Blazer AC',
            'Footscape NM',
            'Woven Chukka',
            'Spiridon Parra',
            'Mayfly',
            'Force 1 Cmft',
            'Meadow',
            'The 10',
            'Grandstand',
            'Uptempo 95',
            'Diamond',
            'Drift',
            'Courtballistec',
            'TRAINER 1',
            'Blazer Low',
            'BLAZER HI',
            'Incursion',
            'KD TREY',
            'Tekno',
            'Mamba Rage',
            'Pocket Fly',
            'Renew',
            'Vortak',
            'Jester',
            'Huarache City',
            'Ashin Modern',
            'BLAZER MID',
            'City Loop',
            'Dualtone',
            'Epic React',
            'Flex Experience',
            'Legend React',
            'Lunar Charge',
            'Renew Rival',
            'Revolution 4',
            'Shox Gravity',
            'Zoom Fly',
            'FOOTSCAPE WOVEN',
            'TECH CHALLENGE',
            'AJF',
            'Flight Lite',
            'Footscape Desert Chukka',
            'Hoop Structure',
            'Foamdome',
            'Sensation',
            'SKYLINE',
            'Turbulence',
            'Pressure',
            'Python',
            'Revaderchi',
            'Zoom Vick',
            'Glory',
            'Blazer 73',
            'Class of',
            'Court Force',
            'Delta Force',
            'DUAL',
            'Dunk CMFT',
            'Dunk Ultra',
            'Eric Koston',
            'FLEX 2016',
            'FLIGHT 13',
            'Footscape WVN',
            'Game',
            'Harbor',
            'Carnivore',
            'Huarache Free',
            'Hyper Dunk',
            'Hyperfuse',
            'Hyperize',
            'Hyperlive',
            'Hypershift',
            'INTERNATIONALIST',
            'Mentality',
            'Kaishi',
            'Killshot',
            'Lunar 180',
            'Oneshot',
            'REJUVEN',
            'Lunarconverge',
            'Lunardome',
            'LUNARESTOA',
            'Lunarfly',
            'Lunarglide',
            'Marxma',
            'Match Supreme',
            'Proximo',
            'MATCH CLASSIC',
            'Skystepper',
            'Nighttrack',
            'KYNSI JCRD',
            'Omar Salazar',
            'Rodriguez',
            'Payaa',
            'Project BA',
            'Roshe Cortez',
            'Roshe LD',
            'Roshe NM',
            'Revaderchi',
            'Fusion',
            'Trail',
            'Hyperchase',
            'Oneshot',
            'Mark Smith',
            'j23',
            'REIMAGINED',
            'Flare AJ1',
            'Jordan',
            'nike',
            'kobe',
            'CORTEZ',
            'Ultraforce',
            'SB',
            'dunk',
            'STEFAN JANOSKI',
            'lunar',
            'blazer',
            'Kyrie',
            'Pegasus',
            'Foamposite',
            'Monarch',
            'nike',
            'trainer',
            'LEBRON',
            'POSITE',
            'MORE MONEY',
            'SHAKE',
            'air',
            'roshe',
            // ========adidas=======
            // 'Ultraboost',
            // 'Ultra boost',
            // 'Pureboost',
            // 'Pure boost',
            // 'Yeezy',
            // 'Adidas',
            // 'Superstar',
            // 'nmd',
            // 'Boost',
            // 'PHARRELL WILLIAMS',
            // 'PW',
            // 'TENNIS HU',
            // 'FUTURECRAFT',
            // 'PRO',
            // 'GAZELLE',
            // 'STAN SMITH',
            // 'EQT',
            // 'ADV',
            // 'I-5923',
            // 'CAMPUS',
            // 'TUBULAR',
            // 'ZX FLUX',
            // 'CUSHION',
            // 'Y-3',
            // 'ENERGY BOOST',
            // 'PureControl',
            // 'ACCELERATOR',
            // 'SWIFT',
            // 'crazy',
            // 'CLIMACOOL',
            // 'CLIMA COOL',
            // 'SUPPORT',
            // 'Ace Tango',
            // 'N-5923',
            // 'DAME',
            // 'ALPHABOUNCE',
            // 'ARSHAM',
            // 'ADILETTE',
            // 'HARDEN',
            // 'ADIZERO',
            // 'CONTINENTAL',
            // 'SAMBA',
            // 'SAMOA',
            // 'SOBAKOV',
            // 'BARRICADE',
            // 'PERFORMANCE',
            // 'Alexander Wang',
            // 'POD',
            // 'ZX 500',
            // 'SOLARBOOST',
            // 'ARKYN',
            // 'DEERUPT',
            // 'BBALL',
            // 'BYW',
            // // =======
            // 'KAMANDA',
            // 'COPA',
            // 'FALCON',
            // 'UNDFTDX',
            // 'SOLAR',
            // 'wings',
            // 'horns',
            // 'PERFORMANCE',
            // 'OYSTER',
            // 'COURTVANTAGE',
            // 'OZWEEGO',
            // 'R1',
            // 'SPEEDFACTORY',
            // 'SEELEY',
            // 'ZEBRA',
            // 'KITH',
            // 'ATTITUDE',
            // 'ZX 500',
            // 'PORSCHE',
            // 'MATCHCOURT',
            // 'BUSENITZ',
            // 'FLASHBACK',
            // 'SUPER',
            // 'PLR',
            // 'ADI-EASE',
            // 'ADIEASE',
            // 'NBHD',
            // 'CLOUDFOAM',
            // 'ROSE',
            // 'FORUM',
            // 'POWERLIF',
            // 'BOUNCE',
            // 'IMPACT',
            // 'ADISSAGE',
            // 'SUPERNOVA',
            // 'FOREST',
            // 'PREDATOR',
            // 'TANGUTSU',
            // 'SOCK',
            // 'INDOOR',
            // 'RAF SIMONS',
            // 'CONSORTIUM',
            // 'QUESTAR',
            // 'PROPHERE',
            // 'D ROSE',
            // 'FORUM',
            // 'ECSTASY',
            // 'HAVEN',
        ];
        const or = keywords.map(kw => {
            return {
                name: {
                    $regex: kw,
                    $options: 'i',
                },
            };
        });
        const pendingGoodsArr = await this.ctx.model.PendingGoods.find({
            is_checked: { $ne: true },
            $or: or,
        });
        // 这个是不考虑关键字的
        // const pendingGoodsArr = await this.ctx.model.PendingGoods.find({
        //     is_checked: { $ne: true },
        // });
        let pendingGoods = null;
        let pendingGoodsNumber = null;
        let goodsColor = null;
        let goodsType = null;
        // let goodsColorArr = null;
        // const goodsTypeIdArr = [];
        for (let i = 0; i < pendingGoodsArr.length; i++) {
            // console.log(`${i}/${pendingGoodsArr.length}`);
            pendingGoods = pendingGoodsArr[i];
            if (!pendingGoods.name) continue;
            pendingGoodsNumber = pendingGoods.number;
            if (!pendingGoodsNumber) continue;
            if (pendingGoodsNumber.indexOf(' ') !== -1) {
                pendingGoodsNumber = pendingGoodsNumber.split(' ')[0];
            } else if (pendingGoodsNumber.indexOf('-') !== -1) {
                pendingGoodsNumber = pendingGoodsNumber.split('-')[0];
            } else {
                // 如果最后一位不是数字的话，就去掉最后的四位
                const lastChar = pendingGoodsNumber.substr(pendingGoodsNumber.length - 1, 1);
                if (isNaN(lastChar)) {
                    // 去掉最后的四位
                    pendingGoodsNumber = pendingGoodsNumber.substring(0, pendingGoodsNumber.length - 4);
                } else {
                    // 去掉最后的三位
                    pendingGoodsNumber = pendingGoodsNumber.substring(0, pendingGoodsNumber.length - 3);
                }
            }

            // 以下这段，暂时用不到
            // if (pendingGoodsNumber.indexOf('-') !== -1) {
            //     console.log('===', pendingGoodsNumber);
            //     const arr = pendingGoodsNumber.split('-');
            //     if (arr.length === 2 && /[a-zA-Z]{3}/.test(arr[1])) {
            //         pendingGoodsNumber = arr[0];
            //     } else {
            //         continue;
            //     }
            // } else {
            //     continue;
            // }

            if (pendingGoodsNumber.length !== 6) {
                console.log(`${pendingGoodsNumber} 的长度不为6，跳过!`);
                continue;
            }
            console.log(`pendingGoodsNumber => ${pendingGoodsNumber}`);
            let goods = await this.ctx.model.Goods.findOne({ url: pendingGoods.url }, { _id: 1 });
            if (goods) {
                await this.ctx.model.PendingGoods.update({ _id: pendingGoods._id }, { $set: { is_checked: true } });
                continue;
            }

            const goods = await this.ctx.model.Goods.findOne({
                number: {
                    $regex: pendingGoodsNumber,
                    $options: 'i',
                },
                // number: pendingGoodsNumber,
            }, { goods_type_id: 1 });
            if (!goods) {
                continue;
            }

            goodsType = await this.ctx.model.GoodsType.findOne({
                _id: goods.goods_type_id,
                is_deleted: false,
                brand: {
                    // AIR JORDAN     NIKE
                    $in: [ '5aa4f40e30302f3bc95cea7c', '5aba668eee851c35fa151186' ],
                    // ADIDAS
                    // $in: [ '5ac730f5f6a0472a39440322' ],
                },
            });
            if (goodsType) {
                const img = Array.isArray(pendingGoods.imgs) && pendingGoods.imgs.length > 0 ? `${pendingGoods.platform}/${pendingGoods.imgs[0]}` : '';
                // 新建商品
                let id = await this.ctx.service.createId.getId('Goods');
                const crawlCount = await this.ctx.model.IdentityCounter.findOne({ model: `${pendingGoods.platform}CrawlCounter` }, { count: 1 });
                const goods = new this.ctx.model.Goods({
                    id,
                    name: pendingGoods.name,
                    url: pendingGoods.url,
                    number: this.ctx.helper.formatGoodsNumber(pendingGoods.number),
                    sku: pendingGoods.size_price_arr,
                    img,
                    platform_id: pendingGoods.platform_id,
                    gender: pendingGoods.gender,
                    goods_type_id: goodsType._id,
                    update_counter: crawlCount ? crawlCount.count : 0,
                });
                await goods.save();
                // 新建配色
                id = await this.ctx.service.createId.getId('GoodsColor');
                goodsColor = new this.ctx.model.GoodsColor({
                    id,
                    name: goodsType.name,
                    color_name: pendingGoods.color_name,
                    color_value: pendingGoods.color_value,
                    number: this.ctx.helper.formatGoodsNumber(pendingGoods.number),
                    img,
                    goods_id_arr: [ goods._id ],
                    goods_type_id: goodsType._id,
                });
                await goodsColor.save();
                // 配色和款型关联上
                await this.ctx.model.GoodsType.update({ _id: goodsType._id }, { $addToSet: { goods_color_arr: goodsColor._id } });
                // 把商品和配色关联上
                await this.ctx.model.Goods.update({ _id: goods._id }, { $set: { goods_color_id: goodsColor._id } });
                await this.ctx.model.PendingGoods.update({ _id: pendingGoods._id }, { $set: { is_checked: true } });
            }
        }
        // */

        // /* 消灭款型下number相同的配色
        const goodsTypeArr = await this.ctx.model.GoodsType.find({
            is_deleted: false,
            // jordon 和 nike 阿斯达斯
            brand: { $in: [ '5aa4f40e30302f3bc95cea7c', '5aba668eee851c35fa151186', '5ac730f5f6a0472a39440322' ] },
        }, {
            goods_color_arr: 1,
        });
        let goodsColorArr = null;
        let targetNumber = null;
        let targetGoodsColorId = null;
        let goodsColor = null;
        for (let index = 0; index < goodsTypeArr.length; index++) {
            console.log(`goodsType => ${index}/${goodsTypeArr.length}`);
            goodsColorArr = await this.ctx.model.GoodsColor.find({
                _id: { $in: goodsTypeArr[index].goods_color_arr },
            }, {
                number: 1,
                goods_id_arr: 1,
                goods_type_id: 1,
            }).lean();
            while (goodsColorArr.length > 1) {
                targetNumber = goodsColorArr[0].number[0];
                targetGoodsColorId = goodsColorArr[0]._id;
                goodsColorArr.splice(0, 1);
                if (/^\w{6}-\w{3}$/.test(targetNumber)) {
                    console.log(`number = ${targetNumber}`);
                    for (let i = 0; i < goodsColorArr.length; i++) {
                        goodsColor = goodsColorArr[i];
                        if (goodsColor.number[0] === targetNumber) {
                            for (let j = 0; j < goodsColor.number.length; j++) {
                                await this.ctx.model.GoodsColor.update({ _id: targetGoodsColorId }, {
                                    $addToSet: { number: goodsColor.number[j] },
                                });
                            }
                            for (let j = 0; j < goodsColor.goods_id_arr.length; j++) {
                                await this.ctx.model.GoodsColor.update({ _id: targetGoodsColorId }, {
                                    $addToSet: { goods_id_arr: goodsColor.goods_id_arr[j] },
                                });
                            }
                            await this.ctx.model.GoodsType.update({ _id: goodsColor.goods_type_id }, { $pull: { goods_color_arr: goodsColor._id } });
                            await this.ctx.model.Goods.update({ goods_color_id: goodsColor._id }, { $set: { goods_color_id: targetGoodsColorId } }, { multi: true });
                            await this.ctx.model.GoodsColor.remove({ _id: goodsColor._id });

                            goodsColorArr.splice(i--, 1);
                        }
                    }
                }
            }
        }
        // */

        /* 删除和配色number不符合的商品
        const goodsColorArr = await this.ctx.model.GoodsColor.find({}, { number: 1, goods_id_arr: 1 });
        let goodsColor = null;
        let goodsArr = null;
        let exists = false;
        for (let index = 16458; index < goodsColorArr.length; index++) {
            console.log(`${index}/${goodsColorArr.length}`);
            goodsColor = goodsColorArr[index];
            goodsArr = await this.ctx.model.Goods.find({
                _id: { $in: goodsColor.goods_id_arr },
            }, { number: 1, url: 1 });
            for (let i = 0; i < goodsArr.length; i++) {
                exists = false;
                for (let j = 0; j < goodsColor.number.length; j++) {
                    if (!goodsColor.number[j]) {
                        console.log('=======');
                        console.log(goodsColor._id);
                        continue;
                    }
                    if (goodsColor.number[j].includes(goodsArr[i].number)) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    await this.ctx.model.Goods.remove({ _id: goodsArr[i]._id });
                    await this.ctx.model.PendingGoods.update({ url: goodsArr[i].url }, { is_checked: false });
                    await this.ctx.model.GoodsColor.update({ _id: goodsColor._id }, { $pull: { goods_id_arr: goodsArr[i]._id } });
                }
            }
        }
        // */

        /* 将款型已经被删除的商品删除，并将对应的待处理商品变成未处理状态
        const goodsArr = await this.ctx.model.Goods.find({ is_deleted: false }, { url: 1, goods_type_id: 1 });
        let goods = null;
        let goodsType = null;
        let counter = 0;
        for (let index = 0; index < goodsArr.length; index++) {
            console.log(`${index}/${goodsArr.length}`);
            goods = goodsArr[index];
            goodsType = await this.ctx.model.GoodsType.findOne({ _id: goods.goods_type_id }, { is_deleted: 1 });
            if (!goodsType || goodsType.is_deleted) {
                await this.ctx.model.Goods.remove({ _id: goods._id });
                await this.ctx.model.PendingGoods.update({ url: goods.url }, { is_checked: false });
                counter++;
            }
        }
        console.log('counter = ', counter);
        // */
        /*
        const goodsUrlArr = await this.ctx.model.Goods.find({ is_deleted: false }, { url: 1 });
        let goodsArr = null;
        let goods = null;
        let goodsColor = null;
        // let goodsType = null;
        for (let index = 0; index < goodsUrlArr.length; index++) {
            console.log(`${index + 1}/${goodsUrlArr.length}`);
            goodsArr = await this.ctx.model.Goods.find({ url: goodsUrlArr[index].url, is_deleted: false }, { goods_color_id: 1, goods_type_id: 1, url: 1 }).sort({ _id: 1 });
            if (goodsArr.length > 1) {
                for (let i = 1; i < goodsArr.length; i++) {
                    goods = goodsArr[i];
                    await this.ctx.model.Goods.update({ _id: goods._id }, { $set: { is_deleted: true } });
                    await this.ctx.model.PendingGoods.update({ url: goods.url }, { $set: { is_checked: true } });
                    goodsColor = await this.ctx.model.GoodsColor.findOneAndUpdate({
                        _id: goods.goods_color_id,
                    }, {
                        $pull: { goods_id_arr: goods._id },
                    }, { new: true });
                    if (goodsColor && goodsColor.goods_id_arr.length === 0) {
                        await this.ctx.model.GoodsColor.remove({ _id: goodsColor._id });
                        await this.ctx.model.GoodsType.update({ _id: goodsColor.goods_type_id }, { $pull: { goods_color_arr: goodsColor._id } });
                    }
                }
            }
        }
        // */
        // /*
        const goodsArr = await this.ctx.model.Goods.find({ is_deleted: false }, { url: 1 });
        for (let index = 0; index < goodsArr.length; index++) {
            console.log(`${index + 1}/${goodsArr.length}`);
            await this.ctx.model.PendingGoods.update({ url: goodsArr[index].url }, { $set: { is_checked: true } });
        }
        // */

        console.log('done');
        this.success();
    }
}

module.exports = HomeController;
