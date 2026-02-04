import { Schema, model, connection, InferSchemaType } from 'mongoose';

// padrão recebido da API OPEN Exchange Rates
// https://docs.openexchangerates.org/reference/api-introduction

const schema = new Schema({
  disclaimer: { type: String },
  license: { type: String },
  timestamp: { type: Number },
  base: { type: String },
  rates: {
    type: Map,
    of: Number,
  },
});

export type ExchangeRatesType = InferSchemaType<typeof schema>;

const modelName = 'ExchangeRates';
export default connection.models[modelName] || model<ExchangeRatesType>(modelName, schema);