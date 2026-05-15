const createSizes = (basePrice) => ([
  { name: '中杯', price: basePrice },
  { name: '大杯', price: basePrice + 3 },
  { name: '超大杯', price: basePrice + 5 }
])

const createToppings = () => ([
  { name: '珍珠', price: 2 },
  { name: '椰果', price: 2 },
  { name: '芋圆', price: 3 },
  { name: '奶盖', price: 4 }
])

const createCoffeeToppings = () => ([
  { name: '燕麦奶', price: 3 },
  { name: '奶油顶', price: 4 },
  { name: '浓缩加倍', price: 4 },
  { name: '焦糖糖浆', price: 2 }
])

export const productCategories = [
  {
    name: '人气奶茶',
    brands: [
      {
        brandName: '霸王茶姬',
        items: [
          { id: 201, name: '伯牙绝弦', desc: '茉莉雪芽茶底，清甜回甘，入口很温柔。', price: 20, icon: '🧋', sizes: createSizes(20), toppings: createToppings() },
          { id: 202, name: '青青观音', desc: '铁观音茶香更清冽，奶感轻盈不腻。', price: 18, icon: '🍵', sizes: createSizes(18), toppings: createToppings() },
          { id: 205, name: '白雾红尘', desc: '大红袍茶底更醇厚，奶香顺滑。', price: 19, icon: '🥤', sizes: createSizes(19), toppings: createToppings() }
        ]
      },
      {
        brandName: '喜茶',
        items: [
          { id: 203, name: '多肉葡萄', desc: '经典果茶担当，葡萄香气和果肉都很满足。', price: 28, icon: '🍇', sizes: createSizes(28), toppings: createToppings() },
          { id: 204, name: '芝芝莓莓', desc: '草莓果香搭配绵密芝士顶，甜而不冲。', price: 29, icon: '🍓', sizes: createSizes(29), toppings: createToppings() },
          { id: 206, name: '轻芝多肉桃桃', desc: '蜜桃果香清新，适合夏天。', price: 27, icon: '🍑', sizes: createSizes(27), toppings: createToppings() }
        ]
      },
      {
        brandName: '奈雪的茶',
        items: [
          { id: 207, name: '霸气芝士草莓', desc: '酸甜草莓和轻芝士更有层次。', price: 30, icon: '🍓', sizes: createSizes(30), toppings: createToppings() },
          { id: 208, name: '鸭屎香柠檬茶', desc: '茶感更明显，清爽解腻。', price: 22, icon: '🍋', sizes: createSizes(22), toppings: createToppings() }
        ]
      }
    ]
  },
  {
    name: '咖啡提神',
    brands: [
      {
        brandName: '瑞幸咖啡',
        items: [
          { id: 101, name: '生椰拿铁', desc: '椰香顺滑，口感轻甜，是不会出错的人气款。', price: 18, icon: '🥥', sizes: createSizes(18), toppings: createCoffeeToppings() },
          { id: 102, name: '陨石拿铁', desc: '黑糖波波加咖啡，层次感更丰富。', price: 20, icon: '☕', sizes: createSizes(20), toppings: createCoffeeToppings() },
          { id: 105, name: '丝绒拿铁', desc: '奶感更足，口感细腻顺滑。', price: 21, icon: '🫘', sizes: createSizes(21), toppings: createCoffeeToppings() }
        ]
      },
      {
        brandName: '星巴克',
        items: [
          { id: 103, name: '燕麦拿铁', desc: '坚果香更明显，适合喜欢柔和口感的人。', price: 32, icon: '🌾', sizes: createSizes(32), toppings: createCoffeeToppings() },
          { id: 104, name: '焦糖玛奇朵', desc: '焦糖香和奶泡很讨喜，经典又稳。', price: 35, icon: '🍮', sizes: createSizes(35), toppings: createCoffeeToppings() },
          { id: 106, name: '冰美式', desc: '清爽直接，提神速度很在线。', price: 25, icon: '🧊', sizes: createSizes(25), toppings: createCoffeeToppings() }
        ]
      },
      {
        brandName: 'Manner',
        items: [
          { id: 107, name: '海盐芝士拿铁', desc: '奶香和微咸芝士感更平衡。', price: 24, icon: '🧂', sizes: createSizes(24), toppings: createCoffeeToppings() },
          { id: 108, name: '澳白', desc: '奶泡细腻，咖啡香气更干净。', price: 23, icon: '🥛', sizes: createSizes(23), toppings: createCoffeeToppings() }
        ]
      }
    ]
  }
]
