import { marketStore } from '@/store'
import { collateralToken, baseConfig } from '@/store/constant'
import { df } from '@/utils/format'

const y2n = (amount, format = false) => {
  const { market } = marketStore
  if (amount <= 0) return 0
  const result = df(
    market.liquidityFalseUnformat -
      (market.liquidityTrueUnformat * market.liquidityFalseUnformat) /
        (market.liquidityTrueUnformat + df(amount * (1 - baseConfig.fee), -collateralToken.decimal)),
    collateralToken.decimal,
  )
  return format ? result.toFixed(collateralToken.decimal) : result
}

const n2y = (amount, format = false) => {
  const { market } = marketStore
  if (amount <= 0) return 0
  const result = df(
    market.liquidityTrueUnformat -
      (market.liquidityTrueUnformat * market.liquidityFalseUnformat) /
        (market.liquidityFalseUnformat + df(amount * (1 - baseConfig.fee), -collateralToken.decimal)),
    collateralToken.decimal,
  )
  return format ? result.toFixed(collateralToken.decimal) : result
}

const yeqn = (LT, LF, AT, AF) => {
  if (AT < AF) [LT, LF, AT, AF] = [LF, LT, AF, AT]
  const a = 1 - baseConfig.fee
  const b = LT + a * LF - a * (AT - AF)
  const c = (AF - AT) * LT
  return (Math.pow(b ** 2 - 4 * a * c, 0.5) - b) / (2 * a)
}

export { y2n, n2y, yeqn }
