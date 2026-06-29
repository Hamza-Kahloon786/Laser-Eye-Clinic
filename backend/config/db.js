const mongoose = require('mongoose');
const dns = require('dns');

// VPN software (e.g. Surfshark) can inject broken IPv6 DNS servers that make
// Node's resolver fail SRV lookups even though the OS resolver works fine.
// Force a known-good public DNS server for this process only.
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;