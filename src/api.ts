import { defineOperationApi } from '@directus/extensions-sdk'

import { Crypto } from "@peculiar/webcrypto"
global.crypto = new Crypto()

import bip39 from 'bip39'
import { HDNode } from '@ethersproject/hdnode'
import { arrayify } from '@ethersproject/bytes'
import bs58check from "bs58check"

const paths: Record<string, string> = {
	$litecoin: "m/44'/2'/0'/0/0",
	$dogecoin: "m/44'/3'/0'/0/0",
}

interface Options {
	coin?: "$litecoin" | "$dogecion"
}

export default defineOperationApi<Options>({
	id: 'operation-wallet-create',
	handler: ({
		coin = "$litecoin",
	}) => {
		const mnemonic = bip39.generateMnemonic()
		const root = HDNode.fromSeed(bip39.mnemonicToSeedSync(mnemonic))
		const path = paths[coin]

		if (path === undefined) throw new Error(`invalid coin: ${coin}`)

		const { address, privateKey } = root.derivePath(path)

		return {
			coin,
			mnemonic,
			address: bs58check.encode(arrayify(address)),
			privateKey: bs58check.encode(arrayify(privateKey)),
			comment: "Operation generated",
		}
	},
})
