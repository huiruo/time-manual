import React, { useState, useEffect } from 'react';
import { Box } from '@fower/react';
import { Input } from '@/components/input';
import TableList from '@/components/table-list';

const rangeList = [
  [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ],
  [
    10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30
  ],
  [
    30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60
  ],
  [
    60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100
  ],
];

const maxFixedLength = 8;
const minFixedLength = 3;

const CrytoIncreaseCalculator = () => {
  const [inputVal, setInputVal] = useState<string>('100');
  const [calcultorList, setCalcultorList] = useState<any[]>([]);
  const [calculatorTip, setCalculatorTip] = useState<string>('');

  const onInput = (e: any) => {
    const val = e.target.value;
    setInputVal(e.target.value);

    const regular = /^(([0-9]+[\.]?[0-9]+)|[0-9])$/;
    if (regular.test(val)) {

      // 获取并限制小数点位数
      // 获取并限制小数点位数
      const valSplitArr = val.toString().split('.');
      // 指定 toFixed() 最小为3,避免位数过小丢失精度
      let fixedLength = minFixedLength;
      if (valSplitArr.length === 2) {
        if (valSplitArr[1].length > maxFixedLength) {
          setCalculatorTip('小数点最多8位');

          return;
        }
      }

      if (valSplitArr.length === 2) {
        const floatNumber = valSplitArr[1].length;
        if (floatNumber > minFixedLength) {
          fixedLength = floatNumber;
        }
      }
      // end
      // end

      setCalculatorTip('');
      calculatorUtil(val, fixedLength);
    } else {
      setCalculatorTip('请输入正数，小数点后最多8位');
    }
  };

  const calculatorUtil = (val: any, fixedLength = minFixedLength, rangeNum = 0) => {
    const _fixedLength = fixedLength < maxFixedLength ? fixedLength : 8;
    const rangeTarget = rangeList[rangeNum];
    const items = [];

    for (let i = 0, len = rangeTarget.length; i < len; i++) {
      items.push({
        index: rangeTarget[i],
        down_price: ((100 - rangeTarget[i]) * val / 100).toFixed(_fixedLength),
        up_price: ((100 + rangeTarget[i]) * val / 100).toFixed(_fixedLength)
      });
    }
    setCalcultorList(items);
  };

  const onInterval = (rangeNum: number) => {
    if (!calculatorTip) {
      // 获取小数点位数
      const valSplitArr = inputVal.toString().split('.');
      let fixedLength = minFixedLength;
      if (valSplitArr.length === 2) {
        const floatNumber = valSplitArr[1].length;
        if (floatNumber > minFixedLength) {
          fixedLength = floatNumber;
        }
      }
      // end
      calculatorUtil(inputVal, fixedLength, rangeNum);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      calculatorUtil(inputVal);
    }, 1000);
  }, []);

  return (
    <Box w='100%'>
      <Box h='100%' w='100%' overflow='auto'>
        <Box mt='4' ml='auto' mr='auto'>

          <Box flex={true} w='100%' minH={'100vh'}>
            <Box w='80%' bg='rgb(208 235 255)'>
              <Box w='60%' mb='10' ml='auto' mr='auto'>输入价格，自动计算出各个波动点位对应的价格。</Box>
              <Box w='60%' mb='1' ml='auto' mr='auto'>
                <Input onChange={(e) => onInput(e)} value={inputVal} placeholder='请输入价格' />
              </Box>
              <Box w='60%' ml='auto' mr='auto'>
                <Box as='p'>
                  指定涨幅区间
                </Box>
                <Box flex={true} mb-10={true}>
                  <Box onClick={() => onInterval(0)} mr={6} cursor='pointer' bg='#2fb3ee'>1~10%</Box>
                  <Box onClick={() => onInterval(1)} mr={6} cursor='pointer' bg='#2fb3ee'>10~30%</Box>
                  <Box onClick={() => onInterval(2)} mr={6} cursor='pointer' bg='#2fb3ee'>30~60%</Box>
                  <Box onClick={() => onInterval(3)} mr={6} cursor='pointer' bg='#2fb3ee'>60~100%</Box>
                </Box>
              </Box>
              <Box w='60%' ml='auto' mr='auto'>
                {!calculatorTip ? (
                  <TableList
                    rowKey='calcultor_list'
                    dataSource={calcultorList}
                    columns={[
                      {
                        title: '涨幅百分比',
                        key: 'index',
                        render(text) {
                          return text ? `+${text}%` : '--';
                        }
                      },
                      {
                        title: '涨幅对应价格',
                        key: 'up_price',
                        render(text) {
                          return text ? text : '--';
                        }
                      },
                      {
                        title: '跌幅百分比',
                        key: 'index',
                        render(text) {
                          return text ? `-${text}%` : '--';
                        }
                      },
                      {
                        title: '跌幅对应价格',
                        key: 'down_price',
                        render(text) {
                          return text ? text : '--';
                        }
                      }
                    ]}
                    headerStyle={{ height: '3.8' }}
                  />
                ) : <div>{calculatorTip}</div>}
              </Box>
            </Box>

            <Box w='20%' bg='#ebf0f7'>
              {/* <span>指定涨幅区间</span> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CrytoIncreaseCalculator;
