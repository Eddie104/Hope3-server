// const fs = require('fs');
// const path = require('path');
const Controller = require('../../core/baseController');

class PendingGoodsController extends Controller {
    async index() {
        this.success('hi, welcome to pendingGoodsController!');
    }

    async find() {
        let {
            name,
            platform,
            only_pending,
            is_deleted,
            page,
            count,
        } = this.ctx.request.body;
        page = page || 1;
        count = count || 10;
        this.ctx.validate({
            page: 'number',
            count: 'number',
        });
        const query = {};
        if (name) {
            query.name = {
                $regex: name,
                $options: 'i',
            };
        }
        if (/\w{24}/.test(platform)) {
            query.platform_id = platform;
        }
        if (only_pending === true) {
            query.is_checked = { $ne: true };
        }
        if (is_deleted === 1) {
            query.is_deleted = true;
        } else if (is_deleted === 2) {
            query.is_deleted = false;
        }
        const list = await this.ctx.model.PendingGoods.find(query).skip((page - 1) * count).limit(count);
        const total = await this.ctx.model.PendingGoods.count(query);
        // 找出平台
        const platformList = await this.ctx.model.Platform.find();
        this.success({
            list,
            pagination: {
                total,
                current: page,
            },
            platform: platformList,
        });
    }

    async fetchBrandAndCategory() {
        const brands = await this.ctx.model.Brand.find({ is_deleted: false });
        const category = await this.ctx.model.Category.find({}, { name: 1 });
        this.success({
            brands,
            category,
        });
    }

    async setCheck() {
        const { _id } = this.ctx.params;
        await this.ctx.model.PendingGoods.update({ _id }, { $set: { is_checked: true } });
        this.success();
    }

    async delete() {
        const { _id } = this.ctx.params;
        await this.ctx.model.PendingGoods.update({ _id }, { $set: { is_deleted: true } });
        this.success();
    }

    async autoConnectByName() {
        const pendingGoodsArr = await this.ctx.model.PendingGoods.find({ is_checked: { $ne: true } }, {
            name: 1,
            number: 1,
            url: 1,
            size_price_arr: 1,
            imgs: 1,
            platform: 1,
            platform_id: 1,
            color_name: 1,
            color_value: 1,
            gender: 1,
        });
        let pendingGoods = null;
        let goodsColor = null;
        let goodsType = null;
        let crawlCount = 0;
        let img = null;
        for (let i = 0; i < pendingGoodsArr.length; i++) {
            pendingGoods = pendingGoodsArr[i];
            img = Array.isArray(pendingGoods.imgs) && pendingGoods.imgs.length > 0 ? `${pendingGoods.platform}/${pendingGoods.imgs[0]}` : '';
            goodsType = await this.ctx.model.GoodsType.findOne({ name: pendingGoods.name, is_deleted: false }, { goods_color_arr: 1 });
            if (goodsType) {
                // 新建商品
                let id = await this.ctx.service.createId.getId('Goods');
                crawlCount = await this.ctx.model.IdentityCounter.findOne({ model: `${pendingGoods.platform}CrawlCounter` }, { count: 1 });
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
        this.success();
    }

    async autoConnectByNumber() {
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
            'LUNAR AIR 180',
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
            'Benassi ',
            'Trey 5',
            'VORTAK',
            'ASSERSION',
            'First Class',
            'Monarch',
            'FL-Rue',
            'Metcon',
            'Gravity',
            'Humara ',
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
            'Air Wild',
            'Vapor Shark',
            'Mamba',
            'Pocketknife',
            'SB Janoski ',
            'Metcon DSX',
            'Zoom',
            'SB Portmore',
            'Vapor Varsity',
            'Air Versitile',
            'Zoom Structure',
            'Air Max 2011',
            'Hoodland',
            'Court Lite',
            'Lupinek',
            'LUNARTEMPO',
            'Hyperdunk',
            'Trainer 7',
            'TRAINER 5',
            'Sequent',
            'Fingertrap',
            'Explorer ',
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
            'P - Rod',
            'Waffle',
            'Flex',
            'Train Action',
            'Hoodland',
            'Virtue',
            'Rotational',
            'Zoom SD ',
            'SPAN',
            'Span 2',
            'Kynwood',
            'Check Solar',
            'PORTMORE',
            'Javelin',
            'EXP - X14',
            '91',
            'Blazer Royal',
            'Komyuter',
            'AUDACITY',
            'Current',
            'ROSHE NM',
            'HYPERQUICKNESS ',
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
            'Air Skylon',
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
            'Ashin Modern ',
            'BLAZER MID',
            'City Loop',
            'Dualtone',
            'Epic React',
            'Flex Experience',
            'Legend React ',
            'Lunar Charge ',
            'Renew Rival ',
            'Revolution 4 ',
            'Shox Gravity ',
            'Zoom Fly',
            'FOOTSCAPE WOVEN ',
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
            'Game 5',
            'GAME 7',
            'Harbor',
            'Carnivore',
            'Huarache Free ',
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
            'MATCH CLASSIC ',
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
            'Trail 5',
            'Trail',
            'Hyperchase',
            'Oneshot',
            'Mark Smith',
            'j23',
            'REIMAGINED',
            'Flare AJ1',
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
        }, {
            name: 1,
            number: 1,
            url: 1,
            size_price_arr: 1,
            imgs: 1,
            platform: 1,
            platform_id: 1,
            gender: 1,
        });
        let pendingGoods = null;
        let goodsColorArr = null;
        let goodsColor = null;
        let goodsType = null;
        let crawlCount = null;
        let pendingGoodsNumber = null;
        for (let i = 0; i < pendingGoodsArr.length; i++) {
            console.log(`${i}/${pendingGoodsArr.length}`);
            pendingGoods = pendingGoodsArr[i];
            pendingGoodsNumber = pendingGoods.number;
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
            goodsColorArr = await this.ctx.model.GoodsColor.find({
                number: {
                    $regex: pendingGoodsNumber,
                    $options: 'i',
                },
            }, { goods_type_id: 1 });
            if (goodsColorArr && goodsColorArr.length > 0) {
                // const goodsTypeIdArr = [ ...new Set(goodsColorArr.map(item => item.goods_type_id)) ];
                for (let j = 0; j < goodsColorArr.length; j++) {
                    goodsColor = goodsColorArr[j];
                    goodsType = await this.ctx.model.GoodsType.findOne({ _id: goodsColor.goods_type_id, is_deleted: false });
                    if (goodsType) {
                        // 新建商品
                        const id = await this.ctx.service.createId.getId('Goods');
                        crawlCount = await this.ctx.model.IdentityCounter.findOne({ model: `${pendingGoods.platform}CrawlCounter` }, { count: 1 });
                        const goods = new this.ctx.model.Goods({
                            id,
                            name: pendingGoods.name,
                            url: pendingGoods.url,
                            number: this.ctx.helper.formatGoodsNumber(pendingGoods.number),
                            sku: pendingGoods.size_price_arr,
                            img: Array.isArray(pendingGoods.imgs) && pendingGoods.imgs.length > 0 ? `${pendingGoods.platform}/${pendingGoods.imgs[0]}` : '',
                            platform_id: pendingGoods.platform_id,
                            gender: pendingGoods.gender,
                            goods_type_id: goodsType._id,
                            update_counter: crawlCount ? crawlCount.count : 0,
                        });
                        await goods.save();

                        // 配色和款型关联上
                        await this.ctx.model.GoodsColor.update({
                            _id: goodsColor._id,
                        }, { $addToSet: { goods_id_arr: goods._id } });

                        // 把商品和配色关联上
                        await this.ctx.model.Goods.update({ _id: goods._id }, { $set: { goods_color_id: goodsColor._id } });
                        await this.ctx.model.PendingGoods.update({ _id: pendingGoods._id }, { $set: { is_checked: true } });
                        await this.ctx.model.GoodsType.update({ _id: goodsType._id }, { $addToSet: { goods_color_arr: goodsColor._id } });
                        break;
                    }
                }
            }
        }
        this.success();
    }
}

module.exports = PendingGoodsController;
