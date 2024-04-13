import { rpc, sc, tx, u, wallet } from '@cityofzion/neon-js'
import { NETWORK } from '@/store/constant'

const getNetwork = () => NETWORK

const invokeScript = async (param) => {
  const script = param.map(({ scriptHash, operation, params }) =>
    sc.createScript({
      scriptHash,
      operation,
      args: params.map((p) => sc.ContractParam.fromJson(p)),
    }),
  )
  return fetch(getNetwork(), {
    method: 'POST',
    body: JSON.stringify({
      params: [u.HexString.fromHex(script.join('')).toBase64()],
      method: 'invokescript',
      jsonrpc: '2.0',
      id: 1,
    }),
  })
    .then((res) => res.json())
    .then(({ result }) => result)
    .catch((e) => console.log(e))
}

const traverseiterator = async (contractHash, method, params, account) => {
  const fetchInitData = {
    method: 'POST',
    body: JSON.stringify({
      params: account
        ? [
            contractHash,
            method,
            params,
            [
              {
                account,
                scopes: 'CalledByEntry',
                allowedcontracts: [],
                allowedgroups: [],
              },
            ],
          ]
        : [contractHash, method, params],
      method: 'traverseiterator',
      jsonrpc: '2.0',
      id: 1,
    }),
  }
  return fetch(getNetwork(), fetchInitData)
    .then((res) => res.json())
    .then(({ result }) => result)
    .catch(console.log)
}

export { invokeScript, traverseiterator }
