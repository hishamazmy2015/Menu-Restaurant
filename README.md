# CoinMarketCap

## 1 Spot Exchange API endpoints

### 1.1 Fetch All Summery endpoints

<code>GET /cmc/spot/v1/summary</code>

It is providing the summary endpoint is to provide an overview of market data for all tickers and all market pairs on the exchange.

- Request

Name | Type |Status | Description
---- |----- |------ | -----------

- Response

Name | Type |Status | Description
---- |----- |------ | -----------
trading_pairs| string |Mandatory |Identifier of a ticker with delimiter to separate base/quote, eg. BTC-USD (Price of BTC is quoted in USD)
base_currency | string | Mandatory | Symbol/currency code of base currency, eg. BTC
quote_currency | string | Mandatory | Symbol/currency code of quote currency, eg. USD
last_price | decimal | Mandatory | Last transacted price of base currency based on given quote currency
lowest_ask | decimal | Mandatory | Lowest Ask price of base currency based on given quote currency
highest_bid | decimal | Mandatory | Highest bid price of base currency based on given quote currency
base_volume | decimal | Mandatory | 24-hr volume of market pair denoted in BASE currency
quote_volume | decimal | Mandatory | 24-hr volume of market pair denoted in QUOTE currency
price_change_percent_24h | decimal | Mandatory | 24-hr % price change of market pair
highest_price_24h | decimal | Mandatory | Highest price of base currency based on given quote currency in the last 24-hrs
lowest_price_24h | decimal | Mandatory | Lowest price of base currency based on given quote currency in the last 24-hrs

- example

```json
{
    "code": 1,
    "desc": "操作成功。",
    "data": [
        {
            "trading_pairs": "LTC_QC",
            "base_currency": "LTC",
            "lowest_price_24h": "9.3",
            "quote_volume": "372.000",
            "base_volume": "40.000",
            "price_change_percent_24h": "0.0",
            "lowest_ask": "9.3",
            "highest_price_24h": "9.3",
            "quote_currency": "QC",
            "highest_bid": "9.24",
            "last_price": "9.3"
        },
        {
            "trading_pairs": "BTC_QC",
            "base_currency": "BTC",
            "lowest_price_24h": "37061.56",
            "quote_volume": "222.360",
            "base_volume": "0.006",
            "price_change_percent_24h": "0.0",
            "lowest_ask": "37061.56",
            "highest_price_24h": "37061.56",
            "quote_currency": "QC",
            "highest_bid": "37021.45",
            "last_price": "37061.56"
        }
    ]
}
```






### 1.2 Fetch Assets endpoints

<code>GET /cmc/spot/v1/assets</code>

It is providing detailed assets for each currency available on the exchange.
In depth details on crypto currencies available on the exchange.

- Request

Name | Type |Status | Description
---- |----- |------ | -----------

- Response

Name | Type |Status | Description
---- |----- |------ | -----------
name| string |Recommended |Full name of cryptocurrency.
can_withdraw | boolean | Mandatory | Identifies whether withdrawals are enabled or disabled.
can_deposit | boolean | Mandatory | Identifies whether deposits are enabled or disabled.
min_withdrawv | decimal | Mandatory | Identifies the single minimum withdrawal amount of a cryptocurrency.

- example

```json
{
    "code": 1,
    "desc": "操作成功。",
    "data": {
        "THETA": {
            "name": "THETA",
            "can_withdraw": true,
            "can_deposit": true,
            "min_withdraw": 0.001
        },
        "ICP": {
            "name": "ICP",
            "can_withdraw": true,
            "can_deposit": true,
            "min_withdraw": 0.01
        },
        "HLC": {
            "name": "HLC",
            "can_withdraw": true,
            "can_deposit": true,
            "min_withdraw": 0.1
        }
    }
}
```






### 1.3 Fetch TICKER endpoints

<code>GET /cmc/spot/v1/ticker</code>

It is providing a 24-hour pricing and volume summary for each market pair available on the exchange.
24-hour rolling window price change statistics for all markets.


- Request

Name | Type |Status | Description
---- |----- |------ | -----------

- Response


Name | Type |Status | Description
---- |----- |------ | -----------
base_currency | string | Mandatory | Symbol/currency code of base currency, eg. BTC
base_volume | decimal | Mandatory | 24-hour trading volume denoted in BASE currency
quote_volume | decimal | Mandatory | 24-hr volume of market pair denoted in QUOTE currency
isFrozen | boolean | Recommended | Lowest Ask price of base currency based on given quote currency
quote_currency | string | Mandatory | Symbol/currency code of quote currency, eg. USD
last_price | decimal | Mandatory | Last transacted price of base currency based on given quote currency

- example

```json
{
    "code": 1,
    "desc": "操作成功。",
    "data": {
        "LTC_QC": {
            "base_currency": "LTC",
            "quote_volume": "372.000",
            "base_volume": "40.000",
            "isFrozen": 0,
            "quote_currency": "QC",
            "last_price": "9.3"
        },
        "DOT_QC": {
            "base_currency": "DOT",
            "quote_volume": "9600.000",
            "base_volume": "86.000",
            "isFrozen": 0,
            "quote_currency": "QC",
            "last_price": "100.0"
        }
    }
}
```






### 1.4 Fetch ORDERBOOK endpoints

<code>GET /cmc/spot/v1/orderbook/<market_pair></code>

It is providing a 24-hour pricing and volume summary for each market pair available on the exchange.
24-hour rolling window price change statistics for all markets.


- Request

Name | Type |Status | Description
---- |----- |------ | -----------
market_pair | int | Mandatory |   path parameter  A pair such as “LTC_BTC”
depth | int | Mandatory |  Orders depth quantity: [0,5,10,20,50,100]  Not defined or 0 = full order book 
- Response


Name | Type |Status | Description
---- |----- |------ | -----------
timestamp | Integer | Mandatory | Unix timestamp in milliseconds for when the last updated time occurred.
bids | decimal | Mandatory | An array containing 2 elements. The offer price and quantity for each bid order.
asks | decimal | Mandatory | An array containing 2 elements. The ask price and quantity for each ask order.


- example

```json
{
    "code": 1,
    "desc": "操作成功。",
    "data": {
        "timestamp": 1632405545684,
        "asks": [
            [
                6613.34,
                0.001
            ],
            [
                6700,
                998.853
            ],
            [
                6800,
                8000
            ],
            [
                6850,
                10000
            ]
        ],
        "bids": [
            [
                6300,
                1999.969
            ],
            [
                6000,
                6568.101
            ],
            [
                5000,
                10
            ],
            [
                10,
                120
            ]
        ]
    }
}
```







### 1.5 Fetch TRADES endpoints

<code>GET /cmc/spot/v1/trades/<market_pair> </code>

It is providing a 24-hour pricing and volume summary for each market pair available on the exchange.
24-hour rolling window price change statistics for all markets.
Recently completed trades for a given market. 24 hour historical full trades available as minimum requirement.




- Request

Name | Type |Status | Description
---- |----- |------ | -----------
market_pair | string | Mandatory | path variable, A pair such as “LTC_BTC” 


- Response

Name | Type |Status | Description
---- |----- |------ | -----------
trade_id | integer | Mandatory | A unique ID associated with the trade for the currency pair transaction  Note: Unix timestamp does not qualify as trade_id.
price | decimal | Mandatory | Last transacted price of base currency based on given quote currency
base_volume | decimal | Mandatory | 24-hour trading volume denoted in BASE currency
quote_volume | decimal | Mandatory | 24-hr volume of market pair denoted in QUOTE currency
timestamp | Integer | Mandatory | Unix timestamp in milliseconds for when the last updated time occurred.
type | string | Mandatory| Used to determine whether or not the transaction originated as a buy or sell. Buy – Identifies an ask was removed from the order book. Sell – Identifies a bid was removed from the order book.


- example

```json
{
    "code": 1,
    "desc": "操作成功。",
    "data": [
        {
            "trade_id": 55411,
            "price": "6585.0",
            "quote_volume": "6.5850",
            "base_volume": "0.001",
            "type": "Sell",
            "timestamp": 1630931801000
        },
        {
            "trade_id": 55412,
            "price": "6585.0",
            "quote_volume": "6.5850",
            "base_volume": "0.001",
            "type": "Sell",
            "timestamp": 1630931801000
        },
        {
            "trade_id": 55629,
            "price": "6586.67",
            "quote_volume": "6.58667",
            "base_volume": "0.001",
            "type": "Buy",
            "timestamp": 1631345943000
        }
    ]
}
```



