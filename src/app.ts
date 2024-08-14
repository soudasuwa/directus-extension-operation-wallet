import { defineOperationApp } from '@directus/extensions-sdk';

export default defineOperationApp({
	id: 'operation-wallet-create',
	name: 'Create wallet',
	icon: 'wallet',
	description: 'Generate cryptocurrency wallet',
	overview: ({ text }) => [
		{
			label: 'Text',
			text: text,
		},
	],
	options: [
		{
			field: 'coin',
			name: 'Currency',
			type: 'string',
			schema: {
				default_value: '$litecoin',
			},
			meta: {
				width: 'half',
				interface: 'select-dropdown',
				options: {
					choices: [
						{
							text: 'LTC',
							value: '$litecoin',
						},
						{
							text: 'DOGE',
							value: '$dogecoin',
						},
					],
				},
			},
		},
	],
});
