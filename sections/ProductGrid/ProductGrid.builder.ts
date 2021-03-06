import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'
import { Input } from '@builder.io/sdk'
const LazyProductGrid = dynamic(async () => {
  return (await import('./ProductGrid')).ProductGrid
})

const productCardFields: Input[] = [
  {
    name: 'variant',
    type: 'enum',
    enum: ['slim', 'simple'],
  },
  {
    name: 'imgWidth',
    type: 'number',
    defaultValue: 540,
  },
  {
    name: 'imgHeight',
    type: 'number',
    defaultValue: 540,
  },
  //   imgPriority?: boolean
  {
    name: 'imgPriority',
    type: 'boolean',
    defaultValue: true,
  },
  {
    name: 'imgLoading',
    type: 'enum',
    enum: ['eager', 'lazy'],
  },
  {
    name: 'imgLayout',
    type: 'enum',
    enum: ['fixed', 'intrinsic', 'responsive', 'fill'],
    defaultValue: 'fill',
  },
]

const highlightedCardFields = productCardFields.concat({
  name: 'index',
  type: 'number',
})

const gridFields: Input[] = [
  {
    name: 'variant',
    type: 'enum',
    defaultValue: 'default',
    enum: ['default', 'filled'],
  },
  {
    name: 'layout',
    type: 'enum',
    defaultValue: 'A',
    enum: ['A', 'B', 'C', 'D', 'normal'],
  },
]
export const productGridSchema: Input[] = [
  {
    name: 'gridProps',
    defaultValue: {
      variant: 'default',
      layout: 'A',
    },
    type: 'object',
    subFields: gridFields,
  },
  {
    name: 'cardProps',
    defaultValue: {
      variant: 'simple',
      imgPriority: true,
      imgLayout: 'responsive',
      imgLoading: 'eager',
      imgWidth: 540,
      imgHeight: 540,
      layout: 'fixed',
    },
    type: 'object',
    subFields: productCardFields,
  },
  {
    name: 'highlightCard',
    defaultValue: {
      imgWidth: 1080,
      imgHeight: 1080,
      variant: 'simple',
      imgPriority: true,
      imgLayout: 'responsive',
      imgLoading: 'eager',
      layout: 'fixed',
      index: 1,
    },
    type: 'object',
    subFields: highlightedCardFields,
  },
  {
    name: 'offset',
    type: 'number',
    defaultValue: 0,
  },
  {
    name: 'limit',
    type: 'number',
    defaultValue: 3,
  },
]

Builder.registerComponent(LazyProductGrid, {
  name: 'ProductGrid',
  description: 'Pick products free form',
  inputs: productGridSchema.concat({
    name: 'productsList',
    type: 'list',
    subFields: [
      {
        name: 'product',
        type: 'ShopifyProductHandle',
      },
    ],
  }),
})

Builder.registerComponent(LazyProductGrid, {
  name: 'ProductCollectionGrid',
  inputs: productGridSchema.concat({
    name: 'collection',
    type: 'ShopifyCollectionHandle',
  }),
})

Builder.registerComponent(LazyProductGrid, {
  name: 'ProductCollectionGrid',
  inputs: productGridSchema.concat({
    name: 'collection',
    type: 'ShopifyCollectionHandle',
  }),
})
