#!/usr/bin/env python
# -*- coding: utf-8 -*-

import xlrd
import mongo

if __name__ == '__main__':
	data = xlrd.open_workbook('../app/public/奶粉123_奶粉标签整理0523.xlsx')
	table = data.sheets()[0]
	# print(table)
	nrows = table.nrows
	for i in range(1, nrows):
		# print(table.row_values(i))
		rows = table.row_values(i)
		rows = [x.replace('\n', '').replace('\t', '').strip() for x in rows]
		# name, url, qiTaPeiFang, age, youJi, shuXing, peiFang, pinPai, yaoQiu, changDi, teShu
		mongo.insert_naifen(rows[0], rows[1], rows[2], rows[3], rows[4], rows[5], rows[6], rows[7], rows[8], rows[9], rows[10])
