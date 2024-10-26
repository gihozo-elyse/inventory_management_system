import mongoose, { Schema } from 'mongoose';

const eventLogSchema = new Schema({
  action: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  timestamp: { type: Date, default: Date.now }
});

const EventLog = mongoose.model('EventLog', eventLogSchema);

export default EventLog;
